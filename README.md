# XYZ Tronics Website

Static multi-page marketing site designed to deploy easily on Cloudflare Pages.

## Pages

- `/` Home
- `/services.html`
- `/industries.html`
- `/about.html`
- `/contact.html`

## Deploy To Cloudflare Pages

1. Push this repo to GitHub.
2. In Cloudflare Pages, create a new project from the repo.
3. Use these settings:
   - Framework preset: `None`
   - Build command: leave blank
   - Build output directory: `/`
4. Add your custom domain in Cloudflare Pages after deployment.

## Replace Before Launch

- Update the placeholder company name if needed: `XYZ Tronics`
- Update phone number: `+1 (519) 555-0147`
- Update email: `hello@xyztronics.ca`
- Replace copy with your exact experience and business details

## Contact Form Note

The contact form currently opens the visitor's email app with the message prefilled. If you want, it can later be connected to a Cloudflare Pages Function, email API, or CRM form handler.
