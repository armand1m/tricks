import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { useList } from 'react-use';
import {
  Button,
  Heading,
  HStack,
  IconButton,
  Spacer,
  Stack,
  useDisclosure,
  VStack,
  List,
  ListItem,
  ListIcon,
  SlideFade,
} from '@chakra-ui/react';
import {
  SettingsIcon,
  CheckCircleIcon,
  RepeatClockIcon,
} from '@chakra-ui/icons';
import { userSettingsState } from '../../state/userSettings';
import { trickAreaMap, TrickCombination } from '../../data/tricks';
import { flat } from '../../utils/array/flat';
import { shuffle } from '../../utils/array/shuffle';
import { mapTricksToTrickList } from '../../utils/trickCombination/mapTricksToTrickList';

import { Card } from '../Card';
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

  const [trickStack, trickStackActions] =
    useList<TrickCombination>(trickList);
  const [completed, completedActions] = useList<TrickCombination>([]);
  const [cancelled, cancelledActions] = useList<TrickCombination>([]);

  const onRestart = useCallback(() => {
    completedActions.clear();
    cancelledActions.clear();
    trickStackActions.set(shuffle(trickList));
  }, [
    trickList,
    trickStackActions,
    completedActions,
    cancelledActions,
  ]);

  const onVote = useCallback(
    (trick: TrickCombination, vote: boolean) => {
      trickStackActions.removeAt(trickStack.length - 1);

      const targetList = vote ? completedActions : cancelledActions;

      targetList.push(trick);
    },
    [
      trickStack,
      trickStackActions,
      completedActions,
      cancelledActions,
    ]
  );

  useEffect(() => {
    onRestart();
  }, [onRestart]);

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
        <VStack
          sx={{
            // Avoid events to reach components
            // when the sidebar is open
            // This is mainly because of video embeds
            pointerEvents: isOpen ? 'none' : 'auto',
          }}>
          {trickStack.map((trick, index) => {
            const isTop = index === trickStack.length - 1;
            const shouldHide = index < trickStack.length - 3;

            return (
              <Card
                id={trick.name}
                key={trick.name}
                drag={
                  isTop && userSettings.disableDraggingCards === false
                }
                hidden={shouldHide}
                onVote={(result) => onVote(trick, result)}>
                <SlideFade in={!shouldHide}>
                  <TrickCard
                    hasLandedBefore
                    trickCombination={trick}
                    onSuccess={() => {
                      onVote(trick, true);
                    }}
                    onCancel={() => {
                      onVote(trick, false);
                    }}
                  />
                </SlideFade>
              </Card>
            );
          })}
        </VStack>

        {trickStack.length === 0 && (
          <VStack pb={3}>
            <List spacing={3}>
              {completed.map((trick) => (
                <ListItem key={`completed-${trick.name}`}>
                  <ListIcon as={CheckCircleIcon} color="green.500" />
                  {trick.name}
                </ListItem>
              ))}

              {cancelled.map((trick) => (
                <ListItem key={`cancelled-${trick.name}`}>
                  <ListIcon as={RepeatClockIcon} color="yellow.500" />
                  {trick.name}
                </ListItem>
              ))}
            </List>
            <Button onClick={onRestart}>Restart</Button>
          </VStack>
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
