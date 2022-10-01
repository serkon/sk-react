interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className: string;
}

export const Header = ({ children, ...rest }: HeaderProps): JSX.Element => <header {...rest}>{children}</header>;
