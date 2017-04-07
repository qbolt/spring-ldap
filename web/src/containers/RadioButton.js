import React, { PropTypes } from 'react';

class RadioButton extends React.Component {

  onChange = () => {
    const { selectRadioButton, route } = this.props;
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

RadioButton.propTypes = {
  label: PropTypes.string.isRequired,
  selectRadioButton: PropTypes.func.isRequired,
};

export default RadioButton;
