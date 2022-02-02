import React from 'react';

class NotFound extends React.Component {
  render() {
    return (
      <div>
        <h1 className="mb-4 font-weight-bold text-center">Express Task Management App by Pervin Pashazade</h1>
        <div className="row mt-5">
          <div className="col-12">
            <div className="alert alert-danger">
              <h3>Error 404!</h3>
              Page Not Found
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
