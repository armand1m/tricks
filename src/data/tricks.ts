import { emit } from "process";

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
        video: {
          title: 'Ollie - Levi Brown',
          embedUrl: 'https://www.youtube.com/embed/2tgOPrG1p6A',
        },
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
        video: {
          title: 'Jon Dickson: Trickipedia - Switch Kickflip',
          embedUrl: 'https://www.youtube.com/embed/KnWsFktSPSg',
        },
      },
      nollie: {
        type: 'advanced',
        difficulty: 'hard',
        video: {
          title: 'Davis Torgerson: Trickipedia - Nollie Kickflip',
          embedUrl: 'https://www.youtube.com/embed/dG79BPxWons',
        },
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
        video: {
          embedUrl: 'https://www.youtube.com/embed/Wmnn2bCmz-k',
          title: 'Neen Williams: Trickipedia - Fakie Heelflip',
        },
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
        video:{
          title:'HOW TO FRONTSIDE 180 THE EASIEST WAY TUTORIAL 2020',
          embedUrl:'https://www.youtube.com/embed/ZSe9vPoXKiU',
        }
      },
      fakie: {
        type: 'fundamental',
        difficulty: 'easy',
        video:{
          title:'HOW TO FAKIE FRONTSIDE 180 THE EASIEST WAY TUTORIAL',
          embedUrl:'https://www.youtube.com/embed/c9V0p_nobeE',
        }
      },
      switch: {
        type: 'advanced',
        difficulty: 'easy',
        video:{
          title:'How To: Switch Frontside 180',
          embedUrl:'https://www.youtube.com/embed/mr45Ih5QGSs',
          
        }
      },
      nollie: {
        type: 'advanced',
        difficulty: 'medium',
        video:{
          title:'HOW TO NOLLIE FRONTSIDE 180 THE EASIEST WAY TUTORIAL',
          embedUrl:'https://www.youtube.com/embed/jDgwtHKuTJc'
        }
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
        video: {
          embedUrl: 'https://www.youtube.com/embed/3E4uGtLd2KA',
          title: 'Neen Williams: Trickipedia - Frontside Shove-it',
        },
      },
      fakie: {
        type: 'advanced',
        difficulty: 'medium',
        video:{
          title:'HOW TO FAKIE FRONTSIDE SHOVE IT THE EASIEST WAY TUTORIAL!',
          embedUrl:'https://www.youtube.com/embed/bmerMAMed_c'
        }
      },
      switch: {
        type: 'advanced',
        difficulty: 'medium',
        video: {
          title: 'Switch Frontside Pop Shove - Sammy Baptista',
          embedUrl: 'https://www.youtube.com/embed/tmitqJFo-zM',
        },
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
        video:{
          title:'How to fakie backside pop shove it | Fakie Skateboard Trick',
          embedUrl:'https://www.youtube.com/embed/D7z8-EcoryA'
        }
      },
      switch: {
        type: 'advanced',
        difficulty: 'medium',
        video:{
          title:'How To Switch Pop Shove It, Keelan Dadd, Alli Sports Skateboard Step by Step',
          embedUrl:'https://www.youtube.com/embed/V1AjAyUlfjM',
        }
      },
      nollie: {
        type: 'advanced',
        difficulty: 'easy',
        video:{
          title:'How to Nollie BS Pop Shuv-It | Skate School Ep 72',
          embedUrl:'https://www.youtube.com/embed/YBdoZ3SAEHY',
        }
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
        video: {
          embedUrl: 'https://www.youtube.com/embed/TBKYXxZS6oc',
          title: 'PJ Ladd Flatground Fundamentals - Frontside Flip',
        },
      },
      fakie: {
        type: 'advanced',
        difficulty: 'hard',
        video: {
          title:
            'Chris Wimer: Trickipedia - Frontside Halfcab Kickflip',
          embedUrl: 'https://www.youtube.com/embed/6muajmY6NSY',
        },
      },
      switch: {
        type: 'advanced',
        difficulty: 'hard',
        video: {
          title: 'Switch Frontside Flip - Rodrigo Petersen',
          embedUrl: 'https://www.youtube.com/embed/JpRhR2ngHGA',
        },
      },
      nollie: {
        type: 'advanced',
        difficulty: 'hard',
        video: {
          title:
            'John Dilo: Trickipedia - Nollie Frontside 180 Kickflip',
          embedUrl: 'https://www.youtube.com/embed/ibhserraA_Y',
        },
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
        video: {
          embedUrl: 'https://www.youtube.com/embed/3PszEwzCfWE',
          title:
            'PJ Ladd Flatground Fundamentals - Backside Kickflip',
        },
      },
      fakie: {
        type: 'fundamental',
        difficulty: 'medium',
        video: {
          title: 'Sascha Daley: Trickipedia - Halfcab Kickflip',
          embedUrl: 'https://www.youtube.com/embed/3Vp4CBUmhPc',
        },
      },
      switch: {
        type: 'advanced',
        difficulty: 'hard',
        video:{
          title:'How-To Skateboarding: Switch Backside Flip with Cesar Fernandez',
          embedUrl:'https://www.youtube.com/embed/d9O6v4gv2PM',
        }
      },
      nollie: {
        type: 'advanced',
        difficulty: 'hard',
        video: {
          embedUrl: 'https://www.youtube.com/embed/LQwaGmoexVw',
          title:
            'TJ Rogers: Trickipedia - Nollie Backside 180 Kickflip',
        },
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
        video: {
          embedUrl: 'https://www.youtube.com/embed/aUZuZQmdajc',
          title: 'PJ Ladd Flatground Fundamentals - Frontside Flip',
        },
      },
      fakie: {
        type: 'advanced',
        difficulty: 'hard',
        video:{
          title:'How To: FAKIE FS HEELFLIP',
          embedUrl:'https://www.youtube.com/embed/3cwVnwS5OL8',
        }
      },
      switch: {
        type: 'advanced',
        difficulty: 'hard',
        video: {
          embedUrl: 'https://www.youtube.com/embed/14Zp70XhRq4',
          title:
            'Cyril Jackson: Trickipedia - Switch Frontside Heelflip',
        },
      },
      nollie: {
        type: 'advanced',
        difficulty: 'hard',
        video:{
          title:'How-To Skateboarding: Nollie Frontside Heelflips with Nate Principato',
          embedUrl:'https://www.youtube.com/embed/bqflN1Cs7hY',
        }
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
        video: {
          embedUrl: 'https://www.youtube.com/embed/AkPtUxpB1sk',
          title:
            'PJ Ladd Flatground Fundamentals - Backside Heelflip',
        },
      },
      fakie: {
        type: 'advanced',
        difficulty: 'medium',
        video: {
          title: 'Mason Silva: Trickipedia - Halfcab Heelflip',
          embedUrl: 'https://www.youtube.com/embed/6CQgr2Toj_M',
        },
      },
      switch: {
        type: 'advanced',
        difficulty: 'hard',
        video:{
          title:'TUTORIAL: Switch Backside Heelflip',
          embedUrl:'https://www.youtube.com/embed/-WHyaBtQcSc',
        }
      },
      nollie: {
        type: 'advanced',
        difficulty: 'hard',
        video: {
          title:
            'Trevor Colden: Trickipedia - Nollie Bs 180 Heelflip',
          embedUrl: 'https://www.youtube.com/embed/CES9ZK_4r6s',
        },
      },
    },
  },
  {
    name: '360 Flip (Tre flip)',
    area: 'flatground',
    variations: {
      regular: {
        type: 'advanced',
        difficulty: 'medium',
        video: {
          embedUrl: 'https://www.youtube.com/embed/tX-eBs674h4',
          title: 'PJ Ladd Flatground Fundamentals - Tre flip',
        },
      },
      fakie: {
        type: 'advanced',
        difficulty: 'medium',
        video:{
          title:'HOW TO FAKIE FLIP THE EASIEST WAY TUTORIAL!',
          embedUrl:'https://www.youtube.com/embed/DjUs5A9nL9I',
        }
      },
      switch: {
        type: 'advanced',
        difficulty: 'xhard',
        video: {
          title: 'Will Fyock: Trickipedia - Switch 360 Flip',
          embedUrl: 'https://www.youtube.com/embed/hm3IP6UWOlQ',
        },
      },
      nollie: {
        type: 'advanced',
        difficulty: 'xhard',
        video: {
          title: 'Jordan Maxham: Trickipedia - Nollie 360 Flip',
          embedUrl: 'https://www.youtube.com/embed/tbY2O1XfLnM',
        },
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
        video: {
          title: 'Frankie Heck: Trickipedia - Backside Bigspin',
          embedUrl: 'https://www.youtube.com/embed/y0qPjvUPStc',
        },
      },
      fakie: {
        type: 'fundamental',
        difficulty: 'easy',
        video: {
          title: 'Trevor Colden: Trickipedia - Fakie Bigspin',
          embedUrl: 'https://www.youtube.com/embed/x1wKQ-O-e4A',
        },
      },
      switch: {
        type: 'advanced',
        difficulty: 'xhard',
        video:{
          title:'How-To Skateboarding: Switch Big Spins with Spencer Nuzzi',
          embedUrl:'https://www.youtube.com/embed/R84dTWmZKFM',
        }
      },
      nollie: {
        type: 'advanced',
        difficulty: 'medium',
        video:{
          title:'How To Nollie Big Spin',
          embedUrl:'https://www.youtube.com/embed/x2gVP19qmuU'
        }
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
        video: {
          title: 'Mason Silva: Trickipedia - Frontside Bigspin',
          embedUrl: 'https://www.youtube.com/embed/F1rYesgmtas',
        },
      },
      fakie: {
        type: 'advanced',
        difficulty: 'medium',
        video:{
          title:'Fakie Frontside Bigspins with Kelly Fornez',
          embedUrl:'https://www.youtube.com/embed/8vWpjKtAb_4'
        }
      },
      switch: {
        type: 'advanced',
        difficulty: 'hard',
        video: {
          title:
            'Dominick Walker: Trickipedia - Switch Frontside Bigspin',
          embedUrl: 'https://www.youtube.com/embed/fbRBNZ4AxP8',
        },
      },
      nollie: {
        type: 'advanced',
        difficulty: 'medium',
        video:{
          title:'How to NOLLIE BACKSIDE BIGSPIN',
          embedUrl:'https://www.youtube.com/embed/v6RPBUNSqEM'
        }
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
        video: {
          title: 'Cyril Jackson: Trickipedia - Varial Kickflip',
          embedUrl: 'https://www.youtube.com/embed/KU9rxL-zDis',
        },
      },
      fakie: {
        type: 'fundamental',
        difficulty: 'medium',
        video:{
          title:'HOW TO FAKIE VARIAL FLIP THE EASIEST WAY TUTORIAL',
          embedUrl:'https://www.youtube.com/embed/tJs8462xpWg'
        }
      },
      switch: {
        type: 'advanced',
        difficulty: 'hard',
        video: {
          title: 'Kelly Hart: Trickipedia - Switch Varial Kickflip',
          embedUrl: 'https://www.youtube.com/embed/JG1XndVGH40',
        },
      },
      nollie: {
        type: 'advanced',
        difficulty: 'hard',
        video: {
          title: 'Cody Cepeda: Trickipedia - Nollie Varial Kickflip',
          embedUrl: 'https://www.youtube.com/embed/kAdCnntd8zg',
        },
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
        video: {
          embedUrl: 'https://www.youtube.com/embed/1zDEFaC2TwA',
          title: 'PJ Ladd Flatground Fundamentals - Varial Heelflip',
        },
      },
      fakie: {
        type: 'advanced',
        difficulty: 'hard',
        video:{
          title:'HOW TO VARIAL HEELFLIP THE EASIEST WAY TUTORIAL',
          embedUrl:'https://www.youtube.com/embed/iCyRLt3cM0o',
        }
      },
      switch: {
        type: 'advanced',
        difficulty: 'hard',
        video:{
          title:'How-to Skateboarding: Switch Varial Heelflip with Mike Piwowar',
          embedUrl:'https://www.youtube.com/embed/IrT712Xkg5Y'
        }
      },
      nollie: {
        type: 'advanced',
        difficulty: 'medium',
        video: {
          title: 'Kevin Romar - Trickipedia: Nollie Varial Heelflip',
          embedUrl: 'https://www.youtube.com/embed/w5NGBJO5_68',
        },
      },
    },
  },
  {
    name: 'Inward Heelflip',
    area: 'flatground',
    variations: {
      regular: {
        type: 'advanced',
        difficulty: 'hard',
        video: {
          embedUrl: 'https://www.youtube.com/embed/9LblU8Zg3VY',
          title: 'PJ Ladd Flatground Fundamentals - Inward Heelflip',
        },
      },
      fakie: {
        type: 'advanced',
        difficulty: 'hard',
        video:{
          title:'How-To Skateboarding: Fakie Inward Heelflip With Reuben Barrack',
          embedUrl:'https://www.youtube.com/embed/GEKFSHBYEZE'
        }
      },
      switch: {
        type: 'advanced',
        difficulty: 'xhard',
        video:{
          title:'SWITCH INWARD HEELFLIP SLOW MOTION',
          embedUrl:'https://www.youtube.com/embed/Hi48EnWF3W4'
        }
      },
      nollie: {
        type: 'advanced',
        difficulty: 'hard',
        video:{
          title:'How-To Skateboarding: Nollie Inward Heelflip with Max Taylor',
          embedUrl:'https://www.youtube.com/embed/4LWj3CRqvDo',
        }
      },
    },
  },
  {
    name: 'Hardflip',
    area: 'flatground',
    variations: {
      regular: {
        type: 'advanced',
        difficulty: 'hard',
        video: {
          embedUrl: 'https://www.youtube.com/embed/dA6YwPepX9g',
          title: 'PJ Ladd Flatground Fundamentals - Hardflip',
        },
      },
      fakie: {
        type: 'advanced',
        difficulty: 'xhard',
        video: {
          title: 'Carlos Iqui: Trickipedia - Fakie Hardflip',
          embedUrl: 'https://www.youtube.com/embed/8hEEB5Z5QgM',
        },
      },
      switch: {
        type: 'advanced',
        difficulty: 'xhard',
        video: {
          title: 'Diego Najera: Trickipedia - Switch Hardflip',
          embedUrl: 'https://www.youtube.com/embed/w0aR0t43JEI',
        },
      },
      nollie: {
        type: 'advanced',
        difficulty: 'xhard',
        video:{
          title:'How to Nollie Hardflip (The Key Secret)',
          embedUrl:'https://www.youtube.com/embed/wFd9es9spno',
        }
      },
    },
  },
  {
    name: 'Impossible',
    area: 'flatground',
    variations: {
      regular: {
        type: 'advanced',
        difficulty: 'medium',
        video:{
          title:'how to impossible',
          embedUrl:'https://www.youtube.com/embed/Fi7gPPN9zC8',
          
        }
      },
      fakie: {
        type: 'advanced',
        difficulty: 'medium',
        video:{
          title:'Fakie impossible trick tip',
          embedUrl:'https://www.youtube.com/embed/_NipV9FewPM',
        }
      },
      switch: {
        type: 'advanced',
        difficulty: 'hard',
        video: {
          title: 'Walker Ryan: Trickipedia - Switch Impossible',
          embedUrl: 'https://www.youtube.com/embed/5K1xsN05UIk',
        },
      },
      nollie: {
        type: 'advanced',
        difficulty: 'xhard',        
      },
    },
  },
  {
    name: 'Backside Bigspin Kickflip',
    area: 'flatground',
    variations: {
      regular: {
        type: 'advanced',
        difficulty: 'hard',
        video: {
          title: 'Will Fyock: Trickipedia - Bigspin Kickflip',
          embedUrl: 'https://www.youtube.com/embed/5SOwCNImoBQ',
        },
      },
      fakie: {
        type: 'advanced',
        difficulty: 'hard',
        video:{
          title:'Fakie Big Flip Tricktip',
          embedUrl:'https://www.youtube.com/embed/lIPGrRabAs0'
        }
      },
      switch: {
        type: 'advanced',
        difficulty: 'xhard',
        video: {
          title:
            'Brian Peacock: Trickipedia - Switch Bigspin Kickflip',
          embedUrl: 'https://www.youtube.com/embed/ZxWiU4Gjvcs',
        },
      },
      nollie: {
        type: 'advanced',
        difficulty: 'xhard',
        video: {
          title:
            'Michael Sommer: Trickipedia - Nollie Bigspin Kickflip',
          embedUrl: 'https://www.youtube.com/embed/i6UCzC-WqQo',
        },
      },
    },
  },
  {
    name: 'Frontside Bigspin Heelflip',
    area: 'flatground',
    variations: {
      regular: {
        type: 'advanced',
        difficulty: 'hard',
        video: {
          title:
            'Tom Rohrer: Trickipedia - Frontside Bigspin Heelflip',
          embedUrl: 'https://www.youtube.com/embed/_VWpWP2oH0E',
        },
      },
      fakie: {
        type: 'advanced',
        difficulty: 'hard',
        video: {
          title: 'Moose: Trickipedia - Fakie Bigspin Heelflip',
          embedUrl: 'https://www.youtube.com/embed/TyJW08HhrRQ',
        },
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
];

export const ledgeTricks: ReadonlyArray<Trick> = [
  {
    name: 'Frontside 50-50',
    area: 'ledges',
    variations: {
      regular: {
        type: 'fundamental',
        difficulty: 'easy',
        video: {
          title: 'Plan B - Prod Ledge Fundamentals #1. 50-50',
          embedUrl: 'https://www.youtube.com/embed/kCR4QAWR-Eo',
        },
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
       video: {
         title: 'Nike SB | How To Backside 50-50 | Nick Boserio',
         embedUrl: 'https://www.youtube.com/embed/mZVBMoGdwQU',
         
         
       }
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
        video:{
          title:'How to Backside Crooked Grind aka BS K-Grind | Skateboard Trick Tip | skatedeluxe',
          embedUrl:'https://www.youtube.com/embed/E2-aLE2HZ1w'
        }
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
        video:{
          title:'Frontside Crooked Grind',
          embedUrl:'https://www.youtube.com/embed/-6pSeeQqQHk',
        }
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
        video:{
          title:'How to 5-0 Grind (FS & BS) | Skateboard Trick Tip | skatedeluxe',
          embedUrl:'https://www.youtube.com/embed/A4Pvu3QarUU',
        }
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
