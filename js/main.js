// js/main.js - Main JavaScript for Offshore Rapport

document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      menuToggle.classList.toggle('active');
      document.body.classList.toggle('no-scroll'); // Optional: prevent body scroll when menu is open
    });
  }

  // Sticky Header (simple version)
  const siteHeader = document.querySelector('.site-header');
  let lastScrollTop = 0;

  if (siteHeader) {
    window.addEventListener('scroll', function() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 100) { // Add class after scrolling 100px
        siteHeader.classList.add('header-scrolled');
      } else {
        siteHeader.classList.remove('header-scrolled');
      }

      // Optional: Hide on scroll down, show on scroll up
      if (scrollTop > lastScrollTop && scrollTop > 200) { // If scrolled down and past 200px
        siteHeader.classList.add('header-hidden');
      } else {
        if(scrollTop + window.innerHeight < document.documentElement.scrollHeight) { // If not at bottom
          siteHeader.classList.remove('header-hidden');
        }
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    }, false);
  }
  
  // Animate on Scroll (Intersection Observer)
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

  // Newsletter Form Submission (Basic Example)
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        // Here you would typically send the email to a server/service
        console.log('Newsletter subscription for:', emailInput.value);
        alert('Thank you for subscribing!');
        emailInput.value = ''; // Clear input
      } else {
        alert('Please enter a valid email address.');
      }
    });
  });

  // Sidebar Newsletter Form (if different from main newsletter)
  const sidebarForms = document.querySelectorAll('.sidebar-form');
    sidebarForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        console.log('Sidebar newsletter subscription for:', emailInput.value);
        alert('Thank you for subscribing to sector briefings!');
        emailInput.value = '';
      } else {
        alert('Please enter a valid email address.');
      }
    });
  });

  // Update header height CSS variable for sticky sidebar calculations
  function updateHeaderHeightProperty() {
    const header = document.querySelector('.site-header');
    if (header) {
      document.documentElement.style.setProperty('--site-header-height', `${header.offsetHeight}px`);
    }
  }
  window.addEventListener('load', updateHeaderHeightProperty);
  window.addEventListener('resize', updateHeaderHeightProperty);

  // Load More Articles (Placeholder - Actual implementation needs backend)
  const loadMoreButton = document.querySelector('.load-more');
  if (loadMoreButton) {
    loadMoreButton.addEventListener('click', function() {
      // Placeholder: In a real app, this would make an AJAX call to fetch more articles (JSON)
      // and then append them to the .article-grid
      console.log('Loading more articles...');
      // Example: append a dummy card
      const articleGrid = document.querySelector('.category-articles .article-grid');
      if (articleGrid) {
        const dummyCard = document.createElement('div');
        dummyCard.innerHTML = `
          <article class="article-card animate-on-scroll">
            <a href="#" class="article-link">
              <div class="card-image"><img src="https://source.unsplash.com/random/600x400/?ocean,research" alt="Newly loaded article"></div>
              <div class="card-content">
                <h3>Newly Loaded Article Title</h3>
                <p class="excerpt">This is placeholder content for a dynamically loaded article about marine research and development.</p>
                <div class="article-meta"><span class="metadata">5 Min Read</span></div>
              </div>
            </a>
          </article>
        `;
        articleGrid.appendChild(dummyCard.firstChild);
        // Re-observe new elements for animations
        const newAnimatedElements = dummyCard.querySelectorAll('.animate-on-scroll');
        if (newAnimatedElements.length > 0 && "IntersectionObserver" in window) {
            const obs = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            newAnimatedElements.forEach(el => obs.observe(el));
        } else {
            newAnimatedElements.forEach(el => el.classList.add('animated'));
        }

      }
      // Potentially hide the button if no more articles, or update its text
      // loadMoreButton.textContent = 'No More Articles';
      // loadMoreButton.disabled = true;
    });
  }

});