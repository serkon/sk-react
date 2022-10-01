import './slider.component.scss';

import React, { useEffect } from 'react';

export interface SliderProps {
  start?: number;
  count: number;
  reset?: number;
  onClick?: (count: number) => void;
}

/**
 * @param {number} start - start number of slider
 * @param {number} counter - how much step will be display
 * @param {number} reset - counting number when it change component will reset to initial value
 * @param {Function} onClick - event trigger when clicked items
 * Usage Example:
 *  const setColumn = (columns: number) => {
 *   dispatch(set_game_columns(columns));
 * };
 *  <Slider count={3} onClick={setColumn} reset={store.games?.reset} />
 */

export const Slider = React.forwardRef<number, SliderProps>(({ start = 2, count, onClick, reset, ...rest }, forwardedRef) => {
  const [steps, setSteps] = React.useState<number[]>([]);
  const [value, setValue] = React.useState<number>(count - 1);
  const [width, setWidth] = React.useState<number>(0);
  const handleClick = (value: number): void => {
    setValue(() => {
      if (forwardedRef && typeof forwardedRef !== 'undefined') {
        (forwardedRef as any).current = value + start;
      }
      calculateWidth(value);

      return value;
    });
    onClick && onClick(value + start);
  };
  const calculateWidth = (value: number): void => {
    const piece = count - 1 === 0 ? 1 : count - 1;
    const width = value > 0 ? (value * 100) / piece : 0;

    setWidth(width);
  };
  const resetToInitState = (): void => {
    setValue(count - 1);
  };

  useEffect(() => {
    const steps = Array.from({ length: count }, (x, i) => start + i);

    setSteps(steps);
    calculateWidth(count - 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, start]);

  useEffect(() => {
    if (reset) {
      resetToInitState();
      calculateWidth(count - 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

  return (
    <section className="steps-component" {...rest}>
      <div className="items">
        {steps.map((step, i) => (
          <div key={i} className={`item${i <= value ? ' selected' : ' '}`} onClick={(): void => handleClick(i)}>
            <span>{step}</span>
          </div>
        ))}
      </div>
      <div className="items-line-background" />
      <div className="items-line" style={{ width: width + '%' }} data-value={width} />
    </section>
  );
});
