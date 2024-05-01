import "./Table.scss";
// import useFetch from "../../customize/fetch";
import axios from "axios";
import { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
// i
const TableUser = () => {

    return (
        // <div>TableUser</div>
        <>
            <div>
                <button className="btn-add-new">
                    <Link to="/add-new-customer">+ Add new blog</Link>
                </button>
            </div>
            <div className="blog-container">
            </div>
        </>
    );
};

export default TableUser;
