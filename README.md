# XYZ Tronics Website

React + Vite marketing site designed to deploy cleanly on Cloudflare Pages.

## Tech Stack

- React
- React Router
- Vite

## Local Development

1. Install dependencies:
   - `npm install`
2. Start the dev server:
   - `npm run dev`
3. Build for production:
   - `npm run build`

## Cloudflare Pages

Use these settings in Cloudflare Pages:

- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`

The build emits a Cloudflare-compatible `_redirects` file so React routes like `/services`, `/about`, and `/contact` work after deployment.

## Replace Before Launch

- Update the placeholder company name: `XYZ Tronics`
- Update phone number: `+1 (519) 555-0147`
- Update email: `hello@xyztronics.ca`
- Replace the placeholder experience text with your actual business details
