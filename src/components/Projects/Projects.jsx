import React from 'react';
import Card, { CardFooter, CardHeader, CardBody } from '../UI/Card/Card';
import styles from './Projects.module.scss';
import Icon from '../../assets/icons/Icon';
import Button from '../UI/Button/Button';

const projectItems = (props) => {
  const itemFromProject = (project) => {
    return (
      <div
        className={styles.ItemContainer}
        key={project.id}
        onClick={(event) => {
          event.stopPropagation();
          if (window.event.ctrlKey) {
            props.openCtrlProject(project.id);
          } else {
            props.openProject(project.id);
          }
        }}
      >
        <div className={styles.DescriptionItem}>
          <div className={styles.Buttons}>
            <div
              className={styles.Remove}
              onClick={(event) => {
                event.stopPropagation();
                props.editHandler(project.id);
              }}
            >
              <i className="fas fa-edit"></i>
            </div>
            <div
              className={styles.Remove}
              onClick={(event) => {
                event.stopPropagation();
                props.removeProject(project.id);
              }}
            >
              <Icon name="fa-trash-alt" />
            </div>
          </div>

          <div className={styles.Description}>
            <p>{project.description}</p>
          </div>
        </div>
        <div className={styles.Item}>
          <div>
            <p>{project.name}</p>
          </div>
        </div>
      </div>
    );
  };

  const items = (projects) => {
    return projects.map((project) => {
      return itemFromProject(project);
    });
  };

  return (
    <Card>
      <CardHeader>
        <p>Proyectos</p>
        <Button onClick={props.createProject}> Crear Proyecto</Button>
        <Button onClick={props.redirectToGroups}> Administración de Grupos</Button>
      </CardHeader>
      <CardBody>
        <div className={styles.Projects}>{items(props.projects)}</div>
      </CardBody>
      <CardFooter />
    </Card>
  );
};

export default projectItems;
