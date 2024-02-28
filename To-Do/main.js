const ul = document.querySelector('ul');
const nameInput = document.querySelector('#nameInput');
const addButton = document.querySelector('.addButton');
const editList = document.querySelector('.edit-list');
const done = document.querySelector('.done');
const save = document.querySelector('save-list');


editList.addEventListener('click', (editor) => {
    editor.preventDefault();
    ul.contentEditable = true;
    let doneButton = document.createElement('button');
    done.appendChild(doneButton);
    doneButton.innerHTML = 'Done';
    doneButton.classList.add('doneButton')
    doneButton.addEventListener('click', (finish) => {
        finish.preventDefault();
        ul.contentEditable = false;
        doneButton.remove();
    })    
});

addButton.addEventListener('click', (item) => {
    item.preventDefault();
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(`${nameInput.value}`));
    ul.appendChild(li);
    nameInput.value = '';
    let removeItem = document.createElement('button');
    li.appendChild(removeItem);
    removeItem.innerHTML = 'X';
    removeItem.contentEditable = false;
    removeItem.classList.add('removeButton')
    removeItem.addEventListener('click', (clear) => {
        li.remove();
    })
});







