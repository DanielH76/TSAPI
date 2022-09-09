import { Game, Player } from "../modules/game.interface";

export const calculateHighscore = (
  numClicks: number,
  avgTime: number,
  bestTime: number
) => {
  const points: number = numClicks * 10;
  const avgTimeMultiplier: number = getAvgTimeMultiplier(avgTime);
  const bestTimeMultiplier: number = getBestTimeMultiplier(bestTime);
  const highscore: number = points * avgTimeMultiplier * bestTimeMultiplier;

  return highscore;
};

const getAvgTimeMultiplier = (avgTime: number): number => {
  const roundedTime = getNearest100(avgTime);

  switch (roundedTime) {
    case 900: {
      return 1.0;
    }
    case 800: {
      return 1.2;
    }
    case 700: {
      return 1.4;
    }
    case 600: {
      return 1.6;
    }
    case 500: {
      return 1.8;
    }
    default: {
      return 1;
    }
  }
};

const getBestTimeMultiplier = (bestTime: number): number => {
  const roundedTime = getNearest100(bestTime);
  switch (roundedTime) {
    case 200: {
      return 2.0;
    }
    case 300: {
      return 1.8;
    }
    case 400: {
      return 1.5;
    }
    case 500: {
      1.25;
    }
    default: {
      return 1.0;
    }
  }
};

const getNearest100 = (num: number): number => {
  const returnNum = Math.round(num / 100) * 100;
  return returnNum;
};
