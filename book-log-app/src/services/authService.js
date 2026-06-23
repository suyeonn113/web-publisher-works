import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase/firebase'

const googleProvider = new GoogleAuthProvider()

export async function signInWithGoogle() {
  const { user } = await signInWithPopup(auth, googleProvider)
  const userRef = doc(db, 'users', user.uid)
  const userSnap = await getDoc(userRef)

  await setDoc(
    userRef,
    {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      providerId: 'google.com',
      ...(userSnap.exists() ? {} : { createdAt: serverTimestamp() }),
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  )

  return user
}
