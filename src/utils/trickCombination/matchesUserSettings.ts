import { UserSettings } from '../../state/userSettings';
import { TrickCombination } from '../../data/tricks';

export const matchUserSettings =
  (userSettings: UserSettings) => (combination: TrickCombination) => {
    /**
     * TODO: we need to match for the config
     * areas as well.
     *
     * We also gotta setup a default config, otherwise
     * no tricks might be shown
     */
    const match =
      combination.difficulty === userSettings.level &&
      userSettings.stances.includes(combination.stance) &&
      userSettings.areas.filter((area) =>
        combination.areas.includes(area)
      ).length > 0;

    return match;
  };
