import { createUser } from '../test/index.test';
import { PointRules, User } from './types';

export const pointRules = {
  perYearActive: { one: 1, five: 2 },
  perMembershipLevel: { free: 0, bronze: 1, silver: 2, gold: 3 },
  perGames: { won: 3, draw: 1, lost: -1, forfeited: { free: -2, bronze: -2, silver: -2, gold: 0 }, played: { ten: 1 } }
} as const

export function getUserRating(user: User = createUser(), rules: PointRules) {
  const userPoints = {
    oneYearActivePoints: user.yearsActive * rules.perYearActive.one,
    fiveYearsActivePoints: Math.floor(user.yearsActive / 5) * rules.perYearActive.five,
    membershipPoints: rules.perMembershipLevel[user.membershipLevel],
    gameWonPoints: (user.games.won ?? 0) * rules.perGames.won,
    gameDrawPoints: (user.games.draw ?? 0) * rules.perGames.draw,
    gameLostPoints: (user.games.lost ?? 0) * rules.perGames.lost,
    gameForfeitedPoints: (user.games.forfeited ?? 0) * rules.perGames.forfeited[user.membershipLevel],
    gamePlayedPoints: Math.floor(Object.values(user.games).reduce((acc, item) => acc + item) / 10) * rules.perGames.played.ten,
  }
  const totalPoints = Object.values(userPoints).reduce((acc, item) => acc + item)
  return totalPoints
}
