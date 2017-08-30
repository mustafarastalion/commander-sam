import Actions from './actions'

// MODEL = STORE

/**
 * Single source of truth.
 * Holds the state.
 * Mantains consistency of data.
 * Changes to the model are proposed rather that set.
 */
export default (render) => {
  const state = {
    todolist: [],
  }
  const cloneState = () => Object.assign({}, {
    todolist: [].concat(state.todolist),
  })

  const history = []
  let historyIndex = -1

  const update = (updateFn = () => {}) => {
    try {
      updateFn()
      historyIndex = history.length
      history.push(cloneState())

      render(state)
    } catch (err) {
      console.error('Model.update err:', err)
    }
  }

  return {
    propose(action, ...values) {
      switch (action) {
        case Actions.Startup:
          update()
          break

        case Actions.AddToDo:
          {
            const todo = values[0]
            if (todo.title && todo.content) {
              update(() => state.todolist.push(todo))
            } else {
              console.error('Model.propose AddTodo, incorrect todo:', todo)
            }
          }
          break

        case Actions.Back:
          historyIndex = Math.max(historyIndex - 1, 0)
          render(history[historyIndex])
          break

        case Actions.Forward:
          historyIndex = Math.min(historyIndex + 1, history.length - 1)
          render(history[historyIndex])
          break

        default:
          break
      }
    },

    printState() {
      console.log(`Model state: ${JSON.stringify(state)}\n`)
    },

    printHistory() {
      console.log(`Model history: ${JSON.stringify(history, null, 2)}\n`)
    },
  }
}
