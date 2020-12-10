<template>
	<v-app @click="unfocusAll">
		<v-system-bar class="d-md-flex d-lg-flex d-xl-flex d-none" style="z-index: 9999;">
			<v-menu v-if="activeApps[0]" offset-y>
				<template v-slot:activator="{ on, attrs }">
					<v-btn v-bind="attrs" v-on="on" text tile small depressed>
						<v-icon>{{ activeApps[0].icon }}</v-icon>
						{{ activeApps[0].name }}
					</v-btn>
				</template>
				<v-list dense>
					<v-list-item v-for="(item, index) in activeApps[0].data.menu" :key="index">
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</v-list-item>
					<v-divider v-if="activeApps[0].data.menu.length > 0" />
					<v-list-item @click="onClose(activeApps[0].id)">
						<v-list-item-icon>
							<v-icon>mdi-window-close</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Quit</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
			<v-btn v-else text tile small depressed @click="showLauncher = !showLauncher">
				<v-icon>mdi-package-variant</v-icon>
				ExpidusOS
			</v-btn>
			<v-spacer />
			<div @click="showActionCenter = !showActionCenter">
				<v-icon>mdi-wifi-strength-4</v-icon>
				<v-icon>mdi-network-strength-4</v-icon> 
				<span v-text.sync="clock" />
			</div>
		</v-system-bar>
		<v-system-bar class="d-sm-flex d-md-none d-lg-none d-xl-none d-flex" style="z-index: 9999;" @click="showActionCenter = !showActionCenter">
			<v-spacer />
			<v-icon>mdi-wifi-strength-4</v-icon>
			<v-icon>mdi-signal-cellular-outline</v-icon>
			<v-icon>mdi-battery</v-icon>
			<span v-text.sync="clock" />
		</v-system-bar>
		<Window
			v-for="app in activeApps"
			:key="app.id"
			:data="app.data"
			:name="app.name"
			:icon="app.icon"
			@mousedown="onPointerDown"
			@focus="onFocus(app.id)"
			@close="onClose(app.id)">
 			<component :is="app.component" />
		</Window>
		<v-overlay :value="showActionCenter">
			<v-container class="mt-2">
				<v-row>
					<v-col cols="12" md="5" lg="5" xl="5" order="last" order-md="first" order-lg="first" order-xl="first">
						<v-card>
							<v-card-title>Calendar</v-card-title>
							<v-calendar />
						</v-card>
					</v-col>
					<v-col cols="12" md="3" lg="3" xl="3">
						<v-card>
							<v-card-title>Weather</v-card-title>
							<v-card-text>
								<p><v-icon>mdi-weather-cloudy</v-icon> Portland, Oregon</p>
								<p><v-icon>mdi-temperature-fahrenheit</v-icon> 55</p>
							</v-card-text>
						</v-card>
					</v-col>
					<v-col cols="12" md="4" lg="4" xl="4" order="first" order-md="last" order-lg="last" order-xl="last">
						<v-card class="mb-2">
							<v-card-title>Notifications</v-card-title>
							<v-card-text>
								<p>No unread notifications at this time.</p>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-overlay>
		<v-overlay :value="showLauncher">
			<v-container class="mt-2">
				<v-row justify="start" align-content="start">
					<v-col v-for="(app, index) in apps" :key="index" cols="1">
						<v-btn @click="onFocus(app.id)">
							<v-badge :content="app.data.messages" :value="app.data.messages" overlap>
								<v-icon large>
									{{ app.icon }}
								</v-icon>
							</v-badge>
						</v-btn>
					</v-col>
				</v-row>
			</v-container>
		</v-overlay>
	</v-app>
</template>
<style>
.v-overlay__content {
	width: 100%;
	height: 100%;
}
</style>
<script>
import strftime from 'strftime'
import DemoWindow from '@/components/DemoWindow.vue'

const genTime = () => strftime('%I:%M %p')

export default {
	data() {
		return {
			apps: [
				{
					id: 'com.expidus.demo',
					name: 'Demo',
					active: true,
					running: true,
					icon: 'mdi-package-variant',
					component: 'DemoWindow',
					data: {
						menu: [],
						messages: 0,
						zIndex: 0,
						position: {	x: 0,	y: 0 },
						lastPosition: { x: 0, y: 0 },
						size: { width: 1024, height: 768 }
					}
				}
			],
			lastPointer: { x: 0, y: 0 },
			clock: genTime(),
			showLauncher: false,
			showActionCenter: false
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
	components: {
		DemoWindow
	},
	computed: {
		activeApps() {
			return this.apps.filter(({ active }) => active)
		}
	},
	methods: {
		onPointerDown(ev) {
			if (!this.activeApps[0]) return;
			ev.preventDefault();

			document.addEventListener('mouseup', this.onPointerUp)
			document.addEventListener('mousemove', this.onPointerMove)

			this.activeApps[0].data.lastPosition = { ...this.activeApps[0].data.position }
			this.lastPointer = { x: ev.clientX, y: ev.clientY }
		},
		onPointerUp() {
			document.removeEventListener('mouseup', this.onPointerUp)
			document.removeEventListener('mousemove', this.onPointerMove)
		},
		onPointerMove(ev) {
			if (!this.activeApps[0]) return;
			const delta = {
				x: ev.clientX - this.lastPointer.x,
				y: ev.clientY - this.lastPointer.y
			}

			this.activeApps[0].data.position = {
				x: this.lastPointer.x + delta.x,
				y: this.lastPointer.y + delta.y
			}
		},
		unfocusAll() {
			for (const app of this.activeApps) {
				app.active = false
			}
		},
		onFocus(id) {
			const app = this.apps.find(app => app.id === id)
			app.data.zIndex++
			app.running = true
			app.active = true
			this.showLauncher = false
		},
		onClose(id) {
			const app = this.apps.find(app => app.id === id)
			app.active = false
			app.running = false
		},
		updateClock() {
			this.clock = genTime()
		},
		getApp(id) {
			for (const app of this.apps) {
				if (app.id === id) return app
			}
		}
	}
}
</script>
