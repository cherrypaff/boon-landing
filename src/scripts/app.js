// OWL - slider
import 'owl.carousel/src/scss/owl.carousel.scss';
import 'owl.carousel';


export default class App {
    static closeAllModals() {
        let modals = document.querySelectorAll('.js-modal');
        modals.forEach((modal) => {
            modal.classList.remove('modal--active');
        })
    }

    static openPreOrderModal() {
        App.closeAllModals();
        let preOrderForm = document.querySelector('.js-modal-pre-order');
        preOrderForm.classList.add('modal--active');
    }

    static openLoadingModal() {
        App.closeAllModals();
        let preOrderForm = document.querySelector('.js-modal-loading');
        preOrderForm.classList.add('modal--active');
    }

    static openErrorModal() {
        App.closeAllModals();
        let preOrderForm = document.querySelector('.js-modal-error');
        preOrderForm.classList.add('modal--active');
    }

    static openSuccessModal() {
        App.closeAllModals();
        let preOrderForm = document.querySelector('.js-modal-success');
        preOrderForm.classList.add('modal--active');
    }

    _initializePreOrderClickListeners() {
        let triggers = document.querySelectorAll('.js-ios-pre-order-trigger');
        triggers.forEach((trigger) => {
           trigger.addEventListener('click', (event) => {
               event.preventDefault();
               App.openPreOrderModal();
           })
        });
    }

    initializeModals() {
        let modals = document.querySelectorAll('.js-modal');

        modals.forEach((modal) => {
           let closeButton = modal.querySelector('.js-modal-close');
           // По клику на крестик закрываем модалку
           closeButton.addEventListener('click', (event) => {
              event.preventDefault();
              modal.classList.remove('modal--active');
           });
        });

        // По клику где угодно вне модалки закрываем модалку
        window.addEventListener('click', (event) => {
            if (event.target.classList.contains('js-modal')) {
                event.target.classList.remove('modal--active');
            }
        });
    }

    initializeClickListeners() {
        this._initializePreOrderClickListeners();
    }

    initializeSlider() {
        // OWL - slider
        let owlSlider = $('.owl-carousel');
        owlSlider.owlCarousel({
            loop: true,
            autoWidth:true,
            nav:false,
        });

        $('.js-slider-prev-button').on('click', (event) => {
            event.preventDefault();
            owlSlider.trigger('prev.owl.carousel');
        });

        $('.js-slider-next-button').on('click', (event) => {
            event.preventDefault();
            owlSlider.trigger('next.owl.carousel');
        });
    }

    addPolyfills() {
        // Function to make IE9+ support forEach:
        if (Array.prototype.forEach !== 'function') {
            Array.prototype.forEach = function(fn, scope) {
                for(let i = 0, len = this.length; i < len; ++i) {
                    fn.call(scope, this[i], i, this);
                }
            }
        }

        if (typeof NodeList.prototype.forEach !== "function") {
            NodeList.prototype.forEach = Array.prototype.forEach;
        }
    }
}