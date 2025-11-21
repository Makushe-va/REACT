import React from "react";
import { Table } from "react-bootstrap";
import ContactRow from "./ContactRow.jsx";
import PropTypes from "prop-types";

function ContactsList({ contacts, onEdit, onDelete }) {
    if (contacts.length === 0) {
        return <p>No contacts yet.</p>;
    }

    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Actions</th>
            </tr>
            </thead>

            <tbody>
            {contacts.map((contact) => (
                <ContactRow
                    key={contact.id}
                    contact={contact}
                    onEdit={() => onEdit(contact)}
                    onDelete={() => onDelete(contact.id)}
                />
            ))}
            </tbody>
        </Table>
    );
}

ContactsList.propTypes = {
    contacts: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default ContactsList;
