import { StatusBar } from "expo-status-bar";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

/*
interface TimerProps {
    initialTime?: number;
}
*/

const formatNumber = (number: number) => `0${number}`.slice(-2);

const getRemaining = (time: number) => {
    const hours = Math.floor(time / 3600); // Calculate hours
    const remainingTimeInSeconds = time % 3600; // Calculate remaining time in seconds
    const minutes = Math.floor(remainingTimeInSeconds / 60);
    const seconds = Math.floor(remainingTimeInSeconds % 60);
    const milliseconds = Math.floor((remainingTimeInSeconds % 1) * 100);

    return {
        // hours: formatNumber(hours),
        // minutes: formatNumber(minutes),
        // seconds: formatNumber(seconds),
        // milliseconds: formatNumber(milliseconds),
        hours, minutes, seconds, milliseconds
    };
};

const createArray = (length: number) => {
    const arr = [];
    let i = 0;
    while (i < length) {
        arr.push(i.toString());
        i += 1;
    }

    return arr;
};

const AVAILABLE_HOURS = createArray(5);
const AVAILABLE_MINUTES = createArray(60);
const AVAILABLE_SECONDS = createArray(60);

type userTimerProps = {
    selectedHours: string;
    selectedMinutes: string;
    selectedSeconds: string;
    selectedMilliseconds: string;
};

const useTimer = ({
    selectedHours,
    selectedMinutes,
    selectedSeconds,
    selectedMilliseconds,
}: userTimerProps) => {
    const [isRunning, setIsRunning] = React.useState(false);
    let [remainingTime, setRemainingTime] = React.useState(
        (parseInt(selectedHours, 10) * 3600) +
        (parseInt(selectedMinutes, 10) * 60) +
        parseInt(selectedSeconds, 10)
    );

    const start = () => {
        setRemainingTime(
            (parseInt(selectedHours, 10) * 3600) +
            (parseInt(selectedMinutes, 10) * 60) +
            parseInt(selectedSeconds, 10)
        );
        setIsRunning(true);
    };

    const stop = () => {
        setIsRunning(false);
    };

    React.useEffect(() => {
        let interval: number | null = null;
        if (isRunning) {
            interval = window.setInterval(() => {
                setRemainingTime((prevTime) => prevTime - 0.011); // Adjust time "speed" here
            }, 1); // Update every 1 millisecond
        } else {
            if (interval) {
                window.clearInterval(interval);
                interval = null;
            }
            setIsRunning(false);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isRunning, remainingTime]);

    // Format the remaining time into hours, minutes, seconds, and milliseconds
    // const formattedRemainingTime = getRemaining(remainingTime);

    React.useEffect(() => {
        if (remainingTime <= 0) {
            setRemainingTime(0);
            stop();
        }
    }, [remainingTime]);

    return {
        isRunning,
        start,
        stop,
        remainingTime
        // remainingTime: formattedRemainingTime,
    };
};



/*
const Timer: React.FC<TimerProps> = ({ initialTime = 180000}) => {
    const [milliseconds, setMilliseconds] = useState<number>(initialTime);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    useEffect (() => {
        let interval:  NodeJS.Timeout;

        if(isRunning) {
            interval = setInterval(()=> {
                setMilliseconds(prevmilliseconds => prevmilliseconds - 10);
            }, 9);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };

        
    }, [isRunning]);

    const startTimer = () => {
        setIsRunning(true);
    };

    const stopTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        stopTimer();
        setMilliseconds(initialTime);
    };

    const toggleTimer = () => {
        setIsRunning(!isRunning)
    }

    const changeTimer = () => {
        return (
        <View>
            <Button title="00:01:00" onPress={oneMinute} />
            <Button title="00:02:00" onPress={twoMinutes} />
            <Button title="30:00:00" onPress={thirtyMinutes} />
            <Button title="Custom" onPress={customTime} />
        </View>
        );
    }
    
    const oneMinute = () => { setMilliseconds(60000)}
    const twoMinutes = () => { setMilliseconds(180000)} 
    const thirtyMinutes = () => { setMilliseconds(1800000)} 

    const customTime = () => {
        return (
            <TextInput>
                <Text> Hours</Text>
                keyboardType = 'numeric'
                maxLength = {2}
                value = {hours}
                <TextInput>
                    <Text> Minutes</Text>
                    keyboardType = 'numeric'
                    maxLength = {2}
                    value = {minutes}
                    <TextInput>
                        <Text> Seconds</Text>
                        keyboardType = 'numeric'
                        maxLength = {2}
                        value = {seconds}
                    </TextInput>
                </TextInput>
            </TextInput>
        );
    }

    // Formula to calculate hours, minutes, seconds, milliseconds and centiseconds
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const centiseconds = Math.floor((milliseconds % 1000) / 10);
    const ms = milliseconds % 100;

    // Format time to the desired format
    const formatTime = (unit: number) => (unit < 10 ? '0' + unit : unit);
*/

export default () => {
    const [selectedMinutes, setSelectedMinutes] = React.useState("0");
    const [selectedMilliseconds, setSelectedMilliSeconds] = React.useState("0");
    const [selectedSeconds, setSelectedSeconds] = React.useState("1");
    const [selectedHours, setSelectedHours] = React.useState("0");

    const { isRunning, start, stop, remainingTime } = useTimer({
        selectedHours,
        selectedMinutes,
        selectedSeconds,
        selectedMilliseconds,
    });

    // const hours = getRemaining(parseInt(remainingTime.hours, 10))
    // const minutes = getRemaining(parseInt(remainingTime.minutes, 10))
    // const seconds = getRemaining(parseInt(remainingTime.seconds, 10))
    // const milliseconds = getRemaining(parseInt(remainingTime.milliseconds, 10))

    const { hours, minutes, seconds, milliseconds } = getRemaining(remainingTime)

    return (
        <View>
            <Text>Time: {`${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}:${formatNumber(milliseconds)}`}</Text>
            <Button title="Start Timer" onPress={start} />
            <Button title="Stop Timer" onPress={stop} />
            {/* <Button title="Reset Timer" onPress={reset} />
            <Button title="Choose Time" onPress={changeTimer} /> */}
        </View>
    );
};
// export default Timer
