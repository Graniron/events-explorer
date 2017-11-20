<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-card-media 
                  src="https://coworker.imgix.net/pictures/C282/edit/lviv-resize.jpg" 
                  height="200px">
                </v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h3 class="white--text headline mb-0">My Event</h3>
                    <div class="white--text">17 Jul 2018</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat to="/events/1">
                    <v-icon left>arrow_forward</v-icon>
                    View Events
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>   
</template>