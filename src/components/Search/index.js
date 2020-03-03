import React from "react";

function Search(props) {
  return (
    <div className="container">
      <br></br>
      <div className="card">
        <div className="container text-center">
          <br></br>
          <form className="form">
            <input className="form-control" type="search" placeholder="Search" aria-label="Search"/>
          </form>
          <br></br>
        </div>
        <div className="content">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
                <th scope="col">DOB</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{props.image}</th>
                <td>{props.name}</td>
                <td>{props.phone}</td>
                <td>{props.dob}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Search;