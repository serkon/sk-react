import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinkItem } from 'src/common/dto/dto';

export const useSetTitle = (title: string): void => {
  useEffect(() => {
    const prevTitle = document.title;

    document.title = title;

    return () => {
      document.title = prevTitle;
    };
  }, [title]);
};

export const useProcess = (): any => process.env;

/**
 * Redirections
 */
export const useDirection = (): ((item: LinkItem) => void) => {
  const navigate = useNavigate();
  const direction = React.useCallback(
    (item: LinkItem): void => {
      item.external ? window.open(item.to, '_blank') : navigate(item.to);
    },
    [navigate],
  );

  return direction;
};
