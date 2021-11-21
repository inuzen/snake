import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
    startGame,
    getGameState,
    getDimensions,
    getGameSpeed,
    changeDimensions,
    changeSpeed,
} from '../../store/slices/gameSlice';
import { GameState } from '../../types/types';

// constants
import { MIN_SPEED_VALUE, MAX_SPEED_VALUE, MAX_GRID_LENGTH, MIN_GRID_LENGTH } from '../../utils/constants';

// styles
import styles from './Controls.module.css';

const Controls = () => {
    const gameActive = useAppSelector(getGameState) === GameState.ACTIVE;
    const gameSpeed = useAppSelector(getGameSpeed);
    const dimensions = useAppSelector(getDimensions);

    const dispatch = useAppDispatch();

    const [localDims, setLocalDims] = useState(dimensions);
    const [localSpeed, setLocalSpeed] = useState(gameSpeed);

    useEffect(() => {
        const cb = (e: KeyboardEvent) => {
            if (e.key === ' ') {
                dispatch(startGame());
            }
        };
        document.addEventListener('keypress', cb);
        return () => {
            document.removeEventListener('keypress', cb);
        };
    }, []);

    const onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newWidth = Math.floor(Number(e.target.value));
        setLocalDims({ ...localDims, width: newWidth });
        if (newWidth !== dimensions.width && newWidth >= MIN_GRID_LENGTH && newWidth <= MAX_GRID_LENGTH) {
            dispatch(changeDimensions({ ...dimensions, width: newWidth }));
        }
    };
    const onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newHeight = Math.floor(Number(e.target.value));
        setLocalDims({ ...localDims, height: newHeight });
        if (newHeight !== dimensions.width && newHeight >= MIN_GRID_LENGTH && newHeight <= MAX_GRID_LENGTH) {
            dispatch(changeDimensions({ ...dimensions, height: newHeight }));
        }
    };
    const onGameSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSpeed = Math.floor(Number(e.target.value));
        setLocalSpeed(newSpeed);
        if (newSpeed !== gameSpeed && newSpeed >= MIN_SPEED_VALUE && newSpeed <= MAX_SPEED_VALUE) {
            dispatch(changeSpeed(newSpeed));
        }
    };

    const onGameStart = () => {
        dispatch(startGame());
    };

    return (
        <div className={styles.controlsContainer}>
            <div className={styles.controlsRow}>
                <div className={styles.inputWrapper}>
                    <span>Width:</span>
                    <input disabled={gameActive} type="number" value={localDims.width} onChange={onWidthChange} />
                    <span className={styles.hint}>{`Between ${MIN_GRID_LENGTH} and ${MAX_GRID_LENGTH}`}</span>
                </div>
            </div>
            <div className={styles.controlsRow}>
                <div className={styles.inputWrapper}>
                    <span>Height:</span>
                    <input disabled={gameActive} type="number" value={localDims.height} onChange={onHeightChange} />
                    <span className={styles.hint}>{`Between ${MIN_GRID_LENGTH} and ${MAX_GRID_LENGTH}`}</span>
                </div>
            </div>
            <div className={styles.controlsRow}>
                <div className={styles.inputWrapper}>
                    <span>Game Speed in ms</span>
                    <input disabled={gameActive} type="number" value={localSpeed} onChange={onGameSpeedChange} />
                    <span className={styles.hint}>{`Between ${MIN_SPEED_VALUE} and ${MAX_SPEED_VALUE}`}</span>
                </div>
            </div>
            <div className={styles.startButtonWrapper}>
                <button className={styles.startButton} disabled={gameActive} type="button" onClick={onGameStart}>
                    Start Game
                </button>
            </div>
        </div>
    );
};

export default Controls;
