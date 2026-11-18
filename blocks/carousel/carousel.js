import { loadCSS, loadScript } from '../../scripts/aem.js';

export default async function decorate(block) {
  // 1. Load Owl Carousel CSS and jQuery + Owl JS
  await Promise.all([
    loadCSS('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css'),
    loadCSS('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css'),
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js'),
  ]);

  // Owl Carousel requires window.jQuery to be loaded first
  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js');

  // 2. Transform AEM block rows into Owl Carousel structure
  const rows = [...block.children];
  const owlWrapper = document.createElement('div');
  owlWrapper.classList.add('owl-carousel', 'owl-theme');

  rows.forEach((row) => {
    const slide = document.createElement('div');
    slide.classList.add('item', 'carousel-slide');

    const cols = [...row.children];
    if (cols[0]) {
      cols[0].classList.add('carousel-slide-image');
      slide.append(cols[0]);
    }
    if (cols[1]) {
      cols[1].classList.add('carousel-slide-content');
      slide.append(cols[1]);
    }

    owlWrapper.append(slide);
  });

  block.textContent = '';
  block.append(owlWrapper);

  // 3. Initialize Owl Carousel
  window.jQuery(owlWrapper).owlCarousel({
    items: 1,
    loop: true,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    smartSpeed: 600,
    navText: ['&#8249;', '&#8250;'],
  });
}