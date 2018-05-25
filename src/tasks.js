import { createElement, priorityClass } from "./helpers"

const renderTasks = (board) => {
  const boardColumn = document.getElementById(board.id + "-tasks")

  const taskElements = composeTasks(board)
  boardColumn.appendChild(taskElements)
}

const composeTasks = (board) => {
  const fragment = document.createDocumentFragment()

  board.tasks.forEach((task) => {
    const media = createElement({ tag: "article", className: "media" })
    const left = createElement({ tag: "div", className: "media-left" })
    const content = createElement({ tag: "p", className: "media-content", content: task.name })
    const icons = createElement({ tag: "div", className: "media-right" })
    const checkbox = createElement({
      tag: "button",
      content: "✓",
      className: "button is-small " + priorityClass(task.priority)
    })

    left.appendChild(checkbox)
    media.appendChild(left)
    media.appendChild(content)
    media.appendChild(icons)
    fragment.appendChild(media)
  })

  return fragment
}

export default composeTasks