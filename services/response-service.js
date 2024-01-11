'use strict';

var statusCodes = require("../data-providers/status-codes");

function successful(res, data, message, code = 200) {

    return res.status(200).json({
        status: "success",
        message: message,
        code: code,
        data: data
    });
}

function missingInfo(next) {
    
    let err = new Error();
    err.status = 422;
    err.code = statusCodes.ERROR.MISSING_INFO.code;
    err.message = statusCodes.ERROR.MISSING_INFO.text;

    return next(err);
}

function found(res) {
    
    return res.status(200).json({
        status: "found",
        code: statusCodes.SUCCESS.RESPONSE_VALID.code
    });
}

function notFound(res) {
    
    return res.status(200).json({
        status: "not-found",
        code: statusCodes.ERROR.DATA_NOT_FOUND.code
    });
}

function sourceNotFound(next) {
    
    let err = new Error();
    err.status = 404;
    err.message = "Not found";

    return next(err);
}

function invalidRequest(next, errorMessage) {
    
    let err = new Error();
    err.status = 400;
    err.code = statusCodes.ERROR.INVALID_REQUEST.code;
    err.message = statusCodes.ERROR.INVALID_REQUEST.text;

    if (errorMessage) {
        err.message += " Error message: " + errorMessage
    }

    return next(err);
}

function failedProcess(next, errorMessage) {
    
    let err = new Error();
    err.status = 422;
    err.code = statusCodes.ERROR.FAILED_PROCESS.code;
    err.message = statusCodes.ERROR.FAILED_PROCESS.text;

    if (errorMessage) {
        err.message += " Error message: " + errorMessage
    }

    return next(err);
}

module.exports.ResponseService = {
    sourceNotFound,
    missingInfo,
    successful,
    found,
    notFound,
    failedProcess,
    invalidRequest
};