import React from 'react'
import Tab from 'core/common/Tab'
import Tabs from 'core/common/Tabs'
import TimeFocus from 'components/time/TimeFocus'

const TimePage = () => (
  <Tabs>
    <Tab value="focus" label="Focus"><TimeFocus /></Tab>
    <Tab value="pomodoro" label="Pomodoro">Pomodoro</Tab>
    <Tab value="stats" label="Stats">Stats</Tab>
  </Tabs>
)

export default TimePage
