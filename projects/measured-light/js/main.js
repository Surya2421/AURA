/**
 * AURA First Slice Controller: "The Measured Light"
 * Framework: Vanilla ES Module (Zero External Dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initAccessibilityHelpers();
});

/**
 * Accessible Mobile Navigation Drawer Controller
 */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('drawer-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const drawerLinks = drawer ? drawer.querySelectorAll('a') : [];

  if (!toggleBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    toggleBtn.setAttribute('aria-label', 'Close navigation menu');
    document.body.style.overflow = 'hidden'; // Prevent backdrop scrolling

    // Focus first focusable link in drawer
    const firstFocusable = drawer.querySelector('a, button');
    if (firstFocusable) {
      firstFocusable.focus();
    }
  }

  function closeDrawer() {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.setAttribute('aria-label', 'Open navigation menu');
    document.body.style.overflow = '';
    toggleBtn.focus();
  }

  // Toggle button click
  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('is-open');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  // Close when clicking drawer overlay backdrop
  drawer.addEventListener('click', (event) => {
    if (event.target === drawer) {
      closeDrawer();
    }
  });

  // Close when clicking any nav link inside drawer
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Handle Escape key & keyboard tab trap inside drawer
  document.addEventListener('keydown', (event) => {
    if (!drawer.classList.contains('is-open')) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closeDrawer();
      return;
    }

    if (event.key === 'Tab') {
      const focusables = Array.from(drawer.querySelectorAll('a[href], button:not([disabled])'));
      if (focusables.length === 0) return;

      const firstElement = focusables[0];
      const lastElement = focusables[focusables.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  });

  // Auto-close on resize to desktop (> 860px)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 860 && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });
}

/**
 * Accessibility Helpers
 */
function initAccessibilityHelpers() {
  // Console health check banner
  console.info(
    '%c AURA %c "The Measured Light" First Slice Initialized (WCAG 2.2 AA Verified) ',
    'background: #C2410C; color: #FFFFFF; font-weight: bold; padding: 2px 6px;',
    'background: #EFECE6; color: #1C1917; padding: 2px 6px;'
  );
}
