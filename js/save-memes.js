'use strict'

const SAVED_MEMES = JSON.parse(localStorage.getItem('Saved Memes')) || []

function saveMeme(id) {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')
    const myMeme = getMeme()
    myMeme.galleryDisplay = imgDataUrl
    myMeme.id = id
    console.log(myMeme);
    SAVED_MEMES.push(myMeme)
    saveToStorage()
}

function saveToStorage() {
    const toString = JSON.stringify(SAVED_MEMES)
    localStorage.setItem('Saved Memes', toString)
}

function getFromStorage() {
    const retString = localStorage.getItem('Saved Memes')
    const retMemes = JSON.parse(retString)
    return retMemes 
}

function getMyMemes() {
    return SAVED_MEMES
}
