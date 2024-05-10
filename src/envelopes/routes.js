const { Router } = require('express');
const controller = require('./controller');
const middleware = require('./middleware');

const router = Router();

router.param('id', middleware.validateIdExists);
router.param('from', middleware.validateSenderExists);
router.param('to', middleware.validateReceiverExists);

router.get('/', controller.getEnvelopes);
router.post('/',controller.addEnvelope);
router.get('/:id', controller.getEnvelopeById);
router.delete('/:id',controller.removeEnvelope);
router.put('/:id/update-budget', controller.updateBudget);
router.put('/:id/update-title', controller.updateTitle);
router.post('/:id/add-balance', controller.addBalance)
router.post('/:from/:to', controller.transferBalance);

module.exports = router;