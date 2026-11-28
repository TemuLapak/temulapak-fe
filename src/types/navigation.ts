export interface NavItem {
  id: string;
  label: string;
  href: string;
  segment: string | null;
  protected?: boolean;
}

export interface FooterLink {
  id: string;
  label: string;
  href: string;
}