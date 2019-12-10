import React, { useState, useContext, Fragment } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';
import { Resizable } from 're-resizable';
import { DashboardRoutes } from '../../routes/local/routes';
import style from './SideMenu.module.scss';
import Icon from '../../assets/icons/Icon';
import agent from '../../config/config';
import { Role } from '../../helpers';

const SideMenu = ({
  resizableWidth,
  onChange,
  onHideArrow,
  tower,
  isBadgeIncrement,
  showContent,
  onChangeShowContent,
}) => {
  const [active, setActive] = useState(window.location.pathname);

  const onChangeResizeStop = (change) => {
    onChange(resizableWidth * 0.3 <= -change ? 17 : 200);
    onHideArrow(true);
    onChangeShowContent(!(resizableWidth * 0.3 <= -change));
  };

  const onChangeResize = (change) => {
    onChangeShowContent(change > -170);
  };

  const handleEnterEvent = () => {
    onHideArrow(true);
  };
  const handleLeaveEvent = () => {
    onHideArrow(resizableWidth <= 17);
  };

  if (window.location.pathname !== active) {
    setActive(window.location.pathname);
  }
  const itemForSlidebar = (styles, route, iconName, description, isBadge) => {
    if (tower !== null) {
      const towerId = tower.id;
      route += towerId;
    }
    let badgeStyle = '';
    if (isBadge) badgeStyle = style.Badge;
    return (
      <div
        onClick={() => {
          setActive(route);
        }}
      >
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

  const evaluate = () => {
    return [DashboardRoutes.base + DashboardRoutes.schedule.value].includes(
      active.slice(0, active.indexOf(tower ? tower.id : '')),
    );
  };

  return (
    <div className="container">
      <Resizable
        enable={{
          right: true,
        }}
        className={
          `${style.SideMenu} ` +
          `${tower !== null ? style.OriginalWidth : style.ZeroWidth}`
        }
        onMouseEnter={handleEnterEvent}
        onMouseLeave={handleLeaveEvent}
        size={{ width: `${resizableWidth}`, height: '100vh' }}
        onResize={(e, direction, ref, d) => onChangeResize(d.width)}
        onResizeStop={(e, direction, ref, d) => onChangeResizeStop(d.width)}
      >
        {showContent && (
          <Fragment>
            <div className={style.fixedWidth + style.NoVisible}>
              <div className={style.title}>
                <label>{tower ? tower.name : ''}</label>
              </div>
              <div className={style.IconsContainer}>
                <div className={style.header}>Datos generales</div>
                <ExpansionPanel
                  classes={{ root: style.expansionPanel }}
                  defaultExpanded={evaluate()}
                >
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    classes={{ root: style.expansionPanelSummary }}
                  >
                    Datos iniciales
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails
                    classes={{ root: style.expansionPanelDetails }}
                  >
                    <div className={style.linkContainer}>
                      {agent.isAuthorized([Role.Admin, Role.Super]) &&
                        itemForSlidebar(
                          style.MenuItem,
                          DashboardRoutes.base + DashboardRoutes.schedule.value,
                          'fas fa-users',
                          'Calendario',
                        )}
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <div className={style.header}>Ventas</div>
                <ExpansionPanel
                  classes={{ root: style.expansionPanel }}
                  defaultExpanded={[
                    DashboardRoutes.base + DashboardRoutes.building.value,
                    DashboardRoutes.base + DashboardRoutes.areas.value,
                    DashboardRoutes.base +
                      DashboardRoutes.areasAdditional.value,
                    DashboardRoutes.base + DashboardRoutes.pairing.value,
                    DashboardRoutes.base + DashboardRoutes.prime.value,
                    DashboardRoutes.base + DashboardRoutes.clustering.value,
                  ].includes(active)}
                >
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    classes={{ root: style.expansionPanelSummary }}
                  >
                    Cuadro de Áreas y Precios
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails
                    classes={{ root: style.expansionPanelDetails }}
                  >
                    <div className={style.linkContainer}>
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
                          DashboardRoutes.base +
                            DashboardRoutes.areasAdditional.value,
                          'fa-layer-group',
                          'Areas Adicionales',
                        )}
                      {agent.isAuthorized([Role.Admin, Role.Super]) &&
                        itemForSlidebar(
                          style.MenuItem,
                          DashboardRoutes.base + DashboardRoutes.pairing.value,
                          'fas fa-star-half-alt',
                          'Apareamiento',
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
                          DashboardRoutes.base +
                            DashboardRoutes.clustering.value,
                          'fas fa-object-group',
                          'Agrupamiento',
                        )}
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel classes={{ root: style.expansionPanel }}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    classes={{ root: style.expansionPanelSummary }}
                  >
                    Estrategias de incrementos
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails
                    classes={{ root: style.expansionPanelDetails }}
                  >
                    <div className={style.linkContainer}>
                      {agent.isAuthorized([Role.Admin, Role.Super]) &&
                        itemForSlidebar(
                          style.MenuItem,
                          DashboardRoutes.base +
                            DashboardRoutes.increments.value,
                          'fas fa-angle-double-up',
                          'Incrementos',
                          isBadgeIncrement,
                        )}
                      {agent.isAuthorized([Role.Admin, Role.Super]) &&
                        itemForSlidebar(
                          style.MenuItem,
                          DashboardRoutes.base + DashboardRoutes.strategy.value,
                          'fas fa-chart-line',
                          'Estrategia',
                        )}
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel classes={{ root: style.expansionPanel }}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    classes={{ root: style.expansionPanelSummary }}
                  >
                    Velocidad de ventas
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails
                    classes={{ root: style.expansionPanelDetails }}
                  >
                    <div className={style.linkContainer}>
                      {agent.isAuthorized([Role.Admin, Role.Super]) &&
                        itemForSlidebar(
                          style.MenuItem,
                          DashboardRoutes.base +
                            DashboardRoutes.futureSalesSpeed.value,
                          'fas fa-calendar-alt',
                          'Velocidad ventas futuras',
                        )}
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel classes={{ root: style.expansionPanel }}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    classes={{ root: style.expansionPanelSummary }}
                  >
                    Sala de ventas
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails
                    classes={{ root: style.expansionPanelDetails }}
                  >
                    <div className={style.linkContainer}>
                      {agent.isAuthorized([Role.User]) &&
                        itemForSlidebar(
                          style.MenuItem,
                          DashboardRoutes.base + DashboardRoutes.clients.value,
                          'fas fa-users',
                          'Clientes',
                        )}
                      {agent.isAuthorized([Role.Admin, Role.Super]) &&
                        itemForSlidebar(
                          style.MenuItem,
                          DashboardRoutes.base + DashboardRoutes.clients.value,
                          'fas fa-users',
                          'Clientes',
                        )}
                      {agent.isAuthorized([Role.Admin, Role.Super]) &&
                        itemForSlidebar(
                          style.MenuItem,
                          DashboardRoutes.base +
                            DashboardRoutes.saleRequests.value,
                          'fas fa-clipboard-check',
                          'Solicitudes de venta',
                        )}
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel classes={{ root: style.expansionPanel }}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    classes={{ root: style.expansionPanelSummary }}
                  >
                    Informes
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails
                    classes={{ root: style.expansionPanelDetails }}
                  >
                    <div className={style.linkContainer}>
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
                          DashboardRoutes.base +
                            DashboardRoutes.rackAreas.value,
                          'fas fa-ruler',
                          'Resumen Areas',
                        )}
                      {agent.isAuthorized([Role.Admin, Role.Super]) &&
                        itemForSlidebar(
                          style.MenuItem,
                          DashboardRoutes.base +
                            DashboardRoutes.detailAdmin.value,
                          'fas fa-book-open',
                          'Detalle admin',
                        )}
                      {agent.isAuthorized([
                        Role.Admin,
                        Role.Super,
                        Role.User,
                      ]) &&
                        itemForSlidebar(
                          style.MenuItem,
                          DashboardRoutes.base + DashboardRoutes.detail.value,
                          'fas fa-book-open',
                          'Detalle',
                        )}

                      {agent.isAuthorized([Role.Admin, Role.Super]) &&
                        itemForSlidebar(
                          style.MenuItem,
                          DashboardRoutes.base + DashboardRoutes.report.value,
                          'fas fa-file-alt',
                          'Reporte',
                        )}
                      {agent.isAuthorized([Role.Admin, Role.Super]) &&
                        itemForSlidebar(
                          style.MenuItem,
                          DashboardRoutes.base + DashboardRoutes.cashFlow.value,
                          'fas fa-cash-register',
                          'Flujo de caja',
                        )}
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
            </div>
          </Fragment>
        )}
      </Resizable>
    </div>
  );
};

export default SideMenu;
