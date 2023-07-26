const accessKey = "T3GS7QiMfb83mbmh95bRRnyBnVYT6K38YceH5oxYT_0";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("Search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let pageNumber = 1;

async function searchImage(){
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${pageNumber}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;



    if(pageNumber === 1){
        searchResults.innerHTML = "";
    }

    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-rslt");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);

    });

    pageNumber++;
    
    if (pageNumber>1){
        showMore.style.display="block";
    }
     
}

formEl.addEventListener("submit", (ev)=>{
    ev.preventDefault();
    pageNumber = 1;
    searchImage();
});
showMore.addEventListener("click",()=>{
    searchImage();
});
