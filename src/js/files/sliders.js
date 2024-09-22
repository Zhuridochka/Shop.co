/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper from "swiper";
import { Navigation, Thumbs, Controller } from "swiper/modules";
/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Базові стилі
import "../../scss/base/swiper.scss";
// Повний набір стилів з scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Повний набір стилів з node_modules
// import 'swiper/css';

// Ініціалізація слайдерів
function initSliders() {
  // Список слайдерів
  // Перевіряємо, чи є слайдер на сторінці

  // Customers_slider
  if (document.querySelector(".customers__slider")) {
    // Вказуємо склас потрібного слайдера
    // Створюємо слайдер
    const swiperCustomers = new Swiper(".customers__slider", {
      // Вказуємо клас потрібного слайдера
      // Підключаємо модулі слайдера
      // для конкретного випадку
      modules: [Navigation],
      observer: true,
      observeParents: true,
      slidesPerView: 3,
      spaceBetween: 20,
      //autoHeight: true,
      speed: 800,

      //touchRatio: 0,
      //simulateTouch: false,
      //loop: true,
      //preloadImages: false,
      //lazy: true,

      /*
			// Ефекти
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

      // Пагінація
      /*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

      // Скроллбар
      /*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

      // Кнопки "вліво/вправо"
      navigation: {
        prevEl: ".customers__button-prev",
        nextEl: ".customers__button-next",
      },

      // Брейкпоінти
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 5,
        },
        510: {
          slidesPerView: 1.5,
          spaceBetween: 10,
          // autoHeight: true,
        },
        768: {
          slidesPerView: 2.2,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 2.6,
          spaceBetween: 20,
        },
        1268: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },

      // Події
      on: {
        slideChange: function () {
          // Видаляємо ефект blur з усіх слайдів
          document.querySelectorAll(".swiper-slide").forEach((slide) => {
            slide.classList.remove("blur-effect");
          });

          // Отримуємо індекс активного слайду
          const activeIndex = swiperCustomers.activeIndex;

          // Обчислюємо індекс третього слайду після активного
          const targetIndex = activeIndex + (3 % swiperCustomers.slides.length);
          const prevIndex = activeIndex - 1;

          const slides = swiperCustomers.slides;

          if (slides[targetIndex]) {
            // Додаємо ефект розмиття до цього слайду
            slides[targetIndex].classList.add("blur-effect");
          }

          if (slides[prevIndex]) {
            slides[prevIndex].classList.add("blur-effect");
          }
        },
      },
    });
  }

  // Previews_slider
  // if (document.querySelector(".previews-slider-product")) {
  // Вказуємо склас потрібного слайдера
  // Створюємо слайдер
  const swiperPreviewsProduct = new Swiper(".previews-slider-product", {
    // Вказуємо клас потрібного слайдера
    // Підключаємо модулі слайдера
    // для конкретного випадку
    modules: [Thumbs],
    slidesPerView: 3,
    spaceBetween: 12,
    //loop: true,

    breakpoints: {
      1118.98: {
        direction: "vertical",
        spaceBetween: 14,
      },
    },

    // Події
    on: {},
  });
  // }

  // Product-main_slider
  /*if (document.querySelector(".main-slider-product")) {*/
  // Вказуємо склас потрібного слайдера
  // Створюємо слайдер
  const swiperMainProduct = new Swiper(".main-slider-product", {
    // Вказуємо клас потрібного слайдера
    // Підключаємо модулі слайдера
    // для конкретного випадку
    modules: [Thumbs],
    //loop: true,
    // spaceBetween: 5,
    thumbs: {
      swiper: swiperPreviewsProduct,
    },

    // Події
    on: {},
  });
}
// }
// Скролл на базі слайдера (за класом swiper scroll для оболонки слайдера)
function initSlidersScroll() {
  let sliderScrollItems = document.querySelectorAll(".swiper_scroll");
  if (sliderScrollItems.length > 0) {
    for (let index = 0; index < sliderScrollItems.length; index++) {
      const sliderScrollItem = sliderScrollItems[index];
      const sliderScrollBar =
        sliderScrollItem.querySelector(".swiper-scrollbar");
      const sliderScroll = new Swiper(sliderScrollItem, {
        observer: true,
        observeParents: true,
        direction: "vertical",
        slidesPerView: "auto",
        freeMode: {
          enabled: true,
        },
        scrollbar: {
          el: sliderScrollBar,
          draggable: true,
          snapOnRelease: false,
        },
        mousewheel: {
          releaseOnEdges: true,
        },
      });
      sliderScroll.scrollbar.updateSize();
    }
  }
}

window.addEventListener("load", function (e) {
  // Запуск ініціалізації слайдерів
  initSliders();
  // Запуск ініціалізації скролла на базі слайдера (за класом swiper_scroll)
  //initSlidersScroll();
});
