<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h4 class="primary--text">{{ event.title }}</h4>
          </v-card-title>
          <v-card-media
            :src="event.imageUrl"
            height="400px">
          </v-card-media>
          <v-card-text>
            <div class="info--text">{{ event.date }} - Where it taks place</div>
            <div>Lorem Ipsum Lorem Ipsum Lorem Ipsum</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
  export default {
    props: ['id'],
    computed: {
      event() {
        return this.$store.getters.loadedEvent(this.id);
      },
    },
  };
</script>
