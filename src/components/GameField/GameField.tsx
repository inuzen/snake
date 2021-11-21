import React, { useEffect, useMemo } from 'react';

import FieldCell from './FieldCell';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
    getDimensions,
    getScore,
    getGameSpeed,
    getGameState,
    tick,
    changeDirection,
    getDirection,
} from '../../store/slices/gameSlice';

// styles
import styles from './GameField.module.css';
import styled from 'styled-components';

// types
import { Directions, GameState } from '../../types/types';
import { generateGrid } from '../../utils/generateGrid';

const GridContainer = styled.div<{ width: number; height: number }>`
    width: ${({ width }) => width * 25}px;
    height: ${({ height }) => height * 25}px;
    display: grid;
    grid-template-columns: repeat(${({ width }) => width}, 25px);
    grid-template-rows: repeat(${({ height }) => height}, 25px);
    border: 1px black solid;
`;

const GameField = () => {
    const dimensions = useAppSelector(getDimensions);
    const gameSpeed = useAppSelector(getGameSpeed);
    const gameState = useAppSelector(getGameState);
    const currDirection = useAppSelector(getDirection);
    const score = useAppSelector(getScore);

    const dispatch = useAppDispatch();

    useEffect(() => {
        document.addEventListener('keydown', function (e) {
            let newDir = currDirection;
            switch (e.key) {
                case 'ArrowDown':
                    newDir = Directions.DOWN;
                    break;
                case 'ArrowUp':
                    newDir = Directions.UP;
                    break;
                case 'ArrowRight':
                    newDir = Directions.RIGHT;
                    break;
                case 'ArrowLeft':
                    newDir = Directions.LEFT;
                    break;
                default:
                    break;
            }
            dispatch(changeDirection(newDir));
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;
        if (gameState === GameState.ACTIVE) {
            interval = setInterval(() => dispatch(tick()), gameSpeed);
        }

        return () => {
            interval && clearInterval(interval);
        };
    }, [dispatch, gameSpeed, gameState, currDirection]);

    const { width, height } = dimensions;
    const grid = useMemo(() => generateGrid(width, height), [width, height]);

    return (
        <div>
            <GridContainer width={width} height={height}>
                {grid.map(({ x, y }) => (
                    <FieldCell key={`${x}-${y}`} x={x} y={y} />
                ))}
            </GridContainer>
            {gameState === GameState.OVER && <p className={styles.gameOverText}>Game Over! Your score is {score}</p>}
        </div>
    );
};

export default GameField;
