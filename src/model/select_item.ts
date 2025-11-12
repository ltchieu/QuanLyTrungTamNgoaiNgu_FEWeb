export interface SelectItem {
  label: string;
  value: string;
  link: string;
  subItems?: SelectItem[];
}

export interface SelectProps {
  label: string;
  items: SelectItem[];
  isMobile?: boolean
}