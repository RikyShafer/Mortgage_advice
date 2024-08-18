const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../../models/UserRegister');
const bcrypt = require("bcrypt")
const axios = require('axios');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3297/auth/google/callback',
    passReqToCallback: true,
  },
  async function (req, accessToken, refreshToken, profile, done) {
    console.log('Access Token:', accessToken);
    console.log('Profile:', profile);

    try {
      let user = await User.findOne({ googleId: profile.id });
      const hashedPwd = await bcrypt.hash('123456789', 10);

      if (!user) {
        // Fetch user information from Google Userinfo API
        const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const email = response.data.email;

        user = await User.create({
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
          password: hashedPwd,
          email: email || 'default@example.com',
        });
      }
      
      done(null, user);
    } catch (err) {
      console.error('Error:', err);
      done(err, null);
    }
  }
));
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
