<template>
  <div class="d-flex justify-content-center">
    <div class="card-container">
      <div
        class="main-content"
        v-if="reviewList && reviewList.data && reviewList.data.data.length != 0"
      >
        <div
          v-for="(row, index) in reviewList.data.data"
          :key="index"
          class="card container px-0"
        >
          <div class="d-flex header p-2">
            <div class="">
              <p class="m-0 pr-4">
                <b>{{ tPuppiesWelcomed }}: </b
                ><router-link to="/" :key="row.pet.name">{{
                  row.pet.name
                }}</router-link>
              </p>
            </div>
          </div>
          <div class="d-flex secondary-header p-2">
            <div class="pr-4">
              <p class="m-0 text-nowrap">
                <b-form-rating
                  no-border
                  v-model="row.rating"
                  variant="warning"
                  class="breeder-rating  pl-0"
                  disabled
                ></b-form-rating>
                <b class="rating-star-digit" :key="row.rating">{{
                  row.rating
                }}</b>
              </p>
            </div>
            <div>
              <p class="m-0" :key="row.customer.credential.name">
                <b> {{ tEvaluator }}: </b>{{ row.customer.credential.name }},
                {{ row.customer.prefecture.name }}
                <span class="text-nowrap pl-2">
                  <b>{{ tEvaluationDate }}: </b
                  >{{ dateFormate(row.created_at) }}</span
                >
              </p>
            </div>
          </div>
          <div class="row p-2">
            <div class="col-md-12 col-lg-12 message-container">
              <p :key="row.message">
                {{ row.message }}
              </p>
            </div>

            <div class="col-md-8 col-lg-7" v-if="showImage">
              <div class="petimage">
                <img
                  :src="$imageUrl + row.pet.image_path + row.pet.image"
                  width="100%"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="d-flex justify-content-center p-5">
        <h1>{{ pNoContent }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import { pTotal, pFrom, pShow, pNoContent } from "@/utils/trans/ag-common.js";
import {
  tPuppiesWelcomed,
  tEvaluator
} from "@/utils/trans/ag-top-page-breeder-details.js";
import {
  tBreeder,
  tPetName,
  tCustomer,
  tEvaluationDate
} from "@/utils/trans/ag-customer-reviews.js";
export default {
  name: "ReviewsAndComments",
  data() {
    return {
      pFrom: pFrom,
      pShow: pShow,
      pTotal: pTotal,
      url: "",
      tBreeder,
      tPetName,
      tCustomer,
      tEvaluationDate,
      pNoContent,
      tPuppiesWelcomed,
      tEvaluator,
      reviewList: {}
    };
  },
  props: ["showImage"],
  // components: {},
  computed: {
    ...mapGetters({
      getBreederReviews: "topPageBreeder/getBreederReviews"
    })
  },
  created() {},
  watch: {
    getBreederReviews: function(getBreederDetails) {
      this.reviewList = getBreederDetails;
      console.log(getBreederDetails);
    }
  }
  // mounted: {},
  //   methods: {

  //   }
};
</script>

<style scoped>
a {
  color: #8720e3 !important;
}
h1 {
  color: #6c4e85;
  font-weight: bold;
}
.banner-part {
  padding: 3em 0 3em;
  min-height: 37rem !important;
}
.card {
  border: 1px solid #dee2e6;
  margin-bottom: 2rem;
}
.petimage {
  float: left;
  width: 100%;
  background: #fff;
  border: 1px solid #eee;
}
.header {
  background: #650cb4;
  color: white;
  border-radius: 0.25rem 0.25rem 0 0;
  font-size: 0.8rem;
}
.secondary-header {
  background: #faf2e0;
  font-size: 0.8rem;
  border-bottom: 1px solid #eee;
  /* flex-direction: column; */
}
.message-container {
  font-size: 0.775rem;
}
.not-marked-star {
  color: #adadad;
}
.card-container {
  width: 100%;
}
.header a {
  color: pink !important;
}
@media only screen and (max-width: 767px) {
  .secondary-header {
    flex-direction: column;
  }
  .header {
    flex-direction: column;
  }
  .card-container {
    width: 100%;
    padding: 0 15px;
  }
}
</style>
