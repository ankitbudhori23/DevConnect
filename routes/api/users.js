const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

// For checking if a string is blank, null or undefined
const isBlank = (str) => !str || /^\s*$/.test(str);

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post(
  '/',
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with minimum of 6 characters'
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, githubusername, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User Exists!' }] });
      }

      // Using Github DP as avatar. No Github means default DP will be set
      let avatar = !isBlank(githubusername)
        ? `https://avatars.githubusercontent.com/${githubusername}?s=200`
        : `https://api.dicebear.com/5.x/avataaars/svg?seed=${name}&scale=90&radius=50&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf&mouth=concerned,default,disbelief,eating,grimace,sad,screamOpen,serious,smile,tongue,twinkle`;

      user = new User({
        name,
        email,
        githubusername,
        avatar,
        password,
      });

      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 }, // Change to 3600 during production
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
