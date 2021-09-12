import { UserSettings } from '../../state/userSettings';
import {
  getDifficultyLevelNumber,
  TrickCombination,
} from '../../data/tricks';

export const matchUserSettings =
  (userSettings: UserSettings) => (combination: TrickCombination) => {
    const trickDifficultyLevel = getDifficultyLevelNumber(
      combination.difficulty
    );
    const settingsDifficultyLevel = getDifficultyLevelNumber(
      userSettings.level
    );

    const matchesDifficulty = userSettings.includeEasierTricks
      ? trickDifficultyLevel <= settingsDifficultyLevel
      : combination.difficulty === userSettings.level;

    const match =
      matchesDifficulty &&
      userSettings.stances.includes(combination.stance) &&
      userSettings.areas.filter((area) =>
        combination.areas.includes(area)
      ).length > 0;

    return match;
  };
