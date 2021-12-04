import '@vaadin/vaadin-lumo-styles/presets/compact.js'
import '@vaadin/combo-box'
import '@vaadin/grid'
import '@vaadin/grid/vaadin-grid-tree-column'
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app'),
})

export default app
