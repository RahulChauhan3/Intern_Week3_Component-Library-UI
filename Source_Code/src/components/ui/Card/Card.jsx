import PropTypes from 'prop-types';
import { cx } from '../cx.js';
import './Card.css';

/**
 * Card: a surface that groups related content.
 * Compose it with Card.Media, Card.Header, Card.Body and Card.Footer.
 *
 * <Card>
 *   <Card.Header title="Title" subtitle="Optional" />
 *   <Card.Body>Content</Card.Body>
 *   <Card.Footer>Actions</Card.Footer>
 * </Card>
 */
function Card({ variant = 'elevated', interactive = false, as: Tag = 'div', className, children, ...rest }) {
  return (
    <Tag
      className={cx('ui-card', `ui-card--${variant}`, interactive && 'ui-card--interactive', className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function CardMedia({ src, alt, ratio = '16 / 9', className, children }) {
  return (
    <div className={cx('ui-card__media', className)} style={{ aspectRatio: ratio }}>
      {src ? <img src={src} alt={alt} loading="lazy" /> : children}
    </div>
  );
}

function CardHeader({ title, subtitle, action, titleAs: Title = 'h3', className, children }) {
  return (
    <div className={cx('ui-card__header', className)}>
      <div className="ui-card__heading">
        {title && <Title className="ui-card__title">{title}</Title>}
        {subtitle && <p className="ui-card__subtitle">{subtitle}</p>}
        {children}
      </div>
      {action && <div className="ui-card__action">{action}</div>}
    </div>
  );
}

function CardBody({ className, children }) {
  return <div className={cx('ui-card__body', className)}>{children}</div>;
}

function CardFooter({ align = 'start', className, children }) {
  return <div className={cx('ui-card__footer', `ui-card__footer--${align}`, className)}>{children}</div>;
}

Card.propTypes = {
  variant: PropTypes.oneOf(['elevated', 'outlined', 'filled']),
  /** Adds hover and focus styles. Pair with as="a" (with href) or as="button" so it is keyboard reachable. */
  interactive: PropTypes.bool,
  /** Element or component to render, e.g. "article", "a", "li" */
  as: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.node,
};

CardMedia.propTypes = {
  src: PropTypes.string,
  /** Required when `src` is set. Use "" only for purely decorative images. */
  alt: (props, propName, componentName) => {
    if (props.src && typeof props[propName] !== 'string') {
      return new Error(`${componentName}: "alt" is required when "src" is provided.`);
    }
    return null;
  },
  ratio: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

CardHeader.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  /** Node shown on the right, e.g. a Button or menu */
  action: PropTypes.node,
  /** Heading element used for the title */
  titleAs: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.node,
};

CardBody.propTypes = { className: PropTypes.string, children: PropTypes.node };

CardFooter.propTypes = {
  align: PropTypes.oneOf(['start', 'end', 'between']),
  className: PropTypes.string,
  children: PropTypes.node,
};

Card.Media = CardMedia;
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
