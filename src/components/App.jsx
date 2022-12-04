import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Loader } from './Loader/Loader';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';
import * as API from './api/articlesApi';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Modal } from './Modal';
import Button from './Button';

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState('');
  const [images, setImages] = useState([]);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imagesModal, setImagesModal] = useState(null);

  useEffect(() => {
    if (query === '') {
      return;
    }

    async function fetchImages() {
      try {
        setIsLoading(true);

        const images = await API.fetchImages(query, page);

        setImages(prevState => [...prevState, ...images.hits]);
        setIsLoading(false);
        setIsLoadMore(false);

        if (images.total === 0) {
          toast('Please try again');
          setIsLoadMore(false);
          return;
        }

        if (images.totalHits > API.perPage) {
          setIsLoading(false);
          setIsLoadMore(true);
        }

        if (page + 1 > Math.ceil(images.totalHits / API.perPage)) {
          setIsLoading(false);
          setIsLoadMore(false);
        }

        if (page >= Math.ceil(images.totalHits / API.perPage)) {
          setIsLoading(false);
          setIsLoadMore(false);
        }
      } catch (error) {
        toast('error');
        setIsLoading(false);
      }
    }
    fetchImages();
  }, [query, page]);

  const hendleSubmitForm = ({ query }) => {
    setPage(1);
    setQuery(query);
    setImages([]);
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const modalImgClick = (largeImageURL, tags) => {
    toggleModal();
    setImagesModal({ largeImageURL, tags });
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={hendleSubmitForm} />
      <ImageGallery images={images} onClick={modalImgClick} />
      {showModal && (
        <Modal
          onClose={toggleModal}
          largeImageURL={imagesModal.largeImageURL}
          tags={imagesModal.tags}
        />
      )}
      {isLoadMore && <Button loadMoreFetch={loadMore} />}
      <Loader isLoading={isLoading} />

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
