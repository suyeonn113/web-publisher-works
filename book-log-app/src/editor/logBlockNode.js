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

function getInsertPosition(state, nodeTypeName) {
  const { selection } = state

  if (selection.node?.type.name === nodeTypeName) {
    return selection.to
  }

  for (let depth = selection.$from.depth; depth > 0; depth -= 1) {
    if (selection.$from.node(depth).isBlock) {
      return selection.$from.after(depth)
    }
  }

  return selection.to
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
          return commands.insertContentAt(
            getInsertPosition(state, this.name),
            content,
          )
        },
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(LogBlockNodeView)
  },
})
