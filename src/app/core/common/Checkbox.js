import React from 'react'
import {
  Checkbox as BaseCheckbox,
  FormGroup,
  FormControlLabel,
} from '@material-ui/core'

class Checkbox extends React.Component {
  state = { checked: this.props.checked }
  toggle = () => this.setState({ checked: !this.state.checked })
  render () {
    return (
      <FormGroup row>
        <FormControlLabel
          control={<BaseCheckbox checked={this.state.checked} onChange={this.toggle} color="primary" />}
          label={this.props.children}
        />
      </FormGroup>
    )
  }
}

export default Checkbox
