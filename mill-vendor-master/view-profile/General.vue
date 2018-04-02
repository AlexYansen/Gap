<template>
  <div>
    <div class="form-group">
      <br/>
      <!-- <button @click="display">Display</button> -->
      <label class="control-label field-title">Legal Company Name (English)</label>
      <div class="row">
        <div class="col-md-8">
          <input type="text" v-if="!isDisplay" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="legalCompanyName">
          <a v-if="isDisplay">{{ legalCompanyName }}</a>
        </div>
      </div>
    </div>
  
    <div class="form-group">
      <br/>
      <label class="control-label field-title">Legal Company Name (Local Language)</label>
      <div class="row">
        <div class="col-md-8">
          <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="localCompanyName">
        </div>
      </div>
    </div>
  
    <div class="form-group">
      <br/>
      <label class="control-label field-title">Business Registration Number</label>
      <div class="row">
        <div class="col-md-4">
          <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="businessRegistrationNumber">
        </div>
      </div>
    </div>
  
    <div class="form-group">
      <br/>
      <div class="row">
        <div class="col-md-6">
          <label class="control-label field-title">Business Registration</label>
          <div class="row">
            <div class="col-md-12">
              <a v-if="businessRegistrationCopy.isUpload" style="cursor:pointer" @click="downloadAttachments (businessRegistrationCopy.originalAttachment)">{{ businessRegistrationCopy.attachment }}</a>      
              <a v-if="businessRegistrationCopy.isUpload" class="btn" @click="reUpload('businessRegistrationCopy')"><i class="fa fa-times"></i></a>
              <file-upload  v-if="!businessRegistrationCopy.isUpload" :valueInList="businessRegistrationCopy" :indexInList="-1"/>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <label class="control-label field-title">Latest Sustainability Report</label>
          <div class="row">
            <div class="col-md-12">
              <a v-if="latestSustainabilityReport.isUpload" style="cursor:pointer" @click="downloadAttachments (latestSustainabilityReport.originalAttachment)">{{ latestSustainabilityReport.attachment }}</a>      
              <a v-if="latestSustainabilityReport.isUpload" class="btn" @click="reUpload('latestSustainabilityReport')"><i class="fa  fa-remove"></i></a>
              <file-upload  v-if="!latestSustainabilityReport.isUpload" :valueInList="latestSustainabilityReport" :indexInList="-1"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <div class="form-group">
      <br/>
      <label class="control-label field-title">Company Website</label>
      <div class="row">
        <div class="col-md-8">
          <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="companyWebsite">
        </div>
      </div>
    </div>
  
    <div class="form-group">
      <br/>
      <label class="control-label field-title">Address</label>
      <div class="row">
        <div class="col-md-11">
          <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="address1">
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-md-11">
          <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="address2">
        </div>
      </div>
    </div>
  
    <div class="form-group">
      <br/>
      <div class="row">
        <div class="col-md-6">
          <label class="control-label field-title">City</label>
          <div class="row">
            <div class="col-md-8">
              <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="city">
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <label class="control-label field-title">State / Province</label>
          <div class="row">
            <div class="col-md-8">
              <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="stateProvince">
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <div class="form-group">
      <br/>
      <div class="row">
        <div class="col-md-6">
          <label class="control-label field-title">Postal Code</label>
          <div class="row">
            <div class="col-md-8">
              <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="postalCode">
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <label class="control-label field-title">Country</label>
          <div class="row">
            <div class="col-md-8">
              <!-- <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;"> -->
              <multi-select v-model="countryModel" :options="countries" :filter="true" id-field="code" label-field="name"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <div class="form-group">
      <br/>
      <label class="control-label field-title">Address (Local Language)</label>
      <div class="row">
        <div class="col-md-11">
          <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="localAddress">
        </div>
      </div>
      <!-- <br>
      <div class="row">
        <div class="col-md-11">
          <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;">
        </div>
      </div> -->
    </div>
  
    <div class="form-group">
      <br/>
      <div class="row">
        <div class="col-md-6">
          <label class="control-label field-title">General Phone Number</label>
          <div class="row">
            <div class="col-md-8">
              <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="mainPhoneNumber">
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <label class="control-label field-title">General Email Address</label>
          <div class="row">
            <div class="col-md-8">
              <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="mainEmailAddress">
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <div class="form-group">
      <br/>
      <label class="control-label field-title">Contacts of Specific Functions</label>
      <div class="row">
        <div class="col-md-12">
          <table class="table">
            <tbody>
              <tr class="trHeader">
                <th class="thcss" style="width:5%">Primary?</th>
                <th class="thcss" style="width:16%">Functions</th>
                <th class="thcss" style="width:14%">Other Functions</th>
                <th class="thcss" style="width:13%">First Name</th>
                <th class="thcss" style="width:13%">Last Name</th>
                <th class="thcss" style="width:17%">Title</th>
                <th class="thcss" style="width:17%">Email Address</th>
                <th class="thcss" style="width:5%">
                  <a class="btn" @click="addFunciton">
                    <i class="fa fa-plus"></i>Add</a>
                </th>
              </tr>
              <tr v-for="item in functions" class="trBody">
                <td style="text-align: center;" class="thBody">
                  <input @click="checkOnly(item, $event)" type="checkbox" v-model="item.isPrimary">
                </td>
                <td class="thBody">
                  <multi-select :options="functionList" :is-multiple="true" v-model="item.func" id-field="code" label-field="name" @input="onSelectedFunctionsChanged"/>
                </td>
                <td class="thBody">
                <input type="text" :disabled="checkIfDisableOtherFunctionInput(item)" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="item.otherFunction"  placeholder="If others, please specify">
                </td>
                <td class="thBody">
                  <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="item.firstName">
                </td>
                <td class="thBody">
                  <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="item.lastName">
                </td>
                <td class="thBody">
                  <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="item.title">
                </td>
                <td class="thBody">
                  <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="item.emailAddress">
                </td>
                <td style="text-align: center;" class="thBody">
                  <a class="btn" @click="deleteFunction(item)">
                    <i class="fa fa-trash"></i>Delete</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  
    <div class="form-group">
      <br/>
      <label class="control-label field-title">What is your relationship with your fabric manufacturing facilities?</label>
      <div class="row">
        <div class="col-md-12">
           <div v-for="item in relationList">
              <input type="radio" :value="item.code" v-model="millFacRelationship">
              <label class="option-label">{{ item.name }}</label>
           </div>
           <!-- v-model="millFacRelationship" -->
        </div>
      </div>
    </div>
  

  <div class="form-group">
    <br/>
    <label class="control-label field-title">Are you a garment manufacturing vendor of Gap Inc.? </label>
    <div class="row">
      <div class="col-md-6">
        <input type="radio" value="Y" v-model="isGapMfgVendor">
        <label class="option-label">Yes</label>
        <input type="radio" value="N" v-model="isGapMfgVendor" style="margin-left:10px;">
        <label class="option-label">No</label>
      </div>
    </div>
    <div class="row" v-if="isGapMfgVendor === 'Y'">
      <div class="col-md-2">
        <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="garMfgVendorId" placeholder="Vendor ID">
      </div>
      <div class="col-md-6">
        <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="garMfgVendorName" placeholder="Vendor Name">
      </div>
      <!-- <div class="col-md-8">
        <multi-select :filter="true" :options="garMfgVendorsList" :is-multiple="true" v-model="garMfgVendors" id-field="profile_id" label-field="vendor_name"/>
      </div> -->
    </div>
  </div>

  
    <div class="form-group">  
      <br/>      
      <label class="control-label field-title">Year Established</label>
      <div class="row">
         <div class="col-md-2">
          <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="yearEstablished" maxlength="4" onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)" onblur="this.v();">
         </div>
      </div>     
    </div>
  
    <div class="form-group">
      <br/>
      <label class="control-label field-title">Parent Company Name (if applicable)</label>
      <div class="row">
        <div class="col-md-8">
          <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="parentCompanyName">
        </div>
      </div>
    </div>
  
    <div class="form-group">
      <br/>
      <label class="control-label field-title">Main Contacts for Marketing or Design Function in US</label>
      <div class="row">
        <div class="col-md-12">
          <table class="table">
            <tbody>
              <tr class="trHeader">
                <th class="thcss" style="width:18%">Company Name</th>
                <th class="thcss" style="width:18%">Office Address in US</th>
                <th class="thcss" style="width:11%">First Name</th>
                <th class="thcss" style="width:11%">Last Name</th>
                <th class="thcss" style="width:17%">Title</th>
                <th class="thcss" style="width:17%">Email Address</th>
                <th class="thcss" style="width:8%">
                  <a class="btn" @click="addFunctionInUS">
                    <i class="fa fa-plus"></i>Add</a>
                </th>
              </tr>
              <tr v-for="item in functioninUSs" class="trBody">
                <td class="thBody">
                  <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="item.companyName">
                </td>
                <td class="thBody">
                  <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="item.officeAddress">
                </td>
                <td class="thBody">
                  <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="item.firstName">
                </td>
                <td class="thBody">
                  <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="item.lastName">
                </td>
                <td class="thBody">
                  <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="item.title">
                </td>
                <td class="thBody">
                  <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="item.emailAddress">
                </td>
                <td style="text-align: center;" class="thBody">
                  <a class="btn" @click="deleteFunctionInUS(item)">
                    <i class="fa fa-trash"></i>Delete</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  
  <!-- <button class="btn btn-primary" @click="save" >Save</button> -->
  </div>
</template>

<script>
  import _ from 'lodash'
  import $ from 'jquery'
  import fileUpload from './fileUpload'
  import { microservice } from 'src/app-config'
  import Select2 from 'src/components/common/Select2'
  import MultiSelect from 'src/components/common/MultiSelect'
  import {
    folderId,
    getMillVendorMasterProfile,
    saveViewProfileGeneralInfo,
    saveFunctionList,
    saveFunctionListInUS,
    getMillVendorFunctionList,
    getMillFacRelationship,
    getGarMfgVendors
  } from '../service'
  import {
    USER,
    ALERT_SUCCESS,
    ALERT_DANGER
  } from 'src/store/definition'
  import {
    countries
  } from 'src/components/common/store/definition'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    components: {
      Select2,
      fileUpload,
      MultiSelect
    },
    props: {
      vendorProfileId: {
        type: String
      },
      onSaveBtnClicked: {
        type: Boolean
      }
    },
    data () {
      return {
        isDisplay: false,
        rawData: null,
        functionList: [],
        legalCompanyName: null,
        localCompanyName: null,
        businessRegistrationNumber: null,
        businessRegistrationCopy: {
          isUpload: false
        },
        businessRegistration: null,
        latestSustainabilityReport: {
          isUpload: false
        },
        companyWebsite: null,
        address1: null,
        address2: null,
        city: null,
        folderId: folderId,
        stateProvince: null,
        postalCode: null,
        country: null,
        localAddress: null,
        mainPhoneNumber: null,
        mainEmailAddress: null,
        functions: [],
        millFacRelationship: null,
        isGapMfgVendor: false,
        // garMfgVendors: null,
        garMfgVendorId: null,
        garMfgVendorName: null,
        yearEstablished: null,
        parentCompanyName: null,
        functioninUSs: [],
        countryModel: null,
        relationList: [],
        garMfgVendorsList: []
      }
    },
    computed: {
      ...mapGetters({
        user: USER,
        countries
      })
    },
    watch: {
      countries () {
        if (this.country) {
          this.countryModel = this.countries.find(country => country.code === this.country)
        }
      },
      country () {
        if (this.country) {
          this.countryModel = this.countries.find(country => country.code === this.country)
        }
      },
      onSaveBtnClicked () {
        if (this.onSaveBtnClicked) {
          this.save()
          this.$emit('saved')
        }
      }
    },
    methods: {
      checkIfDisableOtherFunctionInput (item) {
        item.otherFunction = !item.func || item.func.findIndex(f => f.code === 'OTHERS') === -1 ? '' : item.otherFunction
        return !item.func || item.func.findIndex(f => f.code === 'OTHERS') === -1
      },
      checkOnly (item, event) {
        let checked = $(event.target).is(':checked')
        this.functions = this.functions.map(func => ({
          ...func,
          isPrimary: func === item ? checked : false
        }))
      },
      onSelectedFunctionsChanged () {
        this.functions = _.cloneDeep(this.functions)
      },
      display () {
        this.isDisplay === false ? this.isDisplay = true : this.isDisplay = false
      },
      ...mapActions({
        alertSuccess: ALERT_SUCCESS,
        alertDanger: ALERT_DANGER
      }),
      deleteFunction (item) {
        this.functions = this.functions.filter(func => func !== item)
      },
      addFunciton () {
        this.functions.push({
          isPrimary: false
        })
      },
      addFunctionInUS () {
        this.functioninUSs.push({})
      },
      deleteFunctionInUS (item) {
        this.functioninUSs = this.functioninUSs.filter(func => func !== item)
      },
      reUpload (fileName) {
        if (fileName === 'businessRegistrationCopy') {
          this.businessRegistrationCopy.originalAttachment = ' '
          this.businessRegistrationCopy.attachment = ' '
          this.businessRegistrationCopy.isUpload = !this.businessRegistrationCopy.isUpload
          this.businessRegistrationCopy.allreadyExist = false
        }
        if (fileName === 'latestSustainabilityReport') {
          this.latestSustainabilityReport.originalAttachment = ' '
          this.latestSustainabilityReport.attachment = ' '
          this.latestSustainabilityReport.isUpload = !this.latestSustainabilityReport.isUpload
          this.latestSustainabilityReport.allreadyExist = false
        }
      },
      downloadAttachments (originalAttachment) {
        let fileId = JSON.parse(originalAttachment).id
        let versionId = JSON.parse(originalAttachment).versionId
        let token = this.user.token
        let url = microservice.domain + '/box/files/download/' + fileId + '?version=' + versionId + '&access_token=' + token
        window.location.href = url
      },
      // onBusinessFileChange ($event, fileName) {
        // this.file = $event.target.files[0]
        // let formData = new window.FormData()
        // formData.append('file', this.file)
        // $(this.$refs.businessRegistrationUploader).fileupload({
        //   url: 'http://localhost:8120/zuul/box/files',
        //   replaceFileInput: false,
        //   type: 'POST',
        //   dataType: 'json',
        //   paramName: 'file',
        //   headers: {
        //     'Authorization': 'Bearer' + this.user.token
        //   },
        //   formData: {
        //     folderId: '45191055181'
        //   },
        //   done: (e, data) => {
        //     console.log('done')
        //     this.businessRegistrationCopy.isUpload = !this.businessRegistrationCopy.isUpload
        //     this.businessRegistrationCopy.attachment = data.result.name
        //   }
        // })
        // uploadAttachment({
        //   file: formData,
        //   token: this.user.token,
        //   folderId: 'vpse'
        // }).then(resposes => {
        //   if (fileName === 'businessRegistrationCopy') {
        //     this.businessRegistrationCopy.isUpload = !this.businessRegistrationCopy.isUpload
        //     this.businessRegistrationCopy.attachment = resposes[0].fileName
        //   }
        //   if (fileName === 'latestSustainabilityReport') {
        //     this.latestSustainabilityReport.isUpload = !this.latestSustainabilityReport.isUpload
        //     this.latestSustainabilityReport.attachment = resposes[0].fileName
        //   }
        // }).catch(({ message }) => {
        // })
      // }，
      save () {
        console.log('General')
        this.businessRegistrationCopy.attachment = this.businessRegistrationCopy.originalAttachment
        this.latestSustainabilityReport.attachment = this.latestSustainabilityReport.originalAttachment
        if (this.businessRegistrationCopy.allreadyExist === true) {
          this.businessRegistrationCopy.originalAttachment = ' '
        }
        if (this.latestSustainabilityReport.allreadyExist === true) {
          this.latestSustainabilityReport.originalAttachment = ' '
        }
        let formData = {
          folderId: this.folderId,
          id: _.toInteger(this.vendorProfileId)
        }
        this.country = this.countryModel ? this.countryModel.code : null
        for (let property in this.rawData) {
          if (property !== 'functioninUSs' && property !== 'functions') {
            formData[property] = this[property]
          }
        }
        if (formData.garMfgVendors != null) {
          formData.garMfgVendors = formData.garMfgVendors.map(item => item.profile_id).join(',')
        }
        formData.yearEstablished = _.toInteger(formData.yearEstablished)
        saveViewProfileGeneralInfo({
          token: this.user.token,
          info: formData
        }).then(() => {
          // this.alertSuccess({
          //   message: 'Save successfully.'
          // })
          this.loadData()
        }).catch(({ message }) => {
          this.alertDanger({
            message
          })
        })
        for (let i = 0; i < this.functions.length; i++) {
          if (this.functions[i].func === undefined) {
            // console.log(this.functions[i])
            this.deleteFunction(this.functions[i])
          }
        }
        // console.log(this.functions)
        let funcs = this.functions.map(func => ({
          ...func,
          isPrimary: func.isPrimary ? 'Y' : 'N',
          func: func.func.map(item => item.code).join(',')
        }))
        for (let i = 0; i < this.functioninUSs.length; i++) {
          if (this.functioninUSs[i].companyName === undefined) {
            // console.log(this.functioninUSs[i])
            this.deleteFunctionInUS(this.functioninUSs[i])
          }
        }
        // console.log(this.functioninUSs)
        let funcUss = _.cloneDeep(this.functioninUSs)
        saveFunctionList({
          token: this.user.token,
          functionList: {
            parentId: _.toInteger(this.vendorProfileId),
            funcs
          }
        }).then(() => {
        })
        saveFunctionListInUS({
          token: this.user.token,
          functionListInUS: {
            parentId: _.toInteger(this.vendorProfileId),
            funcUss
          }
        })
      },
      loadData () {
        Promise.all([
          getMillVendorMasterProfile({
            token: this.user.token,
            millVendorID: this.vendorProfileId
          }),
          getMillVendorFunctionList({
            token: this.user.token
          }),
          getMillFacRelationship({
            token: this.user.token
          }),
          getGarMfgVendors({
            token: this.user.token
          })
        ]).then(([vendorMasterProfile, functionList, relationList, garMfgVendorsList]) => {
          this.functionList = functionList
          this.relationList = relationList
          this.garMfgVendorsList = garMfgVendorsList
          let functionMap = functionList.reduce((map, func) => {
            map[func.code] = func
            return map
          }, {})
          let garMfgVendorsMap = garMfgVendorsList.reduce((map, gar) => {
            map[gar.profile_id] = gar
            return map
          }, {})
          this.rawData = _.cloneDeep(vendorMasterProfile)
          for (let property in vendorMasterProfile) {
            this[property] = vendorMasterProfile[property]
          }
          this.businessRegistrationCopy = {
            attachment: this.businessRegistrationCopy === null || this.businessRegistrationCopy === ' ' || this.businessRegistrationCopy === '' ? ' ' : JSON.parse(this.businessRegistrationCopy).name,
            originalAttachment: this.businessRegistrationCopy === null ? ' ' : this.businessRegistrationCopy,
            isUpload: true,
            allreadyExist: true
          }
          this.latestSustainabilityReport = {
            attachment: this.latestSustainabilityReport === null || this.latestSustainabilityReport === ' ' || this.latestSustainabilityReport === '' ? ' ' : JSON.parse(this.latestSustainabilityReport).name,
            originalAttachment: this.latestSustainabilityReport === null ? ' ' : this.latestSustainabilityReport,
            isUpload: true,
            allreadyExist: true
          }
          if (this.businessRegistrationCopy.attachment === ' ') {
            this.businessRegistrationCopy.isUpload = false
            this.businessRegistrationCopy.allreadyExist = false
          }
          if (this.latestSustainabilityReport.attachment === ' ') {
            this.latestSustainabilityReport.isUpload = false
            this.latestSustainabilityReport.allreadyExist = false
          }
          this.functions = this.functions.map(func => ({
            ...func,
            isPrimary: func.isPrimary === 'Y',
            func: func.func.split(',').map(funcCode => functionMap[funcCode]).filter(item => item !== undefined)
          }))
          if (this.functions.length === 0) {
            this.addFunciton()
          }
          if (this.functioninUSs.length === 0) {
            this.addFunctionInUS()
          }
          if (this.garMfgVendors != null) {
            this.garMfgVendors = this.garMfgVendors.split(',').map(code => garMfgVendorsMap[code]).filter(item => item !== undefined)
          }
          if (this.yearEstablished === 0) {
            this.yearEstablished = null
          }
          if (this.garMfgVendorId === 0) {
            this.garMfgVendorId = null
          }
        })
      }
    },
    mounted () {
      this.loadData()
    }
  }
</script>

<style scoped>
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
  .table{
    border-color:#ddd !important;
  }  
  .field-title {
    font-size: 15px;
  }
  .option-label {
    font-weight: 400;
  }
</style>