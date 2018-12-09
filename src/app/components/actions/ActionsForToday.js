import React from 'react'
import { withFSQuery } from 'core/FSQuery'
import ListTable from 'core/common/ListTable'
import Section from 'core/common/Section'
import { renderActionRow } from './ActionRow'
import sortActions from './sortActions'
import { compose } from 'ramda'

import { Grid } from '@material-ui/core'

const columns = [
  { id: 'done', label: 'Done?' },
  { id: 'title', label: 'Title' },
  { id: 'due', label: 'Due' },
  { id: 'duration', label: 'Duration' },
]

const ActionsForToday = ({ data }) => {
  const sortedData = sortActions(data, ['today', 'done'])

  return (
    <Section title="Actions for today">
      <Grid container spacing={40}>
        <Grid item xs={6} />
        <Grid item xs={6} />
      </Grid>
      <ListTable columns={columns} data={sortedData} renderRow={renderActionRow(columns)} />
    </Section>
  )
}

export default compose(
  withFSQuery({
    path: '/users/$userId/actions',
    where: ['archived', '==', false]
  }),
)(ActionsForToday)
