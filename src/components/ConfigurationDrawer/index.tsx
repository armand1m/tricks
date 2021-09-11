import {
  Button,
  Text,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
  Slider,
  SliderTrack,
  Box,
  SliderFilledTrack,
  SliderThumb,
  FormControl,
  FormLabel,
  ButtonGroup,
  Stack,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRecoilState } from 'recoil';
import { userSettingsState } from '../../state/userSettings';
import {
  getTrickDifficultyLabel,
  TrickArea,
  trickAreaLabels,
  TrickDifficulty,
  TrickStance,
  trickStanceLabels,
} from '../../data/tricks';

const userSettingsSchema = Yup.object({
  areas: Yup.array().min(1, 'Please choose at least one area.'),
  stances: Yup.array().min(1, 'Please select at least one stance.'),
  level: Yup.string()
    .oneOf(['easy', 'medium', 'hard', 'xhard'])
    .required('Please select a trick level'),
});

const difficultyArray = ['easy', 'medium', 'hard', 'xhard'];

const getDifficultyLevelNumber = (difficulty: TrickDifficulty) => {
  return difficultyArray.indexOf(difficulty);
};

const getDifficulty = (levelNumber: number) => {
  return difficultyArray[levelNumber];
};

export const ConfigurationDrawer = (
  props: Omit<DrawerProps, 'children'>
) => {
  const [userSettings, setUserSettings] =
    useRecoilState(userSettingsState);

  const formik = useFormik({
    initialValues: userSettings,
    validationSchema: userSettingsSchema,
    onSubmit: (values) => {
      setUserSettings(values);
    },
  });

  return (
    <Drawer placement="right" size="sm" {...props}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>User Settings</DrawerHeader>

        <DrawerBody>
          <Stack spacing={6}>
            <FormControl id="level" pr={3}>
              <FormLabel>Level</FormLabel>
              <Slider
                name="level"
                aria-label="Difficulty Level"
                value={getDifficultyLevelNumber(formik.values.level)}
                min={0}
                max={3}
                onChange={(value) => {
                  formik.setFieldValue('level', getDifficulty(value));
                }}>
                <SliderTrack bg="red.100">
                  <Box position="relative" right={10} />
                  <SliderFilledTrack bg="tomato" />
                </SliderTrack>
                <SliderThumb boxSize={6} position="relative">
                  <Box position="absolute" bottom={-7}>
                    <Text>
                      {getTrickDifficultyLabel(formik.values.level)}
                    </Text>
                  </Box>
                </SliderThumb>
              </Slider>
            </FormControl>

            <FormControl id="stance">
              <FormLabel>Stances</FormLabel>
              <ButtonGroup isAttached>
                {Object.entries(trickStanceLabels).map(
                  ([stanceKey, stanceLabel]) => {
                    const key = stanceKey as TrickStance;
                    const stances = formik.values.stances;
                    const active = stances.includes(key);

                    return (
                      <Button
                        isActive={active}
                        onClick={() => {
                          const selectedStances = active
                            ? stances.filter(
                                (stance) => stance !== key
                              )
                            : stances.concat(key);

                          formik.setFieldValue(
                            'stances',
                            selectedStances
                          );
                        }}>
                        {stanceLabel}
                      </Button>
                    );
                  }
                )}
              </ButtonGroup>
            </FormControl>

            <FormControl id="area">
              <FormLabel>Area</FormLabel>
              <ButtonGroup isAttached>
                {Object.entries(trickAreaLabels).map(
                  ([areaKey, areaLabel]) => {
                    const key = areaKey as TrickArea;
                    const areas = formik.values.areas;
                    const active = areas.includes(key);

                    return (
                      <Button
                        isActive={active}
                        onClick={() => {
                          const selectedAreas = active
                            ? areas.filter((area) => area !== key)
                            : areas.concat(key);

                          formik.setFieldValue(
                            'areas',
                            selectedAreas
                          );
                        }}>
                        {areaLabel}
                      </Button>
                    );
                  }
                )}
              </ButtonGroup>
            </FormControl>
          </Stack>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={props.onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              formik.handleSubmit();
              props.onClose();
            }}
            colorScheme="blue">
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
