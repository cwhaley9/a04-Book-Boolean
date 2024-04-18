import { nextRound } from "../models/models.js";

export class Tournament{

    currRound;

    rounds = {
        'roundOf32': [],
        'sweet16': [],
        'elite8': [],
        'final4': [],
        'championship': [],
        'tournament_over': []
    }

    book1container;
    book2container;

    constructor(books){
        this.rounds['roundOf32'] = books;
        this.currRound = 'roundOf32';

        this.book1container = document.getElementsByClassName('book-container')[0];
        this.book2container = document.getElementsByClassName('book-container')[1];

        this.removeBookClickListeners = this.removeBookClickListeners.bind(this);
    }

    getNextRound(){
        return nextRound[this.currRound];
    }

    getCurrRoundBooks(){
        return this.rounds[this.currRound];
    }

    getChampion(){
        if (this.currRound == 'tournament_over'){
            return this.rounds['tournament_over'][0];
        }
    }

    bookClicked(winner_data, resolve){
        this.handleBookSelected(winner_data);
        this.removeBookClickListeners();
        resolve();
    }

    book1listener;
    book2listener;

    listenForBookClick(books){
        return new Promise((resolve) => {
            this.book1listener = () => {
                this.bookClicked(books[0], resolve);
            }
    
            this.book2listener = () => {
                this.bookClicked(books[1], resolve);
            }
            this.book1container.addEventListener('click', this.book1listener );
            this.book2container.addEventListener('click', this.book2listener );
        })
    }

    //remove listeners once book clicked
    removeBookClickListeners(){
        this.book1container.removeEventListener('click', this.book1listener);
        this.book2container.removeEventListener('click', this.book2listener);
    }

    async displayRandomGif(){
        let response = await fetch('/random-gif');
        let gif = await response.json();
        let gifUrl = gif.url;
        console.log(gifUrl);

        let gifContainer = document.createElement('img');
        gifContainer.src = gifUrl;

        let books_container = document.getElementsByClassName('books-container')[0];
        books_container.appendChild(gifContainer);
    }

    async displayChampion(champion_data){
        this.insertThumbnails(champion_data, champion_data);
        this.insertDescs(champion_data, champion_data);
        this.book2container.remove();

        let winTextContainer = document.createElement('div');
        winTextContainer.textContent = 'Winner!';

        const firstChild = this.book1container.firstChild;
        this.book1container.insertBefore(winTextContainer, firstChild);

        await this.displayRandomGif();
    }

    async simulateTournament(){
        while(this.currRound != 'tournament_over'){
            await this.startRound();
        }
        let champion = this.getChampion();

        this.displayChampion(champion);
    }

    async startRound(){
        
        let currRoundBooks = this.getCurrRoundBooks();

        if(this.currRound == 'tournament_over'){
            console.log("The game is already complete! Can't start a new round!");
            return;
        }

        for(let i = 0; i < currRoundBooks.length; i+=2){
            this.populate(currRoundBooks[i], currRoundBooks[i+1]);
            await this.listenForBookClick([currRoundBooks[i], currRoundBooks[i+1]]); // wait for a book to be chosen
        }

        this.currRound = this.getNextRound(); // increment rounds
    }

    handleBookSelected(winner_data) {
        let nextRound = this.getNextRound();
        console.log('next round: ' + nextRound);
        this.rounds[nextRound].push(winner_data);

        // remove the current books
        this.book1container.innerHTML = '';
        this.book2container.innerHTML = '';
    }

    insertThumbnails(book1data, book2data){
        // get images
        let img1;
        if(book1data && book1data.volumeInfo && book1data.volumeInfo.imageLinks && book1data.volumeInfo.imageLinks.thumbnail){
            img1 = book1data.volumeInfo.imageLinks.thumbnail;
        }
        
        let img2;
        if(book2data && book2data.volumeInfo && book2data.volumeInfo.imageLinks && book2data.volumeInfo.imageLinks.thumbnail){
            img2 = book2data.volumeInfo.imageLinks.thumbnail;
        }

        if(img1 == undefined || null){
            let noPreviewFoundText = document.createElement('div');
            noPreviewFoundText.textContent = 'No image preview available!';
            this.book1container.appendChild(noPreviewFoundText);
        } else {
            // get 'img' elements to place images
            let img1container = document.createElement('img');
            img1container.classList.add('thumbnail');

            // add img src to img container
            img1container.src = img1;

            // add 'img' elements to containers
            this.book1container.appendChild(img1container);
        }

        if(img2 == undefined || null){
            let noPreviewFoundText = document.createElement('div');
            noPreviewFoundText.textContent = 'No image preview available!';
            this.book2container.appendChild(noPreviewFoundText);
        } else {
            // get 'img' elements to place images
            let img2container = document.createElement('img');
            img2container.classList.add('thumbnail');
            
            // add img src to img container
            img2container.src = img2;
            
            // add 'img' elements to containers
            this.book2container.appendChild(img2container);
        }
    }

    insertDescs(book1data, book2data){
        // get images
        let desc1;
        if(book1data && book1data.volumeInfo && book1data.volumeInfo.description){
            desc1 = book1data.volumeInfo.description;
        }
        
        let desc2;
        if(book2data && book2data.volumeInfo && book2data.volumeInfo.description){
            desc2 = book2data.volumeInfo.description;
        }

        if(desc1 == undefined || null){
            let noPreviewFoundText = document.createElement('div');
            noPreviewFoundText.textContent = 'No description available!';
            this.book1container.appendChild(noPreviewFoundText);
        } else {
            // get 'img' elements to place images
            let desc1container = document.createElement('p');
            desc1container.classList.add('description');

            // add img src to img container
            desc1container.textContent = desc1;

            // add 'img' elements to containers
            this.book1container.appendChild(desc1container);
        }

        if(desc2 == undefined || null){
            let noPreviewFoundText = document.createElement('div');
            noPreviewFoundText.textContent = 'No description available!';
            this.book2container.appendChild(noPreviewFoundText);
        } else {
            // get 'img' elements to place images
            let desc2container = document.createElement('p');
            desc2container.classList.add('description');

            // add img src to img container
            desc2container.textContent = desc2;

            // add 'img' elements to containers
            this.book2container.appendChild(desc2container);
        }
    }

    // add two books to divs
    populate(book1data, book2data){
        if(this.book1container && this.book2container){
            this.insertThumbnails(book1data, book2data);

            this.insertDescs(book1data, book2data);
        } else {
            throw new Error('Book container is null');
        }
    }
}