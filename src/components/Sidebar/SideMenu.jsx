import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardRoutes } from '../../routes/local/routes';
import style from './SideMenu.module.scss';
import Icon from '../../assets/icons/Icon';
import agent from '../../config/config';
import { Role } from '../../helpers';

const SideMenu = (props) => {
  const [active, setActive] = useState(window.location.pathname);
  const itemForSlidebar = (styles, route, iconName, description) => {
    if (props.tower !== null) {
      const towerId = props.tower.id;
      route = route + towerId;
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

  const exclusiveAuthorizations = () => (agent.currentUser.id === 1
    || agent.currentUser.id === 2
    || agent.currentUser.id === 4);

  return (
    <div
      className={
        style.SideMenu +
        ' ' +
        `${props.tower !== null ? style.OriginalWidth : style.ZeroWidth}`
      }
    >
      <div>
        <label>{props.tower ? props.tower.name : ''}</label>
      </div>
      <div className={style.IconsContainer}>
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
            'Detalle',
          )}
        {agent.isAuthorized([Role.User, Role.User]) &&
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
        {exclusiveAuthorizations() &&
          itemForSlidebar(
            style.MenuItem,
            DashboardRoutes.base + DashboardRoutes.futureSalesSpeed.value,
            'fas fa-calendar-alt',
            'Velocidad ventas futuras',
          )}
        {exclusiveAuthorizations() &&
          agent.isAuthorized([Role.Admin, Role.Super]) &&
          itemForSlidebar(
            style.MenuItem,
            DashboardRoutes.base + DashboardRoutes.increments.value,
            'fas fa-angle-double-up',
            'Incrementos',
          )}
        {exclusiveAuthorizations() &&
          agent.isAuthorized([Role.Admin, Role.Super]) &&
          itemForSlidebar(
            style.MenuItem,
            DashboardRoutes.base + DashboardRoutes.strategy.value,
            'fas fa-chart-line',
            'Estrategia',
          )}
        {exclusiveAuthorizations() &&
          agent.isAuthorized([Role.Admin, Role.Super, Role.User]) &&
          itemForSlidebar(
            style.MenuItem,
            DashboardRoutes.base + DashboardRoutes.salesRoom.value,
            'fas fa-dollar-sign',
            'Sala de Ventas',
          )}
        {exclusiveAuthorizations() &&
          itemForSlidebar(
            style.MenuItem,
            DashboardRoutes.base + DashboardRoutes.clients.value,
            'fas fa-users',
            'Clientes',
          )}
      </div>
    </div>
  );
};

export default SideMenu;
