import PropTypes from 'prop-types';
import CodeBlock from './CodeBlock.jsx';

/** A titled live preview with the code that produces it. */
export default function Example({ title, children, code, column = false }) {
  return (
    <div className="example">
      <h3 className="example__title">{title}</h3>
      <div className={`example__preview${column ? ' example__preview--column' : ''}`}>{children}</div>
      <CodeBlock code={code} />
    </div>
  );
}

Example.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  code: PropTypes.string.isRequired,
  column: PropTypes.bool,
};
