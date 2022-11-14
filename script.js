const PASS_ID = "YvxlbmAGGN8Yyvz1d63hojN0wfFn_M6UPpnvGl1D4EM";

const slider = document.getElementById("slider");

let state = [];
let currentItem;

const fetchPhotos = async () => {
  try {
    const url = `https://api.unsplash.com/photos/random?client_id=${PASS_ID}&count=4&query=nature`;
    const res = await fetch(url);
    const data = await res.json();

    if (res.ok && data.length) {
      state = data;
      currentItem = data[0].id;
      setPhoto();
    }
  } catch (error) {
    // console.log(error);
  }
};

const item = () => {
  return state
    .map(({ urls: { regular }, user: { name }, id }) => {
      const isActive = currentItem === id ? "active" : "";
      return `<div class="slide ${isActive}" data-id="${id}" style="background-image: url(${regular})">
           <div class="slide-text" >
                <span>photo by</span>
                ${name}
                </div>
              </div>`;
    })
    .join("");
};

const handleClick = ({ currentTarget }) => {
  const slides = document.querySelectorAll(".slide");
  const { id } = currentTarget.dataset;

  if (id === currentItem) return;

  slides.forEach((slide) => slide.classList.remove("active"));
  currentTarget.classList.add("active");
  currentItem = id;
};

const setPhoto = () => {
  slider.innerHTML = item();
  const slides = document.querySelectorAll(".slide");
  slides.forEach((slide) => {
    slide.addEventListener("click", handleClick);
  });
};

fetchPhotos();
