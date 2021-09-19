import { Box, SlideFade } from '@chakra-ui/react';
import { Card } from '../Card';
import { TrickCombination } from '../../data/tricks';
import { TrickCard } from '../TrickCard';

export interface CardStackProps {
  tricks: readonly TrickCombination[];
  onVote: (trick: TrickCombination, vote: boolean) => void;
}

export const CardStack: React.FC<CardStackProps> = ({
  tricks,
  onVote,
}) => {
  return (
    <Box width="100%">
      {tricks.map((trick, index) => {
        const isTop = index === tricks.length - 1;
        const shouldHide = index < tricks.length - 2;

        return (
          <Card
            id={trick.name}
            key={trick.name}
            drag={isTop}
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
    </Box>
  );
};
