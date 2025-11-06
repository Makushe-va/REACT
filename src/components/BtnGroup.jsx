import { useState } from "react";
import classNames from "classnames";

function BtnGroup() {
    const [active, setActive] = useState(null);

    return (
        <div className="btn-group" role="group">
            <button
                type="button"
                className={classNames("btn", "btn-left", { active: active === "left" })}
                onClick={() => setActive("left")}
            >
                Left
            </button>

            <button
                type="button"
                className={classNames("btn", "btn-right", { active: active === "right" })}
                onClick={() => setActive("right")}
            >
                Right
            </button>
        </div>
    );
}

export default BtnGroup;
