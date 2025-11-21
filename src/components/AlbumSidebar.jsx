import React from "react";
import {
    Panel,
    Input,
    InputGroup,
    List,
    Loader,
    Message,
} from "rsuite";

function AlbumSidebar({
                          albums,
                          allAlbums,
                          selectedAlbumId,
                          onSelectAlbum,
                          filterTitle,
                          onFilterTitleChange,
                          filterId,
                          onFilterIdChange,
                          loading,
                          error,
                      }) {
    const handleTitleChange = (value) => {
        onFilterTitleChange(value);
    };

    const handleIdChange = (value) => {
        onFilterIdChange(value);
    };

    return (
        <Panel bordered header="Albums" className="album-sidebar">
            <div className="sidebar-filters">
                <InputGroup inside size="sm" className="mb-2">
                    <Input
                        placeholder="Search by title..."
                        value={filterTitle}
                        onChange={handleTitleChange}
                    />
                </InputGroup>

                <InputGroup inside size="sm">
                    <Input
                        placeholder="Filter by album id..."
                        value={filterId}
                        onChange={handleIdChange}
                    />
                </InputGroup>
            </div>

            {loading && (
                <div className="state-block mt-3">
                    <Loader size="sm" content="Loading albums..." />
                </div>
            )}

            {error && (
                <div className="state-block mt-3">
                    <Message type="error" showIcon>
                        {error}
                    </Message>
                </div>
            )}

            {!loading && !error && allAlbums.length === 0 && (
                <div className="state-block mt-3">
                    <Message type="info" showIcon>
                        No albums received from API.
                    </Message>
                </div>
            )}

            {!loading && !error && albums.length > 0 && (
                <List hover bordered className="album-list mt-3">
                    {albums.map((album) => (
                        <List.Item
                            key={album.id}
                            className={
                                album.id === selectedAlbumId
                                    ? "album-item album-item--active"
                                    : "album-item"
                            }
                            onClick={() => onSelectAlbum(album.id)}
                        >
                            <div className="album-item-id">#{album.id}</div>
                            <div className="album-item-title">{album.title}</div>
                        </List.Item>
                    ))}
                </List>
            )}

            {!loading && !error && allAlbums.length > 0 && albums.length === 0 && (
                <div className="state-block mt-3">
                    <Message type="warning" showIcon>
                        No albums match current filters.
                    </Message>
                </div>
            )}
        </Panel>
    );
}

export default AlbumSidebar;
