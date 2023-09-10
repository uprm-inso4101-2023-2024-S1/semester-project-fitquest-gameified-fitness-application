import { StatusBar } from "expo-status-bar";
import { View, Text, Button, StyleSheet } from "react-native";
import React, { useEffect, useState } from 'react';

interface TimerAppProps {
    initialTime?: number;
}

const TimerApp: React.FC<TimerAppProps> = ({ initialTime = 0}) => {
    const [seconds, setSeconds] = useState<number>(initialTime);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    useEffect (() => {
        let interval:  NodeJS.Timeout;

        if(isRunning) {
            interval = setInterval(()=> {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);
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
        setSeconds(0);
    };

    const toggleTimer = () => {
        setIsRunning(!isRunning)
    }

    return (
        <View>
            <Text>       Time: {seconds}s </Text>
            <Button title={`Start Timer`} onPress={startTimer} />
            <Button title="Stop Timer" onPress={stopTimer} />
            <Button title="Reset Timer" onPress={resetTimer} />
        </View>
    );
};

export default TimerApp
