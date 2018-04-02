<template>
<div>
  <div class="row">
    <div class="col-md-12">
      <p style="color: #25AAE1;font-size:15px">Mill Facility Profile</p>
    </div>
  </div>


  <box style="margin-bottom: 0px;">
    <div slot="box-tools" class="pull-left">
      <button v-if="canCreateProfile" class="btn btn-success" ref="newBtn" @click="addMillFacilityProfile">New Profile</button>&nbsp;
    </div>
    <div slot="box-tools" class="pull-left">
      <button v-if="canCreateMaster" class="btn btn-success" ref="createBtn" @click="onClickCreateFacilittMaster">Create Facility Master</button>&nbsp;
    </div>
    <div slot="box-tools" class="pull-left">
      <button v-if="canAssignMaster" class="btn btn-success" ref="assignBtn" @click="onClickAssignFacilittMaster">Assign Facility Master</button>
      &nbsp;
    </div>
    <div slot="box-tools" class="box-tools pull-right">
      <box-toolbar-btn icon-class="fa-search" @click="showSearchPanel = !showSearchPanel"/>
    </div>
    <div class="row">
      <div class="col-md-12">
      <datatable :options="datatableOptions" :data="millFacilityProfileList" @selected-rows-changed="onSelectedRowsChanged"/>
      </div>
    </div>
    <search-panel 
      id="Mill_Facility_Profile_List_Search_Panel" 
      :show="showSearchPanel" 
      @show="showSearchPanel = true" 
      @hide="showSearchPanel = false" 
      @search="onSearch"
      @clear="onClear">
      <div>
        <div class="form-group">
          <label>Mill Facility ID</label>
          <input type="text" class="form-control input-sm" v-model="searchCriteria.millFacilityID">
        </div>
        <div class="form-group">
          <label>Mill Facility Name</label>
          <input type="text" class="form-control input-sm" v-model="searchCriteria.millFacilityName">
        </div>
        <div class="form-group">
          <label>Parent Mill Vendor Profile ID</label>
          <input type="text" class="form-control input-sm" v-model="searchCriteria.millVendorProfileID">
        </div>
        <div class="form-group">
          <label>Parent Mill Vendor Name</label>
          <input type="text" class="form-control input-sm" v-model="searchCriteria.millVendorName">
        </div>
        <div class="form-group">
          <label>Country Of Origin</label>
          <multi-select :options="countries" :is-multiple="true" v-model="searchCriteria.countryOfOrigin" :filter="true" id-field="code" label-field="name"/>
        </div>
      </div>
    </search-panel>
  </box>
  <div>
    <CreateFacilittMaster  :assignList="assignList" :changeBy="changeBy" v-model="showCreate"/>
    <!-- 隐藏的模态框，当点击assgin按钮弹出 -->
  </div>
  <div>
    <AssignFacilityMaster :assignList="assignList"  v-model="showedit"/>
    <!-- 隐藏的模态框，当点击assgin按钮弹出 -->
  </div>
</div>
</template>

<script>
  import _ from 'lodash'
  import Box from 'src/components/common/Box'
  import BoxToolbarBtn from 'src/components/common/BoxToolbarBtn'
  import Datatable from 'src/components/common/datatable2/LocalDataWrapper'
  import SearchPanel from 'src/components/common/search-panel/SearchPanel'
  import MultiSelect from 'src/components/common/MultiSelect'
  import { countries } from 'src/components/common/store/definition'
  import { USER, ALERT_DANGER, ALERT_SUCCESS } from 'src/store/definition'
  import { mapGetters, mapActions } from 'vuex'
  import CreateFacilittMaster from './CreateFacilittMaster'
  import AssignFacilityMaster from './AssignFacilityMaster'
  import {
    // getMillTableId,
    searchMillFacilityProfileList
  } from './service'

  export default {
    components: {
      Box,
      BoxToolbarBtn,
      Datatable,
      SearchPanel,
      MultiSelect,
      CreateFacilittMaster,
      AssignFacilityMaster
    },
    data () {
      let self = this
      return {
        assignList: [], // 保存已选中的复选框的数组
        showCreate: false,
        showedit: false, // 模态框默认标志位，默认隐藏
        countryMap: {},
        canViewProfile: false,
        canCreateProfile: false,
        canCreateMaster: false,
        canAssignMaster: false,
        canViewNum: null,
        confine: 0,
        changeBy: null,
        showSearchPanel: false,
        datatableOptions: {
          id: 'Mill_Facility_Profile_List',
          height: 500,
          rowHeight: 39,
          selectionMode: 'multiple',
          columns: [
            {
              label: 'Action',
              width: 0,
              sortable: true,
              filter: {type: 'text'},
              renderCell (h, rowData) {
                return (
                  <div style={{
                    width: '100%',
                    padding: '2px 5px',
                    overflow: 'hidden',
                    'white-space': 'nowrap',
                    'text-overflow': 'ellipsis',
                    'text-align': 'center'
                  }}>
                  {
                    self.canViewProfile ? <router-link tag="span" to={ {path: '/vps-extension/mill-facility-profile/view-profile/' + rowData['ID']} }><a class="btn"><i class="fa fa-align-justify"></i>  Profile</a></router-link> : <span></span>
                  }
                  </div>
                )
              }
            },
            {
              label: 'Mill Facility ID',
              field: 'millFacilityID',
              width: 150,
              filter: {type: 'text'},
              renderCell: (h, rowData, { width, height }) => {
                return (
                  <div style={{
                    'margin-top': '10px',
                    width: '100%',
                    padding: '2px 5px',
                    overflow: 'hidden',
                    'white-space': 'nowrap',
                    'text-overflow': 'ellipsis',
                    'text-align': 'center'
                  }}>
                  {
                    rowData['millFacilityID']
                  }
                  </div>
                )
              }
            },
            {
              label: 'Mill Facility Name',
              field: 'millFacilityName',
              width: 320,
              renderCell: (h, rowData, { width, height }) => {
                return (
                  <div style={{
                    'margin-top': '10px',
                    width: '100%',
                    padding: '2px 5px',
                    overflow: 'hidden',
                    'white-space': 'nowrap',
                    'text-overflow': 'ellipsis',
                    'text-align': 'left'
                  }}>
                  {
                    rowData['millFacilityName']
                  }
                  </div>
                )
              }
            },
            {
              label: 'Parent Mill Vendor ID',
              field: 'millVendorProfileID',
              width: 150,
              renderCell: (h, rowData, { width, height }) => {
                return (
                  <div style={{
                    'margin-top': '10px',
                    width: '100%',
                    padding: '2px 5px',
                    overflow: 'hidden',
                    'white-space': 'nowrap',
                    'text-overflow': 'ellipsis',
                    'text-align': 'center'
                  }}>
                  {
                    rowData['millVendorProfileID']
                  }
                  </div>
                )
              }
            },
            {
              label: 'Parent Mill Vendor Name',
              field: 'millVendorName',
              width: 320,
              renderCell: (h, rowData, { width, height }) => {
                return (
                  <div style={{
                    'margin-top': '10px',
                    width: '100%',
                    padding: '2px 5px',
                    overflow: 'hidden',
                    'white-space': 'nowrap',
                    'text-overflow': 'ellipsis',
                    'text-align': 'left'
                  }}>
                  {
                    rowData['millVendorName']
                  }
                  </div>
                )
              }
            },
            {
              label: 'Country Of Origin',
              field: 'countryOfOrigin',
              width: 180,
              renderCell: (h, rowData, { width, height }) => {
                return (
                  <div style={{
                    'margin-top': '10px',
                    width: '100%',
                    padding: '2px 5px',
                    overflow: 'hidden',
                    'white-space': 'nowrap',
                    'text-overflow': 'ellipsis',
                    'text-align': 'center'
                  }}>
                  {
                    this.countryMap[rowData['countryOfOrigin']]
                  }
                  </div>
                )
              }
            }
          ],
          rowIdField: 'ID',
          paginationOptions: {
            rowsPerPage: 10,
            rowsPerPageOptions: [10, 30, 50]
          }
        },
        millFacilityProfileList: [],
        searchCriteria: {
          millFacilityID: null,
          millFacilityName: null,
          millVendorName: null,
          countryOfOrigin: []
        }
      }
    },
    computed: {
      ...mapGetters({
        countries,
        user: USER
      })
    },
    watch: {
      countries () {
        this.updateCountryMap()
      },
      showedit () {
        if (this.showedit === false) {
          this.onSearch()
          this.assignList = []
          this.datatableOptions = {
            selectedRowIds: {}
          }
        }
      },
      showCreate () {
        if (this.showCreate === false) {
          this.onSearch()
          this.assignList = []
          this.datatableOptions = {
            selectedRowIds: {}
          }
        }
      }
    },
    methods: {
      onClickCopyButton (valueOf) {
        // console.log(valueOf.ID)
        for (let i = 0; i < this.millFacilityProfileList.length; i++) {
          if (this.millFacilityProfileList[i].ID === valueOf.ID) {
            this.millFacilityProfileList.splice(++i, 0, valueOf)
            console.log(this.millFacilityProfileList)
            return
          }
        }
      },
      onSelectedRowsChanged ({ componentId, selectedRowIds }) { // 在点击复选框按钮时触发
        this.selectedRowIds = selectedRowIds
        this.assignList = []
        let facilityIndex = Object.keys(this.selectedRowIds) // index的形式为["42","45"]
        // 后台传过来的ID总是从0开始连续单调递增，但是数据内包含的id不是从0开始，且不连续
        // 控制台看到的ID比List里面的ID要多一些，因为List只包含该用户能看到的ID
        let limitflag = false
        facilityIndex.forEach(item => { // 遍历用户选中的所有数据
          this.millFacilityProfileList.map(profileList => { // 遍历后台传过来的所有数据
            if (item === profileList.ID + '') {
              // 找到了与id的对应的ID所在项
              if (limitflag === false && profileList.millFacilityID !== null && profileList.millFacilityID !== '') {
                limitflag = true
              }
              let assignMap = {
                isPrimary: false,
                ID: profileList.ID + '',
                countryOfOrigin: profileList.countryOfOrigin,
                millFacilityID: profileList.millFacilityID,
                millFacilityName: profileList.millFacilityName,
                millVendorName: profileList.millVendorName,
                millVendorProfileID: profileList.millVendorProfileID
              }
              this.assignList.push(assignMap)
            }
          })
        })
      },
      ...mapActions({
        alertDanger: ALERT_DANGER,
        alertSuccess: ALERT_SUCCESS
      }),
      addMillFacilityProfile () {
        this.$router.push({path: '/vps-extension/mill-facility-profile/view-profile/' + '0'})
      },
      onClickCreateFacilittMaster () {
        for (let i = 0; i < this.assignList.length; i++) { // 遍历List，保证至少需要选中一个
          if (this.assignList[i].millFacilityID !== null && this.assignList[i].millFacilityID !== '') {
            this.alertDanger({
              message: 'Please only select profiles without facility ID.'
            })
            return
          }
        }
        if (this.assignList.length < 1) {
          this.alertDanger({
            message: 'Select at least one profile.'
          })
          return
        }
        this.showCreate = true
      },
      onClickAssignFacilittMaster () {
        for (let i = 0; i < this.assignList.length; i++) { // 遍历List，保证至少需要选中一个
          if (this.assignList[i].millFacilityID !== null && this.assignList[i].millFacilityID !== '') {
            this.alertDanger({
              message: 'Please only select profiles without facility ID.'
            })
            return
          }
        }
        if (this.assignList.length < 1) {
          this.alertDanger({
            message: 'Select at least one profile.'
          })
          return
        }
        this.showedit = true
      },
      onSearch () {
        let searchCriteria = _.cloneDeep(this.searchCriteria)
        searchCriteria.millVendorProfileID = _.toInteger(searchCriteria.millVendorProfileID) === 0 ? null : _.toInteger(searchCriteria.millVendorProfileID)
        searchCriteria.countryOfOrigin = searchCriteria.countryOfOrigin.map(coo => coo.code)
        searchMillFacilityProfileList({
          token: this.user.token,
          searchCriteria
        }).then(list => {
          this.millFacilityProfileList = []
          if (this.user.userGroupId === 4 || this.user.userFunctionGroupId === 9) {
            list.forEach(item => {
              item.millVendorProfileID = item.millVendorProfileID + ''
              if (item.millVendorProfileID !== 0 && this.user.vendorList.findIndex(vendor => vendor.vendorCode + '' === item.millVendorProfileID) !== -1) {
                this.millFacilityProfileList.push(item)
              }
            })
          } else {
            list.forEach(item => {
              if (item.millVendorProfileID !== 0) {
                this.millFacilityProfileList.push(item)
              }
            })
          }
          // this.millFacilityProfileList = list
        })
      },
      controlWidth (wid) {
        // $('#app').find('table').eq(5).find('tr').eq(1).find('th').eq(1).css('width', wid)
        // $('#app').find('table').eq(5).find('tr').eq(0).find('th').eq(1).css('width', wid)
        // $('#app').find('table').eq(6).find('tr').eq(1).find('td').eq(1).css('width', wid)
        // $('#app').find('table').eq(6).find('tr').eq(0).find('td').eq(1).css('width', wid)
        // let allWidth = $('.body-table-container').eq(0).find('div').eq(0).css('width')
        // allWidth = parseInt(allWidth.replace('px', ''))
        // $('.body-table-container').eq(0).find('div').eq(0).css('width', wid + allWidth + 'px')
        let newColumns = _.cloneDeep(this.datatableOptions.columns).map(column => {
          if (column.label === 'Action') {
            return {
              ...column,
              width: wid
            }
          } else {
            return column
          }
        })
        this.datatableOptions = {
          ...this.datatableOptions,
          columns: newColumns
        }
      },
      onClear () {
        this.searchCriteria = {
          countryOfOrigin: [],
          millFacilityID: null,
          millFacilityName: null,
          millVendorName: null,
          millVendorProfileID: null
        }
      },
      updateCountryMap () {
        this.countryMap = this.countries.reduce((map, country) => {
          map[country.code] = country.name
          return map
        }, {})
      }
    },
    mounted () {
      this.updateCountryMap()
      for (let index in this.user.accessGroupList) {
        if (this.user.accessGroupList[index].accessGroup === 'VPSE_MILL_FACILITY_PROFILE_CREATE') {
          this.canCreateProfile = true
        }
        if (this.user.accessGroupList[index].accessGroup === 'VPSE_MILL_FACILITY_MASTER_CREATE') {
          this.canCreateMaster = true
        }
        if (this.user.accessGroupList[index].accessGroup === 'VPSE_MILL_FACILITY_MASTER_ASSIGN') {
          this.canAssignMaster = true
        }
        if (this.user.accessGroupList[index].accessGroup === 'VPSE_MILL_FACILITY_PROFILE_VIEW') {
          this.canViewProfile = true
          this.canViewNum = 85
        }
      }
      this.confine++
      if (this.confine === 1) {
        this.controlWidth(this.canViewNum)
      }
    },
    created () {
      this.changeBy = this.user.firstName + ' ' + this.user.lastName
    }
  }
</script>

<style scoped>
  * {
    font-family: 'Roboto Condensed', sans-serif;
  }
  .box {
    border-top: 3px solid #1F6F9B !important;
  }
  input.form-control.input-sm {
    height: 28px !important;
  }
</style>