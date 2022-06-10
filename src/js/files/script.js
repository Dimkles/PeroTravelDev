// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

let excursionsBlockSliderNavigation = document.querySelector('.excursions-block-slider__navigation');
excursionsBlockSliderNavigation.style.marginLeft = `${(parseInt(getComputedStyle(document.querySelector(".excursions-block__container")).marginLeft))+15}px`
excursionsBlockSliderNavigation.style.width =  `${(document.documentElement.clientWidth) - (parseInt(getComputedStyle(excursionsBlockSliderNavigation).marginLeft)) -120}px`