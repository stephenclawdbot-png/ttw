
const MON = {
  skel: { name: 'Skeleton', hp: 34, spd: 1.35, rad: .27, mass: 1, bounty: 6, lives: 1, hitH: .75, top: 1.45, dmg: 6, atkT: .95, eye: [3.4, .9, .2], scale: 1, death: 'bones', blade: true },
  rat: { name: 'Giant rat', tip: 'Fast and frail. Comes in packs.', hp: 13, spd: 2.65, rad: .2, mass: .45, bounty: 3, lives: 1, hitH: .2, top: .5, dmg: 3, atkT: .6, eye: [3.2, .4, .3], scale: 1, death: 'fur', cat: 'swarm' },
  slime: { name: 'Slime', tip: 'Splits in two when it dies.', hp: 95, spd: .82, rad: .42, mass: 2.2, bounty: 9, lives: 1, hitH: .3, top: .75, dmg: 8, atkT: 1.2, eye: [1.8, 2.8, .4], scale: 1, death: 'goo', hop: [.95, 2.35], split: ['slimelet', 2] },
  slimelet: { name: 'Slimelet', hp: 30, spd: 1.2, rad: .26, mass: .9, bounty: 3, lives: 1, hitH: .2, top: .48, dmg: 4, atkT: 1.0, eye: [1.8, 2.8, .4], scale: .58, death: 'goo', hop: [1.25, 2.35], cat: 'swarm' },
  knight: { name: 'Skeleton knight', tip: 'Its armor turns most arrows.', hp: 118, spd: 1.0, rad: .3, mass: 2.2, bounty: 15, lives: 1, hitH: .8, top: 1.6, dmg: 11, atkT: 1.05, eye: [.5, 1.7, 3.4], scale: 1.08, armor: .35, death: 'bones', blade: true, cat: 'armor', tint: [.74, .78, .9] },
  bat: { name: 'Bat', tip: 'Flies over the road. Only archers and spires reach it.', hp: 20, spd: 2.3, rad: .22, mass: .3, bounty: 6, lives: 1, hitH: 0, top: .35, dmg: 0, atkT: 1, eye: [3.2, .5, .3], scale: 1.25, fly: true, death: 'bat', cat: 'air', alt: [2.9, 3.8], flap: 21 },
  ghoul: { name: 'Ghoul', tip: 'Runs faster the more it is hurt.', hp: 40, spd: 1.85, rad: .27, mass: .9, bounty: 7, lives: 1, hitH: .5, top: .95, dmg: 9, atkT: .7, eye: [3.2, 2.8, .6], scale: .62, frenzy: .55, death: 'flesh', tint: [1.24, 1.03, 1.9] },
  spider: { name: 'Cave spider', tip: 'Slips past your footmen.', hp: 20, spd: 2.25, rad: .24, mass: .4, bounty: 3, lives: 1, hitH: .18, top: .45, dmg: 4, atkT: .6, eye: [3.4, .3, .2], scale: 1, slip: true, death: 'bug', cat: 'swarm', tint: [.6, .55, .6] },
  scarab: { name: 'Scarab', hp: 9, spd: 2.5, rad: .15, mass: .2, bounty: 1, lives: 1, hitH: .1, top: .28, dmg: 2, atkT: .6, eye: [1.2, 3.0, 2.6], scale: .5, slip: true, death: 'bug', cat: 'swarm', tint: [1.5, 1.15, .45] },
  wolf: { name: 'Dire wolf', tip: 'Fast, and it bites hard.', hp: 38, spd: 2.7, rad: .3, mass: .9, bounty: 7, lives: 1, hitH: .4, top: .85, dmg: 12, atkT: .7, eye: [3.4, 2.6, .3], scale: 1, death: 'fur', cat: 'swarm', tint: [.8, .8, .9] },
  bomber: { name: 'Sapper', tip: 'Its powder keg blows up friend and foe.', hp: 38, spd: 1.55, rad: .27, mass: 1, bounty: 8, lives: 2, hitH: .75, top: 1.55, dmg: 0, atkT: 1, eye: [3.6, 1.4, .2], scale: 1, explode: { r: 1.7, dmg: 46, men: 30 }, death: 'bones', tint: [.95, .85, .75] },
  wraith: { name: 'Wraith', tip: 'Arrows and swords miss while it fades.', hp: 58, spd: 1.3, rad: .28, mass: 1, bounty: 11, lives: 1, hitH: .8, top: 1.5, dmg: 0, atkT: 1, eye: [.8, 2.4, 3.6], scale: 1, ghost: [1.7, 3.0], death: 'ghost' },
  toad: { name: 'Bog toad', tip: 'Covers ground in long hops.', hp: 78, spd: 1.0, rad: .38, mass: 1.8, bounty: 9, lives: 1, hitH: .3, top: .75, dmg: 9, atkT: 1.0, eye: [3.0, 2.4, .3], scale: 1, hop: [1.2, 2.5], death: 'flesh' },
  wisp: { name: 'Wisp', tip: 'A fast flyer. Easy to kill, hard to catch.', hp: 10, spd: 3.0, rad: .14, mass: .1, bounty: 2, lives: 1, hitH: 0, top: .3, dmg: 0, atkT: 1, eye: [1, 1, 1], scale: 1, fly: true, death: 'wisp', cat: 'air', alt: [1.3, 2.3], flap: 6, glow: 8 },
  drummer: { name: 'War drummer', tip: 'Speeds up everything near it.', hp: 92, spd: 1.15, rad: .3, mass: 1.6, bounty: 14, lives: 1, hitH: .8, top: 2.35, dmg: 6, atkT: 1, eye: [3.6, .6, .2], scale: 1.05, aura: [3.4, .3], death: 'bones' },
  gargoyle: { name: 'Gargoyle', tip: 'A flyer that shrugs off arrows.', hp: 90, spd: 1.6, rad: .32, mass: 1.2, bounty: 13, lives: 1, hitH: 0, top: .6, dmg: 0, atkT: 1, eye: [3.6, 1.2, .2], scale: 1.15, fly: true, armor: .5, death: 'rock', cat: 'air', alt: [2.4, 3.1], flap: 9 },
  necro: { name: 'Necromancer', tip: 'Raises skeletons as it walks.', hp: 105, spd: .85, rad: .3, mass: 1.6, bounty: 18, lives: 1, hitH: .8, top: 1.8, dmg: 5, atkT: 1.2, eye: [.6, 3.4, 1.0], scale: 1.08, summon: { type: 'skel', n: 2, every: 7.5, max: 3, hp: .6 }, death: 'bones', tint: [.7, .74, .7] },
  mummy: { name: 'Mummy', tip: 'Bursts into scarabs when it falls.', hp: 135, spd: .9, rad: .3, mass: 2, bounty: 14, lives: 1, hitH: .8, top: 1.55, dmg: 12, atkT: 1.1, eye: [.6, 3.0, 2.6], scale: 1.1, split: ['scarab', 3], death: 'bones', tint: [1.08, .95, .72] },
  brute: { name: 'Troll', tip: 'Heals unless you keep hitting it.', hp: 360, spd: .82, rad: .5, mass: 8, bounty: 30, lives: 2, hitH: 1.0, top: 1.95, dmg: 24, atkT: 1.4, eye: [3.4, 2.4, .4], scale: 1.5, regen: .035, death: 'flesh', cat: 'armor', tint: [.83, .8, 2.0] },
  golem: { name: 'Golem', tip: 'Shrugs off arrows and is hard to slow.', hp: 470, spd: .62, rad: .5, mass: 9, bounty: 34, lives: 2, hitH: 1.1, top: 2.1, dmg: 26, atkT: 1.5, eye: [3.2, 2.6, 1.6], scale: 1.5, armor: .35, slowRes: .5, death: 'rock', cat: 'armor' },
  brood: { name: 'Brood mother', tip: 'Bursts into spiders when it falls.', hp: 230, spd: .92, rad: .55, mass: 5, bounty: 24, lives: 2, hitH: .45, top: 1.05, dmg: 14, atkT: 1.0, eye: [3.4, .3, .2], scale: 2.3, split: ['spider', 5], death: 'bug', tint: [.7, .5, .6] },
  giant: { name: 'Bone Giant', tip: 'Slow and enormous. Hit it with everything.', hp: 1250, spd: .88, rad: .92, mass: 40, bounty: 200, lives: 5, hitH: 2.2, top: 4.0, dmg: 46, atkT: 1.7, eye: [5, .9, .2], scale: 2.7, boss: true, death: 'bones', blade: true, cat: 'armor' },
  ogre: { name: 'Ogre', tip: 'Smashes footmen aside.', hp: 1400, spd: .8, rad: 1.0, mass: 46, bounty: 200, lives: 5, hitH: 1.9, top: 3.4, dmg: 52, atkT: 1.8, eye: [4.5, 2.2, .3], scale: 2.6, boss: true, death: 'flesh', blade: true, cat: 'armor' },
  jotun: { name: 'Frost Jotun', tip: 'Its stomp freezes nearby towers.', hp: 1150, spd: .8, rad: 1.0, mass: 46, bounty: 200, lives: 5, hitH: 1.9, top: 3.6, dmg: 52, atkT: 1.8, eye: [.8, 2.4, 4], scale: 2.75, boss: true, stomp: { every: 10, r: 5.2, stun: 1.8 }, death: 'flesh', blade: true, cat: 'armor', tint: [1.0, 1.25, 3.4] },
  queen: { name: 'Brood Queen', tip: 'Keeps hatching spiders.', hp: 1150, spd: .85, rad: 1.1, mass: 40, bounty: 200, lives: 5, hitH: 1.0, top: 2.0, dmg: 40, atkT: 1.5, eye: [3.8, .3, .9], scale: 4.2, boss: true, summon: { type: 'spider', n: 2, every: 8, max: 99, hp: 1 }, death: 'bug', cat: 'armor', tint: [.85, .55, 1.0] },
  colossus: { name: 'Magma Colossus', tip: 'Speeds up when it is nearly dead.', hp: 1250, spd: .7, rad: 1.05, mass: 60, bounty: 200, lives: 5, hitH: 2.2, top: 4.3, dmg: 60, atkT: 2.0, eye: [4, 1.6, .3], scale: 3.0, boss: true, armor: .85, slowRes: .3, enrage: [.3, 1.25], death: 'rock', cat: 'armor', tint: [1.5, .5, .26] },
  king: { name: 'The Buried King', tip: 'Summons mummies to walk with him.', hp: 1250, spd: .86, rad: .92, mass: 40, bounty: 200, lives: 5, hitH: 2.2, top: 4.2, dmg: 46, atkT: 1.7, eye: [.6, 3.0, 2.6], scale: 2.7, boss: true, summon: { type: 'mummy', n: 1, every: 9, max: 99, hp: .7 }, death: 'bones', blade: true, cat: 'armor', tint: [1.2, 1.0, .55] },
};

function spawnMonster(type, o = {}) {
  const B = G.B, def = MON[type], hpMul = o.hpMul || 1, bt = B.bio.tints;
  const m = {
    type, def, hp: def.hp * hpMul, maxHp: def.hp * hpMul, s: o.s === undefined ? .7 + rnd() * .5 : o.s, lat: o.lat === undefined ? rr(-.85, .85) : o.lat,
    x: 0, y: 0, z: 0, yaw: 0, ph: rnd() * 6, mv: 1, vf: def.spd, spdNow: def.spd, spdMul: rr(.93, 1.07) * (o.spdMul || 1), slowT: 0, slowF: 0,
    flash: 0, flinch: 0, atk: -1, cd: rr(.1, .5), foe: null, prog: 0, vis: false, dead: false, dying: 0, ks: 0, kl: 0, hop: rnd(), rad: def.rad * (o.radMul || 1), mass: def.mass,
    hitH: def.hitH, scale: def.scale * rr(.95, 1.05), fly: !!def.fly, torch: false, flame: null, tint: (bt && bt[type]) || def.tint || null, men: 0, struck: false, step: 0, alive: true, lI: 0, lx: 0, ly: 0, lz: 0, lseed: rnd() * 9, vx: 0, vz: 0, pop: o.pop || 0,
    haste: 0, hitAt: -9, beat: rnd() * 6, eth: false, gT: rnd() * 4, cast: 0, sumN: 0, sumT: def.summon ? def.summon.every * rr(.45, .7) : 0, stT: def.stomp ? def.stomp.every * .6 : 0, rage: false,
  };
  m.home = m.lane = m.lat;
  if (type === 'skel' && rnd() < .26) { m.torch = true; m.flame = addFlame({ x: 0, y: -50, z: 0, size: .36, embers: .45, glow: .8 }); m.lI = 30; }
  if (type === 'bomber') { m.torch = true; m.flame = addFlame({ x: 0, y: -50, z: 0, size: .3, embers: .7, glow: .7 }); m.lI = 26; }
  if (type === 'skel') m.tint = rnd() < .3 ? [.9, .86, .74] : null;
  if (def.glow) { m.glowL = true; m.lI = def.glow; m.lCol = B.bio.wispHex || 0xb0a0ff; }
  if (m.fly) {
    const c = B.cave; m.x = c.x + rr(-.5, .5); m.z = c.z + rr(-1, 1); m.y = c.y + 2.2; m.s = c.s + rr(0, .6);
    m.alt = rr(def.alt[0], def.alt[1]); m.side = rr(-1.1, 1.1) * (def.glow ? 1.4 : 1); m.vis = true;
  } else { const p = pathAt(B, m.s, _ap); m.x = p.x - p.tz * m.lat; m.z = p.z + p.tx * m.lat; m.y = p.y; }
  if (m.vis) UI.sawMonster(type);
  G.mons.push(m); return m;
}
function removeMonster(m) { m.dead = true; m.alive = false; if (m.flame) { removeFlame(m.flame); m.flame = null; } if (m.foe) { m.foe = null; } }

function slowMonster(m, f, t) { if (m.def.boss) { f *= .4; t *= .6; } if (m.def.slowRes) f *= 1 - m.def.slowRes; m.slowF = Math.max(m.slowF, f); m.slowT = Math.max(m.slowT, t); }
function hitMonster(m, dmg, kind, dx, dz, tower) {
  if (m.dead || m.hp <= 0) return false;
  if (m.eth) { if (kind === 'arrow' || kind === 'sword') { if (rnd() < .5) fxTimed(0, m.x + rr(-.2, .2), m.y + m.hitH + rr(-.2, .3), m.z + rr(-.2, .2), .5, .5, .5, .9, 1.8, .7, .18); return false; } dmg *= .5; }
  if (kind === 'arrow' && m.def.armor) { dmg *= m.def.armor; if (rnd() < .6) { fxSparks(m.x, m.y + m.hitH, m.z, 3, 3, 2.4, 2.2, 1.6, { size: .05 }); } }
  m.hp -= dmg; m.flash = 1; m.flinch = m.def.boss ? Math.max(m.flinch, .25) : 1; m.hitAt = G.t;
  const kb = (kind === 'blast' ? 2.6 : kind === 'sword' ? 1.3 : kind === 'arrow' ? .7 : .2) / Math.sqrt(m.mass);
  if (!m.fly && (dx || dz)) { const p = pathAt(G.B, m.s, _ap); m.ks += (dx * p.tx + dz * p.tz) * kb; m.kl += (-dx * p.tz + dz * p.tx) * kb; }
  if (tower) { tower.dealt += dmg; tower.recent += dmg; }
  if (m.hp <= 0) { killMonster(m, kind, dx, dz, tower); return true; }
  return false;
}
function dropCoins(x, y, z, bounty, n) {
  G.gold += bounty; const each = bounty / n;
  for (let i = 0; i < n; i++) {
    _tm.compose(_tv.set(x + rr(-.15, .15), y + .3, z + rr(-.15, .15)), _tq.set(rr(-1, 1), rr(-1, 1), rr(-1, 1), 1).normalize(), _ts.set(1, 1, 1));
    const d = addDebris(KIT.coin, _tm, null, rr(-1.6, 1.6), rr(3.6, 6.2), rr(-1.6, 1.6), rr(8, 16), 3, { coin: rr(.5, .8), bounce: .5 });
    if (d) d.value = each; else UI.goldShown += each;
  }
}
function blastAround(m, ex) {
  fxExplosion(m.x, m.y + .3, m.z, .62); sfx('explode', m.x, m.z, .8, rnd());
  for (const o of G.mons) { if (o === m || o.dead || o.fly || o.hp <= 0) continue; const d = Math.hypot(o.x - m.x, o.z - m.z); if (d < ex.r + o.rad) hitMonster(o, ex.dmg * (1 - .5 * d / (ex.r + o.rad)), 'blast', (o.x - m.x) / (d || 1), (o.z - m.z) / (d || 1), null); }
  for (const f of G.men) { if (f.dead) continue; const d = Math.hypot(f.x - m.x, f.z - m.z); if (d < ex.r) { f.hp -= ex.men * G.dmgMul * .6; f.flash = 1; f.flinch = 1; if (f.hp <= 0) killFootman(f, (f.x - m.x) / (d || 1), (f.z - m.z) / (d || 1)); } }
}
function killMonster(m, kind, dx, dz, tower) {
  const B = G.B, def = m.def, t = m.type, dth = def.death; if (tower) tower.kills++;
  if (def.boss) { m.dying = 1.9; m.hp = 0; m.foe = null; G.slowmo = 1.4; sfx('roar', m.x, m.z, 1, 1); return; }
  G.slain++; G.waveKills++;
  const ix = (dx || 0) * 2.2, iz = (dz || 0) * 2.2, up = kind === 'blast' ? 1.7 : 1, sc = m.scale;
  if (dth === 'bones') { shatter(e => rigMonster(e), m, [ix, 1.2 * up, iz], { spread: kind === 'blast' ? 2.6 : 1.5, up }); sfx('boneRattle', m.x, m.z, .8, rnd()); fxDust(m.x, m.y + .1, m.z, 3, .6, { a: .35 }); }
  else if (dth === 'fur') { shatter(e => rigMonster(e), m, [ix, 2.2 * up, iz], { spread: 1.2, life: .6 }); sfx('ratSqueal', m.x, m.z, .55, rnd()); fxDust(m.x, m.y + .1, m.z, 2, .4, { a: .3 }); }
  else if (dth === 'bat') { shatter(e => rigMonster(e), m, [ix + m.vx * .5, .5, iz + m.vz * .5], { spread: 1.0, life: .7 }); sfx('batScreech', m.x, m.z, .6, rnd()); }
  else if (dth === 'flesh') { shatter(e => rigMonster(e), m, [ix, 1.6 * up, iz], { spread: 1.5, life: .7, up }); sfx('squelch', m.x, m.z, .7, .5); fxDust(m.x, m.y + .1, m.z, 3 + Math.round(sc * 2), .5 * sc + .3, { a: .35 }); FX.decals.add(B.heightAt, m.x, m.z, .5 * sc + .3, .03, .012, .012, .6, 16); }
  else if (dth === 'bug') { shatter(e => rigMonster(e), m, [ix, 1.8 * up, iz], { spread: 1.6, life: .55 }); sfx('squelch', m.x, m.z, .5, .9); FX.decals.add(B.heightAt, m.x, m.z, .35 * sc + .15, .02, .03, .012, .6, 14); for (let i = 0; i < 3; i++) fxSmoke(m.x, m.y + .15, m.z, rr(-1, 1), rr(.4, 1), rr(-1, 1), rr(.3, .6), .25 * sc, .4, .14, .22, .1, .45, { drag: 3 }); }
  else if (dth === 'rock') {
    shatter(e => rigMonster(e), m, [ix + m.vx * .4, 1.4 * up, iz + m.vz * .4], { spread: 1.8, life: .9 }); sfx('hammer', m.x, m.z, 1, rnd()); fxDust(m.x, m.y + .2, m.z, 6 + Math.round(sc * 3), .7 * sc, { speed: 2.4 });
    for (let i = 0; i < 5; i++) { _tm.compose(_tv.set(m.x + rr(-.3, .3) * sc, m.y + rr(.2, 1) * sc, m.z + rr(-.3, .3) * sc), _tq.identity(), _ts.setScalar(rr(.6, 1.2))); addDebris(KIT.rubble, _tm, m.tint, rr(-2.5, 2.5) + ix, rr(2, 4.5), rr(-2.5, 2.5) + iz, rr(3, 9), rr(2.5, 4)); }
  }
  else if (dth === 'ghost') { shatter(e => rigMonster(e), m, [ix * .4, 2.2, iz * .4], { spread: .8, life: .45 }); sfx('batScreech', m.x, m.z, .45, .1); fxTimed(5, m.x, m.y + .8, m.z, 2.4, 2.4, .5, 1.1, 2.2, .9, .3); for (let i = 0; i < 6; i++) fxSmoke(m.x + rr(-.2, .2), m.y + rr(.2, 1.2), m.z + rr(-.2, .2), rr(-.5, .5), rr(.6, 1.6), rr(-.5, .5), rr(.6, 1.1), .4, .7, .3, .42, .6, .4, { drag: 1.5, rise: .3 }); }
  else if (dth === 'wisp') { const c = m.tint || [1, 1, 1]; fxTimed(5, m.x, m.y, m.z, 1.5, 1.5, c[0] * 2, c[1] * 2, c[2] * 2, .9, .22); fxSparks(m.x, m.y, m.z, 7, 3.2, c[0] * 2.4, c[1] * 2.4, c[2] * 2.4, { size: .05, grav: 2 }); sfx('ignite', m.x, m.z, .35, rnd()); }
  else {
    const big = t === 'slime', n = big ? 14 : 7;
    for (let i = 0; i < n; i++) { _tm.compose(_tv.set(m.x + rr(-.2, .2) * sc, m.y + rr(.1, .5) * sc, m.z + rr(-.2, .2) * sc), _tq.identity(), _ts.setScalar(rr(.8, 1.8) * sc)); addDebris(KIT.goo, _tm, null, rr(-3, 3) + ix, rr(2, 5.5), rr(-3, 3) + iz, 0, 2, { goo: 1 }); }
    FX.decals.add(B.heightAt, m.x, m.z, .95 * sc + .2, .012, .034, .014, .75, 22);
    fxTimed(4, m.x, m.y + .08, m.z, 2.6 * sc, 2.6 * sc, .25, .8, .2, .6, .3, { ground: true });
    for (let i = 0; i < 5; i++) fxSmoke(m.x, m.y + .3, m.z, rr(-1, 1), rr(.5, 1.5), rr(-1, 1), rr(.4, .8), .35 * sc, .5, .12, .3, .12, .5, { drag: 3 });
    sfx('squelch', m.x, m.z, .8, big ? .8 : .2);
  }
  if (def.split && G.mons.length < 90) { const [ty, n] = def.split; for (let i = 0; i < n; i++) { const u = n > 1 ? i / (n - 1) * 2 - 1 : 0; spawnMonster(ty, { s: Math.max(.5, m.s - .15 - .1 * Math.abs(u)), lat: clamp(m.lat + u * .34, -.95, .95), hpMul: m.maxHp / def.hp, pop: 1 }).kl = u * 2.2; } }
  if (m.torch && m.flame) fxEmbers(m.flame.x, m.flame.y, m.flame.z, 8, .15);
  dropCoins(m.x, m.y + m.hitH * .6, m.z, Math.round(def.bounty * G.bountyMul), clamp(Math.round(def.bounty / 3), 1, 6));
  removeMonster(m);
  if (def.explode) blastAround(m, def.explode);
}
function finishBoss(m) {
  G.slain++; G.waveKills++;
  shatter(e => rigMonster(e), m, [0, 2.5, 0], { spread: 3.4, up: 1.5, life: 1.5, hold: .25 });
  fxDust(m.x, m.y + .2, m.z, 26, 2.4, { speed: 4.5, life: 1.6 }); fxExplosion(m.x, m.y + 1, m.z, .9); FX.shake = 1.2;
  FX.decals.add(G.B.heightAt, m.x, m.z, 2.6, .02, .017, .015, .8, 60);
  sfx('bossDie', m.x, m.z, 1.2, 1);
  dropCoins(m.x, m.y + 1.4, m.z, Math.round(m.def.bounty * G.bountyMul), 26);
  G.bossDown = true; removeMonster(m);
}

const SKEL_EYE = [.058, .185, .152, .07], OGRE_EYE = [.055, .125, .15, .06], BUG_EYE = [.05, .055, .19, .035];
const RIGS = {
  skel(m) { m.weapon = KIT.item.sword; m.shamble = true; return rigHuman(KIT.skel, SPEC.skel, m); },
  knight(m) { m.weapon = KIT.item.sword; m.wScale = 1.2; m.shield = KIT.item.shieldR; m.helm = true; m.plate = true; return rigHuman(KIT.skel, SPEC.skel, m); },
  giant(m) { m.weapon = KIT.item.greatsword; m.wScale = 1.1; m.heavy = true; return rigHuman(KIT.giant, SPEC.skel, m); },
  ogre(m) { m.weapon = KIT.item.club; m.wScale = 1.2; m.heavy = true; return rigHuman(KIT.ogre, SPEC.ogre, m); },
  rat: rigRat, bat: m => rigBat(m), slime: rigSlime, slimelet: rigSlime,
  ghoul(m) { m.claw = true; return rigHuman(KIT.ogre, SPEC.ogre, m); },
  brute(m) { m.weapon = KIT.item.club; m.wScale = 1.1; m.heavy = true; return rigHuman(KIT.ogre, SPEC.ogre, m); },
  jotun(m) { m.weapon = KIT.item.iceclub; m.wScale = 1.3; m.heavy = true; return rigHuman(KIT.ogre, SPEC.ogre, m); },
  golem(m) { m.heavy = true; return rigHuman(KIT.golem, SPEC.golem, m); },
  colossus(m) { m.heavy = true; return rigHuman(KIT.golem, SPEC.golem, m); },
  necro(m) { m.weapon = KIT.item.staff; m.staff = true; m.hood = true; m.robe = true; return rigHuman(KIT.skel, SPEC.skel, m); },
  drummer(m) { m.weapon = KIT.item.stick; m.drum = true; m.standard = true; return rigHuman(KIT.skel, SPEC.skel, m); },
  bomber(m) { m.keg = true; return rigHuman(KIT.skel, SPEC.skel, m); },
  mummy(m) { m.shamble = true; m.wraps = true; return rigHuman(KIT.skel, SPEC.skel, m); },
  king(m) { m.weapon = KIT.item.khopesh; m.wScale = 1.25; m.heavy = true; m.crown = true; m.wraps = true; return rigHuman(KIT.giant, SPEC.skel, m); },
  spider: rigSpider, scarab: rigSpider, brood: rigSpider, queen: rigSpider, wolf: rigWolf, wraith: rigWraith, toad: rigToad, wisp: rigWisp,
  gargoyle: m => rigBat(m, KIT.garg, .1, .06),
};
function rigMonster(m) { return RIGS[m.type](m); }
const EYES = {
  skel: SKEL_EYE, knight: SKEL_EYE, giant: [.058, .185, .152, .075], ogre: OGRE_EYE, rat: [.05, .03, .42, .05], bat: [.04, .03, .16, .05], slime: [.13, .2, .44, .08], slimelet: [.13, .2, .44, .08],
  ghoul: OGRE_EYE, brute: OGRE_EYE, jotun: OGRE_EYE, golem: [.04, .1, .17, .05], colossus: [.04, .1, .17, .05], necro: SKEL_EYE, drummer: SKEL_EYE, bomber: SKEL_EYE, mummy: SKEL_EYE, king: [.058, .185, .152, .075],
  spider: BUG_EYE, scarab: BUG_EYE, brood: [.05, .055, .19, .022], queen: [.05, .055, .19, .016], wolf: [.05, .27, .63, .04], wraith: [.045, 1.04, .17, .055], toad: [.125, .345, .285, .035], gargoyle: [.045, .15, .28, .045], wisp: null,
};
function drawMonster(m, t) {
  const M = rigMonster(m), ey = EYES[m.type], c = m.def.eye, sc = m.scale, tw = .8 + .2 * Math.sin(t * 9 + m.lseed * 7), ty = m.type;
  if (ey) {
    for (const sg of [-1, 1]) { _tv.set(sg * ey[0], ey[1], ey[2]).applyMatrix4(M); FX.add.push(_tv.x, _tv.y, _tv.z, ey[3] * sc * 1.5, ey[3] * sc * 1.5, 0, 0, c[0], c[1], c[2], tw, 0, 0, 0, 0); }
    _tv.set(0, ey[1], ey[2]).applyMatrix4(M); FX.add.push(_tv.x, _tv.y, _tv.z, ey[3] * sc * 9, ey[3] * sc * 9, 0, 0, c[0] * .3, c[1] * .3, c[2] * .3, .5 * tw, 2, 0, 0, 0);
  }
  if (ty === 'wisp') { const k = m.tint || [1, 1, 1]; FX.add.push(m.x, m.y, m.z, .26, .26, 0, 0, k[0] * 2.2, k[1] * 2.2, k[2] * 2.2, tw, 0, 0, 0, 0); FX.add.push(m.x, m.y, m.z, 1.5, 1.5, 0, 0, k[0] * .5, k[1] * .5, k[2] * .5, .5 * tw, 2, 0, 0, 0); m.lx = m.x; m.ly = m.y; m.lz = m.z; if (rnd() < .3) fxPart(m.x + rr(-.05, .05), m.y + rr(-.05, .05), m.z + rr(-.05, .05), -m.vx * .2, rr(-.2, .2), -m.vz * .2, rr(.3, .6), .05, k[0] * 1.6, k[1] * 1.6, k[2] * 1.6, { drag: 1 }); }
  else if (ty === 'wraith') { const a = m.eth ? .5 + .2 * Math.sin(t * 23) : .16; FX.add.push(m.x, m.y + .75 * sc, m.z, 2.3 * sc, 2.6 * sc, 0, 0, .25, .55, 1.2, a, 2, 0, 0, 0); if (m.eth && rnd() < .3) fxPart(m.x + rr(-.25, .25), m.y + rr(.1, 1.3), m.z + rr(-.25, .25), 0, rr(.3, .9), 0, rr(.3, .6), .05, .5, 1.0, 2.0, { drag: .5 }); }
  else if (ty === 'necro' || ty === 'queen' || ty === 'king') { if (m.cast > 0) { const g = ty === 'necro' ? [.4, 1.6, .6] : ty === 'queen' ? [1.2, .5, 1.6] : [.4, 1.5, 1.3]; FX.add.push(m.x, m.y + m.hitH * 1.6, m.z, 3.2 * m.cast * sc, 3.2 * m.cast * sc, 0, 0, g[0], g[1], g[2], .28 * m.cast, 2, 0, 0, 0); } }
  else if (ty === 'colossus' && rnd() < (m.rage ? .5 : .12)) fxPart(m.x + rr(-.7, .7), m.y + rr(.6, 3), m.z + rr(-.7, .7), rr(-.3, .3), rr(.6, 1.8), rr(-.3, .3), rr(.6, 1.2), rr(.05, .08), 2.6, .9, .15, { drag: .3, wob: 1, rise: .3 });
  if (m.torch && m.flame) { const p = RIGOUT.torch; m.flame.x = p.x; m.flame.y = p.y; m.flame.z = p.z; m.lx = p.x; m.ly = p.y + .2; m.lz = p.z; }
  if (m.slowT > 0 && rnd() < .2) { const a = rnd() * TAU; fxBolt([m.x, m.y + m.hitH, m.z], [m.x + Math.cos(a) * m.rad * 1.4, m.y + m.hitH + rr(-.3, .4), m.z + Math.sin(a) * m.rad * 1.4], .08, [.4, .65, 1.3], .028); }
  if (m.vis || m.fly) G.hbars.push({ x: m.x, y: m.y + m.def.top * sc / m.def.scale + .22, z: m.z, f: sat(m.hp / m.maxHp), boss: !!m.def.boss, man: false, name: m.def.boss ? m.def.name : null });
}

function spawnFootman(tower) {
  const d = tower.def, lvl = tower.lvl, door = tower.w(tower.mounts.door, {});
  const used = tower.men.map(f => f.slot); let slot = 0; while (used.includes(slot)) slot++;
  const f = {
    isMan: true, tower, slot, x: door.x, y: door.y, z: door.z, yaw: tower.yaw, ph: 0, mv: 0, atk: -1, flinch: 0, flash: 0, hp: d.hp[lvl], maxHp: d.hp[lvl], dmg: d.dmg[lvl],
    rad: .26, mass: 7, s: tower.pad.s, lat: 0, onRoad: false, state: 'march', target: null, cd: rr(.2, .6), torch: slot === 0, gone: false, dead: false, vf: 0, scale: .9 + lvl * .05,
    struck: false, alive: true, lI: slot === 0 ? 32 : 0, lx: 0, ly: 0, lz: 0, lseed: rnd() * 9, flame: null, leave: false, lvlUp: false, weapon: null, shield: null, age: 0, foes: 0,
  };
  if (f.torch) f.flame = addFlame({ x: door.x, y: -50, z: door.z, size: .34, embers: .45, glow: .8 });
  tower.men.push(f); G.men.push(f); return f;
}
function killFootman(f, dx, dz) {
  f.dead = true; f.alive = false; f.gone = true; if (f.flame) { fxEmbers(f.flame.x, f.flame.y, f.flame.z, 6, .1); removeFlame(f.flame); f.flame = null; }
  f.weapon = KIT.item.blade; if (!f.torch) f.shield = KIT.item.shieldH;
  shatter(e => rigHuman(KIT.foot, SPEC.foot, e), f, [(dx || 0) * 1.6, .8, (dz || 0) * 1.6], { spread: .9, life: .8 });
  fxDust(f.x, f.y + .1, f.z, 3, .5, { a: .35 }); sfx('footmanDie', f.x, f.z, .8);
}
function slotPos(f, out) {
  const B = G.B, n = f.tower.def.n[f.tower.lvl], lat = (n === 2 ? [-.48, .48] : [-.66, 0, .66])[f.slot % n] || 0;
  const p = pathAt(B, f.tower.pad.s, out); p.x += -p.tz * lat; p.z += p.tx * lat; return p;
}
const _fp = { x: 0, y: 0, z: 0, tx: 0, tz: 0 };
function footmanThink(f, dt) {
  const B = G.B, tw = f.tower; f.age += dt;
  if (f.lvlUp) { f.lvlUp = false; const d = tw.def, r = f.hp / f.maxHp; f.maxHp = d.hp[tw.lvl]; f.hp = f.maxHp * Math.max(r, .6); f.dmg = d.dmg[tw.lvl]; f.scale = .9 + tw.lvl * .05; }
  if (!tw.alive) f.leave = true;
  let gx, gz, face = null, speed = 2.1, fighting = false;
  const rally = slotPos(f, _fp), rs = tw.pad.s;
  if (f.leave) { f.gone = true; f.alive = false; if (f.flame) { removeFlame(f.flame); f.flame = null; } fxDust(f.x, f.y + .3, f.z, 4, .6); return; }
  let m = f.target;
  if (m && (m.dead || m.hp <= 0 || Math.abs(m.s - rs) > 3.0 || m.dying)) { if (m.foe === f) m.foe = null; m.men = Math.max(0, m.men - 1); m = f.target = null; }
  if (!m && f.state !== 'march') {
    let best = null, bd = 1e9;
    for (const q of G.mons) { if (q.dead || q.fly || q.hp <= 0 || !q.vis || q.dying || q.def.ghost) continue; if (Math.abs(q.s - rs) > 2.5) continue; const d = dist2(f.x, f.z, q.x, q.z) + q.men * 6; if (d < bd) { bd = d; best = q; } }
    if (best) { m = f.target = best; best.men++; }
  }
  if (m) {
    const p = pathAt(B, m.s, _ap), reach = m.rad + f.rad + .14;
    gx = m.x + p.tx * reach; gz = m.z + p.tz * reach;
    const d = Math.hypot(m.x - f.x, m.z - f.z);
    face = Math.atan2(m.x - f.x, m.z - f.z);
    if (d < reach + .3) { fighting = true; if (!m.foe && !m.def.slip) m.foe = f; if (d < reach + .12) { gx = f.x; gz = f.z; } }
  } else { gx = rally.x; gz = rally.z; if (f.state === 'march' && Math.hypot(gx - f.x, gz - f.z) < .2) f.state = 'ready'; }
  const dx = gx - f.x, dz = gz - f.z, dl = Math.hypot(dx, dz);
  if (dl > .06) { const st = Math.min(dl, speed * dt); f.x += dx / dl * st; f.z += dz / dl * st; f.ph += st * 6.2; f.mv = damp(f.mv, 1, 12, dt); if (!fighting) face = Math.atan2(dx, dz); }
  else { f.mv = damp(f.mv, 0, 10, dt); if (!m) { const p = pathAt(B, rs, _ap); face = Math.atan2(-p.tx, -p.tz); } }
  if (face !== null) f.yaw = angDamp(f.yaw, face, 12, dt);
  f.cd -= dt;
  if (f.atk >= 0) {
    f.atk += dt / .58;
    if (f.atk >= .5 && !f.struck) { f.struck = true; if (m && !m.dead && Math.hypot(m.x - f.x, m.z - f.z) < m.rad + f.rad + .75) strike(f, m, f.dmg, true); }
    if (f.atk >= 1) { f.atk = -1; f.cd = rr(.3, .5); }
  } else if (fighting && f.cd <= 0) { f.atk = 0; f.struck = false; }
  f.flash = Math.max(0, f.flash - dt * 7); f.flinch = Math.max(0, f.flinch - dt * 4.5);
  const q = pathNear(B, f.x, f.z, f.s, 20); f.s = q.s; f.lat = q.lat; f.onRoad = Math.abs(q.lat) < ROAD_HALF + .3;
  f.y = f.onRoad ? B.py[q.i] + .03 : B.heightAt(f.x, f.z);
}
function strike(a, b, dmg, byMan) {
  const dx = b.x - a.x, dz = b.z - a.z, l = Math.hypot(dx, dz) || 1, mx = (a.x + b.x) / 2, mz = (a.z + b.z) / 2, big = !!(a.def && a.def.boss);
  const my = a.y + (byMan ? .85 : (a.hitH || .7) * (big ? .6 : 1)) + .1;
  const rx = Math.cos(CAM.yaw), rz = -Math.sin(CAM.yaw), se = Math.sin(CAM.elev), ux = -se * Math.sin(CAM.yaw), uz = -se * Math.cos(CAM.yaw);
  const rot = Math.atan2(dx * ux + dz * uz, dx * rx + dz * rz);
  const blade = byMan || (a.def && a.def.blade) || big;
  if (blade) fxTimed(7, mx, my, mz, big ? 4.2 : 1.55, big ? 4.2 : 1.55, byMan ? 2.2 : 2.0, byMan ? 2.2 : 1.7, byMan ? 2.4 : 1.3, .9, .2, { rot });
  if (byMan) { const metal = !!b.def.armor || (b.def.death === 'bones' && rnd() < .4); fxSparks(b.x - dx / l * b.rad, my, b.z - dz / l * b.rad, metal ? 7 : 3, 3.6, 3, 2.3, 1.2, { size: .055, grav: 7 }); sfx(metal ? 'clash' : 'slash', mx, mz, .7, rnd()); hitMonster(b, dmg, 'sword', dx / l, dz / l, a.tower); a.tower.recent += dmg * .5; }
  else {
    if (big) { fxDust(b.x, b.y + .1, b.z, 10, 1.4, { speed: 3 }); FX.shake = Math.min(1.2, FX.shake + .5); sfx('bossStep', b.x, b.z, 1, 1); fxTimed(4, b.x, b.y + .08, b.z, 4.5, 4.5, 1.2, .9, .6, .5, .35, { ground: true }); }
    const hitList = big ? G.men.filter(f => !f.dead && Math.hypot(f.x - b.x, f.z - b.z) < 1.5) : [b];
    for (const f of hitList) {
      f.hp -= dmg; f.flash = 1; f.flinch = 1;
      if (!f.torch && rnd() < .65) { fxSparks(f.x - dx / l * .2, my, f.z - dz / l * .2, 5, 3.2, 3, 2.3, 1.3, { size: .055, grav: 7 }); if (f === b) sfx('clash', mx, mz, .6, rnd()); } else if (f === b) sfx('slash', mx, mz, .55, rnd());
      if (f.hp <= 0) killFootman(f, dx / l, dz / l);
    }
  }
}
function drawFootman(f) {
  f.weapon = KIT.item.blade; f.shield = f.torch ? null : KIT.item.shieldH; f.wScale = 1;
  rigHuman(KIT.foot, SPEC.foot, f);
  if (f.torch && f.flame) { const p = RIGOUT.torch; f.flame.x = p.x; f.flame.y = p.y; f.flame.z = p.z; f.lx = p.x; f.ly = p.y + .2; f.lz = p.z; }
  if (f.hp < f.maxHp) G.hbars.push({ x: f.x, y: f.y + 1.55 * f.scale, z: f.z, f: sat(f.hp / f.maxHp), boss: false, man: true });
}

const _units = [];
function updateUnits(dt) {
  const B = G.B, mons = G.mons, men = G.men, L = B.L, maxLatBase = ROAD_HALF + .04;
  for (let i = men.length - 1; i >= 0; i--) { const f = men[i]; if (f.gone) { swapRemove(men, i); continue; } footmanThink(f, dt); if (f.gone) swapRemove(men, i); }
  _units.length = 0;
  for (const m of mons) { m.haste = 0; if (!m.dead && !m.fly && !m.def.ghost) _units.push(m); }
  for (const d of mons) if (!d.dead && d.def.aura && d.vis && !d.dying) for (const m of mons) if (m !== d && !m.dead && !m.fly && !m.def.boss && Math.abs(m.s - d.s) < d.def.aura[0]) m.haste = d.def.aura[1];
  for (const f of men) if (!f.dead && f.onRoad) _units.push(f);
  const U = _units, nu = U.length;
  for (const m of mons) {
    if (m.dead) continue;
    m.flash = Math.max(0, m.flash - dt * 7); m.flinch = Math.max(0, m.flinch - dt * 4.2);
    if (m.slowT > 0) { m.slowT -= dt; if (m.slowT <= 0) m.slowF = 0; }
    if (m.fly) { updateBat(m, dt); continue; }
    const def = m.def, maxLat = Math.max(0, maxLatBase - m.rad * .7);
    if (m.dying > 0) {
      m.dying -= dt; m.flinch = .5 + .5 * Math.sin(m.dying * 22); m.mv = 0; m.atk = -1; m.y -= dt * .12;
      if (rnd() < dt * 14) fxDust(m.x + rr(-.8, .8), m.y + rr(.4, 2.6), m.z + rr(-.8, .8), 1, .7, { a: .4 });
      if (m.dying <= 0) finishBoss(m); continue;
    }
    if (m.foe && (m.foe.dead || m.foe.gone)) m.foe = null;
    if (def.explode && m.foe) { m.hp = 0; killMonster(m, 'blast', 0, 0, null); continue; }
    if (def.regen && m.hp < m.maxHp && G.t - m.hitAt > 2.2) m.hp = Math.min(m.maxHp, m.hp + m.maxHp * def.regen * dt);
    if (def.ghost) { m.gT = (m.gT + dt) % (def.ghost[0] + def.ghost[1]); m.eth = m.gT < def.ghost[0]; }
    if (def.aura) { const b0 = m.beat; m.beat += dt * 7.5; if (m.vis && Math.floor(m.beat / TAU) !== Math.floor(b0 / TAU)) fxTimed(4, m.x, m.y + .08, m.z, def.aura[0] * 1.5, def.aura[0] * 1.5, 1.4, .5, .2, .22, .5, { ground: true }); }
    if (m.cast > 0) m.cast = Math.max(0, m.cast - dt * 1.1);
    if (def.summon && m.vis) {
      m.sumT -= dt;
      if (m.sumT <= 0 && m.sumN < def.summon.max && mons.length < 78) {
        const sm = def.summon; m.sumT = sm.every; m.sumN++; m.cast = 1; sfx('ignite', m.x, m.z, .7, .3);
        for (let i = 0; i < sm.n; i++) { const q = spawnMonster(sm.type, { s: Math.max(.5, m.s - .6 - .3 * i - (def.boss ? 1.2 : 0)), lat: clamp(m.lat + (i - (sm.n - 1) / 2) * .8 + rr(-.1, .1), -.9, .9), hpMul: (m.maxHp / def.hp) * sm.hp, pop: 1 }); fxTimed(4, q.x, q.y + .08, q.z, 1.8, 1.8, .4, 1.6, .7, .6, .5, { ground: true }); fxDust(q.x, q.y + .1, q.z, 4, .6, { a: .4, c: [.2, .34, .24] }); }
      }
    }
    if (def.stomp && m.vis) {
      m.stT -= dt;
      if (m.stT <= 0) {
        const sp = def.stomp; m.stT = sp.every; FX.shake = Math.min(1.2, FX.shake + .8); sfx('bossStep', m.x, m.z, 1.2, 1); sfx('roar', m.x, m.z, .6, .4);
        fxTimed(4, m.x, m.y + .08, m.z, sp.r * 2, sp.r * 2, .6, 1.2, 2.2, .8, .7, { ground: true }); fxDust(m.x, m.y + .1, m.z, 16, 1.8, { speed: 4, c: [.6, .7, .85] }); lightFlash(m.x, m.y + 1.5, m.z, 0x8fc8ff, 300, .5, 16);
        for (const tw of G.towers) if (tw.alive && tw.state === 'active' && dist2(tw.x, tw.z, m.x, m.z) < sp.r * sp.r) { tw.stun = sp.stun; fxTimed(5, tw.x, tw.y + 2, tw.z, 3, 3, .6, 1.2, 2.4, .9, .3); }
      }
    }
    let want = def.spd * m.spdMul * (1 - m.slowF) * (1 + m.haste), hopMul = 1;
    if (def.frenzy) want *= 1 + def.frenzy * (1 - m.hp / m.maxHp);
    if (def.enrage && m.hp < m.maxHp * def.enrage[0]) { want *= def.enrage[1]; if (!m.rage) { m.rage = true; sfx('roar', m.x, m.z, 1, .9); fxEmbers(m.x, m.y + 2, m.z, 40, 1.2); FX.shake = Math.min(1.2, FX.shake + .6); } }
    if (def.hop) { if (!m.foe) m.hop = (m.hop + dt * def.hop[0] * (1 - m.slowF * .6)) % 1; hopMul = (m.hop > .22 && m.hop < .62) ? def.hop[1] : .1; }
    let v = want * hopMul, obstacle = null, og = 9;
    if (def.boss) {
      if (!m.foe) for (const f of men) if (!f.dead && f.onRoad && f.s > m.s - .3 && f.s - m.s < 1.9 && Math.abs(f.lat - m.lat) < 1.4) { m.foe = f; break; }
      if (m.foe) v *= .55;
    } else if (m.foe) v = 0;
    else if (!def.ghost) for (let j = 0; j < nu; j++) {
      const o = U[j]; if (o === m || (def.slip && o.isMan)) continue; const ds = o.s - m.s; if (ds <= 0 || ds > 1.7 + m.rad + o.rad) continue;
      if (Math.abs(o.lat - m.lat) > (m.rad + o.rad) * .92) continue;
      const gap = ds - (m.rad + o.rad), lim = Math.max(0, (o.vf || 0) + gap * 2.6);
      if (lim < v) { v = lim; obstacle = o; og = gap; }
    }
    if (!m.foe && obstacle && obstacle.isMan && og < .3 && obstacle.foes < 2) m.foe = obstacle;
    if (obstacle && v < want * .55 && !m.foe) {
      if (m.laneT === undefined || m.laneT <= 0) {
        m.laneT = .35; const first = rnd() < .5 ? 1 : -1;
        for (const d of [first * .5, -first * .5, first * 1.0, -first * 1.0]) {
          const cand = clamp(m.lat + d, -maxLat, maxLat); if (Math.abs(cand - m.lat) < .2) continue; let free = true;
          for (let j = 0; j < nu && free; j++) { const o = U[j]; if (o === m) continue; const ds = o.s - m.s; if (ds < -.5 - o.rad || ds > 1.3 + o.rad) continue; if (Math.abs(o.lat - cand) < (m.rad + o.rad) * .97) free = false; }
          if (free) { m.lane = cand; break; }
        }
      } else m.laneT -= dt;
    } else if (!obstacle) m.lane = damp(m.lane, m.home, .25, dt);
    m.vf = v; m.spdNow = damp(m.spdNow, want * (m.foe ? (def.boss ? .55 : 0) : 1), 3, dt);
    const kd = Math.exp(-7 * dt); m.s += (v - m.ks * 0) * dt + m.ks * dt; m.lat += m.kl * dt; m.ks *= kd; m.kl *= kd;
    m.lat += clamp(m.lane - m.lat, -1.3 * dt, 1.3 * dt); m.lat = clamp(m.lat, -maxLat, maxLat); m.s = Math.max(.3, m.s);
    const moved = v * dt;
    if (def.death === 'fur' || def.death === 'bug') m.ph += moved * (def.boss ? 2.4 : def.death === 'bug' ? 9 / Math.sqrt(m.scale) : 7.5 / m.scale); else if (def.boss) m.ph += moved * 6.0 / m.scale * 1.15; else m.ph += moved * 5.6 / (m.scale || 1);
    m.mv = damp(m.mv, sat(v / (want * .5 + .01)), 10, dt);
    m.cd -= dt;
    if (m.atk >= 0) {
      m.atk += dt / def.atkT * 1.7;
      if (m.atk >= .5 && !m.struck) { m.struck = true; const f = m.foe; if (f && !f.dead && Math.hypot(f.x - m.x, f.z - m.z) < m.rad + f.rad + (def.boss ? 1.4 : .8)) strike(m, f, def.dmg * G.dmgMul, false); }
      if (m.atk >= 1) { m.atk = -1; m.cd = def.atkT * rr(.35, .5); }
    } else if (m.foe && m.cd <= 0) { m.atk = 0; m.struck = false; if (def.boss) sfx('roar', m.x, m.z, .5, .7); }
    if (def.boss && v > .05) { const st = Math.floor(m.ph / PI); if (st !== m.step) { m.step = st; const p = pathAt(B, m.s, _ap), sd = (st & 1) ? 1 : -1; const fxp = m.x - p.tz * sd * .5, fzp = m.z + p.tx * sd * .5; fxDust(fxp, m.y + .05, fzp, 7, 1.0, { speed: 2.2 }); FX.shake = Math.min(1.1, FX.shake + .4); sfx('bossStep', m.x, m.z, 1, .6); FX.decals.add(B.heightAt, fxp, fzp, .55, .02, .017, .015, .5, 9); } }
    if (m.s >= L - .35) { leak(m); continue; }
  }
  for (const u of U) if (u.isMan) u.foes = 0;
  for (const m of mons) if (!m.dead && m.foe) m.foe.foes++;
  for (const m of mons) { if (m.dead || m.fly) continue; const p = pathAt(B, m.s, _ap); m.x = p.x - p.tz * m.lat; m.z = p.z + p.tx * m.lat; m.y = p.y + .02 - (m.dying > 0 ? (1.9 - m.dying) * .15 : 0); m._tx = p.tx; m._tz = p.tz; m._x0 = m.x; m._z0 = m.z; }
  for (let i = 0; i < nu; i++) {
    const a = U[i]; if (a.dead) continue;
    for (let j = i + 1; j < nu; j++) {
      const b = U[j]; if (b.dead) continue; const dx = b.x - a.x, dz = b.z - a.z, rs = a.rad + b.rad, d2 = dx * dx + dz * dz;
      if (d2 >= rs * rs || d2 < 1e-6) continue;
      const d = Math.sqrt(d2), ov = (rs - d) * .6, ma = a.isMan ? (a.target ? 9 : 4) : a.mass, mb = b.isMan ? (b.target ? 9 : 4) : b.mass, wa = mb / (ma + mb), wb = ma / (ma + mb);
      a.x -= dx / d * ov * wa; a.z -= dz / d * ov * wa; b.x += dx / d * ov * wb; b.z += dz / d * ov * wb;
    }
  }
  for (const m of mons) {
    if (m.dead || m.fly) continue;
    const dx = m.x - m._x0, dz = m.z - m._z0, maxLat = Math.max(0, maxLatBase - m.rad * .7);
    if (dx || dz) { m.s = Math.max(.3, m.s + clamp(dx * m._tx + dz * m._tz, -.12, .12)); m.lat = clamp(m.lat + (-dx * m._tz + dz * m._tx), -maxLat, maxLat); }
    const p = pathAt(B, m.s, _ap); m.x = p.x - p.tz * m.lat; m.z = p.z + p.tx * m.lat;
    let yaw = Math.atan2(p.tx, p.tz); if (m.foe) yaw = Math.atan2(m.foe.x - m.x, m.foe.z - m.z);
    m.yaw = angDamp(m.yaw, yaw, m.def.boss ? 4 : 9, dt);
    m.prog = m.s / L; if (!m.vis && m.s > B.cave.s + 1.7) { m.vis = true; UI.sawMonster(m.type); }
    if (m.pop > 0) m.pop = Math.max(0, m.pop - dt * 3);
  }
}
function updateBat(m, dt) {
  const B = G.B, b = B.beacon, def = m.def, v = def.spd * m.spdMul * (1 - m.slowF);
  m.s = Math.min(B.L, m.s + v * dt);
  const f = clamp(m.s / PATH_STEP, 0, B.n - 1.001), i = Math.floor(f), u = f - i, dxp = B.ax[i + 1] - B.ax[i], dzp = B.az[i + 1] - B.az[i], dl = Math.hypot(dxp, dzp) || 1;
  const lat = m.side + Math.sin(G.t * (def.glow ? 2.6 : 1.7) + m.lseed * 3) * (def.glow ? .7 : .45), e = sat((m.s - (B.L - 6)) / 6), e2 = e * e * (3 - 2 * e);
  const tx = lerp(lerp(B.ax[i], B.ax[i + 1], u) - dzp / dl * lat, b.x, e2), tz = lerp(lerp(B.az[i], B.az[i + 1], u) + dxp / dl * lat, b.z, e2);
  let vx = (tx - m.x) * 4, vz = (tz - m.z) * 4; const sp = Math.hypot(vx, vz), cap = v * 2.2 + .5; if (sp > cap) { vx *= cap / sp; vz *= cap / sp; }
  m.vx = damp(m.vx, vx, 8, dt); m.vz = damp(m.vz, vz, 8, dt); m.x += m.vx * dt; m.z += m.vz * dt;
  const ground = B.heightAt(m.x, m.z), k = sat((m.s - B.cave.s - 1.5) / 2.5);
  let top = Math.max(B.topAt(m.x, m.z), B.topAt(m.x + m.vx * .45, m.z + m.vz * .45));
  for (const t of G.towers) if (t.alive && dist2(t.x, t.z, m.x + m.vx * .3, m.z + m.vz * .3) < 3.2) top = Math.max(top, t.y + (t.mounts ? t.mounts.top : 2.5) + .4);
  let wantY = Math.max(ground + m.alt, lerp(ground + m.alt, top + (def.glow ? .45 : .7), k)) + (def.glow ? Math.sin(G.t * 2.3 + m.lseed * 5) * .3 : 0);
  wantY = lerp(wantY, b.y - .2, e2 * e2);
  m.y = damp(m.y, wantY, wantY > m.y ? 5 : 2.2, dt); if (sp > .05) m.yaw = angDamp(m.yaw, Math.atan2(m.vx, m.vz), 8, dt); m.ph += dt * def.flap;
  m.prog = m.s / B.L * .98;
  if (e >= 1 && (dist2(b.x, b.z, m.x, m.z) < .8 || (m.endT = (m.endT || 0) + dt) > 3)) leak(m);
}
function leak(m) {
  const B = G.B, n = m.def.lives;
  G.lives = Math.max(0, G.lives - n); G.leaks++; G.waveLeaks++; G.leakTypes[m.type] = (G.leakTypes[m.type] || 0) + n;
  LT.beaconGutter = 1; UI.hurt = 1;
  if (m.fly) { fxSparks(m.x, m.y, m.z, 14, 5, 3, 1.4, .4); fxSmoke(m.x, m.y, m.z, 0, 1, 0, 1.2, .5, .8, .2, .2, .2, .6); }
  else { for (let i = 0; i < 6; i++) fxSmoke(m.x + rr(-.3, .3), m.y + rr(.2, 1), m.z + rr(-.3, .3), rr(-.4, .4), rr(.2, .8), rr(-.4, .4), rr(.6, 1.2), .5, .7, .05, .05, .07, .7, { drag: 2 }); }
  fxEmbers(B.beacon.x, B.beacon.y, B.beacon.z, 26, .5);
  sfx('leak', B.gate.x, B.gate.z, 1);
  removeMonster(m);
}
