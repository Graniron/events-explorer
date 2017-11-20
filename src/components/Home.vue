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

    <v-layout row wrap class="mt-2">
      <v-flex xs12>
        <v-carousel style="cursor: pointer">
          <v-carousel-item 
            v-for="event in events" 
            v-bind:src="event.imageUrl" 
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
    data() {
      return {
        events: [
          { imageUrl: 'https://coworker.imgix.net/pictures/C282/edit/lviv-resize.jpg', id: 'dw3de3ee', title: 'Events in Lviv' },
          { imageUrl: 'http://www.dniprohotel.ua/assets/photo/dnipro-hotel/dnipro-hotel-kiev-02.jpg', id: 'hsdse3ee', title: 'Events in Dnipro' },
        ],
      };
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