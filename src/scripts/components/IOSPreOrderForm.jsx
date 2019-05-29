import * as yup from "yup";
import Form from "./Form.jsx";

const REQUIRED_FIELD_ERROR = 'Это поле обязательно';

const iOSPreOrderFormSchema = {
    validationSchema: yup.object().shape({
        customerName: yup.string().required(REQUIRED_FIELD_ERROR),
        customerEmail: yup.string().email('Неправильно введена почта').required(REQUIRED_FIELD_ERROR),
    }),
    fieldSchemas: [
        {
            name: 'customerName',
            inputType: 'text',
            placeholder: 'Имя',
            label: 'Имя',
        },
        {
            name: 'customerEmail',
            inputType: 'email',
            placeholder: 'Почта',
            label: 'Почта',
        },
    ]

};

const IOSPreOrderForm = () => (
    <Form isBordered={true} formSchema={iOSPreOrderFormSchema} url="ios-pre-orders/"/>
);

export default IOSPreOrderForm;
