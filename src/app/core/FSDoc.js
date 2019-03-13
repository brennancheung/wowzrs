import { interpolateUserPath } from 'core/FSCollection'

export const getUserDoc = ({ context, path }) => {
  const { db } = context
  const { finalPath } = interpolateUserPath({ context, path })
  const collectionPath = finalPath.split('/').slice(0, -1).join('/')
  const docPath = finalPath.split('/').slice(-1).join('/')
  const ref = db.collection(collectionPath).doc(docPath)
  return ref.get().then(doc => doc.data())
}
