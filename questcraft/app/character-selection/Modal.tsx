import React from 'react';
import './Modal.css'; // Make sure to create Modal.css for styling

const Modal = ({ isOpen, children, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                {children}
                <button className="close-button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
