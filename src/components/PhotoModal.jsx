import React from "react";
import { Modal, Button, ButtonToolbar } from "rsuite";

const fixUrl = (url) =>
    url ? url.replace("via.placeholder.com", "dummyimage.com") : "";

function PhotoModal({ open, photo, hasPrev, hasNext, onClose, onPrev, onNext }) {
    return (
        <Modal open={open} onClose={onClose} size="lg">
            <Modal.Header>
                <Modal.Title>
                    {photo ? `Photo #${photo.id}` : "Photo preview"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {photo && (
                    <div className="photo-modal-body">
                        <img
                            src={fixUrl(photo.url)}
                            alt={photo.title}
                            className="photo-modal-img"
                        />
                        <p className="photo-modal-title">{photo.title}</p>
                    </div>
                )}
            </Modal.Body>

            <Modal.Footer>
                <ButtonToolbar>
                    <Button appearance="primary" disabled={!hasPrev} onClick={onPrev}>
                        Prev
                    </Button>
                    <Button appearance="primary" disabled={!hasNext} onClick={onNext}>
                        Next
                    </Button>
                    <Button onClick={onClose} appearance="subtle">
                        Close
                    </Button>
                </ButtonToolbar>
            </Modal.Footer>
        </Modal>
    );
}

export default PhotoModal;
