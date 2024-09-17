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

  // Функція для визначення висоти потрібних об'єктів і додавання стилів динамічних відступів до потрібних об'єктів
  function updateHeightObjects() {
    const header = document.querySelector(".header");
    const headerHeight = header.offsetHeight;
    const menuBody = document.querySelector(".menu__body");

    if (window.innerWidth < 767.98) {
      menuBody.style.paddingTop = `${headerHeight + 10}px`;
    }

    const offersObject = document.querySelector(".offers");
    const offersHeight = offersObject.offsetHeight;
    const halfOffersHeight = offersHeight / 2;
    const pageOffers = document.querySelector(".page__offers");
    const footer = document.querySelector(".footer");
    if (offersObject) {
      pageOffers.style.marginBottom = `${-halfOffersHeight}px`;
      footer.style.paddingTop = `${halfOffersHeight}px`;
    }
  }

  updateHeightObjects();

  // Функція для додавання технічного класу Image при зміні ширини в'юпорта
  const imageElement = document.querySelector(".hero__image-bg");
  if (imageElement) {
    function removeClassOnSmallScreens() {
      if (window.innerWidth < 992) {
        // Якщо ширина екрану менша за 992px, видаляємо клас .ibg--top
        imageElement.classList.remove("ibg--top");
        imageElement.classList.add("ibg--right90");
      } else {
        // Якщо ширина екрану більша за 992px, повертаємо клас .ibg--top (якщо потрібно)
        imageElement.classList.add("ibg--top");
        imageElement.classList.remove("ibg--right90");
      }
    }
    // Викликаємо функцію
    removeClassOnSmallScreens();
  }

  // Функція для динамічної зміни data-atribute висоти в залежності від ширини екрану
  function updateDataAttributeBaseOnHeight() {
    const itemProduct = document.querySelector(".item-product");
    if (!itemProduct) return;
    const arrivalsItems = document.querySelector(".arrivals__items");
    const sellingItems = document.querySelector(".selling__items");
    const likeItems = document.querySelector(".like__items");
    const itemProductHeight = itemProduct.offsetHeight;

    if (arrivalsItems) {
      arrivalsItems.dataset.showmoreContent = itemProductHeight;
    }
    if (sellingItems) {
      sellingItems.dataset.showmoreContent = itemProductHeight;
    }
    if (likeItems) {
      likeItems.dataset.showmoreContent = itemProductHeight;
    }
  }
  updateDataAttributeBaseOnHeight();

  document.addEventListener("click", documentActions);
  // document.addEventListener("keydown", keypressActions);
}
