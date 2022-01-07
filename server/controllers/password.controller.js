const User = require("../models/user.model");
const { sendEmail } = require("../utils/sendEmail");

exports.recover = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({
        message:
          "The e-mail address " +
          req.body.email +
          " is not associated with any account. Double-check your e-mail address and try again.",
      });

    //Generate and set password reset token
    user.generatePasswordReset();

    // Save the updated user object
    await user.save();

    // Send email
    const clientUrl =
      process.env.NODE_ENV === "production"
        ? process.env.CLIENT_URL_PROD
        : process.env.CLIENT_URL_DEV;

    let subject = "Password change request";
    let to = user.email;
    let from = process.env.FROM_EMAIL;
    let link = `${clientUrl}/reset/${user.resetPasswordToken}`;
    let html = `<p>Hi, ${user.first_name}</p><br />
                <p>Please click on the following <a href="${link}">link</a> to reset your password.</p><br />
                <p>If you did not request this, please ignore this e-mail and your password will remain unchanged.</p>`;

    await sendEmail({ to, from, subject, html });

    res
      .status(200)
      .json({ message: "A reset e-mail has been sent to " + user.email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.reset = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res
        .status(401)
        .json({ message: "Password reset token is invalid or has expired." });

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res
        .status(401)
        .json({ message: "Password reset token is invalid or has expired." });

    //Set the new password
    user.setPassword(req.body.password).then(() => {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      // Save the updated user object
      user.save();

      res.status(200).json({ message: "Your password has been updated." });
    });

    let subject = "Your password has been changed";
    let to = user.email;
    let from = process.env.FROM_EMAIL;
    let html = `<p>Hi, ${user.first_name}</p><br />
                <p>This is a confirmation that the password for your account associated with the e-mail <strong>${user.email}</strong> has just been changed.</p>`;

    await sendEmail({ to, from, subject, html });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
