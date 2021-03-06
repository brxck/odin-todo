import { composeModal } from "./modal"
import { composeCreateTask } from "./tasks"
import { composeBoard } from "./boards"
import { composeMenu, composeProjects } from "./menu"
import projects from "./todo"
import { makeEditable } from "./edit"
import fontawesome from "@fortawesome/fontawesome"

const menuView = document.getElementById("menu-view")
const boardView = document.getElementById("board-view")
const titleView = document.getElementById("project-title")
const deleteProject = document.getElementById("delete-project")

let currentProject = "project0"

const renderProject = (projectId = currentProject.id) => {
  projects.save()

  currentProject = projects[projectId]
  renderBoards(currentProject)

  deleteProject.innerHTML = fontawesome.icon({ iconName: "trash" }).html
  deleteProject.firstChild.addEventListener("click", () => {
    if (projects.list.length <= 1) return

    currentProject.deleteProject()
    currentProject = projects.list[0]
    renderProjects()
    renderProject(currentProject.id)
  })
}

const renderModal = content => {
  const modal = composeModal(content)
  document.body.appendChild(modal)
}

const clearModal = () => {
  renderBoards(projects)
  document.getElementById("modal").remove()
  projects.save()
}

const renderBoards = () => {
  boardView.innerHTML = ""
  currentProject.boards.forEach(board => {
    let newBoard = composeBoard(board)
    boardView.appendChild(newBoard)
  })
  titleView.textContent = currentProject.name
  makeEditable(titleView, currentProject, "name")
  // Duplicate named event listeners are discarded
  titleView.addEventListener("focusout", renderProjects)
}

const renderMenu = () => {
  const menu = composeMenu(projects)
  menuView.appendChild(menu)
}

const renderProjects = () => {
  projects.save()
  const list = document.getElementById("project-list")
  const elements = composeProjects(projects)
  list.innerHTML = ""
  elements.forEach(element => list.appendChild(element))
}

const renderCreateTask = newTask => {
  const card = composeCreateTask(newTask)
  renderModal(card)
}

export {
  currentProject,
  renderProject,
  renderModal,
  clearModal,
  renderBoards,
  renderMenu,
  renderProjects,
  renderCreateTask
}
