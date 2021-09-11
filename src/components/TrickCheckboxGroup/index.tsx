import {
  Checkbox,
  CheckboxGroup,
  Heading,
  Stack,
} from '@chakra-ui/react';

import {
  TrickArea,
  getTrickAreaLabel,
  TrickCombination,
} from '../../data/tricks';

interface TrickCheckboxGroupProps {
  trickArea: TrickArea;
  trickList: ReadonlyArray<TrickCombination>;
}

export const TrickCheckboxGroup = ({
  trickArea,
  trickList,
}: TrickCheckboxGroupProps) => {
  return (
    <Stack>
      <Heading size="md">{getTrickAreaLabel(trickArea)}</Heading>
      <CheckboxGroup>
        <Stack>
          {trickList.map((trick) => (
            <Checkbox key={trick.name}>{trick.name}</Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </Stack>
  );
};
