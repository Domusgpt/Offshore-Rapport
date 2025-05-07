// js/data-loader.js - Handles loading JSON data for Offshore Rapport

/**
 * DataLoader - Module for loading and processing article data
 * This module handles fetching JSON data from the data directory
 * and provides functions for filtering and processing articles.
 */
const OffshoreRapportData = (function() {
  // Cache for storing fetched data to avoid redundant requests
  const dataCache = {
    articles: null,
    categories: null
  };

  /**
   * Fetch article data from JSON
   * @returns {Promise} Promise that resolves to the article data array
   */
  async function fetchArticles() {
    if (dataCache.articles) {
      return dataCache.articles;
    }

    try {
      const response = await fetch('/data/articles.json');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      dataCache.articles = data;
      return data;
    } catch (error) {
      console.error('Error fetching article data:', error);
      return [];
    }
  }

  /**
   * Get articles for a specific category
   * @param {string} category - Category slug (e.g., 'fisheries', 'marinetech')
   * @returns {Promise} Promise that resolves to filtered articles
   */
  async function getArticlesByCategory(category) {
    const articles = await fetchArticles();
    
    if (!category || category === 'all') {
      return articles;
    }
    
    return articles.filter(article => article.category === category);
  }

  /**
   * Get articles by tag/keyword
   * @param {string} tag - Tag or keyword to filter by
   * @returns {Promise} Promise that resolves to filtered articles
   */
  async function getArticlesByTag(tag) {
    const articles = await fetchArticles();
    
    if (!tag || tag === 'all') {
      return articles;
    }
    
    return articles.filter(article => 
      article.keywords && 
      article.keywords.some(keyword => 
        keyword.toLowerCase().includes(tag.toLowerCase())
      )
    );
  }

  /**
   * Get a single article by ID
   * @param {string} id - Article ID
   * @returns {Promise} Promise that resolves to an article object or null
   */
  async function getArticleById(id) {
    const articles = await fetchArticles();
    return articles.find(article => article.id === id) || null;
  }

  /**
   * Get unique tags/keywords from all articles
   * @returns {Promise} Promise that resolves to an array of unique tags
   */
  async function getAllTags() {
    const articles = await fetchArticles();
    
    // Collect all keywords from all articles
    const allTags = articles.reduce((tags, article) => {
      if (article.keywords && Array.isArray(article.keywords)) {
        return [...tags, ...article.keywords];
      }
      return tags;
    }, []);
    
    // Remove duplicates and sort alphabetically
    return [...new Set(allTags)].sort();
  }

  /**
   * Get the most common tags (for tag clouds or popular filters)
   * @param {number} limit - Maximum number of tags to return
   * @returns {Promise} Promise that resolves to an array of tag objects with counts
   */
  async function getPopularTags(limit = 10) {
    const articles = await fetchArticles();
    
    // Count occurrences of each tag
    const tagCount = {};
    
    articles.forEach(article => {
      if (article.keywords && Array.isArray(article.keywords)) {
        article.keywords.forEach(tag => {
          tagCount[tag] = (tagCount[tag] || 0) + 1;
        });
      }
    });
    
    // Convert to array, sort by count, and limit
    return Object.entries(tagCount)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }

    /**
   * Save an article to the data store
   * @param {Object} article - The article object to save
   * @returns {Promise} Promise that resolves when complete
   */
  async function saveArticle(article) {
    const articles = await fetchArticles();
    
    // Find existing article index, if any
    const existingIndex = articles.findIndex(a => a.id === article.id);
    
    if (existingIndex >= 0) {
      // Update existing article
      articles[existingIndex] = article;
    } else {
      // Add new article
      articles.push(article);
    }
    
    // In a real app, this would make an API call or update local storage
    // For now, we'll just update our cache
    dataCache.articles = articles;
    
    // In a more complex app, you would save to a server here
    console.log('Article saved:', article.id);
    
    return Promise.resolve();
  }
  
  /**
   * Delete an article from the data store
   * @param {string} id - Article ID to delete
   * @returns {Promise} Promise that resolves when complete
   */
  async function deleteArticle(id) {
    const articles = await fetchArticles();
    
    // Filter out the article to delete
    const filteredArticles = articles.filter(article => article.id !== id);
    
    // In a real app, this would make an API call or update local storage
    // For now, we'll just update our cache
    dataCache.articles = filteredArticles;
    
    return Promise.resolve();
  }

  // Return public API
  return {
    fetchArticles,
    getArticlesByCategory,
    getArticlesByTag,
    getArticleById,
    getAllTags,
    getPopularTags,
    saveArticle,
    deleteArticle
  };
})();

// Optional: Initialize data loading when the page loads
document.addEventListener('DOMContentLoaded', function() {
  // Pre-fetch articles for faster response later
  OffshoreRapportData.fetchArticles().then(data => {
    console.log(`Loaded ${data.length} articles`);
  });
});