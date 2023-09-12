import { onValue, ref } from "firebase/database";
import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import './Profile.scss';
import Tamagochi from "./Tamagochi";

const Profile = () => {
    const [eggname, setEggname] = useState('');
    const [lv, setLv] = useState();
    const [goal, setGoal] = useState();

    useEffect(() => {
        const Ref = ref(db, `users/${auth.currentUser.uid}`);
        // const nameRef = ref(db, `users/${auth.currentUser.uid}/eggname`);
        // const lvRef = ref(db, `users/${auth.currentUser.uid}/lv`);
        // const goalRef = ref(db, `users/${auth.currentUser.uid}/goal`);
        onValue(Ref, (snapshot) => {
            const data = snapshot.val();
            setEggname(data.eggname);
            setLv(data.lv);
            setGoal(data.goal);
            console.log(data);
            
        });
    }, []);

    return (
        <div className="profilebox">
            <div className="tamagochi_profile">
                <Tamagochi level={lv} />
            </div>
            <ul className="userinfo">
                <li>
                    <strong>다마고치 이름</strong>
                    <p>{eggname}</p>
                </li>
                <li>
                <strong>다마고치 레벨</strong>
                    <p>Lv.{lv}</p>
                </li>
                <li>
                <strong>희망 목표</strong>
                    <p>{goal}</p>
                </li>
            </ul>
        </div>
    )
}

export default Profile; 