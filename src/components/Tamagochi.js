const Tamagochi = ({ level }) => {
    if(level > 60){
        return <img src="images/7.png" style={{ height: '450px' }} />;
    }
    else if(level > 50){
        return <img src="images/6.png" style={{ height: `${150 + 5*(level-1)}px` }} />;
    }
    else if(level > 40){
        return <img src="images/5.png" style={{ height: `${150 + 5*(level-1)}px` }} />;
    }
    else if(level > 30){
        return <img src="images/4.png" style={{ height: `${150 + 5*(level-1)}px` }} />;
    }
    else if(level > 20){
        return <img src="images/3.png" style={{ height: `${150 + 5*(level-1)}px` }} />;
    }
    else if(level > 10){
        return <img src="images/2.png" style={{ height: `${150 + 5*(level-1)}px` }} />;
    }
    else{
        return <img src="images/1.png" style={{ height: `${150 + 5*(level-1)}px` }} />;
    }
}
export default Tamagochi;