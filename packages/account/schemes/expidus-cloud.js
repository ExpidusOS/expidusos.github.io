import { LocalScheme } from '~auth/runtime'
import qs from 'qs'

export default class ExpidusCloudScheme extends LocalScheme {
	login({ username, password }) {
		return super.login({
			data: qs.stringify({
				client_id: this.options.client.id,
				client_secret: this.options.client.secret,
				grant_type: 'password',
				username,
				password
			})
		})
	}
}
