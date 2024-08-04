'use strict'

let gGallery = [
    {id: 'img1', url: 'meme-imgs/meme-imgs-(square)/1.jpg'},
    {id: 'img2', url: 'meme-imgs/meme-imgs-(square)/2.jpg'}
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
    const galleryHeaderStr = `
    <h2 class="gallery-header">Photo Gallery</h2>`

    strHtml.unshift(galleryHeaderStr)
    elGallery.innerHTML = strHtml.join('')
}