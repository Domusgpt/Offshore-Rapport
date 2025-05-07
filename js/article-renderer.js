// js/article-renderer.js - Renders articles from JSON data

/**
 * ArticleRenderer - Module for rendering article content from JSON data
 * This module handles creating HTML elements from article data
 * and inserting them into the appropriate places in the DOM.
 */
const OffshoreRapportRenderer = (function() {
  /**
   * Create an article card element from article data
   * @param {Object} article - Article data object
   * @returns {HTMLElement} The article card element
   */
  function createArticleCard(article) {
    // Create the article element
    const articleElement = document.createElement('article');
    articleElement.className = `article-card ${article.category} animate-on-scroll`;
    
    // Create the article link
    const linkElement = document.createElement('a');
    linkElement.href = `article.html?id=${article.id}`;
    linkElement.className = 'article-link';
    
    // Create card image
    const imageContainer = document.createElement('div');
    imageContainer.className = 'card-image';
    
    const imageElement = document.createElement('img');
    imageElement.src = article.mainImageUrl || 'https://source.unsplash.com/random/600x400/?ocean';
    imageElement.alt = article.imageAltText || article.title;
    
    imageContainer.appendChild(imageElement);
    
    // Create card content
    const contentContainer = document.createElement('div');
    contentContainer.className = 'card-content';
    
    // Title
    const titleElement = document.createElement('h3');
    titleElement.textContent = article.title;
    
    // Excerpt/summary
    const excerptElement = document.createElement('p');
    excerptElement.className = 'excerpt';
    excerptElement.textContent = article.summary;
    
    // Metadata
    const metaElement = document.createElement('div');
    metaElement.className = 'article-meta';
    
    const metadataElement = document.createElement('span');
    metadataElement.className = 'metadata';
    // Assume 200 words per minute reading time based on summary length
    const readTime = Math.max(5, Math.ceil(article.summary.split(' ').length / 40));
    metadataElement.textContent = `${readTime} Min Read`;
    
    metaElement.appendChild(metadataElement);
    
    // Tags
    if (article.keywords && article.keywords.length > 0) {
      const tagsElement = document.createElement('div');
      tagsElement.className = 'article-tags';
      
      article.keywords.slice(0, 3).forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag';
        tagElement.textContent = tag;
        tagsElement.appendChild(tagElement);
      });
      
      contentContainer.appendChild(titleElement);
      contentContainer.appendChild(excerptElement);
      contentContainer.appendChild(metaElement);
      contentContainer.appendChild(tagsElement);
    } else {
      contentContainer.appendChild(titleElement);
      contentContainer.appendChild(excerptElement);
      contentContainer.appendChild(metaElement);
    }
    
    // Assemble the article card
    linkElement.appendChild(imageContainer);
    linkElement.appendChild(contentContainer);
    articleElement.appendChild(linkElement);
    
    return articleElement;
  }
  
  /**
   * Render article cards into a container element
   * @param {Array} articles - Array of article data objects
   * @param {string} containerId - ID of the container element
   */
  function renderArticleCards(articles, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container element with ID '${containerId}' not found.`);
      return;
    }
    
    // Clear existing content
    container.innerHTML = '';
    
    // Create and append article cards
    articles.forEach(article => {
      const card = createArticleCard(article);
      container.appendChild(card);
    });
    
    // Initialize animations for new cards
    initializeAnimations();
  }
  
  /**
   * Render a single article page
   * @param {Object} article - Article data object
   */
  function renderArticlePage(article) {
    // Set page title
    document.title = `${article.title} | Offshore Rapport`;
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', article.summary);
    }
    
    // Update body class based on category
    document.body.className = `article-page ${article.category}`;
    
    // Set category pill
    const categoryPill = document.querySelector('.category-pill');
    if (categoryPill) {
      categoryPill.className = `category-pill ${article.category}`;
      categoryPill.textContent = getCategoryLabel(article.category);
    }
    
    // Set article title
    const titleElement = document.querySelector('.article-title');
    if (titleElement) {
      titleElement.textContent = article.title;
    }
    
    // Set byline
    const bylineElement = document.querySelector('.byline');
    if (bylineElement) {
      bylineElement.textContent = `From ${article.sourceName}`;
    }
    
    // Set metadata (date, etc.)
    const metadataElement = document.querySelector('.metadata');
    if (metadataElement) {
      const publishedDate = new Date(article.publicationDate);
      const formattedDate = publishedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      // Assume 200 words per minute reading time based on summary length
      const readTime = Math.max(5, Math.ceil(article.summary.split(' ').length / 40));
      
      metadataElement.textContent = `Published: ${formattedDate} • ${readTime} Min Read`;
    }
    
    // Set hero image
    const heroImageElement = document.querySelector('.hero-image img');
    if (heroImageElement) {
      heroImageElement.src = article.mainImageUrl || 'https://source.unsplash.com/random/1400x800/?ocean';
      heroImageElement.alt = article.imageAltText || article.title;
    }
    
    // Set hero image caption
    const captionElement = document.querySelector('.hero-image figcaption');
    if (captionElement) {
      captionElement.textContent = article.imageAltText || 'Image related to the article content';
    }
    
    // Set article content
    const contentWrapper = document.querySelector('.content-wrapper');
    if (contentWrapper) {
      // Clear existing content except the tags section
      const tagsSection = contentWrapper.querySelector('.article-tags');
      contentWrapper.innerHTML = '';
      
      // Add lead paragraph with summary
      const leadParagraph = document.createElement('p');
      leadParagraph.className = 'lead';
      leadParagraph.textContent = article.summary;
      contentWrapper.appendChild(leadParagraph);
      
      // Add key takeaways
      if (article.keyTakeaways && article.keyTakeaways.length > 0) {
        const takeawaysTitle = document.createElement('h2');
        takeawaysTitle.textContent = 'Key Takeaways';
        contentWrapper.appendChild(takeawaysTitle);
        
        const takeawaysList = document.createElement('ul');
        article.keyTakeaways.forEach(takeaway => {
          const listItem = document.createElement('li');
          listItem.textContent = takeaway;
          takeawaysList.appendChild(listItem);
        });
        
        contentWrapper.appendChild(takeawaysList);
      }
      
      // Add source link
      const sourceSection = document.createElement('div');
      sourceSection.className = 'source-link';
      sourceSection.innerHTML = `<p>Read the full article at <a href="${article.sourceUrl}" target="_blank" rel="noopener noreferrer">${article.sourceName}</a></p>`;
      contentWrapper.appendChild(sourceSection);
      
      // Add tags
      if (article.keywords && article.keywords.length > 0) {
        const tagsElement = document.createElement('div');
        tagsElement.className = 'article-tags';
        
        article.keywords.forEach(tag => {
          const tagLink = document.createElement('a');
          tagLink.href = `category.html?category=${article.category}&tag=${encodeURIComponent(tag.toLowerCase())}`;
          tagLink.className = 'tag';
          tagLink.textContent = tag;
          tagsElement.appendChild(tagLink);
        });
        
        contentWrapper.appendChild(tagsElement);
      }
    }
  }
  
  /**
   * Initialize animations for article cards
   */
  function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0 && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      animatedElements.forEach(el => {
        observer.observe(el);
      });
    } else { // Fallback for older browsers
      animatedElements.forEach(el => el.classList.add('animated'));
    }
  }
  
  /**
   * Get readable label for category slug
   * @param {string} category - Category slug
   * @returns {string} Human-readable category label
   */
  function getCategoryLabel(category) {
    const categoryLabels = {
      'fisheries': 'Fisheries & Aquaculture',
      'marinetech': 'Marine Technology',
      'markets': 'Seafood Markets',
      'offshore-energy': 'Offshore Energy',
      'policy': 'Policy & Reports'
    };
    
    return categoryLabels[category] || category;
  }
  
  // Return public API
  return {
    createArticleCard,
    renderArticleCards,
    renderArticlePage,
    initializeAnimations
  };
})();

// Optional: Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on the main category page with an article grid
  const articleGrid = document.querySelector('.article-grid');
  if (articleGrid) {
    // Get category from URL or body class
    const categoryMatch = document.body.className.match(/category-page\s+(\w+)/);
    const category = categoryMatch ? categoryMatch[1] : null;
    
    // Load and render articles for the category
    OffshoreRapportData.getArticlesByCategory(category)
      .then(articles => {
        OffshoreRapportRenderer.renderArticleCards(articles, 'article-grid');
      });
  }
  
  // Check if we're on an article page
  const articlePage = document.querySelector('.article-page');
  if (articlePage) {
    // Get article ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    
    if (articleId) {
      // Load and render the article
      OffshoreRapportData.getArticleById(articleId)
        .then(article => {
          if (article) {
            OffshoreRapportRenderer.renderArticlePage(article);
          } else {
            console.error('Article not found:', articleId);
            // Could add a redirect or 404 message here
          }
        });
    }
  }
});