export interface Theme {
  name: string;
  background: string;
  primaryColor: string;
  textColor: string;
  accentColor: string;
  fontFamily: string;
  borderRadius: string;
  boxShadow: string;
}

export interface ThemeRecord {
  [key: string]: Theme;
}
