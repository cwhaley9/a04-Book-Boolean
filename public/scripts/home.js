import Banner from "../widgets/banner.js";
import { Tournament } from "../classes/tournament.js";
import { colors } from '../models/models.js';

let booksJSON = [];

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
    // get results. if results.length == 0, display 'warning' message

    await fetch(`/books/${genre}`).then(async (response) => {
        
        booksJSON = await response.json(); 

        if(booksJSON.length == 0){
            let message = `We couldn't find any books in the genre '${genre}'!`;

            // no books found, alert user with banner
            let booksNotFoundBanner = new Banner(message, colors.warning);
            booksNotFoundBanner.addToPage()
            booksNotFoundBanner.removeAfter(3);
        } else {
            const response = await fetch('/tournament');
            if(!response.ok){
                throw new Error("Can't fetch tournament page!");
            } else {
                const tournamentHTML = await response.text();
                document.body.innerHTML = tournamentHTML;
                beginTourney(booksJSON);
            }
        }
    });
}

async function beginTourney(booksJSON) {

    console.log(booksJSON);
    let tournament = new Tournament(booksJSON);
    tournament.simulateTournament();

}

