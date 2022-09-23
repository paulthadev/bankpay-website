'use strict';
const header = document.querySelector('.header');

//////////////////////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnModalNextStep = document.querySelector('.btn--Next');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function (e) {
  e.preventDefault();
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
// cookies message

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

btnCookie.style.backgroundColor = '#516853';
btnCookie.style.color = '#e6e6e6';
btnCookie.style.marginLeft = Number.parseFloat(1.5, 10) + 'rem';

////////////////////////////////////////////////
