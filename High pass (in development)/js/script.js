let burger = document.querySelector('.burger');
let navList = document.querySelector('.nav__list');

burger.addEventListener('click', function() {
  burger.classList.toggle('burger_active');
  navList.classList.toggle('nav__list_active');
});

let block = document.querySelector('.map__wrapper');
let button = document.querySelector('.address__button');
let map = document.querySelector('.map');

// При клике на карту, блок будет отображаться
map.addEventListener('click', function() {
  if (!block) {
    return;
  }

  block.hidden = false;
});

button.addEventListener('click', function(event) {
  event.stopPropagation(); // Остановка всплытия события клика на кнопке, чтобы не привести к отображению блока адреса

  if (!block) {
    return;
  }

  // При нажатии на кнопку, блок будет скрываться
  block.hidden = true;
});