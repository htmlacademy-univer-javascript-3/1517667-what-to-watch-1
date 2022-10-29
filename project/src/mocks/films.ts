import { IFullDescription } from '../pages/movie-page/movie-page';
import { IReview } from '../components/tabs/tabs';


export const filmDescriptions: { [id: string]: IFullDescription } = {
  'the-grand-budapest-hotel': {
    title: 'The Grand Budapest Hotel',
    genre: 'Drama',
    year: '2014',
    time: '1h 39m',
    ratingScore: '8,9',
    ratingLevel: 'Very good',
    ratingsCount: '240 ratings',
    image: 'img/the-grand-budapest-hotel-poster.jpg',
    imageAlt: 'the-grand-budapest-hotel-poster',
    director: 'Wes Anderson',
    actors: ['Bill Murray', 'Edward Norton', 'Jude Law', 'Willem Dafoe'],
    description: [
      'In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\'s friend and protege.',
      'Gustave prides himself on providing first-class service to the hotel\'s guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave\'s lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.'
    ],
    reviews: [
      {
        text: 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director\'s funniest and most exquisitely designed films in years.',
        author: 'Kate Muir',
        datetime: '2016-12-24',
        dateString: 'December 24, 2016',
        rating: '8,9'
      },
      {
        text: 'Anderson\'s films are too precious for some, but for those of us willing to lose ourselves in them, they\'re a delight. "The Grand Budapest Hotel" is no different, except that he has added a hint of gravitas to the mix, improving the recipe.',
        author: 'Bill Goodykoontz',
        datetime: '2015-11-18',
        dateString: 'November 18, 2015',
        rating: '8,0'
      },
      {
        text: 'I didn\'t find it amusing, and while I can appreciate the creativity, it\'s an hour and 40 minutes I wish I could take back.',
        author: 'Amanda Greever',
        datetime: '2015-11-18',
        dateString: 'November 18, 2015',
        rating: '8,0'
      },
      {
        text: 'The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.',
        author: 'Matthew Lickona',
        datetime: '2016-12-20',
        dateString: 'December 20, 2016',
        rating: '7,2'
      } ,
      {
        text: 'It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.',
        author: 'Paula Fleri-Soler',
        datetime: '2016-12-20',
        dateString: 'December 20, 2016',
        rating: '7,6'
      },
      {
        text: 'It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.',
        author: 'Paula Fleri-Soler',
        datetime: '2016-12-20',
        dateString: 'December 20, 2016',
        rating: '7,0'
      }
    ]
  },
  'macbeth': {
    title: 'Macbeth',
    genre: 'Drama',
    year: '2015',
    time: '1h 39m',
    ratingScore: '8,9',
    ratingLevel: 'Very good',
    ratingsCount: '240 ratings',
    image: 'img/macbeth.jpg',
    imageAlt: 'macbeth',
    director: 'Justin Kurzel',
    actors: ['Michael Fassbender', 'Marion Cotillard'],
    description: [
      'Macbeth, the Thane of Glamis, receives a prophecy from a trio of witches that one day he will become King of Scotland.',
      'Consumed by ambition and spurred to action by his wife, Macbeth murders his king and takes the throne for himself.'
    ],
    reviews: []
  },
  'pulp-fiction': {
    title: 'Pulp fiction',
    genre: 'Crime',
    year: '1994',
    time: '1h 39m',
    ratingScore: '8,9',
    ratingLevel: 'Very good',
    ratingsCount: '240 ratings',
    image: 'img/pulp-fiction.jpg',
    imageAlt: 'pulp-fiction',
    director: 'Quentin Tarantino',
    actors: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'],
    description: [
      'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.'
    ],
    reviews: []
  },
  'revenant': {
    title: 'The Revenant',
    genre: 'Drama',
    year: '2015',
    time: '1h 39m',
    ratingScore: '8,9',
    ratingLevel: 'Very good',
    ratingsCount: '240 ratings',
    image: 'img/revenant.jpg',
    imageAlt: 'revenant',
    director: 'Alejandro G. Iñárritu',
    actors: ['Leonardo DiCaprio', 'Tom Hardy'],
    description: [
      'A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear and left for dead by members of his own hunting team.'
    ],
    reviews: []
  },
  'mindhunter': {
    title: 'Mindhunter',
    genre: 'Crime',
    year: '2017-2019',
    time: '1h 39m',
    ratingScore: '8,9',
    ratingLevel: 'Very good',
    ratingsCount: '240 ratings',
    image: 'img/mindhunter.jpg',
    imageAlt: 'mindhunter',
    director: 'Joe Penhall',
    actors: ['Jonathan Groff', 'Holt McCallany'],
    description: [
      'Set in the late 1970s, two FBI agents are tasked with interviewing serial killers to solve open cases.'
    ],
    reviews: []
  },
  'orlando': {
    title: 'Orlando',
    genre: 'Drama',
    year: '1992',
    time: '1h 39m',
    ratingScore: '8,9',
    ratingLevel: 'Very good',
    ratingsCount: '240 ratings',
    image: 'img/orlando.jpg',
    imageAlt: 'orlando',
    director: 'Sally Potter',
    actors: ['Tilda Swinton', 'Billy Zane'],
    description: [
      'After Queen Elizabeth I commands him not to grow old, a young nobleman struggles with love and his place in the world.'
    ],
    reviews: []
  },
  'moonrise-kingdom': {
    title: 'Moonrise Kingdom',
    genre: 'Romance',
    year: '2012',
    time: '1h 39m',
    ratingScore: '8,9',
    ratingLevel: 'Very good',
    ratingsCount: '240 ratings',
    image: 'img/moonrise-kingdom.jpg',
    imageAlt: 'moonrise-kingdom',
    director: 'Wes Anderson',
    actors: ['Jared Gilman', 'Kara Hayward'],
    description: [
      'A pair of young lovers flee their New England town, which causes a local search party to fan out to find them.'
    ],
    reviews: []
  },
  'johnny-english': {
    title: 'Johnny English',
    genre: 'Comedy',
    year: '2003',
    time: '1h 39m',
    ratingScore: '8,9',
    ratingLevel: 'Very good',
    ratingsCount: '240 ratings',
    image: 'img/johnny-english.jpg',
    imageAlt: 'johnny-english',
    director: 'Peter Howitt',
    actors: ['Rowan Atkinson', 'John Malkovich'],
    description: [
      'After a sudden attack on MI5, Johnny English, Britain\'s most confident, yet unintelligent spy, becomes Britain\'s only spy.'
    ],
    reviews: []
  }
};
