import React, { useEffect, useState } from "react";
import { POST } from "../../assets/js/request";
import { pages, server } from "../../main/urls";
import { isEmptyObject } from "../../assets/js/commons";
import { useCookies } from "react-cookie";

const Home = (props) => {
  const [cookies, ,] = useCookies();
  if (!cookies.admin) {
    props.history.push(pages.login);
  }

  const [users, setUsers] = useState([]);
  async function fetchUsers() {
    let response = await POST(server.user_list);

    if (response.isSuccess) {
      setUsers(response.data);
    }
  }

  useEffect(() => {
    if (isEmptyObject(users)) {
      fetchUsers();
    }
  }, [users]);

  async function handleDelete(_id) {
    let response = await POST(server.delete_user, { _id });
    if (response.isSuccess) {
      setUsers(users.filter((o) => o._id !== _id));
    }
  }

  return (
    <div className="container">
      <div className="py-4">
        <h1>List of vaccinated people</h1>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Country</th>
              <th scope="col">Email</th>
              <th scope="col">Manufacturer</th>
              <th scope="col">Dose</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  {user.first_name} {user.last_name}
                </td>
                <td>{user.country}</td>
                <td>{user.email}</td>
                <td>{user.manufacturer}</td>
                <td>{user.vaccine}</td>
                <td>
                  <button
                    className="btn btn-outline-primary mr-2"
                    onClick={() => {
                      props.history.push(pages.add_user(user.created_at));
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      handleDelete(user._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
