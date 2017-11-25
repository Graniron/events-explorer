<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4>Create a new Event</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateEvent">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="title" 
                            label="Title"
                            id="title"
                            :rules="[() => title.length > 0 || 'Required field']"
                            v-model="title"
                            required></v-text-field>                              
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="location" 
                            label="Location"
                            id="location"
                            :rules="[() => location.length > 0 || 'Required field']"
                            v-model="location"
                            required></v-text-field>                              
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="imageUrl" 
                            label="Image Url"
                            id="image-url"
                            :rules="[() => imageUrl.length > 0 || 'Required field']"
                            v-model="imageUrl"
                            required></v-text-field>                              
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" height="300" alt="image">
            </v-flex>
          </v-layout>
          <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <v-text-field name="description" 
                          label="description"
                          id="description"
                          :rules="[() => description.length > 0 || 'Required field']"
                          v-model="description"
                          multi-line
                          required></v-text-field>                              
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn type="submit" :disabled="!formIsValid" class="primary">CREATE EVENT</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container> 
</template>

<script>
  export default {
    data() {
      return {
        title: '',
        location: '',
        imageUrl: '',
        description: '',
      };
    },
    computed: {
      formIsValid() {
        return this.title !== '' && this.location !== '' && this.imageUrl !== '' && this.description !== '';
      },
    },
    methods: {
      onCreateEvent() {
        if (!this.formIsValid) {
          return;
        }
        const eventData = {
          title: this.title,
          location: this.location,
          imageUrl: this.imageUrl,
          description: this.description,
          date: new Date(),
          id: +new Date(),
        };
        // Dispatch action
        this.$store.dispatch('createEvent', eventData);
        this.$router.push('/events');
      },
    },
  };
</script>