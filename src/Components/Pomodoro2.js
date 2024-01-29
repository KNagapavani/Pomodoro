import React, { useEffect, useState } from 'react';
import alaram from '../alaram.mp3'
const Pomodoro2 = () => {

    const [time,setTime] = useState(1)
    const [isActive,setIsActive] = useState(false)
    const[userInput,setUserInput] = useState('')
    const sound = new Audio(alaram)

    const updateTime = ()=>{
        if(time>0 && isActive){
            setTime((prev)=>prev-1)
        }
    }
    const resetTime = () =>{
        setTime(0)
    }

    const extractMinutes = ()=>{
        const currentTime = time
        const CurrentMinutes = Math.floor(currentTime/60)
        return CurrentMinutes
    }

    const extractSeconds = ()=>{
        const currentTime = time
        const CurrentSeconds = currentTime%60
        return CurrentSeconds
    }

    const onchangeHandler = (e)=>{
        setIsActive(false)
        setUserInput(e.target.value) 
    }
    

    const customTimeHandler = ()=>{
        const value = parseInt(userInput)
        setTime(value)
    }
    useEffect(()=>{
       const intervalId =  setInterval(updateTime,1000)
        if(time===0){
            sound.play()
            document.getElementById('timer').style.color='red'
            setIsActive(false)
            setTime(1)
            document.getElementById('output').innerHTML='TIME LIMIT EXCEED'
        }
       return ()=>{
        clearInterval(intervalId)
       }

    },[time,isActive])
  return (
    
    <div className='pomodoro-container'>
        <h1>POMODORO TIMER</h1>
        <h2 id='timer'>{
             `${extractMinutes()}:${extractSeconds()}`
        }</h2>
        <div id='output'></div>
        <div className='timer-btn'>
        <button className='timer-btn1' onClick={()=>setIsActive(true)}>Start</button>
        <button className='timer-btn1' onClick={()=>setIsActive(false)}>Pause</button>
        <button className='timer-btn1' onClick={resetTime}>Reset</button>
        </div>
        <div className='timer-input'>
        <input className='timer-ip' onChange={onchangeHandler} name='userInput'  type='number' value={userInput}/>
        <button className='timer-btn1' onClick={customTimeHandler}>setCustomTime</button>
        </div>
    </div>
  );
}

export default Pomodoro2;
