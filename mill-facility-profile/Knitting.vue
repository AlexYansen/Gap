<template>
<div>
  <div v-if="facilityCapabilities.indexOf('KNITTING_KNITTING') === -1&&facilityCapabilities.indexOf('KNITTING_DYEING') === -1&&facilityCapabilities.indexOf('KNITTING_FINISHING') === -1">
    <br/>
    <label class="control-label field-title">You are not required to fill in this section</label>
  </div>
  <div>
    <div v-if="facilityCapabilities.indexOf('KNITTING_KNITTING') !== -1">
      <div class="form-group">
        <br/>
        <!-- <label class="control-label" style="font-size:16px">Knitting</label> -->
        <label class="control-label field-title">Capabilities of Fabrication - Single Knit</label>
        <div class="row">
          <div class="col-md-9">
            <table class="table">
              <tbody>
                <tr class="trHeader">
                  <th class="thcss" style="width:60%" colspan="3">Knitting</th>
                  <th class="thcss" style="width:25%">Available Gauge (including)</th>
                  <th class="thcss" style="width:15%">Plating carrier to knit bare spandex?</th>
                </tr>  
                <tr class="trBody">
                  <td class="thBody" style="width:10%;text-align: center;">
                    <input type="checkbox" v-model="knitting.hasFcSkJersay">
                  </td>
                  <td class="thBody" style="width:22%;">Jersey</td>
                  <td class="thBody" style="width:28%;"></td>
                  <td class="thBody">
                    <vue-numeric placeholder="only number allowed" class="form-control input-sm" value={knitting.fcSkJersayGauge} v-model="knitting.fcSkJersayGauge"/>
                  </td>
                  <td class="thBody" style="text-align: center;">
                    <input type="checkbox" v-model="knitting.hasFcSkJersaySb">
                  </td>
                </tr>
                <tr class="trBody">
                  <td class="thBody" style="text-align: center;">
                    <input type="checkbox" v-model="knitting.hasFcSkPique">
                  </td>
                  <td class="thBody">Pique</td>
                  <td class="thBody"></td>
                  <td class="thBody">
                    <vue-numeric placeholder="only number allowed" class="form-control input-sm" value={knitting.fcSkPiqueGauge} v-model="knitting.fcSkPiqueGauge"/>
                  </td>
                  <td class="thBody" style="text-align: center;">
                    <input type="checkbox" v-model="knitting.hasFcSkPiqueSb">
                  </td>
                </tr>
                <tr class="trBody">
                  <td class="thBody" style="text-align: center;">
                    <input type="checkbox" v-model="knitting.hasFcSkFleece">
                  </td>
                  <td class="thBody">Fleece</td>
                  <td class="thBody"></td>
                  <td class="thBody">
                    <vue-numeric placeholder="only number allowed" class="form-control input-sm" value={knitting.fcSkFleeceGauge} v-model="knitting.fcSkFleeceGauge"/>
                  </td>
                  <td class="thBody" style="text-align: center;">
                    <input type="checkbox" v-model="knitting.hasFcSkFleeceSb">
                  </td>
                </tr>
                <tr class="trBody">
                  <td class="thBody" style="text-align: center;">
                    <input type="checkbox" v-model="knitting.hasFcSkOthers">
                  </td>
                  <td class="thBody">Others:</td>
                  <td class="thBody"><input type="text" class="form-control input-sm"  v-model="knitting.fcSkOthers" placeholder="Please specify">
                  </td>
                  <td class="thBody">
                    <vue-numeric placeholder="only number allowed" class="form-control input-sm" value={knitting.fcSkOthersGauge} v-model="knitting.fcSkOthersGauge"/>
                  </td>
                  <td class="thBody" style="text-align: center;">
                    <input type="checkbox" v-model="knitting.hasFcSkOthersSb">
                  </td>
                </tr>
                <tr class="trBody">
                  <td class="thBody" style="text-align: center;">
                    <input type="checkbox"  v-model="knitting.hasFcSkFStripe">
                  </td>
                  <td class="thBody">Feeder Stripe:</td>
                  <td class="thBody"><vue-numeric type="text" class="form-control input-sm" value={knitting.fcSkFStripeRepeatSize} v-model="knitting.fcSkFStripeRepeatSize" placeholder="Max. Size of Repeat"/>
                  </td>
                  <td class="thBody">
                    <vue-numeric placeholder="only number allowed" class="form-control input-sm" value={knitting.fcSkFStripeGauge} v-model="knitting.fcSkFStripeGauge"/>
                  </td>
                  <td class="thBody" style="text-align: center;">
                    <input type="checkbox"  v-model="knitting.hasFcSkFStripeSb">
                  </td>
                </tr>
                <tr class="trBody">
                  <td class="thBody" style="text-align: center;">
                    <input type="checkbox" v-model="knitting.hasFcSkAStripe">
                  </td>
                  <td class="thBody">Auto Stripe:</td>
                  <td class="thBody"><vue-numeric type="text" class="form-control input-sm" value={knitting.fcSkAStripeNoOfColors} v-model="knitting.fcSkAStripeNoOfColors" placeholder="Max. Number of Colors"/>
                  </td>
                  <td class="thBody">
                    <vue-numeric type="text" class="form-control input-sm" value={knitting.fcSkAStripeGauge} v-model="knitting.fcSkAStripeGauge"/>
                  </td>
                  <td class="thBody" style="text-align: center;">
                    <input type="checkbox"  v-model="knitting.hasFcSkAStripeSb">
                  </td>
                </tr>
                <tr class="trBody">
                  <td class="thBody" style="text-align: center;">
                    <input type="checkbox" v-model="knitting.hasFcSkMJacquard">
                  </td>
                  <td class="thBody">Mini Jacquard</td>
                  <td class="thBody"></td>
                  <td class="thBody">
                    <vue-numeric type="text" class="form-control input-sm" value={knitting.fcSkMJacquardGauge} v-model="knitting.fcSkMJacquardGauge"/>
                  </td>
                  <td class="thBody"></td>
                </tr>
                <tr class="trBody">
                  <td class="thBody" style="text-align: center;">
                    <input type="checkbox" v-model="knitting.hasFcSkCJacquard">
                  </td>
                  <td class="thBody">Computer Jacquard</td>
                  <td class="thBody"></td>
                  <td class="thBody">
                    <vue-numeric type="text" class="form-control input-sm" value={knitting.fcSkCJacquardGauge} v-model="knitting.fcSkCJacquardGauge"/>
                  </td>
                  <td class="thBody"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <br/>
        <label class="control-label field-title">Capabilities of Fabrication - Double Knit</label>
        <div class="row">
          <div class="col-md-9">
            <table class="table">
              <tbody>
                <tr class="trHeader">
                  <th class="thcss" style="width:60%" colspan="3">Knitting</th>
                  <th class="thcss" style="width:25%">Available Gauge (including)</th>
                  <th class="thcss" style="width:15%">Plating carrier to knit bare spandex?</th>
                </tr>  
                <tr  class="trBody">
                  <td class="thBody" style="width:10%;text-align: center;">
                    <input type="checkbox" v-model="knitting.hasFcDkInterlock">
                  </td>
                  <td class="thBody" style="width:22%;">Interlock</td>
                  <td class="thBody" style="width:28%;"></td>
                  <td class="thBody">
                    <vue-numeric type="text" class="form-control input-sm" value={knitting.fcDkInterlockGauge} v-model="knitting.fcDkInterlockGauge"/>
                  </td>
                  <td class="thBody" style="text-align: center;">
                    <input type="checkbox" v-model="knitting.hasFcDkInterlockSb">
                  </td>
                </tr>
                <tr  class="trBody">
                  <td class="thBody" style="text-align: center;">
                    <input type="checkbox" v-model="knitting.hasFcDkRib">
                  </td>
                  <td class="thBody">Rib</td>
                  <td class="thBody"></td>
                  <td class="thBody">
                    <vue-numeric type="text" class="form-control input-sm" value={knitting.fcDkRibGauge} v-model="knitting.fcDkRibGauge"/>
                  </td>
                  <td class="thBody" style="text-align: center;">
                    <input type="checkbox"  v-model="knitting.hasFcDkRibSb">
                  </td>
                </tr>
                <tr  class="trBody">
                  <td class="thBody" style="text-align: center;">
                    <input type="checkbox" v-model="knitting.hasFcDkOthers">
                  </td>
                  <td class="thBody">Others:</td>
                  <td class="thBody"><input type="text" class="form-control input-sm"  v-model="knitting.fcDkOthers" placeholder="Please specify">
                  </td>
                  <td class="thBody">
                    <vue-numeric type="text" class="form-control input-sm" value={knitting.fcDkOthersGauge} v-model="knitting.fcDkOthersGauge"/>
                  </td>
                  <td class="thBody" style="text-align: center;">
                    <input type="checkbox"  v-model="knitting.hasFcDkOthersSb">
                  </td>
                </tr>
                <tr  class="trBody">
                  <td class="thBody" style="text-align: center;">
                    <input type="checkbox" v-model="knitting.hasFcDkFStripe">
                  </td>
                  <td class="thBody">Feeder Stripe:</td>
                  <td class="thBody"><vue-numeric type="text" class="form-control input-sm" value={knitting.fcDkFStripeRepeatSize} v-model="knitting.fcDkFStripeRepeatSize" placeholder="Max. Size of Repeat"/>
                  </td>
                  <td class="thBody">
                    <vue-numeric type="text" class="form-control input-sm" value={knitting.fcDkFStripeGauge} v-model="knitting.fcDkFStripeGauge"/>
                  </td>
                  <td class="thBody" style="text-align: center;">
                    <input type="checkbox" v-model="knitting.hasFcDkFStripeSb">
                  </td>
                </tr>
                <tr  class="trBody">
                  <td class="thBody" style="text-align: center;">
                    <input type="checkbox" v-model="knitting.hasFcDkAStripe">
                  </td>
                  <td class="thBody">Auto Stripe:</td>
                  <td class="thBody"><vue-numeric type="text" class="form-control input-sm" value={knitting.fcDkAStripeNoOfColors} v-model="knitting.fcDkAStripeNoOfColors" placeholder="Max. Number of Colors"/>
                  </td>
                  <td class="thBody">
                    <vue-numeric type="text" class="form-control input-sm" value={knitting.fcDkAStripeGauge} v-model="knitting.fcDkAStripeGauge"/>
                  </td>
                  <td class="thBody" style="text-align: center;">
                    <input type="checkbox" v-model="knitting.hasFcDkAStripeSb">
                  </td>
                </tr>
                <tr  class="trBody">
                  <td class="thBody" style="text-align: center;">
                    <input type="checkbox" v-model="knitting.hasFcDkMJacquard">
                  </td>
                  <td class="thBody">Mini Jacquard</td>
                  <td class="thBody"></td>
                  <td class="thBody">
                    <vue-numeric type="text" class="form-control input-sm" value={knitting.fcDkMJacquardGauge} v-model="knitting.fcDkMJacquardGauge"/>
                  </td>
                  <td class="thBody"></td>
                </tr>
                <tr  class="trBody">
                  <td class="thBody" style="text-align: center;">
                    <input type="checkbox" v-model="knitting.hasFcDkCJacquard">
                  </td>
                  <td class="thBody">Computer Jacquard</td>
                  <td class="thBody"></td>
                  <td class="thBody">
                    <vue-numeric type="text" class="form-control input-sm" value={knitting.fcDkCJacquardGauge} v-model="knitting.fcDkCJacquardGauge"/>
                  </td>
                  <td class="thBody"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="form-group">
        <br/>
        <label class="control-label field-title">Warp Types</label>
        <div class="row">
          <div class="col-md-9">
          <div class="row">
            <div v-for="item in warpTypes" class="col-md-4">
                <input type="checkbox" :value="item.code" v-model="knitting.warpTypes">
                <label>{{ item.name }}</label>
            </div>
          </div>
          </div>
        </div>
        <!-- <multi-select :options="warpTypes" :is-multiple="true" v-model="knitting.warpTypes" id-field="code" label-field="name"/> -->
      </div>
      <div class="form-group" v-if="knitting.warpTypes.indexOf('OTHERS') !== -1">
        <input type="text" class="form-control input-sm" v-model="knitting.otherWarpTypes" placeholder="Please specific the warp types">
      </div>
    </div>

    <div v-if="facilityCapabilities.indexOf('KNITTING_DYEING') !== -1">

      <div class="form-group">
        <br/>
        <!-- <label class="control-label" style="font-size:16px">Dyeing</label> -->
        <label class="control-label field-title">Do you have piece-dyeing?</label>
        <div class="radio">
          <label class="radio-space"><input type="radio" value="Y" v-model="knitting.hasPieceDyeing">Yes</label>
          <label class="radio-space"><input type="radio" value="N" v-model="knitting.hasPieceDyeing">No</label>
        </div>
      </div>

      <div class="form-group">
        <br/>
        <label class="control-label field-title">Dyeing Processes</label>
        <div class="row">
          <div class="col-md-9">
          <div class="row">
            <div v-for="item in dyeingProcessList" class="col-md-4">
                <input type="checkbox" :value="item.code" v-model="knitting.knittingDyeingProcesses">
                <label class="option-label">{{ item.name }}</label>
            </div>
          </div>
          </div>
        </div> 
        <div class="row" v-if="knitting.knittingDyeingProcesses.indexOf('OTHERS') !== -1">
          <div class="col-md-8">
            <input type="text" class="form-control input-sm" v-model="knitting.otherKnitDyeingProcesses" placeholder="Please specify the dyeing processes">
          </div>
        </div>
        <!-- <multi-select :options="dyeingProcessList" :is-multiple="true" v-model="knitting.knittingDyeingProcesses" id-field="code" label-field="name"/> -->
      </div>

      <div class="form-group">
        <br/>
        <label class="control-label field-title">Dyeing Equipment</label>
        <div class="row">
          <div class="col-md-9">
          <div class="row">
            <div v-for="item in dyeingEquipments" class="col-md-4">
                <input type="checkbox" :value="item.code" v-model="knitting.dyeingEquipments">
                <label class="option-label">{{ item.name }}</label>
            </div>
          </div>
          </div>
        </div> 
        <div class="row" v-if="knitting.dyeingEquipments.indexOf('OTHERS') !== -1">
          <div class="col-md-8">
            <input type="text" class="form-control input-sm" v-model="knitting.otherDyeingEquipments" placeholder="Please specify the dyeing equipments">
          </div>
        </div>
        <!-- <multi-select :options="dyeingEquipments" :is-multiple="true" v-model="knitting.dyeingEquipments" id-field="code" label-field="name"/> -->
      </div>

      <div class="form-group">
        <br/>
        <label class="control-label field-title">Monthly Capacity of Atmospheric Dyeing Machine</label>
        <div class="row">
          <div class="col-md-3">
            <input type="text" class="form-control input-sm" v-model="knitting.mcDmAtmospheric">
          </div>
          <div class="col-md-2">
            <multi-select :options="capacityUnits" v-model="knitting.mcDmAtmosphericUnit" id-field="code" label-field="name"/>
          </div>
        </div>
      </div>
      <div class="form-group">
        <br/>
        <label class="control-label field-title">Monthly Capacity of High temperature / Pressure Dyeing Machine</label>
        <div class="row">
          <div class="col-md-3">
            <input type="text" class="form-control input-sm" v-model="knitting.mcDmHighTemp">
          </div>
          <div class="col-md-2">
            <multi-select :options="capacityUnits" v-model="knitting.mcDmHighTempUnit" id-field="code" label-field="name"/>
          </div>
        </div>
      </div>
      <div class="form-group">
        <br/>
        <label class="control-label field-title">Yarn Dyeing Methods</label>
        <div class="row">
          <div class="col-md-9">
          <div class="row">
            <div v-for="item in yarnDyeingMethods" class="col-md-4">
                <input type="checkbox" :value="item.code" v-model="knitting.yarnDyeingMethods">
                <label class="option-label">{{ item.name }}</label>
            </div>
          </div>
          </div>
        </div> 
        <div class="row" v-if="knitting.yarnDyeingMethods.indexOf('OTHERS') !== -1">
          <div class="col-md-8">
            <input type="text" class="form-control input-sm" v-model="knitting.otherYarnDyeingMethods" placeholder="Please specify the dyeing methods">
          </div>
        </div>
        <!-- <multi-select :options="yarnDyeingMethods" :is-multiple="true" v-model="knitting.yarnDyeingMethods" id-field="code" label-field="name"/> -->
      </div>

      <div class="form-group">
        <br/>
        <label class="control-label field-title">Do you have continuous scouring?</label>
        <div class="row">
          <div class="col-md-9">
          <div class="row">
            <div v-for="item in continuousScouringList" class="col-md-4">
                <input type="checkbox" :value="item.code" v-model="knitting.hasContinuousScouring">
                <label class="option-label">{{ item.name }}</label>
            </div>
          </div>
          </div>
        </div>
        <!-- <multi-select :options="continuousScouringList" :is-multiple="true" v-model="knitting.hasContinuousScouring" id-field="code" label-field="name"/> -->
      </div>
      <div class="form-group">
        <br/>
        <label class="control-label field-title">What was your Right-First-Time dyeing rate in the last year (%)?</label>
        <div class="row">
          <div class="col-md-2">
            <vue-numeric v-bind:min="0.00" v-bind:max="100.00" type="text" class="form-control input-sm" value={knitting.knittingRftdRateLastYear} v-model="knitting.knittingRftdRateLastYear" v-bind:precision="2"/>
          </div>
        </div>
      </div>
      <div class="form-group">
        <br/>
        <label class="control-label field-title">What is your Laboratory-To-Bulk Reproducibility ratio (%)?</label>
        <div class="row">
          <div class="col-md-2">
            <vue-numeric v-bind:min="0.00" v-bind:max="100.00" type="text" class="form-control input-sm" value={knitting.labToBulkRepRatio} v-model="knitting.labToBulkRepRatio" v-bind:precision="2"/>
          </div>
        </div>
      </div>

    </div>

    <div v-if="facilityCapabilities.indexOf('KNITTING_FINISHING') !== -1">
      <div class="form-group">
        <br/>
        <!-- <label class="control-label" style="font-size:16px">Finishing</label> -->
        <label class="control-label field-title">Finishing Capabilities</label>
        <div class="row">
          <div class="col-md-10">
          <div class="row">
            <div v-for="item in finishingCapabilities" class="col-md-6">
                <input type="checkbox" :value="item.code" v-model="knitting.finishingCapabilities">
                <label class="option-label">{{ item.name }}</label>
            </div>
          </div>
          </div>
        </div> 
        <div class="row" v-if="knitting.finishingCapabilities.indexOf('OTHERS') !== -1">
          <div class="col-md-8">
            <input type="text" class="form-control input-sm" v-model="knitting.otherFinishingCapabilities" placeholder="Please specify the finishing capabilities">
          </div>
        </div>
        <!-- <multi-select :options="finishingCapabilities" :is-multiple="true" v-model="knitting.finishingCapabilities" id-field="code" label-field="name"/> -->
      </div>
    </div>

    <!-- <div>
      <button class="btn btn-primary" @click="save">Save</button>
    </div> -->

  </div>
</div>
</template>

<script>
  import _ from 'lodash'
  import VueNumeric from 'vue-numeric'
  import {
    USER,
    ALERT_SUCCESS,
    ALERT_DANGER
  } from 'src/store/definition'
  import {
    getDropDownList,
    getKnitting,
    updateKnitting
  } from './service'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import MultiSelect from 'src/components/common/MultiSelect'

  export default {
    components: {
      MultiSelect,
      VueNumeric
    },
    props: {
      recordId: {
        required: true
      },
      onSaveBtnClicked: {
        type: Boolean,
        required: true
      },
      facilityCapabilities: {
        required: true
      }
    },
    data () {
      return {
        warpTypes: [],
        dyeingProcessList: [],
        knittingDyeingProcesses: [],
        dyeingEquipments: [],
        capacityUnits: [],
        yarnDyeingMethods: [],
        continuousScouringList: [],
        finishingCapabilities: [],
        knitting: {
          hasFcSkJersay: null,
          fcSkJersayGauge: null,
          hasFcSkJersaySb: null,
          hasFcSkPique: null,
          fcSkPiqueGauge: null,
          hasFcSkPiqueSb: null,
          hasFcSkFleece: null,
          fcSkFleeceGauge: null,
          hasFcSkFleeceSb: null,
          hasFcSkOthers: null,
          fcSkOthers: null,
          fcSkOthersGauge: null,
          hasFcSkOthersSb: null,
          hasFcSkFStripe: null,
          fcSkFStripeRepeatSize: null,
          fcSkFStripeGauge: null,
          hasFcSkFStripeSb: null,
          hasFcSkAStripe: null,
          fcSkAStripeNoOfColors: null,
          fcSkAStripeGauge: null,
          hasFcSkAStripeSb: null,
          hasFcSkMJacquard: null,
          fcSkMJacquardGauge: null,
          hasFcSkCJacquard: null,
          fcSkCJacquardGauge: null,
          hasFcDkInterlock: null,
          fcDkInterlockGauge: null,
          hasFcDkInterlockSb: null,
          hasFcDkRib: null,
          fcDkRibGauge: null,
          hasFcDkRibSb: null,
          hasFcDkOthers: null,
          fcDkOthers: null,
          fcDkOthersGauge: null,
          hasFcDkOthersSb: null,
          hasFcDkFStripe: null,
          fcDkFStripeRepeatSize: null,
          fcDkFStripeGauge: null,
          hasFcDkFStripeSb: null,
          hasFcDkAStripe: null,
          fcDkAStripeNoOfColors: null,
          fcDkAStripeGauge: null,
          hasFcDkAStripeSb: null,
          hasFcDkMJacquard: null,
          fcDkMJacquardGauge: null,
          hasFcDkCJacquard: null,
          fcDkCJacquardGauge: null,
          warpTypes: [],
          otherWarpTypes: null,
          hasPieceDyeing: null,
          knittingDyeingProcesses: [],
          otherKnitDyeingProcesses: null,
          dyeingEquipments: [],
          otherDyeingEquipments: null,
          mcDmAtmospheric: null,
          mcDmAtmosphericUnit: null,
          mcDmHighTemp: null,
          mcDmHighTempUnit: null,
          yarnDyeingMethods: [],
          otherYarnDyeingMethods: null,
          hasContinuousScouring: [],
          knittingRftdRateLastYear: null,
          labToBulkRepRatio: null,
          finishingCapabilities: [],
          otherFinishingCapabilities: null
        }
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
      }),
      shouldShowOtherKnitDyeingProcessesInput () {
        return this.knitting.knittingDyeingProcesses && this.knitting.knittingDyeingProcesses.findIndex(item => item.code === 'OTHERS') !== -1
      }
      // shouldShowOtherWarpTypesInput () {
      //   return this.knitting.warpTypes && this.knitting.warpTypes.findIndex(item => item.code === 'OTHERS') !== -1
      // },
      // shouldShowOtherDeyingEquipmentsInput () {
      //   return this.knitting.dyeingEquipments && this.knitting.dyeingEquipments.findIndex(item => item.code === 'OTHERS') !== -1
      // },
      // shouldShowOtherYarnDyeingMethodsInput () {
      //   return this.knitting.yarnDyeingMethods && this.knitting.yarnDyeingMethods.findIndex(item => item.code === 'OTHERS') !== -1
      // },
      // shouldShowOtherFinishingCapabilitiesInput () {
      //   return this.knitting.finishingCapabilities && this.knitting.finishingCapabilities.findIndex(item => item.code === 'OTHERS') !== -1
      // }
    },
    methods: {
      ...mapActions({
        alertSuccess: ALERT_SUCCESS,
        alertDanger: ALERT_DANGER
      }),
      checkBoxOnlyNo (data) {
        if (this.knitting[data].indexOf('N') !== -1) {
          this.knitting[data] = []
        } else {
          this.knitting[data] = ['N']
        }
      },
      checkBoxOnlyYes (data) {
        if (this.knitting[data].indexOf('Y') !== -1) {
          this.knitting[data] = []
        } else {
          this.knitting[data] = ['Y']
        }
      },
      save () {
        console.log('Knitting')
        let form = _.cloneDeep(this.knitting)
        let multipleCheck = ['warpTypes', 'knittingDyeingProcesses', 'dyeingEquipments', 'yarnDyeingMethods', 'hasContinuousScouring', 'finishingCapabilities']
        for (let i = 0; i < multipleCheck.length; i++) {
          form[multipleCheck[i]] = form[multipleCheck[i]].join(',')
        }
        let decimalCheck = ['mcDmAtmospheric', 'mcDmHighTemp', 'knittingRftdRateLastYear', 'labToBulkRepRatio']
        for (let i = 0; i < decimalCheck.length; i++) {
          form[decimalCheck[i]] = _.toString(form[decimalCheck[i]]).trim()
          if (form[decimalCheck[i]] == null || _.toString(form[decimalCheck[i]]).trim() === '') {
            form[decimalCheck[i]] = '0'
          }
        }
        let checkBoxCheck = [
          'hasFcSkJersay',
          'hasFcSkJersaySb',
          'hasFcSkPique',
          'hasFcSkPiqueSb',
          'hasFcSkFleece',
          'hasFcSkFleeceSb',
          'hasFcSkOthers',
          'hasFcSkOthersSb',
          'hasFcSkFStripe',
          'hasFcSkFStripeSb',
          'hasFcSkAStripe',
          'hasFcSkAStripeSb',
          'hasFcSkMJacquard',
          'hasFcSkCJacquard',
          'hasFcDkInterlock',
          'hasFcDkInterlockSb',
          'hasFcDkRib',
          'hasFcDkRibSb',
          'hasFcDkOthers',
          'hasFcDkOthersSb',
          'hasFcDkFStripe',
          'hasFcDkFStripeSb',
          'hasFcDkAStripe',
          'hasFcDkAStripeSb',
          'hasFcDkMJacquard',
          'hasFcDkCJacquard'
        ]
        for (let i = 0; i < checkBoxCheck.length; i++) {
          if (form[checkBoxCheck[i]] === true) {
            form[checkBoxCheck[i]] = 'Y'
          } else {
            form[checkBoxCheck[i]] = 'N'
          }
        }
        // form.warpTypes = form.warpTypes ? form.warpTypes.map(item => item.code).join(',') : null
        // form.knittingDyeingProcesses = form.knittingDyeingProcesses ? form.knittingDyeingProcesses.map(item => item.code).join(',') : null
        // form.dyeingEquipments = form.dyeingEquipments ? form.dyeingEquipments.map(item => item.code).join(',') : null
        form.mcDmAtmosphericUnit = form.mcDmAtmosphericUnit ? form.mcDmAtmosphericUnit.code : null
        form.mcDmHighTempUnit = form.mcDmHighTempUnit ? form.mcDmHighTempUnit.code : null
        // form.yarnDyeingMethods = form.yarnDyeingMethods ? form.yarnDyeingMethods.map(item => item.code).join(',') : null
        // form.hasContinuousScouring = form.hasContinuousScouring ? form.hasContinuousScouring.map(item => item.code).join(',') : null
        // form.finishingCapabilities = form.finishingCapabilities ? form.finishingCapabilities.map(item => item.code).join(',') : null
        let propertiesNeedToConvertToInteger = [
          'fcSkJersayGauge',
          'fcSkPiqueGauge',
          'fcSkFleeceGauge',
          'fcSkOthersGauge',
          'fcSkFStripeRepeatSize',
          'fcSkFStripeGauge',
          'fcSkAStripeNoOfColors',
          'fcSkAStripeGauge',
          'fcSkMJacquardGauge',
          'fcSkCJacquardGauge',
          'fcDkInterlockGauge',
          'fcDkRibGauge',
          'fcDkOthersGauge',
          'fcDkFStripeRepeatSize',
          'fcDkFStripeGauge',
          'fcDkAStripeNoOfColors',
          'fcDkAStripeGauge',
          'fcDkMJacquardGauge',
          'fcDkCJacquardGauge'
        ].reduce((map, property) => {
          map[property] = true
          return map
        }, {})
        Object.keys(form).forEach(key => {
          if (propertiesNeedToConvertToInteger[key]) {
            form[key] = _.toInteger(form[key])
          } else if (form[key] !== null) {
            form[key] = _.toString(form[key])
          }
        })
        form.id = _.toInteger(this.recordId)
        updateKnitting({
          token: this.user.token,
          form
        }).then(() => {
          // this.alertSuccess({
          //   message: 'Save successfully.'
          // })
        }).catch(({ message }) => {
          this.alertDanger({
            message
          })
        })
      }
    },
    mounted () {
      Promise.all([
        getKnitting({
          token: this.user.token,
          id: _.toInteger(this.recordId)
        }),
        getDropDownList({
          token: this.user.token,
          codeTableId: 'WARP_TYPE'
        }),
        getDropDownList({
          token: this.user.token,
          codeTableId: 'KNITTING_DYEING_PROCESS'
        }),
        getDropDownList({
          token: this.user.token,
          codeTableId: 'DYEING_EQUIPMENT'
        }),
        getDropDownList({
          token: this.user.token,
          codeTableId: 'CAPACITY_UNIT'
        }),
        getDropDownList({
          token: this.user.token,
          codeTableId: 'YARN_DYEING_METHOD'
        }),
        getDropDownList({
          token: this.user.token,
          codeTableId: 'CONTINUOUS_SCOURING'
        }),
        getDropDownList({
          token: this.user.token,
          codeTableId: 'FINISHING_CAPABILITY'
        })
      ]).then(([knitting, warpTypes, dyeingProcessList, dyeingEquipments, capacityUnits, yarnDyeingMethods, continuousScouringList, finishingCapabilities]) => {
        // const warpTypeMap = warpTypes.reduce((map, item) => {
        //   map[item.code] = item
        //   return map
        // }, {})
        // const dyeingProcessMap = dyeingProcessList.reduce((map, item) => {
        //   map[item.code] = item
        //   return map
        // }, {})
        // const dyeingEquipmentMap = dyeingEquipments.reduce((map, item) => {
        //   map[item.code] = item
        //   return map
        // }, {})
        const capacityUnitMap = capacityUnits.reduce((map, item) => {
          map[item.code] = item
          return map
        }, {})
        // const yarnDyeingMethodMap = yarnDyeingMethods.reduce((map, item) => {
        //   map[item.code] = item
        //   return map
        // }, {})
        // const continuousScouringMap = continuousScouringList.reduce((map, item) => {
        //   map[item.code] = item
        //   return map
        // }, {})
        // const finishingCapabilityMap = finishingCapabilities.reduce((map, item) => {
        //   map[item.code] = item
        //   return map
        // }, {})
        this.warpTypes = _.cloneDeep(warpTypes)
        this.dyeingProcessList = _.cloneDeep(dyeingProcessList)
        this.dyeingEquipments = _.cloneDeep(dyeingEquipments)
        this.capacityUnits = _.cloneDeep(capacityUnits)
        this.yarnDyeingMethods = _.cloneDeep(yarnDyeingMethods)
        this.continuousScouringList = _.cloneDeep(continuousScouringList)
        this.finishingCapabilities = _.cloneDeep(finishingCapabilities)
        this.knitting = _.cloneDeep(knitting)
        // this.knitting.warpTypes = knitting.warpTypes ? knitting.warpTypes.split(',').map(code => warpTypeMap[code]) : null
        // this.knitting.knittingDyeingProcesses = knitting.knittingDyeingProcesses ? knitting.knittingDyeingProcesses.split(',').map(code => dyeingProcessMap[code]) : null
        // this.knitting.dyeingEquipments = knitting.dyeingEquipments ? knitting.dyeingEquipments.split(',').map(code => dyeingEquipmentMap[code]) : null
        this.knitting.mcDmAtmosphericUnit = capacityUnitMap[knitting.mcDmAtmosphericUnit] || null
        this.knitting.mcDmHighTempUnit = capacityUnitMap[knitting.mcDmHighTempUnit] || null
        // this.knitting.yarnDyeingMethods = knitting.yarnDyeingMethods ? knitting.yarnDyeingMethods.split(',').map(code => yarnDyeingMethodMap[code]) : null
        // this.knitting.hasContinuousScouring = knitting.hasContinuousScouring ? knitting.hasContinuousScouring.split(',').map(code => continuousScouringMap[code]) : null
        // this.knitting.finishingCapabilities = knitting.finishingCapabilities ? knitting.finishingCapabilities.split(',').map(code => finishingCapabilityMap[code]) : null
        let checkBoxCheck = [
          'hasFcSkJersay',
          'hasFcSkJersaySb',
          'hasFcSkPique',
          'hasFcSkPiqueSb',
          'hasFcSkFleece',
          'hasFcSkFleeceSb',
          'hasFcSkOthers',
          'hasFcSkOthersSb',
          'hasFcSkFStripe',
          'hasFcSkFStripeSb',
          'hasFcSkAStripe',
          'hasFcSkAStripeSb',
          'hasFcSkMJacquard',
          'hasFcSkCJacquard',
          'hasFcDkInterlock',
          'hasFcDkInterlockSb',
          'hasFcDkRib',
          'hasFcDkRibSb',
          'hasFcDkOthers',
          'hasFcDkOthersSb',
          'hasFcDkFStripe',
          'hasFcDkFStripeSb',
          'hasFcDkAStripe',
          'hasFcDkAStripeSb',
          'hasFcDkMJacquard',
          'hasFcDkCJacquard'
        ]
        // for (let i = 0; i < checkBoxCheck.length; i++) {
        //   if (_.isString(this.knitting[checkBoxCheck[i]]) && this.knitting[checkBoxCheck[i]].trim() !== '') {
        //     this.knitting[checkBoxCheck[i]] = this.knitting[checkBoxCheck[i]].split(',')
        //   } else {
        //     this.knitting[checkBoxCheck[i]] = []
        //   }
        // }
        for (let i = 0; i < checkBoxCheck.length; i++) {
          if (this.knitting[checkBoxCheck[i]] === 'Y') {
            this.knitting[checkBoxCheck[i]] = true
          } else {
            this.knitting[checkBoxCheck[i]] = false
          }
        }
        let multipleCheck = ['warpTypes', 'knittingDyeingProcesses', 'dyeingEquipments', 'yarnDyeingMethods', 'hasContinuousScouring', 'finishingCapabilities']
        for (let i = 0; i < multipleCheck.length; i++) {
          if (_.isString(this.knitting[multipleCheck[i]]) && this.knitting[multipleCheck[i]].trim() !== '') {
            this.knitting[multipleCheck[i]] = this.knitting[multipleCheck[i]].split(',')
          } else {
            this.knitting[multipleCheck[i]] = []
          }
        }
        let decimalCheck = ['mcDmAtmospheric', 'mcDmHighTemp', 'knittingRftdRateLastYear', 'labToBulkRepRatio']
        for (let i = 0; i < decimalCheck.length; i++) {
          if (_.toString(this.knitting[decimalCheck[i]]) === '0') {
            this.knitting[decimalCheck[i]] = ''
          }
        }
        let integerCheck = [
          'fcSkJersayGauge',
          'fcSkPiqueGauge',
          'fcSkFleeceGauge',
          'fcSkOthersGauge',
          'fcSkFStripeRepeatSize',
          'fcSkFStripeGauge',
          'fcSkAStripeNoOfColors',
          'fcSkAStripeGauge',
          'fcSkMJacquardGauge',
          'fcSkCJacquardGauge',
          'fcDkInterlockGauge',
          'fcDkRibGauge',
          'fcDkOthersGauge',
          'fcDkFStripeRepeatSize',
          'fcDkFStripeGauge',
          'fcDkAStripeNoOfColors',
          'fcDkAStripeGauge',
          'fcDkMJacquardGauge',
          'fcDkCJacquardGauge'
        ]
        for (let i = 0; i < integerCheck.length; i++) {
          if (_.toString(this.knitting[integerCheck[i]]) === '0') {
            this.knitting[integerCheck[i]] = ''
          }
        }
      })
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
    }
  }
</script>

<style scoped>
  .radio-space {
    margin-right: 10px;
  }
  input.input-sm {
    height: 28px !important;
    border: 1px solid #aaa;
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