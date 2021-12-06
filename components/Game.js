import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from 'react'
import RandomNumber from "./RandomNumber";

export default Game = ({ randomNumbersCount }) => {
    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const [randomNumbers, setRandomNumbers] = useState([]);
    const [target, setTarget] = useState(0);

    // const randomNumbers = Array.from({ length: randomNumbersCount })
    //     .map(() => 1 + Math.floor(10 * Math.random()));

    // const target = randomNumbers.slice(0, randomNumbersCount - 2)
    //     .reduce((acc, cur) => acc + cur, 0);

    useEffect(() => {
        const firstRandomNumbers = Array.from({ lenght: randomNumbersCount }).map(() => 1 + Math.floor(10 * Math.random()));
        const firstTarget = firstRandomNumbers.slice(0, randomNumbersCount - 2).reduce((acc, cur) => acc + cur, 0);

        setRandomNumbers(firstRandomNumbers);
        setTarget(firstTarget);
    }, [])

    const isNumberSelected = numberIndex => selectedNumbers.some(number => number === numberIndex);
    const selectNumber = number => setSelectedNumbers([...selectedNumbers, number]);

    const gameStatus = () => {
        const numSelected = selectedNumbers.reduce((acc, cur) => acc + randomNumbers[curl], 0)
        console.log(numSelected);

        if(numSelected < target){
            return 'PLAYING';
        } else if (numSelected === target){
            return 'WON'
        } else {
            return 'LOST'
        }
    }
    
    const status = gameStatus();

    return (
        <View>
            <Text style={[styles.target, styles[status]]}>{target}</Text>
            <Text style={styles[status]}>{status}</Text>
            <View style={styles.randomContainer}>
                {randomNumbers.map((randomNumber, index) => (
                    <RandomNumber key={index} id={index} number={randomNumber} isSelected={isNumberSelected(index) || status!== 'PLAYING'} onSelected={selectNumber} />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    target: {
        fontSize: 40,
        backgroundColor: '#aaa',
        textAlign: 'center'
    },
    randomContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "space-between",
    },
    PLAYING: {
        backgroundColor: '#bbb'
    },
    WON: {
        backgroundColor: 'green'
    },
    LOST: {
        backgroundColor: 'red'
    },
});