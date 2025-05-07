# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Offshore Rapport - AI Development Guide

## 1. Project Overview

**Project Name:** Offshore Rapport
**Purpose:** A professional digital magazine focusing on global marine economic activity (fisheries, aquaculture, offshore energy, marine technology, policy, markets).
**Current State:** Frontend structure (HTML, CSS, JS) is established with dynamic content loading from JSON data.

The project includes:
- HTML templates for different page types (index, category, article)
- CSS styling with variables for consistent design
- JavaScript modules for loading, filtering, and rendering content
- A dashboard for content management

**Key Goal for AI:** Assist in enhancing the frontend and implementing advanced features. Help optimize performance, improve accessibility, and extend functionality while maintaining the professional aesthetic.

## 2. Core Technologies

* **HTML5:** Semantic and accessible markup
* **CSS3:**
  * CSS Variables (Design Tokens) in `styles.css`
  * Mobile-first responsive design
  * Grid and Flexbox layouts
* **JavaScript (ES6+):**
  * Modular architecture with separate concerns:
    * `data-loader.js`: Fetches and processes JSON data
    * `article-renderer.js`: Creates DOM elements from data
    * `content-filter.js` & `tag-filter.js`: Handle filtering
    * `dashboard/dashboard.js`: Content management interface
  * No external frameworks - vanilla JavaScript only
* **JSON:** Used as the content source in `/data/articles.json`
* **Deployment:** Netlify configuration in `netlify.toml`

## 3. File Structure

* **`/` (Root):**
  * `index.html`: Homepage
  * `category.html`: Category listing template
  * `article.html`: Single article template
  * `dashboard.html`: Content management interface
  * `styles.css`: All styles for the website
  * `netlify.toml`: Deployment configuration
  * `README.md`, `CHANGELOG.md`, etc.: Documentation
* **`/js/`:**
  * `main.js`: Global interactions and initialization
  * `data-loader.js`: JSON data fetching and processing
  * `article-renderer.js`: Dynamic content rendering
  * `content-filter.js`: Category-based filtering
  * `tag-filter.js`: Tag-based filtering
  * `/dashboard/`: Dashboard-specific scripts
* **`/data/`:**
  * `articles.json`: Content data store

## 4. Development Guidelines

### General Principles

1. **Maintain Consistency:** Follow existing patterns in code structure, naming conventions, and design elements.
2. **Use CSS Variables:** Always use CSS variables for colors, fonts, spacing, etc. Never hardcode values.
3. **Keep Things Modular:** Maintain separation of concerns between data loading, rendering, and filtering.
4. **Prioritize Performance:** Minimize DOM operations, optimize loops, and use efficient selectors.
5. **Ensure Accessibility:** Use semantic HTML, appropriate ARIA attributes, and maintain keyboard navigability.
6. **Mobile-First:** Design and test for mobile devices first, then enhance for larger screens.

### Specific Development Patterns

#### Adding New Features

1. **Analyze Existing Code:** Understand how similar features are implemented before adding new ones.
2. **Update Documentation:** Document new features in code comments and update README/CHANGELOG as needed.
3. **Test Thoroughly:** Check functionality across browsers and screen sizes.

#### JavaScript Guidelines

1. **Module Pattern:** Use immediately-invoked function expressions (IIFE) for modules.
2. **Event Handling:** Use event delegation where appropriate.
3. **Error Handling:** Always include error handling for asynchronous operations.
4. **Avoid Global Variables:** Encapsulate functionality within modules.

#### CSS Guidelines

1. **Use Existing Variables:** Reference the `:root` section in `styles.css` for available variables.
2. **Follow BEM-like Naming:** Use a consistent naming pattern for CSS classes.
3. **Mobile-First Media Queries:** Start with mobile styles, then use `@media (min-width: ...)` for larger screens.

## 5. Enhancement Priorities

These are areas where Claude can focus on improving the project:

1. **Performance Optimization:**
   * Lazy loading for images and content
   * Performance monitoring and metrics
   * Caching strategies for JSON data

2. **Enhanced Filtering:**
   * Combined filtering (category + tags)
   * Sort options (date, popularity)
   * Search functionality

3. **User Experience Improvements:**
   * Better loading states and animations
   * Scroll position memory between pages
   * Keyboard navigation enhancements

4. **Content Dashboard Enhancement:**
   * Image upload functionality
   * WYSIWYG editor for content
   * User roles and permissions
   * Preview functionality

5. **Analytics and Metrics:**
   * Tracking popular articles and tags
   * User engagement metrics
   * A/B testing framework

6. **Accessibility Improvements:**
   * ARIA enhancement
   * Keyboard navigation
   * Color contrast verification
   * Screen reader testing

## 6. Task Examples

When requesting assistance with Offshore Rapport, here are some example tasks:

### Optimize Performance
"I need to optimize the loading performance of article cards. Currently, all cards are rendered at once, which can be slow with many articles. Please modify `article-renderer.js` to implement lazy loading for article cards as the user scrolls."

### Enhance Filtering
"Please enhance the filtering system to support combined category and tag filtering. Currently, they operate independently. I want users to be able to select a category and then further refine by tags."

### Implement Search
"I'd like to add a search function to find articles by title or content. Please create a `search.js` module that integrates with the existing data loading system and add the necessary HTML/CSS for a search interface."

### Dashboard Enhancements
"The dashboard needs a preview feature where editors can see how an article will look before publishing. Please add this functionality to `dashboard.js` and create a preview modal."

### Accessibility Audit
"Please review the site for accessibility issues, especially focusing on keyboard navigation, ARIA attributes, and color contrast. Provide recommendations for improvements."

## 7. Troubleshooting & Debugging

When encountering issues:
1. Check the browser console for errors
2. Verify data structure matches expected format
3. Test functionality in isolation
4. Use console.log at key points to trace execution flow

Common issues:
- JSON parsing errors in data loading
- CSS specificity conflicts
- Event listener conflicts
- Mobile responsiveness issues

## 8. Future Roadmap

Planned future enhancements:
- User accounts and personalization
- Comments and community features
- Integration with a CMS backend
- Email newsletter automation
- Multi-language support
- Dark mode theme

## 9. Important Notes

- The project is designed to work without external libraries or frameworks
- All content is loaded from JSON for now, but could be connected to an API in the future
- Maintaining performance on mobile devices is critical
- The professional aesthetic and branding must be preserved in all enhancements

By following these guidelines, Claude can effectively assist with enhancing and extending the Offshore Rapport project while maintaining code quality and design consistency.