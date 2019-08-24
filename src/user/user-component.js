import {Capitalize} from "../utils";
import React from "react";
import {renderGenderIcon} from "../gender-icon/gender-icon"


// each user box template - with its picture name gender icon and mail and email
// gender icon uses material ui 'WC' icons which include both male and female side by side
// renderGenderIcon exposes the correct part of the 'WC' icon according to 'isMale' boolean
export function User(props) {
    const isMale = props.value.gender === "male";
    return (
        <div className="user">
            <img className="image" src={props.value.picture.large}>

            </img>
            <div className="data">
                <div className="first-line">
                    <div className="name">{Capitalize(props.value.name.first)} {Capitalize(props.value.name.last)}</div>
                    {renderGenderIcon(isMale)}
                </div>
                <div className="mail">{props.value.email}</div>
            </div>
        </div>
    );
}

export function renderUser(user, idx) {
    return (<User value={user} key={idx}>

    </User>);
}
