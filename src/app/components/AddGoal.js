import React from 'react'
import moment from 'moment'
import EnterTextField from 'core/common/EnterTextField'
import FSCollection from 'core/FSCollection'
import Section from 'core/common/Section'

const AddGoal = () => (
  <FSCollection path="/users/$userId/goals">
    {({ collection }) => {
      const createGoal = async title => {
        const due = moment().endOf('day').valueOf()
        const created = moment().valueOf()
        const data = { title, created, due, done: false, archived: false }
        await collection.add(data)
      }
      return (
        <Section>
          <EnterTextField
            label="new goal"
            onEnter={createGoal}
            fullWidth
          />
        </Section>
      )
    }}
  </FSCollection>
)

export default AddGoal
