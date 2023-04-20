# Chess Front End Refactor & Testing Challenge

## Setup

```bash
npm install
```

To run the test watcher, run

```bash
npm t
```

---

## Introduction

Chess has a function `getUserRating` that determines a user's rating, calculated from the user object, which has this form:

```ts
{
  username: 'chessman',
  yearsActive: 0,
  membershipLevel: 'free', // could be 'free', 'bronze', 'silver', and 'gold'
  games: {
    won: 0,
    lost: 0,
    draw: 0,
    forfeited: 0,
  },
}
```

A user's rating will start at 0 initially and will increase _or_ decrease based off the following rules implemented in the `getUserRating` method:

#### User Longevity (yearsActive)
- A user gets 1 point per years active
- Every 5 years, a user gets 2 additional points
  - 5 years would accrue 7 points
  - 17 years would accrue 23 points

#### Membership Level (membershipLevel)
- 3 points for gold membership
- 2 points for silver membership
- 1 point for bronze membership
- 0 points for free membership

#### Games Played (games)
- 3 points per won game
- 1 point per draw
- -1 point per lost game
- -2 points per forfeited game **UNLESS** a user has a _gold_ membership, in which they lose **0** points

---

Based off the above criteria and the given user, this method call should return `getUserRating` a total rating of `6`.

```ts
const userRating = getUserRating({
  username: 'chessman',
  yearsActive: 1, // 1 point
  membershipLevel: 'silver', // 2 points
  games: {
    won: 1, // 3 points
    forfeited: 1, // -2 points
    lost: 3, // -3 points
    draw: 5, // 5 points
  }
});
```

---

## Goals

During your interview, demonstrate your skills of TDD (Test Driven Development) and refactoring the by completing the following items in what you feel is the _most_ important order:

- Spot any code smells and find ways to refactor
- Based off the requirements, get method `getUserRating` under test coverage
- Fix any issues found during TDD
- Implement a new feature where 1 extra point is awarded for every 10 games a user has played

Keep in mind that the goal is _not_ to finish this problem, but to give you a chance to demonstrate your approach and thinking.
