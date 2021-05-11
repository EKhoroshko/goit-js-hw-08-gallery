import imagesArray from './gallery-items.js';

const galleryRef = document.querySelector(".js-gallery");
const modalEl = document.querySelector(".js-lightbox");
const modalImg = document.querySelector(".lightbox__image");
const closeModalBtn = document.querySelector("button[data-action='close-lightbox']");
const overlay = document.querySelector('.lightbox__overlay');

function createGallery() {
    const itemRef = imagesArray.map(image => {

        let item = document.createElement('li');
        item.className = "gallery__item";

        let linkEl = document.createElement('a');
        linkEl.className = "gallery__link";

        let imgEl = document.createElement('img');
        imgEl.className = "gallery__image";
        imgEl.setAttribute('src', `${image.preview}`);
        imgEl.setAttribute('alt', `${image.description}`);
        imgEl.setAttribute('data-source', `${image.original}`);
        linkEl.append(imgEl);
        item.append(linkEl);
        return item;
    });
    galleryRef.append(...itemRef);
}
createGallery(imagesArray);


galleryRef.addEventListener('click', onClickInImage);
closeModalBtn.addEventListener('click', onClickCloseModal);
overlay.addEventListener('click', onClickOverlayClose);

function onClickInImage(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'IMG') {
        return;
    }
    window.addEventListener('keydown', onClickEscClose);
    const imageRef = e.target;
    modalImg.src = imageRef.dataset.source;
    modalImg.alt = imageRef.alt;
    modalEl.classList.add('is-open');
}

function onClickCloseModal() {
    window.removeEventListener('keydown', onClickEscClose);
    modalEl.classList.remove('is-open');
    modalImg.src = "";
    modalImg.alt = "";
}

function onClickOverlayClose(e) {
    if (e.target === e.currentTarget) {
        onClickCloseModal();
    }
    modalImg.src = "";
    modalImg.alt = "";
}

function onClickEscClose(e) {
    if (e.code === 'Escape') {
        onClickCloseModal();
    }
    modalImg.src = "";
    modalImg.alt = "";
}
