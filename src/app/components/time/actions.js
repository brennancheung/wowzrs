import moment from 'moment'
import { pathOrNull } from 'core/fp'
import { getCollection } from 'core/FSCollection'

export const createTimeJournal = ({ context, task, goal }) => {
  const now = moment().valueOf()
  const entry = {
    task: pathOrNull('id', task),
    goal: pathOrNull('id', goal),
    start: now,
    completed: false,
  }
  const { collection } = getCollection({ context, path: '/users/$userId/timeJournal' })

  // Complete any existing time journal entries
  const openEntries = collection.where('completed', '==', false)
  openEntries.get().then(snapshot => {
    snapshot.forEach(doc => {
      collection.doc(doc.id).update({ completed: true, stop: now })
    })
  })

  return collection.add(entry)
}
