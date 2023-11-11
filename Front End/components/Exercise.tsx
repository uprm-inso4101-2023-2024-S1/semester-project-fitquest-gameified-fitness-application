import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function Exercise({ data }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % data.images.length);
        }, 500); // Change image every 0.5 seconds

        return () => clearInterval(interval);
    }, [data.images]);

    return (
        <TouchableOpacity onPress={() => alert(data.description)}>
            <View>
                <Text>{data.name}</Text>
                <Image source={{ uri: data.images[currentImageIndex] }} style={{ width: 100, height: 100 }} />
                <Text>XP: {data.xp}</Text>
            </View>
        </TouchableOpacity>
    );
}
