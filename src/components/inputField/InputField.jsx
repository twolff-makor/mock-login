import './inputField.css'

function InputField({ label, type, name, value, onChange }) {
	return (
		<div className='input-field-container'>
			<label htmlFor={name}>{label}</label>
			<input
				type={type}
				id={name}
				name={name}
				value={value}
				className={'input'}
				onChange={onChange}
			/>
		</div>
	);
}

export default InputField;
