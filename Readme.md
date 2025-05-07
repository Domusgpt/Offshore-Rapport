# Offshore Rapport

A professional digital magazine focusing on global marine economic activity including fisheries, aquaculture, offshore energy, marine technology, policy, and market analysis.

## Overview

Offshore Rapport is a modern web platform that delivers in-depth coverage of marine industries through a clean, professional interface. The platform is designed to dynamically load content from JSON data, allowing for easy content management without the need for a complex backend system.

## Features

- **Dynamic Content Loading**: Articles and content loaded from JSON data
- **Category-Based Organization**: Content organized by industry sectors
- **Tag Filtering System**: Filter articles by tags for more refined content discovery
- **Responsive Design**: Mobile-first approach for all screen sizes
- **Content Dashboard**: Administrative interface for managing articles and content
- **Professional Aesthetic**: Clean, authoritative design suitable for business audience

## Technology Stack

- HTML5 (Semantic markup)
- CSS3 (Variables, Grid, Flexbox)
- JavaScript (ES6+, Modular architecture)
- JSON (Data storage)
- Netlify (Deployment)

## Project Structure

```
/
├── index.html          # Homepage
├── category.html       # Category listing template
├── article.html        # Single article template
├── dashboard.html      # Content management interface
├── styles.css          # All styles for the website
├── netlify.toml        # Deployment configuration
├── js/
│   ├── main.js             # Global interactions
│   ├── data-loader.js      # JSON data loading & processing
│   ├── article-renderer.js # Dynamic content rendering
│   ├── content-filter.js   # Category-based filtering
│   ├── tag-filter.js       # Tag-based filtering
│   └── dashboard/          # Dashboard-specific scripts
└── data/
    └── articles.json       # Content data
```

## Getting Started

### Prerequisites

- Modern web browser
- Basic HTTP server for local development

### Local Development

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/offshore-rapport.git
   cd offshore-rapport
   ```

2. Serve the project locally:
   Using any HTTP server of your choice. For example, with Python:
   ```
   python -m http.server
   ```
   Or with Node.js:
   ```
   npx serve
   ```

3. Open your browser and navigate to `http://localhost:8000` (or whatever port your server uses)

## Content Management

The project includes a dashboard for content management accessible at `/dashboard.html`. This interface allows:

- Creating new articles
- Editing existing content
- Managing tags and categories
- Importing/exporting JSON data

## Deployment

The project is configured for deployment on Netlify. The `netlify.toml` file includes settings for:

- Build configuration
- Redirects
- Asset processing

To deploy:
1. Connect your repository to Netlify
2. Configure the build settings to use the project root as the publish directory
3. Deploy

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Designed and developed with assistance from Claude AI
- All images used are placeholder images from unsplash.com