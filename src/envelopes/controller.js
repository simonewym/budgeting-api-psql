const pool = require('../../db');
const queries = require('./queries');

const INTERNAL_SERVER_ERR_MSG = 'Internal Server Error';

const getEnvelopes = async (req, res) => {
    try {
        const results = await pool.query(queries.getEnvelopes);
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(500).send(INTERNAL_SERVER_ERR_MSG);
    }
};

const getEnvelopeById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const results = await pool.query(queries.getEnvelopeById, [id]);
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(500).send(INTERNAL_SERVER_ERR_MSG);
    }
};

const addEnvelope = async (req, res) => {
    try {
        const { title, budget, balance } = req.body;
        if (!title || !budget || !balance) {
            return res.status(400).send('Error: Missing details for new envelope');
        }
        if (budget < 0 ){
            return res.status(400).send('Error: Budget amount must be at least 0');
        }
        if (balance < 0 ){
            return res.status(400).send('Error: Balance amount must be at least 0');
        }
        if (typeof budget !== 'number') {
            return res.status(400).send('Error: Invalid budget amount');
        }
        if (typeof balance !== 'number') {
            return res.status(400).send('Error: Invalid balance amount');
        }
        await pool.query(queries.addEnvelope, [title, budget, balance]);
        res.status(201).send("Envelope created successfully");
    } catch (error) {
        res.status(500).send(INTERNAL_SERVER_ERR_MSG);
    }
};

const removeEnvelope = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await pool.query(queries.removeEnvelope, [id]);
        res.status(200).send("Envelope removed successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send(INTERNAL_SERVER_ERR_MSG);
    }
};

const addBalance = async (req, res) => {
    try {
        const { amount } = req.body;
        if (!amount) {
            return res.status(400).send("Error: Invalid amount");
        }
        const id = parseInt(req.params.id);
        await pool.query(queries.addToBalance, [id, amount]);
        res.status(200).send("Envelope balance updated successfully");
    } catch (error) {
     res.status(500).send(INTERNAL_SERVER_ERR_MSG);
    }
};

const subtractBalance = async (req, res) => {
    try {
        const { amount } = req.body;
        if (!amount) {
            return res.status(400).send("Error: Invalid amount");
        }
        const id = parseInt(req.params.id);
        await pool.query(queries.subtractBalance, [id, amount]);
        res.status(200).send("Envelope balance updated successfully");
    } catch (error) {
     res.status(500).send(INTERNAL_SERVER_ERR_MSG);
    }
};

const updateBudget = async (req, res) => {
    try {
        const { budget } = req.body;
        if (!budget) {
            return res.status(400).send("Error: Invalid budget");
        }
        const id = parseInt(req.params.id);
        await pool.query(queries.updateBudget, [id, budget]);
        res.status(200).send("Envelope budget updated successfully");
    } catch (error) {
     res.status(500).send(INTERNAL_SERVER_ERR_MSG);
    }
};

const updateTitle = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).send("Error: Invalid title");
        }
        const checkTitleExists = await pool.query(queries.getEnvelopeByTitle, [title]);
        if (checkTitleExists.rows.length) {
            return res.status(400).send("Error: Title already exists");
        }
        const id = parseInt(req.params.id);
        await pool.query(queries.updateTitle, [id, title]);
        res.status(200).send("Envelope title updated successfully");
    } catch (error) {
     res.status(500).send(INTERNAL_SERVER_ERR_MSG);
    }
};

const transferBalance = async (req, res) => {
    try {
        const from = req.params.from;
        const to = req.params.to;
        const { amount } = req.body;
        if (!amount) {
            return res.status(400).send("Error: Invalid amount");
        }
        const fromBalanceResult = await pool.query(queries.getBalanceById, [from]);
        const fromBalance = fromBalanceResult.rows[0].balance;
        if (amount > fromBalance) {
            return res.status(400).send("Error: Insufficient balance from sender envelope");
        }
        await pool.query(queries.subtractBalance, [from, amount]);
        await pool.query(queries.addToBalance, [to, amount]);
        res.status(200).send("Envelope balance transferred successfully");
    } catch (error) {
        res.status(500).send(INTERNAL_SERVER_ERR_MSG);
    }
};

module.exports = {
    getEnvelopes,
    getEnvelopeById,
    addEnvelope,
    removeEnvelope,
    addBalance,
    subtractBalance,
    updateBudget,
    updateTitle,
    transferBalance
};