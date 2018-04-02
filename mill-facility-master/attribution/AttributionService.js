import { domain } from 'src/app_config'

// export const folderId = 'vpse'

export default {
  created () {
    this.$attribution = {}
    this.$attribution.url = api => domain + '/vpsextension' + api
    this.$attribution.getMillFacilityMasterAttr = ({ millFacilityID, token }) => {
      return new Promise((resolve, reject) => {
        this.$http.get(this.$attribution.url('/getMillFacilityMasterAttr'), {
          headers: {
            'Authorization': 'Bearer ' + token
          },
          params: {
            millFacilityID
          }
        }).then(response => {
          resolve(response.body)
        }).catch(response => {
          reject({
            message: 'Failed to retrieve getMillFacilityMasterAttr.'
          })
        })
      })
    }

    this.$attribution.insertUpdateCategoryAttr = ({ Category, token }) => {
      return new Promise((resolve, reject) => {
        this.$http.post(this.$attribution.url('/insertUpdateCategoryAttr'), Category, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }).then(response => {
          resolve(response.body)
        }).catch(response => {
          reject({
            message: 'Failed to update Category.'
          })
        })
      })
    }

    this.$attribution.updateFacilityMasterAttr = ({ Category, token }) => {
      return new Promise((resolve, reject) => {
        this.$http.post(this.$attribution.url('/updateFacilityMasterAttr'), Category, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }).then(response => {
          resolve(response.body)
        }).catch(response => {
          reject({
            message: 'Failed to update Facility Master Attrbution.'
          })
        })
      })
    }

    this.$attribution.getChangeLogDetails = ({ millVendorID, changeLogID, token }) => {
      return new Promise((resolve, reject) => {
        this.$http.get(this.$attribution.url('/getchangeLogDetails'), {
          headers: {
            'Authorization': 'Bearer ' + token
          },
          params: {
            millVendorID,
            changeLogID
          }
        }).then(response => {
          resolve(response.body)
        }).catch(response => {
          reject({
            message: 'Failed to retrieve ChangeLogDetails.'
          })
        })
      })
    }

    this.$attribution.getCategorys = ({ token }) => {
      return new Promise((resolve, reject) => {
        this.$http.get(this.$attribution.url('/getCategorys'), {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }).then(response => {
          resolve(response.body)
        }).catch(response => {
          reject({
            message: 'Failed to getCategorys.'
          })
        })
      })
    }

    this.$attribution.getFacilityMasterStatus = ({ token }) => {
      return new Promise((resolve, reject) => {
        this.$http.get(this.$attribution.url('/getFacilityMasterStatus'), {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }).then(response => {
          resolve(response.body)
        }).catch(response => {
          reject({
            message: 'Failed to getFinanicalReportType.'
          })
        })
      })
    }
  }
}
