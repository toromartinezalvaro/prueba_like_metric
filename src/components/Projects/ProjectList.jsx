import React from 'react';
import styles from './ProjectList.module.scss';
import Card, { CardHeader, CardBody } from '../UI/Card/Card';
import Accordion from '../UI/Accordion/Accordion';
import { Role } from '../../helpers';
import agent from '../../config/config';
import Icon from '../../assets/icons/Icon';

const ProjectList = props => {
  const accordionTitle = project => {
    return (
      <div className={styles.AccordionTitle}>
        <div
          className={styles.RemoveButton}
          onClick={event => {
            handleTitleAction(event, project.id);
          }}
        >
          <Icon name="fa-trash-alt" />
        </div>
        <p className={styles.Title}>{project.name}</p>
      </div>
    );
  };

  const accordionItem = project => {
    return (
      <Accordion trigger={accordionTitle(project)} key={project.id}>
        {project.towers.map(towerItem)}
      </Accordion>
    );
  };

  const handleTitleAction = (event, projectId) => {
    event.stopPropagation();
    console.log("projectId ", projectId, props.currentUser.id)
  };

  // const handleTowerAction = (event, towerId) => {
  //   event.stopPropagation();
  // };

  const towerItem = tower => {
    return (
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
  };

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

export default ProjectList;
