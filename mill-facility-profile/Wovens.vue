<template>
<div>
  <div v-if="facilityCapabilities.indexOf('WOVENS_NON_DENIM_WEAVING') === -1&&facilityCapabilities.indexOf('WOVENS_NON_DENIM_DYEIN') === -1&&facilityCapabilities.indexOf('WOVENS_NON_DENIM_FINISHING') === -1">
    <br/>
    <label class="control-label field-title">You are not required to fill in this section</label>
  </div>  
  <div v-if="facilityCapabilities.indexOf('WOVENS_NON_DENIM_WEAVING') !== -1||facilityCapabilities.indexOf('WOVENS_NON_DENIM_DYEIN') !== -1||facilityCapabilities.indexOf('WOVENS_NON_DENIM_FINISHING') !== -1">
    <div class="form-group">
      <br/>
      <label class="control-label field-title">Do you have Bottom Weight Range?</label>
      <div class="row">
        <div class="col-md-4">
            <input type="radio" value="Y" v-model="form.hasWovenBottomWeightR">
            <label class="option-label">Yes</label>
            <input type="radio" value="N" v-model="form.hasWovenBottomWeightR" style="margin-left:10px;">
            <label class="option-label">No</label>
        </div>
      </div>
      <div class="row" v-if="form.hasWovenBottomWeightR === 'Y'">
        <div class="col-md-8">
          <input type="text" class="form-control input-sm" v-model="form.wovenBottomWeightRange" placeholder="Please specify the bottom weight range">
        </div>
      </div>
    </div>

    <div class="form-group">
      <br/>
      <label class="control-label field-title">Do you have Top Weight Range?</label>
      <div class="row">
        <div class="col-md-4">
            <input type="radio" value="Y" v-model="form.hasWovenTopWeightR">
            <label class="option-label">Yes</label>
            <input type="radio" value="N" v-model="form.hasWovenTopWeightR" style="margin-left:10px;">
            <label class="option-label">No</label>
        </div>
      </div>
      <div class="row" v-if="form.hasWovenTopWeightR === 'Y'">
        <div class="col-md-8">
          <input type="text" class="form-control input-sm" v-model="form.wovenTopWeightRange" placeholder="Please specify the top weight range">
        </div>
      </div>
    </div>

    <div class="form-group">
      <br/>
      <label class="control-label field-title">Weaving Machines</label>
      <div class="row">
        <div class="col-md-9">
          <div class="row">
            <div v-for="item in weavingMachineTypes" class="col-md-4">
                <input type="checkbox" :value="item.code" v-model="form.weavingMachineTypes">
                <label class="option-label">{{ item.name }}</label>
            </div>
          </div>
        </div>
      </div> 
      <div class="row" v-if="form.weavingMachineTypes.indexOf('OTHERS') !== -1">
        <div class="col-md-8">
          <input type="text" class="form-control input-sm" v-model="form.otherWeavingMachineTypes" placeholder="Please specify the types of weaving machines">
        </div>
      </div>
    </div>

    <div class="form-group">
      <br/>
      <label class="control-label field-title">Weft Insertion Systems </label>
      <div class="row">
        <div class="col-md-9">
          <div class="row">
            <div v-for="item in weftInsertionSystemTypes" class="col-md-4">
                <input type="checkbox" :value="item.code" v-model="form.weftInsertionSystemTypes">
                <label class="option-label">{{ item.name }}</label>
            </div>
          </div>
        </div>
      </div> 
      <div class="row" v-if="form.weftInsertionSystemTypes.indexOf('OTHERS') !== -1">
        <div class="col-md-8">
          <input type="text" class="form-control input-sm" v-model="form.otherWInsertionSystemTypes" placeholder="Please specify the types of weft insertion systems">
        </div>
      </div>    
    </div>

    <div class="form-group">
      <br/>
      <label class="control-label field-title">Do you have Sectional Warping?</label>
      <div class="row">
        <div class="col-md-4">
            <input type="radio" value="Y" v-model="form.hasSectionalWarping">
            <label class="option-label">Yes</label>
            <input type="radio" value="N" v-model="form.hasSectionalWarping" style="margin-left:10px;">
            <label class="option-label">No</label>
            <input type="radio" value="U" v-model="form.hasSectionalWarping" style="margin-left:10px;">
            <label class="option-label">N/A</label>
        </div>
      </div>
    </div>

    <div class="form-group">
      <br/>
      <label class="control-label field-title">What is the maximum width you can make?</label>
      <div class="row">
        <div class="col-md-4">
            <input type="text" class="form-control input-sm" v-model="form.maximumWidth" >
        </div>
      </div>
    </div>    

    <div class="form-group">
      <br/>
      <label class="control-label field-title">Are you capable of producing below fabric?</label>
      <div class="row">
        <div class="col-md-9">
          <div class="row">
            <div v-for="item in fabricTypes" class="col-md-4">
                <input type="checkbox" :value="item.code" v-model="form.fabricTypes">
                <label class="option-label">{{ item.name }}</label>
            </div>
          </div>
        </div>
      </div>      
    </div>

    <div class="form-group">
      <br/>
      <label class="control-label field-title">Dyeing Processes</label>
      <div class="row">
        <div class="col-md-9">
          <div class="row">
            <div v-for="item in wovenDyeingProcesses" class="col-md-4">
                <input type="checkbox" :value="item.code" v-model="form.wovenDyeingProcesses">
                <label class="option-label">{{ item.name }}</label>
            </div>
          </div>
        </div>
      </div>  
      <div class="row" v-if="form.wovenDyeingProcesses.indexOf('OTHERS') !== -1">
        <div class="col-md-8">
          <input type="text" class="form-control input-sm" v-model="form.otherWovenDyeingProcesses" placeholder="Please specify the dyeing processes">
        </div>
      </div>
    </div>

    <div class="form-group">
      <br/>
      <label class="control-label field-title">Dyeing Classes</label>
      <div class="row">
        <div class="col-md-9">
          <div class="row">
            <div v-for="item in dyeingClasses" class="col-md-4">
                <input type="checkbox" :value="item.code" v-model="form.dyeingClasses">
                <label class="option-label">{{ item.name }}</label>
            </div>
          </div>
        </div>
      </div>    
      <div class="row" v-if="form.dyeingClasses.indexOf('OTHERS') !== -1">
        <div class="col-md-8">
          <input type="text" class="form-control input-sm" v-model="form.otherDyeingClasses" placeholder="Please specify the dyeing classes">
        </div>
      </div>
    </div>

    <div class="form-group">
      <br/>
      <label class="control-label field-title">Finishing Processes</label>
      <div class="row">
        <div class="col-md-9">
          <div class="row">
            <div v-for="item in finishingProcesses" class="col-md-4">
                <input type="checkbox" :value="item.code" v-model="form.finishingProcesses">
                <label class="option-label">{{ item.name }}</label>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-if="form.finishingProcesses.indexOf('OTHERS') !== -1">
        <div class="col-md-8">
          <input type="text" class="form-control input-sm" v-model="form.otherFinishingProcesses" placeholder="Please specify the finishing processes">
        </div>
      </div>
    </div>

    <div class="form-group">
      <br/>
      <label class="control-label field-title">Special Chemicals</label>
      <div class="row">
        <div class="col-md-9">
          <div class="row">
            <div v-for="item in specialChemicals" class="col-md-4">
                <input type="checkbox" :value="item.code" v-model="form.specialChemicals">
                <label class="option-label">{{ item.name }}</label>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-if="form.specialChemicals.indexOf('OTHERS') !== -1">
        <div class="col-md-8">
          <input type="text" class="form-control input-sm" v-model="form.otherSpecialChemicals" placeholder="Please specify the special chemicals">
        </div>
      </div>
    </div>

    <div class="form-group">
      <br/>
      <label class="control-label field-title">Sorting Methods</label>
      <div class="row">
        <div class="col-md-9">
          <div class="row">
            <div v-for="item in wovenSortMethods" class="col-md-4">
                <input type="checkbox" :value="item.code" v-model="form.wovenSortMethods">
                <label class="option-label">{{ item.name }}</label>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-if="form.wovenSortMethods.indexOf('OTHERS') !== -1">
        <div class="col-md-8">
          <input type="text" class="form-control input-sm" v-model="form.wovenOtherSortMethods" placeholder="Please specify the sort methods">
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
    getWovens,
    updateWovens
  } from './service'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
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
          weavingMachineTypes: [],
          weftInsertionSystemTypes: [],
          fabricTypes: [],
          wovenDyeingProcesses: [],
          dyeingClasses: [],
          finishingProcesses: [],
          specialChemicals: [],
          wovenSortMethods: []
        },
        weavingMachineTypes: [],
        weftInsertionSystemTypes: [],
        fabricTypes: [],
        wovenDyeingProcesses: [],
        dyeingClasses: [],
        finishingProcesses: [],
        specialChemicals: [],
        wovenSortMethods: []
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
        console.log('Wovens')
        let form = _.cloneDeep(this.form)
        form.id = _.toInteger(this.recordId)
        let multipleCheck = ['weavingMachineTypes', 'weftInsertionSystemTypes', 'fabricTypes', 'wovenDyeingProcesses', 'dyeingClasses', 'finishingProcesses', 'specialChemicals', 'wovenSortMethods']
        for (let i = 0; i < multipleCheck.length; i++) {
          form[multipleCheck[i]] = form[multipleCheck[i]].join(',')
        }
        updateWovens({
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
      let multipleCheck = ['weavingMachineTypes', 'weftInsertionSystemTypes', 'fabricTypes', 'wovenDyeingProcesses', 'dyeingClasses', 'finishingProcesses', 'specialChemicals', 'wovenSortMethods']
      let multipleCheckOptions = ['WEAVING_MACHINE_TYPE', 'WEFT_INSERTION_SYSTEM_TYPE', 'FABRIC_TYPE', 'WOVEN_DYEING_PROCESS', 'DYEING_CLASS', 'FINISHING_PROCESS', 'SPECIAL_CHEMICAL', 'SORT_METHOD']
      getWovens({
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