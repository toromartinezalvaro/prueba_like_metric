import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import styles from './Projects.module.scss';
import Icon from '../../assets/icons/Icon';
import unique from './helper/index';

const ProjectItems = (props) => {
  const [company, setCompany] = useState('all');
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const companiesId = props.projects.map((element) => element.companyId);
    const userCompaniesFiltered = companiesId.filter(unique);
    const companiesForSelect = userCompaniesFiltered.flatMap((current) => {
      return props.companies.find((element) => {
        return element.id === current;
      });
    });
    setCompanies(companiesForSelect);
  }, [props.projects]);

  const companyOptions = (companiesForOptions) => {
    return _.orderBy(
      companiesForOptions,
      [(company) => company.name.toLowerCase()],
      ['asc'],
    ).map((element, index) => (
      <MenuItem value={element.id} key={index}>
        {element.name}
      </MenuItem>
    ));
  };

  const handleChangeCompanyFilter = (element) => {
    setCompany(element.target.value);
  };

  const itemFromProject = (project) => {
    return (
      <Card
        classes={{ root: styles.ItemContainer }}
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
      </Card>
    );
  };

  const items = (projects, companyId) => {
    if (company === 'all') {
      return _.orderBy(
        projects,
        [(project) => project.name.toLowerCase()],
        ['asc'],
      ).map((project) => {
        return itemFromProject(project);
      });
    }
    const filterByCompany = projects.filter(
      (element) => element.companyId === companyId,
    );
    return _.orderBy(
      filterByCompany,
      [(project) => project.name.toLowerCase()],
      ['asc'],
    ).map((project) => {
      return itemFromProject(project);
    });
  };

  return (
    <Card>
      <div className={styles.headerContainer}>
        <h2 className={styles.header}>Proyectos</h2>
        <Button
          variant="contained"
          color="primary"
          className={styles.buttonHeader}
          onClick={props.createProject}
        >
          Crear Proyecto
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={styles.buttonHeader}
          onClick={props.redirectToGroups}
        >
          Administración de Grupos
        </Button>
        <FormControl variant="filled" classes={{ root: styles.rootSelect }}>
          <InputLabel>Seleccione una compañía</InputLabel>
          <Select
            classes={{ root: styles.rootSelect }}
            value={company}
            onChange={handleChangeCompanyFilter}
          >
            <MenuItem value="all" selected>
              Todas las compañías
            </MenuItem>
            {companyOptions(companies)}
          </Select>
        </FormControl>
      </div>
      <CardContent>
        <div className={styles.Projects}>{items(props.projects, company)}</div>
      </CardContent>
    </Card>
  );
};

export default ProjectItems;
