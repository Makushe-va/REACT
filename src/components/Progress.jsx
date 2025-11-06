import classNames from "classnames";

function Progress({ percentage }) {
    const progressBarClasses = classNames("progress-bar");

    return (
        <div className="progress">
            <div
                className={progressBarClasses}
                role="progressbar"
                aria-valuenow={percentage}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    );
}

export default Progress;