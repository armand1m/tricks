import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
} from '@chakra-ui/react';
import {
  SettingsIcon,
  CheckCircleIcon,
  RepeatClockIcon,
} from '@chakra-ui/icons';
import { userSettingsState } from '../../state/userSettings';
import { trickAreaMap, TrickCombination } from '../../data/tricks';
import { pop } from '../../utils/array/pop';
import { flat } from '../../utils/array/flat';
import { shuffle } from '../../utils/array/shuffle';
import { mapTricksToTrickList } from '../../utils/trickCombination/mapTricksToTrickList';

import { CardStack } from '../CardStack';
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

  const [trickStack, setTrickStack] = useState(trickList);
  const [completed, completedActions] = useList<TrickCombination>([]);
  const [cancelled, cancelledActions] = useList<TrickCombination>([]);

  const onRestart = useCallback(() => {
    completedActions.clear();
    cancelledActions.clear();
    setTrickStack(shuffle(trickList));
  }, [trickList, setTrickStack, completedActions, cancelledActions]);

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

      <VStack
        sx={{
          pointerEvents: isOpen ? 'none' : 'auto',
        }}>
        <CardStack
          tricks={trickStack}
          onVote={(trick, vote) => {
            setTrickStack(pop(trickStack));

            const targetList = vote
              ? completedActions
              : cancelledActions;

            targetList.push(trick);
          }}
        />

        {trickStack.length === 0 && (
          <>
            <List spacing={3}>
              {completed.map((trick) => (
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="green.500" />
                  {trick.name}
                </ListItem>
              ))}

              {cancelled.map((trick) => (
                <ListItem>
                  <ListIcon as={RepeatClockIcon} color="yellow.500" />
                  {trick.name}
                </ListItem>
              ))}
            </List>
            <Button onClick={onRestart}>Restart</Button>
          </>
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
