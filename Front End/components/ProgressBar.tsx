import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, Button, StyleSheet, Animated, Dimensions } from 'react-native';
import { LevelContext } from '../App';

// BUGS
// barra tiene overflow
// barra no se ve linda en roadmap page

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 20,
        margin: 20,
        overflow: 'hidden',
    },
    barContainer: {
        backgroundColor: '#ddd',
        height: '100%'
    },
    levelContainer: {
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
    const {level, xp, totalXp: total, gainXp } = useContext(LevelContext)
    const [progress, setProgress] = useState(new Animated.Value(0));
    const containerRef = useRef(null);
    let newWidth = 0

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.measure((x, y, width, height, pageX, pageY) => {
                if (width > 100) {
                    newWidth = (currentXp / totalXp) * width;
                } else {
                    newWidth = currentXp * (totalXp / 100);
                };

                Animated.timing(progress, {
                    toValue: newWidth,
                    duration: 100,
                    useNativeDriver: false,
                }).start();
            });
        }
    }, [currentXp, totalXp]);

    return (
        <View style={[styles.container]}>
            <View style={styles.levelContainer}>
                <Text style={styles.levelText}>Level {level}</Text>
            </View>
            {/* XP Bar */}
            <View style={[{height: 20}, {width: '100%'}, {backgroundColor: '#ccc'}]} ref={containerRef}>
                <Animated.View style={[styles.bar, { width: progress }]} />
            </View>
        </View>
    );
};