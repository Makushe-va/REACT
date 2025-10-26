import React from "react";

function Definitions({ data }) {
    return (
        <dl>
            {data.map((item) => (
                <React.Fragment key={item.id}>
                    <dt>{item.dt}</dt>
                    <dd>{item.dd}</dd>
                </React.Fragment>
            ))}
        </dl>
    );
}

export default Definitions;