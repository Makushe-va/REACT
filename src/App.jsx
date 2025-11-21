import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import ContactsList from "./components/ContactsList.jsx";
import ContactFormModal from "./components/ContactFormModal.jsx";

const STORAGE_KEY = "phonebook_contacts";

function App() {

    const [contacts, setContacts] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (err) {
            console.error("Error reading LS:", err);
        }
        return [];
    });

    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingContact, setEditingContact] = useState(null);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
        } catch (err) {
            console.error("Error writing LS:", err);
        }
    }, [contacts]);

    const addContact = (values) => {
        const newContact = {
            id: Date.now(),
            name: values.name,
            phone: values.phone,
            email: values.email
        };
        setContacts([...contacts, newContact]);
    };

    const updateContact = (values) => {
        const updated = contacts.map((c) =>
            c.id === editingContact.id ? { ...c, ...values } : c
        );
        setContacts(updated);
    };

    const handleSubmit = (values) => {
        if (editingContact) {
            updateContact(values);
        } else {
            addContact(values);
        }

        setShowModal(false);
        setEditingContact(null);
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete this contact?")) {
            setContacts(contacts.filter((c) => c.id !== id));
        }
    };

    const filtered = contacts.filter((c) => {
        const s = search.toLowerCase();
        return (
            c.name.toLowerCase().includes(s) ||
            c.phone.toLowerCase().includes(s)
        );
    });

    return (
        <Container className="py-4">
            <Row className="mb-3">
                <Col>
                    <h2>Phonebook</h2>
                </Col>

                <Col className="d-flex justify-content-end gap-2">
                    <Form.Control
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <Button onClick={() => setShowModal(true)}>
                        Add
                    </Button>
                </Col>
            </Row>

            <ContactsList
                contacts={filtered}
                onEdit={(contact) => {
                    setEditingContact(contact);
                    setShowModal(true);
                }}
                onDelete={handleDelete}
            />

            <ContactFormModal
                show={showModal}
                initialValues={
                    editingContact
                        ? editingContact
                        : { name: "", phone: "", email: "" }
                }
                mode={editingContact ? "edit" : "create"}
                onSubmit={handleSubmit}
                onClose={() => {
                    setShowModal(false);
                    setEditingContact(null);
                }}
            />
        </Container>
    );
}

export default App;
