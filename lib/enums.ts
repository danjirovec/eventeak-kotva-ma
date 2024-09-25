export enum Categories {
  Movie = 'Movie',
  Concert = 'Concert',
  Theater = 'Theater',
  Workshop = 'Workshop',
  Festival = 'Festival',
  Talk = 'Talk',
  Quiz = 'Quiz',
  Exhibition = 'Exhibition',
  Performance = 'Performance',
  Dance = 'Dance',
}

export const categories = Object.keys(Categories).map(key => key);
