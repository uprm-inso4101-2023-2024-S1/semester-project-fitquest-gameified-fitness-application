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

// We create an array of numbers from 1 - 59 in order
// to map them on our picker components that will allow 
// the user to set the timer's time.
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

function temp() {
    console.log("ehllo")
}

// The picker is the component that inputs a 
// custom amount of time for the timer.
type PickerProps = {
    selectedHours,
    selectedMinutes,
    selectedSeconds,
    setSelectedHours,
    setSelectedMinutes,
    setSelectedSeconds
};

const Pickers = ({
    selectedHours,
    selectedMinutes,
    selectedSeconds,
    setSelectedHours,
    setSelectedMinutes,
    setSelectedSeconds,
}: PickerProps) => (
    <View style={styles.pickerContainer}>
        
        <Picker
            style={styles.picker}
            itemStyle={styles.pickerItem}
            // selectedValue is the pickerProp being inputed
            // by the user using the current picker 'slider'
            selectedValue={selectedHours}
            // The onValueChange function is called in order
            // to store the value of the time selected by the
            // user on one of the already outlined pickerProps
            onValueChange={(itemValue) => {
                setSelectedHours(itemValue);
            }}
        >
            { // Using javascript's map function we can take every
            // value created using createArray() and add it as a
            // picker item on our picker component, instead of 
            // doing it manually
            AVAILABLE_HOURS.map((value) => (
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

// Timer component
interface UserTimerProps {
    initialTime?: number;
}

const Timer: React.FC<UserTimerProps> = ({
    initialTime,
}) => {

    // The initialTime variable will fetch the amount of time
    // that each exercise requires from the database that 
    // contains all exercises used for workouts.
    initialTime = 5000; // temporary

    const [isRunning, setIsRunning] = useState(false);

    const [isReset, setIsReset] = useState(true);

    // Remaining time is the variable that will be constantly
    // updated when the timer's isRunning = true. This variable
    // returns time as milliseconds
    let [remainingTime, setRemainingTime] = useState(initialTime);

    // When start button is clicked this function is called
    const start = () => {
        if (isReset) {
            setRemainingTime(initialTime);
        }

        setIsReset(false);
        setIsRunning(true);
    };

    const stop = () => {
        setIsRunning(false);
    };

    const reset = () => {
        setRemainingTime(initialTime);

        setIsRunning(false);
        setIsReset(true);
    }

    const formatNumber = (number: number) => `0${number}`.slice(-2);

    // This is a react hook. It is in charge of updating the
    // remaining time from our initial time every millisecond
    // The official react documentation has more info on how
    // useEffect works
    // https://react.dev/reference/react/useEffect
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isRunning) {
            interval = setInterval(() => {
                setRemainingTime(prevmilliseconds => prevmilliseconds - 10);
            }, 1);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };

    }, [isRunning]);

    // variables turns remainingTime variable to hours,
    // minutes, seconds, and centiseconds to be displayed
    // on timer component front end 
    let hours = Math.floor(remainingTime / 3600000);
    let minutes = Math.floor(remainingTime / 60000);
    let seconds = Math.floor(remainingTime / 1000);
    let centiseconds = Math.floor(remainingTime / 10);

    return (
        <View style={styles.container}>
            
            <Text>Time: {formatNumber(hours)}:{formatNumber(minutes)}:{formatNumber(seconds)}.{formatNumber(centiseconds)}</Text>
            
            {/* The start button has a disabled property so that it
            is only available to be used when timer is not running */}
            <Button title="Start" onPress={start} disabled={(isRunning)} />

            {/* The following functionality serves to show either the
            stop button or the reset button under the start button. Stop
            is shown if the timer is running, reset is shown when timer
            is not running */}
            {isRunning && remainingTime != 0 ? (
                <Button title="Stop" onPress={stop} />
            ) : (
                <Button title="Reset" onPress={reset} disabled={remainingTime == 0} />
            )}
            {/* {isReset && (
                <Pickers
                    selectedHours={hours}
                    selectedMinutes={minutes}
                    selectedSeconds={seconds}
                    setSelectedHours={setHours}
                    setSelectedMinutes={(min) => {setMinutes(min)}}
                    setSelectedSeconds={setSeconds}
                />
            )} */}
        </View>
    );
};

export default Timer;
