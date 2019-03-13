import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { withFSRef } from 'core/FSQuery'
import { TableCell, TableRow } from '@material-ui/core'

const EditWeightRow = () => <div>placeholder</div>

class BaseWeightRow extends React.Component {
  render () {
    const { editing, onToggleEdit, weight, idx, data } = this.props

    const startFastDate = moment('2019-02-28').startOf('day')
    const startFastWeight = 228.0
    const daysElapsed = moment(weight.date).diff(startFastDate, 'days')

    const prevWeight = data[idx + 1]
      ? data[idx + 1].weight
      : null

    const delta = prevWeight ? (prevWeight - weight.weight).toFixed(1) : null

    const total = startFastWeight - weight.weight

    const isFastDay = weight.date > startFastDate
    const perDay = isFastDay ? (total / daysElapsed).toFixed(1) : null

    if (editing) { return <EditWeightRow /> }
    return (
      <TableRow key={weight.id} hover onClick={onToggleEdit}>
        <TableCell>{moment(weight.date).format('MM/DD')}</TableCell>
        <TableCell>{weight.weight.toFixed(1)}</TableCell>
        <TableCell>{isFastDay && total.toFixed(1)}</TableCell>
        <TableCell>{isFastDay && delta}</TableCell>
        <TableCell>{isFastDay && daysElapsed}</TableCell>
        <TableCell>{perDay}</TableCell>
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
