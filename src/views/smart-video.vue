<template>
  <div>
    <div class="column">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <div class="title">Your Smart Movie Assistant</div>
          </div>
        </div>
      </div>
    </div>
    <div class="columns is-multiline">

      <div class="column">
        <div class="box">
          <div class="heading">Total Duration in Seconds</div>
          <div class="title">{{ user["f2f_product"]["total_duration"] }}</div>
        </div>
      </div>

      <div class="column">
        <div class="box">
          <div class="heading">Remaining Duration in Seconds</div>
          <div class="title">{{ user["f2f_product"]["remaining_duration"] }}</div>
        </div>
      </div>

      <div class="column">
        <div class="box">
          <div class="heading">Total Processed Movies</div>
          <div class="title">{{ totalProcessedMovies }}</div>
        </div>
      </div>

      <div class="column">
        <div class="box">
          <div class="heading">Number of Processing Movies</div>
          <div class="title">{{ totalProcessingMovies }}</div>
        </div>
      </div>

    </div>
    <div v-if="uploading">
      <b-progress type="is-success" :value="value" show-value></b-progress>
    </div>
    <div class="columns mt-4">
      <div class="column">
        <b-field>
          <b-upload v-model="dropFiles"
                    drag-drop>
            <section class="section">
              <div class="content has-text-centered">
                <p>
                  <b-icon
                      icon="upload"
                      size="is-large">
                  </b-icon>
                </p>
                <p>Drop your files here or click to upload</p>
              </div>
            </section>
          </b-upload>
        </b-field>

        <div class="tags">
            <span v-if='dropFiles!==""' class="tag is-primary">
                {{ dropFiles.name }}
                <button class="delete is-small"
                        type="button"
                        @click="deleteDropFile()">
                </button>
            </span>
        </div>
        <div class="has-text-left" v-if="!uploading">
          <b-button type="is-success" @click="upload">Upload</b-button>
        </div>

        <div class="has-text-left" v-if="uploading">
          <b-button type="is-danger" @click="cancelUrl">Cancel</b-button>
        </div>
      </div>
      <div class="column is-two-thirds">
        <b-table :data="processedMovies">
          <b-table-column field="movie_name" label="Movie Name" v-slot="props">
            {{ props.row.movie_name }}
          </b-table-column>

          <b-table-column field="status" label="Status" v-slot="props">
            {{ props.row.status }}
          </b-table-column>

          <b-table-column field="uploaded_at" label="Uploaded At" v-slot="props">
            <span class="tag is-success">
                {{ epochToDate(parseInt(props.row.uploaded_at))}}
            </span>
          </b-table-column>

          <b-table-column field="download_url" label="Download" v-slot="props">
            <b-button class="is-primary is-light is-small" icon-left="download" @click="btnClick(props.row.download_url)">
              Download
            </b-button>
          </b-table-column>


        </b-table>

      </div>
    </div>
  </div>
</template>

<script>
import UserService from "@/http/user-service";
import axios from 'axios';
import {SnackbarProgrammatic as Snackbar} from "buefy";


export default {
  created() {
    this.updateUser()
  },
  data() {
    return {
      user: null,
      totalProcessedMovies: 0,
      totalProcessingMovies: 0,
      processedMovies: null,
      request: null,
      dropFiles: "",
      isUpload: false,
      uploading: false,
      value: 0,
      url: "",
      // data: [],
      columns: [
        {
          field: 'id',
          label: 'ID',
          width: '40',
          numeric: true
        },
        {
          field: 'first_name',
          label: 'Movie Name',
        },
        {
          field: 'uploaded_at',
          label: 'Uploaded At',
        },
        {
          field: 'status',
          label: 'Status',
          centered: true
        },
        {
          field: 'download_url',
          label: 'Download URL',
        }
      ],
      fileName: "",
      fileType: "",
      duration: 0,
      videoWidth: 0,
      videoHeight: 0,
      key: "",
    }
  },
  methods: {
    epochToDate(epoch){
      let start = new Date(0); // The 0 there is the key, which sets the date to the epoch
      start.setUTCSeconds(epoch);
      return start.toLocaleDateString()
    },
    btnClick(movie) {
      window.open(movie);
    },
    updateUser() {
      let loader = this.$loading.show({
        // Optional parameters
      });
      UserService.getUserDetails().then(
          response => {
            loader.hide()
            console.log(response.data['data'])
            this.user = response.data
            if (response.data["f2f_product"]["processed_movies"] !== null) {
              this.totalProcessedMovies = response.data["f2f_product"]["processed_movies"].length
              this.processedMovies = response.data["f2f_product"]["processed_movies"]

            }
            if (response.data["f2f_product"]["processing_movies"] !== null) {
              this.totalProcessingMovies = response.data["f2f_product"]["processing_movies"].length
            }

            // this.status = response.data['subscription']['status'] === "active"
          },
          error => {
            loader.hide()
            this.message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
          }
      );
    },
    deleteDropFile() {
      // eslint-disable-next-line no-debugger
      this.dropFiles = ""
    },
    cancelUrl() {
      this.request.cancel()
      Snackbar.open("Upload Canceled")

    },

    getMetaData() {
      return new Promise((resolve) => {
        if (this.dropFiles.type === "video/mp4" || this.dropFiles.type === "video/ogg" || this.dropFiles.type === "video/webm") {
          const videoElement = document.createElement('video');
          // eslint-disable-next-line no-debugger
          const URL = window.URL || window.webkitURL;
          videoElement.src = URL.createObjectURL(this.dropFiles);
          const timer = setInterval(() => {
            if (videoElement.readyState === 4) {
              this.duration = videoElement.duration
              this.videoWidth = videoElement.videoWidth
              this.videoHeight = videoElement.videoHeight
              console.log(videoElement.duration);
              resolve('done')
              clearInterval(timer);
            }
          }, 500);
        }
      });
    },
    async upload() {
      await this.getMetaData().then()
      if (this.duration < parseInt(this.user["f2f_product"]["remaining_duration"])) {
        let loader = this.$loading.show({
          // Optional parameters
        });
        this.fileType = this.dropFiles.name.split(".").pop()
        this.fileName = this.dropFiles.name.split(".")[0]
        this.fileName = this.fileName.replace(/[/\\?%*:|"<>]/g, '');
        this.fileName = this.fileName.replace(/[^a-zA-Z0-9]/g, '_');
        console.log(this.fileName)
        console.log(this.fileType)
        UserService.getS3URL({
          file: this.fileName + "." + this.fileType
        }).then(
            response => {
              loader.hide()
              console.log(response.data["message"])
              this.url = response.data["url"]
              this.key = response.data["file"]
              this.s3Upload()
            },
            error => {
              loader.hide()
              this.message =
                  (error.response && error.response.data && error.response.data.message) ||
                  error.message ||
                  error.toString();
            }
        )
      } else {
        Snackbar.open("Your Quota Exceeded")
      }
    },


    uploadSucceed() {
      let loader = this.$loading.show({
        // Optional parameters
      });
      UserService.uploadSucceed({
        file: this.fileName + "." + this.fileType,
        key: this.key,
        duration: parseInt(this.duration),
        frame_width: parseInt(this.videoWidth),
        frame_height: parseInt(this.videoHeight)
      }).then(
          response => {
            loader.hide()
            console.log(response.data)
            this.updateUser()
          },
          error => {
            loader.hide()
            this.message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
          }
      )


    },
    s3Upload() {
      this.request = axios.CancelToken.source();
      this.uploading = true

      UserService.uploadFile(this.url, this.dropFiles, {
        onUploadProgress: function (progressEvent) {
          this.value = Math.round((progressEvent.loaded / progressEvent.total) * 100)
        }.bind(this),
        headers: {
          'Content-Type': this.dropFiles.type
        },
        cancelToken: this.request.token,
      }).then(
          response => {
            this.uploading = false
            console.log(response.data)
            this.uploadSucceed()
          },
          error => {
            this.uploading = false
            this.message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
          }
      )
    }
  }
}
</script>

<style scoped>

</style>