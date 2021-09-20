import { useCallback } from 'react';
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
  Stack,
  SimpleGrid,
  Switch,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRecoilState } from 'recoil';
import { userSettingsState } from '../../state/userSettings';
import {
  getDifficulty,
  getDifficultyLevelNumber,
  getTrickDifficultyLabel,
  TrickArea,
  trickAreaLabels,
  TrickStance,
  trickStanceLabels,
} from '../../data/tricks';

const userSettingsSchema = Yup.object({
  areas: Yup.array().min(1, 'Please choose at least one area.'),
  stances: Yup.array().min(1, 'Please select at least one stance.'),
  includeEasierTricks: Yup.boolean().default(false),
  disableDraggingCards: Yup.boolean().default(false),
  level: Yup.string()
    .oneOf(['easy', 'medium', 'hard', 'xhard'])
    .required('Please select a trick level'),
});

export const ConfigurationDrawer = (
  props: Omit<DrawerProps, 'children'>
) => {
  const { onClose } = props;

  const [userSettings, setUserSettings] =
    useRecoilState(userSettingsState);

  const formik = useFormik({
    initialValues: userSettings,
    validationSchema: userSettingsSchema,
    onSubmit: (values) => {
      setUserSettings(values);
      onClose();
    },
  });

  const resetForm = formik.resetForm;

  const onCancel = useCallback(() => {
    onClose();
    resetForm({
      values: userSettings,
    });
  }, [userSettings, onClose, resetForm]);

  return (
    <Drawer placement="right" size="sm" {...props}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>User Settings</DrawerHeader>
        <DrawerBody>
          <form
            id="user-settings-form"
            onSubmit={formik.handleSubmit}>
            <Stack spacing={6}>
              <FormControl id="level" pr={3}>
                <FormLabel>Level</FormLabel>
                <Slider
                  name="level"
                  aria-label="Difficulty Level"
                  value={getDifficultyLevelNumber(
                    formik.values.level
                  )}
                  min={0}
                  max={3}
                  onChange={(value) => {
                    formik.setFieldValue(
                      'level',
                      getDifficulty(value)
                    );
                  }}>
                  <SliderTrack bg="red.100">
                    <Box position="relative" right={10} />
                    <SliderFilledTrack bg="tomato" />
                  </SliderTrack>
                  <SliderThumb boxSize={6} position="relative">
                    <Box position="absolute" bottom={-7}>
                      <Text variant="bold">
                        {getTrickDifficultyLabel(formik.values.level)}
                      </Text>
                    </Box>
                  </SliderThumb>
                </Slider>
              </FormControl>

              <FormControl id="stance">
                <FormLabel>Stances</FormLabel>
                {formik.errors.stances && (
                  <Text fontSize="xs" color="red" mb={3}>
                    {formik.errors.stances}
                  </Text>
                )}
                <SimpleGrid minChildWidth="100px" spacing={3}>
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
                </SimpleGrid>
              </FormControl>

              <FormControl id="area">
                <FormLabel>Area</FormLabel>
                {formik.errors.areas && (
                  <Text fontSize="xs" color="red" mb={3}>
                    {formik.errors.areas}
                  </Text>
                )}
                <SimpleGrid minChildWidth="100px" spacing={3}>
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
                </SimpleGrid>
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="includeEasierTricks">
                  Include Easier Tricks
                </FormLabel>

                <Switch
                  id="includeEasierTricks"
                  isChecked={formik.values.includeEasierTricks}
                  onChange={(e) => {
                    formik.setFieldValue(
                      'includeEasierTricks',
                      e.target.checked
                    );
                  }}
                />
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="disableDraggingCards">
                  Disable Dragging Cards
                </FormLabel>

                <Switch
                  id="disableDraggingCards"
                  isChecked={formik.values.disableDraggingCards}
                  onChange={(e) => {
                    formik.setFieldValue(
                      'disableDraggingCards',
                      e.target.checked
                    );
                  }}
                />
              </FormControl>
            </Stack>
          </form>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onCancel}>
            Cancel
          </Button>
          <Button
            form="user-settings-form"
            type="submit"
            colorScheme="blue">
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
