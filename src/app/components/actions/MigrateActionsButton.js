import React from 'react'
import IconButton from 'core/common/IconButton'
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory'
import { withFSRef } from 'core/FSQuery'

const MigrateActionsButton = ({ fsRef, data }) => {
  const handleClick = () => {
    data.forEach(x => !x.archived && fsRef.doc(x.id).update({ archived: false }))
  }

  return (
    <IconButton Icon={ChangeHistoryIcon} onClick={handleClick}>Migrate</IconButton>
  )
}

export default withFSRef('/users/$userId/actions')(MigrateActionsButton)
