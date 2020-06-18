import React, { useState, useEffect } from 'react';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Resizable } from 're-resizable';
import { Link } from 'react-router-dom';
import {
  DashboardRoutes,
  UserRoutes,
  GroupsRoutes,
} from '../../routes/local/routes';
import style from './SideMenu.module.scss';
import Icon from '../../assets/icons/Icon';
import agent from '../../config/config';
import { Role } from '../../helpers';

const UserSideMenu = (props) => {
  const [user, setUser] = useState(agent.currentUser);
  const [active, setActive] = useState(window.location.pathname);

  const onChangeResize = (change) => {
    props.onChange(props.resizableWidth * 0.3 <= -change ? 17 : 200);
    props.onHideArrow(true);
  };

  const handleEnterEvent = () => {
    props.onHideArrow(true);
  };

  const handleLeaveEvent = () => {
    props.onHideArrow(props.resizableWidth > 0 ? false : true);
  };

  useEffect(() => {
    setUser(agent.currentUser);
  });

  const itemForSidebar = (styles, route, iconName, description) => {
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
          `${style.SideMenu} ` +
          `${props.tower !== null ? style.OriginalWidth : style.ZeroWidth}`
        }
        size={{ width: `${props.resizableWidth}px`, height: '100vh' }}
        onResizeStop={(e, direction, ref, d) => onChangeResize(d.width)}
        onMouseEnter={handleEnterEvent}
        onMouseLeave={handleLeaveEvent}
      >
        <div className={style.fixedWidth + style.NoVisible}>
          <div className={style.title}>
            <label>{props.tower ? props.tower.name : ''}</label>
          </div>
          <div className={style.IconsContainer}>
            <ExpansionPanel
              classes={{ root: style.expansionPanel }}
              defaultExpanded
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                classes={{ root: style.expansionPanelSummary }}
              >
                Usuario
              </ExpansionPanelSummary>
              <ExpansionPanelDetails
                classes={{ root: style.expansionPanelDetails }}
              >
                <div className={style.linkContainer}>
                  {itemForSidebar(
                    style.MenuItem,
                    UserRoutes.base,
                    null,
                    'Perfil',
                  )}
                  {agent.isAuthorized([Role.Admin, Role.Super]) &&
                    itemForSidebar(
                      style.MenuItem,
                      UserRoutes.base + UserRoutes.create,
                      null,
                      'Crear usuario',
                    )}
                  {agent.isAuthorized([Role.Admin, Role.Super]) &&
                    itemForSidebar(
                      style.MenuItem,
                      UserRoutes.base + UserRoutes.assignProjects,
                      null,
                      'Admin usuarios',
                    )}
                  {agent.isAuthorized([Role.Admin, Role.Super]) &&
                    itemForSidebar(
                      style.MenuItem,
                      UserRoutes.base + UserRoutes.assignCompanies,
                      null,
                      'Admin compañías',
                    )}
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            {agent.isAuthorized([Role.Admin, Role.Super]) && (
              <ExpansionPanel
                classes={{ root: style.expansionPanel }}
                defaultExpanded
              >
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  classes={{ root: style.expansionPanelSummary }}
                >
                  Grupos
                </ExpansionPanelSummary>
                <ExpansionPanelDetails
                  classes={{ root: style.expansionPanelDetails }}
                >
                  <div className={style.linkContainer}>
                    {itemForSidebar(
                      style.MenuItem,
                      GroupsRoutes.base,
                      null,
                      'Grupos / Items',
                    )}
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            )}
          </div>
        </div>
      </Resizable>
    </div>
  );
};

export default UserSideMenu;
