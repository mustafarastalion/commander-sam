# commander-sam

DIY MVC Framework inspired by SAM pattern for my Coding Dojo.

This is an example of Todo list application (obviously!).

It separates concerns with Commands, Model and View.
Has Redux inspired time travel, and component rendering inspired by React.

It's basically a DIY way of building simple web apps without 
reaching for heavy React/Redux libraries. 

## USAGE

npm start

```javascript
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
```
