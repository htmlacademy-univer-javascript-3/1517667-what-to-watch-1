import { IFilmInfo } from '../types/IFilmInfo';
import { IComment, ICommentsInfo } from '../types/IComment';

export const makeFakeFilm = (): IFilmInfo => ({
  name: 'Snatch',
  posterImage: 'https://10.react.pages.academy/static/film/poster/Snatch.jpg',
  previewImage: 'https://10.react.pages.academy/static/film/preview/snatch.jpg',
  backgroundImage: 'https://10.react.pages.academy/static/film/background/Snatch.jpg',
  backgroundColor: '#FDFDFC',
  description: 'Unscrupulous boxing promoters, violent bookmakers, a Russian gangster, incompetent amateur robbers and supposedly Jewish jewelers fight to track down a priceless stolen diamond.',
  rating: 0.2,
  scoresCount: 716577,
  director: 'Guy Ritchie',
  starring: [
    'Jason Statham',
    'Brad Pitt',
    'Benicio Del Toro'
  ],
  runTime: 104,
  genre: 'Comedy',
  released: 2000,
  id: 1,
  isFavorite: false,
  videoLink: 'https://10.react.pages.academy/static/film/video/matrix.mp4',
  previewVideoLink: 'https://10.react.pages.academy/static/film/video/dog.mp4'
});

export const makeFakeFilms = (): IFilmInfo[] => ([
  {
    name: 'Snatch',
    posterImage: 'https://10.react.pages.academy/static/film/poster/Snatch.jpg',
    previewImage: 'https://10.react.pages.academy/static/film/preview/snatch.jpg',
    backgroundImage: 'https://10.react.pages.academy/static/film/background/Snatch.jpg',
    backgroundColor: '#FDFDFC',
    description: 'Unscrupulous boxing promoters, violent bookmakers, a Russian gangster, incompetent amateur robbers and supposedly Jewish jewelers fight to track down a priceless stolen diamond.',
    rating: 0.2,
    scoresCount: 716577,
    director: 'Guy Ritchie',
    starring: [
      'Jason Statham',
      'Brad Pitt',
      'Benicio Del Toro'
    ],
    runTime: 104,
    genre: 'Comedy',
    released: 2000,
    id: 1,
    isFavorite: false,
    videoLink: 'https://10.react.pages.academy/static/film/video/matrix.mp4',
    previewVideoLink: 'https://10.react.pages.academy/static/film/video/dog.mp4'
  },
  {
    name: 'War of the Worlds',
    posterImage: 'https://10.react.pages.academy/static/film/poster/War_of_the_Worlds.jpg',
    previewImage: 'https://10.react.pages.academy/static/film/preview/war-of-the-worlds.jpg',
    backgroundImage: 'https://10.react.pages.academy/static/film/background/War_of_the_Worlds.jpg',
    backgroundColor: '#9B7E61',
    description: 'As Earth is invaded by alien tripod fighting machines, one family fights for survival.',
    rating: 9.3,
    scoresCount: 386834,
    director: 'Steven Spielberg',
    starring: [
      'Tom Cruise',
      'Dakota Fanning',
      'Tim Robbins'
    ],
    runTime: 116,
    genre: 'Adventure',
    released: 2005,
    id: 3,
    isFavorite: false,
    videoLink: 'https://10.react.pages.academy/static/film/video/matrix.mp4',
    previewVideoLink: 'https://10.react.pages.academy/static/film/video/traffic.mp4'
  }
]);

export const makeFakeCommentsInfo = (): ICommentsInfo => (
  {
    filmId: 1,
    comments: [
      {
        'id': 1,
        'user': {
          'id': 17,
          'name': 'Emely'
        },
        'rating': 9.9,
        'comment': 'I personally found this movie to be boring. Definitely one of the most boring movies I\'ve ever seen.',
        'date': '2022-06-03T12:25:36.946Z'
      },
      {
        'id': 2,
        'user': {
          'id': 16,
          'name': 'Mollie'
        },
        'rating': 1.1,
        'comment': 'I personally found this movie to be boring. Definitely one of the most boring movies I\'ve ever seen.',
        'date': '2022-06-23T12:25:36.946Z'
      }
    ]
  }
);

export const makeFakeComment = (): IComment => (
  {
    'id': 1,
    'user': {
      'id': 17,
      'name': 'Emely'
    },
    'rating': 9.9,
    'comment': 'I personally found this movie to be boring. Definitely one of the most boring movies I\'ve ever seen.',
    'date': '2022-06-03T12:25:36.946Z'
  }
);
