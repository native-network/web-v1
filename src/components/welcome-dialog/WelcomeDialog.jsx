import React, { Component } from 'react';

import styles from './WelcomeDialog.css';

import Button from '../shared/button';

class Welcome extends Component {
  steps = [
    {
      name: 'Foo',
    },
    {
      name: 'bar',
    },
    {
      name: 'baz',
    },
  ];

  state = { activeStep: 0 };

  setNextActiveStep() {
    const { activeStep } = this.state;

    this.setState({ activeStep: activeStep + 1 });
  }

  handleClick() {
    const { activeStep } = this.state;
    const stepCount = this.steps.length - 1;

    return stepCount > activeStep
      ? this.setNextActiveStep()
      : this.props.dismissDialog();
  }

  render() {
    const step = this.state.activeStep + 1;
    const stepCount = this.steps.length;
    return (
      <div className={styles.WelcomeContainer}>
        {this.steps[this.state.activeStep]['name']}
        <Button
          className={styles.StepCounter}
          outline
          theme="primary"
          clickHandler={this.handleClick.bind(this)}
          content={`Step ${step} of ${stepCount}`}
        />
      </div>
    );
  }
}

export default Welcome;
