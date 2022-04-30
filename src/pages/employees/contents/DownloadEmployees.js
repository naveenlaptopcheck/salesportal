import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ReactExport from "react-export-excel";


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const DownloadEmployees = () => {
  let { apiRec } = useSelector((state) => state.recordReducer);
  //console.log(apiRec)

  const [employeesData, setEmployeesData] = useState();

  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `${token}` },
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/console/employee_list_download`, config)
      .then(response => {
        setEmployeesData(response.data);
      })
  }, []);


  return (
    <div>
      <ExcelFile element={<button style={{
        textDecoration: "none",
        background: "none",
        border: "none",
        fontSize: "1.3rem",
        fontWeight: "600",
        color: "#00394d",
        textDecorationLine: 'underline',
        cursor: "pointer"
      }}>Download as a list</button>}>
        <ExcelSheet data={employeesData} name="Employees">
          <ExcelColumn label="Name" value="name" />
          <ExcelColumn label="Email" value="email" />
          <ExcelColumn label="Phone" value="phone" />
          <ExcelColumn label="Net Salary" value="net_salary" />
          <ExcelColumn label="Accessible Credit" value="accessible_credit" />
          {/* <ExcelColumn label="Account Holder Name" value="account_holder_name" />
          <ExcelColumn label="Account Number" value="account_number" />
          <ExcelColumn label="IFSC" value="ifsc" /> */}
        </ExcelSheet>
      </ExcelFile>
    </div>
  );
};

export default DownloadEmployees;
