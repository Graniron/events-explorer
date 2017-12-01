<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-sm-right text-xs-center">
        <v-btn large router to="/events" class="info">Explore events</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-sm-left text-xs-center">
        <v-btn large router to="/events/new" class="info">Organize events</v-btn>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate 
                             :width="7"
                             :size="70" 
                             v-if="loading"
                             color="primary"></v-progress-circular>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-2" v-if="!loading">
      <v-flex xs12>
        <v-carousel style="cursor: pointer">
          <v-carousel-item
            v-for="event in events"
            :src="event.imageUrl"
            @click="goToEvent(event.id)"
            :key="event.id">
            <div class="title">{{ event.title }}</div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-xs-center">
        <p>Join our awesome events</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
  export default {
    computed: {
      events() {
        return this.$store.getters.featuredEvents;
      },
      loading() {
        return this.$store.getters.loading;
      },
    },
    methods: {
      goToEvent(id) {
        this.$router.push(`/events/${id}`);
      },
    },
  };
</script>

<style scoped>
  .title {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 2em;
    padding: 20px;
  }
</style>
