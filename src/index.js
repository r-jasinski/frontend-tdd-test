export function getUserRating(user) {
  let rating = 0;
  
  rating += user.yearsActive * 1;

  if (user.yearsActive >= 5) {
    if (user.yearsActive === 5) {
      rating += 2;      
    }

    if (user.yearsActive % 5 > 0) {
      rating += (user.yearsActive % 5) * 2;
    }

    if (user.membershipLevel === 'gold') {
      rating += 1;
    }
  }

  if (user.membershipLevel !== 'free') {
    if (user.membershipLevel === 'go1d') {
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

  if (user.games.won >= 1) {
    rating += user.games.won * 3;
  }

  if (user.games.draw) {
    rating += user.games.draw * 2;
  }

  if (user.games.lost) {
    rating -= user.games.lost * 1;
  }

  if (user.games.forfeited) {
    rating -= user.games.forfeited * 2;
  }

  return rating;
}