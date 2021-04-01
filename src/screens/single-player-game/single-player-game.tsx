import React, { useState, ReactElement, useEffect } from 'react';
import { View, SafeAreaView, Dimensions } from 'react-native';
import styles from './single-player-game-styles';
import { Text, GradientBackground } from '@components';
import { Board, Button } from '@components';
import {
  BoardState,
  isEmpty,
  isTerminal,
  getBestMove,
  Cell,
  useSounds,
} from '@utils';
import { useSettings, difficulties } from '@contexts/settings-context';

const SCREEN_WIDTH = Dimensions.get('screen').width;

export default function SinglePlayerGame(): ReactElement {
  // prettier-ignore
  // const b: BoardState = [
  //   'x', null, 'x',
  //   'x', 'x', null,
  //   'o', 'o', 'o'
  // ];
  // prettier-ignore
  const [state, setState] = useState<BoardState>([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const [turn, setTurn] = useState<'HUMAN' | 'BOT'>(
    Math.random() < 0.5 ? 'HUMAN' : 'BOT'
  );

  const [isHumanMaximizing, setIsHumanMaximizing] = useState<boolean>(true);
  const [gamesCount, setGamesCount] = useState({
    wins: 0,
    losses: 0,
    draws: 0,
  });

  const playSound = useSounds();
  const { settings } = useSettings();

  const gameResult = isTerminal(state);

  // console.log('getBestMove', getBestMove(state, true));

  // printFormattedBoard(b);
  // console.log(isTerminal(b));

  // console.log(isEmpty(b));
  // console.log(isFull(b));
  // console.log(getAvailableMoves(b));

  const insertCell = (cell: number, symbol: 'x' | 'o'): void => {
    const stateCopy: BoardState = [...state];
    if (stateCopy[cell] || isTerminal(stateCopy)) return;
    stateCopy[cell] = symbol;
    setState(stateCopy);
    try {
      symbol === 'x' ? playSound('pop1') : playSound('pop2');
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnCellPressed = (cell: number): void => {
    if (turn !== 'HUMAN') return;

    insertCell(cell, isHumanMaximizing ? 'x' : 'o');
    setTurn('BOT');
  };

  const getWinner = (winnerSymbol: Cell): 'HUMAN' | 'BOT' | 'DRAW' => {
    if (winnerSymbol === 'x') {
      return isHumanMaximizing ? 'HUMAN' : 'BOT';
    }
    if (winnerSymbol === 'o') {
      return isHumanMaximizing ? 'BOT' : 'HUMAN';
    }
    return 'DRAW';
  };

  const newGame = () => {
    setState([null, null, null, null, null, null, null, null, null]);
    setTurn(Math.random() < 0.5 ? 'HUMAN' : 'BOT');
  };

  useEffect(() => {
    if (gameResult) {
      const winner = getWinner(gameResult.winner);
      if (winner === 'HUMAN') {
        playSound('win');
        setGamesCount({ ...gamesCount, wins: gamesCount.wins + 1 });
      }

      if (winner === 'BOT') {
        playSound('loss');
        setGamesCount({ ...gamesCount, losses: gamesCount.losses + 1 });
      }
      if (winner === 'DRAW') {
        playSound('draw');
        setGamesCount({ ...gamesCount, draws: gamesCount.draws + 1 });
      }
    } else {
      if (turn === 'BOT') {
        if (isEmpty(state)) {
          const centerAndCorners = [0, 2, 6, 8, 4];
          const firstMove =
            centerAndCorners[
              Math.floor(Math.random() * centerAndCorners.length)
            ];
          insertCell(firstMove, 'x');
          setIsHumanMaximizing(false);
          setTurn('HUMAN');
        } else {
          const best = getBestMove(
            state,
            !isHumanMaximizing,
            0,
            parseInt(settings ? settings?.difficulty : '-1')
          );
          insertCell(best, isHumanMaximizing ? 'o' : 'x');
          setTurn('HUMAN');
        }
      }
    }
  }, [state, turn]);

  return (
    <GradientBackground>
      <SafeAreaView style={[styles.container]}>
        <View>
          <Text style={styles.difficulty}>
            Difficulty:{' '}
            {settings ? difficulties[settings.difficulty] : 'Impossible'}
          </Text>
        </View>
        <View style={styles.results}>
          <View style={styles.resultsBox}>
            <Text style={styles.resultsTitle}>Wins</Text>
            <Text style={styles.resultsCount}>{gamesCount.wins}</Text>
          </View>
          <View style={styles.resultsBox}>
            <Text style={styles.resultsTitle}>Draws</Text>
            <Text style={styles.resultsCount}>{gamesCount.draws}</Text>
          </View>
          <View style={styles.resultsBox}>
            <Text style={styles.resultsTitle}>Losses</Text>
            <Text style={styles.resultsCount}>{gamesCount.losses}</Text>
          </View>
        </View>
        <Board
          disabled={Boolean(isTerminal(state)) || turn !== 'HUMAN'}
          onCellPressed={(cell) => {
            handleOnCellPressed(cell);
          }}
          size={SCREEN_WIDTH - 60}
          state={state}
          gameResult={gameResult}
        />
        {gameResult && (
          <View style={styles.modal}>
            <Text style={styles.modalText}>
              {getWinner(gameResult.winner) === 'HUMAN' && 'You Won'}
              {getWinner(gameResult.winner) === 'BOT' && 'You Lost'}
              {getWinner(gameResult.winner) === 'DRAW' && "It's a Draw"}
            </Text>
            <Button title='Play Again' onPress={() => newGame()}></Button>
          </View>
        )}
      </SafeAreaView>
    </GradientBackground>
  );
}
