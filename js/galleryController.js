'use strict'

let gGallery = [
    {id: 'img1', url: 'meme-imgs/meme-imgs-(square)/1.jpg'},
    {id: 'img2', url: 'meme-imgs/meme-imgs-(square)/2.jpg'},
    {id: 'img3', url: 'meme-imgs/meme-imgs-(square)/3.jpg'},
    {id: 'img4', url: 'meme-imgs/meme-imgs-(square)/4.jpg'},
    {id: 'img5', url: 'meme-imgs/meme-imgs-(square)/5.jpg'},
    {id: 'img6', url: 'meme-imgs/meme-imgs-(square)/6.jpg'},
    {id: 'img7', url: 'meme-imgs/meme-imgs-(square)/7.jpg'},
    {id: 'img8', url: 'meme-imgs/meme-imgs-(square)/8.jpg'},
    {id: 'img9', url: 'meme-imgs/meme-imgs-(square)/9.jpg'},
    {id: 'img10', url: 'meme-imgs/meme-imgs-(square)/10.jpg'},
    {id: 'img11', url: 'meme-imgs/meme-imgs-(square)/11.jpg'},
    {id: 'img12', url: 'meme-imgs/meme-imgs-(square)/12.jpg'},
    {id: 'img13', url: 'meme-imgs/meme-imgs-(square)/13.jpg'},
    {id: 'img14', url: 'meme-imgs/meme-imgs-(square)/14.jpg'},
    {id: 'img15', url: 'meme-imgs/meme-imgs-(square)/15.jpg'},
    {id: 'img16', url: 'meme-imgs/meme-imgs-(square)/16.jpg'},
    {id: 'img17', url: 'meme-imgs/meme-imgs-(square)/17.jpg'},
    {id: 'img18', url: 'meme-imgs/meme-imgs-(square)/18.jpg'},
]

function renderGallery() {
    const elGallery = document.querySelector('.gallery')
    const strHtml = gGallery.map(image => `
        <div class='img-gallery ${image.id}'>
        <button class="btn" onClick="onImgSelect('${image.url}')">
        <img src=${image.url}>
        </button>
        </div>
    `)
    
    elGallery.innerHTML = strHtml.join('')
}