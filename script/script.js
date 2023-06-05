$(document).ready(function() {
    // Form submission
    $('#contactForm').submit(function(e) {
      e.preventDefault();
      
      // Perform form operations here
      
      // Example: Display success message
      alert('Thank you for your message!');
      
      // Reset form
      this.reset();
    });
  });
  
  $(document).ready(function() {
    let rows = 3;
    let cols = 3;

    let curTile;
    let otherTile;

    let turns = 0;

    let imageOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];
    //let imageOrder = ["1","2","3","4","5","6","7","8","9"]

    function loadImage() {
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          let tile = $("<img>")
            .attr("id", r.toString() + "-" + c.toString())
            .attr("src", "./images/" + imageOrder.shift() + ".jpg")
            .on("dragstart", dragStart)
            .on("dragover", dragOver)
            .on("dragenter", dragEnter)
            .on("dragleave", dragLeave)
            .on("drop", dragDrop)
            .on("dragend", dragEnd);

          $("#board").append(tile);
        }
      }
    }

    loadImage();

    function dragStart(e) {
      curTile = this;
      curTile.style.opacity = "0.4";
      curTile.style.cursor = "grabbing";
      e.originalEvent.dataTransfer.effectAllowed = "move";
      e.originalEvent.dataTransfer.setData("text/plain", "");
    }

    function dragOver(e) {
      e.preventDefault();
    }

    function dragEnter(e) {
      e.preventDefault();
      $(this).addClass("highlight");
    }

    function dragLeave() {
      $(this).removeClass("highlight");
    }

    function dragDrop(e) {
      e.preventDefault();
      $(this).removeClass("highlight");
      otherTile = this;
      let curCoords = curTile.id.split("-");
      let r = parseInt(curCoords[0]);
      let c = parseInt(curCoords[1]);

      let otherCoords = otherTile.id.split("-");
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

        $("#turns").text(turns);
        if (turns === 6) {
          alert('Congratulations! Code is = "#RECYCLE255"');
        }
      }
    }

    function dragEnd() {
      curTile.style.opacity = "1";
      curTile.style.cursor = "grab";

      if (!otherTile.src.includes("3.jpg")) {
        return;
      }

      let curCoords = curTile.id.split("-");
      let r = parseInt(curCoords[0]);
      let c = parseInt(curCoords[1]);

      let otherCoords = otherTile.id.split("-");
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

        $("#turns").text(turns);
      }
    }
  });
