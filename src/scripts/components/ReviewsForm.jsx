import * as yup from "yup";
import Form from "./Form.jsx";

const REQUIRED_FIELD_ERROR = 'Это поле обязательно';

const reviewsFormSchema = {
    validationSchema: yup.object().shape({
        customerEmail: yup.string().email('Неправильно введена почта').required(REQUIRED_FIELD_ERROR),
        description: yup.string().required(REQUIRED_FIELD_ERROR),
    }),
    fieldSchemas: [
        {
            name: 'customerEmail',
            inputType: 'email',
            placeholder: 'Почта',
            label: 'Почта',
        },
        {
            name: 'description',
            inputType: 'textarea',
            placeholder: 'Описание',
            label: 'Описание',
        },
    ]
};

const ReviewsForm = () => (
    <Form isBordered={false} formSchema={reviewsFormSchema} url="reviews/"/>
);

export default ReviewsForm;
