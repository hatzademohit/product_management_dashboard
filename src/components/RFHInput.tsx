import type { InputHTMLAttributes } from "react";
import { Form } from "react-bootstrap";
import type {
    FieldError,
    FieldValues,
    Path,
    UseFormRegister,
} from "react-hook-form";


interface RHFInputProps<T extends FieldValues>
    extends InputHTMLAttributes<HTMLInputElement> {
    name: Path<T>;
    label?: string;
    register: UseFormRegister<T>;
    error?: FieldError;
    helperText?: string;
    requiredMark?: boolean;
    containerClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
    errorClassName?: string;
    helperTextClassName?: string;
    registerOptions?: Parameters<UseFormRegister<T>>[1];
    isInvalid?: boolean;
}

const RHFInput = <T extends FieldValues>({
    name,
    label,
    register,
    error,
    helperText,
    requiredMark = false,
    containerClassName = "",
    labelClassName = "",
    inputClassName = "",
    errorClassName = "",
    helperTextClassName = "",
    type = "text",
    disabled,
    readOnly,
    registerOptions = {},
    isInvalid,
    ...rest
}: RHFInputProps<T>) => {
    return (
        <div className={` ${containerClassName}`}>
            {label && (
                <Form.Label
                    htmlFor={name}
                    className={`rhf-label m-0 ${labelClassName}`}
                >
                    {label}
                    {requiredMark && (
                        <span aria-hidden="true" className="text-danger">
                            {" "}
                            *
                        </span>
                    )}
                </Form.Label>
            )}

            <Form.Control
                id={name}
                size="sm"
                type={type}
                aria-invalid={!!error}
                aria-describedby={
                    error ? `${name}-error` : `${name}-helper`
                }
                disabled={disabled}
                readOnly={readOnly}
                className={`rhf-input-field ${error ? "rhf-input-error" : ""
                    } ${inputClassName}`}
                {...register(name, registerOptions)}
                isInvalid={isInvalid}
                {...rest}
            />

            {error && (
                <p
                    id={`${name}-error`}
                    className={`rhf-error text-danger small ${errorClassName}`}
                    role="alert"
                >
                    {error.message}
                </p>
            )}
        </div>
    );
};

export default RHFInput;
