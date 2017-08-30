import Actions from './actions'

export default (invoke) => {
  window.invoke = invoke

  const AppID = 'commander-sam'

  const renderTodo = todo => `
    <div class="todo">
      <p class="title">${todo.title}</p>
      <p class="content">${todo.content}</p>
    </div>
  `

  const renderTodoList = (todolist = []) => `
    ${todolist.reduce((acc, todo) => acc + renderTodo(todo), '')}
  `

  window.Todo = () => {
    const titleTF = document.getElementById('titleTF')
    const contentTA = document.getElementById('contentTA')

    return {
      title: titleTF.value,
      content: contentTA.value,
    }
  }

  const renderApp = state => `
    <div class="panel">
      <section class="history-buttons">
        <h2>History:</h2>
        <button class="btn-back"
          onclick="invoke('${Actions.Back}')">Back</button>

        <button class="btn-forward"
          onclick="invoke('${Actions.Forward}')">Forward</button>
      </section>

      <section class="todolist">
        <h2>List:</h2>
        ${renderTodoList(state.todolist)}
      </section>

      <section class="adding-todo">
        <h2>Panel:</h2>
        <label for="title">title:</label>
        <input id="titleTF" type="text" value="">
        <br />
        <label for="content">content:</label>
        <input id="contentTA" type="textarea" value="">

        <button class="btn-add"
          onclick="invoke('${Actions.AddToDo}', Todo())">Add!</button>
      </section>
    </div
  `

  return {
    render: (state) => {
      let node = document.getElementById(AppID)
      if (!node) {
        node = document.createElement('div')
        node.id = AppID
        document.body.appendChild(node)
      }

      node.innerHTML = renderApp(state)
    },
  }
}
