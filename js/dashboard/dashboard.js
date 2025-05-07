// js/dashboard/dashboard.js - Dashboard functionality for Offshore Rapport

/**
 * Dashboard Manager for Offshore Rapport
 * Handles article creation, editing, and management
 */
const OffshoreRapportDashboard = (function() {
  // Current article being edited (null for new article)
  let currentArticle = null;
  
  // Initialize the dashboard
  function initialize() {
    // Set up navigation
    setupNavigation();
    
    // Load articles
    loadArticles();
    
    // Set up event listeners
    document.getElementById('new-article-btn').addEventListener('click', createNewArticle);
    document.getElementById('cancel-form').addEventListener('click', cancelForm);
    document.getElementById('article-form').addEventListener('submit', saveArticle);
    document.getElementById('add-keyword').addEventListener('click', addKeyword);
    document.getElementById('add-takeaway').addEventListener('click', addTakeaway);
    
    // Set up live JSON preview
    setupJsonPreview();
    
    // Handle import/export
    document.getElementById('import-json-btn').addEventListener('click', importJson);
    document.getElementById('export-all-btn').addEventListener('click', exportAllArticles);
  }
  
  // Set up navigation between sections
  function setupNavigation() {
    const navLinks = document.querySelectorAll('.dashboard-nav a');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Hide all sections
        document.querySelectorAll('.dashboard-section').forEach(section => {
          section.style.display = 'none';
        });
        
        // Show selected section
        const sectionId = this.dataset.section + '-section';
        document.getElementById(sectionId).style.display = 'block';
      });
    });
  }
  
  // Load articles into the table
  function loadArticles() {
    const tableBody = document.getElementById('articles-table-body');
    
    OffshoreRapportData.fetchArticles()
      .then(articles => {
        if (articles.length === 0) {
          tableBody.innerHTML = '<tr><td colspan="4">No articles found. Click "New Article" to create one.</td></tr>';
          return;
        }
        
        let tableHtml = '';
        
        articles.forEach(article => {
          const date = new Date(article.publicationDate).toLocaleDateString();
          const categoryLabel = getCategoryLabel(article.category);
          
          tableHtml += `
            <tr data-id="${article.id}">
              <td>${article.title}</td>
              <td>${categoryLabel}</td>
              <td>${date}</td>
              <td class="action-buttons">
                <button class="action-button edit-article" data-id="${article.id}">Edit</button>
                <button class="action-button delete-article delete" data-id="${article.id}">Delete</button>
              </td>
            </tr>
          `;
        });
        
        tableBody.innerHTML = tableHtml;
        
        // Add event listeners to edit and delete buttons
        document.querySelectorAll('.edit-article').forEach(button => {
          button.addEventListener('click', function() {
            const articleId = this.dataset.id;
            editArticle(articleId);
          });
        });
        
        document.querySelectorAll('.delete-article').forEach(button => {
          button.addEventListener('click', function() {
            const articleId = this.dataset.id;
            deleteArticle(articleId);
          });
        });
      })
      .catch(error => {
        console.error('Error loading articles:', error);
        tableBody.innerHTML = '<tr><td colspan="4">Error loading articles. Please try again.</td></tr>';
      });
  }
  
  // Get readable label for category slug
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
  
  // Create a new article
  function createNewArticle() {
    // Reset form
    document.getElementById('article-form').reset();
    document.getElementById('keywords-container').innerHTML = '';
    document.getElementById('takeaways-container').innerHTML = `
      <div class="takeaway-item">
        <input type="text" class="form-control takeaway-input" placeholder="Enter a key takeaway">
        <span class="remove-takeaway">✕</span>
      </div>
    `;
    
    // Setup form for new article
    currentArticle = null;
    document.querySelector('.dashboard-title').textContent = 'Add New Article';
    
    // Generate today's date
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('article-date').value = today;
    
    // Show the form section
    document.querySelectorAll('.dashboard-section').forEach(section => {
      section.style.display = 'none';
    });
    document.getElementById('article-form-section').style.display = 'block';
    
    // Update JSON preview
    updateJsonPreview();
  }
  
  // Edit an existing article
  function editArticle(articleId) {
    OffshoreRapportData.getArticleById(articleId)
      .then(article => {
        if (!article) {
          alert('Article not found.');
          return;
        }
        
        currentArticle = article;
        
        // Populate form fields
        document.getElementById('article-title').value = article.title;
        document.getElementById('article-category').value = article.category;
        document.getElementById('article-source-name').value = article.sourceName;
        document.getElementById('article-source-url').value = article.sourceUrl;
        document.getElementById('article-date').value = article.publicationDate;
        document.getElementById('article-summary').value = article.summary;
        document.getElementById('article-type').value = article.articleType;
        document.getElementById('article-image').value = article.mainImageUrl || '';
        document.getElementById('article-image-alt').value = article.imageAltText || '';
        
        // Populate keywords
        document.getElementById('keywords-container').innerHTML = '';
        if (article.keywords && article.keywords.length > 0) {
          article.keywords.forEach(keyword => {
            addKeywordToContainer(keyword);
          });
        }
        
        // Populate key takeaways
        document.getElementById('takeaways-container').innerHTML = '';
        if (article.keyTakeaways && article.keyTakeaways.length > 0) {
          article.keyTakeaways.forEach(takeaway => {
            addTakeawayToContainer(takeaway);
          });
        } else {
          // Add one empty takeaway input
          addTakeawayToContainer('');
        }
        
        // Set form title
        document.querySelector('.dashboard-title').textContent = 'Edit Article';
        
        // Show the form section
        document.querySelectorAll('.dashboard-section').forEach(section => {
          section.style.display = 'none';
        });
        document.getElementById('article-form-section').style.display = 'block';
        
        // Update JSON preview
        updateJsonPreview();
      })
      .catch(error => {
        console.error('Error loading article for editing:', error);
        alert('Error loading article. Please try again.');
      });
  }
  
  // Delete an article
  function deleteArticle(articleId) {
    if (confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
      // In a real app, this would make an API call to delete
      // For now, we'll update our local data
      
      OffshoreRapportData.deleteArticle(articleId)
        .then(() => {
          // Reload articles list
          loadArticles();
        })
        .catch(error => {
          console.error('Error deleting article:', error);
          alert('Error deleting article. Please try again.');
        });
    }
  }
  
  // Cancel the form and return to articles list
  function cancelForm() {
    // Hide form section
    document.getElementById('article-form-section').style.display = 'none';
    
    // Show articles section
    document.getElementById('articles-section').style.display = 'block';
    
    // Update navigation
    document.querySelectorAll('.dashboard-nav a').forEach(link => {
      link.classList.remove('active');
    });
    document.querySelector('.dashboard-nav a[data-section="articles"]').classList.add('active');
  }
  
  // Save the article form
  function saveArticle(e) {
    e.preventDefault();
    
    // Get form values
    const title = document.getElementById('article-title').value;
    const category = document.getElementById('article-category').value;
    const sourceName = document.getElementById('article-source-name').value;
    const sourceUrl = document.getElementById('article-source-url').value;
    const publicationDate = document.getElementById('article-date').value;
    const summary = document.getElementById('article-summary').value;
    const articleType = document.getElementById('article-type').value;
    const mainImageUrl = document.getElementById('article-image').value || null;
    const imageAltText = document.getElementById('article-image-alt').value || null;
    
    // Get keywords
    const keywordElements = document.querySelectorAll('.keyword-pill');
    const keywords = Array.from(keywordElements).map(el => el.dataset.keyword);
    
    // Get key takeaways
    const takeawayInputs = document.querySelectorAll('.takeaway-input');
    const keyTakeaways = Array.from(takeawayInputs)
      .map(input => input.value.trim())
      .filter(takeaway => takeaway); // Remove empty takeaways
    
    // Create article object
    const article = {
      id: currentArticle ? currentArticle.id : generateArticleId(title, publicationDate),
      title,
      sourceName,
      sourceUrl,
      publicationDate,
      retrievalDate: new Date().toISOString().split('T')[0],
      category,
      summary,
      keywords,
      keyTakeaways,
      mainImageUrl,
      imageAltText,
      articleType
    };
    
    // Save article
    OffshoreRapportData.saveArticle(article)
      .then(() => {
        alert('Article saved successfully!');
        
        // Return to articles list
        cancelForm();
        
        // Reload articles list
        loadArticles();
      })
      .catch(error => {
        console.error('Error saving article:', error);
        alert('Error saving article. Please try again.');
      });
  }
  
  // Generate a unique ID for a new article
  function generateArticleId(title, date) {
    const slug = title.toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .substring(0, 50); // Limit length
    
    const dateStr = date.replace(/-/g, '');
    
    return `${slug}-${dateStr}`;
  }
  
  // Add a keyword to the form
  function addKeyword() {
    const keywordInput = document.getElementById('article-keywords');
    const keyword = keywordInput.value.trim();
    
    if (keyword) {
      addKeywordToContainer(keyword);
      keywordInput.value = '';
      keywordInput.focus();
      
      // Update JSON preview
      updateJsonPreview();
    }
  }
  
  // Add a keyword to the keywords container
  function addKeywordToContainer(keyword) {
    // Check if keyword already exists
    const existingKeywords = document.querySelectorAll('.keyword-pill');
    for (let i = 0; i < existingKeywords.length; i++) {
      if (existingKeywords[i].dataset.keyword.toLowerCase() === keyword.toLowerCase()) {
        return; // Skip duplicate
      }
    }
    
    const keywordsContainer = document.getElementById('keywords-container');
    
    const keywordPill = document.createElement('div');
    keywordPill.className = 'keyword-pill';
    keywordPill.dataset.keyword = keyword;
    
    keywordPill.innerHTML = `
      ${keyword}
      <span class="remove-keyword">✕</span>
    `;
    
    keywordsContainer.appendChild(keywordPill);
    
    // Add event listener to remove button
    keywordPill.querySelector('.remove-keyword').addEventListener('click', function() {
      keywordPill.remove();
      updateJsonPreview();
    });
  }
  
  // Add a takeaway to the form
  function addTakeaway() {
    addTakeawayToContainer('');
    updateJsonPreview();
  }
  
  // Add a takeaway to the takeaways container
  function addTakeawayToContainer(takeaway) {
    const takeawaysContainer = document.getElementById('takeaways-container');
    
    const takeawayItem = document.createElement('div');
    takeawayItem.className = 'takeaway-item';
    
    takeawayItem.innerHTML = `
      <input type="text" class="form-control takeaway-input" placeholder="Enter a key takeaway" value="${takeaway}">
      <span class="remove-takeaway">✕</span>
    `;
    
    takeawaysContainer.appendChild(takeawayItem);
    
    // Add event listener to remove button
    takeawayItem.querySelector('.remove-takeaway').addEventListener('click', function() {
      // Don't remove if it's the last one
      if (document.querySelectorAll('.takeaway-item').length > 1) {
        takeawayItem.remove();
        updateJsonPreview();
      }
    });
    
    // Add event listener to input to update JSON preview on change
    takeawayItem.querySelector('.takeaway-input').addEventListener('input', updateJsonPreview);
  }
  
  // Set up the live JSON preview
  function setupJsonPreview() {
    // Add event listeners to all form fields
    const formInputs = document.querySelectorAll('#article-form input, #article-form textarea, #article-form select');
    
    formInputs.forEach(input => {
      input.addEventListener('input', updateJsonPreview);
    });
  }
  
  // Update the JSON preview
  function updateJsonPreview() {
    // Get form values
    const title = document.getElementById('article-title').value;
    const category = document.getElementById('article-category').value;
    const sourceName = document.getElementById('article-source-name').value;
    const sourceUrl = document.getElementById('article-source-url').value;
    const publicationDate = document.getElementById('article-date').value;
    const summary = document.getElementById('article-summary').value;
    const articleType = document.getElementById('article-type').value;
    const mainImageUrl = document.getElementById('article-image').value || null;
    const imageAltText = document.getElementById('article-image-alt').value || null;
    
    // Get keywords
    const keywordElements = document.querySelectorAll('.keyword-pill');
    const keywords = Array.from(keywordElements).map(el => el.dataset.keyword);
    
    // Get key takeaways
    const takeawayInputs = document.querySelectorAll('.takeaway-input');
    const keyTakeaways = Array.from(takeawayInputs)
      .map(input => input.value.trim())
      .filter(takeaway => takeaway); // Remove empty takeaways
    
    // Create article object
    const article = {
      id: currentArticle ? currentArticle.id : (title && publicationDate ? generateArticleId(title, publicationDate) : ""),
      title,
      sourceName,
      sourceUrl,
      publicationDate,
      retrievalDate: new Date().toISOString().split('T')[0],
      category,
      summary,
      keywords,
      keyTakeaways,
      mainImageUrl,
      imageAltText,
      articleType
    };
    
    // Update JSON preview
    document.getElementById('json-preview').textContent = JSON.stringify(article, null, 2);
  }
  
  // Import JSON for an article
  function importJson() {
    const jsonStr = prompt('Paste the JSON data for the article:');
    
    if (!jsonStr) {
      return;
    }
    
    try {
      const article = JSON.parse(jsonStr);
      
      // Validate required fields
      if (!article.title || !article.category) {
        throw new Error('Invalid article JSON. Title and category are required.');
      }
      
      // Generate ID if not present
      if (!article.id && article.title && article.publicationDate) {
        article.id = generateArticleId(article.title, article.publicationDate);
      }
      
      // Set current article and populate form
      currentArticle = article;
      
      // Populate form fields
      document.getElementById('article-title').value = article.title || '';
      document.getElementById('article-category').value = article.category || '';
      document.getElementById('article-source-name').value = article.sourceName || '';
      document.getElementById('article-source-url').value = article.sourceUrl || '';
      document.getElementById('article-date').value = article.publicationDate || '';
      document.getElementById('article-summary').value = article.summary || '';
      document.getElementById('article-type').value = article.articleType || '';
      document.getElementById('article-image').value = article.mainImageUrl || '';
      document.getElementById('article-image-alt').value = article.imageAltText || '';
      
      // Populate keywords
      document.getElementById('keywords-container').innerHTML = '';
      if (article.keywords && article.keywords.length > 0) {
        article.keywords.forEach(keyword => {
          addKeywordToContainer(keyword);
        });
      }
      
      // Populate key takeaways
      document.getElementById('takeaways-container').innerHTML = '';
      if (article.keyTakeaways && article.keyTakeaways.length > 0) {
        article.keyTakeaways.forEach(takeaway => {
          addTakeawayToContainer(takeaway);
        });
      } else {
        // Add one empty takeaway input
        addTakeawayToContainer('');
      }
      
      // Set form title
      document.querySelector('.dashboard-title').textContent = 'Edit Imported Article';
      
      // Show the form section
      document.querySelectorAll('.dashboard-section').forEach(section => {
        section.style.display = 'none';
      });
      document.getElementById('article-form-section').style.display = 'block';
      
      // Update JSON preview
      updateJsonPreview();
    } catch (error) {
      console.error('Error importing JSON:', error);
      alert('Error importing JSON: ' + error.message);
    }
  }
  
  // Export all articles as JSON
  function exportAllArticles() {
    OffshoreRapportData.fetchArticles()
      .then(articles => {
        if (articles.length === 0) {
          alert('No articles to export.');
          return;
        }
        
        // Convert to JSON string
        const jsonStr = JSON.stringify(articles, null, 2);
        
        // Create a blob and download link
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'offshore-rapport-articles.json';
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 0);
      })
      .catch(error => {
        console.error('Error exporting articles:', error);
        alert('Error exporting articles. Please try again.');
      });
  }
  
  // Return public API
  return {
    initialize
  };
})();

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  OffshoreRapportDashboard.initialize();
});