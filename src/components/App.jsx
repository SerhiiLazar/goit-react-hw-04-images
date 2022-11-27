import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Loader } from './Loader/Loader';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';
import * as API from './api/articlesApi';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Modal } from './Modal';
import Button from './Button';

class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    loadMore: false,
    isLoading: false,
    error: false,
    totalImages: 0,
    totalPage: 0,
    showModal: false,
    imagesModal: null,
  };

  async componentDidUpdate(_, prevState) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevPage !== nextPage || prevQuery !== nextQuery) {
      try {
        this.setState({ isLoading: true });

        const images = await API.fetchImages(nextQuery, nextPage);

        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          totalImages: images.totalHits,
          totalPage: Math.ceil(images.totalHits / API.perPage),
          isLoading: false,
        }));

        if (images.total === 0) {
          toast('Please try again');
          this.setState({ loadMore: false });
          return;
        }

        if (images.totalHits > API.perPage) {
          this.setState({ loadMore: true, isLoading: false });
        }

        if (nextPage + 1 > Math.ceil(images.totalHits / API.perPage)) {
          this.setState({ isLoading: false, loadMore: false });
        }

        if (nextPage >= Math.ceil(images.totalHits / API.perPage)) {
          this.setState({ isLoading: false, loadMore: false });
        }
      } catch (error) {
        this.setState({ isLoading: false, error: true });
      }
    }
  }

  hendleSubmitForm = ({ query }) => {
    this.setState({ page: 1, query: query, images: [] });
    if (this.state.query === query) {
      toast('You have not entered anything, please enter!');
      this.setState({ isLoading: false, loadMore: false });
      return;
    }
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  modaImgClick = (largeImageURL, tags) => {
    this.toggleModal();
    this.setState({ imagesModal: { largeImageURL, tags } });
  };

  render() {
    const submitForm = this.hendleSubmitForm;
    const { isLoading, images, loadMore, showModal, imagesModal } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={submitForm} />
        <ImageGallery images={images} onClick={this.modaImgClick} />
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            largeImageURL={imagesModal.largeImageURL}
            tags={imagesModal.tags}
          />
        )}
        {loadMore && <Button loadMoreFetch={this.loadMore} />}
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
}

export default App;
