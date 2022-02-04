import React from 'react';

export const Dashboard = () => {

  return (
    <div className="bg-white rounded p-4">
      <div className="row">
        <div className="col-md-12">
          <div className="page-header">
            <h1 className="font-weight-bold">Dashboard</h1>
          </div>
        </div>
      </div>
      <hr />
      <div className="row mt-5">
        <div className="col-12">
          <div className="alert alert-info">
            You can use Express Task Management software application by going to the pages from the left menu.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
