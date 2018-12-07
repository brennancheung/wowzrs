import React from 'react'
import ButtonGroup from 'core/common/ButtonGroup'
import FSQuery from 'core/FSQuery'
import IconButton from 'core/common/IconButton'
import ListTable from 'core/common/ListTable'
import Section from 'core/common/Section'
import ActionRow from './ActionRow'
import ActionVisibilityToggles from './ActionVisibilityToggles'
import moment from 'moment'
import { withAppContext } from 'core/AppContext'
import sortActions from './sortActions'

import {
  Archive as ArchiveIcon,
  ChangeHistory as ChangeHistoryIcon,
} from '@material-ui/icons'

import { Grid } from '@material-ui/core'

const columns = [
  { id: 'done', label: 'Done?' },
  { id: 'title', label: 'Title' },
  { id: 'due', label: 'Due' },
  { id: 'created', label: 'Created' },
  { id: 'completed', label: 'Completed' },
]

class ActionsList extends React.Component {
  state = {
    visibilityToggles: [], // archived, done, today
    editing: null, // id of action currently being edited
  }

  handleVisibilityToggles = toggles => { this.setState({ visibilityToggles: toggles || [] }) }

  scopeHandlers = ({ data, fsRef }) => ({
    handleArchive: () => {
      const { fsRef, data } = this.props
      const startOfToday = moment().startOf('day').valueOf()
      const oldDone = data.filter(x => x.done && x.completed < startOfToday)
      oldDone.forEach(x => fsRef.doc(x.id).update({ archived: true }))
    },

    handleMigrate: async () => {
      const { context, data, db, fsRef } = this.props // eslint-disable-line no-unused-vars
      data.forEach(x => !x.archived && fsRef.doc(x.id).update({ archived: false }))
      // const userId = path(['user', 'uid'], context)
    },
  })

  renderRow = fsRef => action => (
    <ActionRow
      key={action.id}
      action={action}
      fsRef={fsRef}
      columns={columns}
    />
  )

  render () {
    const { visibilityToggles } = this.state
    const { where } = this.props
    return (
      <FSQuery path="/users/$userId/actions" {...where}>
        {({ data, fsRef }) => {
          const sortedData = sortActions(data, visibilityToggles)
          return (
            <Section title="Actions">
              <Grid container spacing={40}>
                <Grid item xs={2}>
                  <ActionVisibilityToggles onChange={this.handleVisibilityToggles} />
                </Grid>
                <Grid item xs={4} />
                <Grid item xs={6}>
                  <ButtonGroup>
                    <IconButton Icon={ArchiveIcon} onClick={this.handleArchive}>archive old completed</IconButton>
                    <IconButton Icon={ChangeHistoryIcon} onClick={this.handleMigrate}>migrate</IconButton>
                  </ButtonGroup>
                </Grid>
              </Grid>
              <ListTable columns={columns} data={sortedData} renderRow={this.renderRow(fsRef)} />
            </Section>
          )
        }}
      </FSQuery>
    )
  }
}

export default withAppContext(ActionsList)
