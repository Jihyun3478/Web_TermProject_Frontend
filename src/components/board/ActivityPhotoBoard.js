import React, { useEffect, useState } from 'react';
import PostManagement from '../../api/master/PostManagement';
import { fetchActivityPhotos, saveActivityPhoto } from '../../api/master/BoardApi';

const ActivityPhotoBoard = () => {
  const [photos, setPhotos] = useState([]);
  const [showPostForm, setShowPostForm] = useState(false);
  const [newPhoto, setNewPhoto] = useState({ title: '', imageFile: null });

  const loadPhotos = async () => {
    try {
      const fetchedPhotos = await fetchActivityPhotos('/activityPhoto/findAll');
      setPhotos(fetchedPhotos);
    } catch (error) {
      console.error('Error fetching activity photos:', error);
    }
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  const handlePhotoSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', newPhoto.title);
      formData.append('imageFile', newPhoto.imageFile);

      await saveActivityPhoto(formData);
      console.log('Activity photo saved successfully!');
      setNewPhoto({ title: '', imageFile: null });
      loadPhotos();
    } catch (error) {
      console.error('Error saving activity photo:', error);
    }
  };

  const handleFileChange = (e) => {
    setNewPhoto({ ...newPhoto, imageFile: e.target.files[0] });
  };

  return (
    <div>
      <h1>Activity Photo Board</h1>
      <button onClick={() => setShowPostForm(true)}>Add Post</button>
      {showPostForm && (
        <form onSubmit={handlePhotoSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={newPhoto.title}
            onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
          />
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Submit</button>
        </form>
      )}

      <h2>Posts</h2>
      <ul>
        {photos.map((photo) => (
          <li key={photo.id}>
            <h3>{photo.title}</h3>
            <img src={photo.imageUrl} alt="Activity" style={{ maxWidth: '100%' }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityPhotoBoard;
