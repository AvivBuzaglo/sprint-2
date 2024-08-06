'use strict'

let gMeme = {
    img: 'meme-imgs/meme-imgs-(square)/17.jpg',
    text: {line1: 'hello world', line2: 'Bye World'},
    secondLine: false,
    selectedLine: 'line1',
    color: {outline: 'black', fill: 'white'},
    fontSize: '40px Arial',
    pos: {line1: {x: 225, y: 40}, line2: {x: 225, y: 425}},
    textSize: {line1: {width: 192, height: 40}, line2: {width: 184, height: 40}}
}


function getMeme() {
    return gMeme
}

function getFontSize() {
    const sizeArr = gMeme.fontSize.split('')
    const size = sizeArr[0] + sizeArr[1]
    const sizeNum = +size
    return sizeNum
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

function setTextSize(line1Width, line2Width) {
    gMeme.textSize.line1.width = line1Width
    gMeme.textSize.line1.height = getFontSize()

    gMeme.textSize.line2.width = line2Width
    gMeme.textSize.line2.height = getFontSize()
}

