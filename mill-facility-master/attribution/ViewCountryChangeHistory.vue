<template>
    <modal :show="show" @show="show = true" @hide="show = false" :dialog-style="modalDialogStyle">
        <div class="header">
            <h4 class="title" style="display: inline-block;">Change History</h4>
            <span class="pull-right" style="cursor: pointer;" @click="show = false">X</span>
        </div>
        <div class="content">
            <datatable
                :options="datatableOptions"
                :data="changeHistory"/>   
        </div>
    </modal>
</template>

<script>
  // import _ from 'lodash'
  import Modal from 'src/components/common/Modal'
  import { pixelize } from 'src/components/common/util'
  import Datatable from 'src/components/common/datatable2/LocalDataWrapper'
  import {
    USER
  } from 'src/store/definition'
  import {
    mapGetters
  } from 'vuex'

  export default {
    components: {
      Modal,
      Datatable
    },
    props: {
      value: {
        type: Boolean,
        required: true
      },
      changeHistory: {
        type: Array
      }
    },
    data () {
      return {
        show: false,
        datatableOptions: {
          id: 'Change-History',
          columns: [
            {
              label: 'Change Date',
              field: 'change_date',
              width: 130,
              sortable: true,
              filter: {type: 'text'}
            },
            {
              label: 'Changed By',
              field: 'change_by',
              width: 145,
              sortable: true,
              filter: {type: 'text'}
            },
            {
              label: 'Change Description',
              field: 'log_message',
              width: 540,
              sortable: true,
              filter: {type: 'text'}
            }
          ],
          rowIdField: 'id',
          paginationOptions: {
            rowsPerPage: 10
          },
          renderCell (h, rowData, { width, height }) {
            return (
              <div style={{
                width: '100%',
                padding: '2px 5px',
                overflow: 'hidden',
                'white-space': 'nowrap',
                'text-overflow': 'ellipsis'
              }}>
              {
                rowData[this.field]
              }
              </div>
            )
          }
        }
      }
    },
    computed: {
      ...mapGetters({
        user: USER
      }),
      modalDialogStyle () {
        return {
          width: pixelize(900),
          height: pixelize(520),
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
</style>
