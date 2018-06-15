<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm8 offset-sm2>
        <h2>Create a new Meetup</h2>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateMeetup">
          <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="title"
                required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
              <v-text-field
                name="location"
                label="Location"
                id="location"
                v-model="location"
                required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
              <v-btn raised class="primary" @click="onPickFile">Upload Image</v-btn>
              <input
                type="file"
                style="display: none"
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
              <img :src="imageUrl" height=384>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                v-model="description"
                multi-line
                required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
              <h4>Choose a Date & Time</h4>
            </v-flex>
          </v-layout>
          <v-layout row class="mb-2">
            <v-flex xs6 sm8 offset-sm2>
              <v-date-picker
                v-model="date"
                color="primary">
              </v-date-picker>
              <!-- <p>{{ date }}</p> -->
            </v-flex>
            <!-- <v-spacer></v-spacer> -->
          <!-- </v-layout>
          <v-layout class="mb-2"> -->
            <v-flex xs6 sm8>
              <v-time-picker
                v-model="time"
                format="24hr"
                color="primary">
              </v-time-picker>
              <!-- <p>{{ time }}</p> -->
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 align-content-center>
              <v-btn
                class="primary"
                :disabled="!formIsValid"
                type="submit">
                Create Meetup
              </v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      location: '',
      imageUrl: '',
      description: '',
      date: new Date().toISOString().substr(0, 10),
      time: new Date().toTimeString().substr(0, 8),
      image: null
    };
  },
  computed: {
    formIsValid () {
      return this.title !== '' &&
        this.location !== '' &&
        this.imageUrl !== '' &&
        this.description !== '';
    },
    submittableDateTime () {
      const date = new Date(this.date);
      if (typeof this.time === 'string') {
        const hours = this.time.match(/^(\d+)/)[1];
        const minutes = this.time.match(/:(\d+)/)[1];
        date.setHours(hours);
        date.setMinutes(minutes);
      } else {
        date.setHours(this.time.getHours());
        date.setMinutes(this.time.getMinutes());
      }
      return date;
    }
  },
  methods: {
    onCreateMeetup () {
      if (!this.formIsValid) {
        return;
      }
      if (!this.image) {
        return;
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        image: this.image,
        description: this.description,
        date: this.submittableDateTime
      };
      this.$store.dispatch('createMeetup', meetupData);
      this.$router.push('/meetups');
    },
    onPickFile () {
      this.$refs.fileInput.click();
    },
    onFilePicked (event) {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf('.') <= 0) {
        return 'Please add a valid file!';
      }
      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    }
  }
};
</script>

<style>
</style>
