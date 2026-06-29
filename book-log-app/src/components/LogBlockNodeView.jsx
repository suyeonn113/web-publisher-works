import { useEffect, useLayoutEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import { NodeViewWrapper } from '@tiptap/react'
import { readingBlockTypes } from '../data/readingBlockTypes'

function AutoResizeTextarea({ value, onChange, ...props }) {
  const textareaRef = useRef(null)

  const resizeTextarea = () => {
    const textarea = textareaRef.current

    if (!textarea) {
      return
    }

    const style = window.getComputedStyle(textarea)
    const lineHeight = Number.parseFloat(style.lineHeight) || 20
    const paddingBlock =
      Number.parseFloat(style.paddingTop) + Number.parseFloat(style.paddingBottom)
    const minHeight = lineHeight + paddingBlock

    textarea.style.height = 'auto'
    textarea.style.height = `${Math.max(textarea.scrollHeight, minHeight)}px`
  }

  useLayoutEffect(() => {
    resizeTextarea()
  }, [value])

  const handleChange = (event) => {
    onChange(event)
    requestAnimationFrame(resizeTextarea)
  }

  return (
    <textarea
      {...props}
      ref={textareaRef}
      value={value}
      rows="1"
      onChange={handleChange}
    />
  )
}

function AutoResizeInput({ value, onChange, placeholder = '', ...props }) {
  const inputRef = useRef(null)
  const mirrorRef = useRef(null)

  const resizeInput = () => {
    const input = inputRef.current
    const mirror = mirrorRef.current

    if (!input || !mirror) {
      return
    }

    mirror.textContent = value || placeholder
    input.style.width = `${mirror.offsetWidth}px`
  }

  useEffect(() => {
    resizeInput()
  }, [value])

  const handleChange = (event) => {
    onChange(event)
    requestAnimationFrame(resizeInput)
  }

  return (
    <>
      <input
        {...props}
        ref={inputRef}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
      <span ref={mirrorRef} className="auto-size-input-mirror" aria-hidden="true" />
    </>
  )
}

function LogBlockNodeView({ node, updateAttributes, deleteNode, selected }) {
  const blockType = readingBlockTypes.find(
    (item) => item.type === node.attrs.blockType,
  )

  if (!blockType) {
    return null
  }

  const fields =
    node.attrs.fields && typeof node.attrs.fields === 'object'
      ? node.attrs.fields
      : {}
  const getBlockClassName = (className) =>
    selected ? `${className} is-selected` : className

  const normalizeBlankValue = (value) => (value.trim() ? value : '')

  const handleFieldChange = (fieldName, value) => {
    updateAttributes({
      fields: {
        ...fields,
        [fieldName]: value,
      },
    })
  }

  if (node.attrs.blockType === 'headline') {
    return (
      <NodeViewWrapper className={getBlockClassName('log-headline')} data-log-block="">
        <AutoResizeTextarea
          className="log-headline-title"
          value={fields.title || ''}
          placeholder="Headline"
          onChange={(event) =>
            handleFieldChange('title', normalizeBlankValue(event.target.value))
          }
        />
        <button type="button" className="log-block-delete" onClick={deleteNode}>
          <Icon className="app-icon--compact-action" icon="fluent:dismiss-24-regular" />
        </button>
      </NodeViewWrapper>
    )
  }

  if (node.attrs.blockType === 'clip') {
    const locationValue = fields.location || ''
    const locationPlaceholder = 'Location memo'

    return (
      <NodeViewWrapper className={getBlockClassName('log-clip')} data-log-block="">
        <div className="log-clip-mark">
          <Icon className="app-icon--inline" icon="fluent:clipboard-text-24-regular" />
          <span>Clip</span>
        </div>

        <AutoResizeTextarea
          className="log-clip-quote"
          value={fields.content || ''}
          placeholder="Quote"
          onChange={(event) =>
            handleFieldChange('content', normalizeBlankValue(event.target.value))
          }
        />

        <div className="log-clip-location-field">
          <AutoResizeInput
            className="log-clip-location"
            type="text"
            value={locationValue}
            placeholder={locationPlaceholder}
            onChange={(event) =>
              handleFieldChange('location', normalizeBlankValue(event.target.value))
            }
          />
        </div>

        <div className="log-clip-memo-label">
          <span>Thought</span>
        </div>

        <AutoResizeTextarea
          className="log-clip-memo"
          value={fields.memo || ''}
          placeholder="Why this stayed with me"
          onChange={(event) =>
            handleFieldChange('memo', normalizeBlankValue(event.target.value))
          }
        />

        <button type="button" className="log-block-delete" onClick={deleteNode}>
          <Icon className="app-icon--compact-action" icon="fluent:dismiss-24-regular" />
        </button>
      </NodeViewWrapper>
    )
  }

  if (node.attrs.blockType === 'topic') {
    return (
      <NodeViewWrapper className={getBlockClassName('log-topic')} data-log-block="">
        <div className="log-topic-mark">
          <Icon
            className="app-icon--inline"
            icon="fluent:chat-bubbles-question-24-regular"
          />
          <span>Topic</span>
        </div>

        <AutoResizeTextarea
          className="log-topic-question"
          value={fields.topic || ''}
          placeholder="Topic"
          onChange={(event) =>
            handleFieldChange('topic', normalizeBlankValue(event.target.value))
          }
        />

        <div className="log-topic-answer-label">
          <span>Thought</span>
        </div>

        <AutoResizeTextarea
          className="log-topic-answer"
          value={fields.answer || ''}
          placeholder="My thoughts"
          onChange={(event) =>
            handleFieldChange('answer', normalizeBlankValue(event.target.value))
          }
        />

        <button type="button" className="log-block-delete" onClick={deleteNode}>
          <Icon className="app-icon--compact-action" icon="fluent:dismiss-24-regular" />
        </button>
      </NodeViewWrapper>
    )
  }

  if (node.attrs.blockType === 'spacer') {
    return (
      <NodeViewWrapper
        className={getBlockClassName('log-spacer')}
        data-log-block=""
        aria-label="Space"
        tabIndex={0}
      >
        <span className="sr-only">Space</span>
        <button type="button" className="log-block-delete" onClick={deleteNode}>
          <Icon className="app-icon--compact-action" icon="fluent:dismiss-24-regular" />
        </button>
      </NodeViewWrapper>
    )
  }

  return (
    <NodeViewWrapper className={getBlockClassName('log-block')} data-log-block="">
      <div className="log-block-header">
        <strong>{blockType.label}</strong>
        <button type="button" className="log-block-delete" onClick={deleteNode}>
          <Icon className="app-icon--compact-action" icon="fluent:dismiss-24-regular" />
        </button>
      </div>

      <div className="log-block-fields">
        {blockType.fields.map((field) => {
          const value = fields[field.name] || ''

          return (
            <label className="log-field" key={field.name}>
              <span>{field.label}</span>
              {field.input === 'textarea' ? (
                <AutoResizeTextarea
                  value={value}
                  onChange={(event) =>
                    handleFieldChange(
                      field.name,
                      normalizeBlankValue(event.target.value),
                    )
                  }
                />
              ) : (
                <input
                  type="text"
                  value={value}
                  onChange={(event) =>
                    handleFieldChange(field.name, event.target.value)
                  }
                />
              )}
            </label>
          )
        })}
      </div>
    </NodeViewWrapper>
  )
}

export default LogBlockNodeView
