<template>
  <div id="tabhight">

      <div class="row">
        <div class="col-md-6">
          <p style="color: #25AAE1;font-size:15px">Mill Facility Master >  {{ facilityID }} > Relationship</p>
        </div>
      </div>

      <div class="nav-tabs-custom" style="margin-bottom: 0px">
        <ul class="nav nav-tabs" id="tabs" style="background-color: #FAFAFA;">
          <li class="active">
            <a href="#Relationship" data-toggle="tab">Relationship</a>
          </li>
          <div class="pull-right">
            <router-link to="/MASTER-DATA/VPS-EXTENSION/MILL-FACILITY-MASTER">
              <button type="button" class="btn btn-danger" style="width: 66px;">Back</button>
            </router-link>
          </div>
        </ul>
      </div>

      
      <div class="tab-content" style="display:block;height: calc(100vh - 210px);overflow-y: auto;overflow-x: hidden;border-top: 3px solid #DDDDDD;">

        <div class="tab-pane active" id="Relationship" style="padding-left: 15px;padding-right: 15px">
          <br/>
          <div class="row">
            <div class="col-md-5">
                <strong class="field-title">Mill Facility Profiles</strong>
                <a v-if="!blackList" class="btn" style="padding:2px 5px;" @click="showDialog = true">
                  <i class="fa fa-pencil-square-o"></i>
                </a>
                <a class="btn" style="padding:2px 5px;" @click="showChangeLog = true">
                  <i class="fa fa-search"></i>
                </a>
                <P></P>
            </div>
          </div>
          <div class="row">
              <div class="col-md-11">
                <table class="table" v-loading="loading3"  element-loading-text="loading">
                    <tbody>
                        <tr class="trHeader">
                            <th style="width:10%; text-align: center;" class="thcss">Primary?</th>
                            <th style="width:40%; text-align: center;" class="thcss">Mill Facility Name(Mill Input)</th>
                            <th style="width:20%; text-align: center;" class="thcss">Mill Vendor ID</th>
                            <th style="width:40%; text-align: center;" class="thcss">Mill Vendor Name</th>
                        </tr>
                        <tr class="trBody" v-if="!blackList" v-for="(relationship, index) in relationshipList">
                            <td class="thBody" style="width:10%; text-align: center;padding:10px 20px">
                                <i v-if="relationship.primary === 'Y'" class="fa fa-check fa-1" style="color: rgb(0, 113, 60); font-size: 14px;" aria-hidden="true"></i>
                            </td>
                            <td class="thBody" style="width:40%; text-align: center;padding:10px 20px">                                                                                         
                                <a>{{ relationship.millFacilityName }}</a>
                            </td>
                            <td  class="thBody" style="width:20%; text-align: center;padding:10px 20px">
                                <a>{{ relationship.millVendorID }}</a>
                            </td>
                            <td  class="thBody" style="width:40%; text-align: center;padding:10px 20px">
                                <a>{{ relationship.millVendorName }}</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <a v-if="blackList" style="margin-left:500px;border-color:#ddd !important;background-color: #FCFCFC !important;">No Record</a>
              </div>
          </div>
        </div>
      </div>

      <!-- <button class="btn btn-primary" @click="save" >Save</button> -->
  
      <modal 
        :show="showDialog"
        @show="showDialog = true"
        @hide="showDialog = false"
        :dialog-style="profileDialogStyle">
        <div class="header">
          <h4 class="title" style="display: inline-block;">Editing</h4>
          <span class="pull-right" style="cursor: pointer;" @click="showDialog = false">X</span>
        </div>
        <div class="content" style="padding-left: 20px;padding-right: 20px">
          <div rows="6" cols="100">
            <table class="table">
              <tbody>
                <tr class="trHeader">
                    <th style="width:10%; text-align: center;" class="thcss">Primary?</th>
                    <th style="width:40%; text-align: center;" class="thcss">Mill Facility Name(Mill Input)</th>
                    <th style="width:20%; text-align: center;" class="thcss">Mill Vendor ID</th>
                    <th style="width:40%; text-align: center;" class="thcss">Mill Vendor Name</th>
                    <th style="width:40%; text-align: center;" class="thcss">Delete?</th>
                </tr>
                <tr class="trBody" v-for="(relationship, index) in selectRelationship">
                    <td class="thBody" style="width:10%; text-align: center;">
                        <input @click="checkOnly(relationship, $event)" type="checkbox" v-model="relationship.primary">
                    </td>
                    <td class="thBody" style="width:40%; text-align: center;">                                                                                         
                        <a>{{ relationship.millFacilityName }}</a>
                    </td>
                    <td  class="thBody" style="width:20%; text-align: center;">
                        <a>{{ relationship.millVendorID }}</a>
                    </td>
                    <td  class="thBody" style="width:40%; text-align: center;">
                        <a>{{ relationship.millVendorName }}</a>
                    </td>
                    <td style="text-align: center;" class="thBody">
                      <input @click="removeRelationship(selectRelationship, relationship, $event)" type="checkbox">
                    </td>
                </tr>
              </tbody>
            </table>
          </div>
          <br/>
          <div class="form-group">
            <label class="field-title">Change Description*</label>
            <textarea rows="6" cols="100" v-model="changeLog" style="width: 100%"></textarea>
            <!-- <textarea class="form-control" rows="4" v-model="vendorChangeLog"></textarea> -->
          </div>
          <div class="pull-right">
            <button class="btn btn-success" @click="onSaveProfileBtnClicked">Save</button>
          </div>
        </div>
      </modal>
      <modal
        :show="showChangeLog"
        @show="showChangeLog = true"
        @hide="showChangeLog = false"
        :dialog-style="profileChangeLogStyle">
        <div class="header">
          <h4 style="display: inline-block;">Change History</h4>
          <span class="pull-right" style="cursor: pointer;" @click="showChangeLog = false">X</span>
        </div>
        <div class="content">
          <datatable :options="profileChangeLogDatatableOptions" :data="profileChangeHistory"/>
        </div>
      </modal>
  </div>
</template>

<script>
  import _ from 'lodash'
  import $ from 'jquery'
  import Modal from 'src/components/common/Modal'
  import Datatable from 'src/components/common/datatable2/LocalDataWrapper'
  import {
    getMillFacilityRel,
    getchangeLogDetails,
    updateMillFacilityRel
  } from '../service'
  import {
    USER,
    ALERT_SUCCESS,
    ALERT_DANGER
  } from 'src/store/definition'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    components: {
      Modal,
      Datatable
    },
    data () {
      return {
        facilityID: null,
        facilityName: null,
        showDialog: false,
        showChangeLog: false,
        relationshipList: [],
        endList: [],
        blackList: false,
        changeLog: '',
        selectRelationship: [],
        profileChangeHistory: [],
        deleteItem: [],
        profileDialogStyle: {
          width: '850px',
          height: '520px',
          overflow: 'auto'
        },
        profileChangeLogStyle: {
          width: '900px',
          height: '520px',
          overflow: 'auto'
        },
        profileChangeLogDatatableOptions: {
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
        }
      }
    },
    computed: {
      ...mapGetters({
        user: USER
      })
    },
    watch: {
      showDialog () {
        if (this.showDialog) {
          this.changeLog = null
          this.selectRelationship = _.cloneDeep(this.relationshipList)
          for (let a = 0; a < this.selectRelationship.length; a++) {
            if (this.selectRelationship[a].primary === 'Y') {
              this.selectRelationship[a].primary = true
            } else {
              this.selectRelationship[a].primary = false
            }
          }
          this.endList = _.cloneDeep(this.relationshipList)
        }
        this.loadData()
      },
      showChangeLog () {
        if (this.showChangeLog) {
          getchangeLogDetails({
            token: this.user.token,
            millVendorID: this.$route.params.id,
            changeLogID: 'MILL_FACILITY_MASTER'
          }).then(list => {
            this.profileChangeHistory = list.reverse()
          })
        }
      }
    },
    methods: {
      ...mapActions({
        alertSuccess: ALERT_SUCCESS,
        alertDanger: ALERT_DANGER
      }),
      removeRelationship (selectRelationship, relationship, event) {
        let checked = $(event.target).is(':checked')
        if (checked) {
          this.endList = this.endList.map(func => ({
            ...func,
            facilityID: func.id === relationship.id ? null : func.facilityID,
            primary: func.id === relationship.id ? null : func.primary
          }))
        } else {
          this.endList = this.endList.map(func => ({
            ...func,
            facilityID: func.id === relationship.id ? relationship.facilityID : func.facilityID,
            primary: func.id === relationship.id ? relationship.primary : func.primary
          }))
        }
        // selectRelationship = selectRelationship.filter(item => item !== relationship)
        // this.selectRelationship = [...selectRelationship]
      },
      onSaveProfileBtnClicked () {
        let list = {
          changeBy: this.user.firstName + ' ' + this.user.lastName,
          logMessage: this.changeLog,
          changeLogId: 'MILL_FACILITY_MASTER',
          parentID: parseInt(this.$route.params.id),
          profileList: _.cloneDeep(this.endList)
        }
        for (let i = 0; i < list.profileList.length; i++) {
          list.profileList[i].primary === true ? list.profileList[i].primary = 'Y' : list.profileList[i].primary = 'N'
        }
        let checklogMessage = true
        if (list.logMessage === '') {
          checklogMessage = false
        }
        if (checklogMessage) {
          updateMillFacilityRel({
            list: list,
            token: this.user.token
          }).then(() => {
            this.showDialog = false
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
      },
      checkOnly (relationship, event) {
        let checked = $(event.target).is(':checked')
        this.selectRelationship = this.selectRelationship.map(func => ({
          ...func,
          primary: func === relationship ? checked : false
        }))
        this.endList = this.endList.map(func => ({
          ...func,
          primary: func.id === relationship.id ? checked : false
        }))
      },
      loadData () {
        getMillFacilityRel({
          token: this.user.token,
          ID: this.$route.params.id
        }).then(relationshipList => {
          if (relationshipList.length === 0) {
            this.blackList = true
          } else {
            this.blackList = false
          }
          this.relationshipList = relationshipList
          relationshipList.map(item => {
            this.facilityID = item.facilityID
          })
        })
      }
    },
    mounted () {
      this.loadData()
    }
  }
</script>

<style scoped>
  .inputs {  
    height: 28px;
    border-color: #aaa;
    border-radius: 4px;
  }
  hr {
    margin-top: 10px;
  }
  .nav-tabs-custom>.nav-tabs>li.active>a, .nav-tabs-custom>.nav-tabs>li.active:hover>a {
  background-color: #25AAE1 !important;
    color: #FFFFFF;
  }
  li {  
    border-top-left-radius: 0.4em;
    border-top-right-radius: 0.4em;
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
    text-align: center !important;
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
    border-top: 1px solid #ddd !important;
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