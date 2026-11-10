import { useEffect, useRef, useState } from 'react';
import { Button, Card, Modal } from '../components/ui';
import Example from './Example.jsx';
import CodeBlock from './CodeBlock.jsx';
import { artHooks, artRouting } from './art.js';

const PlusIcon = (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M10 4v12M4 10h12" />
  </svg>
);
const ArrowIcon = (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 10h12M11 5l5 5-5 5" />
  </svg>
);

const sections = [
  { id: 'button', label: 'Button' },
  { id: 'card', label: 'Card' },
  { id: 'modal', label: 'Modal' },
];

export default function App() {
  const [openModal, setOpenModal] = useState(null); // 'basic' | 'confirm' | 'form' | 'long' | null
  const [deleting, setDeleting] = useState(false);
  const [saved, setSaved] = useState('');
  const [loadingDemo, setLoadingDemo] = useState(false);
  const nameRef = useRef(null);

  const close = () => setOpenModal(null);

  // Simulated request for the confirm dialog (shows Button's loading state).
  useEffect(() => {
    if (!deleting) return undefined;
    const id = setTimeout(() => {
      setDeleting(false);
      setOpenModal(null);
    }, 1200);
    return () => clearTimeout(id);
  }, [deleting]);

  useEffect(() => {
    if (!loadingDemo) return undefined;
    const id = setTimeout(() => setLoadingDemo(false), 1800);
    return () => clearTimeout(id);
  }, [loadingDemo]);

  const handleSave = (event) => {
    event.preventDefault();
    const value = new FormData(event.currentTarget).get('name').toString().trim();
    setSaved(value || 'Untitled');
    close();
  };

  return (
    <div className="docs">
      <aside className="docs__side">
        <p className="docs__brand">UI Kit</p>
        <nav aria-label="Components">
          <ul>
            {sections.map(({ id, label }) => (
              <li key={id}><a href={`#${id}`}>{label}</a></li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="docs__main">
        <header className="docs__intro">
          <h1>Button, Card and Modal</h1>
          <p className="docs__lead">
            Three reusable React components that share one set of design tokens. Everything below is
            rendered by the components themselves. Copy a snippet to use it.
          </p>
          <CodeBlock code={"import { Button, Card, Modal } from './components/ui';"} />
        </header>

        {/* ---------------- BUTTON ---------------- */}
        <section id="button" className="docs__section" aria-labelledby="button-h">
          <h2 id="button-h">Button</h2>
          <p className="docs__desc">
            Renders a <code>&lt;button&gt;</code>, or a link when you pass <code>href</code>.
          </p>

          <Example
            title="Variants"
            code={`<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>`}
          >
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </Example>

          <Example
            title="Sizes"
            code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
          >
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </Example>

          <Example
            title="States"
            code={`<Button loading={isSaving} onClick={save}>Save changes</Button>
<Button disabled>Disabled</Button>`}
          >
            <Button loading={loadingDemo} onClick={() => setLoadingDemo(true)}>
              {loadingDemo ? 'Saving…' : 'Save changes'}
            </Button>
            <Button disabled>Disabled</Button>
            <Button variant="outline" disabled>Disabled outline</Button>
          </Example>

          <Example
            title="Icons and links"
            code={`<Button leftIcon={<PlusIcon />}>New project</Button>
<Button variant="outline" rightIcon={<ArrowIcon />} href="#card">
  Go to cards
</Button>`}
          >
            <Button leftIcon={PlusIcon}>New project</Button>
            <Button variant="outline" rightIcon={ArrowIcon} href="#card">Go to cards</Button>
          </Example>

          <Example
            title="Full width"
            column
            code={`<Button fullWidth size="lg">Create account</Button>`}
          >
            <Button fullWidth size="lg">Create account</Button>
          </Example>
        </section>

        {/* ---------------- CARD ---------------- */}
        <section id="card" className="docs__section" aria-labelledby="card-h">
          <h2 id="card-h">Card</h2>
          <p className="docs__desc">
            A composable surface: <code>Card.Media</code>, <code>Card.Header</code>,{' '}
            <code>Card.Body</code> and <code>Card.Footer</code> are all optional.
          </p>

          <Example
            title="Variants"
            code={`<Card variant="elevated">
  <Card.Header title="Elevated" subtitle="Soft shadow" />
  <Card.Body>Use for content that sits above the page.</Card.Body>
</Card>

<Card variant="outlined"> … </Card>
<Card variant="filled"> … </Card>`}
          >
            <div className="cards">
              <Card variant="elevated">
                <Card.Header title="Elevated" subtitle="Soft shadow" />
                <Card.Body>Use for content that sits above the page.</Card.Body>
              </Card>
              <Card variant="outlined">
                <Card.Header title="Outlined" subtitle="Thin border" />
                <Card.Body>Use inside dense layouts where shadows add noise.</Card.Body>
              </Card>
              <Card variant="filled">
                <Card.Header title="Filled" subtitle="Tinted background" />
                <Card.Body>Use to group secondary information.</Card.Body>
              </Card>
            </div>
          </Example>

          <Example
            title="Media, header action and footer"
            code={`<Card as="article">
  <Card.Media src={image} alt="Two linked circles" />
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
</Card>`}
          >
            <div className="cards cards--2">
              <Card as="article">
                <Card.Media src={artHooks} alt="Two linked circles on a violet background" />
                <Card.Header
                  title="React hooks"
                  subtitle="Week 3"
                  action={<Button size="sm" variant="ghost">Save</Button>}
                />
                <Card.Body>Manage state with useState and side effects with useEffect, including cleanup.</Card.Body>
                <Card.Footer align="between">
                  <span className="muted">12 lessons</span>
                  <Button size="sm">Start</Button>
                </Card.Footer>
              </Card>
              <Card as="article">
                <Card.Media src={artRouting} alt="A curved route between two points" />
                <Card.Header title="Routing" subtitle="Week 3" action={<Button size="sm" variant="ghost">Save</Button>} />
                <Card.Body>Build multi-page apps with React Router, nested layouts and 404 routes.</Card.Body>
                <Card.Footer align="between">
                  <span className="muted">8 lessons</span>
                  <Button size="sm">Start</Button>
                </Card.Footer>
              </Card>
            </div>
          </Example>

          <Example
            title="Interactive (a whole-card link)"
            code={`<Card as="a" href="#modal" interactive variant="outlined">
  <Card.Header title="Jump to Modal" subtitle="Whole card is the link" />
  <Card.Body>Hover or tab to it to see the focus style.</Card.Body>
</Card>`}
          >
            <div className="cards cards--2">
              <Card as="a" href="#modal" interactive variant="outlined">
                <Card.Header title="Jump to Modal" subtitle="The whole card is the link" />
                <Card.Body>Hover it, or press Tab, to see the hover and focus styles.</Card.Body>
              </Card>
            </div>
          </Example>
        </section>

        {/* ---------------- MODAL ---------------- */}
        <section id="modal" className="docs__section" aria-labelledby="modal-h">
          <h2 id="modal-h">Modal</h2>
          <p className="docs__desc">
            A controlled dialog. Open it with state, close it in <code>onClose</code>. It traps focus,
            closes on <kbd>Esc</kbd> and backdrop click, locks page scroll and returns focus to the
            button that opened it.
          </p>

          <Example
            title="Basic"
            code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open modal</Button>

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Welcome"
  description="This is a basic dialog."
  footer={<Button onClick={() => setOpen(false)}>Got it</Button>}
>
  Press Esc, click outside, or use the close button.
</Modal>`}
          >
            <Button onClick={() => setOpenModal('basic')}>Open modal</Button>
          </Example>

          <Example
            title="Confirm a destructive action"
            code={`<Modal
  open={open}
  onClose={close}
  size="sm"
  title="Delete project?"
  closeOnOverlayClick={false}
  footer={
    <>
      <Button variant="outline" onClick={close}>Cancel</Button>
      <Button variant="danger" loading={deleting} onClick={remove}>Delete</Button>
    </>
  }
>
  This permanently removes the project and its files.
</Modal>`}
          >
            <Button variant="danger" onClick={() => setOpenModal('confirm')}>Delete project</Button>
          </Example>

          <Example
            title="Form with initial focus"
            code={`const nameRef = useRef(null);

<Modal open={open} onClose={close} title="Rename project" initialFocusRef={nameRef}>
  <form id="rename" onSubmit={save}>
    <input ref={nameRef} name="name" />
  </form>
</Modal>`}
          >
            <Button variant="secondary" onClick={() => setOpenModal('form')}>Rename project</Button>
            {saved && <span className="muted" role="status">Saved as “{saved}”</span>}
          </Example>

          <Example
            title="Large with scrolling content"
            code={`<Modal open={open} onClose={close} size="lg" title="Terms of use">
  {/* Long content scrolls inside the dialog; the header and footer stay put. */}
</Modal>`}
          >
            <Button variant="outline" onClick={() => setOpenModal('long')}>Open large modal</Button>
          </Example>
        </section>
      </main>

      {/* Modals live at the top level; they render into a portal on document.body. */}
      <Modal
        open={openModal === 'basic'}
        onClose={close}
        title="Welcome"
        description="This is a basic dialog."
        footer={<Button onClick={close}>Got it</Button>}
      >
        Press <kbd>Esc</kbd>, click outside, or use the close button. Focus returns to the button you
        used to open this.
      </Modal>

      <Modal
        open={openModal === 'confirm'}
        onClose={() => !deleting && close()}
        size="sm"
        title="Delete project?"
        closeOnOverlayClick={false}
        closeOnEsc={!deleting}
        footer={
          <>
            <Button variant="outline" onClick={close} disabled={deleting}>Cancel</Button>
            <Button variant="danger" loading={deleting} onClick={() => setDeleting(true)}>
              {deleting ? 'Deleting…' : 'Delete'}
            </Button>
          </>
        }
      >
        This permanently removes the project and all of its files. You can&rsquo;t undo this.
      </Modal>

      <Modal
        open={openModal === 'form'}
        onClose={close}
        title="Rename project"
        initialFocusRef={nameRef}
        footer={
          <>
            <Button variant="outline" onClick={close}>Cancel</Button>
            <Button type="submit" form="rename-form">Save name</Button>
          </>
        }
      >
        <form id="rename-form" onSubmit={handleSave} className="modal-form">
          <label htmlFor="project-name">Project name</label>
          <input id="project-name" name="name" ref={nameRef} defaultValue={saved || 'My first project'} autoComplete="off" />
        </form>
      </Modal>

      <Modal open={openModal === 'long'} onClose={close} size="lg" title="Terms of use"
        footer={<Button onClick={close}>I understand</Button>}>
        {Array.from({ length: 10 }, (_, i) => (
          <p key={i}>
            <strong>Section {i + 1}.</strong> This long block of text exists to show that the modal
            body scrolls on its own while the header and footer stay visible. Keyboard users can
            keep tabbing without leaving the dialog, and the page behind it does not move.
          </p>
        ))}
      </Modal>
    </div>
  );
}
