import React, { Component, Fragment } from 'react';

import styles from './WelcomeDialog.css';

import Button from '../shared/button';

import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import StepThree from './steps/StepThree';

class Welcome extends Component {
  steps = [StepOne, StepTwo, StepThree];

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
      <Fragment>
        <div className={styles.WelcomeContainer}>
          {(this.steps || [])
            .filter(
              (step) => this.steps.indexOf(step) === this.state.activeStep,
            )
            .map((step, i) => React.cloneElement(step(), { key: i }))}
        </div>
        <Button
          className={styles.StepCounter}
          outline
          theme="primary"
          clickHandler={this.handleClick.bind(this)}
          content={`Step ${step} of ${stepCount}`}
        />
      </Fragment>
    );
  }
}

export default Welcome;
