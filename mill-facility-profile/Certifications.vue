<template>
    <div>
        <div class="form-group">
            <br>
            <label class="control-label field-title">Certifications</label>          
            <div class="row">
                <div class="col-md-12">
                    <table class="table" v-loading="loading3"  element-loading-text="loading">
                        <tbody>
                            <tr class="trHeader">
                                <th style="text-align: center; width: 30%" colspan="2" class="thcss">Certificate</th>
                                <th style="text-align: center; width: 12%" class="thcss">Expiration Date</th>
                                <th style="text-align: center; width: 26%" class="thcss">Accrediting Agency / Issuing Company</th>
                                <th style="text-align: center; width: 24%" class="thcss">Attachment</th>
                                <th style="text-align: center; width: 8%" class="thcss">
                                    <a class="btn" @click="addCertifications(certificationsList)">
                                        <i class="fa fa-plus"></i>Add
                                    </a>
                                </th>
                            </tr>
                            <tr class="trBody" v-for="(item, index) in certificationsList">
                                <td class="thBody" style="width:15%">
                                    <multi-select :options="certOptions" v-model="item.certificateName" :is-multiple="false"  id-field="code" label-field="name"/>
                                </td>
                                <td class="thBody">
                                    <input type="text" :disabled="checkOtherCerts(item)"  class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="item.otherCertName" placeholder="If others, please specify">
                                </td>
                                <td class="thBody">
                                    <Datepicker style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="item.expirationDate" >
                                </td>        
                                <td class="thBody">
                                    <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="item.accreditingAgency">
                                </td>                                                        
                                <td class="thBody" style="text-align: center;">                                                                                                      
                                    <a v-if="item.isUpload" style="cursor:pointer" @click="downloadAttachments (item.originalAttachment)">{{ item.attachment }}</a>
                                    <file-upload v-if="!item.isUpload" :valueInList="certificationsList" :indexInList="index" style="margin: 0 auto"/>
                                    <a v-if="item.isUpload" class="btn" @click="reUpload(index)"><i class="fa fa-remove"></i></a> 
                                </td>
                                <td  class="thBody" style="text-align: center;">
                                    <a class="btn" @click="removeCertifications (certificationsList, item)">
                                        <i class="fa fa-trash"></i>Delete
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- <button class="btn btn-primary" @click="save" >Save</button> -->
        </div>
    </div>
</template>

<script>
  import _ from 'lodash'
  import fileUpload from '../mill-vendor-master/view-profile/fileUpload'
  import { microservice } from 'src/app-config'
  import MultiSelect from 'src/components/common/MultiSelect'
  import Datepicker from 'src/components/common/Datepicker'
  import moment from 'moment'
  import {
    getMillFacilityProfileCert,
    getDropDownList,
    updateFacilityProfileCert
  } from './service'
  import {
    folderId,
    // uploadAttachment,
    deleteByID
  } from '../mill-vendor-master/service'
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
      MultiSelect,
      fileUpload,
      Datepicker
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
        file: null,
        loading3: false,
        folderId: folderId,
        certificationsList: [
          {
            certificateName: {
              code: null
            }
          }
        ],
        deleteCertificationsList: [],
        certOptions: []
      }
    },
    computed: {
      ...mapGetters({
        user: USER
      })
    },
    watch: {
      onSaveBtnClicked () {
        if (this.onSaveBtnClicked) {
          this.save()
          this.$emit('saved')
        }
      }
    },
    methods: {
      ...mapActions({
        alertSuccess: ALERT_SUCCESS,
        alertDanger: ALERT_DANGER
      }),
      checkOtherCerts (item) {
        item.otherCertName = item.certificateName.code !== 'OTHERS' ? '' : item.otherCertName
        return item.certificateName.code !== 'OTHERS'
      },
      addCertifications (certificationsList) {
        certificationsList.push({
          id: 0,
          certificateName: {code: null},
          otherCertName: null,
          accreditingAgency: null,
          expirationDate: null,
          attachment: '',
          originalAttachment: '',
          isUpload: false,
          allreadyExist: false
        })
        this.certificationsList = [...this.certificationsList]
      },
      removeCertifications (certificationsList, item) {
        if (item.id != null) {
          this.deleteCertificationsList.push(item.id)
        }
        this.certificationsList = certificationsList.filter(iten => iten !== item)
      },
      reUpload (index) {
        this.certificationsList[index].isUpload = !this.certificationsList[index].isUpload
        this.certificationsList[index].allreadyExist = false
        this.certificationsList[index].originalAttachment = ' '
        this.certificationsList[index].attachment = ' '
      },
      downloadAttachments (originalAttachment) {
        let fileId = JSON.parse(originalAttachment).id
        let versionId = JSON.parse(originalAttachment).versionId
        let token = this.user.token
        let url = microservice.domain + '/box/files/download/' + fileId + '?version=' + versionId + '&access_token=' + token
        window.location.href = url
      },
      // onFileChange ($event, index) {
        // this.loading3 = true
        // this.file = $event.target.files[0]
        // let formData = new window.FormData()
        // formData.append('file', this.file)
        // uploadAttachment({
        //   file: formData,
        //   token: this.user.token
        // }).then(resposes => {
        //   this.certificationsList[index].isUpload = true
        //   this.loading3 = false
        //   this.certificationsList[index].originalAttachment = this.certificationsList[index].certificate
        //   if (this.certificationsList[index].originalAttachment === null) {
        //     this.certificationsList[index].originalAttachment = ' '
        //   }
        //   this.certificationsList[index].certificate = resposes[0].fileName
        // }).catch(({ message }) => {
        //   this.loading3 = false
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
      //       console.log('this.certificationsList[index]=')
      //       console.info(this.certificationsList[index])
      //       this.certificationsList[index].isUpload = true
      //       this.certificationsList[index].certificate = data.result.name
      //     }
      //   })
      // },
      save () {
        console.log('Certifications')
        for (let i = 0; i < this.certificationsList.length; i++) {
          if (this.certificationsList[i].certificateName === undefined) {
            // console.log(this.functions[i])
            this.removeCertifications(this.certificationsList, this.certificationsList[i])
          }
          this.certificationsList[i].attachment = this.certificationsList[i].originalAttachment
          if (this.certificationsList[i].allreadyExist === false) {
            this.certificationsList[i].originalAttachment = ' '
          }
        }
        let formData = {
          folderId: this.folderId,
          parentId: _.toInteger(this.recordId),
          certs: JSON.parse(JSON.stringify(this.certificationsList))
        }
        console.log(this.certificationsList)
        for (let i = 0; i < formData.certs.length; i++) {
          formData.certs[i].certificateName = formData.certs[i].certificateName.code
          if (typeof (formData.certs[i].certificateName) !== 'string') {
            formData.certs[i].certificateName = null
          }
          formData.certs[i].expirationDate = _.toString(formData.certs[i].expirationDate).trim() === '' ? null : moment(formData.certs[i].expirationDate).format('YYYY-MM-DD')
        }
        deleteByID({
          token: this.user.token,
          certs: {
            deleteFacilityCerts: this.deleteCertificationsList
          }
        }).then(() => {
        })
        updateFacilityProfileCert({
          token: this.user.token,
          info: formData
        }).then(() => {
          this.loadData()
          // this.alertSuccess({
          //   message: 'Save successfully.'
          // })
        }).catch(({ message }) => {
          this.alertDanger({
            message
          })
        })
      },
      loadData () {
        Promise.all([
          getMillFacilityProfileCert({
            token: this.user.token,
            recordId: this.recordId
          }),
          getDropDownList({
            token: this.user.token,
            codeTableId: 'MILL_FACILITY_CERTIFICATE'
          })
        ]).then(([certificationsList, certOptions]) => {
          this.certOptions = certOptions
          this.certificationsList = certificationsList.map(item => ({
            id: item.id,
            certificateName: item.certificateName,
            otherCertName: item.otherCertName,
            accreditingAgency: item.accreditingAgency,
            expirationDate: item.expirationDate === null ? null : moment(item.expirationDate).format('MM/DD/YYYY'),
            attachment: item.certificate === null ? '' : item.certificate,
            originalAttachment: item.certificate === null ? '' : item.certificate,
            isUpload: true,
            allreadyExist: true
          }))
          // console.log(this.certificationsList)
          if (this.certificationsList.length === 0) {
            this.addCertifications(this.certificationsList)
          }
          for (let i = 0; i < this.certificationsList.length; i++) {
            if (this.certificationsList[i].attachment === '' || this.certificationsList[i].attachment === null) {
              this.certificationsList[i].isUpload = false
              this.certificationsList[i].allreadyExist = false
            } else {
              this.certificationsList[i].attachment = JSON.parse(this.certificationsList[i].attachment).name
            }
            this.certificationsList[i].certificateName = {
              code: this.certificationsList[i].certificateName,
              name: this.certificationsList[i].certificateName
            }
            // if (this.certificationsList[i].certificateName != null) {
            //   this.certificationsList[i].certificateName = this.certOptions.find(cer => cer.code === this.certificationsList[i].certificateName)
            // }
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
  .inputs {  
    height: 28px;
    border-color: #aaa;
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
  .field-title {
    font-size: 15px;
  }
  .option-label {
    font-weight: 400;
  }
</style>