import { pointRules } from '../src/index';

export type User = {
  games: Partial<Games>;
  membershipLevel: string;
  yearsActive: number;
}

export type PointRules = typeof pointRules;

export type Games = {
  won: number;
  lost: number;
  draw: number;
  forfeited: number;
}
