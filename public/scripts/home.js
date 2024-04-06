import alertUser from "./home-service";

let genreText = document.getElementById('book-genre');
let searchButtonActive = false;

document.addEventListener('DOMContentLoaded', () => { 
    onDomLoaded(); 
});

function onDomLoaded(){
    genreText.addEventListener('input', () => {
        alterSearchButton();
    })
}

function alterSearchButton(){
    if(genreText.value.trim() == '' && searchButtonActive){
        let searchButton = document.getElementById('search-button');
        searchButton.remove();
        searchButtonActive = false;

        // remove on click event, searching should not be available
        searchButton.removeEventListener('click', () => {

            let genreInput = document.getElementById('book-genre'); 
            let genre = genreInput.value; // genre being searched (string)

            onGenreSearch(genre);
        });




        // TODO: Allow hitting enter instead of clicking





    }
    else{
        if(!searchButtonActive){
            let searchButton = document.createElement('button');
            searchButton.setAttribute('id', 'search-button');

            let genreContainer = document.getElementsByClassName('genre-input-container')[0];
            genreContainer.appendChild(searchButton);
            searchButtonActive = true;

            // add on click listener to search button
            searchButton.addEventListener('click', () => {

                let genreInput = document.getElementById('book-genre'); 
                let genre = genreInput.value; // genre being searched (string)

                onGenreSearch(genre);
            });
        }
    }
}

async function onGenreSearch(genre){
    console.log('Genre: ' + genre);

    let booksJSON; // holds JSON of max 32 books in selected genre

    // get results. if results.length == 0, display 'error' message

    await fetch(`/genre-search/${genre}`).then(async (response) => {
        
        booksJSON = await response.json(); 

        if(booksJSON.length == 0){
            let message = `We couldn't find any books in the genre '${genre}'!`;

            alertUser(message);
        }

        for(let book of booksJSON){
            console.log(book.id);
        }

    });
}