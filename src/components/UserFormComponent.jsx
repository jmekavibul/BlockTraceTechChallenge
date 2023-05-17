import { useState, useEffect } from "react";

import TableComponent from "./TableComponent";
const UserFormComponent = () => {
  const [cryptoTransaction, setCryptoTransaction] = useState({
    address: "",
    apiKey: "",
    addressType: "",
  });

  const [data, setData] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (event) => {
    setCryptoTransaction({ ...cryptoTransaction, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("https://blocktrace-express-backend.herokuapp.com/submit", {
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
            name="apiKey"
            placeholder="API Key"
            value={cryptoTransaction.apiKey}
            onChange={handleChange}
            
            />
        </div>
        <div>
          <h5>Crypto Address Type</h5>
          <input
            type="text"
            name="addressType"
            placeholder="Crypto Address Type"
            value={cryptoTransaction.addressType}
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

export default UserFormComponent;