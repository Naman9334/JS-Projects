const accessKey = "Your accessKey";
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImage() {
    keyword = searchBox.value.trim(); // Fixed incorrect property
    if (!keyword) return; // Prevent empty searches

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (page === 1) {
            searchResult.innerHTML = "";
        }

        const results = data.results;
        if (results.length === 0) {
            searchResult.innerHTML = "<p>No images found. Try another search.</p>";
            showMoreBtn.style.display = "none";
            return;
        }

        results.forEach((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description || "Unsplash Image";
            
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";

            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);
        });

        showMoreBtn.style.display = "block";
    } catch (error) {
        console.error("Error fetching images:", error);
        searchResult.innerHTML = "<p>Failed to fetch images. Please try again.</p>";
        showMoreBtn.style.display = "none";
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImage();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImage();
});
