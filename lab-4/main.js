// Zapis
//localStorage.setItem('username', 'Jan');

// Odczyt
//console.log(localStorage.getItem('username')); // "Jan"

// Usuwanie
//localStorage.removeItem('username');


function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function generateId() {
  return '_' + Math.random().toString(36).substring(2, 9);
}

function saveKanban() {
  const board = {};
  document.querySelectorAll('.column').forEach(column => {
    const key = column.dataset.column;
    board[key] = [];
    column.querySelectorAll('.card').forEach(card => {
      board[key].push({
        id: card.dataset.id,
        content: card.querySelector('.content').innerText,
        color: card.style.backgroundColor
      });
    });
  });
  localStorage.setItem('kanban', JSON.stringify(board));
}

function loadKanban() {
  const board = JSON.parse(localStorage.getItem('kanban') || '{}');
  for (const col in board) {
    const column = document.querySelector(`.column[data-column="${col}"] .cards`);
        column.innerHTML = '';
        board[col].forEach(card => {
            const cardDiv = createCard(card.content, card.color, card.id);
            column.appendChild(cardDiv);
        });
    }
    updateCounters();
}


function updateCounters() {
  document.querySelectorAll('.column').forEach(column => {
      const count = column.querySelectorAll('.card').length;
      column.querySelector('.counter').innerText = count;
  });
}

function createCard(content = 'Nowa karta', color='', id = '') {

  if (!id) id = generateId();
  if (!color) color = getRandomColor();

  //new Card Creation
  const card = document.createElement('div');
  card.classList.add('card');
  card.style.backgroundColor = color;
  card.dataset.id = id;

  //editable content
  const contentDiv = document.createElement('div');
  contentDiv.className = 'content';
  contentDiv.contentEditable = 'true';
  contentDiv.innerText = content;
  card.appendChild(contentDiv);
    
  //delete
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete';
  deleteBtn.innerHTML = 'x';
  deleteBtn.addEventListener('click', () => {
    card.remove();
    updateCounters();
    saveKanban();
  })

  //moveLeft
  const moveLeftBtn = document.createElement('button');
  moveLeftBtn.className = 'moveLeft';
  moveLeftBtn.innerHTML = '←';
  moveLeftBtn.addEventListener('click', () => {
    moveCard(card, -1)
  })

  //moveRight
  const moveRightBtn = document.createElement('button');
  moveRightBtn.className = 'moveRight';
  moveRightBtn.innerHTML = '→';
  moveRightBtn.addEventListener('click', () => {
    moveCard(card, 1)
  })


  //changeColor 
  const changeColorBtn = document.createElement('button');
  changeColorBtn.className = 'changeColor';
  changeColorBtn.innerHTML = '🎨';
  changeColorBtn.addEventListener('click', () => {
    card.style.backgroundColor = getRandomColor();
    saveKanban();
  })

  card.append(
    moveLeftBtn,
    changeColorBtn,
    deleteBtn,
    moveRightBtn
  )
  updateCounters();

  return card;
};


const columns = ['toDo', 'meantime', 'done'];
function moveCard(card, direction) {
  const currentColumn = card.closest('.column');
  const currentIndex = columns.indexOf(currentColumn.dataset.column);
  let newIndex = currentIndex + direction;
  if (newIndex < 0 || newIndex >= columns.length) return;
  const newColumn = document.querySelector(`.column[data-column="${columns[newIndex]}"] .cards`);
  newColumn.appendChild(card);
  updateCounters();
  saveKanban();
};


document.querySelectorAll('.column').forEach(column => {
  const addBtn = column.querySelector('.addCard');
  addBtn.addEventListener('click', () => {
    const cardsContainer = column.querySelector('.cards');
    const newCard = createCard();
    cardsContainer.appendChild(newCard);
    updateCounters();
    saveKanban();
  });
  
  const changeColorBtn = column.querySelector('.changeColColor');
  changeColorBtn.addEventListener('click', () => {
  const sameColor = getRandomColor(); // generate one color
  const cards = column.querySelectorAll('.card');
  cards.forEach(card => {
    card.style.backgroundColor = sameColor;  // apply same color to all cards in column
  });
  saveKanban(); // save state after color change
});

  document.querySelectorAll('.sortCards').forEach(btn => {
    btn.addEventListener('click', function() {
      const cards = Array.from(btn.closest('.column').querySelectorAll('.card'));
      cards.sort((a, b) => a.querySelector('.content').innerText.localeCompare(b.querySelector('.content').innerText));
      const cardsContainer = btn.closest('.column').querySelector('.cards');
      cards.forEach(card => cardsContainer.appendChild(card));
      saveKanban();
    });
  });
})

document.addEventListener('DOMContentLoaded', () => {
  loadKanban();
});