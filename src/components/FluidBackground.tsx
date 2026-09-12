import { useEffect, useRef } from 'react'

const VERTEX_SHADER = `#version 300 es
in vec2 aPosition;
out vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`

const NOISE_GLSL = `
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}
vec2 curl(vec2 p) {
  float e = 0.08;
  float n1 = noise(p + vec2(0.0, e));
  float n2 = noise(p - vec2(0.0, e));
  float n3 = noise(p + vec2(e, 0.0));
  float n4 = noise(p - vec2(e, 0.0));
  float dx = (n1 - n2) / (2.0 * e);
  float dy = (n4 - n3) / (2.0 * e);
  return vec2(dx, -dy);
}`

const UPDATE_FRAGMENT_SHADER = `#version 300 es
precision highp float;
uniform sampler2D uSource;
uniform float uDt;
uniform float uTime;
uniform vec2 uPointer;
uniform vec2 uPointerVelocity;
uniform float uPointerActive;
uniform float uAspect;
in vec2 vUv;
out vec4 fragColor;
${NOISE_GLSL}
void main() {
  vec2 uv = vUv;
  vec4 data = texture(uSource, uv);
  vec2 vel = data.rg;

  vec2 back = clamp(uv - vel * uDt * 0.6, vec2(0.0), vec2(1.0));
  vec4 advected = texture(uSource, back);
  vel = advected.rg * 0.965;
  float dens = advected.b * 0.985;

  vec2 flowP = uv * vec2(uAspect, 1.0) * 1.6 + vec2(uTime * 0.015, -uTime * 0.011);
  vec2 ambient = curl(flowP);
  vel += ambient * 0.034 * uDt * 60.0;

  vec2 aspectUv = vec2(uv.x * uAspect, uv.y);
  vec2 pAspect = vec2(uPointer.x * uAspect, uPointer.y);
  float d = distance(aspectUv, pAspect);
  float radius = 0.1;
  float falloff = exp(-(d * d) / (radius * radius));
  vel += uPointerVelocity * falloff * uPointerActive * 1.4;
  dens += falloff * uPointerActive * 0.6;

  dens = clamp(dens, 0.0, 1.0);
  vel = clamp(vel, vec2(-4.0), vec2(4.0));

  fragColor = vec4(vel, dens, 1.0);
}`

const DISPLAY_FRAGMENT_SHADER = `#version 300 es
precision highp float;
uniform sampler2D uSource;
uniform vec2 uResolution;
in vec2 vUv;
out vec4 fragColor;
void main() {
  vec4 data = texture(uSource, vUv);
  float dens = data.b;
  float speed = length(data.rg);
  float v = clamp(dens * 1.2 + speed * 0.22, 0.0, 1.0);

  vec2 c = vUv - 0.5;
  float r = length(c * vec2(uResolution.x / uResolution.y, 1.0));
  float centerDamp = smoothstep(0.0, 0.75, r);
  float intensity = v * mix(0.4, 1.0, centerDamp);

  fragColor = vec4(vec3(intensity), 1.0);
}`

function compileShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error(`Shader compile error: ${info}`)
  }
  return shader
}

function createProgram(gl: WebGL2RenderingContext, vertSrc: string, fragSrc: string) {
  const program = gl.createProgram()!
  const vert = compileShader(gl, gl.VERTEX_SHADER, vertSrc)
  const frag = compileShader(gl, gl.FRAGMENT_SHADER, fragSrc)
  gl.attachShader(program, vert)
  gl.attachShader(program, frag)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program)
    gl.deleteProgram(program)
    throw new Error(`Program link error: ${info}`)
  }
  gl.deleteShader(vert)
  gl.deleteShader(frag)
  return program
}

function createFBO(gl: WebGL2RenderingContext, width: number, height: number) {
  const texture = gl.createTexture()!
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, width, height, 0, gl.RGBA, gl.HALF_FLOAT, null)

  const framebuffer = gl.createFramebuffer()!
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)

  return { texture, framebuffer }
}

export function FluidBackground({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = canvas?.parentElement
    if (!canvas || !container) return

    const gl = canvas.getContext('webgl2', { antialias: false, alpha: false, preserveDrawingBuffer: false })
    if (!gl || !gl.getExtension('EXT_color_buffer_float')) {
      canvas.style.display = 'none'
      return
    }
    gl.getExtension('OES_texture_float_linear')

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768
    const simDim = isMobile ? 420 : 720

    let updateProgram: WebGLProgram
    let displayProgram: WebGLProgram
    try {
      updateProgram = createProgram(gl, VERTEX_SHADER, UPDATE_FRAGMENT_SHADER)
      displayProgram = createProgram(gl, VERTEX_SHADER, DISPLAY_FRAGMENT_SHADER)
    } catch {
      canvas.style.display = 'none'
      return
    }

    const quad = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, quad)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)

    function bindQuad(program: WebGLProgram) {
      const loc = gl!.getAttribLocation(program, 'aPosition')
      gl!.bindBuffer(gl!.ARRAY_BUFFER, quad)
      gl!.enableVertexAttribArray(loc)
      gl!.vertexAttribPointer(loc, 2, gl!.FLOAT, false, 0, 0)
    }

    let simW = simDim
    let simH = Math.round((simDim * canvas.clientHeight) / Math.max(canvas.clientWidth, 1)) || simDim
    let fboA = createFBO(gl, simW, simH)
    let fboB = createFBO(gl, simW, simH)

    function clearFBOs() {
      for (const fbo of [fboA, fboB]) {
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo.framebuffer)
        gl!.viewport(0, 0, simW, simH)
        gl!.clearColor(0, 0, 0, 1)
        gl!.clear(gl!.COLOR_BUFFER_BIT)
      }
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, null)
    }
    clearFBOs()

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    function resize() {
      const w = Math.round(container!.clientWidth * dpr)
      const h = Math.round(container!.clientHeight * dpr)
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w
        canvas!.height = h
      }
    }
    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)

    const updateLocs = {
      uSource: gl.getUniformLocation(updateProgram, 'uSource'),
      uDt: gl.getUniformLocation(updateProgram, 'uDt'),
      uTime: gl.getUniformLocation(updateProgram, 'uTime'),
      uPointer: gl.getUniformLocation(updateProgram, 'uPointer'),
      uPointerVelocity: gl.getUniformLocation(updateProgram, 'uPointerVelocity'),
      uPointerActive: gl.getUniformLocation(updateProgram, 'uPointerActive'),
      uAspect: gl.getUniformLocation(updateProgram, 'uAspect'),
    }
    const displayLocs = {
      uSource: gl.getUniformLocation(displayProgram, 'uSource'),
      uResolution: gl.getUniformLocation(displayProgram, 'uResolution'),
    }

    const pointer = { x: 0.5, y: 0.5, vx: 0, vy: 0, active: 0 }
    let lastPointerX = 0.5
    let lastPointerY = 0.5

    function setPointerFromEvent(clientX: number, clientY: number) {
      const rect = container!.getBoundingClientRect()
      const x = (clientX - rect.left) / rect.width
      const y = 1 - (clientY - rect.top) / rect.height
      pointer.vx = (x - lastPointerX) * 6
      pointer.vy = (y - lastPointerY) * 6
      pointer.x = x
      pointer.y = y
      pointer.active = 1
      lastPointerX = x
      lastPointerY = y
    }

    function onMouseMove(e: MouseEvent) {
      setPointerFromEvent(e.clientX, e.clientY)
    }
    function onTouchMove(e: TouchEvent) {
      const t = e.touches[0]
      if (t) setPointerFromEvent(t.clientX, t.clientY)
    }

    container.addEventListener('mousemove', onMouseMove)
    container.addEventListener('touchmove', onTouchMove, { passive: true })

    let rafId = 0
    let lastTime = performance.now()
    let elapsed = 0
    let frameCount = 0
    const settleFrames = 180

    function frame(now: number) {
      const dt = Math.min((now - lastTime) / 1000, 1 / 30)
      lastTime = now
      elapsed += dt
      frameCount++

      pointer.active *= 0.94
      pointer.vx *= 0.9
      pointer.vy *= 0.9

      const aspect = canvas!.width / Math.max(canvas!.height, 1)

      gl!.bindFramebuffer(gl!.FRAMEBUFFER, fboB.framebuffer)
      gl!.viewport(0, 0, simW, simH)
      gl!.useProgram(updateProgram)
      bindQuad(updateProgram)
      gl!.activeTexture(gl!.TEXTURE0)
      gl!.bindTexture(gl!.TEXTURE_2D, fboA.texture)
      gl!.uniform1i(updateLocs.uSource, 0)
      gl!.uniform1f(updateLocs.uDt, dt)
      gl!.uniform1f(updateLocs.uTime, elapsed)
      gl!.uniform2f(updateLocs.uPointer, pointer.x, pointer.y)
      gl!.uniform2f(updateLocs.uPointerVelocity, pointer.vx, pointer.vy)
      gl!.uniform1f(updateLocs.uPointerActive, pointer.active)
      gl!.uniform1f(updateLocs.uAspect, aspect)
      gl!.drawArrays(gl!.TRIANGLES, 0, 3)

      const tmp = fboA
      fboA = fboB
      fboB = tmp

      gl!.bindFramebuffer(gl!.FRAMEBUFFER, null)
      gl!.viewport(0, 0, canvas!.width, canvas!.height)
      gl!.useProgram(displayProgram)
      bindQuad(displayProgram)
      gl!.activeTexture(gl!.TEXTURE0)
      gl!.bindTexture(gl!.TEXTURE_2D, fboA.texture)
      gl!.uniform1i(displayLocs.uSource, 0)
      gl!.uniform2f(displayLocs.uResolution, canvas!.width, canvas!.height)
      gl!.drawArrays(gl!.TRIANGLES, 0, 3)

      running = false
      if (!reducedMotion || frameCount < settleFrames) {
        if (isVisible) {
          running = true
          rafId = requestAnimationFrame(frame)
        }
      }
    }

    let running = false
    function start() {
      if (running) return
      running = true
      lastTime = performance.now()
      rafId = requestAnimationFrame(frame)
    }
    function stop() {
      running = false
      cancelAnimationFrame(rafId)
    }

    let isVisible = true
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (isVisible) start()
        else stop()
      },
      { threshold: 0 },
    )
    visibilityObserver.observe(container)

    start()

    return () => {
      stop()
      visibilityObserver.disconnect()
      resizeObserver.disconnect()
      container.removeEventListener('mousemove', onMouseMove)
      container.removeEventListener('touchmove', onTouchMove)
      gl.deleteProgram(updateProgram)
      gl.deleteProgram(displayProgram)
      gl.deleteTexture(fboA.texture)
      gl.deleteTexture(fboB.texture)
      gl.deleteFramebuffer(fboA.framebuffer)
      gl.deleteFramebuffer(fboB.framebuffer)
      gl.deleteBuffer(quad)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  )
}
