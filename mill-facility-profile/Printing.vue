<template>
<div>
    <div v-if="facilityCapabilities.indexOf('PRINTING') === -1">
      <br/>
      <label class="control-label field-title">You are not required to fill in this section</label>
    </div>  
    <div v-if="facilityCapabilities.indexOf('PRINTING') !== -1">
        <div class="form-group">
            <br>
            <label class="control-label field-title">Printing Facilities</label>           
            <div class="row">
                <div class="col-md-12">
                    <table class="table">
                        <tbody>
                            <tr class="trHeader">
                                <th style="text-align: center; width: 32%;" colspan="2" class="thcss">Printing Facility</th>
                                <th style="text-align: center; width: 15%;" class="thcss">No. of Printing Machines</th>
                                <th style="text-align: center; width: 15%;" class="thcss">Max. of Repeat Size (“)</th>
                                <th style="text-align: center; width: 15%;" class="thcss">Max. No. of Colors</th>
                                <th style="text-align: center; width: 15%;" class="thcss">Max Width</th>
                                <th style="text-align: center; width: 8%;" class="thcss">
                                    <a class="btn" @click="addPrintingFacilities(printingFacilities)">
                                        <i class="fa fa-plus"></i>Add
                                    </a>
                                </th>
                            </tr>
                            <tr class="trBody" v-for="item in printingFacilities">
                                <td class="thBody" style="width:16%">
                                    <multi-select :options="printingFacilityOptions" v-model="item.printingFacility" :is-multiple="false" id-field="code" label-field="name" />
                                </td>
                                <td class="thBody">
                                    <input type="text" :disabled="checkOtherPrintingFac(item)" class="form-control input-sm" v-model="item.otherPrintingFacility" placeholder="If others, please specify">
                                </td>
                                <td class="thBody">      
                                    <input onkeypress="return event.keyCode>=48&&event.keyCode<=57" ng-pattern="/[^a-zA-Z]/" type="text" class="form-control input-sm"  v-model="item.noOfPrintingMachine"/>
                                </td>
                                <td class="thBody">
                                    <input onkeypress="return event.keyCode>=48&&event.keyCode<=57" ng-pattern="/[^a-zA-Z]/" type="text" class="form-control input-sm"  v-model="item.maxOfRepeatSize"/>
                                </td>
                                <td class="thBody">
                                    <input onkeypress="return event.keyCode>=48&&event.keyCode<=57" ng-pattern="/[^a-zA-Z]/" type="text" class="form-control input-sm"  v-model="item.maxNoOfColors"/>
                                </td>
                                <td class="thBody">
                                    <input type="text" class="form-control input-sm"  v-model="item.maxWidth">
                                </td>
                                <td class="thBody" style="text-align: center;">
                                    <a class="btn" @click="removePrintingFacilities (printingFacilities, item)">
                                        <i class="fa fa-trash"></i>Delete
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="form-group">
            <br>
            <label class="control-label field-title">Printing Types</label>  
            <div class="row">
                <div class="col-md-9">
                    <table class="table">
                        <tbody>
                            <tr class="trHeader">
                                <th style="text-align: center; width: 56%" colspan="2" class="thcss">Printing Type</th>
                                <th style="text-align: center; width: 35%" colspan="2" class="thcss">Monthly Capacity</th>
                                <th style="text-align: center; width: 9%" class="thcss">
                                    <a class="btn" @click="addPrintingTypes(printingTypes)">
                                        <i class="fa fa-plus"></i>Add
                                    </a>
                                </th>
                            </tr>
                            <tr class="trBody" v-for="item in printingTypes">
                                <td class="thBody" style="width:28%">
                                    <multi-select :options="printingTypeOptions" v-model="item.printingType" :is-multiple="false" id-field="code" label-field="name" />
                                </td>
                                <td class="thBody">
                                    <input type="text" :disabled="checkOtherPType(item)" class="form-control input-sm" v-model="item.otherPrintingType" placeholder="If others, please specify">
                                </td>
                                <td class="thBody">
                                    <input type="text" class="form-control input-sm"  v-model="item.monthlyCapacity"/>
                                </td>
                                <td class="thBody" style="width:16%">
                                    <multi-select :options="capacityUnitOptions" v-model="item.monthlyCapacityUnit" :is-multiple="false" id-field="code" label-field="name" />
                                </td>
                                <td class="thBody" style="text-align: center;">
                                    <a class="btn" @click="removePrintingTypes (printingTypes, item)">
                                        <i class="fa fa-trash"></i>Delete
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- <button class="btn btn-primary" @click="save">Save</button> -->
    </div>
</div>    
</template>

<script>
  import _ from 'lodash'
  import VueNumeric from 'vue-numeric'
  import MultiSelect from 'src/components/common/MultiSelect'
  import {
    getMillFacilityProfilePrinting,
    updateMillFacilityProfilePrinting,
    getDropDownList
  } from './service'
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
        printingFacilities: [
          {
            printingFacility: {
              code: null
            }
          }
        ],
        printingTypes: [
          {
            printingType: {
              code: null
            },
            monthlyCapacityUnit: {
              code: null
            }
          }
        ],
        capacityUnitOptions: [],
        printingTypeOptions: [],
        printingFacilityOptions: []
      }
    },
    computed: {
      ...mapGetters({
        user: USER
      })
    },
    watch: {
      onSaveBtnClicked () {
        if (this.onSaveBtnClicked) {
          this.save()
          this.$emit('saved')
        }
      }
    },
    methods: {
      ...mapActions({
        alertSuccess: ALERT_SUCCESS,
        alertDanger: ALERT_DANGER
      }),
      checkOtherPrintingFac (item) {
        item.otherPrintingFacility = item.printingFacility.code !== 'OTHERS' ? '' : item.otherPrintingFacility
        return item.printingFacility.code !== 'OTHERS'
      },
      checkOtherPType (item) {
        item.otherPrintingType = item.printingType.code !== 'OTHERS' ? '' : item.otherPrintingType
        return item.printingType.code !== 'OTHERS'
      },
      addPrintingFacilities (printingFacilities) {
        printingFacilities.push({
          printingFacility: {code: null}
        })
        this.printingFacilities = [...this.printingFacilities]
      },
      removePrintingFacilities (printingFacilities, item) {
        this.printingFacilities = printingFacilities.filter(iten => iten !== item)
      },
      addPrintingTypes (printingTypes) {
        printingTypes.push({
          printingType: {code: null},
          monthlyCapacityUnit: {code: null}
        })
        this.printingTypes = [...this.printingTypes]
      },
      removePrintingTypes (printingTypes, item) {
        this.printingTypes = printingTypes.filter(iten => iten !== item)
      },
      save () {
        console.log('Printing')
        for (let i = 0; i < this.printingFacilities.length; i++) {
          if (this.printingFacilities[i].printingFacility.code == null) {
            // console.log(i)
            // console.log(this.printingFacilities[i].printingFacility.code)
            this.removePrintingFacilities(this.printingFacilities, this.printingFacilities[i])
          }
        }
        // console.log(this.printingFacilities)
        for (let i = 0; i < this.printingTypes.length; i++) {
          // console.log(i)
          if (this.printingTypes[i].printingType.code === null) {
            // console.log(this.functions[i])
            // console.log(i)
            this.removePrintingTypes(this.printingTypes, this.printingTypes[i])
          }
        }
        // console.log(this.printingTypes)
        let formData = {
          parentId: _.toInteger(this.recordId),
          pfs: this.printingFacilities,
          pts: this.printingTypes
        }
        for (let i = 0; i < formData.pfs.length; i++) {
          formData.pfs[i].printingFacility = formData.pfs[i].printingFacility ? formData.pfs[i].printingFacility.code : null
          formData.pfs[i].noOfPrintingMachine = _.toInteger(formData.pfs[i].noOfPrintingMachine)
          formData.pfs[i].maxOfRepeatSize = _.toInteger(formData.pfs[i].maxOfRepeatSize)
          formData.pfs[i].maxNoOfColors = _.toInteger(formData.pfs[i].maxNoOfColors)
        }
        for (let i = 0; i < formData.pts.length; i++) {
          if (formData.pts[i].monthlyCapacity == null || _.toString(formData.pts[i].monthlyCapacity).trim() === '') {
            formData.pts[i].monthlyCapacity = '0'
          }
          formData.pts[i].monthlyCapacityUnit = formData.pts[i].monthlyCapacityUnit ? formData.pts[i].monthlyCapacityUnit.code : null
          formData.pts[i].printingType = formData.pts[i].printingType ? formData.pts[i].printingType.code : null
        }
        updateMillFacilityProfilePrinting({
          token: this.user.token,
          info: formData
        }).then(() => {
          this.loadData()
          // this.alertSuccess({
          //   message: 'Save successfully.'
          // })
        }).catch(({ message }) => {
          this.alertDanger({
            message
          })
        })
      },
      loadData () {
        Promise.all([
          getMillFacilityProfilePrinting({
            token: this.user.token,
            recordId: this.recordId
          }),
          getDropDownList({
            token: this.user.token,
            codeTableId: 'PRINTING_FACILITY'
          }),
          getDropDownList({
            token: this.user.token,
            codeTableId: 'PRINTING_TYPE'
          }),
          getDropDownList({
            token: this.user.token,
            codeTableId: 'CAPACITY_UNIT'
          })
        ]).then(([printingList, printingFacilityOptions, printingTypeOptions, capacityUnitOptions]) => {
          this.printingFacilityOptions = printingFacilityOptions
          this.printingTypeOptions = printingTypeOptions
          this.capacityUnitOptions = capacityUnitOptions
          this.printingFacilities = printingList.pfs.map(item => ({
            otherPrintingFacility: item.otherPrintingFacility,
            maxOfRepeatSize: _.toString(item.maxOfRepeatSize) === '0' ? '' : _.toString(item.maxOfRepeatSize),
            noOfPrintingMachine: _.toString(item.noOfPrintingMachine) === '0' ? '' : _.toString(item.noOfPrintingMachine),
            maxNoOfColors: _.toString(item.maxNoOfColors) === '0' ? '' : _.toString(item.maxNoOfColors),
            printingFacility: item.printingFacility,
            maxWidth: item.maxWidth
          }))
          this.printingTypes = printingList.pts.map(item => ({
            otherPrintingType: item.otherPrintingType,
            printingType: item.printingType,
            monthlyCapacity: _.toString(item.monthlyCapacity) === '0' ? null : _.toString(item.monthlyCapacity),
            monthlyCapacityUnit: item.monthlyCapacityUnit
          }))
          for (let i = 0; i < this.printingFacilities.length; i++) {
            this.printingFacilities[i].printingFacility = {
              code: this.printingFacilities[i].printingFacility,
              name: this.printingFacilities[i].printingFacility
            }
          }
          if (this.printingFacilities.length === 0) {
            this.addPrintingFacilities(this.printingFacilities)
          }
          for (let i = 0; i < this.printingTypes.length; i++) {
            this.printingTypes[i].printingType = {
              code: this.printingTypes[i].printingType,
              name: this.printingTypes[i].printingType
            }
            this.printingTypes[i].monthlyCapacityUnit = {
              code: this.printingTypes[i].monthlyCapacityUnit,
              name: this.printingTypes[i].monthlyCapacityUnit
            }
          }
          if (this.printingTypes.length === 0) {
            this.addPrintingTypes(this.printingTypes)
          }
        })
      }
    },
    mounted () {
      this.loadData()
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