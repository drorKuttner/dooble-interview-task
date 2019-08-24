import WcIcon from '@material-ui/icons/Wc';
import React from "react";

// isMale boolean passed as props.value by parent component, covers by gray rectangle the opposite gender icon of 'WC'
// toilet icon

export function GenderIcon(props) {
    return (
        <div className={`gender-icon-container ${props.value ? '' : 'is-female'}`}>
            <WcIcon />
            {props.value ? <div className="female-cover">

            </div> : <div className="male-cover">

            </div>}
        </div>
    );
}

export function renderGenderIcon(isMale) {
    return (<GenderIcon value={isMale}>

    </GenderIcon>);
}
