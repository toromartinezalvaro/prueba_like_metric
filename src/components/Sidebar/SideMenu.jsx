import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardRoutes } from '../../routes/local/routes';
import style from './SideMenu.module.scss';
import Icon from '../../assets/icons/Icon';
import agent from '../../config/config';
import { Role } from '../../helpers';
import { Resizable } from 're-resizable';

const SideMenu = (props) => {
  const resizable_Heigh = '100vh';
  const [active, setActive] = useState(window.location.pathname);

  const handleEnterEvent = () => {
    props.onHideArrow(true);
  };
  const handleLeaveEvent = () => {
    props.onHideArrow(false);
  };

  if (window.location.pathname !== active) {
    setActive(window.location.pathname);
  }
  const itemForSlidebar = (styles, route, iconName, description) => {
    if (props.tower !== null) {
      const towerId = props.tower.id;
      route += towerId;
    }
    return (
      <div onClick={() => setActive(route)}>
        {active === route ? (
          <div className={style.Active}>
            <Link to={route}>
              <Icon name={iconName} fixWidth={true} />
              <label className={style.Description}> {description} </label>
            </Link>
          </div>
        ) : (
          <div className={styles}>
            <Link to={route}>
              <Icon name={iconName} fixWidth={true} />
              <label className={style.Description}> {description} </label>
            </Link>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container">
      <Resizable
        className={
          `${style.SideMenu} ` +
          `${props.tower !== null ? style.OriginalWidth : style.ZeroWidth}`
        }
        onMouseEnter={handleEnterEvent}
        onMouseLeave={handleLeaveEvent}
        size={{
          width: `${props.resizableWidth}`,
          height: `${resizable_Heigh}`,
        }}
      >
        <div className={`${style.fixedWidth}`} >
          <div>
            <label>{props.tower ? props.tower.name : ''}</label>
          </div>

          <div className={style.IconsContainer} >
            {agent.isAuthorized([Role.Admin, Role.Super]) &&
              itemForSlidebar(
                style.MenuItem,
                DashboardRoutes.base + DashboardRoutes.schedule.value,
                'fas fa-users',
                'Calendario',
              )}
            {agent.isAuthorized([Role.Admin, Role.Super]) &&
              itemForSlidebar(
                style.MenuItem,
                DashboardRoutes.base + DashboardRoutes.building.value,
                'fa-building',
                'Esquema',
              )}
            {agent.isAuthorized([Role.Admin, Role.Super]) &&
              itemForSlidebar(
                style.MenuItem,
                DashboardRoutes.base + DashboardRoutes.areas.value,
                'fa-layer-group',
                'Areas',
              )}
            {agent.isAuthorized([Role.Admin, Role.Super]) &&
              itemForSlidebar(
                style.MenuItem,
                DashboardRoutes.base + DashboardRoutes.prime.value,
                'fa-sort-amount-up',
                'Primas',
              )}
            {agent.isAuthorized([Role.Admin, Role.Super]) &&
              itemForSlidebar(
                style.MenuItem,
                DashboardRoutes.base + DashboardRoutes.summary.value,
                'fa-list-ol',
                'Resumen',
              )}
            {agent.isAuthorized([Role.Admin, Role.Super]) &&
              itemForSlidebar(
                style.MenuItem,
                DashboardRoutes.base + DashboardRoutes.rackAreas.value,
                'fas fa-ruler',
                'Resumen Areas',
              )}
            {agent.isAuthorized([Role.Admin, Role.Super]) &&
              itemForSlidebar(
                style.MenuItem,
                DashboardRoutes.base + DashboardRoutes.detailAdmin.value,
                'fas fa-book-open',
                'Detalle admin',
              )}
            {agent.isAuthorized([Role.Admin, Role.Super, Role.User]) &&
              itemForSlidebar(
                style.MenuItem,
                DashboardRoutes.base + DashboardRoutes.detail.value,
                'fas fa-book-open',
                'Detalle',
              )}
            {agent.isAuthorized([Role.Admin, Role.Super]) &&
              itemForSlidebar(
                style.MenuItem,
                DashboardRoutes.base + DashboardRoutes.clustering.value,
                'fas fa-object-group',
                'Agrupamiento',
              )}
            {itemForSlidebar(
              style.MenuItem,
              DashboardRoutes.base + DashboardRoutes.futureSalesSpeed.value,
              'fas fa-calendar-alt',
              'Velocidad ventas futuras',
            )}
            {agent.isAuthorized([Role.Admin, Role.Super]) &&
              itemForSlidebar(
                style.MenuItem,
                DashboardRoutes.base + DashboardRoutes.increments.value,
                'fas fa-angle-double-up',
                'Incrementos',
              )}
            {agent.isAuthorized([Role.Admin, Role.Super]) &&
              itemForSlidebar(
                style.MenuItem,
                DashboardRoutes.base + DashboardRoutes.strategy.value,
                'fas fa-chart-line',
                'Estrategia',
              )}
            {agent.isAuthorized([Role.Admin, Role.Super, Role.User]) &&
              itemForSlidebar(
                style.MenuItem,
                DashboardRoutes.base + DashboardRoutes.salesRoom.value,
                'fas fa-dollar-sign',
                'Sala de Ventas',
              )}
            {itemForSlidebar(
              style.MenuItem,
              DashboardRoutes.base + DashboardRoutes.report.value,
              'fas fa-file-alt',
              'Reporte',
            )}
          </div>
        </div>
      </Resizable>
    </div>
  );
};

export default SideMenu;
