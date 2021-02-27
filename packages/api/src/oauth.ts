import bcrypt from 'bcrypt'
import { Sequelize } from 'sequelize'
import OAuth2Server from 'oauth2-server'

import AccessToken from './models/accesstoken'
import Client from './models/client'
import User from './models/user'

import Server from './server'

export default class OAuthModel implements OAuth2Server.PasswordModel {
	private server: Server

	constructor(server: Server) {
		this.server = server
	}

	async getAccessToken(token: string) {
		const access_token = await AccessToken.findOne({
			where: { token }
		})

		const user = await User.findOne({
			where: { uuid: access_token.get('uuid') }
		})

		const client = await Client.findOne({
			where: { id: access_token.get('client_id') }
		})

		return {
			accessToken: access_token.get('token'),
			accessTokenExpiresAt: access_token.get('expires'),
			scope: access_token.get('scope'),
			client: {
				id: client.id,
				grants: client.grants
			},
			user: user.toJSON()
		}
	}

	async getClient(client_id: string, client_secret: string) {
		const client = await Client.findOne({
			where: { id: client_id, secret: client_secret }
		})

		if (!client) throw new Error('Client does not exist')

		return {
			id: client.id,
			grants: client.grants
		}
	}

	async getUser(username: string, pword: string) {
		const user = await User.findOne({
			where: { username }
		})

		if (!user) throw new Error('User does not exist')

		if (!bcrypt.compareSync(pword, user.get('password'))) return false
		return user
	}

	async saveToken(token: OAuth2Server.Token, client: OAuth2Server.Client, user: OAuth2Server.User) {
		const access_token = await AccessToken.create({
			token: token.accessToken,
			expires: token.accessTokenExpiresAt,
			scope: token.scope,
			uuid: user.uuid,
			client_id: client.id
		})

		const the_client = await Client.findOne({
			where: { id: client.id }
		})
					
		return {
			accessToken: access_token.get('token'),
			accessTokenExpiresAt: access_token.get('expires'),
			scope: access_token.get('scope'),
			client: {
				id: the_client.id,
				grants: the_client.grants
			},
			user: (await User.findOne({ where: { uuid: client.id } })).toJSON()
		}
	}

	async verifyScope(token: OAuth2Server.Token, scope: string) {
		const access_token = await AccessToken.findOne({
			where: { token }
		})
		if (!access_token) throw new Error('Acess token does not exist')
		return access_token.scope == scope
	}
}
