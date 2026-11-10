import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { cx } from '../cx.js';
import './Modal.css';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * Modal: an accessible dialog rendered in a portal on document.body.
 *
 * Behaviour
 * - role="dialog" + aria-modal, labelled by `title` (or `aria-label`)
 * - Focus moves into the dialog on open and returns to the trigger on close
 * - Tab / Shift+Tab are trapped inside the dialog
 * - Esc and clicking the backdrop call `onClose` (both can be turned off)
 * - Page scrolling is locked while open
 *
 * It is a controlled component: you own the `open` state.
 */
export default function Modal({
  open,
  onClose,
  title,
  description,
  size = 'md',
  closeOnEsc = true,
  closeOnOverlayClick = true,
  showCloseButton = true,
  initialFocusRef,
  footer,
  className,
  'aria-label': ariaLabel,
  children,
}) {
  const dialogRef = useRef(null);
  const pressStartedOnOverlay = useRef(false);
  const titleId = useId();
  const descriptionId = useId();

  // Keep the latest onClose without re-running the focus/scroll effect on every render.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return undefined;

    const dialog = dialogRef.current;
    const previouslyFocused = document.activeElement;

    // Lock page scroll without the layout shifting when the scrollbar disappears.
    const { overflow, paddingRight } = document.body.style;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

    // Initial focus: explicit ref, then [data-autofocus], then the dialog itself.
    const initialTarget =
      initialFocusRef?.current ?? dialog.querySelector('[data-autofocus]') ?? dialog;
    initialTarget.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && closeOnEsc) {
        event.stopPropagation();
        onCloseRef.current?.();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = Array.from(dialog.querySelectorAll(FOCUSABLE_SELECTOR));
      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === dialog)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [open, closeOnEsc, initialFocusRef]);

  if (!open) return null;

  // Only close when the press AND release both happen on the backdrop,
  // so selecting text inside the dialog and releasing outside does not dismiss it.
  const handleOverlayMouseDown = (event) => {
    pressStartedOnOverlay.current = event.target === event.currentTarget;
  };
  const handleOverlayClick = (event) => {
    if (closeOnOverlayClick && pressStartedOnOverlay.current && event.target === event.currentTarget) {
      onClose?.();
    }
    pressStartedOnOverlay.current = false;
  };

  return createPortal(
    <div className="ui-modal" onMouseDown={handleOverlayMouseDown} onClick={handleOverlayClick}>
      <div
        ref={dialogRef}
        className={cx('ui-modal__dialog', `ui-modal__dialog--${size}`, className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        aria-label={!title ? ariaLabel : undefined}
        tabIndex={-1}
      >
        {(title || showCloseButton) && (
          <div className="ui-modal__header">
            {title ? (
              <h2 id={titleId} className="ui-modal__title">
                {title}
              </h2>
            ) : (
              <span />
            )}
            {showCloseButton && (
              <button type="button" className="ui-modal__close" onClick={onClose} aria-label="Close dialog">
                <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
                  <path d="M5 5l10 10M15 5L5 15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
        )}

        <div className="ui-modal__body">
          {description && (
            <p id={descriptionId} className="ui-modal__description">
              {description}
            </p>
          )}
          {children}
        </div>

        {footer && <div className="ui-modal__footer">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}

Modal.propTypes = {
  /** Whether the modal is visible (controlled) */
  open: PropTypes.bool.isRequired,
  /** Called on Esc, backdrop click and the close button. Set `open` to false here. */
  onClose: PropTypes.func.isRequired,
  /** Dialog heading. Also used as the accessible name. */
  title: PropTypes.node,
  /** Short supporting text, announced by screen readers */
  description: PropTypes.node,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  closeOnEsc: PropTypes.bool,
  closeOnOverlayClick: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  /** Ref of the element to focus when the modal opens */
  initialFocusRef: PropTypes.shape({ current: PropTypes.any }),
  /** Actions, usually Buttons. Rendered in a sticky footer. */
  footer: PropTypes.node,
  className: PropTypes.string,
  /** Accessible name when no `title` is given */
  'aria-label': PropTypes.string,
  children: PropTypes.node,
};
