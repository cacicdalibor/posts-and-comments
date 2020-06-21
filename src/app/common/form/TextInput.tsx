import React, { Fragment } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label } from 'semantic-ui-react';

interface IProps
	extends FieldRenderProps<string, HTMLElement>,
		FormFieldProps {}

const TextInput: React.FC<IProps> = ({
	input,
	width,
	type,
	placeholder,
	meta: { touched, error },
}) => {
	return (
		<Fragment>
			<Form.Field error={touched && !!error} type={type} width={width}>
				<Form.Input {...input} placeholder={placeholder} />
				{touched && error && (
					<Label basic color="red">
						{error}
					</Label>
				)}
			</Form.Field>
		</Fragment>
	);
};

export default TextInput;
