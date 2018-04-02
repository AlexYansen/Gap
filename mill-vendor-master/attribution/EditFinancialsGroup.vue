<template>
    <modal :show="show" @show="show = true" @hide="show = false" :dialog-style="modalDialogStyle">
        <div class="header">
            <h4 class="title" style="display: inline-block;">Editing</h4>
            <span class="pull-right" style="cursor: pointer;" @click="show = false">X</span>
        </div>
        <div class="content" style="padding-left: 20px;padding-right: 20px">
          <div>
            <label class="field-title">Financials</label>             
          </div>

          <table class="table" v-loading="loading3"  element-loading-text="Downloading files">
            <tbody>
              <tr class="trHeader">
                <th class="thcss" style="width: 25%;">Report Type</th>
                <th class="thcss" style="width: 30%;">Attachment</th>
                <th class="thcss" style="width: 35%;">Comment</th>
                <th class="thcss" style="width: 10%;"><a class="btn" @click="addFinanicals(finanicals)"><i class="fa fa-plus"></i>Add</a></th>
              </tr>
              <tr v-for="(finanical, index) in finanicals" class="trBody">
                <td class="thBody">
                  <multi-select :options="reportTypeOptions" :is-multiple="false" v-model="finanical.reportType" id-field="code" label-field="name"/>    
                </td>
                <td style="text-align: center;" class="thBody">
                    
                  <a v-if="finanical.isUpload" style="cursor:pointer" @click="downloadAttachment (finanical.attachment)">{{ finanical.attachment }}</a>                   
                  <file-upload v-if="!finanical.isUpload" :valueInList="finanicals" :indexInList="index" style="margin: 0 auto"/>
                  <a v-if="finanical.isUpload" class="btn" @click="reUpload(index)"><i class="fa fa-remove"></i></a>
                </td>
                <td class="thBody">
                  <input v-model="finanical.comment" class="form-control" style="height:25px;border-color: #aaa;border-radius: 4px;" /> 
                </td>
                <td style="text-align: center;" class="thBody">         
                  <a class="btn" @click="removeFinanicals (finanicals, finanical)"><i class="fa fa-trash"></i>Delete</a>
                </td>
              </tr>
            </tbody>
          </table>  

          <div>
            <label class="field-title">Change Description*</label> <br/>
            <textarea rows="6" cols="100" v-model="changeHistorys" style="width: 100%"></textarea>
          </div>
        </div>

        <div class="footer">    
            <div class="pull-right">
               <button  @click="save" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="Saving" type="button" class="btn btn-success" style="width: 66px;margin-top: 20px;margin-right: 20px;">Save</button>
            </div>
        </div>   

    </modal>
</template>

<script>
  import _ from 'lodash'
  import fileUpload from '../view-profile/fileUpload'
  import Modal from 'src/components/common/Modal'
  import { pixelize } from 'src/components/common/util'
  import MultiSelect from 'src/components/common/MultiSelect'
  import AttributionService from './AttributionService'
  import {
    USER,
    ALERT_DANGER,
    ALERT_SUCCESS
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
      fileUpload,
      MultiSelect
    },
    props: {
      value: {
        type: Boolean,
        required: true
      },
      editFinanicals: {
        type: Array
      },
      reportTypeOptions: {
        type: Array
      },
      changeBy: {
        type: String,
        required: true
      },
      parentID: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        show: false,
        finanicals: [],
        file: null,
        folderId: 'vpse',
        changeHistorys: '',
        fullscreenLoading: false,
        deletefinanicals: [],
        loading3: false
      }
    },
    methods: {
      ...mapActions({
        alertDanger: ALERT_DANGER,
        alertSuccess: ALERT_SUCCESS
      }),
      addFinanicals (finanicals) {
        finanicals.push({
          finanicalId: 0,
          attachment: ' ',
          reportType: null,
          originalAttachment: ' ',
          isUpload: false,
          allreadyExist: false,
          comment: null
        })
        this.finanicals = [...this.finanicals]
      },
      removeFinanicals (finanicals, finanical) {
        this.deletefinanicals.push(finanical)
        this.finanicals = finanicals.filter(item => item !== finanical)
      },
      Deletefinanicals () {
        for (let i = 0; i < this.deletefinanicals.length; i++) {
          this.$attribution.deleteFinanical({
            ID: this.deletefinanicals[i].finanicalId,
            token: this.user.token
          }).then(response => {
          })
        }
      },
      reUpload (index) {
        this.finanicals[index].isUpload = !this.finanicals[index].isUpload
        this.finanicals[index].allreadyExist = false
        this.finanicals[index].originalAttachment = ' '
        this.finanicals[index].attachment = ' '
      },
      downloadAttachment (attachment) {
        this.loading3 = true
        this.$attribution.downloadAttachment({
          folderId: this.folderId,
          attachment: attachment,
          token: this.user.token
        }).then(response => {
          this.loading3 = false
          window.location.href = response.downloadUrl
        }).catch(({ message }) => {
          this.loading3 = false
          this.alertDanger({
            message
          })
        })
      },
      // onFileChange ($event, index) {
        // this.file = $event.target.files[0]
        // let formData = new window.FormData()
        // formData.append('file', this.file)
        // this.$attribution.uploadAttachment({
        //   file: formData,
        //   token: this.user.token
        // }).then(resposes => {
        //   this.finanicals[index].isUpload = true
        //   this.finanicals[index].originalAttachment = this.finanicals[index].attachment
        //   if (this.finanicals[index].originalAttachment === null) {
        //     this.finanicals[index].originalAttachment = ' '
        //   }
        //   this.finanicals[index].attachment = resposes[0].fileName
        // }).catch(({ message }) => {
        //   this.alertDanger({
        //     message
        //   })
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
      //       console.log('this.finanicals[index]=')
      //       console.info(this.finanicals[index])
      //       this.finanicals[index].isUpload = true
      //       this.finanicals[index].attachment = data.result.name
      //     }
      //   })
      // },
      save () {
        let finanical = {
          changeBy: this.changeBy,
          folderId: this.folderId,
          logMessage: this.changeHistorys,
          changeLogId: 'MILL_VENDOR_MASTER_FNC',
          parentID: _.toInteger(this.$route.params.id),
          finanicals: JSON.parse(JSON.stringify(this.finanicals))
        }
        let checklogMessage = true
        if (finanical.logMessage === '') {
          checklogMessage = false
        }
        for (let i = 0; i < finanical.finanicals.length; i++) {
          finanical.finanicals[i].reportType = finanical.finanicals[i].reportType ? finanical.finanicals[i].reportType.code : null
          finanical.finanicals[i].attachment = finanical.finanicals[i].attachment ? finanical.finanicals[i].originalAttachment : ' '
          if (finanical.finanicals[i].allreadyExist === false) {
            finanical.finanicals[i].originalAttachment = ' '
          }
        }
        console.log(finanical)
        if (checklogMessage) {
          this.fullscreenLoading = true
          this.$attribution.insertUpdateFinanical({
            finanical: finanical,
            token: this.user.token
          }).then(() => {
            this.fullscreenLoading = false
            this.show = false
            this.Deletefinanicals()
            this.alertSuccess({
              message: 'Save successfully.'
            })
          }).catch(({ message }) => {
            this.fullscreenLoading = false
            this.alertDanger({
              message
            })
          })
        } else {
          this.fullscreenLoading = false
          this.alertDanger({
            message: 'The change description can not be empty.'
          })
        }
      }
    },
    computed: {
      ...mapGetters({
        user: USER
      }),
      modalDialogStyle () {
        return {
          width: pixelize(850),
          height: pixelize(600),
          overflow: 'auto'
        }
      }
    },
    watch: {
      value () {
        this.show = this.value
      },
      show () {
        this.$emit('input', this.show)
      },
      editFinanicals () {
        this.finanicals = this.editFinanicals.map(item => ({
          finanicalId: _.toInteger(item.finanicalId),
          attachment: item.attachment === ' ' ? ' ' : JSON.parse(item.attachment).name,
          reportType: {
            code: item.report_type,
            name: item.report_type
          },
          originalAttachment: item.attachment,
          comment: item.comment,
          isUpload: true,
          allreadyExist: true
        }))
        for (let i = 0; i < this.finanicals.length; i++) {
          if (this.finanicals[i].attachment === ' ' || this.finanicals[i].attachment === null) {
            this.finanicals[i].isUpload = false
            this.finanicals[i].allreadyExist = false
          }
        }
        this.changeHistorys = ''
        this.deletefinanicals = []
      }
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
  th {
    text-align: center;
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
