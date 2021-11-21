import React from 'react';
import { Coordinates } from '../../types/types';

import { useAppSelector } from '../../store/hooks';
import { getFood, getSnakeHead, getSnakeTail } from '../../store/slices/gameSlice';
// styles
import styles from './GameField.module.css';
import cx from 'classnames';

const FieldCell = ({ x, y }: Coordinates) => {
    const snakeHead = useAppSelector(getSnakeHead);
    const snakeTaleCoords = useAppSelector(getSnakeTail);
    const food = useAppSelector(getFood);

    const isFood = x === food.x && y === food.y;
    const isHead = snakeHead && snakeHead.x === x && snakeHead.y === y;
    const isPart = !isHead && snakeTaleCoords.some((part) => part.x === x && part.y === y);

    return (
        <div
            className={cx(styles.cell, {
                [styles.food]: isFood,
                [styles.snakeHead]: isHead,
                [styles.snakePart]: isPart,
            })}
        ></div>
    );
};

export default FieldCell;
