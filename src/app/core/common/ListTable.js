import React from 'react'
import moment from 'moment'
import Checkbox from 'core/common/Checkbox'
import {
  Paper,
  Table as MDTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core'

const uniqueIdentifier = 'id'

class Table extends React.Component {
  state = { editingId: null }

  onToggleEdit = id => () => {
    const { editingId } = this.state
    this.setState({
      editingId: editingId ? null : id
    })
  }

  renderRow = row => {
    const { renderRow } = this.props
    if (renderRow) {
      const id = row[uniqueIdentifier]
      const editing = this.state.editingId === id
      return renderRow({
        row,
        editing,
        onToggleEdit: this.onToggleEdit(id)
      })
    }
    const { columns } = this.props
    return (
      <TableRow key={row[uniqueIdentifier]}>
        {columns.map(columnDef =>
          <TableCell key={columnDef.id}>
            {this.renderCell(columnDef, row[columnDef.id], row)}
          </TableCell>
        )}
      </TableRow>
    )
  }

  renderCell = (def, data, row) => {
    const { id, label, type, onChange, render, ...moreProps } = def
    if (render) { return render(data, row) }
    if (type === 'boolean') {
      return (
        <Checkbox
          checked={data}
          onChange={onChange && onChange(row[uniqueIdentifier])}
          {...moreProps}
        />
      )
    }
    if (type === 'moment') { return moment(data).fromNow() }
    return data
  }

  render () {
    const { columns, data } = this.props
    return (
      <Paper>
        <MDTable>
          <TableHead>
            <TableRow>
              {columns.map(c => <TableCell key={c.id}>{c.label}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(this.renderRow)}
          </TableBody>
        </MDTable>
      </Paper>
    )
  }
}

export default Table
