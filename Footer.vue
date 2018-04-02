<template>
  <footer style="padding: 5px 0 5px;" class="main-footer text-center">
    <!-- To the right -->
    <!-- <div class="hidden-xs">
      Sourcing & Manufacturing End-To-End
    </div> -->
    <!-- Default to the left -->
    <strong>&copy; 2017 <a href="#">Gap Inc. GIS Strategy COE</a></strong>&nbsp;|&nbsp;Sourcing & Manufacturing End-To-End  {{profile}}
  </footer>
</template>
<script>
   import Vue from 'vue'
   import { microservice } from 'src/app-config'
   const Url = api => microservice.domain + '/common' + api
   import {
     USER
   } from 'src/store/definition'
   import {
     mapGetters
   } from 'vuex'
   export const getFooterCode = params => {
     let { token } = params
     return new Promise((resolve, reject) => {
       Vue.http.get(Url('/profile'), {
         headers: {
           'Authorization': 'Bearer ' + token
         }
       }).then(response => {
         resolve(response.body)
       }).catch(response => {
         reject({
           message: 'Failed to load /getFooterCode.'
         })
       })
     })
   }
   export default {
     computed: {
       ...mapGetters({
         user: USER
       })
     },
     data () {
       return {
         profile: ''
       }
     },
     mounted () {
       getFooterCode({
         token: this.user.token
       }).then(code => {
         this.profile = code.env
       })
     }
   }
</script>