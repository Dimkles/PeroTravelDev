/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Navigation, FreeMode, Scrollbar, Thumbs, } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Инициализация слайдеров
function initSliders() {
	// Перечень слайдеров
	// Проверяем, есть ли слайдер на стронице
	if (document.querySelector('.started__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		let myStartedSlider =  new Swiper('.started__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, FreeMode],
			observer: true,
			observeParents: true,
			slidesPerView: 'auto',
			spaceBetween: 20,
			autoHeight: true,
			speed: 800,
			slideToClickedSlide: true,
			slidesOffsetBefore: document.documentElement.clientWidth - (document.querySelector(".slider-started__slide").offsetWidth * 2 +200),		
			breakpoints: {
				380: {
					slidesOffsetBefore: document.documentElement.clientWidth - (document.querySelector(".slider-started__slide").offsetWidth * 2 + 250),
				},
			},
			
			// События
			on: {
			}
		});
	};
	
	if (document.querySelector('.started-popup__slider')) {
		let myStartedPopupSlider = new Swiper('.started-popup__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Thumbs, Scrollbar],
			observer: true,
			observeParents: true,
			slidesPerView: 'auto',
			centeredSlides: true,
			spaceBetween: 20,
			autoHeight: true,
			speed: 800,
			slideToClickedSlide: true,	
			
			thumbs: {
				swiper: {
					el: '.started-popup-min__slider',
					observer: true,
					observeParents: true,
					slidesPerView: 'auto',
					spaceBetween: 20,
					autoHeight: true,
					speed: 800,
				},
			},
			// События
			on: {

			}
		});
	};

	if (document.querySelector('.excursions-block-slider')) {
		let myExcursionsBlockSlider = new Swiper('.excursions-block-slider', {
			modules: [Navigation, Scrollbar],
			observer: true,
			observeParents: true,
			slidesPerView: 'auto',
			spaceBetween: 20,
			speed: 800,
			navigation: {
				nextEl: '.excursions-block-slider__button-next',
				prevEl: '.excursions-block-slider__button-prev',
			},
			scrollbar: {
          		el: ".excursions-block-slider__scrollbar",
          		draggable: true,
        	},
			slideToClickedSlide: true,
			slidesOffsetAfter: document.querySelector(".excursions-block-slider__slide").offsetWidth/3,
			slidesOffsetBefore: (parseInt(getComputedStyle(document.querySelector(".excursions-block__container")).marginLeft))+15,
		})
	}
	if (document.querySelector('.reviews__slider')) {
		let myReviewsSlider = new Swiper('.reviews__slider', {
			modules: [Navigation, Scrollbar],
			observer: true,
			observeParents: true,
			slidesPerView: 'auto',
			spaceBetween: 20,
			speed: 800,
			navigation: {
			 	nextEl: '.reviews__button-next',
			 	prevEl: '.reviews__button-prev',
			 },
			scrollbar: {
          		el: ".reviews__scrollbar",
          	 	draggable: true,
        	 },
			slideToClickedSlide: true,
			slidesOffsetAfter: document.querySelector(".reviews__slide").offsetWidth/3,
			slidesOffsetBefore: (parseInt(getComputedStyle(document.querySelector(".reviews__container")).marginLeft))+15,
		})
	}
}
 
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
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
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});

function setDynamicMarginLeft(element, container, containerPading = 0) {
    if((document.querySelector(`${element}`)) && (document.querySelector(`${container}`))) {
        element = document.querySelector(`${element}`);
        let containerMargin = parseInt(getComputedStyle(document.querySelector(`${container}`)).marginLeft);
        element.style.marginLeft = `${containerMargin + containerPading}px`
        
    }
}


function setDynamicWidthSliderNavigation(sliderNavigation) {
    if(document.querySelector(`${sliderNavigation}`)) {
        sliderNavigation = document.querySelector(`${sliderNavigation}`);
        sliderNavigation.style.width = `${(document.documentElement.clientWidth) - (parseInt(getComputedStyle(sliderNavigation).marginLeft)) -120}px`;
    }
}


setDynamicMarginLeft('.excursions-block-slider__navigation', ".excursions-block__container", 15)
setDynamicWidthSliderNavigation('.excursions-block-slider__navigation')

setDynamicMarginLeft('.reviews__navigation','.reviews__container', 15)
setDynamicWidthSliderNavigation('.reviews__navigation')