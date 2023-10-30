import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, Button, StyleSheet, Animated, Dimensions } from 'react-native';
import { useLevelContext } from '../components/LevelContextProvider';

// BUGS
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
    const { level, xp, totalXp: contextTotalXp, gainXp } = useLevelContext();
    const [progress, setProgress] = useState(new Animated.Value(0));
    const containerRef = useRef(null);
    let newWidth = 0;
  
    useEffect(() => {
      if (containerRef.current) {
        containerRef.current.measure((x, y, width, height, pageX, pageY) => {
          if (width > 100) {
            newWidth = (currentXp / totalXp) * width;
          } else {
            newWidth = (currentXp / contextTotalXp) * width; // Use context totalXp here
          };
  
          Animated.timing(progress, {
            toValue: newWidth,
            duration: 100,
            useNativeDriver: false,
          }).start();
        });
      }
    }, [currentXp, totalXp, contextTotalXp]); // Add contextTotalXp to dependencies
  
    return (
      <View style={[styles.container]} >
        <View style={styles.levelContainer}>
          <Text style={styles.levelText}>Level {level}</Text>
        </View>
        <View style={styles.barContainer} ref={containerRef}>
          <Animated.View style={[styles.bar, { width: progress }]} />
        </View>
      </View>
    );
  };