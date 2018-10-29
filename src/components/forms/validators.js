export const required = value => (value ? undefined : 'Required');

export const nonEmpty = value =>
	value.trim() !== '' ? undefined : 'Cannot be empty';

export const isTrimmed = value =>
	value.trim() === value ? undefined : 'start/end with character';

export const length = length => value => {
	if (length.min && value.length < length.min) {
		return `${length.min}+ characters`;
	}
	if (length.max && value.length > length.max) {
		return `Max ${length.max} character`;
	}
};

export const matches = field => (value, allValues) =>
	field in allValues && value.trim() === allValues[field].trim()
		? undefined
		: 'Does not match';
