import { useState } from 'react'
import { Button, ComboBox, ContextMenu, Dialog, Input } from '../../../src'

export function DialogSection() {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialog2Open, setDialog2Open] = useState(false)
    const [dialog3Open, setDialog3Open] = useState(false)
    const [dialog4Open, setDialog4Open] = useState(false)
    const [outerOpen, setOuterOpen] = useState(false)
    const [innerOpen, setInnerOpen] = useState(false)
    const [innerCombo, setInnerCombo] = useState<string | undefined>('opt1')
    const [innerMenuOpen, setInnerMenuOpen] = useState(false)
    const [innerMenuAnchor, setInnerMenuAnchor] = useState<HTMLButtonElement | null>(null)

    return (
        <>
            <section className="dev-section">
                <h2>Dialog Variants</h2>
                <p style={{ marginBottom: 16, color: 'var(--nc-text-weak)' }}>
                    By default, dialogs render inline with absolute positioning.
                    Use <code>fullScreen=true</code> to render via portal for full viewport centering.
                </p>
                <div className="dev-row">
                    <Button onClick={() => setDialogOpen(true)}>
                        Open Dialog (OK/Cancel)
                    </Button>
                    <Button onClick={() => setDialog2Open(true)}>
                        Save/Cancel Dialog
                    </Button>
                    <Button variant="danger" onClick={() => setDialog3Open(true)}>
                        Delete Dialog
                    </Button>
                </div>
            </section>

            <section className="dev-section">
                <h2>Inline Dialog (fullScreen=false)</h2>
                <p style={{ marginBottom: 16, color: 'var(--nc-text-weak)' }}>
                    This dialog renders inline within the container below, not as a viewport overlay.
                </p>
                <div style={{
                    position: 'relative',
                    border: '2px dashed var(--nc-border)',
                    borderRadius: 8,
                    padding: 20,
                    height: 320,
                    overflowY: 'auto',
                    background: 'var(--nc-bg-secondary)',
                }}>
                    <Button onClick={() => setDialog4Open(true)}>
                        Open Inline Dialog
                    </Button>
                    {Array.from({ length: 12 }, (_, i) => (
                        <p key={i} style={{ marginTop: 16, color: 'var(--nc-text-weak)' }}>
                            Scrollable content line {i + 1} — scroll down to the bottom and open the
                            dialog from there.
                        </p>
                    ))}
                    <Button onClick={() => setDialog4Open(true)} style={{ marginTop: 16 }}>
                        Open Inline Dialog (at bottom)
                    </Button>
                    <Dialog
                        open={dialog4Open}
                        onClose={() => setDialog4Open(false)}
                        title="Inline Dialog"
                        footerType="close"
                        fullScreen={false}
                    >
                        <p>This dialog is rendered inline within its parent container, not via portal.</p>
                        <p style={{ marginTop: 8, color: 'var(--nc-text-weak)' }}>
                            Useful for nested contexts or when you need the dialog scoped to a specific area.
                        </p>
                    </Dialog>
                </div>
            </section>

            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                title="Confirm Action"
                footerType="ok-cancel"
                onOk={() => {
                    alert('OK clicked')
                    setDialogOpen(false)
                }}
                fullScreen={true}
            >
                <p>Are you sure you want to proceed with this action?</p>
            </Dialog>

            <Dialog
                open={dialog2Open}
                onClose={() => setDialog2Open(false)}
                title="Edit Profile"
                footerType="save-cancel"
                style={{ width: 500 }}
                onSave={() => {
                    alert('Saved!')
                    setDialog2Open(false)
                }}
                fullScreen={true}
            >
                <div className="nc-col" style={{ gap: 12 }}>
                    <div>
                        <label className="nc-label">Name</label>
                        <Input placeholder="Enter your name" />
                    </div>
                    <div>
                        <label className="nc-label">Email</label>
                        <Input placeholder="Enter your email" type="email" />
                    </div>
                </div>
            </Dialog>

            <Dialog
                open={dialog3Open}
                onClose={() => setDialog3Open(false)}
                title="Delete Item"
                footerType="delete-cancel"
                onDelete={() => {
                    alert('Deleted!')
                    setDialog3Open(false)
                }}
                fullScreen={true}
            >
                <p>This action cannot be undone. Are you sure you want to delete this item?</p>
            </Dialog>

            <section className="dev-section">
                <h2>Nested Dialogs &amp; Escape</h2>
                <p style={{ marginBottom: 16, color: 'var(--nc-text-weak)' }}>
                    Escape closes the top-most popup only: an open ComboBox dropdown or ContextMenu
                    first, then the dialog it sits in.
                </p>
                <Button onClick={() => setOuterOpen(true)}>Open Nested Dialog</Button>

                <Dialog
                    open={outerOpen}
                    onClose={() => setOuterOpen(false)}
                    title="Outer Dialog"
                    footerType="close"
                    fullScreen={true}
                >
                    <p>Escape closes this dialog and stops there — host page shortcuts do not run.</p>
                    <Button style={{ marginTop: 12 }} onClick={() => setInnerOpen(true)}>
                        Open Inner Dialog
                    </Button>
                </Dialog>

                <Dialog
                    open={innerOpen}
                    onClose={() => setInnerOpen(false)}
                    title="Inner Dialog"
                    footerType="close"
                    fullScreen={true}
                >
                    <ComboBox
                        label="Options"
                        value={innerCombo}
                        onChange={setInnerCombo}
                        options={[
                            { label: 'Option 1', value: 'opt1' },
                            { label: 'Option 2', value: 'opt2' },
                            { label: 'Option 3', value: 'opt3' },
                        ]}
                    />
                    <div style={{ marginTop: 12 }}>
                        <button
                            className="nc-button"
                            ref={setInnerMenuAnchor}
                            onClick={() => setInnerMenuOpen(!innerMenuOpen)}
                        >
                            Open ContextMenu
                        </button>
                        <ContextMenu
                            open={innerMenuOpen}
                            onClose={() => setInnerMenuOpen(false)}
                            anchor={innerMenuAnchor}
                            options={[
                                { id: 'rename', label: 'Rename', onClick: () => { } },
                                { id: 'delete', label: 'Delete', variant: 'danger', onClick: () => { } },
                            ]}
                        />
                    </div>
                </Dialog>
            </section>
        </>
    )
}