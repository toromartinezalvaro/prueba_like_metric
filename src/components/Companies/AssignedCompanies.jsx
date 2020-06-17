import React, { useEffect, useState } from 'react';
import {
  Card,
  ExpansionPanel,
  ExpansionPanelSummary,
  Icon,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import styles from './Companies.module.scss';

const AssignedCompanies = ({ associations, companySelect }) => {
  const [companySelected, setCompanySelected] = useState(undefined);
  useEffect(() => {
    setCompanySelected(companySelect);
  }, [companySelect]);
  const ListOfCompanies = () => {
    const { companies, projects } = associations;
    const companyInfo = companies.find(
      (company) => company.id === companySelected,
    );
    return (
      <ExpansionPanel
        id={companyInfo.id}
        classes={{ root: styles.collapsable }}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <h4>{companyInfo.name}</h4>
        </ExpansionPanelSummary>
        {projects.map((project, index) => {
          return (
            <div className={styles.downList} key={index}>
              {project.companyId === companyInfo.id && (
                <ListItem
                  button
                  key={project.id}
                  id={project.id}
                  className={styles.projectList}
                >
                  <ListItemText primary={project.name} />
                </ListItem>
              )}
            </div>
          );
        })}
      </ExpansionPanel>
    );
  };
  return (
    <Card variant="outlined" classes={{ root: styles.cardRight }}>
      <div className={styles.titleContainer}>
        <h3 className={styles.titleDashboard}>
          Compañía y Proyectos asociados
        </h3>
        {companySelected && (
          <div className={styles.associations}>{ListOfCompanies()}</div>
        )}
      </div>
    </Card>
  );
};

AssignedCompanies.propTypes = {
  associations: PropTypes.object,
  companySelect: PropTypes.object,
};

export default AssignedCompanies;
