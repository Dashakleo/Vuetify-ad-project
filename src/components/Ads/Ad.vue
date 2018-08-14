<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <v-card v-if="!loading">
                  <v-card-media
                  height="300px"
                  :src="ad.imageSrc"
                  >
                  </v-card-media>
                  <v-card-text>
                    <h1 class="text--primary"> {{ad.title}}</h1>
                    <p>{{ad.description}} </p>
                  </v-card-text>
                  <v-card-actions row>
                    <v-spacer></v-spacer>
                    <appEditAdModal :ad="ad" v-if="isOwner"></appEditAdModal>
                    <app-buy-modal :ad="ad" class="ml-3"></app-buy-modal>
                  </v-card-actions>
                </v-card>
                <div v-else>
                  <v-container>
                    <v-layout row>
                      <v-flex xs12 class="text-xs-center pt-5">
                        <v-progress-circular
                          :size="100"
                          :width="7"
                          color="purple"
                          indeterminate
                        ></v-progress-circular>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import EditAdModal from './EditAdModal'

export default {
  props: ['id'],
  computed: {
    ad () {
      const id = this.id
      return this.$store.getters.adById(id)
    },
    loading () {
      return this.$store.getters.loading
    },
    isOwner () {
      return this.ad.ownerId === this.$store.getters.user.id
    }
  },
  components: {
    appEditAdModal: EditAdModal
  }
}
</script>