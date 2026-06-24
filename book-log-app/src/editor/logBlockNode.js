import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import LogBlockNodeView from '../components/LogBlockNodeView'
import { readingBlockTypes } from '../data/readingBlockTypes'

function getDefaultFields(blockType) {
  const typeConfig = readingBlockTypes.find((item) => item.type === blockType)

  if (!typeConfig) {
    return {}
  }

  return Object.fromEntries(typeConfig.fields.map((field) => [field.name, '']))
}

export const LogBlockNode = Node.create({
  name: 'logBlock',

  group: 'block',

  atom: true,

  draggable: false,

  addAttributes() {
    return {
      blockType: {
        default: 'headline',
      },
      fields: {
        default: {},
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-log-block]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-log-block': '' })]
  },

  addCommands() {
    return {
      insertLogBlock:
        (blockType) =>
        ({ commands, state }) => {
          const content = [
            {
              type: this.name,
              attrs: {
                blockType,
                fields: getDefaultFields(blockType),
              },
            },
            {
              type: 'paragraph',
            },
          ]
          const insertPosition =
            state.selection.node?.type.name === this.name
              ? state.selection.to
              : null

          return insertPosition
            ? commands.insertContentAt(insertPosition, content)
            : commands.insertContent(content)
        },
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(LogBlockNodeView)
  },
})
