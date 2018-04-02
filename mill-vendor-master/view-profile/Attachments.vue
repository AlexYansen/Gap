<template>
    <div>
        <div class="form-group">
            <br>
            <label class="control-label field-title">Agreement & Letters</label>
            <div class="row">
                <div class="col-md-11">
                    <table class="table" v-loading="loading3"  element-loading-text="loading">
                        <tbody>
                            <tr class="trHeader">
                                <th style="width:50%; text-align: center;" class="thcss">Document Type</th>
                                <th style="width:40%; text-align: center;" class="thcss">Attachment</th>
                                <th style="width:10%; text-align: center;" class="thcss">
                                    <a class="btn" @click="addAttachments(attachmentsList)">
                                        <i class="fa fa-plus"></i>Add
                                    </a>
                                </th>
                            </tr>
                            <tr class="trBody" v-for="(attachment, index) in attachmentsList">
                                <td class="thBody">
                                    <multi-select :options="attachmentType" v-model="attachment.attachmentType" :is-multiple="false"  id-field="code" label-field="name"/>
                                </td>
                                <td class="thBody" style="text-align: center;padding-left:50px;">                                                                                         
                                    <a v-if="attachment.isUpload" style="cursor:pointer" @click="downloadAttachments (attachment.originalAttachment)">{{ attachment.attachment }}</a>
                                    <file-upload v-if="!attachment.isUpload" :valueInList="attachmentsList" :indexInList="index" style="margin: 0 auto"/>
                                    <a v-if="attachment.isUpload" class="btn" @click="reUpload(index)"><i class="fa fa-remove"></i></a>
                                </td>
                                <td  class="thBody" style="text-align: center;">
                                    <a class="btn" @click="removeAttachments (attachmentsList, attachment)">
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
  import fileUpload from './fileUpload'
  import { microservice } from 'src/app-config'
  import MultiSelect from 'src/components/common/MultiSelect'
  // import $ from 'jquery'
  // import 'blueimp-file-upload/js/vendor/jquery.ui.widget.js'
  // import 'blueimp-file-upload/js/jquery.fileupload.js'
  import {
    folderId,
    getCodeDetailInfo,
    getMillVendorAttachments,
    insertAttachments,
    // uploadAttachment,
    deleteByID
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
      MultiSelect,
      fileUpload
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
        attachmentsList: [],
        attachmentType: [],
        file: null,
        folderId: folderId,
        loading3: false,
        deleteAttachmentsList: []
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
      addAttachments (attachmentsList) {
        attachmentsList.push({
          attachment: ' ',
          attachmentType: null,
          originalAttachment: ' ',
          isUpload: false,
          allreadyExist: false
        })
        this.attachmentsList = [...this.attachmentsList]
      },
      removeAttachments (attachmentsList, attachments) {
        if (attachments.id != null) {
          this.deleteAttachmentsList.push(attachments.id)
        }
        this.attachmentsList = attachmentsList.filter(item => item !== attachments)
      },
      reUpload (index) {
        this.deleteAttachmentsList.push(this.attachmentsList[index].id)
        this.attachmentsList[index].isUpload = !this.attachmentsList[index].isUpload
        this.attachmentsList[index].originalAttachment = ' '
        this.attachmentsList[index].attachment = ' '
        this.attachmentsList[index].allreadyExist = false
      },
      downloadAttachments (originalAttachment) {
        let fileId = JSON.parse(originalAttachment).id
        let versionId = JSON.parse(originalAttachment).versionId
        let token = this.user.token
        let url = microservice.domain + '/box/files/download/' + fileId + '?version=' + versionId + '&access_token=' + token
        window.location.href = url
      },
      // onFileChange ($event, index) {
      //   // this.loading3 = true
      //   // this.file = $event.target.files[0]
      //   // let formData = new window.FormData()
      //   // formData.append('file', this.file)
      //   // uploadAttachment({
      //   //   file: formData,
      //   //   token: this.user.token
      //   // }).then(response => {
      //   //   this.attachmentsList[index].isUpload = true
      //   //   this.loading3 = false
      //   //   this.attachmentsList[index].originalAttachment = this.attachmentsList[index].attachment
      //   //   if (this.attachmentsList[index].originalAttachment === null) {
      //   //     this.attachmentsList[index].originalAttachment = ' '
      //   //   }
      //   //   this.attachmentsList[index].attachment = response[0].fileName
      //   // }).catch(({ message }) => {
      //   //   this.loading3 = false
      //   // })
      // },
      save () {
        console.log('Attachment')
        console.log(this.attachmentsList)
        for (let i = 0; i < this.attachmentsList.length; i++) {
          this.attachmentsList[i].attachment = this.attachmentsList[i].originalAttachment
          if (this.attachmentsList[i].allreadyExist === false) {
            this.attachmentsList[i].originalAttachment = ' '
          }
          if (this.attachmentsList[i].attachmentType === undefined || !this.attachmentsList[i].isUpload) {
            this.removeAttachments(this.attachmentsList, this.attachmentsList[i])
          }
        }
        let attachmentData = {
          folderId: this.folderId,
          parentId: _.toInteger(this.$route.params.id),
          attachments: JSON.parse(JSON.stringify(this.attachmentsList))
        }
        for (let i = 0; i < attachmentData.attachments.length; i++) {
          attachmentData.attachments[i].attachmentType = attachmentData.attachments[i].attachmentType ? attachmentData.attachments[i].attachmentType.code : null
        }
        deleteByID({
          token: this.user.token,
          certs: {
            deleteAgms: this.deleteAttachmentsList
          }
        }).then(() => {
        })
        console.log(attachmentData)
        insertAttachments({
          attachments: attachmentData,
          token: this.user.token
        }).then(() => {
          this.loadData()
        }).catch(({ message }) => {
          this.alertDanger({
            message
          })
        })
      },
      loadData () {
        getCodeDetailInfo({
          token: this.user.token,
          codeTableId: 'MILL_VENDOR_AGREEMENT'
        }).then(attachmentType => {
          this.attachmentType = attachmentType
        })
        getMillVendorAttachments({
          token: this.user.token,
          millVendorID: this.vendorProfileId
        }).then(attachmentsList => {
          this.attachmentsList = attachmentsList.map(item => ({
            id: item.ID,
            attachment: item.ATTACHMENT,
            attachmentType: { code: item.ATTACHMENT_TYPE, name: item.ATTACHMENT_TYPE },
            originalAttachment: item.ATTACHMENT,
            isUpload: true,
            allreadyExist: true
          }))
          for (let i = 0; i < this.attachmentsList.length; i++) {
            if (this.attachmentsList[i].attachment === ' ' || this.attachmentsList[i].attachment === null || this.attachmentsList[i].attachment === '') {
              this.attachmentsList[i].isUpload = false
              this.attachmentsList[i].allreadyExist = false
            } else {
              this.attachmentsList[i].attachment = JSON.parse(this.attachmentsList[i].attachment).name
            }
          }
          if (this.attachmentsList.length === 0) {
            this.addAttachments(this.attachmentsList)
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