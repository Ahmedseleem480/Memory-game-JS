// when clicking start a prompt to enter username appears
let startBtn = document.querySelector(".control-buttons span");
startBtn.addEventListener("click", function () {
  let userName = prompt("What's your name?");
  if (userName == "" || userName == null) {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = userName;
  }
  document.querySelector(".control-buttons").remove();
});
// Set duration of flipping
let duration = 1000;

// Targeting blocks
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(document.querySelector(".memory-game-blocks").children);

// Range of blocks order
let orderRange = Array.from(Array(blocks.length).keys());
shuffle(orderRange);

// Change the order of the block randomly
blocks.forEach((block, index) => {
  // add order property to every block
  block.style.order = orderRange[index];
  // add is-flipped class to clicked block only
  block.addEventListener("click", function () {
    flip_block(block);
  });
});

// flip-block function
function flip_block(selectedBlock) {
  // Add is-flipped class
  selectedBlock.classList.add("is-flipped");

  // collect allFlippedElements
  let allFlippedElements = blocks.filter((block) =>
    block.classList.contains("is-flipped")
  );
  console.log(allFlippedElements);
  if (allFlippedElements.length === 2) {
    console.log("two eles flipped");
    // stop clicking functoin
    stopClicking();
    // compare and match two flipped
    MatchFlippedBlocks(allFlippedElements[0], allFlippedElements[1]);
  }
  //Restart
  if (document.querySelector(".Tries span").innerHTML == "7") {
    window.location.reload();
  }
}
// stop clicking funciton
function stopClicking() {
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}
// Mathcing function
function MatchFlippedBlocks(firstBlock, secondBlock) {
  if (firstBlock.dataset.tech === secondBlock.dataset.tech) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");
    firstBlock.classList.add("matched");
    secondBlock.classList.add("matched");
    document.getElementById("success").play();
  } else {
    let triesElement = document.querySelector(".Tries span");
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
    document.getElementById("failure").play();
  }
}

// Make shuffle function
function shuffle(array) {
  // Setting Variable
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    // Get random number
    random = Math.floor(Math.random() * current);
    // Decrease current by one
    current--;
    // set temp to current
    temp = array[current];
    // set current to random ele
    array[current] = array[random];
    // set current to random ele
    array[random] = temp;
  }
  return array;
}
