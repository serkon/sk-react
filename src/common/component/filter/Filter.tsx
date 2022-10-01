import './filter.scss';

import { useEffect, useRef, useState } from 'react';

interface FilterProps {
  placeholder: string;
  path?: string;
  data: any[] | null;
  debounce?: number;
  reset?: number;
  onClick?: (items: any[]) => void;
}

export const Filter = (props: FilterProps): JSX.Element => {
  let timeout: number;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { data, placeholder, path, debounce } = props;
  const [filtered, setFiltered] = useState<any[] | null>(data);
  const [selected, setSelected] = useState<any[]>([]);
  const [init, setInit] = useState<boolean>(false);
  const idGenerator = (): string => '_' + Math.random().toString(36).substr(2, 9);
  const id = idGenerator();
  const filter = (): void => {
    const value = inputRef.current?.value;

    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      if (typeof value === 'string' && value?.length >= 0) {
        const found = data?.filter((item) => (path ? item[path] : item).toLowerCase().includes(value.toLowerCase())) || [];

        setFiltered(found);
      }
    }, debounce || 800);
  };
  const pushSelected = (item: any): void => {
    const foundItem = selected.find((s) => s === item);
    let list = [...selected];

    foundItem ? (list = list.filter((s) => s !== foundItem)) : list.push(item as never);
    setSelected(list);
    setInit(true);
  };
  const isSelected = (item: any): boolean => !!selected.find((s) => item === s);
  const resetToInitState = (): void => {
    setSelected([]);
  };

  useEffect(() => {
    if (init) {
      props.onClick && props.onClick(selected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useEffect(() => {
    setFiltered(data);
  }, [data]);

  useEffect(() => {
    if (props.reset) {
      resetToInitState();
    }
  }, [props.reset]);

  return (
    <section className="filter-component">
      <input ref={inputRef} onChange={filter} className="filter" placeholder={placeholder} hidden />
      <ul className="filter-list">
        {filtered &&
          filtered.map((item: any, key: number) => (
            <li key={key}>
              <input id={`${key}-${id}`} type="checkbox" onChange={(): void => pushSelected(item)} checked={isSelected(item)} />
              <label htmlFor={`${key}-${id}`}>{item.name}</label>
            </li>
          ))}
      </ul>
    </section>
  );
};
