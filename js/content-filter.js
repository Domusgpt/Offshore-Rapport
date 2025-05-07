// js/content-filter.js - Client-side filtering for category pages

document.addEventListener('DOMContentLoaded', function() {
  const filterContainer = document.querySelector('.category-filters');
  if (!filterContainer) return;

  const filterButtons = filterContainer.querySelectorAll('.filter-toggle');
  const articleGrid = document.querySelector('.category-articles .article-grid');
  
  if (!filterButtons.length || !articleGrid) return;

  const articles = Array.from(articleGrid.querySelectorAll('.article-card'));

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active button state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      const filterValue = this.dataset.filter; // Changed from data-category to data-filter

      articles.forEach(article => {
        // Reset animation for re-filtering visibility
        article.classList.remove('animated');
        article.style.opacity = '0'; // Hide before animation
        article.style.transform = 'translateY(20px)';


        if (filterValue === 'all') {
          article.style.display = 'block'; // Or 'grid', 'flex' depending on card base display
        } else {
          // Check if article has a class matching the filterValue.
          // Example: <article class="article-card sustainability ...">
          if (article.classList.contains(filterValue)) {
            article.style.display = 'block';
          } else {
            article.style.display = 'none';
          }
        }
        
        // Re-trigger animation for visible items after a short delay
        if(article.style.display !== 'none') {
            setTimeout(() => {
                article.classList.add('animated');
                article.style.opacity = '1';
                article.style.transform = 'translateY(0)';
            }, 50); // Small delay to ensure CSS transition applies
        }
      });
      
      // Dispatch an event so other components can react to the filter change
      const event = new CustomEvent('categoryFilterChanged', {
        detail: { filter: filterValue }
      });
      document.dispatchEvent(event);
    });
  });
});