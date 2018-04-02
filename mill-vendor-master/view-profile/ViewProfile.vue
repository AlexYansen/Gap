<template>
  <div id="tabhight">
    <div class="row">
      <div class="col-md-12">
        <p style="color: #25AAE1;font-size:15px">Mill Vendor Master  >  {{ attributions.vendorId }} {{ attributions.venderName }}  >  Edit Profile</p>
      </div>
    </div>

       <!-- style="height: 0px;padding-bottom: 50%;" -->
      <div class="nav-tabs-custom" style="margin-bottom: 0px">
        <ul class="nav nav-tabs" id="mill-vendor-master-view-profile-tabs" style="background-color: #FAFAFA;">
          <li class="active">
            <a href="#General" data-toggle="tab">General Information</a>
          </li>
          <li>
            <a href="#Business" data-toggle="tab">Business Information</a>
          </li>
          <li>
            <a href="#Research" data-toggle="tab">Research & Development (R&D)</a>
          </li>
          <li>
            <a href="#Quality" data-toggle="tab">Quality Assurance Information</a>
          </li>
          <li>
            <a href="#Attachments" data-toggle="tab">Attachments</a>
          </li>        
          <div class="pull-right">
            <button v-if="isDisplay" type="button" class="btn btn-success" style="width: 66px;margin-right: 8px;" @click="onSaveBtnClicked" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="Saving......" >Save</button>
            <router-link to="/MASTER-DATA/VPS-EXTENSION/MILL-VENDOR-MASTER">
              <button v-if="isDisplay" type="button" class="btn btn-danger" style="width: 66px;">Cancel</button>
            </router-link>
          </div>
        </ul>
        <div class="tab-content"  id="tabContent" style="display:block;height: calc(100vh - 210px);overflow-y: auto;overflow-x: hidden;border-top: 3px solid #DDDDDD;">

          <div class="tab-pane active" id="General" style="padding-left: 15px;padding-right: 15px">                                         
            <GeneralView :vendor-profile-id="vendorProfileId" :on-save-btn-clicked="saveGeneral" @saved="onSaved('saveGeneral')"/>
          </div>

          <div class="tab-pane" id="Business" style="padding-left: 15px;padding-right: 15px">
            <BusinessView :vendor-profile-id="vendorProfileId" :on-save-btn-clicked="saveBusiness" @saved="onSaved('saveBusiness')"/>
          </div>

          <div class="tab-pane" id="Research" style="padding-left: 15px;padding-right: 15px">
            <ResearchView :vendor-profile-id="vendorProfileId" :on-save-btn-clicked="saveResearch" @saved="onSaved('saveResearch')"/>
          </div>

          <div class="tab-pane" id="Quality" style="padding-left: 15px;padding-right: 15px">
            <QualityView :vendor-profile-id="vendorProfileId" :on-save-btn-clicked="saveQuality" @saved="onSaved('saveQuality')"/>
          </div>

          <div class="tab-pane" id="Attachments" style="padding-left: 15px;padding-right: 15px">
            <AttachmentsView :vendor-profile-id="vendorProfileId" :on-save-btn-clicked="saveAttachments" @saved="onSaved('saveAttachments')"/>
          </div>        

        </div>
      </div>
     
  </div>
</template>

<script>
  import $ from 'jquery'
  import { ResizeSensor } from 'css-element-queries'
  import Box from 'src/components/common/Box'
  import Select2 from 'src/components/common/Select2'
  import BusinessView from './Business'
  import GeneralView from './General'
  import ResearchView from './Research'
  import QualityView from './Quality'
  import AttachmentsView from './Attachments'
  import {
    getmillVendorMaster
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
  // import _ from 'lodash'
  export default {
    components: {
      Select2,
      Box,
      BusinessView,
      GeneralView,
      ResearchView,
      QualityView,
      AttachmentsView
    },
    computed: {
      ...mapGetters({
        user: USER
      })
    },
    data () {
      return {
        boxClass: '',
        vendorProfileId: null,
        activeTabTitle: 'General Information',
        saveGeneral: false,
        saveBusiness: false,
        isDisplay: false,
        saveResearch: false,
        saveQuality: false,
        saveAttachments: false,
        attributions: {},
        fullscreenLoading: false
      }
    },
    methods: {
      ...mapActions({
        alertSuccess: ALERT_SUCCESS,
        alertDanger: ALERT_DANGER
      }),
      onSaveBtnClicked () {
        this.fullscreenLoading = true
        setTimeout(() => {
          this.fullscreenLoading = false
          this.alertSuccess({
            message: 'Save successfully.'
          })
        }, 9000)
        // const map = {
        //   'General Information': 'saveGeneral',
        //   'Business Information': 'saveBusiness',
        //   'Research & Development(R&D)': 'saveResearch',
        //   'Quality Assurance Information': 'saveQuality',
        //   'Attachments': 'saveAttachments'
        // }
        // this[map['General Information']] = true
        // this[map['Business Information']] = true
        // this[map['Research & Development(R&D)']] = true
        // this[map['Quality Assurance Information']] = true
        // this[map['Attachments']] = true
        this.saveGeneral = true
        this.saveBusiness = true
        this.saveResearch = true
        this.saveQuality = true
        this.saveAttachments = true
      },
      onSaved (status) {
        this[status] = false
      },
      onContentResized () {
        let tabHeights = $('#tabhight').height() - 20
        $('tabContent').height(tabHeights)
        // $('.tab-content').animate({
        //   height: tabHeights
        // }, '1000')
      }
    },
    created () {
      this.vendorProfileId = this.$route.params.id
    },
    mounted () {
      // $('.nav-tabs').scrollingTabs()
      this.$paneResizeSensor = new ResizeSensor($('#tabhight'), () => {
        this.onContentResized()
      })
      this.onContentResized()
      $('a[data-toggle="tab"]').on('click', event => {
        this.activeTabTitle = event.target.text
        $('div.tab-content').scrollTop(0)
      })
      getmillVendorMaster({
        token: this.user.token,
        millVendorID: this.$route.params.id
      }).then(attributions => {
        this.attributions = attributions
        for (let index in this.user.accessGroupList) {
          if (this.user.accessGroupList[index].accessGroup === 'VPSE_MILL_VEDNOR_MASTER_EDIT') {
            this.isDisplay = true
          }
        }
      })
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
  li {  
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
  }
  .nav-tabs-custom>.nav-tabs>li.active>a {
    border-top-color: #25AAE1 !important;
    border-left-color: #25AAE1 !important;
    border-right-color: #25AAE1 !important;
  }
  .nav-tabs-custom>.nav-tabs>li {
    margin-right: 2px !important;
  }
</style>
