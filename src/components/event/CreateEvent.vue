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
              <v-btn class="primary" @click="onPickFile" raised>Upload image</v-btn>
              <input type="file" 
                    style="display: none" 
                    ref="fileInput" 
                    @change="onFilePicked"
                    accept="image/*">
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
              <h4>Choose Date and Time</h4>
            </v-flex>
          </v-layout>
          <v-layout row class="mb-2">
            <v-flex xs12 sm6 offset-sm3>
              <v-date-picker v-model="date"></v-date-picker>
              <p>{{ date }}</p>
            </v-flex>
          </v-layout>
          <v-layout row >
            <v-flex xs12 sm6 offset-sm3>
              <v-time-picker v-model="time"></v-time-picker>
              {{ time }}
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn type="submit" :disabled="!formIsValid" class="primary">CREATE EVENT</v-btn>
              {{submitableDateTime}}
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
        date: null,
        time: null,
        image: null,
      };
    },
    computed: {
      formIsValid() {
        return this.title !== '' && this.location !== '' && this.imageUrl !== '' && this.description !== '';
      },
      submitableDateTime() {
        if (this.date && this.time) {
          const date = `${this.date} ${this.time}`;
          return date;
        }
        return null;
      },
    },
    methods: {
      onCreateEvent() {
        if (!this.formIsValid) {
          return;
        }
        if (!this.image) {
          return;
        }
        const eventData = {
          title: this.title,
          location: this.location,
          image: this.image,
          description: this.description,
          date: this.submitableDateTime,
          id: new Date().getTime().toString(),
        };
        // Dispatch action
        this.$store.dispatch('createEvent', eventData);
        this.$router.push('/events');
      },
      onPickFile() {
        this.$refs.fileInput.click();
      },
      onFilePicked(event) {
        const files = event.target.files;
        const filename = files[0].name;
        if (filename.lastIndexOf('.') <= 0) {
          // return alert('Please add a valid file');
        }
        const fileReader = new FileReader();
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result;
        });
        fileReader.readAsDataURL(files[0]);
        this.image = files[0];
      },
    },
  };
</script>