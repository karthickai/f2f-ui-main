<template>
  <div>
    <h1 class="title"> Invoices </h1>

    <div class="box">
      <b-table :data="invoices" >

        <b-table-column field="id" label="ID" v-slot="props">
          {{ props.row.id }}
        </b-table-column>

<!--        <b-table-column field="receipt" label="Receipt" v-slot="props">-->
<!--          {{ props.row.receipt }}-->
<!--        </b-table-column>-->

        <b-table-column field="created_at" label="Created At" v-slot="props">
            <span class="tag is-success">
                {{ epochToDate(props.row.created_at)}}
            </span>
        </b-table-column>

        <b-table-column field="pdf" label="Invoice PDF" v-slot="props">
          <b-button class="is-primary is-light" icon-left="download" @click="btnClick(props.row.pdf)">
            Download
          </b-button>
        </b-table-column>

      </b-table>

    </div>

  </div>

</template>

<script>
import UserService from "@/http/user-service";

export default {
  name: "invoices",
  created() {
    let loader = this.$loading.show({
      // Optional parameters
    });
    UserService.getInvoices().then(
        response => {
          loader.hide()
          console.log(response.data['data'])
          this.invoices = response.data['data']
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
  data() {
    return {
      invoices: [],
    }
  },
  methods: {
    epochToDate(epoch){
      let start = new Date(0); // The 0 there is the key, which sets the date to the epoch
      start.setUTCSeconds(epoch);
      return start.toLocaleDateString()
    },
    btnClick(pdf) {
      window.open(pdf);
    },
  }
}
</script>

<style scoped>

</style>