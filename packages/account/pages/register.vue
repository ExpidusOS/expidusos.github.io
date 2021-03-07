<template>
	<v-container>
		<v-row align="center">
			<v-col cols="12" class="mb-auto">
				<v-card elevation="2">
					<v-card-title>Register</v-card-title>

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
								<v-text-field v-model="email" :rules="emailRules" label="E-Mail" type="email" required />
								<v-menu
									ref="birthdateMenu" v-model="birthdateMenu"
									:close-on-content-click="false"
									transition="scale-transition"
									offset-y
									min-width="auto">
									<template v-slot:activator="{ on, attrs }">
										<v-text-field
											v-model="birthdate"
											label="Date of birth"
											readonly
											v-bind="attrs"
											v-on="on" />
									</template>
									<v-date-picker ref="birthdatePicker" v-model="birthdate" min="1950-01-01" :max="new Date().toISOString().substr(0, 10)" @change="saveBirthdate" />
								</v-menu>
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
export default {
	auth: false,
	head() {
		return { title: 'Register' }
	},
	data() {
		return {
			password: '',
			username: '',
			email: '',
			birthdate: new Date().toISOString().substr(0, 10),
			birthdateMenu: null,
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
			],
			emailRules: [
				v => !!v || 'E-Mail is required',
				v => /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(v) || 'Invalid E-Mail address'
			]
		}
	},
	watch: {
		birthdateMenu(val) {
			val && setTimeout(() => (this.$refs.birthdatePicker.activePicker = 'YEAR'))
		}
	},
	methods: {
		saveBirthdate(date) {
			this.$refs.birthdateMenu.save(date)
		},
		async submit() {
			this.hasError = false
			if (this.$refs.login.validate()) {
				this.$refs.login.resetValidation()
				try {
					await this.$axios.post('/user/register', {
						username: this.username,
						password: this.password,
						email: this.email,
						birthdate: this.birthdate
					})
					await this.$auth.login({
						username: this.username,
						password: this.password
					})
					this.$router.push('/')
				} catch(err) {
					this.hasError = true
					if (err.response) {
						if (err.response.data.status == 422 || (err.response.data.status == 500 && err.response.data.errors)) {
							this.errorMessage = `${err.response.data.detail}: ${err.response.data.errors[0].message}`
						} else if (err.response.data.status == 400) {
							this.errorMessage = `${err.response.data.detail}: ${err.response.data.errors[0]}`
						} else if (err.response.data.error) {
							this.errorMessage = `${err.response.data.error}: ${err.response.data.error_description}`
						} else {
							this.errorMessage = `Status Code ${err.response.data.status}: ${err.response.data.detail}`
						}
					} else {
						this.errorMessage = err.message
					}
				}
			}
		}
	}
}
</script>
