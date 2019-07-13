import React, { Fragment } from "react";
import styles from './UserProductAssigner.module.scss';

const UserProductAssigner = props => {

  const optionForProject = project => {
    return (
      <option key={'optionForProject' + project.id} value={project.id}>
        {project.name}
      </option>
    );
  };

  return (
    <Fragment>
      <select
        className={styles.Input}
        onChange={event => {
          props.onChange({name: "currentProject" });
        }}
        value={props.currentProject}
      >
        {props.projects.map(optionForProject)}
      </select>
    </Fragment>
  );
};

export default UserProductAssigner;
