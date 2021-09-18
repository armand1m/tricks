import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Text,
  Image,
  Box,
  Badge,
  IconButton,
  HStack,
  Spacer,
  AspectRatio,
  Stack,
} from '@chakra-ui/react';
import { TrickCombination } from '../../data/tricks';

interface Props {
  hasLandedBefore: boolean;
  trickCombination: TrickCombination;
  onSuccess: () => void;
  onCancel: () => void;
}

export const TrickCard = ({
  hasLandedBefore,
  trickCombination,
  onSuccess,
  onCancel,
}: Props) => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="2xl">
      {!trickCombination.video && (
        <Image src="assets/images/no-video-available.jpg" />
      )}

      {trickCombination.video && (
        <Box width="sm">
          <AspectRatio maxW="560px" ratio={1}>
            <iframe
              allowFullScreen
              title={trickCombination.video.title}
              src={trickCombination.video.embedUrl}
            />
          </AspectRatio>
        </Box>
      )}

      <Stack p="6" spacing="2">
        <Box d="flex" alignItems="baseline">
          {!hasLandedBefore && (
            <Badge px="2" colorScheme="teal" borderRadius="full">
              New
            </Badge>
          )}

          <Box
            color="gray.500"
            fontSize="xs"
            fontWeight="semibold"
            letterSpacing="wide"
            textTransform="uppercase">
            {trickCombination.areas
              .map((area) => area)
              .join('&bull;')}
            &nbsp; &bull; &nbsp;
            {trickCombination.difficulty}
          </Box>
        </Box>

        <Text
          isTruncated
          fontSize="lg"
          fontWeight="semibold"
          lineHeight="tight">
          {trickCombination.name}
        </Text>

        <HStack>
          <IconButton
            icon={<CloseIcon />}
            aria-label="Skipping"
            colorScheme="red"
            onClick={onCancel}
          />
          <Spacer />
          <IconButton
            icon={<CheckIcon />}
            aria-label="Landed"
            colorScheme="green"
            onClick={onSuccess}
          />
        </HStack>
      </Stack>
    </Box>
  );
};
