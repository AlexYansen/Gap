<template>
  <div>
  

  <el-popover ref="popover" placement="bottom" width="400" trigger="hover">
    <div style="font-family: 'Roboto Condensed', sans-serif;font-size: 14px">
      <div>You need to provide the sale figures of the last 3 recent financial years. If you complete the profile in 2017, please provide the sales figure of your 2016, 2015 and 2014 finanical years.</div>
    </div>
  </el-popover>


    <div class="form-group">
      <br/>
      <label class="control-label field-title">Sales and Volume Information in the Last 3 Years</label><i v-popover:popover class="fa fa-info-circle fa-lg" style="color: #25AAE1;margin-left:5px;" ></i>
      <div class="row">   
        <div class="col-md-11">      
          <table class="table" style="font-size:14px">
            <tbody>
              <tr class="trHeader">
                <th style="width: 17%;" class="thcss"></th>
                <th style="width: 17%;" class="thcss">Unit</th>
                <th style="width: 22%;" class="thcss">
                  <input type="text" maxlength="4" onkeypress="return event.keyCode>=48&&event.keyCode<=57" ng-pattern="/[^a-zA-Z]/" v-model="businessList.sale_volume_year_1" class="form-control inputs" placeholder="1st Last Financial Year"/>
                </th>
                <th style="width: 22%;" class="thcss">
                  <input type="text" maxlength="4" onkeypress="return event.keyCode>=48&&event.keyCode<=57" ng-pattern="/[^a-zA-Z]/" v-model="businessList.sale_volume_year_2" class="form-control inputs" placeholder="2nd Last Financial Year"/>
                </th>
                <th style="width: 22%;" class="thcss">
                <input type="text" maxlength="4" onkeypress="return event.keyCode>=48&&event.keyCode<=57" ng-pattern="/[^a-zA-Z]/"  v-model="businessList.sale_volume_year_3" class="form-control inputs" placeholder="3rd Last Financial Year"/>
                </th>
              </tr>
              <tr class="trBody">
                <td class="th-title">
                  Total Sales Volume
                </td>
                <td class="thBody">
                  <multi-select :options="saleVolumeUNITOption" :is-multiple="false" v-model="businessList.total_sale_volume_unit" id-field="code" label-field="name"/>
                </td>
                <td class="thBody">
                  <input type="text" v-model="businessList.total_sale_volume_1" class="form-control inputs">
                </td>
                <td class="thBody">
                  <input type="text" v-model="businessList.total_sale_volume_2" class="form-control inputs">
                </td>
                <td class="thBody">
                  <input type="text" v-model="businessList.total_sale_volume_3" class="form-control inputs" >
                </td>
              </tr>
    
              <tr class="trBody">
                <td class="th-title">
                  Total Dollar Sales
                </td>
                <td class="thcss">
                  Million USD
                </td>
                <td class="thBody">
                  <input type="text" v-model="businessList.total_dollar_sales_1" class="form-control inputs" >
                </td>
                <td class="thBody">
                  <input type="text" v-model="businessList.total_dollar_sales_2" class="form-control inputs" >
                </td>
                <td class="thBody">
                  <input type="text" v-model="businessList.total_dollar_sales_3" class="form-control inputs" >
                </td>
              </tr>
    
              <tr class="trBody">
                <td class="th-title">
                  Sales Volume to Gap Inc.
                </td>
                <td class="thBody">
                  <multi-select :options="saleVolumeUNITOption" :is-multiple="false" v-model="businessList.sale_volume_to_gap_unit" id-field="code" label-field="name"/>
                </td>
                <td class="thBody">
                  <input type="text" v-model="businessList.sale_volume_to_gap_1" class="form-control inputs">
                </td>
                <td class="thBody"> 
                  <input type="text" v-model="businessList.sale_volume_to_gap_2" class="form-control inputs">
                </td>
                <td class="thBody">
                  <input type="text" v-model="businessList.sale_volume_to_gap_3" class="form-control inputs">
                </td>
              </tr>
    
              <tr class="trBody">
                <td class="th-title">
                  Dollar Sales to Gap Inc.
                </td>
                <td class="thcss">
                  Million USD
                </td>
                <td class="thBody">
                  <input type="text" v-model="businessList.dollar_sales_to_gap_1" class="form-control inputs" >
                </td>
                <td class="thBody">
                  <input type="text" v-model="businessList.dollar_sales_to_gap_2" class="form-control inputs" >
                </td>
                <td class="thBody">
                  <input type="text" v-model="businessList.dollar_sales_to_gap_3" class="form-control inputs" >
                </td>
              </tr>
    
              <tr class="trBody">
                <td class="th-title">
                  % of Dollar Sales to Gap Inc.
                </td>
                <td class="thcss">
                  %
                </td>
                <td class="thBody">
                  <vue-numeric type="text" v-bind:min="0.00" v-bind:max="100.00" value={businessList.dollar_sales_to_gap_percent_1} v-model="businessList.dollar_sales_to_gap_percent_1" class="form-control inputs"  v-bind:precision="2"/>
                </td>
                <td class="thBody">
                  <vue-numeric type="text" v-bind:min="0.00" v-bind:max="100.00" value={businessList.dollar_sales_to_gap_percent_2} v-model="businessList.dollar_sales_to_gap_percent_2" class="form-control inputs"  v-bind:precision="2"/>
                </td>
                <td class="thBody">
                  <vue-numeric type="text" v-bind:min="0.00" v-bind:max="100.00" value={businessList.dollar_sales_to_gap_percent_3} v-model="businessList.dollar_sales_to_gap_percent_3" class="form-control inputs"  v-bind:precision="2"/>
                </td>
              </tr>
            </tbody>
          </table>     
        </div>
      </div>
    </div>
  
    <div class="form-group">
      <br>
      <label class="control-label field-title">Annual Production Capacity at Parent Mill Level</label>
      <div class="row">
        <div class="col-md-3">
          <input type="text" v-model="businessList.annual_prod_capacity" class="form-control inputs">
        </div>
       <div class="col-md-2">
          <multi-select :options="capacityUnit" :is-multiple="false" v-model="businessList.annual_prod_capacity_unit" id-field="code" label-field="name"/>
        </div>        
      </div>
    </div>
  
    <div class="form-group">
      <br/>
      <label class="control-label field-title">Can you issue a “China to China” official invoice / order in Renminbi (RMB) term?</label>
      <div class="row">
        <div class="col-md-6">
          <input type="radio" value="Y" v-model="businessList.has_china_order_in_rmb" style="margin-left:10px;">
          <label class="option-label">Yes</label>
          <input type="radio" value="N" v-model="businessList.has_china_order_in_rmb" style="margin-left:10px;">
          <label class="option-label">No</label>
        </div>
      </div>

    </div>
  
    <div class="form-group">
      <br/>
      <label class="control-label field-title">Current Top 5 Customers</label>
      <div class="row">
        <div class="col-md-8">         
          <table class="table" style="font-size:14px">
            <tbody>
              <tr class="trHeader">
                <th style="width: 80%;text-align: center;" colspan="2" class="thcss">Customer</th>
                <th style="width: 20%;" class="thcss">% of Total Dollar Sales</th>
              </tr>
              <tr class="trBody">
                <td style="width: 40%;" class="thBody">
                  <multi-select :filter="true" :options="topRetailCustomer" v-model="businessList.top_retail_customer_name_1" id-field="code" label-field="name"/>
                </td>
                <td style="text-align: center;" class="thBody">
                  <input type="text" v-model="businessList.top_retail_customer_other_1" :disabled="checkCustomOther1(businessList)" class="form-control inputs" placeholder="If others, please specify">
                </td>
                <td class="thBody">
                  <vue-numeric type="text" v-bind:min="0.00" v-bind:max="100.00" value={businessList.top_retail_customer_percent_1} v-model="businessList.top_retail_customer_percent_1" class="form-control inputs" v-bind:precision="2"/>
                </td>
              </tr>
    
              <tr class="trBody">
                <td class="thBody">
                  <multi-select :filter="true" :options="topRetailCustomer" v-model="businessList.top_retail_customer_name_2" id-field="code" label-field="name"/>
                </td>
                <td style="text-align: center;" class="thBody">
                  <input type="text" v-model="businessList.top_retail_customer_other_2" :disabled="checkCustomOther2(businessList)" class="form-control inputs" placeholder="If others, please specify">
                </td>
                <td class="thBody">
                  <vue-numeric type="text" v-bind:min="0.00" v-bind:max="100.00" value={businessList.top_retail_customer_percent_2} v-model="businessList.top_retail_customer_percent_2" class="form-control inputs" v-bind:precision="2"/>
                </td>
              </tr>
    
              <tr class="trBody">
                <td class="thBody">
                  <multi-select :filter="true" :options="topRetailCustomer" v-model="businessList.top_retail_customer_name_3" id-field="code" label-field="name"/>
                </td>
                <td style="text-align: center;" class="thBody">
                  <input type="text" v-model="businessList.top_retail_customer_other_3" :disabled="checkCustomOther3(businessList)" class="form-control inputs" placeholder="If others, please specify">
                </td>
                <td class="thBody">
                  <vue-numeric type="text" v-bind:min="0.00" v-bind:max="100.00" value={businessList.top_retail_customer_percent_3} v-model="businessList.top_retail_customer_percent_3" class="form-control inputs" v-bind:precision="2"/>
                </td>
              </tr>
    
              <tr class="trBody">
                <td class="thBody">
                  <multi-select :filter="true" :options="topRetailCustomer" v-model="businessList.top_retail_customer_name_4" id-field="code" label-field="name"/>
                </td>
                <td style="text-align: center;" class="thBody">
                  <input type="text" v-model="businessList.top_retail_customer_other_4" :disabled="checkCustomOther4(businessList)" class="form-control inputs" placeholder="If others, please specify">
                </td>
                <td class="thBody">
                  <vue-numeric type="text" v-bind:min="0.00" v-bind:max="100.00" value={businessList.top_retail_customer_percent_4} v-model="businessList.top_retail_customer_percent_4" class="form-control inputs" v-bind:precision="2"/>
                </td>
              </tr>
    
              <tr class="trBody">
                <td class="thBody">
                  <multi-select :filter="true" :options="topRetailCustomer" v-model="businessList.top_retail_customer_name_5" id-field="code" label-field="name"/>
                </td>
                <td style="text-align: center;" class="thBody">
                  <input type="text" v-model="businessList.top_retail_customer_other_5" :disabled="checkCustomOther5(businessList)" class="form-control inputs" placeholder="If others, please specify">
                </td>
                <td class="thBody">
                  <vue-numeric type="text" v-bind:min="0.00" v-bind:max="100.00" value={businessList.top_retail_customer_percent_5} v-model="businessList.top_retail_customer_percent_5" class="form-control inputs" v-bind:precision="2"/>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  
    <div class="form-group">
      <br/>
      <label class="control-label field-title">% of Business / Sales from each Capability</label>
      <div class="row">
        <div class="col-md-9">
          <table class="table">
            <tbody>
              <tr class="trHeader">
                <th style="width: 70%;text-align: center;" colspan="2" class="thcss">Capability Type</th>
                <th style="width: 18%;text-align: center;" class="thcss">% of Total Dollar Sales</th>
                <th style="width: 12%;text-align: center;" class="thcss">
                  <a class="btn" @click="addCapabilities">
                    <i class="fa fa-plus"></i>Add</a>
                </th>
              </tr>
              <tr v-for="capabilitie in capabilities" class="trBody">
                <td style="width: 35%;" class="thBody">
                  <multi-select :options="capabilityType" v-model="capabilitie.capability_type" id-field="code" label-field="name"/>
                </td>
                <td class="thBody">
                  <input type="text" :disabled="checkOtherCapability(capabilitie)" v-model="capabilitie.other_capability_type" class="form-control inputs" placeholder="If others, please specify">
                </td>
                <td class="thBody">
                  <vue-numeric type="text" v-bind:min="0.00" v-bind:max="100.00" value={capabilitie.total_dollar_sales_percent} v-model="capabilitie.total_dollar_sales_percent" class="form-control inputs" v-bind:precision="2"/>
                </td>
                <td style="text-align: center;" class="thBody">
                  <a class="btn" @click="deleteCapabilities (capabilitie)">
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
      <label class="control-label field-title">All Wholly or Partially Own Facilities</label>
      <div class="row">
        <div class="col-md-12">
          <table class="table">
            <tbody>
              <tr class="trHeader">
                <th style="width: 20%; text-align: center;" class="thcss">Mill Facility Name</th>
                <th style="width: 20%; text-align: center;" class="thcss">Processes</th>
                <th style="width: 18%; text-align: center;" class="thcss">Country</th>
                <th style="width: 10%; text-align: center;" class="thcss">Ownership (%)</th>
                <th style="width: 15%; text-align: center;" class="thcss">Annual Capacity</th>
                <th style="width: 10%; text-align: center;" class="thcss">Capacity Unit</th>
                <th style="width: 7%; text-align: center;" class="thcss">
                  <a class="btn" @click="addFacilities">
                    <i class="fa fa-plus"></i>Add</a>
                </th>
              </tr>
              <tr v-for="facilitie in facilities" class="trBody">
                <td class="thBody">
                  <input v-model="facilitie.facility_name" type="text" class="form-control inputs">
                </td>
                <td class="thBody">
                  <multi-select :options="processesOption" :is-multiple="true" v-model="facilitie.processes" id-field="code" label-field="name"/>
                </td>
                <td class="thBody"> 
                  <multi-select :filter="true" :options="countryOfOrigin" v-model="facilitie.country" id-field="code" label-field="name"/>
                </td>
                <td class="thBody">
                  <vue-numeric v-bind:min="0.00" v-bind:max="100.00" value={facilitie.ownership_percent} v-model="facilitie.ownership_percent" type="text" class="form-control inputs" v-bind:precision="2"/>
                </td>
                <td class="thBody">
                  <input v-model="facilitie.annual_capacity" type="text" class="form-control inputs">
                </td>
                <td class="thBody"> 
                  <multi-select :options="capacityUnit" v-model="facilitie.capacity_unit" id-field="code" label-field="name"/>
                </td>
                <td style="text-align: center;" class="thBody">
                  <a class="btn" @click="deleteFacilities(facilitie)">
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
      <label class="control-label field-title">Main Subcontractors</label>
      <div class="row">
        <div class="col-md-11">
          <table class="table">
            <tbody>
              <tr class="trHeader">
                <th style="width: 21%; text-align: center;" class="thcss">Subcontractor Name</th>
                <th style="width: 21%; text-align: center;" class="thcss">Processes</th>
                <th style="width: 20%; text-align: center;" class="thcss">Country</th>
                <th style="width: 17%; text-align: center;" class="thcss">Annual Capacity</th>
                <th style="width: 13%; text-align: center;" class="thcss">Capacity Unit</th>
                <th style="width: 8%; text-align: center;" class="thcss">
                  <a class="btn" @click="addMainSubcontractors">
                    <i class="fa fa-plus"></i>Add</a>
                </th>
              </tr>
              <tr v-for="mainSubcontractor in mainSubcontractors" class="trBody">
                <td class="thBody">
                  <input v-model="mainSubcontractor.subcontractor_name" type="text" class="form-control inputs">
                </td>
                <td class="thBody">              
                  <multi-select :options="processesOption" v-model="mainSubcontractor.processes" :is-multiple="true" id-field="code" label-field="name"/>
                </td>
                <td class="thBody">
                  <multi-select :filter="true" :options="countryOfOrigin" v-model="mainSubcontractor.country" id-field="code" label-field="name"/>
                </td>
                <td class="thBody">
                  <input v-model="mainSubcontractor.annual_capacity" type="text" class="form-control inputs">
                </td>
                <td class="thBody"> 
                  <multi-select :options="capacityUnit" v-model="mainSubcontractor.capacity_unit" id-field="code" label-field="name"/>
                </td>
                <td style="text-align: center;" class="thBody">
                  <a class="btn" @click="deleteMainSubcontractors(mainSubcontractor)">
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
      <label class="control-label field-title">Top 5 Garment Vendor Customers</label>
      <div class="row">
        <div class="col-md-9">
          <table class="table">
            <tbody>
              <tr class="trHeader">
                <th style="text-align: center;width: 50%;" class="thcss">Garment Vendor Name</th>
                <th style="text-align: center;width: 30%;" class="thcss">Country</th>
                <th style="text-align: center;width: 20%;" class="thcss">Have Direct Investment Relationship?</th>
              </tr>
              <tr class="trBody">
                <td class="thBody">
                  <input type="text" v-model="businessList.top_garment_vendor_name_1" class="form-control inputs">
                </td>
                <td class="thBody">
                  <multi-select :is-multiple="true" :filter="true" :options="countryOfOrigin" v-model="businessList.top_garment_vendor_cty_1" id-field="code" label-field="name"/>      
                </td>
                <td style="text-align: center;" class="thBody">
                  <input type="checkbox" v-model="businessList.top_garment_vendor_direct_1">               
                </td>
              </tr>
              <tr class="trBody">
                <td class="thBody">
                  <input type="text" v-model="businessList.top_garment_vendor_name_2" class="form-control inputs">
                </td>
                <td class="thBody">
                  <multi-select :is-multiple="true" :filter="true" :options="countryOfOrigin" v-model="businessList.top_garment_vendor_cty_2" id-field="code" label-field="name"/>
                </td>
                <td style="text-align: center;" class="thBody">
                  <input type="checkbox" v-model="businessList.top_garment_vendor_direct_2">
                </td>
              </tr>
              <tr class="trBody">
                <td class="thBody">
                  <input type="text" v-model="businessList.top_garment_vendor_name_3" class="form-control inputs">
                </td>
                <td class="thBody">
                  <multi-select :is-multiple="true" :filter="true" :options="countryOfOrigin" v-model="businessList.top_garment_vendor_cty_3" id-field="code" label-field="name"/>  
                </td>
                <td style="text-align: center;" class="thBody">
                  <input type="checkbox" v-model="businessList.top_garment_vendor_direct_3">
                </td>
              </tr>
              <tr class="trBody">
                <td class="thBody">
                  <input type="text" v-model="businessList.top_garment_vendor_name_4" class="form-control inputs">
                </td>
                <td class="thBody">
                  <multi-select :is-multiple="true" :filter="true" :options="countryOfOrigin" v-model="businessList.top_garment_vendor_cty_4" id-field="code" label-field="name" />    
                </td>
                <td style="text-align: center;" class="thBody">
                  <input type="checkbox" v-model="businessList.top_garment_vendor_direct_4">
                </td>
              </tr>
              <tr class="trBody">
                <td class="thBody">
                  <input type="text" v-model="businessList.top_garment_vendor_name_5" class="form-control inputs">
                </td>
                <td class="thBody">
                  <multi-select :is-multiple="true" :filter="true" :options="countryOfOrigin" v-model="businessList.top_garment_vendor_cty_5" id-field="code" label-field="name"/>   
                </td>
                <td style="text-align: center;" class="thBody">
                  <input type="checkbox" v-model="businessList.top_garment_vendor_direct_5"> 
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  
    <div class="form-group">
      <br>
      <label class="control-label field-title">Top 3 Countries Exported Fabric/Yarn to </label>
      <div class="row">
        <div class="col-md-5">
          <table class="table">
            <tbody>
              <tr class="trHeader">
                <th style="width:65%;text-align: center;" class="thcss">Country</th>
                <th style="width:35%;text-align: center;" class="thcss">% of Total Dollar Sales</th>
              </tr>
              <tr class="trBody">
                <td class="thBody">
                  <multi-select :filter="true" :options="countryOfOrigin" v-model="businessList.top_country_name_1" id-field="code" label-field="name"/>   
                </td>
                <td class="thBody">
                  <vue-numeric type="text" v-bind:min="0.00" v-bind:max="100.00" value={businessList.top_country_sales_percent_1} v-model="businessList.top_country_sales_percent_1" class="form-control inputs" v-bind:precision="2"/>
                </td>
              </tr>
              <tr class="trBody">
                <td class="thBody">
                  <multi-select :filter="true" :options="countryOfOrigin" v-model="businessList.top_country_name_2" id-field="code" label-field="name"/> 
                </td>
                <td class="thBody">
                  <vue-numeric type="text" v-bind:min="0.00" v-bind:max="100.00" value={businessList.top_country_sales_percent_2} v-model="businessList.top_country_sales_percent_2" class="form-control inputs" v-bind:precision="2"/>
                </td>
              </tr>
              <tr class="trBody">
                <td class="thBody">
                  <multi-select :filter="true" :options="countryOfOrigin" v-model="businessList.top_country_name_3" id-field="code" label-field="name" />
                </td>
                <td class="thBody">
                  <vue-numeric type="text" v-bind:min="0.00" v-bind:max="100.00" value={businessList.top_country_sales_percent_3} v-model="businessList.top_country_sales_percent_3" class="form-control inputs" v-bind:precision="2"/>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- <button type="button" class="btn btn-primary" @click="save">Save</button> -->
  </div>
</template>

<script>
  import _ from 'lodash'
  import VueNumeric from 'vue-numeric'
  import MultiSelect from 'src/components/common/MultiSelect'
  import {
    getMillVendorMasterBusinessInfo,
    getSaleVolumeUNIT,
    getTopRetailCustomerNM,
    getCountryOfOrigin,
    getCapacityUNIT,
    getMillVendorCapability,
    getMillVendorProcess,
    saveBusinessInfo,
    saveCapability,
    saveFacility,
    saveMainSubcontractors
  } from '../service'
  import {
    USER,
    ALERT_SUCCESS,
    ALERT_DANGER
  } from 'src/store/definition'
  import {
    countries
  } from 'src/components/common/store/definition'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    components: {
      MultiSelect,
      VueNumeric
    },
    props: {
      vendorProfileId: {
        type: String
      },
      onSaveBtnClicked: {
        type: Boolean
      }
    },
    directives: {
      numberOnly: {
        bind: function (el) {
          el.handler = function () {
            el.value = el.value.replace(/[^\d.]/g, '')
          }
          el.addEventListener('input', el.handler)
        },
        unbind: function (el) {
          el.removeEventListener('input', el.handler)
        }
      }
    },
    data () {
      return {
        businessList: {
          top_retail_customer_name_1: {
            code: null
          },
          top_retail_customer_name_2: {
            code: null
          },
          top_retail_customer_name_3: {
            code: null
          },
          top_retail_customer_name_4: {
            code: null
          },
          top_retail_customer_name_5: {
            code: null
          }
        },
        saleVolumeUNITOption: [],
        topRetailCustomer: [],
        countryOfOrigin: [],
        capacityUnit: [],
        capabilityType: [],
        processesOption: [],
        capabilities: [{capability_type: { code: null, name: null }}],
        facilities: [],
        mainSubcontractors: []
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
        user: USER,
        countries
      })
    },
    methods: {
      ...mapActions({
        alertSuccess: ALERT_SUCCESS,
        alertDanger: ALERT_DANGER
      }),
      checkCustomOther1 (businessList) {
        businessList.top_retail_customer_other_1 = businessList.top_retail_customer_name_1.code !== 'OTHERS' ? '' : businessList.top_retail_customer_other_1
        return businessList.top_retail_customer_name_1.code !== 'OTHERS'
      },
      checkCustomOther2 (businessList) {
        businessList.top_retail_customer_other_2 = businessList.top_retail_customer_name_2.code !== 'OTHERS' ? '' : businessList.top_retail_customer_other_2
        return businessList.top_retail_customer_name_2.code !== 'OTHERS'
      },
      checkCustomOther3 (businessList) {
        businessList.top_retail_customer_other_3 = businessList.top_retail_customer_name_3.code !== 'OTHERS' ? '' : businessList.top_retail_customer_other_3
        return businessList.top_retail_customer_name_3.code !== 'OTHERS'
      },
      checkCustomOther4 (businessList) {
        businessList.top_retail_customer_other_4 = businessList.top_retail_customer_name_4.code !== 'OTHERS' ? '' : businessList.top_retail_customer_other_4
        return businessList.top_retail_customer_name_4.code !== 'OTHERS'
      },
      checkCustomOther5 (businessList) {
        businessList.top_retail_customer_other_5 = businessList.top_retail_customer_name_5.code !== 'OTHERS' ? '' : businessList.top_retail_customer_other_5
        return businessList.top_retail_customer_name_5.code !== 'OTHERS'
      },
      checkOtherCapability (capabilitie) {
        capabilitie.other_capability_type = capabilitie.capability_type.code !== 'OTHERS' ? '' : capabilitie.other_capability_type
        return capabilitie.capability_type.code !== 'OTHERS'
      },
      addFacilities () {
        this.facilities.push({
          processes: [],
          ownership_percent: null
        })
      },
      addCapabilities () {
        this.capabilities.push({
          capability_type: { code: null, name: null },
          total_dollar_sales_percent: null
        })
      },
      addMainSubcontractors () {
        this.mainSubcontractors.push({
          processes: []
        })
      },
      deleteFacilities (item) {
        this.facilities = this.facilities.filter(fac => fac !== item)
      },
      deleteCapabilities (item) {
        this.capabilities = this.capabilities.filter(cap => cap !== item)
      },
      deleteMainSubcontractors (item) {
        this.mainSubcontractors = this.mainSubcontractors.filter(mai => mai !== item)
      },
      save () {
        console.log('Bussiness')
        let businessInfo = JSON.parse(JSON.stringify(this.businessList))
        let formData = {
          id: _.toInteger(this.vendorProfileId),
          sale_volume_year_1: _.toString(businessInfo.sale_volume_year_1).trim() === '' ? '0' : _.toString(businessInfo.sale_volume_year_1).trim(),
          sale_volume_year_2: _.toString(businessInfo.sale_volume_year_2).trim() === '' ? '0' : _.toString(businessInfo.sale_volume_year_2).trim(),
          sale_volume_year_3: _.toString(businessInfo.sale_volume_year_3).trim() === '' ? '0' : _.toString(businessInfo.sale_volume_year_3).trim(),
          total_sale_volume_unit: businessInfo.total_sale_volume_unit ? businessInfo.total_sale_volume_unit.code : null,
          total_sale_volume_1: _.toString(businessInfo.total_sale_volume_1).trim(),
          total_sale_volume_2: _.toString(businessInfo.total_sale_volume_2).trim(),
          total_sale_volume_3: _.toString(businessInfo.total_sale_volume_3).trim(),
          total_dollar_sales_1: _.toString(businessInfo.total_dollar_sales_1).trim(),
          total_dollar_sales_2: _.toString(businessInfo.total_dollar_sales_2).trim(),
          total_dollar_sales_3: _.toString(businessInfo.total_dollar_sales_3).trim(),
          sale_volume_to_gap_unit: businessInfo.sale_volume_to_gap_unit ? businessInfo.sale_volume_to_gap_unit.code : null,
          sale_volume_to_gap_1: _.toString(businessInfo.sale_volume_to_gap_1).trim(),
          sale_volume_to_gap_2: _.toString(businessInfo.sale_volume_to_gap_2).trim(),
          sale_volume_to_gap_3: _.toString(businessInfo.sale_volume_to_gap_3).trim(),
          // dollar_sales_to_gap_1: parseFloat(businessInfo.dollar_sales_to_gap_1),
          dollar_sales_to_gap_1: _.toString(businessInfo.dollar_sales_to_gap_1).trim(),
          dollar_sales_to_gap_2: _.toString(businessInfo.dollar_sales_to_gap_2).trim(),
          dollar_sales_to_gap_3: _.toString(businessInfo.dollar_sales_to_gap_3).trim(),
          dollar_sales_to_gap_percent_1: _.toString(businessInfo.dollar_sales_to_gap_percent_1).trim() === '' ? null : _.toString(businessInfo.dollar_sales_to_gap_percent_1).trim(),
          dollar_sales_to_gap_percent_2: _.toString(businessInfo.dollar_sales_to_gap_percent_2).trim() === '' ? null : _.toString(businessInfo.dollar_sales_to_gap_percent_2).trim(),
          dollar_sales_to_gap_percent_3: _.toString(businessInfo.dollar_sales_to_gap_percent_3).trim() === '' ? null : _.toString(businessInfo.dollar_sales_to_gap_percent_3).trim(),
          annual_prod_capacity: _.toString(businessInfo.annual_prod_capacity).trim(),
          annual_prod_capacity_unit: businessInfo.annual_prod_capacity_unit ? businessInfo.annual_prod_capacity_unit.code : null,
          has_china_order_in_rmb: businessInfo.has_china_order_in_rmb ? businessInfo.has_china_order_in_rmb : 'N',
          top_retail_customer_name_1: businessInfo.top_retail_customer_name_1 ? businessInfo.top_retail_customer_name_1.code : null,
          top_retail_customer_name_2: businessInfo.top_retail_customer_name_2 ? businessInfo.top_retail_customer_name_2.code : null,
          top_retail_customer_name_3: businessInfo.top_retail_customer_name_3 ? businessInfo.top_retail_customer_name_3.code : null,
          top_retail_customer_name_4: businessInfo.top_retail_customer_name_4 ? businessInfo.top_retail_customer_name_4.code : null,
          top_retail_customer_name_5: businessInfo.top_retail_customer_name_5 ? businessInfo.top_retail_customer_name_5.code : null,
          top_retail_customer_other_1: businessInfo.top_retail_customer_other_1,
          top_retail_customer_other_2: businessInfo.top_retail_customer_other_2,
          top_retail_customer_other_3: businessInfo.top_retail_customer_other_3,
          top_retail_customer_other_4: businessInfo.top_retail_customer_other_4,
          top_retail_customer_other_5: businessInfo.top_retail_customer_other_5,
          top_retail_customer_percent_1: _.toString(businessInfo.top_retail_customer_percent_1).trim() === '' ? '0' : _.toString(businessInfo.top_retail_customer_percent_1).trim(),
          top_retail_customer_percent_2: _.toString(businessInfo.top_retail_customer_percent_2).trim() === '' ? '0' : _.toString(businessInfo.top_retail_customer_percent_2).trim(),
          top_retail_customer_percent_3: _.toString(businessInfo.top_retail_customer_percent_3).trim() === '' ? '0' : _.toString(businessInfo.top_retail_customer_percent_3).trim(),
          top_retail_customer_percent_4: _.toString(businessInfo.top_retail_customer_percent_4).trim() === '' ? '0' : _.toString(businessInfo.top_retail_customer_percent_4).trim(),
          top_retail_customer_percent_5: _.toString(businessInfo.top_retail_customer_percent_5).trim() === '' ? '0' : _.toString(businessInfo.top_retail_customer_percent_5).trim(),
          top_garment_vendor_name_1: businessInfo.top_garment_vendor_name_1,
          top_garment_vendor_name_2: businessInfo.top_garment_vendor_name_2,
          top_garment_vendor_name_3: businessInfo.top_garment_vendor_name_3,
          top_garment_vendor_name_4: businessInfo.top_garment_vendor_name_4,
          top_garment_vendor_name_5: businessInfo.top_garment_vendor_name_5,
          top_garment_vendor_cty_1: businessInfo.top_garment_vendor_cty_1 ? businessInfo.top_garment_vendor_cty_1.map(item => item.code).join(',') : null,
          top_garment_vendor_cty_2: businessInfo.top_garment_vendor_cty_2 ? businessInfo.top_garment_vendor_cty_2.map(item => item.code).join(',') : null,
          top_garment_vendor_cty_3: businessInfo.top_garment_vendor_cty_3 ? businessInfo.top_garment_vendor_cty_3.map(item => item.code).join(',') : null,
          top_garment_vendor_cty_4: businessInfo.top_garment_vendor_cty_4 ? businessInfo.top_garment_vendor_cty_4.map(item => item.code).join(',') : null,
          top_garment_vendor_cty_5: businessInfo.top_garment_vendor_cty_5 ? businessInfo.top_garment_vendor_cty_5.map(item => item.code).join(',') : null,
          // top_garment_vendor_cty_1: businessInfo.top_garment_vendor_cty_1 ? businessInfo.top_garment_vendor_cty_1.master_country_code : null,
          // top_garment_vendor_cty_2: businessInfo.top_garment_vendor_cty_2 ? businessInfo.top_garment_vendor_cty_2.master_country_code : null,
          // top_garment_vendor_cty_3: businessInfo.top_garment_vendor_cty_3 ? businessInfo.top_garment_vendor_cty_3.master_country_code : null,
          // top_garment_vendor_cty_4: businessInfo.top_garment_vendor_cty_4 ? businessInfo.top_garment_vendor_cty_4.master_country_code : null,
          // top_garment_vendor_cty_5: businessInfo.top_garment_vendor_cty_5 ? businessInfo.top_garment_vendor_cty_5.master_country_code : null,
          top_garment_vendor_direct_1: businessInfo.top_garment_vendor_direct_1 === true ? 'Y' : 'N',
          top_garment_vendor_direct_2: businessInfo.top_garment_vendor_direct_2 === true ? 'Y' : 'N',
          top_garment_vendor_direct_3: businessInfo.top_garment_vendor_direct_3 === true ? 'Y' : 'N',
          top_garment_vendor_direct_4: businessInfo.top_garment_vendor_direct_4 === true ? 'Y' : 'N',
          top_garment_vendor_direct_5: businessInfo.top_garment_vendor_direct_5 === true ? 'Y' : 'N',
          top_country_name_1: businessInfo.top_country_name_1 ? businessInfo.top_country_name_1.code : null,
          top_country_name_2: businessInfo.top_country_name_2 ? businessInfo.top_country_name_2.code : null,
          top_country_name_3: businessInfo.top_country_name_3 ? businessInfo.top_country_name_3.code : null,
          top_country_sales_percent_1: _.toString(businessInfo.top_country_sales_percent_1).trim() === '' ? '0' : _.toString(businessInfo.top_country_sales_percent_1).trim(),
          top_country_sales_percent_2: _.toString(businessInfo.top_country_sales_percent_2).trim() === '' ? '0' : _.toString(businessInfo.top_country_sales_percent_2).trim(),
          top_country_sales_percent_3: _.toString(businessInfo.top_country_sales_percent_3).trim() === '' ? '0' : _.toString(businessInfo.top_country_sales_percent_3).trim()
        }
        saveBusinessInfo({
          token: this.user.token,
          info: formData
        }).then(() => {
          this.loadData()
        }).catch(({ message }) => {
          this.alertDanger({
            message
          })
        })
        for (let i = 0; i < this.capabilities.length; i++) {
          if (this.capabilities[i].capability_type === undefined) {
            // console.log(this.functions[i])
            this.deleteCapabilities(this.capabilities[i])
          }
        }
        for (let i = 0; i < this.facilities.length; i++) {
          if (this.facilities[i].facility_name === undefined && this.facilities[i].processes === undefined) {
            // console.log(this.functions[i])
            this.deleteFacilities(this.facilities[i])
          }
        }
        for (let i = 0; i < this.mainSubcontractors.length; i++) {
          if (this.mainSubcontractors[i].subcontractor_name === undefined && this.mainSubcontractors[i].processes === undefined) {
            // console.log(this.functions[i])
            this.deleteMainSubcontractors(this.mainSubcontractors[i])
          }
        }
        let capList = this.capabilities.map(cap => ({
          capailityType: cap.capability_type ? cap.capability_type.code : null,
          otherCapailityType: cap.other_capability_type ? cap.other_capability_type : null,
          totalDollarSalesPercent: _.toString(cap.total_dollar_sales_percent).trim() === '' ? '0' : _.toString(cap.total_dollar_sales_percent).trim()
        }))
        saveCapability({
          token: this.user.token,
          capability: {
            parnetId: _.toInteger(this.vendorProfileId),
            capabilities: capList
          }
        })
        let facList = this.facilities.map(fac => ({
          factitityName: fac.facility_name ? fac.facility_name : null,
          processes: fac.processes.map(item => item.code).join(','),
          country: fac.country ? fac.country.code : null,
          ownershipPercent: _.toString(fac.ownership_percent).trim() === '' ? '0' : _.toString(fac.ownership_percent).trim(),
          annualCapacity: _.toString(fac.annual_capacity).trim() === '' ? '0' : _.toString(fac.annual_capacity).trim(),
          capacityUnit: fac.capacity_unit ? fac.capacity_unit.code : null
        }))
        let mainList = this.mainSubcontractors.map(mai => ({
          subcontractorName: mai.subcontractor_name ? mai.subcontractor_name : null,
          processes: mai.processes.map(item => item.code).join(','),
          country: mai.country ? mai.country.code : null,
          annualCapacity: _.toString(mai.annual_capacity).trim() === '' ? '0' : _.toString(mai.annual_capacity).trim(),
          capacityUnit: mai.capacity_unit ? mai.capacity_unit.code : null
        }))
        saveFacility({
          token: this.user.token,
          facility: {
            parnetId: _.toInteger(this.vendorProfileId),
            facilities: facList
          }
        })
        saveMainSubcontractors({
          token: this.user.token,
          MainSubcontractors: {
            parnetId: _.toInteger(this.vendorProfileId),
            mainSubcontractors: mainList
          }
        })
      },
      loadData () {
        Promise.all([
          getMillVendorMasterBusinessInfo({
            token: this.user.token,
            millVendorID: this.vendorProfileId
          }),
          getCountryOfOrigin({
            token: this.user.token
          })
        ]).then(([vendorMasterBusinessInfo, countryOfOrigin]) => {
          this.countryOfOrigin = this.countries
          const countryMap = this.countryOfOrigin.reduce((map, item) => {
            map[item.code] = item
            return map
          }, {})
          this.businessList = vendorMasterBusinessInfo
          this.businessList.sale_volume_year_1 = this.businessList.sale_volume_year_1 === 0 ? '' : this.businessList.sale_volume_year_1
          this.businessList.sale_volume_year_2 = this.businessList.sale_volume_year_2 === 0 ? '' : this.businessList.sale_volume_year_2
          this.businessList.sale_volume_year_3 = this.businessList.sale_volume_year_3 === 0 ? '' : this.businessList.sale_volume_year_3
          this.businessList.total_sale_volume_1 = this.businessList.total_sale_volume_1 === '0' ? '' : this.businessList.total_sale_volume_1
          this.businessList.total_sale_volume_2 = this.businessList.total_sale_volume_2 === '0' ? '' : this.businessList.total_sale_volume_2
          this.businessList.total_sale_volume_3 = this.businessList.total_sale_volume_3 === '0' ? '' : this.businessList.total_sale_volume_3
          this.businessList.total_dollar_sales_1 = this.businessList.total_dollar_sales_1 === '0' ? '' : this.businessList.total_dollar_sales_1
          this.businessList.total_dollar_sales_2 = this.businessList.total_dollar_sales_2 === '0' ? '' : this.businessList.total_dollar_sales_2
          this.businessList.total_dollar_sales_3 = this.businessList.total_dollar_sales_3 === '0' ? '' : this.businessList.total_dollar_sales_3
          this.businessList.sale_volume_to_gap_1 = this.businessList.sale_volume_to_gap_1 === '0' ? '' : this.businessList.sale_volume_to_gap_1
          this.businessList.sale_volume_to_gap_2 = this.businessList.sale_volume_to_gap_2 === '0' ? '' : this.businessList.sale_volume_to_gap_2
          this.businessList.sale_volume_to_gap_3 = this.businessList.sale_volume_to_gap_3 === '0' ? '' : this.businessList.sale_volume_to_gap_3
          this.businessList.dollar_sales_to_gap_1 = this.businessList.dollar_sales_to_gap_1 === '0' ? '' : this.businessList.dollar_sales_to_gap_1
          this.businessList.dollar_sales_to_gap_2 = this.businessList.dollar_sales_to_gap_2 === '0' ? '' : this.businessList.dollar_sales_to_gap_2
          this.businessList.dollar_sales_to_gap_3 = this.businessList.dollar_sales_to_gap_3 === '0' ? '' : this.businessList.dollar_sales_to_gap_3
          this.businessList.dollar_sales_to_gap_percent_1 = this.businessList.dollar_sales_to_gap_percent_1 === '0' ? '' : this.businessList.dollar_sales_to_gap_percent_1
          this.businessList.dollar_sales_to_gap_percent_2 = this.businessList.dollar_sales_to_gap_percent_2 === '0' ? '' : this.businessList.dollar_sales_to_gap_percent_2
          this.businessList.dollar_sales_to_gap_percent_3 = this.businessList.dollar_sales_to_gap_percent_3 === '0' ? '' : this.businessList.dollar_sales_to_gap_percent_3
          this.businessList.annual_prod_capacity = this.businessList.annual_prod_capacity === '0' ? '' : this.businessList.annual_prod_capacity
          this.businessList.top_retail_customer_percent_1 = this.businessList.top_retail_customer_percent_1 === 0 ? '' : this.businessList.top_retail_customer_percent_1
          this.businessList.top_retail_customer_percent_2 = this.businessList.top_retail_customer_percent_2 === 0 ? '' : this.businessList.top_retail_customer_percent_2
          this.businessList.top_retail_customer_percent_3 = this.businessList.top_retail_customer_percent_3 === 0 ? '' : this.businessList.top_retail_customer_percent_3
          this.businessList.top_retail_customer_percent_4 = this.businessList.top_retail_customer_percent_4 === 0 ? '' : this.businessList.top_retail_customer_percent_4
          this.businessList.top_retail_customer_percent_5 = this.businessList.top_retail_customer_percent_5 === 0 ? '' : this.businessList.top_retail_customer_percent_5
          this.businessList.top_country_sales_percent_1 = this.businessList.top_country_sales_percent_1 === 0 ? '' : this.businessList.top_country_sales_percent_1
          this.businessList.top_country_sales_percent_2 = this.businessList.top_country_sales_percent_2 === 0 ? '' : this.businessList.top_country_sales_percent_2
          this.businessList.top_country_sales_percent_3 = this.businessList.top_country_sales_percent_3 === 0 ? '' : this.businessList.top_country_sales_percent_3
          this.businessList.total_sale_volume_unit = { code: this.businessList.total_sale_volume_unit, name: this.businessList.total_sale_volume_unit }
          this.businessList.sale_volume_to_gap_unit = { code: this.businessList.sale_volume_to_gap_unit, name: this.businessList.sale_volume_to_gap_unit }
          this.businessList.annual_prod_capacity_unit = { code: this.businessList.annual_prod_capacity_unit, name: this.businessList.annual_prod_capacity_unit }
          this.businessList.top_retail_customer_name_1 = { code: this.businessList.top_retail_customer_name_1, name: this.businessList.top_retail_customer_name_1 }
          this.businessList.top_retail_customer_name_2 = { code: this.businessList.top_retail_customer_name_2, name: this.businessList.top_retail_customer_name_2 }
          this.businessList.top_retail_customer_name_3 = { code: this.businessList.top_retail_customer_name_3, name: this.businessList.top_retail_customer_name_3 }
          this.businessList.top_retail_customer_name_4 = { code: this.businessList.top_retail_customer_name_4, name: this.businessList.top_retail_customer_name_4 }
          this.businessList.top_retail_customer_name_5 = { code: this.businessList.top_retail_customer_name_5, name: this.businessList.top_retail_customer_name_5 }
          // this.businessList.top_garment_vendor_cty_1 = { master_country_code: this.businessList.top_garment_vendor_cty_1, s_country_nm: this.businessList.top_garment_vendor_cty_1 }
          // this.businessList.top_garment_vendor_cty_2 = { master_country_code: this.businessList.top_garment_vendor_cty_2, s_country_nm: this.businessList.top_garment_vendor_cty_2 }
          // this.businessList.top_garment_vendor_cty_3 = { master_country_code: this.businessList.top_garment_vendor_cty_3, s_country_nm: this.businessList.top_garment_vendor_cty_3 }
          // this.businessList.top_garment_vendor_cty_4 = { master_country_code: this.businessList.top_garment_vendor_cty_4, s_country_nm: this.businessList.top_garment_vendor_cty_4 }
          // this.businessList.top_garment_vendor_cty_5 = { master_country_code: this.businessList.top_garment_vendor_cty_5, s_country_nm: this.businessList.top_garment_vendor_cty_5 }
          this.businessList.top_garment_vendor_cty_1 = this.businessList.top_garment_vendor_cty_1 ? this.businessList.top_garment_vendor_cty_1.split(',').map(code => countryMap[code]) : null
          this.businessList.top_garment_vendor_cty_2 = this.businessList.top_garment_vendor_cty_2 ? this.businessList.top_garment_vendor_cty_2.split(',').map(code => countryMap[code]) : null
          this.businessList.top_garment_vendor_cty_3 = this.businessList.top_garment_vendor_cty_3 ? this.businessList.top_garment_vendor_cty_3.split(',').map(code => countryMap[code]) : null
          this.businessList.top_garment_vendor_cty_4 = this.businessList.top_garment_vendor_cty_4 ? this.businessList.top_garment_vendor_cty_4.split(',').map(code => countryMap[code]) : null
          this.businessList.top_garment_vendor_cty_5 = this.businessList.top_garment_vendor_cty_5 ? this.businessList.top_garment_vendor_cty_5.split(',').map(code => countryMap[code]) : null
          this.businessList.top_country_name_1 = { code: this.businessList.top_country_name_1, name: this.businessList.top_country_name_1 }
          this.businessList.top_country_name_2 = { code: this.businessList.top_country_name_2, name: this.businessList.top_country_name_2 }
          this.businessList.top_country_name_3 = { code: this.businessList.top_country_name_3, name: this.businessList.top_country_name_3 }
          this.businessList.top_garment_vendor_direct_1 = this.businessList.top_garment_vendor_direct_1 === 'Y' ? this.businessList.top_garment_vendor_direct_1 = true : this.businessList.top_garment_vendor_direct_1 = false
          this.businessList.top_garment_vendor_direct_2 = this.businessList.top_garment_vendor_direct_2 === 'Y' ? this.businessList.top_garment_vendor_direct_2 = true : this.businessList.top_garment_vendor_direct_2 = false
          this.businessList.top_garment_vendor_direct_3 = this.businessList.top_garment_vendor_direct_3 === 'Y' ? this.businessList.top_garment_vendor_direct_3 = true : this.businessList.top_garment_vendor_direct_3 = false
          this.businessList.top_garment_vendor_direct_4 = this.businessList.top_garment_vendor_direct_4 === 'Y' ? this.businessList.top_garment_vendor_direct_4 = true : this.businessList.top_garment_vendor_direct_4 = false
          this.businessList.top_garment_vendor_direct_5 = this.businessList.top_garment_vendor_direct_5 === 'Y' ? this.businessList.top_garment_vendor_direct_5 = true : this.businessList.top_garment_vendor_direct_5 = false
          this.facilities = this.businessList.facilities
          this.mainSubcontractors = this.businessList.mainSubcontractors
          getMillVendorProcess({
            token: this.user.token
          }).then(processesOption => {
            this.processesOption = processesOption
            let processesMap = processesOption.reduce((map, pro) => {
              map[pro.code] = pro
              return map
            }, {})
            for (let i = 0; i < this.facilities.length; i++) {
              this.facilities[i].country = { code: this.facilities[i].country, name: this.facilities[i].country }
              this.facilities[i].processes = this.facilities[i].processes.split(',').map(proCode => processesMap[proCode]).filter(item => item !== undefined)
              // this.facilities[i].processes = { code: this.facilities[i].processes, name: this.facilities[i].processes }
              this.facilities[i].capacity_unit = { code: this.facilities[i].capacity_unit, name: this.facilities[i].capacity_unit }
              this.facilities[i].annual_capacity = this.facilities[i].annual_capacity === 0 ? null : this.facilities[i].annual_capacity
              this.facilities[i].ownership_percent = this.facilities[i].ownership_percent === 0 ? '0' : this.facilities[i].ownership_percent
            }
            for (let i = 0; i < this.mainSubcontractors.length; i++) {
              this.mainSubcontractors[i].processes = this.mainSubcontractors[i].processes.split(',').map(maiCode => processesMap[maiCode]).filter(item => item !== undefined)
              this.mainSubcontractors[i].country = { code: this.mainSubcontractors[i].country, name: this.mainSubcontractors[i].country }
              this.mainSubcontractors[i].capacity_unit = { code: this.mainSubcontractors[i].capacity_unit, name: this.mainSubcontractors[i].capacity_unit }
              this.mainSubcontractors[i].annual_capacity = this.mainSubcontractors[i].annual_capacity === 0 ? null : this.mainSubcontractors[i].annual_capacity
            }
          })
          this.capabilities = this.businessList.capabilities
          for (let i = 0; i < this.capabilities.length; i++) {
            this.capabilities[i].capability_type = { code: this.capabilities[i].capability_type, name: this.capabilities[i].capability_type }
          }
          if (this.capabilities.length === 0) {
            this.addCapabilities()
          }
          if (this.facilities.length === 0) {
            this.addFacilities()
          }
          if (this.mainSubcontractors.length === 0) {
            this.addMainSubcontractors()
          }
        })
        getSaleVolumeUNIT({
          token: this.user.token
        }).then(SaleVolumeUNIT => {
          this.saleVolumeUNITOption = SaleVolumeUNIT
        })
        getTopRetailCustomerNM({
          token: this.user.token
        }).then(topRetailCustomer => {
          this.topRetailCustomer = topRetailCustomer
        })
        getCapacityUNIT({
          token: this.user.token
        }).then(capacityUNIT => {
          this.capacityUnit = capacityUNIT
        })
        getMillVendorCapability({
          token: this.user.token
        }).then(capabilityType => {
          this.capabilityType = capabilityType
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
  .th-title{
    text-align: left !important;
    vertical-align: middle !important;
    border-color:#ddd !important;
  }
</style>
