import routes from "../routes";
import User from "../models/User";
import passport from "passport";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.join);
    }
  }
};

export const getlogin = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};

export const postlogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const githubLogin = passport.authenticate("github");

export const githubLoginCb = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  const {
    _json: { name, email, id, avatar_url },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      console.log("用户已存在");

      return cb(null, user);
    } else {
      const newUser = await User.create({
        email,
        name,
        githubId: id,
        avatarUrl: avatar_url,
      });
      console.log("用户不存在");

      return cb(null, newUser);
    }
  } catch (error) {
    return cb(error);
  }
};

export const githubLoginCbSuccess = (req, res) => {
  console.log("跳转主页");
  res.redirect(routes.home);
};

export const facebookLogin = passport.authenticate("facebook");

export const facebookLoginCb = (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  console.log(profile);
  try {
    console.log("-----");
    return cb(null, null);
  } catch (error) {
    return cb(error);
  }
};

export const facebookPostLogin = passport.authenticate("facebook", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const users = (req, res) =>
  res.render("users", { pageTitle: "Users" });

export const myProfile = (req, res) => {
  res.render("userDetail", { pageTitle: "My Profile", profile: req.user });
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const profile = await User.findById(id).populate("videos");
    console.log(profile);
    res.render("userDetail", { pageTitle: profile.name, profile });
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit profile" });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl,
    });
    res.redirect(routes.me);
  } catch (err) {
    res.render("editProfile", { pageTitle: "Edit profile" });
  }
};
export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change password" });

export const postChangePassword = async (req, res) => {
  const {
    body: { password, newPassword, verifyPassword },
  } = req;
  try {
    if (newPassword !== verifyPassword) {
      res.status(400);
      res.redirect(routes.changePassword);
      return;
    }
    await req.user.changePassword(password, newPassword);
    res.redirect(routes.me);
  } catch (err) {
    res.status(400);
    res.redirect(`/users${routes.changePassword}`);
  }
};
