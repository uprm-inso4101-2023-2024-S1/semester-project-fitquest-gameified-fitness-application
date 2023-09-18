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

const getRemaining = (time: number) => {
    const hours = Math.floor(time / 3600); // Calculate hours
    const remainingTimeInSeconds = time % 3600; // Calculate remaining time in seconds
    const minutes = Math.floor(remainingTimeInSeconds / 60);
    const seconds = Math.floor(remainingTimeInSeconds % 60);
    const milliseconds = Math.floor((remainingTimeInSeconds % 1) * 100);

    return {
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

        setIsRunning(true)

        /*
        if (remainingTime != 0) {
            setIsReset(false);
            setIsRunning(true);
        } else {
            setIsReset(true);
            setIsRunning(false);
        }
        */
    };

    const stop = () => {
        setIsRunning(false);
    };

    const reset = () => {
        setRemainingTime(
            (parseInt(selectedHours, 10) * 3600) +
            (parseInt(selectedMinutes, 10) * 60) +
            parseInt(selectedSeconds, 10)
        );
        setIsRunning(false);
        setIsReset(true);
    }

    React.useEffect(() => {
        let interval: number | null = null;
        if (isRunning) {
            interval = window.setInterval(() => {
                setRemainingTime((prevTime) => prevTime - 0.015); // Adjust time "speed" here
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

    React.useEffect(() => {
        if (remainingTime <= 0) {
            setRemainingTime(0);
            stop();
        }
    }, [remainingTime]);

    return {
        isRunning,
        isReset,
        start,
        stop,
        reset,
        remainingTime
    };
};

export default () => {
    const [selectedMinutes, setSelectedMinutes] = React.useState("0");
    const [selectedSeconds, setSelectedSeconds] = React.useState("0");
    const [selectedHours, setSelectedHours] = React.useState("0");

    const { isRunning, isReset, start, stop, reset, remainingTime } = useTimer({
        selectedHours,
        selectedMinutes,
        selectedSeconds
    });

    const { hours, minutes, seconds, milliseconds } = getRemaining(remainingTime)

    return (
        <View style={styles.container}>
            <Text>Time: {`${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}.${formatNumber(milliseconds)}`}</Text>
            <Button title="Start" onPress={start} />
            {isRunning ? (
                <>
                    <Button title="Stop" onPress={stop} />
                </>
            ) : (
                <>
                    <Button title="Reset" onPress={reset} />
                </>
            )}
            {isReset ? (
                <>
                    <Pickers
                        selectedHours={selectedHours}
                        setSelectedHours={setSelectedHours}
                        selectedMinutes={selectedMinutes}
                        setSelectedMinutes={setSelectedMinutes}
                        selectedSeconds={selectedSeconds}
                        setSelectedSeconds={setSelectedSeconds}
                    />
                </>
            ) : (<></>)}
        </View>
    );
};
