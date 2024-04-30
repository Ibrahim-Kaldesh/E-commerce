export const signIn = cathcAsync(async function (req, res, next) {
    const { userNameOrEmail, password } = req.body;
  
    // 1) check if email and password exists
    if (!userNameOrEmail || !password)
      return next(new AppError("Missing userName or Email or password", 400));
  
    // 2) Find the user with that email or userName
    let query;
    if (validator.isEmail(userNameOrEmail))
      query = userModel.findOne({ email: userNameOrEmail });
    else query = userModel.findOne({ userName: userNameOrEmail });
    const user = await query.select("+password +tokens");
  
    if (!user) return next(new AppError("User not found", 401));
  
    // 3) check if password mathches with the password stored in DB
    if (!(await user.correctPassword(password, user.password)))
      return next(new AppError("Incorrect Password", 401));
  
    // 4) Generate token
    createSendToken(user, 200, res);
  });
  