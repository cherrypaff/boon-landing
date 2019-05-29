import classNames from "classnames";

const Input = (props) => {
    // Создаем _props без InputType
    const { inputType, ..._props } = props;

    switch (inputType) {
        case 'text':
            return <input {..._props} className="form__input" type="text"/>;
        case 'email':
            return <input {..._props} className="form__input" type="email"/>;
        case 'phone':
            return <input {..._props} className="form__input" type="tel"/>;
        case 'textarea':
            return <textarea {..._props} className="form__input form__input--big-text" cols="30" rows="10"/>;
        default:
            return <input {..._props} className="form__input" type="text"/>;
    }
};


const InputGroupWrapper = (
    {inputType, name, value, label, placeholder, touched, error, handleChange, handleBlur}
    ) => {
    const id = `${name}`;

    const inputProps = {
        id,
        name,
        onChange: handleChange,
        onBlur: handleBlur,
        placeholder,
        value,
        inputType
    };

    return (
        <div className={classNames("form__input-group-wrapper", {
                "form__input-group-wrapper--wrong": touched && error,
                "form__input-group-wrapper--correct": touched && !error,
            })}>
            <div className="form__input-group">
                <label className="form__label" htmlFor={id}>{label}</label>
                <Input {...inputProps}/>
            </div>
            <p className="form__error-text">{error}</p>
        </div>
    )
};

export default InputGroupWrapper;
