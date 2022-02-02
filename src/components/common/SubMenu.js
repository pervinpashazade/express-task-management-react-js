import React from 'react';
import { NavLink } from "react-router-dom";
import { Collapse, NavItem, NavLink as Link } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

class SubMenu extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: {
        'task': !(window.location.href.indexOf("task") > -1),
      }
    }
  };

  toggleNavbar() {
    this.setState({
      collapsed: {
        'task': !this.state.collapsed['task'],
      }
    });
  }

  render() {
    const { icon, title, slug, items } = this.props;
    return (
      <div>
        <NavItem onClick={this.toggleNavbar} className={classNames({ 'menu-open': !this.state.collapsed[slug] })}>
          <Link className="nav-link dropdown-toggle"><FontAwesomeIcon icon={icon} className="mr-2" />{title}</Link>
        </NavItem>
        <Collapse isOpen={!this.state.collapsed[slug]} navbar className={classNames('items-menu', { 'd-block': !this.state.collapsed[slug] })}>
          {
            items.map(
              item => (
                <NavItem key={item.slug}>
                  <NavLink className="nav-link" to={"/" + slug + "/" + item.slug.toLowerCase()}>{item.title}</NavLink>
                </NavItem>
              )
            )
          }
        </Collapse>
      </div>
    );
  }
}

export default SubMenu;