# Setting Up Offshore Rapport on GitHub

Follow these steps to set up the Offshore Rapport repository on GitHub.

## 1. Create a New Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner and select "New repository"
3. Enter the repository name: `Offshore-Rapport`
4. Add a description: "A professional digital magazine focusing on global marine economic activity"
5. Choose visibility (public or private)
6. Do not initialize with README, .gitignore, or license files
7. Click "Create repository"

## 2. Push the Local Repository

After creating the repository, GitHub will show commands to push an existing repository. Run these commands in your local Offshore-Rapport directory:

```bash
git remote add origin https://github.com/YOUR-USERNAME/Offshore-Rapport.git
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

## 3. Configure Repository Settings

The repository includes a configuration file at `.github/repository-settings.json` with the recommended repository settings. You can manually apply these settings:

1. Go to the repository on GitHub
2. Navigate to "Settings" > "General"
3. Configure options according to the JSON file (features, merge options, etc.)
4. Set up branch protection rules for the main branch
5. Add topics to make your repository more discoverable

## 4. Set Up GitHub Pages (Optional)

If you want to deploy the site using GitHub Pages:

1. Go to "Settings" > "Pages"
2. Under "Source", select "main" branch and the root folder
3. Click "Save"
4. The site will be available at `https://YOUR-USERNAME.github.io/Offshore-Rapport/`

## 5. Connect to Netlify (Recommended)

For better hosting features, connect to Netlify:

1. Go to [Netlify.com](https://netlify.com) and sign in
2. Click "New site from Git"
3. Select GitHub and authorize Netlify
4. Choose the Offshore-Rapport repository
5. Configure build settings:
   - Build command: Leave blank
   - Publish directory: `.`
6. Click "Deploy site"
7. Add your custom domain if desired

## 6. Configure GitHub Actions

The repository is already set up with GitHub Actions workflows:

1. `.github/workflows/validate.yml` - Validates HTML and JavaScript
2. `.github/workflows/deploy.yml` - Deploys to Netlify (requires setup)

To enable Netlify deployment via GitHub Actions:

1. Go to Netlify and obtain an auth token and site ID
2. Add these secrets to your GitHub repository:
   - Go to "Settings" > "Secrets" > "Actions"
   - Add `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID`
3. Uncomment the deployment section in `.github/workflows/deploy.yml`

## 7. Update CODEOWNERS

1. Edit `.github/CODEOWNERS` to replace `YOUR-GITHUB-USERNAME` with your actual GitHub username
2. Commit and push the change

## 8. Start Development

Once your repository is set up:

1. Create issues for new features or bugs
2. Create branches for each feature/fix
3. Submit pull requests for review
4. Use the GitHub Actions workflows to validate your changes
5. Merge approved pull requests to deploy changes