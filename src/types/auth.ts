export type UserRole = 'admin' | 'msme' | 'eo';

export type SelectableRegisterRole = Exclude<UserRole, 'admin'>;

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  role: UserRole;
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string | null;
  user: AuthUser;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  phone: string | null;
  role: SelectableRegisterRole;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface GoogleCallbackPayload {
  access_token: string;
  refresh_token?: string | null;
  role?: SelectableRegisterRole;
}

export interface VerifyRecoveryPayload {
  token_hash?: string;
  access_token?: string;
}

export interface ResetPasswordPayload {
  access_token: string;
  new_password: string;
}

export interface RoleOptionItem {
  value: SelectableRegisterRole;
  badge: string;
  title: string;
  description: string;
}

export interface AuthWatermarkItem {
  id: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  sizePx: number;
  rotateDeg: number;
}

export interface AuthDictionary {
  shared: {
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    showPasswordLabel: string;
    hidePasswordLabel: string;
    processingLabel: string;
    backToHomeLabel: string;
    orDividerLabel: string;
  };
  login: {
    badge: string;
    titleHighlight: string;
    titleMain: string;
    subtitle: string;
    forgotPasswordLink: string;
    submitButton: string;
    googleButton: string;
    googleRedirectingLabel: string;
    noAccountPrompt: string;
    registerLink: string;
  };
  register: {
    badge: string;
    titleHighlight: string;
    titleMain: string;
    subtitle: string;
    roleSectionLabel: string;
    roles: readonly RoleOptionItem[];
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phoneOptionalHint: string;
    phonePlaceholder: string;
    confirmPasswordLabel: string;
    confirmPasswordPlaceholder: string;
    passwordHint: string;
    submitButton: string;
    googleButton: string;
    googleRedirectingLabel: string;
    hasAccountPrompt: string;
    loginLink: string;
    successMessage: string;
  };
  forgotPassword: {
    badge: string;
    titleHighlight: string;
    titleMain: string;
    subtitle: string;
    submitButton: string;
    backToLoginLink: string;
    successTitle: string;
    successDescription: string;
  };
  resetPassword: {
    badge: string;
    titleHighlight: string;
    titleMain: string;
    subtitle: string;
    verifyingLabel: string;
    newPasswordLabel: string;
    newPasswordPlaceholder: string;
    confirmPasswordLabel: string;
    confirmPasswordPlaceholder: string;
    passwordHint: string;
    submitButton: string;
    successMessage: string;
    invalidTokenTitle: string;
    invalidTokenDescription: string;
    requestNewLinkLabel: string;
  };
  googleCallback: {
    badge: string;
    titleHighlight: string;
    titleMain: string;
    subtitle: string;
    verifyingMessage: string;
    successMessage: string;
    missingTokenError: string;
    backToLoginLabel: string;
  };
  validation: {
    emailRequired: string;
    emailInvalid: string;
    passwordRequired: string;
    passwordMinLength: string;
    nameRequired: string;
    confirmPasswordMismatch: string;
    genericError: string;
  };
}