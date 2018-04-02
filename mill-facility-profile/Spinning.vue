<template>
<div>
  <div v-if="facilityCapabilities.indexOf('SPINNING') === -1">
    <br/>
    <label class="control-label field-title">You are not required to fill in this section</label>
  </div>
  <div v-if="facilityCapabilities.indexOf('SPINNING') !== -1">
    <div class="form-group">
      <br/>
      <label class="control-label field-title">What percentage of your yarn consumption do you spin in-house?</label>
      <div class="row">
        <div class="col-md-2">
        <vue-numeric v-bind:min="0.00" v-bind:max="100.00" type="text" class="form-control input-sm" value={spinning.yarnComsumptionPercent} v-model="spinning.yarnComsumptionPercent" v-bind:precision="2"/>
        </div>
      </div>
    </div>
    <div class="form-group">
      <br/>
      <label class="control-label field-title">Spinning Methods</label>
      <div class="row">
        <div class="col-md-9">
        <div class="row">
          <div v-for="item in spinningMethods" class="col-md-4">
              <input type="checkbox" :value="item.code" v-model="spinning.spinningMethods">
              <label class="option-label">{{ item.name }}</label>
          </div>
        </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8" v-if="spinning.spinningMethods.indexOf('OTHERS') !== -1">
          <input type="text" class="form-control input-sm" v-model="spinning.otherSpinningMethods" placeholder="Please specify the spinning methods">
        </div>
      </div>
    </div>
    <div class="form-group">
      <br/>
      <label class="control-label field-title">Spinning Methods for Sweater only</label>
      <div class="row">
        <div class="col-md-9">
          <div class="row">
            <div v-for="item in sweaterSpinningMethods" class="col-md-4">
                <input type="checkbox" :value="item.code" v-model="spinning.sweaterSpinningMethods">
                <label class="option-label">{{ item.name }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <br/>
      <label class="control-label field-title">Do you texture polyester or nylon in-house?</label>
      <div class="row">
        <div class="col-md-4">
          <input type="radio" value="Y" v-model="spinning.hasInHousePltNylon">
          <label class="option-label">Yes</label>
          <input type="radio" value="N" v-model="spinning.hasInHousePltNylon" style="margin-left:10px;">
          <label class="option-label">No</label>
        </div>
      </div>
    </div>
    <div class="form-group" v-if="spinning.hasInHousePltNylon === 'Y'">
      <br/>
      <label class="control-label field-title">Texturizing Process Capabilities</label>
      <div class="row">
        <div class="col-md-9">
          <div class="row">
            <div v-for="item in texturizingProcessCaps" class="col-md-4">
                <input type="checkbox" :value="item.code" v-model="spinning.texturingProcessCapabilities">
                <label class="option-label">{{ item.name }}</label>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8" v-if="spinning.hasInHousePltNylon === 'Y' && spinning.texturingProcessCapabilities.indexOf('OTHERS') !== -1">
          <input type="text" class="form-control input-sm" v-model="spinning.otherTexturingProcessCap" placeholder="Please specify the texturizing process capabilities">
        </div>
      </div>
    </div>

    <!-- <div>
      <button class="btn btn-primary" @click="save">Save</button>
    </div>   -->
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
    getMillFacilityProfileSpinning,
    updateMillFacilityProfileSpinning
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
        spinningMethods: [],
        sweaterSpinningMethods: [],
        texturizingProcessCaps: [],
        spinning: {
          yarnComsumptionPercent: null,
          spinningMethods: [],
          otherSpinningMethods: null,
          sweaterSpinningMethods: [],
          hasInHousePltNylon: null,
          texturingProcessCapabilities: [],
          otherTexturingProcessCap: null
        }
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
      shouldShowOtherTexturizingProcessCaps () {
        return this.spinning.hasInHousePltNylon === 'Y' && this.spinning.texturingProcessCapabilities.indexOf('OTHERS') !== -1
      },
      save () {
        console.log('Spinning')
        let form = _.cloneDeep(this.spinning)
        form['ID'] = _.toInteger(this.recordId)
        if (form.yarnComsumptionPercent == null || _.toString(form.yarnComsumptionPercent).trim() === '') {
          form.yarnComsumptionPercent = '0'
        }
        form.yarnComsumptionPercent = _.toString(form.yarnComsumptionPercent)
        let multipleCheck = ['spinningMethods', 'sweaterSpinningMethods', 'texturingProcessCapabilities']
        for (let i = 0; i < multipleCheck.length; i++) {
          form[multipleCheck[i]] = form[multipleCheck[i]].join(',')
        }
        // form.spinningMethods = form.spinningMethods ? form.spinningMethods.map(item => item.code).join(',') : null
        // form.sweaterSpinningMethods = form.sweaterSpinningMethods ? form.sweaterSpinningMethods.map(item => item.code).join(',') : null
        // form.texturingProcessCapabilities = form.texturingProcessCapabilities ? form.texturingProcessCapabilities.map(item => item.code).join(',') : null
        updateMillFacilityProfileSpinning({
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
        getDropDownList({
          token: this.user.token,
          codeTableId: 'SPINNING_METHOD'
        }),
        getDropDownList({
          token: this.user.token,
          codeTableId: 'SWEATER_SPINNING_METHOD'
        }),
        getDropDownList({
          token: this.user.token,
          codeTableId: 'TEXTURIZING_PROCESS'
        }),
        getMillFacilityProfileSpinning({
          token: this.user.token,
          id: _.toInteger(this.recordId)
        })
      ]).then(([spinningMethods, sweaterSpinningMethods, texturizingProcessCaps, spinning]) => {
        let multipleCheck = ['spinningMethods', 'sweaterSpinningMethods', 'texturingProcessCapabilities']
        for (let i = 0; i < multipleCheck.length; i++) {
          if (_.isString(spinning[multipleCheck[i]]) && spinning[multipleCheck[i]].trim() !== '') {
            spinning[multipleCheck[i]] = spinning[multipleCheck[i]].split(',')
          } else {
            spinning[multipleCheck[i]] = []
          }
        }
        if (_.toString(spinning.yarnComsumptionPercent) === '0') {
          spinning.yarnComsumptionPercent = ''
        }
        // const smMap = spinningMethods.reduce((map, item) => {
        //   map[item.code] = item
        //   return map
        // }, {})
        // const ssmMap = sweaterSpinningMethods.reduce((map, item) => {
        //   map[item.code] = item
        //   return map
        // }, {})
        // const tpcMap = texturizingProcessCaps.reduce((map, item) => {
        //   map[item.code] = item
        //   return map
        // }, {})
        this.spinningMethods = spinningMethods
        this.sweaterSpinningMethods = sweaterSpinningMethods
        this.texturizingProcessCaps = texturizingProcessCaps
        this.spinning = _.cloneDeep(spinning)
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
  .field-title {
    font-size: 15px;
  }
  .option-label {
    font-weight: 400;
  }
</style>