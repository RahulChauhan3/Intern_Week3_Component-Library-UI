# React Component Library: Button, Card, Modal

**Task:** Week 3 – Component library UI
Build a reusable Button, Card and Modal component set and document usage in the README.

## Technologies and tools used

| Tool | Purpose |
| --- | --- |
| React 19 | Components, hooks, portals |
| Vite | Dev server and production build |
| prop-types | Prop validation and in-code documentation |
| Plain CSS + custom properties | Theming through design tokens, no UI framework |

## Project features

- Three components that share one set of **design tokens** (`tokens.css`), so a single override re-themes everything
- **Button**: 5 variants, 3 sizes, loading and disabled states, icons, renders as a link with `href`, forwards refs
- **Card**: composable (`Card.Media`, `Card.Header`, `Card.Body`, `Card.Footer`), 3 variants, polymorphic `as` prop, interactive mode
- **Modal**: accessible dialog in a portal with focus trap, Esc and backdrop close, scroll lock, focus restore, 3 sizes, scrolling body with fixed header/footer
- Keyboard accessible with visible focus rings, `prefers-reduced-motion` respected, responsive down to mobile
- A live documentation page (`npm run dev`) showing every variant next to a copyable code snippet

## Installation requirements

- [Node.js](https://nodejs.org/) 18 or newer
- npm

## Steps to run the project

```bash
cd Source_Code
npm install
npm run dev        # opens the live docs at http://localhost:5173
```

```bash
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

## Using the components in another project

Copy `src/components/ui/` into your project (it only needs `react`, `react-dom` and `prop-types`), then:

```jsx
import { Button, Card, Modal } from './components/ui';
```

Importing from `ui/index.js` also loads the design tokens.

---

# Usage documentation

## Button

```jsx
<Button>Save</Button>
<Button variant="outline" size="sm">Cancel</Button>
<Button variant="danger" loading={isDeleting} onClick={remove}>Delete</Button>
<Button leftIcon={<PlusIcon />}>New project</Button>
<Button href="/docs" variant="ghost">Read the docs</Button>
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Height and padding |
| `loading` | `boolean` | `false` | Shows a spinner, blocks clicks, sets `aria-busy`. The label stays so the width does not change |
| `disabled` | `boolean` | `false` | Disables the button |
| `fullWidth` | `boolean` | `false` | Stretches to the container width |
| `leftIcon` / `rightIcon` | `node` | none | Icon placed before or after the label (hidden from screen readers) |
| `href` | `string` | none | Renders an `<a>` styled as a button |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Button type. Defaults to `button` so it never submits a form by accident |
| `onClick` | `function` | none | Click handler |
| `className` | `string` | none | Extra class names |
| `children` | `node` | required | Label |

Any other props (`aria-*`, `data-*`, `form`, `name`, `ref`) are passed to the underlying element.

## Card

`Card` is a container. Put any of its four parts inside, in any order.

```jsx
<Card as="article" variant="elevated">
  <Card.Media src={cover} alt="Two linked circles" />
  <Card.Header
    title="React hooks"
    subtitle="Week 3"
    action={<Button size="sm" variant="ghost">Save</Button>}
  />
  <Card.Body>useState and useEffect, with cleanup.</Card.Body>
  <Card.Footer align="between">
    <span>12 lessons</span>
    <Button size="sm">Start</Button>
  </Card.Footer>
</Card>
```

A card that is a link:

```jsx
<Card as="a" href="/courses/hooks" interactive variant="outlined">
  <Card.Header title="React hooks" />
  <Card.Body>The whole card is clickable.</Card.Body>
</Card>
```

**`Card`**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'elevated' \| 'outlined' \| 'filled'` | `'elevated'` | Surface style |
| `interactive` | `boolean` | `false` | Adds hover and focus styles. Pair with `as="a"` + `href` or `as="button"` so it works with a keyboard |
| `as` | element type | `'div'` | Element to render, e.g. `'article'`, `'li'`, `'a'` |
| `className` | `string` | none | Extra class names |

**`Card.Media`**: `src`, `alt` (required when `src` is set), `ratio` (default `'16 / 9'`). Without `src` it renders its children, so you can place any media inside.

**`Card.Header`**: `title`, `subtitle`, `action` (node on the right), `titleAs` (heading element, default `'h3'`; pick the level that fits your page).

**`Card.Body`**: wraps the main content.

**`Card.Footer`**: `align` = `'start' | 'end' | 'between'` (default `'start'`).

## Modal

Modal is **controlled**: you hold the `open` state and set it to `false` in `onClose`.

```jsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open</Button>

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Delete project?"
  description="This cannot be undone."
  size="sm"
  footer={
    <>
      <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="danger" onClick={remove}>Delete</Button>
    </>
  }
>
  Optional body content.
</Modal>
```

Focus a specific field when it opens:

```jsx
const nameRef = useRef(null);
<Modal open={open} onClose={close} title="Rename" initialFocusRef={nameRef}>
  <input ref={nameRef} />
</Modal>
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | required | Whether the modal is visible |
| `onClose` | `function` | required | Called on Esc, backdrop click and the close button |
| `title` | `node` | none | Heading. Also the accessible name (`aria-labelledby`) |
| `description` | `node` | none | Supporting text, linked with `aria-describedby` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Max width: 400, 520 or 760 px |
| `closeOnEsc` | `boolean` | `true` | Close with the Escape key |
| `closeOnOverlayClick` | `boolean` | `true` | Close when the backdrop is clicked. Selecting text inside and releasing outside does **not** close it |
| `showCloseButton` | `boolean` | `true` | Shows the × button in the header |
| `initialFocusRef` | `ref` | none | Element to focus on open. Otherwise `[data-autofocus]`, otherwise the dialog |
| `footer` | `node` | none | Actions, rendered in a footer that stays visible while the body scrolls |
| `className` | `string` | none | Extra class on the dialog |
| `aria-label` | `string` | none | Accessible name when there is no `title` |

**Accessibility behaviour built in**

- `role="dialog"`, `aria-modal="true"`, labelled and described
- Focus moves into the dialog on open, is trapped while open (Tab and Shift+Tab), and returns to the element that opened it on close
- Page scroll is locked without the layout jumping
- Rendered in a portal on `document.body`, so it is not clipped by parent `overflow` or `z-index`

**Limitation:** one modal at a time. Stacking modals on top of each other is not supported.

## Theming

Override tokens on `:root` or on any wrapper element:

```css
:root {
  --ui-primary: #0b7a5b;
  --ui-primary-hover: #086247;
  --ui-radius-md: 6px;
}
```

Available tokens are listed in `src/components/ui/tokens.css`.

## Output description

Screenshots are in `Output/`:

| File | Shows |
| --- | --- |
| `01-overview-and-buttons.png` | Documentation page: intro and Button variants |
| `02-button-docs.png` | Full Button section: variants, sizes, states, icons |
| `03-card-docs.png` | Full Card section: variants, media card, interactive card |
| `04-modal-basic.png` | Basic modal |
| `05-modal-confirm.png` | Confirm dialog (small size, backdrop click disabled) |
| `06-button-loading-in-modal.png` | Button `loading` state inside the confirm dialog |
| `07-modal-large-scrolling.png` | Large modal with scrolling body and fixed footer |
| `08-mobile-modal.png` | Modal on a mobile viewport |

## Folder structure

```
Internship_Task/
├── Source_Code/
│   ├── public/favicon.svg
│   ├── src/
│   │   ├── components/ui/
│   │   │   ├── Button/    (Button.jsx, Button.css)
│   │   │   ├── Card/      (Card.jsx, Card.css)
│   │   │   ├── Modal/     (Modal.jsx, Modal.css)
│   │   │   ├── cx.js      (class name helper)
│   │   │   ├── tokens.css (design tokens)
│   │   │   └── index.js   (public exports)
│   │   ├── docs/          (live documentation page)
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── Output/                (screenshots)
└── README.md
```

## Live demo

Live link: _add your deployed URL here_
GitHub: _add your repository URL here_
