import React, { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL, listAll, deleteObject } from 'firebase/storage';
import { storage } from '../../firebaseConfig';

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState('');
  const [images, setImages] = useState([]); // Estado para almacenar las URLs de las imágenes
  const [isModalOpen, setIsModalOpen] = useState(false); // Control del modal

  // Obtener todas las imágenes de Firebase Storage
  useEffect(() => {
    const fetchImages = async () => {
      const imagesRef = ref(storage, 'images/');
      const res = await listAll(imagesRef);
      const urls = await Promise.all(res.items.map(item => getDownloadURL(item)));
      setImages(urls);
    };
    
    fetchImages();
  }, []);

  // Manejar la subida de archivo
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return;
    
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (error) => {
        console.error("Error al subir la imagen: ", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setDownloadURL(url);
          setImages(prevImages => [...prevImages, url]); // Agregar la imagen a la lista
        });
      }
    );
  };

  // Eliminar una imagen
  const handleDelete = (url) => {
    const fileRef = ref(storage, url);
    deleteObject(fileRef)
      .then(() => {
        setImages(images.filter((image) => image !== url)); // Remover imagen de la lista
      })
      .catch((error) => {
        console.error("Error al eliminar la imagen: ", error);
      });
  };

  return (
    <div className='p-10'>
        <h1 className='font-montserrat font-black text-[#252525] text-4xl pb-5'>PANEL ADMIN</h1>
      <div className='grid grid-cols-3 gap-4'>
        {images.map((image, index) => (
          <div key={index} className='relative'>
            <img src={image} alt={`Uploaded ${index}`} className='w-full h-40 object-cover' />
            <button 
              onClick={() => handleDelete(image)} 
              className='absolute top-2 right-2 bg-red-600 font-montserrat text-sm text-white p-1 rounded hover:bg-red-900 transition-all'>
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <button 
        onClick={() => setIsModalOpen(true)} 
        className='mt-4 bg-[#252525] text-white p-2 rounded font-montserrat font-semibold hover:bg-zinc-600 transition-all'>
        Agregar Imágenes
      </button>

      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-8 rounded-lg max-h-[80vh] flex flex-col font-montserrat'>
            <h2 className='font-bold text-xl border border-solid border-x-0 border-t-0 pb-1 mb-10'>Subir nueva imágen</h2>
            <input type="file" onChange={handleFileChange} />
            <div className='mt-2'>Progreso de subida: {progress}%</div>
            <button onClick={handleUpload} className='text-[#252525] border border-solid border-[#252525] p-2 rounded font-semibold mt-10 hover:border-zinc-600 hover:text-zinc-600 transition-all'>Subir imagen</button>
            
            {downloadURL && <img src={downloadURL} alt="Uploaded" className='mt-2 max-h-[25vh]' />}
            
            <button onClick={() => setIsModalOpen(false)} className='mt-4 bg-[#252525] text-white p-2 rounded font-semibold hover:bg-zinc-600 transition-all'>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
