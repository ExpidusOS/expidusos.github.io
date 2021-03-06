<template>
	<v-container>
		<v-row align="center">
			<v-col cols="12" class="mb-auto">
				<v-card elevation="2">
					<v-card-title>Login</v-card-title>
					<v-card-text>Please log in with your ExpidusOS Cloud Account or register <NuxtLink to="/register">here</NuxtLink>.</v-card-text>

					<v-row align="center" v-if="hasError">
						<v-spacer />
						<v-col cols="8" class="mb-auto">
							<v-alert color="red">
								{{ errorMessage }}
							</v-alert>
						</v-col>
						<v-spacer />
					</v-row>

					<v-form @submit.prevent="submit" ref="login" v-model="valid" lazy-validation>
						<v-row align="center">
							<v-spacer />
							<v-col cols="8" class="mb-auto">
								<v-text-field v-model="username" :rules="usernameRules" label="Username" required />
								<v-text-field v-model="password" :rules="passwordRules" label="Password" type="password" required />
							</v-col>
							<v-spacer />
						</v-row>
						<v-row align="center">
							<v-spacer />
							<v-col cols="8" class="mb-auto">
								<v-btn @click="submit">Log In</v-btn>
							</v-col>
							<v-spacer />
						</v-row>
					</v-form>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>
<script>
import qs from 'qs'

export default {
	auth: false,
	head() {
		return { title: 'Login' }
	},
	data() {
		return {
			password: '',
			username: '',
			valid: false,
			hasError: false,
			errorMessage: '',
			usernameRules: [
				v => !!v || 'Username is required',
				v => !v.includes(' ') || 'Username must be valid'
			],
			passwordRules: [
				v => !!v || 'Password is required',
				v => v.length >= 8 || 'Password is too short'
			]
		}
	},
	methods: {
		async submit() {
			this.hasError = false
			if (this.$refs.login.validate()) {
				this.$refs.login.resetValidation()
				try {
					await this.$auth.login({
						username: this.username,
						password: this.password
					})
					console.log(this.$auth)
					this.$router.push('/')
				} catch(err) {
					this.hasError = true
					this.errorMessage = err.response ? `${err.response.data.error}: ${err.response.data.error_description}` : err.message
				}
			}
		}
	}
}
</script>
