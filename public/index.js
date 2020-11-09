const profile = document.querySelector(".profile");
const project = document.querySelector(".project");
const tech = document.querySelector(".tech");
const tag = document.querySelector(".tag");
const search = document.querySelector(".search");
const menuName = document.querySelector(".menuName");
const searchBar = document.querySelector(".searchBar");
const searchBtn = document.querySelector(".searchBtn");
const write = document.querySelector(".write");

search.addEventListener("click", SearchHandler);

function SearchHandler() {
    if (searchBar.classList.contains("none")) {
        searchBar.classList.remove("none");
    } else {
        searchBar.classList.add("none");
    }
}

mouseOver