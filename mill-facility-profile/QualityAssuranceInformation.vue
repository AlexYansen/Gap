<template>
     <div>
        <div class="form-group">
            <br/>
            <label class="field-title">Does the facility have an accredited Quality Management System in place?</label>
            <div class="row">       
                <div class="col-md-4">                  
                    <input type="radio"  value="Y" v-model="info.hasAccreditedQms">
                    <label class="option-label">Yes</label>
                    <input type="radio"  value="N"  style="margin-left:10px;" v-model="info.hasAccreditedQms">  
                    <label class="option-label">No</label>                          
                </div>    
             </div>
             <div class="row" v-if="info.hasAccreditedQms == 'Y'">
                <div class="col-md-12"> 
                    Please attach related certificates in Certifications section
                </div>
            </div>
        </div>
         <div class="form-group">
            <br/>
            <label class="control-label field-title">Does the facility have an accredited in-house laboratory for other Brands/Buyers?</label>
            <div class="row">
                <div class="col-md-12">                  
                    <input type="radio"  value="Y" v-model="info.hasAccreditedInLab">
                    <label class="option-label">Yes</label>
                    <input type="radio"  value="N"  style="margin-left:10px;" v-model="info.hasAccreditedInLab">  
                    <label class="option-label">No</label>  
                    <input type="radio"  value="P"  style="margin-left:10px;" v-model="info.hasAccreditedInLab">  
                    <label class="option-label">No, laboratory at parent company level</label>  
                    <input type="radio"  value="U"  style="margin-left:10px;" v-model="info.hasAccreditedInLab">  
                    <label class="option-label">N/A</label>                       
                </div>    
            </div>  
            <div class="row" v-if="info.hasAccreditedInLab == 'U'">
                <div class="col-md-8">
                    <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="info.reasonForNaInLab" placeholder="Please specify the reason for N/A">
                </div>
            </div>      
            <div class="row" v-if="info.hasAccreditedInLab == 'Y'">
                <div class="col-md-10">
                    <table class="table">
                        <tbody>
                            <tr class="trHeader">
                                <th style="text-align: center; width:37%;" class="thcss">Brand/Buyer</th>
                                <th style="text-align: center; width:37%;" class="thcss">Accrediting Agency</th>
                                <th style="text-align: center; width:18%;" class="thcss">Expiration Date</th>
                                <th style="text-align: center; width:8%;" class="thcss">
                                    <a class="btn" @click="addBuyers1">
                                        <i class="fa fa-plus"></i>Add</a>
                                </th>
                            </tr>      
                            <tr v-for="item in info.buyers1" class="trBody">
                                <td class="thBody">
                                    <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="item.buyer">
                                </td>
                                <td class="thBody">
                                    <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="item.accreditingAgency">
                                </td>
                                <td class="thBody">
                                    <Datepicker style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="item.expirationDate">
                                </td>
                                <td style="text-align: center;" class="thBody">
                                    <a class="btn" @click="deleteBuyers1(item)">
                                        <i class="fa fa-trash"></i>Delete</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>            
        </div>       

        <div class="form-group">
            <br/>
            <label class="control-label field-title">What kind of inspection system is the facility using?</label>
            <div class="row">
                <div class="col-md-9">
                <div class="row">
                    <div v-for="item in inspectionSystem" class="col-md-4">
                        <input type="checkbox" :value="item.code" v-model="info.inspectionSystems">
                        <label class="option-label">{{ item.name }}</label>
                    </div>
                </div>
                </div>
            </div>             
            <!-- <div class="row">
                <div class="col-md-6">                  
                    <multi-select v-model="info.inspectionSystems" :options="inspectionSystem" :is-multiple="true" id-field="code" label-field="name"/>                      
                </div>    
            </div>   -->           
            <div class="row" v-if="info.inspectionSystems.indexOf('OTHERS') !== -1">
                <div class="col-md-8">
                    <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="info.otherInspectionSystems" placeholder="Please specify the inspection systems">
                </div>
            </div>
            <br v-if="info.inspectionSystems.indexOf('OTHERS') !== -1 && info.inspectionSystems.indexOf('NA') !== -1" />
            <div class="row" v-if="info.inspectionSystems.indexOf('NA') !== -1">
                <div class="col-md-8">
                    <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="info.reasonForNaInspSystem" placeholder="Please specify the reason for N/A">
                </div>
            </div>                   
        </div>

        <div class="form-group">
            <br/>
            <label class="control-label field-title">Does the facility conduct any Color Assessment?</label>
            <div class="row">
                <div class="col-md-4">                  
                    <input type="radio"  value="Y" v-model="info.hasColorAssessment">
                    <label class="option-label">Yes</label>
                    <input type="radio"  value="N"  style="margin-left:10px;" v-model="info.hasColorAssessment">  
                    <label class="option-label">No</label>  
                    <input type="radio"  value="U"  style="margin-left:10px;" v-model="info.hasColorAssessment">  
                    <label class="option-label">N/A</label>                       
                </div>    
            </div>  
            <div class="row" v-if="info.hasColorAssessment == 'U'">
                <div class="col-md-8">
                    <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="info.reasonForNaColAssessment" placeholder="Please specify the reason for N/A">
                </div>
            </div>        
        </div>

        <div  v-if="info.hasColorAssessment == 'Y'">
          <div class="form-group">
            <br/>
            <label class="control-label field-title">Number of Colorists</label>
            <div class="row">
                <div class="col-md-2">
                    <vue-numeric type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" value={info.noOfColorists} v-model="info.noOfColorists"/>
                </div>
            </div>
          </div>
          <div class="form-group">
            <br/>
            <label class="control-label field-title">Do you conduct Munsell 100 Hue Test for each colorist?</label>
            <div class="row">
                <div class="col-md-5">
                    <input type="radio"  value="Y" v-model="info.conductMunsellTest">
                    <label class="option-label">Yes</label>
                    <input type="radio"  value="N" v-model="info.conductMunsellTest" style="margin-left:10px;">
                    <label class="option-label">No</label>
                </div>
            </div>
            <div class="row" v-if="info.conductMunsellTest === 'Y'">
                <div class="col-md-4">
                    <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="info.munsellTestAlFreq" placeholder="Please specify the frequency of acceptance level">
                </div>
            </div>
            <!-- <div class="row">
                <br/>
                <label class="col-md-12">If you do not conduct Munsell 100 Hue Test, please describe what tests are conducted to tick the color sensitivity of the colorist</label>
            </div> -->
            <div class="row" v-if="info.conductMunsellTest === 'N'">
                <div class="col-md-8">
                    <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="info.colorSensitivityTests" placeholder="Please specify the tests conducted to tick the color sensitivity of the colorist">
                </div>
            </div> 
          </div>
          <div class="form-group">
            <div class="row">
                <br/>
                <label class="col-md-3 field-title">No. of Lightboxes</label>
                <label class="col-md-5 field-title">Model</label>
            </div>
            <div class="row">
                <div class="col-md-3">
                    <vue-numeric type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" value={info.noOfLighrboxes} v-model="info.noOfLighrboxes"/>
                </div>
                <div class="col-md-5">
                    <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="info.modelOfLightboxes">
                </div>
            </div>
          </div>
          <div class="form-group">
            <br/>
            <label class="field-title">Have your lightboxes been accredited annually?</label>           
            <div class="row">
                <div class="col-md-5">
                    <input type="radio"  value="Y" v-model="info.lightboxAccreditedAnnually">
                    <label class="option-label">Yes</label>
                    <input type="radio"  value="N" v-model="info.lightboxAccreditedAnnually" style="margin-left:10px;">
                    <label class="option-label">No</label>
                </div>
            </div>
            <div class="row" v-if="info.lightboxAccreditedAnnually == 'Y'">
                <div class="col-md-8">
                    <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="info.lightboxServiceProvider"  placeholder="Please specify the service provider">
                </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row">
                <br/>
                <label class="col-md-3 field-title">No. of Spectrophotometers</label>
                <label class="col-md-5 field-title">Model</label>
            </div>
            <div class="row">
                <div class="col-md-3">
                    <vue-numeric type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" value={info.noOfSpectrophotometers} v-model="info.noOfSpectrophotometers"/>
                </div>
                <div class="col-md-5">
                    <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="info.modelOfSpectrophotometers">
                </div>
            </div>
          </div>
          <div class="form-group">
            <br/>
            <label class=" field-title">Have your Spectrophotometers been accredited annually?</label>            
            <div class="row">
                <div class="col-md-5">
                    <input type="radio"  value="Y" v-model="info.spmeterAccreditedAnnually">
                    <label class="option-label">Yes</label>
                    <input type="radio"  value="N" v-model="info.spmeterAccreditedAnnually" style="margin-left:10px;">
                    <label class="option-label">No</label>
                </div>
            </div>
            <div class="row" v-if="info.spmeterAccreditedAnnually == 'Y'">
                <div class="col-md-8">
                    <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="info.spmeterServiceProvider"  placeholder="Please specify the service provider">
                </div>
            </div> 
          </div>
          <div class="form-group">
            <br/>
            <label class="field-title">Do you use any Color QC software?</label>          
            <div class="row">
                <div class="col-md-5">
                    <input type="radio"  value="Y" v-model="info.useColorQaSoftware">
                    <label class="option-label">Yes</label>
                    <input type="radio"  value="N" v-model="info.useColorQaSoftware" style="margin-left:10px;">
                    <label class="option-label">No</label>
                </div>
            </div> 
            <div class="row" v-if="info.useColorQaSoftware == 'Y'">
                <div class="col-md-8">
                    <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="info.colorQaSoftwareAndVer"  placeholder="Please specify the sofware and version">
                </div>
            </div>
          </div>
          <div class="form-group">
            <br/>
            <label class="field-title">Do you have a Conditioning Cabinet?</label>         
            <div class="row">
                <div class="col-md-5">
                    <input type="radio"  value="Y" v-model="info.hasConditionalCabinet">
                    <label class="option-label">Yes</label>
                    <input type="radio"  value="N" v-model="info.hasConditionalCabinet" style="margin-left:10px;">
                    <label class="option-label">No</label>
                </div>
            </div>
          </div>  
          <div class="form-group">
            <br/>
            <label class="field-title">Has your Conditioning Cabinet been accredited yearly?</label>            
            <div class="row">
                <div class="col-md-5">
                    <input type="radio"  value="Y" v-model="info.cabinetAccreditedAnnually">
                    <label class="option-label">Yes</label>
                    <input type="radio"  value="N" v-model="info.cabinetAccreditedAnnually" style="margin-left:10px;">
                    <label class="option-label">No</label>
                </div>
            </div>
            <div class="row" v-if="info.cabinetAccreditedAnnually == 'Y'">
                <div class="col-md-8">
                    <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="info.cabinetServiceProvider"  placeholder="Please specify the service provider">
                </div>
            </div>
          </div>  
        </div>

        <div class="form-group">
            <br/>
            <label class="field-title">Is the facility certified to self-approve lab dips, 1st bulk and bulk shade bands for other Brands/Buyers?</label>           
            <div class="row">
                <div class="col-md-5">
                    <input type="radio"  value="Y" v-model="info.certifyToFirstBulk">
                    <label class="option-label">Yes</label>
                    <input type="radio"  value="N" v-model="info.certifyToFirstBulk" style="margin-left:10px;">
                    <label class="option-label">No</label>
                </div>
            </div> 
            <div class="row" v-if="info.certifyToFirstBulk == 'Y'">
                <div class="col-md-10">
                    <table class="table">
                        <tbody>
                            <tr class="trHeader">
                                <th style="text-align: center; width:37%;" class="thcss">Brand/Buyer</th>
                                <th style="text-align: center; width:37%;" class="thcss">Accrediting Agency</th>
                                <th style="text-align: center; width:18%;" class="thcss">Expiration Date</th>
                                <th style="text-align: center; width:8%;" class="thcss">
                                    <a class="btn" @click="addBuyers2">
                                        <i class="fa fa-plus"></i>Add</a>
                                </th>
                            </tr>      
                            <tr v-for="item in info.buyers2" class="trBody">
                                <td class="thBody">
                                    <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="item.buyer">
                                </td>
                                <td class="thBody">
                                    <input type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="item.accreditingAgency">
                                </td>
                                <td class="thBody">
                                    <Datepicker style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="item.expirationDate">
                                </td>
                                <td style="text-align: center;" class="thBody">
                                    <a class="btn" @click="deleteBuyers2(item)">
                                        <i class="fa fa-trash"></i>Delete</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>    
        </div>

        <!-- <div>
            <button class="btn btn-primary" @click="save" >Save</button>
        </div>        -->

    </div> 
</template>

<script>
  import _ from 'lodash'
  import VueNumeric from 'vue-numeric'
  import MultiSelect from 'src/components/common/MultiSelect'
  import Datepicker from 'src/components/common/Datepicker'
  import moment from 'moment'
  import {
    USER,
    ALERT_SUCCESS,
    ALERT_DANGER
  } from 'src/store/definition'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import {
    getMillFacilityQualityAssuranceInfo,
    getDropDownList,
    updateQualityAssuranceInfo,
    insertMillFacilityBuyers
  } from './service'
  
  export default {
    components: {
      MultiSelect,
      Datepicker,
      VueNumeric
    },
    props: {
      recordId: {
        required: true
      },
      onSaveBtnClicked: {
        type: Boolean,
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
        info: {
          hasAccreditedQms: null,
          hasAccreditedInLab: null,
          reasonForNaInLab: null,
          inspectionSystems: [],
          otherInspectionSystems: null,
          reasonForNaInspSystem: null,
          hasColorAssessment: null,
          reasonForNaColAssessment: null,
          noOfColorists: null,
          conductMunsellTest: null,
          munsellTestAlFreq: null,
          colorSensitivityTests: null,
          noOfLighrboxes: null,
          modelOfLightboxes: null,
          lightboxAccreditedAnnually: null,
          lightboxServiceProvider: null,
          noOfSpectrophotometers: null,
          modelOfSpectrophotometers: null,
          spmeterAccreditedAnnually: null,
          spmeterServiceProvider: null,
          useColorQaSoftware: null,
          colorQaSoftwareAndVer: null,
          hasConditionalCabinet: null,
          cabinetAccreditedAnnually: null,
          cabinetServiceProvider: null,
          certifyToFirstBulk: null,
          buyers1: [],
          buyers2: []
        },
        inspectionSystem: []
      }
    },
    methods: {
      ...mapActions({
        alertSuccess: ALERT_SUCCESS,
        alertDanger: ALERT_DANGER
      }),
      addBuyers1 () {
        this.info.buyers1.push({
          type: 1,
          buyer: null,
          accreditingAgency: null,
          expirationDate: null
        //   expirationDate: moment().format('YYYY-MM-DD')
        })
      },
      deleteBuyers1 (item) {
        this.info.buyers1 = this.info.buyers1.filter(buyer => buyer !== item)
      },
      addBuyers2 () {
        this.info.buyers2.push({
          type: 2,
          buyer: null,
          accreditingAgency: null,
          expirationDate: null
        //   expirationDate: moment().format('YYYY-MM-DD')
        })
      },
      deleteBuyers2 (item) {
        this.info.buyers2 = this.info.buyers2.filter(buyer => buyer !== item)
      },
      save () {
        console.log('Quality')
        for (let i = 0; i < this.info.buyers1.length; i++) {
          if (this.info.buyers1[i].buyer === undefined && this.info.buyers1[i].accreditingAgency === undefined && this.info.buyers1[i].expirationDate === undefined) {
            // console.log(this.functions[i])
            this.deleteBuyers1(this.info.buyers1[i])
          }
        }
        for (let i = 0; i < this.info.buyers2.length; i++) {
          if (this.info.buyers2[i].buyer === undefined && this.info.buyers2[i].accreditingAgency === undefined && this.info.buyers2[i].expirationDate === undefined) {
            // console.log(this.functions[i])
            this.deleteBuyers2(this.info.buyers2[i])
          }
        }
        let info = _.cloneDeep(this.info)
        info.id = _.toInteger(this.recordId)
        info.noOfColorists = _.toInteger(this.info.noOfColorists)
        info.noOfLighrboxes = _.toInteger(this.info.noOfLighrboxes)
        info.noOfSpectrophotometers = _.toInteger(this.info.noOfSpectrophotometers)
        // if (this.info.inspectionSystems != null) {
        //   info.inspectionSystems = this.info.inspectionSystems.map(item => item.code).join(',')
        // }
        info.inspectionSystems = info.inspectionSystems.join(',')
        updateQualityAssuranceInfo({
          token: this.user.token,
          info: info
        }).then(() => {
        //   this.alertSuccess({
        //     message: 'Save successfully.'
        //   })
        }).catch(({ message }) => {
          this.alertDanger({
            message
          })
        })
        let buyers = []
        this.info.buyers1.forEach(item => {
          buyers.push(item)
        })
        this.info.buyers2.forEach(item => {
          buyers.push(item)
        })
        buyers = buyers.map(buyer => ({
          ...buyer,
          expirationDate: _.toString(buyer.expirationDate).trim() === '' ? null : moment(buyer.expirationDate).format('YYYY-MM-DD')
        }))
        insertMillFacilityBuyers({
          token: this.user.token,
          info: {
            parnetId: _.toInteger(this.recordId),
            buyers: buyers
          }
        })
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
    mounted () {
      Promise.all([
        getMillFacilityQualityAssuranceInfo({
          token: this.user.token,
          recordId: this.recordId
        }),
        getDropDownList({
          token: this.user.token,
          codeTableId: 'INSPECTION_SYSTEM'
        })
      ]).then(([QualityInfo, InspectionSystem]) => {
        this.info = QualityInfo
        this.inspectionSystem = InspectionSystem
        this.info.noOfColorists = this.info.noOfColorists === 0 ? '' : this.info.noOfColorists
        this.info.noOfLighrboxes = this.info.noOfLighrboxes === 0 ? '' : this.info.noOfLighrboxes
        this.info.noOfSpectrophotometers = this.info.noOfSpectrophotometers === 0 ? '' : this.info.noOfSpectrophotometers
        // let inspectionSystemMap = InspectionSystem.reduce((map, ins) => {
        //   map[ins.code] = ins
        //   return map
        // }, {})
        // if (this.info.inspectionSystems != null) {
        //   this.info.inspectionSystems = this.info.inspectionSystems.split(',').map(code => inspectionSystemMap[code]).filter(item => item !== undefined)
        // }
        if (_.isString(this.info.inspectionSystems) && this.info.inspectionSystems.trim() !== '') {
          this.info.inspectionSystems = this.info.inspectionSystems.split(',')
        } else {
          this.info.inspectionSystems = []
        }
        this.info.buyers1 = this.info.buyers1.map(buyer => ({
          ...buyer,
          expirationDate: buyer.expirationDate === null ? null : moment(buyer.expirationDate).format('MM/DD/YYYY')
        }))
        if (this.info.buyers1.length === 0) {
          this.addBuyers1()
        }
        this.info.buyers2 = this.info.buyers2.map(buyer => ({
          ...buyer,
          expirationDate: buyer.expirationDate === null ? null : moment(buyer.expirationDate).format('MM/DD/YYYY')
        }))
        if (this.info.buyers2.length === 0) {
          this.addBuyers2()
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