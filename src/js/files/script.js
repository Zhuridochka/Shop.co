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

  //* Додавання класів .ім'я-класу_open до тегу <head>
  let documentActions = (e) => {
    const targetElement = e.target;
    const typeEvent = e.type;
    const targetTag = targetElement.tagName;

    if (targetElement.closest(".search-header__open")) {
      document.documentElement.classList.toggle("search-open");
    } else if (!targetElement.closest(".search-header__body")) {
      document.documentElement.classList.remove("search-open");
    }

    //* Подія при кліку для відкриття списку у об'єкта Sale в меню
    if (targetElement.closest(".menu__item")) {
      document.documentElement.classList.toggle("shop-open");
    } else if (!targetElement.closest(".menu__item")) {
      document.documentElement.classList.remove("shop-open");
    }

    if (targetElement.closest(".filter__button-filtr")) {
      if (window.innerWidth < 768) {
        document.documentElement.classList.toggle("filter-open");
      }
    } else if (!targetElement.closest(".content-category__filter")) {
      document.documentElement.classList.remove("filter-open");
    }
  };

  //* Функція для визначення висоти потрібних об'єктів і додавання стилів динамічних відступів до потрібних об'єктів
  function updateHeightObjectsMenuBody() {
    const header = document.querySelector(".header");
    if (!header) return;
    const headerHeight = header.offsetHeight;
    const menuBody = document.querySelector(".menu__body");

    if (header) {
      if (window.innerWidth < 767.98) {
        menuBody.style.paddingTop = `${headerHeight + 10}px`;
      }
    }
  }
  updateHeightObjectsMenuBody();

  function updateHeightObjectsPageOffers() {
    const offersObject = document.querySelector(".offers");
    const offersHeight = offersObject.offsetHeight;
    const halfOffersHeight = offersHeight / 2;
    const pageOffers = document.querySelector(".page__offers");
    const productOffers = document.querySelector(".product__offers");
    const categoryOffers = document.querySelector(".category__offers");
    const footer = document.querySelector(".footer");
    if (pageOffers) {
      pageOffers.style.marginBottom = `${-halfOffersHeight}px`;
      footer.style.paddingTop = `${halfOffersHeight}px`;
    }
    if (productOffers) {
      productOffers.style.marginBottom = `${-halfOffersHeight}px`;
      footer.style.paddingTop = `${halfOffersHeight}px`;
    }
    if (categoryOffers) {
      categoryOffers.style.marginBottom = `${-halfOffersHeight}px`;
      footer.style.paddingTop = `${halfOffersHeight}px`;
    }
  }

  updateHeightObjectsPageOffers();

  //* Функція для додавання технічного класу Image при зміні ширини в'юпорта
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

  //* Функція для динамічної зміни data-atribute висоти в залежності від ширини екрану
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
  //* Функція для динамічної зміни data-atribute висоти в залежності від ширини екрану для іншого блоку
  function updateDataAttributeReviewOnHeight() {
    const blockContent = document.querySelector(".block__content");
    if (!blockContent) return;
    const ratingReviewsBlock = document.querySelector(".rating-reviews__block");
    const blockContentHeight = blockContent.offsetHeight;
    let doubleblockContentHeight = blockContentHeight * 3;
    doubleblockContentHeight += 45;

    if (ratingReviewsBlock) {
      ratingReviewsBlock.dataset.showmoreContent = doubleblockContentHeight;
    }
  }
  updateDataAttributeReviewOnHeight();

  //* Функція для відкриття списку у об'єкта відкуки
  const reviewActivities = document.querySelectorAll(".review__activity");

  // Перевіряємо, чи є хоча б один елемент з класом .review__activity
  if (reviewActivities.length > 0) {
    // Перебираємо кожен блок з класом .review__activity
    reviewActivities.forEach((reviewActivity) => {
      const button = reviewActivity.querySelector(".activity-review__button");
      const reviewList = reviewActivity.querySelector(".activity-review__list");

      // Функція для перемикання класів --open та --close
      function toggleReviewList() {
        if (reviewList.classList.contains("activity-review__list--open")) {
          reviewList.classList.remove("activity-review__list--open");
          reviewList.classList.add("activity-review__list--close");
        } else {
          reviewList.classList.remove("activity-review__list--close");
          reviewList.classList.add("activity-review__list--open");
        }
      }

      // Клік на кнопці - показати/сховати список
      button.addEventListener("click", function (event) {
        event.stopPropagation(); // Запобігаємо спрацюванню обробника для кліка поза списком
        toggleReviewList();
      });

      // Закриття списку при кліку поза межами списку
      document.addEventListener("click", function (event) {
        if (
          !reviewList.contains(event.target) &&
          !button.contains(event.target)
        ) {
          reviewList.classList.remove("activity-review__list--open");
          reviewList.classList.add("activity-review__list--close");
        }
      });
    });
  }

  //* Функція для відкриття списку у об'єкта Sale в меню
  // const menuItems = document.querySelectorAll(".menu__item");

  // Перевіряємо, чи є хоча б один елемент з класом .menu__item
  // if (menuItems.length > 0) {
  //   menuItems.forEach((menuItem) => {
  //     const icon = document.querySelector(".menu__item span");
  //     const menuSublist = document.querySelector(".menu__sublist");

  //     // Функція для перемикання класів __open та __close
  //     function toggleMenuSublist() {
  //       if (menuSublist.classList.contains("menu-sublist__close")) {
  //         menuSublist.classList.remove("menu-sublist__close");
  //         menuSublist.classList.add("menu-sublist__open");

  //         icon.classList.add("rotate-icon");
  //       } else if (menuSublist.classList.contains("menu-sublist__open")) {
  //         menuSublist.classList.remove("menu-sublist__open");
  //         menuSublist.classList.add("menu-sublist__close");

  //         icon.classList.remove("rotate-icon");
  //       }
  //     }

  //     // Клік по галочці - показати/сховати список
  //     menuItem.addEventListener("click", function (event) {
  //       event.stopPropagation(); // Запобігаємо спрацюванню обробника для кліка поза списком
  //       toggleMenuSublist();
  //     });

  //     //Закриття списку при кліку по галочці і поза межами списку
  //     document.addEventListener("click", function (event) {
  //       if (
  //         !menuSublist.contains(event.target) &&
  //         !menuItem.contains(event.target) &&
  //         !icon.contains(event.target)
  //       ) {
  //         menuSublist.classList.remove("menu-sublist__open");
  //         menuSublist.classList.add("menu-sublist__close");
  //         icon.classList.remove("rotate-icon");
  //       }
  //     });
  //   });
  // }

  document.addEventListener("click", documentActions);
  // document.addEventListener("keydown", keypressActions);
}
