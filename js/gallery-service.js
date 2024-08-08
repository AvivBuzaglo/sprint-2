'use strict'

let gGallery = [
    {id: 'img1', url: 'meme-imgs/meme-imgs-(square)/1.jpg', tag: ['men', 'funny'] }, 
    {id: 'img2', url: 'meme-imgs/meme-imgs-(square)/2.jpg', tag: ['animal', 'cute']},
    {id: 'img3', url: 'meme-imgs/meme-imgs-(square)/3.jpg', tag: ['animal', 'baby']},
    {id: 'img4', url: 'meme-imgs/meme-imgs-(square)/4.jpg', tag: ['animal', 'cute']},
    {id: 'img5', url: 'meme-imgs/meme-imgs-(square)/5.jpg', tag: ['baby', 'funny']},
    {id: 'img6', url: 'meme-imgs/meme-imgs-(square)/6.jpg', tag: ['men', 'smile']},
    {id: 'img7', url: 'meme-imgs/meme-imgs-(square)/7.jpg', tag: ['baby', 'funny']},
    {id: 'img8', url: 'meme-imgs/meme-imgs-(square)/8.jpg', tag: ['men', 'smile']},
    {id: 'img9', url: 'meme-imgs/meme-imgs-(square)/9.jpg', tag: ['baby', 'funny']},
    {id: 'img10', url: 'meme-imgs/meme-imgs-(square)/10.jpg', tag: ['men', 'smile']},
    {id: 'img11', url: 'meme-imgs/meme-imgs-(square)/11.jpg', tag: ['men', 'funny']},
    {id: 'img12', url: 'meme-imgs/meme-imgs-(square)/12.jpg', tag: ['men', 'smile']},
    {id: 'img13', url: 'meme-imgs/meme-imgs-(square)/13.jpg', tag: ['men', 'smile']},
    {id: 'img14', url: 'meme-imgs/meme-imgs-(square)/14.jpg', tag: ['men', 'funny']},
    {id: 'img15', url: 'meme-imgs/meme-imgs-(square)/15.jpg', tag: ['men', 'smile']},
    {id: 'img16', url: 'meme-imgs/meme-imgs-(square)/16.jpg', tag: ['men', 'smile']},
    {id: 'img17', url: 'meme-imgs/meme-imgs-(square)/17.jpg', tag: ['men']},
    {id: 'img18', url: 'meme-imgs/meme-imgs-(square)/18.jpg', tag: ['funny', 'cute']}
]

function renderGallery(gallery = gGallery) {
    const elGallery = document.querySelector('.gallery')
    const strHtml = gallery.map(image => `
        <div class='img-gallery ${image.id}'>
        <button class="gallery-btn" onClick="onImgSelect('${image.url}')">
        <img src=${image.url}>
        </button>
        </div>
    `)

    elGallery.innerHTML = strHtml.join('')
}

function renderGalleryByTag(byTag) {
    const galleryByTag = gGallery.filter(image => image.tag.includes(byTag))
    renderGallery(galleryByTag)
}

function renderMyMemes() {
    const elMyGallery = document.querySelector('.my-meme-gallery')
    const MY_MEMES = getFromStorage()
    const strHtml = MY_MEMES.map(image => `
        <div class='my-gallery ${image.id}'>
        <button class="gallery-btn" onClick="onMyImgSelect('${image.img}', '${image.id}')">
        <img src=${image.galleryDisplay}>
        </button>
        </div>
    `)
    elMyGallery.innerHTML = strHtml.join('')
}

function onSearch(elInput) {
    const text = elInput.value
    const keyWords = ['funny', 'animal', 'baby', 'men', 'cute', 'smile']
    if(keyWords.includes(text.toLowerCase())) {
        renderGalleryByTag(text.toLowerCase())
        elInput.value = ''
        return
    } else alert(`${text} is not a keyword`)
    elInput.value = ''
}
