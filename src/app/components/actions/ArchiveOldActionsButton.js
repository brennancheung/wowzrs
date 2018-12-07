import React from 'react'
import IconButton from 'core/common/IconButton'
import moment from 'moment'
import ArchiveIcon from '@material-ui/icons/Archive'
import { withFSRef } from 'core/FSQuery'

const ArchiveOldActionsButton = ({ fsRef, data }) => {
  const handleClick = () => {
    const startOfToday = moment().startOf('day').valueOf()
    const oldDone = data.filter(x => x.done && x.completed < startOfToday)
    oldDone.forEach(x => fsRef.doc(x.id).update({ archived: true }))
  }
  return (
    <IconButton Icon={ArchiveIcon} onClick={handleClick}>archive old completed</IconButton>
  )
}

export default withFSRef('/users/$userId/actions')(ArchiveOldActionsButton)
