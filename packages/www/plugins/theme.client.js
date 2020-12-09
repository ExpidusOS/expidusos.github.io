import cookie from 'js-cookie'

export default (ctx, inject) => {
	if (!cookie.get('themeVariant')) {
		cookie.set('themeVariant', 'dark')
	}
	ctx.$vuetify.theme.isDark = cookie.get('themeVariant') == 'dark'
	inject('getTheme', () => cookie.get('themeVariant'))
	inject('toggleTheme', () => {
		let isDark = cookie.get('themeVariant') == 'dark'
		if (isDark) cookie.set('themeVariant', 'light')
		else cookie.set('themeVariant', 'dark')
		ctx.$vuetify.theme.isDark = !isDark
	})
	inject('updateTheme', (v) => {
		if (typeof v == 'undefined' || typeof v == 'null') {
			v = cookie.get('themeVariant')
		}
		ctx.$vuetify.theme.isDark = v == 'dark'
	})
}
