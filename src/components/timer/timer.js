import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useRef, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import classes from './timer.module.css';

const Timer = () => {
    const [second, setSecond] = useState(0);
    const [timerStart, setTimerStart] = useState(false);
    const secondTimer = useRef();
    const [countdownTimer, setCountdownTimer] = useState(0);
    const [countdownCompleted, setCountdownCompleted] = useState(false);
    
    const onChangeHandler = (event) => {
        const secondVal = event.target.value;
        console.log();
        if (secondVal  && Number.isInteger(Number(secondVal)) && secondVal > 0) {
            setTimerStart(true);
        } else {
            setTimerStart(false);
        }
    };

    useEffect(() => {
        const timer =
        second > 0 && setInterval(() => { 
            setSecond(second - 1);
        }, 1000);
        second <= 0 && setCountdownTimer(0);
        second <= 0 && setCountdownCompleted(false);
      return () => {
          clearInterval(timer);
        }
    },[second]);
    
    const startTimer = () => {
        const secondVal = secondTimer.current.value;
        if (secondVal  && Number(secondVal) !== NaN && secondVal > 0) {
            setCountdownTimer(secondVal);
            setCountdownCompleted(true);
            setSecond(secondVal);
            setTimerStart(true);
        } else {
            setCountdownTimer(0);
            setSecond('');
            setTimerStart(false);
            setCountdownCompleted(false)
        }
    }

    const renderTime = ({ remainingTime }) => {
        if (!countdownCompleted) {
          return <div className="timer">0</div>;
        } else if (remainingTime === 0){
            return <div className="timer">Completed...</div>;
        }
      
        return (
          <div className={classes.timer}>
            <div className={classes.text}>Remaining</div>
            <div className="value">{remainingTime}</div>
            <div className={classes.text}>seconds</div>
          </div>
        );
      };
   
    return (
            <div className="d-flex justify-content-center">
                <div className="row justify-content-center">
                <div className="col-12">
                    <p className=" text-center pt-3"><strong>Timer</strong></p>
                </div>
                <div className="col-6">
                    <Form className="mt-3">
                        <Form.Group className="col-12 mb-3" controlId="formBasicEmail">
                            <Form.Control type="text"
                            placeholder="seconds" 
                            maxLength="5"
                            onChange={onChangeHandler}
                            ref={secondTimer}
                            />
                        </Form.Group>
                        <Form.Group className="col-12 mb-3" controlId="formBasicEmail">
                            <Button variant="primary" type="button" disabled={!timerStart} onClick={startTimer} className="w-100">Start</Button>
                        </Form.Group>
                    </Form>
                </div>
                <div className="col-12 mt-4 d-flex justify-content-center">
                {countdownTimer > 0 && <CountdownCircleTimer
                    isPlaying
                    duration={countdownTimer}
                    colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                    colorsTime={[10, 6, 3, 0]}
                    onComplete={() => ({ shouldRepeat: false , delay: 1 })}
                    >
                    {renderTime}
                </CountdownCircleTimer>}
                {!countdownCompleted && countdownTimer <= 0 && <CountdownCircleTimer
                    isPlaying
                    duration={countdownTimer}
                    colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                    colorsTime={[10, 6, 3, 0]}
                    onComplete={() => ({ shouldRepeat: false , delay: 1 })}
                    >
                    {renderTime}
                </CountdownCircleTimer>}
                </div>
                </div>
            </div>
    )
}

export default Timer;