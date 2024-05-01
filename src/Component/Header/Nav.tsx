import "./Nav.scss";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Nav = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token');
    const handleLogOut = () => {
        if (token) {
            localStorage.removeItem('token')
        }

    }

    return (
        <div className="topnav">
            <div className="top-container ">
                <NavLink className="a" to="/">
                    Trang chủ
                </NavLink>
                <NavLink className="a" to="/about">
                    Sửa chữa
                </NavLink>
                <NavLink className="a" to="/services">
                    Nhân viên
                </NavLink>
                <NavLink className="a" to="/customer">
                    Đặt lịch
                </NavLink>
                <NavLink className="a" to="/cards">
                    Lịch
                </NavLink>
                <NavLink className="a 1" to="/login" onClick={handleLogOut}>
                    {token ? 'Đăng Xuất' : "Đăng Nhập"}
                </NavLink>
            </div>
        </div>
    );
};

export default Nav;
