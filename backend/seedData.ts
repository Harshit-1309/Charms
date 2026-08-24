import {
  CoupleConfig,
  PhotoItem,
  JourneyMilestone,
  SongItem,
  LoveLetter,
  PieceOfYouItem,
  AppreciationItem,
  ConstellationItem,
  DateNightIdea
} from './types.js';

export const initialCoupleConfig: CoupleConfig = {
  partner1Name: "Harshit",
  partner2Name: "Chaaru",
  startDate: "2024-01-22T17:04:00+05:30",
  customQuote: "In a universe of infinite possibilities, finding you was my favorite miracle.",
  isProposalAccepted: false,
  anniversaryTitle: "Days Spent In Love",
  secretMessage: "I looked at the stars and thought of you, but none burned as bright as your smile.",
  partner2PhotoUrl: "/charmi/2.jpg",
  rotatingQuotes: [
    "Some stories are written in books. Ours was written among the stars.",
    "Home stopped being a place. It became a person.",
    "You are my favorite notification.",
    "Ordinary days became extraordinary because of you.",
    "Every tomorrow looks brighter with you in it.",
    "Thank you for making life softer.",
    "In a universe of infinite possibilities, finding you was my favorite miracle."
  ]
};

export const initialPhotos: PhotoItem[] = [
  {
    id: "p1",
    title: "First time we met",
    url: "/charmi/10.jpg",
    caption: "The moment our eyes met across the café, the whole world faded into the background. I knew right then my life had changed forever.",
    date: "May 29, 2024",
    location: "Tulip Touch Cafe",
  },
  {
    id: "p4",
    title: "Our first interaction",
    url: "/charmi/first.jpeg",
    caption: "A simple message on Instagram that ignited the most beautiful chapter of my life. Who knew one little text held our whole universe?",
    date: "January 22, 2024",
    location: "Instagram",
  },
  {
    id: "p9",
    title: "The only time you said you love me",
    url: "/charmi/ilu.jpeg",
    caption: "The sweetest three words I have ever read. My heart skipped a beat, and that feeling will stay with me for a lifetime.",
    date: "September 01, 2024",
  },
  {
    id: "p5",
    title: "First virtual kiss I got",
    url: "/charmi/kiss.jpeg",
    caption: "Your sweet virtual kiss that gave me butterflies for the rest of the day. Proof that love transcends any distance.",
    date: "June 28, 2024",
  },
  {
    id: "p2",
    title: "Your first pic that you've sent",
    url: "/charmi/her.jpeg",
    caption: "The very first picture you sent me. I remember staring at it with the biggest smile, completely mesmerized by your beauty.",
    date: "May 12, 2024",
    location: "Snapchat",
  },
  {
    id: "p6",
    title: "My favourite day with you",
    url: "/charmi/5.jpg",
    caption: "The day which made me the happiest, I loved every single moment of it.",
    date: "July 07, 2026",
    location: "Stellar Kitchen",
  },
  {
    id: "p7",
    title: "The only time you posted with me",
    url: "/charmi/story.jpeg",
    caption: "The day you shared us with the world on your story. Seeing you proud to have me by your side made me the happiest person alive.",
    date: "July 08, 2026",
    location: "Stellar Kitchen",
  },
  {
    id: "p8",
    title: "First virtual hug I got",
    url: "/charmi/hug.jpeg",
    caption: "The warmest virtual embrace that wrapped around my soul and made a tough day feel so soft and safe.",
    date: "April 21, 2024",
  },
  {
    id: "p3",
    title: "Our first video chat",
    url: "/charmi/vc.jpeg",
    caption: "Seeing your lovely smile and hearing your genuine laugh live on screen for the first time was pure magic.",
    date: "Oct 18, 2024",
    location: "Whatsapp",
  },
  {
    id: "p10",
    title: "The only time you said you miss me",
    url: "/charmi/miss.jpeg",
    caption: "A tender reminder of how deeply we are connected, no matter where life takes us.",
    date: "May 07, 2025",
  },
  {
    id: "p11",
    title: "The first ever picture you shared",
    url: "/charmi/pic.jpeg",
    caption: "A candid glimpse into your daily world. Even the simplest little things become extraordinary when shared with you.",
    date: "Mar 01, 2024",
  },
  {
    id: "p13",
    title: "Our first train journey together",
    url: "/charmi/h.jpeg",
    caption: "Side by side on the train, tired eyes and quiet smiles. There was nowhere else in the universe I would rather be.",
    date: "Feb 06, 2024",
  },
  {
    id: "p12",
    title: "The first dress I've gifted you",
    url: "/charmi/dress.jpeg",
    caption: "You looked breathtaking in it. Seeing your radiant happiness wearing something I picked out for you was priceless.",
    date: "Aug 12, 2024",
  },
  {
    id: "p14",
    title: "Your first photo I've clicked",
    url: "/charmi/4.jpg",
    caption: "Capturing you through my camera for the first time—effortlessly gorgeous, natural, and radiating pure grace.",
    date: "Aug 12, 2024",
  },
  {
    id: "p15",
    title: "My favourite photo of us",
    url: "/charmi/8.jpg",
    caption: "Sharing warm cups of tea, close to each other with genuine smiles. My all-time favorite memory of us together.",
    date: "April 20, 2025",
    location: "Tea Post",
  }
];

export const initialJourney: JourneyMilestone[] = [
  {
    id: "j1",
    title: "Our Very First Interaction",
    date: "January 22, 2024",
    location: "Instagram",
    description: "A simple reply to your Instagram story during a train journey that sparked our beautiful beginning.",
    fullStory: "I was sitting by the window on the train from Mumbai to Bharuch, feeling completely frustrated and exhausted by the day. Then, I came across your Instagram story and decided to reply for the very first time. Little did I know, that one message would change everything.",
    photoUrl: "/charmi/first.jpeg"
  },
  {
    id: "j2",
    title: "The Day We Finally Met",
    date: "May 29, 2024",
    location: "Tulip Touch Cafe",
    description: "The long-awaited day when my heart skipped a beat the moment I laid eyes on you.",
    fullStory: "I traveled to Vadodara specifically to see you. The moment I finally saw you for the very first time in person, my heart completely skipped a beat. It was a day I will never forget.",
    photoUrl: "/charmi/a.jpg"
  },
  {
    id: "j3",
    title: "Our First Movie Date",
    date: "September 14, 2024",
    location: "Inorbit Mall",
    description: "Watching a movie together in the theater for the very first time.",
    fullStory: "It was the day right after my birthday, and only the second time we had ever met in person. We went to see the re-release of Tumbbad. It was the very first time I sat on the scooty with you, but what made the day truly unforgettable was holding your hand for the first time.",
    photoUrl: "/charmi/9.jpg"
  },
  {
    id: "j4",
    title: "Spending the Whole Day Together",
    date: "April 18, 2025",
    location: "Cafe De Rio",
    description: "The beautiful day we spent together as we started growing closer.",
    fullStory: "We finally spent an entire day together at Cafe De Rio, lost in endless conversations and laughter. As we started meeting more often, we naturally began growing closer. It was during these beautiful, uninterrupted hours together that I realized just how deep our connection was becoming.",
    photoUrl: "/charmi/0.jpg"
  },
  {
    id: "j5",
    title: "You Trusting Me With Your Homeless Looks",
    description: "You getting comfortable with me to such an extent that you started showing me your lazy and homeless looks.",
    fullStory: "There is a certain kind of magic in vulnerability. When you finally felt comfortable enough to send me pictures of your 'lazy and homeless' looks—messy hair, no makeup, just you in your most natural element—I didn't see someone who looked 'homeless'. I saw the most authentic, raw, and breathtakingly beautiful version of the girl I fell for. It was the moment I realized you truly trusted me, and it made me feel closer to you than ever.",
    photoUrl: "/charmi/ae.jpg"
  },
  {
    id: "j6",
    title: "Our Hours-Long Video Chats",
    description: "Those beautiful, endless video calls where we'd talk for hours, losing all sense of time just looking at each other.",
    fullStory: "What started as a simple video call quickly turned into hours of endless conversation, laughter, and just staring at each other through the screen. Even when we ran out of things to say, the comforting silence and your beautiful presence made every second worth it. It feels like no matter how much time we spend talking, it's never enough. Those long video chats quickly became the absolute best part of my day.",
    photoUrl: "/charmi/af.jpg"
  },
  {
    id: "j7",
    title: "Getting Fit-Checks of Your Outfits",
    description: "Getting those adorable mirror selfies and outfit pictures before you head out, just to see what you're wearing.",
    fullStory: "There's something incredibly special about receiving those random 'fit-check' pictures before you leave the house. Every time you send me a picture to show off your outfit, I can't help but smile. You always look absolutely stunning, no matter what you wear. It makes me feel so lucky and involved in your daily life, and seeing you excited about your adorable outfits is something I secretly look forward to every single day.",
    photoUrl: "/charmi/ag.jpg"
  },
  {
    id: "j8",
    title: "Celebrating Your Special Day Together",
    date: "Oct 03, 2025",
    location: "Martino'z Pizza",
    description: "Surprising you on your birthday and sharing a wonderful time together.",
    fullStory: "I couldn't wait to see you and celebrate your birthday in person. Seeing the joy on your face when we met up made the entire trip worthwhile. We shared some amazing pizza, laughed endlessly, and created beautiful new memories. Every moment spent with you on your special day felt magical, and it's a celebration I will always hold close to my heart.",
    photoUrl: "/charmi/7.jpg"
  },
  {
    id: "j9",
    title: "You visiting another city for me",
    date: "Feb 05, 2026",
    location: "Starbucks, Bandra",
    description: "The beautiful surprise when you traveled all the way to another city just to see me.",
    fullStory: "I still can't believe you took the time and effort to travel to another city just for me. It was also the day when we went shopping together for the very first time. Let me tell you a secret: buying things for you gives me all the happiness in the world. It was a day that proved to me just how much we mean to each other, and a memory I will treasure forever.",
    photoUrl: "/charmi/ai.jpg"
  },
  {
    id: "j10",
    title: "We travelling together for the first time",
    date: "Feb 06, 2026",
    location: "Mumbai",
    description: "Our very first journey together, side by side, exploring the city of dreams.",
    fullStory: "There is something incredibly romantic about traveling together, and doing it for the first time was purely magical. Sitting next to you, looking out the window, and sharing quiet smiles made the journey itself better than the destination. Exploring Mumbai with you by my side was an adventure I had always dreamed of. Every step we took together made me realize that my favorite place to be is anywhere, as long as I'm with you.",
    photoUrl: "/charmi/ah.jpg"
  },
  {
    id: "j11",
    title: "My Favourite Day With You",
    date: "July 06, 2026",
    location: "Stellar Kitchen",
    description: "The most beautiful day spent together, where I also introduced you to my sister.",
    fullStory: "Every day with you is special, but this one holds a unique place in my heart. We went to Stellar Kitchen, and it was also the day you met my sister. Seeing the two of you interact and bond meant the world to me. It felt like all the missing pieces of my life were finally coming together in one perfect, unforgettable day.",
    photoUrl: "/charmi/aj.jpg"
  },
  {
    id: "j12",
    title: "Meeting My Parents",
    date: "Aug 03, 2026",
    location: "Chai Sutta Bar",
    description: "The wonderful day you met my parents and visited my sister's place for the very first time.",
    fullStory: "I know you were a little nervous about meeting my parents, but you had absolutely nothing to worry about. They loved you instantly. We also visited my sister's place that day, and seeing you effortlessly bond with my family filled my heart with so much pride and joy. It was the moment I saw our future crystal clear, knowing you fit perfectly into my world.",
    photoUrl: "/charmi/ak.jpg"
  },
  {
    id: "j13",
    title: "Our Casual Meetups at Coffea",
    date: "Aug 06, 2026",
    location: "Coffea",
    description: "Those sweet, simple moments shared over coffee that mean everything to me.",
    fullStory: "Sometimes, the most extraordinary memories are made in the most ordinary moments. Our casual meetups at Coffea have become my favorite escape from the world. Just sitting across from you, sharing a warm drink, talking about our days, and getting lost in your eyes—these simple moments are the ones I cherish the most. They remind me that anywhere I am with you is my happy place.",
    photoUrl: "/charmi/al.jpg"
  }
];

export const initialSongs: SongItem[] = [
  {
    id: "s1",
    title: "Ab Mujhe Raat Din",
    artist: "Sonu Nigam",
    duration: "06:25",
    coverUrl: "/charmi/e.jpg",
    synthMelodyKey: "stardust",
    audioUrl: "/AbMujhe.mp3",
    feelingNote: "First songs comes to mind when i think about you.",
    lyrics: [
      { time: 0, text: "🎶" },
      { time: 43, text: "Ab mujhe raat din, tumhara hi khayal hai" },
      { time: 54, text: "Ab mujhe raat din, tumhara hi khayal hai" },
      { time: 64, text: "Kya kahun pyaar mein, deewanon jaisa haal hai" },
      { time: 70, text: "Deewanon jaisa haal hai" },
      { time: 75, text: "Tumhara hi khayal hai" },
      { time: 80, text: "Ho... ab mujhe raat din, tumhara hi khayal hai" },
      { time: 93, text: "🎶 (Music...)" },
      { time: 163, text: "Tum ko dekhe bina, chain milta nahi" },
      { time: 169, text: "Dil pe ab to koi, zor chalta nahi" },
      { time: 174, text: "Tum ko dekhe bina, chain milta nahi" },
      { time: 179, text: "Dil pe ab to koi, zor chalta nahi" },
      { time: 185, text: "Jaadu hai kaisa, dil ki lagi mein" },
      { time: 190, text: "Doob gaya hoon, is bekhudi mein" },
      { time: 195, text: "Ab mujhe raat din, tumhara hi khayal hai" },
      { time: 208, text: "🎶 (Music...)" },
      { time: 240, text: "Mera sukoon mera, chain kho gaya hai" },
      { time: 245, text: "Neendein ud gayi, yeh kya ho gaya hai" },
      { time: 251, text: "Mera sukoon mera, chain kho gaya hai" },
      { time: 256, text: "Neendein ud gayi, yeh kya ho gaya hai" },
      { time: 261, text: "Tere siva ab, koi nahi hai" },
      { time: 267, text: "Inn dhadkanon mein, tu bas gayi hai" },
      { time: 272, text: "Ab mujhe raat din, tumhara hi khayal hai" },
      { time: 282, text: "Kya kahun pyaar mein, deewanon jaisa haal hai" },
      { time: 289, text: "Deewanon jaisa haal hai" },
      { time: 293, text: "Tumhara hi khayal hai" },
      { time: 298, text: "Ho... ab mujhe raat din, tumhara hi khayal hai" },
      { time: 312, text: "🎶 (Fading out...)" }
    ]
  },
  {
    id: "s2",
    title: "K. Cigarettes After Sex",
    duration: "05:17",
    artist: "Cigarettes After Sex",
    coverUrl: "/charmi/k.jpeg",
    synthMelodyKey: "moonlight",
    audioUrl: "/K.mp3",
    feelingNote: "Our slow dance track in the kitchen at 2 AM.",
    lyrics: [
      { time: 0, text: "🎶 (Music...)" },
      { time: 42, text: "I remember when I first noticed that you liked me back" },
      { time: 50, text: "We were sitting down in a restaurant waiting for the check" },
      { time: 57, text: "We had made love earlier that day with no strings attached" },
      { time: 65, text: "But I could tell that something had changed how you looked at me then" },
      { time: 73, text: "Kristen, come right back" },
      { time: 81, text: "I've been waiting for you to slip back in bed" },
      { time: 89, text: "When you light the candle" },
      { time: 107, text: "🎶 (Music...)" },
      { time: 137, text: "And on the Lower East Side you're dancing with me now" },
      { time: 145, text: "And I'm taking pictures of you with a Pentax camera" },
      { time: 152, text: "Oh, I know I'm a fool for loving you, but I don't care" },
      { time: 160, text: "I know I'm a fool for loving you, but I don't care" },
      { time: 168, text: "Kristen, come right back" },
      { time: 176, text: "I've been waiting for you to slip back in bed" },
      { time: 184, text: "When you light the candle" },
      { time: 202, text: "🎶 (Music...)" },
      { time: 238, text: "And I'm kissing you lying in my room" },
      { time: 245, text: "Holding you until you fall asleep" },
      { time: 252, text: "And it's just as good as I knew it would be" },
      { time: 259, text: "Stay with me I don't want you to leave" },
      { time: 267, text: "Kristen, come right back" },
      { time: 274, text: "I've been waiting for you to slip back in bed" },
      { time: 282, text: "When you light the candle" },
      { time: 297, text: "🎶 (Fading out...)" }
    ]
  },
  {
    id: "s3",
    title: "All Of Me",
    artist: "John Legend",
    duration: "04:30",
    coverUrl: "/charmi/ab.jpeg",
    synthMelodyKey: "ghibli",
    audioUrl: "/All.mp3",
    feelingNote: "A special track just for us.",
    lyrics: [
      { time: 0, text: "🎶 (Piano intro...)" },
      { time: 13, text: "What would I do without your smart mouth" },
      { time: 17, text: "Drawing me in, and you kicking me out" },
      { time: 20, text: "You've got my head spinning, no kidding, I can't pin you down" },
      { time: 26, text: "What's going on in that beautiful mind" },
      { time: 29, text: "I'm on your magical mystery ride" },
      { time: 32, text: "And I'm so dizzy, don't know what hit me, but I'll be alright" },
      { time: 38, text: "My head's under water" },
      { time: 41, text: "But I'm breathing fine" },
      { time: 44, text: "You're crazy and I'm out of my mind" },
      { time: 49, text: "'Cause all of me" },
      { time: 53, text: "Loves all of you" },
      { time: 56, text: "Love your curves and all your edges" },
      { time: 59, text: "All your perfect imperfections" },
      { time: 62, text: "Give your all to me" },
      { time: 66, text: "I'll give my all to you" },
      { time: 69, text: "You're my end and my beginning" },
      { time: 72, text: "Even when I lose I'm winning" },
      { time: 75, text: "'Cause I give you all of me" },
      { time: 81, text: "And you give me all of you, oh" },
      { time: 88, text: "🎶 (Music...)" }
    ]
  },
  {
    id: "s4",
    title: "Just The Way You Are",
    artist: "Bruno Mars",
    duration: "03:45",
    coverUrl: "/charmi/y.jpeg",
    synthMelodyKey: "stardust",
    audioUrl: "/Just.mp3",
    feelingNote: "Another beautiful song added for you.",
    lyrics: [
      { time: 0, text: "🎶 (Instrumental...)" },
      { time: 15, text: "Oh, her eyes, her eyes" },
      { time: 18, text: "Make the stars look like they're not shinin'" },
      { time: 21, text: "Her hair, her hair" },
      { time: 24, text: "Falls perfectly without her trying" },
      { time: 27, text: "She's so beautiful" },
      { time: 30, text: "And I tell her everyday" },
      { time: 34, text: "Yeah, I know, I know" },
      { time: 37, text: "When I compliment her, she won't believe me" },
      { time: 40, text: "And it's so, it's so" },
      { time: 43, text: "Sad to think that she don't see what I see" },
      { time: 46, text: "But every time she asks me 'Do I look okay?'" },
      { time: 51, text: "I say" },
      { time: 54, text: "When I see your face" },
      { time: 59, text: "There's not a thing that I would change" },
      { time: 65, text: "'Cause you're amazing" },
      { time: 70, text: "Just the way you are" },
      { time: 74, text: "And when you smile" },
      { time: 79, text: "The whole world stops and stares for a while" },
      { time: 85, text: "'Cause girl you're amazing" },
      { time: 90, text: "Just the way you are" },
      { time: 94, text: "🎶 (Music...)" }
    ]
  },
  {
    id: "s5",
    title: "Perfect",
    artist: "Ed Sheeran",
    duration: "04:23",
    coverUrl: "/charmi/b.jpg",
    synthMelodyKey: "moonlight",
    audioUrl: "/Perfect.mp3",
    feelingNote: "Because everything about this is perfect.",
    lyrics: [
      { time: 0, text: "🎶 (Instrumental...)" },
      { time: 3, text: "I found a love for me" },
      { time: 11, text: "Darling just dive right in, and follow my lead" },
      { time: 19, text: "Well I found a girl beautiful and sweet" },
      { time: 27, text: "I never knew you were the someone waiting for me" },
      { time: 34, text: "'Cause we were just kids when we fell in love" },
      { time: 38, text: "Not knowing what it was" },
      { time: 42, text: "I will not give you up this time" },
      { time: 50, text: "But darling, just kiss me slow" },
      { time: 54, text: "Your heart is all I own" },
      { time: 58, text: "And in your eyes you're holding mine" },
      { time: 63, text: "Baby, I'm dancing in the dark" },
      { time: 70, text: "With you between my arms" },
      { time: 74, text: "Barefoot on the grass" },
      { time: 78, text: "Listening to our favorite song" },
      { time: 82, text: "When you said you looked a mess" },
      { time: 86, text: "I whispered underneath my breath" },
      { time: 89, text: "But you heard it, darling, you look perfect tonight" },
      { time: 99, text: "🎶 (Music...)" }
    ]
  }
];

export const initialLetters: LoveLetter[] = [
  {
    id: "l1",
    title: "When You Miss Me",
    date: "October 14, 2024",
    sender: "Harshit",
    isOpenWhen: "Open when you miss me",
    waxSealColor: "rose",
    isRead: false,
    content: `My Dearest Chaaru,

If you are reading this right now, it means there is distance between us, or perhaps you just need a gentle reminder of how deeply you are held in my heart.

Close your eyes for a second. Take a deep breath. Can you feel it? Across every mile, every city, and every star, my heart belongs entirely to you. You are the warmth in my mornings, the soft light in my evenings, and the sweetest thought before I fall asleep.

Whenever you feel lonely, look up at the night sky. The exact same moon shining over you is shining over me too.

I love you endlessly, always and forever.`
  },
  {
    id: "l2",
    title: "When You Need a Reminder of Your Brilliance",
    date: "November 15, 2024",
    sender: "Harshit",
    isOpenWhen: "Open when you are doubting yourself",
    waxSealColor: "emerald",
    isRead: false,
    content: `My Dearest Chaaru,

If you are reading this, your mind is probably racing and you might be feeling like things are too heavy to carry. I want you to stop, take a deep breath, and look at yourself through my eyes for a moment.

You are incredibly strong, capable, and brilliant. The things that challenge you right now are just stepping stones for the amazing person you are becoming. Don't let a hard day make you forget how much you have already achieved and how deeply I believe in you. 

I am so endlessly proud of you, today and every day. You've got this, and more importantly, you've got me. Right by your side, always.

Yours in every victory and every struggle,
Harshit`
  },
  {
    id: "l3",
    title: "For No Reason At All",
    date: "December 01, 2024",
    sender: "Harshit",
    isOpenWhen: "Open when you want a random smile",
    waxSealColor: "rose",
    isRead: false,
    content: `Hi Gorgeous,

There's no special occasion for this letter. You aren't sad, it's not a holiday, and you don't necessarily need a pep talk. 

I just wrote this because I wanted to randomly interrupt your day to tell you that you are the most beautiful, wonderful, and perfect girl in the entire universe. I love the way your nose crinkles when you laugh, I love your messy hair, and I love the way you make my heart race without even trying.

I just thought you should know. Now go back to whatever you were doing, but do it with a smile on your beautiful face!

Endlessly obsessed with you,
Harshit`
  }
];

export const initialPiecesOfYou: PieceOfYouItem[] = [
  {
    id: "poy1",
    title: "Accessories",
    photoUrl: "/Aesthetics/accesories.jpg",
    aspectRatio: "portrait"
  },
  {
    id: "poy2",
    title: "Bracelets",
    photoUrl: "/Aesthetics/bracelettes.jpg",
    aspectRatio: "landscape"
  },
  {
    id: "poy3",
    title: "Crochet Tops",
    photoUrl: "/Aesthetics/crochet.jpg",
    aspectRatio: "landscape"
  },
  {
    id: "poy4",
    title: "Chashmish",
    photoUrl: "/Aesthetics/glasses.avif",
    aspectRatio: "square"
  },
  {
    id: "poy5",
    title: "Hyperhidrosis",
    photoUrl: "/Aesthetics/hyperhidrosis.jpg",
    aspectRatio: "landscape"
  },
  {
    id: "poy6",
    title: "Kittens",
    photoUrl: "/Aesthetics/kitten.jpg",
    aspectRatio: "square"
  },
  {
    id: "poy7",
    title: "Makha Shaka",
    photoUrl: "/Aesthetics/makhashaka.jpg",
    aspectRatio: "square"
  },
  {
    id: "poy8",
    title: "Peach Monster",
    photoUrl: "/Aesthetics/monster.webp",
    aspectRatio: "landscape"
  },
  {
    id: "poy9",
    title: "Nail Extensions",
    photoUrl: "/Aesthetics/nails extension.jpg",
    aspectRatio: "portrait"
  },
  {
    id: "poy10",
    title: "Piercing",
    photoUrl: "/Aesthetics/piercing.jpg",
    aspectRatio: "portrait"
  },
  {
    id: "poy11",
    title: "Short Hair",
    photoUrl: "/Aesthetics/shorthairs.jpg",
    aspectRatio: "square"
  },
  {
    id: "poy12",
    title: "Siddharth Malhotra",
    photoUrl: "/Aesthetics/siddhartmalhotra.jpg",
    aspectRatio: "square"
  },
  {
    id: "poy13",
    title: "Strawberry",
    photoUrl: "/Aesthetics/stawberry.jpg",
    aspectRatio: "landscape"
  },
  {
    id: "poy14",
    title: "Tattoo",
    photoUrl: "/Aesthetics/tattoo.jpg",
    aspectRatio: "landscape"
  },
  {
    id: "poy15",
    title: "Tiramisu",
    photoUrl: "/Aesthetics/tiramisu.jpg",
    aspectRatio: "landscape"
  },
  {
    id: "poy16",
    title: "Chatpate Tops",
    photoUrl: "/Aesthetics/tops.jpg",
    aspectRatio: "portrait"
  },
  {
    id: "poy17",
    title: "Working Out",
    photoUrl: "/Aesthetics/workout.avif",
    aspectRatio: "portrait"
  },
  {
    id: "poy18",
    title: "Leopard Printed Fits",
    photoUrl: "/Aesthetics/leopard.jpg",
    aspectRatio: "portrait"
  },
  {
    id: "poy19",
    title: "Formula 1",
    photoUrl: "/Aesthetics/formula11.jpg",
    aspectRatio: "landscape"
  },
  {
    id: "poy20",
    title: "Instagram Reach",
    photoUrl: "/Aesthetics/insta.jpg",
    aspectRatio: "portrait"
  }
];

export const appreciationList: AppreciationItem[] = [
  {
    id: "a1",
    title: "The Way You Smile",
    text: "The adorable way your eyes crinkle into happy little crescent moons whenever something makes you laugh. It instantly lights up my whole world and makes everything feel right.",
    emoji: "🌸",
    photoUrl: "/charmi/l.jpeg"
  },
  {
    id: "a2",
    title: "The Innocence in Your Eyes",
    text: "There is a pure, gentle honesty in your gaze that calms every storm inside me. Looking into your eyes feels like coming home to the safest, sweetest place in the world.",
    emoji: "🕊️",
    photoUrl: "/charmi/ad.jpeg"
  },
  {
    id: "a3",
    title: "Your Captivating Hazel Eyes",
    text: "The enchanting way sunlight dances across your hazel eyes, shimmering with warmth, mischief, and depth. I could get lost in them for a lifetime and never want to look away.",
    emoji: "✨",
    photoUrl: "/charmi/e.jpg"
  },
  {
    id: "a4",
    title: "The Way You Are Around Me",
    text: "How completely unfiltered, goofy, and comfortable you become when it's just the two of us. Getting to see the sweetest, most authentic sides of you is my favorite gift.",
    emoji: "🥰",
    photoUrl: "/charmi/g.jpg"
  },
  {
    id: "a5",
    title: "Choosing You in Every Lifetime",
    text: "Because loving you is as natural as breathing. If the cosmos restarted a billion times over across infinite galaxies, my soul would still search until it found you again.",
    emoji: "💫",
    photoUrl: "/charmi/k.jpeg"
  },
  {
    id: "a6",
    title: "The Grace & Elegance You Carry",
    text: "The effortless poise, charm, and timeless grace in everything you do. You carry yourself with such radiant elegance that you naturally light up every room you enter.",
    emoji: "🌹",
    photoUrl: "/charmi/m.jpeg"
  },
  {
    id: "a7",
    title: "Your Kind & Tender Soul",
    text: "The boundless compassion, softness, and empathy you hold in your heart for everyone around you. Your kindness is pure magic and makes the world a gentler place.",
    emoji: "🤍",
    photoUrl: "/charmi/aa.jpeg"
  },
  {
    id: "a8",
    title: "The Way You Slay in Traditional",
    text: "Whenever you dress up in traditional outfits, you look nothing short of royalty. Breathtaking, regal, and effortlessly stunning—you leave me completely speechless every single time.",
    emoji: "🥻",
    photoUrl: "/charmi/t.jpeg"
  },
  {
    id: "a9",
    title: "Your Short Hair & Baddie Energy",
    text: "The unbeatable confidence, chic style, and iconic charm when you rock your short hair. It matches your fierce spirit, sweet smile, and gorgeous vibe so perfectly.",
    emoji: "💅",
    photoUrl: "/charmi/o.jpeg"
  },
  {
    id: "a10",
    title: "Your Sweet Little Kisses",
    text: "Those spontaneous, gentle little pecks and warm kisses that make my heart race and melt all at once. Nothing in this world feels more comforting or tender.",
    emoji: "💋",
    photoUrl: "/charmi/x.jpeg"
  },
  {
    id: "a11",
    title: "How Beautifully You Maintain Yourself",
    text: "The dedication, care, and effortless grace you pour into your style, health, and skincare. Watching you glow from the inside out and carry yourself with such love is truly mesmerizing.",
    emoji: "👑",
    photoUrl: "/charmi/z.jpeg"
  },
  {
    id: "a12",
    title: "That Unmatched Hotness, Babe",
    text: "Let's be completely real—you are downright breathtaking in every single way. Your aura, your confidence, and that effortless hotness have me falling head over heels every single day.",
    emoji: "🔥",
    photoUrl: "/charmi/r.jpeg"
  }
];

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
