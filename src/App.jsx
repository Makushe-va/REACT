import React, { useEffect, useState, useMemo } from "react";
import { Container, Header, Content, Loader, Message, Placeholder } from "rsuite";
import AlbumSidebar from "./components/AlbumSidebar.jsx";
import PhotoGrid from "./components/PhotoGrid.jsx";
import PhotoModal from "./components/PhotoModal.jsx";

const ALBUMS_URL = "https://jsonplaceholder.typicode.com/albums";
const PHOTOS_URL = (albumId) =>
    `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`;

function App() {
    const [albums, setAlbums] = useState([]);
    const [albumsLoading, setAlbumsLoading] = useState(false);
    const [albumsError, setAlbumsError] = useState(null);
    const [photosCache, setPhotosCache] = useState({});
    const [photosLoading, setPhotosLoading] = useState(false);
    const [photosError, setPhotosError] = useState(null);
    const [selectedAlbumId, setSelectedAlbumId] = useState(null);
    const [filterTitle, setFilterTitle] = useState("");
    const [filterId, setFilterId] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    useEffect(() => {
        const loadAlbums = async () => {
            try {
                setAlbumsLoading(true);
                setAlbumsError(null);

                const response = await fetch(ALBUMS_URL);
                if (!response.ok) {
                    throw new Error("Failed to load albums");
                }
                const data = await response.json();
                setAlbums(data);

                if (!selectedAlbumId && data.length > 0) {
                    setSelectedAlbumId(data[0].id);
                }
            } catch (error) {
                setAlbumsError(error.message || "Unknown error");
            } finally {
                setAlbumsLoading(false);
            }
        };

        loadAlbums();
    }, []);

    useEffect(() => {
        const saved = localStorage.getItem("albumsState");
        if (!saved) return;

        try {
            const { selectedAlbumId, filterTitle, filterId } = JSON.parse(saved);
            if (selectedAlbumId) setSelectedAlbumId(selectedAlbumId);
            if (typeof filterTitle === "string") setFilterTitle(filterTitle);
            if (typeof filterId === "string") setFilterId(filterId);
        } catch {
        }
    }, []);

    useEffect(() => {
        const stateToSave = {
            selectedAlbumId,
            filterTitle,
            filterId,
        };
        localStorage.setItem("albumsState", JSON.stringify(stateToSave));
    }, [selectedAlbumId, filterTitle, filterId]);

    const filteredAlbums = useMemo(() => {
        return albums.filter((album) => {
            const byTitle = album.title
                .toLowerCase()
                .includes(filterTitle.toLowerCase());

            const byId = filterId
                ? String(album.id).includes(filterId.trim())
                : true;

            return byTitle && byId;
        });
    }, [albums, filterTitle, filterId]);

    const selectedAlbumPhotos = selectedAlbumId
        ? photosCache[selectedAlbumId] || []
        : [];

    const loadPhotosForAlbum = async (albumId) => {
        if (photosCache[albumId]) return;

        try {
            setPhotosLoading(true);
            setPhotosError(null);

            const response = await fetch(PHOTOS_URL(albumId));
            if (!response.ok) {
                throw new Error("Failed to load photos");
            }
            const data = await response.json();

            setPhotosCache((prev) => ({
                ...prev,
                [albumId]: data,
            }));
        } catch (error) {
            setPhotosError(error.message || "Unknown error");
        } finally {
            setPhotosLoading(false);
        }
    };

    const handleSelectAlbum = async (albumId) => {
        setSelectedAlbumId(albumId);
        setPhotosError(null);
        setCurrentPhotoIndex(0);
        await loadPhotosForAlbum(albumId);
    };

    const handlePhotoClick = (index) => {
        setCurrentPhotoIndex(index);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleNextPhoto = () => {
        if (!selectedAlbumPhotos.length) return;
        setCurrentPhotoIndex((prev) =>
            prev + 1 < selectedAlbumPhotos.length ? prev + 1 : prev
        );
    };

    const handlePrevPhoto = () => {
        if (!selectedAlbumPhotos.length) return;
        setCurrentPhotoIndex((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
    };

    const currentPhoto =
        selectedAlbumPhotos.length > 0
            ? selectedAlbumPhotos[currentPhotoIndex]
            : null;

    return (
        <Container className="app-container">
            <Header className="app-header">
                <h2>Albums / Photos</h2>
            </Header>

            <Content className="app-content">
                <div className="app-layout">
                    <div className="sidebar-wrapper">
                        <AlbumSidebar
                            albums={filteredAlbums}
                            allAlbums={albums}
                            selectedAlbumId={selectedAlbumId}
                            onSelectAlbum={handleSelectAlbum}
                            filterTitle={filterTitle}
                            onFilterTitleChange={setFilterTitle}
                            filterId={filterId}
                            onFilterIdChange={setFilterId}
                            loading={albumsLoading}
                            error={albumsError}
                        />
                    </div>

                    <div className="photos-wrapper">
                        {photosLoading && (
                            <div className="state-block">
                                <Loader size="md" content="Loading photos..." />
                            </div>
                        )}

                        {photosError && (
                            <div className="state-block">
                                <Message type="error" showIcon>
                                    {photosError}
                                </Message>
                            </div>
                        )}

                        {!photosLoading && !photosError && !selectedAlbumId && (
                            <div className="state-block">
                                <Message type="info" showIcon>
                                    Please select an album from the list.
                                </Message>
                            </div>
                        )}

                        {!photosLoading &&
                            !photosError &&
                            selectedAlbumId &&
                            selectedAlbumPhotos.length === 0 && (
                                <div className="state-block">
                                    <Placeholder.Paragraph rows={4} active />
                                    <Message type="info" showIcon>
                                        No photos for this album yet (or still loading).
                                    </Message>
                                </div>
                            )}

                        {!photosLoading &&
                            !photosError &&
                            selectedAlbumId &&
                            selectedAlbumPhotos.length > 0 && (
                                <PhotoGrid
                                    photos={selectedAlbumPhotos}
                                    albumId={selectedAlbumId}
                                    onPhotoClick={handlePhotoClick}
                                />
                            )}
                    </div>
                </div>
            </Content>

            <PhotoModal
                open={isModalOpen}
                photo={currentPhoto}
                hasPrev={currentPhotoIndex > 0}
                hasNext={
                    selectedAlbumPhotos.length > 0 &&
                    currentPhotoIndex < selectedAlbumPhotos.length - 1
                }
                onClose={handleModalClose}
                onPrev={handlePrevPhoto}
                onNext={handleNextPhoto}
            />
        </Container>
    );
}

export default App;
