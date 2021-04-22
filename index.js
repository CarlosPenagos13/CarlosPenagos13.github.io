// Key Unplash

const keyId = "fjqYqHkJuqDjnrv3eb-IapnC4UAp7ajEDZctsxWXamI";

// const Menu Mobile

const menuHamb = document.getElementById("hamburger");
const header = document.getElementById("header");

//Mobile Menu

const MenuMobile = () => {
  menuHamb.addEventListener("click", () => {
    header.classList.toggle("head-activate");
  });
};

let page = 1;

let topic = "all";

// const navBar

const navLink = document.getElementsByClassName("link");
const navItems = document.getElementsByClassName("link__item");
const itemActive = document.getElementsByClassName("link--activate");

// navBar

const butGallery = () => {
  for (let i = 0; i < navLink.length; i++) {
    navLink[i].addEventListener("click", (e) => {
      aniButtons(e);

      searchButtons(e);
    });
  }
};

const activeHeaderButtons = () => {
  for (let i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener("click", (e) => {
      searchButtons(e);
    });
  }
};

const aniButtons = (e) => {
  itemActive[0].className = itemActive[0].className.replace(
    "link--activate",

    "link"
  );

  e.target.className = "link--activate";
};

const searchButtons = (res) => {
  topic = res.target.innerText;

  page = 0;

  page++;

  dataFromUnplash();

  reloadImages();
};

//const Search

const searchtoGallery = () => (document.location.href = "#gallery");
const inputSearch = document.getElementById("search__input");
const iconSearch = document.getElementById("icon__search");

// Search

const search = () => {
  inputSearch.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      topic = e.target.value;

      page = 0;

      page++;

      reloadImages();

      dataFromUnplash();

      searchtoGallery();
    }
  });
};

const searchButtonIcon = () => {
  iconSearch.addEventListener("click", () =>
    inputSearch.classList.toggle("search__input--activate")
  );
};

// const view

const viewGrid = document.getElementById("icon-grid");
const viewList = document.getElementById("icon-list");
const gallery = document.getElementById("gallery");

// View

const gridViewIn = () => {
  viewGrid.addEventListener("click", () => {
    if (gallery.classList.contains("gallery--inline"))
      gallery.classList.remove("gallery--inline");
  });
};

const listViewIn = () => {
  viewList.addEventListener("click", () => {
    if (gallery.classList.contains("gallery--inline") == false)
      gallery.classList.add("gallery--inline");
  });
};

// Images from unplash

const renderImgs = (
  res,

  photoInfo,

  firstColumn,

  secondColumn,

  thirdColumn,

  fragment
) => {
  const link = document.createElement("A");

  link.className = "gallery__link";

  link.href = photoInfo.links.html;

  link.target = "_blank";

  const photo = document.createElement("IMG");

  photo.src = photoInfo.urls.small;

  photo.alt = photoInfo.alt_description;

  photo.className = "gallery__img";

  link.appendChild(photo);

  let dataIndex = res.results.indexOf(photoInfo);

  if (dataIndex % 3 == 0) firstColumn.appendChild(link);
  else if (dataIndex % 2 == 0) secondColumn.appendChild(link);
  else thirdColumn.appendChild(link);

  gallery.appendChild(fragment);
};

const reloadImages = () => {
  let img = document.getElementsByClassName("gallery__link");

  while (img.length > 0) {
    img[0].parentNode.removeChild(img[0]);
  }
};

const ImgOrganizer = (res) => {
  const firstColumn = document.getElementById("first-column");
  const secondColumn = document.getElementById("second-column");
  const thirdColumn = document.getElementById("third-column");
  const fragment = document.createDocumentFragment();

  for (const photoInfo of res.results.slice(0, 9))
    renderImgs(
      res,

      photoInfo,

      firstColumn,

      secondColumn,

      thirdColumn,

      fragment
    );
  if (res.results.length == 0) renderNotFound();

  page++;
};

const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", url, true);

    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4) {
        xhttp.status === 200
          ? resolve(JSON.parse(xhttp.responseText))
          : reject(new Error("Error", url));
      }
    };
    xhttp.send();
  });
};

const dataFromUnplash = () => {
  let url = `https://api.unsplash.com/search/photos?page=${page}&query=${topic}&client_id=${keyId}`;

  fetchData(url).then(ImgOrganizer).catch(console.log);
};

// Reload Image

const showMore = document.getElementById("container__btn-Show");

const loadMoreImg = () => {
  if (showMore) showMore.addEventListener("click", dataFromUnplash);
};

// Res

MenuMobile();
butGallery();
activeHeaderButtons();
search();
searchButtonIcon();
gridViewIn();
listViewIn();
dataFromUnplash();
loadMoreImg();
