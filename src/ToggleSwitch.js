// ToggleSwitch.js
import React from 'react';

function ToggleSwitch({ checked, onChange }) {
    return (
    <label className="switch m-2">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="slider round"></span>
    </label>
    );
}

export default ToggleSwitch;
