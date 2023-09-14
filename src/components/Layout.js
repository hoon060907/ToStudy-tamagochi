import { Link, Outlet, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useEffect } from "react";
import './Layout.scss';
import { CiMemoPad } from 'react-icons/ci';
import { PiNotePencil } from 'react-icons/pi';
import { BsPencil } from 'react-icons/bs';
import { BiUser } from 'react-icons/bi';
import { BsEgg } from "react-icons/bs";
import { BsPencilFill } from "react-icons/bs";
import Swal from "sweetalert2";

const Layout = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const logOut = () => {
        auth.signOut();
        setIsLoggedIn(false);
        window.location.reload();
        // location.reload();
        // console.log(auth.currentUser);
    };
    useEffect(() => {
        console.log(auth.currentUser);
        if(auth.currentUser) {
            setIsLoggedIn(true);
        }
        else {
            setIsLoggedIn(false);
        }
    }, []);

    const onClick = () => {
        Swal.fire({
            title: '로그인하세요!',
            background: 'linear-gradient(#F5BFBD, #EEF4E6)',
            confirmButtonColor: '#E38F9F'
        });
    };

    return (
        <div className="body">
            <div className="header">
                <div className="left">
                    <h3 className="title" onClick={() => {navigate('/');}}><span>다마고치 벤쿄</span><BsEgg className="bsegg" /><BsPencilFill className="pencil" />{/*<img src="images/logo0.svg" />*/}</h3>
                    {auth.currentUser ?
                        <Link to="/profile" className="nav">
                            <BiUser />
                        </Link> : 
                        <span onClick={onClick} className="nav">
                            <BiUser />
                        </span>
                    }
                    {auth.currentUser ?
                        <Link to="/tostudy" className="nav">
                            <PiNotePencil />
                        </Link> : 
                        <span onClick={onClick} className="nav">
                            <PiNotePencil />
                        </span>
                    }
                    {auth.currentUser ? 
                        <Link to="/studydiary" className="nav">
                            <CiMemoPad />
                        </Link> : 
                        <span onClick={onClick} className="nav">
                            <CiMemoPad />
                        </span>}
                </div>
                <div className="right">
                    {auth.currentUser ? 
                        <div onClick={logOut} className="logout">Logout</div> : 
                        <div className="loginsignup">
                            <Link to="/login" className="inner">Login</Link>
                            <Link to="/signup" className="inner">Sign Up</Link>
                        </div>}
                </div>
            </div>
            <div className="main">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;