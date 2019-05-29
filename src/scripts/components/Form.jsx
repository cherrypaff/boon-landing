import {Formik} from "formik";
import classNames from "classnames";
import InputGroupWrapper from "./InputGroupWrapper.jsx";
import App from "../app";
import {objectToLowerSnake} from "../utils/naming";

const FormContainer = (props) => {
    let initialValues = {};
    props.formSchema.fieldSchemas.forEach((fieldSchema) => {
       initialValues[fieldSchema.name] = '';
    });

    return (
        <Formik
          validateOnChange={true}
          validateOnBlur={true}
          initialValues={initialValues}
          onSubmit={(data) => {
              App.openLoadingModal();

              let url = `${process.env.BASE_URL}${props.url}`;
              fetch(url, {
                  method: 'POST',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(objectToLowerSnake(data))
              }).then((response) => {
                  if (response.ok) {
                      App.openSuccessModal();
                  } else {
                      App.openErrorModal();
                  }
              })
                .catch((response) => {App.openErrorModal();});
          }}
          render={(_props) => Form({..._props, ...props})}
          validationSchema={props.formSchema.validationSchema}
        />
    )
};

FormContainer.propTypes = {
    formSchema: PropTypes.object,
    isBordered: PropTypes.bool,
    url: PropTypes.string,
};

const Form = (props) => {
    const {
        isSubmitting,
        isBordered,
        errors,
        touched,
        values,
        handleChange: _handleChange,
        handleBlur,
        handleSubmit,
        formSchema,
    } = props;

    const isFormCorrect = () => {
        return Object.keys(errors).length === 0 && Object.keys(touched).length === formSchema.fieldSchemas.length
    };

    const handleChange = (event) => {
        // Какого-то хуя при изменении поля оно не делается touched: true
        props.setTouched({
          ...touched,
          [event.target.name]: true,
        });
        return _handleChange(event);
    };

    return (
        <form onSubmit={handleSubmit} className={classNames("form", {
            "form--bordered-input": isBordered,
            "form--correct": isFormCorrect()
        })}>
            {formSchema.fieldSchemas.map(({inputType, name, label, placeholder}, index) => (
                <InputGroupWrapper inputType={inputType}
                                   key={index}
                                   name={name}
                                   value={values[name]}
                                   label={label}
                                   placeholder={placeholder}
                                   touched={touched[name]}
                                   error={errors[name]}
                                   handleChange={handleChange}
                                   handleBlur={handleBlur}/>
            ))}

            <button className="form__input-group form__submit-button"
                    type="submit"
                    disabled={!isFormCorrect()}>
                Отправить
            </button>
        </form>
    );
};

export default FormContainer;
