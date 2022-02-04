import React from 'react';
import { connect } from "react-redux";
import { HashRouter, NavLink } from "react-router-dom";
import classNames from 'classnames';
import { Nav, NavItem } from 'reactstrap';
import SubMenu from './SubMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt,
  faChartArea,
  faThList,
  faUsers,
  faEdit,
  faBriefcase,
} from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/img/logo.png';
import { logout } from '../../store/action';
import { storageKey } from '../../config';

class SideBar extends React.Component {
  render() {
    return (
      <div className={classNames('sidebar', { 'is-open': this.props.isOpen })}>
        <div className="fixed">
          <div className="sidebar-header">
            <a className="times" onClick={this.props.toggle}>&times;</a>
            <img src={logo} alt="logo" />
          </div>
          <HashRouter>
            <Nav vertical className="list-unstyled p-3 flex-column">
              <NavItem>
                <NavLink exact className="nav-link" to="/">
                  <FontAwesomeIcon icon={faChartArea} className="mr-2" />Dashboard
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink exact className="nav-link" to="/company">
                  <FontAwesomeIcon icon={faBriefcase} className="mr-2" />Company
                </NavLink>
              </NavItem>
              {
                localStorage.getItem(storageKey.role_id) && localStorage.getItem(storageKey.role_id) === "1" &&
                <>
                  <NavItem>
                    <NavLink exact className="nav-link" to="/employee/list">
                      <FontAwesomeIcon icon={faUsers} className="mr-2" />Employees
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink exact className="nav-link" to="/task/create">
                      <FontAwesomeIcon icon={faEdit} className="mr-2" />Create task
                    </NavLink>
                  </NavItem>
                  <SubMenu
                    slug="task"
                    icon={faThList}
                    title="Task list"
                    items={
                      [{
                        slug: "list", title: "All tasks"
                      },{
                        slug: "all/open", title: "All open"
                      }, {
                        slug: "all/closed", title: "Closed"
                      }
                      ]
                    }
                  />
                </>
              }
              {
                localStorage.getItem(storageKey.role_id) && localStorage.getItem(storageKey.role_id) != "1" &&
                <SubMenu
                  slug="task"
                  icon={faThList}
                  title="Task list"
                  items={
                    [{
                      slug: "list", title: "All tasks"
                    }, {
                      slug: "me/assigned", title: "Assigned to me"
                    }, {
                      slug: "all/open", title: "All open"
                    }, {
                      slug: "all/closed", title: "Closed"
                    }
                    ]
                  }
                />
              }


              <NavItem>
                <a className="nav-link c-pointer" onClick={this.props.logout}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />Sign out
                </a>
              </NavItem>
            </Nav>
          </HashRouter>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => store;
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
