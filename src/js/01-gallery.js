// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryDivEl = document.querySelector('.gallery');

const addImgsToGallery = arr => {
  const imgList = arr
    .map(el => {
      const imgEl = `<a class='gallery__item' href='${el.original}'><img class='gallery__image' src='${el.preview}' alt='${el.description}'></a>`;

      return imgEl;
    })
    .join('');

  galleryDivEl.insertAdjacentHTML('afterbegin', imgList);
};

addImgsToGallery(galleryItems);

new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });
