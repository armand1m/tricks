import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useAnimation } from 'framer-motion';
import styled from '@emotion/styled';

const StyledCard = styled(motion.div)`
  position: absolute;
`;

type CardProps = React.ComponentProps<typeof StyledCard> & {
  id: string;
  onVote: (arg: boolean) => void;
};

export const Card: React.FC<CardProps> = ({
  children,
  style,
  onVote,
  id,
  ...props
}) => {
  const cardElem = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const controls = useAnimation();

  const [constrained, setConstrained] = useState(true);
  const [direction, setDirection] = useState<'right' | 'left'>();
  const [velocity, setVelocity] = useState(0);

  const getVote = (
    childNode: HTMLElement | null,
    parentNode: HTMLElement | null
  ) => {
    if (!childNode || !parentNode) {
      return undefined;
    }

    const childRect = childNode.getBoundingClientRect();
    const parentRect = parentNode.getBoundingClientRect();
    const result =
      parentRect.left >= childRect.right
        ? false
        : parentRect.right <= childRect.left
        ? true
        : undefined;

    return result;
  };

  const getDirection = () => {
    return velocity >= 1
      ? 'right'
      : velocity <= -1
      ? 'left'
      : undefined;
  };

  const getTrajectory = () => {
    setVelocity(x.getVelocity());
    setDirection(getDirection());
  };

  const flyAwayDistance = (direction: 'left' | 'right') => {
    const parentNode = cardElem.current?.parentNode as HTMLElement;
    const parentWidth = parentNode?.getBoundingClientRect().width;
    const childWidth =
      cardElem.current?.getBoundingClientRect().width ?? 0;
    return direction === 'left'
      ? -parentWidth / 2 - childWidth / 2
      : parentWidth / 2 + childWidth / 2;
  };

  const flyAway = (min: number) => {
    if (direction && Math.abs(velocity) > min) {
      setConstrained(false);
      controls.start({
        x: flyAwayDistance(direction),
      });
    }
  };

  useEffect(() => {
    const unsubscribeX = x.onChange(() => {
      const childNode = cardElem.current;
      const parentNode = childNode?.parentNode as HTMLElement;
      const result = getVote(childNode, parentNode);
      result !== undefined && onVote(result);
    });

    return () => unsubscribeX();
  });

  return (
    <StyledCard
      animate={controls}
      dragConstraints={
        constrained && { left: 0, right: 0, top: 0, bottom: 0 }
      }
      dragElastic={0.7}
      ref={cardElem}
      style={{ x, pointerEvents: props.drag ? 'auto' : 'none' }}
      onDrag={getTrajectory}
      onDragEnd={() => flyAway(900)}
      whileTap={{ scale: 1.1 }}
      {...props}>
      {children}
    </StyledCard>
  );
};
