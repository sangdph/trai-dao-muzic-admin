const endpoint = "https://trai-dao-muzic.onrender.com/music/";
const listMusic = document.querySelector(".list-music");
const formPost = document.querySelector(".form-post");
const formSubmit = document.querySelector(".form-submit");
let updateId = null;
const filterInput = document.querySelector(".filter");

function debounceFn(func, wait, immediate) {
  let timeout;
  return function () {
    let context = this,
      args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

filterInput.addEventListener(
  "keyup",
  debounceFn(async function (e) {
    // const response = await fetch(`${endpoint}?title_like=${e.target.value}`);
    // const data = await response.json();
    // console.log(data);
    const path = `${endpoint}/search?song=${e.target.value}`;
    getSongs(path);
  }, 500)
);

async function addCourse({ image, song, author, url }) {
  const response = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify({
      image,
      song,
      author,
      url,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  console.log("Sang: ", response);
}

function renderItem(item) {
  // console.log("renderItem: ", item);
  const template = `<div class="item-music">
    <img
      class="picture-music"
      src="${item.image}"
      alt=""
    />
    <div class="name-music">${item.song} - ${item.author}</div>
    <i class="fa-solid fa-circle-minus song-remove" data-id="${item._id}"></i>
    <!--<i class="fa-regular fa-pen-to-square song-edit" data-id="${item._id}"></i>-->
    <a
      href="${item.url}"
      download=""
      ><i
        class="fa-regular fa-circle-down download"
      ></i
    ></a>
  </div>`;
  listMusic.insertAdjacentHTML("beforeend", template);
}

async function getSongs(link = endpoint) {
  const response = await fetch(link);
  const data = await response.json();
  console.log("getSongs-data: ", data);
  listMusic.innerHTML = "";
  console.log(data.status.length, Array.isArray(data.status));
  if (data.status.length > 0 && Array.isArray(data.status)) {
    data.status.forEach((item) => renderItem(item));
  }
}

getSongs();

formPost.addEventListener("submit", async function (e) {
  e.preventDefault();
  const data = {
    image: this.elements["image"].value,
    song: this.elements["song"].value,
    url: this.elements["url"].value,
    author: this.elements["author"].value,
  };

  console.log("FormPost-song: ", data);
  await addCourse(data);
  // console.log('sang: ', course);
  // console.log('updateId-formPost: ', updateId);
  // const conga = {updateId, ...course};
  // console.log('conga: ', conga);
  //   updateId
  //     ? await updateCourse({ updateId, ...course })
  //     : await addCourse(course);
  //   getCourses();
  //   this.reset();

  //   updateId = null;
  //   formSubmit.textContent = "Add course";
  getSongs();
});

listMusic.addEventListener("click", async function (e) {
  console.log("sang là con gà");
  if (e.target.matches(".song-remove")) {
    // console.log("sang là con gà .song-remove");
    // console.log("sang là con gà datasetId: ", e.target.dataset.id);
    const id = e.target.dataset.id;
    // console.log("sang là con gà id: ", id);
    await deleteSong(id);
    getSongs();
  }
  // else if (e.target.matches(".song-edit")) {
  //   const id = +e.target.dataset.id;
  //   const data = await getSingleCourse(id);
  //   formPost.elements["image"].value = data.image;
  //   formPost.elements["title"].value = data.title;
  //   formPost.elements["author"].value = data.author;
  //   formPost.elements["rating"].value = data.rating;
  //   formPost.elements["price"].value = data.price;
  //   formPost.elements["bestSeller"].checked = data.bestSeller;
  //   formPost.elements["buyAmount"].value = data.buyAmount;
  //   formSubmit.textContent = "Update Course";
  //   updateId = id;
  // }
});

async function deleteSong(id) {
  console.log("sang là con gà deleteSong: ", id);
  const response = await fetch(`${endpoint}/delete/${id}`, {
    method: "DELETE",
  });
}

// async function updateCourse({
//   updateId,
//   image,
//   title,
//   author,
//   rating,
//   price,
//   bestSeller,
//   buyAmount,
// }) {
//   console.log("updateCourse: ", updateId);
//   const response = await fetch(`${endpoint}/${updateId}`, {
//     method: "PUT",
//     body: JSON.stringify({
//       image,
//       title,
//       author,
//       rating,
//       price,
//       bestSeller,
//       buyAmount,
//     }),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   });
// }

// async function getSingleCourse(id) {
//   const response = await fetch(`${endpoint}/${id}`);
//   const data = await response.json();
//   return data;
// }
