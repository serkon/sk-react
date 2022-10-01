import './button.component.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconLeft?: string;
  iconRight?: string;
}

export const Button = ({ children, className, iconLeft, iconRight, ...rest }: ButtonProps): JSX.Element => (
  <button className={`button${className ? ` ${className}` : ''}${iconLeft ? ' icon-left with-icon' : iconRight ? 'icon-right with-icon' : ''}`} {...rest}>
    {children}
    {(iconLeft || iconRight) && <i className={`icon icon-${iconLeft || iconRight}`} />}
  </button>
);
