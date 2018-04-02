<template>
    <modal :show="show" @show="show = true" @hide="show = false" :dialog-style="modalDialogStyle">

        <div class="header">
            <h4 class="title" style="display: inline-block;">Editing</h4>
            <span class="pull-right" style="cursor: pointer;" @click="show = false">X</span>
        </div>


  <div class="content" style="padding-left: 20px;padding-right: 20px">
    <div class="row">
      <div class="col-md-12">
        <div>
          <label class="field-title">Categories</label>
        </div>

        <table class="table">
          <tbody>
            <tr class="trHeader">
              <th class="thcss" style="width:12%">Primary?</th>
              <th class="thcss" style="width:25%">Category*</th>
              <th class="thcss" style="width:12%">
                <a class="btn" @click="addCategories(Categories)">
                  <i class="fa fa-plus"></i>Add</a>
              </th>
            </tr>
            <tr v-for="(Categorie, index) in Categories" class="trBody">
              <td style="text-align: center;" class="thBody">
                <input @click="checkOnly(Categorie, $event)" type="checkbox" v-model="Categorie.isPrimary">
              </td>
              <td class="thBody">
                <multi-select :options="CategoriesOption" v-model="Categorie.category" />
              </td>
              <td style="text-align: center;" class="thBody">
                <a class="btn" @click="removeCategories(Categories, Categorie)">
                  <i class="fa fa-trash"></i>Delete</a>
              </td>
            </tr>
          </tbody>
        </table>

        <div>
          <label class="field-title">Change Description*</label> <br/>
          <textarea rows="6" cols="100" v-model="changeHistorys" style="width: 100%"></textarea>
        </div>
      </div>
    </div>
  </div>



        <div class="footer">
            <div class="pull-right">
               <button type="button" @click="save" class="btn btn-success" style="width: 66px;margin-top: 20px;margin-right: 20px;">Save</button>
            </div>
        </div>   

    </modal>
</template>

<script>
  // import _ from 'lodash'
  import Modal from 'src/components/common/Modal'
  import $ from 'jquery'
  import { pixelize } from 'src/components/common/util'
  import Select2 from 'src/components/common/Select2'
  import AttributionService from './AttributionService'
  import MultiSelect from 'src/components/common/MultiSelect'
  import {
    USER,
    ALERT_DANGER,
    ALERT_SUCCESS
  } from 'src/store/definition'
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  export default {
    mixins: [
      AttributionService
    ],
    components: {
      Select2,
      Modal,
      MultiSelect
    },
    props: {
      value: {
        type: Boolean,
        required: true
      },
      editCategories: {
        type: Array
      },
      categoryOptions: {
        type: Array
      },
      changeBy: {
        type: String,
        required: true
      },
      parentID: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        show: false,
        Categories: [],
        CategoriesOption: [],
        changeHistorys: ''
      }
    },
    methods: {
      ...mapActions({
        alertDanger: ALERT_DANGER,
        alertSuccess: ALERT_SUCCESS
      }),
      addCategories (Categories) {
        Categories.push({
          isPrimary: false,
          category: null
        })
        this.Categories = [...this.Categories]
      },
      removeCategories (Categories, Categorie) {
        Categories = Categories.filter(item => item !== Categorie)
        this.Categories = [...Categories]
      },
      checkOnly (Categorie, event) {
        let checked = $(event.target).is(':checked')
        this.Categories = this.Categories.map(func => ({
          ...func,
          isPrimary: func === Categorie ? checked : false
        }))
      },
      save () {
        let Category = {
          changeBy: this.changeBy,
          logMessage: this.changeHistorys,
          changeLogId: 'MILL_FACILITY_MASTER_CAT',
          parentID: parseInt(this.$route.params.id),
          categories: JSON.parse(JSON.stringify(this.Categories))
        }
        let checkCategories = true
        let checklogMessage = true
        if (Category.logMessage === '') {
          checklogMessage = false
        }
        for (let i = 0; i < Category.categories.length; i++) {
          Category.categories[i].isPrimary === true ? Category.categories[i].isPrimary = 'Y' : Category.categories[i].isPrimary = 'N'
          Category.categories[i].category = Category.categories[i].category ? Category.categories[i].category.id : null
        }
        for (let a = 0; a < this.CategoriesOption.length; a++) {
          let CategoriesOptionNumber = 0
          for (let i = 0; i < Category.categories.length; i++) {
            if (this.CategoriesOption[a].id === Category.categories[i].category) {
              CategoriesOptionNumber++
            }
            if (CategoriesOptionNumber > 1 || Category.categories[i].category === null) {
              checkCategories = false
            }
          }
        }
        if (checkCategories && checklogMessage) {
          this.$attribution.insertUpdateCategoryAttr({
            Category: Category,
            token: this.user.token
          }).then(() => {
            this.show = false
            this.alertSuccess({
              message: 'Save successfully.'
            })
          }).catch(({ message }) => {
            this.alertDanger({
              message
            })
          })
        } else {
          if (!checkCategories) {
            this.alertDanger({
              message: 'Category is required and can not be repeated.'
            })
          }
          if (!checklogMessage) {
            this.alertDanger({
              message: 'The change description can not be empty.'
            })
          }
        }
      }
    },
    computed: {
      ...mapGetters({
        user: USER
      }),
      modalDialogStyle () {
        return {
          width: pixelize(850),
          height: pixelize(600),
          overflow: 'auto'
        }
      }
    },
    watch: {
      value () {
        this.show = this.value
      },
      show () {
        this.$emit('input', this.show)
      },
      categoryOptions () {
        this.CategoriesOption = this.categoryOptions.map(item => ({
          id: item.master_category_code,
          label: item.l_category_nm
        }))
      },
      editCategories () {
        for (let a = 0; a < this.editCategories.length; a++) {
          this.editCategories[a].isPrimary === 'Y' ? this.editCategories[a].isPrimary = true : this.editCategories[a].isPrimary = false
        }
        this.Categories = this.editCategories.map(item => ({
          isPrimary: item.isPrimary,
          category: {
            id: item.category,
            label: item.category
          }
        }))
        this.changeHistorys = ''
        // console.log(_.cloneDeep(this.Categories))
        // console.log(_.cloneDeep(this.brandsOption))
      }
    }
  }
</script>

<style scoped>
  * {
    font-family: 'Roboto Condensed', sans-serif;
  }
  .fa {
    font-family: FontAwesome;
  }
  th {
    text-align: center;
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
