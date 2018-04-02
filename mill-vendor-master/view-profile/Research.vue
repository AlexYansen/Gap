<template>
    <div>
        <br/>
        <div class="form-group">
            <label class="control-label field-title">Do you have a R&D team?</label>
            <div class="row">
                <div class="col-md-6">
                     <input type="radio"  value="Y" v-model="researchList.has_rd_team">
                     <label class="option-label">Yes</label>
                     <input type="radio"  value="N" v-model="researchList.has_rd_team" style="margin-left:10px;">  
                     <label class="option-label">No</label>            
                </div>
            </div>
        </div>        

        <div class="form-group">
            <br/>
            <label class="control-label field-title">Annual Spending in R&D in term of % of the Total Turnover</label>
            <div class="row">
                <div class="col-md-2">
                    <vue-numeric type="text" v-bind:min="0.00" v-bind:max="100.00" style="height:28px;border-color: #aaa;border-radius: 4px;" value={researchList.annual_rd_spend_percent} v-model="researchList.annual_rd_spend_percent" class="form-control inputs" v-bind:precision="2"/>
                </div>
            </div>
        </div>       

        <div class="form-group">
            <br/>
            <label class="control-label field-title">Do your R&D people attend any trade fairs, technical seminars and symposiums?</label>               
            <div class="row">
                <div class="col-md-6">
                    <input type="radio" value="Y" v-model="researchList.attend_technical_seminars">
                    <label class="option-label">Yes</label>
                    <input type="radio" value="N" v-model="researchList.attend_technical_seminars" style="margin-left:10px;">
                    <label class="option-label">No</label>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8">                  
                    <input v-if="researchList.attend_technical_seminars === 'Y'" type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;"  v-model="researchList.technical_seminar_list" placeholder="Please specify the trade fairs, technical seminars and symposiums">
                </div>
            </div>
        </div>

        <div class="form-group">
            <br>
            <label class="control-label field-title">Number of Employees</label>
            <div class="row">
                <div class="col-md-4">
                    <table class="table">
                        <tbody>
                            <tr class="trHeader">
                                <th style="width: 50%; text-align: center;" class="thcss"></th>
                                <th style="width: 50%; text-align: center;" class="thcss">No. of Employees</th>
                            </tr>
                            <tr class="trBody">
                                <th style="text-align: center;" class="th-title">
                                    Research & Development
                                </th>
                                <td style="text-align: center;" class="thBody">
                                   <!--  <a>2046205</a> --> 
                                    <vue-numeric type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" value={researchList.no_of_rd_employees} v-model="researchList.no_of_rd_employees"/>
                                </td>
                            </tr>
                            <tr class="trBody">
                                <th style="text-align: center;" class="th-title">
                                    Design
                                </th>
                                <td style="text-align: center;" class="thBody">
                                    <!--  <a>2046351</a>   -->
                                    <vue-numeric type="text" class="form-control" style="height:28px;border-color: #aaa;border-radius: 4px;" value={researchList.no_of_design_employees} v-model="researchList.no_of_design_employees"/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>        

        <div class="form-group">
            <label class="control-label field-title">Do you have CAD making capabilities?</label>                
            <div class="row">
                <div class="col-md-6">
                    <input type="radio" value="Y" v-model="researchList.has_cad_making_capabilities">
                    <label class="option-label">Yes</label>
                    <input type="radio" value="N" v-model="researchList.has_cad_making_capabilities" style="margin-left:10px;">
                    <label class="option-label">No</label>
                </div>
            </div>         
            <div class="row">
                <div class="col-md-8">                  
                    <input onkeypress="return event.keyCode>=48&&event.keyCode<=57" ng-pattern="/[^a-zA-Z]/" v-if="researchList.has_cad_making_capabilities === 'Y'" class="form-control inputs" style="height:28px;border-color: #aaa;border-radius: 4px;" v-model="researchList.no_of_cad_employees" placeholder="Please specify the no. of CAD employees"/>
                </div>
            </div>
        </div>

        <div>
             <!-- <button class="btn btn-primary" @click="save" >Save</button> -->
        </div>

    </div>
</template>

<script>
  import _ from 'lodash'
  import VueNumeric from 'vue-numeric'
  import {
    saveResearchDevelopment,
    getResearchDevelopment
  } from '../service'
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
        researchList: [],
        has_rd_team: null,
        annual_rd_spend_percent: null,
        attend_technical_seminars: null,
        technical_seminar_list: [],
        no_of_rd_employees: null,
        no_of_design_employees: null,
        has_cad_making_capabilities: null,
        no_of_cad_employees: null
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
      })
    },
    methods: {
      ...mapActions({
        alertSuccess: ALERT_SUCCESS,
        alertDanger: ALERT_DANGER
      }),
      save () {
        console.log('Research')
        if (this.researchList.annual_rd_spend_percent == null) {
          this.researchList.annual_rd_spend_percent = '0'
        }
        let formData = {
          id: _.toInteger(this.vendorProfileId),
          has_rd_team: this.researchList.has_rd_team,
          annual_rd_spend_percent: _.toString(this.researchList.annual_rd_spend_percent),
          attend_technical_seminars: this.researchList.attend_technical_seminars,
          technical_seminar_list: this.researchList.technical_seminar_list,
          no_of_rd_employees: _.toInteger(this.researchList.no_of_rd_employees),
          no_of_design_employees: _.toInteger(this.researchList.no_of_design_employees),
          has_cad_making_capabilities: this.researchList.has_cad_making_capabilities,
          no_of_cad_employees: _.toInteger(this.researchList.no_of_cad_employees)
        }
        if (formData.annual_rd_spend_percent.length === 0) {
          formData.annual_rd_spend_percent = '0'
        }
        saveResearchDevelopment({
          token: this.user.token,
          info: formData
        }).then(() => {
          this.loadData()
        }).catch(({ message }) => {
          this.alertDanger({
            message
          })
        })
      },
      loadData () {
        getResearchDevelopment({
          token: this.user.token,
          millVendorID: this.vendorProfileId
        }).then(ResearchDevelopment => {
          this.researchList = ResearchDevelopment
          this.researchList.no_of_cad_employees = this.researchList.no_of_cad_employees === '0' ? null : this.researchList.no_of_cad_employees
          this.researchList.annual_rd_spend_percent = this.researchList.annual_rd_spend_percent === '0.00' ? '0' : _.toString(this.researchList.annual_rd_spend_percent)
          this.researchList.no_of_rd_employees = this.researchList.no_of_rd_employees === '0' ? '' : this.researchList.no_of_rd_employees
          this.researchList.no_of_design_employees = this.researchList.no_of_design_employees === '0' ? '' : this.researchList.no_of_design_employees
        })
      }
    },
    mounted () {
      this.loadData()
    }

  }
</script>

<style scoped>
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
    font-weight: 400;
  }
</style>