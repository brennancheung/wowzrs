import React from 'react'
import ButtonGroup from 'core/common/ButtonGroup'
import FSQuery from 'core/FSQuery'
import ListTable from 'core/common/ListTable'
import Section from 'core/common/Section'
import { renderActionRow } from './ActionRow'
import ActionVisibilityToggles from './ActionVisibilityToggles'
import { withAppContext } from 'core/AppContext'
import sortActions from './sortActions'

import ArchiveOldActionsButton from './ArchiveOldActionsButton'
import MigrateActionsButton from './MigrateActionsButton'

import { Grid } from '@material-ui/core'

import columns from './actionColumns'

class ActionsList extends React.Component {
  state = {
    visibilityToggles: ['done'], // archived, done, today
  }

  handleVisibilityToggles = toggles => { this.setState({ visibilityToggles: toggles || [] }) }

  render () {
    return (
      <FSQuery path="/users/$userId/actions">
        {({ data, fsRef }) => {
          const sortedData = sortActions(data, this.state.visibilityToggles)
          return (
            <Section title="Actions">
              <Grid container spacing={40}>
                <Grid item xs={2}>
                  <ActionVisibilityToggles
                    value={this.state.visibilityToggles}
                    onChange={this.handleVisibilityToggles}
                  />
                </Grid>
                <Grid item xs={4} />
                <Grid item xs={6}>
                  <ButtonGroup>
                    <ArchiveOldActionsButton data={sortedData} />
                    <MigrateActionsButton data={sortedData} />
                  </ButtonGroup>
                </Grid>
              </Grid>
              <ListTable columns={columns} data={sortedData} renderRow={renderActionRow} />
            </Section>
          )
        }}
      </FSQuery>
    )
  }
}

export default withAppContext(ActionsList)
