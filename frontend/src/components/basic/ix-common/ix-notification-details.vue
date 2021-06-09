<template>
  <div>
    <div
      v-if="
        notificationDetails.type ==
          'App%5CNotifications%5CAdminAnnouncementNotifications'
      "
      class="row"
    >
      <div class="col-md-12">
        <p>{{ notificationDetails.data.details }}</p>
      </div>
    </div>
    <div
      v-if="
        notificationDetails.type == 'App%5CNotifications%5CSoldNotifications' ||
          notificationDetails.type ==
            'App%5CNotifications%5CPetStatusNotifications'
      "
      class="row font-weight-bold"
    >
      <label class="control-label col-md-4">{{ fPetId }} :</label>
      <div class="col-md-8">
        <router-link
          target="_blank"
          class="details-link"
          :to="{
            path:
              '/breeder/' +
              notificationDetails.data.details.breeder.id +
              '/pets/show/' +
              notificationDetails.data.pet_id
          }"
        >
          #{{ notificationDetails.data.pet_id }}
        </router-link>
      </div>
    </div>

    <div
      v-if="
        notificationDetails.type ==
          'App%5CNotifications%5CTransactionNaviNotifications'
      "
      class="row font-weight-bold"
    >
      <label class="control-label col-md-4">{{ fPetId }} :</label>
      <div class="col-md-2">
        <router-link
          target="_blank"
          class="details-link"
          :to="{
            path: '/pet/' + notificationDetails.data.pet_id
          }"
        >
          #{{ notificationDetails.data.pet_id }}
        </router-link>
      </div>
      <div class="col-md-6">
        <router-link
          v-if="notificationDetails.data.activity_by == 'BREEDER'"
          class="details-link"
          :to="{
            path: '/customer/' + user.customer_id + '/transaction-navigation'
          }"
        >
          {{ notificationDetails.data.command }}
        </router-link>

        <router-link
          v-else
          class="details-link"
          :to="{
            path: '/breeder/' + user.breeder_id + '/transaction-navs'
          }"
        >
          {{ notificationDetails.data.command }}
        </router-link>
      </div>
    </div>

    <div
      v-if="
        notificationDetails.type ==
          'App%5CNotifications%5CVisitRequestStatusNotification'
      "
      class="row font-weight-bold"
    >
      <label class="control-label col-md-4">{{ fPetId }} :</label>
      <div class="col-md-8">
        <router-link
          target="_blank"
          class="details-link"
          :to="{
            path:
              '/breeder/' +
              notificationDetails.data.details.breeder.id +
              '/pets/show/' +
              notificationDetails.data.pet_id
          }"
        >
          #{{ notificationDetails.data.details.pet_id }}
        </router-link>
      </div>
    </div>
    <div
      v-if="
        notificationDetails.type == 'App%5CNotifications%5CSoldNotifications' ||
          notificationDetails.type ==
            'App%5CNotifications%5CPetStatusNotifications'
      "
      class="row font-weight-bold"
    >
      <label class="control-label col-md-4">{{ fPetName }} :</label>
      <div class="col-md-8">
        {{ notificationDetails.data.details.name }}
      </div>
    </div>
    <div
      v-if="
        notificationDetails.type ==
          'App%5CNotifications%5CVisitRequestStatusNotification'
      "
      class="row font-weight-bold"
    >
      <label class="control-label col-md-4">{{ fPetName }} :</label>
      <div class="col-md-8">
        {{ notificationDetails.data.details.pet.name }}
      </div>
    </div>
    <div
      v-if="
        notificationDetails.type == 'App%5CNotifications%5CSoldNotifications' ||
          notificationDetails.type ==
            'App%5CNotifications%5CPetStatusNotifications' ||
          notificationDetails.type ==
            'App%5CNotifications%5CVisitRequestStatusNotification'
      "
      class="dropdown-divider"
    ></div>

    <div
      v-if="
        (notificationDetails.type ==
          'App%5CNotifications%5CSoldNotifications' ||
          notificationDetails.type ==
            'App%5CNotifications%5CPetStatusNotifications') &&
          notificationDetails.data.details.sell_details
      "
      class="row font-weight-bold"
    >
      <label class="control-label col-md-4">{{ fCustomerId }} :</label>
      <div class="col-md-8">
        <router-link
          target="_blank"
          class="details-link"
          :to="{
            path: '#'
          }"
        >
          #{{ notificationDetails.data.details.sell_details.customer.id }}
        </router-link>
      </div>
    </div>
    <div
      v-if="
        notificationDetails.type ==
          'App%5CNotifications%5CVisitRequestStatusNotification' &&
          notificationDetails.data.details.customer.credential
      "
      class="row font-weight-bold"
    >
      <label class="control-label col-md-4">{{ fCustomerId }} :</label>
      <div class="col-md-8">
        <router-link
          target="_blank"
          class="details-link"
          :to="{
            path: '#'
          }"
        >
          #{{ notificationDetails.data.details.customer.id }}
        </router-link>
      </div>
    </div>
    <div
      v-if="
        notificationDetails.type ==
          'App%5CNotifications%5CPetStatusNotifications' &&
          notificationDetails.data.details.booked_customer
      "
      class="row font-weight-bold"
    >
      <label class="control-label col-md-4">{{ fCustomerId }} :</label>
      <div class="col-md-8">
        <router-link
          target="_blank"
          class="details-link"
          :to="{
            path: '#'
          }"
        >
          #{{ notificationDetails.data.details.booked_customer }}
        </router-link>
      </div>
    </div>

    <div
      v-if="
        notificationDetails.type ==
          ('App%5CNotifications%5CSoldNotifications' ||
            notificationDetails.type ==
              'App%5CNotifications%5CPetStatusNotifications') &&
          notificationDetails.data.details.sell_details
      "
      class="row font-weight-bold"
    >
      <label class="control-label col-md-4">{{ fCustomerName }} :</label>
      <div class="col-md-8">
        {{
          notificationDetails.data.details.sell_details.customer.credential
            .kana_first_name
        }}
        {{
          notificationDetails.data.details.sell_details.customer.credential
            .kana_last_name
        }}
      </div>
    </div>
    <div
      v-if="
        notificationDetails.type ==
          'App%5CNotifications%5CVisitRequestStatusNotification' &&
          notificationDetails.data.details.customer.credential
      "
      class="row font-weight-bold"
    >
      <label class="control-label col-md-4">{{ fCustomerName }} :</label>
      <div class="col-md-8">
        {{
          notificationDetails.data.details.customer.credential.kana_first_name
        }}
        {{
          notificationDetails.data.details.customer.credential.kana_last_name
        }}
      </div>
    </div>
    <div
      v-if="
        notificationDetails.type == 'App%5CNotifications%5CSoldNotifications' ||
          notificationDetails.type ==
            'App%5CNotifications%5CPetStatusNotifications' ||
          notificationDetails.type ==
            'App%5CNotifications%5CVisitRequestStatusNotification'
      "
      class="dropdown-divider"
    ></div>

    <div
      v-if="
        notificationDetails.type == 'App%5CNotifications%5CSoldNotifications' ||
          notificationDetails.type ==
            'App%5CNotifications%5CPetStatusNotifications' ||
          notificationDetails.type ==
            'App%5CNotifications%5CVisitRequestStatusNotification'
      "
      class="row font-weight-bold"
    >
      <label class="control-label col-md-4">{{ fBreederId }} :</label>
      <div class="col-md-8">
        <router-link
          target="_blank"
          class="details-link"
          :to="{
            path:
              '/breeder/' +
              notificationDetails.data.details.breeder.id +
              '/profile'
          }"
        >
          #{{ notificationDetails.data.details.breeder.id }}
        </router-link>
      </div>
    </div>
    <div
      v-if="
        notificationDetails.type == 'App%5CNotifications%5CSoldNotifications' ||
          notificationDetails.type ==
            'App%5CNotifications%5CPetStatusNotifications' ||
          notificationDetails.type ==
            'App%5CNotifications%5CVisitRequestStatusNotification'
      "
      class="row font-weight-bold"
    >
      <label class="control-label col-md-4">{{ fBreederName }} :</label>
      <div class="col-md-8">
        {{ notificationDetails.data.details.breeder.company_name }}
      </div>
    </div>

    <div
      v-if="
        notificationDetails.type ==
          'App%5CNotifications%5CVisitRequestStatusNotification'
      "
      class="dropdown-divider"
    ></div>

    <div
      v-if="
        notificationDetails.type ==
          'App%5CNotifications%5CVisitRequestStatusNotification'
      "
      class="row"
    >
      <label class="control-label col-md-4 font-weight-bold"
        >{{ fPrimaryDate }} :</label
      >
      <div class="col-md-8">
        {{ notificationDetails.data.details.primary_date }}
      </div>
      <label class="control-label col-md-4 font-weight-bold"
        >{{ fSecondaryDate }} :</label
      >
      <div class="col-md-8">
        {{ notificationDetails.data.details.secondary_date }}
      </div>
      <label class="control-label col-md-4 font-weight-bold"
        >{{ fVisitTo }} :</label
      >
      <div class="col-md-8">
        {{ notificationDetails.data.details.visit_to }}
      </div>
      <label class="control-label col-md-4 font-weight-bold"
        >{{ fVisitWithPet }} :</label
      >
      <div class="col-md-8">
        {{ notificationDetails.data.details.visit_with_pet }}
      </div>
      <label class="control-label col-md-4 font-weight-bold"
        >{{ fVisitStatus }} :</label
      >
      <div class="col-md-8">
        {{ notificationDetails.data.details.status }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  fPetId,
  fPetName,
  fCustomerId,
  fCustomerName,
  fBreederId,
  fBreederName,
  fPrimaryDate,
  fSecondaryDate,
  fVisitTo,
  fVisitWithPet,
  fVisitStatus
} from "@/utils/trans/ag-notification.js";
export default {
  name: "IxNotificationDetails",
  data() {
    return {
      fPetId: fPetId,
      fPetName: fPetName,
      fCustomerId: fCustomerId,
      fCustomerName: fCustomerName,
      fBreederId: fBreederId,
      fBreederName: fBreederName,
      fPrimaryDate: fPrimaryDate,
      fSecondaryDate: fSecondaryDate,
      fVisitTo: fVisitTo,
      fVisitWithPet: fVisitWithPet,
      fVisitStatus: fVisitStatus
    };
  },
  //components: {},

  computed: {
    ...mapGetters({
      user: "auth/loggedInData"
    })
  },

  props: ["notificationDetails"]
};
</script>

<style scoped>
.details-link {
  color: #650cb4;
}
</style>
