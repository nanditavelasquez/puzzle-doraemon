var rows = 3;
var columns = 3;

var currTile;
var otherTile;

var turns = 0;

var imgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];

window.onload = function () {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = imgOrder.shift() + ".jpg";

            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            // Agregar eventos táctiles
            tile.addEventListener("touchstart", touchStart);
            tile.addEventListener("touchmove", touchMove);
            tile.addEventListener("touchend", touchEnd);

            document.getElementById("board").append(tile);
        }
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
    swapTiles();
}

function dragEnd() {
    checkForWin();
}

function touchStart(e) {
    e.preventDefault();
    currTile = this;
}

function touchMove(e) {
    e.preventDefault();
}

function touchEnd() {
    let touchX = event.changedTouches[0].clientX;
    let touchY = event.changedTouches[0].clientY;

    // Encuentra el elemento en el que se soltó el toque
    let dropTarget = document.elementFromPoint(touchX, touchY);
    
    if (dropTarget.tagName === "IMG") {
        otherTile = dropTarget;
        swapTiles();
        checkForWin();
    }
}

function swapTiles() {
    if (!otherTile.src.includes("3.jpg")) {
        return;
    }

    let currImg = currTile.src;
    let otherImg = otherTile.src;

    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;
}

    function checkForWin() {
        var tiles = document.querySelectorAll("#board img");
        var correctOrder = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg"];
    
        var currentOrder = Array.from(tiles).map(function (tile) {
            return tile.src.substring(tile.src.lastIndexOf("/") + 1);
        });
    
        if (arraysEqual(correctOrder, currentOrder)) {
            Swal.fire({
                title: "¡Felicitaciones!",
                text: "Has completado correctamente el puzzle",
                icon: "success",
            });
        }
    }
    
    function arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }
