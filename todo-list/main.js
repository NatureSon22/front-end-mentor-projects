const toggleButton = document.querySelector('#toggle-btn');
const clearAllActiveButton = document.querySelector('#clear-all');
const inputField = document.querySelector('#input-field');
const todoContainer = document.querySelector('.todolist__container--subcontainer-todo');
const todos = document.querySelectorAll('.todo');
const displayFilter = document.querySelectorAll('.todo-filter > h5');

let todoButton = document.querySelectorAll('.todo__check');
let savedToDos = JSON.parse(localStorage.getItem('todoList')) || [
  {action: 'Complete online JavaScript course', active: false},
  {action: 'Jog around the park 3x', active: false},
  {action: '10 minutes meditation', active: false},
  {action: 'Read for 1 hour', active: false},
  {action: 'Pick up groceries', active: false},
  {action: 'Complete Todo App on Frontend Mentor', active: false}
];
let prev = displayFilter[0];


const dragActions = (todoElement, todoMessage) => {
  const todoContent = todoElement.innerHTML;
  // custom image for dragged element

  const customDragImage = document.createElement('div');
  todoElement.addEventListener('dragstart', e => {
    const message = todoMessage.textContent.length <= 20 ? todoMessage.textContent : `${todoMessage.textContent.substring(0, 20)}...`;
    const image = todoElement.querySelector('todo__check');
    const todoEl = document.createElement('div');

    todoEl.innerHTML = todoContent;
    const todoElMessage = todoEl.querySelector('.todo > p');
    
    
    todoElMessage.textContent = message;
    customDragImage.appendChild(todoEl);
    customDragImage.classList.add('grabbing');
    document.body.appendChild(customDragImage);

    let index = savedToDos.findIndex(todoInfo => todoInfo.action === todoMessage.textContent);
    e.dataTransfer.setData('text/plain', index);
    e.dataTransfer.setDragImage(customDragImage, 0, 0);
  });

  todoElement.addEventListener('dragend', e => {
    todoElement.classList.remove('grabbing');
    customDragImage.innerHTML = '';
    todoElement.classList.remove('drag');
  });

  todoElement.addEventListener('dragover', e => {
    e.preventDefault(); 
  });

  todoElement.addEventListener('drop', e => {
    e.preventDefault();
  
    const contentIndex = parseInt(e.dataTransfer.getData('text/plain'));
    let dropIndex = savedToDos.findIndex(todoInfo => todoInfo.action === todoMessage.textContent);
  
    
    const [draggedTodo] = savedToDos.splice(contentIndex, 1);
  
    
    savedToDos.splice(dropIndex, 0, draggedTodo);
  
    // Update localStorage with the reordered savedToDos array
    localStorage.setItem('todoList', JSON.stringify(savedToDos));
  
    // Clear todoContainer and re-render the todo list
    todoContainer.innerHTML = '';
    savedToDos.forEach(todo => createTodoTile(todo));
  });
  
};


const toggleActiveClass = (element) => {
  element.classList.toggle('active');
};

const filterTodo = (filterIndex) => {
  todoContainer.innerHTML = '';
  let filteredTodos;

  if(filterIndex === 0) {
    filteredTodos = savedToDos; 
  }else if(filterIndex === 1) {
    filteredTodos = savedToDos.filter((item)=> item['active'] === false );
  } else {
    filteredTodos = savedToDos.filter((item)=> item['active'] === true );
  }

  filteredTodos.forEach(todo => {
    createTodoTile(todo); 
  })
};

const displayTodo = (todoList) => {
  todoList.forEach(todo => {
    createTodoTile(todo);
  })
};

const updateTodoTile = (todo, actionTOdo) => {
  for(const todoInfo of savedToDos) {
    const {action, active} = todoInfo;
    if(action === actionTOdo) {
      const index = Array.from(savedToDos).indexOf(todoInfo);
      savedToDos[index].active = !savedToDos[index].active;
      localStorage.setItem("todoList",JSON.stringify(savedToDos));
    }
  }
};

const deleteTodoTile = (todo, actionTOdo) => {
  todo.classList.add('delete');

  setTimeout(() => {
    todoContainer.removeChild(todo);
  }, 500);

  for(const todoInfo of savedToDos) {
    const {action, active} = todoInfo
    if(action === actionTOdo) {
      const index = Array.from(savedToDos).indexOf(todoInfo);
      savedToDos.splice(index, 1);
      localStorage.setItem("todoList",JSON.stringify(savedToDos));
    }
  }
};

const createTodoTile = (todo) => {
  const todoTile = `
    <div class="todo" draggable="true">
      <div class="todo__check"><img src="images/icon-check.svg" alt=""></div>
      <p>${todo.action}</p>
      <img src="images/icon-cross.svg" alt="">
    </div>
  `;

  const todoElement = document.createElement('div');
  todoElement.classList.add('todo-contain');
  todoElement.innerHTML = todoTile;

  const buttonTodo = todoElement.querySelector('.todo__check');
  const checkImg = todoElement.querySelector('.todo__check > img');
  const deleteButton = todoElement.querySelector('.todo > img');
  const todoMessage = todoElement.querySelector('.todo > p');

  dragActions(todoElement, todoMessage);

  if(todo.active) {
    toggleActiveClass(buttonTodo);
    toggleActiveClass(checkImg);
    toggleActiveClass(todoMessage)
  }

  buttonTodo.addEventListener('click', () => {
    toggleActiveClass(buttonTodo);
    toggleActiveClass(checkImg);
    toggleActiveClass(todoMessage)
  });

  deleteButton.addEventListener('click', () => {
    deleteTodoTile(todoElement, todo.action);
  })

  buttonTodo.addEventListener('click', () => {
    updateTodoTile(todoElement, todo.action);
  })

  todoContainer.append(todoElement);
  todoButton = document.querySelectorAll('.todo__check');
}

const addToDo = (todo) => {
  const todoItem = {
    action: todo,
    active: false
  }

  savedToDos = savedToDos ? [...savedToDos, todoItem] : [todo];
  localStorage.setItem('todoList', JSON.stringify(savedToDos));
  
  createTodoTile(todoItem);
};

const clearCompleted = async () => {
  const displayedTodos = todoContainer.querySelectorAll('.todo');
  savedToDos = savedToDos.filter(({ action, active }) => active === false);

  await Promise.all(
    Array.from(displayedTodos).map((todo, index) => {
      const activeButton = todo.querySelector('.todo__check');
      if (activeButton.classList.contains('active')) {
        return new Promise(resolve => {
          setTimeout(() => {
            todo.classList.add('delete');
            resolve();
          }, index * 80); 
        });
      } else {
        return Promise.resolve();
      }
    })
  );

  // After the animation is complete, remove the completed todos from the container
  setTimeout(() => {
    todoContainer.innerHTML = '';
    savedToDos.forEach(todo => {
      createTodoTile(todo);
    });
  }, displayedTodos.length * 80); 

  localStorage.setItem('todoList', JSON.stringify(savedToDos));
};



const toggleStyle = () => {
  document.documentElement.classList.toggle('light-mode');
}


window.addEventListener('load', () => displayTodo(savedToDos));

toggleButton.addEventListener('click', () => {
  toggleActiveClass(toggleButton);
  toggleStyle();
});

inputField.addEventListener('keypress', e => {
  if(e.key === 'Enter') {
    if(inputField.value === '') {
      return;
    }

    for(const {action, active} of savedToDos) {
      if(action ===  inputField.value.toLowerCase()) {
        return;
      } 
    }

    addToDo(inputField.value.toLowerCase());
    inputField.value = '';
  }
});

displayFilter.forEach((filter) => {
  filter.addEventListener("click", () => {
    prev.classList.remove('active');
    toggleActiveClass(filter);
    prev = filter;
    filterTodo(Array.from(displayFilter).indexOf(filter));
  })
});

clearAllActiveButton.addEventListener('click', clearCompleted);

document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 1000,
    offset: 200,
  });
});
