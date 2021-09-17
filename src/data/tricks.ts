export type TrickArea =
  | 'flatground'
  | 'rails'
  | 'gap'
  | 'ledges'
  | 'manuals'
  | 'transition'
  | 'freestyle';
export type TrickType = 'fundamental' | 'advanced';
export type TrickDifficulty = 'easy' | 'medium' | 'hard' | 'xhard';
export type TrickStance = 'switch' | 'nollie' | 'fakie' | 'regular';

export interface TrickVariation {
  type: TrickType;
  difficulty: TrickDifficulty;
  video?: {
    embedUrl: string;
    title: string;
  };
}

export interface Trick {
  name: string;
  area: TrickArea;
  variations: Record<TrickStance, TrickVariation>;
}

export const trickAreaLabels: Record<TrickArea, string> = {
  flatground: 'Flatground',
  freestyle: 'Freestyle',
  rails: 'Rails',
  gap: 'Gap',
  ledges: 'Ledges',
  manuals: 'Manuals',
  transition: 'Transition',
};

export const getTrickAreaLabel = (trickArea: TrickArea) => {
  return trickAreaLabels[trickArea];
};

export const trickStanceLabels: Record<TrickStance, string> = {
  nollie: 'Nollie',
  fakie: 'Fakie',
  regular: 'Regular',
  switch: 'Switch',
};

export const getTrickStanceLabel = (stance: TrickStance) => {
  return trickStanceLabels[stance];
};

export const trickDifficultyLabels: Record<TrickDifficulty, string> =
  {
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    xhard: 'XHard',
  };

export const getTrickDifficultyLabel = (
  difficulty: TrickDifficulty
) => {
  return trickDifficultyLabels[difficulty];
};

export interface TrickCombination {
  name: string;
  stance: TrickStance;
  areas: [TrickArea];
  difficulty: TrickDifficulty;
  type: TrickType;
  video?: {
    embedUrl: string;
    title: string;
  };
}

export const getTrickCombinations = (
  trick: Trick
): TrickCombination[] => {
  return Object.entries(trick.variations).map(
    ([stance, variation]) => {
      const stanceLabel = getTrickStanceLabel(stance as TrickStance);

      return {
        name: `${stanceLabel} ${trick.name}`,
        stance: stance as TrickStance,
        areas: [trick.area],
        difficulty: variation.difficulty,
        type: variation.type,
        video: variation.video,
      };
    }
  );
};

const difficultyArray = ['easy', 'medium', 'hard', 'xhard'];

export const getDifficultyLevelNumber = (
  difficulty: TrickDifficulty
) => {
  return difficultyArray.indexOf(difficulty);
};

export const getDifficulty = (levelNumber: number) => {
  return difficultyArray[levelNumber];
};

export const railTricks: ReadonlyArray<Trick> = [
  {
    name: 'Backside Boardslide',
    area: 'rails',
    variations: {
      regular: {
        type: 'fundamental',
        difficulty: 'easy',
      },
      fakie: {
        type: 'advanced',
        difficulty: 'medium',
      },
      nollie: {
        type: 'advanced',
        difficulty: 'medium',
      },
      switch: {
        type: 'advanced',
        difficulty: 'medium',
      },
    },
  },
  {
    name: 'Frontside Boardslide',
    area: 'rails',
    variations: {
      regular: {
        type: 'fundamental',
        difficulty: 'medium',
      },
      fakie: {
        type: 'advanced',
        difficulty: 'medium',
      },
      nollie: {
        type: 'advanced',
        difficulty: 'medium',
      },
      switch: {
        type: 'advanced',
        difficulty: 'medium',
      },
    },
  },
  {
    name: 'Backside Feeble',
    area: 'rails',
    variations: {
      regular: {
        type: 'fundamental',
        difficulty: 'medium',
      },
      fakie: {
        type: 'advanced',
        difficulty: 'xhard',
      },
      nollie: {
        type: 'advanced',
        difficulty: 'xhard',
      },
      switch: {
        type: 'advanced',
        difficulty: 'xhard',
      },
    },
  },
  {
    name: 'Frontside Feeble',
    area: 'rails',
    variations: {
      regular: {
        type: 'advanced',
        difficulty: 'hard',
      },
      fakie: {
        type: 'advanced',
        difficulty: 'xhard',
      },
      nollie: {
        type: 'advanced',
        difficulty: 'xhard',
      },
      switch: {
        type: 'advanced',
        difficulty: 'xhard',
      },
    },
  },
  {
    name: 'Frontside 50-50',
    area: 'rails',
    variations: {
      regular: {
        type: 'fundamental',
        difficulty: 'medium',
      },
      fakie: {
        type: 'advanced',
        difficulty: 'medium',
      },
      nollie: {
        type: 'advanced',
        difficulty: 'hard',
      },
      switch: {
        type: 'advanced',
        difficulty: 'hard',
      },
    },
  },
  {
    name: 'Backside 50-50',
    area: 'rails',
    variations: {
      regular: {
        type: 'fundamental',
        difficulty: 'hard',
      },
      fakie: {
        type: 'advanced',
        difficulty: 'hard',
      },
      nollie: {
        type: 'advanced',
        difficulty: 'hard',
      },
      switch: {
        type: 'advanced',
        difficulty: 'hard',
      },
    },
  },
];

export const flatgroundTricks: ReadonlyArray<Trick> = [
  {
    name: 'Ollie',
    area: 'flatground',
    variations: {
      regular: {
        type: 'fundamental',
        difficulty: 'easy',
      },
      switch: {
        type: 'fundamental',
        difficulty: 'medium',
      },
      nollie: {
        type: 'fundamental',
        difficulty: 'medium',
      },
      fakie: {
        type: 'fundamental',
        difficulty: 'easy',
      },
    },
  },
  {
    name: 'Kickflip',
    area: 'flatground',
    variations: {
      regular: {
        type: 'fundamental',
        difficulty: 'medium',
        video: {
          embedUrl: 'https://www.youtube.com/embed/nUQOC4vvCdw',
          title: 'PJ Ladd Flatground Fundamentals - Kickflip',
        },
      },
      fakie: {
        type: 'fundamental',
        difficulty: 'medium',
      },
      switch: {
        type: 'advanced',
        difficulty: 'hard',
      },
      nollie: {
        type: 'advanced',
        difficulty: 'hard',
      },
    },
  },
  {
    name: 'Heelflip',
    area: 'flatground',
    variations: {
      regular: {
        type: 'fundamental',
        difficulty: 'medium',
        video: {
          embedUrl: 'https://www.youtube.com/embed/-nX9lB0S69w',
          title: 'PJ Ladd Flatground Fundamentals - Heelflip',
        },
      },
      fakie: {
        type: 'fundamental',
        difficulty: 'medium',
      },
      switch: {
        type: 'advanced',
        difficulty: 'hard',
      },
      nollie: {
        type: 'advanced',
        difficulty: 'hard',
      },
    },
  },
  {
    name: 'Backside 180',
    area: 'flatground',
    variations: {
      regular: {
        type: 'fundamental',
        difficulty: 'easy',
      },
      fakie: {
        type: 'fundamental',
        difficulty: 'easy',
      },
      switch: {
        type: 'advanced',
        difficulty: 'medium',
      },
      nollie: {
        type: 'advanced',
        difficulty: 'medium',
      },
    },
  },
  {
    name: 'Frontside 180',
    area: 'flatground',
    variations: {
      regular: {
        type: 'fundamental',
        difficulty: 'easy',
      },
      fakie: {
        type: 'fundamental',
        difficulty: 'easy',
      },
      switch: {
        type: 'advanced',
        difficulty: 'easy',
      },
      nollie: {
        type: 'advanced',
        difficulty: 'medium',
      },
    },
  },
  {
    name: 'Frontside Shove-it',
    area: 'flatground',
    variations: {
      regular: {
        type: 'fundamental',
        difficulty: 'medium',
      },
      fakie: {
        type: 'advanced',
        difficulty: 'medium',
      },
      switch: {
        type: 'advanced',
        difficulty: 'medium',
      },
      nollie: {
        type: 'advanced',
        difficulty: 'medium',
      },
    },
  },
  {
    name: 'Backside Shove-it',
    area: 'flatground',
    variations: {
      regular: {
        type: 'fundamental',
        difficulty: 'easy',
        video: {
          embedUrl: 'https://www.youtube.com/embed/KtiDExQMS20',
          title: 'PJ Ladd Flatground Fundamentals - Pop Shove Its',
        },
      },
      fakie: {
        type: 'fundamental',
        difficulty: 'easy',
      },
      switch: {
        type: 'advanced',
        difficulty: 'medium',
      },
      nollie: {
        type: 'advanced',
        difficulty: 'easy',
      },
    },
  },
  {
    name: 'Frontside Kickflip',
    area: 'flatground',
    variations: {
      regular: {
        type: 'advanced',
        difficulty: 'hard',
      },
      fakie: {
        type: 'advanced',
        difficulty: 'hard',
      },
      switch: {
        type: 'advanced',
        difficulty: 'hard',
      },
      nollie: {
        type: 'advanced',
        difficulty: 'hard',
      },
    },
  },
  {
    name: 'Backside Kickflip',
    area: 'flatground',
    variations: {
      regular: {
        type: 'advanced',
        difficulty: 'medium',
      },
      fakie: {
        type: 'fundamental',
        difficulty: 'medium',
      },
      switch: {
        type: 'advanced',
        difficulty: 'hard',
      },
      nollie: {
        type: 'advanced',
        difficulty: 'hard',
      },
    },
  },
  {
    name: 'Frontside Heelflip',
    area: 'flatground',
    variations: {
      regular: {
        type: 'advanced',
        difficulty: 'hard',
      },
      fakie: {
        type: 'advanced',
        difficulty: 'hard',
      },
      switch: {
        type: 'advanced',
        difficulty: 'hard',
      },
      nollie: {
        type: 'advanced',
        difficulty: 'hard',
      },
    },
  },
  {
    name: 'Backside Heelflip',
    area: 'flatground',
    variations: {
      regular: {
        type: 'advanced',
        difficulty: 'medium',
      },
      fakie: {
        type: 'advanced',
        difficulty: 'medium',
      },
      switch: {
        type: 'advanced',
        difficulty: 'hard',
      },
      nollie: {
        type: 'advanced',
        difficulty: 'hard',
      },
    },
  },
  {
    name: '360 Kickflip',
    area: 'flatground',
    variations: {
      regular: {
        type: 'advanced',
        difficulty: 'medium',
      },
      fakie: {
        type: 'advanced',
        difficulty: 'medium',
      },
      switch: {
        type: 'advanced',
        difficulty: 'xhard',
      },
      nollie: {
        type: 'advanced',
        difficulty: 'xhard',
      },
    },
  },
  {
    name: 'Backside Bigspin',
    area: 'flatground',
    variations: {
      regular: {
        type: 'advanced',
        difficulty: 'medium',
      },
      fakie: {
        type: 'fundamental',
        difficulty: 'easy',
      },
      switch: {
        type: 'advanced',
        difficulty: 'xhard',
      },
      nollie: {
        type: 'advanced',
        difficulty: 'medium',
      },
    },
  },
  {
    name: 'Frontside Bigspin',
    area: 'flatground',
    variations: {
      regular: {
        type: 'advanced',
        difficulty: 'hard',
      },
      fakie: {
        type: 'advanced',
        difficulty: 'medium',
      },
      switch: {
        type: 'advanced',
        difficulty: 'hard',
      },
      nollie: {
        type: 'advanced',
        difficulty: 'medium',
      },
    },
  },
  {
    name: 'Varial Kickflip',
    area: 'flatground',
    variations: {
      regular: {
        type: 'fundamental',
        difficulty: 'medium',
      },
      fakie: {
        type: 'fundamental',
        difficulty: 'medium',
      },
      switch: {
        type: 'advanced',
        difficulty: 'hard',
      },
      nollie: {
        type: 'advanced',
        difficulty: 'hard',
      },
    },
  },
  {
    name: 'Varial Heelflip',
    area: 'flatground',
    variations: {
      regular: {
        type: 'advanced',
        difficulty: 'medium',
      },
      fakie: {
        type: 'advanced',
        difficulty: 'hard',
      },
      switch: {
        type: 'advanced',
        difficulty: 'hard',
      },
      nollie: {
        type: 'advanced',
        difficulty: 'medium',
      },
    },
  },
];

export const ledgeTricks: ReadonlyArray<Trick> = [
  {
    name: 'Frontside 50-50',
    area: 'ledges',
    variations: {
      regular: {
        type: 'fundamental',
        difficulty: 'easy',
      },
      fakie: {
        type: 'advanced',
        difficulty: 'medium',
      },
      nollie: {
        type: 'advanced',
        difficulty: 'medium',
      },
      switch: {
        type: 'advanced',
        difficulty: 'hard',
      },
    },
  },
  {
    name: 'Backside 50-50',
    area: 'ledges',
    variations: {
      regular: {
        type: 'fundamental',
        difficulty: 'medium',
      },
      fakie: {
        type: 'advanced',
        difficulty: 'hard',
      },
      nollie: {
        type: 'advanced',
        difficulty: 'hard',
      },
      switch: {
        type: 'advanced',
        difficulty: 'hard',
      },
    },
  },
  {
    name: 'Backside Crooked Grind',
    area: 'ledges',
    variations: {
      regular: {
        type: 'fundamental',
        difficulty: 'medium',
      },
      fakie: {
        type: 'advanced',
        difficulty: 'hard',
      },
      nollie: {
        type: 'advanced',
        difficulty: 'hard',
      },
      switch: {
        type: 'advanced',
        difficulty: 'hard',
      },
    },
  },
  {
    name: 'Frontside Crooked Grind',
    area: 'ledges',
    variations: {
      regular: {
        type: 'advanced',
        difficulty: 'hard',
      },
      fakie: {
        type: 'advanced',
        difficulty: 'hard',
      },
      nollie: {
        type: 'advanced',
        difficulty: 'hard',
      },
      switch: {
        type: 'advanced',
        difficulty: 'xhard',
      },
    },
  },
  {
    name: 'Frontside 5-0 Grind',
    area: 'ledges',
    variations: {
      regular: {
        type: 'fundamental',
        difficulty: 'easy',
      },
      fakie: {
        type: 'advanced',
        difficulty: 'hard',
      },
      nollie: {
        type: 'advanced',
        difficulty: 'hard',
      },
      switch: {
        type: 'advanced',
        difficulty: 'hard',
      },
    },
  },
  {
    name: 'Backside 5-0 Grind',
    area: 'ledges',
    variations: {
      regular: {
        type: 'fundamental',
        difficulty: 'medium',
      },
      fakie: {
        type: 'advanced',
        difficulty: 'hard',
      },
      nollie: {
        type: 'advanced',
        difficulty: 'hard',
      },
      switch: {
        type: 'advanced',
        difficulty: 'hard',
      },
    },
  },
];

/**
 * TODO: add trick list for other areas
 */
export const trickAreaMap: Record<TrickArea, readonly Trick[]> = {
  flatground: flatgroundTricks,
  rails: railTricks,
  gap: flatgroundTricks,
  ledges: ledgeTricks,
  manuals: [],
  freestyle: [],
  transition: [],
};
