const otpManager = require("node-twillo-otp-manager")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
  process.env.TWILIO_SERVICE_SID
);


app.post("/test", async (req, res) => {
  try {
    const serviceSid = await otpManager.createServiceSID("appCleaning", "4");

    console.log("serviceSid:", serviceSid);

    res.json({ success: true, message: "Service SID created", serviceSid });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to create Service SID",
        error: error.message,
      });
  }
});

// Send OTP
app.post("/send", async (req, res) => {
  try {
    const { countryCode, mobile } = req.body; 
    const phone = countryCode + mobile; 
    console.log("Sending OTP to:", phone); 
    try {
      var resp = await otpManager.sendOTP(phone);
    } catch (error) {
      res
        .status(500)
        .json({
          success: false,
          message: "Number is not valid",
          error: error.message,
        });
    }
    res.json({ success: true, message: "OTP sent", data: resp });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to send OTP",
        error: error.message,
      });
  }
});

// Verify OTP
app.post("/verify", async (req, res) => {
  try {
    const { mobileNumber, otp } = req.body;

    const isMobileExist = { dataValues: { countryCode: "+" } }; 
    const formattedMobileNumber =
      isMobileExist.dataValues.countryCode === null
        ? "+" + mobileNumber
        : isMobileExist.dataValues.countryCode + mobileNumber;

    const resp = await otpManager.verifyOTP(formattedMobileNumber, otp);

    res.json({ success: true, message: "OTP verified", data: resp });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to verify OTP",
        error: error.message,
      });
  }
});
