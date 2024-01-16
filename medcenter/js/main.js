/* Кастомный селект */

const courseList = document.querySelector("#form-course");
const courseChoices = new Choices(courseList, {
  searchEnabled: false,
  itemSelectText: "Выбрать",
});

const dateList = document.querySelector("#form-date");
const dateChoices = new Choices(dateList, {
  searchEnabled: false,
  itemSelectText: "Выбрать",
});

/* Поведение всех модальных окон на сайте */

// открывает окно и блокирует скролл
function openModalAndLockScroll({ target: buttonOpener }) {
  const dialogID = buttonOpener.getAttribute("aria-controls");
  const dialogElement = document.querySelector(`#${dialogID}`);
  dialogElement.showModal();
  document.body.style.overflow = "hidden";
}

// возвращает скролл при закрытии окна
function returnScroll() {
  document.body.style.overflow = "auto";
}

//закрывает диалог по клику на любую область экрана
function closeOnBackDropClick({ currentTarget, target }) {
  const dialogElement = currentTarget;
  const isClickedOnBackDrop = target === dialogElement;
  if (isClickedOnBackDrop) {
    dialogElement.close();
    returnScroll();
  }
}

/* hero-swiper */

const heroSwiper1 = new Swiper('.hero__bg-left-top', {
  direction: 'vertical',
  slidesPerView: 1,
  effect: 'fade',
  speed: 1000,
});

const heroSwiper2 = new Swiper('.hero__bg-right-top', {
  direction: 'vertical',
  slidesPerView: 1,
  effect: 'fade',
  speed: 1000,
}); 

const heroSwiper3 = new Swiper('.hero__bg-left-bottom', {
  direction: 'vertical',
  slidesPerView: 1,
  pagination: {
    el: ".hero-pagination",
  },
  navigation: {
    nextEl: ".hero-button-next",
    prevEl: ".hero-button-prev",
  },
  effect: 'fade',
  speed: 1000,
});

const heroSwiper4 = new Swiper('.hero__bg-right-bottom', {
  direction: 'vertical',
  slidesPerView: 1,
  effect: 'fade',
  speed: 1000,
});

heroSwiper3.controller.control = [heroSwiper1, heroSwiper2, heroSwiper4];

/* Свайпер новостей */

const newsSwiper = new Swiper(".news__container", {
  loop: true,
  slidesPerView: 3,
  spaceBetween: 3,
  pagination: {
    el: ".news-pagination",
  },
  navigation: {
    nextEl: ".news-button-next",
    prevEl: ".news-button-prev",
  },
  breakpoints: {
    521: {
      slidesPerView: 2,
    },
    1025: {
      slidesPerView: 3,
    }
  },
});

/* Свайпер отзывов */

const reviewsSwiper = new Swiper(".reviews__container", {
  loop: true,
  slidesPerView: 3,
  spaceBetween: 3,
  pagination: {
    el: ".reviews-pagination",
  },
  navigation: {
    nextEl: ".reviews-button-next",
    prevEl: ".reviews-button-prev",
  },
  breakpoints: {
    521: {
      slidesPerView: 2,
    },
    1025: {
      slidesPerView: 3,
    }
  },
});

/* Табы в ЧаВо */

function openQuestion(evt, answerNumber) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(answerNumber).style.display = "block";
  evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();

/* Свайпер в ЧаВо */

const faqSwiper = new Swiper(".faq__questions", {
  slidesPerView: 2,
  slidesPerGroup: 8,
  grid: {
    rows: 4,
  },
  spaceBetween: 3,
  pagination: {
    el: ".faq-pagination",
  },
  navigation: {
    nextEl: ".faq-button-next",
    prevEl: ".faq-button-prev",
  },
  breakpoints: {
    521: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    1025: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    }
  },
});

/* Галеря */

lightGallery(document.getElementById("index-gallery"), {
  plugins: [lgZoom, lgThumbnail],
  speed: 500,
});

/* Галерея оборудования */

document.addEventListener("DOMContentLoaded", function () {
  var galleryThumbs = new Swiper(".gallery-thumbs", {
    spaceBetween: 3,
    slidesPerView: 5,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
  });

  var galleryTop = new Swiper(".gallery-top", {
    spaceBetween: 0,
    navigation: {
      nextEl: ".gallery-button-next",
      prevEl: ".gallery-button-prev",
    },
    thumbs: {
      swiper: galleryThumbs,
    },
  });
});

galleryThumbs.controller.control = galleryTop;
