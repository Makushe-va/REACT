import classNames from "classnames";

function ListGroup({ children }) {
    const listClasses = classNames("list-group");
    const itemClasses = classNames("list-group-item");

    return (
        <ul className={listClasses}>
            {Array.isArray(children)
                ? children.map((child, index) => (
                    <li key={index} className={itemClasses}>
                        {child}
                    </li>
                ))
                : <li className={itemClasses}>{children}</li>}
        </ul>
    );
}

export default ListGroup;