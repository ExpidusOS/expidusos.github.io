<template>
	<v-container>
		<v-row align="center">
			<v-col cols="12" sm="12" md="4" lg="4" xl="4" class="mb-auto">
				<v-card elevation="2">
					<v-card-title>ExpidusOS</v-card-title>
					<v-card-text>A private and secure operating system for desktop and mobile devices.</v-card-text>
					<v-card-actions>
						<v-btn text>
							<NuxtLink to="/download">Get started</NuxtLink>
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
			<v-col cols="12" sm="12" md="8" lg="8" xl="8">
				<v-card elevation="2">
					<v-carousel>
						<v-carousel-item>
							<v-img contain :src="require('~/assets/screenshot-0.png')" />
						</v-carousel-item>
						<v-carousel-item>
							<v-img contain :src="require('~/assets/screenshot-1.png')" />
						</v-carousel-item>
					</v-carousel>
				</v-card>
			</v-col>
		</v-row>
		<v-row align="center">
			<v-col cols="12" sm="6" md="6" ld="6" xl="6">
				<v-card elevation="2">
					<v-card-title>Lightweight</v-card-title>
					<v-card-text>Designed with the essentials, ExpidusOS is lighter than most systems as it ships with what is only needed.</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" sm="6" md="6" ld="6" xl="6">
				<v-card elevation="2">
					<v-card-title>Secure</v-card-title>
					<v-card-text>Shipped with AppArmor, it restricts applications to prevent them from "going rogue." This reduced the chance of getting infected with malware.</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" sm="6" md="6" ld="6" xl="6">
				<v-card elevation="2">
					<v-card-title>Easy to use</v-card-title>
					<v-card-text>Shipped with a custom desktop solution to create an easier and more modern design for everyone.</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" sm="6" md="6" ld="6" xl="6">
				<v-card elevation="2">
					<v-card-title>Connected</v-card-title>
					<v-card-text>System integrates with the ExpidusOS Cloud services like Accounts to give you access to your data from anywhere.</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" sm="6" md="6" ld="6" xl="6">
				<v-card elevation="2">
					<v-card-title>Developer Friendly</v-card-title>
					<v-card-text>Source code can be found online for the core of ExpidusOS, developers can also write their own applications and submit them to the app store.</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>
<script>
export default {
	head() {
		return { title: 'Home' }
	}
}
</script>
