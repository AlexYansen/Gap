<template>
    <div id="tabhight">

        <el-popover ref="popover" placement="bottom" width="660" height="200" trigger="hover">
          <div style="font-family: 'Roboto Condensed', sans-serif;font-size: 14px">
            <p>Definitions</p>
            <div>
              <strong>Preferred</strong> - Supplier with broad range of capabilities whose products are critical to Gap Inc.
              <ul>
                <li>large scale and broad range of capabilities that can supply to multiple brands</li>
                <li>supplier whom Gap develops a long-term relationship and guides investment and expansion plans</li>
                <li>capabilities across multiple COOs in which Gap Inc. has capacity priority</li>
                <li>typically receives long term commitments and long term costing is established</li>
                <li>maintains high level of performance across key KPIs (“non-negotiables”)</li>
              </ul>
            </div>
            <div>
              <strong>Tier 2</strong> - Supplier with moderate range of capabilities and potential to become preferred
              <ul>
                <li>suppliers with large scale and broad range of product capabilities who supply to multiple brands</li>
                <li>potential to become Preferred but currently lacking performance consistency across quality, cost, delivery, etc. or cross-brand/COO scope to qualify</li>
              </ul>
            </div>
            <div>
              <strong>Niche</strong> - Supplier with specialized capabilities, typically focused on narrow product groups and/or single brand
              <ul>
                <li>supplier with very specialized capabilities not available across preferred or tier 2 vendors</li>
                <li>typically focused on single brand</li>
                <li>typically focused on single product group and/or COO</li>
              </ul>
            </div>
            <div>
              <strong>Explore</strong> - New Supplier with undetermined capabilities
              <ul>
                <li>tiering must be determined within 2 seasons</li>
              </ul>
            </div>
            <div>
              <strong>Exit</strong> - Supplier to be exited
              <ul>
                <li>must be exited within 2 seasons</li>
              </ul>
            </div>
            <div>
              <strong>Vendor Vertical</strong> - Vendor with own mill facilities
              <ul>
                <li>garment vendor with vertical setup</li>
              </ul>
            </div>
            <div>
              <strong>Vendor Sourced</strong> - Vendor with subcontracted mill facilities
              <ul>
                <li>Gap has no direct relationship with the mill facilities</li>
              </ul>
            </div>
          </div>
        </el-popover>


        <div class="row">
            <div class="col-md-6">
                <p style="color: #25AAE1;font-size:15px">Mill Vendor Master > {{ attributions.vendorId }} {{ attributions.venderName }}  > Attribution</p>
            </div>
        </div>

        <div class="nav-tabs-custom" style="margin-bottom: 0px">
                <ul class="nav nav-tabs" id="tabs" style="background-color: #FAFAFA;">
                    <li class="active">
                        <a href="#Attribution" data-toggle="tab">Attribution</a>
                    </li>
                    <router-link to="/MASTER-DATA/VPS-EXTENSION/MILL-VENDOR-MASTER">
                        <button type="button" class="btn btn-danger pull-right" style="width: 66px;">Back</button>
                    </router-link>
                </ul>
  
                <div class="tab-content" id="tabContent" style="display:block;height: calc(100vh - 210px);overflow-y: auto;overflow-x: hidden;border-top: 3px solid #DDDDDD;">

                    <div class="tab-pane active" id="Attribution" style="padding-left: 15px;padding-right: 15px" >
                      <br/>
                      <div class="row">
                          <div class="col-md-5">
                            <strong class="field-title">
                                Vendor ID
                            </strong>
                            <P></P>                           
                            <a>{{ attributions.vendorId }}</a>                                        
                            <hr>                         
                            <strong class="field-title">
                                 Status
                            </strong>
                            <P></P> 
                            <a>{{ attributions.status }}</a>  
                            <br v-if="attributions.status === null"/>                         
                            <hr> 
                            <strong class="field-title">
                                GIS Office
                            </strong>
                            <P></P> 
                            <a>{{ attributions.gis_office }}</a> 
                            <br v-if="attributions.gis_office === null"/>                         
                            <hr> 
                          </div>
                          <div class="col-md-1">
                          </div>  
                          <div class="col-md-5">
                            <strong class="field-title">
                                 Vendor Name
                            </strong>          
                            <P></P>                  
                            <a>{{ attributions.venderName }}</a>    
                            <br v-if="attributions.venderName === null"/>                       
                            <hr>   
                            <strong class="field-title">
                                 Country of Origin
                            </strong>          
                            <P></P>                  
                            <a>{{ attributions.countryOfOrigin }}</a>   
                            <br v-if="attributions.countryOfOrigin === null"/>                        
                            <hr>                       
                          </div>
                      </div>    

                      <br>

                      <div class="row">
                        <div class="col-md-9">  
                            <strong class="field-title">Categories</strong>
                            <a @click="showEdit" class="btn" style="padding:2px 5px;"><i class="fa fa-pencil-square-o"></i></a>                           
                            <a @click="showHistory" class="btn" style="padding:2px 5px;"><i class="fa fa-search"></i></a>
                            <table class="table">
                                <tbody>
                                    <tr class="trHeader">
                                        <th style="width: 10%;" class="thcss">Primary?</th>
                                        <th style="width: 16%;" class="thcss">Category</th>  
                                        <th style="width: 28%;" class="thcss">Tiering  <i v-popover:popover class="fa fa-info-circle fa-lg" style="color: #25AAE1;" ></i></th>
                                        <th style="width: 28%;" class="thcss">Brands</th>                                 
                                        <th style="width: 28%;" class="thcss">Relationship Manager</th>
                                    </tr>
                                    <tr v-if="!blackCategory" v-for="categorie in categorys" class="trBody">
                                        <th class="thBody">                                                                                 
                                           <i v-if="categorie.isPrimary === 'Y'" class="fa fa-check fa-1" style="color: rgb(0, 113, 60); font-size: 14px;" aria-hidden="true"></i>
                                        </th>
                                        <td class="thBody">                                           
                                            <a>{{ categorie.category }}</a>  
                                        </td>
                                        <td class="thBody">
                                            <a>{{ categorie.tiering }}</a>    
                                        </td>
                                        <td class="thBody">
                                            <a v-for="(item,index) in categorie.brands">{{ item.lbrandName }}/ </a>    
                                        </td>
                                        <td class="thBody">
                                            <a>{{ categorie.relManager }}</a>      
                                        </td>                                  
                                    </tr>
                                </tbody>
                            </table>
                            <a v-if="blackCategory" style="margin-left:380px;border-color:#ddd !important;background-color: #FCFCFC !important;">No Record</a>
                        </div>
                      </div>   

                      <br>

                      <div class="row">
                        <div class="col-md-9" v-loading="loading2"  element-loading-text="Downloading files">  
                            <strong class="field-title">Financials</strong>
                            <a @click="showFinancialEdit" class="btn" style="padding:2px 5px;"><i class="fa fa-pencil-square-o"></i></a>
                            <a @click="showFinancialHistory" class="btn" style="padding:2px 5px;"><i class="fa fa-search"></i></a>
                            <table class="table">
                                <tbody>
                                    <tr class="trHeader">
                                        <th style="width: 25%;" class="thcss">Report Type</th>
                                        <th style="width: 30%;" class="thcss">Attachment</th>
                                        <th style="width: 45%;" class="thcss">Comment</th>
                                    </tr>
                                    <tr v-if="!blackFinanicals" v-for="finanical in finanicals" class="trBody">
                                        <td class="thBody">                                           
                                            <a>{{ finanical.report_type }}</a>  
                                        </td>
                                        <td class="thBody">
                                            <a style="cursor:pointer"  @click="downloadAttachment ( finanical.originalAttachment )" >{{ finanical.attachment }}</a>                                                                                         
                                        </td>      
                                        <td class="thBody">                                           
                                            <a>{{ finanical.comment }}</a>  
                                        </td>                          
                                    </tr>
                                </tbody>
                            </table>
                            <a v-if="blackFinanicals" style="margin-left:380px;border-color:#ddd !important;background-color: #FCFCFC !important;">No Record</a>
                        </div>
                      </div> 


                    </div>

                </div>

        </div>


            <div>
                <view-change-history :changeHistory="changeLogDetails" v-model="showhistory"/>
            </div>
            <div>
                <edit-field-group :tieringOptions="tieringOptions" :brandsOptions="brandsOptions" :categoryOptions="categoryOptions" :editCategories="attributions.categories" :changeBy="changeBy"  :parentID="parentID" v-model="showedit"/>
            </div>

            <div>
                <view-change-history-financials :changeHistory="financialschangeLogDetails" v-model="showFinancialsHistory"/>
            </div>
            <div>
                <edit-financials-group :reportTypeOptions="reportTypeOptions" :editFinanicals="attributions.finanicals" :changeBy="changeBy"  :parentID="parentID" v-model="showFinancialsEdit"/>
            </div>   

    </div>
</template>

<script>
    // import _ from 'lodash'
    import $ from 'jquery'
    import { microservice } from 'src/app-config'
    import { ResizeSensor } from 'css-element-queries'
    import Box from 'src/components/common/Box'
    import Modal from 'src/components/common/Modal'
    import ViewChangeHistory from './ViewCategoriesChangeHistory'
    import EditFieldGroup from './EditFieldGroup'
    import ViewChangeHistoryFinancials from './ViewFinancialsChangeHistory'
    import EditFinancialsGroup from './EditFinancialsGroup'
    import AttributionService from './AttributionService'
    // import { folderId } from './AttributionService'
    import {
      countries,
      categories
    } from 'src/components/common/store/definition'
    // import { Popover } from 'element-ui'
    import {
        USER,
        ALERT_DANGER
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
        Box,
        ViewChangeHistory,
        EditFieldGroup,
        ViewChangeHistoryFinancials,
        EditFinancialsGroup
      },
      data () {
        return {
          boxClass: '',
          showhistory: false,
          showFinancialsHistory: false,
          showedit: false,
          showFinancialsEdit: false,
          tabHeights: null,
          attributions: {},
          categorys: [],
          finanicals: [],
          categoryOptions: [],
          tieringOptions: [],
          brandsOptions: [],
          reportTypeOptions: [],
          statusOptions: [],
          gisOption: [],
          folderId: null,
          blackCategory: false,
          blackFinanicals: false,
          parentID: null,
          changeBy: null,
          changeLogDetails: [],
          financialschangeLogDetails: [],
          loading2: false
        }
      },
      methods: {
        ...mapActions({
          alertDanger: ALERT_DANGER
        }),
        showHistory () {
          this.showhistory = true
        },
        showEdit () {
          this.showedit = true
        },
        showFinancialHistory () {
          this.showFinancialsHistory = true
        },
        showFinancialEdit () {
          this.showFinancialsEdit = true
        },
        downloadAttachment (originalAttachment) {
          this.loading2 = true
          let fileId = JSON.parse(originalAttachment).id
          let versionId = JSON.parse(originalAttachment).versionId
          let token = this.user.token
          let url = microservice.domain + '/box/files/download/' + fileId + '?version=' + versionId + '&access_token=' + token
          window.location.href = url
          this.loading2 = false
        },
        onContentResized () {
          let tabHeights = $('#tabhight').height() - 20
          $('tabContent').height(tabHeights)
          // $('.tab-content').animate({
          //   height: tabHeights
          // }, '1000')
        },
        reloadData () {
          Promise.all([
            this.$attribution.getMillVendorMaster({
              millVendorID: this.$route.params.id,
              token: this.user.token
            }),
            this.$attribution.getCategorys({
              token: this.user.token
            }),
            this.$attribution.getTierings({
              token: this.user.token
            }),
            this.$attribution.getBrands({
              token: this.user.token
            }),
            this.$attribution.getFinanicalReportType({
              token: this.user.token
            }),
            this.$attribution.getStatus({
              token: this.user.token
            }),
            this.$attribution.getGisOffices({
              token: this.user.token
            })
          ]).then(results => {
            this.folderId = 'vpse'
            let [attribution, categoryOption, tieringOption, brandsOption, reportTypeOption, statusOption, gisOption] = results
            this.attributions = attribution
            this.categorys = JSON.parse(JSON.stringify(attribution.categories))
            this.finanicals = JSON.parse(JSON.stringify(attribution.finanicals))
            if (this.categorys.length === 0) {
              // this.categorys.push({
              //   isPrimary: null,
              //   category: 'No Record',
              //   tiering: null,
              //   brands: null,
              //   relManage: null
              // })
              this.blackCategory = true
              attribution.categories.push({
                isPrimary: null,
                category: null,
                brands: null,
                tiering: null,
                relManage: null
              })
            } else {
              this.blackCategory = false
            }
            if (this.finanicals.length === 0) {
              // this.finanicals.push({
              //   finanicalId: 0,
              //   attachment: ' ',
              //   report_type: 'No Record',
              //   originalAttachment: ' ',
              //   isUpload: false,
              //   comment: null
              // })
              this.blackFinanicals = true
              attribution.finanicals.push({
                finanicalId: 0,
                attachment: ' ',
                report_type: null,
                originalAttachment: ' ',
                isUpload: false,
                comment: null,
                allreadyExist: false
              })
            } else {
              this.blackFinanicals = false
            }
            this.categoryOptions = categoryOption
            this.tieringOptions = tieringOption
            this.brandsOptions = brandsOption
            this.reportTypeOptions = reportTypeOption
            this.statusOptions = statusOption
            this.gisOption = gisOption
            let countryMap = this.countries.reduce((map, country) => {
              map[country.code] = country.name
              return map
            }, {})
            let brandsMap = brandsOption.reduce((map, brands) => {
              map[brands.masterBrandCode] = brands
              return map
            }, {})
            this.attributions.countryOfOrigin = countryMap[this.attributions.countryOfOrigin]
            for (let a = 0; a < this.statusOptions.length; a++) {
              if (this.statusOptions[a].code === this.attributions.status) {
                this.attributions.status = this.statusOptions[a].name
              }
            }
            for (let a = 0; a < this.gisOption.length; a++) {
              if (this.gisOption[a].master_gis_agent_code === this.attributions.gis_office) {
                this.attributions.gis_office = this.gisOption[a].s_gis_agent_nm
              }
            }
            for (let a = 0; a < this.categorys.length; a++) {
              for (let i = 0; i < categoryOption.length; i++) {
                if (categoryOption[i].master_category_code === this.categorys[a].category) {
                  this.categorys[a].category = categoryOption[i].l_category_nm
                }
              }
              for (let i = 0; i < tieringOption.length; i++) {
                if (tieringOption[i].code === this.categorys[a].tiering) {
                  this.categorys[a].tiering = tieringOption[i].name
                }
              }
              if (this.categorys[a].brands !== null) {
                this.categorys[a].brands = this.categorys[a].brands.split(',').map(masterBrandCode => brandsMap[masterBrandCode]).filter(item => item !== undefined)
              }
              this.attributions.categories[a].brands = this.categorys[a].brands
            }
            for (let a = 0; a < this.finanicals.length; a++) {
              this.finanicals[a].originalAttachment = this.finanicals[a].attachment
              this.finanicals[a].attachment = this.finanicals[a].attachment === ' ' || this.finanicals[a].attachment === null ? ' ' : JSON.parse(this.finanicals[a].attachment).name
              for (let i = 0; i < reportTypeOption.length; i++) {
                if (reportTypeOption[i].code === this.finanicals[a].report_type) {
                  this.finanicals[a].report_type = reportTypeOption[i].name
                }
              }
            }
          })
          this.$attribution.getChangeLogDetails({
            millVendorID: this.$route.params.id,
            changeLogID: 'MILL_VENDOR_MASTER_CAT',
            token: this.user.token
          }).then(changeLogDetails => {
            this.changeLogDetails = changeLogDetails.reverse()
          })
          this.$attribution.getChangeLogDetails({
            millVendorID: this.$route.params.id,
            changeLogID: 'MILL_VENDOR_MASTER_FNC',
            token: this.user.token
          }).then(changeLogDetails => {
            this.financialschangeLogDetails = changeLogDetails.reverse()
          })
        }
      },
      watch: {
        showFinancialsEdit () {
          this.reloadData()
        },
        showedit () {
          this.reloadData()
        }
      },
      computed: {
        ...mapGetters({
          user: USER,
          countries,
          categories
        })
      },
      mounted () {
        $('.btn-box-tool').remove()
        $('.fa-minus').remove()
        $('.box-header').remove()
        this.$paneResizeSensor = new ResizeSensor($('#tabhight'), () => {
          this.onContentResized()
        })
        this.onContentResized()
      },
      created () {
        this.changeBy = this.user.firstName + ' ' + this.user.lastName
        this.parentID = this.$route.params.id
        this.reloadData()
      },
      destroyed () {
        this.$paneResizeSensor.detach()
      }
    }
</script>

<style scoped>
  * {
    font-family: 'Roboto Condensed', sans-serif;
  }
  hr {
      margin-top: 10px;
  }
  .fa {
    font-family: FontAwesome;
  }
  li {  
    border-top-left-radius: 0.4em;
    border-top-right-radius: 0.4em;
  }  
  .nav-tabs-custom>.nav-tabs>li.active>a, .nav-tabs-custom>.nav-tabs>li.active:hover>a {
    background-color: #25AAE1 !important;
    color: #FFFFFF;
  }
  .nav-tabs-custom>.nav-tabs>li.active {
     border-top-color: #25AAE1;
  }
  .box {
    border-top: 3px solid #FFFFFF !important;
  }
  .nav-tabs-custom>.nav-tabs>li>a {
    border-radius: 0em !important;
  }
  .nav-tabs-custom>.nav-tabs>li.active>a {
    border-top-color: #25AAE1 !important;
    border-left-color: #25AAE1 !important;
    border-right-color: #25AAE1 !important;
  }  
  .tooltip-inner {
    max-width: 500px !important;
    text-align: left !important;
    width: 400px !important;
    height: 200px !important;
  }
  .thcss{
    border-top: 1px solid #ddd !important;
    text-align: center !important;
    vertical-align: middle !important;
    border-color:#ddd !important;
  }
  .thBody{
    text-align: center !important;
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
    border-top: 1px solid #ddd !important;
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
