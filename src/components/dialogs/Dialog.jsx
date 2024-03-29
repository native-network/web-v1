import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class Dialog extends Component {
  static propTypes = {
    components: PropTypes.array,
  };

  state = { activeStep: 0 };

  setNextActiveStep() {
    const { activeStep } = this.state;
    this.setState({ activeStep: activeStep + 1 });
  }

  handleClick() {
    const { activeStep } = this.state;
    const { components } = this.props;
    const stepCount = components.length - 1;

    return stepCount > activeStep
      ? this.setNextActiveStep()
      : this.props.dismissDialog();
  }

  render() {
    const { components, ...rest } = this.props;
    return (
      <Fragment>
        {(components || []).map((component, index) => {
          return index === this.state.activeStep
            ? React.createElement(component, {
                key: index,
                ...rest,
                submitHandler: () => this.handleClick(),
              })
            : null;
        })}
      </Fragment>
    );
  }
}

export default Dialog;
