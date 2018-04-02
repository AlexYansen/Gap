<template>
    <div id="tabhight">


        <div class="row">
            <div class="col-md-6">
                <p style="color: #25AAE1;font-size:15px">Mill Facility Master > {{ attributions.facilityID }} {{ attributions.facilityName }}  > Attribution</p>
            </div>
        </div>

        <div class="nav-tabs-custom" style="margin-bottom: 0px">
                <ul class="nav nav-tabs" id="tabs" style="background-color: #FAFAFA;">
                    <li class="active">
                        <a href="#Attribution" data-toggle="tab">Attribution</a>
                    </li>
                    <router-link to="/MASTER-DATA/VPS-EXTENSION/MILL-FACILITY-MASTER">
                        <button type="button" class="btn btn-danger pull-right" style="width: 66px;">Back</button>
                    </router-link>
                </ul>
  
                <div class="tab-content" id="tabContent" style="display:block;height: calc(100vh - 210px);overflow-y: auto;overflow-x: hidden;border-top: 3px solid #DDDDDD;">

                    <div class="tab-pane active" id="Attribution" style="padding-left: 15px;padding-right: 15px" >
                      <br/>
                      <div class="row">
                        <div class="col-md-5">
                          <strong class="field-title">
                                Facility ID
                          </strong>        
                          <P></P>                  
                          <a v-if="attributions.facilityID !== 'null'">{{ attributions.facilityID }}</a>    
                          <br v-if="attributions.facilityID === 'null'"/>                       
                          <hr>                      
                          <strong class="field-title">
                                Status
                          </strong>
                          <a @click="showEditStatus" class="btn" style="padding:2px 5px;"><i class="fa fa-pencil-square-o"></i></a>                           
                          <a @click="showHistoryStatus" class="btn" style="padding:2px 5px;"><i class="fa fa-search"></i></a>  
                          <P></P> 
                          <a v-if="attributions.status !== null">{{ attributions.status }}</a>    
                          <br v-if="attributions.status === null"/>                       
                          <hr>
                        </div>
                          <div class="col-md-5">
                            <strong class="field-title">
                                 Facility Name
                            </strong>  
                            <a @click="showEditFacilityName" class="btn" style="padding:2px 5px;"><i class="fa fa-pencil-square-o"></i></a>                           
                            <a @click="showHistoryFacilityName" class="btn" style="padding:2px 5px;"><i class="fa fa-search"></i></a>         
                            <P></P>                  
                            <a v-if="attributions.facilityName !== 'null'">{{ attributions.facilityName }}</a>    
                            <br v-if="attributions.facilityName === 'null'"/>                       
                            <hr>
                            <strong class="field-title">
                                 Country of Origin
                            </strong> 
                            <a @click="showEditCountry" class="btn" style="padding:2px 5px;"><i class="fa fa-pencil-square-o"></i></a>                           
                            <a @click="showHistoryCountry" class="btn" style="padding:2px 5px;"><i class="fa fa-search"></i></a>         
                            <P></P>                  
                            <a v-if="attributions.countryOfOrigin !== null">{{ attributions.countryOfOrigin }}</a>  
                            <br v-if="attributions.countryOfOrigin === null"/>                       
                            <hr>     
                          </div>
                      </div>    

                      <br/>

                      <div class="row">
                        <div class="col-md-4">  
                            <strong class="field-title">Categories</strong>
                            <a @click="showEdit" class="btn" style="padding:2px 5px;"><i class="fa fa-pencil-square-o"></i></a>                           
                            <a @click="showHistory" class="btn" style="padding:2px 5px;"><i class="fa fa-search"></i></a>
                            <table class="table">
                                <tbody>
                                    <tr class="trHeader">
                                        <th style="width: 10%;" class="thcss">Primary?</th>
                                        <th style="width: 28%;" class="thcss">Category</th>                                
                                    </tr>
                                    <tr v-if="!blackList" v-for="categorie in categorys" class="trBody">                                 
                                        <th class="thBody">                                                                                 
                                           <i v-if="categorie.isPrimary === 'Y'" class="fa fa-check fa-1" style="color: rgb(0, 113, 60); font-size: 14px;" aria-hidden="true"></i>
                                        </th>
                                        <td class="thBody">                                           
                                            <a>{{ categorie.category }}</a>  
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <a v-if="blackList" style="margin-left:150px;border-color:#ddd !important;background-color: #FCFCFC !important;">No Record</a>
                        </div>
                      </div>   

                      <br>

                      
                    </div>

                </div>

        </div>

            <div>
                <view-status-change-history :changeHistory="changeLogDetailsStatus" v-model="showhistoryStatus"/>
            </div>
            <div>
                <edit-field-status :statusOptions="statusOptions" :countries="countries" :changeBy="changeBy" :countryOfOrigin="attributions.countryOfOrigin" :facilityName="attributions.facilityName" :status="attributions.status" :parentID="parentID" v-model="showeditStatus"/>
            </div> 
            <div>
                <view-facility-name-change-history :changeHistory="changeLogDetailsFacilityName" v-model="showhistoryFacilityName"/>
            </div>
            <div>
                <edit-field-facility-name :statusOptions="statusOptions" :countries="countries" :changeBy="changeBy" :countryOfOrigin="attributions.countryOfOrigin" :facilityName="attributions.facilityName" :status="attributions.status" :parentID="parentID" v-model="showeditFacilityName"/>
            </div> 
            <div>
                <view-country-change-history :changeHistory="changeLogDetailsCountry" v-model="showhistoryCountry"/>
            </div>
            <div>
                <edit-field-country :statusOptions="statusOptions" :countries="countries" :changeBy="changeBy" :countryOfOrigin="attributions.countryOfOrigin" :facilityName="attributions.facilityName" :status="attributions.status" :parentID="parentID" v-model="showeditCountry"/>
            </div> 
            <div>
                <view-change-history :changeHistory="changeLogDetails" v-model="showhistory"/>
            </div>
            <div>
                <edit-field-group :categoryOptions="categoryOptions" :editCategories="attributions.categories" :changeBy="changeBy"  :parentID="parentID" v-model="showedit"/>
            </div> 

    </div>
</template>

<script>
    // import _ from 'lodash'
    import $ from 'jquery'
    import { ResizeSensor } from 'css-element-queries'
    import Box from 'src/components/common/Box'
    import Modal from 'src/components/common/Modal'
    import ViewChangeHistory from './ViewCategoriesChangeHistory'
    import EditFieldGroup from './EditFieldGroup'
    import ViewStatusChangeHistory from './ViewStatusChangeHistory'
    import EditFieldStatus from './EditFieldStatus'
    import EditFieldFacilityName from './EditFieldFacilityName'
    import ViewFacilityNameChangeHistory from './ViewFacilityNameChangeHistory'
    import ViewCountryChangeHistory from './ViewCountryChangeHistory'
    import EditFieldCountry from './EditFieldCountry'
    import AttributionService from './AttributionService'
    import {
      countries,
      categories
    } from 'src/components/common/store/definition'
    import {
        USER,
        ALERT_DANGER
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
        Modal,
        Box,
        ViewChangeHistory,
        EditFieldGroup,
        ViewStatusChangeHistory,
        EditFieldStatus,
        ViewFacilityNameChangeHistory,
        EditFieldFacilityName,
        ViewCountryChangeHistory,
        EditFieldCountry
      },
      data () {
        return {
          boxClass: '',
          showeditCountry: false,
          showhistoryCountry: false,
          showeditFacilityName: false,
          showhistoryFacilityName: false,
          showeditStatus: false,
          showhistoryStatus: false,
          showhistory: false,
          showedit: false,
          tabHeights: null,
          attributions: {},
          categorys: [],
          blackList: false,
          categoryOptions: [],
          statusOptions: [],
          parentID: null,
          changeBy: null,
          changeLogDetails: [],
          changeLogDetailsFacilityName: [],
          changeLogDetailsCountry: [],
          changeLogDetailsStatus: [],
          loading2: false
        }
      },
      methods: {
        ...mapActions({
          alertDanger: ALERT_DANGER
        }),
        showEditCountry () {
          this.showeditCountry = true
        },
        showHistoryCountry () {
          this.showhistoryCountry = true
        },
        showEditFacilityName () {
          this.showeditFacilityName = true
        },
        showHistoryFacilityName () {
          this.showhistoryFacilityName = true
        },
        showEditStatus () {
          this.showeditStatus = true
        },
        showHistoryStatus () {
          this.showhistoryStatus = true
        },
        showHistory () {
          this.showhistory = true
        },
        showEdit () {
          this.showedit = true
        },
        onContentResized () {
          let tabHeights = $('#tabhight').height() - 20
          $('tabContent').height(tabHeights)
          // $('.tab-content').animate({
          //   height: tabHeights
          // }, '1000')
        },
        reloadData () {
          Promise.all([
            this.$attribution.getMillFacilityMasterAttr({
              millFacilityID: this.$route.params.id,
              token: this.user.token
            }),
            this.$attribution.getCategorys({
              token: this.user.token
            }),
            this.$attribution.getFacilityMasterStatus({
              token: this.user.token
            })
          ]).then(results => {
            let [attribution, categoryOption, statusOption] = results
            this.attributions = attribution
            this.categorys = JSON.parse(JSON.stringify(attribution.categories))
            if (this.categorys.length === 0) {
              // this.categorys.push({
              //   isPrimary: null,
              //   category: 'No record'
              // })
              this.blackList = true
              attribution.categories.push({
                isPrimary: null,
                category: null
              })
            } else {
              this.blackList = false
            }
            this.categoryOptions = categoryOption
            this.statusOptions = statusOption
            let countryMap = this.countries.reduce((map, country) => {
              map[country.code] = country.name
              return map
            }, {})
            let statusMap = this.statusOptions.reduce((map, status) => {
              map[status.code] = status.name
              return map
            }, {})
            this.attributions.countryOfOrigin = countryMap[this.attributions.countryOfOrigin]
            if (this.attributions.countryOfOrigin === undefined) {
              this.attributions.countryOfOrigin = null
            }
            this.attributions.status = statusMap[this.attributions.status]
            if (this.attributions.status === undefined || this.attributions.status === 'null') {
              this.attributions.status = null
            }
            for (let a = 0; a < this.categorys.length; a++) {
              for (let i = 0; i < categoryOption.length; i++) {
                if (categoryOption[i].master_category_code === this.categorys[a].category) {
                  this.categorys[a].category = categoryOption[i].l_category_nm
                }
              }
            }
          })
          this.$attribution.getChangeLogDetails({
            millVendorID: this.$route.params.id,
            changeLogID: 'MILL_FACILITY_MASTER_CAT',
            token: this.user.token
          }).then(changeLogDetails => {
            this.changeLogDetails = changeLogDetails.reverse()
          })
          this.$attribution.getChangeLogDetails({
            millVendorID: this.$route.params.id,
            changeLogID: 'MILL_FACILITY_MASTER_FACILITYNAME',
            token: this.user.token
          }).then(changeLogDetails => {
            this.changeLogDetailsFacilityName = changeLogDetails.reverse()
          })
          this.$attribution.getChangeLogDetails({
            millVendorID: this.$route.params.id,
            changeLogID: 'MILL_FACILITY_MASTER_STATUS',
            token: this.user.token
          }).then(changeLogDetails => {
            this.changeLogDetailsStatus = changeLogDetails.reverse()
          })
          this.$attribution.getChangeLogDetails({
            millVendorID: this.$route.params.id,
            changeLogID: 'MILL_FACILITY_MASTER_COUNTRY',
            token: this.user.token
          }).then(changeLogDetails => {
            this.changeLogDetailsCountry = changeLogDetails.reverse()
          })
        }
      },
      watch: {
        showedit () {
          this.reloadData()
        },
        showeditFacilityName () {
          this.reloadData()
        },
        showeditStatus () {
          this.reloadData()
        },
        showeditCountry () {
          this.reloadData()
        }
      },
      computed: {
        ...mapGetters({
          user: USER,
          countries,
          categories
        })
      },
      mounted () {
        $('.btn-box-tool').remove()
        $('.fa-minus').remove()
        $('.box-header').remove()
        this.$paneResizeSensor = new ResizeSensor($('#tabhight'), () => {
          this.onContentResized()
        })
        this.onContentResized()
      },
      created () {
        this.changeBy = this.user.firstName + ' ' + this.user.lastName
        this.parentID = this.$route.params.id
        this.reloadData()
      },
      destroyed () {
        this.$paneResizeSensor.detach()
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
  .tooltip-inner {
    max-width: 500px !important;
    text-align: left !important;
    width: 400px !important;
    height: 200px !important;
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
