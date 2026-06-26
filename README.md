# Watch Room

A minimal static watch-room app built for free cloud hosting.

## What it does

- Lets a room creator choose a room name
- Lets the creator choose what to watch (movie, series, anime, cartoon, animation)
- Shows a Netflix-style watch screen and shared player preview
- Stores the last room in local storage

## Files

- `index.html` — app structure and UI
- `styles.css` — dark Netflix-inspired styling
- `app.js` — room creation, preview playback, and local storage

## Deployment

This app is ready for GitHub Pages.

### To deploy manually

1. Push this folder to a GitHub repository.
2. Enable GitHub Pages in the repository settings.
3. Set the source to GitHub Actions.
4. The included workflow will publish the app automatically.

## Local preview

Open `index.html` in your browser to try the app locally.

## Deploy via GitHub and Vercel

1. Create a GitHub repository and push this folder there.

```bash
git remote add origin https://github.com/<your-user>/<your-repo>.git
git push -u origin master
```

2. Open https://vercel.com and import the repository.
3. Vercel will detect the static app and deploy it automatically.

## Notes

This is a static front-end prototype. It does not include server-side streaming or real video hosting, but the UI is ready for free cloud deployment and demonstrates the room/selection workflow.
