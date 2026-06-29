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

function getBlockTypeConfig(blockType) {
  return readingBlockTypes.find((item) => item.type === blockType)
}

function getDefaultFields(blockType) {
  const blockTypeConfig = getBlockTypeConfig(blockType)

  if (!blockTypeConfig) {
    return {}
  }

  return Object.fromEntries(
    blockTypeConfig.fields.map((field) => [field.name, '']),
  )
}

function normalizeLogBlockNode(node) {
  const blockType = getBlockTypeConfig(node.attrs?.blockType)
    ? node.attrs.blockType
    : 'headline'
  const fields =
    node.attrs?.fields && typeof node.attrs.fields === 'object'
      ? node.attrs.fields
      : {}

  return {
    ...node,
    attrs: {
      ...node.attrs,
      blockType,
      fields: {
        ...getDefaultFields(blockType),
        ...fields,
      },
    },
  }
}

function createLogBlockContent(blockType) {
  return [
    {
      type: 'logBlock',
      attrs: {
        blockType,
        fields: getDefaultFields(blockType),
      },
    },
    {
      type: 'paragraph',
    },
  ]
}

function sanitizeContentNode(node) {
  if (!node || typeof node !== 'object') {
    return node
  }

  if (isBlankParagraph(node)) {
    return null
  }

  const sanitizedNode = {
    ...node,
    ...(node.content
      ? {
          content: node.content
            .map(sanitizeContentNode)
            .filter(Boolean),
        }
      : {}),
  }

  return node.type === 'logBlock' ? normalizeLogBlockNode(sanitizedNode) : sanitizedNode
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

  const fields =
    node.attrs?.fields && typeof node.attrs.fields === 'object'
      ? node.attrs.fields
      : {}

  return [
    node.text,
    ...Object.values(fields),
    collectContentText(node.content),
  ]
    .filter(Boolean)
    .join(' ')
}

function getLogFromEditor(editor) {
  const contentJson = sanitizeContentJson(editor.getJSON())

  return {
    body: collectContentText(contentJson),
    contentJson,
  }
}

function createInitialContent(log) {
  if (log?.contentJson) {
    return sanitizeContentJson(log.contentJson)
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

function scrollSelectionIntoEditorView(editor) {
  if (!editor || editor.isDestroyed) {
    return
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const scrollArea = editor.view.dom.closest('.editor-scroll-area')

      if (!scrollArea) {
        return
      }

      let selectionRect

      try {
        selectionRect = editor.view.coordsAtPos(editor.state.selection.from)
      } catch {
        return
      }

      const scrollAreaRect = scrollArea.getBoundingClientRect()
      const scrollPadding = 48

      if (selectionRect.top < scrollAreaRect.top + scrollPadding) {
        scrollArea.scrollTop -= scrollAreaRect.top + scrollPadding - selectionRect.top
      } else if (selectionRect.bottom > scrollAreaRect.bottom - scrollPadding) {
        scrollArea.scrollTop += selectionRect.bottom - (scrollAreaRect.bottom - scrollPadding)
      }
    })
  })
}

function BookLogEditor({ log, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
      }),
      LogBlockNode,
    ],
    shouldRerenderOnTransaction: true,
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
      onChange(getLogFromEditor(editor))
    },
    onBlur({ editor }) {
      onChange(getLogFromEditor(editor))
    },
  })

  const handleInsertBlock = (type) => {
    if (!editor || editor.isDestroyed || !getBlockTypeConfig(type)) {
      return
    }

    try {
      const didInsert = editor.chain().focus().insertLogBlock(type).run()

      if (!didInsert) {
        editor.commands.insertContentAt(
          editor.state.doc.content.size,
          createLogBlockContent(type),
        )
      }

      scrollSelectionIntoEditorView(editor)
      onChange(getLogFromEditor(editor))
    } catch (error) {
      console.error(error)
      editor.commands.insertContentAt(
        editor.state.doc.content.size,
        createLogBlockContent(type),
      )

      scrollSelectionIntoEditorView(editor)
      onChange(getLogFromEditor(editor))
    }
  }

  return (
    <>
      <div className="writing-editor-toolbar">
        <h2 className="writing-editor-label">Note</h2>

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
      </div>

      <EditorContent
        className="editor-scroll-area"
        editor={editor}
        onClick={() => scrollSelectionIntoEditorView(editor)}
        onFocusCapture={() => scrollSelectionIntoEditorView(editor)}
        onMouseUp={() => scrollSelectionIntoEditorView(editor)}
      />
    </>
  )
}

export default BookLogEditor
