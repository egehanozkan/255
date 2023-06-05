let rows = 3
let cols = 3

let curTile
let otherTile

let turns = 0

let imageOrder = ["4","2","8","5","1","6","7","9","3"];

function loadImage(){
    for(let r=0; r < rows; r++)
    {
        for(let c=0; c<cols ; c++)
        {
            let tile = document.createElement('img');
            tile.id = r.toString()+"-"+c.toString()
            tile.src = "./images/" + imageOrder.shift() + ".jpg";
            
            tile.addEventListener('dragstart', dragStart)
            tile.addEventListener('dragover',dragOver)
            tile.addEventListener('dragenter',dragEnter)
            tile.addEventListener('dragleave',dragLeave)
            tile.addEventListener('drop',dragDrop)
            tile.addEventListener('dragend', dragEnd)

            document.getElementById('board').appendChild
            (tile)
        }
        
    }
    
}

loadImage()

function dragStart(e){
    curTile = this;
    curTile.style.opacity = '0.4';
    curTile.style.cursor = 'grabbing';
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain','');
}
function dragOver(e){
    e.preventDefault();
}
function dragEnter(e){
    e.preventDefault();
    this.classList.add('highlight');
}
function dragLeave(){
    this.classList.add('highlight');
}
function dragDrop(e){
    e.preventDefault();
    this.classList.remove('highlight');
    otherTile = this;
    let curCoords = curTile.id.split('-');
  let r = parseInt(curCoords[0]);
  let c = parseInt(curCoords[1]);

  let otherCoords = otherTile.id.split('-');
  let r2 = parseInt(otherCoords[0]);
  let c2 = parseInt(otherCoords[1]);

  let moveLeft = r === r2 && c2 === c - 1;
  let moveRight = r === r2 && c2 === c + 1;
  let moveUp = c === c2 && r2 === r - 1;
  let moveDown = c === c2 && r2 === r + 1;

  let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

  if (isAdjacent) {
    let curImg = curTile.src;
    let otherImg = otherTile.src;

    curTile.src = otherImg;
    otherTile.src = curImg;
    turns += 1;

    document.getElementById('turns').innerText = turns;
    if (turns == 6) {
      alert('Congratulations! Code is = "#RECYCLE255"');

    }
  }
}

function dragEnd() {
    curTile.style.opacity = '1';
    curTile.style.cursor = 'grab';
  
    if (!otherTile.src.includes('3.jpg')) {
      return;
    }
  
    let curCoords = curTile.id.split('-');
    let r = parseInt(curCoords[0]);
    let c = parseInt(curCoords[1]);
  
    let otherCoords = otherTile.id.split('-');
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);
  
    let moveLeft = r === r2 && c2 === c - 1;
    let moveRight = r === r2 && c2 === c + 1;
    let moveUp = c === c2 && r2 === r - 1;
    let moveDown = c === c2 && r2 === r + 1;
  
    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;
  
    if (isAdjacent) {
      let curImg = curTile.src;
      let otherImg = otherTile.src;
  
      curTile.src = otherImg;
      otherTile.src = curImg;
      turns += 1;
  
      document.getElementById('turns').innerText = turns;
    }
  }
  
  
  
  
