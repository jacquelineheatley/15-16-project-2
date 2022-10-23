const router = require('express').Router();
const { Will, Item } = require('../../models');
const withAuth = require('../../utils/auth');

// create new Will
router.post('/', withAuth, async (req, res) => {
    try {
        const newWill = await Will.create({
            ...req.body,
            user_id: req.session.user_id
        });

        await Item.bulkCreate(req.body.itemValues.map((item) => {
            return {
                will_id: newWill.id,
                user_id: req.session.user_id,
                content: item
            }
        }))

        res.status(200).json(newWill);
    } catch (err) {
        res.status(400).json(err);
    }
});

// delete a Will
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const willData = await Will.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        });

        if (!willData) {
            res.status(404).json({ message: 'No will found with the provided ID' });
            return;
        }
        
        res.status(200).json(willData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// update a Will
router.put('/edit/:id', withAuth, async (req, res) => {
    try {
        const updateWill = await Will.update({
            where: {
                id: req.params.id
            }
        });

        res.status(200).json(updateWill);
        res.redirect(`/edit/${id}`);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;



