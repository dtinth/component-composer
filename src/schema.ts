export interface ComponentDescription {
  type: string
  attributes: Record<string, string>
  slots: Record<string, ComponentDescription[]>
}

export interface UserInterfaceDescription extends ComponentDescription {}

export interface ComponentComposerSchema {
  components: Record<string, ComponentSchema>
}

export interface ComponentSchema {
  attributes: Record<string, AttributeSchema>
  slotNames: string[]
}

export interface AttributeSchema {
  defaultValue?: string
  type: 'text' | 'options' | 'boolean'
  options?: string[]
}
