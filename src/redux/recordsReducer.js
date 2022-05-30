import { empRecords } from "./records-data";
import {
  ADD_USER_ERROR,
  ADD_USER_FORM_CLOSE,
  ADD_USER_FORM_OPEN,
  ADD_USER_FORM_SUBMIT,
  CLOSE_CSV_MODAL,
  CLOSE_DELETE_DIALOGUE,
  CLOSE_MSG_MODAL,
  CLOSE_VIEW_USER_MODAL,
  CSV_CLICKED,
  CSV_ERROR,
  CSV_PARSE_SUBMIT,
  DATA_FETCHED,
  DATA_FETCH_REMAINING,
  DELETE_OPEN_LOCAL_LOADER,
  DELETE_RECORD,
  EDIT_LOCAL_LOADER,
  EDIT_USER_CLOSE,
  EDIT_USER_FORM_SUBMIT,
  EDIT_USER_OPEN,
  EMPLOYER_CLICKED,
  EMPLOYER_FORM_SUBMIT,
  FILL_EDIT_FORM,
  FORM_LOCAL_LOADER_OPEN,
  ISSUE_CLICKED,
  ISSUE_CLOSE,
  LOGIN_CLICKED,
  LOGIN_DATA_FETCHED,
  LOGIN_ERROR,
  OPEN_CSV_MODAL,
  OPEN_DELETE_DIALOGUE,
  OPEN_VIEW_USER_MODAL,
  OVERDUE_ID_REMOVE,
  OVERDUE_ID_SET,
  PAGE_LOAD_START,
  REFER_EMAIL,
  RESEND_FAIL,
  RESEND_MAIL,
  RESEND_SUCCESS,
  SEARCH_TABLE_CHANGE,
  SEARCH_TABLE_CHANGE_EMP,
  SWITCH_CLICKED,
  SWITCH_ERROR,
  SWITCH_USER,
  UPLOAD_CSV,
  ISSUES_ID_SET,
  ISSUES_ID_REMOVE,
  TODO_ID_SET,
  TODO_ID_REMOVE,
  ISSUE_STATUS_UPDATE,
  ALERTS_EDITED,
  PAY_OVERDUE,
  ISSUES_DATA_FETCHED,
  EMPLOYEES_DATA_FETCHED,
  CREDIT_GIVEN_GRAPH_UPDATE,
  USAGE_GRAPH_UPDATE,
  OPEN_PAYDAY_CHANGE_DIALOGUE,
  CLOSE_PAYDAY_CHANGE_DIALOGUE,
  UPDATE_PAYDAY_VALUE,
  TEMP_UPDATE_PAYDAY_VALUE,
  PAYDAY_OPEN_LOCAL_LOADER,
  DEFAULTER_LIST_DATA_FETCHED,
  PROFILE_DATA_FETCHED,
  PASSWORD_MAIL_SENT,
  EDIT_USER_SALARY_OPEN,
  EDIT_USER_SALARY_CLOSE,
} from "./actions";

const { records } = empRecords;

const initialStore = {
  records,
  apiRec: [],
  apiDash: {},
  apiIssues: [],
  apiAlert: [],
  apiWhatsnew: [],
  apiDefaulter: [],
  apiProfile: {},
  csvModalOpen: false,
  csvFile: null,
  viewUserOpen: false,
  viewUserData: {},
  deleteDialogOpen: false,
  paydayChangeOpen: false,
  addUserOpen: false,
  deleteId: null,
  editUserOpen: false,
  editUserData: {},
  isLoading: false,
  msgModalOpen: false,
  modalMsg: "",
  localLoaderOpen: false,
  invalidCred: false,
  searchChangeValue: {search:"",type:""},
  searchChangeValue1:{search:"",type:""},
  issueDescOpen: false,
  issueDescContent: [],
  resendmailData: {},
  isResend: true,
  overdueDropId: "",
  issuesId: "",
  todoId: "",
  payOverdueLink: "",
  apiRecLength: "",
  apiIssuesLength: "",
  apiRecTotalPages: "",
  apiIssuesTotalPages: "",
  apiIssuesTotalEntries: "",
  apiRecCreditGivenGraph: [],
  apiRecUsageGraph: [],
  paydayValue: "",
  tempPaydayValue: "",
  apiDefaulterList: [],
  passwordRecoveryMail: "",
  editUserSalaryOpen: false,
};

function recordReducer(state = initialStore, action) {
  if (action.type === PASSWORD_MAIL_SENT) {
    return {
      ...state,
      passwordRecoveryMail: action.payload.data,
    }
  }
  if (action.type === PROFILE_DATA_FETCHED) {
    return {
      ...state,
      apiProfile: action.payload.data,
    }
  }
  if (action.type === DEFAULTER_LIST_DATA_FETCHED) {
    return {
      ...state,
      apiDefaulterList: action.payload.data,
    }
  }
  if (action.type === UPDATE_PAYDAY_VALUE) {
    return {
      ...state,
      paydayValue: action.payload.data,
    }
  }
  if (action.type === TEMP_UPDATE_PAYDAY_VALUE) {
    return {
      ...state,
      tempPaydayValue: action.payload.data,
    }
  }
  if (action.type === PAYDAY_OPEN_LOCAL_LOADER) {
    return {
      ...state,
      paydayChangeOpen: !state.paydayChangeOpen,
      localLoaderOpen: !state.localLoaderOpen,
    };
  }
  if (action.type === OPEN_PAYDAY_CHANGE_DIALOGUE) {
    // const { id } = action.payload;
    return {
      ...state,
      paydayChangeOpen: true,
    };
  }
  if (action.type === CLOSE_PAYDAY_CHANGE_DIALOGUE) {
    // const { id } = action.payload;
    return {
      ...state,
      paydayChangeOpen: false,
    };
  }
  if (action.type === CREDIT_GIVEN_GRAPH_UPDATE) {
    return {
      ...state,
      apiRecCreditGivenGraph: action.payload.creditGivenGraphData,
    };
  };
  if (action.type === USAGE_GRAPH_UPDATE) {
    return {
      ...state,
      apiRecUsageGraph: action.payload.usageGraphData,
    };
  };
  if (action.type === PAY_OVERDUE) {
    const data = action.payload.data;
    return {
      ...state,
      payOverdueLink: data?.payment_links?.web,
    }
  }
  if (action.type === OPEN_DELETE_DIALOGUE) {
    const { id } = action.payload;
    return {
      ...state,
      deleteDialogOpen: !state.deleteDialogOpen,
      deleteId: id,
    };
  }
  if (action.type === CLOSE_DELETE_DIALOGUE) {
    return {
      ...state,
      deleteDialogOpen: !state.deleteDialogOpen,
      deleteId: null,
    };
  }
  if (action.type === DELETE_OPEN_LOCAL_LOADER) {
    return {
      ...state,
      deleteDialogOpen: !state.deleteDialogOpen,
      localLoaderOpen: !state.localLoaderOpen,
      deleteId: null,
    };
  }
  if (action.type === DELETE_RECORD) {
    const { apiRec } = state;
    const deleteId = action.payload;
    const newRecords = apiRec.filter((record) => deleteId !== record.id);

    return {
      ...state,
      //deleteDialogOpen: !state.deleteDialogOpen,
      localLoaderOpen: !state.localLoaderOpen,
      //deleteId: null,
      msgModalOpen: true,
      modalMsg: "Deleted Successfully",
      apiRec: newRecords,
    };
  }
  if (action.type === OPEN_CSV_MODAL) {
    return { ...state, csvModalOpen: !state.csvModalOpen };
  }
  if (action.type === UPLOAD_CSV) {
    const { csv } = action.payload;
    console.log(csv);
    return { ...state, csvFile: csv };
  }
  if (action.type === CSV_CLICKED) {
    return {
      ...state,
      csvModalOpen: !state.csvModalOpen,
      localLoaderOpen: !state.localLoaderOpen,
    };
  }
  if (action.type === CSV_PARSE_SUBMIT) {
    const userData = action.payload;
    return {
      ...state,
      apiRec: userData,
      localLoaderOpen: !state.localLoaderOpen,
      msgModalOpen: true,
      modalMsg: "File uploaded successfully",
      csvFile: null,
    };
  }

  if (action.type === CSV_ERROR) {
    return {
      ...state,

      csvFile: null,
      localLoaderOpen: !state.localLoaderOpen,
      msgModalOpen: true,
      modalMsg: "Error uploading document.",
    };
  }
  if (action.type === CLOSE_CSV_MODAL) {
    return { ...state, csvModalOpen: !state.csvModalOpen, csvFile: null };
  }
  if (action.type === OPEN_VIEW_USER_MODAL) {
    const { id } = action.payload;
    const user = state.apiRec.filter((record) => id === record.id);

    return {
      ...state,
      viewUserOpen: !state.viewUserOpen,
      viewUserData: user[0],
    };
  }
  if (action.type === CLOSE_VIEW_USER_MODAL) {
    return {
      ...state,
      viewUserOpen: !state.viewUserOpen,
    };
  }
  if (action.type === ADD_USER_FORM_OPEN) {
    return { ...state, addUserOpen: !state.addUserOpen };
  }
  if (action.type === ADD_USER_FORM_CLOSE) {
    return { ...state, addUserOpen: !state.addUserOpen };
  }
  if (action.type === ADD_USER_FORM_SUBMIT) {
    // const { values } = action.payload;
    // console.log("Data", values);
    const { data } = action.payload;
    return {
      ...state,
      //addUserOpen: !state.addUserOpen,
      //localLoaderOpen: !state.localLoaderOpen,
      msgModalOpen: true,
      modalMsg: "Employee Added Successfully",
      apiRec: [...state.apiRec, data],
    };
  }
  if (action.type === ADD_USER_ERROR) {
    return {
      ...state,
      addUserOpen: false,
      msgModalOpen: true,
      modalMsg: "Error adding user! Please try again.",
    };
  }
  if (action.type === FORM_LOCAL_LOADER_OPEN) {
    return {
      ...state,
      addUserOpen: !state.addUserOpen,
      //editUserOpen: !state.editUserOpen,
      //localLoaderOpen: !state.localLoaderOpen,
    };
  }
  if (action.type === EDIT_LOCAL_LOADER) {
    return {
      ...state,
      editUserOpen: !state.editUserOpen,
      localLoaderOpen: !state.localLoaderOpen,
    };
  }

  if (action.type === EDIT_USER_OPEN) {
    const { id } = action.payload;
    const { apiRec } = state;
    const [newRec] = apiRec.filter((record) => id === record.id);
    return {
      ...state,
      viewUserOpen: false,
      editUserData: newRec,
      editUserOpen: !state.editUserOpen,
    };
  }
  if (action.type === EDIT_USER_SALARY_OPEN) {
    const { id } = action.payload;
    const { apiRec } = state;
    const [newRec] = apiRec.filter((record) => id === record.id);
    return {
      ...state,
      editUserData: newRec,
      editUserSalaryOpen: true,
    };
  }
  if (action.type === EDIT_USER_FORM_SUBMIT) {
    const { data } = action.payload;
    const { id } = data;
    let newRec = state.apiRec.filter((rec) => rec.id !== id);

    return {
      ...state,
      //  editUserOpen: !state.editUserOpen,
      localLoaderOpen: !state.localLoaderOpen,
      msgModalOpen: true,
      modalMsg: "Edited Successfully",
      apiRec: [...newRec, data],
      editUserData: {},
    };
  }
  if (action.type === EDIT_USER_CLOSE) {
    return { ...state, editUserOpen: !state.editUserOpen, editUserData: {} };
  }
  if (action.type === EDIT_USER_SALARY_CLOSE) {
    return { ...state, editUserSalaryOpen: false, localLoaderOpen:false, editUserData: {} };
  }
  if (action.type === LOGIN_CLICKED) {
    // return { ...state, isLoading: true, invalidCred: false };
    return { ...state, invalidCred: false, isLoading: true };
  }
  if (action.type === LOGIN_ERROR) {
    return { ...state, invalidCred: true, isLoading: false };
  }
  if (action.type === LOGIN_DATA_FETCHED) {
    // const { dataDash, dataRec, dataIssues, dataDefaulter, dataProfile,
    //   dataAlert, dataWhatsnew, dataRecTotalPages, dataIssuesTotalPages,
    //   dataCreditGivenGraph, dataUsageGraph, dataIssuesTotalEntries, dataDefaulterList} =
    //   action.payload.data;
    // // let { defaulter_list } = dataDefaulter;
    // //console.log(dataProfile);
    const {dataRec,dataRecTotalPages}=action.payload.data

    return {
      ...state,
      // apiDash: dataDash,
      apiRec: dataRec,
      // apiIssues: dataIssues,
      // apiDefaulter: defaulter_list,
      // apiProfile: dataProfile,
      isLoading: false,
      // apiAlert: dataAlert,
      // apiWhatsnew: dataWhatsnew,
      // apiRecLength: dataRec.length,
      // apiIssuesLength: dataIssues.length,
      apiRecTotalPages: dataRecTotalPages,
      // apiIssuesTotalPages: dataIssuesTotalPages,
      // apiRecCreditGivenGraph: dataCreditGivenGraph,
      // apiRecUsageGraph: dataUsageGraph,
      // apiIssuesTotalEntries: dataIssuesTotalEntries,
      // apiDefaulterList: dataDefaulterList,
    };
  }
  if (action.type === DATA_FETCHED) {
    
      const {dataRec,dataRecTotalPages}=action.payload.data

    // let { defaulter_list } = dataDefaulter;

    return {
      ...state,
      apiRec: dataRec,
      isLoading:false,
      msgModalOpen:true,
      // apiDash: dataDash,
      // apiIssues: dataIssues,
      // apiDefaulter: defaulter_list,
      // apiProfile: dataProfile,
      // isLoading: false,
      // apiAlert: dataAlert,
      // apiWhatsnew: dataWhatsnew,
      // apiRecLength: dataRec.length,
      // apiIssuesLength: dataIssues.length,
      apiRecTotalPages: dataRecTotalPages,
      // apiIssuesTotalPages: dataIssuesTotalPages,
      // apiRecCreditGivenGraph: dataCreditGivenGraph,
      // apiRecUsageGraph: dataUsageGraph,
      // apiIssuesTotalEntries: dataIssuesTotalEntries,
      // apiDefaulterList: dataDefaulterList,
    };
  }
  // if (action.type === DATA_FETCHED) {
  //   const { dataRec, dataDash, dataIssues, dataDefaulter, dataProfile,
  //     dataAlert, dataWhatsnew, dataRecTotalPages, dataIssuesTotalPages,
  //     dataCreditGivenGraph, dataUsageGraph, dataIssuesTotalEntries, dataDefaulterList} =
  //     action.payload.data;

  //   // let { defaulter_list } = dataDefaulter;

  //   return {
  //     ...state,
  //     apiRec: dataRec,
  //     apiDash: dataDash,
  //     apiIssues: dataIssues,
  //     // apiDefaulter: defaulter_list,
  //     apiProfile: dataProfile,
  //     isLoading: false,
  //     apiAlert: dataAlert,
  //     apiWhatsnew: dataWhatsnew,
  //     apiRecLength: dataRec.length,
  //     apiIssuesLength: dataIssues.length,
  //     apiRecTotalPages: dataRecTotalPages,
  //     apiIssuesTotalPages: dataIssuesTotalPages,
  //     apiRecCreditGivenGraph: dataCreditGivenGraph,
  //     apiRecUsageGraph: dataUsageGraph,
  //     apiIssuesTotalEntries: dataIssuesTotalEntries,
  //     apiDefaulterList: dataDefaulterList,
  //   };
  // }
  if (action.type === ALERTS_EDITED) {
    let { data } = action.payload;
    let { id } = data;
    let filterAlert = state.apiAlert.filter((alert) => alert.id !== id);
    return {
      ...state,
      apiAlert: [data, ...filterAlert],
    };
  }
  if (action.type === ISSUE_STATUS_UPDATE) {
    let { data } = action.payload;
    let { id } = data;
    let filterIssues = state.apiIssues.filter((issue) => issue.id !== id);
    //console.log(filterTodos);
    return {
      ...state,
      apiIssues: [data, ...filterIssues],
    };
  }
  if (action.type === PAGE_LOAD_START) {
    return { ...state, isLoading: true };
  }
  if (action.type === ISSUES_DATA_FETCHED) {

    return {
      ...state,
      apiIssues: action.payload.dataIssues,
      apiIssuesTotalPages: action.payload.dataTotalPages,
      apiIssuesTotalEntries: action.payload.dataTotalEntries,
    };
  }
  if (action.type === EMPLOYEES_DATA_FETCHED) {

    return {
      ...state,
      apiRec: action.payload.dataEmployee,
      apiRecTotalPages: action.payload.dataTotalPages,
    };
  }
  if (action.type === CLOSE_MSG_MODAL) {
    return { ...state, msgModalOpen: false };
  }
  if (action.type === REFER_EMAIL) {
    return {
      ...state,
      msgModalOpen: !state.msgModalOpen,
      modalMsg: "Referred Successfully",
    };
  }
  if (action.type === EMPLOYER_FORM_SUBMIT) {
    return {
      ...state,
      msgModalOpen: true,
      modalMsg: "Employer added successfully",
      localLoaderOpen: !state.localLoaderOpen,
    };
  }
  if (action.type === EMPLOYER_CLICKED) {
    return { ...state, localLoaderOpen: !state.localLoaderOpen };
  }

  if (action.type === SWITCH_USER) {
    let { data } = action.payload;
    let { id } = data;
    let newRec = state.apiRec.filter((rec) => id !== rec.id);
    //console.log(newRec);
    return {
      ...state,
      apiRec: [...newRec, data],
    };
  }
  if (action.type === SWITCH_ERROR) {
    return {
      ...state,
      //localLoaderOpen: !state.localLoaderOpen,
      msgModalOpen: true,
      modalMsg: "Unable to switch employee!!",
    };
  }
  if (action.type === SEARCH_TABLE_CHANGE) {
    let { search,type } = action.payload;
    return { ...state, searchChangeValue:{search:search,type:type}};
  }
  if(action.type==="SEARCH_TABLE_CHANGE_EMP"){
    let { search,type } = action.payload;
    return { ...state, searchChangeValue1:{search:search,type:type}};

  }
  if (action.type === ISSUE_CLICKED) {
    let { issue } = action.payload;
    console.log(issue);
    return { ...state, issueDescContent: issue, issueDescOpen: true };
  }
  if (action.type === ISSUE_CLOSE) {
    return { ...state, issueDescOpen: false };
  }
  if (action.type === RESEND_MAIL) {
    let { values } = action.payload;
    return { ...state, resendmailData: values };
  }
  if (action.type === RESEND_SUCCESS) {
    return { ...state, isResend: true };
  }
  if (action.type === RESEND_FAIL) {
    return { ...state, isResend: false };
  }
  if (action.type === OVERDUE_ID_SET) {
    let { id } = action.payload;
    console.log(id);
    return { ...state, overdueDropId: id };
  }
  if (action.type === OVERDUE_ID_REMOVE) {
    return { ...state, overdueDropId: "" };
  }
  if (action.type === ISSUES_ID_SET) {
    let { id } = action.payload;
    console.log(id);
    return { ...state, issuesId: id };
  }
  if (action.type === ISSUES_ID_REMOVE) {
    return { ...state, issuesId: "" };
  }
  if (action.type === TODO_ID_SET) {
    let { id } = action.payload;
    console.log(id);
    return { ...state, todoId: id };
  }
  if (action.type === TODO_ID_REMOVE) {
    return { ...state, todoId: "" };
  }
  return state;
}

export default recordReducer;