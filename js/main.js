var api_link = "https://api.themoviedb.org/3/movie/popular?api_key=e3eba846fb6af8da7df4730f6734f0f7&language=en-US&page=1"

const button1 = document.querySelector(".button1")
const button2 = document.querySelector(".button2")
const button3 = document.querySelector(".button3")
const button4 = document.querySelector(".button4")
const cards = document.querySelector(".cards")
const title = document.querySelector(".title")
const card_img = document.querySelector(".card_img")
const modal = document.querySelector(".modal")
const back = document.querySelector(".back")

var movies;

const getData = async (link) => {
  const request = await fetch(link)
  const data = await request.json()
  addData(data.results)
  movies = data.results
}

getData(api_link)


const addData = (info) => {
  cards.innerHTML = ""
  info.forEach((item) => {
    cards.innerHTML += `
    <div class="card">
      <div class="title">${item.original_title}</div>
      <div onclick="modalCard(${item.id})" class="card_img" style="background-image: url('https://image.tmdb.org/t/p/w500${item.backdrop_path}')"></div>
    </div>
    `
  })
}



const modalCard = async (id) => {
  const movie = movies.filter((item) => {
    return item.id == id
  })
  modal.style = "left: 0;"
  console.log(movie[0]);
  console.log(id);

  modal.innerHTML = `
  <div class="modal-main">
    <div class="modal-left">
      <img src="https://image.tmdb.org/t/p/w500${movie[0].backdrop_path}" alt="">
    </div>
    <div class="modal-right">
      <h1>${movie[0].original_title}</h1>
      <div>
        Release-data: <span class="releaseDate">${movie[0].release_date}</span>
      </div>
      <div>
        Popularity: <span class="popularity">${movie[0].popularity}</span>
      </div>
      <div>
        Original Language: <span class="lang">${movie[0].original_language}</span>
      </div>

      <div class="overviewTitle">Overview:</div>
      <div class="overview">${movie[0].overview}</div>
    </div>
  </div>
  <span class="back" onclick ="exit()" >Back</span>
  `
}

const exit = ()=>{
  modal.style = "display: none"
}

const filterData = (id) => {
  if(id == 0) {
    addData(movies)
  }else{
    const filterId = movies.filter((item) => {
      return item.genre_ids.includes(id)
    })
    addData(filterId)
  }
}


button1.addEventListener("click", () => {
  filterData(0)
  activeBtn(button1)
})
button2.addEventListener("click", () => {
  filterData(35)
  activeBtn(button2)
})
button3.addEventListener("click", () => {
  filterData(28)
  activeBtn(button3)
})
button4.addEventListener("click", () => {
  filterData(53)
  activeBtn(button4)
})

// 42:37

const activeBtn = (id) => {
  button1.classList.remove("active")
  button2.classList.remove("active")
  button3.classList.remove("active")
  button4.classList.remove("active")
  id.classList.add("active")
}