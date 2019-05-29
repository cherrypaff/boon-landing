import * as yup from "yup";
import Form from "./Form.jsx";

const REQUIRED_FIELD_ERROR = 'Это поле обязательно';

const businessFormSchema = {
    validationSchema: yup.object().shape({
        customerName: yup.string().required(REQUIRED_FIELD_ERROR),
        customerPhone: yup.string().required(REQUIRED_FIELD_ERROR),
        customerEmail: yup.string().email('Неправильно введена почта').required(REQUIRED_FIELD_ERROR),
        description: yup.string().required(REQUIRED_FIELD_ERROR),
    }),
    fieldSchemas: [
        {
            name: 'customerName',
            inputType: 'text',
            placeholder: 'Имя',
            label: 'Имя',
        },
        {
            name: 'customerPhone',
            inputType: 'phone',
            placeholder: 'Телефон',
            label: 'Телефон',
        },
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

const BusinessForm = () => (
    <Form isBordered={true} formSchema={businessFormSchema} url="business-offers/"/>
);

export default BusinessForm;
