import React from "react";
import {Spinner} from "reactstrap";

const Loader = () => {
  return <div className="text-center my-5">
    <h3 className="font-weight-light mb-4">Məlumatlar yüklənir...</h3>
    <Spinner color="secondary"/>
  </div>;
};

export default Loader;