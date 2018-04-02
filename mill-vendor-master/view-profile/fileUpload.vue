<template>
    <input type="file"  name="fileUpload" v-loading.fullscreen.lock="loading3" element-loading-text="uploading......" ref="fileUploader"/>
</template>
<script>
  import $ from 'jquery'
  import { microservice, smee } from 'src/app-config'
  const url = microservice.domain + '/zuul/box/files'
  import moment from 'moment'
  import 'blueimp-file-upload/js/vendor/jquery.ui.widget.js'
  import 'blueimp-file-upload/js/jquery.fileupload.js'
  import {
    USER
  } from 'src/store/definition'
  import {
    mapGetters
  } from 'vuex'

  export default {
    props: {
      valueInList: {
        required: true
      },
      indexInList: {
        required: true
      }
    },
    computed: {
      ...mapGetters({
        user: USER
      })
    },
    data () {
      return {
        loading3: false
      }
    },
    mounted () {
      $(this.$refs.fileUploader).fileupload({
        url: url,
        replaceFileInput: false,
        type: 'POST',
        dataType: 'json',
        paramName: 'file',
        add: function (e, data) {
          var array = data.files[0].name.split('.')
          var len = array.length
          var i = len - 2
          // data.files[0].uploadName = array[len-2] + '_' + moment(new Date()).format('YYYYMMDDHHmmss') + '.' + array[len-1]
          if (len > 2) {
            array[i] = array[i] + '_' + moment(new Date()).format('YYYYMMDDHHmmss')
          } else {
            array[0] = array[0] + '_' + moment(new Date()).format('YYYYMMDDHHmmss')
          }
          data.files[0].uploadName = array.join('.')
          data.submit()
        },
        headers: {
          'Authorization': 'Bearer' + this.user.token
        },
        formData: {
          folderId: smee.box.vpseFolderId
        },
        submit: (e, data) => {
          this.loading3 = true
        },
        done: (e, data) => {
          console.log('done')
          // var array = data.result.name.split('.')
          // var attachmentName = array[0] + '_' + moment(new Date()).format('YYYYMMDDHHmmss') + '.' + array[1]
          // data.result.name = attachmentName
          var arr = data.result.name.split('.')
          var len = arr.length
          var i = len - 2
          if (len > 2) {
            var innerArr = arr[i].split('_')
            arr[i] = innerArr[0]
          } else {
            var firstArr = arr[0].split('_')
            // var l = firstArr.length
            firstArr.pop()
            arr[0] = firstArr.join('_')
          }
          var attachmentName = arr.join('.')
          data.result.name = attachmentName
          if (this.indexInList === -1) {
            this.valueInList.isUpload = true
            this.valueInList.attachment = attachmentName
            this.valueInList.originalAttachment = JSON.stringify(data.result)
          } else {
            this.valueInList[this.indexInList].isUpload = true
            this.valueInList[this.indexInList].attachment = attachmentName
            this.valueInList[this.indexInList].originalAttachment = JSON.stringify(data.result)
          }
          this.loading3 = false
        }
      })
    }
  }
</script>