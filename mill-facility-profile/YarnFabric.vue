<template>
  <div>
    <div class="form-group">
      <br/>
      <label class="control-label field-title">What type of yarn/ fiber do you currently source?</label>
        <div class="row">
          <div class="col-md-8">
            <table class="table">
              <tbody>       
                <tr class="trHeader">
                  <th colspan="2" style="width: 75%;" class="thcss">Type</th>
                  <th style="width: 17%;" class="thcss">% of Total Dollar</th>
                  <th style="width: 8%; text-align: center;" class="thcss">
                    <a class="btn" @click="addYarnFiber">
                      <i class="fa fa-plus"></i>
                      Add
                    </a>
                  </th>
                </tr>       
                <tr v-for="item in yarnFabricList" class="trBody">
                  <td style="width: 25%;" class="thBody">
                    <multi-select :options="types" v-model="item.type" id-field="code" label-field="name"/>
                  </td>
                  <td style="width: 25%;" class="thBody">
                    <input type="text" :disabled="checkOtherType(item)" class="form-control input-sm" v-model="item.otherType" placeholder="If others, please specify">
                  </td>
                  <td class="thBody">
                    <vue-numeric v-bind:min="0.00" v-bind:max="100.00" type="text" class="form-control input-sm" value={item.totalDollarPercent}  v-model="item.totalDollarPercent" v-bind:precision="2"/>
                  </td>
                  <td style="text-align: center;" class="thBody">
                    <a class="btn" @click="deleteYarnFiber(item)">
                      <i class="fa fa-trash"></i>
                      Delete
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    </div>

    <div class="form-group">
      <br/>
      <label class="control-label field-title">Which countries do you mainly source your yarn / fiber from?</label>
        <div class="row">
          <div class="col-md-6">
            <table class="table">
              <tbody>
                <tr class="trHeader">
                  <th style="width: 60%" class="thcss">Country</th>
                  <th style="width: 30%;" class="thcss">% of Total Dollar</th>
                  <th style="width: 10%; text-align: center;" class="thcss">
                    <a class="btn" @click="addCountry">
                      <i class="fa fa-plus"></i>
                      Add
                    </a>
                  </th>
                </tr>            
                <tr v-for="item in yarnFabricCountryList" class="trBody">
                  <td class="thBody">
                    <multi-select :options="countries" v-model="item.countryModel" id-field="code" label-field="name" :filter="true"/>
                  </td>
                  <td class="thBody">
                    <vue-numeric v-bind:min="0.00" v-bind:max="100.00" type="text" class="form-control input-sm" value={item.totalDollarPercent}  v-model="item.totalDollarPercent" v-bind:precision="2"/>
                  </td>
                  <td style="text-align: center;" class="thBody">
                    <a class="btn" @click="deleteCountry(item)">
                      <i class="fa fa-trash"></i>
                      Delete
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    </div>

    <!-- <div>
      <button class="btn btn-primary" @click="save">Save</button>
    </div>     -->
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
    countries
  } from 'src/components/common/store/definition'
  import {
    getDropDownList,
    getYarnFabric,
    updateYarnFabric
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
      }
    },
    data () {
      return {
        types: [],
        yarnFabricList: [],
        yarnFabricCountryList: []
      }
    },
    computed: {
      ...mapGetters({
        user: USER,
        countries
      })
    },
    watch: {
      onSaveBtnClicked () {
        if (this.onSaveBtnClicked) {
          this.save()
          this.$emit('saved')
        }
      },
      countries () {
        const countryMap = this.countries.reduce((map, country) => {
          map[country.code] = country
          return map
        }, {})
        this.yarnFabricCountryList = this.yarnFabricCountryList.map(item => {
          return {
            ...item,
            countryModel: countryMap[item.country] || null
          }
        })
      }
    },
    methods: {
      ...mapActions({
        alertSuccess: ALERT_SUCCESS,
        alertDanger: ALERT_DANGER
      }),
      checkOtherType (item) {
        item.otherType = item.type.code !== 'OTHERS' ? '' : item.otherType
        return item.type.code !== 'OTHERS'
      },
      addYarnFiber () {
        this.yarnFabricList.push({
          type: {
            code: null
          },
          totalDollarPercent: null
        })
      },
      deleteYarnFiber (item) {
        this.yarnFabricList = this.yarnFabricList.filter(yarnFiber => yarnFiber !== item)
      },
      addCountry () {
        this.yarnFabricCountryList.push({
          countryModel: {
            code: null
          },
          totalDollarPercent: null
        })
      },
      deleteCountry (item) {
        this.yarnFabricCountryList = this.yarnFabricCountryList.filter(countryItem => countryItem !== item)
      },
      save () {
        console.log('YarnFabric')
        for (let i = 0; i < this.yarnFabricList.length; i++) {
          if (this.yarnFabricList[i].type === undefined && this.yarnFabricList[i].totalDollarPercent === undefined) {
            // console.log(this.functions[i])
            this.deleteYarnFiber(this.yarnFabricList[i])
          }
        }
        for (let i = 0; i < this.yarnFabricCountryList.length; i++) {
          if (this.yarnFabricCountryList[i].countryModel === undefined && this.yarnFabricCountryList[i].totalDollarPercent === undefined) {
            // console.log(this.functions[i])
            this.deleteCountry(this.yarnFabricCountryList[i])
          }
        }
        let form = {
          parentId: _.toInteger(this.recordId),
          yarnsFibers: JSON.parse(JSON.stringify(this.yarnFabricList)),
          countries: JSON.parse(JSON.stringify(this.yarnFabricCountryList))
        }
        form.yarnsFibers.forEach(item => {
          item.type = item.type ? item.type.code : null
          item.totalDollarPercent = _.toString(item.totalDollarPercent).trim()
          if (item.totalDollarPercent == null || _.toString(item.totalDollarPercent).trim() === '') {
            item.totalDollarPercent = '0'
          }
        })
        form.countries.forEach(item => {
          item.country = item.countryModel ? item.countryModel.code : null
          item.totalDollarPercent = _.toString(item.totalDollarPercent).trim()
          if (item.totalDollarPercent == null || _.toString(item.totalDollarPercent).trim() === '') {
            item.totalDollarPercent = '0'
          }
        })
        updateYarnFabric({
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
      Promise.all([
        getDropDownList({
          token: this.user.token,
          codeTableId: 'YARN_OR_FIBER_TYPE'
        }),
        getYarnFabric({
          token: this.user.token,
          recordId: _.toInteger(this.recordId)
        })
      ]).then(([types, yarnFabric]) => {
        // const typeMap = types.reduce((map, type) => {
        //   map[type.code] = type
        //   return map
        // }, {})
        const countryMap = this.countries.reduce((map, country) => {
          map[country.code] = country
          return map
        }, {})
        this.types = types
        this.yarnFabricList = yarnFabric.yarnsFibers.map(item => {
          return {
            ...item,
            totalDollarPercent: _.toString(item.totalDollarPercent) === '0' ? '' : _.toString(item.totalDollarPercent),
            type: {
              code: item.type,
              name: item.type
            }
            // type: typeMap[item.type]
          }
        })
        if (this.yarnFabricList.length === 0) {
          this.yarnFabricList = this.types.filter(type => type.code !== 'OTHERS').map(type => {
            return {
              type: _.cloneDeep(type)
            }
          })
        }
        this.yarnFabricCountryList = yarnFabric.countries.map(item => {
          return {
            ...item,
            totalDollarPercent: _.toString(item.totalDollarPercent) === '0' ? '' : _.toString(item.totalDollarPercent),
            countryModel: countryMap[item.country] || null
          }
        })
        if (this.yarnFabricCountryList.length === 0) {
          this.addCountry()
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