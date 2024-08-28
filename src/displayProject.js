export default function displayProject(
  projectsArray,
  dataProjectName,
  expandStatus,
) {
  const mainContent = document.querySelector(".main-content");
  const projectDiv = document.createElement("div");
  projectDiv.classList.add("project-div");
  const projectHeader = document.createElement("h1");

  // Iterating through the projectsArray and creating it's main-content page if the projectName matches
  projectsArray.forEach((element) => {
    if (element.projectName === dataProjectName) {
      mainContent.innerHTML = "";
      projectHeader.textContent = `${element.projectName}`;
      projectHeader.style.cssText =
        "text-align: center; text-transform: capitalize; font-size: 3rem;";
      projectDiv.appendChild(projectHeader);

      // Iterating through the todolist of the project and displaying all the todos
      element.todoList.forEach((todo) => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo-div");
        todoDiv.setAttribute("data-index", element.todoList.indexOf(todo));
        const titlePara = document.createElement("p");
        const descriptionPara = document.createElement("p");
        const dueDatePara = document.createElement("p");

        titlePara.textContent = `${todo.title}`;
        descriptionPara.textContent = `${todo.description}`;
        descriptionPara.classList.add("description-para");
        dueDatePara.textContent = `${todo.dueDate}`;

        // First row contains the title and dueDate paras
        const todoFirstRow = document.createElement("div");
        todoFirstRow.classList.add("todo-first-row");
        todoFirstRow.append(titlePara, dueDatePara);

        // Expand button will be used to display the description para and other task buttons
        const expandBtn = document.createElement("button");
        expandBtn.setAttribute("data-btn", element.todoList.indexOf(todo));
        expandBtn.setAttribute("type", "button");
        expandBtn.classList.add("expand-btn");
        expandBtn.style.cssText = "visibility: hidden;";

        // Edit button to edit the details of the task
        const editTodoBtn = document.createElement("button");
        editTodoBtn.classList.add("edit-todo-btn");
        editTodoBtn.setAttribute("type", "button");
        editTodoBtn.setAttribute(
          "data-edit-btn",
          element.todoList.indexOf(todo),
        );
        editTodoBtn.setAttribute("data-project-name", element.projectName);

        // Delete button to delete the task
        const deleteTodoBtn = document.createElement("button");
        deleteTodoBtn.classList.add("delete-todo-btn");
        deleteTodoBtn.setAttribute("type", "button");
        deleteTodoBtn.setAttribute(
          "data-delete-btn",
          element.todoList.indexOf(todo),
        );
        deleteTodoBtn.setAttribute("data-project-name", element.projectName);

        // Completed checkbox to set the completedStatus of a task
        const completedStatusLabel = document.createElement("label");
        completedStatusLabel.classList.add("switch");
        const slider = document.createElement("span");
        slider.classList.add("slider");
        const completedCheckBox = document.createElement("input");
        completedCheckBox.classList.add("completed-todo-btn");
        completedCheckBox.setAttribute("type", "checkbox");
        completedCheckBox.setAttribute(
          "data-completed-btn",
          element.todoList.indexOf(todo),
        );
        completedCheckBox.setAttribute(
          "data-project-name",
          element.projectName,
        );
        if (todo.completedStatus === true) {
          completedCheckBox.checked = true;
          todoDiv.style.cssText = "text-decoration: line-through;";
        } else if (todo.completedStatus === false) {
          completedCheckBox.checked = false;
        }
        completedStatusLabel.append(completedCheckBox, slider);

        // Setting box-shadow inset in different colors based on priority
        if (todo.priority === "p1") {
          todoDiv.style.cssText +=
            "box-shadow: inset 1rem 0rem rgb(200, 0, 0);";
        } else if (todo.priority === "p2") {
          todoDiv.style.cssText += "box-shadow: inset 1rem 0 rgb(255, 187, 0);";
        } else if (todo.priority === "p3") {
          todoDiv.style.cssText += "box-shadow: inset 1rem 0 rgb(0, 150, 0);";
        } else {
          todoDiv.style.cssText += "box-shadow: inset 1rem 0 gray;";
        }

        // Adding all the buttons to a button div
        const buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("buttons-div");
        buttonsDiv.append(completedStatusLabel, editTodoBtn, deleteTodoBtn);

        // Adding the hidden details to todoExtension
        const todoExtension = document.createElement("div");
        todoExtension.classList.add("todo-extension-div");
        todoExtension.setAttribute(
          "data-extension-index",
          element.todoList.indexOf(todo),
        );
        if (expandStatus) {
          todoExtension.style.cssText = "display: flex;";
        } else {
          todoExtension.style.cssText = "display: none;";
        }
        todoExtension.append(descriptionPara, buttonsDiv);

        // Adding everything to todoDiv and that to projectDiv and then to mainContent
        if (
          element.projectName === "today" ||
          element.projectName === "upcoming"
        ) {
          const todoProject = document.createElement("p");
          todoProject.textContent = `# ${todo.project}`;
          buttonsDiv.remove();
          todoProject.style.cssText =
            "position: relative; top: -10px; left: -10px;";
          todoDiv.append(todoProject, todoFirstRow, todoExtension, expandBtn);
        } else {
          todoDiv.append(todoFirstRow, todoExtension, expandBtn);
        }
        projectDiv.appendChild(todoDiv);
      });
      mainContent.appendChild(projectDiv);
    }
  });
}
