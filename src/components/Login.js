import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import './Login.scss';
import Swal from "sweetalert2";

const Login = () => {
    const navigate = useNavigate('/');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChangeEmail = e => {
        setEmail(e.target.value);
    };

    const onChangePw = e => {
        setPassword(e.target.value);
    };

    // const handleKeyPress = (e) => {
    //     if (e.key === "Enter") {
    //         login(); Enter 키를 누르면 로그인 함수 호출
    //     }
    // };

    // const login = () => {
    //     setPersistence(auth, browserLocalPersistence)
    //         .then(() => {
    //             const curUserInfo = signInWithEmailAndPassword(auth, email, password);
    //             setState({
    //                 user: curUserInfo.user,
    //                 isLoggedIn: true
    //             });
    //         })
    //         .then(() => {
    //             navigate('/');
    //         })
    //         .catch((error) => {
    //             alert(error.message);
    //         })
    // }
    const login = async () => {
        try {
            const curUserInfo = signInWithEmailAndPassword(auth, email, password);
            console.log((await curUserInfo).user);
            navigate('/');
        } catch (e) {
            Swal.fire({
                title: '로그인할 수 없습니다.',
                background: 'linear-gradient(#F5BFBD, #EEF4E6)',
                position: 'top'
            });
        }
    }

    return (
        <div className="loginbody">
            <div className="box">
                <h1 className="title">LOG IN</h1>
                <div className="innerbox">
                    <p className="text">email</p>
                    <input className="input" type="text" onChange={onChangeEmail} />
                </div>
                <div className="innerbox">
                    <p className="text">password</p>
                    <input className="input" type="password" onChange={onChangePw} />
                </div>
                <button onClick={login} className="btn">Login</button>
            </div>
        </div>
    );
};

export default Login;