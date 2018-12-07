import React from 'react'
import { ToggleButtonGroup } from '@material-ui/lab'
import TooltipToggleButton from 'core/common/TooltipToggleButton'
import { withStyles } from '@material-ui/core/styles'
import {
  Archive as ArchiveIcon,
  Today as TodayIcon,
} from '@material-ui/icons'

const styles = theme => ({
  toggleContainer: {
    height: 56,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: `${theme.spacing.unit}px 0`,
  },
})

class ActionVisibilityToggles extends React.Component {
  state = {
    toggles: []
  }

  handleTogglesChange = (e, toggles) => {
    const { onChange } = this.props
    this.setState({ toggles })
    onChange && onChange(toggles)
  }

  render () {
    const { classes } = this.props
    const { toggles } = this.state
    return (
      <div className={classes.toggleContainer}>
        <ToggleButtonGroup value={toggles} onChange={this.handleTogglesChange}>
          <TooltipToggleButton title="Show due today only" value="today"><TodayIcon /></TooltipToggleButton>
          <TooltipToggleButton title="Show archived" value="archived"><ArchiveIcon /></TooltipToggleButton>
        </ToggleButtonGroup>
      </div>
    )
  }
}

export default withStyles(styles)(ActionVisibilityToggles)
