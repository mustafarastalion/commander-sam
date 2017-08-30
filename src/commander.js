// abstract command
export const Command = (action, execute = (...args) => {}) => ({
  execute,
  get action() {
    return action
  },
  toString: () => `action: ${action}, execute: ${execute.toString()}`,
})

export default () => {
  const commands = new Map()
  const history = []

  const subscribe = (...listOfCommands) =>
    listOfCommands.forEach(cmd => commands.set(cmd.action, cmd))

  const unsubscribe = action => commands.delete(action)

  const printSubscriptions = () => commands.forEach(cmd => cmd.toString())

  const printHistory = () =>
    history.forEach(cmd => JSON.stringify(cmd))

  const invoke = (action, ...args) => {
    if (commands.has(action)) {
      const cmd = commands.get(action)
      cmd.execute(...args)
      history.push(cmd)
    } else {
      console.error('Commander -> unsupported action: ', action)
    }
  }

  return {
    subscribe,
    unsubscribe,
    printSubscriptions,
    invoke,
    printHistory,
  }
}
