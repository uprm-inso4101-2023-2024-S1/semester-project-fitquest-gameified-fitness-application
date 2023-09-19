import { StatusBar } from "expo-status-bar";
import { View, Text, TextInput, Button, StyleSheet, Platform, Dimensions } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    picker: {
        width: 80,
        marginLeft: 15,
        ...Platform.select({
            android: {
                color: "#fff",
                marginLeft: 15,
            },
        }),
    },
    pickerItem: {
        fontSize: 15,
    },
    pickerContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
});

const formatNumber = (number: number) => `0${number}`.slice(-2);

const createArray = (length: number) => {
    const arr = [];
    let i = 0;
    while (i < length) {
        arr.push(i.toString());
        i += 1;
    }

    return arr;
};

const AVAILABLE_HOURS = createArray(11);
const AVAILABLE_MINUTES = createArray(60);
const AVAILABLE_SECONDS = createArray(60);

type PickerProps = {
    selectedHours: string;
    selectedMinutes: string;
    selectedSeconds: string;
    setSelectedHours: (item: string) => void;
    setSelectedMinutes: (item: string) => void;
    setSelectedSeconds: (item: string) => void;
};

const Pickers = ({
    selectedHours,
    setSelectedHours,
    selectedMinutes,
    setSelectedMinutes,
    selectedSeconds,
    setSelectedSeconds,
}: PickerProps) => (
    <View style={styles.pickerContainer}>
        <Picker
            style={styles.picker}
            itemStyle={styles.pickerItem}
            selectedValue={selectedHours}
            onValueChange={(itemValue) => {
                setSelectedHours(itemValue);
            }}
        >
            {AVAILABLE_HOURS.map((value) => (
                <Picker.Item key={value} label={value} value={value} />
            ))}
        </Picker>
        <Text style={styles.pickerItem}>hours</Text>

        <Picker
            style={styles.picker}
            itemStyle={styles.pickerItem}
            selectedValue={selectedMinutes}
            onValueChange={(itemValue) => {
                setSelectedMinutes(itemValue);
            }}
        >
            {AVAILABLE_MINUTES.map((value) => (
                <Picker.Item key={value} label={value} value={value} />
            ))}
        </Picker>
        <Text style={styles.pickerItem}>min</Text>

        <Picker
            style={styles.picker}
            itemStyle={styles.pickerItem}
            selectedValue={selectedSeconds}
            onValueChange={(itemValue) => {
                setSelectedSeconds(itemValue);
            }}
            mode="dropdown"
        >
            {AVAILABLE_SECONDS.map((value) => (
                <Picker.Item key={value} label={value} value={value} />
            ))}
        </Picker>
        <Text style={styles.pickerItem}>sec</Text>
    </View>
);


type userTimerProps = {
    selectedHours: string;
    selectedMinutes: string;
    selectedSeconds: string;
};

const useTimer = ({
    selectedHours,
    selectedMinutes,
    selectedSeconds,
}: userTimerProps) => {
    const [isRunning, setIsRunning] = React.useState(false);
    const [isReset, setIsReset] = React.useState(true);
    let [remainingTime, setRemainingTime] = React.useState(
        (parseInt(selectedHours, 10) * 3600000) +
        (parseInt(selectedMinutes, 10) * 60000) +
        parseInt(selectedSeconds, 10) * 1000
    );

    const getRemainingTime = () => {
        return remainingTime
    }
    
    const start = () => {
        if (isReset) {
            setRemainingTime(
                (parseInt(selectedHours, 10) * 3600 * 1000) +
                (parseInt(selectedMinutes, 10) * 60 * 1000) +
                parseInt(selectedSeconds, 10) * 1000
                );
            }
            
            setIsReset(false);
            setIsRunning(true);
        };
        
        const stop = () => {
            setIsRunning(false);
        };
        
        const reset = () => {
            setRemainingTime(
                (parseInt(selectedHours, 10) * 3600 * 1000) +
                (parseInt(selectedMinutes, 10) * 60 * 1000) +
                parseInt(selectedSeconds, 10) * 1000
                );
                
                setIsRunning(false);
                setIsReset(true);
            }
            
    React.useEffect(() => {
        let interval: NodeJS.Timeout
        if (isRunning) {
            interval = setInterval(() => {
                setRemainingTime((prevTime) => prevTime - 10);
            }, 9);
        } else {
            if (interval) {
                clearInterval(interval);
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
    
    React.useEffect(() => {
        if (remainingTime <= 0 || remainingTime === 0) {
            setRemainingTime(0);
            setIsReset(true);
            stop();
        }
    }, [remainingTime]);

    return {
        isRunning,
        isReset,
        getRemainingTime,
        start,
        stop,
        reset,
    };
};

export default () => {
    
    const [selectedMinutes, setSelectedMinutes] = React.useState("0");
    const [selectedSeconds, setSelectedSeconds] = React.useState("0");
    const [selectedHours, setSelectedHours] = React.useState("0");

    const { isRunning, isReset, start, stop, reset, getRemainingTime } = useTimer({
        selectedHours,
        selectedMinutes,
        selectedSeconds
    });
    
    // getRemainingTime() returns time in milliseconds
    let hours = Math.floor(getRemainingTime() / 3600000);
    let minutes = Math.floor(getRemainingTime() / 60000);
    let seconds = Math.floor(getRemainingTime() / 1000);
    let centiseconds = Math.floor(getRemainingTime() / 10);

    return ( 
        <View style={styles.container}>
            <Text>Time: {formatNumber(hours)}:{formatNumber(minutes)}:{formatNumber(seconds)}.{formatNumber(centiseconds)}</Text>
            <Button title="Start" onPress={ start } disabled={ (isRunning) } />
            {isRunning && getRemainingTime() != 0 ? (
                <Button title="Stop" onPress={stop} />
            ) : (
                <Button title="Reset" onPress={reset} disabled={ getRemainingTime() == 0 } />
            )}
            {isReset && (
                <Pickers
                    selectedHours={selectedHours}
                    setSelectedHours={setSelectedHours}
                    selectedMinutes={selectedMinutes}
                    setSelectedMinutes={setSelectedMinutes}
                    selectedSeconds={selectedSeconds}
                    setSelectedSeconds={setSelectedSeconds}
                />
            )}
        </View>
    );
};
