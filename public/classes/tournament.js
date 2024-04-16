//make a function to return which book is chosen and then make :hover change color
import { nextRound } from "../models/models.js";

const book1 = document.getElementsByClassName('book-container')[0];
const book2 = document.getElementsByClassName('book-container')[1];

export class Tournament{

    currRound;

    rounds = {
        'roundOf32': [],
        'sweet16': [],
        'elite8': [],
        'final4': [],
        'championship': []
    }

    champion = {};

    constructor(books){
        this.rounds['roundOf32'] = books;
        this.currRound = this.rounds['roundOf32'];
    }

    getNextRound(){
        return nextRound[this.currRound];
    }

    startRound(){

        book1.addEventListener('click', () => {
            console.log("book 1!");
            handleBookSelected()
        })
        
        book2.addEventListener('click', () => {
            console.log("book 2!");
            handleBookSelected();
        })

        for(let i = 0; i < this.currRound.length; i+=2){
            this.populate(this.currRound[i], this.currRound[i+1]);
        }

        this.currRound = this.getNextRound(); // increment rounds
    }

    handleBookSelected(round_winner) {
        this.getNextRound().push(round_winner);

        // remove the current books
        book1.innerHTML = '';
        book2.innerHTML = '';
    }

    // add two books to divs
    populate(book1, book2){
        
    }
}