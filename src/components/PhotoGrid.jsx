import React from "react";
import { Panel } from "rsuite";

const fixUrl = (url) =>
    url ? url.replace("via.placeholder.com", "dummyimage.com") : "";

function PhotoGrid({ photos, albumId, onPhotoClick }) {
    return (
        <div>
            <h4 className="mb-3">Album #{albumId}</h4>
            <div className="photo-grid">
                {photos.map((photo, index) => (
                    <Panel
                        key={photo.id}
                        bordered
                        bodyFill
                        className="photo-card"
                        onClick={() => onPhotoClick(index)}
                    >
                        <img
                            src={fixUrl(photo.thumbnailUrl)}
                            alt={photo.title}
                            className="photo-card-img"
                            loading="lazy"
                        />
                        <div className="photo-card-body">
                            <div className="photo-card-title">{photo.title}</div>
                        </div>
                    </Panel>
                ))}
            </div>
        </div>
    );
}

export default PhotoGrid;
