import { useState, useEffect } from "react";

import TableComponent from "./TableComponent";
const UserForm = () => {
  const [cryptoTransaction, setCryptoTransaction] = useState({
    address: "",
    apikey: "",
    cryptoaddresstype: "",
  });

  const [data, setData] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (event) => {
    setCryptoTransaction({ ...cryptoTransaction, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:9000/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cryptoTransaction),
    })
      .then((response) => response.json())
      .then((message) => {
        setData(message); // Setting the data received to state
      })
      .catch((error) => {
        setResponseMessage("Error occurred.", error);
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}> 
        <div>
          <h3>Contact Form</h3>
        </div>
        <div>
          <h5>Crypto Addresses</h5>
          <textarea
            name="address"
            value={cryptoTransaction.address}
            placeholder="PlaceHolder"
            onChange={handleChange}
            ></textarea>
        </div>
        <div>
          <h5>API Key</h5>
          <input
            type="text"
            name="apikey"
            placeholder="API Key"
            value={cryptoTransaction.apikey}
            onChange={handleChange}
            
            />
        </div>
        <div>
          <h5>Crypto Address Type</h5>
          <input
            type="text"
            name="cryptoaddresstype"
            placeholder="Crypto Address Type"
            value={cryptoTransaction.cryptoaddresstype}
            onChange={handleChange}

          />
        </div>
        <div>
          <button>Submit Contact</button>
        </div>
        {data && <TableComponent data={data} />}
        {responseMessage && <div>{responseMessage}</div>} {/* Display response message if available */}
      </form>
    </div>
  );
}

export default UserForm;