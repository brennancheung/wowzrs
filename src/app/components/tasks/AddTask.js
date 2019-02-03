import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import EnterTextField from 'core/common/EnterTextField'
import FSCollection from 'core/FSCollection'
import Section from 'core/common/Section'

const AddTask = ({ parent }) => (
  <FSCollection path="/users/$userId/tasks">
    {({ collection }) => {
      const createTask = async title => {
        const due = moment().endOf('day').valueOf()
        const created = moment().valueOf()
        const data = { title, created, due, done: false, archived: false, parentId: parent || null }
        await collection.add(data)
      }
      return (
        <Section>
          <EnterTextField
            label="new task"
            onEnter={createTask}
            fullWidth
          />
        </Section>
      )
    }}
  </FSCollection>
)

AddTask.propTypes = {
  parent: PropTypes.string,
}

export default AddTask
