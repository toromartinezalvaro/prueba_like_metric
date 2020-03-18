import React from 'react';
import Card, { CardFooter, CardHeader, CardBody } from '../UI/Card/Card';
import styles from './Projects.module.scss';
import Icon from '../../assets/icons/Icon';
import Button from '../UI/Button/Button';

const projectItems = (props) => {
  const itemFromProject = (project) => {
    return (
      <a
        className={styles.noBlue}
        href={`${props.url + props.DashboardRoutesValue + project.id}`}
      >
        <div
          className={styles.ItemContainer}
          key={project.id}
          onClick={(event) => {
            event.stopPropagation();
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
      </a>
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
      </CardHeader>
      <CardBody>
        <div className={styles.Projects}>{items(props.projects)}</div>
      </CardBody>
      <CardFooter />
    </Card>
  );
};

export default projectItems;
