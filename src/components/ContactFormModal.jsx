import React from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import { PhoneInput } from "react-international-phone";

function ContactFormModal({ show, onClose, onSubmit, initialValues, mode }) {

    const validate = (values) => {
        const errors = {};

        if (!values.name.trim()) {
            errors.name = "Name is required";
        }

        if (!values.phone.trim()) {
            errors.phone = "Phone is required";
        }

        if (values.email && !values.email.includes("@")) {
            errors.email = "Email must contain @";
        }

        return errors;
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <Formik
                initialValues={initialValues}
                enableReinitialize
                validate={validate}
                onSubmit={(values) => {
                    onSubmit(values);
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      setFieldValue,
                      handleSubmit
                  }) => (
                    <Form onSubmit={handleSubmit}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                {mode === "edit" ? "Edit contact" : "Add contact"}
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    isInvalid={touched.name && errors.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Phone</Form.Label>
                                <PhoneInput
                                    defaultCountry="ua"
                                    value={values.phone}
                                    onChange={(value) => setFieldValue("phone", value)}
                                />
                                {touched.phone && errors.phone && (
                                    <div className="text-danger small">{errors.phone}</div>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Email (optional)</Form.Label>
                                <Form.Control
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    isInvalid={touched.email && errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="primary">
                                Save
                            </Button>
                        </Modal.Footer>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
}

ContactFormModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object.isRequired,
    mode: PropTypes.string.isRequired,
};

export default ContactFormModal;
