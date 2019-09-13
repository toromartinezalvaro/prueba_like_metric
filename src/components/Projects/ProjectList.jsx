import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProjectList.module.scss';
import Card, { CardHeader, CardBody } from '../UI/Card/Card';
import Accordion from '../UI/Accordion/Accordion';
import Icon from '../../assets/icons/Icon';

const ProjectList = (props) => {
  const handleTitleAction = (event, projectId) => {
    event.stopPropagation();
    props.removeOnClick(projectId, props.currentUser.id);
  };

  const accordionTitle = project => (
    <div className={styles.AccordionTitle}>
      <div
        className={styles.RemoveButton}
        onClick={event => handleTitleAction(event, project.id)}
      >
        <Icon name="fa-trash-alt" />
      </div>
      <p className={styles.Title}>{project.name}</p>
    </div>
  );

  const towerItem = tower => (
    <div key={tower.id} className={styles.TowerContent}>
      <div className={styles.TowerItem}>
        {/* <div
            className={styles.RemoveButton}
            onClick={event => {
              handleTowerAction(event, tower.id);
            }}
          >
            <Icon name="fa-trash-alt" />
          </div> */}
        <p>{tower.name}</p>
      </div>
      <div className={styles.Line} />
    </div>
  );

  const accordionItem = project => (
    <Accordion trigger={accordionTitle(project)} key={project.id}>
      {project.towers.map(towerItem)}
    </Accordion>
  );

  // const handleTowerAction = (event, towerId) => {
  //   event.stopPropagation();
  // };

  return (
    <div className={styles.Container}>
      <Card className={styles.Card}>
        <CardHeader>
          <p>Proyectos y torres asociados</p>
        </CardHeader>
        <CardBody>{props.currentUser.projects.map(accordionItem)}</CardBody>
      </Card>
    </div>
  );
};

ProjectList.propTypes = {
  currentUser: PropTypes.object,
  removeOnClick: PropTypes.func,
};

export default ProjectList;
