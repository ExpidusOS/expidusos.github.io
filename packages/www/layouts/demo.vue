<template>
	<v-app>
		<v-system-bar class="d-md-flex d-lg-flex d-xl-flex d-none">
			<v-menu v-if="getFocused() != null" offset-y>
				<template v-slot:activator="{ on, attrs }">
					<v-btn v-bind="attrs" v-on="on" text tile small depressed>
						<v-icon>{{ getFocused().icon }}</v-icon>
						{{ app.name }}
					</v-btn>
				</template>
				<v-list dense>
					<v-list-item v-for="(item, index) in getFocused().menu" :key="index">
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</v-list-item>
					<v-divider v-if="getFocused().menu.length > 0" />
					<v-list-item @click="closeApp(app.id)">
						<v-list-item-icon>
							<v-icon>mdi-window-close</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Quit</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
			<v-btn v-else text tile small depressed @click="toggleLauncher">
				<v-icon>mdi-package-variant</v-icon>
				ExpidusOS
			</v-btn>
			<v-spacer />
			<v-icon>mdi-wifi-strength-4</v-icon>
			<v-icon>mdi-network-strength-4</v-icon> 
			<span v-text="clock" />
		</v-system-bar>
		<v-system-bar class="d-sm-flex d-md-none d-lg-none d-xl-none d-flex">
			<v-spacer />
			<v-icon>mdi-wifi-strength-4</v-icon>
			<v-icon>mdi-signal-cellular-outline</v-icon>
			<v-icon>mdi-battery</v-icon>
			<span v-text="clock" />
		</v-system-bar>
		<Window id="settings" v-if="getApp('settings').running" :z-index="getApp('settings').zIndex">
			<p>WIP</p>
		</Window>
		<v-overlay :value="showLauncher" absolute>
			<v-container>
				<v-row justify="start" align-content="start">
					<v-col v-for="(app, index) in apps" :key="index" cols="1">
						<v-container @click="openApp(app.id)">
							<v-row justify="center" class="ma-auto">
								<v-col>
									<v-btn icon><v-icon large>{{ app.icon }}</v-icon></v-btn>
								</v-col>
							</v-row>
							<v-row justify="center">
								<v-col>{{ app.name }}</v-col>
							</v-row>
						</v-container>
					</v-col>
				</v-row>
			</v-container>
		</v-overlay>
	</v-app>
</template>
<script>
import strftime from 'strftime'

const genTime = () => strftime('%I:%M %p')

export default {
	data() {
		return {
			apps: [
				{
					id: 'settings',
					name: 'Settings',
					focused: false,
					running: false,
					icon: 'mdi-settings-helper',
					menu: [],
					zIndex: 0
				}
			],
			zIndex: 1,
			clock: genTime(),
			showLauncher: false
		}
	},
	mounted() {
		this.timeoutClock = window.setTimeout(this.updateClock, 600)
		for (const app of this.apps) {
			app.zIndex = this.zIndex++
		}
	},
	beforeDestroy() {
		window.clearTimeout(this.timeoutClock)
	},
	methods: {
		toggleApp(id) {	
			for (const app of this.apps) {
				console.log(app)
				if (app.id === id) {
					app.running = !app.running
					app.focused = app.running
					app.zIndex = this.zIndex++
				}
			}
		},
		closeApp(id) {
			for (const app of this.apps) {
				if (app.id === id) {
					app.running = false
					app.focused = false
				}
			}
		},
		updateClock() {
			this.clock = genTime()
		},
		getApp(id) {
			for (const app of this.apps) {
				if (app.id === id) return app
			}
		},
		getFocused() {
			for (const app of this.apps) {
				if (app.focused === true) return app
			}
		},
		toggleLauncher() {
			this.showLauncher = !this.showLauncher
		}
	}
}
</script>
