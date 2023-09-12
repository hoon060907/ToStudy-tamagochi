import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import './Home.scss';
import Tamagochi from "./Tamagochi";

const Home = () => {
    const navigate = useNavigate();
    const [level, setLevel] = useState();

    useEffect(() => {
        if(auth.currentUser){
            const Ref = ref(db, `users/${auth.currentUser.uid}/lv`)
            onValue(Ref, (snapshot) => {
                setLevel(snapshot.val());
            });
        }
    }, []);

    const onClick = () => {
        navigate('/login');
    }

    return (
        <div className="home">
            <h1 className="home_large">함께 성장하는 성장형 공부서비스<br />다마고치 벤쿄 たまごっち</h1>
            <b className="home_small">할일을 기록 , 관리하고 다마고치를 키워보세요<br />나만의 메모 다이어리를 통해 자신을 성장시키세요</b>
            <hr className="hr" />
            {auth.currentUser ? <div className="imagebox"><h2>당신의 다마고치</h2><Tamagochi level={level} /><br /><b>Lv.{level}</b></div> : <button className="start" onClick={onClick}>시작하기</button>}
            
        </div>
    )
}
export default Home;