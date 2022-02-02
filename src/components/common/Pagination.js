import React from 'react';

class Pagination extends React.Component {
  pagination = () => {
    let pagination = [];
    let startPage, endPage;
    let total_count = this.props.total_count;
    let rows_on_page = this.props.rows_on_page;
    let page = this.props.page;
    // let assoActive = this.props.assoActive;
    let page_count = Math.ceil(total_count / rows_on_page);

    if (page_count <= 10) {
      startPage = 1;
      endPage = page_count;
    } else {
      if (page <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (Number(page) + 4 >= page_count) {
        startPage = page_count - 9;
        endPage = page_count;
      } else {
        startPage = Number(page) - 5;
        endPage = Number(page) + 4;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pagination.push(
        <li key={i}>
          <span onClick={(() => this.props.getData(i, rows_on_page, this.props.typeId))}
            className={i === Number(page) ? "page active" : "page"}>{i}</span>
        </li>
      )
    }

    return pagination;
  }

  render() {
    return (
      <div className="pagination my-4">
        <ul className="m-auto">
          <li className="page-item">
            <select className="d-inline" onChange={this.props.setRowCount} value={this.props.rows_on_page}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </li>
          {this.pagination()}
        </ul>
      </div>
    )
  }
}

export default Pagination;