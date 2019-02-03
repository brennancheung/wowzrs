import React from 'react'
import { Badge, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import {
  Assessment as AssessmentIcon,
  MyLocation as MyLocationIcon,
  BarChart as BarChartIcon,
  Dashboard as DashboardIcon,
  List as ListIcon,
  Mood as MoodIcon,
  Timer as TimerIcon,
  AttachMoney as MoneyIcon,
} from '@material-ui/icons'
import { withRouter } from 'react-router-dom'

const NavItems = ({ history }) => {
  const navTo = link => () => { history.push(link) }

  return (
    <React.Fragment>
      <List>
        <ListItem button onClick={navTo('/')}>
          <Badge badgeContent={2} color="secondary">
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </Badge>
        </ListItem>
        <ListItem button onClick={navTo('/actions')}>
          <ListItemIcon><MyLocationIcon /></ListItemIcon>
          <ListItemText primary="Actions" />
        </ListItem>
        <ListItem button onClick={navTo('/tasks')}>
          <ListItemIcon><ListIcon /></ListItemIcon>
          <ListItemText primary="Tasks" />
        </ListItem>
        <ListItem button onClick={navTo('/reports')}>
          <ListItemIcon><AssessmentIcon /></ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>
        <ListItem button onClick={navTo('/mood')}>
          <ListItemIcon><MoodIcon /></ListItemIcon>
          <ListItemText primary="Mood" />
        </ListItem>
        <ListItem button onClick={navTo('/pomodoro')}>
          <ListItemIcon><TimerIcon /></ListItemIcon>
          <ListItemText primary="Pomodoro" />
        </ListItem>
        <ListItem button onClick={navTo('/weight')}>
          <ListItemIcon><BarChartIcon /></ListItemIcon>
          <ListItemText primary="Weight" />
        </ListItem>
        <ListItem button onClick={navTo('/finances')}>
          <ListItemIcon><MoneyIcon /></ListItemIcon>
          <ListItemText primary="Finances" />
        </ListItem>
      </List>
    </React.Fragment>
  )
}

export default withRouter(NavItems)
