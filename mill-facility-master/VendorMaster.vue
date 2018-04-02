<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <p style="color: #25AAE1;font-size:15px">Mill Facility Master</p>
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
        <datatable :options="datatableOptions" :data="millFacilityMasterList" />
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
          <label>Mill Facility ID</label>
          <input type="text" class="form-control input-sm" v-model="searchCriteria.facilityID">
        </div>
        <div class="form-group">
          <label>Mill Facility Name</label>
          <input type="text" class="form-control input-sm" v-model="searchCriteria.facilityName">
        </div>
        <div class="form-group">
          <label>Status</label>
          <multi-select :options="statuses" :is-multiple="true" v-model="searchCriteria.status" id-field="code" label-field="name"/>
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
    getMillFacilityMasterList,
    getFacilityMasterStatus
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
        canViewAttr: false,
        canViewRel: false,
        canViewNum: null,
        ViewNum: 0,
        confine: 0,
        millFacilityMasterList: [],
        statuses: [],
        showSearchPanel: false,
        searchCriteria: {
          facilityID: null,
          facilityName: null,
          status: [],
          countryOfOrigin: [],
          category: []
        },
        datatableOptions: {
          id: 'MillFacilityMaster',
          height: 500,
          rowHeight: 39,
          columns: [
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
                      self.canViewAttr ? <router-link tag="span" to={ {path: '/vps-extension/mill-facility-master/attribution/' + rowData.id} }><a class="btn"><i class="fa fa-tag"></i>  Attribution</a></router-link> : ''
                    }
                    {
                      self.canViewRel ? <router-link tag="span" to={ {path: '/vps-extension/mill-facility-master/relationship/' + rowData.id} }><a class="btn"><i class="fa fa-user"></i>  Relationship</a></router-link> : ''
                    }
                  </div>
                )
              }
            },
            {
              label: 'Mill Facility ID',
              field: 'millFacilityID',
              width: 170,
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
                    rowData['millFacilityID']
                  }
                  </div>
                )
              }
            },
            {
              label: 'Mill Facility Name',
              field: 'millFacilityName',
              width: 330,
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
                    rowData['millFacilityName']
                  }
                  </div>
                )
              }
            },
            {
              label: 'Status',
              field: 'status',
              width: 170,
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
              label: 'Country of Origin',
              field: 'countryofOrigin',
              width: 210,
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
              width: 330,
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
        console.log(valueOf)
        for (let i = 0; i < this.millFacilityMasterList.length; i++) {
          if (this.millFacilityMasterList[i].id === valueOf.id) {
            this.millFacilityMasterList.splice(++i, 0, valueOf)
            return
          }
        }
      },
      onSearch () {
        let searchCriteria = _.cloneDeep(this.searchCriteria)
        searchCriteria.status = searchCriteria.status.map(status => status.code)
        searchCriteria.countryOfOrigin = searchCriteria.countryOfOrigin.map(coo => coo.code)
        searchCriteria.category = searchCriteria.category.map(category => category.code)
        searchCriteria['facilityID'] = searchCriteria['facilityID'] === '' ? null : searchCriteria['facilityID']
        getMillFacilityMasterList({
          token: this.user.token,
          searchCriteria
        }).then(millFacilityMasterList => {
          this.millFacilityMasterList = millFacilityMasterList.map(item => ({
            id: _.toString(item.ID),
            millFacilityID: _.toString(item['facilityID']),
            millFacilityName: item['facilityName'],
            status: item.status,
            countryofOrigin: item['countryOfOrigin'],
            category: item['category']
          }))
          for (let i = 0; i < this.millFacilityMasterList.length; i++) {
            for (let a = 0; a < this.statuses.length; a++) {
              if (this.statuses[a].code === this.millFacilityMasterList[i].status) {
                this.millFacilityMasterList[i].status = this.statuses[a].name
              }
            }
          }
        })
      },
      controlWidth (wid) {
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
          facilityID: null,
          facilityName: null,
          status: [],
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
      getFacilityMasterStatus({
        token: this.user.token
      }).then(statuses => {
        this.statuses = statuses
      })
      for (let index in this.user.accessGroupList) {
        if (this.user.accessGroupList[index].accessGroup === 'VPSE_MILL_FACILITY_MASTER_ATTR_VIEW') {
          this.canViewAttr = true
          this.canViewNum = 105
        }
        if (this.user.accessGroupList[index].accessGroup === 'VPSE_MILL_FACILITY_MASTER_REL_VIEW') {
          this.canViewRel = true
          this.canViewNum = this.canViewNum + 115
        }
      }
      this.confine++
      // this.canViewNum = this.ViewNum * 120
      // this.canViewNum = this.ViewNum * 240
      if (this.confine === 1) {
        this.controlWidth(this.canViewNum)
      }
      // console.log(_.cloneDeep(this.user))
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
