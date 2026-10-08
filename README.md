# Light Theory Labs — website

Static site for GitHub Pages. No build step is required to deploy: the HTML in this folder is the site.

## Deploy

1. Push the contents of `site/` to the root of the `main` branch (or to a `docs/` folder).
2. Repository → Settings → Pages → Source: *Deploy from a branch*, branch `main`, folder `/` (or `/docs`).
3. The site serves at `https://crankymercury88.github.io/LightTheoryLabs/`. `.nojekyll` is included so folders and assets pass through untouched.
4. For a custom domain, add a `CNAME` file containing the domain and update `config.baseUrl` in `build/content.js`.

## Edit copy

All copy lives in `build/content.js`. `build/build.js` turns it into pages. Regenerate with Node:

```sh
node -e "const c=require('fs').readFileSync('build/content.js','utf8');const {build}=require('./build/build.js');const C=new Function(c+';return CONTENT')();for(const [p,s] of Object.entries(build(C))){require('fs').mkdirSync(require('path').dirname(p),{recursive:true});require('fs').writeFileSync(p,s)}"
```

## Before launch

- `config.formAction` — paste a form endpoint (e.g. Formspree) so demo requests submit on the page. Empty falls back to the visitor's email app.
- `config.calendarUrl` — replace the placeholder with the real booking link.
- `config.email` — replace with the real inbox.
- `config.social` — confirm the LinkedIn, YouTube, GitHub and Hugging Face URLs.
- `privacy/` and `terms/` are stubs.
- Client logos in `home.logos` load from Wikimedia Commons. Download the SVGs into `assets/logos/` and point each `src` there.
- Graphics are generated placeholders. See "Website Asset List" for the real screenshots and footage to supply.
- Register the sitemap in Google Search Console and Bing Webmaster Tools; turn on IndexNow.

## Structure

- `/` home · `/solutions/<slug>/` four offers · `/research/` · `/insights/` and `/insights/<slug>/` three articles · `/experts/` · `/partners/` · `/contact/`
- `sitemap.xml`, `robots.txt`, `llms.txt`, `404.html`
- `assets/site.css` carries the Light Theory Labs design tokens; fonts in `assets/fonts/`.
