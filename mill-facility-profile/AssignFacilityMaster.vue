<template>
    <modal :show="show" @show="show = true" @hide="show = false" :dialog-style="modalDialogStyle">
        <div class="header">
            <h4 class="title" style="display: inline-block;">Assign Facility Master</h4>
            <span class="pull-right" style="cursor: pointer;" @click="show = false">X</span>
        </div>


  <div class="content" style="padding-left: 20px;padding-right: 20px">
    <div class="row">
      <div class="col-md-12">
      	<div>
          <label class="field-title">Mill Facility Master*</label>
          <!-- <select class="input-sm form-control" v-model="facilityID">
            <option v-for="facilityId in facilityIDs" v-bind:value="facilityId">
              {{ facilityId }}
            </option>   -->
            <!--<Select2 :options2="facilityIDs" v-model="facilityID" />-->
            <select2 v-model="facility" :ajax="vendorListAjax" id-field="id" label-field="name" :is-multiple="false" :min-input-length="1"/> 
          <label/>
        </div>
        <br/>
        <div>
          <label class="field-title">Selected Mill Facility Profiles</label>
        </div>

        <table class="table">
          <tbody>
            <tr class="trHeader">
              <th class="thcss" style="width:33%">Mill Facility Name(Mill input)</th>
              <th class="thcss" style="width:33%">Mill Vendor ID</th>
              <th class="thcss" style="width:33%">Mill Vendor Name</th>
            </tr>
            <tr v-for="(item, index) in this.assignList " class="trBody">
              <td class="thBody" style="text-align:center">
                <a>{{
                  item.millFacilityName
                }}</a>
              </td>
              <td class="thBody" style="text-align:center">
                <!-- <input v-model="" class="form-control" style="height:25px;border-color: #aaa;border-radius: 4px;" /> -->
                <a>{{
                  item.millVendorProfileID
                }}</a>
              </td>
              <td class="thBody" style="text-align:center">
                <!-- <input v-model="" class="form-control" style="height:25px;border-color: #aaa;border-radius: 4px;" /> -->
                <a>{{
                  item.millVendorName
                }}</a>
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
               <button type="button" @click="Assign" class="btn btn-success" style="width: 66px;margin-top: 20px;margin-right: 20px;">Assign</button>
            </div>
        </div>   

    </modal>
</template>

<script>
  import Modal from 'src/components/common/Modal'
  import _ from 'lodash'
  import { pixelize } from 'src/components/common/util'
  import Select2 from 'src/components/common/Select2'
  import MultiSelect from 'src/components/common/MultiSelect'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import {
    getFacilityID,
    assignMillFacilityMaster
  } from './service'
  import {
    USER,
    ALERT_SUCCESS,
    ALERT_DANGER
  } from 'src/store/definition'
  export default {
    components: {
      Select2,
      MultiSelect,
      Modal
    },
    props: {
      value: {
        type: Boolean,
        required: true
      },
      assignList: {
        type: Array
      }
    },
    data () {
      return {
        show: false,
        assign: [],
        changeHistorys: '',
        facilityIDs: [], // 后台返回的一个数组，数组每个元素都是一个对象（key为MillFacilityName，value为MillFacilityID）
        facility: null,
        vendorListAjax: {
          transport: (params, success, failure) => {
            let term = params.data.term
            let results = this.facilityIDs
            if (term) {
              term = term.toLowerCase()
            }
            results = results.filter(item => item['name'].toLowerCase().indexOf(term) !== -1)
            console.log(results)
            success(results)
          }
        }
      }
    },
    methods: {
      ...mapActions({
        alertSuccess: ALERT_SUCCESS,
        alertDanger: ALERT_DANGER
      }),
      Assign () {
        // this.facilityID = $('.select2-selection__rendered').eq(6).text().split(' ')[0].substr(1)
        let facilityID = this.facility['id']
        console.log(facilityID)
        let list = {
          changeBy: this.user.firstName + ' ' + this.user.lastName,
          logMessage: this.changeHistorys,
          changeLogId: 'MILL_FACILITY_MASTER',
          facilityID: _.toString(facilityID),
          objId: this.facility.ID,
          assignList: this.assign
        }
        let checkfacilityID = true
        let checklogMessage = true
        if (this.changeHistorys === '') {
          checklogMessage = false
        }
        if (facilityID === '') {
          checkfacilityID = false
        }
        if (checkfacilityID && checklogMessage) {
          assignMillFacilityMaster({
            token: this.user.token,
            info: list
          }).then(() => {
            this.show = false
            this.alertSuccess({
              message: 'Assign successfully.'
            })
          }).catch(({ message }) => {
            this.alertDanger({
              message
            })
          })
        } else {
          if (!checkfacilityID) {
            this.alertDanger({
              message: 'CheckfacilityID is required and can not be repeated.'
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
    mounted () {
      getFacilityID({
        token: this.user.token
      }).then(list => {
        this.facilityIDs = list
        console.log('this.facilityIDs')
        console.log(this.facilityIDs)
      })
    },
    watch: {
      value () {
        this.show = this.value
        this.changeHistorys = ''
      },
      show () {
        this.$emit('input', this.show)
        getFacilityID({
          token: this.user.token
        }).then(list => {
          this.facilityIDs = list
          console.log('this.facilityIDs')
          console.log(this.facilityIDs)
        })
      },
      assignList () {
        this.assign = this.assignList
      }
    }
  }
</script>

<style scoped>
 select.input-sm {
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
