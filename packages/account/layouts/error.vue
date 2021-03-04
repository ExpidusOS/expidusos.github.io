<template>
  <v-app> 
		<v-main>
			<v-container>
				<v-row justify="center">
					<v-col cols="12">
						<v-card elevation="2">
							<v-card-title v-if="error.statusCode === 404">404 Not Found</v-card-title>
							<v-card-title v-else>An error occurred</v-card-title>
							<v-card-text v-if="error.statusCode === 404">The page you are looking for could not be found</v-card-text>
							<v-card-text v-else>It seems our systems have enountered a problem, please try again later.</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
  </v-app>
</template>
<script>
export default {
	layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>
