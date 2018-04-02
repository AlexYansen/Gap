<template>
<div>
  <div v-if="facilityCapabilities.indexOf('WOVENS_DENIM_WEAVING') === -1&&facilityCapabilities.indexOf('WOVENS_DENIM_DYEING') === -1&&facilityCapabilities.indexOf('WOVENS_DENIM_FINISHING') === -1">
    <br/>
    <label class="control-label field-title">You are not required to fill in this section</label>
  </div>
  <div v-if="facilityCapabilities.indexOf('WOVENS_DENIM_WEAVING') !== -1||facilityCapabilities.indexOf('WOVENS_DENIM_DYEING') !== -1||facilityCapabilities.indexOf('WOVENS_DENIM_FINISHING') !== -1">
    <div class="form-group">
      <br/>
      <label class="control-label field-title">Do you have Bottom Weight Range?</label>
      <div class="row">
        <div class="col-md-4">
            <input type="radio" value="Y" v-model="form.hasDenimBttomWeightR">
            <label class="option-label">Yes</label>
            <input type="radio" value="N" v-model="form.hasDenimBttomWeightR" style="margin-left:10px;">
            <label class="option-label">No</label>
        </div>
      </div>
      <div class="row" v-if="form.hasDenimBttomWeightR === 'Y'">
        <div class="col-md-8">
          <input type="text" class="form-control input-sm" v-model="form.denimBottomWeightRange" placeholder="Please specify the bottom weight range">
        </div>
      </div>
    </div>

    <div class="form-group">
      <br/>
      <label class="control-label field-title">Do you have Top Weight Range?</label>
      <div class="row">
        <div class="col-md-4">
            <input type="radio" value="Y" v-model="form.hasDenimTopWeightR">
            <label class="option-label">Yes</label>
            <input type="radio" value="N" v-model="form.hasDenimTopWeightR" style="margin-left:10px;">
            <label class="option-label">No</label>
        </div>
      </div>
      <div class="row" v-if="form.hasDenimTopWeightR === 'Y'">
        <div class="col-md-8">
          <input type="text" class="form-control input-sm" v-model="form.denimTopWeightRange" placeholder="Please specify the top weight range">
        </div>
      </div>
    </div>

    <div class="form-group">
      <br/>
      <label class="control-label field-title">Weave Type</label>
      <div class="row">
        <div class="col-md-9">
          <div class="row">
            <div v-for="item in weaveTypes" class="col-md-4">
                <input type="checkbox" :value="item.code" v-model="form.weaveTypes">
                <label class="option-label">{{ item.name }}</label>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-if="form.weaveTypes.indexOf('OTHERS') !== -1">
        <div class="col-md-8">
          <input type="text" class="form-control input-sm" v-model="form.otherWeaveTypes" placeholder="Please specify the weave types">
        </div>
      </div>
    </div>

    <div class="form-group">
      <br/>
      <label class="control-label field-title">Dyeing Processes</label>
      <div class="row">
        <div class="col-md-9">
          <div class="row">
            <div v-for="item in denimDyeingProcesses" class="col-md-4">
                <input type="checkbox" :value="item.code" v-model="form.denimDyeingProcesses">
                <label class="option-label">{{ item.name }}</label>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-if="form.denimDyeingProcesses.indexOf('OTHERS') !== -1">
        <div class="col-md-8">
          <input type="text" class="form-control input-sm" v-model="form.otherDenimDyeingProcesses" placeholder="Please specify the dyeing processes">
        </div>
      </div>
    </div>

    <div class="form-group">
      <br/>
      <label class="control-label field-title">What is your Right-First-Time dyeing rate in the last year (%)?</label>
      <div class="row">
        <div class="col-md-2">
          <!-- <input type="text" class="form-control input-sm" v-model="form.denimRftdRateLastYear" v-number-only> -->
          <vue-numeric v-bind:min="0.00" v-bind:max="100.00" class="form-control input-sm" placeholder="only number allowed" value={form.denimRftdRateLastYear} v-model="form.denimRftdRateLastYear"  v-bind:precision="2"/>
        </div>
      </div>
    </div>

    <div class="form-group">
       <br/>
      <label class="control-label field-title">Denim Capabilities – Dyestuff</label>
      <div class="row">
        <div class="col-md-9">
          <div class="row">
            <div v-for="item in denimCapDyestuff" class="col-md-4">
                <input type="checkbox" :value="item.code" v-model="form.denimCapDyestuff">
                <label class="option-label">{{ item.name }}</label>
            </div>
          </div>
        </div>
      </div>  
      <div class="row" v-if="form.denimCapDyestuff.indexOf('OTHERS') !== -1">
        <div class="col-md-8">
          <input type="text" class="form-control input-sm" v-model="form.otherDenimCapDyestuff" placeholder="Please specify the capabilities">
        </div>
      </div>
    </div>

    <div class="form-group">
      <br/>
      <label class="control-label field-title">Denim Capabilities - Mechanical & Chemical Finishing</label>
      <div class="row">
        <div class="col-md-9">
          <div class="row">
            <div v-for="item in denimCapMcf" class="col-md-4">
                <input type="checkbox" :value="item.code" v-model="form.denimCapMcf">
                <label class="option-label">{{ item.name }}</label>
            </div>
          </div>
        </div>
      </div>   
      <div class="row" v-if="form.denimCapMcf.indexOf('OTHERS') !== -1">
        <div class="col-md-8">
          <input type="text" class="form-control input-sm" v-model="form.otherDenimCapMcf" placeholder="Please specify the capabilities">
        </div>
      </div>
    </div>

    <div class="form-group">
      <br/>
      <label class="control-label field-title">Sorting Methods</label>
      <div class="row">
        <div class="col-md-9">
          <div class="row">
            <div v-for="item in denimSortMethods" class="col-md-4">
                <input type="checkbox" :value="item.code" v-model="form.denimSortMethods">
                <label class="option-label">{{ item.name }}</label>
            </div>
          </div>
        </div>
      </div> 
      <div class="row" v-if="form.denimSortMethods.indexOf('OTHERS') !== -1">
        <div class="col-md-8">
          <input type="text" class="form-control input-sm" v-model="form.denimOtherSortMethods" placeholder="Please specify the sort methods">
        </div>
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
  import {
    USER,
    ALERT_SUCCESS,
    ALERT_DANGER
  } from 'src/store/definition'
  import {
    getDropDownList,
    getMillFacilityProfileDenim,
    updateMillFacilityProfileDenim
  } from './service'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import VueNumeric from 'vue-numeric'
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
      },
      facilityCapabilities: {
        required: true
      }
    },
    data () {
      return {
        form: {
          weaveTypes: [],
          denimDyeingProcesses: [],
          denimCapDyestuff: [],
          denimCapMcf: [],
          denimSortMethods: []
        },
        weaveTypes: [],
        denimDyeingProcesses: [],
        denimCapDyestuff: [],
        denimCapMcf: [],
        denimSortMethods: []
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
        console.log('Denim')
        let form = _.cloneDeep(this.form)
        form.ID = _.toInteger(this.recordId)
        let multipleCheck = ['weaveTypes', 'denimDyeingProcesses', 'denimCapDyestuff', 'denimCapMcf', 'denimSortMethods']
        for (let i = 0; i < multipleCheck.length; i++) {
          form[multipleCheck[i]] = form[multipleCheck[i]].join(',')
        }
        form.denimRftdRateLastYear = _.toString(form.denimRftdRateLastYear).trim()
        if (form.denimRftdRateLastYear == null || _.toString(form.denimRftdRateLastYear).trim() === '') {
          form.denimRftdRateLastYear = '0'
        }
        updateMillFacilityProfileDenim({
          token: this.user.token,
          info: form
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
      let multipleCheck = ['weaveTypes', 'denimDyeingProcesses', 'denimCapDyestuff', 'denimCapMcf', 'denimSortMethods']
      let multipleCheckOptions = ['WEAVE_TYPE', 'DENIM_DYEING_PROCESS', 'DENIM_CAP_DYESTUFF', 'DENIM_CAP_MCF', 'SORT_METHOD']
      getMillFacilityProfileDenim({
        token: this.user.token,
        recordId: this.recordId
      }).then(form => {
        for (let i = 0; i < multipleCheck.length; i++) {
          if (_.isString(form[multipleCheck[i]]) && form[multipleCheck[i]].trim() !== '') {
            form[multipleCheck[i]] = form[multipleCheck[i]].split(',')
          } else {
            form[multipleCheck[i]] = []
          }
        }
        if (form.denimRftdRateLastYear === 0) {
          form.denimRftdRateLastYear = ''
        }
        this.form = form
      })
      for (let i = 0; i < multipleCheckOptions.length; i++) {
        getDropDownList({
          token: this.user.token,
          codeTableId: multipleCheckOptions[i]
        }).then(list => {
          this[multipleCheck[i]] = list
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