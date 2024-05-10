const getEnvelopes = "SELECT * FROM envelopes";
const getEnvelopeById = "SELECT * FROM envelopes WHERE id = $1";
const getEnvelopeByTitle = "SELECT * FROM envelopes WHERE title = $1";
const getBalanceById = "SELECT balance from envelopes WHERE id = $1";
const addEnvelope = "INSERT INTO envelopes (title, budget, balance) VALUES ($1, $2, $3)";
const removeEnvelope = "DELETE FROM envelopes WHERE id = $1";
const addToBalance = "UPDATE envelopes SET balance = balance + $2 WHERE id = $1";
const subtractBalance = "UPDATE envelopes SET balance = balance - $2 WHERE id = $1";
const updateBudget = "UPDATE envelopes SET budget = $2 WHERE id = $1";
const updateTitle = "UPDATE envelopes SET title = $2 WHERE id = $1";

module.exports = {
    getEnvelopes,
    getEnvelopeById,
    getEnvelopeByTitle,
    getBalanceById,
    addEnvelope,
    removeEnvelope,
    addToBalance,
    subtractBalance,
    updateBudget,
    updateTitle
};
