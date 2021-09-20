import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useAnimation } from 'framer-motion';
import styled from '@emotion/styled';

const StyledCard = styled(motion.div)`
  position: absolute;
  cursor: ${(props) => (props.drag ? 'grab' : 'auto')};

  &:active {
    cursor: ${(props) => (props.drag ? 'grabbing' : 'auto')};
  }
`;

export type CardProps = React.ComponentProps<typeof StyledCard> & {
  onVote: (vote: boolean) => void;
};

type Direction = 'left' | 'right';

const getDirection = (velocity: number): Direction | undefined => {
  if (velocity >= 1) {
    return 'right';
  }

  if (velocity <= -1) {
    return 'left';
  }

  return undefined;
};

export const Card: React.FC<CardProps> = ({
  onVote,
  children,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const positionX = useMotionValue(0);
  const animationControls = useAnimation();

  const [constrained, setConstrained] = useState(true);
  const [direction, setDirection] = useState<Direction>();
  const [velocity, setVelocity] = useState(0);

  const getNodes = () => {
    const node = ref.current;
    const parentNode = node?.parentNode as HTMLElement | null;

    return {
      node,
      parentNode,
    };
  };

  /**
   * Checks for the intersection between
   * the parent and the child rects and returns
   * the vote result based on which side
   * the card is being thrown to.
   */
  const getVote = () => {
    const { node, parentNode } = getNodes();

    if (!node || !parentNode) {
      return undefined;
    }

    const childRect = node.getBoundingClientRect();
    const parentRect = parentNode.getBoundingClientRect();

    if (parentRect.left >= childRect.right) {
      return false;
    }

    if (parentRect.right <= childRect.left) {
      return true;
    }

    return undefined;
  };

  const calculateTrajectory = () => {
    const velocity = positionX.getVelocity();
    const direction = getDirection(velocity);

    setVelocity(velocity);
    setDirection(direction);
  };

  const flyAwayDistance = (direction: Direction) => {
    const { node, parentNode } = getNodes();

    if (!node || !parentNode) {
      return 0;
    }

    const parentWidth =
      parentNode?.getBoundingClientRect().width ?? 0;
    const nodeWidth = node?.getBoundingClientRect().width ?? 0;

    return direction === 'left'
      ? -parentWidth / 2 - nodeWidth / 2
      : parentWidth / 2 + nodeWidth / 2;
  };

  const flyAway = (minForce: number) => {
    if (direction === undefined) {
      return;
    }

    if (Math.abs(velocity) < minForce) {
      return;
    }

    const distance = flyAwayDistance(direction);

    setConstrained(false);
    animationControls.start({
      x: distance,
    });
  };

  useEffect(() => {
    const unsubscribePositionX = positionX.onChange(() => {
      const vote = getVote();

      if (vote === undefined) {
        return;
      }

      onVote(vote);
    });

    return () => unsubscribePositionX();
  });

  const dragConstraints = constrained
    ? { left: 0, right: 0, top: 0, bottom: 0 }
    : {};

  return (
    <StyledCard
      {...props}
      style={{
        x: positionX,
        ...props.style,
      }}
      ref={ref}
      animate={animationControls}
      dragElastic={0.7}
      dragConstraints={dragConstraints}
      onDrag={calculateTrajectory}
      onDragEnd={() => flyAway(300)}
      whileTap={{ scale: props.drag ? 1.1 : 1 }}>
      {children}
    </StyledCard>
  );
};
