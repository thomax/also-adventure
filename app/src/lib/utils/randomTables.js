// type, effect, power, personal cost, flavor

export const allTables = {
	power: ['Insignificant', 'Minor', 'Adequate', 'Major', 'Legendary'],
	flavor: [
		'High fantasy',
		'Low fantasy',
		'Devious',
		'Dark',
		'Humorous',
		'Pirate',
		'Lovecraftian',
		'Howardian',
		'Silly',
		'Grimdark'
	],
	cost: [
		"Lose a memory each time it's used",
		'Age with every activation',
		'Lose an amount of health',
		'Attract attention of malevolent entity',
		'Lose a possession',
		'Temporary loss of a sense',
		'Suffer a curse for a day',
		'Cause bad luck to yourself and allies',
		'Gain a visible mark of corruption',
		'Loose some life force',
		'Accumulate debt to a powerful entity',
		'Loss of wealth or resources',
		'Contract a magical disease',
		'Suffer nightmares',
		'Become increasingly paranoid',
		'Sacrifice a small piece of your soul',
		'Temporarily attract wild animals',
		'Develop a compulsion',
		'Change appearance',
		'Cause extreme weather conditions',
		'Develop a fear or phobia',
		'Lose the ability to dream',
		'Disturbing visions',
		'Shadow attempts betrayal',
		'Suffer from physical pain',
		'Become unable to lie or deceive',
		'Attract a bounty',
		'Develop a craving'
	],
	'item-type': [
		'Trash and Junk',
		'Natural thing',
		'Food or drink',
		'Toy or game',
		'Bag, box or container',
		'Tool or material',
		'Furniture or small piece of architecture',
		'Coin or currency',
		'Musical instrument',
		'Art object',
		'Book or other writing',
		'Adventuring gear',
		'Bodywear',
		'Headwear',
		'Handwear or footwear',
		'Clothing accessory',
		'Jewelry',
		'Armor',
		'Shield',
		'Light Melee Weapon',
		'Heavy Weapon',
		'Ranged Weapon',
		'Siege Weapon',
		'Vehicle',
		'Technological Marvels',
		'Occult or Religious Object',
		'Potion',
		'Poison',
		'Weird or Bizarre Oddity'
	],
	effect: {
		adventuring: [
			'Purify water or clean things',
			'Detect poisons or diseases',
			'Never get lost',
			'Breathe water',
			'Prevent exposure, dehydration and/or starvation',
			'Prevent hypothermia or frostbite',
			'Repel pests or parasites',
			'Find water or food',
			'Prevent suffocation',
			'Open locks',
			'Detect traps or hazards',
			'Detect a type of monster',
			'Extinguish fires or clear smoke',
			'Provide endless water',
			'Lookout, guardian or scout',
			'Good Luck',
			'Avoid certain death',
			'Duplication',
			'Invisibility',
			'[effect.adventuring][effect]'
		],
		'alternate-uses': [
			'Is also a shield or armor',
			'Is also a Weapon',
			'Is also a Book',
			'Is also a Musical Instrument',
			'Is also a Rope, Torch or Adventuring Tool',
			'Is also a [item-type]',
			'Shrinks or folds into a miniature form',
			'Expands or grows to a great size',
			'Transforms into a horse or mount',
			'Transforms into a guardian',
			'Transforms into vehicle or siege weapon',
			'Transforms into a tattoo',
			'Sprouts legs and walks around on your command',
			'Transforms into Jewelry or a Clothing Accessory',
			'Transforms into [item-type]',
			'Does the opposite of what the object would normally',
			'Hidden Compartment',
			'Automatic or Animated',
			'Transforms into many different things or anything',
			'[effect.alternate-uses][effect]'
		],
		battlefield: [
			'Swap places',
			'Move someone',
			'Tangling vines, sticky webs, quicksand',
			'Push away',
			'Slimy or Icy Ground',
			'Blasting wind, snow or sand',
			'Knockdown people',
			'Disappear',
			'Break the ground',
			'Wall of Stone or Iron',
			'Pull everything towards you',
			'Hold or Restrain',
			'Launch into the air',
			'Toss around violently',
			'Ignite everything on fire',
			'Imprison',
			'Knockdown walls or buildings',
			'Reverse Gravity',
			'Explosion, earthquake or meteor impact',
			'[effect.battlefield][effect]'
		],
		creation: [
			'Shine like a torch',
			'Wood, nails and building materials',
			'Change clothing',
			'Daylight',
			'Mounds of Dirt',
			'Simple machines',
			'Hut or Tent',
			'Copy Writings',
			'Make maps',
			'Clouds or smoke',
			'Steel cage',
			'Make a door or passage',
			'Armory of weapons',
			'Endless ammunition',
			'Wall of iron',
			'Siege weapon',
			'Wrecking ball or battering ram',
			'Instant Fortress',
			'Transmute dirt into gold',
			'[effect.creation][effect]'
		],
		elemental: [
			'Covered in dust',
			'Foaming',
			'Swarming with bugs',
			'Clouded with Smoke or Fog',
			'Greased with Oils',
			'Shrouded in Darkness',
			'Brilliant with Light',
			'Slick with Slime',
			'Magnetized',
			'Infected with Disease',
			'Booming with Sound',
			'Crackling with Lightning',
			'Poisoned',
			'Dripping Acid',
			'Frozen in Ice',
			'Wreathed in Fire',
			'Imbued with Chaos',
			'Profaned with Unholy Power',
			'Blessed with Holy Power',
			'[effect.elemental][effect]'
		],
		healing: [
			'Cure common illnesses or ailments',
			'Heal small wounds',
			'Suppress symptoms and pain',
			'Protections from plagues or expected illness',
			'Antidotes for common poisons',
			'Increase the benefits of rest and recuperation',
			'Heal small wounds for many people',
			'Remove ongoing afflictions',
			'Heal serious wounds and injuries',
			'Cure deadly and fatal diseases and illness',
			'Cure mental illness and insanity',
			'Antidote for deadly poisons and venoms',
			'Heal many serious wounds for many people',
			'Heal catastrophic Injuries and Wounds',
			'Resurrect the recently dead',
			'Restore sight or deafness',
			'Regenerate limbs or organs',
			'Eternal Youth',
			'Perfect Resurrection',
			'[effect.healing][effect]'
		],
		illusion: [
			'Card tricks and sleight of hand',
			'Disguises',
			'Fireworks, smoke and flashes',
			'Conceal messages or speech',
			'Mirror images',
			'Blur, blend, fade',
			'False appearances',
			'Imaginary friend',
			'Illusory soldiers',
			'Dazzle or enchant',
			'Dreams or nightmares',
			'Illusory dragon',
			'Phantasmal assailants',
			'Disguise many people',
			'Sphere of Invisibility',
			'Shadow monsters',
			'Mazes, hidden sanctuary',
			'Illusory terrain or buildings',
			'Alternate Realities',
			'[effect.illusion][effect]'
		],
		mighty: [
			'Reinforced or buttressed',
			'Move heavy objects',
			'Indestructible',
			'Regal or luxurious',
			'Honorable or heroic',
			'Pushback or knockdown',
			'Immovable',
			'Strangle or restrain',
			'Bloody and brutal',
			'Rallying or inspiring',
			'Crush',
			'Ageless',
			'Ironskin',
			'Petrification',
			'Obliterate',
			'Dominion or Rulership',
			'Midas Touch',
			'Super Strength',
			'Immortality',
			'[effect.mighty][effect]'
		],
		magic: [
			'Prestidigitation, trivial tricks',
			'Arcane lock',
			'Also a spellbook',
			'Magic missiles',
			'Wards, seals, magic circles',
			'Levitation',
			'Silence',
			'Fireball',
			'Nullify Magic',
			'Spell Protection',
			'Telekinesis',
			'Portals and Gateways',
			'Forcefield',
			'Disintegration',
			'Polymorph',
			'Antimagic Field',
			'Travel to other dimensions',
			'Grant Wishes',
			'Omnipotence',
			'[effect.magic][effect]'
		],
		'mind-bending': [
			'Sweet dreams',
			'Short range telepathy',
			'Link minds',
			'Sense emotions',
			'Calm or soothe',
			'Read thoughts',
			'Persuade or deceive',
			'Induces sleep',
			'Confuses and befuddles',
			'Enrages and maddens',
			'Bewitches and enthralls',
			'Protects against mind magic',
			'Long range telepathy',
			'Causes delusions or hallucination',
			'Terrifying or frightening',
			'Induce insanity',
			'Change memories',
			'Controls minds',
			'Destroy minds',
			'[effect.mind-bending][effect]'
		],
		natural: [
			'Mimics bird or animal calls',
			'Detects a type of animal or plant',
			'Befriends animals or a type of animal',
			'Speak to animals',
			'Cause plants to grow rich and bountiful over time',
			'Purify Water',
			'Summon small animal messengers',
			'Speak to plants',
			'Animate plants',
			'Move stone or earth',
			'Repel beasts or plants',
			'See through an animals eyes',
			'Cause the ground to shake',
			'Gain gills, wings, claws or other beastial features',
			'Transform into a beast or plant',
			'Revive dead plants or animals',
			'Summon Great Animal Guardians',
			'Commune with Nature Spirits or Gods',
			'Cause a natural disaster like a flood or tornado',
			'[effect.natural][effect]'
		],
		movement: [
			'Jump great distances',
			'Move through difficult terrain with ease',
			'Move silently',
			'Teleport home',
			'Skate on ice',
			'Teleport short distances',
			'Teleport long distances',
			'Swim through lava',
			'Never sink in water',
			'Float near the ground',
			'Climb like a monkey',
			'Swim like a fish',
			'Fly like an eagle',
			'Glide like a flying squirrel',
			'Burrow like a mole',
			'Pass through walls',
			'Walk on walls and ceilings',
			'Walk on water',
			'Move super fast',
			'[effect.movement][effect]'
		],
		perception: [
			'Sense hazards',
			'Darkvision',
			'Microscopic sight',
			'Telescopic sight',
			'Track by scent',
			'Perfect hearing',
			'Track blood in water',
			'See through clouds or smoke',
			'Heat vision',
			'Detect presence of a specific type of creature',
			'Echolocation',
			'Synesthesia (taste sound, hear colors, etc)',
			'See ghosts or invisible things',
			'Danger sense, never surprised',
			'Divine the past',
			'Foretell the future',
			'Remote viewing or scrying',
			'X-Ray vision',
			'Omniscience',
			'[effect.perception][effect]'
		],
		profane: [
			'Brings ruin or decay',
			'Slays angels',
			'Reeks of death or brimstone',
			'Corrupts the mind and soul',
			'Stops the heart',
			'Drains blood or life force',
			'Designed to torture or punish',
			'Covered in obscene images and symbols',
			'Covered in profane images and symbols',
			'Covered in terrible spikes',
			'Cursed or imparts curses',
			'Opens Dark Realms',
			'Binds demons and devils',
			'Animates the dead',
			'Grants undead immortality',
			'Burns with unholy fire',
			'Damns the soul',
			'Made by a great Demon',
			'Brings about the End of the World',
			'[effect.profane][effect]'
		],
		protection: [
			'Petrification Protection',
			'Disease Protection',
			'Breath Weapon Protection',
			'Deafness/Blindness Protection',
			'Acid Protection',
			'Lightning Protection',
			'Sonic Protection',
			'Paralysis or Stun Protection',
			'Psychic Protection',
			'Charm Protection',
			'Fear Protection',
			'Poison Protection',
			'Cold Protection',
			'Holy Protection',
			'Unholy Protection',
			'Fire Protection',
			'Ranged Weapon Protection',
			'Melee Weapon Protection',
			'Spell Protection',
			'[effect.protection][effect]'
		],
		sacred: [
			'Holy radiance',
			'Detect demons, dragons or the undead',
			'Can’t be used by the unworthy or wicked',
			'Holy Stigmata',
			'Associated with a miracle or saint',
			'Detects guilt',
			'Calming and peaceful',
			'Prevents or reveals lying and deceit',
			'Heals wounds',
			'Provides sound counsel and heroic advice',
			'Exorcises the possessed',
			'Harms demons, dragons or the undead',
			'Calls upon the aid of Heaven',
			'Reveals true forms',
			'Angel wings',
			'Burns with purifying flame',
			'Saves the lost, redeems the disgraced',
			'Made by a god or archangel',
			'Could save the entire Universe',
			'[effect.sacred][effect]'
		],
		silly: [
			'Sticky',
			'Coin operated, like a vending machine',
			'Detect clowns',
			'Smells great',
			'Lays eggs',
			'Made of a completely wrong material',
			'Rainbow colored',
			'Tells bad jokes',
			'Comically over- or undersized',
			'Loved by cats or other cute animals',
			'Change color on demand',
			'Farts',
			'Unconditional love',
			'Intoxication or drunkenness',
			'Sings songs or plays music',
			'Turns into a vegetable at midnight',
			'Two-dimensional cartoon object',
			'Clowns everywhere',
			'Shatters the fourth wall',
			'[effect.silly][effect]'
		],
		social: [
			'Psychopathic or deranged',
			'Outcast or taboo',
			'Antisocial',
			'Smells horrible',
			'Make a friend',
			'Look amazing',
			'Calm and reassuring',
			'Attract a crowd',
			'Bravery or fanaticism',
			'Seem trustworthy',
			'Blend in to a crowd',
			'Convincing lies',
			'Scare and frighten',
			'Inspire greatness',
			'Beloved by commoners',
			'Plotting and scheming',
			'Enthralling and captivating',
			'Seductive and alluring',
			'Divine beauty',
			'[effect.social][effect]'
		],
		summoning: [
			'Tiny Animal Summoning',
			'Giant Animal Summoning',
			'Plant Summoning',
			'Giant Plant Summoning',
			'Swarm of Bugs Summoning',
			'Horse or Mount Summoning',
			'Guard Summoning',
			'Servant Summoning',
			'Familiar Summoning',
			'Animal Summoning',
			'Faerie Summoning',
			'Fish Summoning',
			'Pirate Summoning',
			'Ooze Summoning',
			'Undead Summoning',
			'Giant Animal Summoning',
			'Elemental Summoning',
			'Guardian Spirit Summoning',
			'Freakish Horror Summoning',
			'Dragon Summoning',
			'Angel Summoning',
			'Demon Summoning',
			'Devil Summoning',
			'[effect.summoning][effect]'
		],
		weird: [
			'Covered in eyes',
			'Covered in babbling mouths',
			'Whispers paranoid lies',
			'Writhes with tentacles',
			'Fuse to the body, replacing limbs or organs',
			'Cause nightmares',
			'Warp Minds',
			'Drive people mad',
			'Contains a terrible secret',
			'It knows too much',
			'Impossible geometry',
			'Drain colors',
			'Call upon terrible beings',
			'Made of unknown substance',
			'Extremely Advanced Technology',
			'Cause Mutations',
			'Control Minds',
			'Stop time',
			'Break Reality',
			'[effect.weird][effect]'
		]
	}
}