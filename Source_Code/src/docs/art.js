// Small inline SVG illustrations so the demo needs no external images.
const svg = (a, b, shape) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="320" height="180" fill="url(#g)"/>${shape}</svg>`,
  )}`;

export const artHooks = svg(
  '#5b3df5',
  '#9b8cff',
  '<circle cx="110" cy="90" r="38" fill="none" stroke="#fff" stroke-width="8" opacity=".9"/><circle cx="210" cy="90" r="38" fill="none" stroke="#fff" stroke-width="8" opacity=".55"/>',
);
export const artRouting = svg(
  '#16161d',
  '#3b3a52',
  '<path d="M40 130 C 110 130, 110 50, 180 50 S 250 130, 285 60" fill="none" stroke="#9b8cff" stroke-width="8" stroke-linecap="round"/><circle cx="40" cy="130" r="11" fill="#fff"/><circle cx="285" cy="60" r="11" fill="#fff"/>',
);
