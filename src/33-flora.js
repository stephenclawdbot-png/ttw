
function ribbon(S, a, b, c, d, col, sw) {
  _sa.set(b[0] - a[0], b[1] - a[1], b[2] - a[2]); _sb.set(d[0] - a[0], d[1] - a[1], d[2] - a[2]); _sn.crossVectors(_sa, _sb);
  const l = _sn.length() || 1, nx = _sn.x / l, ny = _sn.y / l, nz = _sn.z / l, P = [a, b, c, d];
  for (const [order, s] of [[[0, 1, 2, 0, 2, 3], 1], [[0, 2, 1, 0, 3, 2], -1]]) for (const k of order) { const p = P[k]; S.v(p[0], p[1], p[2], nx * s, ny * s, nz * s, col[0], col[1], col[2], p[0] * .5, p[1] * .5, L_PLAIN, .8, sw[k], 0); }
}

Object.assign(PROP, {
  pine(S, rng, h) {
    const bark = mulC(COL.bark, .8 + .4 * rng()), lx = rng.range(-.05, .05), lz = rng.range(-.05, .05);
    S.seg([0, -.1, 0], [lx * h, h * .94, lz * h], h * .05, h * .012, bark, { l: L_WOOD, n: 6 });
    const tiers = Math.round(4 + h * .55);
    for (let k = 0; k < tiers; k++) {
      const u = k / (tiers - 1), y = h * (.2 + .66 * u), r = h * (.33 - .23 * u) * rng.range(.88, 1.1), hh = h * (.3 - .11 * u), ph = rng() * TAU;
      const c = mulC(mixC(COL.leaf, COL.leafL, rng() * .6 + u * .25), .8 + .35 * rng());
      S.add(gCyl(9, 0), {
        s: [r, hh, r], p: [lx * y + rng.range(-.03, .03), y + hh * .5, lz * y + rng.range(-.03, .03)], r: [rng.range(-.07, .07), ph, rng.range(-.07, .07)], c, l: L_THATCH, uvs: .5,
        deform: v => { if (v.y < 0) { const j = .8 + .4 * vnoise(Math.atan2(v.z, v.x) * 2.2 + ph, k * 3.1, 5); v.x *= j; v.z *= j; v.y -= hh * .25 * (j - .8); } },
        cf: v => .62 + .38 * sat(Math.hypot(v.x, v.z) / r), swayf: v => .14 * Math.hypot(v.x, v.z) / r * (.4 + u),
      });
    }
  },
  willow(S, rng, h) {
    const bark = mulC(COL.bark, .85 + .3 * rng());
    let p = [0, -.1, 0], d = [rng.range(-.25, .25), 1, rng.range(-.25, .25)], r = h * .085; const tips = [];
    for (let k = 0; k < 4; k++) {
      const l = h * rng.range(.15, .2), q = [p[0] + d[0] * l, p[1] + d[1] * l, p[2] + d[2] * l]; S.seg(p, q, r, r * .8, bark, { l: L_WOOD, n: 6 }); p = q; r *= .8;
      d = [d[0] + rng.range(-.4, .4), 1, d[2] + rng.range(-.4, .4)]; const dl = Math.hypot(d[0], d[1], d[2]); d = d.map(v => v / dl);
    }
    for (let k = 0; k < 4; k++) { const a = rng() * TAU + k * 1.6, len = h * rng.range(.28, .42), q = [p[0] + Math.cos(a) * len * .8, p[1] + len * rng.range(.1, .45), p[2] + Math.sin(a) * len * .8]; S.seg(p, q, r, r * .45, bark, { l: L_WOOD, n: 5, sway: .12 }); tips.push(q); }
    tips.push([p[0], p[1] + h * .08, p[2]]);
    for (const t of tips) for (let j = 0; j < 2; j++) {
      const rb = h * rng.range(.2, .29), c = mulC(mixC(COL.leaf, COL.leafL, rng()), .75 + .4 * rng()), cx = t[0] + rng.range(-.25, .25), cy = t[1] + rng.range(-.05, .3), cz = t[2] + rng.range(-.25, .25);
      S.ico(rb, cx, cy, cz, c, { sc: [1.15, .48, 1.15], d: 1, l: L_THATCH, sway: .2, r: [rng.range(-.2, .2), rng() * TAU, rng.range(-.2, .2)], cf: v => .6 + .4 * sat(v.y / (rb * .5) + .5) });
      for (let s = 0; s < 7; s++) {
        const a = rng() * TAU, rad = rb * rng.range(.45, 1.05), x = cx + Math.cos(a) * rad, z = cz + Math.sin(a) * rad, len = rng.range(.5, 1.5), y0 = cy - rb * .1, wa = rng() * TAU, wx = Math.cos(wa) * .045, wz = Math.sin(wa) * .045, cc = mulC(mixC(COL.leaf, COL.leafL, rng()), .6 + .3 * rng());
        ribbon(S, [x - wx, y0, z - wz], [x + wx, y0, z + wz], [x + wx * .4, y0 - len, z + wz * .4], [x - wx * .4, y0 - len, z - wz * .4], cc, [.2, .2, .95, .95]);
      }
    }
    for (let k = 0; k < 4; k++) { const a = k * 1.57 + rng(); S.seg([Math.cos(a) * h * .04, h * .17, Math.sin(a) * h * .04], [Math.cos(a) * h * .22, -.1, Math.sin(a) * h * .22], h * .03, h * .018, bark, { l: L_WOOD, n: 5 }); }
  },
  charred(S, rng, h) { PROP.tree(S, rng, h, { bark: mulC(COL.bark, .7 + .3 * rng()), tip: [.6, .16, .03], tipEmis: .09 }); },
  palm(S, rng, h) {
    const bark = mulC(C(0x6a5238), .85 + .3 * rng()), a0 = rng() * TAU, bend = rng.range(.1, .3), N = 7;
    let p = [0, -.1, 0];
    for (let k = 0; k < N; k++) { const u = (k + 1) / N, off = bend * h * u * u, q = [Math.cos(a0) * off, h * u, Math.sin(a0) * off], r = h * (.052 - .02 * u); S.seg(p, q, r * (k & 1 ? 1.1 : 1), r * .9, mulC(bark, k & 1 ? .82 : 1.05), { l: L_WOOD, n: 6, sway: u > .6 ? .06 : 0 }); p = q; }
    const top = p, nf = rng.int(8, 10);
    for (let f = 0; f < nf; f++) {
      const a = f / nf * TAU + rng.range(-.25, .25), len = h * rng.range(.34, .46), up = rng.range(.2, .62), c = mulC(mixC(COL.leaf, COL.leafL, rng()), .8 + .4 * rng()), M = 5;
      let prev = null;
      for (let k = 0; k <= M; k++) {
        const u = k / M, out = len * u, y = top[1] + len * (up * u - .95 * u * u), cx = top[0] + Math.cos(a) * out, cz = top[2] + Math.sin(a) * out, w = len * .2 * Math.sin(Math.min(1, u * 1.1 + .1) * PI) + .015, sx = -Math.sin(a) * w, sz = Math.cos(a) * w, sw = .2 + .8 * u;
        const cur = { c: [cx, y, cz], l: [cx + sx, y - w * .6, cz + sz], r: [cx - sx, y - w * .6, cz - sz], sw };
        if (prev) { ribbon(S, prev.c, cur.c, cur.l, prev.l, c, [prev.sw, sw, sw, prev.sw]); ribbon(S, prev.c, prev.r, cur.r, cur.c, mulC(c, .8), [prev.sw, prev.sw, sw, sw]); }
        prev = cur;
      }
    }
    for (let k = 0; k < 3; k++) S.ico(h * .03, top[0] + rng.range(-.12, .12), top[1] - .1, top[2] + rng.range(-.12, .12), C(0x3a2a1c), { d: 0 });
  },
  cactus(S, rng) {
    const c = mulC(C(0x4f6a3c), .8 + .3 * rng()), hh = rng.range(1.0, 1.9), r = .17;
    S.cyl(r, hh, 0, hh / 2 - .05, 0, c, { n: 7 }); S.sph(r, 0, hh - .05, 0, c, { sc: [1, .8, 1], w: 7, h: 4 });
    for (let k = 0, n = rng.int(0, 3); k < n; k++) {
      const a = rng() * TAU, y = hh * rng.range(.35, .6), l = rng.range(.26, .4), up = rng.range(.3, .7), x = Math.cos(a) * l, z = Math.sin(a) * l;
      S.seg([0, y, 0], [x, y + .04, z], r * .62, r * .62, c, { n: 6 }); S.seg([x, y, z], [x, y + up, z], r * .62, r * .58, c, { n: 6 }); S.sph(r * .6, x, y + up, z, c, { w: 6, h: 4 });
    }
    if (rng() < .4) S.ico(.06, 0, hh + .1, 0, C(0xe86a8a), { d: 0, emis: .03 });
  },
  reeds(S, rng) {
    for (let k = 0, n = rng.int(5, 9); k < n; k++) {
      const x = rng.range(-.3, .3), z = rng.range(-.3, .3), hh = rng.range(.6, 1.35), lx = rng.range(-.18, .18), lz = rng.range(-.18, .18), c = mulC(mixC(COL.tuftA, COL.tuftB, rng()), .8 + .4 * rng());
      S.seg([x, -.08, z], [x + lx * .4, hh * .5, z + lz * .4], .022, .018, c, { n: 3, jit: 0 });
      S.seg([x + lx * .4, hh * .5, z + lz * .4], [x + lx, hh, z + lz], .018, .008, c, { n: 3, sway: .5, jit: 0 });
      if (rng() < .45) S.seg([x + lx * .8, hh * .8, z + lz * .8], [x + lx * 1.02, hh * 1.02, z + lz * 1.02], .042, .038, C(0x4a3220), { n: 5, sway: .5 });
    }
  },
  lily(S, rng) {
    for (let k = 0, n = rng.int(2, 4); k < n; k++) {
      const x = rng.range(-.4, .4), z = rng.range(-.4, .4), r = rng.range(.13, .26);
      S.cyl(r, .012, x, .006, z, mulC(mixC(COL.leaf, COL.leafL, rng()), 1.1 + .4 * rng()), { n: 7, jit: .05, r: [0, rng() * TAU, 0] });
      if (rng() < .3) S.ico(.05, x + r * .3, .05, z, C(0xe8c8d8), { d: 0, emis: .03, sc: [1, .7, 1] });
    }
  },
  shroom(S, rng) {
    const col = rng() < .5 ? C(0x4fe0c0) : C(0x7fd0ff);
    for (let k = 0, n = rng.int(3, 6); k < n; k++) {
      const x = rng.range(-.3, .3), z = rng.range(-.3, .3), hh = rng.range(.14, .44), r = hh * rng.range(.45, .7);
      S.cyl(r * .22, hh, x, hh / 2, z, C(0xb8c8b8), { n: 5, emis: .02 });
      S.add(gDome(7, 3), { s: [r, r * .7, r], p: [x, hh - r * .1, z], c: mulC(col, .5), emis: .075, jit: .1, smooth: true });
    }
  },
  log(S, rng) {
    const len = rng.range(1.5, 2.6), r = rng.range(.14, .2), bark = mulC(COL.bark, .9 + .4 * rng());
    S.seg([-len / 2, r * .8, 0], [len / 2, r * .9, 0], r, r * .85, bark, { l: L_WOOD, n: 7 });
    for (const s of [-1, 1]) S.cyl(r * (s < 0 ? .98 : .83), .02, s * len / 2, r * (s < 0 ? .8 : .9), 0, mulC(COL.woodL, .7), { n: 7, l: L_WOOD, r: [0, 0, HPI] });
    for (let k = 0; k < 2; k++) { const x = rng.range(-len * .3, len * .3), a = rng.range(-1, 1); S.seg([x, r, 0], [x + rng.range(-.15, .15), r + .35 * Math.cos(a), .35 * Math.sin(a)], r * .35, r * .2, bark, { l: L_WOOD, n: 5 }); }
  },
  basalt(S, rng) {
    const n = rng.int(5, 10), R = .3, G = [[0, 0], [1, 0], [-1, 0], [.5, .87], [-.5, .87], [.5, -.87], [-.5, -.87], [1.5, .87], [-1.5, -.87], [0, 1.73]];
    for (let k = 0; k < n; k++) {
      const q = G[k], hh = rng.range(.35, 2.2) * (k < 3 ? 1.25 : .8), c = mulC(mixC(COL.stoneD, COL.stone, rng() * .7), .8 + .3 * rng());
      S.cyl(R * 1.04, hh, q[0] * R * 1.75, hh / 2 - .1, q[1] * R * 1.75, c, { n: 6, l: L_ROCK, r: [0, PI / 6, 0], grad: [-hh / 2, hh * .1, .65] });
      S.cyl(R * .9, .05, q[0] * R * 1.75, hh - .08, q[1] * R * 1.75, mulC(c, 1.3), { n: 6, l: L_ROCK, r: [0, PI / 6, 0] });
    }
  },
  spire(S, rng, hh, cols) {
    let y = 0, r = hh * rng.range(.2, .28), x = 0, z = 0, k = rng.int(0, 3);
    while (y < hh && r > .12) { S.rock(r, x, y + r * .4, z, mulC(cols[k % cols.length], .8 + .3 * rng()), { sq: .62, d: 1 }); y += r * .78; r *= rng.range(.8, .93); x += rng.range(-.08, .08); z += rng.range(-.08, .08); k++; }
  },
  vent(S, rng) {
    for (let k = 0; k < 7; k++) { const a = k / 7 * TAU + rng() * .3, r = rng.range(.2, .34); S.rock(r, Math.cos(a) * .52, r * .3, Math.sin(a) * .52, mulC(mixC(COL.stoneD, COL.stone, rng()), .8), { sq: .8 }); }
    S.cyl(.4, .06, 0, .09, 0, [.8, .22, .03], { n: 8, emis: .3, jit: 0 });
  },
  jar(S, rng) {
    const c = mulC(C(0x9a5a3c), .8 + .35 * rng()), s = rng.range(.8, 1.25);
    S.cyl(.2 * s, .22 * s, 0, .11 * s, 0, c, { n: 8, rt: .62 }); S.cyl(.2 * s, .2 * s, 0, .32 * s, 0, c, { n: 8, rt: 1.0 }); S.cyl(.2 * s, .14 * s, 0, .49 * s, 0, c, { n: 8, rt: 2.0 });
    S.cyl(.09 * s, .1 * s, 0, .6 * s, 0, mulC(c, .9), { n: 8, rt: 1.25 }); S.cyl(.105 * s, .02 * s, 0, .655 * s, 0, COL.black, { n: 8, jit: 0 });
  },
  icicles(S, rng, len, n, maxH) {
    for (let k = 0; k < n; k++) { const x = (k + .5) / n * len - len / 2 + rng.range(-.05, .05), h = rng.range(.15, maxH) * (rng() < .2 ? 1.5 : 1); S.cone(.04 + .035 * rng(), h, x, -h / 2, rng.range(-.04, .04), COL.ice, { n: 5, r: [PI, 0, 0], rough: .14, emis: .012, jit: .1 }); }
  },
  drift(S, rng, r, col) { S.ico(r, 0, r * .04, 0, col, { sc: [1.25, .3, .85], d: 2, smooth: true, rough: .75, jit: .03 }); },
  crystal(S, rng, col, emis) {
    for (let k = 0, n = rng.int(3, 6); k < n; k++) { const hh = rng.range(.3, .9) * (k ? .7 : 1.25), a = rng() * TAU, d = k ? rng.range(.12, .32) : 0; S.add(gOct(), { s: [hh * .22, hh, hh * .22], p: [Math.cos(a) * d, hh * .5, Math.sin(a) * d], r: [rng.range(-.4, .4), rng() * TAU, rng.range(-.4, .4)], c: mulC(col, .8 + .4 * rng()), rough: .12, emis }); }
  },
});

const BIOME_DRESS = {
  ashen(X) { for (let k = 0; k < 3; k++) X.drop(T => PROP.log(T, X.rng), .9, { far: 1.2 }); },
  frost(X) {
    const { B, rng, drop } = X, snow = B.bio.coverCol;
    for (let k = 0; k < 30; k++) { const r = rng.range(.5, 1.25); drop(T => PROP.drift(T, rng, r, snow), r * .35, { roadMin: .5, ao: null, steep: true }); }
    for (const q of B.ponds) for (let k = 0; k < 2; k++) { const a = rng() * TAU, d = q.r + rng.range(.9, 1.3); X.at(q.x + Math.cos(a) * d, q.z + Math.sin(a) * d, T => PROP.crystal(T, rng, COL.ice, .03), .5); }
    for (let k = 0; k < 5; k++) drop(T => PROP.crystal(T, rng, COL.ice, .03), .5, { water: 3.2 });
    for (let k = 0; k < 2; k++) drop(T => PROP.log(T, rng), .9, { far: 1.2 });
    if (B.ponds[0]) B.env.push({ x: B.ponds[0].x, y: B.ponds[0].y + .9, z: B.ponds[0].z, c: 0x7fc8ff, I: 6, d: 7 });
  },
  fen(X) {
    const { B, rng, drop } = X;
    for (let k = 0; k < 52; k++) {
      const u = rng.int(2, B.SP.length - 2), a = B.SP[u - 1], b = B.SP[u + 1], dx = b[0] - a[0], dz = b[1] - a[1], l = Math.hypot(dx, dz) || 1, off = rng.sign() * rng.range(.95, 1.9), x = B.SP[u][0] - dz / l * off, z = B.SP[u][1] + dx / l * off;
      if (Math.abs(x) > BH - .8 || Math.abs(z) > BH - .8 || B.dRoadAt(x, z) < ROAD_HALF + .9) continue;
      X.at(x, z, T => PROP.reeds(T, rng), 0);
    }
    for (const q of B.ponds) {
      for (let k = 0; k < 9; k++) { const a = rng() * TAU, d = q.r * rng.range(.75, 1.2); X.at(q.x + Math.cos(a) * d, q.z + Math.sin(a) * d, T => PROP.reeds(T, rng), 0); }
      for (let k = 0; k < 4; k++) { const a = rng() * TAU, d = q.r * rng.range(0, .55), T = new Soup(); PROP.lily(T, rng); B.put(T, q.x + Math.cos(a) * d, q.z + Math.sin(a) * d, { y: q.y + .012, ao: null }); }
    }
    const sh = [];
    for (let k = 0; k < 16; k++) { const p = drop(T => PROP.shroom(T, rng), .35, { ao: null }); if (p) sh.push(p); }
    for (let k = 0; k < Math.min(2, sh.length); k++) B.env.push({ x: sh[k][0], y: X.H(sh[k][0], sh[k][1]) + .7, z: sh[k][1], c: 0x45e0b8, I: 5, d: 6 });
    for (let k = 0; k < 5; k++) drop(T => PROP.log(T, rng), .9, { far: 1.2 });
  },
  ember(X) {
    const { B, rng, drop } = X, cols = [COL.stoneD, COL.stone, C(0x5a2a22), COL.stoneD];
    for (let k = 0; k < 9; k++) drop(T => PROP.basalt(T, rng), 1.0, { far: 1.4 });
    for (let k = 0; k < 6; k++) { const hh = rng.range(2.0, 4.2); drop(T => PROP.spire(T, rng, hh, cols), hh * .28, { far: 1.6, steep: true }); }
    for (let k = 0; k < 4; k++) { const p = drop(T => PROP.vent(T, rng), .8, { far: 2.2 }); if (p) B.fires.push({ x: p[0], y: X.H(p[0], p[1]) + .12, z: p[1], size: .5, fx: { layers: 0, smoke: 1.3, embers: 1.1, glow: .55 } }); }
    B.env.push({ x: B.bridge.x, y: B.wlc + .55, z: B.bridge.z, c: 0xff5a1e, I: 44, d: 9, flick: 1 });
    if (B.ponds[0]) { const q = B.ponds[0]; B.env.push({ x: q.x, y: q.y + .7, z: q.z, c: 0xff5a1e, I: 40, d: 9, flick: 1 }); }
    if (B.fallAt) B.env.push({ x: B.fallAt.x - B.fallAt.ox * 1.2, y: B.fallAt.y + .6, z: B.fallAt.z - B.fallAt.oz * 1.2, c: 0xff5a1e, I: 36, d: 8, flick: 1 });
  },
  dunes(X) {
    const { B, rng, drop } = X, cols = B.bio.strata.map(h => C(h));
    for (let k = 0; k < 11; k++) drop(T => PROP.cactus(T, rng), .4, { far: .9 });
    for (let k = 0; k < 6; k++) { const hh = rng.range(2.2, 4.6); drop(T => PROP.spire(T, rng, hh, cols), hh * .28, { far: 1.6, steep: true }); }
    for (const q of B.ponds) {
      for (let k = 0; k < 4; k++) { const a = rng() * TAU, d = q.r + rng.range(1.1, 1.9), h = rng.range(3, 4.4); X.at(q.x + Math.cos(a) * d, q.z + Math.sin(a) * d, T => PROP.palm(T, rng, h), .5); }
      for (let k = 0; k < 7; k++) { const a = rng() * TAU, d = q.r * rng.range(.8, 1.2); X.at(q.x + Math.cos(a) * d, q.z + Math.sin(a) * d, T => PROP.reeds(T, rng), 0); }
    }
    for (const pad of B.pads) {
      if (rng() < .5) continue;
      const a = rng() * TAU, x = pad.x + Math.cos(a) * 2.3, z = pad.z + Math.sin(a) * 2.3; if (!X.free(x, z, .5, .3)) continue;
      const T = new Soup(); PROP.jar(T, rng); if (rng() < .7) { const J = new Soup(); PROP.jar(J, rng); T.merge(J, { p: [.42, 0, .1] }); } if (rng() < .4) { const J = new Soup(); PROP.jar(J, rng); T.merge(J, { p: [.15, 0, .45], r: [1.3, rng() * 3, 0] }); }
      X.at(x, z, () => T, .7, T);
    }
  },
};
