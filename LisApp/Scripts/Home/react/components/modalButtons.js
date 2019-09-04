import React from 'react';
import { Trans } from 'react-i18next';

const ModalButtons = ({ mode, onCancel, actualTabIndex, tabCount, onPrev, onNext }) => (
    <div className="save-cancel-buttons">
        <button onClick={onPrev} disabled={actualTabIndex===0}><Trans>Prev</Trans></button>
        <button type="submit" form="modalform" disabled={actualTabIndex===tabCount-1}><Trans>Next</Trans></button>
        {mode !== 'show' ? <button type="submit" form="modalform" disabled={actualTabIndex<tabCount-1}>{<Trans>Save</Trans>}</button> : null}
        <button onClick={onCancel}>{<Trans>{mode === 'show' ? "Back" : "Cancel"}</Trans>}</button>
    </div>
)
export default ModalButtons;