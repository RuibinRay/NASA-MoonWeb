// MOONKEEPER: Beyond Earth — what the site says. Every statement here was checked against the game's own repository
// (README.md, docs/SCIENCE_AND_SOURCES.md, docs/MARS_SCIENCE.md, js/config.js, js/minigames.js, si-use.json)
// or against the creator's own portfolio. Kinds: 'real' = verified NASA data, 'play' = a gameplay simplification,
// 'story' = fiction.
const GAME = 'https://ruibinray.github.io/NASA-MoonKeeper/';

export const WORLDS = {
  earth: { name: 'Earth', to: '#earth', say: 'Earth. Where the game was made, and where every mission begins. Meet the person behind MOONKEEPER.' },
  moon: { name: 'Moon', to: '#moon', say: "The Moon: Earth's natural satellite, 384,400 km away. A meteor shower has hit Tranquility Deep, and the two-week night is coming." },
  mars: { name: 'Mars', to: '#mars', say: 'Mars. A cold plain with ice under the soil, air too thin to breathe, and dust that dims the Sun. The game\'s second world.' },
};

export const TIMELINE = [
  ['The idea', 'A game for ages 7 to 18 in which the lesson is the problem itself: keep a Moon base alive after a meteor shower. It is an entry for the NASA Space Apps Challenge 2026 by team Nasa Neo.'],
  ['Scientific research', 'More than 50 NASA sources are listed in the game\'s science notes, each beside the game rule it feeds. The solar storms come from NASA\'s DONKI archive, the moonquakes and impacts from the Apollo seismic catalog, and the Mars maps from the MOLA laser altimeter.'],
  ['Game design', 'One rule sits behind every decision: no choice is free. Four missions for different ages, a guide mode that draws a yellow line to the next place, a one-question quiz after each emergency, and a 40-minute lesson plan for teachers.'],
  ['AI-assisted development', 'The code was written with Claude through Claude Code and the pictures were made with Higgsfield. A person chose what to build, asked for every change and decided what went in. The repository shows more than 180 commits in its first two days, 14 and 15 November 2026.'],
  ['Testing', 'Seventeen automatic test scripts ship with the game. One plays every mission to prove it can be won; others check the farming sums, the Mars model and all 16 languages. Play-throughs in a browser were written up as bug notes and fixed in batches.'],
  ['Release', 'The game is live on GitHub Pages as a static site: no build step, no server, no download and no login. It saves in the browser and speaks 16 languages.'],
  ['Future exploration', 'Mars is already in the game as an outpost to explore, a first survival mission and a Science Center. Flights between the Moon and Mars are the next step on the roadmap; the flight sums are written and tested, the mode is not built yet.'],
];

// Tranquility Deep, as in js/config.js: five rooms on one side of the lava tube, six on the other.
export const ROOMS = {
  north: [['Workshop', 'The Fix-It Bench repairs broken solar panels, and the robot-arm builder makes new panels and battery modules from materials.'], ['Control Center', 'The big map of the station, the door controls, and the jobs you give to robots and rescued astronauts.'], ['Kitchen', 'Cooking. Tins run out, so potatoes, tomatoes and eggs have to become meals.'], ['Oxygen Room', 'The Oxygen Maker splits water with electricity. Turn it up and the farm lights or the heaters get less power.'], ['Potato Farm', 'Hydroponic racks under pink LED lamps. Each rack can grow one of ten crops, and each crop wants different light, water and warmth.']],
  south: [['Battery Store', 'The battery bank that carries the base through the two-week night.'], ['Bunk Room', 'Beds. Sleep passes eight hours while the machines keep running as you left them.'], ['Bathroom', 'The toilet and shower feed the recycler: on a base, waste water is a resource.'], ['Water Room', 'The Water Recycler cleans used water so it can be drunk again.'], ['Animal Bay', 'Hens and a fish tank. The hens eat dry feed people cannot, and lay eggs.'], ['Tomato Farm', 'More racks under lamps. Plants also freshen the air and recycle water.']],
};

export const JOBS = ['Turn the bolts', 'Weld the seam', 'Seal the leaks', 'Check the pressure', 'Reconnect the wires', 'Make it safe', 'Swap the cracked cells', 'Brush the dust off', 'Build the air filter', 'Check the suit seals', 'Aim the dish at Earth', 'Put out the fire', 'Set the seeds', 'Harvest time', 'Stir the pot', 'Stack the crates'];

export const MOON_REEL = [['moon_rover', 'Drive the rover across the surface'], ['moon_hopper', 'Fly the hopper to other stations'], ['moon_rebuild', 'Rebuild a wrecked room'], ['moon_hens', 'Keep the hens fed'], ['moon_crew', 'Bring your crew home']];
export const MARS_REEL = [['mars_walk', 'Run to the outpost on Arcadia Planitia'], ['mars_rover', 'Drive the Mars rover'], ['mars_inside', 'Walk into the Command Habitat and talk to the crew'], ['mars_storm', 'A dust storm arrives as night falls (speeded up)']];

export const MARS_CARDS = [
  ['95%', 'Air you cannot breathe', 'Carbon dioxide makes up 95% of the air, at about 6 millibars: under 1% of the pressure on Earth. Every room of the outpost is a sealed bubble.', 'real'],
  ['−89 °C', 'Cold that bites', 'One day at the Viking 1 landing site ran from −89 °C before dawn to −31 °C in the afternoon. Switch the heat pump off in the game and the rooms freeze within hours.', 'real'],
  ['43%', 'A dimmer Sun, and dust', 'Mars gets 43% of the sunlight Earth does. Dust dims the sky and settles on the panels: the planet-wide storm of 2018 ended the Opportunity rover\'s mission.', 'real'],
  ['10 kW', 'Power for the night', 'The outpost pairs a solar field with a small fission unit. NASA tested a unit like it on Earth in 2018; none has flown.', 'play'],
  ['122 g', 'Oxygen and water from Mars', 'The MOXIE experiment on the Perseverance rover made 122 grams of oxygen from Martian air. Orbiters have mapped ice just under the soil of Arcadia Planitia, where the outpost stands.', 'real'],
  ['22 min', 'Far from help', 'Radio takes 3 to 22 minutes each way, and the cheap path to Mars opens about once every 26 months. A crew there must decide for itself.', 'real'],
];

export const GAME_TABS = [
  ['Survive', 'moon_airlock', 'Keep the power on and the air in', 'A meteor shower has holed the station. Patch a leaking room or lock its door to save the rest; fill the battery and the oxygen tank before the two-week night; and watch the alerts that say what will run out before the rescue ship lands.'],
  ['Run the station', 'moon_rebuild', 'One Power Board for everything', 'Eleven rooms share one supply of electricity. Turning the Oxygen Maker up leaves less for the farm lights or the heaters. Robots cost electricity and rescued astronauts cost food, and you give them their jobs in the Control Center.'],
  ['Farm and water', 'moon_hens', 'A loop that feeds itself', 'Grow ten crops under LED lamps, keep hens, cook what you harvest, recycle water, and dig ice from a crater that never sees the Sun. Your breath feeds the plants, and their damp air is recycled.'],
  ['Explore', 'moon_hopper', 'A rover, a hopper and three other stations', 'Drive the rover or fly the rocket hopper to Aurora, Sakura and Chandra. Each has crates of supplies and a stranded astronaut. Every person you bring home needs 0.84 kg of oxygen a day.'],
  ['Job games', 'moon_mgweld', 'Sixteen hands-on jobs', 'Before each big job there is a short game based on a real procedure: tightening bolts, welding a seam all the way round, plugging cables into matching sockets, checking that the pressure holds.'],
  ['Learn', 'moon_crew', 'The explanation arrives when you need it', 'The game never lectures first. Each idea turns up as a problem, a one-question quiz follows each emergency, and a "Real or made up?" page says what was simplified. Teachers get a ready-made 40-minute lesson.'],
  ['Build', 'moon_rover', 'Unlimited mode', 'No rescue ship and no end: endless materials to turn Tranquility Deep into a Moon town, at your own pace.'],
  ['Mars', 'mars_inside', 'A second world', 'Explore a 14-building outpost on a map made from NASA elevation data, walk into the Command Habitat, talk to a crew of three, ride out a dust storm in a first survival mission, and try six experiments in the Mars Science Center.'],
];

export const MODES = [['Cadet', 'ages 7 to 10', '4 game days'], ['Pilot', 'ages 11 to 14', '7 game days'], ['Commander', 'ages 15 to 18', '10 game days, scarce materials'], ['Unlimited', 'any age', 'no end: build a Moon town']];
export const KEYS = [['W A S D', 'walk, drive or fly'], ['Shift', 'run'], ['Space', 'hop'], ['E', 'do the thing shown at the bottom of the screen'], ['Q', 'second action'], ['Tab', 'the Power Board'], ['M', 'the map'], ['H', 'ask REGO, the robot, what to do next'], ['N', 'the Space Guide'], ['V · P', 'first or third person · pause']];

export const FLOW = [
  ['Research', 'NASA sources first. A script downloads the solar-storm records from DONKI and another builds the Mars maps from the MOLA elevation files, so the data in the game can be rebuilt from its source.'],
  ['Worldbuilding', 'Real places: the Moon base sits in the pit photographed at 8.3355°N, 33.222°E in the Sea of Tranquility, and the Mars outpost at 39.5°N, 191.2°E on Arcadia Planitia. The stations Aurora, Sakura and Chandra, and their astronauts, are invented.'],
  ['Systems design', 'The simulation is plain logic with no drawing in it: power, the air in each room, water, food and time. That is what lets a test play every mission from start to finish.'],
  ['Visual production', 'The 3D worlds, vehicles and characters are built from code with simple shapes. The 111 still pictures were made with a Higgsfield image model from prompts kept in the repository, and each one is marked "SI-generated".'],
  ['Coding', 'Plain JavaScript modules, HTML and CSS, with Three.js for 3D. No framework, no build step, no server and no login: the game is a folder of files on GitHub Pages.'],
  ['Testing', 'Seventeen test scripts, a translation check for all 16 languages, and play-throughs in a real browser.'],
  ['Improvements', 'Play-tests were written up as lists of bugs and fixed in batches; later came the yellow guide line for every hint, text-size and colour-blind settings, the visible SI marks, and Mars.'],
];

export const SI_LIST = [
  ['A person', 'chose what to build, asked for every change, and decided what went in.'],
  ['Claude (Anthropic)', 'wrote the code, tests, tools and documents through Claude Code, and the translations into 15 languages (checked by machine, not yet by native speakers).'],
  ['Higgsfield', 'made the 111 pictures in the game with its image model, and this site\'s cinematic clips with Seedance 2.5. Every one carries a visible "SI-generated" mark.'],
  ['Not SI', 'the NASA datasets and the NASA Earth and Moon images; the 3D worlds, which are built from code; and REGO\'s voice, which is the speech built into the player\'s own device.'],
];

export const ARCH = [
  ['js/sim.js', 'the simulation: power, air, water, food, time (pure logic)'], ['js/world.js', 'the 3D Moon: surface, cave, station and rooms'], ['js/main.js', 'the frame loop, the player, vehicles and camera'],
  ['js/events.js', 'emergencies drawn from NASA records'], ['js/minigames.js', 'the sixteen job games'], ['js/life.js', 'farming, water and the closed loop'],
  ['js/mars/', 'Mars: terrain from MOLA data, outpost, survival mission, Science Center'], ['js/i18n.js · lang/', '16 languages'], ['tools/', 'data builders, picture pipeline and 17 test scripts'], ['lib/', 'Three.js r160'],
];

export const COMPARE = [
  ['Gravity', ['9.81 m/s²'], ['1.62 m/s²', 'one sixth of Earth\'s'], ['3.73 m/s²', '38% of Earth\'s']],
  ['One day', ['24 hours'], ['29.5 Earth days', 'about two weeks of light, two of dark'], ['24 h 39 min', 'one "sol"']],
  ['Air', ['1,013 mb', 'nitrogen and oxygen'], ['almost none', 'a vacuum'], ['about 6 mb', '95% carbon dioxide']],
  ['Temperature', ['15 °C on average'], ['about 120 °C by day, −130 °C at night', 'at the equator'], ['−89 °C to −31 °C in one day', 'at the Viking 1 site']],
  ['Sunlight', ['1,361 W/m²'], ['1,361 W/m²', 'the same distance from the Sun'], ['586 W/m²', '43% of Earth\'s']],
  ['Radio from Earth', ['—'], ['about 1.3 seconds'], ['3 to 22 minutes']],
  ['What a base must do', ['—'], ['store power for a two-week night; seal every room'], ['make oxygen and water on the spot; keep warm; live with dust']],
];

export const QUIZ = [
  ['The Moon base in the game sits in a real pit in the Sea of Tranquility.', 'real', 'NASA\'s Lunar Reconnaissance Orbiter photographed the pit at 8.3355°N, 33.222°E, and radar suggests it opens into a cave.'],
  ['A meteor shower wrecks every station on the Moon at once.', 'story', 'That is the story. The single strikes in the game, though, are taken from impacts the Apollo seismometers recorded.'],
  ['The solar storms in the game happened on the dates shown.', 'real', 'Each one is a dated event from NASA\'s DONKI archive: 181 events from 2011 to 2026.'],
  ['A wrecked room can be rebuilt in a few hours.', 'play', 'Repairs are shortened so that a mission fits into a lesson.'],
  ['The ice mine is a short drive from the base.', 'play', 'Real lunar ice lies near the poles, far from the Sea of Tranquility. The game moves it closer and says so.'],
  ['A machine on Mars has already made oxygen from the Martian air.', 'real', 'MOXIE, on the Perseverance rover, made 122 grams in 16 runs.'],
  ['The Mars outpost\'s oxygen plant exists today.', 'play', 'It is a scaled-up plan. Nobody has built one large enough for a crew.'],
  ['Night on the Moon lasts about two weeks.', 'real', 'A lunar day is 29.5 Earth days long, so about half of it is dark.'],
];
export const KIND = { real: 'Verified NASA data', play: 'Gameplay simplification', story: 'Fictional story' };

export const SOURCES = [
  ['NASA Moon Facts', 'https://science.nasa.gov/moon/facts/', 'Background for the Moon\'s gravity, day and temperatures.'],
  ['NASA Mars Facts', 'https://science.nasa.gov/mars/facts/', 'Background for Mars.'],
  ['DONKI space-weather database (NASA CCMC)', 'https://ccmc.gsfc.nasa.gov/tools/DONKI/', 'Used in the game: every solar storm is one of its dated events.'],
  ['Apollo Passive Seismic Experiment event catalog (NASA PDS)', 'https://pds.nasa.gov/ds-view/pds/viewBundle.jsp?identifier=urn%3Anasa%3Apds%3Aapollo_seismic_event_catalog&version=1.0', 'Used in the game: every moonquake and impact.'],
  ['MGS MOLA elevation data (NASA PDS Geosciences Node)', 'https://pds-geosciences.wustl.edu/missions/mgs/megdr.html', 'Used in the game: the Mars planet map, region map and skyline. Also drawn on this site\'s Mars globe.'],
  ['Lunar Pits Atlas: Mare Tranquillitatis pit (LROC)', 'https://lroc.im-ldi.com/atlases/pits/3', 'The real place where the Moon base is set.'],
  ['Moon Fact Sheet and Mars Fact Sheet (NSSDCA)', 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/', 'Gravity, pressure, sunlight and day length.'],
  ['MOXIE completes its Mars mission (NASA)', 'https://www.nasa.gov/missions/mars-2020-perseverance/perseverance-rover/nasas-oxygen-generating-experiment-moxie-completes-mars-mission/', 'Oxygen made from Martian air.'],
  ['Blue Marble (NASA Scientific Visualization Studio)', 'https://svs.gsfc.nasa.gov/2915', 'The Earth picture in the game and on this site.'],
];

export const THEMES = [
  ['Survival', 'Understand what it takes to stay alive where nothing is free: air, warmth, water and power all have to be made or saved.'],
  ['Engineering', 'See why machines and resources must work together. One Power Board, many needs, and every choice costs something.'],
  ['Scientific curiosity', 'Meet real space-exploration problems through real records: dated solar storms, recorded moonquakes, measured Martian weather.'],
  ['Creative learning', 'Learn by doing the job yourself, with the explanation arriving at the moment you need it.'],
];
export { GAME };
