import { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import {
  Box,
  Button,
  Heading,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { ConfigurationDrawer } from '../ConfigurationDrawer';
import { TrickCheckboxGroup } from '../TrickCheckboxGroup';
import { userSettingsState } from '../../state/userSettings';
import { trickAreaMap } from '../../data/tricks';
import { mapTricksToTrickList } from '../../utils/trickCombination/mapTricksToTrickList';

export const HomePage = () => {
  const userSettings = useRecoilValue(userSettingsState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const openConfigButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Stack spacing={4}>
      <Stack spacing={2}>
        <Heading size="2xl">Tricks</Heading>
        <Heading size="md">
          Your personal skateboarding trainer
        </Heading>
      </Stack>

      <Box>
        <Button ref={openConfigButtonRef} onClick={onOpen}>
          Configuration
        </Button>
      </Box>

      <Stack>
        {userSettings.areas.map((area) => {
          const areaTrickList = trickAreaMap[area];
          const trickList = mapTricksToTrickList(
            areaTrickList,
            userSettings
          );

          return (
            <TrickCheckboxGroup
              trickArea={area}
              trickList={trickList}
            />
          );
        })}
      </Stack>

      <ConfigurationDrawer
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={openConfigButtonRef}
      />
    </Stack>
  );
};
