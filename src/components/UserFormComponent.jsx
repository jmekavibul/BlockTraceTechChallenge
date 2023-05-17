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
      <form onSubmit={handleSubmit} className="my-6 space-y-8 w-1/3 mx-auto"> 
        <div>      
          <label class="block text-gray-700 text-lg font-bold mb-2" for="username">
            BlockTrace Tech Challenge
          </label>
        </div>
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Crypto Addresses
          </label>
          <textarea
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="address"
            value={cryptoTransaction.address}
            placeholder="PlaceHolder"
            onChange={handleChange}
          />
        </div>
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            API Key
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="apiKey"
            placeholder="API Key"
            value={cryptoTransaction.apiKey}
            onChange={handleChange}
          />
        </div>
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Crypto Address Type
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="addressType"
            placeholder="Crypto Address Type"
            value={cryptoTransaction.addressType}
            onChange={handleChange}
          />
        </div>
        <div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit Contact
        </button>
        </div>
        {data && <TableComponent data={data} />}
        {responseMessage && <div>{responseMessage}</div>} {/* Display response message if available */}
      </form>
    </div>
  );
}

export default UserFormComponent;