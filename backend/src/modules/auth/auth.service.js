// phase 1
const registerService = async (req, res) => {};

const loginService = async (req, res) => {};

const logoutService = async (req, res) => {};

// phase 2

const accountLockService = async (req, res) => {};

const emailVarificationService = async (req, res) => {};

const chnagePasswordService = async (req, res) => {};

const forgotPasswordService = async (req, res) => {};

const resetPasswordService = async (req, res) => {};

const loggingAttemptService = async (req, res) => {};

// phase 3

const sessionmanagementService = async (req, res) => {};

const multiDeviceSessionService = async (req, res) => {};

const twoStepVarifacationService = async (req, res) => {};

const googleAuthService = async (req, res) => {};

const githubAuthService = async (req, res) => {};

const loginAlertsService = async (req, res) => {};

export default {
  registerService,
  loginService,
  logoutService,
  accountLockService,
  emailVarificationService,
  chnagePasswordService,
  forgotPasswordService,
  resetPasswordService,
  loggingAttemptService,
  sessionmanagementService,
  multiDeviceSessionService,
  twoStepVarifacationService,
  googleAuthService,
  githubAuthService,
  loginAlertsService,
};
