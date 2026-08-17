import { ConstellationItem, DateNightIdea } from '../types';

export const defaultConstellations: ConstellationItem[] = [
  {
    id: "c1",
    name: "Cor Amoris (The Heart)",
    quote: "Two stars bound by one eternal gravity.",
    description: "Discovered on the night we first admitted our feelings under the skyline.",
    coordinates: [{ x: 20, y: 30 }, { x: 28, y: 22 }, { x: 35, y: 30 }, { x: 28, y: 42 }, { x: 20, y: 30 }]
  },
  {
    id: "c2",
    name: "Infinity Loop of Us",
    quote: "My love for you has no beginning and no end.",
    description: "Formed by the glowing dust of a thousand shared laughs.",
    coordinates: [{ x: 60, y: 25 }, { x: 68, y: 20 }, { x: 75, y: 25 }, { x: 68, y: 30 }, { x: 60, y: 25 }]
  }
];

export const dateNightIdeas: DateNightIdea[] = [
  {
    id: "dn1",
    title: "Living Room Fort & Movie Marathon",
    category: "Cozy Night In",
    description: "Build a blanket fort with fairy lights, pop buttery popcorn, and watch nostalgic Studio Ghibli movies.",
    setupTime: "15 mins"
  },
  {
    id: "dn2",
    title: "Starlit Roof Picnic",
    category: "Outdoor Adventure",
    description: "Bring hot cocoa thermos, warm blankets, and a stargazing app to spot constellations together.",
    setupTime: "20 mins"
  },
  {
    id: "dn3",
    title: "Homemade Pasta & Wine Night",
    category: "Romantic Dinner",
    description: "Put on jazz music, roll fresh fettuccine dough together, and light candle stubs.",
    setupTime: "45 mins"
  },
  {
    id: "dn4",
    title: "Midnight Dessert Drive",
    category: "Spontaneous Fun",
    description: "Hop in the car in pajamas, drive to the 24/7 bakery, and get warm cookies.",
    setupTime: "5 mins"
  }
];
