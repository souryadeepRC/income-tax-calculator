export interface TUITextFieldProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
  type?: string;
  className?: string;
  errorMessage?: string;
  helperText?: string;
  id?: string;
  fullWidth?: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputProps?: object;
  dataTestId?: string;
}
