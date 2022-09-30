'use strict';

/* Modal Selection*/
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnModalNextStep = document.querySelector('.btn--Next');

/* header - Section selection */
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const section1 = document.getElementById('section--1');
const section2 = document.getElementById('section--2');
const section3 = document.getElementById('section--3');

/* Tab selection */
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

/* links & button selection */
const nav = document.querySelector('.nav');
const links = document.querySelector('.nav__links');
const btnLearnMore = document.querySelector('.btn--scroll-to');

/* other selection*/
const copyrightDate = document.querySelector('.copyright--date');

//////////////////////////////////////////////////////
/* Modal window integration */

const openModal = function (e) {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function (e) {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

btnModalNextStep.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////////////////////
/* cookie integration */

/* 1. create cookie*/
const message = `
<div class="cookie-message"> 
We use cookies for improved functionality and analytics.
<button class="btn--cookie btn--close-cookie"> Okay
</button>
</div`;

/* 2. insert cookie*/
header.insertAdjacentHTML('beforeend', message);

/* 3. remove cookie*/
const cookieMessage = document.querySelector('.cookie-message');

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    cookieMessage.remove();
  });

/* 4. Adding style to cookie button */
const btnCookie = document.querySelector('.btn--close-cookie');

btnCookie.style.marginLeft = Number.parseFloat(1.5, 10) + 'rem';

////////////////////////////////////////////////
/* Smooth Scrolling Integration*/

/*  Navbar Link Navigation- using event delegation*/
//1. Add event lsistener to common parent element
links.addEventListener('click', function (e) {
  e.preventDefault();

  // 2. determine what element originated the event - using e.target and match the strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

/* Learn More button */
btnLearnMore.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////////////////
/* Copyright date */

copyrightDate.textContent = new Date().getFullYear();

///////////////////////////////////////////////////
/* Tab component integration */
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  /* Guard clause */
  if (!clicked) return;

  /* Remove active classes */
  tabs.forEach((tab) => tab.classList.remove('operations__tab--active'));

  tabsContent.forEach((con) =>
    con.classList.remove('operations__content--active')
  );

  /* Activate tab */
  clicked.classList.add('operations__tab--active');

  /* Activate content area */
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//////////////////////////////////////////////////////
/* Menu fade animation */
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing 'argument' into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//////////////////////////////////////////////////////
/* Sticky navigation: window-scroll method */

// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener('scroll', function (e) {
//     if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//     else nav.classList.remove('sticky');
// });

/* Sticky navigation: Intersection Observer API */
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  /* add or remove class logic */
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserverOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const headerObserver = new IntersectionObserver(
  stickyNav,
  headerObserverOptions
);
headerObserver.observe(header);
////////////////////////////////////////////////////////
/* Reveal sections: Intersection Observer API */

// callback function
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
};

// options
const sectionobserverOption = {
  root: null,
  threshold: 0.15,
};

// Intersection Observer API
const sectionObserver = new IntersectionObserver(
  revealSection,
  sectionobserverOption
);

// looping the allsection to observe the sections
allSections.forEach((section) => {
  sectionObserver.observe(section);

  section.classList.add('section--hidden');
});
///////////////////////////////////////////////////
/* Lazy loading images */
const imgTargets = document.querySelectorAll('img[data-src]');

const lazyLoading = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const lazyImgOption = {
  root: null,
  threshold: 0,
  rootMargin: `100px`,
};

const imageObserver = new IntersectionObserver(lazyLoading, lazyImgOption);

imgTargets.forEach((image) => imageObserver.observe(image));

//////////////////////////////////////////////////////////////////
/* Slider components*/
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  ////////////
  // functions for slider component

  // 1.  create dots
  const createDots = function () {
    slides.forEach((_, index) => {
      const html = `<button class="dots__dot" data-slide="${index}"></button>`;

      dotContainer.insertAdjacentHTML('beforeend', html);
    });
  };

  // 2. activate dots
  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach((dot) => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  // 3.  go-to-slide function
  const goToSlide = function (theSlide) {
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${100 * (index - theSlide)}%)`;
    });
  };

  // 4.  next slide function
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // 5. previous slide function
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // 6. Initialize the slider component functions
  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers for slides

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
/////////////////////////////////////////
/* Mobile nav */

const navBtn = document.querySelector('.btn-mobile-nav');

nav.addEventListener('click', function (e) {
  nav.classList.toggle('nav--open');
});
