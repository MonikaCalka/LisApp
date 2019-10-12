import React from 'react';
import { Trans } from 'react-i18next';

const ModalButtons = ({ mode, onCancel, actualTabIndex, tabCount, onPrev, onNext, prevId, nextId, onPrevStudy, onNextStudy, withoutPrevStudy, canFireEmployee, onFire }) => (
    <div className="save-cancel-buttons">
        {!withoutPrevStudy && prevId != null && onPrevStudy != null && mode === 'show' ? <button className="modal-buton action-modal-button big-modal-button" onClick={onPrevStudy}><Trans>PrevStudy</Trans></button> : null}
        {!withoutPrevStudy && nextId != null && onNextStudy != null && mode === 'show' ? <button className="modal-buton action-modal-button big-modal-button" onClick={onNextStudy}><Trans>NextStudy</Trans></button> : null}
        <button className="modal-buton action-modal-button" onClick={onPrev} disabled={actualTabIndex === 0}><Trans>Prev</Trans></button>
        <button className="modal-buton action-modal-button" type="submit" form="modalform" disabled={actualTabIndex === tabCount - 1}><Trans>Next</Trans></button>
        {mode !== 'show' && mode !== 'addSample' ? <button className="modal-buton action-modal-button" type="submit" form="modalform" disabled={actualTabIndex < tabCount - 1}>{<Trans>{mode === 'start' ? "Start" : "Save"}</Trans>}</button> : null}
        <button className="modal-buton cancel-modal-button" onClick={onCancel}>{<Trans>{mode === 'show' ? "Back" : "Cancel"}</Trans>}</button>
    </div>
);
export default ModalButtons;