
// Pexels API key
// Your API key: 563492ad6f91700001000001727995c27e224eee97adf3d54d9143d7 
//"https://api.pexels.com/v1/curated?per_page=15&page=1"



const auth = '563492ad6f91700001000001727995c27e224eee97adf3d54d9143d7';
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
let searchValue;
const more = document.querySelector('.more');
let page = 1;
let fetchLink;
let currentSearch;

// Event listeners -------------------------------------------------

searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e) => {

    e.preventDefault();

    currentSearch = searchValue;

    searchPhotos(searchValue);

})


more.addEventListener('click', loadMore);


// Functions -------------------------------------------------------

// Updating the input
function updateInput(e) {

    searchValue = e.target.value;

}

// Refactored fetch API code
async function fetchApi(url) {

    // Creating variable to hold API call and promise
    const dataFetch = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth
        }
    })

    // Turning API info into JSON
    const data = await dataFetch.json();

    // Returning the data
    return data;

}

// Refactored HTML generation
function generatePictures(data) {

    // Using the data and looping over all of the photos that we received from the call
    data.photos.forEach(photo => {

        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = ` 
        <div class='gallery-info'>
        <p>${photo.photographer}</p>
        <a href='${photo.src.original}'>Download</a>
        </div>
        <img src=${photo.src.large}></img>
        `;
        gallery.appendChild(galleryImg);

    });

}


// Function: Making API call, turning to JSON, and displaying the images
async function curatedPhotos() {

    fetchLink = 'https://api.pexels.com/v1/curated?per_page=15&page=1';

    const data = await fetchApi(fetchLink);
    
    generatePictures(data);

}

// Function: Search functionality
async function searchPhotos(query) {

    clear(); // Clearing any results on the page when searching

    fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;

    const data = await fetchApi(fetchLink);
    
    generatePictures(data);

}

function clear() {

    gallery.innerHTML = '';
    searchInput.value = '';

}

async function loadMore() {

    page++;

    if(currentSearch) {
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`
    } else {
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }

    const data = await fetchApi(fetchLink);
    generatePictures(data);

}
 
curatedPhotos();