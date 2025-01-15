import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, limit, orderBy } from 'firebase/firestore';
import { db } from "../../../firebaseConfig";

export const usePhotos = () => {
  const [images, setImages] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const imagesQuery = query(
      collection(db, "Photography"),
      orderBy("date", "desc"),
    );

    const unsubscribeImages = onSnapshot(imagesQuery, (snapshot) => {
      const fetchedImages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setImages(fetchedImages);
      setLoading(false);
    });

    const unsubscribeArtists = onSnapshot(
      collection(db, "ArtistsPhotography"), 
      (snapshot) => {
        const fetchedArtists = snapshot.docs.map((doc) => ({
          id: doc.id,
          artist: doc.data().name
        }));
        setArtists(fetchedArtists);
    });

    return () => {
      unsubscribeImages();
      unsubscribeArtists();
    };
  }, []);

  return { images, artists, loading };
};