import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../store/action';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAlignLeft,
  faBars,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import {
  Navbar,
  Collapse,
  Button,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Navbar className="navbar p-3 mb-3" expand="sm">
        <Button
          color="light"
          className="mr-2"
          onClick={this.props.toggle}
        >
          <FontAwesomeIcon icon={faAlignLeft} />
        </Button>
        <Button color="dark" onClick={this.toggle} className="d-block d-sm-none">
          <FontAwesomeIcon icon={faBars} />
        </Button>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto mt-3 mt-sm-0" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav>
                <div className="d-flex">
                  <div className="mr-2">
                    <p className="font-weight-bold text-right m-0">
                      {`${this.props.user?.name ? this.props.user.name + ' ' : ''} ${this.props.user?.surname ? this.props.user.surname : ''}`}
                    </p>
                    <p style={{ lineHeight: 1 }} className="m-0 text-right text-muted">
                      {this.props.user?.role?.name}
                    </p>
                  </div>
                  <Button
                    color="white"
                  >
                    <FontAwesomeIcon icon={faUser} />
                  </Button>
                </div>
              </DropdownToggle>
              <DropdownMenu className="p-3" style={{
                maxWidth: '500px',
                maxHeight: "300px",
                overflow: 'auto'
              }} right>
                <h4 className="font-weight-bold">Account</h4>
                <DropdownItem divider />
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = store => store;
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);