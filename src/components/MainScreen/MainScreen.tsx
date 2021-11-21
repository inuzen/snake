import React from 'react';

// components
import GameField from '../GameField/GameField';
import Controls from '../Controls/Controls';

// styles
import styles from './MainScreen.module.css';

const MainScreen = () => {
    return (
        <div className={styles.container}>
            <div className={styles.fieldWrapper}>
                <GameField />
            </div>
            <div className={styles.controlsWrapper}>
                <Controls />
            </div>
        </div>
    );
};

export default MainScreen;
