let burger = document.querySelector(".burger"),
  menu = document.querySelector(".nav"),
  menuLinks = menu.querySelectorAll(".nav__link");
burger.addEventListener("click", function () {
  burger.classList.toggle("burger--active"),
    menu.classList.toggle("nav--active"),
    document.body.classList.toggle("stop-scroll");
}),
  menuLinks.forEach(function (e) {
    e.addEventListener("click", function () {
      burger.classList.remove("burger--active"),
        menu.classList.remove("nav--active"),
        document.body.classList.remove("stop-scroll");
    });
  }),

document
.querySelector(".search__button")
.addEventListener("click", function () {
  document
    .querySelector(".search__form")
    .classList.add("search__form__active"),
    this.classList.add("active");
}),
document
.querySelector(".search__form__button_close")
.addEventListener("click", function () {
  let e = document.querySelector(".search__form");
  e.classList.remove("search__form__active"),
    (e.querySelector("input").value = ""),
    document
      .querySelector(".search__button")
      .classList.remove("active");
}),
document.addEventListener("click", function (e) {
let t = e.target,
  r = document.querySelector(".search__form");
t.closest(".search") ||
  (r.classList.remove("search__form__active"),
  (r.querySelector("input").value = ""),
  document
    .querySelector(".search__button")
    .classList.remove("active"));
});

const swiper = new Swiper(".hero__swiper", {
    loop: !0,
    pagination: { el: ".swiper-pagination", clickable: !0 },
  });

function openStep(e, t) {
    var r, a, c;
    for (
      a = document.getElementsByClassName("tabcontent"), r = 0;
      r < a.length;
      r++
    )
      a[r].style.display = "none";
    for (c = document.getElementsByClassName("tablink"), r = 0; r < c.length; r++)
      c[r].className = c[r].className.replace(" active", "");
    (document.getElementById(t).style.display = "block"),
      (e.currentTarget.className += " active");
  }

document.getElementById("defaultOpen").click(),
  document.addEventListener("DOMContentLoaded", function () {
    new Accordion(".faq__list", {
      duration: 700,
      elementClass: "faq__item",
      triggerClass: "faq-top",
      panelClass: "faq-bottom",
    });
  });
