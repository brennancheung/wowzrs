import React from 'react'
import {
  Badge,
  // Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  // ListSubheader,
} from '@material-ui/core'
import {
  Assessment as AssessmentIcon,
  Assignment as AssignmentIcon,
  BarChart as BarChartIcon,
  Dashboard as DashboardIcon,
  List as ListIcon,
  Mood as MoodIcon,
  Timer as TimerIcon,
  AttachMoney as MoneyIcon,
} from '@material-ui/icons'

const NavItems = () => (
  <React.Fragment>
    <List>
      <ListItem button>
        <Badge badgeContent={2} color="secondary">
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </Badge>
      </ListItem>
      <ListItem button>
        <ListItemIcon><ListIcon /></ListItemIcon>
        <ListItemText primary="Actions" />
      </ListItem>
      <ListItem button>
        <ListItemIcon><AssignmentIcon /></ListItemIcon>
        <ListItemText primary="Goals" />
      </ListItem>
      <ListItem button>
        <ListItemIcon><AssessmentIcon /></ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItem>
      <ListItem button>
        <ListItemIcon><MoodIcon /></ListItemIcon>
        <ListItemText primary="Mood" />
      </ListItem>
      <ListItem button>
        <ListItemIcon><TimerIcon /></ListItemIcon>
        <ListItemText primary="Pomodoro" />
      </ListItem>
      <ListItem button>
        <ListItemIcon><BarChartIcon /></ListItemIcon>
        <ListItemText primary="Weight" />
      </ListItem>
      <ListItem button>
        <ListItemIcon><MoneyIcon /></ListItemIcon>
        <ListItemText primary="Finances" />
      </ListItem>
    </List>
  </React.Fragment>

)

export default NavItems
