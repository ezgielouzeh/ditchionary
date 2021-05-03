const router = require('express').Router();
const {Op} = require('sequelize');
const {requireToken, isAdmin} = require('./gatekeepingmiddleware');

const {
	models: {User},
} = require('../db');

module.exports = router;

//requireToken: let them if they're logged in users or admins
//isAdmin: let them if they're admins
router.get('/', requireToken, isAdmin,  async (req, res, next) => {
  try {
    //if we managed to make it PAST require token, we can guarantee that we have a user, we have access to req.user
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though users' passwords are encrypted, it won't help if we just send everything to anyone who asks!
      //things that you don't want to release to the public
      attributes: ['id', 'username']
      //info we DO want back, and hide away all of the rest from our client
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
	try {
		const user = await User.create(req.body);
		res.json(user);
	} catch (err) {
		next(err);
	}
});

router.put('/:id', requireToken, async (req, res, next) => {
	try {
		if (req.user.id !== +req.params.id && !req.user.isAdmin) {
			throw new Error('You do not have permission to edit that user');
		}
		const [numRows] = await User.update(req.body, {
			where: {
				id: req.params.id,
			},
		});
		if (numRows === 0) {
			throw new Error('Failed to update the user');
		} else {
			res.sendStatus(200);
		}
	} catch (error) {
		next(error);
	}
});

