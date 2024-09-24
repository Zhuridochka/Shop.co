// Підключення з node_modules

import * as noUiSlider from "nouislider";

// Підключення стилів з scss/base/forms/range.scss
// у файлі scss/forms/forms.scss

// Підключення стилів з node_modules
import "nouislider/dist/nouislider.css";

export function rangeInit() {
  const priceSlider = document.querySelector(".filter-price__range");

  if (priceSlider) {
    const priceSliderInputs = document.querySelectorAll(".filter-price__input");

    //Форматування чисел з дробних до цілих
    const formatForSlider = {
      from: function (formattedValue) {
        return Number(formattedValue);
      },
      to: function (numericValue) {
        return Math.round(numericValue);
      },
    };

    let textFrom = priceSlider.getAttribute("data-from");
    let textTo = priceSlider.getAttribute("data-to");
    noUiSlider.create(priceSlider, {
      start: [50, 200], // [0,200000]

      connect: true,
      format: formatForSlider,
      range: {
        min: [0],
        max: [250],
      },
      /*
			format: wNumb({
				decimals: 0
			})
			*/
    });

    priceSlider.noUiSlider.on("update", function (values, handle) {
      priceSliderInputs[handle].value = values[handle];
    });

    const priceStart = document.getElementById("price-start");
    const priceEnd = document.getElementById("price-end");

    priceStart.addEventListener("change", setPriceValues);
    priceEnd.addEventListener("change", setPriceValues);

    function setPriceValues() {
      let priceStartValue;
      let priceEndValue;
      if (priceStart.value != "") {
        priceStartValue = priceStart.value;
      }
      if (priceEnd.value != "") {
        priceEndValue = priceEnd.value;
      }
      priceSlider.noUiSlider.set([priceStartValue, priceEndValue]);
    }
  }
}
rangeInit();
