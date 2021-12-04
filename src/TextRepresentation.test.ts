import { parse, stringify } from './TextRepresentation'

it('works', async () => {
  const input = `
  Stack?direction=row&spacing=4&align=center
  .Button?colorScheme=teal&variant=solid
  ..Text?text=Button
  .Button?colorScheme=teal&variant=outline
  ..Text?text=Button
  .Button?colorScheme=teal&variant=ghost
  ..Text?text=Button
  .Button?colorScheme=teal&variant=link
  ..Text?text=Button
  `

  expect(parse(input)).toMatchInlineSnapshot(`
Object {
  "attributes": Object {},
  "slots": Object {
    "children": Array [
      Object {
        "attributes": Object {
          "align": "center",
          "direction": "row",
          "spacing": "4",
        },
        "slots": Object {
          "children": Array [
            Object {
              "attributes": Object {
                "colorScheme": "teal",
                "variant": "solid",
              },
              "slots": Object {
                "children": Array [
                  Object {
                    "attributes": Object {
                      "text": "Button",
                    },
                    "slots": Object {},
                    "type": "Text",
                  },
                ],
              },
              "type": "Button",
            },
            Object {
              "attributes": Object {
                "colorScheme": "teal",
                "variant": "outline",
              },
              "slots": Object {
                "children": Array [
                  Object {
                    "attributes": Object {
                      "text": "Button",
                    },
                    "slots": Object {},
                    "type": "Text",
                  },
                ],
              },
              "type": "Button",
            },
            Object {
              "attributes": Object {
                "colorScheme": "teal",
                "variant": "ghost",
              },
              "slots": Object {
                "children": Array [
                  Object {
                    "attributes": Object {
                      "text": "Button",
                    },
                    "slots": Object {},
                    "type": "Text",
                  },
                ],
              },
              "type": "Button",
            },
            Object {
              "attributes": Object {
                "colorScheme": "teal",
                "variant": "link",
              },
              "slots": Object {
                "children": Array [
                  Object {
                    "attributes": Object {
                      "text": "Button",
                    },
                    "slots": Object {},
                    "type": "Text",
                  },
                ],
              },
              "type": "Button",
            },
          ],
        },
        "type": "Stack",
      },
    ],
  },
  "type": "UserInterface",
}
`)
  expect(stringify(parse(input))).toMatchInlineSnapshot(`
"Stack?direction=row&spacing=4&align=center
.Button?colorScheme=teal&variant=solid
..Text?text=Button
.Button?colorScheme=teal&variant=outline
..Text?text=Button
.Button?colorScheme=teal&variant=ghost
..Text?text=Button
.Button?colorScheme=teal&variant=link
..Text?text=Button"
`)
})
