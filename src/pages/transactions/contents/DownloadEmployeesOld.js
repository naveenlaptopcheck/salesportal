import React from "react";
import { useSelector } from "react-redux";
import { CSVLink } from "react-csv";

const DownloadEmployees = () => {
  let { apiRec } = useSelector((state) => state.recordReducer);

  //console.log(apiRec)

  const headers = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Net Salary", key: "net_salary" },
    { label: "Accessible Credit", key: "accessible_credit" },
    { label: "Account Holde Name", key: "account_holder_name" },
    { label: "Account Number", key: "account_number" },
    { label: "IFSC", key: "ifsc" },
  ];

  const csvReport = {
    data: apiRec,
    headers: headers,
    filename: "Employee_List.csv",
  };
  return (
    <div>
      <CSVLink
        style={{
          textDecoration: "none",
          fontSize: "1.3rem",
          fontWeight: "600",
          color: "#00394d",
          textDecorationLine: 'underline',
        }}
        {...csvReport}
      >
        Download as a list
      </CSVLink>
    </div>
  );
};

export default DownloadEmployees;
