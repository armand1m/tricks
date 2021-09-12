import { atom } from 'recoil';
import { persistAtom } from './effects/persistAtom';
import {
  TrickArea,
  TrickDifficulty,
  TrickStance,
} from '../data/tricks';

export interface UserSettings {
  level: TrickDifficulty;
  includeEasierTricks: boolean;
  stances: TrickStance[];
  areas: TrickArea[];
}

export const userSettingsState = atom<UserSettings>({
  key: 'userSettings',
  effects_UNSTABLE: [persistAtom],
  default: {
    level: 'easy',
    includeEasierTricks: false,
    stances: ['regular', 'fakie'],
    areas: ['flatground'],
  },
});
