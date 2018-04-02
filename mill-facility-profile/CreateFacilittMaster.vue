<template>
    <modal :show="show" @show="show = true" @hide="show = false" :dialog-style="modalDialogStyle">
        <div class="header">
            <h4 class="title" style="display: inline-block;">Create Facility Master</h4>
            <span class="pull-right" style="cursor: pointer;" @click="show = false">X</span>
        </div>


  <div class="content" style="padding-left: 20px;padding-right: 20px">
    <div class="row">
      <div class="col-md-12">
      	<div>
          <label class="field-title">Mill Facility Name*</label>
        </div>
        <div>
          <input type="text" class="form-control input-sm" v-model="millFacilityName">
        </div>
      	<br/>
        <br/>
        
        <div>
          <label class="field-title">Selected Mill Facility Profiles</label>
        </div>

        <table class="table">
          <tbody>
            <tr class="trHeader">
              <th class="thcss" style="width:10%">Primary?</th>
              <th class="thcss" style="width:40%">Mill Facility Name(Mill Input)</th>
              <th class="thcss" style="width:20%">Mill Vendor ID</th>
              <th class="thcss" style="width:40%">Mill Vendor Name</th>
            </tr>
            <tr class="trBody" v-for="(item, index) in createList">
                <td class="thBody" style="width:10%; text-align: center;">
                   <input @click="checkOnly(item, $event)" type="checkbox" v-model="item.isPrimary">
                </td>
                <td class="thBody" style="width:40%; text-align: center;">                                                                                         
                    <a>{{ item.millFacilityName }}</a>
                </td>
                <td  class="thBody" style="width:20%; text-align: center;">
                    <a>{{ item.millVendorProfileID }}</a>
                </td>
                <td  class="thBody" style="width:40%; text-align: center;">
                    <a>{{ item.millVendorName }}</a>
                </td>
            </tr>
          </tbody>
        </table>

        <div>
          <label class="field-title">Change Description*</label> <br/>
          <textarea rows="6" cols="100" v-model="changeHistorys" style="width: 100%"></textarea>
        </div>
      </div>
    </div>
  </div>



        <div class="footer">
            <div class="pull-right">
               <button type="button" @click="save" class="btn btn-success" style="width: 66px;margin-top: 20px;margin-right: 20px;">Create</button>
            </div>
        </div>   

    </modal>
</template>

<script>
  import $ from 'jquery'
  import Modal from 'src/components/common/Modal'
  import { pixelize } from 'src/components/common/util'
  import Select2 from 'src/components/common/Select2'
  import {
    insertUpdateFacilityMaster
  } from './service'
  import {
    mapActions,
    mapGetters
  } from 'vuex'
  import {
    USER,
    ALERT_DANGER,
    ALERT_SUCCESS
  } from 'src/store/definition'

  export default {
    components: {
      Select2,
      Modal
    },
    props: {
      value: {
        type: Boolean,
        required: true
      },
      assignList: {
        type: Array
      },
      changeBy: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        createList: [],
        profileList: [],
        millFacilityName: '',
        show: false,
        changeHistorys: ''
      }
    },
    methods: {
      ...mapActions({
        alertDanger: ALERT_DANGER,
        alertSuccess: ALERT_SUCCESS
      }),
      checkOnly (item, event) {
        let checked = $(event.target).is(':checked')
        this.createList = this.createList.map(func => ({
          ...func,
          isPrimary: func === item ? checked : false
        }))
      },
      save () {
        let checkFacilityName = true
        let checklogMessage = true
        if (this.millFacilityName === '') {
          checkFacilityName = false
        }
        if (this.changeHistorys === '') {
          checklogMessage = false
        }
        if (checkFacilityName && checklogMessage) {
          for (let a = 0; a < this.createList.length; a++) {
            this.createList[a].isPrimary === true ? this.createList[a].isPrimary = 'Y' : this.createList[a].isPrimary = 'N'
          }
          this.profileList = this.createList.map(item => ({
            isPrimary: item.isPrimary,
            ID: item.ID
          }))
          let millFacilityMaster = {
            changeBy: this.changeBy,
            logMessage: this.changeHistorys,
            changeLogId: 'MILL_FACILITY_MASTER',
            facilityName: this.millFacilityName,
            status: 'ACTIVE',
            profileList: this.profileList
          }
          console.log(millFacilityMaster)
          insertUpdateFacilityMaster({
            token: this.user.token,
            millFacilityMaster: millFacilityMaster
          }).then(() => {
            this.show = false
            this.alertSuccess({
              message: 'Create successfully.'
            })
          }).catch(({ message }) => {
            this.alertDanger({
              message
            })
          })
        } else {
          if (!checkFacilityName) {
            this.alertDanger({
              message: 'Mill Facility Name can not be empty.'
            })
          }
          if (!checklogMessage) {
            this.alertDanger({
              message: 'The change description can not be empty.'
            })
          }
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
      assignList () {
        this.createList = this.assignList
      }
    }
  }
</script>

<style scoped>
  input.input-sm {
    height: 28px !important;
    border: 1px solid #aaa;
    border-radius: 4px;
  }
  * {
    font-family: 'Roboto Condensed', sans-serif;
  }
  .fa {
    font-family: FontAwesome;
  }
  th {
    text-align: center;
  }
  .thcss{
    text-align: center !important;
    vertical-align: middle !important;
    border-color:#ddd !important;
  }
  .thBody{
    vertical-align: middle !important;
    border-color:#ddd !important;
  }
  .trHeader{
    border-top: 1px solid #ddd !important;
    border-bottom: 1px solid #ddd !important;
    background-color: #F0F0F0 !important;
    border-color:#ddd !important;
  }
  .trBody{
    border-bottom: 1px solid #ddd !important;
    background-color: #FCFCFC !important;
    border-color:#ddd !important;
  }  
  .field-title {
    font-size: 15px;
  }
  .option-label {
    font-weight: 400;
  }  
</style>
