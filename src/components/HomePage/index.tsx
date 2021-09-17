import { useMemo, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import {
  Center,
  Heading,
  HStack,
  IconButton,
  Spacer,
  Stack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { ConfigurationDrawer } from '../ConfigurationDrawer';
import { userSettingsState } from '../../state/userSettings';
import { trickAreaMap } from '../../data/tricks';
import { mapTricksToTrickList } from '../../utils/trickCombination/mapTricksToTrickList';
import { TrickCard } from '../TrickCard';
import { flat } from '../../utils/array/flat';
import { shuffle } from '../../utils/array/shuffle';

export const HomePage = () => {
  const userSettings = useRecoilValue(userSettingsState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const openConfigButtonRef = useRef<HTMLButtonElement>(null);

  const trickList = useMemo(
    () =>
      shuffle(
        flat(
          userSettings.areas.map((area) => {
            const areaTrickList = trickAreaMap[area];
            return mapTricksToTrickList(areaTrickList, userSettings);
          })
        )
      ),
    [userSettings]
  );

  return (
    <Stack spacing={4}>
      <Stack spacing={2}>
        <HStack>
          <Heading size="2xl">Tricks</Heading>
          <Spacer />
          <IconButton
            aria-label="open-user-settings"
            icon={<SettingsIcon />}
            ref={openConfigButtonRef}
            size="lg"
            onClick={onOpen}
          />
        </HStack>

        <Heading size="md">
          Your personal skateboarding trainer
        </Heading>
      </Stack>

      <VStack>
        {trickList.map((trick) => (
          <Center>
            <TrickCard
              hasLandedBefore={true}
              trickCombination={trick}
            />
          </Center>
        ))}
      </VStack>

      <ConfigurationDrawer
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={openConfigButtonRef}
      />
    </Stack>
  );
};
