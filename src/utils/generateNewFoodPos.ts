import { Coordinates } from '../types/types';

const coordMaker = (limitX: number, limitY: number): Coordinates => {
    return { x: Math.floor(Math.random() * limitX), y: Math.floor(Math.random() * limitY) };
};

export const generateNewFoodPos = (limitX: number, limitY: number, occupied: Coordinates[]): Coordinates => {
    let accepted = false;
    let newCoords = coordMaker(limitX, limitY);

    const onSnake = (coords: any) => occupied.some((part) => part.x === coords.x && part.y === coords.y);
    while (!accepted) {
        newCoords = coordMaker(limitX, limitY);
        accepted = !onSnake(newCoords);
    }

    return newCoords;
};
