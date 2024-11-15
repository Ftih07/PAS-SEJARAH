var rows = 5;
var columns = 5;

var currTile;
var otherTile;

var turns = 0;

window.onload = function() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.src = "assets/images_easy_puzzle/blank.jpg";

            tile.addEventListener("dragstart", dragStart); 
            tile.addEventListener("dragover", dragOver);  
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave); 
            tile.addEventListener("drop", dragDrop);      
            tile.addEventListener("dragend", dragEnd);     

            document.getElementById("board").append(tile);
        }
    }

    let pieces = [];
    for (let i=1; i <= rows*columns; i++) {
        pieces.push(i.toString()); 
    }
    pieces.reverse();
    for (let i =0; i < pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length);

        let tmp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] = tmp;
    }

    for (let i = 0; i < pieces.length; i++) {
        let tile = document.createElement("img");
        tile.src = "assets/images_easy_puzzle/" + pieces[i] + ".jpg";

        tile.addEventListener("dragstart", dragStart); 
        tile.addEventListener("dragover", dragOver);  
        tile.addEventListener("dragenter", dragEnter); 
        tile.addEventListener("dragleave", dragLeave);
        tile.addEventListener("drop", dragDrop);      
        tile.addEventListener("dragend", dragEnd);      

        document.getElementById("pieces").append(tile);
    }
}

function dragStart() {
    currTile = this; 
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; 
}

function dragEnd() {
    if (currTile.src.includes("blank")) {
        return;
    }
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;
    
  
    checkCompletion();
}

function checkCompletion() {
    let board = document.getElementById("board");
    let tiles = board.getElementsByTagName("img");
    for (let i = 0; i < tiles.length; i++) {
        let tileNumber = i + 1; 
        if (!tiles[i].src.includes(tileNumber + ".jpg")) {
            return;
        }
    }
    alert("Selamat, puzzle terselesaikan!");
}

document.addEventListener('DOMContentLoaded', () => {
    const backgroundMusic = document.getElementById('background-music');
    const muteButton = document.getElementById('mute-button');
    const muteIcon = muteButton.querySelector('i'); 

    backgroundMusic.play().catch(error => {
        console.log("User interaction is required to start the audio on some browsers.", error);
    });

    muteButton.addEventListener('click', () => {
        if (backgroundMusic.muted) {
            backgroundMusic.muted = false; 
            muteIcon.classList.replace('bx-volume-mute', 'bx-volume-full');
        } else {
            backgroundMusic.muted = true;
            muteIcon.classList.replace('bx-volume-full', 'bx-volume-mute'); 
        }
    });
});