import type { ComponentDescription, UserInterfaceDescription } from './schema'

export function parse(text: string): UserInterfaceDescription {
  const root: UserInterfaceDescription = {
    type: 'UserInterface',
    attributes: {},
    slots: { children: [] },
  }
  const stack: ComponentDescription['slots'][] = [root.slots]
  const lines = text
    .split(/\s+/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
  const regex = /^(\.*)([^:]+:)?([^?]+)(\?[^]*)?$/
  for (const line of lines) {
    const match = line.match(regex)
    if (!match) continue
    try {
      const depth = match[1].length
      const slotName = match[2] ? match[2].slice(0, -1) : 'children'
      const type = match[3]
      const attributes = new URLSearchParams((match[4] || '').slice(1))
      const component: ComponentDescription = {
        type,
        attributes: Object.fromEntries(attributes.entries()),
        slots: {},
      }
      const parent = stack[depth][slotName] || (stack[depth][slotName] = [])
      parent.push(component)
      stack.length = depth + 1
      stack.push(component.slots)
    } catch (error) {
      console.error(error)
    }
  }
  return root
}

export function stringify(description: UserInterfaceDescription): string {
  const lines: string[] = []
  const serialize = (
    component: ComponentDescription,
    prefix: string,
    slotName: string,
  ) => {
    lines.push(
      prefix +
        (slotName === 'children' ? '' : slotName + ':') +
        component.type +
        '?' +
        new URLSearchParams(component.attributes).toString(),
    )
    serializeChildren(component.slots, prefix + '.')
  }
  const serializeChildren = (
    slots: ComponentDescription['slots'],
    prefix = '',
  ) => {
    for (const [slot, components] of Object.entries(slots)) {
      for (const component of components) {
        serialize(component, prefix, slot)
      }
    }
  }
  serializeChildren(description.slots)
  return lines.join('\n')
}
