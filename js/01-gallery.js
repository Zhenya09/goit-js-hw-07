import { galleryItems } from "./gallery-items.js";
console.log(galleryItems);

const gallery = document.querySelector(".gallery");
const items = [];

const imgGallary = galleryItems.map((item) => {
  return `
    <div class="gallery__item">
      <a class="gallery__link" href="${item.original}">
        <img
          class="gallery__image"
          src="${item.preview}"
          data-source="${item.original}"
          alt="${item.description}"
        />
      </a>
    </div>
  `;
}).join('');

gallery.insertAdjacentHTML('beforeend', imgGallary);

document.addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.nodeName !== "IMG") {
    return;
  }

  const imgSelected = e.target.getAttribute("data-source"); 
  const template = basicLightbox.create(
    `<img src="${imgSelected}" width="800" height="600">`, 
    {
      onShow: () => {
        document.addEventListener("keydown", closeModal);
      },
      onClose: () => {
        document.removeEventListener("keydown", closeModal);
      },
    }
  );
  template.show();
  function closeModal(e) {
    if (e.key === "Escape") {
      template.close();
    }
  }
});
