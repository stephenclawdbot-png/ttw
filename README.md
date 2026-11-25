# ttw

A study and deployment of [Cinderwatch](https://kevintngo.github.io/cinderwatch/) by Kevin Ngo.

Cinderwatch is a self-playing 3D isometric tower defense in a single HTML file, generated with Fable 5.2. Open source under MIT.

This repo mirrors the source for local study and deploys the playable game to Vercel.

**Play the original:** https://kevintngo.github.io/cinderwatch/

## Local run

Open `index.html` in a browser. No build or server required.

## Build (for development)

```bash
python3 tools/build.py
```

Joins `src/*.js` and inlines three.js into `index.html`.
