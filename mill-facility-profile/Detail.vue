<template>
  <div>
    <div class="row">
      <div class="col-md-12" style="min-height: 30px;">
        <p v-if="generalInfo.parentMillVendor != null" style="color: #25AAE1;font-size:15px">Mill Facility Profile  >  {{ generalInfo.legalCompanyName }}  >  Edit Profile</p>
        <p v-if="generalInfo.parentMillVendor === null"style="color: #25AAE1;font-size:15px">Mill Facility Profile  >  New Profile</p>
      </div>
    </div>

    <div class="nav-tabs-custom">
      <div class="row" style="background-color: #FAFAFA;">
        <div class="col-md-9">
          <ul class="nav nav-tabs" ref="tabs">
            <li class="active">
              <a :href="'#' + prefixed('general-info')" data-toggle="tab">General Information</a>
            </li>           
            <li>
              <a :href="'#' + prefixed('quality-assurance-info')" data-toggle="tab">Quality Assurance Information</a>
            </li>
            <li>
              <a :href="'#' + prefixed('sustainbility-chemicals')" data-toggle="tab">Sustainability & Chemicals</a>
            </li>
            <li>
              <a :href="'#' + prefixed('certifications')" data-toggle="tab">Certifications</a>
            </li>           
            <li>
              <a :href="'#' + prefixed('yarn-fabric')" data-toggle="tab">Yarn and Fabric</a>
            </li> 
            <li>
              <a :href="'#' + prefixed('spinning')" data-toggle="tab">Spinning</a>
            </li>             
            <li>
              <a :href="'#' + prefixed('knitting')" data-toggle="tab">Knitting (Including Sweater Yarns)</a>
            </li> 
            <li>
              <a :href="'#' + prefixed('denim')" data-toggle="tab">Denim – Weaving, Dyeing, Finishing</a>
            </li>
            <li>
              <a :href="'#' + prefixed('wovens')" data-toggle="tab">Wovens(Non-Denim) – Weaving, Dyeing, Finishing</a>
            </li>  
            <li>
              <a :href="'#' + prefixed('printing')" data-toggle="tab">Printing</a>
            </li>       
          </ul>
        </div>
        <div class="col-md-3">
          <span class="pull-right">
            <button v-if="isDisplay" type="button" class="btn btn-success" style="width: 66px;margin-right: 8px;" @click="onSaveBtnClicked"  v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="Saving......">Save</button>
            <router-link to="/MASTER-DATA/VPS-EXTENSION/MILL-FACILITY-PROFILE">
              <button v-if="isDisplay" type="button" class="btn btn-danger" style="width: 66px;">Cancel</button>
            </router-link>
          </span>
        </div>
      </div>
      <div class="tab-content" ref="tabContent" style="display:block;height: calc(100vh - 210px);overflow-y: auto;overflow-x: hidden;border-top: 3px solid #DDDDDD;">

        <div class="tab-pane active" :id="prefixed('general-info')" style="padding-left: 15px;padding-right: 15px">
          <general-information @checkMillVendor="checkMillVendorSave"  @checkFacilityCapabilities="changeFacilityCapabilities" :record-id="recordId" :on-save-btn-clicked="saveGeneral" @saved="saveGeneral = false"/>
        </div>

        <div class="tab-pane" :id="prefixed('quality-assurance-info')" style="padding-left: 15px;padding-right: 15px">
          <quality-assurance-information :record-id="recordId" :on-save-btn-clicked="saveQuality" @saved="saveQuality = false"/>
        </div>

        <div class="tab-pane" :id="prefixed('sustainbility-chemicals')" style="padding-left: 15px;padding-right: 15px">
          <sustainability-chemicals :record-id="recordId" :on-save-btn-clicked="saveSustainability" @saved="saveSustainability = false" />
        </div>

        <div class="tab-pane" :id="prefixed('certifications')" style="padding-left: 15px;padding-right: 15px">
          <certifications :record-id="recordId" :on-save-btn-clicked="saveCertifcations" @saved="saveCertifcations = false" />
        </div>

        <div class="tab-pane" :id="prefixed('yarn-fabric')" style="padding-left: 15px;padding-right: 15px">
          <yarn-fabric :record-id="recordId" :on-save-btn-clicked="saveYarn" @saved="saveYarn = false" />
        </div>

        <div class="tab-pane" :id="prefixed('spinning')" style="padding-left: 15px;padding-right: 15px">
          <spinning :record-id="recordId" :on-save-btn-clicked="saveSpinning" :facility-capabilities="generalInfo.facilityCapabilities" @saved="saveSpinning = false" />
        </div>

        <div class="tab-pane" :id="prefixed('knitting')" style="padding-left: 15px;padding-right: 15px">
          <knitting :record-id="recordId" :on-save-btn-clicked="saveKnitting" :facility-capabilities="generalInfo.facilityCapabilities" @saved="saveKnitting = false" />
        </div>

        <div class="tab-pane" :id="prefixed('denim')" style="padding-left: 15px;padding-right: 15px">
          <denim :record-id="recordId" :on-save-btn-clicked="saveDenim" :facility-capabilities="generalInfo.facilityCapabilities" @saved="saveDenim = false" />
        </div>

        <div class="tab-pane" :id="prefixed('wovens')" style="padding-left: 15px;padding-right: 15px">
          <wovens :record-id="recordId" :on-save-btn-clicked="saveWovens" :facility-capabilities="generalInfo.facilityCapabilities" @saved="saveWovens = false"/>
        </div>
               
        <div class="tab-pane" :id="prefixed('printing')" style="padding-left: 15px;padding-right: 15px">
          <printing :record-id="recordId" :on-save-btn-clicked="savePrinting" :facility-capabilities="generalInfo.facilityCapabilities" @saved="savePrinting = false"/>
        </div>
        <!-- <div class="tab-pane" :id="prefixed('yarn-fabric')" style="padding-left: 15px;padding-right: 15px">
          <yarn-fabric :record-id="recordId" :on-save-btn-clicked="saveYarnFabric" @saved="saveYarnFabric = false"/>
        </div> -->

        <!-- <div class="tab-pane" :id="prefixed('spinning')" style="padding-left: 15px;padding-right: 15px">
          <spinning :record-id="recordId" :on-save-btn-clicked="saveSpinning" @saved="saveSpinning = false"/>
        </div> -->


      </div>
    </div>
     
  </div>
</template>

<script>
  import _ from 'lodash'
  import $ from 'jquery'
  // import { ResizeSensor } from 'css-element-queries'
  import GeneralInformation from './GeneralInformation'
  import QualityAssuranceInformation from './QualityAssuranceInformation'
  import Certifications from './Certifications'
  import SustainabilityChemicals from './SustainabilityChemicals'
  import YarnFabric from './YarnFabric'
  import Spinning from './Spinning'
  import Knitting from './Knitting'
  import Denim from './Denim'
  import Wovens from './Wovens'
  import Printing from './Printing'
  import 'jquery-bootstrap-scrolling-tabs/dist/jquery.scrolling-tabs.min.css'
  import 'jquery-bootstrap-scrolling-tabs/dist/jquery.scrolling-tabs.min.js'
  import {
    getVisibleContentHeight
  } from 'src/components/common/util'
  import {
    USER,
    ALERT_SUCCESS,
    ALERT_DANGER
  } from 'src/store/definition'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import {
    getMillFacilityProfileGeneralInfo
  } from './service'

  export default {
    computed: {
      ...mapGetters({
        user: USER
      })
    },
    components: {
      GeneralInformation,
      QualityAssuranceInformation,
      SustainabilityChemicals,
      Certifications,
      Denim,
      Wovens,
      YarnFabric,
      Printing,
      Spinning,
      Knitting
    },
    data () {
      return {
        isDisplay: false,
        recordId: null,
        saveGeneral: false,
        saveQuality: false,
        saveSustainability: false,
        saveCertifcations: false,
        saveYarn: false,
        saveSpinning: false,
        saveKnitting: false,
        saveDenim: false,
        saveWovens: false,
        savePrinting: false,
        activeTabTitle: 'General Information',
        isScrollingTabsCreated: false,
        generalInfo: {
          facilityCapabilities: []
        },
        checkKnittingShow: false,
        checkDenimShow: false,
        checkWovensShow: false,
        fullscreenLoading: false
      }
    },
    // watch: {
    //   saveGeneral () {
    //     console.log(this.user)
    //   },
    //   activeTabTitle () {
    //     // console.log(this.activeTabTitle)
    //   }
    // },
    watch: {
      '$route' (to, from) {
        this.getGeneralInfo()
      }
    },
    methods: {
      ...mapActions({
        alertSuccess: ALERT_SUCCESS,
        alertDanger: ALERT_DANGER
      }),
      prefixed (id) {
        return 'mill-facility-profile-detail-' + id
      },
      onBrowserHeightChanged () {
        let visibleContentHeight = getVisibleContentHeight()
        let tabHeight = $('.nav-tabs').closest('.scrtabs-tab-container').outerHeight()
        let margin = parseInt($(this.$refs.tabContent).closest('.nav-tabs-custom').css('margin-bottom'))
        let tabContentHeight = visibleContentHeight - tabHeight - margin
        $(this.$refs.tabContent).outerHeight(tabContentHeight)
      },
      onSaveBtnClicked () {
        // const map = {
        //   'General Information': 'saveGeneral'
        // }
        // console.log(map[this.activeTabTitle])
        // this[map[this.activeTabTitle]] = true
        this.saveGeneral = true
      },
      checkMillVendorSave (data) {
        if (data !== 'No') {
          this.recordId = _.toInteger(data)
          this.fullscreenLoading = true
          setTimeout(() => {
            this.fullscreenLoading = false
            this.alertSuccess({
              message: 'Save successfully.'
            })
            let url = '/vps-extension/mill-facility-profile/view-profile/' + this.recordId
            this.$router.replace({ path: url })
          }, 9000) // 尼玛b，不准这样写，9秒瞎写，如果9s保存不完或9s之前就保存完呢？卧槽tmb
          this.saveQuality = true
          this.saveSustainability = true
          this.saveCertifcations = true
          this.saveYarn = true
          this.saveSpinning = true
          this.saveKnitting = true
          this.saveDenim = true
          this.saveWovens = true
          this.savePrinting = true
        }
      },
      changeFacilityCapabilities (data) {
        this.generalInfo.facilityCapabilities = data
      },
      checkSpinningShow () {
        if (this.generalInfo.facilityCapabilities.indexOf('SPINNING') !== -1) {
          // console.log('yesS')
          return true
        } else {
          // console.log('noS')
          return false
        }
      },
      // checkKnittingShow () {
      //   console.log('checkKnittingShow')
      //   if (this.generalInfo.facilityCapabilities.indexOf('KNITTING_KNITTING') !== -1 || this.generalInfo.facilityCapabilities.indexOf('KNITTING_DYEING') !== -1 || this.generalInfo.facilityCapabilities.indexOf('KNITTING_FINISHING') !== -1) {
      //     console.log('kinnitting')
      //     $('.nav-tabs').scrollingTabs()
      //     return true
      //   } else {
      //     $('.nav-tabs').scrollingTabs()
      //     return false
      //   }
      // },
      checkDenimShow () {
        if (this.generalInfo.facilityCapabilities.indexOf('WOVENS_DENIM_WEAVING') !== -1 || this.generalInfo.facilityCapabilities.indexOf('WOVENS_DENIM_DYEING') !== -1 || this.generalInfo.facilityCapabilities.indexOf('WOVENS_DENIM_FINISHING') !== -1) {
          return true
        } else {
          return false
        }
      },
      checkWovensShow () {
        if (this.generalInfo.facilityCapabilities.indexOf('WOVENS_NON_DENIM_WEAVING') !== -1 || this.generalInfo.facilityCapabilities.indexOf('WOVENS_NON_DENIM_DYEING') !== -1 || this.generalInfo.facilityCapabilities.indexOf('WOVENS_NON_DENIM_FINISHING') !== -1) {
          return true
        } else {
          return false
        }
      },
      getGeneralInfo () {
        getMillFacilityProfileGeneralInfo({
          token: this.user.token,
          recordId: this.$route.params.id
        }).then(generalInfo => {
          this.generalInfo = generalInfo
          if (_.isString(this.generalInfo.facilityCapabilities) && this.generalInfo.facilityCapabilities.trim() !== '') {
            this.generalInfo.facilityCapabilities = this.generalInfo.facilityCapabilities.split(',')
          } else {
            this.generalInfo.facilityCapabilities = []
          }
          // $('.nav-tabs').scrollingTabs()
        })
      }
    },
    created () {
      this.recordId = this.$route.params.id
    },
    mounted () {
      console.log('mounted')
      for (let index in this.user.accessGroupList) {
        if (this.user.accessGroupList[index].accessGroup === 'VPSE_MILL_FACILITY_PROFILE_EDIT') {
          this.isDisplay = true
        }
      }
      $('.nav-tabs').scrollingTabs()
      this.getGeneralInfo()
      // $('.nav-tabs').scrollingTabs().on('ready.scrtabs', () => {
      //   this.onBrowserHeightChanged()
      //   this.isScrollingTabsCreated = true
      // })
      // this.$paneResizeSensor = new ResizeSensor($('.main-sidebar'), () => {
      //   this.onBrowserHeightChanged()
      // })
      // this.onBrowserHeightChanged()
      $('a[data-toggle="tab"]').on('click', event => {
        // this.activeTabTitle = event.target.text
        $('div.tab-content').scrollTop(0)
      })
    },
    destroyed () {
      // this.$paneResizeSensor.detach()
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
  .nav-tabs-custom {
    margin-bottom: 0px;
  }
  .nav-tabs-custom>.tab-content {
    overflow-y: auto;
    overflow-x: hidden;
    padding-right: 10px;
    padding-left: 10px;
  }
  li {  
    border-left: 1px solid #fafafa;
    border-right: 1px solid #fafafa;
    background-color: #1F6F9B;
    border-top-left-radius: 0.4em;
    border-top-right-radius: 0.4em;
  }
  .fa {
    font-family: FontAwesome;
  }  
  .nav-tabs-custom>.nav-tabs>li>a {
    color: #FFFFFF;
  }
  .nav-tabs-custom>.nav-tabs>li.active>a, .nav-tabs-custom>.nav-tabs>li.active:hover>a {
    background-color: #25AAE1 !important;
    color: #FFFFFF;
  }
  .nav-tabs-custom>.nav-tabs>li.active {
    border-top-color: #25AAE1;
    border-top-left-radius: 0.4em;
    border-top-right-radius: 0.4em;
  } 
  .box {
    border-top: 3px solid #FFFFFF !important;
  }  
  .nav-tabs-custom>.nav-tabs>li>a {
    border-radius: 0em !important;
    color: #FFFFFF !important;
  }
  .nav-tabs-custom>.nav-tabs>li.active>a {
    border-top-color: #25AAE1 !important;
    border-left-color: #25AAE1 !important;
    border-right-color: #25AAE1 !important;
  }
  .scrtabs-tab-scroll-arrow {
    border: 0px !important;
    background-color: #FAFAFA;
  }
  .nav-tabs>li>a {
    color: #FFFFFF !important;
    margin-right: 0px !important;
  }
  .nav-tabs>li.active>a {
    background-color: #25AAE1 !important;
    margin-right: 0px !important;
  }
  .nav-tabs>li.active {
    background-color: #25AAE1 !important;
  }
  .nav-tabs>li>a:hover {
    background-color: #1F6F9B !important;
    border: 1px solid transparent;
    border-radius: 0.4em 0.4em 0 0;
    margin-right: 0px !important;
  }
  .nav-tabs>li.active>a {
    background-color: #25AAE1 !important;
    border: 1px solid transparent;
    border-radius: 0.4em 0.4em 0 0;
  }
  .nav-tabs>li {
    margin-bottom: 0px!important;
  }
  /*li {  
    background-color: #1F6F9B;
    border-top-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
  }
  .nav-tabs-custom>.nav-tabs>li>a {
    color: #FFFFFF;
  }
  .nav-tabs-custom>.nav-tabs>li.active>a, .nav-tabs-custom>.nav-tabs>li.active:hover>a {
    background-color: #25AAE1 !important;
    color: #FFFFFF;
  }
  .nav-tabs-custom>.nav-tabs>li.active {
    border-top-color: #25AAE1;
    border-top-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
  }*/
</style>
