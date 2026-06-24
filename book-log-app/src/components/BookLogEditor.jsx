import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Icon } from '@iconify/react'
import { readingBlockTypes } from '../data/readingBlockTypes'
import { LogBlockNode } from '../editor/logBlockNode'

function isBlankParagraph(node) {
  return node?.type === 'paragraph' && !(node.content || [])
    .map((child) => child.text || '')
    .join('')
    .trim()
}

function sanitizeContentNode(node) {
  if (!node || typeof node !== 'object') {
    return node
  }

  if (isBlankParagraph(node)) {
    return null
  }

  const content = (node.content || [])
    .map(sanitizeContentNode)
    .filter(Boolean)

  return {
    ...node,
    ...(node.content ? { content } : {}),
  }
}

function sanitizeContentJson(contentJson) {
  const content = (contentJson?.content || [])
    .map(sanitizeContentNode)
    .filter(Boolean)

  return {
    type: 'doc',
    content: content.length
      ? content
      : [
          {
            type: 'paragraph',
          },
        ],
  }
}

function collectContentText(node) {
  if (!node) {
    return ''
  }

  if (typeof node === 'string') {
    return node
  }

  if (Array.isArray(node)) {
    return node.map(collectContentText).join(' ')
  }

  if (typeof node !== 'object') {
    return ''
  }

  return [
    node.text,
    ...Object.values(node.attrs?.fields || {}),
    collectContentText(node.content),
  ]
    .filter(Boolean)
    .join(' ')
}

function createInitialContent(log) {
  if (log?.contentJson) {
    return log.contentJson
  }

  return {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: log?.body ? [{ type: 'text', text: log.body }] : [],
      },
    ],
  }
}

function BookLogEditor({ log, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
      }),
      LogBlockNode,
    ],
    content: createInitialContent(log),
    editorProps: {
      attributes: {
        class: 'tiptap-editor',
      },
      handleTextInput(view, from, to, text) {
        const parent = view.state.selection.$from.parent
        const isBlankCurrentParagraph =
          parent.type.name === 'paragraph' && !parent.textContent.trim()

        return isBlankCurrentParagraph && !text.trim()
      },
    },
    onUpdate({ editor }) {
      const contentJson = sanitizeContentJson(editor.getJSON())

      onChange({
        body: collectContentText(contentJson),
        contentJson,
      })
    },
    onBlur({ editor }) {
      const currentContentJson = editor.getJSON()
      const contentJson = sanitizeContentJson(currentContentJson)

      if (JSON.stringify(contentJson) !== JSON.stringify(currentContentJson)) {
        editor.commands.setContent(contentJson, false)
      }

      onChange({
        body: collectContentText(contentJson),
        contentJson,
      })
    },
  })

  const handleInsertBlock = (type) => {
    editor?.chain().focus().insertLogBlock(type).run()
  }

  return (
    <>
      <EditorContent editor={editor} />

      <div className="block-picker">
        {readingBlockTypes.map((blockType) => (
          <button
            type="button"
            key={blockType.type}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => handleInsertBlock(blockType.type)}
          >
            <Icon className="app-icon--tool" icon={blockType.icon} />
            <span className="sr-only">{blockType.label}</span>
          </button>
        ))}
      </div>
    </>
  )
}

export default BookLogEditor
