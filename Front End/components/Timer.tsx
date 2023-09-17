import { StatusBar } from "expo-status-bar";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

interface TimerProps {
    initialTime?: number;
}


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

    return (
        <View>
            <Text>Time: {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}.{formatTime(centiseconds)}</Text>
            <Button title={`Start Timer`} onPress={startTimer} />
            <Button title="Stop Timer" onPress={stopTimer} />
            <Button title="Reset Timer" onPress={resetTimer} />
            <Button title="Choose Time" onPress={changeTimer}/>
        </View>
    );
};

export default Timer
