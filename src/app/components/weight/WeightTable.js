import React from 'react'
import WeightRow from 'components/weight/WeightRow'
import ListTable from 'core/common/ListTable'
import Section from 'core/common/Section'

const columns = [
  { id: 'date', label: 'Date' },
  { id: 'weight', label: 'Weight' },
]
const renderWeightRow = ({ row, ...props }) => <WeightRow key={row.id} weight={row} {...props} />

const WeightTable = ({ data }) => (
  <Section title="Weights">
    <ListTable columns={columns} data={data} renderRow={renderWeightRow} />
  </Section>
)

export default WeightTable
