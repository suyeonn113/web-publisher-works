export const mockUser = {
  id: 'user-1',
  nickname: '수연',
  email: 'suyeon@example.com',
  photoURL: 'https://i.pravatar.cc/160?img=47',
  createdAt: '2026-06-01',
}

export const mockParticipants = [
  mockUser,
  {
    id: 'user-2',
    nickname: '민지',
    email: 'minji@example.com',
    photoURL: 'https://i.pravatar.cc/160?img=32',
    createdAt: '2026-06-03',
  },
  {
    id: 'user-3',
    nickname: '도윤',
    email: 'doyun@example.com',
    photoURL: 'https://i.pravatar.cc/160?img=12',
    createdAt: '2026-06-05',
  },
  {
    id: 'user-4',
    nickname: '하린',
    email: 'harin@example.com',
    photoURL: 'https://i.pravatar.cc/160?img=25',
    createdAt: '2026-06-07',
  },
]

export const mockBooks = [
  {
    id: 'book-1',
    title: '데미안',
    author: '헤르만 헤세',
    publisher: '민음사',
    thumbnail: 'https://covers.openlibrary.org/b/isbn/9788937460449-L.jpg',
    description: '자기 자신에게 이르는 길을 찾아가는 성장과 내면의 이야기.',
    isbn: '9788937460449',
    createdAt: '2026-06-02',
  },
  {
    id: 'book-2',
    title: '아몬드',
    author: '손원평',
    publisher: '창비',
    thumbnail: 'https://covers.openlibrary.org/b/isbn/9788936434267-L.jpg',
    description: '감정을 느끼기 어려운 소년이 타인과 관계를 배워가는 소설.',
    isbn: '9788936434267',
    createdAt: '2026-06-04',
  },
  {
    id: 'book-3',
    title: '불편한 편의점',
    author: '김호연',
    publisher: '나무옆의자',
    thumbnail: 'https://covers.openlibrary.org/b/isbn/9791161571188-L.jpg',
    description: '서울역 근처 편의점을 배경으로 이어지는 따뜻한 사람들의 이야기.',
    isbn: '9791161571188',
    createdAt: '2026-06-06',
  },
  {
    id: 'book-4',
    title: '1984',
    author: '조지 오웰',
    publisher: '민음사',
    thumbnail: 'https://covers.openlibrary.org/b/isbn/9788937460777-L.jpg',
    description: '감시와 통제가 일상이 된 사회를 그린 디스토피아 고전.',
    isbn: '9788937460777',
    createdAt: '2026-06-08',
  },
  {
    id: 'book-5',
    title: '나만의 독서 노트',
    author: '직접 입력',
    publisher: '개인 기록',
    thumbnail: '',
    description: '표지가 없는 직접 등록 책 UI를 확인하기 위한 임시 데이터.',
    isbn: '',
    createdAt: '2026-06-10',
  },
]

export const mockMyLibrary = [
  {
    id: 'library-1',
    userId: 'user-1',
    bookId: 'book-1',
    status: 'reading',
    rating: 4,
    syncEnabled: true,
    source: 'personal',
    viewType: 'cover',
    deletedAt: null,
    createdAt: '2026-06-03',
  },
  {
    id: 'library-2',
    userId: 'user-1',
    bookId: 'book-2',
    status: 'finished',
    rating: 5,
    syncEnabled: false,
    source: 'group',
    viewType: 'cover',
    deletedAt: null,
    createdAt: '2026-06-05',
  },
  {
    id: 'library-3',
    userId: 'user-1',
    bookId: 'book-3',
    status: 'paused',
    rating: 3,
    syncEnabled: true,
    source: 'group',
    viewType: 'text',
    deletedAt: null,
    createdAt: '2026-06-07',
  },
  {
    id: 'library-4',
    userId: 'user-1',
    bookId: 'book-4',
    status: 'reading',
    rating: 0,
    syncEnabled: false,
    source: 'personal',
    viewType: 'cover',
    deletedAt: null,
    createdAt: '2026-06-09',
  },
]

export const mockGroups = [
  {
    id: 'group-1',
    name: '수요일 밤 독서모임',
    code: 'WED-BOOK',
    ownerId: 'user-1',
    memberIds: ['user-1', 'user-2', 'user-3'],
    description: '격주 수요일 밤에 같은 책을 읽고 질문을 나누는 모임.',
    createdAt: '2026-06-06',
  },
  {
    id: 'group-2',
    name: '느린 독서 클럽',
    code: 'SLOW-READ',
    ownerId: 'user-2',
    memberIds: ['user-1', 'user-2', 'user-4'],
    description: '분량보다 오래 기억나는 문장을 중심으로 읽는 모임.',
    createdAt: '2026-06-12',
  },
]

export const mockGroupBooks = [
  {
    id: 'group-book-1',
    groupId: 'group-1',
    bookId: 'book-2',
    meetingDate: '2026-06-26',
    participantIds: ['user-1', 'user-2', 'user-3'],
    syncEnabledByUserIds: ['user-1', 'user-3'],
    createdAt: '2026-06-13',
  },
  {
    id: 'group-book-2',
    groupId: 'group-2',
    bookId: 'book-3',
    meetingDate: '2026-07-03',
    participantIds: ['user-1', 'user-2', 'user-4'],
    syncEnabledByUserIds: ['user-1'],
    createdAt: '2026-06-16',
  },
]

export const mockReadingBlocks = [
  {
    id: 'block-1',
    userId: 'user-1',
    bookId: 'book-1',
    type: 'shortReview',
    content: '내 안의 낯선 목소리를 외면하지 않는 일이 중요하다고 느꼈다.',
    createdAt: '2026-06-14',
  },
  {
    id: 'block-2',
    userId: 'user-1',
    bookId: 'book-1',
    type: 'impressive',
    content: '싱클레어가 자기만의 세계를 의식하기 시작하는 장면.',
    createdAt: '2026-06-14',
  },
  {
    id: 'block-3',
    userId: 'user-1',
    bookId: 'book-2',
    type: 'question',
    content: '감정을 배운다는 것은 타인의 감정을 흉내 내는 것과 어떻게 다를까?',
    createdAt: '2026-06-15',
  },
  {
    id: 'block-4',
    userId: 'user-1',
    bookId: 'book-2',
    type: 'thought',
    content: '상처를 설명하는 방식이 과하지 않아서 더 오래 남았다.',
    createdAt: '2026-06-15',
  },
  {
    id: 'block-5',
    userId: 'user-1',
    bookId: 'book-3',
    type: 'discussion',
    content: '친절은 의도보다 지속성이 더 중요한지 이야기해보고 싶다.',
    createdAt: '2026-06-17',
  },
  {
    id: 'block-6',
    userId: 'user-1',
    bookId: 'book-4',
    type: 'quote',
    content: '자유는 둘 더하기 둘은 넷이라고 말할 수 있는 자유다.',
    createdAt: '2026-06-18',
  },
  {
    id: 'block-7',
    userId: 'user-1',
    bookId: 'book-4',
    type: 'keyword',
    content: '감시, 언어, 기억, 권력',
    createdAt: '2026-06-18',
  },
  {
    id: 'block-8',
    userId: 'user-1',
    bookId: 'book-1',
    type: 'range',
    content: '1장부터 3장까지',
    createdAt: '2026-06-19',
  },
]

export const mockMeetingTemplates = [
  {
    id: 'template-1',
    order: 1,
    type: 'overall',
    title: '전체적인 소감',
    prompt: '책을 읽고 남은 첫 느낌을 적어보세요.',
  },
  {
    id: 'template-2',
    order: 2,
    type: 'question',
    title: '궁금했던 점',
    prompt: '읽으면서 이해가 필요했거나 묻고 싶은 점을 남겨보세요.',
  },
  {
    id: 'template-3',
    order: 3,
    type: 'discussion',
    title: '함께 토론할 주제',
    prompt: '다른 사람들과 나누고 싶은 주제를 적어보세요.',
  },
  {
    id: 'template-4',
    order: 4,
    type: 'impressive',
    title: '인상 깊었던 부분',
    prompt: '문장, 장면, 인물, 개념 중 기억나는 부분을 기록해보세요.',
  },
]

export const mockMeetingNotes = [
  {
    id: 'meeting-note-1',
    groupBookId: 'group-book-1',
    templateId: 'template-1',
    userId: 'user-1',
    content: '감정을 표현하지 못하는 인물이 오히려 관계를 더 선명하게 보여줬다.',
    createdAt: '2026-06-20',
  },
  {
    id: 'meeting-note-2',
    groupBookId: 'group-book-1',
    templateId: 'template-2',
    userId: 'user-2',
    content: '윤재가 느끼는 결핍은 개인의 문제인지 사회의 문제인지 궁금했다.',
    createdAt: '2026-06-20',
  },
  {
    id: 'meeting-note-3',
    groupBookId: 'group-book-1',
    templateId: 'template-3',
    userId: 'user-3',
    content: '공감은 타고나는 능력인지 배울 수 있는 태도인지 이야기하고 싶다.',
    createdAt: '2026-06-20',
  },
  {
    id: 'meeting-note-4',
    groupBookId: 'group-book-1',
    templateId: 'template-4',
    userId: 'user-1',
    content: '곤이와 윤재가 서로의 방식으로 가까워지는 장면이 오래 남았다.',
    createdAt: '2026-06-20',
  },
  {
    id: 'meeting-note-5',
    groupBookId: 'group-book-2',
    templateId: 'template-1',
    userId: 'user-1',
    content: '편의점이라는 작은 공간이 사람을 회복시키는 장소처럼 느껴졌다.',
    createdAt: '2026-06-21',
  },
  {
    id: 'meeting-note-6',
    groupBookId: 'group-book-2',
    templateId: 'template-2',
    userId: 'user-2',
    content: '독고라는 인물이 주변 사람들에게 주는 변화가 왜 설득력 있었을까?',
    createdAt: '2026-06-21',
  },
  {
    id: 'meeting-note-7',
    groupBookId: 'group-book-2',
    templateId: 'template-3',
    userId: 'user-4',
    content: '일상적인 친절이 삶의 방향을 바꿀 수 있는지 이야기해보고 싶다.',
    createdAt: '2026-06-21',
  },
  {
    id: 'meeting-note-8',
    groupBookId: 'group-book-2',
    templateId: 'template-4',
    userId: 'user-1',
    content: '밤의 편의점에서 사람들이 잠깐 쉬어가는 분위기가 좋았다.',
    createdAt: '2026-06-21',
  },
]

export const mockTrashBooks = [
  {
    id: 'trash-1',
    userId: 'user-1',
    bookId: 'book-5',
    deletedAt: '2026-06-22',
    restoreUntil: '2026-07-22',
    source: 'personal',
  },
]

export const mockStats = {
  totalBooks: 5,
  myLibraryCount: 4,
  readingCount: 2,
  finishedCount: 1,
  pausedCount: 1,
  groupCount: 2,
  trashCount: 1,
}

export const mockRecentActivities = [
  {
    id: 'activity-1',
    type: 'note-created',
    userId: 'user-1',
    bookId: 'book-1',
    groupId: null,
    message: '데미안에 한줄평을 남겼어요.',
    createdAt: '2026-06-19',
  },
  {
    id: 'activity-2',
    type: 'group-joined',
    userId: 'user-1',
    bookId: null,
    groupId: 'group-2',
    message: '느린 독서 클럽에 참여했어요.',
    createdAt: '2026-06-20',
  },
  {
    id: 'activity-3',
    type: 'meeting-note-created',
    userId: 'user-1',
    bookId: 'book-3',
    groupId: 'group-2',
    message: '불편한 편의점 모임 기록을 작성했어요.',
    createdAt: '2026-06-21',
  },
]

export const mockReadingStatuses = [
  { value: 'reading', label: '읽는 중' },
  { value: 'finished', label: '완독' },
  { value: 'paused', label: '보류' },
]

export const mockViewOptions = [
  { value: 'cover', label: '표지 보기' },
  { value: 'text', label: '글자 보기' },
]

export const mockEmptyStates = {
  library: {
    title: '아직 저장한 책이 없어요.',
    description: '검색하거나 직접 등록해서 첫 책을 서재에 담아보세요.',
  },
  groups: {
    title: '참여 중인 독서모임이 없어요.',
    description: '모임을 만들거나 공유받은 모임 코드로 참여할 수 있어요.',
  },
  notes: {
    title: '아직 기록이 없어요.',
    description: '한줄평부터 가볍게 남겨보세요.',
  },
  trash: {
    title: '휴지통이 비어 있어요.',
    description: '삭제한 책은 30일 동안 이곳에 보관돼요.',
  },
}
