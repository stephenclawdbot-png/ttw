
SPEC.golem = { hip: .5, pelvisH: .1, torsoH: .56, shX: .36, shY: .44, uArm: .26, lArm: .38, hipX: .15, uLeg: .22, lLeg: .24, stride: .42, lean: .1, stoop: .16, eyeX: .04, eyeY: .1, eyeZ: .16, top: 1.35 };

function golemKit(cap) {
  const k = {}, limb = cap * 2, c = [.34, .34, .37], cd = [.22, .22, .25], gl = [1, .9, .8], rk = () => ({ l: L_ROCK, jit: .08 });
  k.pelvis = new PartBatch(S => { S.rock(.2, 0, 0, 0, cd, { sq: .7 }); }, cap, { rad: .2, shadow: false });
  k.torso = new PartBatch(S => {
    S.rock(.3, 0, .2, 0, c, { sq: .9 }); S.rock(.27, 0, .4, -.02, c, { sq: .7 }); S.rock(.13, -.1, .56, -.12, cd, { sq: .9 });
    for (const s of [-1, 1]) S.rock(.19, s * .33, .44, 0, cd, { sq: .8 });
    S.box(.035, .26, .03, .06, .26, .28, gl, { emis: .1, jit: 0, r: [0, 0, .35] }); S.box(.03, .18, .03, -.07, .3, .28, gl, { emis: .1, jit: 0, r: [0, 0, -.5] }); S.box(.03, .14, .03, 0, .14, .27, gl, { emis: .1, jit: 0, r: [0, 0, 1.2] });
  }, cap, { rad: .3 });
  k.head = new PartBatch(S => { S.rock(.14, 0, .1, .03, c, { sq: .85 }); S.box(.22, .05, .1, 0, .17, .1, cd, rk()); S.box(.15, .035, .03, 0, .1, .155, gl, { emis: .22, jit: 0 }); }, cap, { rad: .14, shadow: false });
  k.uArm = new PartBatch(S => { S.rock(.13, 0, -.12, 0, c, { sq: 1.25 }); }, limb, { rad: .12, shadow: false });
  k.lArm = new PartBatch(S => { S.rock(.17, 0, -.15, 0, c, { sq: 1.15 }); S.rock(.15, 0, -.36, .02, cd, { sq: .9 }); }, limb, { rad: .15, shadow: false });
  k.uLeg = new PartBatch(S => { S.rock(.15, 0, -.1, 0, cd, { sq: 1.1 }); }, limb, { rad: .13, shadow: false });
  k.lLeg = new PartBatch(S => { S.rock(.15, 0, -.12, 0, c, { sq: 1.1 }); S.box(.24, .1, .32, 0, -.24, .04, cd, rk()); }, limb, { rad: .13, shadow: false });
  return k;
}

function initBestiary() {
  const I = KIT.item, cloth = C(0x3b3048), clothL = C(0x6a4a78), wrap = C(0xcdbf9a), N = { rad: .2, shadow: false };
  KIT.golem = golemKit(8);
  I.hood = new PartBatch(S => {
    S.add(gDome(8, 4), { s: [.2, .17, .21], p: [0, .19, -.03], c: cloth, l: L_CLOTH });
    S.box(.34, .24, .1, 0, .1, -.15, cloth, { l: L_CLOTH }); S.box(.3, .05, .05, 0, .2, .15, clothL, { l: L_CLOTH });
    for (const s of [-1, 1]) S.box(.06, .26, .2, s * .18, .1, -.04, mulC(cloth, .8), { l: L_CLOTH });
  }, 12, N);
  I.robe = new PartBatch(S => {
    S.add(gCyl(8, .5, true), { s: [.3, 1.12, .27], p: [0, -.12, 0], c: cloth, l: L_CLOTH, dbl: true, deform: v => { if (v.y < 0) { const j = .85 + .3 * vnoise(Math.atan2(v.z, v.x) * 2 + 3, 1, 7); v.x *= j; v.z *= j; v.y += (j - 1) * .25; } }, cf: v => .7 + .3 * sat(v.y / .56 + .5) });
    S.box(.46, .1, .28, 0, .4, 0, clothL, { l: L_CLOTH }); S.cyl(.2, .05, 0, .02, 0, COL.rope, { n: 8 });
  }, 12, N);
  I.staff = new PartBatch(S => {
    S.seg([0, -.55, 0], [0, .95, 0], .028, .024, COL.woodD, { l: L_WOOD, n: 5 });
    for (let a = 0; a < 3; a++) S.seg([0, .9, 0], [Math.cos(a * 2.1) * .09, 1.08, Math.sin(a * 2.1) * .09], .02, .008, COL.bone, { l: L_BONE, n: 4 });
    S.ico(.075, 0, 1.06, 0, [.35, 1, .5], { d: 1, emis: .2, jit: 0 });
  }, 12, N);
  I.drum = new PartBatch(S => {
    const T = new Soup(); T.cyl(.2, .2, 0, 0, 0, C(0x7a2c24), { n: 10, l: L_WOOD }); T.cyl(.205, .03, 0, .1, 0, C(0xc9b28a), { n: 10 }); T.cyl(.212, .025, 0, -.09, 0, COL.brass, { n: 10, l: L_METAL }); T.cyl(.212, .025, 0, .08, 0, COL.brass, { n: 10, l: L_METAL });
    S.merge(T, { p: [0, .1, .28], r: [.5, 0, 0], ao: null }); S.box(.05, .5, .03, .05, .26, .13, COL.leather, { r: [0, 0, .55] });
  }, 8, N);
  I.standard = new PartBatch(S => {
    S.seg([0, .1, -.14], [0, 1.55, -.2], .022, .018, COL.woodD, { l: L_WOOD, n: 4 }); S.seg([-.2, 1.42, -.2], [.2, 1.42, -.2], .016, .016, COL.woodD, { l: L_WOOD, n: 4 });
    clothPanel(S, { x0: -.18, x1: .18, yTop: 1.41, len: .56, z: -.2, col: COL.clothR, col2: mulC(COL.gold, .6), rng: makeRng(21), sway: 0, nx: 3, ny: 5 });
    PROP.skull(S, 0, 1.62, -.2, .07, 0);
  }, 8, { rad: .3, shadow: false });
  I.stick = new PartBatch(S => { S.seg([0, -.05, 0], [0, .3, 0], .02, .018, COL.bone, { l: L_BONE, n: 4 }); S.ico(.04, 0, .32, 0, COL.boneD, { d: 0, l: L_BONE }); }, 8, N);
  I.keg = new PartBatch(S => {
    const T = new Soup(); PROP.barrel(T, 0, 0, 0, .8, makeRng(3)); S.merge(T, { p: [.215, .26, -.24], r: [0, 0, HPI], ao: null });
    S.seg([0, .4, -.24], [.05, .52, -.22], .012, .01, COL.rope, { n: 3 }); S.ico(.035, .05, .53, -.22, COL.ember, { d: 0, emis: .6, jit: 0 });
    S.box(.05, .5, .03, 0, .22, .12, COL.leather, { r: [0, 0, .5] });
  }, 12, N);
  I.wraps = new PartBatch(S => {
    let k = 0; for (const [y, w, rz] of [[.12, .3, .1], [.2, .33, -.12], [.29, .35, .08], [.37, .37, -.06]]) S.box(w, .05, .25, 0, y, 0, mulC(wrap, .8 + .1 * (k++ & 1) * 3), { l: L_CLOTH, r: [0, 0, rz] });
    S.box(.05, .3, .02, .1, -.08, .12, wrap, { l: L_CLOTH, r: [0, 0, .15] });
  }, 12, N);
  I.wrapHead = new PartBatch(S => { S.cyl(.16, .07, 0, .26, 0, wrap, { n: 8, l: L_CLOTH }); S.cyl(.158, .05, 0, .09, .01, mulC(wrap, .85), { n: 8, l: L_CLOTH }); S.box(.04, .22, .02, .1, .06, -.15, wrap, { l: L_CLOTH, r: [.3, 0, .2] }); }, 12, N);
  I.crown = new PartBatch(S => {
    const g = mulC(COL.gold, .9);
    S.cyl(.165, .07, 0, .3, 0, g, { n: 8, l: L_METAL, rough: .35, emis: .03 });
    for (let a = 0; a < 6; a++) S.cone(.03, .12, Math.cos(a * 1.047) * .15, .39, Math.sin(a * 1.047) * .15, g, { n: 4, l: L_METAL, rough: .35, emis: .03 });
    for (const s of [-1, 1]) S.box(.05, .3, .16, s * .17, .12, -.02, C(0x2a4a8a), { l: L_CLOTH });
    S.ico(.03, 0, .31, .16, [.2, .9, .8], { d: 0, emis: .3, jit: 0 });
  }, 2, N);
  I.khopesh = new PartBatch(S => {
    const g = mulC(COL.gold, .85); S.box(.04, .2, .04, 0, 0, 0, COL.leather, {}); S.box(.14, .03, .05, 0, .11, 0, g, { l: L_METAL });
    let p = [.24, 0]; for (const [y, z] of [[.4, .03], [.52, .1], [.62, .2], [.66, .32]]) { const dy = y - p[0], dz = z - p[1], l = Math.hypot(dy, dz); S.box(.02, l + .02, .075, 0, (y + p[0]) / 2, (z + p[1]) / 2, g, { l: L_METAL, rough: .35, r: [Math.atan2(dz, dy), 0, 0] }); p = [y, z]; }
    S.box(.02, .14, .07, 0, .18, 0, g, { l: L_METAL, rough: .35 });
  }, 2, N);
  I.iceclub = new PartBatch(S => {
    S.seg([0, -.12, 0], [0, .5, 0], .045, .06, COL.wood, { l: L_WOOD, n: 6 });
    for (let a = 0; a < 5; a++) S.add(gOct(), { s: [.09, .25, .09], p: [Math.cos(a * 1.26) * .07, .6 + (a & 1) * .06, Math.sin(a * 1.26) * .07], r: [Math.sin(a * 1.26) * .5, a, -Math.cos(a * 1.26) * .5], c: COL.ice, rough: .15, emis: .05 });
  }, 2, { rad: .1, shadow: false });

  KIT.spider = {
    body: new PartBatch(S => {
      const c = [.3, .27, .27], cd = [.19, .17, .18];
      S.ico(.2, 0, .03, -.2, c, { sc: [.95, .8, 1.25], d: 1 }); S.ico(.13, 0, 0, .08, cd, { sc: [1, .72, 1.1], d: 1 });
      S.box(.07, .02, .13, 0, .19, -.2, [1, .25, .12], { emis: .12, jit: 0 });
      for (const s of [-1, 1]) { S.cone(.025, .1, s * .045, -.06, .2, C(0x1a1414), { n: 4, r: [PI - .5, 0, 0] }); for (const [ex, ey, ez] of [[.035, .06, .19], [.075, .05, .16]]) S.box(.022, .022, .02, s * ex, ey, ez, COL.black, { jit: 0 }); }
    }, 70, { rad: .2 }),
    leg: new PartBatch(S => { const c = [.2, .18, .19]; S.seg([0, 0, 0], [.2, .15, 0], .024, .02, c, { n: 4 }); S.seg([.2, .15, 0], [.4, -.17, 0], .02, .009, c, { n: 4 }); }, 560, { rad: .05, shadow: false }),
  };
  KIT.wolf = {
    body: new PartBatch(S => {
      const f = [.3, .3, .33], fd = [.2, .2, .23];
      S.ico(.2, 0, .02, .16, f, { sc: [.78, .95, 1.15], d: 1 }); S.ico(.16, 0, 0, -.2, fd, { sc: [.78, .85, 1.35], d: 1 }); S.ico(.1, 0, 0, .3, [.42, .42, .45], { sc: [.7, .7, .6], d: 1 });
      for (let k = 0; k < 4; k++) S.cone(.045, .13, 0, .2 - k * .02, .2 - k * .13, fd, { n: 4, r: [-.5, 0, 0] });
      S.seg([0, .08, .3], [0, .2, .46], .11, .085, f, { n: 6 });
      S.ico(.105, 0, .24, .52, f, { sc: [.9, .85, 1.1], d: 1 }); S.box(.085, .07, .17, 0, .21, .66, fd, {}); S.box(.04, .03, .03, 0, .235, .75, COL.black, { jit: 0 }); S.box(.07, .025, .14, 0, .16, .64, C(0x3a1a18), {});
      for (const s of [-1, 1]) { S.cone(.035, .1, s * .065, .35, .48, fd, { n: 4 }); S.box(.025, .022, .02, s * .05, .27, .615, COL.black, { jit: 0 }); S.box(.012, .035, .012, s * .03, .165, .7, COL.bone, { jit: 0 }); }
    }, 28, { rad: .22 }),
    leg: new PartBatch(S => { const fd = [.2, .2, .23]; S.seg([0, 0, 0], [0, -.2, -.03], .055, .038, fd, { n: 5 }); S.seg([0, -.2, -.03], [0, -.39, .02], .034, .026, fd, { n: 5 }); S.box(.06, .035, .09, 0, -.4, .04, [.13, .13, .15], {}); }, 112, { rad: .05, shadow: false }),
    tail: new PartBatch(S => { S.seg([0, 0, 0], [0, -.07, -.3], .055, .02, [.2, .2, .23], { n: 5 }); }, 28, { rad: .05, shadow: false }),
  };
  KIT.wraith = {
    body: new PartBatch(S => {
      const c = [.2, .25, .32], cd = [.12, .15, .2];
      S.add(gCyl(8, .32, true), { s: [.36, .96, .36], p: [0, .5, 0], c, l: L_CLOTH, dbl: true, emis: .012, deform: v => { if (v.y < 0) { const j = .75 + .55 * vnoise(Math.atan2(v.z, v.x) * 2.3 + 1, 2, 9); v.x *= j; v.z = v.z * j - .12; v.y += (j - 1) * .3; } }, cf: v => .55 + .45 * sat(v.y / .48 + .5) });
      S.ico(.22, 0, .9, -.02, cd, { sc: [1.3, .45, .95], d: 1, l: L_CLOTH });
      S.add(gDome(8, 4), { s: [.19, .2, .2], p: [0, 1.06, -.03], c: cd, l: L_CLOTH }); S.box(.3, .22, .1, 0, .98, -.14, cd, { l: L_CLOTH });
      S.sph(.115, 0, 1.03, .05, COL.bone, { sc: [1, 1.05, 1], l: L_BONE, w: 7, h: 5, smooth: false, emis: .03 }); S.box(.11, .06, .08, 0, .93, .1, COL.boneD, { l: L_BONE });
      for (const s of [-1, 1]) S.box(.045, .045, .03, s * .045, 1.04, .15, COL.black, { jit: 0 });
    }, 30, { rad: .3 }),
    arm: new PartBatch(S => { const c = [.16, .2, .27]; S.seg([0, 0, 0], [0, -.1, .3], .075, .05, c, { l: L_CLOTH, n: 5 }); for (let k = -1; k <= 1; k++) S.seg([k * .025, -.1, .3], [k * .05, -.16, .42], .012, .006, COL.bone, { n: 3, l: L_BONE }); }, 60, { rad: .08, shadow: false }),
  };
  KIT.garg = {
    body: new PartBatch(S => {
      const st = [.3, .31, .35], sd = [.2, .21, .24];
      S.ico(.17, 0, 0, 0, st, { sc: [.9, 1.0, 1.05], d: 1, l: L_ROCK }); S.ico(.11, 0, .13, .17, st, { sc: [.95, .9, 1.05], d: 1, l: L_ROCK }); S.box(.1, .06, .1, 0, .08, .27, sd, { l: L_ROCK });
      for (const s of [-1, 1]) {
        S.seg([s * .06, .2, .14], [s * .13, .3, .04], .03, .02, sd, { n: 4 }); S.seg([s * .13, .3, .04], [s * .12, .36, -.08], .02, .006, sd, { n: 4 }); S.box(.03, .03, .02, s * .045, .15, .265, COL.black, { jit: 0 });
        S.seg([s * .12, -.02, .08], [s * .15, -.16, .2], .04, .028, sd, { n: 4 }); S.seg([s * .09, -.1, -.08], [s * .12, -.24, 0], .045, .03, sd, { n: 4 });
      }
      S.seg([0, -.05, -.15], [0, -.14, -.42], .04, .012, sd, { n: 4 }); S.cone(.04, .08, 0, -.15, -.46, sd, { n: 4, r: [-HPI, 0, 0] });
    }, 24, { rad: .2 }),
    wing: new PartBatch(S => {
      const c = [.26, .27, .31], c2 = [.17, .18, .21], pts = [[0, 0, .12], [.3, .06, .2], [.74, .04, .1], [.66, 0, -.1], [.46, 0, -.04], [.36, 0, -.24], [.18, 0, -.1], [0, 0, -.18]];
      for (let i = 1; i < pts.length - 1; i++) { S.tri(pts[0], pts[i + 1], pts[i], i & 1 ? c : c2, L_PLAIN, .9); S.tri(pts[0], pts[i], pts[i + 1], i & 1 ? c : c2, L_PLAIN, .9); }
      S.seg([0, 0, .12], [.3, .06, .2], .03, .022, c2, { n: 4 }); S.seg([.3, .06, .2], [.74, .04, .1], .022, .01, c2, { n: 4 });
    }, 48, { rad: .15, shadow: false }),
  };
  KIT.wisp = { core: new PartBatch(S => { S.ico(.07, 0, 0, 0, [.5, .5, .5], { d: 1, emis: .45, jit: 0 }); }, 60, { rad: .07, shadow: false }) };
  const tc = [.2, .29, .15], tcd = [.13, .2, .1], pale = [.46, .46, .28];
  const toadLeg = sg => new PartBatch(S => { S.seg([0, 0, 0], [sg * .17, .05, -.1], .075, .06, tc, { n: 5 }); S.seg([sg * .17, .05, -.1], [sg * .2, -.12, .08], .055, .04, tcd, { n: 5 }); S.box(.1, .03, .18, sg * .21, -.14, .14, tcd, {}); }, 40, { rad: .1, shadow: false });
  KIT.toad = {
    body: new PartBatch(S => {
      S.ico(.27, 0, .17, -.02, tc, { sc: [1.1, .72, 1.2], d: 1, c2: [pale[0], pale[1], pale[2], v => smooth(0, -.14, v.y)] }); S.ico(.19, 0, .2, .2, tc, { sc: [1.15, .68, 1.0], d: 1 });
      S.box(.34, .02, .2, 0, .15, .27, [.05, .06, .04], { jit: 0 }); S.ico(.12, 0, .08, .26, pale, { sc: [1.1, .7, .8], d: 1 });
      for (const s of [-1, 1]) { S.sph(.075, s * .12, .33, .2, tcd, { w: 6, h: 4 }); S.box(.05, .05, .03, s * .125, .345, .265, COL.black, { jit: 0 }); S.seg([s * .2, .1, .16], [s * .26, -.02, .26], .045, .035, tcd, { n: 4 }); S.box(.08, .025, .1, s * .27, -.03, .3, tcd, {}); }
      for (const [x, y, z] of [[.1, .34, -.1], [-.14, .31, -.02], [.02, .36, -.2], [-.05, .33, .05]]) S.ico(.035, x, y, z, tcd, { d: 0 });
    }, 40, { rad: .3 }),
    legR: toadLeg(1), legL: toadLeg(-1),
  };
}

function rigSpider(e) {
  const K = KIT.spider, s = e.scale || 1, fl = e.flash || 0, ph = e.ph, mv = e.mv, Z = [.15, .08, 0, -.08], A = [1.0, .4, -.3, -.9];
  const M0 = xf(_M[0], null, e.x, e.y + (.19 + Math.abs(Math.sin(ph * 2)) * .015 * mv) * s, e.z, -(e.flinch || 0) * .3, e.yaw, Math.sin(ph) * .04 * mv, s, s, s);
  K.body.put(M0, fl, e.tint);
  for (let i = 0; i < 4; i++) for (const sd of [-1, 1]) {
    const g = ((i + (sd > 0 ? 0 : 1)) & 1) ? PI : 0, a = A[i] + Math.sin(ph * 2 + g) * .32 * mv, lift = Math.max(0, Math.cos(ph * 2 + g)) * .3 * mv;
    K.leg.put(xf(_M[1 + i * 2 + (sd > 0 ? 0 : 1)], M0, sd * .09, 0, Z[i], 0, sd > 0 ? -a : PI + a, lift), fl, e.tint);
  }
  return M0;
}
function rigWolf(e) {
  const K = KIT.wolf, ph = e.ph, s = e.scale || 1, fl = e.flash || 0, mv = e.mv, g = Math.sin(ph * 2);
  const M0 = xf(_M[0], null, e.x, e.y + (.43 + Math.abs(g) * .06 * mv) * s, e.z, g * .1 * mv - (e.flinch || 0) * .4, e.yaw, 0, s, s, s);
  K.body.put(M0, fl, e.tint);
  for (let i = 0; i < 4; i++) { const fr = i < 2, sd = (i & 1) ? -1 : 1, a = Math.sin(ph * 2 + (fr ? 0 : 2.6) + (sd > 0 ? 0 : .5)) * .85 * mv; K.leg.put(xf(_M[4 + i], M0, sd * .1, -.04, fr ? .2 : -.26, a, 0, 0), fl, e.tint); }
  K.tail.put(xf(_M[8], M0, 0, .06, -.4, -.3 + g * .2 * mv, Math.sin(ph + 1) * .3, 0), fl, e.tint);
  return M0;
}
function rigWraith(e) {
  const K = KIT.wraith, s = e.scale || 1, fl = e.flash || 0, t = SH.uTime.value + (e.lseed || 0);
  const M0 = xf(_M[0], null, e.x, e.y + (.22 + Math.sin(t * 2.1) * .07) * s, e.z, .16 * e.mv - (e.flinch || 0) * .4, e.yaw, Math.sin(t * 1.3) * .06, s, s, s);
  K.body.put(M0, fl, e.tint);
  for (const sd of [-1, 1]) K.arm.put(xf(_M[sd > 0 ? 1 : 2], M0, sd * .22, .84, .04, -.25 + Math.sin(t * 1.7 + sd) * .22, sd * -.25, 0), fl, e.tint);
  return M0;
}
function rigWisp(e) {
  const s = (e.scale || 1) * (1 + .15 * Math.sin(SH.uTime.value * 9 + (e.lseed || 0) * 5));
  const M0 = xf(_M[0], null, e.x, e.y, e.z, 0, e.yaw, 0, s, s, s); KIT.wisp.core.put(M0, e.flash || 0, e.tint); return M0;
}
function rigToad(e) {
  const K = KIT.toad, s = e.scale || 1, h = e.hop || 0, fl = e.flash || 0;
  let y = 0, pitch = 0, ext = 0, sq = 1;
  if (h < .22) sq = 1 - .22 * easeOut(h / .22);
  else if (h < .62) { const u = (h - .22) / .4; y = Math.sin(u * PI) * .5; pitch = -.45 * Math.cos(u * PI); ext = Math.sin(Math.min(1, u * 1.5) * PI); sq = 1.08; }
  else if (h < .78) sq = 1 - .25 * Math.sin((h - .62) / .16 * PI);
  sq *= 1 - (e.flinch || 0) * .2;
  const M0 = xf(_M[0], null, e.x, e.y + (.1 + y) * s, e.z, pitch, e.yaw, 0, s, s * sq, s);
  K.body.put(M0, fl, e.tint);
  K.legR.put(xf(_M[1], M0, .17, .06, -.14, -ext * .9, 0, 0), fl, e.tint); K.legL.put(xf(_M[2], M0, -.17, .06, -.14, -ext * .9, 0, 0), fl, e.tint);
  return M0;
}
