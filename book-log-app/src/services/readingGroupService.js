import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '../firebase/firebase'

function createGroupCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase()
}

function normalizeGroupCode(code) {
  return code.trim().toUpperCase()
}

export async function createReadingGroup(user, name) {
  const groupRef = doc(collection(db, 'readingGroups'))
  const trimmedName = name.trim()

  if (!trimmedName) {
    throw new Error('Group name is required')
  }

  await setDoc(groupRef, {
    id: groupRef.id,
    name: trimmedName,
    code: createGroupCode(),
    ownerId: user.uid,
    memberIds: [user.uid],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  return groupRef.id
}

export async function joinReadingGroupByCode(user, code) {
  const groupsQuery = query(
    collection(db, 'readingGroups'),
    where('code', '==', normalizeGroupCode(code)),
  )
  const groupsSnap = await getDocs(groupsQuery)

  if (groupsSnap.empty) {
    throw new Error('Group not found')
  }

  const groupDoc = groupsSnap.docs[0]

  await updateDoc(groupDoc.ref, {
    memberIds: arrayUnion(user.uid),
    updatedAt: serverTimestamp(),
  })

  return groupDoc.id
}

export async function getMyReadingGroups(user) {
  const groupsQuery = query(
    collection(db, 'readingGroups'),
    where('memberIds', 'array-contains', user.uid),
  )
  const groupsSnap = await getDocs(groupsQuery)

  return groupsSnap.docs
    .map((item) => item.data())
    .sort((a, b) => {
      const aCreatedAt = a.createdAt?.toMillis?.() || 0
      const bCreatedAt = b.createdAt?.toMillis?.() || 0

      return bCreatedAt - aCreatedAt
    })
}

export async function getReadingGroup(user, groupId) {
  const groupSnap = await getDoc(doc(db, 'readingGroups', groupId))

  if (!groupSnap.exists()) {
    throw new Error('Group not found')
  }

  const group = groupSnap.data()

  if (!group.memberIds?.includes(user.uid)) {
    throw new Error('You do not have access to this group')
  }

  return group
}

export async function getPinnedReadingGroupId(user) {
  const userSnap = await getDoc(doc(db, 'users', user.uid))

  return userSnap.exists() ? userSnap.data().pinnedReadingGroupId || '' : ''
}

export async function setPinnedReadingGroupId(user, groupId) {
  await setDoc(
    doc(db, 'users', user.uid),
    {
      pinnedReadingGroupId: groupId || '',
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  )
}

async function deleteMyGroupContent(user, groupId) {
  const collections = ['readingGroupNotes', 'readingGroupBookLogs']

  await Promise.all(
    collections.map(async (collectionName) => {
      const contentQuery = query(
        collection(db, collectionName),
        where('groupId', '==', groupId),
        where('userId', '==', user.uid),
      )
      const contentSnap = await getDocs(contentQuery)

      await Promise.all(contentSnap.docs.map((item) => deleteDoc(item.ref)))
    }),
  )
}

export async function leaveReadingGroup(user, groupId, options = {}) {
  if (options.deleteMyContent) {
    await deleteMyGroupContent(user, groupId)
  }

  await updateDoc(doc(db, 'readingGroups', groupId), {
    memberIds: arrayRemove(user.uid),
    updatedAt: serverTimestamp(),
  })

  const pinnedGroupId = await getPinnedReadingGroupId(user)

  if (pinnedGroupId === groupId) {
    await setPinnedReadingGroupId(user, '')
  }
}
