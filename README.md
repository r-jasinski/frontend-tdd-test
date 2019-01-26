# Chess FE Refactor & Testing Challenge

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

Chess has a function `getUserRating` that determines a user's rating based off multiple factors. Here is what a user object looks like:

```js
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

A user's rating will start at 0 initially and will increase _or_ decrease based off the following rules:

#### User Longevity (yearsActive)
- A user gets 1 point per years active
- Every 5 years, a user gets two additional points
  - 5 years would accrue 7 points
  - 15 years would accrue 21 points

#### Membership Level (membershipLevel)
- 3 points for gold membership
- 2 points for silver membership
- 1 point for bronze membership
- 0 points for free membership

#### Games Played (games)
- 3 points per won game
- 1 point per draw
- -1 point per lost game
- -2 points per forfeited game

--- 

## Goals 

Demonstrate your skills of TDD and refactoring the following ways, in what you feel is the _most_ important order, via the following:

- Spot any code smells and find ways to refactor
- Based off the requirements, get method `getUserRating` under test
- Fix any issues found during TDD
- Implement new feature

#### New Feature
- 1 extra point is awarded for every 10 games a user has played