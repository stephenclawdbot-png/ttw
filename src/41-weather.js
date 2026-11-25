
const WX = { mesh: null, u: null, fade: 1 };
function initWeather() {
  const N = 2600, g = new THREE.InstancedBufferGeometry(), rng = makeRng(4242), seed = new Float32Array(N * 4);
  for (let i = 0; i < N; i++) { seed[i * 4] = rng(); seed[i * 4 + 1] = rng(); seed[i * 4 + 2] = rng(); seed[i * 4 + 3] = (i + .5) / N; }
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0]), 3)); g.setIndex([0, 1, 2, 0, 2, 3]);
  g.setAttribute('iSeed', new THREE.InstancedBufferAttribute(seed, 4)); g.instanceCount = N;
  const v2 = () => ({ value: new THREE.Vector2() }), v3 = () => ({ value: new THREE.Vector3() }), v4 = () => ({ value: new THREE.Vector4() });
  const u = WX.u = {
    uTime: SH.uTime, uLightPos: { value: R.lightPos }, uLightCol: { value: R.lightCol }, uAmb: v3(), uFade: { value: 1 }, uN: v2(),
    uVelA: v3(), uVelB: v3(), uSwayA: v2(), uSwayB: v2(), uSizeA: v2(), uSizeB: v2(), uColA: v4(), uColB: v4(), uAlA: v3(), uAlB: v3(), uYA: v2(), uYB: v2(),
  };
  const m = new THREE.ShaderMaterial({
    uniforms: u, transparent: true, depthWrite: false, depthTest: true, side: THREE.DoubleSide, blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor, blendEquation: THREE.AddEquation,
    vertexShader: `attribute vec4 iSeed; varying vec4 vCol; varying vec2 vUv; varying float vAdd;
uniform float uTime; uniform float uFade; uniform vec3 uLightPos[12]; uniform vec3 uLightCol[12]; uniform vec3 uAmb; uniform vec2 uN;
uniform vec3 uVelA; uniform vec3 uVelB; uniform vec2 uSwayA; uniform vec2 uSwayB; uniform vec2 uSizeA; uniform vec2 uSizeB; uniform vec4 uColA; uniform vec4 uColB; uniform vec3 uAlA; uniform vec3 uAlB; uniform vec2 uYA; uniform vec2 uYB;
void main(){
  float isB = step(iSeed.w, uN.y), show = step(iSeed.w, uN.x + uN.y);
  vec3 vel = mix(uVelA, uVelB, isB), al = mix(uAlA, uAlB, isB); vec2 sway = mix(uSwayA, uSwayB, isB), sz = mix(uSizeA, uSizeB, isB), yr = mix(uYA, uYB, isB); vec4 cp = mix(uColA, uColB, isB);
  float r1 = fract(iSeed.w * 91.7 + iSeed.x * 3.1), r2 = fract(iSeed.w * 357.3 + iSeed.z * 5.7), span = max(yr.y - yr.x, 0.01);
  vec3 p = vec3(iSeed.x * 48.0, iSeed.y * span, iSeed.z * 48.0) + vel * uTime * (0.65 + 0.7 * r1);
  p.x += sin(uTime * sway.y * (0.6 + r2) + iSeed.y * 40.0) * sway.x; p.z += cos(uTime * sway.y * (0.5 + r1) + iSeed.x * 40.0) * sway.x; p.y += sin(uTime * sway.y * 0.7 + r1 * 30.0) * sway.x * 0.3;
  p.x = mod(p.x, 48.0) - 24.0; p.z = mod(p.z, 48.0) - 24.0; p.y = mod(p.y, span) + yr.x;
  float size = mix(sz.x, sz.y, r2);
  vec4 mv = viewMatrix * vec4(p, 1.0);
  vec3 vv = (viewMatrix * vec4(vel, 0.0)).xyz; float vl = length(vv.xy); vec2 dir = vl > 0.0001 ? vv.xy / vl : vec2(0.0, 1.0);
  mv.xy += position.x * vec2(-dir.y, dir.x) * size + position.y * dir * size * (1.0 + al.z * vl);
  gl_Position = show > 0.5 ? projectionMatrix * mv : vec4(2.0, 2.0, 2.0, 1.0);
  vec3 L = uAmb; for (int i = 0; i < 12; i++) { vec3 d = uLightPos[i] - p; L += uLightCol[i] / (dot(d, d) + 3.0); }
  float tw = al.y > 0.0 ? pow(max(0.0, sin(uTime * al.y * (0.5 + r1) + r2 * 60.0)), 4.0) : 1.0;
  float ef = smoothstep(24.0, 21.0, max(abs(p.x), abs(p.z))) * smoothstep(yr.x, yr.x + 0.5, p.y) * smoothstep(yr.y, yr.y - 1.2, p.y);
  vCol = vec4(cp.rgb * mix(vec3(1.0), L, cp.a), al.x * tw * ef * uFade); vAdd = 1.0 - cp.a; vUv = position.xy;
}`,
    fragmentShader: `precision highp float; varying vec4 vCol; varying vec2 vUv; varying float vAdd;
void main(){ float a = smoothstep(1.0, 0.25, length(vUv)) * vCol.a; gl_FragColor = vec4(vCol.rgb * a, a * (1.0 - vAdd)); }`,
  });
  WX.mesh = new THREE.Mesh(g, m); WX.mesh.frustumCulled = false; WX.mesh.renderOrder = 4; R.scene.add(WX.mesh);
}
function setWeather(w, instant) {
  const u = WX.u;
  u.uN.value.fromArray(w.n); u.uVelA.value.fromArray(w.velA); u.uVelB.value.fromArray(w.velB); u.uSwayA.value.fromArray(w.swayA); u.uSwayB.value.fromArray(w.swayB);
  u.uSizeA.value.fromArray(w.sizeA); u.uSizeB.value.fromArray(w.sizeB); u.uColA.value.fromArray(w.colA); u.uColB.value.fromArray(w.colB); u.uAlA.value.fromArray(w.alA); u.uAlB.value.fromArray(w.alB); u.uYA.value.fromArray(w.yA); u.uYB.value.fromArray(w.yB);
  WX.fade = instant ? 1 : 0; u.uFade.value = WX.fade;
}
