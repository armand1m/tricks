import { getTrickCombinations, Trick } from '../../data/tricks';
import { UserSettings } from '../../state/userSettings';
import { flat } from '../array/flat';
import { matchUserSettings } from './matchesUserSettings';

export const mapTricksToTrickList = (
  tricks: readonly Trick[],
  userSettings: UserSettings
) => {
  const trickCombinationList = tricks.map(getTrickCombinations);

  return flat(trickCombinationList).filter(
    matchUserSettings(userSettings)
  );
};
