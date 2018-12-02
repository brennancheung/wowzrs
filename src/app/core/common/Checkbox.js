import React from 'react'
import {
  Checkbox as BaseCheckbox,
  FormGroup,
  FormControlLabel,
} from '@material-ui/core'

class Checkbox extends React.Component {
  state = { checked: this.props.checked }
  toggle = e => {
    const { onChange } = this.props
    this.setState({ checked: !this.state.checked }, () => {
      onChange && onChange(this.state.checked)
    })
  }

  preventPropagation = e => e.stopPropagation()

  render () {
    const { checked, onChange, ...props } = this.props
    return (
      <FormGroup row>
        <FormControlLabel
          control={
            <BaseCheckbox
              checked={this.state.checked}
              color="primary"
              onChange={this.toggle}
              onClick={this.preventPropagation}
              {...props}
            />
          }
          label={this.props.children}
        />
      </FormGroup>
    )
  }
}

export default Checkbox
