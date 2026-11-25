
const MAT = {};
function initMaterials() {
  const tex = makeDetailTextures(); SH.uTexA.value = tex.albedo; SH.uTexH.value = tex.height;
  MAT.world = litMaterial('world');
  MAT.inst = litMaterial('inst');
  MAT.water = litMaterial('water', { color: new THREE.Color(0.012, 0.02, 0.03), roughness: 0.1 });
  MAT.dark = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.5, depthWrite: false });
  MAT.caster = new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: false, depthTest: false });
  MAT.fall = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.DoubleSide,
    uniforms: { uTime: SH.uTime, uFP: { value: new THREE.Vector4(0, 1, 1, 0) }, uFA: { value: new THREE.Vector3(.022, .034, .054) }, uFB: { value: new THREE.Vector3(.2, .27, .38) } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: `precision highp float; varying vec2 vUv; uniform float uTime; uniform vec4 uFP; uniform vec3 uFA; uniform vec3 uFB;
float h(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(h(i), h(i + vec2(1.0, 0.0)), f.x), mix(h(i + vec2(0.0, 1.0)), h(i + vec2(1.0, 1.0)), f.x), f.y); }
void main(){
  float x = vUv.x, y = vUv.y, t = uTime * uFP.y;
  float edge = smoothstep(0.0, 0.14, x) * smoothstep(1.0, 0.86, x);
  if (uFP.x > 0.5 && uFP.x < 1.5) {
    float c1 = n(vec2(x * 7.0, 2.0)), c2 = n(vec2(x * 19.0 + 5.0, 7.0)), c3 = n(vec2(x * 4.0 + 1.0, y * 2.2));
    float len = 0.34 + 0.46 * c1 + 0.16 * c2, tip = smoothstep(len, len - 0.2, y);
    float rib = smoothstep(0.2, 0.8, c2 * 0.55 + n(vec2(x * 34.0, y * 1.3)) * 0.45);
    float ed = smoothstep(0.0, 0.07, x) * smoothstep(1.0, 0.93, x);
    gl_FragColor = vec4(mix(uFA, uFB, rib * (0.45 + 0.55 * c3)), ed * tip * uFP.z); return;
  }
  float s1 = n(vec2(x * 6.0, y * 5.0 - t * 2.4)), s2 = n(vec2(x * 13.0 + 3.1, y * 11.0 - t * 4.1)), s3 = n(vec2(x * 3.0 - 1.7, y * 2.2 - t * 1.3));
  float strand = smoothstep(0.34, 0.72, s1 * 0.6 + s2 * 0.4);
  float sheet = 1.0 - smoothstep(0.03, 0.3, y);
  float fade = 1.0 - smoothstep(0.4, 1.0, y);
  if (uFP.x > 1.5) {
    float body = mix(0.72 + 0.28 * s3, 1.0, sheet), crust = strand * smoothstep(0.05, 0.5, y);
    gl_FragColor = vec4(mix(uFA * (0.7 + 0.5 * s3), uFB, crust), clamp(edge * body * (1.0 - smoothstep(0.55, 1.0, y)) * uFP.z, 0.0, 1.0)); return;
  }
  float body = mix(strand * (0.55 + 0.45 * s3), 1.0, sheet);
  float foam = strand * smoothstep(0.02, 0.22, y);
  vec3 col = mix(uFA, uFB, foam * 0.85 + 0.06 * s3);
  gl_FragColor = vec4(col, clamp(edge * body * fade * (0.62 + 0.3 * foam) * uFP.z, 0.0, 1.0)); }`,
  });
}

function buildBoard(seed, index) {
  let lay = null, ls = seed;
  while (!lay) { lay = genLayout(ls); ls += 101; }
  const bio = biomeFor(index), RL = bio.relief; applyBiomePalette(bio);
  const rng = makeRng(seed * 9176 + 11); soupRng = makeRng(seed * 131 + 5);
  const sd = (seed * 53) % 997;
  const P = lay.pts, n = P.length, L = lay.L, kx = lay.kx, zc = lay.cave.z;
  const px = new Float32Array(n), pz = new Float32Array(n), py = new Float32Array(n), tx = new Float32Array(n), tz = new Float32Array(n);
  for (let i = 0; i < n; i++) { px[i] = P[i][0]; pz[i] = P[i][1]; }
  for (let i = 0; i < n; i++) { const a = Math.max(0, i - 1), b = Math.min(n - 1, i + 1); const dx = px[b] - px[a], dz = pz[b] - pz[a], l = Math.hypot(dx, dz) || 1; tx[i] = dx / l; tz[i] = dz / l; }

  const hBase = (x, z) => {
    let h = (fbm(x * .055 + sd, z * .055 + 3.1, sd, 3) - .5) * RL[0] + (fbm(x * .17 + 3, z * .17 + 7, sd + 5, 2) - .5) * RL[1] + .9 * smooth(7, -13, z);
    if (RL[3]) { const w = x * .42 + z * .2 + (fbm(x * .09, z * .09, sd + 70, 2) - .5) * 5, r = 1 - Math.abs(Math.sin(w)); h += RL[3] * r * r * (.4 + .9 * fbm(x * .07 + 9, z * .07, sd + 71, 2)); }
    return h;
  };

  { const raw = new Float32Array(n); for (let i = 0; i < n; i++) raw[i] = hBase(px[i], pz[i]) * .6;
    let a = raw, b = new Float32Array(n);
    for (let pass = 0; pass < 2; pass++) { for (let i = 0; i < n; i++) { let s = 0, c = 0; for (let k = -16; k <= 16; k++) { const j = clamp(i + k, 0, n - 1); s += a[j]; c++; } b[i] = s / c; } const t = a; a = b; b = t; }
    py.set(a); }

  const SP = lay.stream, sn = SP.length, swl = new Float32Array(sn);
  { const wlS = hBase(SP[0][0], SP[0][1]) - .5, wlE = Math.min(hBase(SP[sn - 1][0], SP[sn - 1][1]) - .5, wlS - .3);
    let k = 0; for (let u = 0; u < sn; u++) { swl[u] = lerp(wlS, wlE, u / (sn - 1)); k = Math.min(k, hBase(SP[u][0], SP[u][1]) - .38 - swl[u]); }
    for (let u = 0; u < sn; u++) swl[u] += k; }
  const ci0 = Math.round(lay.cross.s / PATH_STEP), wlc = swl[lay.cross.i];
  { const need = Math.max(.4, wlc + 1.0 - py[ci0]); for (let i = 0; i < n; i++) py[i] += need * smooth(3.6, .7, Math.abs(i - ci0) * PATH_STEP); }
  const keepY = py[n - 1];

  const DN = 145, DS = .25, dRoad = new Float32Array(DN * DN), iRoad = new Uint16Array(DN * DN), dStr = new Float32Array(DN * DN), iStr = new Uint16Array(DN * DN);
  for (let j = 0; j < DN; j++) for (let i = 0; i < DN; i++) {
    const x = -BH + i * DS, z = -BH + j * DS; let b = 1e9, bi = 0;
    for (let k = 0; k < n; k++) { const dx = px[k] - x, dz = pz[k] - z, d = dx * dx + dz * dz; if (d < b) { b = d; bi = k; } }
    dRoad[j * DN + i] = Math.sqrt(b); iRoad[j * DN + i] = bi; b = 1e9; bi = 0;
    for (let k = 0; k < sn; k++) { const dx = SP[k][0] - x, dz = SP[k][1] - z, d = dx * dx + dz * dz; if (d < b) { b = d; bi = k; } }
    dStr[j * DN + i] = Math.sqrt(b); iStr[j * DN + i] = bi;
  }
  const dfAt = (arr, x, z) => {
    const fx = clamp((x + BH) / DS, 0, DN - 1.001), fz = clamp((z + BH) / DS, 0, DN - 1.001), i = Math.floor(fx), j = Math.floor(fz), u = fx - i, v = fz - j, o = j * DN + i;
    return (arr[o] * (1 - u) + arr[o + 1] * u) * (1 - v) + (arr[o + DN] * (1 - u) + arr[o + DN + 1] * u) * v;
  };
  const idxAt = (arr, x, z) => arr[clamp(Math.round((z + BH) / DS), 0, DN - 1) * DN + clamp(Math.round((x + BH) / DS), 0, DN - 1)];

  const pads = lay.pads.map(p => ({ x: p.x, z: p.z, s: p.s, cov: p.cov, y: 0 }));
  for (const p of pads) p.y0 = py[clamp(Math.round(p.s / PATH_STEP), 0, n - 1)] + .05;

  const ponds = [];
  for (let t = 0; t < 700 && ponds.length < bio.ponds; t++) {
    const r = rng.range(1.2, 2.3), x = rng.range(-BH + 3.4 + r, BH - 3.4 - r), z = rng.range(-BH + 3.4 + r, BH - 3.4 - r);
    if (dfAt(dRoad, x, z) < ROAD_HALF + 2.6 + r || dfAt(dStr, x, z) < 3.9 + r) continue;
    if (x < -12 + r || z < -12 + r || (Math.abs(x - kx) < 6.5 + r && z < -8.5 + r)) continue;
    if (pads.some(p => Math.hypot(x - p.x, z - p.z) < 3.1 + r) || ponds.some(q => Math.hypot(x - q.x, z - q.z) < r + q.r + 3.2)) continue;
    let y = 1e9; for (let k = 0; k < 24; k++) { const a = k / 12 * TAU, d = r + (k < 12 ? 1.3 : 2.1); y = Math.min(y, hBase(x + Math.cos(a) * d, z + Math.sin(a) * d)); }
    ponds.push({ x, z, r, y: Math.min(y, hBase(x, z)) - .22 });
  }
  const pondD = (q, x, z) => Math.hypot(x - q.x, z - q.z) * (.82 + .36 * vnoise(x * .55 + q.x, z * .55 + q.z, sd + 60));
  let _cl = 0;
  const hAt = (x, z) => {
    let h = hBase(x, z);
    const ds = dfAt(dStr, x, z);
    if (ds < 3.6) { const wl = swl[idxAt(iStr, x, z)]; h = Math.max(h, lerp(h, wl + .3, smooth(3.6, 2.3, ds) * smooth(.8, 1.5, ds))); }
    if (ds < 2.3) h = lerp(h, swl[idxAt(iStr, x, z)] - .34, smooth(2.2, .6, ds));
    const dsrc = Math.hypot(x - SP[0][0], z - SP[0][1]); if (dsrc < 2.7) h = lerp(h, swl[0] - .34, smooth(2.7, 1.2, dsrc));
    const dr = dfAt(dRoad, x, z);
    if (dr < ROAD_HALF + 3.2) {
      const w = smooth(ROAD_HALF + 3.2, ROAD_HALF + .4, dr) * smooth(.9, 2.3, ds);
      h = lerp(h, py[idxAt(iRoad, x, z)], w); if (dr < ROAD_HALF - .15 && ds > 2.3) h -= .07;
    }
    for (const p of pads) { const d = Math.hypot(x - p.x, z - p.z); if (d < 2.7) h = lerp(h, p.y0, smooth(2.7, 1.5, d)); }
    for (const q of ponds) { const d = pondD(q, x, z); if (d < q.r + 1.5) h = lerp(h, q.y - .45, smooth(q.r + 1.5, q.r * .4, d)); }
    const dkx = Math.max(0, Math.abs(x - kx) - 5.2), dkz = Math.max(0, z + 11.7), dk = Math.hypot(dkx, dkz);
    if (dk < 1.8) h = lerp(h, keepY, smooth(1.8, .2, dk));
    const dcl = x + BH + (fbm(z * .23 + 1.7, x * .11, sd + 9, 2) - .5) * 2.6;
    let c = smooth(5.0, 1.3, dcl) * (3.4 + 2.6 * fbm(x * .21, z * .21, sd + 11, 2) + 1.4 * smooth(4, -15, z)) * RL[2];
    const dbr = z + BH + (fbm(x * .23 + 5.1, z * .11, sd + 13, 2) - .5) * 2.4;
    const c2 = smooth(4.4, 1.0, dbr) * (1.8 + 2.2 * fbm(x * .2 + 9, z * .2, sd + 15, 2)) * smooth(5.4, 7.6, Math.abs(x - kx)) * RL[2];
    c = Math.max(c, c2) + 1.5 * smooth(11, 1, Math.hypot(x + BH, z + BH)) * smooth(7, 2.5, Math.min(x + BH, z + BH));
    if (c > .02) { const v = c / 1.2, f = Math.floor(v); c = (f + smooth(.45, .9, v - f)) * 1.2; }
    if (x < -12.2) c *= 1 - smooth(2.6, 1.6, Math.abs(z - zc)) * smooth(-12.2, -13.2, x);
    _cl = c; return h + c;
  };

  const chunks = [];
  for (let j = 0; j < NCH; j++) for (let i = 0; i < NCH; i++) chunks.push({ i, j, soup: new Soup(), water: new Soup(), cx: -BH + (i + .5) * CHUNK, cz: -BH + (j + .5) * CHUNK, extras: [], kind: 'chunk' });
  const chunkAt = (x, z) => chunks[clamp(Math.floor((z + BH) / CHUNK), 0, NCH - 1) * NCH + clamp(Math.floor((x + BH) / CHUNK), 0, NCH - 1)];
  const structs = [];
  const fires = [], glows = [];

  const NV = Math.round(2 * BH / CELL) + 1, CPC = Math.round(CHUNK / CELL);
  const VX = new Float32Array(NV * NV), VZ = new Float32Array(NV * NV), VY = new Float32Array(NV * NV), VC = new Float32Array(NV * NV), HG = new Float32Array(NV * NV);
  for (let j = 0; j < NV; j++) for (let i = 0; i < NV; i++) {
    let x = -BH + i * CELL, z = -BH + j * CELL; const o = j * NV + i;
    HG[o] = hAt(x, z);
    if (i % CPC !== 0) x += (h2(i, j, sd) - .5) * .26; if (j % CPC !== 0) z += (h2(i, j, sd + 1) - .5) * .26;
    VX[o] = x; VZ[o] = z; VY[o] = hAt(x, z); VC[o] = _cl;
  }
  const heightAt = (x, z) => {
    const fx = clamp((x + BH) / CELL, 0, NV - 1.001), fz = clamp((z + BH) / CELL, 0, NV - 1.001), i = Math.floor(fx), j = Math.floor(fz), u = fx - i, v = fz - j, o = j * NV + i;
    return (HG[o] * (1 - u) + HG[o + 1] * u) * (1 - v) + (HG[o + NV] * (1 - u) + HG[o + NV + 1] * u) * v;
  };
  const tcol = (x, z, ny, cl) => {
    const n1 = fbm(x * .3 + sd, z * .3, 3, 2), n2 = h2(Math.floor(x * 2 + 99), Math.floor(z * 2 + 99), sd + 2);
    if (cl > .5 || ny < .8) {
      let c = mixC(COL.stoneD, COL.stone, n1 * .9 + .1); if (ny > .93 && n1 > .5) c = mixC(c, COL.grassD, .4);
      return [mulC(c, .82 + .32 * n2), L_ROCK, .96];
    }
    let ds = dfAt(dStr, x, z); for (const q of ponds) ds = Math.min(ds, Math.max(0, pondD(q, x, z) - q.r) + .55);
    const glow = bio.bankGlow ? smooth(3.0, 1.1, ds) : 0;
    if (ds < 1.25) return [mixC(mulC(mixC(COL.mud, COL.earthD, n1), .6 + .25 * n2), [.42, .09, .02], glow * .16), L_DIRT, glow ? .9 : .5, glow * .012];
    let c = mixC(COL.earth, COL.grass, smooth(.4, .62, n1));
    c = mixC(c, COL.earthD, smooth(2.4, .5, dfAt(dRoad, x, z) - ROAD_HALF) * .55);
    return [mixC(mulC(c, .84 + .3 * n2), [.42, .09, .02], glow * .1), L_DIRT, .97, glow * .007];
  };
  const vtx = o => [VX[o], VY[o], VZ[o]];
  for (let j = 0; j < NV - 1; j++) for (let i = 0; i < NV - 1; i++) {
    const S = chunks[Math.floor(j / CPC) * NCH + Math.floor(i / CPC)].soup;
    const oa = j * NV + i, a = vtx(oa), b = vtx(oa + 1), c = vtx(oa + NV + 1), d = vtx(oa + NV);
    const cl = Math.max(VC[oa], VC[oa + 1], VC[oa + NV], VC[oa + NV + 1]);
    const tris = ((i + j) & 1) ? [[a, d, c], [a, c, b]] : [[a, d, b], [b, d, c]];
    for (const t of tris) {
      _sa.set(t[1][0] - t[0][0], t[1][1] - t[0][1], t[1][2] - t[0][2]); _sb.set(t[2][0] - t[0][0], t[2][1] - t[0][1], t[2][2] - t[0][2]); _sn.crossVectors(_sa, _sb).normalize();
      const m = tcol((t[0][0] + t[1][0] + t[2][0]) / 3, (t[0][2] + t[1][2] + t[2][2]) / 3, _sn.y, cl);
      S.tri(t[0], t[1], t[2], m[0], m[1], m[2], m[3] ? { emis: m[3] } : undefined);
    }
  }
  const facing = (S, a, b, c, d, ox, oz, col, layer, rough, o) => {
    _sa.set(b[0] - a[0], b[1] - a[1], b[2] - a[2]); _sb.set(c[0] - a[0], c[1] - a[1], c[2] - a[2]); _sn.crossVectors(_sa, _sb);
    if (_sn.x * ox + _sn.z * oz + _sn.y * 1e-3 >= 0) S.quad(a, b, c, d, col, layer, rough, o); else S.quad(a, d, c, b, col, layer, rough, o);
  };
  const SC = bio.strata.map(h => C(h));
  const strataCol = k => k === 0 ? mulC(COL.earthD, 1.1) : mulC(SC[(k * 3 + Math.floor(h2(k, 7, sd + 40) * 3)) % SC.length], .8 + .35 * h2(k, 3, sd + 41));
  const LV = []; { let y = 13, i = 0; while (y > -11) { LV.push(y); y -= .5 + .95 * h2(i++, 9, sd + 47); } LV.push(-99); }
  const insetBase = (y, k) => y > -.5 ? -(k & 1) * .1 : -(Math.min(1.0, (-.5 - y) * .2) + (k & 1) * .16) + (y < -4.0 ? (-4.0 - y) * .6 : 0);
  const inset = (y, k, t) => insetBase(y, k) + (vnoise(t * .8, k * 3.1, sd + 45) - .5) * .14;
  const wallReach = (top, y) => { const l0 = top - .32; if (y >= l0) return 0; let j = 0; while (LV[j] > l0 - .3) j++; while (LV[j] >= y) j++; return .07 - insetBase(LV[j] + .4, j + 1); };
  const wallColumn = (S, ax, az, ay, bx, bz, by, ox, oz, outer, t0, t1) => {
    if (!outer) { facing(S, [ax, ay, az], [ax, -4.6, az], [bx, -4.6, bz], [bx, by, bz], ox, oz, mulC(COL.stoneD, .7), L_ROCK, 1); return; }
    const bot = t => -5.0 - 2.2 * fbm(t * .45, 1.7, sd + 43, 2) - (h2(Math.floor(t * 2), 5, sd + 44) > .8 ? 1.3 : 0);
    const botA = bot(t0), botB = bot(t1);
    let yA = ay, yB = by, inA = 0, inB = 0, lvl = Math.min(ay, by) - .32, j = 0; while (LV[j] > lvl - .3) j++;
    for (let step = 0; step < 34; step++) {
      const wob = step ? .2 : 0;
      const loA = Math.max(lvl + wob * (vnoise(t0 * 1.3, j, sd + 46) - .5), botA), loB = Math.max(lvl + wob * (vnoise(t1 * 1.3, j, sd + 46) - .5), botB);
      const vk = bio.vein && step > 0 && (j % 6) === 2 ? smooth(.5, .68, vnoise(t0 * .35, j * 1.7, sd + 48)) : 0, vein = vk > .01;
      const col = vein ? mixC(strataCol(j + 3), [.5, .11, .02], vk) : strataCol(step === 0 ? 0 : j + 3);
      const a1 = [ax - ox * inA, yA, az - oz * inA], a2 = [ax - ox * inA, loA, az - oz * inA], b2 = [bx - ox * inB, loB, bz - oz * inB], b1 = [bx - ox * inB, yB, bz - oz * inB];
      const glow = { emis: vein ? .008 + .075 * vk : .03 * smooth(-7.5, -1, (loA + yA) * .5) + .008 };
      if (yA - loA > .01 || yB - loB > .01) facing(S, a1, a2, b2, b1, ox, oz, col, step === 0 ? L_DIRT : L_ROCK, .97, glow);
      if (lvl <= botA && lvl <= botB) break;
      const nl = LV[j++], nA = inset(nl + .4, j, t0), nB = inset(nl + .4, j, t1);
      const l1 = [ax - ox * nA, loA, az - oz * nA], l2 = [bx - ox * nB, loB, bz - oz * nB];
      S.quad(a2, l1, l2, b2, mulC(col, 1.3), L_ROCK, .97, glow); S.quad(a2, b2, l2, l1, mulC(col, .45), L_ROCK, .97);
      yA = loA; yB = loB; inA = nA; inB = nB; lvl = nl;
    }
  };
  for (const ch of chunks) {
    const S = ch.soup, i0 = ch.i * CPC, j0 = ch.j * CPC;
    for (let k = 0; k < CPC; k++) {
      let o1 = j0 * NV + i0 + k, o2 = o1 + 1;
      wallColumn(S, VX[o1], VZ[o1], VY[o1], VX[o2], VZ[o2], VY[o2], 0, -1, ch.j === 0, VX[o1], VX[o2]);
      o1 = (j0 + CPC) * NV + i0 + k; o2 = o1 + 1;
      wallColumn(S, VX[o1], VZ[o1], VY[o1], VX[o2], VZ[o2], VY[o2], 0, 1, ch.j === NCH - 1, VX[o1] + 50, VX[o2] + 50);
      o1 = (j0 + k) * NV + i0; o2 = o1 + NV;
      wallColumn(S, VX[o1], VZ[o1], VY[o1], VX[o2], VZ[o2], VY[o2], -1, 0, ch.i === 0, VZ[o1] + 100, VZ[o2] + 100);
      o1 = (j0 + k) * NV + i0 + CPC; o2 = o1 + NV;
      wallColumn(S, VX[o1], VZ[o1], VY[o1], VX[o2], VZ[o2], VY[o2], 1, 0, ch.i === NCH - 1, VZ[o1] + 150, VZ[o2] + 150);
    }
    const inx = (ch.i === 0 ? 2.1 : 0) - (ch.i === NCH - 1 ? 2.1 : 0), inz = (ch.j === 0 ? 2.1 : 0) - (ch.j === NCH - 1 ? 2.1 : 0), edge = inx || inz;
    S.rock(edge ? 2.3 : 3.3, ch.cx + inx, edge ? -6.4 : -4.8, ch.cz + inz, mulC(COL.stoneD, .7), { sq: edge ? .9 : .62, d: 1, jit: .1 });
  }

  const OFF = [-1.62, -1.25, -.85, -.45, 0, .45, .85, 1.25, 1.62];
  const roadVert = (i, k, ext) => {
    const off = OFF[k], s = i * PATH_STEP, wj = Math.abs(off) > 1.3 ? 1 + (fbm(s * .5, k, sd + 20, 2) - .5) * .28 : 1;
    const ii = clamp(i, 0, n - 1), x = px[ii] + tx[ii] * ext - tz[ii] * off * wj, z = pz[ii] + tz[ii] * ext + tx[ii] * off * wj;
    const onBridge = Math.abs(i - ci0) * PATH_STEP < 3.0;
    let y = py[ii] + .035 * (1 - (off / 1.25) * (off / 1.25));
    const nz = fbm(x * .45, z * .45, sd + 21, 2);
    let c = mulC(COL.road, .78 + .42 * nz), rough = .6;
    const rut = Math.abs(Math.abs(off) - .62) < .3 ? smooth(.38, .62, fbm(s * .22, off > 0 ? 3 : 9, sd + 23, 2)) : 0;
    c = mixC(c, COL.roadD, rut * .75); y -= rut * .025;
    const mud = onBridge ? 0 : smooth(.57, .7, fbm(x * .3 + 7, z * .3, sd + 25, 2));
    c = mixC(c, COL.mud, mud * .85); rough = lerp(rough, .3, mud) - rut * .12;
    if (Math.abs(off) > 1.3) { c = mixC(c, COL.earth, .8); rough = .95; y = onBridge ? py[ii] - .04 : heightAt(x, z) + .012; }
    return [x, y, z, c, rough];
  };
  const rows = []; for (let i = 0; i < n; i += 2) rows.push(i); if (rows[rows.length - 1] !== n - 1) rows.push(n - 1);
  const rv = rows.map(i => OFF.map((_, k) => roadVert(i, k, 0)));
  rv.push(OFF.map((_, k) => roadVert(n - 1, k, 1.3)));
  for (let r = 0; r < rv.length - 1; r++) for (let k = 0; k < OFF.length - 1; k++) {
    const a = rv[r][k], b = rv[r][k + 1], c = rv[r + 1][k + 1], d = rv[r + 1][k];
    const S = chunkAt((a[0] + c[0]) / 2, (a[2] + c[2]) / 2).soup;
    for (const v of [a, b, c, a, c, d]) S.v(v[0], v[1], v[2], 0, 1, 0, v[3][0], v[3][1], v[3][2], v[0] * .25, v[2] * .25, L_COBBLE, v[4]);
  }
  for (let q = 0; q < 16; q++) {
    const i = rng.int(20, n - 20); if (Math.abs(i - ci0) * PATH_STEP < 4) continue;
    let x = px[i] - tz[i] * rng.range(-.9, .9), z = pz[i] + tx[i] * rng.range(-.9, .9), a = rng.range(0, TAU); const y = py[i] + .045, S = chunkAt(x, z).soup;
    for (let sgm = 0; sgm < rng.int(3, 6); sgm++) {
      a += rng.range(-.9, .9); const l = rng.range(.18, .4), x2 = x + Math.cos(a) * l, z2 = z + Math.sin(a) * l, wx = -Math.sin(a) * .028, wz = Math.cos(a) * .028;
      const col = mulC(COL.black, 2.2);
      S.quad([x - wx, y, z - wz], [x + wx, y, z + wz], [x2 + wx, y, z2 + wz], [x2 - wx, y, z2 - wz], col, L_PLAIN, 1);
      S.quad([x - wx, y, z - wz], [x2 - wx, y, z2 - wz], [x2 + wx, y, z2 + wz], [x + wx, y, z + wz], col, L_PLAIN, 1);
      x = x2; z = z2;
    }
  }
  const waterV = (S, x, y, z, u, w, flow, rough) => S.v(x, y, z, 0, 1, 0, 1, 1, 1, u, w, 0, rough, flow, 0);
  for (let q = 0, made = 0; q < 60 && made < bio.puddles; q++) {
    const i = rng.int(18, n - 14); if (Math.abs(i - ci0) * PATH_STEP < 4.5) continue;
    const off = rng.sign() * rng.range(.25, .78), cx = px[i] - tz[i] * off, cz = pz[i] + tx[i] * off, r = rng.range(.36, .78), y = py[i] + .042, ph = rng() * 9, el = rng.range(.6, 1), ang = Math.atan2(tz[i], tx[i]);
    const ring = []; for (let k = 0; k < 11; k++) { const a = k / 11 * TAU, rr2 = r * (.72 + .5 * vnoise(Math.cos(a) * 1.4 + ph, Math.sin(a) * 1.4, sd)); const lx = Math.cos(a) * rr2, lz = Math.sin(a) * rr2 * el; ring.push([cx + lx * Math.cos(ang) - lz * Math.sin(ang), cz + lx * Math.sin(ang) + lz * Math.cos(ang)]); }
    const ch = chunkAt(cx, cz), mudc = mulC(COL.mud, .55);
    for (let k = 0; k < 11; k++) {
      const p = ring[k], q2 = ring[(k + 1) % 11];
      waterV(ch.water, cx, y, cz, cx, cz, 0, .16); waterV(ch.water, q2[0], y, q2[1], q2[0], q2[1], 0, .16); waterV(ch.water, p[0], y, p[1], p[0], p[1], 0, .16);
      const e = 1.28, m1 = [cx + (p[0] - cx) * e, y - .006, cz + (p[1] - cz) * e], m2 = [cx + (q2[0] - cx) * e, y - .006, cz + (q2[1] - cz) * e];
      for (const v of [[cx, y - .006, cz], m2, m1]) ch.soup.v(v[0], v[1], v[2], 0, 1, 0, mudc[0], mudc[1], mudc[2], v[0] * .25, v[2] * .25, L_COBBLE, .28);
    }
    made++;
  }
  for (const q of ponds) {
    const R2 = q.r + .5, x0 = Math.floor(q.x - R2), x1 = Math.ceil(q.x + R2), z0 = Math.floor(q.z - R2), z1 = Math.ceil(q.z + R2);
    for (let z = z0; z < z1; z++) for (let x = x0; x < x1; x++) {
      if (Math.hypot(x + .5 - q.x, z + .5 - q.z) > R2 + .8) continue;
      const S = chunkAt(x + .5, z + .5).water;
      for (const [dx, dz] of [[0, 0], [0, 1], [1, 1], [0, 0], [1, 1], [1, 0]]) waterV(S, x + dx, q.y, z + dz, (x + dx) * .8, (z + dz) * .8, .02, .14);
    }
  }
  if (bio.key === 'ember') {
    for (let q = 0; q < 46; q++) {
      let x = rng.range(-BH + 1.5, BH - 1.5), z = rng.range(-BH + 1.5, BH - 1.5), a = rng.range(0, TAU);
      if (dfAt(dRoad, x, z) < ROAD_HALF + .6 || dfAt(dStr, x, z) < 1.4 || dfAt(dStr, x, z) > 9 || Math.abs(hAt(x + .6, z) - hAt(x - .6, z)) > .3) continue;
      for (let sgm = 0, m = rng.int(4, 8); sgm < m; sgm++) {
        a += rng.range(-.8, .8); const l = rng.range(.25, .6), x2 = x + Math.cos(a) * l, z2 = z + Math.sin(a) * l, wd = rng.range(.02, .05), wx = -Math.sin(a) * wd, wz = Math.cos(a) * wd;
        if (Math.abs(x2) > BH - .6 || Math.abs(z2) > BH - .6) break;
        const y1 = heightAt(x, z) + .03, y2 = heightAt(x2, z2) + .03, S = chunkAt(x, z).soup, o = { emis: rng.range(.12, .3) }, col = [.75, .2, .03];
        S.quad([x - wx, y1, z - wz], [x + wx, y1, z + wz], [x2 + wx, y2, z2 + wz], [x2 - wx, y2, z2 - wz], col, L_PLAIN, 1, o);
        S.quad([x - wx, y1, z - wz], [x2 - wx, y2, z2 - wz], [x2 + wx, y2, z2 + wz], [x + wx, y1, z + wz], col, L_PLAIN, 1, o);
        x = x2; z = z2;
      }
    }
  }
  let fallAt = null;
  { let last = sn - 1; for (let u = 1; u < sn; u++) if (Math.abs(SP[u][0]) > BH || Math.abs(SP[u][1]) > BH) { last = u; break; }
    const sv = [];
    for (let u = 0; u <= last; u++) {
      let x = SP[u][0], z = SP[u][1];
      if (u === last) { const a = SP[u - 1], t = Math.abs(x) > BH ? (BH - Math.abs(a[0])) / (Math.abs(x) - Math.abs(a[0])) : (BH - Math.abs(a[1])) / (Math.abs(z) - Math.abs(a[1])); x = a[0] + (x - a[0]) * t; z = a[1] + (z - a[1]) * t; }
      const a = SP[Math.max(0, u - 1)], b = SP[Math.min(sn - 1, u + 1)], dx = b[0] - a[0], dz = b[1] - a[1], l = Math.hypot(dx, dz) || 1;
      const w = .72 + .12 * Math.sin(u * .7) + .9 * smooth(3, 0, u * .5);
      sv.push([x, swl[u], z, -dz / l * w, dx / l * w, u * .5, w]);
    }
    for (let u = 0; u < sv.length - 1; u++) {
      const a = sv[u], b = sv[u + 1], S = chunkAt((a[0] + b[0]) / 2, (a[2] + b[2]) / 2).water;
      const q = [[a[0] - a[3], a[1], a[2] - a[4], -a[6], a[5]], [a[0] + a[3], a[1], a[2] + a[4], a[6], a[5]], [b[0] + b[3], b[1], b[2] + b[4], b[6], b[5]], [b[0] - b[3], b[1], b[2] - b[4], -b[6], b[5]]];
      for (const k of [0, 1, 2, 0, 2, 3]) waterV(S, q[k][0], q[k][1], q[k][2], q[k][3], q[k][4], 1.25, .24);
    }
    const e = sv[sv.length - 1], ox = Math.abs(e[0]) > BH - .01 ? Math.sign(e[0]) : 0, oz = ox ? 0 : Math.sign(e[2]);
    const bed = e[1] - .3, top = bed + .5, ax = Math.abs(oz), az = Math.abs(ox), w = e[6];
    let ext = .4; for (let d = 0; d <= 1.0; d += .1) ext = Math.max(ext, wallReach(top, bed - d) + .22);
    ext = Math.min(ext, .95);
    let v0 = 1.45; for (let r = 1; r <= 28; r++) { const tau = 1.6 * r / 28; v0 = Math.max(v0, (wallReach(top, e[1] - 4.5 * tau * tau) + .38 - ext) / tau); }
    v0 = Math.min(v0, 3.2);
    const S = chunkAt(e[0] - ox * .5, e[2] - oz * .5), rc = () => mulC(mixC(COL.stoneD, COL.stone, rng()), .9);
    const at = (o, a, y) => [e[0] + ox * o + ax * a, y, e[2] + oz * o + az * a];
    { const c = at((ext - .5) / 2, 0, bed - .26); S.soup.box(ox ? ext + .5 : w * 2 + 1.1, .5, ox ? w * 2 + 1.1 : ext + .5, c[0], c[1], c[2], rc(), { l: L_ROCK, jit: .04 }); }
    { const c = at(ext * .15, 0, bed - .6); S.soup.rock(w * .6 + .15, c[0], c[1], c[2], rc(), { sq: .55 }); }
    for (const sd2 of [-1, 1]) for (const [o, r, dy] of [[ext * .1, .44, .1], [ext * .62, .32, .02]]) { const c = at(o, sd2 * (w + .34), e[1] + dy); S.soup.rock(r, c[0], c[1], c[2], rc(), { sq: .72 }); }
    { const a0 = [e[0] - e[3], e[1], e[2] - e[4]], a1 = [e[0] + e[3], e[1], e[2] + e[4]], sg = (e[3] * ax + e[4] * az) >= 0 ? 1 : -1, b0 = at(ext + .06, -sg * w, e[1]), b1 = at(ext + .06, sg * w, e[1]), u1 = e[5] + (ext + .06);
      const q = [[a0, -w, e[5]], [a1, w, e[5]], [b1, w, u1], [b0, -w, u1]];
      for (const k of [0, 1, 2, 0, 2, 3]) waterV(S.water, q[k][0][0], q[k][0][1], q[k][0][2], q[k][1], q[k][2], 1.25, .24); }
    fallAt = { x: e[0], y: e[1], z: e[2], ox, oz, w, ext, v0 };
  }

  const B = {
    seed, index, lay, L, n, px, pz, py, tx, tz, pads, kx, zc, keepY, heightAt, hAt, chunks, structs, fires, glows, chunkAt, rng, sd, bio, ponds, env: [],
    dRoadAt: (x, z) => dfAt(dRoad, x, z), dStrAt: (x, z) => dfAt(dStr, x, z), cross: lay.cross, ci0, wlc, swl, SP, fallAt, mirrored: (index % 2) === 1,
    put(T, x, z, o = {}) { const y = o.y === undefined ? heightAt(x, z) + (o.dy || 0) : o.y; chunkAt(x, z).soup.merge(T, { p: [x, y, z], ry: o.ry || 0, r: o.r, s: o.s, tint: o.tint, ao: o.ao === undefined ? [0, .55, .6] : o.ao }); },
  };
  buildBridge(B); buildPads(B); buildKeep(B); buildCave(B); scatterProps(B);
  finalizeBoard(B);
  return B;
}

function pathAt(B, s, out) {
  const f = clamp(s / PATH_STEP, 0, B.n - 1.0001), i = Math.floor(f), t = f - i;
  out.x = lerp(B.px[i], B.px[i + 1], t); out.z = lerp(B.pz[i], B.pz[i + 1], t); out.y = lerp(B.py[i], B.py[i + 1], t);
  out.tx = lerp(B.tx[i], B.tx[i + 1], t); out.tz = lerp(B.tz[i], B.tz[i + 1], t);
  return out;
}
function pathNear(B, x, z, s0, win = 14) {
  const i0 = clamp(Math.round(s0 / PATH_STEP), 0, B.n - 1); let best = 1e9, bi = i0;
  for (let i = Math.max(0, i0 - win); i <= Math.min(B.n - 1, i0 + win); i++) { const d = dist2(x, z, B.px[i], B.pz[i]); if (d < best) { best = d; bi = i; } }
  let s = bi * PATH_STEP;
  const txx = B.tx[bi], tzz = B.tz[bi], along = (x - B.px[bi]) * txx + (z - B.pz[bi]) * tzz;
  s = clamp(s + clamp(along, -PATH_STEP, PATH_STEP), 0, B.L);
  const lat = -(x - B.px[bi]) * tzz + (z - B.pz[bi]) * txx;
  return { s, lat, i: bi };
}

function finalizeBoard(B) {
  const mir = B.mirrored;
  const sw = o => { const t = o.x; o.x = o.z; o.z = t; };
  B.pieces = [];
  B.group = new THREE.Group();
  { const TN = 72, raw = new Float32Array(TN * TN).fill(-99), top = new Float32Array(TN * TN);
    const mark = S => { const P = S.P; for (let i = 0; i < P.length; i += 3) { const ix = Math.floor((P[i] + BH) * 2), iz = Math.floor((P[i + 2] + BH) * 2); if (ix < 0 || iz < 0 || ix >= TN || iz >= TN) continue; const o = iz * TN + ix; if (P[i + 1] > raw[o]) raw[o] = P[i + 1]; } };
    for (const ch of B.chunks) mark(ch.soup); for (const st of B.structs) mark(st.soup);
    for (let z = 0; z < TN; z++) for (let x = 0; x < TN; x++) { let m = -99; for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) { const xx = x + dx, zz = z + dz; if (xx >= 0 && zz >= 0 && xx < TN && zz < TN && raw[zz * TN + xx] > m) m = raw[zz * TN + xx]; } top[z * TN + x] = m; }
    B.topAt = (x, z) => { if (mir) { const t = x; x = z; z = t; } return top[clamp(Math.floor((z + BH) * 2), 0, TN - 1) * TN + clamp(Math.floor((x + BH) * 2), 0, TN - 1)]; }; }
  const mkPiece = (soup, cx, cy, cz, kind, water, extras) => {
    if (mir) { soup.mirrorXZ(); if (water) water.mirrorXZ(); const t = cx; cx = cz; cz = t; }
    const P = soup.P; for (let i = 0; i < P.length; i += 3) { P[i] -= cx; P[i + 1] -= cy; P[i + 2] -= cz; }
    const mesh = new THREE.Mesh(soup.build(), MAT.world); mesh.castShadow = kind !== 'beaconTower' && kind !== 'keep'; mesh.receiveShadow = true; mesh.position.set(cx, cy, cz);
    if (water && water.verts) {
      const W = water.P; for (let i = 0; i < W.length; i += 3) { W[i] -= cx; W[i + 1] -= cy; W[i + 2] -= cz; }
      const wm = new THREE.Mesh(water.build(), MAT.water); wm.receiveShadow = true; mesh.add(wm);
    }
    for (const ex of extras || []) {
      if (mir) ex.soup.mirrorXZ();
      const E = ex.soup.P; for (let i = 0; i < E.length; i += 3) { E[i] -= cx; E[i + 1] -= cy; E[i + 2] -= cz; }
      const em = new THREE.Mesh(ex.soup.build(), ex.mat); em.renderOrder = ex.order || 0; mesh.add(em);
    }
    B.group.add(mesh);
    const piece = { mesh, cx, cy, cz, kind, t: 0, delay: 0, spin: new THREE.Vector3(rr(-1, 1), rr(-1, 1), rr(-1, 1)) };
    B.pieces.push(piece); return piece;
  };
  { let n = 0; for (const ch of B.chunks) n += ch.soup.P.length; const P = new Float32Array(n); let o = 0;
    for (const ch of B.chunks) {
      const sp = ch.soup.P, ss = ch.soup.S;
      for (let i = 0; i < sp.length; i += 9) {
        if (Math.max(sp[i + 1], sp[i + 4], sp[i + 7]) < -1.3) continue;
        const v = i / 3 * 4; if (ss[v] === L_PLAIN && Math.max(ss[v + 2], ss[v + 6], ss[v + 10]) >= .6) continue;
        if (mir) { for (const k of [0, 2, 1]) { P[o++] = sp[i + k * 3 + 2]; P[o++] = sp[i + k * 3 + 1]; P[o++] = sp[i + k * 3]; } } else { for (let k = 0; k < 9; k++) P[o++] = sp[i + k]; }
      }
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(P.subarray(0, o), 3)); g.computeBoundingSphere(); B.casterTris = o / 9; B.casterAll = n / 9;
    B.caster = new THREE.Mesh(g, MAT.caster); B.caster.castShadow = true; B.caster.frustumCulled = false; B.group.add(B.caster); }
  for (const ch of B.chunks) mkPiece(ch.soup, ch.cx, 0, ch.cz, 'chunk', ch.water, ch.extras);
  for (const st of B.structs) mkPiece(st.soup, st.cx, st.cy, st.cz, st.kind, null, st.extras);
  if (mir) {
    const sa = (a, b) => { for (let i = 0; i < a.length; i++) { const t = a[i]; a[i] = b[i]; b[i] = t; } };
    sa(B.px, B.pz); sa(B.tx, B.tz);
    for (const p of B.pads) sw(p); for (const f of B.fires) sw(f); for (const g of B.glows) sw(g); for (const q of B.ponds) sw(q); for (const e of B.env) sw(e);
    sw(B.beacon); sw(B.gate); sw(B.cave); if (B.fallAt) { sw(B.fallAt); const t = B.fallAt.ox; B.fallAt.ox = B.fallAt.oz; B.fallAt.oz = t; }
    const h0 = B.heightAt; B.heightAt = (x, z) => h0(z, x);
    const d0 = B.dRoadAt; B.dRoadAt = (x, z) => d0(z, x);
    for (const sp of B.SP) { const t = sp[0]; sp[0] = sp[1]; sp[1] = t; }
    B.cross = Object.assign({}, B.cross, { x: B.cross.z, z: B.cross.x });
  }
  if (B.fallAt) {
    const f = B.fallAt, ex = -f.oz, ez = f.ox, w = f.w * 1.05, pc = B.pieces.reduce((a, b) => b.kind === 'chunk' && dist2(b.cx, b.cz, f.x, f.z) < dist2(a.cx, a.cz, f.x, f.z) ? b : a, B.pieces[0]);
    const NR = 14, pos = [], uv = [], idx = [];
    for (let r = 0; r <= NR; r++) {
      const v = r / NR, tau = 1.3 * v, out = f.ext + f.v0 * tau, dy = -4.5 * tau * tau, ww = w * (1 + .35 * v);
      for (const sd of [-1, 1]) { pos.push(f.x + f.ox * out + ex * ww * sd - pc.cx, f.y + dy - pc.cy, f.z + f.oz * out + ez * ww * sd - pc.cz); uv.push(sd * .5 + .5, v); }
    }
    for (let i = 0; i < NR; i++) { const a = i * 2; idx.push(a, a + 1, a + 3, a, a + 3, a + 2); }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pos), 3)); g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uv), 2)); g.setIndex(idx);
    const fm = new THREE.Mesh(g, MAT.fall); fm.renderOrder = 2; pc.mesh.add(fm);
  }
  { const n = B.n, W = 14; B.ax = new Float32Array(n); B.az = new Float32Array(n);
    for (let i = 0; i < n; i++) { const w = Math.min(W, i, n - 1 - i); let sx = 0, sz = 0; for (let k = -w; k <= w; k++) { sx += B.px[i + k]; sz += B.pz[i + k]; } B.ax[i] = sx / (2 * w + 1); B.az[i] = sz / (2 * w + 1); } }
  for (const p of B.pads) { p.y = p.y0 + .29; p.tower = null; p.face = 0; const q = pathNear(B, p.x, p.z, p.s, 30); p.s = q.s; p.face = Math.atan2(B.px[q.i] - p.x, B.pz[q.i] - p.z); }
  B.soupsDone = true; setBoardCasting(B, false);
  B.chunks.forEach(c => { c.soup = c.water = null; }); B.structs.forEach(s => { s.soup = null; });
}

function setBoardCasting(B, moving) { B.caster.visible = !moving; for (const p of B.pieces) if (p.kind === 'chunk' || p.kind === 'cave') p.mesh.castShadow = moving; }
function disposeBoard(B) {
  B.group.traverse(o => { if (o.geometry) o.geometry.dispose(); });
  if (B.group.parent) B.group.parent.remove(B.group);
}
