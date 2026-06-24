export const readingBlockTypes = [
  {
    type: 'headline',
    label: 'Headline',
    icon: 'fluent:text-header-1-24-regular',
    fields: [
      { name: 'title', label: 'Headline', input: 'input' },
      { name: 'memo', label: 'Memo', input: 'textarea' },
    ],
  },
  {
    type: 'clip',
    label: 'Clip',
    icon: 'fluent:clipboard-text-24-regular',
    fields: [
      { name: 'content', label: 'Clip', input: 'textarea' },
      { name: 'location', label: 'Location memo', input: 'input' },
      { name: 'memo', label: 'Memo', input: 'textarea' },
    ],
  },
  {
    type: 'topic',
    label: 'Topic',
    icon: 'fluent:chat-bubbles-question-24-regular',
    fields: [
      { name: 'topic', label: 'Topic', input: 'textarea' },
      { name: 'answer', label: 'Answer', input: 'textarea' },
    ],
  },
  {
    type: 'spacer',
    label: 'Space',
    icon: 'fluent:resize-large-24-regular',
    fields: [],
  },
]

export function createReadingBlock(type) {
  const blockType = readingBlockTypes.find((item) => item.type === type)

  return {
    id: crypto.randomUUID(),
    type,
    fields: Object.fromEntries(
      blockType.fields.map((field) => [field.name, '']),
    ),
    order: Date.now(),
    isNew: true,
  }
}
