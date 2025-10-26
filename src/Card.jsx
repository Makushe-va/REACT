import React, { Component } from "react";

class Card extends Component {
    render() {
        const { title, text } = this.props;
        if (!title && !text) {
            return null;
        }
        return (
            <dl style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
                {title && <dt>{title}</dt>}
                {text && <dd>{text}</dd>}
            </dl>
        );
    }
}

export default Card;