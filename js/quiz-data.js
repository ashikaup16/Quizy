/**
 * Quiz Data Repository
 * Rich, curated question banks with categories, difficulty ratings, 
 * high-res imagery, detailed trivia explanations, and hints.
 */

const QUIZ_CATEGORIES = [
  {
    id: 'tech',
    name: 'Technology & AI',
    icon: '⚡',
    badge: 'Popular',
    color: '#3b82f6',
    gradient: 'linear-gradient(135deg, #1d4ed8 0%, #06b6d4 100%)',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    description: 'Test your knowledge on artificial intelligence, computing history, silicon innovations, and the web.',
    questionsCount: 6,
    avgTime: '3 mins'
  },
  {
    id: 'space',
    name: 'Space & Cosmos',
    icon: '🚀',
    badge: 'Trending',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #6d28d9 0%, #ec4899 100%)',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    description: 'Explore stellar constellations, deep space telescopes, enigmatic black holes, and planetary wonders.',
    questionsCount: 6,
    avgTime: '3 mins'
  },
  {
    id: 'geography',
    name: 'World Wonders & Geography',
    icon: '🌍',
    badge: 'Adventure',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
    description: 'Travel across exotic continents, discover hidden capitals, massive summits, and monumental architectural marvels.',
    questionsCount: 6,
    avgTime: '3 mins'
  },
  {
    id: 'cinema',
    name: 'Cinema & Pop Culture',
    icon: '🎬',
    badge: 'Fun',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #d97706 0%, #ef4444 100%)',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
    description: 'From Oscar-winning masterpieces to iconic sci-fi sagas and superhero cinema lore.',
    questionsCount: 6,
    avgTime: '3 mins'
  },
  {
    id: 'gaming',
    name: 'Gaming & Cyber Worlds',
    icon: '🎮',
    badge: 'Epic',
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #be185d 0%, #8b5cf6 100%)',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80',
    description: 'Battle through video game history, legendary RPGs, speedrunning trivia, and iconic characters.',
    questionsCount: 6,
    avgTime: '3 mins'
  },
  {
    id: 'science',
    name: 'Science & Nature',
    icon: '🧬',
    badge: 'Genius',
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #0e7490 0%, #0284c7 100%)',
    image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80',
    description: 'Uncover quantum mysteries, biological marvels, chemistry curiosities, and evolutionary leaps.',
    questionsCount: 6,
    avgTime: '3 mins'
  }
];

const FEATURED_SLIDES = [
  {
    id: 'daily-challenge',
    title: 'Daily Cosmic Odyssey',
    subtitle: 'Space & Astronomy Special',
    tag: 'Daily Spotlight',
    tagColor: '#8b5cf6',
    categoryId: 'space',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80',
    stats: { players: '12.4k', xp: '+500 XP', difficulty: 'Medium' },
    summary: 'Embark on a celestial voyage across the outer solar system, nebulae, and gravitational anomalies.'
  },
  {
    id: 'ai-mastery',
    title: 'Neural Titans: The AI Frontier',
    subtitle: 'From Turing to Transformers',
    tag: 'Trending Now',
    tagColor: '#3b82f6',
    categoryId: 'tech',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    stats: { players: '28.9k', xp: '+750 XP', difficulty: 'Hard' },
    summary: 'Decode the breakthrough algorithms, LLMs, and visionary pioneers shaping artificial intelligence.'
  },
  {
    id: 'wonders-expedition',
    title: 'Seven Wonders & Ancient Secrets',
    subtitle: 'Lost Citadels & Monumental Feats',
    tag: 'Staff Pick',
    tagColor: '#10b981',
    categoryId: 'geography',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    stats: { players: '19.1k', xp: '+450 XP', difficulty: 'Easy-Med' },
    summary: 'Journey across the globe to decipher historical relics, towering summits, and sacred architecture.'
  },
  {
    id: 'blockbuster-lore',
    title: 'Cinematic Universes & Cult Classics',
    subtitle: 'Iconic Frames & Director Visions',
    tag: 'Pop Weekend',
    tagColor: '#f59e0b',
    categoryId: 'cinema',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80',
    stats: { players: '34.2k', xp: '+600 XP', difficulty: 'Medium' },
    summary: 'Think you know your Nolan twists, retro synthwave scores, and Oscar history? Prove it!'
  }
];

const QUIZ_QUESTIONS = {
  tech: [
    {
      id: 'tech-1',
      question: 'Which visionary computer scientist is widely considered the father of modern artificial intelligence and proposed the famous Imitation Game in 1950?',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      options: ['Alan Turing', 'John von Neumann', 'Claude Shannon', 'Ada Lovelace'],
      answer: 0,
      hint: 'He famously decrypted the German Enigma machine at Bletchley Park during WWII.',
      explanation: 'Alan Turing introduced the concept of machine intelligence and the Turing Test (originally the "Imitation Game") in his landmark 1950 paper "Computing Machinery and Intelligence".'
    },
    {
      id: 'tech-2',
      question: 'In modern machine learning, what does the "T" stand for in the widely used GPT neural network architecture?',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
      options: ['Tensor', 'Transformer', 'Transducer', 'Translation'],
      answer: 1,
      hint: 'It originates from Google Research’s seminal 2017 paper "Attention Is All You Need".',
      explanation: 'GPT stands for "Generative Pre-trained Transformer", relying on self-attention mechanisms to process sequential data simultaneously rather than sequentially.'
    },
    {
      id: 'tech-3',
      question: 'What is the fundamental unit of quantum information that can exist in a superposition of states (both 0 and 1 at the same time)?',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
      options: ['Quark', 'Qubit', 'Quantum Gate', 'Photon Bit'],
      answer: 1,
      hint: 'It is a portmanteau of "quantum" and "bit".',
      explanation: 'A qubit (quantum bit) is the basic unit in quantum computing, capable of being in a state of |0⟩, |1⟩, or any quantum superposition of both.'
    },
    {
      id: 'tech-4',
      question: 'Which programming language was created in just 10 days in May 1995 by Brendan Eich at Netscape?',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      options: ['Python', 'PHP', 'Ruby', 'JavaScript'],
      answer: 3,
      hint: 'It originally bore the codename "Mocha" before becoming the backbone of the World Wide Web.',
      explanation: 'Brendan Eich authored Mocha (later renamed LiveScript and finally JavaScript) in 10 days for Netscape Navigator 2.0.'
    },
    {
      id: 'tech-5',
      question: 'What was the first computer virus designed to infect MS-DOS personal computers in the wild (1986)?',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
      options: ['Creeper', 'Brain', 'ILOVEYOU', 'Morris Worm'],
      answer: 1,
      hint: 'It was created by two brothers in Lahore, Pakistan to protect their medical software from piracy.',
      explanation: 'The Brain virus was written in 1986 by Basit and Amjad Farooq Alvi. It replaced the boot sector of floppy disks with a benign message containing their address and phone number.'
    },
    {
      id: 'tech-6',
      question: 'Which network protocol ensures reliable, ordered, and error-checked delivery of a stream of octets between applications over an IP network?',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
      options: ['UDP', 'TCP', 'ICMP', 'DNS'],
      answer: 1,
      hint: 'It pairs with Internet Protocol (IP) and utilizes a 3-way handshake (SYN, SYN-ACK, ACK).',
      explanation: 'TCP (Transmission Control Protocol) is the foundational connection-oriented protocol that guarantees packet delivery order and retransmits lost packets.'
    }
  ],
  space: [
    {
      id: 'space-1',
      question: 'What is the point of no return around a black hole, past which neither matter nor light can escape its gravitational pull?',
      image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80',
      options: ['Accretion Disk', 'Event Horizon', 'Photon Sphere', 'Ergosphere'],
      answer: 1,
      hint: 'Karl Schwarzschild first calculated the radius of this boundary in 1916.',
      explanation: 'The event horizon is the boundary where the escape velocity of the black hole exceeds the speed of light ($c$). Nothing inside can ever communicate back to the outside universe.'
    },
    {
      id: 'space-2',
      question: 'Which moon in our solar system has a dense nitrogen atmosphere and liquid hydrocarbon lakes of methane and ethane on its surface?',
      image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=800&q=80',
      options: ['Europa', 'Ganymede', 'Titan', 'Enceladus'],
      answer: 2,
      hint: 'It is the largest moon orbiting the ringed gas giant Saturn.',
      explanation: 'Titan is Saturn’s largest moon and the only known planetary satellite with a thick atmosphere and active liquid cycle (methanological cycle).'
    },
    {
      id: 'space-3',
      question: 'Approximately how long does it take for light emitted from the Sun to travel the ~150 million kilometers to Earth?',
      image: 'https://images.unsplash.com/photo-1538370965046-79c0d6907d47?auto=format&fit=crop&w=800&q=80',
      options: ['8 seconds', '8 minutes and 20 seconds', '1 hour and 12 minutes', 'Instantaneous'],
      answer: 1,
      hint: 'Divide 149.6 million km by 300,000 km/second, yielding roughly 500 seconds.',
      explanation: 'Light moves at approximately 299,792 km/s. Over 1 Astronomical Unit (149.6M km), it takes roughly 499 to 500 seconds, or ~8 minutes and 20 seconds.'
    },
    {
      id: 'space-4',
      question: 'What is the name of the supermassive black hole located at the heart of our Milky Way galaxy, imaged by the Event Horizon Telescope in 2022?',
      image: 'https://images.unsplash.com/photo-1447433589675-4aaa569f3e05?auto=format&fit=crop&w=800&q=80',
      options: ['Cygnus X-1', 'Sagittarius A*', 'Messier 87', 'Andromeda Core'],
      answer: 1,
      hint: 'It is located in the direction of the constellation Sagittarius, with a star/asterisk in its astronomical designation.',
      explanation: 'Sagittarius A* (pronounced "Sagittarius A-star") contains approximately 4.1 million solar masses and anchors our Milky Way galaxy.'
    },
    {
      id: 'space-5',
      question: 'What is Olympus Mons, the largest known planetary feature of its kind in the Solar System, and where is it located?',
      image: 'https://images.unsplash.com/photo-1614728423169-3f65fd722b7e?auto=format&fit=crop&w=800&q=80',
      options: ['A shield volcano on Mars', 'An impact crater on Mercury', 'An ice geyser on Triton', 'A subterranean rift on Venus'],
      answer: 0,
      hint: 'It stands nearly three times the height of Mount Everest on the Red Planet.',
      explanation: 'Olympus Mons is a gigantic shield volcano on Mars standing ~22 km (72,000 ft) high and spanning over 600 km wide.'
    },
    {
      id: 'space-6',
      question: 'Launched in late 2021, at which gravitationally stable Lagrange point does the James Webb Space Telescope (JWST) orbit?',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
      options: ['Lagrange Point 1 (L1)', 'Lagrange Point 2 (L2)', 'Lagrange Point 4 (L4)', 'Lagrange Point 5 (L5)'],
      answer: 1,
      hint: 'It sits approximately 1.5 million kilometers directly away from the Sun, on Earth\'s night side.',
      explanation: 'JWST orbits Sun-Earth L2, providing a stable cold environment shielding its infrared sensors from Sun, Earth, and Moon heat.'
    }
  ],
  geography: [
    {
      id: 'geo-1',
      question: 'Which is the only city in the world that straddles two distinct continents across the Bosphorus Strait?',
      image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80',
      options: ['Cairo', 'Istanbul', 'Panama City', 'Tbilisi'],
      answer: 1,
      hint: 'Formerly known as Byzantium and Constantinople, it spans Europe and Asia.',
      explanation: 'Istanbul, Turkey bridges Europe and Asia across the historic Bosphorus Strait, making it a unique transcontinental metropolis.'
    },
    {
      id: 'geo-2',
      question: 'Which breathtaking desert in South America is regarded as the driest non-polar desert on Earth, with weather stations that have never recorded rain?',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
      options: ['Gobi Desert', 'Kalahari Desert', 'Atacama Desert', 'Mojave Desert'],
      answer: 2,
      hint: 'Located in northern Chile, it frequently serves as a testing ground for Mars rovers.',
      explanation: 'The Atacama Desert in Chile is situated between the Andes and the Chilean Coast Range, creating a double rain shadow that makes it hyper-arid.'
    },
    {
      id: 'geo-3',
      question: 'What is the capital city of Australia, purpose-built in 1913 as a compromise between rival cities Sydney and Melbourne?',
      image: 'https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?auto=format&fit=crop&w=800&q=80',
      options: ['Brisbane', 'Canberra', 'Adelaide', 'Perth'],
      answer: 1,
      hint: 'Architect Walter Burley Griffin designed its geometric layout and central lake.',
      explanation: 'Canberra was chosen as a neutral compromise capital location between Sydney and Melbourne, located in the Australian Capital Territory.'
    },
    {
      id: 'geo-4',
      question: 'Which is the deepest terrestrial lake on Earth, holding approximately 20% of the world’s unfrozen surface fresh water?',
      image: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=800&q=80',
      options: ['Lake Superior', 'Lake Victoria', 'Lake Baikal', 'Lake Tanganyika'],
      answer: 2,
      hint: 'It is situated in mountainous Siberia, Russia, and plunges to 1,642 meters.',
      explanation: 'Lake Baikal in southern Russia is the world’s oldest (25M years) and deepest freshwater lake, containing more water than all the North American Great Lakes combined.'
    },
    {
      id: 'geo-5',
      question: 'Which African country is entirely enveloped inside another single sovereign nation (an enclaved state within South Africa)?',
      image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80',
      options: ['Swaziland / Eswatini', 'Lesotho', 'Botswana', 'Namibia'],
      answer: 1,
      hint: 'Known as the "Kingdom in the Sky", it is the only independent state entirely above 1,000m altitude.',
      explanation: 'The Kingdom of Lesotho is completely landlocked and encircled by South Africa. Eswatini, by contrast, also borders Mozambique.'
    },
    {
      id: 'geo-6',
      question: 'What is the highest uninterrupted waterfall on Earth, plunging over 979 meters (3,212 feet) from the Auyán-tepui plateau?',
      image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=80',
      options: ['Niagara Falls', 'Victoria Falls', 'Angel Falls (Salto Ángel)', 'Iguazu Falls'],
      answer: 2,
      hint: 'It is nestled in Canaima National Park in Venezuela.',
      explanation: 'Angel Falls (Kerepakupai Merú) in Venezuela is the world’s highest waterfall with a continuous drop of 807 meters and total height of 979 meters.'
    }
  ],
  cinema: [
    {
      id: 'cine-1',
      question: 'Which film made history at the 92nd Academy Awards in 2020 by becoming the first non-English language film to win Best Picture?',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
      options: ['Roma', 'Parasite', 'Life is Beautiful', 'Crouching Tiger, Hidden Dragon'],
      answer: 1,
      hint: 'Directed by South Korean auteur Bong Joon-ho.',
      explanation: 'Bong Joon-ho’s "Parasite" took home four Oscars including Best Picture, Best Director, Best Original Screenplay, and Best International Feature Film.'
    },
    {
      id: 'cine-2',
      question: 'In Christopher Nolan’s 2010 masterpiece "Inception", what is Dom Cobb’s personal totem used to discern reality from dreams?',
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
      options: ['A loaded die', 'A spinning brass top', 'A pewter chess piece', 'A poker chip'],
      answer: 1,
      hint: 'If it keeps spinning indefinitely without toppling, he is still trapped inside a dream.',
      explanation: 'Cobb inherited Mal’s spinning top; in a dream state it will spin forever, whereas in reality friction inevitably halts it.'
    },
    {
      id: 'cine-3',
      question: 'Which legendary composer composed the iconic musical themes for Star Wars, Indiana Jones, Jurassic Park, and Jaws?',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      options: ['Hans Zimmer', 'Ennio Morricone', 'John Williams', 'Howard Shore'],
      answer: 2,
      hint: 'He has received 54 Academy Award nominations, the most of any living person.',
      explanation: 'Maestro John Williams has scored some of cinema’s most unforgettable leitmotifs over an illustrious career spanning six decades.'
    },
    {
      id: 'cine-4',
      question: 'What was the first feature-length computer-animated film ever released in cinemas (1995)?',
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
      options: ['A Bug\'s Life', 'Toy Story', 'Shrek', 'Antz'],
      answer: 1,
      hint: 'Produced by Pixar and directed by John Lasseter, featuring Woody and Buzz Lightyear.',
      explanation: 'Pixar’s "Toy Story" revolutionized the film industry when it debuted in November 1995 as the first 100% CGI full-length animated motion picture.'
    },
    {
      id: 'cine-5',
      question: 'In Quentin Tarantino’s "Pulp Fiction" (1994), what glowing object inside the mysterious briefcase are Vincent and Jules sent to retrieve?',
      image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80',
      options: ['Stolen diamonds', 'A golden suit', 'It is never revealed (MacGuffin)', 'A plutonium rod'],
      answer: 2,
      hint: 'Director Tarantino stated it is whatever the viewer wants it to be.',
      explanation: 'The glowing interior of Marsellus Wallace’s briefcase is a classic cinematic MacGuffin; its actual contents are intentionally never explained or shown.'
    },
    {
      id: 'cine-6',
      question: 'Which 1999 sci-fi classic directed by the Wachowskis popularized the revolutionary visual effect termed "Bullet Time"?',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      options: ['The Matrix', 'Fight Club', 'The Sixth Sense', 'The Thirteenth Floor'],
      answer: 0,
      hint: 'Keanu Reeves stars as Thomas Anderson / Neo, bending backward to dodge bullets on a skyscraper roof.',
      explanation: '"The Matrix" used circular camera arrays with computer interpolation to pioneer 360-degree slow-motion "Bullet Time" cinematography.'
    }
  ],
  gaming: [
    {
      id: 'game-1',
      question: 'Which best-selling video game of all time was initially developed in 2009 by Markus "Notch" Persson?',
      image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80',
      options: ['Tetris', 'Grand Theft Auto V', 'Minecraft', 'Wii Sports'],
      answer: 2,
      hint: 'A voxel sandbox game where players craft pickaxes and ward off Creepers.',
      explanation: 'Minecraft has surpassed 300 million copies sold across platforms, making it the best-selling standalone video game in history.'
    },
    {
      id: 'game-2',
      question: 'In the Zelda universe, what three virtues do the golden pieces of the sacred Triforce embody?',
      image: 'https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?auto=format&fit=crop&w=800&q=80',
      options: ['Power, Wisdom, Courage', 'Strength, Honor, Hope', 'Faith, Light, Truth', 'Chaos, Order, Balance'],
      answer: 0,
      hint: 'Associated with Ganondorf (top), Princess Zelda (lower right), and Link (lower left).',
      explanation: 'The golden Triforce left behind by the Golden Goddesses consists of the Triforce of Power (Din), Wisdom (Nayru), and Courage (Farore).'
    },
    {
      id: 'game-3',
      question: 'What iconic cheat code sequence became famous across Konami NES titles like Contra and Gradius?',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      options: ['Up, Up, Down, Down, Left, Right, Left, Right, B, A', 'Down, Down, Up, Up, Left, Left, Right, Right, A, B', 'B, A, Select, Start, Up, Down, Left, Right', 'A, B, A, B, Up, Up, Down, Down'],
      answer: 0,
      hint: 'Created by Kazuhisa Hashimoto in 1986 during testing of Gradius.',
      explanation: 'The Konami Code (↑ ↑ ↓ ↓ ← → ← → B A) granted 30 extra lives in Contra and became the most recognizable easter egg in gaming culture.'
    },
    {
      id: 'game-4',
      question: 'In the "Half-Life" franchise, what physics manipulation tool designed by Black Mesa is wielded by Dr. Gordon Freeman?',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
      options: ['Portal Gun', 'Gravity Gun (Zero Point Energy Field Manipulator)', 'BFG 9000', 'Displacement Cannon'],
      answer: 1,
      hint: 'It can snatch saw blades, radiators, and explosive barrels to launch them at Combine soldiers.',
      explanation: 'Officially named the Zero Point Energy Field Manipulator, Alyx Vance introduces it as the Gravity Gun in Valve\'s Half-Life 2 (2004).'
    },
    {
      id: 'game-5',
      question: 'Which esports title originated as a custom community map modification for Blizzard’s Warcraft III: Reign of Chaos?',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
      options: ['StarCraft II', 'Defense of the Ancients (DotA)', 'Counter-Strike', 'Overwatch'],
      answer: 1,
      hint: 'Created by mapmaker Eul and later developed into a multi-million-dollar sequel by Valve.',
      explanation: 'DotA (Defense of the Ancients) was born as a custom map for Warcraft III in 2003, laying the blueprint for the entire MOBA genre.'
    },
    {
      id: 'game-6',
      question: 'In Elden Ring and Dark Souls, who is the visionary game director and president of FromSoftware renowned for brutal difficulty?',
      image: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?auto=format&fit=crop&w=800&q=80',
      options: ['Hideo Kojima', 'Hidetaka Miyazaki', 'Shinji Mikami', 'Yuji Naka'],
      answer: 1,
      hint: 'He collaborated with George R.R. Martin to craft the lore of the Lands Between.',
      explanation: 'Hidetaka Miyazaki pioneered the Soulsborne genre beginning with Demon\'s Souls, known for atmospheric environmental storytelling and uncompromising challenges.'
    }
  ],
  science: [
    {
      id: 'sci-1',
      question: 'What is the chemical element with the highest atomic number naturally found in significant quantities on Earth?',
      image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80',
      options: ['Lead (82)', 'Radium (88)', 'Uranium (92)', 'Plutonium (94)'],
      answer: 2,
      hint: 'Named after the seventh planet from the Sun, it has atomic symbol U.',
      explanation: 'Uranium (atomic number 92) is the heaviest primordial element still present in substantial natural quantities from the formation of the Solar System.'
    },
    {
      id: 'sci-2',
      question: 'Which microscopic water-dwelling extremophile organisms can survive in outer space vacuum, absolute zero, boiling temperatures, and extreme radiation?',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
      options: ['Tardigrades (Water Bears)', 'Rotifers', 'Nematodes', 'Amoebae'],
      answer: 0,
      hint: 'They enter a cryptobiotic dehydrated state called a "tun", reducing metabolism to near zero.',
      explanation: 'Tardigrades can survive temperatures down to -272°C, pressures 6 times greater than the deepest ocean trenches, and cosmic ionizing radiation.'
    },
    {
      id: 'sci-3',
      question: 'What structure inside eukaryotic cells is famously known as the "powerhouse of the cell" due to ATP generation through cellular respiration?',
      image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=800&q=80',
      options: ['Ribosome', 'Mitochondria', 'Golgi Apparatus', 'Endoplasmic Reticulum'],
      answer: 1,
      hint: 'It possesses its own distinct circular DNA, inherited maternally.',
      explanation: 'Mitochondria synthesize adenosine triphosphate (ATP) through oxidative phosphorylation, driving chemical processes throughout the cell.'
    },
    {
      id: 'sci-4',
      question: 'What is the speed of light in a vacuum ($c$), rounded to three significant figures?',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
      options: ['300,000 km/s', '150,000 km/s', '3,000,000 km/s', '30,000 km/s'],
      answer: 0,
      hint: 'The exact physical constant is 299,792,458 meters per second.',
      explanation: 'In physics, $c$ is exactly 299,792,458 m/s, or approximately 3.00 × 10^8 m/s (300,000 kilometers per second).'
    },
    {
      id: 'sci-5',
      question: 'Who proposed the groundbreaking theory of continental drift in 1912, preceding modern plate tectonics?',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
      options: ['Charles Darwin', 'Alfred Wegener', 'James Hutton', 'Alexander von Humboldt'],
      answer: 1,
      hint: 'The German meteorologist and geophysicist who hypothesized the supercontinent Pangaea.',
      explanation: 'Alfred Wegener observed matching coastlines and fossil records across the Atlantic, postulating that all continents once formed the supercontinent Pangaea.'
    },
    {
      id: 'sci-6',
      question: 'What fundamental particle, confirmed at CERN\'s Large Hadron Collider in 2012, gives other elementary particles their mass via its field?',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
      options: ['Graviton', 'Higgs Boson', 'Tau Neutrino', 'Gluon'],
      answer: 1,
      hint: 'Sometimes sensationally dubbed the "God Particle" in popular media.',
      explanation: 'The Higgs boson is the excitation of the Higgs field, which confers mass to quarks and leptons through electroweak symmetry breaking.'
    }
  ]
};

// Initial default leaderboard entries
const INITIAL_LEADERBOARD = [
  { rank: 1, name: 'NovaVortex', avatar: '🪐', score: 5850, accuracy: '100%', category: 'Space & Cosmos', date: 'Just now' },
  { rank: 2, name: 'CyberSamurai', avatar: '⚡', score: 5420, accuracy: '95%', category: 'Tech & AI', date: '2h ago' },
  { rank: 3, name: 'Astraea_X', avatar: '🧬', score: 4980, accuracy: '90%', category: 'Science & Nature', date: '5h ago' },
  { rank: 4, name: 'AtlasWanderer', avatar: '🌍', score: 4610, accuracy: '88%', category: 'Geography', date: '1d ago' },
  { rank: 5, name: 'PixelKnight', avatar: '🎮', score: 4200, accuracy: '83%', category: 'Gaming', date: '1d ago' },
  { rank: 6, name: 'Cinephile99', avatar: '🎬', score: 3890, accuracy: '80%', category: 'Cinema', date: '2d ago' }
];

window.QUIZ_CATEGORIES = QUIZ_CATEGORIES;
window.FEATURED_SLIDES = FEATURED_SLIDES;
window.QUIZ_QUESTIONS = QUIZ_QUESTIONS;
window.INITIAL_LEADERBOARD = INITIAL_LEADERBOARD;
