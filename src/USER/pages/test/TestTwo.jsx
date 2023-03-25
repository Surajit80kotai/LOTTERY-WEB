import React from 'react';
import flags from 'country-flag-emoji-json';

const phoneCodes = [
    "+355", // Albania
    "+213", // Algeria
    "+1 684", // American Samoa
    // Add more phone codes here
];

const options = flags.map((flag, index) => (
    <option key={index} value={flag.code}>
        {flag.emoji} {flag.name} ({phoneCodes[index]})
    </option>
));

function CountryDropdown() {
    return (
        <main style={{"marginTop":"250px"}}>
            <select>{options}</select>
        </main>
    );
}

export default CountryDropdown;