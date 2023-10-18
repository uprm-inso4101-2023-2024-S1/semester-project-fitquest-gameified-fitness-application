import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Propierty types
interface RoadMapProps {
    navigation: any; // Adjust the type based on your navigation setup
}

interface Station {
    id: number;
    completed: boolean;
    locked: boolean;
    workoutKey?: number;
}

// State types
interface RoadMapState {
    xp: number;
    lvl: number;
    stations: Station[];
}

class RoadMap extends Component<RoadMapProps, RoadMapState> {
    constructor(initValues) {
        super(initValues);
        this.state = {
            xp: 0, // Initialize XP to 0
            lvl: 1, //Initialize lvl to 1
            stations: [ // Initialize the stations
                { id: 1, completed: false, locked: false, workoutKey: 1 },
                { id: 2, completed: false, locked: true, workoutKey: 2 },
                { id: 3, completed: false, locked: true, workoutKey: 3 },
                { id: 4, completed: false, locked: true, workoutKey: 4 },
                { id: 5, completed: false, locked: true, workoutKey: 5 },
                { id: 6, completed: false, locked: true, workoutKey: 6 },
                { id: 7, completed: false, locked: true, workoutKey: 7 },
                { id: 8, completed: false, locked: true, workoutKey: 8 },
                { id: 9, completed: false, locked: true, workoutKey: 9 },
                { id: 10, completed: false, locked: true, workoutKey: 10 },
            ],
        };
    }

    //This function handles leveling up when the xp reaches a certain amount
    lvlUp() {
        this.setState((prevState) => ({
            xp: 0, // Reset XP to 0
            lvl: prevState.lvl + 1, // Increase the level by 1
        }));
    }

    // Function to unlock a station when its level is reached
    unlock(stationId) {
        const updatedStations = this.state.stations.map((station) => {
            if (station.id == stationId && station.locked) {
                station.locked = false;
            } else {
                return station;
            }
        });
        this.setState({ stations: updatedStations });
    }

    //Function that can be modified to change the funcionality of each of the stations
    stationSelect = (stationId) => {
        const station = this.state.stations.find((s) => s.id == stationId);
        // Verifies if the station that was pressed is locked, if locked it tells the user what to do to unlock it
        if (station.locked) {
            // If the station's level is less than or equal to the current level, unlock it
            if (station.id <= this.state.lvl) {
                this.unlock(stationId);
            } else {
                Alert.alert('This station is locked. Reach level ' + station.id + ' to unlock.');
                return; // Exit the function if the station is locked
            }
        }
        // If the station is not locked, it will navigate to the workouts page
        if (!station.locked) {
            this.props.navigation.navigate("RoadMapWorkout", { stationId: station.id });
        }
    };


    //Function that can be modified to change the funcionality of the button on the bottom left of the screen
    handleLeftButtonPress = () => {
        // // This block of code is here for testing purposes
        // // Check if the XP is less than 500 before adding 10 XP
        // if (this.state.xp < 500) {
        //   this.setState((prevState) => ({
        //     xp: Math.min(prevState.xp + 10, 500), // Limit XP per level to a maximum of 500
        //   }));
        // } else {
        //   this.lvlUp()
        // }
        console.log('Left button pressed');
    };

    //Function that can be modified to change the funcionality of the button on the bottom right of the screen
    handleRightButtonPress = () => {
        console.log('Right button pressed');
    };

    // Function that handles rendering the different station buttons
    renderStationButton(station) {
        let buttonContent;

        if (station.locked) {
            buttonContent = <Icon name="lock" size={32} color="white" />;
        } else if (station.completed) {
            buttonContent = <Text style={styles.buttonText}>✓ {station.id}</Text>; // Marca de verificación para estaciones completadas
        } else {
            buttonContent = <Text style={styles.buttonText}>{station.id}</Text>;
        }

        return (
            <TouchableOpacity
                key={station.id}
                style={
                    station.locked 
                        ? styles.lockedButton
                        : station.completed 
                            ? styles.completedButton 
                            : styles.incompleteButton
                }
                onPress={() => this.stationSelect(station.id)}
            >
                {buttonContent}
            </TouchableOpacity>
        );
    }

    render() {
        const maxXpLvl = 500; // Maximum value of xp per level
        const xpBarWidth = (this.state.xp / maxXpLvl) * 85;

        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Road Map</Text>
                <ScrollView style={styles.scrollContainer}>
                    {this.state.stations.map((station) => this.renderStationButton(station))}
                </ScrollView>
                <View style={styles.xpContainer}>
                    <View style={[styles.xpBar, { width: xpBarWidth }]}></View>
                    <Text style={styles.xpText}> {this.state.xp} XP</Text>
                </View>
                <Text style={styles.level}>Level {this.state.lvl}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.leftButton}
                        onPress={this.handleLeftButtonPress}
                    >
                        <Icon name="home" size={40} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.rightButton}
                        onPress={this.handleRightButtonPress}
                    >
                        <Icon name="dumbbell" size={40} color="black" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 0,
    },
    leftButton: { // Borrar?
        width: 90,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightButton: { // Borrar?
        width: 90,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    xpContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 20,
    },
    xpBar: {
        width: '100%',
        height: 10,
        backgroundColor: 'green',
    },
    xpText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
    },
    level: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 0,
    },
    scrollContainer: {
        flex: 1,
        paddingHorizontal: 150,
    },
    leftSide: {
        alignSelf: 'flex-start',
    },
    rightSide: {
        alignSelf: 'flex-end',
    },
    completedButton: {
        width: 150,   // Ancho del rectángulo
        height: 50,  // Alto del rectángulo
        backgroundColor: 'green',  // Color de fondo cuando esté completado
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,  // Bordes redondeados, puedes ajustar según prefieras
    },
    incompleteButton: {
        width: 150,
        height: 50,
        backgroundColor: 'gray',  // Color de fondo cuando esté pendiente
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    lockedButton: {
        width: 150,
        height: 50,
        backgroundColor: 'black',  // Color de fondo cuando esté bloqueado
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
    },
    buttonContainer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: 30,
        left: 30,
        right: 30,
    },
});

export default RoadMap;