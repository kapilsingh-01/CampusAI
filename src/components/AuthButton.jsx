function AuthButton({

    text,

    onClick

}) {

    return (

        <button

            className="auth-btn"

            onClick={onClick}

        >

            {text}

        </button>

    );

}

export default AuthButton;