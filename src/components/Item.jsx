import React from "react";
import PropTypes from "prop-types";

const Item = ({ task, onRemove }) => {
    return (
        <div>
            <div className="row">
                <div className="col-auto">
                    <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={onRemove}
                    >
                        -
                    </button>
                </div>
                <div className="col">{task.text}</div>
            </div>
            <hr />
        </div>
    );
};

Item.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
    }).isRequired,
    onRemove: PropTypes.func.isRequired,
};

export default Item;
