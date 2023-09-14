# StopWatch.tsx

## Document Information

- **Document Author**: Ivanier Bellido and Pedro Matos
- **Date**: 2023-09-13
- **Version**: 1.0
- **Status**: In Progress

## Table of Contents
1. [Introduction](#1-introduction)
2. [Purpose](#2-purpose)
3. [Scope](#3-scope)
4. [Document Overview](#4-document-overview)
5. [Document Structure](#5-document-structure)
6. [Code Overview](#6-code-overview)
    1. [Imports](#61-imports)
    2. [TimerAppProps Interface](#6.2-timerappprops-interface)
    3. [TimerApp Component](#6.3-timerapp-component)
    4. [State Management](#6.4-state-management)
    5. [useEffect Hook](#6.5-useeffect-hook)
    6. [Timer Control Functions](#6.6-timer-control-functions)
    7. [Render Function](#6.7-render-function)

## 1. Introduction
This document provides an explanation of the StopWatch.tsx file, which is a React Native component that implements a simple timer application.

## 2. Purpose
The purpose of this file is to create a reusable timer component that allows users to start, stop, reset, and toggle a timer. It also displays the elapsed time in seconds.

## 3. Scope
This file primarily focuses on the implementation of the StopWatch component and its associated functionality. It is part of a larger React Native application.

## 4. Document Overview
This document provides an overview of the StopWatch.tsx file, explaining its structure and functionality.

## 5. Document Structure
This document follows a structured format, including sections for introduction, purpose, scope, document overview, and detailed code explanations.

## 6. Code Overview

### 6.1. Imports
- `expo-status-bar`: Import the StatusBar component from the Expo library.
- `react-native`: Import necessary components like View, Text, Button, and StyleSheet from the React Native library.
- `react`: Import React, useEffect, and useState from the React library.

### 6.2. StopWatchProps Interface
- `StopWatchProps`: Define an interface that specifies the props accepted by the StopWatch component, including an optional initialTime property.

### 6.3. StopWatch Component
- `StopWatch`: Define a functional component that represents the timer application. It accepts StopWatchProps as its props.

### 6.4. State Management
- `seconds`: Use the useState hook to manage the elapsed time in seconds.
- `isRunning`: Use the useState hook to manage the timer's running state.

### 6.5. useEffect Hook
- Use the useEffect hook to handle timer logic. It starts an interval when the timer is running and clears the interval when the component unmounts or when the isRunning state changes.

### 6.6. Timer Control Functions
- `startTimer`: Function to start the timer by setting isRunning to true.
- `stopTimer`: Function to stop the timer by setting isRunning to false.
- `resetTimer`: Function to stop the timer and reset the elapsed time to 0.
- `toggleTimer`: Function to toggle the timer between start and stop states.

### 6.7. Render Function
- Render the StopWatch component, displaying the elapsed time in seconds and buttons for starting, stopping, and resetting the time.