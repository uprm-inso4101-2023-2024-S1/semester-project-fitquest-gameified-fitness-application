import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, Button, StyleSheet, Animated, Dimensions } from 'react-native';
import { LevelContext } from '../App';

// barra no se ve linda en roadmap page

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 20,
        margin: 20,
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
    },
    barContainer: {
        height: 20, 
        backgroundColor: '#ccc',
        flexGrow: 8,
    },
    levelContainer: {
        justifyContent: 'center',
        padding: 8,
    },
    levelText: {
        fontWeight: 'bold',
    },
    bar: {
        height: '100%',
        backgroundColor: 'green',
    },
});

export default function ProgressBar({ currentXp, totalXp }) {
    const { level } = useContext(LevelContext);
    const progress = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const percentageCompleted = currentXp / totalXp;
        const newWidth = percentageCompleted * Dimensions.get('window').width;

        Animated.timing(progress, {
            toValue: newWidth,
            duration: 100,
            useNativeDriver: false,
        }).start();
    }, [currentXp, totalXp]);


    return (
        <View style={[styles.container]} >
            <View style={styles.levelContainer}>
                <Text style={styles.levelText}>Level {level}</Text>
            </View>
            {/* XP Bar */}
            <View style={styles.barContainer} ref={containerRef}>
                <Animated.View style={[styles.bar, { width: progress }]} />
            </View>
        </View>
    );
};