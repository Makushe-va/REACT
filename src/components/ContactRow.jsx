import React from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

function ContactRow({ contact, onEdit, onDelete }) {
    return (
        <tr>
            <td>{contact.name}</td>
            <td>{contact.phone}</td>
            <td>{contact.email || "—"}</td>
            <td>
                <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={onEdit}
                    className="me-2"
                >
                    Edit
                </Button>

                <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={onDelete}
                >
                    Delete
                </Button>
            </td>
        </tr>
    );
}

ContactRow.propTypes = {
    contact: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default ContactRow;
