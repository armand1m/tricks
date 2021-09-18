import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { useList } from 'react-use';
import {
  Text,
  Button,
  Center,
  Heading,
  HStack,
  IconButton,
  SlideFade,
  Spacer,
  Stack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { userSettingsState } from '../../state/userSettings';
import { trickAreaMap, TrickCombination } from '../../data/tricks';
import { flat } from '../../utils/array/flat';
import { shuffle } from '../../utils/array/shuffle';
import { useQueue } from '../../utils/hooks/useQueue';
import { mapTricksToTrickList } from '../../utils/trickCombination/mapTricksToTrickList';

import { TrickCard } from '../TrickCard';
import { ConfigurationDrawer } from '../ConfigurationDrawer';

export const HomePage = () => {
  const userSettings = useRecoilValue(userSettingsState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const openConfigButtonRef = useRef<HTMLButtonElement>(null);

  const userTricks = useMemo(() => {
    return userSettings.areas.map((area) => {
      const areaTrickList = trickAreaMap[area];
      return mapTricksToTrickList(areaTrickList, userSettings);
    });
  }, [userSettings]);

  const trickList = useMemo(
    () => shuffle(flat(userTricks)),
    [userTricks]
  );

  const [trickQueue, trickQueueActions] = useQueue(trickList);
  const [completed, completedActions] = useList<TrickCombination>([]);
  const [cancelled, cancelledActions] = useList<TrickCombination>([]);

  const onRestart = useCallback(() => {
    completedActions.clear();
    cancelledActions.clear();
    trickQueueActions.replace(shuffle(trickList));
  }, [
    trickList,
    completedActions,
    cancelledActions,
    trickQueueActions,
  ]);

  useEffect(() => {
    onRestart();
  }, [trickList, onRestart]);

  console.log({
    completed,
    cancelled,
  });

  return (
    <Stack spacing={4}>
      <Stack spacing={2}>
        <HStack>
          <Heading size="2xl">Tricks</Heading>
          <Spacer />
          <IconButton
            size="lg"
            aria-label="open-user-settings"
            icon={<SettingsIcon />}
            ref={openConfigButtonRef}
            onClick={onOpen}
          />
        </HStack>

        <Heading size="md">
          Your personal skateboarding trainer
        </Heading>
      </Stack>

      <VStack>
        {trickQueue.size === 0 && (
          <>
            <Text size="md">
              Well, that's it. Tweak the settings to see some new
              tricks or press the button below to start again.
            </Text>
            <Button onClick={onRestart}>Restart</Button>
          </>
        )}

        {trickQueue.first && (
          <Center>
            <SlideFade in={trickQueue.first !== undefined}>
              <TrickCard
                hasLandedBefore={true}
                trickCombination={trickQueue.first}
                onSuccess={() => {
                  const removedTrick = { ...trickQueue.first };
                  trickQueueActions.remove();
                  completedActions.push(removedTrick);
                }}
                onCancel={() => {
                  const removedTrick = { ...trickQueue.first };
                  trickQueueActions.remove();
                  cancelledActions.push(removedTrick);
                }}
              />
            </SlideFade>
          </Center>
        )}
      </VStack>

      <ConfigurationDrawer
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={openConfigButtonRef}
      />
    </Stack>
  );
};
