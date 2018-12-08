import { ascend, contains, descend, juxt, map, partition, prop, sortWith } from 'ramda'
import moment from 'moment'

const DESC = key => descend(prop(key))
const ASC = key => ascend(prop(key))

const isFutureDay = x => x.due > moment().endOf('day').valueOf()

const sortActions = (actions, toggles) => {
  const [ showDone, showToday, showArchived ] = juxt(map(contains, ['done', 'today', 'archived']))(toggles)

  const [ done, active ] = partition(prop('done'), actions)
  const doneSorted = showDone ? sortWith([DESC('completed')], done) : []
  const [archived, unarchived] = partition(prop('archived'), doneSorted)

  const activeSorted = sortWith([DESC('created'), ASC('due')], active)
  const [dueLater, dueToday] = partition(isFutureDay, activeSorted)

  return [
    ...dueToday,
    ...showToday ? [] : dueLater,
    ...unarchived,
    ...showArchived ? archived : []
  ]
}

export default sortActions
