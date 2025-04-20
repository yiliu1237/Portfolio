import {startCubeShader, renderer as cubeRenderer, material as cubeMaterial, updateShaderSize as updateCubeShaderSize} from './renderer/cubeRotate.js';

import { fadeInShader, fadeOutShader, changeHeadingColor, changeItemBoxShadow} from './renderer/glitteryFlow_gridBackground.js';

const items = Array.from(document.querySelectorAll('.item'));

// Still assign row and col logically
const gridRows = 3;
const gridCols = 3;

let tileLayoutsFraction;
let tiles;
let cube;

let winning_page = false;
let random_mode = false;


function openModalFromButton(event, content) {
  console.log("click icon!")
  event.stopPropagation();
  openModal(content);
}

function openModal(content) {
  const modal = document.getElementById('popup-modal');
  const modalBody = document.getElementById('modal-body');

  modalBody.innerHTML = content; // Insert your dynamic project content
  modal.classList.remove('hidden');
}

function closeModal() {
  const modal = document.getElementById('popup-modal');
  modal.classList.add('hidden');
}

window.openModalFromButton = openModalFromButton;
window.closeModal = closeModal;


//random width for each grid
//height for the grids at the same row is the same
function generateRandomTileLayouts({
  gridRows,
  gridCols,
  minWidthFraction,
  maxWidthFraction,
  minHeightFraction,
  maxHeightFraction,
  gapFraction, 
} = {}) {

  const colWidths = Array.from({ length: gridCols*gridRows }, () =>
    Math.random() * (maxWidthFraction - minWidthFraction) + minWidthFraction
  );



  const rowHeights = Array.from({ length: gridRows }, () =>
    Math.random() * (maxHeightFraction - minHeightFraction) + minHeightFraction
  );


  const layouts = [];
  for (let row = 0; row < gridRows; row++) {
    const top = rowHeights.slice(0, row).reduce((a, b) => a + b + gapFraction, 0);

    for (let col = 0; col < gridCols; col++) {
      let index = row * gridCols + col;
      const left = colWidths.slice(row * gridCols, index).reduce((a, b) => a + b + gapFraction, 0);

      let width = colWidths[index];
      let height = rowHeights[row];

      if(row == gridRows - 1){
        height = 1. - top;
      }
      
      if(col == gridCols - 1){
        width = 1. - left;
      }

      layouts.push({ //here left, top, width, height are fractions
        left: left,
        top: top,
        width: width,
        height: height,
      });
    }
  }

  return layouts;
}


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}




function isSolvable(items) {
  // Extract numbers from tile.el (assume all tiles except cube have "p1", "p2", etc.)
  const numbers = items.map(item => { // .map()	array method: create a new array by transforming each element
    if (item.classList.contains('cube')) {
      return 0; // blank
    }
    const match = item.className.match(/p(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  });

  let inversions = 0;
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] && numbers[j] && numbers[i] > numbers[j]) {
        inversions++;
      }
    }
  }

  console.log("num inversions: ", inversions);
  return inversions % 2 === 0;
}

function generateSolvableTiles({
  gridRows = 3,
  gridCols = 3,
  minWidthFraction = 0.233,
  maxWidthFraction = 0.433,
  minHeightFraction = 0.3,
  maxHeightFraction = 0.367,
  gapFraction = 0.0167, 
  isRandom = true
} = {}){

  do {
    if(isRandom){
      shuffleArray(items);
      console.log("items is shuffled");
    }
  } while (!isSolvable(items));

  const tileLayoutsFraction = generateRandomTileLayouts({
    gridRows,
    gridCols,
    minWidthFraction,
    maxWidthFraction,
    minHeightFraction,
    maxHeightFraction,
    gapFraction
  });
  
  console.log(items); // always solvable
  return tileLayoutsFraction;
}


//do not use items here which is set to be const, use tiles to track the swapped grid
function checkWin() {
  console.log("checkWin is called");
  for (let i = 0; i < tiles.length - 1; i++) {
    const tile = tiles[i].el;

    console.log("tile: ", tile);
    console.log("i + 1: ", i + 1);
    
    if (tile.classList.contains('cube')) {
      return false; 
    }
    
    const match = tile.className.match(/p(\d+)/);
    const targetIndex = match ? parseInt(match[1], 10) : -1;

    console.log("targetIndex: ", targetIndex);

    if (targetIndex !== i + 1) { 
      // i + 1 because p1 means index 0 tile
      return false; 
    }
  }

  console.log("WIN");
  
  return true; 
}

//We use Percentage % in the cutom-grid, so the browser has to wait until parent sizes are fully computed; Als, we use aspect-ratio, so browser has to solve width vs height relationships.
//Therefore, to make sure generateRandomTileLayouts gets all the inputs needed for calculation we wait page loading 
window.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => {

    //Returns the tileLayout fractions
    tileLayoutsFraction = generateSolvableTiles({gridRows: gridRows, gridCols: gridCols, isRandom:random_mode});
    

    tiles = items.map((el, index) => ({ //array of obj
      el,
      row: Math.floor(index / gridCols),
      col: index % gridCols,
    }));

    cube = tiles.find(tile => tile.el.classList.contains('cube'));

    render();

    startCubeShader();

    updateCubeShaderSize();


      // Handle click to move
    tiles.forEach(tile => { 
      tile.el.addEventListener('click', () => {
        if (tile === cube) return;

        if (isAdjacent(tile, cube)) {
          // Swap logical position
          [tile.row, cube.row] = [cube.row, tile.row];
          [tile.col, cube.col] = [cube.col, tile.col];

          // Swap their locations in the tiles array
          const tileIndex = tiles.indexOf(tile);
          const cubeIndex = tiles.indexOf(cube);
          [tiles[tileIndex], tiles[cubeIndex]] = [tiles[cubeIndex], tiles[tileIndex]];
      
          const shaderContainer = document.getElementById('cube-shader');
          const tileSection = tile.el;
          const rect = tileSection.getBoundingClientRect();
      
          shaderContainer.style.width = rect.width + 'px';
          shaderContainer.style.height = rect.height + 'px';
    
          cubeRenderer.setSize(rect.width, rect.height);
          cubeMaterial.uniforms.iResolution.value.set(rect.width, rect.height);

          render();

          updateCubeShaderSize();
      
          if (checkWin()) {
            fadeInShader();
            changeHeadingColor('rgba(255, 255, 255, 1)');
            changeItemBoxShadow('0 0 8px 3px rgba(255, 255, 255, 0.7)');
            winning_page = true;
          }else if(winning_page){
            fadeOutShader();
            changeHeadingColor('rgba(51, 51, 51, 1)');
            changeItemBoxShadow('0 2px 6px rgba(0, 0, 0, 0.3)');
            winning_page = false;
          }
        }
      });
    });
    
  });
});


window.addEventListener('resize', () => {
  render();
});


// Render based on the hardcoded layout
function render() {
  const grid = document.querySelector('.custom-grid');
  const gridWidth = grid.offsetWidth;
  const gridHeight = grid.offsetHeight;

  tiles.forEach(tile => {
    const layout = tileLayoutsFraction[tile.row * gridCols + tile.col]; // map (row, col) to correct layout
    tile.el.style.position = 'absolute';
    tile.el.style.left = `${layout.left * gridWidth}px`;
    tile.el.style.top = `${layout.top * gridHeight}px`;
    tile.el.style.width = `${layout.width * gridWidth}px`;
    tile.el.style.height = `${layout.height * gridHeight}px`;
    tile.el.style.transition = 'top 0.3s, left 0.3s';


    // Select only the puzzle image, not the magnifying glass icon
    const img = Array.from(tile.el.children).find(child => child.tagName === 'IMG');
    if (img) {
      img.style.width = `${layout.width * gridWidth}px`;
      img.style.height = `${layout.height * gridHeight}px`;
      img.style.objectFit = 'cover';
      img.style.display = 'block';  
    }
  });
}

// Adjacency check based purely on row/col index
function isAdjacent(tile1, tile2) {
  const rowDiff = Math.abs(tile1.row - tile2.row);
  const colDiff = Math.abs(tile1.col - tile2.col);
  return (rowDiff + colDiff === 1);
}








