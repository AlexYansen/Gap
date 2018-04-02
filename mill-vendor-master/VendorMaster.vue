<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <p style="color: #25AAE1;font-size:15px">Mill Vendor Master</p>
      </div>
    </div>

    <box :box-class="boxClass" style="margin-bottom: 0px;">
      <div slot="box-tools" class="box-tools pull-right">
        <box-toolbar-btn icon-class="fa-search" @click="showSearchPanel = !showSearchPanel"/>
      </div>
      <div class="row">
        <div class="col-md-2">
          <!-- <button type="button" class="btn btn-success">Add Relationship</button> -->
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
        <!--<button class="btn" v-if="user.categoryCodeList.indexOf('Z') !== -1 || user.categoryCodeList.indexOf('X') !== -1">Test</button>-->
        <datatable :options="datatableOptions" :data="millVendorMasterList" />
        </div>
      </div>
    </box>
    <search-panel 
      id="Vendor_Master_Search_Panel" 
      :show="showSearchPanel" 
      @show="showSearchPanel = true" 
      @hide="showSearchPanel = false" 
      @search="onSearch" 
      @clear="onClear">
      <div>
        <div class="form-group">
          <label>Mill Vendor Profile ID</label>
          <input type="text" class="form-control input-sm" v-model="searchCriteria.mill_VendorProfile_ID">
        </div>
        <div class="form-group">
          <label>Mill Vendor Name</label>
          <input type="text" class="form-control input-sm" v-model="searchCriteria.mill_Vendor_Name">
        </div>
        <div class="form-group">
          <label>Status</label>
          <multi-select :options="statuses" :is-multiple="true" v-model="searchCriteria.status" id-field="code" label-field="name"/>
        </div>
        <div class="form-group">
          <label>Parent Manufacturing Vendor Profile ID</label>
          <input type="text" class="form-control input-sm" v-model="searchCriteria.manfacturingVendorProfileID">
        </div>
        <div class="form-group">
          <label>Parent Manufacturing Vendor Name</label>
          <input type="text" class="form-control input-sm" v-model="searchCriteria.manfacturingVendorName">
        </div>
        <div class="form-group">
          <label>Country of Origin</label>
          <multi-select :options="countries" :is-multiple="true" :filter="true" v-model="searchCriteria.countryOfOrigin" id-field="code" label-field="name"/>
        </div>
        <div class="form-group">
          <label>Category</label>
          <multi-select :options="categories" :is-multiple="true" v-model="searchCriteria.category" id-field="code" label-field="name"/>
        </div>
      </div>
    </search-panel>
  </div>
</template>

<script>
  import _ from 'lodash'
  import Box from 'src/components/common/Box'
  import Datatable from 'src/components/common/datatable2/LocalDataWrapper'
  import BoxToolbarBtn from 'src/components/common/BoxToolbarBtn'
  import SearchPanel from 'src/components/common/search-panel/SearchPanel'
  import MultiSelect from 'src/components/common/MultiSelect'
  // import $ from 'jquery'
  import {
    USER,
    ALERT_DANGER,
    ALERT_SUCCESS
  } from 'src/store/definition'
  import {
    countries,
    categories
  } from 'src/components/common/store/definition'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import {
    getMillVendorMasterList,
    getStatus
  } from './service'
  export default {
    components: {
      Box,
      Datatable,
      BoxToolbarBtn,
      SearchPanel,
      MultiSelect
    },
    data () {
      let self = this
      return {
        countryMap: {},
        categoryMap: {},
        boxClass: '',
        canViewProfile: false,
        canViewAttr: false,
        canViewRel: false,
        canViewNum: null,
        ViewNum: 0,
        confine: 0,
        summ: 0,
        millVendorMasterList: [],
        statuses: [],
        showSearchPanel: false,
        searchCriteria: {
          mill_VendorProfile_ID: null,
          mill_Vendor_Name: null,
          status: [],
          manfacturingVendorProfileID: null,
          manfacturingVendorName: null,
          countryOfOrigin: [],
          category: []
        },
        datatableOptions: {
          id: 'Announcement-Posting',
          height: 500,
          rowHeight: 39,
          columns: [
            // {label: 'User Group', field: 'userGroupID', sortable: true, filter: {type: 'text'}},
            {
              label: 'Actions',
              field: 'actions',
              width: 0,
              // overflow: 'hidden',
              sortable: true,
              filter: {type: 'text'},
              renderCell (h, rowData, { width, height }) {
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
                      self.canViewProfile ? <router-link tag="span" to={ {path: '/vps-extension/mill-vendor-master/view-profile/' + rowData.id} }><a class="btn"><i class="fa fa-align-justify"></i>  Profile</a></router-link> : ''
                    }
                    {
                      self.canViewAttr ? <router-link tag="span" to={ {path: '/vps-extension/mill-vendor-master/attribution/' + rowData.id} }><a class="btn"><i class="fa fa-tag"></i>  Attribution</a></router-link> : ''
                    }
                    {
                      self.canViewRel ? <router-link tag="span" to={ {path: '/vps-extension/mill-vendor-master/relationship/' + rowData.id} }><a class="btn"><i class="fa fa-user"></i>  Relationship</a></router-link> : ''
                    }
                  </div>
                )
              }
            },
            {
              label: 'Mill Vendor Profile ID',
              field: 'millVendorProfileID',
              width: 120,
              sortable: true,
              filter: {type: 'text'},
              renderCell (h, rowData, { width, height }) {
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
              label: 'Mill Vendor Name',
              field: 'millVendorName',
              width: 280,
              sortable: true,
              filter: {type: 'text'},
              renderCell (h, rowData, { width, height }) {
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
              label: 'Status',
              field: 'status',
              width: 120,
              sortable: true,
              filter: {type: 'text'},
              renderCell (h, rowData, { width, height }) {
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
                    rowData['status']
                  }
                  </div>
                )
              }
            },
            {
              label: 'Parent Manufacturing Vendor Profile ID',
              field: 'manfacturingVendorProfileID',
              width: 120,
              sortable: true,
              filter: {type: 'text'},
              renderCell (h, rowData, { width, height }) {
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
                    rowData['manfacturingVendorProfileID']
                  }
                  </div>
                )
              }
            },
            {
              label: 'Parent Manufacturing Vendor Name',
              field: 'manfacturingVendorName',
              width: 280,
              sortable: true,
              filter: {type: 'text'},
              renderCell (h, rowData, { width, height }) {
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
                    rowData['manfacturingVendorName']
                  }
                  </div>
                )
              }
            },
            {
              label: 'Country of Origin',
              field: 'countryofOrigin',
              width: 160,
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
                    this.countryMap[rowData['countryofOrigin']]
                  }
                  </div>
                )
              }
            },
            {
              label: 'Category ',
              field: 'category ',
              width: 240,
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
                    (rowData['category'] || '').split(',').map(categoryCode => this.categoryMap[categoryCode]).join(',     ')
                  }
                  </div>
                )
              }
            }
          ],
          rowIdField: 'id',
          paginationOptions: {
            rowsPerPage: 10,
            rowsPerPageOptions: [10, 30, 50]
          }
        }
      }
    },
    computed: {
      ...mapGetters({
        user: USER,
        countries,
        categories
      })
    },
    watch: {
      countries () {
        this.updateCountryMap()
      },
      categories () {
        this.updateCategoryMap()
      }
    },
    methods: {
      ...mapActions({
        alertDanger: ALERT_DANGER,
        alertSuccess: ALERT_SUCCESS
      }),
      onClickCopyButton (valueOf) {
        console.log(valueOf.id)
        for (let i = 0; i < this.millVendorMasterList.length; i++) {
          if (this.millVendorMasterList[i].id === valueOf.id) {
            this.millVendorMasterList.splice(++i, 0, valueOf)
            return
          }
        }
      },
      onSearch () {
        let searchCriteria = _.cloneDeep(this.searchCriteria)
        searchCriteria.status = searchCriteria.status.map(status => status.code)
        searchCriteria.countryOfOrigin = searchCriteria.countryOfOrigin.map(coo => coo.code)
        searchCriteria.category = searchCriteria.category.map(category => category.code)
        searchCriteria['mill_VendorProfile_ID'] = _.toInteger(searchCriteria['mill_VendorProfile_ID']) === 0 ? null : _.toInteger(searchCriteria['mill_VendorProfile_ID'])
        searchCriteria['manfacturingVendorProfileID'] = _.toInteger(searchCriteria['manfacturingVendorProfileID']) === 0 ? null : _.toInteger(searchCriteria['manfacturingVendorProfileID'])
        getMillVendorMasterList({
          token: this.user.token,
          searchCriteria
        }).then(millVendorMasterList => {
          if (this.user.userGroupId === 4 || this.user.userFunctionGroupId === 9) {
            millVendorMasterList.map(item => {
              if (item['mill_VendorProfile_ID'] !== 0 && this.user.vendorList.findIndex(vendor => vendor.vendorCode + '' === item['mill_VendorProfile_ID'] + '') !== -1) {
                // console.log('2233999999992')
                let list = {
                  id: _.toString(item.ID),
                  millVendorProfileID: _.toString(item['mill_VendorProfile_ID']),
                  millVendorName: item['mill_Vendor_Name'],
                  status: item.status,
                  manfacturingVendorProfileID: _.toString(item['manfacturing_Vendor_Profile_ID']) === '0' ? null : _.toString(item['manfacturing_Vendor_Profile_ID']),
                  manfacturingVendorName: item['manfacturing_Vendor_Name'],
                  countryofOrigin: item['country_Of_Origin'],
                  category: item['category']
                }
                this.millVendorMasterList.push(list)
                // return ({
                  // id: _.toString(item.ID),
                  // millVendorProfileID: _.toString(item['mill_VendorProfile_ID']),
                  // millVendorName: item['mill_Vendor_Name'],
                  // status: item.status,
                  // manfacturingVendorProfileID: _.toString(item['manfacturing_Vendor_Profile_ID']) === '0' ? null : _.toString(item['manfacturing_Vendor_Profile_ID']),
                  // manfacturingVendorName: item['manfacturing_Vendor_Name'],
                  // countryofOrigin: item['country_Of_Origin'],
                  // category: item['category']
                // })
              }
            })
            for (let i = 0; i < this.millVendorMasterList.length; i++) {
              for (let a = 0; a < this.statuses.length; a++) {
                if (this.statuses[a].code === this.millVendorMasterList[i].status) {
                  this.millVendorMasterList[i].status = this.statuses[a].name
                }
              }
            }
          } else {
            this.millVendorMasterList = millVendorMasterList.map(item => ({
              id: _.toString(item.ID),
              millVendorProfileID: _.toString(item['mill_VendorProfile_ID']),
              millVendorName: item['mill_Vendor_Name'],
              status: item.status,
              manfacturingVendorProfileID: _.toString(item['manfacturing_Vendor_Profile_ID']) === '0' ? null : _.toString(item['manfacturing_Vendor_Profile_ID']),
              manfacturingVendorName: item['manfacturing_Vendor_Name'],
              countryofOrigin: item['country_Of_Origin'],
              category: item['category']
            }))
            for (let i = 0; i < this.millVendorMasterList.length; i++) {
              for (let a = 0; a < this.statuses.length; a++) {
                if (this.statuses[a].code === this.millVendorMasterList[i].status) {
                  this.millVendorMasterList[i].status = this.statuses[a].name
                }
              }
            }
          }
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
          if (column.label === 'Actions') {
            return {
              ...column,
              width: wid
            }
          } else {
            return column
          }
        })
        this.datatableOptions = {
          columns: newColumns
        }
      },
      onClear () {
        this.searchCriteria = {
          mill_VendorProfile_ID: null,
          mill_Vendor_Name: null,
          status: [],
          manfacturingVendorProfileID: null,
          manfacturingVendorName: null,
          countryOfOrigin: [],
          category: []
        }
      },
      updateCountryMap () {
        this.countryMap = this.countries.reduce((map, country) => {
          map[country.code] = country.name
          return map
        }, {})
      },
      updateCategoryMap () {
        this.categoryMap = this.categories.reduce((map, category) => {
          map[category.code] = category.name
          return map
        }, {})
      }
    },
    mounted () {
      this.updateCountryMap()
      this.updateCategoryMap()
      getStatus({
        token: this.user.token
      }).then(statuses => {
        this.statuses = statuses
      })
      for (let index in this.user.accessGroupList) {
        if (this.user.accessGroupList[index].accessGroup === 'VPSE_MILL_VEDNOR_MASTER_VIEW') {
          this.canViewProfile = true
          this.canViewNum = 85
        }
        if (this.user.accessGroupList[index].accessGroup === 'VPSE_MILL_VEDNOR_MASTER_ATTR_VIEW') {
          this.canViewAttr = true
          this.canViewNum = this.canViewNum + 105
        }
        if (this.user.accessGroupList[index].accessGroup === 'VPSE_MILL_VEDNOR_MASTER_REL_VIEW') {
          this.canViewRel = true
          this.canViewNum = this.canViewNum + 115
        }
      }
      this.confine++
      // this.canViewNum = this.ViewNum * 120
      if (this.confine === 1) {
        this.controlWidth(this.canViewNum)
      }
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
