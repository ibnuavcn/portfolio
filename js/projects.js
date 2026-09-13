// ============================================
// Project Data & Logic
// ============================================

const projectsData = [
  {
    id: 1,
    title: 'Weather Dashboard',
    shortDesc: 'Real-time weather app with forecast and location search.',
    fullDesc: 'A fully responsive weather dashboard that fetches real-time weather data using OpenWeatherMap API. Features include city search, 5-day forecast, temperature unit toggle, and dynamic weather icons that change based on conditions.',
    tags: ['HTML', 'CSS', 'JavaScript', 'API'],
    category: 'web',
    image: null, // placeholder — replace with actual screenshot path
    demo: 'https://example.com/weather',
    repo: 'https://github.com/avicenna/weather-dashboard',
  },
  {
    id: 2,
    title: 'Task Manager App',
    shortDesc: 'Kanban-style task manager with drag-and-drop.',
    fullDesc: 'A productivity app inspired by Trello. Users can create boards, add tasks with due dates and labels, drag-and-drop between columns (To Do, In Progress, Done), and persist data using localStorage. Built with vanilla JS and CSS Grid.',
    tags: ['HTML', 'CSS', 'JavaScript', 'LocalStorage'],
    category: 'web',
    image: null,
    demo: 'https://example.com/taskmanager',
    repo: 'https://github.com/avicenna/task-manager',
  },
  {
    id: 3,
    title: 'E-Commerce Landing Page',
    shortDesc: 'Modern product landing page with cart functionality.',
    fullDesc: 'A sleek e-commerce landing page featuring product showcases, smooth animations, add-to-cart functionality, and a responsive checkout flow. Designed with a minimal aesthetic and dark mode support.',
    tags: ['HTML', 'Tailwind CSS', 'JavaScript'],
    category: 'web',
    image: null,
    demo: 'https://example.com/ecommerce',
    repo: 'https://github.com/avicenna/ecommerce-landing',
  },
  {
    id: 4,
    title: 'Fitness Tracker UI',
    shortDesc: 'Mobile-first fitness tracking interface design.',
    fullDesc: 'A mobile-first UI concept for a fitness tracking app. Features include workout logging, progress charts, calorie tracking dashboard, and achievement badges. Designed in Figma with a complete component library.',
    tags: ['Figma', 'UI/UX', 'Prototyping'],
    category: 'design',
    image: null,
    demo: 'https://figma.com/avicenna/fitness',
    repo: null,
  },
  {
    id: 5,
    title: 'Recipe Finder App',
    shortDesc: 'Search recipes by ingredients with nutrition info.',
    fullDesc: 'An app that lets users search for recipes based on available ingredients. Integrates with Spoonacular API for recipe data and nutritional information. Includes save-to-favorites functionality and responsive design optimized for mobile.',
    tags: ['HTML', 'CSS', 'JavaScript', 'API'],
    category: 'mobile',
    image: null,
    demo: 'https://example.com/recipes',
    repo: 'https://github.com/avicenna/recipe-finder',
  },
  {
    id: 6,
    title: 'Portfolio Dashboard',
    shortDesc: 'This very portfolio — interactive developer dashboard.',
    fullDesc: 'A modern, dark-themed portfolio dashboard built from scratch with HTML, Tailwind CSS, and vanilla JavaScript. Features include animated skill bars, project filtering, smooth scroll navigation, typing effect, and responsive design.',
    tags: ['HTML', 'Tailwind CSS', 'JavaScript', 'AOS'],
    category: 'web',
    image: null,
    demo: '#',
    repo: 'https://github.com/avicenna/portfolio',
  },
];


// --- Render Project Cards ---
function renderProjects(filter = 'all') {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = '';

  projectsData.forEach((project, index) => {
    const isVisible = filter === 'all' || project.category === filter;

    const card = document.createElement('div');
    card.className = `project-card bg-slate-800/60 border border-slate-700 rounded-xl overflow-hidden cursor-pointer ${
      isVisible ? 'filter-visible' : 'filter-hidden'
    }`;
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', `${(index % 3) * 100}`);
    card.setAttribute('data-category', project.category);

    card.innerHTML = `
      <div class="h-44 bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden flex items-center justify-center relative project-image-wrapper">
        ${
          project.image
            ? `<img src="${project.image}" alt="${project.title}" class="project-image w-full h-full object-cover" />`
            : `<div class="project-image flex flex-col items-center gap-2">
                <svg class="w-12 h-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                <span class="text-slate-600 text-xs font-mono">${project.title}</span>
               </div>`
        }
        <div class="absolute top-3 right-3">
          <span class="px-2 py-1 bg-slate-900/80 text-primary-400 text-xs font-mono rounded-md capitalize">${project.category}</span>
        </div>
      </div>
      <div class="p-5">
        <h3 class="text-lg font-semibold text-white mb-2">${project.title}</h3>
        <p class="text-slate-400 text-sm mb-4 line-clamp-2">${project.shortDesc}</p>
        <div class="flex flex-wrap gap-1.5">
          ${project.tags
            .map(
              (tag) =>
                `<span class="px-2 py-0.5 bg-primary-500/10 text-primary-400 text-xs font-mono rounded">${tag}</span>`
            )
            .join('')}
        </div>
      </div>
    `;

    // Click to open modal
    card.addEventListener('click', () => openProjectModal(project));

    if (isVisible) {
      grid.appendChild(card);
    }
  });
}


// --- Filter Logic ---
function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      // Re-render with filter
      const filter = btn.getAttribute('data-filter');
      renderProjects(filter);

      // Refresh AOS for newly rendered cards
      if (typeof AOS !== 'undefined') {
        setTimeout(() => AOS.refresh(), 100);
      }
    });
  });
}


// --- Modal Logic ---
function openProjectModal(project) {
  const modal = document.getElementById('project-modal');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalTags = document.getElementById('modal-tags');
  const modalDemo = document.getElementById('modal-demo');
  const modalRepo = document.getElementById('modal-repo');

  // Populate content
  if (project.image) {
    modalImage.innerHTML = `<img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover" />`;
  } else {
    modalImage.innerHTML = `
      <div class="flex flex-col items-center gap-2">
        <svg class="w-16 h-16 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
        <span class="text-slate-600 text-sm font-mono">${project.title}</span>
      </div>`;
  }

  modalTitle.textContent = project.title;
  modalDescription.textContent = project.fullDesc;

  modalTags.innerHTML = project.tags
    .map(
      (tag) =>
        `<span class="px-2.5 py-1 bg-primary-500/10 text-primary-400 text-xs font-mono rounded">${tag}</span>`
    )
    .join('');

  // Demo link
  if (project.demo) {
    modalDemo.href = project.demo;
    modalDemo.classList.remove('hidden');
  } else {
    modalDemo.classList.add('hidden');
  }

  // Repo link
  if (project.repo) {
    modalRepo.href = project.repo;
    modalRepo.classList.remove('hidden');
  } else {
    modalRepo.classList.add('hidden');
  }

  // Show modal
  modal.classList.remove('hidden');
  requestAnimationFrame(() => {
    modal.classList.add('show');
  });

  // Prevent body scroll
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  modal.classList.remove('show');
  setTimeout(() => {
    modal.classList.add('hidden');
  }, 300);
  document.body.style.overflow = '';
}

function initModal() {
  // Close button
  document.getElementById('modal-close')?.addEventListener('click', closeProjectModal);

  // Click overlay to close
  document.getElementById('modal-overlay')?.addEventListener('click', closeProjectModal);

  // Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
  });
}


// --- Initialize on DOM Ready ---
document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  initFilters();
  initModal();
});
