import React from 'react'
import AddWeight from 'components/weight/AddWeight'
import WeightTable from 'components/weight/WeightTable'
import WeightGraph from 'components/weight/WeightGraph'
import { withFSQuery } from 'core/FSQuery'
import { sortAsc, sortDesc } from 'core/fp'

const WeightPage = ({ data }) => {
  const asc = sortAsc('date', data)
  const desc = sortDesc('date', data)
  return (
    <div>
      <AddWeight />
      <WeightGraph data={asc} />
      <WeightTable data={desc} />
    </div>
  )
}

export default withFSQuery({ path: '/users/$userId/weights' })(WeightPage)
