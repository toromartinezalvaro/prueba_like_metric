import React, { useState, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Resizable } from 're-resizable';
import {
  DashboardRoutes,
  ContractRoutes,
  ContractFlowRoutes,
  AreasAndPrices,
  InitialData,
  Increments,
  SalesSpeed,
  SalesRoom,
  Reports,
  Contracts,
} from '../../routes/local/routes';
import style from './SideMenu.module.scss';
import Icon from '../../assets/icons/Icon';
import agent from '../../config/config';
import { Role } from '../../helpers';
import Section from './Section';
import Header from './Header/Header';

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
        onClick={(e) => {
          e.stopPropagation();
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

  return (
    <div className="container">
      <Resizable
        enable={{
          right: true,
        }}
        className={
          `${style.SideMenu}  ` +
          `${tower !== null ? style.ZeroWidth : style.OriginalWidth}`
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
                <Header
                  title="Datos generales"
                  validation={!!agent.isAuthorized([Role.Admin, Role.Super])}
                />
                <Section
                  title={'Datos iniciales'}
                  validation={InitialData.array.some((url) =>
                    window.location.pathname.includes(url),
                  )}
                  display={!!agent.isAuthorized([Role.Admin, Role.Super])}
                  items={[
                    agent.isAuthorized([Role.Admin, Role.Super]) &&
                      itemForSlidebar(
                        style.MenuItem,
                        DashboardRoutes.base + DashboardRoutes.schedule.value,
                        'fas fa-users',
                        'Calendario',
                      ),
                  ]}
                />

                <Header
                  title="Ventas"
                  validation={
                    !!agent.isAuthorized([Role.Admin, Role.Super]) ||
                    !!agent.isAuthorized([Role.User])
                  }
                />
                <Section
                  title={'Cuadro de Áreas y Precios'}
                  validation={AreasAndPrices.array.some((url) =>
                    window.location.pathname.includes(url),
                  )}
                  display={!!agent.isAuthorized([Role.Admin, Role.Super])}
                  items={[
                    agent.isAuthorized([Role.Admin, Role.Super]) &&
                      itemForSlidebar(
                        style.MenuItem,
                        DashboardRoutes.base + DashboardRoutes.building.value,
                        'fa-building',
                        'Esquema',
                      ),
                    agent.isAuthorized([Role.Admin, Role.Super]) &&
                      itemForSlidebar(
                        style.MenuItem,
                        DashboardRoutes.base + DashboardRoutes.areas.value,
                        'fa-layer-group',
                        'Areas',
                      ),
                    agent.isAuthorized([Role.Admin, Role.Super]) &&
                      itemForSlidebar(
                        style.MenuItem,
                        DashboardRoutes.base +
                          DashboardRoutes.areasAdditional.value,
                        'fa-layer-group',
                        'Areas Adicionales',
                      ),
                    agent.isAuthorized([Role.Admin, Role.Super]) &&
                      itemForSlidebar(
                        style.MenuItem,
                        DashboardRoutes.base + DashboardRoutes.pairing.value,
                        'fas fa-star-half-alt',
                        'Apareamiento',
                      ),
                    agent.isAuthorized([Role.Admin, Role.Super]) &&
                      itemForSlidebar(
                        style.MenuItem,
                        DashboardRoutes.base + DashboardRoutes.prime.value,
                        'fa-sort-amount-up',
                        'Primas',
                      ),
                    agent.isAuthorized([Role.Admin, Role.Super]) &&
                      itemForSlidebar(
                        style.MenuItem,
                        DashboardRoutes.base + DashboardRoutes.clustering.value,
                        'fas fa-object-group',
                        'Agrupamiento',
                      ),
                  ]}
                />

                <Section
                  title={'Estrategias de incrementos'}
                  validation={Increments.array.some((url) =>
                    window.location.pathname.includes(url),
                  )}
                  display={!!agent.isAuthorized([Role.Admin, Role.Super])}
                  items={[
                    agent.isAuthorized([Role.Admin, Role.Super]) &&
                      itemForSlidebar(
                        style.MenuItem,
                        DashboardRoutes.base + DashboardRoutes.increments.value,
                        'fas fa-angle-double-up',
                        'Incrementos',
                        isBadgeIncrement,
                      ),
                    agent.isAuthorized([Role.Admin, Role.Super]) &&
                      itemForSlidebar(
                        style.MenuItem,
                        DashboardRoutes.base + DashboardRoutes.strategy.value,
                        'fas fa-chart-line',
                        'Estrategia',
                      ),
                  ]}
                />

                <Section
                  title={'Forma de pago'}
                  validation={SalesSpeed.array.some((url) =>
                    window.location.pathname.includes(url),
                  )}
                  display={!!agent.isAuthorized([Role.Admin, Role.Super])}
                  items={[
                    agent.isAuthorized([Role.Admin, Role.Super]) &&
                      itemForSlidebar(
                        style.MenuItem,
                        DashboardRoutes.base +
                          DashboardRoutes.futureSalesSpeed.value,
                        'fas fa-calendar-alt',
                        'Forma de pago',
                      ),
                  ]}
                />

                <Section
                  title={'Sala de ventas'}
                  validation={SalesRoom.array.some((url) =>
                    window.location.pathname.includes(url),
                  )}
                  display={
                    !!agent.isAuthorized([Role.Admin, Role.Super]) ||
                    !!agent.isAuthorized([Role.User])
                  }
                  items={[
                    agent.isAuthorized([Role.User]) &&
                      itemForSlidebar(
                        style.MenuItem,
                        DashboardRoutes.base + DashboardRoutes.clients.value,
                        'fas fa-users',
                        'Clientes',
                      ),
                    agent.isAuthorized([Role.Admin, Role.Super]) &&
                      itemForSlidebar(
                        style.MenuItem,
                        DashboardRoutes.base + DashboardRoutes.clients.value,
                        'fas fa-users',
                        'Clientes',
                      ),
                    agent.isAuthorized([Role.Admin, Role.Super]) &&
                      itemForSlidebar(
                        style.MenuItem,
                        DashboardRoutes.base +
                          DashboardRoutes.saleRequests.value,
                        'fas fa-clipboard-check',
                        'Solicitudes de venta',
                      ),
                  ]}
                />

                <Section
                  title={'Informes'}
                  validation={Reports.array.some((url) =>
                    window.location.pathname.includes(url),
                  )}
                  display={!!agent.isAuthorized([Role.Admin, Role.Super])}
                  items={[
                    agent.isAuthorized([Role.Admin, Role.Super]) &&
                      itemForSlidebar(
                        style.MenuItem,
                        DashboardRoutes.base + DashboardRoutes.summary.value,
                        'fa-list-ol',
                        'Resumen',
                      ),
                    agent.isAuthorized([Role.Admin, Role.Super]) &&
                      itemForSlidebar(
                        style.MenuItem,
                        DashboardRoutes.base + DashboardRoutes.rackAreas.value,
                        'fas fa-ruler',
                        'Resumen Areas',
                      ),
                    agent.isAuthorized([Role.Admin, Role.Super]) &&
                      itemForSlidebar(
                        style.MenuItem,
                        DashboardRoutes.base +
                          DashboardRoutes.detailAdmin.value,
                        'fas fa-book-open',
                        'Detalle admin',
                      ),
                    agent.isAuthorized([Role.Admin, Role.Super, Role.User]) &&
                      itemForSlidebar(
                        style.MenuItem,
                        DashboardRoutes.base + DashboardRoutes.detail.value,
                        'fas fa-book-open',
                        'Detalle',
                      ),

                    agent.isAuthorized([Role.Admin, Role.Super]) &&
                      itemForSlidebar(
                        style.MenuItem,
                        DashboardRoutes.base + DashboardRoutes.report.value,
                        'fas fa-file-alt',
                        'Reporte',
                      ),
                    agent.isAuthorized([Role.Admin, Role.Super]) &&
                      itemForSlidebar(
                        style.MenuItem,
                        DashboardRoutes.base + DashboardRoutes.cashFlow.value,
                        'fas fa-cash-register',
                        'Flujo de caja',
                      ),
                  ]}
                />

                <Header
                  title="Contratos"
                  validation={!!agent.isAuthorized([Role.Admin, Role.Super])}
                />
                <Section
                  title={'Contratos'}
                  validation={Contracts.array.some((url) =>
                    window.location.pathname.includes(url),
                  )}
                  display={!!agent.isAuthorized([Role.Admin, Role.Super])}
                  items={[
                    agent.isAuthorized([Role.Admin, Role.Super]) &&
                      itemForSlidebar(
                        style.MenuItem,
                        DashboardRoutes.base + ContractRoutes.base.value,
                        'fas fa-file-signature',
                        'Contratos',
                      ),
                    agent.isAuthorized([Role.Admin, Role.Super]) &&
                      itemForSlidebar(
                        style.MenuItem,
                        DashboardRoutes.base + ContractFlowRoutes.base.value,
                        'fas fa-file-contract',
                        'Flujo de Contratos',
                      ),
                  ]}
                />
              </div>
            </div>
          </Fragment>
        )}
      </Resizable>
    </div>
  );
};

export default SideMenu;
