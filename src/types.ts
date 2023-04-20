export type User = {
  games: Games;
  membershipLevel: string;
  yearsActive: number;
}

export type Games = {
  won?: number;
  lost?: number;
  draw?: number;
  forfeited?: number;
}
