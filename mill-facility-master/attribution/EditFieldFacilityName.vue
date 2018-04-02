<template>
    <modal :show="show" @show="show = true" @hide="show = false" :dialog-style="modalDialogStyle">

        <div class="header">
            <h4 class="title" style="display: inline-block;">Editing</h4>
            <span class="pull-right" style="cursor: pointer;" @click="show = false">X</span>
        </div>


  <div class="content" style="padding-left: 20px;padding-right: 20px">
    <div class="row">
      <div class="col-md-12">
        <div>
          <label class="field-title">Facility Name</label>
        </div>
        <div>
            <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="name">
        </div>
        <br/>
        <br/>
        <div>
          <label class="field-title">Change Description*</label> <br/>
          <textarea rows="6" cols="100" v-model="changeHistorys" style="width: 100%"></textarea>
        </div>
      </div>
    </div>
  </div>



        <div class="footer">
            <div class="pull-right">
               <button type="button" @click="save" class="btn btn-success" style="width: 66px;margin-top: 20px;margin-right: 20px;">Save</button>
            </div>
        </div>   

    </modal>
</template>

<script>
  // import _ from 'lodash'
  import Modal from 'src/components/common/Modal'
//   import $ from 'jquery'
  import { pixelize } from 'src/components/common/util'
  import AttributionService from './AttributionService'
  import {
    USER,
    ALERT_DANGER,
    ALERT_SUCCESS
  } from 'src/store/definition'
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  export default {
    mixins: [
      AttributionService
    ],
    components: {
      Modal
    },
    props: {
      value: {
        type: Boolean,
        required: true
      },
      statusOptions: {
        type: Array
      },
      countries: {
        type: Array
      },
      status: {
        type: String
      },
      facilityName: {
        type: String
      },
      countryOfOrigin: {
        type: String
      },
      changeBy: {
        type: String,
        required: true
      },
      parentID: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        show: false,
        changeHistorys: '',
        name: null,
        newStatus: null,
        country: null
      }
    },
    methods: {
      ...mapActions({
        alertDanger: ALERT_DANGER,
        alertSuccess: ALERT_SUCCESS
      }),
      save () {
        let changeList = {
          status: this.newStatus ? this.newStatus.code : null,
          facilityName: this.name,
          countryOfOrigin: this.country ? this.country.code : null
        }
        let facilityNameInfo = {
          changeBy: this.changeBy,
          logMessage: this.changeHistorys,
          changeLogId: 'MILL_FACILITY_MASTER_FACILITYNAME',
          parentID: parseInt(this.$route.params.id),
          changeInfo: changeList
        }
        let checklogMessage = true
        if (facilityNameInfo.logMessage === '') {
          checklogMessage = false
        }
        if (checklogMessage) {
          this.$attribution.updateFacilityMasterAttr({
            Category: facilityNameInfo,
            token: this.user.token
          }).then(() => {
            this.show = false
            this.alertSuccess({
              message: 'Save successfully.'
            })
          }).catch(({ message }) => {
            this.alertDanger({
              message
            })
          })
        } else {
          this.alertDanger({
            message: 'The change description can not be empty.'
          })
        }
      }
    },
    computed: {
      ...mapGetters({
        user: USER
      }),
      modalDialogStyle () {
        return {
          width: pixelize(850),
          height: pixelize(600),
          overflow: 'auto'
        }
      }
    },
    watch: {
      value () {
        this.show = this.value
        this.changeHistorys = ''
      },
      show () {
        this.$emit('input', this.show)
      },
      facilityName () {
        if (this.facilityName === 'null' || this.facilityName === undefined) {
          this.name = ' '
        } else {
          this.name = this.facilityName
        }
      },
      status () {
        if (this.status) {
          this.newStatus = this.statusOptions.find(func => func.name === this.status)
        }
      },
      countryOfOrigin () {
        if (this.countryOfOrigin) {
          this.country = this.countries.find(func => func.name === this.countryOfOrigin)
        }
      }
    }
  }
</script>

<style scoped>
  * {
    font-family: 'Roboto Condensed', sans-serif;
  }
  .fa {
    font-family: FontAwesome;
  }
  .option-label {
    font-weight: 400;
  }  
</style>
