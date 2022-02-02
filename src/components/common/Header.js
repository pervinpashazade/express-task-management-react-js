import React from "react";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Header = (props) => {
  return <div className="row align-items-center">
    <div className="col-sm-8 col-lg-6 offset-lg-3 offset-0">
      <h1 className="font-weight-light text-center text-sm-left text-lg-center m-0">{props.title}</h1>
    </div>
    {
      props.addButton && props.addButtonTitle &&
      <div className="col-sm-4 col-lg-3 text-center text-sm-right">
        <Button color="light" onClick={props.addButton}>
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          {props.addButtonTitle}
        </Button>
      </div>
    }
  </div>;
};

const Header = (props) => {

  const {
    title,
    addButton,
    addButtonTitle,
  } = props;

  return <div className="row align-items-center">
    <div className="col-sm-8 col-lg-6 offset-lg-3 offset-0">
      <h1 className="font-weight-light text-center text-sm-left text-lg-center m-0">{title}</h1>
    </div>
    {
      addButton && addButtonTitle &&
      <div className="col-sm-4 col-lg-3 text-center text-sm-right">
        <Button
          color="light"
          onClick={addButton}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          {addButtonTitle}
        </Button>
      </div>
    }
  </div>
}

export default Header;