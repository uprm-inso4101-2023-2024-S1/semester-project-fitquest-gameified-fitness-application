import { StatusBar } from "expo-status-bar";
import { View, Text, Button, StyleSheet } from "react-native";
import React, { useEffect, useState } from 'react';

interface StopWatchProps {
    initialTime?: number;
}

const StopWatch: React.FC<StopWatchProps> = ({ initialTime = 0}) => {
    const [milliseconds, setMilliseconds] = useState<number>(initialTime);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    useEffect (() => {
        let interval:  NodeJS.Timeout;

        if(isRunning) {
            interval = setInterval(()=> {
                setMilliseconds(prevmilliseconds => prevmilliseconds + 10);
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
        setMilliseconds(0);
    };

    const toggleTimer = () => {
        setIsRunning(!isRunning)
    }

    // Formula to calculate hours, minutes, seconds, milliseconds and centiseconds
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const centiseconds = Math.floor((milliseconds % 1000) / 10);
    const ms = milliseconds % 100;

    // Format time to the desired format
    const formatTime = (unit: number) => (unit < 10 ? '0' + unit : unit);

    return (
        <View>
            <Text>Time: {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}.{formatTime(centiseconds)}</Text>
            <Button title={`Start`} onPress={startTimer} />
            <Button title="Stop" onPress={stopTimer} />
            <Button title="Reset" onPress={resetTimer} />
        </View>
    );
};

export default StopWatch
