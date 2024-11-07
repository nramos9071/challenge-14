const router = require('express').Router();
const  User  = require('../../models'); 

// Route to get a user's profile
router.get('/profile/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
    });

    if (!userData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }

    const user = userData.get({ plain: true });

    res.render('profile', {
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;