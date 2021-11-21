import { generateNewFoodPos } from '../../utils/generateNewFoodPos';
import { Coordinates, Directions, GameState } from './../../types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { DEFAULT_WIDTH, DEFAULT_HEIGHT, DEFAULT_SPEED } from '../../utils/constants';

interface Dimensions {
    width: number;
    height: number;
}

export interface CounterState {
    fieldDimensions: Dimensions;
    food: Coordinates;
    snake: Coordinates[];
    gameTickSpeed: number;
    score: number;
    moveDirection: Directions;
    gameState: GameState;
}

const initialState: CounterState = {
    fieldDimensions: { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT },
    snake: [],
    food: { x: -1, y: -1 },
    score: 0,
    gameTickSpeed: DEFAULT_SPEED,
    moveDirection: Directions.LEFT,
    gameState: GameState.INIT,
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        tick: (state) => {
            if (state.snake.length === 0) return;
            const head = state.snake[0];
            const newHead = { ...head };
            switch (state.moveDirection) {
                case Directions.UP:
                    newHead.y = head.y - 1;
                    break;
                case Directions.DOWN:
                    newHead.y = head.y + 1;
                    break;
                case Directions.RIGHT:
                    newHead.x = head.x + 1;
                    break;
                case Directions.LEFT:
                    newHead.x = head.x - 1;
                    break;
                default:
                    break;
            }
            if (
                newHead.x === state.fieldDimensions.width ||
                newHead.y === state.fieldDimensions.height ||
                newHead.x < 0 ||
                newHead.y < 0
            ) {
                gameSlice.caseReducers.gameOver(state);
            }

            if (state.snake.some((snakePart) => snakePart.x === newHead.x && snakePart.y === newHead.y)) {
                gameSlice.caseReducers.gameOver(state);
            }

            if (newHead.x === state.food.x && newHead.y === state.food.y) {
                gameSlice.caseReducers.updateFoodPos(state);
                state.score++;
            } else {
                state.snake.pop();
            }
            state.snake.unshift(newHead);
        },
        changeDirection: (state, action: PayloadAction<Directions>) => {
            if (state.gameState !== GameState.ACTIVE) {
                return;
            }
            const newDir = action.payload;
            const currDirection = state.moveDirection;

            if (newDir === currDirection) {
                return;
            }

            if (newDir === Directions.DOWN && currDirection !== Directions.UP) {
                state.moveDirection = Directions.DOWN;
            }

            if (newDir === Directions.UP && currDirection !== Directions.DOWN) {
                state.moveDirection = Directions.UP;
            }

            if (newDir === Directions.RIGHT && currDirection !== Directions.LEFT) {
                state.moveDirection = Directions.RIGHT;
            }

            if (newDir === Directions.LEFT && currDirection !== Directions.RIGHT) {
                state.moveDirection = Directions.LEFT;
            }

            gameSlice.caseReducers.tick(state);
        },
        updateFoodPos: (state) => {
            state.food = generateNewFoodPos(state.fieldDimensions.width, state.fieldDimensions.height, state.snake);
        },
        startGame: (state) => {
            if (state.gameState !== GameState.ACTIVE) {
                const snakeHead = {
                    x: Math.round(state.fieldDimensions.width / 2),
                    y: Math.round(state.fieldDimensions.height / 2),
                };
                state.snake = [
                    snakeHead,
                    { x: snakeHead.x + 1, y: snakeHead.y },
                    { x: snakeHead.x + 2, y: snakeHead.y },
                ];
                gameSlice.caseReducers.updateFoodPos(state);
                state.score = 0;
                state.gameState = GameState.ACTIVE;
            }
        },
        gameOver: (state) => {
            state.gameState = GameState.OVER;
            state.snake = [];
            state.food = { x: -1, y: -1 };
            state.moveDirection = Directions.LEFT;
        },
        changeDimensions: (state, action: PayloadAction<Dimensions>) => {
            state.fieldDimensions = action.payload;
        },
        changeSpeed: (state, action: PayloadAction<number>) => {
            state.gameTickSpeed = action.payload;
        },
    },
});

export const { tick, changeDirection, updateFoodPos, startGame, changeDimensions, changeSpeed } = gameSlice.actions;

export const getDimensions = (state: RootState) => state.game.fieldDimensions;
export const getFood = (state: RootState) => state.game.food;
export const getSnake = (state: RootState) => state.game.snake;
export const getSnakeHead = (state: RootState) => state.game.snake[0];
export const getSnakeTail = (state: RootState) => state.game.snake.slice(1);
export const getGameSpeed = (state: RootState) => state.game.gameTickSpeed;
export const getDirection = (state: RootState) => state.game.moveDirection;
export const getGameState = (state: RootState) => state.game.gameState;
export const getScore = (state: RootState) => state.game.score;

export default gameSlice.reducer;
