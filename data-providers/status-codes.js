const SUCCESS = {

    RESPONSE_VALID: {
        code: "200",
        text: "Everything is done and good!"
    }
};

const ERROR = {
    
    INVALID_CREDENTIALS: {
        code: "801",
        text: "Invalid Credentials!"
    },

    MISSING_INFO: {
        code: "802",
        text: "Missing Information."
    },

    VERIFICATION_FAILED: {
        code: "811",
        text: "Verification Failed!"
    },

    USER_NOT_FOUND: {
        code: "404",
        text: "User cannot be found."
    },

    INVALID_REQUEST: {
        code: "400",
        text: "Invalid request."
    },

    DATA_NOT_FOUND: {
        code: "404",
        text: "Data cannot be found."
    },

    FAILED_PROCESS: {
        code: "422",
        text: "Failed to process the request."
    }
};

module.exports.SUCCESS = SUCCESS;
module.exports.ERROR = ERROR;