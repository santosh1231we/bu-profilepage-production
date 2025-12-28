Quick steps to deploy this Vite app to Vercel

1. Commit your changes to a Git repository and push to GitHub (or Git provider supported by Vercel).

2. Go to https://vercel.com and sign in with GitHub / GitLab / Bitbucket.

3. Import project: select the repository containing this project.

4. In the project settings when Vercel asks for build settings, use:
   - Framework Preset: Other
   - Build Command: npm run build
   - Output Directory: dist

   The included `vercel.json` already instructs Vercel to use `@vercel/static-build` and `dist`.

5. Finish import; Vercel will run the build and deploy.

Notes
- Ensure environment variables (if any) are configured in Vercel's project settings.
- You can set the production branch or preview branches as needed.
- To run locally: npm run dev (for development) and npm run build && npm run preview (for a local preview of the production build).

If you'd like, I can also add a GitHub Action to auto-deploy to Vercel on push to main (requires setting VERCEL_TOKEN in repo secrets).