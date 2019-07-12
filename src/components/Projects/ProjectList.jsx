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
        <div className={styles.RemoveButton} onClick={handleTitleAction}>
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

  const handleTitleAction = event => {
    event.stopPropagation();
  };

  const handleTowerAction = event => {
    event.stopPropagation();
  };

  const towerItem = tower => {
    return (
      <div key={tower.id} className={styles.TowerContent}>
        <div className={styles.TowerItem}>
          <div className={styles.RemoveButton} onClick={handleTowerAction}>
            <Icon name="fa-trash-alt" />
          </div>
          <p onClick={handleTitleAction}>{tower.name}</p>
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
