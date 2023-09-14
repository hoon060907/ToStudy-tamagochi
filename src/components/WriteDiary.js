import { onValue, ref, set } from "firebase/database";
import { useEffect, useRef, useState } from "react"
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import './WriteDiary.scss';
import Swal from "sweetalert2";

const WriteDiary = () => {
    const navigate = useNavigate();
    const [diaries, setDiaries] = useState([]);
    const [text, setText] = useState("");
    const date = useRef(new Date());
    
    useEffect(() => {
        const diariesRef = ref(db, `users/${auth.currentUser.uid}/diaries`);
        onValue(diariesRef, (snapshot) => {
            const data = snapshot.val();
            setDiaries(data);
        })
    }, []);

    const onChange = (e) => {
        setText(e.target.value);
    }

    const onClick = () => {
        if(text === "") {
            Swal.fire({
                title: '일기를 작성해주세요!',
                background: 'linear-gradient(#E38F9F, #F5BFBD)',
                confirmButtonColor: '#E38F9F'
              })
            return;
        }
        date.current = new Date();
        const id = date.current.getTime();
        const year = date.current.getFullYear();
        const month = date.current.getMonth()+1;
        const day = date.current.getDate();
        const diary = {
            id,
            text,
            year,
            month,
            day
        };
        set(ref(db, `users/${auth.currentUser.uid}/diaries`), diaries.concat(diary));
        navigate('/studydiary');
    }

    return (
        <div className="writediary-body">
            <textarea onChange={onChange} className="writeText" placeholder="일기 작성"/>
            <button onClick={onClick} className="addDiary">추가</button>
        </div>
    )
}

export default WriteDiary;