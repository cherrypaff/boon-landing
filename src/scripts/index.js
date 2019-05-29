import style from '@/stylesheets/style';
import { render } from 'react-dom';
import App from "./app";
import BusinessForm from "./components/BusinessForm.jsx";
import ReviewsForm from "./components/ReviewsForm.jsx";
import IOSPreOrderForm from "./components/IOSPreOrderForm.jsx";

let app = new App();
app.addPolyfills();
app.initializeModals();
app.initializeClickListeners();
app.initializeSlider();

render(
    <BusinessForm/>,
    document.getElementById('business-form-container'),
);

render(
    <ReviewsForm/>,
    document.getElementById('reviews-form-container'),
);

render(
    <IOSPreOrderForm/>,
    document.getElementById('ios-pre-order-form-container'),
);


window.App = App;
