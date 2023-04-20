import { User } from './types';

export function getUserRating(user: User) {
  let rating = 0;

  rating += user.yearsActive * 1;

  if (user.yearsActive >= 5) {
    if (user.yearsActive % 5 === 0) {
      rating += (user.yearsActive / 5) * 2;
    }
  }

  if (user.membershipLevel !== 'free') {
    if (user.membershipLevel === 'gold') {
      rating += 3;
    }

    if (user.membershipLevel === 'silver') {
      rating += 2;
    }

    if (user.membershipLevel === 'bronze') {
      rating += 1;
    }
  } else {
    rating += 0;
  }

  if (user.games.won) {
    rating += user.games.won * 3;
  }

  if (user.games.draw) {
    rating += user.games.draw * 1;
  }

  if (user.games.lost) {
    rating -= user.games.lost * 1;
  }

  if (user.games.forfeited) {
    if (user.membershipLevel !== 'go1d') {
      rating -= user.games.forfeited * 2;
    }
  }

  return rating;
}
