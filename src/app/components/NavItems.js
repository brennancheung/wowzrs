import React from 'react'
import Badge from '@material-ui/core/Badge'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import PeopleIcon from '@material-ui/icons/People'
import BarChartIcon from '@material-ui/icons/BarChart'
import LayersIcon from '@material-ui/icons/Layers'
import AssignmentIcon from '@material-ui/icons/Assignment'

const NavItems = () => (
  <React.Fragment>
    <List>
      <ListSubheader inset>Recently Viewed</ListSubheader>
      <ListItem button>
        <ListItemIcon><AssignmentIcon /></ListItemIcon>
        <ListItemText primary="Voltage Divider" />
      </ListItem>
      <ListItem button>
        <ListItemIcon><AssignmentIcon /></ListItemIcon>
        <ListItemText primary="Ohm's Law" />
      </ListItem>
      <ListItem button>
        <ListItemIcon><AssignmentIcon /></ListItemIcon>
        <ListItemText primary="Light an LED" />
      </ListItem>
    </List>
    <Divider />
    <List>
      <ListItem button>
        <Badge badgeContent={2} color="secondary">
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </Badge>
      </ListItem>
      <ListItem button>
        <ListItemIcon><LayersIcon /></ListItemIcon>
        <ListItemText primary="Concepts" />
      </ListItem>
      <ListItem button>
        <ListItemIcon><LayersIcon /></ListItemIcon>
        <ListItemText primary="Skills" />
      </ListItem>
      <ListItem button>
        <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
        <ListItemText primary="Components" />
      </ListItem>
      <ListItem button>
        <ListItemIcon><LayersIcon /></ListItemIcon>
        <ListItemText primary="Projects" />
      </ListItem>
      <ListItem button>
        <ListItemIcon><PeopleIcon /></ListItemIcon>
        <ListItemText primary="Forums" />
      </ListItem>
      <ListItem button>
        <ListItemIcon><BarChartIcon /></ListItemIcon>
        <ListItemText primary="Your progress" />
      </ListItem>
    </List>
  </React.Fragment>

)

export default NavItems
