<template>
     <div>
        <div class="form-group">
            <br>
            <label class="control-label field-title">Do any of your facilities have an accredited Quality Management System in place?</label>
            <div class="row">
                <div class="col-md-4">                  
                    <input type="radio"  value="Y" v-model="qualityAssuranceList.has_accredited_qms">
                    <label class="option-label">Yes</label>
                    <input type="radio"  value="N" v-model="qualityAssuranceList.has_accredited_qms" style="margin-left:10px;">  
                    <label class="option-label">No</label>                          
                </div>    
             </div>
            <div class="row" v-if="qualityAssuranceList.has_accredited_qms == 'Y'">
                <div class="col-md-12">
                    <table class="table">
                        <tbody>
                            <tr class="trHeader">
                                <th style="width:15%; text-align: center;" class="thcss">Certificate Name</th>
                                <th style="width:19%; text-align: center;" class="thcss">Accrediting Agency</th>
                                <th style="width:19%; text-align: center;" class="thcss">Facility Name</th>
                                <th style="width:15%; text-align: center;" class="thcss">Expiration Date</th>
                                <th style="width:25%; text-align: center;" class="thcss">Certificate</th>
                                <th style="width:7%; text-align: center;" class="thcss">
                                    <a class="btn" @click="addCertificate">
                                        <i class="fa fa-plus"></i>Add</a>
                                </th>
                            </tr>
                            <tr v-for="(item, index) in millVendorMasterCerts" class="trBody">
                                <td class="thBody">
                                    <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="item.certificateName">
                                </td>
                                <td class="thBody">
                                    <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="item.accreditingAgency">
                                </td>
                                <td class="thBody">
                                    <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="item.facilityName">
                                </td>
                                <td class="thBody">
                                    <Datepicker style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="item.expirationDate">
                                </td>
                                <td class="thBody" style="text-align: center;padding-left:50px;">
                                    <!-- certificate -->
                                    <a v-if="item.isUpload" style="cursor:pointer" @click="downloadAttachments (item.originalAttachment)">{{ item.attachment }}</a>      
                                    <a v-if="item.isUpload" class="btn" @click="reUpload(index)"><i class="fa fa-remove"></i></a>
                                    <file-upload v-if="!item.isUpload" :valueInList="millVendorMasterCerts" :indexInList="index" style="margin: 0 auto"/>
                                </td>
                                <td style="text-align: center;" class="thBody">
                                    <a class="btn" @click="deleteCertificate(item)">
                                        <i class="fa fa-trash"></i>Delete</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>            
        </div>       

        <div class="form-group">
            <br>
             <label class="control-label field-title">Does any of your facilities have an accredited in-house Laboratory for other Brands/Buyers?</label>
            <div class="row">
                <div class="col-md-4">                  
                    <input type="radio"  value="Y" v-model="qualityAssuranceList.has_accredited_in_lab">
                    <label class="option-label">Yes</label>
                    <input type="radio"  value="N" v-model="qualityAssuranceList.has_accredited_in_lab" style="margin-left:10px;">  
                    <label class="option-label">No</label> 
                    <input type="radio"  value="U" v-model="qualityAssuranceList.has_accredited_in_lab" style="margin-left:10px;">
                    <label class="option-label">N/A</label>
                </div>    
            </div>
            <div class="row">
                <div class="col-md-6">
                <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="qualityAssuranceList.reason_for_na_in_lab" v-if="qualityAssuranceList.has_accredited_in_lab == 'U'"  placeholder="Please specify the reason for N/A">
                </div>
            </div>
            <div class="row">
                <div class="col-md-9">
                    <table class="table" v-if="qualityAssuranceList.has_accredited_in_lab == 'Y'">
                        <tbody>
                            <tr class="trHeader">
                                <th style="width:35%; text-align: center;" class="thcss">Brand/Buyer</th>
                                <th style="width:35%; text-align: center;" class="thcss">Accrediting Agency</th>
                                <th style="width:20%; text-align: center;" class="thcss">Expiration Date</th>
                                <th style="width:10%; text-align: center;" class="thcss">
                                    <a class="btn" @click="addBuyer">
                                        <i class="fa fa-plus"></i>Add</a>
                                </th>
                            </tr>
                            <tr v-for="item in qualityAssuranceList.buyers" class="trBody">
                                <td class="thBody">
                                    <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="item.buyer">
                                </td>
                                <td class="thBody">
                                    <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="item.accreditingAgency">
                                </td>
                                <td class="thBody">
                                    <Datepicker style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="item.expirationDate">
                                </td>
                                <td style="text-align: center;" class="thBody">
                                    <a class="btn" @click="deleteBuyer(item)">
                                        <i class="fa fa-trash"></i>Delete</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>            
        </div>        

        <div class="form-group">
            <br>
            <label class="control-label field-title">What kind of inspection system are your facilities using?</label>
            <div class="row">
              <div class="col-md-9">
              <div class="row">
                <div v-for="item in inspectionSystem" class="col-md-4">
                    <input type="checkbox" :value="item.code" v-model="inspection_systems">
                    <label class="option-label">{{ item.name }}</label>
                </div>
              </div>
              </div>
            </div>
            <div class="row" v-if="inspection_systems.indexOf('OTHERS') !== -1">
              <div class="col-md-8">
                <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="qualityAssuranceList.other_inspection_systems" placeholder="Please specify the inspection systems">
              </div>
            </div>
            <br v-if="inspection_systems.indexOf('NA') !== -1 && inspection_systems.indexOf('OTHERS') !== -1">
            <div class="row" v-if="inspection_systems.indexOf('NA') !== -1">
              <div class="col-md-8">
                <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="qualityAssuranceList.reason_for_na_insp_system" placeholder="Please specify the reason for N/A">
              </div>
            </div>
            
            <!-- <div class="row">
                <div class="col-md-6">                  
                    <multi-select v-model="inspection_systems" :options="inspectionSystem" :is-multiple="true" id-field="code" label-field="name"/>  
                </div>    
            </div> -->
            <!-- <div v-for="item in inspection_systems">
                <div class="row" v-if="item.code === 'OTHERS'">
                    <br>
                    <div class="col-md-8">
                        <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="qualityAssuranceList.other_inspection_systems" placeholder="Please specify the inspection systems">                     
                    </div>
                </div>            
                <div class="row" v-if="item.code === 'NA'">
                    <br>
                    <div class="col-md-8">
                        <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="qualityAssuranceList.reason_for_na_insp_system" placeholder="Please specify the reason for N/A">                     
                    </div>
                </div> 
            </div>            -->
        </div> 

        <div class="form-group">
            <br>
            <label class="control-label field-title">Do any of your facilities conduct any Color Assessment?</label>
            <div class="row">
                <div class="col-md-4">                  
                    <input type="radio"  value="Y" v-model="qualityAssuranceList.has_color_assessment">
                    <label class="option-label">Yes</label>
                    <input type="radio"  value="N" v-model="qualityAssuranceList.has_color_assessment" style="margin-left:10px;">  
                    <label class="option-label">No</label> 
                    <input type="radio"  value="U" v-model="qualityAssuranceList.has_color_assessment" style="margin-left:10px;">
                    <label class="option-label">N/A</label>      
                </div>    
            </div>
            <div class="row" v-if="qualityAssuranceList.has_color_assessment == 'U'">
                <div class="col-md-8">
                    <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="qualityAssuranceList.reason_for_na_col_assessment" placeholder="Please specify the reason for N/A">                  
                </div>
            </div>            
        </div> 
        <!-- <div>
            <button class="btn btn-primary" @click="save" >Save</button>
        </div>        -->

    </div> 
</template>

<script>
    import _ from 'lodash'
    import fileUpload from './fileUpload'
    import { microservice } from 'src/app-config'
    import Select2 from 'src/components/common/Select2'
    import MultiSelect from 'src/components/common/MultiSelect'
    import Datepicker from 'src/components/common/Datepicker'
    import {
      folderId,
      getQualityAssuranceInfo,
      saveQualityAssuranceInfo,
      savemIllVendorMasterBuyers,
      savemillVendorMasterCerts,
      getInspectionSystem,
      deleteByID
    } from '../service'
    import moment from 'moment'
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
        Select2,
        fileUpload,
        MultiSelect,
        Datepicker
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
          qualityAssuranceList: {},
          inspectionSystem: [],
          has_accredited_qms: null,
          has_accredited_in_lab: null,
          reason_for_na_in_lab: null,
          inspection_systems: [],
          other_inspection_systems: null,
          reason_for_na_insp_system: null,
          reason_for_na_col_assessment: null,
          has_color_assessment: null,
          folderId: folderId,
          millVendorMasterCerts: [],
          buyers: [],
          deleteCerts: []
        }
      },
      watch: {
        onSaveBtnClicked () {
          if (this.onSaveBtnClicked) {
            this.save()
            this.$emit('saved')
          }
        }
      },
      computed: {
        ...mapGetters({
          user: USER
        })
      },
      methods: {
        ...mapActions({
          alertSuccess: ALERT_SUCCESS,
          alertDanger: ALERT_DANGER
        }),
        deleteCertificate (item) {
          if (item.id != null) {
            this.deleteCerts.push(item.id)
          }
          this.millVendorMasterCerts = this.millVendorMasterCerts.filter(cert => cert !== item)
        },
        addCertificate () {
          this.millVendorMasterCerts.push({
            certificateName: '',
            accreditingAgency: '',
            facilityName: '',
            expirationDate: null,
            attachment: ' ',
            originalAttachment: ' ',
            isUpload: false,
            allreadyExist: false
          })
        },
        addBuyer () {
          this.qualityAssuranceList.buyers.push({
            buyer: null,
            accreditingAgency: null,
            expirationDate: null
          })
        },
        deleteBuyer (item) {
          this.qualityAssuranceList.buyers = this.qualityAssuranceList.buyers.filter(obob => obob !== item)
        },
        reUpload (index) {
          this.millVendorMasterCerts[index].isUpload = false
          // this.millVendorMasterCerts[index].allreadyExist = false
          this.millVendorMasterCerts[index].attachment = ' '
          this.millVendorMasterCerts[index].originalAttachment = ' '
        },
        downloadAttachments (originalAttachment) {
          let fileId = JSON.parse(originalAttachment).id
          let versionId = JSON.parse(originalAttachment).versionId
          let token = this.user.token
          let url = microservice.domain + '/box/files/download/' + fileId + '?version=' + versionId + '&access_token=' + token
          window.location.href = url
        },
        // onFileChange ($event, index) {
          // this.file = $event.target.files[0]
          // let formData = new window.FormData()
          // formData.append('file', this.file)
          // uploadAttachment({
          //   file: formData,
          //   token: this.user.token
          // }).then(resposes => {
          //   this.millVendorMasterCerts[index].isUpload = true
          //   this.millVendorMasterCerts[index].originalAttachment = this.millVendorMasterCerts[index].certificate
          //   this.millVendorMasterCerts[index].certificate = resposes[0].fileName
          // }).catch(({ message }) => {
          // })
        //   console.info(this.millVendorMasterCerts[index])
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
        //       console.log('this.millVendorMasterCerts[index].isUpload=')
        //       console.info(this.millVendorMasterCerts[index])
        //       this.millVendorMasterCerts[index].isUpload = true
        //       this.millVendorMasterCerts[index].certificate = data.result.name
        //     }
        //   })
        // },
        save () {
          console.log('QUAL')
          // console.log(this.millVendorMasterCerts)
          let ins = null
          // if (this.inspection_systems != null) {
          //   ins = this.inspection_systems.map(item => item.code).join(',')
          // }
          for (let i = 0; i < this.millVendorMasterCerts.length; i++) {
            if (this.millVendorMasterCerts[i].certificateName === undefined && this.millVendorMasterCerts[i].attachment === undefined && this.millVendorMasterCerts[i].expirationDate === undefined || this.millVendorMasterCerts[i].isUpload === false) {
            // console.log(this.functions[i])
              this.deleteCertificate(this.millVendorMasterCerts[i])
            }
          }
          for (let i = 0; i < this.millVendorMasterCerts.length; i++) {
            this.millVendorMasterCerts[i].attachment = this.millVendorMasterCerts[i].originalAttachment
            // this.millVendorMasterCerts[i].originalAttachment = null
            // if (this.millVendorMasterCerts[i].allreadyExist === false) {
            //   this.millVendorMasterCerts[i].originalAttachment = ''
            // }
          }
          ins = this.inspection_systems.join(',')
          let formData = {
            id: _.toInteger(this.vendorProfileId),
            inspection_systems: ins
          }
          for (let property in this.qualityAssuranceList) {
            if (property !== 'millVendorMasterCerts' && property !== 'buyers') {
              if (property !== 'inspection_systems') {
                formData[property] = this.qualityAssuranceList[property]
              }
            }
          }
          saveQualityAssuranceInfo({
            token: this.user.token,
            info: formData
          }).then(() => {
            // this.alertSuccess({
            //   message: 'Save successfully.'
            // })
          }).catch(({ message }) => {
            this.alertDanger({
              message
            })
          })
          for (let i = 0; i < this.qualityAssuranceList.buyers.length; i++) {
            if (this.qualityAssuranceList.buyers[i].buyer === undefined && this.qualityAssuranceList.buyers[i].accreditingAgency === undefined && this.qualityAssuranceList.buyers[i].expirationDate === undefined) {
            // console.log(this.functions[i])
              this.deleteBuyer(this.qualityAssuranceList.buyers[i])
            }
          }
          let buyers = this.qualityAssuranceList.buyers.map(func => ({
            buyer: func.buyer,
            accreditingAgency: func.accreditingAgency,
            expirationDate: _.toString(func.expirationDate).trim() === '' ? null : moment(func.expirationDate).format('YYYY-MM-DD')
          }))
          savemIllVendorMasterBuyers({
            token: this.user.token,
            info: {
              parnetId: _.toInteger(this.vendorProfileId),
              buyers: buyers
            }
          }).then(() => {
          })
          deleteByID({
            token: this.user.token,
            certs: {
              deleteCerts: this.deleteCerts
            }
          }).then(() => {
          })
          this.millVendorMasterCerts = this.millVendorMasterCerts.map(cer => ({
            ...cer,
            expirationDate: _.toString(cer.expirationDate).trim() === '' ? null : moment(cer.expirationDate).format('YYYY-MM-DD')
          }))
          console.log(this.millVendorMasterCerts)
          savemillVendorMasterCerts({
            token: this.user.token,
            certs: {
              folderId: this.folderId,
              parnetId: _.toInteger(this.vendorProfileId),
              certs: this.millVendorMasterCerts
            }
          }).then(() => {
            this.loadData()
          })
        },
        loadData () {
          Promise.all([
            getQualityAssuranceInfo({
              token: this.user.token,
              millVendorID: this.vendorProfileId
            }),
            getInspectionSystem({
              token: this.user.token
            })
          ]).then(([QualityAssuranceInfo, InspectionSystem]) => {
            this.inspectionSystem = InspectionSystem
            // let qualityMap = InspectionSystem.reduce((map, func) => {
            //   map[func.code] = func
            //   return map
            // }, {})
            this.qualityAssuranceList = _.cloneDeep(QualityAssuranceInfo)
            for (let property in QualityAssuranceInfo) {
              this[property] = QualityAssuranceInfo[property]
            }
            this.qualityAssuranceList.buyers = this.qualityAssuranceList.buyers.map(buyer => ({
              ...buyer,
              expirationDate: buyer.expirationDate === null ? null : moment(buyer.expirationDate).format('MM/DD/YYYY')
            }))
            this.millVendorMasterCerts = this.qualityAssuranceList.millVendorMasterCerts.map(item => ({
              id: item.id,
              certificateName: item.certificate_name,
              accreditingAgency: item.accrediting_agency,
              facilityName: item.facility_name,
              expirationDate: item.expiration_date === null ? null : moment(item.expiration_date).format('MM/DD/YYYY'),
              attachment: item.certificate === null || item.certificate === '' ? ' ' : item.certificate,
              originalAttachment: item.certificate === null || item.certificate === '' ? ' ' : item.certificate,
              isUpload: true,
              allreadyExist: true
            }))
            for (let i = 0; i < this.millVendorMasterCerts.length; i++) {
              if (this.millVendorMasterCerts[i].attachment === ' ') {
                this.millVendorMasterCerts[i].isUpload = false
              } else {
                this.millVendorMasterCerts[i].attachment = JSON.parse(this.millVendorMasterCerts[i].attachment).name
              }
            }
            if (this.millVendorMasterCerts.length === 0) {
              this.addCertificate()
            }
            if (this.qualityAssuranceList.buyers.length === 0) {
              this.addBuyer()
            }
            // if (QualityAssuranceInfo.inspection_systems != null) {
            //   this.inspection_systems = QualityAssuranceInfo.inspection_systems.split(',').map(code => qualityMap[code]).filter(item => item !== undefined)
            // }
            if (_.isString(QualityAssuranceInfo.inspection_systems) && QualityAssuranceInfo.inspection_systems.trim() !== '') {
              this.inspection_systems = QualityAssuranceInfo.inspection_systems.split(',')
            } else {
              this.inspection_systems = []
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
  .field-title {
    font-size: 15px;
  }
  .option-label {
    font-weight: 400;
  }  
</style>
