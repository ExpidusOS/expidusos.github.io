import { LocalScheme } from '~auth/runtime'
import qs from 'qs'

export default class ExpidusCloudScheme extends LocalScheme {
	login({ username, password }) {
		return super.login({
			data: qs.stringify({
				client_id: 'c083b285-2cbd-451a-9a14-cd580e55ec67',
				client_secret: '3D439605F0E42B00EEF0C784700C99CA',
				grant_type: 'password',
				username,
				password
			})
		})
	}
}
