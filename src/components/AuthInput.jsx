function AuthInput({

    type,

    placeholder,

    value,

    onChange

}) {

    return (

        <input

            className="auth-input"

            type={type}

            placeholder={placeholder}

            value={value}

            onChange={onChange}

        />

    );

}

export default AuthInput;