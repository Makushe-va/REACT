import classNames from "classnames";

function Alert({ type, text }) {
    const alertClasses = classNames("alert", `alert-${type}`);

    return (
        <div className={alertClasses} role="alert">
            {text}
        </div>
    );
}

export default Alert;