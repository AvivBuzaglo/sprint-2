'use strict'

const STICKERS = [
    {id: 'laugh', value: '😂', pos: {x: 0, y: 0}, fontSize: '40px', isDragged: false, isSelected: false, idx: 0},
    {id: 'cool', value: '😎', pos: {x: 0, y: 0}, fontSize: '40px', isDragged: false, isSelected: false, idx: 1},
    {id: 'smile', value: '😁', pos: {x: 0, y: 0}, fontSize: '40px', isDragged: false, isSelected: false, idx: 2},
    {id: 'angry', value: '🤬', pos: {x: 0, y: 0}, fontSize: '40px', isDragged: false, isSelected: false, idx: 3}
]

function getStickers() {
    return STICKERS
}

function getStickerById(id) {
    const findSticker = STICKERS.find(sticker => 
        sticker.id === id)
    return findSticker
}

function setStickerPos(idx, x, y) {
    STICKERS[idx].pos = {x, y}
}

function setIsDragged(idx) {
    STICKERS[idx].isDragged = true
}


