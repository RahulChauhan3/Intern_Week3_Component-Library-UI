/** Joins class names, skipping falsy values: cx('a', false, 'b') -> 'a b' */
export const cx = (...names) => names.filter(Boolean).join(' ');
