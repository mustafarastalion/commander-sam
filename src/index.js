import Actions from './actions'
import Model from './model'
import Commander, {
  Command,
} from './commander'
import View from './view'

const commander = Commander()
const render = commander.invoke.bind(commander, Actions.RenderView)
const model = Model(render)
const view = View(commander.invoke)

commander.subscribe(
  Command(Actions.Startup, () => model.propose(Actions.Startup)),
  Command(Actions.Back, () => model.propose(Actions.Back)),
  Command(Actions.Forward, () => model.propose(Actions.Forward)),
  Command(Actions.AddToDo, todo => model.propose(Actions.AddToDo, todo)),
  Command(Actions.RenderView, state => view.render(state)),
)

commander.invoke(Actions.Startup)
