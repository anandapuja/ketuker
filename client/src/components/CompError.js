import React from "react";
import ErrorGif from '../assets/images/errorGif.gif'

function CompError() {
	return (
		<div>
            <img src={ErrorGif} alt="img-error"></img>
        </div>
	);
}

export default CompError;