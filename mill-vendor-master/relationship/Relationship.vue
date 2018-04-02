<template>
  <div id="tabhight">

    <div class="row">
      <div class="col-md-6">
        <p style="color: #25AAE1;font-size:15px">Mill Vendor Master > {{ attributions.vendorId }} {{ attributions.venderName }} > Relationship</p>
      </div>
    </div>

    <div class="nav-tabs-custom" style="margin-bottom: 0px">
      <ul class="nav nav-tabs" id="tabs" style="background-color: #FAFAFA;">
        <li class="active">
          <a href="#Relationship" data-toggle="tab">Relationship</a>
        </li>
        <div class="pull-right">
          <router-link to="/MASTER-DATA/VPS-EXTENSION/MILL-VENDOR-MASTER">
            <button type="button" class="btn btn-danger" style="width: 66px;">Back</button>
          </router-link>
        </div>
      </ul>

      <div class="tab-content" style="display:block;height: calc(100vh - 210px);overflow-y: auto;overflow-x: hidden;border-top: 3px solid #DDDDDD;">

        <div class="tab-pane active" id="Relationship" style="padding-left: 15px;padding-right: 15px">
          <br/>
          <div class="row">
            <div class="col-md-5">
              <strong class="field-title">Parent Manufacturing Vendor</strong>
              <a class="btn" style="padding:2px 5px;" @click="showVendorDialog = true">
                <i class="fa fa-pencil-square-o"></i>
              </a>
              <a class="btn" style="padding:2px 5px;" @click="showVendorChangeLog = true">
                <i class="fa fa-search"></i>
              </a>
              <P></P> 
              <!-- <multi-select :options="vendorList" v-model="selectedVendor" id-field="profile_id" label-field="vendor_name"/> -->
              <div v-if="selectedVendor"><a  style="font-size:14px;">{{ vendorMap[selectedVendor['profile_id']] }}</a></div>
              <br v-if="!selectedVendor"/> 
              <hr>
            </div>
          </div>
<!--
          <div class="row">
            <br/>
            <div class="col-md-6">
              <strong class="field-title">Other Manufacturing Vendors</strong>
              <a class="btn" style="padding:2px 5px;" @click="showOtherDialog = true">
                <i class="fa fa-pencil-square-o"></i>
              </a>
              <a class="btn" style="padding:2px 5px;"  @click="showOtherChangeLog = true">
                <i class="fa fa-search"></i>
              </a>
              <table class="table">
                <tbody>
                  <tr class="trHeader">
                    <th style="width: 65%;" class="thcss">Manufacturing Vendor</th>
                    <th style="width: 35%;" class="thcss">Relationship</th>
                  </tr>
                  <tr class="trBody" v-for="item in relationship.otherManfacturingVendors">
                    <td class="thBody" style="text-align: center;">
                      <a v-if="item.selectedVendor">{{ vendorMap[item.selectedVendor['profile_id']] }}</a>
                    </td>
                    <td class="thBody" style="text-align: center;">
                      <a v-if="item.selectedRelationship">{{ relationshipMap[item.selectedRelationship.code] }}</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>  
          -->
        </div>

      </div>

    </div>

    <modal 
      :show="showVendorDialog"
      @show="showVendorDialog = true"
      @hide="showVendorDialog = false"
      :dialog-style="vendorDialogStyle">
      <div class="header">
        <h4 class="title" style="display: inline-block;">Editing</h4>
        <span class="pull-right" style="cursor: pointer;" @click="showVendorDialog = false">X</span>
      </div>
      <div class="content" style="padding-left: 20px;padding-right: 20px">
        <div class="form-group">
          <label class="field-title">Parent Manufacturing Vendor</label>
          <select2 v-model="selectedVendorCopy" :ajax="vendorListAjax" id-field="profile_id" label-field="vendor_name" :is-multiple="false" :min-input-length="1"/>                
          <!-- <multi-select  :filter="true" :options="vendorList" v-model="selectedVendorCopy" id-field="profile_id" label-field="vendor_name"/> -->
        </div>
        <div class="form-group">
          <br/>
          <label class="field-title">Change Description*</label>
          <textarea rows="6" cols="100" v-model="vendorChangeLog" style="width: 100%"></textarea>
          <!-- <textarea class="form-control" rows="4" v-model="vendorChangeLog"></textarea> -->
        </div>
        <div class="pull-right">
          <button class="btn btn-success" @click="onSaveVendorBtnClicked">Save</button>
        </div>
      </div>
    </modal>

    <modal
      :show="showOtherDialog"
      @show="showOtherDialog = true"
      @hide="showOtherDialog = false"
      :dialog-style="otherDialogStyle">
      <div class="header">
        <h4 style="display: inline-block;">Editing</h4>
        <span class="pull-right" style="cursor: pointer;" @click="showOtherDialog = false">X</span>
      </div>
      <div class="content">
        <label class="field-title">Other Manufacturing Vendors</label>
        <table class="table">
          <tbody>
            <tr class="trHeader">
              <th style="width: 60%;" class="thcss">Manufacturing Vendor</th>
              <th style="width: 30%;" class="thcss">Relationship</th>
              <th style="width: 10%;" class="thcss">
                <a class="btn" @click="otherMfgVendorsCopy.push({})">
                  <i class="fa fa-plus"></i>
                  Add
                </a>
              </th>
            </tr>
            <tr v-for="item in otherMfgVendorsCopy" class="trBody">
              <td class="thBody">
                <select2 :options="vendorList" v-model="item.selectedVendor" id-field="profile_id" label-field="vendor_name" :is-multiple="false" :min-input-length="1"/>                
                <!-- <multi-select :filter="true" :options="vendorList" v-model="item.selectedVendor" id-field="profile_id" label-field="vendor_name"/> -->
              </td>
              <td class="thBody">
                <multi-select :options="relationshipOptions" v-model="item.selectedRelationship" id-field="code" label-field="name"/>
              </td>
              <td class="thBody">
                <a class="btn" @click="otherMfgVendorsCopy = otherMfgVendorsCopy.filter(copy => copy !== item)">
                  <i class="fa fa-trash"></i>
                  Delete
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="form-group">
          <label class="field-title">Change Description*</label>
          <textarea rows="6" cols="100" v-model="otherChangeLog" style="width: 100%"></textarea>
        </div>
        <div class="pull-right">
          <button class="btn btn-success" @click="onSaveOthersBtnClicked">Save</button>
        </div>
      </div>
    </modal>
    <modal
      :show="showVendorChangeLog"
      @show="showVendorChangeLog = true"
      @hide="showVendorChangeLog = false"
      :dialog-style="vendorChangeLogStyle">
      <div class="header">
        <h4 style="display: inline-block;">Change History</h4>
        <span class="pull-right" style="cursor: pointer;" @click="showVendorChangeLog = false">X</span>
      </div>
      <div class="content">
        <datatable :options="vendorChangeLogDatatableOptions" :data="vendorChangeHistory"/>
      </div>
    </modal>   
    <modal
      :show="showOtherChangeLog"
      @show="showOtherChangeLog = true"
      @hide="showOtherChangeLog = false"
      :dialog-style="vendorChangeLogStyle">
      <div class="header">
        <h4 style="display: inline-block;">Change History</h4>
        <span class="pull-right" style="cursor: pointer;" @click="showOtherChangeLog = false">X</span>
      </div>
      <div class="content">
        <datatable :options="vendorChangeLogDatatableOptions" :data="otherChangeHistory"/>
      </div>
    </modal>
  </div>
</template>

<script>
  import _ from 'lodash'
  import {
    USER,
    USER_FULL_NAME,
    ALERT_DANGER,
    ALERT_SUCCESS
  } from 'src/store/definition'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import MultiSelect from 'src/components/common/MultiSelect'
  import Select2 from 'src/components/common/Select2'
  import {
    getManfacturingVendorRelationship,
    getMfgVendors,
    updateManfacturingVendorRelationship,
    updateParentManfacturingVendor,
    getchangeLogDetails,
    getDropDownList,
    getmillVendorMaster
  } from '../service'
  import Modal from 'src/components/common/Modal'
  import Datatable from 'src/components/common/datatable2/LocalDataWrapper'

  export default {
    components: {
      Select2,
      MultiSelect,
      Modal,
      Datatable
    },
    data () {
      return {
        id: null,
        attributions: {},
        vendorList: [],
        selectedVendor: null,
        relationshipOptions: [],
        vendorMap: {},
        relationshipMap: {},
        showVendorDialog: false,
        showOtherDialog: false,
        showVendorChangeLog: false,
        showOtherChangeLog: false,
        vendorChangeLog: null,
        otherChangeLog: null,
        otherMfgVendorsCopy: [],
        selectedVendorCopy: null,
        vendorDialogStyle: {
          width: '850px',
          height: '520px',
          overflow: 'auto'
        },
        otherDialogStyle: {
          width: '850px',
          height: '520px',
          overflow: 'auto'
        },
        vendorChangeLogStyle: {
          width: '900px',
          height: '520px',
          overflow: 'auto'
        },
        relationship: {
          profileId: null,
          vendorId: null,
          vendorName: null,
          otherManfacturingVendors: []
        },
        vendorChangeHistory: [],
        otherChangeHistory: [],
        vendorChangeLogDatatableOptions: {
          columns: [
            {
              label: 'Change Date',
              field: 'change_date',
              sortable: true,
              width: 130,
              filter: {
                type: 'text'
              }
            },
            {
              label: 'Changed By',
              field: 'change_by',
              sortable: true,
              width: 145,
              filter: {
                type: 'text'
              }
            },
            {
              label: 'Change Description',
              field: 'log_message',
              width: 540,
              filter: {
                type: 'text'
              }
            }
          ]
        },
        vendorListAjax: {
          transport: (params, success, failure) => {
            let term = params.data.term
            let results = this.vendorList
            let temp = []
            if (term) {
              term = term.toLowerCase()
              results.map(item => {
                if (item['vendor_name'].toLowerCase().indexOf(term) !== -1 && temp.length < 10) {
                  temp.push(item)
                }
              })
              // results = results.filter(item => item['vendor_name'].toLowerCase().indexOf(term) !== -1)
            }
            console.log(temp)
            success(temp)
          }
        }
      }
    },
    computed: {
      ...mapGetters({
        user: USER,
        userFullName: USER_FULL_NAME
      })
    },
    watch: {
      showVendorDialog () {
        if (this.showVendorDialog) {
          this.selectedVendorCopy = _.cloneDeep(this.selectedVendor)
        }
        this.otherChangeLog = ''
        this.vendorChangeLog = ''
      },
      showOtherDialog () {
        if (this.showOtherDialog) {
          this.otherMfgVendorsCopy = _.cloneDeep(this.relationship.otherManfacturingVendors)
        }
        this.otherChangeLog = ''
        this.vendorChangeLog = ''
      },
      showVendorChangeLog () {
        if (this.showVendorChangeLog) {
          getchangeLogDetails({
            token: this.user.token,
            millVendorID: _.toInteger(this.id),
            changeLogID: 'MILL_VENDOR_MASTER_PAR_VEN'
          }).then(list => {
            this.vendorChangeHistory = list.reverse()
          })
        }
      },
      showOtherChangeLog () {
        if (this.showOtherChangeLog) {
          getchangeLogDetails({
            token: this.user.token,
            millVendorID: _.toInteger(this.id),
            changeLogID: 'MILL_VENDOR_MASTER_OTH_VEN'
          }).then(list => {
            this.otherChangeHistory = list.reverse()
          })
        }
      }
    },
    methods: {
      ...mapActions({
        alertDanger: ALERT_DANGER,
        alertSuccess: ALERT_SUCCESS
      }),
      onSaveVendorBtnClicked () {
        let checklogMessage = true
        if (this.vendorChangeLog.trim() === '') {
          checklogMessage = false
        }
        if (this.selectedVendorCopy != null && checklogMessage === true) {
          updateParentManfacturingVendor({
            token: this.user.token,
            formData: {
              id: _.toInteger(this.id),
              profileId: _.toString(this.selectedVendorCopy['profile_id']),
              changeLogId: 'MILL_VENDOR_MASTER_PAR_VEN',
              parentID: _.toInteger(this.id),
              logMessage: this.vendorChangeLog,
              changeBy: this.userFullName
            }
          }).then(() => {
            this.selectedVendor = _.cloneDeep(this.selectedVendorCopy)
            this.showVendorDialog = false
            this.alertSuccess({
              message: 'Save successfully.'
            })
          })
        }
        if (!checklogMessage) {
          this.alertDanger({
            message: 'The change description can not be empty.'
          })
        }
        this.vendorChangeLog = ''
      },
      onSaveOthersBtnClicked () {
        let otherRelationships = this.otherMfgVendorsCopy.map(item => ({
          mfgProfileId: item.selectedVendor ? item.selectedVendor['profile_id'] : null,
          relationship: item.selectedRelationship ? item.selectedRelationship.code : null
        }))
        let formData = {
          changeLogId: 'MILL_VENDOR_MASTER_OTH_VEN',
          parentID: _.toInteger(this.id),
          logMessage: this.otherChangeLog,
          changeBy: this.userFullName,
          otherRelationship: otherRelationships
        }
        let checklogMessage = true
        if (this.otherChangeLog.trim() === '') {
          checklogMessage = false
        }
        if (checklogMessage) {
          Promise.all(
            updateManfacturingVendorRelationship({
              token: this.user.token,
              formData: formData
            })
          ).then(() => {
            this.relationship.otherManfacturingVendors = _.cloneDeep(this.otherMfgVendorsCopy)
            this.showOtherDialog = false
            this.alertSuccess({
              message: 'Save successfully.'
            })
          }).catch(() => {
            this.relationship.otherManfacturingVendors = _.cloneDeep(this.otherMfgVendorsCopy)
            this.showOtherDialog = false
            this.alertSuccess({
              message: 'Save successfully.'
            })
          })
        }
        if (!checklogMessage) {
          this.alertDanger({
            message: 'The change description can not be empty.'
          })
        }
        this.otherChangeLog = ''
      }
    },
    created () {
      this.id = this.$route.params.id
    },
    mounted () {
      Promise.all([
        getMfgVendors({
          token: this.user.token
        }),
        getManfacturingVendorRelationship({
          token: this.user.token,
          id: this.id
        }),
        getDropDownList({
          token: this.user.token,
          codeTableId: 'MILL_VENDOR_MFG_REL'
        })
      ]).then(([vendorList, relationship, relationshipOptions]) => {
        this.vendorList = vendorList
        console.log(vendorList)
        this.relationship = relationship
        this.relationshipOptions = relationshipOptions
        this.vendorMap = vendorList.reduce((map, item) => {
          map[item['profile_id']] = item['vendor_name']
          return map
        }, {})
        this.relationshipMap = relationshipOptions.reduce((map, item) => {
          map[item.code] = item.name
          return map
        }, {})
        // if (relationship && relationship.vendorId) {
        this.selectedVendor = vendorList.find(vendor => vendor['profile_id'] === relationship.profileId)
        // }
        if (this.relationship && _.isArray(this.relationship.otherManfacturingVendors)) {
          this.relationship.otherManfacturingVendors = this.relationship.otherManfacturingVendors.map(item => ({
            ...item,
            selectedVendor: this.vendorList.find(vendor => vendor['profile_id'] === item['mfg_profile_id']),
            selectedRelationship: this.relationshipOptions.find(relationship => relationship.code === item.relationship)
          }))
        }
      })
      getmillVendorMaster({
        token: this.user.token,
        millVendorID: this.$route.params.id
      }).then(attributions => {
        this.attributions = attributions
      })
      this.vendorChangeLog = ''
      this.otherChangeLog = ''
    }
  }
</script>

<style scoped>
  * {
    font-family: 'Roboto Condensed', sans-serif;
  }
  hr {
    margin-top: 10px;
  }
  .fa {
    font-family: FontAwesome;
  }
  li {  
    border-top-left-radius: 0.4em;
    border-top-right-radius: 0.4em;
  }  
  .nav-tabs-custom>.nav-tabs>li.active>a, .nav-tabs-custom>.nav-tabs>li.active:hover>a {
  background-color: #25AAE1 !important;
    color: #FFFFFF;
  }
  .nav-tabs-custom>.nav-tabs>li.active {
   border-top-color: #25AAE1;
  }
  .box {
    border-top: 3px solid #FFFFFF !important;
  }
  .nav-tabs-custom>.nav-tabs>li>a {
    border-radius: 0em !important;
  }
  .nav-tabs-custom>.nav-tabs>li.active>a {
    border-top-color: #25AAE1 !important;
    border-left-color: #25AAE1 !important;
    border-right-color: #25AAE1 !important;
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
  button.ms-choice{
    height: 23px !important;
  }
</style>