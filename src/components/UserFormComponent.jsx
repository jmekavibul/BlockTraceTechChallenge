import { useState } from "react";
import axios from "axios";

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
    setData(null);
    setResponseMessage(null);

    axios
      .post("https://blocktrace-express-backend.herokuapp.com/submit", cryptoTransaction, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setResponseMessage(`Error Code: ${error.response.status} Error Message: ${error.response.data}`);
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="my-6 space-y-8 w-1/3 mx-auto">
        <div>
          <label className="block text-gray-700 text-lg font-bold mb-2">
            BlockTrace Tech Challenge
          </label>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Crypto Addresses
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="address"
            value={cryptoTransaction.address}
            placeholder="Crypto Addresses"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            API Key
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="apiKey"
            placeholder="API Key"
            value={cryptoTransaction.apiKey}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Crypto Address Type
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="addressType"
            placeholder="Crypto Address Type"
            value={cryptoTransaction.addressType}
            onChange={handleChange}
          />
        </div>
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit Contact
          </button>
        </div>
        {responseMessage && <div className="text-red-600">{responseMessage}</div>}
      </form>
      <div className="p-16 space-y-8">
        {data && <TableComponent data={data} />}
      </div>
    </div>
  );
};

export default UserFormComponent;
