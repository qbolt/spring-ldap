import React from 'react';

class RadioButton extends React.Component {

  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)
  }

  onChange() {
    const { selectRadioButton, route } = this.props
    selectRadioButton(route);
  }

  render() {
    const { label, name, checked } = this.props
    return (
      <div className="radio-button">
        <label>
          <input
            type="radio"
            value={label}
            onChange={this.onChange}
            name={name}
            defaultChecked={checked}
          />
          {label}
        </label>
      </div>
    )
  }
}

export default RadioButton;
