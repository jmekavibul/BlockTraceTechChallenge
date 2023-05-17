import React from "react";
import GraphComponent from "./GraphComponent";

const TableComponent = ({ data }) => {
  // Sort the data by the largest total sent
  const sortedData = data.sort(
    (a, b) => b.summary.totalSentAmount - a.summary.totalSentAmount
  );
  // Get the top 5 rows
  const top5Data = sortedData.slice(0, 5);
  const top5TotalSent = top5Data.reduce((acc, item) => {
    acc[item.summary.totalSentAmount] = item.address;
    return acc;
  }, {});
  return (
    <div>
        <div><GraphComponent top5TotalSent={top5TotalSent}/></div>
        <table>
        <thead>
            <tr>
            <th>Address</th>
            <th>Address Name (attribution)</th>
            <th>Address Type</th>
            <th>Balance</th>
            <th>Total Sent</th>
            <th>Total Received</th>
            <th>Risk Score</th>
            </tr>
        </thead>
        <tbody>
            {sortedData.map((item, index) => (
            <tr key={index}>
                <td>{item.address}</td>
                <td>{item.summary.source}</td>
                <td>{item.asset}</td>
                <td>{item.summary.balance}</td>
                <td>{item.summary.totalSentAmount}</td>
                <td>{item.summary.totalReceivedAmount}</td>
                <td>{item.summary.status}</td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
  );
};

export default TableComponent;
