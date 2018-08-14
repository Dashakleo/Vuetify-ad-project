<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">Create new ad</h1>
                <v-form v-model="valid" class="mb-3" ref="form" lazy-validation>
                  <v-text-field 
                  name="title" 
                  label="Title" 
                  type="text"
                  v-model="title"
                  required
                  :rules="[v => !!v || 'Title is required']">
                  </v-text-field>
                  <v-textarea 
                  name="description" 
                  label="Ad description" 
                  type="text"
                  :rules="[v => !!v || 'description is required']"
                  v-model="description">
                  </v-textarea>
                </v-form>
                <v-layout row class="mb-3">
                  <v-flex xs12>
                    <v-btn class="warning" @click="triggerUpload">
                      Upload
                      <v-icon right dark>cloud_upload</v-icon>
                    </v-btn>
                    <input 
                      ref="fileInput" 
                      type="file"
                      style="display: none;"
                      accept="image/*"
                      @change="onFileChange">
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <img :src="imageSrc" alt="" height="100px" v-if="imageSrc">
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-switch
                      label="Add to promo"
                      color="primary"
                      v-model="promo"
                    ></v-switch>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-spacer></v-spacer>
                    <v-btn class="success" 
                    :loading="loading"
                    :disabled="!valid || !image || loading"
                    @click="createAd">
                      Create ad
                    </v-btn>
                  </v-flex>
                </v-layout>
                
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      description: '',
      valid: false,
      promo: false,
      image: null,
      imageSrc: ''
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    createAd () {
      if (this.$refs.form.validate() && this.image) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          image: this.image
        }
        this.$store.dispatch('createAd', ad)
          .then(() => {
            this.$router.push('/list')
          }).catch(() => {})
      }
    },
    triggerUpload () {
      this.$refs.fileInput.click()
    },
    onFileChange (e) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onload = e => {
        this.imageSrc = reader.result
      }
      reader.readAsDataURL(file)
      this.image = file
    }
  }
}
</script>