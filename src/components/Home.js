import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import './Home.scss';
import Tamagochi from "./Tamagochi";
import { BsBookmarks } from 'react-icons/bs';
import cn from 'classnames';

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

    const names = [
        "성공은 우연이 아니다. 노력, 인내, 배움, 공부, 희생, 그리고 무엇보다 자신이 하고 있는 일에 대한 사랑, 하는 법을 배우는 것이다.– 펠레",
        "지식에 대한 투자는 최고의 보상을 가져다 줄 것이다.- 벤자민 프랭클린",
        "많은 실패자들은 포기하기 때문에 성공이 얼마나 가까웠는지 깨닫지 못합니다.-메이슨 쿨리",
        "노력을 대신할 수 있는 것은 없습니다. – 토마스 에디슨",
        "성적이나 결과는 행동이 아니라 습관입니다.” – 아리스토텔레스",
        "성공으로 가는 엘리베이터는 없습니다. 성공은 계단을 통해서만 도달할 수 있습니다. – 지그 지글러",
        "진짜 가치가 있는 곳으로 가는 지름길은 없습니다. – 비벌리 실스",
        "제가 하는 가장 큰 후회는 한 단어로 요약할 수 있는데, 그것은 ‘미루기’ 입니다. – 론 쿠퍼",
      ];
      let random_index = Math.floor(Math.random() * names.length);
      let random_name = names[random_index];

    return (
        <div className={auth.currentUser?"home loggedin":"home"}>
            {auth.currentUser?<div className="moral"><BsBookmarks className="book" />{random_name}</div>:
            <div className="home_text_area">
                <h1 className="home_large">함께 성장하는 성장형 공부서비스<br />다마고치 벤쿄 たまごっち</h1>
                <b className="home_small">할일을 기록 , 관리하고 다마고치를 키워보세요<br />나만의 메모 다이어리를 통해 자신을 성장시키세요</b>
                <hr className="hr" />
            </div>
            }
            {auth.currentUser ? <div className="imagebox"><h2>당신의 다마고치</h2><Tamagochi level={level} /><br /><b>Lv.{level}</b></div> : <button className="start" onClick={onClick}>시작하기</button>}
        </div>
    )
}
export default Home;