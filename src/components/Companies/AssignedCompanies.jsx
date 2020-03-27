import React from 'react';
import { Card, ExpansionPanel, ExpansionPanelSummary } from '@material-ui/core';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import styles from './Companies.module.scss';

const AssignedCompanies = ({ associations }) => {
  const ListOfCompanies = () => {
    const { companies, projects } = associations;
    return companies.map((company, companyIndex) => {
      return (
        <ExpansionPanel
          id={company.id}
          key={companyIndex}
          classes={{ root: styles.collapsable }}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <h4>{company.name}</h4>
          </ExpansionPanelSummary>
          {projects.map((project, index) => {
            return (
              <div className={styles.downList} key={index}>
                {project.companyId === company.id && (
                  <span
                    key={project.id}
                    id={project.id}
                    className={styles.projectList}
                  >
                    {project.name}
                  </span>
                )}
              </div>
            );
          })}
        </ExpansionPanel>
      );
    });
  };
  return (
    <Card variant="outlined" classes={{ root: styles.cardRight }}>
      <div className={styles.titleContainer}>
        <h3 className={styles.titleDashboard}>
          Compañías y Proyectos asociados
        </h3>
        <div className={styles.associations}>{ListOfCompanies()}</div>
      </div>
    </Card>
  );
};

AssignedCompanies.propTypes = {
  associations: PropTypes.object,
};

export default AssignedCompanies;
