export interface Coordinates {
    x: number;
    y: number;
}

export interface SnakePart extends Coordinates {
    previousPartKey: string;
    isLast: boolean;
}

export enum Directions {
    UP = 'up',
    DOWN = 'down',
    LEFT = 'left',
    RIGHT = 'right',
}

export enum GameState {
    INIT = 'init',
    ACTIVE = 'active',
    OVER = 'over',
}
