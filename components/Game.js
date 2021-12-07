import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle';

let intervalId;

export default Game = ({ randomNumbersCount, initialSeconds }) => {
  const [ selectedNumbers, setSelectedNumbers ] = useState([]);
  const [ randomNumbers, setRandomNumbers ] = useState([]);
  const [ target, setTarget ] = useState(1);
  const [ remainingSeconds, setRemainingSeconds ] = useState(initialSeconds);
  const [ gameStatus, setGameStatus ] = useState('PLAYING');

  // const randomNumbers = Array.from({ length: randomNumbersCount }).map(() => 1 + Math.floor(10 * Math.random()));
  // const target = randomNumbers.slice(0, randomNumbersCount - 2).reduce((acc, cur) => acc + cur, 0);

  useEffect(() => {
    const firstRandomNumbers = Array.from({ length: randomNumbersCount }).map(() => 1 + Math.floor(10 * Math.random()));
    const firstTarget = firstRandomNumbers.slice(0, randomNumbersCount - 2).reduce((acc, cur) => acc + cur, 0);
    const shuffledRandomNumbers = shuffle(firstRandomNumbers);
    setRandomNumbers(shuffledRandomNumbers);
    setTarget(firstTarget);

    intervalId = setInterval(() => setRemainingSeconds(seconds => seconds -1), 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setGameStatus(() => getGameStatus());
    if (remainingSeconds === 0 || gameStatus !== 'PLAYING') {
      clearInterval(intervalId);
    }
  }, [remainingSeconds, selectedNumbers]);

  const isNumberSelected = numberIndex => selectedNumbers.some(number => number === numberIndex);
  const selectNumber = number => setSelectedNumbers( [ ...selectedNumbers, number ] );

  const getGameStatus = () => {
    const numSelected = selectedNumbers.reduce((acc, cur) => acc + randomNumbers[cur], 0);
    if (remainingSeconds === 0 ||  numSelected > target) {
      return 'LOST';
    } else if (numSelected === target) {
      return 'WON';
    } else {
      return 'PLAYING';
    }
  }

  // const status = gameStatus();

  return (
    <View>
      <Text style={[styles.target, styles[gameStatus]]}>{target}</Text>
      <Text>{gameStatus}</Text>
      <Text>{remainingSeconds}</Text>
      <View style={styles.randomContainer}>
        {randomNumbers.map((randomNumber, index) => (
          <RandomNumber key={index} id={index} number={randomNumber} isSelected={isNumberSelected(index) || gameStatus !== 'PLAYING'} onSelected={selectNumber} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  target: {
    fontSize: 40,
    backgroundColor: '#aaa',
    textAlign: 'center',
  },
  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "space-between",
  },
  PLAYING: {
    backgroundColor: '#bbb',
  },
  WON: {
    backgroundColor: 'green',
  },
  LOST: {
    backgroundColor: 'red',
  },
});