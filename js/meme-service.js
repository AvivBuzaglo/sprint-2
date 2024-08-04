'use strict'

let gMeme = {
    img: 'meme-imgs/meme-imgs-(square)/17.jpg',
    text: {line1: 'hello wolrd', line2: 'Bye World'},
    secondLine: false,
    selectedLine: 'line1',
    color: {outline: 'black', fill: 'white'},
    fontSize: '40px Arial',
    pos: {line1: {x: 225, y: 40}, line2: {x: 225, y: 425}} 
}


function getMeme() {
    return gMeme
}

function setLine1Txt(txt) {
    gMeme.text.line1 = txt
}

function setLine2Txt(txt) {
    gMeme.text.line2 = txt
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

function setFontSize(size) {
    gMeme.fontSize = size + ' Arial'
}

function setSelectedLine() {
    if(!gMeme.secondLine) {
        gMeme.selectedLine = 'line1'
        return
    }
    if(gMeme.selectedLine === 'line1') {
        gMeme.selectedLine = 'line2'
    } else gMeme.selectedLine = 'line1'
}

function setSelectedByClick(line) {
    gMeme.selectedLine = line
}