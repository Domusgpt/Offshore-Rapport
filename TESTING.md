# Testing Guide for Offshore Rapport

This document provides instructions for testing and validating the Offshore Rapport project.

## Prerequisites

Before running tests, make sure you have Node.js and npm installed. Then install the project dependencies:

```bash
npm install
```

## Available Testing Commands

The project includes several tools for testing and validation:

### Local Development Server

To start a local development server:

```bash
npm start
```

This will serve the project at `http://localhost:3000` (or another port if 3000 is in use).

### HTML Validation

To validate HTML files:

```bash
npm run validate
```

This command runs html-validate on all HTML files in the project root.

### JavaScript Linting

To lint JavaScript files:

```bash
npm run lint
```

This command runs ESLint on all JavaScript files in the `js/` directory.

## Manual Testing Checklist

Follow this checklist to manually test key functionality:

### Basic Page Loading

- [ ] Home page loads correctly
- [ ] Category page loads correctly
- [ ] Article page loads correctly
- [ ] Dashboard page loads correctly

### Responsive Design

- [ ] Test all pages on mobile viewport (320px-480px width)
- [ ] Test all pages on tablet viewport (768px-1024px width)
- [ ] Test all pages on desktop viewport (1200px+ width)
- [ ] Check that navigation menu collapses to hamburger on mobile
- [ ] Verify that content stacks correctly on smaller screens

### Content Loading

- [ ] Verify articles load from JSON data
- [ ] Check that article details display correctly
- [ ] Test that article links work properly

### Interactive Features

- [ ] Test category filter functionality
- [ ] Test tag filter functionality
- [ ] Verify newsletter form validation
- [ ] Check that animations work correctly

### Dashboard Functionality

- [ ] Test creating a new article
- [ ] Test editing an existing article
- [ ] Test deleting an article
- [ ] Verify JSON preview updates correctly
- [ ] Test import/export functionality

### Accessibility

- [ ] Verify proper heading hierarchy
- [ ] Check image alt text is present
- [ ] Test keyboard navigation
- [ ] Verify ARIA attributes where appropriate

## Browser Compatibility

Test in the following browsers:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome and Safari

## Reporting Issues

When reporting issues, please include:

1. The specific page/feature with the issue
2. Steps to reproduce
3. Expected behavior
4. Actual behavior
5. Browser and device information
6. Screenshots if applicable