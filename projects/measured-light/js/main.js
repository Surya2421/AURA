/**
 * AURA Full Site Controller: "The Measured Light"
 * Framework: Vanilla ES Module (Zero External Runtime Dependencies)
 * Stage 6: Full Implementation
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initArchiveFilters();
  initStudyModal();
  initCommissionForm();
  initInquireVisibilityObserver();
  initActionTriggers();
});

/**
 * 1. Accessible Mobile Navigation Drawer Controller
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
    document.body.classList.add('drawer-open');
    document.body.style.overflow = 'hidden';

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
    document.body.classList.remove('drawer-open');
    document.body.style.overflow = '';
    toggleBtn.focus();
  }

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('is-open');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  drawer.addEventListener('click', (event) => {
    if (event.target === drawer) {
      closeDrawer();
    }
  });

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

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

  window.addEventListener('resize', () => {
    if (window.innerWidth > 860 && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });
}

/**
 * 2. Monograph Archive Filter Controller
 */
function initArchiveFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.archive-card');

  if (!filterButtons.length || !cards.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterButtons.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });

      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      cards.forEach(card => {
        const cardTypology = card.getAttribute('data-typology');
        if (filter === 'all' || cardTypology === filter) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });
}

/**
 * 3. Accessible Native HTML5 Study Modal Controller
 */
function initStudyModal() {
  const modal = document.getElementById('study-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const footerCloseBtn = document.getElementById('modal-footer-close-btn');
  const modalInquireBtn = document.getElementById('modal-inquire-btn');
  const triggerBtns = document.querySelectorAll('[data-modal-target]');

  if (!modal) return;

  const modalTitle = document.getElementById('modal-title');
  const modalTypology = document.getElementById('modal-typology');

  const studyTitles = {
    'study-01': { title: '[PROJECT 01 // CIVIC ATRIUM STUDY]', typology: 'CIVIC & CULTURAL' },
    'study-02': { title: '[PROJECT 02 // CANTILEVERED CANOPY]', typology: 'CANTILEVERS & MASS' },
    'study-03': { title: '[PROJECT 03 // MINIMALIST FACADE]', typology: 'MINIMALIST ENCLOSURES' },
    'study-04': { title: '[PROJECT 04 // TECTONIC CONCRETE VOID]', typology: 'CANTILEVERS & MASS' }
  };

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-modal-target');
      const data = studyTitles[target] || { title: '[PROJECT TITLE REQUIRED]', typology: 'ARCHITECTURAL STUDY' };

      if (modalTitle) modalTitle.textContent = data.title;
      if (modalTypology) modalTypology.textContent = `[${data.typology}]`;

      modal.showModal();
      document.body.classList.add('modal-open');
    });
  });

  function closeModal() {
    modal.close();
    document.body.classList.remove('modal-open');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (footerCloseBtn) footerCloseBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (event) => {
    const rect = modal.getBoundingClientRect();
    const isInDialog = (
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
      closeModal();
    }
  });

  modal.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
  });

  if (modalInquireBtn) {
    modalInquireBtn.addEventListener('click', () => {
      closeModal();
      const clientNameInput = document.getElementById('client-name');
      if (clientNameInput) {
        setTimeout(() => clientNameInput.focus(), 300);
      }
    });
  }
}

/**
 * 4. Commission Intake Form Validation & Accessible Submission
 */
function initCommissionForm() {
  const form = document.getElementById('commission-form');
  const statusBox = document.getElementById('inquiry-status');

  if (!form) return;

  const nameInput = document.getElementById('client-name');
  const emailInput = document.getElementById('client-email');
  const typologySelect = document.getElementById('project-typology');

  const errorName = document.getElementById('error-client-name');
  const errorEmail = document.getElementById('error-client-email');
  const errorTypology = document.getElementById('error-project-typology');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function clearErrors() {
    [nameInput, emailInput, typologySelect].forEach(input => {
      if (input) {
        input.classList.remove('is-invalid');
        input.removeAttribute('aria-invalid');
      }
    });
    if (errorName) errorName.textContent = '';
    if (errorEmail) errorEmail.textContent = '';
    if (errorTypology) errorTypology.textContent = '';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    let hasErrors = false;
    let firstInvalid = null;

    if (!nameInput.value.trim()) {
      hasErrors = true;
      nameInput.classList.add('is-invalid');
      nameInput.setAttribute('aria-invalid', 'true');
      if (errorName) errorName.textContent = 'Please provide practice or client name.';
      if (!firstInvalid) firstInvalid = nameInput;
    }

    if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
      hasErrors = true;
      emailInput.classList.add('is-invalid');
      emailInput.setAttribute('aria-invalid', 'true');
      if (errorEmail) errorEmail.textContent = 'Please provide a valid contact email.';
      if (!firstInvalid) firstInvalid = emailInput;
    }

    if (!typologySelect.value) {
      hasErrors = true;
      typologySelect.classList.add('is-invalid');
      typologySelect.setAttribute('aria-invalid', 'true');
      if (errorTypology) errorTypology.textContent = 'Please select a project typology.';
      if (!firstInvalid) firstInvalid = typologySelect;
    }

    if (hasErrors) {
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Accessible submission confirmation simulation
    const submitBtn = document.getElementById('submit-inquiry-btn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Processing Commission Scope...';
    }

    setTimeout(() => {
      form.reset();
      clearErrors();

      if (statusBox) {
        statusBox.className = 'form-status form-status--success is-visible';
        statusBox.textContent = '✓ Commission inquiry received. Studio correspondence and ephemeris analysis will follow within two business days. [Provisional Demonstration Mode]';
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>[Submit Commission Request]</span> <span aria-hidden="true">→</span>';
      }
    }, 600);
  });
}

/**
 * 5. Intersection Observer for Inquire Section (Hides Floating Pill when at form)
 */
function initInquireVisibilityObserver() {
  const inquireSection = document.getElementById('inquire');
  if (!inquireSection || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.body.classList.add('inquire-visible');
      } else {
        document.body.classList.remove('inquire-visible');
      }
    });
  }, { threshold: 0.15 });

  observer.observe(inquireSection);
}

/**
 * 6. Action Triggers & Focus Routing
 */
function initActionTriggers() {
  const clientNameInput = document.getElementById('client-name');

  // Any anchor linking to #inquire focuses client name input
  document.querySelectorAll('a[href="#inquire"]').forEach(anchor => {
    anchor.addEventListener('click', () => {
      if (clientNameInput) {
        setTimeout(() => {
          clientNameInput.focus();
        }, 450);
      }
    });
  });
}
