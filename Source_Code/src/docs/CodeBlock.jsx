import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const id = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      /* clipboard unavailable (e.g. insecure context): the code is still selectable */
    }
  };

  return (
    <div className="code">
      <button type="button" className="code__copy" onClick={copy}>
        {copied ? 'Copied' : 'Copy'}
      </button>
      <pre tabIndex={0}><code>{code}</code></pre>
    </div>
  );
}

CodeBlock.propTypes = { code: PropTypes.string.isRequired };
