import React, { Component } from 'react';
// import moment from 'moment';
import ManageProjectsList from './shared/ManageProjectsList';

import styles from './ManageProjects.css';

export class ManageProjects extends Component {
  state = {
    currentProjects: [],
    pastProjects: [],
  };

  componentDidMount() {
    const currentProjects = this.props.items;
    // TODO: missing dates on project model
    // const currentProjects = this.props.items.filter((project) => {
    //   return moment(project.endDate).isAfter(moment());
    // });
    // const pastProjects = this.props.items.filter((project) => {
    //   return moment(project.endDate).isBefore(moment());
    // });
    this.setState({
      currentProjects: currentProjects,
      // pastProjects: pastProjects,
    });
  }

  render() {
    return (
      <div>
        {/* <ManageProjectsNew /> */}
        <div className={styles.TableTitle}>
          <h2>Current Projects</h2>
        </div>
        <ManageProjectsList projects={this.state.currentProjects} />
        <div className={styles.TableTitle}>
          <h2>Past Projects</h2>
        </div>
        {/* <ManageProjectsList projects={this.state.pastProjects} /> */}
      </div>
    );
  }
}

export default ManageProjects;