'use strict';

/* Modal Selection*/
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnModalNextStep = document.querySelector('.btn--Next');

/* header - Section selection */
const header = document.querySelector('.header');
const section1 = document.getElementById('section--1');
const section2 = document.getElementById('section--2');
const section3 = document.getElementById('section--3');

/* button selection */
const btnLearnMore = document.querySelector('.btn--scroll-to');

/* other selection*/
const copyrightDate = document.querySelector('.copyright--date');

//////////////////////////////////////////////////////
/* Modal window integration */

const openModal = function (e) {
  e.preventDefault();
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
  e.preventDefault();
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////////////////////
/* cookie integration*/

/* 1. create cookie*/
const message = `
<div class="cookie-message"> 
We use cookies for improved functionality and analytics.
<button class="btn btn--close-cookie"> Okay
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

btnCookie.style.color = '#e6e6e6';
btnCookie.style.marginLeft = Number.parseFloat(1.5, 10) + 'rem';

////////////////////////////////////////////////
/* Smooth Scrolling Integration*/

/*  Navbar Link Navigation- using event delegation*/
const links = document.querySelector('.nav__links');

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

////////////////////////////////////////////////////////
copyrightDate.textContent = new Date().getFullYear();
