import './sorting.scss';

import React, { ForwardedRef, useImperativeHandle, useRef, useState } from 'react';

interface SortingProps {
  cases: SortingItem[];
  data?: any;
  onClick?: (item: any[]) => void;
  ref: ForwardedRef<ImperativeHandle>;
}

export interface SortingItem {
  label: string;
  type: string;
  direction: 'asc' | 'desc';
}

export interface ImperativeHandle {
  uncheck: () => void;
}

// export const Sorting = (props: SortingProps): JSX.Element => {
export const Sorting = React.forwardRef<ImperativeHandle, SortingProps>((props, forwardedRef) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const items: SortingItem[] = props.cases;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, setSortItem] = useState(items[0]);
  const idGenerator = (): string => '_' + Math.random().toString(36).substr(2, 9);
  const id = idGenerator();
  const onClick = (item: SortingItem): void => {
    setSortItem(item);
    props.onClick && props.onClick(sort(item));
  };
  const sortObj = (list: any[], key: string): any[] => {
    function compare(x: { [keyer: string]: any }, y: { [keyer: string]: any }): any {
      const a = x[key];
      const b = y[key];
      const type = typeof a === 'string' || typeof b === 'string' ? 'string' : 'number';
      let result: any;

      if (type === 'string') result = a.toString().localeCompare(b.toString());
      else result = a - b;

      return result;
    }

    return list.sort(compare);
  };
  const sort = (item: SortingItem): any[] => {
    // const sorted = props.data.sort((a: { [x: string]: number }, b: { [x: string]: number }) => a[item.type] - b[item.type]);
    const sorted = sortObj(props.data, item.type);

    if (item.direction === 'desc') {
      sorted.reverse();
    }

    return sorted;
  };

  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  useImperativeHandle(forwardedRef, () => ({
    uncheck(): void {
      if (inputRef.current?.name) {
        document.getElementsByName(inputRef.current?.name).forEach((item) => ((item as HTMLInputElement).checked = false));
      }
    },
  }));

  return (
    <ul className="sorting-list">
      {items.map((item, key) => (
        <li key={key}>
          <input id={`${key}-${id}`} type="radio" name={id} onClick={(): void => onClick(item)} ref={inputRef} />
          <label htmlFor={`${key}-${id}`}>{item.label}</label>
        </li>
      ))}
    </ul>
  );
});
