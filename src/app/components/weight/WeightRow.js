import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { withFSRef } from 'core/FSQuery'
import { TableCell, TableRow } from '@material-ui/core'

const EditWeightRow = () => <div>placeholder</div>

class BaseWeightRow extends React.Component {
  render () {
    const { editing, onToggleEdit, weight } = this.props
    if (editing) { return <EditWeightRow /> }
    return (
      <TableRow key={weight.id} hover onClick={onToggleEdit}>
        <TableCell>{moment(weight.date).format('MM/DD')}</TableCell>
        <TableCell>{weight.weight.toFixed(1)}</TableCell>
      </TableRow>
    )
  }
}

const WeightRow = withFSRef('/users/$userId/weights')(BaseWeightRow)

WeightRow.propTypes = {
  onToggleEdit: PropTypes.func.isRequired,
  editing: PropTypes.bool,
}

export const renderWeightRow = ({ row, ...props }) => <WeightRow key={row.id} weight={row} {...props} />

export default WeightRow
