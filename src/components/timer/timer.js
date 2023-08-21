import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useRef, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import classes from './timer.module.css';
import classNames from 'classnames/bind';

const Timer = () => {
    const SECONDS_5 = 5;
    const [timer, setTimer] = useState(0);
    const [timerStart, setTimerStart] = useState(false);
    const [countdownTimer, setCountdownTimer] = useState(0);
    const [countdownCompleted, setCountdownCompleted] = useState(false);
    const secondTimer = useRef();

    useEffect(() => {
        const interval = timer > 0 && setInterval(() => {
            setTimer(timer - 1);
        }, 1000);
        timer <= 0 && setCountdownTimer(0);
        timer <= 0 && setCountdownCompleted(true);
        return () => {
            clearInterval(interval);
        }
    }, [timer]);
    
    const onChangeHandler = (event) => {
        const secondVal = event.target.value;
        if (secondVal && parseInt(secondVal) && secondVal > 0) {
            setTimerStart(true); return;
        }
        setTimerStart(false);
    };

    const startTimer = () => {
        const secondVal = parseInt(secondTimer.current.value);
        if (secondVal && !isNaN(secondVal) && secondVal > 0) {
            setCountdownTimer(secondVal);
            setCountdownCompleted(true);
            setTimer(secondVal);
            setTimerStart(true);
        } else {
            setCountdownTimer(0);
            setTimer(0);
            setTimerStart(false);
            setCountdownCompleted(false)
        }
    }

    const renderTime = ({ remainingTime }) => {

        if (!countdownCompleted) {
            return <div className="timer">0</div>;
        } else if (remainingTime === 0) {

            return <div className="timer">Completed...</div>;
        }

        return (
            <div className={classes.timer}>
                <div className={classes.text}>Remaining</div>
                {remainingTime > SECONDS_5 && <div className={classNames(classes.value)}>{remainingTime}</div>}
                {remainingTime <= SECONDS_5 && <div className={classNames(classes.value, classes.pulse)}>{remainingTime}</div>}
                <div className={classes.text}>seconds</div>
            </div>
        );
    };

    return (
        <div className="row justify-content-center">
            <div className="col-12">
                <p className=" text-center pt-3"><strong>Countdown Timer</strong></p>
            </div>
            <div className="col-2">
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
                    onComplete={() => ({ shouldRepeat: false, delay: 1 })}
                >
                    {renderTime}
                </CountdownCircleTimer>
                }
            </div>
        </div>
    )
}

export default Timer;