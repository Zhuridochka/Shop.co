// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

const isTouchScreen = window.matchMedia("(any-hover:none)").matches;
window.addEventListener("load", windowLoaded);

function windowLoaded() {
  // let keypressActions = (e) => {
  //   if (e.key === "Escape") {
  //     document.documentElement.classList.remove("catalog-open");
  //   }
  // };

  // Додавання классу .search-open до тегу <head>
  let documentActions = (e) => {
    const targetElement = e.target;
    const typeEvent = e.type;
    const targetTag = targetElement.tagName;

    if (targetElement.closest(".search-header__open")) {
      document.documentElement.classList.toggle("search-open");
    } else if (!targetElement.closest(".search-header__body")) {
      document.documentElement.classList.remove("search-open");
    }
  };

  // Визначення висоти Header
  function updateHeaderHeight() {
    const header = document.querySelector(".header");
    const headerHeight = header.offsetHeight;
    const menuBody = document.querySelector(".menu__body");

    if (window.innerWidth < 767.98) {
      menuBody.style.paddingTop = `${headerHeight + 10}px`;
    }
  }

  updateHeaderHeight();

  function removeClassOnSmallScreens() {
    const imageElement = document.querySelector(".hero__image-bg");

    if (window.innerWidth < 992) {
      // Якщо ширина екрану менша за 992px, видаляємо клас .ibg--top
      imageElement.classList.remove("ibg--top");
      imageElement.classList.add("ibg--right");
    } else {
      // Якщо ширина екрану більша за 992px, повертаємо клас .ibg--top (якщо потрібно)
      imageElement.classList.add("ibg--top");
      imageElement.classList.remove("ibg--right");
    }
  }
  window.addEventListener("resize", removeClassOnSmallScreens);
  document.addEventListener("click", documentActions);
  // document.addEventListener("keydown", keypressActions);
}
