import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { DashboardRoutes } from '../../routes/local/routes';
import style from './SideMenu.module.scss';
import Icon from '../../assets/icons/Icon';
import agent from '../../config/config';
import { Role } from '../../helpers';
import DashboardContext from '../../containers/Dashboard/Context';

const SideMenu = (props) => {
  const context = useContext(DashboardContext);

  const [active, setActive] = useState(window.location.pathname);
  if (window.location.pathname !== active) {
    setActive(window.location.pathname);
  }
  const itemForSlidebar = (styles, route, iconName, description, isBadge) => {
    if (props.tower !== null) {
      const towerId = props.tower.id;
      route += towerId;
    }
    let badgeStyle = '';
    if (isBadge) badgeStyle = style.Badge;
    return (
      <div onClick={() => setActive(route)}>
        {active === route ? (
          <div className={style.Active}>
            <Link to={route}>
              <Icon name={iconName} fixWidth={true} />
              <span className={style.Description}> {description} </span>
            </Link>
          </div>
        ) : (
          <div className={styles}>
            <Link to={route}>
              <Icon name={iconName} fixWidth={true} />
              <span className={style.Description}> {description}</span>
              {isBadge ? <span className={badgeStyle}></span> : null}
            </Link>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={
        `${style.SideMenu} ` +
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
            context.isBadgeIncrement,
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
          DashboardRoutes.base + DashboardRoutes.clients.value,
          'fas fa-users',
          'Clientes',
        )}{' '}
        {itemForSlidebar(
          style.MenuItem,
          DashboardRoutes.base + DashboardRoutes.report.value,
          'fas fa-file-alt',
          'Reporte',
        )}
      </div>
    </div>
  );
};

export default SideMenu;
