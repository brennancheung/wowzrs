import React from 'react'
import ActionsPage from 'components/pages/ActionsPage'
import HomePage from 'components/pages/HomePage'
import LoginPage from 'components/pages/LoginPage'
import Navbar from 'components/Navbar'
import TasksPage from 'components/pages/TasksPage'
import TimePage from 'components/pages/TimePage'
import WeightPage from 'components/pages/WeightPage'
import { Redirect, Route, Switch } from 'react-router-dom'
import { withAppContext } from 'core/AppContext'

const GoalsPage = () => <h1>Goals</h1>
const ReportsPage = () => <h1>Reports</h1>
const MoodPage = () => <h1>Mood</h1>
const FinancesPage = () => <h1>Finances</h1>

const Main = ({ context }) => {
  const loggedIn = !!context.user

  const renderLoggedIn = () => (
    <Navbar>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/actions" component={ActionsPage} />
        <Route path="/goals" component={GoalsPage} />
        <Route path="/tasks" component={TasksPage} />
        <Route path="/reports" component={ReportsPage} />
        <Route path="/mood" component={MoodPage} />
        <Route path="/time" component={TimePage} />
        <Route path="/weight" component={WeightPage} />
        <Route path="/finances" component={FinancesPage} />
        <Redirect to="/" />
      </Switch>
    </Navbar>
  )

  return (
    <div id="main-container">
      {loggedIn && renderLoggedIn()}
      {!loggedIn && <LoginPage />}
    </div>
  )
}

export default withAppContext(Main)
