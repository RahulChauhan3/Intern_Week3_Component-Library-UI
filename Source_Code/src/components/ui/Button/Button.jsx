import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { cx } from '../cx.js';
import './Button.css';

/**
 * Button
 * Renders a <button>, or an <a> when `href` is provided.
 * Forwards its ref and any extra props (aria-*, data-*, name, form, ...).
 */
const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    href,
    type = 'button',
    className,
    onClick,
    children,
    ...rest
  },
  ref,
) {
  const isDisabled = disabled || loading;
  const classes = cx(
    'ui-btn',
    `ui-btn--${variant}`,
    `ui-btn--${size}`,
    fullWidth && 'ui-btn--full',
    loading && 'is-loading',
    className,
  );

  const content = (
    <>
      {loading ? (
        <span className="ui-btn__spinner" aria-hidden="true" />
      ) : (
        leftIcon && <span className="ui-btn__icon" aria-hidden="true">{leftIcon}</span>
      )}
      <span className="ui-btn__label">{children}</span>
      {rightIcon && !loading && (
        <span className="ui-btn__icon" aria-hidden="true">{rightIcon}</span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        ref={ref}
        href={isDisabled ? undefined : href}
        className={classes}
        role={isDisabled ? 'link' : undefined}
        aria-disabled={isDisabled || undefined}
        onClick={(event) => {
          if (isDisabled) event.preventDefault();
          else onClick?.(event);
        }}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      onClick={onClick}
      {...rest}
    >
      {content}
    </button>
  );
});

Button.propTypes = {
  /** Visual style */
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Shows a spinner and blocks clicks. The label stays so the width does not jump. */
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  /** When set, renders an <a> styled as a button */
  href: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Button;
