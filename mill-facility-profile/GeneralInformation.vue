<template>
  <div>
    <div class="form-group">
      <br/>
      <label class="control-label field-title">Parent Mill Vendor*</label>
      <div class="row">
        <div class="col-md-8">
          <select2 :options="millVendorMasterOptions" v-model="info.parentMillVendor" id-field="code" label-field="name" :is-multiple="false" :min-input-length="1" :disabled="isMillVendor"/>
        </div>
      </div>
    </div>
    <div class="form-group">
      <br/>
      <label class="control-label field-title">Legal Company Name of the Mill Facility (English)*</label>
      <div class="row">
        <div class="col-md-8">
          <input type="text" class="form-control input-sm" v-model="info.legalCompanyName">
         </div>
       </div>
      <!-- <div><a>{{ info.legalCompanyName }}</a></div> -->
    </div>
    <div class="form-group">
      <br/>
      <label class="control-label field-title">Legal Company Name of the Mill Facility (Local Language)</label>
      <div class="row">
        <div class="col-md-8">
          <input type="text" class="form-control input-sm" v-model="info.localCompanyName">
         </div>
       </div>
    </div>
    <div class="form-group">
      <br/>
      <label class="control-label field-title">Business Registration Number</label>
      <div class="row">
        <div class="col-md-4">
          <input type="text" class="form-control input-sm" v-model="info.businessRegistrationNumber">
         </div>
       </div>
    </div>
    <div class="form-group">
      <br/>
      <label class="control-label field-title">Business Registration</label>
      <div class="row">
        <div class="col-md-6">
          <a v-if="businessRegistrationCopy.isUpload" style="cursor:pointer" @click="downloadAttachments (businessRegistrationCopy.originalAttachment)">{{ businessRegistrationCopy.attachment }}</a>      
          <a v-if="businessRegistrationCopy.isUpload" class="btn" @click="reUpload()"><i class="fa fa-times"></i></a>
          <file-upload v-if="!businessRegistrationCopy.isUpload" :valueInList="businessRegistrationCopy" :indexInList="-1"/>
        </div>
      </div>
    </div>
    <div class="form-group">
      <br/>
      <label class="control-label field-title">Address</label>
      <div class="row">
        <div class="col-md-11">
          <input type="text" class="form-control input-sm" v-model="info.address1">
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="row">
        <div class="col-md-11">
          <input type="text" class="form-control input-sm" v-model="info.address2">
        </div>
      </div>
    </div>
    <div class="row">
      <br/>
      <div class="col-md-6">
        <div class="form-group">
          <label class="control-label field-title">City</label>
          <div class="row">
            <div class="col-md-8">
              <input type="text" class="form-control input-sm" v-model="info.city">
            </div>
          </div>
         </div>
        <div class="form-group">
          <label class="control-label field-title">Postal Code</label>
          <div class="row">
            <div class="col-md-8">
              <input type="text" class="form-control input-sm" v-model="info.postalCode">
            </div>
          </div>
         </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label class="control-label field-title">State / Province</label>
          <div class="row">
            <div class="col-md-8">
              <input type="text" class="form-control input-sm" v-model="info.stateOrProvince">
            </div>
          </div>
         </div>
        <div class="form-group">
          <label class="control-label field-title">Country</label>
          <div class="row">
            <div class="col-md-8">
              <multi-select :options="countries" v-model="countryModel" :filter="true" id-field="code" label-field="name"/>
            </div>
          </div>
         </div>
      </div>
    </div>
    <div  class="form-group">
      <br/>
        <label class="control-label field-title">Address (Local Language)</label>
        <div class="row">
          <div class="col-md-11">
            <input type="text" class="form-control input-sm" v-model="info.localAddress1">
          </div>
        </div>
    </div>
    <div class="form-group">
        <div class="row">
          <div class="col-md-11">
            <input type="text" class="form-control input-sm" v-model="info.localAddress2">
         </div>
      </div>
    </div>
    <div class="row">
      <br/>
      <div class="col-md-6">
        <div class="form-group">
          <label class="control-label field-title">General Phone Number</label>
          <div class="row">
            <div class="col-md-8">
              <input type="text" class="form-control input-sm" v-model="info.generalPhoneNumber">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label class="control-label field-title">General Email Address</label>
          <div class="row">
            <div class="col-md-8">
              <input type="text" class="form-control input-sm" v-model="info.generalEmailAddress">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <br/>
      <label class="control-label field-title">Contacts of Specific Functions</label>
      <table class="table">
        <tbody>
          <tr class="trHeader">
            <th style="text-align: center; width: 5%;" class="thcss">Primary?</th>
            <th style="text-align: center; width: 30%;" colspan="2" class="thcss">Function</th>
            <th style="text-align: center; width: 10%;" class="thcss">First Name</th>
            <th style="text-align: center; width: 10%;" class="thcss">Last Name</th>
            <th style="text-align: center; width: 20%;" class="thcss">Title</th>
            <th style="text-align: center; width: 20%;" class="thcss">Email Address</th>
            <th style="text-align: center; width: 10%;" class="thcss">
              <a class="btn" @click="addFunciton">
                <i class="fa fa-plus"></i>
                Add
              </a>
            </th>
          </tr>
          <tr v-for="(item, index) in info.functions" class="trBody">
            <td style="text-align: center;" class="thBody">
              <input type="checkbox" v-model="item.isPrimary" @click="checkOnly(item, $event)">
            </td>
            <td class="thBody" style="width:15%">
              <multi-select :options="functionList" :is-multiple="true" v-model="item.func" id-field="code" label-field="name"/>
            </td>
            <td class="thBody">
              <input type="text" :disabled="checkOtherFunction(item)"  class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="item.otherFunction"  placeholder="If others, please specify" >
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
                <i class="fa fa-trash"></i>
                Delete
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="form-group">
      <br/>
      <label class="control-label field-title">What is your relationship with the parent mill vendor?</label>
      <div class="row">
        <div class="col-md-12">
          <div v-for="item in relationships">
            <input type="radio" :value="item.code" v-model="info.relationshipWithParentMill">
            <label class="option-label">{{ item.name }}</label>
          </div>
        </div>
      </div>
<!-- 
      <div class="row">
        <div class="col-md-4">
          <multi-select :options="relationships" v-model="selectedRelationship" id-field="code" label-field="name"/>
        </div>
      </row> -->


    </div>
    <div class="form-group">
      <br/>
      <label class="control-label field-title">What percentage of production volume does Gap Inc. represent for your facility in the last year?</label>
      <div class="row">
        <div class="col-md-2">
         <!-- <input type="text"  class="form-control input-sm" v-model="info.saleVolToGapPercent" v-number-only>-->
        <vue-numeric v-bind:min="0.00" v-bind:max="100.00" class="form-control input-sm" placeholder="only number allowed" value={info.saleVolToGapPercent} v-model="info.saleVolToGapPercent"  v-bind:precision="2"/>
        </div>
      </div>
    </div>
    <div class="form-group">
      <br/>
      <label class="control-label field-title">Facility’s Capabilities</label>
      <div class="row">
        <div class="col-md-11">
          <div class="row">
            <div v-for="item in facilityCapabilities" class="col-md-4">
                <input type="checkbox" :value="item.code" v-model="selectedFacilityCapabilities">
                <label class="option-label">{{ item.name }}</label>
            </div>
          </div>
        </div>
      </div>
      <!-- <multi-select :options="facilityCapabilities" v-model="selectedFacilityCapabilities" :is-multiple="true"  id-field="code" label-field="name"/> -->
    </div>
    <div class="form-group">
      <br/>
      <label class="control-label field-title">Other Capabilities</label>
      <div class="row">
        <div class="col-md-11">
          <div class="row">
            <div v-for="item in otherCapabilities" class="col-md-4">
                <input type="checkbox" :value="item.code" v-model="selectedOtherCapabilities">
                <label class="option-label">{{ item.name }}</label>
            </div>
          </div>
        </div>
      </div>      
      <!-- <multi-select :options="otherCapabilities" v-model="selectedOtherCapabilities" id-field="code" label-field="name" :is-multiple="true"/> -->
    </div>
    <!-- <button class="btn btn-primary" @click="save" >Save</button> -->
  </div>
</template>

<script>
  import _ from 'lodash'
  import $ from 'jquery'
  import { microservice } from 'src/app-config'
  import fileUpload from '../mill-vendor-master/view-profile/fileUpload'
  import VueNumeric from 'vue-numeric'
  import {
    USER,
    ALERT_SUCCESS,
    ALERT_DANGER
  } from 'src/store/definition'
  import {
    countries
  } from 'src/components/common/store/definition'
  import {
    getMillFacilityProfileGeneralInfo,
    saveGeneralInfo,
    saveFunctions,
    getDropDownList,
    getMillVendorMasterIdAndName,
    getMillTableId
  } from './service'
  import {
    folderId
    // uploadAttachment
  } from '../mill-vendor-master/service'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import Select2 from 'src/components/common/Select2'
  import MultiSelect from 'src/components/common/MultiSelect'

  export default {
    components: {
      Select2,
      fileUpload,
      MultiSelect,
      VueNumeric
    },
    props: {
      recordId: {
        required: true
      },
      onSaveBtnClicked: {
        type: Boolean,
        required: true
      }
    },
    data () {
      return {
        info: {
          parentMillVendor: {
            code: null,
            name: null
          },
          legalCompanyName: null,
          localCompanyName: null,
          businessRegistrationNumber: null,
          businessRegistrationCopy: null,
          address1: null,
          address2: null,
          city: null,
          stateOrProvince: null,
          postalCode: null,
          country: null,
          localAddress1: null,
          localAddress2: null,
          generalPhoneNumber: null,
          generalEmailAddress: null,
          functions: [],
          relationshipWithParentMill: null,
          saleVolToGapPercent: null,
          facilityCapabilities: null,
          otherCapabilities: null
        },
        folderId: folderId,
        countryModel: null,
        functionList: [],
        relationships: [],
        selectedRelationship: null,
        facilityCapabilities: [],
        otherCapabilities: [],
        selectedFacilityCapabilities: [],
        selectedOtherCapabilities: [],
        file: null,
        businessRegistrationCopy: {
          isUpload: false
        },
        millVendorMasterOptions: []
      }
    },
    computed: {
      ...mapGetters({
        user: USER,
        countries
      }),
      isMillVendor () {
        if (this.$route.params.id === '0') {
          return this.user && (this.user.userGroupId === 4 || this.user.userFunctionGroupId === 9)
        } else {
          return true
        }
      }
    },
    watch: {
      countries () {
        if (this.info.country) {
          this.countryModel = this.countries.find(country => country.code === this.info.country)
        }
      },
      'info.country': function () {
        if (this.info.country) {
          this.countryModel = this.countries.find(country => country.code === this.info.country)
        }
      },
      // relationships () {
      //   if (this.info.relationshipWithParentMill) {
      //     this.relationshipWithParentMill = this.relationships.find(relationship => relationship.code === this.info.relationshipWithParentMill)
      //   }
      // },
      // 'info.relationshipWithParentMill': function () {
      //   if (this.info.relationshipWithParentMill) {
      //     this.relationshipWithParentMill = this.relationships.find(relationship => relationship.code === this.info.relationshipWithParentMill)
      //   }
      // },
      selectedFacilityCapabilities () {
        this.$emit('checkFacilityCapabilities', this.selectedFacilityCapabilities)
      },
      onSaveBtnClicked () {
        if (this.onSaveBtnClicked) {
          // this.save()
          this.checkParentMillVendorId()
          this.$emit('saved')
        }
      }
    },
    methods: {
      ...mapActions({
        alertSuccess: ALERT_SUCCESS,
        alertDanger: ALERT_DANGER
      }),
      handleInput ($event) {
        $event.target.value = $event.target.value.replace(/[^\d]/g, '')
      },
      checkOtherFunction (item) {
        item.otherFunction = !item.func || item.func.findIndex(f => f.code === 'OTHERS') === -1 ? '' : item.otherFunction
        return !item.func || item.func.findIndex(f => f.code === 'OTHERS') === -1
      },
      addFunciton () {
        this.info.functions.push({
          isPrimary: false,
          func: [{code: null}]
        })
      },
      deleteFunction (item) {
        this.info.functions = this.info.functions.filter(func => func !== item)
      },
      reUpload () {
        this.businessRegistrationCopy.allreadyExist = false
        this.businessRegistrationCopy.isUpload = !this.businessRegistrationCopy.isUpload
        this.businessRegistrationCopy.originalAttachment = ' '
        this.businessRegistrationCopy.attachment = ' '
      },
      downloadAttachments (originalAttachment) {
        let fileId = JSON.parse(originalAttachment).id
        let versionId = JSON.parse(originalAttachment).versionId
        let token = this.user.token
        let url = microservice.domain + '/box/files/download/' + fileId + '?version=' + versionId + '&access_token=' + token
        window.location.href = url
      },
      // onFileChange ($event) {
        // this.file = $event.target.files[0]
        // let formData = new window.FormData()
        // formData.append('file', this.file)
        // uploadAttachment({
        //   file: formData,
        //   token: this.user.token
        // }).then(resposes => {
        //   this.businessRegistrationCopy.isUpload = true
        //   this.businessRegistrationCopy.originalAttachment = this.businessRegistrationCopy.attachment
        //   this.businessRegistrationCopy.attachment = resposes[0].fileName
        // }).catch(({ message }) => {
        // })
      //   $(this.$refs.fileUploader).fileupload({
      //     url: 'http://localhost:8120/zuul/box/files',
      //     replaceFileInput: false,
      //     type: 'POST',
      //     dataType: 'json',
      //     paramName: 'file',
      //     headers: {
      //       'Authorization': 'Bearer' + this.user.token
      //     },
      //     formData: {
      //       folderId: '45191055181'
      //     },
      //     done: (e, data) => {
      //       console.log('done')
      //       console.log('this.businessRegistrationCopy=')
      //       console.info(this.businessRegistrationCopy)
      //       this.businessRegistrationCopy.isUpload = true
      //       this.businessRegistrationCopy.attachment = data.result.name
      //     }
      //   })
      // },
      checkOnly (item, event) {
        // let checked = !item.isPrimary
        // this.info.functions = this.info.functions.map(func => ({
        //   ...func,
        //   isPrimary: func === item ? checked : false
        // }))
        let checked = $(event.target).is(':checked')
        this.info.functions = this.info.functions.map(func => ({
          ...func,
          isPrimary: func === item ? checked : false
        }))
      },
      onPrimaryFunctionChanged (func) {
        if (!func.isPrimary) {
          func.isPrimary = true
          this.info.functions.forEach(item => {
            if (item !== func) {
              item.isPrimary = false
            }
          })
        }
      },
      checkParentMillVendorId () {
        let checkMillVendor = this.info.parentMillVendor ? _.toInteger(this.info.parentMillVendor.code) : 0
        let checkLegalCompanyName = _.toString(this.info.legalCompanyName).trim()
        let canSave = true
        if (checkMillVendor === 0) {
          canSave = false
          this.alertDanger({
            message: 'Parent Mill Vendor can not be empty.'
          })
        }
        if (checkLegalCompanyName === null || checkLegalCompanyName === '') {
          canSave = false
          this.alertDanger({
            message: 'Legal Company Name (English) can not be empty.'
          })
        }
        if (canSave) {
          if (_.toInteger(this.recordId) === 0) {
            getMillTableId({
              token: this.user.token,
              tableName: 'millFacilityProfile'
            }).then(tableId => {
              this.recordId = _.toInteger(tableId)
              this.save()
              this.$emit('checkMillVendor', tableId)
            })
          } else {
            this.save()
            this.$emit('checkMillVendor', this.recordId)
          }
        } else {
          this.$emit('checkMillVendor', 'No')
        }
      },
      save () {
        console.log('General')
        for (let i = 0; i < this.info.functions.length; i++) {
          if (this.info.functions[i].func === undefined) {
            // console.log(this.functions[i])
            this.deleteFunction(this.info.functions[i])
          }
        }
        let info = _.cloneDeep(this.info)
        info.id = _.toInteger(this.recordId)
        info.folderId = this.folderId
        this.businessRegistrationCopy.attachment = this.businessRegistrationCopy.originalAttachment
        if (this.businessRegistrationCopy.allreadyExist === false) {
          this.businessRegistrationCopy.originalAttachment = ' '
        }
        info.businessRegistrationCopy = this.businessRegistrationCopy
        info.facilityCapabilities = this.selectedFacilityCapabilities.join(',')
        info.otherCapabilities = this.selectedOtherCapabilities.join(',')
        info.parentMillVendor = info.parentMillVendor ? _.toString(info.parentMillVendor.code) : 0
        info.saleVolToGapPercent = _.toString(info.saleVolToGapPercent)
        info.country = this.countryModel ? this.countryModel.code : null
        if (info.saleVolToGapPercent == null || _.toString(info.saleVolToGapPercent).trim() === '') {
          info.saleVolToGapPercent = '0'
        }
        saveGeneralInfo({
          token: this.user.token,
          info
        }).then(() => {
          // this.alertSuccess({
          //   message: 'Save successfully.'
          // })
        }).catch(({ message }) => {
          this.alertDanger({
            message
          })
        })
        let functions = this.info.functions.map(func => ({
          ...func,
          isPrimary: func.isPrimary ? 'Y' : 'N',
          func: func.func.map(item => item.code).join(',')
        }))
        saveFunctions({
          token: this.user.token,
          functions: {
            parentId: _.toInteger(this.recordId),
            funfac: functions
          }
        }).then(() => {
          this.businessRegistrationCopy.attachment = JSON.parse(this.businessRegistrationCopy.attachment).name
        })
      }
    },
    directives: {
      numberOnly: {
        bind: function (el) {
          el.handler = function () {
            // el.value = el.value.replace(/[^\d.]/g, '')
            el.value = el.value.replace(/^(\d+)\.(\d+)$/, '')
          }
          el.addEventListener('input', el.handler)
        },
        unbind: function (el) {
          el.removeEventListener('input', el.handler)
        }
      }
    },
    mounted () {
      // console.log(_.cloneDeep(this.user))
      getDropDownList({
        token: this.user.token,
        codeTableId: 'MILL_FACILITY_PARENT_REL'
      }).then(list => {
        this.relationships = list
      })
      // getMillVendorMasterIdAndName({
      //   token: this.user.token
      // }).then(list => {
      //   this.millVendorMasterOptions = list
      // })
      Promise.all([
        getMillVendorMasterIdAndName({
          token: this.user.token
        }),
        getMillFacilityProfileGeneralInfo({
          token: this.user.token,
          recordId: this.recordId
        }),
        getDropDownList({
          token: this.user.token,
          codeTableId: 'MILL_FACILITY_FUNCTION'
        }),
        getDropDownList({
          token: this.user.token,
          codeTableId: 'MILL_FACILITY_CAPABILITY'
        }),
        getDropDownList({
          token: this.user.token,
          codeTableId: 'MILL_FACILITY_OTHER_CAP'
        })
      ]).then(([millVendorMasterOptions, generalInfo, functionList, facilityCaps, otherCaps]) => {
        this.millVendorMasterOptions = millVendorMasterOptions
        let functionMap = functionList.reduce((map, func) => {
          map[func.code] = func
          return map
        }, {})
        this.functionList = functionList
        this.info = generalInfo
        if (this.info.functions === null) {
          this.info.functions = []
        }
        this.info.functions = this.info.functions.map(func => ({
          ...func,
          isPrimary: func.isPrimary === 'Y',
          func: (func.func ? func.func.split(',') : []).map(funcCode => functionMap[funcCode]).filter(item => item !== undefined)
        }))
        if (this.info.functions.length === 0) {
          this.addFunciton()
        }
        if (this.info.saleVolToGapPercent === 0) {
          this.info.saleVolToGapPercent = ''
        }
        // if (this.info.parentMillVendor === 0 || this.info.parentMillVendor === null) {
        //   this.checkParentMillVendor = false
        // }
        // this.info.parentMillVendor = {
        //   code: _.toString(this.info.parentMillVendor),
        //   name: _.toString(this.info.parentMillVendor)
        // }
        // for (let item in this.millVendorMasterOptions) {
        //   if (_.toString(this.millVendorMasterOptions[item].code) === _.toString(this.info.parentMillVendor.code)) {
        //     this.info.parentMillVendor.name = this.millVendorMasterOptions[item].name
        //   }
        // }
        if (this.info.parentMillVendor) {
          this.info.parentMillVendor = this.millVendorMasterOptions.find(option => option.code === this.info.parentMillVendor)
        } else if (this.isMillVendor) {
          if (this.user.vendorList && this.user.vendorList.length) {
            this.info.parentMillVendor = this.millVendorMasterOptions.find(option => option.code === _.toString(this.user.vendorList[0].vendorCode))
          }
        }
        // console.log(_.cloneDeep(this.info.parentMillVendor))
        this.businessRegistrationCopy = {
          attachment: this.info.businessRegistrationCopy === null ? ' ' : this.info.businessRegistrationCopy,
          originalAttachment: this.info.businessRegistrationCopy === null ? ' ' : this.info.businessRegistrationCopy,
          isUpload: true,
          allreadyExist: true
        }
        if (this.businessRegistrationCopy.attachment === ' ' || this.businessRegistrationCopy.attachment === null) {
          this.businessRegistrationCopy.isUpload = false
          this.businessRegistrationCopy.allreadyExist = false
        } else {
          this.businessRegistrationCopy.attachment = JSON.parse(this.businessRegistrationCopy.attachment).name
        }
        // this.selectedRelationship = this.relationships.find(relationship => relationship.code === this.info.relationshipWithParentMill)
        this.facilityCapabilities = facilityCaps
        this.otherCapabilities = otherCaps
        if (_.isString(this.info.facilityCapabilities) && this.info.facilityCapabilities.trim() !== '') {
          this.selectedFacilityCapabilities = this.info.facilityCapabilities.split(',')
        } else {
          this.selectedFacilityCapabilities = []
        }
        if (_.isString(this.info.otherCapabilities) && this.info.otherCapabilities.trim() !== '') {
          this.selectedOtherCapabilities = this.info.otherCapabilities.split(',')
        } else {
          this.selectedOtherCapabilities = []
        }
      })
    }
  }
</script>

<style scoped>
  input.input-sm {
    height: 28px !important;
    border: 1px solid #aaa;
    border-radius: 4px;
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
  .select2-container--bootstrap .select2-selection--single {
    padding-top: 2px !important;
    padding-bottom: 2px !important;
    height: 28px !important;
    font-size: 14px !important;
  }
  .field-title {
    font-size: 15px;
  }
  .option-label {
    font-weight: 400;
  }
</style>