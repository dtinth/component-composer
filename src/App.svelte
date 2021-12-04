<script lang="ts">
  import type { ComponentComposerSchema } from './schema'
  import type {
    GridDataProviderParams,
    GridDataProviderCallback,
  } from '@vaadin/grid'

  import { testUi } from './test-data'
  import { parse } from './TextRepresentation'

  let iframe: HTMLIFrameElement

  let availableComponents = []
  let comboBox: any
  let grid: any

  $: {
    if (comboBox) {
      comboBox.items = availableComponents
    }
  }
  $: {
    if (grid) {
      grid.dataProvider = dataProvider
      console.log(grid)
    }
  }

  function dataProvider(
    params: GridDataProviderParams<any>,
    callback: GridDataProviderCallback<any>,
  ) {
    // const { people, hierarchyLevelSize } = await getPeople({
    //   count: params.pageSize,
    //   startIndex: params.page * params.pageSize,
    //   managerId: params.parentItem ? params.parentItem.id : null,
    // })

    callback([{ name: 'Eiei', eiei: 1 }], 1)
  }

  function onMessage(e: MessageEvent) {
    if (!e.data) return
    if (typeof e.data !== 'object') return
    switch (e.data.type) {
      case 'component-composer-schema': {
        const schema = e.data.payload as ComponentComposerSchema
        availableComponents = Object.keys(schema.components)
          .filter((c) => c !== 'UserInterface')
          .map((c) => ({ name: c }))
        iframe.contentWindow.postMessage(
          {
            type: 'component-composer-ui',
            payload: parse(testUi),
          },
          '*',
        )
        break
      }
    }
  }
</script>

<svelte:window on:message={onMessage} />

<div class="preview">
  <iframe
    src="http://localhost:4041"
    title="Design system"
    bind:this={iframe}
  />
</div>
<div class="editor">
  <vaadin-grid bind:this={grid}>
    <vaadin-grid-tree-column path="name" item-has-children-path="eiei" />
  </vaadin-grid>

  <vaadin-combo-box
    placeholder="Add component…"
    item-value-path="name"
    item-label-path="name"
    bind:this={comboBox}
  />
</div>

<style>
  .preview {
    position: absolute;
    inset: 8px 8px 8px 320px;
  }
  .editor {
    position: absolute;
    inset: 8px auto 8px 8px;
    width: 304px;
  }
</style>
