// script.js

const draggableItems = document.querySelectorAll('.item:not(.blank)');
const blankItem = document.querySelector('.item.blank');
let draggedItem = null;

draggableItems.forEach(item => {
  item.addEventListener('dragstart', (e) => {
    draggedItem = item;
    setTimeout(() => item.classList.add('hide'), 0);
  });

  item.addEventListener('dragend', (e) => {
    draggedItem = null;
    item.classList.remove('hide');
  });
});

// Only allow dropping onto blank space
blankItem.addEventListener('dragover', (e) => {
  e.preventDefault();
});

blankItem.addEventListener('drop', (e) => {
  e.preventDefault();
  if (draggedItem) {
    swapItems(draggedItem, blankItem);
  }
});

// Swap the dragged item and the blank
function swapItems(item1, item2) {
  const temp = document.createElement('div');
  item1.parentNode.insertBefore(temp, item1);
  item2.parentNode.insertBefore(item1, item2);
  temp.parentNode.insertBefore(item2, temp);
  temp.remove();
}
