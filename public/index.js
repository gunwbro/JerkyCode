const profile = document.querySelector(".profile");
const project = document.querySelector(".project");
const tech = document.querySelector(".tech");
const tag = document.querySelector(".tag");
const search = document.querySelector(".search");
const menuName = document.querySelector(".menuName");
const searchBar = document.querySelector(".searchBar");
const searchBtn = document.querySelector(".searchBtn");
const admin = document.querySelector(".admin");
const write = document.querySelector(".write");
let password;
let status = false;

search.addEventListener("click", SearchHandler);
admin.addEventListener("click", adminHandler);


function SearchHandler() {
    if (searchBar.classList.contains("none")) {
        searchBar.classList.remove("none");
    } else {
        searchBar.classList.add("none");
    }
}

function adminHandler() {
    password = prompt("패스워드를 입력하세요");

    // 데이터베이스에서 패스워드 불러와줌.
    if (password === "whrjsdn") {
        status = true;
    } else {
        alert("비밀번호 오류");
    }
    if (status) {
        write.style.display = "block";
    }
    else {
        write.style.display = "none";
    }
}