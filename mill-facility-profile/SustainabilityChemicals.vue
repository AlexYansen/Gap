<template>
  <div>
    <div class="form-group">
      <br/>
      <label class="control-label field-title">Has this facility responded to the Higg Index Facility Environmental Module (FEM) in the past year?</label>
      <div class="row">
        <div class="col-md-4">
            <input type="radio" value="Y" v-model="form.respondToFemPastYear">
            <label class="option-label">Yes</label>
            <input type="radio" value="N" v-model="form.respondToFemPastYear" style="margin-left:10px;">
            <label class="option-label">No</label>
        </div>
      </div>
      <div class="row" v-if="form.respondToFemPastYear === 'Y'">
        <div class="col-md-3">
          <input type="text" onkeypress="return event.keyCode>=48&&event.keyCode<=57" ng-pattern="/[^a-zA-Z]/" class="form-control input-sm" v-model="form.higgProfileNumber" placeholder="Please specify the Higg Profile Number">
        </div>
      </div>
    </div>
    <div class="form-group">
       <br/>
      <label class="control-label field-title">Do you recycle your wastewater?</label>
      <div class="row">
        <div class="col-md-4">
          <input type="radio" value="Y" v-model="form.recycleWasteWater">
          <label class="option-label">Yes</label>
          <input type="radio" value="N" v-model="form.recycleWasteWater" style="margin-left:10px;">
          <label class="option-label">No</label>
        </div>
      </div>
      <div class="row" v-if="form.recycleWasteWater === 'Y'">
        <div class="col-md-3">
          <input type="text" onkeypress="return event.keyCode>=48&&event.keyCode<=57" ng-pattern="/[^a-zA-Z]/" class="form-control input-sm" v-model="form.recycleWaterPercent" placeholder="Please specify the % of wastewater recycled"/>
        </div>
      </div>
    </div>
    <div class="form-group" v-if="form.recycleWasteWater === 'Y'">
      <br/>
      <label class="control-label field-title">Is your facility Zero Liquid Discharge (ZLD)?</label>
      <div class="row">
        <div class="col-md-4">
          <input type="radio" value="Y" v-model="form.isZeroLiquidDischarge">
          <label class="option-label">Yes</label>
          <input type="radio" value="N" v-model="form.isZeroLiquidDischarge" style="margin-left:10px;">
          <label class="option-label">No</label>
        </div>
      </div>
    </div>
    <div class="form-group">
      <br/>
      <label class="control-label field-title">What sustainable fiber qualities do you offer?</label>
      <div class="row">
        <div class="col-md-9">
          <div class="row">
            <div v-for="item in sustainableFiberQualities" class="col-md-4">
                <input type="checkbox" :value="item.code" v-model="form.sustainableFiberQualities">
                <label class="option-label">{{ item.name }}</label>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-if="form.sustainableFiberQualities.indexOf('OTHERS') !== -1">
        <div class="col-md-8">
          <input type="text" class="form-control input-sm" v-model="form.otherFiberQuality" placeholder=" Please specify the fiber qualities">
        </div>
      </div>
    </div>
    <div class="form-group">
      <br/>
      <label class="control-label field-title">Have you adopted the Manufacturing Restricted Substances List (MRSL)?</label>
      <div class="row">
        <div class="col-md-4">
          <input type="radio" value="Y" v-model="form.adoptMrsl">
          <label class="option-label">Yes</label>
          <input type="radio" value="N" v-model="form.adoptMrsl" style="margin-left:10px;">
          <label class="option-label">No</label>
        </div>
      </div>
    </div>
    <div class="form-group">
      <br/>
      <label class="control-label field-title">Have you completed an inventory of your chemicals and chemical suppliers?</label>
      <div class="row">
        <div class="col-md-4">
          <input type="radio" value="Y" v-model="form.completeChemInv">
          <label class="option-label">Yes</label>
          <input type="radio" value="N" v-model="form.completeChemInv" style="margin-left:10px;">
          <label class="option-label">No</label>
        </div>
      </div>
    </div>
    <div class="form-group">
      <br/>
      <label class="control-label field-title">Do you use any sustainable (e.g. water-saving) processes or technologies in your operations?</label>
      <div class="row">
        <div class="col-md-4">
          <input type="radio" value="Y" v-model="form.useSustainableProcesses">
          <label class="option-label">Yes</label>
          <input type="radio" value="N" v-model="form.useSustainableProcesses" style="margin-left:10px;">
          <label class="option-label">No</label>
        </div>
      </div>
      <div class="row">
          <div class="col-md-8">
            <input v-if="form.useSustainableProcesses === 'Y'" type="text" class="form-control input-sm" v-model="form.sustainableProcesses" placeholder="Please specify the sustainable processes and techniques">
          </div>
        </div>
    </div>

<!-- 
    <div>
      <button class="btn btn-primary" @click="save">Save</button>
    </div> -->

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
    getSustainabilityChemicals,
    updateSustainabilityChemicals
  } from './service'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    components: {
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
    data () {
      return {
        form: {
          id: null,
          facilityId: null,
          respondToFemPastYear: null,
          higgProfileNumber: null,
          recycleWasteWater: null,
          recycleWaterPercent: null,
          isZeroLiquidDischarge: null,
          sustainableFiberQualities: [],
          otherFiberQuality: null,
          adoptMrsl: null,
          completeChemInv: null,
          useSustainableProcesses: null,
          sustainableProcesses: null
        },
        sustainableFiberQualities: []
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
      save () {
        console.log('Sustainability')
        let form = _.cloneDeep(this.form)
        form.id = _.toInteger(this.recordId)
        form.sustainableFiberQualities = form.sustainableFiberQualities.join(',')
        if (form.recycleWaterPercent == null || _.toString(form.recycleWaterPercent).trim() === '') {
          form.recycleWaterPercent = '0'
        } else {
          form.recycleWaterPercent = _.toString(form.recycleWaterPercent)
        }
        updateSustainabilityChemicals({
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
    mounted () {
      getSustainabilityChemicals({
        token: this.user.token,
        id: this.recordId
      }).then(form => {
        if (_.isString(form.sustainableFiberQualities) && form.sustainableFiberQualities.trim() !== '') {
          form.sustainableFiberQualities = form.sustainableFiberQualities.split(',')
        } else {
          form.sustainableFiberQualities = []
        }
        let radioFields = ['respondToFemPastYear', 'recycleWasteWater', 'isZeroLiquidDischarge', 'adoptMrsl', 'completeChemInv', 'useSustainableProcesses']
        radioFields.forEach(key => {
          if (['Y', 'N'].indexOf(form[key]) === -1) {
            form[key] = null
          }
        })
        let textFields = ['higgProfileNumber', 'recycleWaterPercent', 'otherFiberQuality']
        textFields.forEach(key => {
          if (!_.isString(form[key])) {
            form[key] = _.toString(form[key])
          }
        })
        this.form = form
        if (this.form.recycleWaterPercent === '0') {
          this.form.recycleWaterPercent = ''
        }
      })
      getDropDownList({
        token: this.user.token,
        codeTableId: 'SUSTAINABLE_FIBER_QUALITY'
      }).then(list => {
        this.sustainableFiberQualities = list
      })
    }
  }
</script>

<style scoped>
  input.input-sm {
    height: 28px !important;
    border: 1px solid #aaa;
    border-radius: 4px;
  }
  .field-title {
    font-size: 15px;
  }
  .option-label {
    font-weight: 400;
  }
</style>