const pool = require('../../db');
const queries = require('./queries');

const INTERNAL_SERVER_ERR_MSG = 'Internal Server Error';
const INVALID_ID_ERR_MSG = "Envelope does not exist in the database.";
const INVALID_SENDER_ERR_MSG = "Sending Envelope does not exist in the database.";
const INVALID_RECEIVER_ERR_MSG = "Receiving Envelope does not exist in the database.";

const validateIdExists = async (req, res, next, id) => {
    try {
        const id = parseInt(req.params.id);
        const results = await pool.query(queries.getEnvelopeById, [id]);
        if (!results.rows.length) {
            return res.status(404).send(INVALID_ID_ERR_MSG);
        }
        next();
    } catch (error) {
        res.status(500).send(INTERNAL_SERVER_ERR_MSG);
    }
};

const validateSenderExists = async (req, res, next, id) => {
    try {
        const id = parseInt(req.params.from);
        const results = await pool.query(queries.getEnvelopeById, [id]);
        if (!results.rows.length) {
            return res.status(404).send(INVALID_SENDER_ERR_MSG);
        }
        next();
    } catch (error) {
        res.status(500).send(INVALID_SENDER_ERR_MSG);
    }
};

const validateReceiverExists = async (req, res, next, id) => {
    try {
        const id = parseInt(req.params.to);
        const results = await pool.query(queries.getEnvelopeById, [id]);
        if (!results.rows.length) {
            return res.status(404).send(INVALID_RECEIVER_ERR_MSG);
        }
        next();
    } catch (error) {
        res.status(500).send(INVALID_RECEIVER_ERR_MSG);
    }
};

module.exports = {
    validateIdExists,
    validateSenderExists,
    validateReceiverExists
};