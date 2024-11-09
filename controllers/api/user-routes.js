const router = require('express').Router();
const { User } = require('../../models'); 

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

    res.render('userpage', {
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/update-bio/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
    });

    if (!userData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }

    const user = userData.get({ plain: true });

    res.render('updateBio', {
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { username : req.body.username } });
  
      if (!userData) {
        res.status(400).json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      console.error(err); // Log the error to the console
      res.status(500).json({ message: 'Failed to log in', error: err.message });
    }
  });

  router.post('/register', async (req, res) => {
    try {
      const newUser = await User.create({
        username: req.body.username,
        password: req.body.password,
      });
  
      req.session.save(() => {
        req.session.user_id = newUser.id;
        req.session.logged_in = true;
  
        res.status(200).json(newUser);
      });
    } catch (err) {
      console.error(err); // Log the error to the console
      res.status(400).json({ message: 'Failed to register', error: err.message });
    }
  });

  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy((err) => {
        if (err) {
          res.status(500).json({ message: 'Failed to log out' });
        } else {
          res.status(204).end();
        }
      });
    } else {
      res.status(404).end();
    }
  });

  router.put('/profile/:id', async (req, res) => {
    try {
      const updatedUser = await User.update(
        { bio: req.body.bio },
        { where: { id: req.params.id } }
      );
  
      if (!updatedUser) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
  
      res.status(200).json({ message: 'Bio updated successfully!' });
    } catch (err) {
      console.error(err); // Log the error to the console
      res.status(500).json({ message: 'Failed to update bio', error: err.message });
    }
  });

module.exports = router;