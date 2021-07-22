import React, { useEffect, useState } from "react";
import { POST } from "../../assets/js/request";
import { pages, server } from "../../main/urls";
import toast, { Toaster } from "react-hot-toast";
import { useCookies } from "react-cookie";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import dateFormat from "dateformat";
import { clone } from "../../assets/js/commons";

const AddUser = (props) => {
  const [data, setData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    country: "",
    manufacturer: "",
    lot_number: "",
    date: "",
    clinic_site: "",
    vaccine: "",
    doc_type: "",
    identification_number: "",
  });
  const [oldData, setOldData] = useState({});
  const [countries, setCountries] = useState([]);

  const [cookies, ,] = useCookies();
  if (!cookies.admin) {
    props.history.push(pages.login);
  }

  function updateValue(key, value) {
    let obj = data;
    obj[key] = value;
    setData(obj);
  }
  async function fetchUserDetails(user_id) {
    let response = await POST(server.user_details, { user_id });

    if (response.isSuccess) {
      let data = clone(response.data);
      setData(response.data);
      ["country", "manufacturer", "vaccine"].forEach((k) => {
        data[k] = { label: data[k] };
      });
      setOldData(data);
    }
  }

  const user_id =
    props.match && props.match.params && props.match.params.user_id;
  let isEdit = typeof user_id !== "undefined";
  useEffect(() => {
    if (isEdit) {
      fetchUserDetails(user_id);
    }
  }, [user_id, isEdit]);

  async function validate() {
    let valid = true;
    if (data.email === "") {
      toast.error("Please enter email");
      valid = false;
    }
    if (data.first_name === "") {
      toast.error("Please enter first name");
      valid = false;
    }
    if (data.last_name === "") {
      toast.error("Please enter last name");
      valid = false;
    }
    if (data.country === "") {
      toast.error("Please enter country");
      valid = false;
    }
    if (data.manufacturer === "") {
      toast.error("Please select manufacturer");
      valid = false;
    }
    if (data.lot_number === "") {
      toast.error("Please enter lot number");
      valid = false;
    }
    if (data.date === "") {
      toast.error("Please select date");
      valid = false;
    }
    if (data.clinic_site === "") {
      toast.error("Please enter clinic sit");
      valid = false;
    }
    if (data.vaccine === "") {
      toast.error("Please select vaccine");
      valid = false;
    }
    if (data.doc_type === "") {
      toast.error("Please enter doc type");
      valid = false;
    }
    if (data.identification_number === "") {
      toast.error("Please enter identification number");
      valid = false;
    }
    if (oldData.email !== data.email) {
      let response = await POST(server.user_check_unique, {
        email: data.email,
      });
      if (response.code === 201) {
        toast.error("Email already used");
        valid = false;
      }
    }

    return valid;
  }
  async function addUser() {
    if (!(await validate())) return;
    let response = await POST(server.add_user, data);
    if (response.isSuccess) {
      props.history.push(pages.home);
    }
  }
  async function updateUser() {
    if (!(await validate())) return;
    let response = await POST(server.update_user, data);
    if (response.isSuccess) {
      props.history.push(pages.home);
    }
  }
  async function handleClick() {
    if (isEdit) {
      updateUser();
    } else {
      addUser();
    }
  }
  async function fetchCountries() {
    let list = await POST(server.countries);
    setCountries(list.map((o) => ({ label: o })));
  }

  useEffect(() => {
    if (countries.length === 0) fetchCountries();
  }, [countries]);

  return (
    <div className="container">
      <div className="py-4">
        <Toaster />
        <h1>Record people vaccination</h1>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">First Name</label>
            <input
              onChange={(e) => updateValue("first_name", e.target.value)}
              type="text"
              defaultValue={oldData.first_name}
              className="form-control"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Last Name</label>
            <input
              onChange={(e) => updateValue("last_name", e.target.value)}
              type="text"
              defaultValue={oldData.last_name}
              className="form-control"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Document Type</label>
            <input
              onChange={(e) => updateValue("doc_type", e.target.value)}
              type="text"
              defaultValue={oldData.doc_type}
              className="form-control"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Identification number</label>
            <input
              onChange={(e) =>
                updateValue("identification_number", e.target.value)
              }
              type="text"
              defaultValue={oldData.identification_number}
              className="form-control"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              onChange={(e) => updateValue("email", e.target.value)}
              defaultValue={oldData.email}
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
            />
          </div>
		  <label htmlFor="exampleInputEmail1">Country</label>
          <Select
            key={oldData.country && oldData.country.label}
            placeholder={"Country"}
            onChange={(e) => updateValue("country", e.label)}
            defaultValue={oldData.country}
            options={countries}
          />
		  <label htmlFor="exampleInputEmail1">Manufacturer</label>
          <Select
            key={oldData.manufacturer}
            placeholder={"Manufacturer"}
            onChange={(e) => updateValue("manufacturer", e.label)}
            defaultValue={oldData.manufacturer}
            options={[
              { label: "Moderna" },
              { label: "Pfizer - BioNTech" },
              { label: "AstraZeneca / COVISHIELD COVID-19" },
            ]}
          />
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Lot Number</label>
            <input
              onChange={(e) => updateValue("lot_number", e.target.value)}
              type="text"
              defaultValue={oldData.lot_number}
              className="form-control"
              aria-describedby="emailHelp"
            />
          </div>
          <label htmlFor="exampleInputEmail1">Date</label>
          <br />
          <Flatpickr
            defaultValue={oldData.date}
            onChange={(d) => {
              d = dateFormat(d, "yyyy-mm-dd");
              updateValue("date", d);
            }}
          />
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Clinic Site</label>
            <input
              onChange={(e) => updateValue("clinic_site", e.target.value)}
              type="text"
              defaultValue={oldData.clinic_site}
              className="form-control"
              aria-describedby="emailHelp"
            />
          </div>
          <label htmlFor="exampleInputEmail1">Dose</label>
          <Select
            key={!!oldData.vaccine}
            placeholder={"Vaccine"}
            onChange={(e) => updateValue("vaccine", e.label)}
            defaultValue={oldData.vaccine}
            options={[{ label: "1st" }, { label: "2nd" }]}
          />

          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleClick}
          >
            {isEdit ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
