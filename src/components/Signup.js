import { useState } from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, update } from "firebase/database";
import './Login.scss';
import Swal from "sweetalert2";

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [eggname, setEggname] = useState('');
    const [goal, setGoal] = useState('');

    const onChangeEmail = e => {
        setEmail(e.target.value);
    };

    const onChangePw = e => {
        setPassword(e.target.value);
    };
    const onChangeEggname = e => {
        setEggname(e.target.value);
    };
    const onChangeGoal = e => {
        setGoal(e.target.value);
    };

    const register = async () => {
        try {
            const CreatedUser = await createUserWithEmailAndPassword(auth, email, password);
            const useremail = CreatedUser.user.email;
            const usersRef = ref(db, 'users');
            const newUser = {
                [CreatedUser.user.uid]: {
                    useremail: useremail,
                    todos: ["empty"],
                    diaries: ["empty"],
                    eggname,
                    goal,
                    lv: 1
                }
            };
            update(usersRef, newUser);
            navigate('/');
            console.log(CreatedUser);   
        } catch (e) {
            switch (e.code) {
                case 'auth/weak-password':
                    Swal.fire({
                        title: '비밀번호는 6자리 이상이어야 합니다',
                        background: 'linear-gradient(#F5BFBD, #EEF4E6)',
                        position: 'top'
                    });
                    break;
                case 'auth/invalid-email':
                    Swal.fire({
                        title: '잘못된 이메일 주소입니다',
                        background: 'linear-gradient(#F5BFBD, #EEF4E6)',
                        position: 'top'
                    });
                    break;
                case 'auth/email-already-in-use':
                    Swal.fire({
                        title: '이미 가입되어 있는 계정입니다',
                        background: 'linear-gradient(#F5BFBD, #EEF4E6)',
                        position: 'top'
                    });
                    break;
                default:
                    Swal.fire({
                        title: '다시 입력해주세요.',
                        background: 'linear-gradient(#F5BFBD, #EEF4E6)',
                        position: 'top'
                    });
            }
        }
    }

    return (
        <div className="loginbody">
            <div className="box">
                <h1 className="title">SIGN UP</h1>
                <div className="innerbox">
                    <p className="text">email</p>
                    <input className="input" type="text" onChange={onChangeEmail} />
                </div>
                <div className="innerbox">
                    <p className="text">password</p>
                    <input className="input" type="password" onChange={onChangePw} />
                </div>
                <div className="innerbox">
                    <p className="text">알 닉네임</p>
                    <input className="input" type="text" onChange={onChangeEggname} />
                </div>
                <div className="innerbox">
                    <p className="text">희망 목표</p>
                    <input className="input" type="text" onChange={onChangeGoal} />
                </div>
                <button onClick={register} className="btn">Sign Up</button>
            </div>
        </div>
    );
};

export default Signup;