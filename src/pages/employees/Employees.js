import React from 'react';
import { AiFillDatabase, AiOutlineFileAdd } from "react-icons/ai";
import { RiFileExcel2Fill } from "react-icons/ri";
import { connect } from "react-redux";
import SearchIcon from '@mui/icons-material/Search';
import { saveAs } from "file-saver";
import axios from "axios";

import {
    ADD_USER_FORM_OPEN,
    DATA_FETCHED,
    OPEN_CSV_MODAL,
} from "../../redux/actions";

import AddUserForm from "./modals/AddUserForm";
import ConfirmDeleteModal from "./modals/ConfirmDeleteModal";
import CsvModal from "./modals/CsvModal";
import EditUserForm from "./modals/EditUserForm";
import ViewUserModal from "./modals/ViewUserModal";

import DownloadEmployees from "./contents/DownloadEmployees";
import SearchTable from "./contents/SearchTable";
import TableRecords from "./contents/TableRecords";

import MsgModal from "../../components/MsgModal";
import LocalLoader from "../../components/LocalLoader";
import OverdueList from "./contents/OverdueList";


function Employees({ handleCsvModal, handleAddFormOpen, apiDash }) {
    let { total_employees } = apiDash;

    return (
        <>
            <div className="employees">
                <div className='employees-wrap'>
                    <MsgModal /> {/* it pops up when the employee is deleted from the employee table or new employee is added */}
                    <CsvModal /> {/* to open 'Import Excel doc' form */}
                    <ViewUserModal /> {/* to open user details form by clicking user row */}
                    <ConfirmDeleteModal /> {/* to open delete user form under actions */}
                    <AddUserForm /> {/* to add user in 'Add User' beside 'Download List' */}
                    <EditUserForm /> {/* to open user form under actions */}
                    <LocalLoader /> {/* This loading component appears for some of the async operations on the portal like adding and deleting the users, todos etc */}

                    <div className='nav-container'>
                        <div className='nav-container-left'>
                            <div className='search-container'>
                                <SearchIcon className='search-icon' />
                                <SearchTable />
                            </div>
                        </div>
                        <div className='nav-container-center'>
                            <div className='employees-container'>
                                <div className='employees-text'>
                                    <h2>Total Employees</h2>
                                </div>
                                <div className='employees-number'>
                                    <h1>{total_employees}</h1>
                                </div>
                            </div>
                            <div>
                                <DownloadEmployees />
                            </div>
                        </div>
                        <div className='nav-container-right'>
                            <div className='right-container-div'>
                                <div>
                                    <button
                                        className='right-container-btn'
                                        onClick={handleCsvModal}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        BULK UPLOAD
                                    </button>
                                </div>
                                <div>
                                    <a href="https://finsire-assets.s3.ap-south-1.amazonaws.com/Sample_Excel.xlsx">
                                        <>Sample .xlsx file</>
                                    </a>
                                </div>
                            </div>
                            <div className='right-container-div'>
                                <div>
                                    <button
                                        className='right-container-btn'
                                        onClick={handleAddFormOpen}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        QUICK ADD
                                    </button>
                                </div>
                                <div>
                                    <p>Add single employee</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ------- Removing old nav bar ------- */}
                    {/* <div className="nav-wrap">
                        <nav className="records-nav">
                            <div className="add-search-user">
                                <SearchIcon />
                                <SearchTable />
                            </div>

                            <div className="upload-links">
                                <button onClick={handleCsvModal}>
                                    <>Import Excel Doc</>
                                    <RiFileExcel2Fill className="excel-icon" />
                                </button>
                                <a href="https://finsire-assets.s3.ap-south-1.amazonaws.com/Sample_Excel.xlsx">
                                    <>(Sample Excel)</>
                                </a>
                            </div>
                            <div className="add-search-user">
                                <DownloadEmployees />
                                <button className="add-user-btn" onClick={handleAddFormOpen}>
                                    <p className="add-user">Add User</p>
                                </button>
                            </div>
                        </nav>
                        {/* <button className="add-user-btn" onClick={handleAddFormOpen}>
                        <AiOutlineFileAdd className="add-user" />
                        </button> */}
                    {/* </div> */}
                    {/* ------- Removing old nav bar till here ------- */}
                    {/* <div><OverdueList /></div> */}
                    <div className="table-container">
                        <TableRecords />
                    </div>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    const { apiDash } = state.recordReducer;
    return { apiDash };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleCsvModal: () => {
            dispatch({ type: OPEN_CSV_MODAL });
        },
        handleAddFormOpen: () => {
            dispatch({ type: ADD_USER_FORM_OPEN });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Employees);
