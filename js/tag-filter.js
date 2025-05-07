/**
 * tag-filter.js - Client-side tag filtering for Offshore Rapport
 * 
 * This script enables filtering articles by tags on category pages. It:
 *  - Allows users to filter articles based on tag categories
 *  - Makes individual article tags clickable to filter the list
 *  - Displays a "no results" message when no articles match the selected tag
 *  - Includes animations for a smoother user experience
 *  
 * Note: This script is designed to enhance the existing sub-topic filtering
 * with a more granular tag-based system. The tag data would ideally come from
 * the JSON article data in a production environment.
 */

document.addEventListener('DOMContentLoaded', function() {
  // Get the tag filter container and article grid
  const tagFilterContainer = document.querySelector('.tag-filter-container');
  if (!tagFilterContainer) return;

  const articleGrid = document.querySelector('.article-grid');
  if (!articleGrid) return;

  const articles = Array.from(articleGrid.querySelectorAll('.article-card'));
  
  // Optional: Generate tag filters dynamically based on article tags
  function generateTagFilters() {
    // Keep the "All Tags" button
    tagFilterContainer.innerHTML = '<button class="tag-filter active" data-tag="all">All Tags</button>';
    
    // Collect unique tags from all articles
    const uniqueTags = new Set();
    articles.forEach(article => {
      const articleTagElements = article.querySelectorAll('.tag');
      articleTagElements.forEach(tagElement => {
        uniqueTags.add(tagElement.textContent.trim());
      });
    });
    
    // Create filter buttons for each unique tag
    uniqueTags.forEach(tag => {
      const button = document.createElement('button');
      button.className = 'tag-filter';
      button.setAttribute('data-tag', tag.toLowerCase());
      button.textContent = tag;
      tagFilterContainer.appendChild(button);
    });
  }
  
  // Uncomment to enable dynamic tag generation (replacing the static buttons in HTML)
  // generateTagFilters();
  
  const tagButtons = tagFilterContainer.querySelectorAll('.tag-filter');
  
  // Make article tags clickable for filtering
  const articleTags = document.querySelectorAll('.article-card .tag');
  articleTags.forEach(tag => {
    tag.style.cursor = 'pointer';
    
    // Stop click event propagation to prevent card link click
    tag.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const tagText = this.textContent.trim().toLowerCase();
      const matchingTagButton = document.querySelector(`.tag-filter[data-tag="${tagText}"]`);
      
      if (matchingTagButton) {
        matchingTagButton.click();
      }
    });
  });
  
  // Function to extract tags from an article card
  function getArticleTags(article) {
    const tagsElement = article.querySelector('.article-tags');
    if (!tagsElement) return [];
    
    return Array.from(tagsElement.querySelectorAll('.tag'))
      .map(tag => tag.textContent.trim().toLowerCase());
  }
  
  // Store article tags for faster filtering
  const articleTagMap = new Map();
  articles.forEach(article => {
    articleTagMap.set(article, getArticleTags(article));
  });
  
  // Handle tag filter clicks
  tagButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active button state
      tagButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const filterValue = this.dataset.tag.toLowerCase();
      
      // Show all articles if "All" filter is selected
      if (filterValue === 'all') {
        articles.forEach(article => {
          resetAnimation(article);
          article.style.display = 'block';
          animateArticle(article);
        });
        return;
      }
      
      // Filter articles based on tags
      articles.forEach(article => {
        resetAnimation(article);
        
        const articleTags = articleTagMap.get(article);
        if (articleTags.includes(filterValue)) {
          article.style.display = 'block';
          animateArticle(article);
        } else {
          article.style.display = 'none';
        }
      });
      
      // If no results found, display a message
      const visibleArticles = articles.filter(article => article.style.display !== 'none');
      toggleNoResultsMessage(visibleArticles.length === 0);
      
      // Dispatch event for other components to react
      dispatchTagFilterEvent(filterValue);
    });
  });
  
  // Helper function to reset article animation
  function resetAnimation(article) {
    article.classList.remove('animated');
    article.style.opacity = '0';
    article.style.transform = 'translateY(20px)';
  }
  
  // Helper function to animate article appearance
  function animateArticle(article) {
    setTimeout(() => {
      article.classList.add('animated');
      article.style.opacity = '1';
      article.style.transform = 'translateY(0)';
    }, 50);
  }
  
  // Toggle "No results" message
  function toggleNoResultsMessage(show) {
    let noResultsMsg = document.querySelector('.no-results-message');
    
    if (show) {
      if (!noResultsMsg) {
        noResultsMsg = document.createElement('div');
        noResultsMsg.className = 'no-results-message';
        noResultsMsg.innerHTML = `
          <p>No articles found with the selected tag.</p>
          <button class="btn secondary reset-filter">Show All Articles</button>
        `;
        articleGrid.parentNode.insertBefore(noResultsMsg, articleGrid.nextSibling);
        
        // Add event listener to the reset button
        const resetButton = noResultsMsg.querySelector('.reset-filter');
        resetButton.addEventListener('click', () => {
          const allTagButton = document.querySelector('.tag-filter[data-tag="all"]');
          if (allTagButton) {
            allTagButton.click();
          }
        });
      }
    } else if (noResultsMsg) {
      noResultsMsg.remove();
    }
  }
  
  // Integrate with the existing category filter (content-filter.js)
  // Listen for events from the category filter to update tag filtering
  document.addEventListener('categoryFilterChanged', function(e) {
    // When category filter changes, we need to refresh our tag filtering
    // First, reset active state on tag buttons
    const allTagButton = document.querySelector('.tag-filter[data-tag="all"]');
    if (allTagButton) {
      allTagButton.click();
    }
  });
  
  // Dispatch an event when tag filter changes for other systems to react
  function dispatchTagFilterEvent(tag) {
    const event = new CustomEvent('tagFilterChanged', {
      detail: { tag: tag }
    });
    document.dispatchEvent(event);
  }
});