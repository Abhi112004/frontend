import React, { useEffect, useState } from "react";
import axios from "axios";
import "./table.css";

import { useNavigate, useParams } from "react-router-dom";
const Home = () => {
  const [data, setdate] = useState([]);
  useEffect(() => {
    apidata();
  }, []);
  const apidata = () => {
    axios
      .get("http://localhost:5000/")
      .then(function (response) {
        // console.log(response.data['Data']);
        
        setdate(response.data['Data']);
      });
  };
  const Handledelete = (e) => {
    var id = e.target.getAttribute("data-id");
    // Show confirmation dialog
    if (window.confirm("Are you sure you want to delete this item?")) {
      const params = new FormData();
      params.set("id", id);
      
      axios
        .put("http://localhost:5000/delete-data", params)
        .then(function (response) {
          if (response.data["status"]) {
            alert("Data deleted successfully");
        
          } else {
            alert("Error deleting data");
          }
        })
        .catch(function (error) {
          alert("An error occurred: " + error.message);
        });
      apidata();
    }
  };

  const naviget = useNavigate();
  const Handleedit = (e) => {
    var id = e.target.getAttribute("data-id");
    // alert(id)navigate
    naviget("/edit/" + id);
  };

  return (
    <>
    <h1 >welcome {localStorage.getItem('email')}</h1>
      <div className="table-container">
        <table className="data-table">
          {" "}
          <tr>
            <th>index</th>
            <th>id</th>
            <th>name</th>
            <th>password</th>
            <th>email</th>
            <th>Action</th>
            <th>Action</th>
          </tr>
          {data.map((obj, i) => {
            return (
              <tr>
                <td>{i + 1}</td>
                <td>{obj._id}</td>
                <td>{obj.name}</td>
                <td>{obj.password}</td>
                <td>{obj.email}</td>
                <td>
                  <button
                    type="button"
                    data-id={obj._id}
                    className="delete-btn"
                    onClick={Handledelete}
                  >
                    Delete
                  </button>
                </td>
                <td>
                    <button
                      type="button"
                      className="edit-btn"
                      data-id={obj._id}
                      onClick={Handleedit}
                    >
                      Edit
                    </button>
                  </td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};
export default Home;
