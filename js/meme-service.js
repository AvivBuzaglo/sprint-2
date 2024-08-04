'use strict'

let gMeme = {
    img: 'meme-imgs/meme-imgs-(square)/17.jpg',
    text: 'hello wolrd',
    color: {outline: 'black', fill: 'white'},
    pos: {x: 225, y: 35}
}


function getMeme() {
    return gMeme
}

function setLineTxt(txt) {
    gMeme.text = txt
}

function setImg(imgUrl) {
    gMeme.img = imgUrl
}

function setOutlineColor(color) {
    gMeme.color.outline = color
}

function setFillColor(color) {
    gMeme.color.fill = color
}