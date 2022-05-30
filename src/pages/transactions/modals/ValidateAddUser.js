export const validate = (values) => {
  let errors = {};

  //Name validation
  if (!values.name) {
    errors.name = "Required";
  } else if (!isNaN(Number(values.name))) {
    errors.name = "Must be a string";
  }

  //Phone validation
  if (!values.phone) {
    errors.phone = "Required";
  } else if (isNaN(Number(values.phone))) {
    errors.phone = "Must be a number";
  } else if (values.phone.length !== 10) {
    errors.phone = "Must be 10 digits long";
  }

  //Email
  if (!values.email) {
    errors.email = "Required";
  } else if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      values.email
    )
  ) {
    errors.email = "Invalid email format";
  }

  // //Status
  // if (!values.status) {
  //   errors.status = "Required";
  // } else if (
  //   values.status.toLowerCase() !== "active" &&
  //   values.status.toLowerCase() !== "inactive"
  // ) {
  //   errors.status = "Status must be active or inactive";
  // }

  //AAdhar
  // if (!values.aadhar) {
  //   errors.aadhar = "Required";
  // } else if (isNaN(Number(values.aadhar))) {
  //   errors.aadhar = "Must be a number";
  // } else if (values.aadhar.length !== 12) {
  //   errors.aadhar = "Must be 12 digits long";
  // }

  //PAN
  // if (!values.pan_card) {
  //   errors.pan_card = "Required";
  // } else if (values.pan_card.length !== 10) {
  //   errors.pan_card = "Must be 10 characters long e.g. ABYTF2390N";
  // }

  //Net Salary
  if (!values.net_salary) {
    errors.net_salary = "Required";
  } else if (isNaN(Number(values.net_salary))) {
    errors.net_salary = "Must be a number";
  }

  //Gross salary
  // if (!values.gross_salary) {
  //   errors.gross_salary = "Required";
  // } else if (isNaN(Number(values.gross_salary))) {
  //   errors.gross_salary = "Must be a number";
  // }

  //Account Holder Name
  if (!values.account_holder_name) {
    errors.account_holder_name = "Required";
  } else if (!isNaN(Number(values.account_holder_name))) {
    errors.account_holder_name = "Must be a string";
  }

  //Account Number
  if (!values.account_number) {
    errors.account_number = "Required";
  } else if (isNaN(Number(values.account_number))) {
    errors.account_number = "Must be a number";
  } else if (values.account_number.length < 9) {
    errors.account_number = "Length must be between 9 and 18";
  } else if (values.account_number.length > 18) {
    errors.account_number = "Length must be between 9 and 18";
  }

  //IFSC
  // if (!values.ifsc) {
  //   errors.ifsc = "Required";
  // } else if (values.ifsc.length !== 11) {
  //   errors.ifsc = "Must be 11 characters long e.g. SBIN0015362";
  // }
  if (!values.ifsc) {
    errors.ifsc = "Required";
  }
  
  return errors;
};
