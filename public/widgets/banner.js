export default class Banner{

    bannerContainer;
    banner; 

    constructor(message, backgroundColor){

        // create banner container
        this.bannerContainer = document.createElement('div');
        this.bannerContainer.classList.add('banner-container');

        // create banner and add to container div
        this.banner = document.createElement('div');
        this.bannerContainer.appendChild(this.banner);

        // add message and color
        this.banner.textContent = message;
        this.banner.style.backgroundColor = backgroundColor;

        this.banner.classList.add('banner');
    }

    // add banner to current page
    addToPage(){
        document.body.appendChild(this.bannerContainer);
    }

    async removeAfter(seconds){
        let ms = seconds * 1000;

        setTimeout(() => {
            this.bannerContainer.remove();
        }, ms)
    }

}
