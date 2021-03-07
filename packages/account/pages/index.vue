<template>
	<v-container>
		<v-row align="center">
			<v-col cols="12" class="mb-auto">
				<v-card elevation="2">
					<v-card-title>Welcome, {{ $auth.user.username }}</v-card-title>
					<v-card-text>This is your account page, only you can see this. In the future, we will add more to this.</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>
<script>
export default {
	head() {
		return {
			title: 'Home'
		}
	}
}
</script>
