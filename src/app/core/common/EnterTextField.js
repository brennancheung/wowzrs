import React from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core'

class EnterTextField extends React.Component {
  state = { value: '' }

  handleChange = e => {
    const value = e.target.value
    const { onChange } = this.props
    this.setState({ value })
    if (onChange) { onChange(value) }
  }

  handleKeyDown = e => {
    const { onEnter } = this.props
    if (e.keyCode === 13) {
      this.setState({ value: '' })
      onEnter && onEnter(this.state.value)
    }
  }

  render () {
    const { label, onChange, onEnter, ...rest } = this.props

    return (
      <TextField
        id="enterText"
        label={label}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        value={this.state.value}
        {...rest}
      />
    )
  }
}

EnterTextField.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  onEnter: PropTypes.func,
}

export default EnterTextField
