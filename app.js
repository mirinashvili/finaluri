
const addButton = document.querySelector('#buttons button:first-of-type');
const removeButton = document.querySelector('#buttons button:last-of-type');
const table = document.querySelector('#body_table table');


addButton.addEventListener('click', addColumn);
removeButton.addEventListener('click', removeColumn);


let columnCounter = 0;
let addedColumns = 0;

function addColumn() {

  const date = new Date(2023, 05, 04 + columnCounter); 
  
  const dayOfWeek = date.getDay();
  if (dayOfWeek !== 1 && dayOfWeek !== 3 && dayOfWeek !== 5) {
    columnCounter++;
    addColumn(); 
    return;
  }
  
 
  const th = document.createElement('th');
  const day = date.getDate();
  const month = date.getMonth() + 1; 
  const year = date.getFullYear();
  const title = `${day}/${month}/${year}`; 
  const textNode = document.createTextNode(title); 
  th.appendChild(textNode);
  table.querySelector('thead tr').appendChild(th); 

  
  const rows = table.querySelectorAll('tbody tr');
  rows.forEach((row) => {
    const td = document.createElement('td');
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('value', '0');
    input.addEventListener('input', calculateAverage); 
    td.appendChild(input);
    row.appendChild(td); 
  });
  

  columnCounter++; 
  addedColumns++; 
}


function removeColumn() {
  
  if (addedColumns > 0) {
    
    const th = table.querySelector('thead tr').lastElementChild;
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach((row) => {
      const td = row.lastElementChild;
      row.removeChild(td); 
    });
    table.querySelector('thead tr').removeChild(th); 

    columnCounter = addedColumns; 
    addedColumns--; 
  }
}

function calculateAverage() {
  
  const rowIndex = this.parentElement.parentElement.rowIndex;
  const cells = table.querySelectorAll(`tbody tr:nth-child(${rowIndex}) td input`);

  let allValid = true;
  cells.forEach((cell) => {
    if (isNaN(cell.value) || cell.value === '') {
      allValid = false;
      return;
    }
  });
  if (!allValid) {
    return;
  }

  
  let total = 0;
  let missedLessons = 0;
  let numLessons = 0;
  cells.forEach((cell) => {
    total += parseInt(cell.value);
    if (cell.value === '0') {
      missedLessons++;
    }
    numLessons++;
  });
  const average = total / cells.length;

  
  const averageCell = table.querySelector(`tbody tr:nth-child(${rowIndex}) td:nth-child(2)`);
  averageCell.textContent = average.toFixed(1);

  
  let totalMissedLessons = 0;
  const allCells = table.querySelectorAll('tbody td input');
  allCells.forEach((cell) => {
    if (cell.value === '0') {
      totalMissedLessons++;
    }
  });
  
 
  const totalDays = table.querySelectorAll('thead tr th').length - 2; 
  const totalStudents = table.querySelectorAll('tbody tr').length;
  const missedLessonsSpan = document.querySelector('#missedLessons');
  const averageMarkSpan = document.querySelector('#averageMark');
  const totalDaysSpan = document.querySelector('#totalDays');
  const totalStudentsSpan = document.querySelector('#totalStudents');
  missedLessonsSpan.textContent = totalMissedLessons;
  
  
  let totalAverage = 0;
  const averageColumnCells = table.querySelectorAll('tbody td:nth-child(2)');
  averageColumnCells.forEach((cell) => {
    totalAverage += parseFloat(cell.textContent);
  });
  const averageMark = totalAverage / totalStudents;
  
  averageMarkSpan.textContent = isNaN(averageMark) ? 0 : averageMark.toFixed(1);
  totalDaysSpan.textContent = totalDays;
  totalStudentsSpan.textContent = totalStudents;
}


