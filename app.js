"use strict";
(function() {
  // store DOM elements
  const domElements = {
    todaysDateStr: document.querySelector("[data-date]"),
    categoryCountStr: document.querySelector("[data-categoryCount]"),
    catInputStr: document.querySelector("[data-catInput]"),
    addCategoryStr: document.querySelector("[data-addCategory]"),
    dataCategoryListStr: document.querySelector("[data-categoryList]"),
    dataCategoryItemStr: document.querySelector("[data-categoryItem]"),
    dataTodoInputStr: document.querySelector("[data-todoInput]"),
    dataAuthorInputStr: document.querySelector("[data-todoAuthorInput]"),
    dataTodoTextStr: document.querySelector("[data-todoText]"),
    dataAuthorTextStr: document.querySelector("[data-todoAuthorText]"),
    dataEditStr: document.querySelector("[data-edit]"),
    dataDeleteStr: document.querySelector("[data-delete]"),
    dataAddTodo: document.querySelector("[data-addTodo]"),
  };
  // get todo list from local storage
  let storage = JSON.parse(localStorage.getItem("todolist"));
  storage = storage ? storage : [];

  // defined days and months
  const theDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const theMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  //   Update local
  function updateLocal(cat, catData) {
    let storage = JSON.parse(localStorage.getItem("todolist"));
    storage = storage ? storage : [];
    storage.push({
      [cat]: {
        ...catData,
      },
    });
  }

  // insanciate date
  const date = new Date();

  // display to UI
  function displayUi() {
    // display current date
    domElements.todaysDateStr.textContent = `${theDays[date.getDay()]}, ${
      theMonths[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;

    // read user typing in category input
    domElements.catInputStr.addEventListener("keyup", (event) => {
      domElements.catInputStr.value = event.target.value;
    });

    // console.log(domElements.catInputStr.value);

    function displayCategoryList() {
      let storage = JSON.parse(localStorage.getItem("todolist"));
      storage = storage ? storage : [];
      let todoItem, todoList;

      for (todoList in Object.entries(storage)) {
        for (todoItem in storage[todoList]) {
          //   console.log(storage[todoList][todoItem]);
          //   console.log(todoItem === "HEALTH");
          domElements.dataCategoryListStr.insertAdjacentHTML(
            "beforeend",
            `<!-- Category List -->
          <div id="${todoItem}" class="categoryList__item" data-categoryItem>
            <h4>
              <span><strong style="text-transform:capitalize !important;">${todoItem}</strong> <i class="fa-solid fa-pen-to-square"></i></span
              ><span class="categoryList__close">x</span>
            </h4>
            <label for="" class="label label__todo">Todo</label>
            <br />
            <input
              data-todoInput${todoItem}
              type="text"
              class="categoryList__todo"
              placeholder="Go to the gym..."
              required
            />
            <label for="" class="label label__author">Author</label>
            <br />
            <input
              data-todoAuthorInput${todoItem}
              type="text"
              class="categoryList__author"
              placeholder="John Doe..."
              required
            />
            <button id="btn${todoItem}" class="btn categoryList__add" data-addTodo${todoItem}>Add Todo</button>
          </div>`
          );
        }
      }
    }
    // if there is data in store ? display category list
    storage = storage ? displayCategoryList() : null;
    // displays todos
    function displayTodos(itemID, itemList) {
      //   let storage = JSON.parse(localStorage.getItem("todolist"));
      //   storage = storage ? storage : [];
      //   let todoItem, todoList;

      //   for (todoList in Object.entries(storage)) {
      //     for (todoItem in storage[todoList]) {
      //   console.log(storage[todoList][todoItem]);
      if (itemID ? itemID : false)
        document.getElementById(`${itemID}`).insertAdjacentHTML(
          "beforeend",
          `<!-- Beginning of todos 001-->
        <div class="todo" data-id="${itemID}">
          <p class="todo__task"><span class="icon__complete">O</span> <strong id="todo-${itemList.id}">${itemList.title}</strong></p>
           <div class="todo__meta">
            <p class="todo__author" data-todoAuthorText>${itemList.author}</p>
              <span class="todo__btnContainer">
                <button id="edit-${itemList.id}" class="btn edit" data-edit>
                 <i class="fa-solid fa-pen-to-square"></i> Edit
                </button>
                <button id="id="del-${itemList.id}"" class="btn delete" data-delete>
                    <i class="fa-solid fa-delete-left"></i> Delete
                </button>
             </span>
            </div>
        </div>
        <!-- End of todos 001-->`
        );
      //     }
      //   }
    }
    let execOnce = (function() {
      var executed = storage;
      return function() {
        if (!executed) {
          executed = true;
          getStoredTodo();
        }
      };
    })();
    execOnce();
    // if there is data in store ? display category list
    function getStoredTodo() {
      let storage = JSON.parse(localStorage.getItem("todolist"));
      storage = storage ? storage : [];
      let todoItem, todoList;

      for (todoList in Object.entries(storage)) {
        for (todoItem in storage[todoList]) {
          console.log(storage[todoList][todoItem]);
          displayTodos(todoItem, storage[todoList][todoItem]);
        }
      }
    }

    function handleCatSubmit() {
      let storage = JSON.parse(localStorage.getItem("todolist"));
      storage = storage ? storage : [];

      if (domElements.catInputStr.value.length > 0) {
        let categoryTitle = domElements.catInputStr.value
          .toUpperCase()
          .replace(/\s+/g, "");
        // insert new data into storage array object
        storage.push({
          [categoryTitle]: {},
        });
        // update local storage with new data
        localStorage.setItem("todolist", JSON.stringify(storage));
        // Clear the way for new elements
        removeAllChildNodes(domElements.dataCategoryListStr);
        // update the dom with new category list
        displayCategoryList();
        // invoke handleFormInput();
        handleFormInput();
        // reset category input form
        domElements.catInputStr.value = "";
      }
    }

    function handleFormInput() {
      let storage = JSON.parse(localStorage.getItem("todolist"));
      storage = storage ? storage : [];
      for (let todoList in Object.entries(storage)) {
        for (let todoItem in storage[todoList]) {
          //  console.log(storage[todoList][todoItem]);
          //  console.log(todoItem === "HEALTH");
          // read user typing in todo input
          if (document.querySelector(`[data-todoInput${todoItem}]`))
            document
              .querySelector(`[data-todoInput${todoItem}]`)
              .addEventListener("keyup", (event) => {
                document.querySelector(`[data-todoInput${todoItem}]`).value =
                  event.target.value;
                console.log(
                  document.querySelector(`[data-todoInput${todoItem}]`).value
                );
              });

          // read user typing in author input
          if (document.querySelector(`[data-todoAuthorInput${todoItem}]`))
            document
              .querySelector(`[data-todoAuthorInput${todoItem}]`)
              .addEventListener("keyup", (event) => {
                document.querySelector(
                  `[data-todoAuthorInput${todoItem}]`
                ).value = event.target.value;
                console.log(
                  document.querySelector(`[data-todoAuthorInput${todoItem}]`)
                    .value
                );
              });

          // event listener for handling add todo
          if (document.querySelector(`[data-addTodo${todoItem}]`))
            document
              .querySelector(`[data-addTodo${todoItem}]`)
              .addEventListener("click", handleTodoSubmit);
          console.log(document.querySelector(`[data-addTodo${todoItem}]`));
        }
      }
    }

    handleFormInput();
    // event listenter for handling category submit
    domElements.addCategoryStr.addEventListener("click", () =>
      handleCatSubmit()
    );

    // event listenter for handling todo edits
    document.querySelectorAll("[data-edit]").forEach((edit) => {
      edit.addEventListener("click", editTodo);
    });
    // document.querySelector("[data-edit]").addEventListener("click", editTodo);

    // handle todo submit
    function handleTodoSubmit(e) {
      let storage = JSON.parse(localStorage.getItem("todolist"));
      storage = storage ? storage : [];

      // create unique ID for each todo
      let todoID = [];
      const alphabet =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

      for (let i = 0; i < 8; i++) {
        todoID[i] = alphabet.charAt(
          Math.floor(Math.random() * alphabet.length)
        );
      }
      // join the characters
      const todoItemID = todoID.join("");

      let actualTodo,
        actualTodoAuthor,
        todoList,
        todoItem,
        checkForAvailableTodos,
        filteredStorage;

      for (todoList in Object.entries(storage)) {
        for (todoItem in storage[todoList]) {
          if (e.target.id === `btn${todoItem}`) {
            actualTodo = document
              .querySelector(`[data-todoInput${todoItem}]`)
              .value.toLowerCase();
            actualTodoAuthor = document
              .querySelector(`[data-todoAuthorInput${todoItem}]`)
              .value.toLowerCase();
            console.log(`I'm btn${todoItem}`);
            // insert new data into storage array object
            let todoObject = {
              id: todoItemID,
              title: actualTodo,
              author: actualTodoAuthor,
            };
            // check for available todos
            checkForAvailableTodos =
              storage[todoList][todoItem] &&
              Object.keys(storage[todoList][todoItem]).length === 0 &&
              Object.getPrototypeOf(storage[todoList][todoItem]) ===
                Object.prototype
                ? null
                : storage[todoList][todoItem];

            // add new todo items
            storage.push({
              [todoItem]: {
                ...checkForAvailableTodos,
                ...todoObject,
              },
            });

            filteredStorage = Array.from(storage).filter(
              (item) => item !== storage[todoList]
            );
            console.log(checkForAvailableTodos);
            // console.log(storage[todoList][todoItem]);
          }
        }
      }
      // get new data
      localStorage.setItem("todolist", JSON.stringify(filteredStorage));
      storage = JSON.parse(localStorage.getItem("todolist"));
      storage = storage ? storage : [];
      for (let todoList in Object.entries(storage)) {
        for (let todoItem in storage[todoList]) {
          if (e.target.id === `btn${todoItem}`) {
            displayTodos(todoItem, storage[todoList][todoItem]);
          }
        }
      }
    }
    // edit todo
    function editTodo(e) {
      let storage = JSON.parse(localStorage.getItem("todolist"));
      let currentTodo;
      storage = storage ? storage : [];
      for (let todoList in Object.entries(storage)) {
        for (let todoItem in storage[todoList]) {
          if (e.target.id === `edit-${storage[todoList][todoItem].id}`) {
            currentTodo = document.getElementById(
              `todo-${storage[todoList][todoItem].id}`
            );
            currentTodo.contentEditable = true;
            currentTodo.style.backgroundColor = "#b8b8b8";
            // if out of focus,done editing
            // if (activeElem !== currentTodo) {
            //   currentTodo.contentEditable = false;
            //   currentTodo.style.backgroundColor = "#0e0b11";
            // }
          }
        }
      }
    }
  }

  displayUi();

  //===========REUSED FUNCTIONS==================//
  // removes all child nodes except the selected one
  function removeAllChildNodes(parent) {
    while (parent.lastChild) {
      parent.removeChild(parent.lastChild);
    }
  }
})();
