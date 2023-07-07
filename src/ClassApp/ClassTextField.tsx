import { ComponentProps, Component } from "react";
import { ErrorMessage } from "../ErrorMessage";

type TextFieldProps = {
  inputProps: ComponentProps<"input">;
  label: string;
  errorMessage: string;
  shouldDisplayError: boolean;
};

export class ClassTextField extends Component<TextFieldProps> {
  render() {
    const { inputProps, label, errorMessage, shouldDisplayError } = this.props;
    return (
      <div className="text-field">
        <div className="input-wrap">
          <label htmlFor={label}>{label}:</label>
          <input {...inputProps} type="text" />
        </div>
        <ErrorMessage message={errorMessage} show={shouldDisplayError} />
      </div>
    );
  }
}
