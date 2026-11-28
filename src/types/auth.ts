export type UserRole = 'admin' | 'msme' | 'eo';

export type SelectableRegisterRole = Extract<UserRole, 'msme' | 'eo'>;

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
  phone?: string | null;
  role: SelectableRegisterRole;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface RoleOptionItem {
  value: SelectableRegisterRole;
  badge: string;
  title: string;
  description: string;
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
  };
  login: {
    badge: string;
    titleHighlight: string;
    titleMain: string;
    subtitle: string;
    forgotPasswordLink: string;
    submitButton: string;
    noAccountPrompt: string;
    registerLink: string;
  };
  register: {
    badge: string;
    titleHighlight: string;
    titleMain: string;
    subtitle: string;
    roleSectionLabel: string;
    roles: RoleOptionItem[];
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phoneOptionalHint: string;
    phonePlaceholder: string;
    confirmPasswordLabel: string;
    confirmPasswordPlaceholder: string;
    passwordHint: string;
    submitButton: string;
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

export interface AuthWatermarkItem {
  id: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  sizePx: number;
  rotateDeg: number;
}