import { partition, prop } from 'ramda'
import moment from 'moment'

const isFutureDay = x => x.due > moment().endOf('day').valueOf()

const sortActions = (actions, toggles) => {
  const [ done, active ] = partition(prop('done'), actions)
  const doneSorted = done.sort((a, b) => a.completed > b.completed ? -1 : 1)
  const activeSorted = active.sort((a, b) =>
    a.due === b.due
      ? a.created > b.created ? -1 : 1
      : a.due < b.due ? -1 : 1
  )
  const [futureActions, dueToday] = partition(isFutureDay, activeSorted)
  const [archived, unarchived] = partition(prop('archived'), doneSorted)
  return [
    ...dueToday,
    ...(toggles.includes('today') ? [] : futureActions),
    ...unarchived,
    ...(toggles.includes('archived') ? archived : [])
  ]
}

export default sortActions
