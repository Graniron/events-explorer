<template>
  <v-container>
     <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate 
                             :width="7"
                             :size="70" 
                             v-if="loading"
                             color="primary"></v-progress-circular>
      </v-flex>
    </v-layout>

    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h4 class="primary--text">{{ event.title }}</h4>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-event-dialog :event="event"></app-edit-event-dialog>  
            </template>  
          </v-card-title>
          <v-card-media
            :src="event.imageUrl"
            height="400px">
          </v-card-media>
          <v-card-text>
            <div class="info--text">{{ event.date }} - {{ event.location}}</div>
            <div>{{ event.description }}</div>
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
      loading() {
        return this.$store.getters.loading;
      },
      event() {
        return this.$store.getters.loadedEvent(this.id);
      },
      userIsAuthenticated() {
        return this.$store.getters.user;
      },
      userIsCreator() {
        if (!this.userIsAuthenticated) {
          return false;
        }
        return this.$store.getters.user.id === this.event.creatorId;
      },
    },
  };
</script>
