import { ValidationError, ValidatorResult } from 'jsonschema'

export class BaseMessage {
	private data: any
	private error: Error
	private type: string

	constructor(data: any, errorOrType: Error | string) {
		this.data = data
		if (errorOrType instanceof Error) this.error = errorOrType as Error
		else this.type = errorOrType as string
	}

	toJSON() {
		return this.error ? { error: { message: this.error.message, name: this.error.name }, type: 'error' }
			: { data: this.data, type: this.type }
	}
}

class ValidatorError extends Error {
	constructor(error: ValidationError) {
		super(error.toString())
	}
}

export class ValidatorErrorMessage extends BaseMessage {
	constructor(results: ValidatorResult) {
		super(null, new ValidatorError(results.errors[0]))
	}
}
