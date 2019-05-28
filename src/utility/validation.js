/* Input Field Validation on Auth Screen */

// Validate Switch statement taking in val, rules and connectedValue as params
const validate = (val, rules, connectedValue) => {
    // isValid set to True
    let isValid = true;
    // For Loop for each rule in rules
    for (let rule in rules) {
        // Switch Statement against 'rule'
        switch (rule) {
            case 'isEmail':
                // if EmailValidator value isValid (true)
                isValid = isValid && emailValidator(val);
                break;
            case 'minLength':
                // if minLengthValidator isValid (true)
                isValid = isValid && minLengthValidator(val, rules[rule]);
                break;
            case 'equalTo':
                // if Confirm Pass is equalTo isValid (true)
                isValid = isValid && equalToValidator(val, connectedValue[rule]);
                break;
            default:
                isValid = true;
        }
    }
    return isValid;
}

const emailValidator = val => {
    // Retun Regex
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(val);
};

const minLengthValidator = (val, minLength) => {
    // if length of val is greater than or equal to minLength (6)
    return val.length >= minLength;
};

const equalToValidator = (val, checkValue) => {
    // Return value if equal to checkValue
    return val === checkValue;
};

export default validate;