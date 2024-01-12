import { getUserRating, pointRules } from '../src/index';
import { User } from '../src/types';

export const createUser = (user: Partial<User> = {}) => {
  const games = user.games || {};

  return Object.assign({
    yearsActive: 0,
    membershipLevel: 'free', // bronze, silver, gold
  },
    user,
    {
      games: Object.assign({
        won: 0,
        lost: 0,
        draw: 0,
        forfeited: 0,
      }, games),
    });
}

describe('getUserRating', () => {
  describe('main functionality', () => {
    it('should return 0 if the user has no games, yearsActive, and has free membership', () => {
      const user = createUser();
      expect(getUserRating(user, pointRules)).toEqual(0);
    });
    it('should return 7 if the user has 1 won game, 1 forfeited, 3 lost games, 5 draw games, 1 yearsActive, and silver membership', () => {
      const user = createUser(
        {
          yearsActive: 1, // 1 point
          membershipLevel: 'silver', // 2 points
          games: {
            won: 1, // 3 points
            forfeited: 1, // -2 points
            lost: 3, // -3 points
            draw: 5, // 4 points
          }
        }
      );
      expect(getUserRating(user, pointRules)).toEqual(7);
    });
    it('should return 15 if the user has 9 won games, 1 lost game, 6 draw games, no yearsActive, and free membership', () => {
      const user = createUser({
        games: {
          won: 3, // 9 points
          lost: 1, // -1 point
          draw: 6, // + 6
        }
      }); // + 1 for 10 games
      expect(getUserRating(user, pointRules)).toBe(15);
    });
  });

  describe('test score based on yearsActive', () => {
    it('a user should get 0 if the user has no year active', () => {
      const user = createUser({ yearsActive: 0});
      expect(getUserRating(user, pointRules)).toEqual(0);
    });
    it('a user should get 1 point for the first year active', () => {
      const user = createUser({ yearsActive: 1 });
      expect(getUserRating(user, pointRules)).toEqual(1);
    });
    it('a user should get 2 additional points for every 5 years active', () => {
      const user = createUser({ yearsActive: 5 });
      expect(getUserRating(user, pointRules)).toEqual(7);
      user.yearsActive = 17
      expect(getUserRating(user, pointRules)).toEqual(23);
    });
  });

  describe('test score based on membershipLevel', () => {
    it('should return 0 point for a user with a free membership', () => {
      const user = createUser({membershipLevel: 'free'});
      expect(getUserRating(user, pointRules)).toEqual(0);
    });
    it('should return 1 point for a user with a bronze membership', () => {
      const user = createUser({membershipLevel: 'bronze'});
      expect(getUserRating(user, pointRules)).toEqual(1);
    });
    it('should return 2 points for a user with a silver membership', () => {
      const user = createUser({membershipLevel: 'silver'});
      expect(getUserRating(user, pointRules)).toEqual(2);
    });
    it('should return 3 points for a user with a gold membership', () => {
      const user = createUser({membershipLevel: 'gold'});
      expect(getUserRating(user, pointRules)).toEqual(3);
    });
  });

  describe('test score based on games', () => {
    it('should return 0 if the user has no won games', () => {
      const user = createUser({ games: { won: 0 } });
      expect(getUserRating(user, pointRules)).toEqual(0);
    });
    it('should return 3 if the user has 1 won games', () => {
      const user = createUser({ games: { won: 1 } });
      expect(getUserRating(user, pointRules)).toEqual(3);
    });
    it('should return 0 if the user has no forfeited games', () => {
      const user = createUser({ games: { forfeited: 0 } });
      expect(getUserRating(user, pointRules)).toEqual(0);
    });
    it('should return -2 if the user has 1 forfeited game', () => {
      const user = createUser({ games: { forfeited: 1 } });
      expect(getUserRating(user, pointRules)).toEqual(-2);
    });
    it('should return 3 if the user has 1 forfeited game and gold membership', () => {
      const user = createUser({ membershipLevel: 'gold', games: { forfeited: 1 } });
      expect(getUserRating(user, pointRules)).toEqual(3);
    });
    it('should return 0 if the user has no lost games', () => {
      const user = createUser({ games: { lost: 0 } });
      expect(getUserRating(user, pointRules)).toEqual(0);
    });
    it('should return -3 if the user has 3 lost games', () => {
      const user = createUser({ games: { lost: 3 } });
      expect(getUserRating(user, pointRules)).toEqual(-3);
    });
    it('should return 0 if the user has no draw games', () => {
      const user = createUser({ games: { draw: 0 } });
      expect(getUserRating(user, pointRules)).toEqual(0);
    });
    it('should return 5 if the user has 5 draw games', () => {
      const user = createUser({ games: { draw: 5 } });
      expect(getUserRating(user, pointRules)).toEqual(5);
    });
    it('give 1 extra point per 10 games played', () => {
      const user = createUser({ games: { draw: 10 } });
      expect(getUserRating(user, pointRules)).toBe(11);
      user.games.draw = 20;
      expect(getUserRating(user, pointRules)).toBe(22);
    });
  });
});


// TODO:
// test individuals functions
// do not return negative numbers