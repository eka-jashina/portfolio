var block = document.querySelector('.map__wrapper');
var button= document.querySelector('.address__button');

button.onclick = function() {
  if (!block) {
    return;
  }

  block.hidden= !block.hidden;
};