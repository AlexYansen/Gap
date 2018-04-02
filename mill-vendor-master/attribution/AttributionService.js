import { domain } from 'src/app_config'

// export const folderId = 'vpse'

export default {
  created () {
    this.$attribution = {}
    this.$attribution.url = api => domain + '/vpsextension' + api
    this.$attribution.uploadUrl = api => domain + '/common' + api
    this.$attribution.getMillVendorMaster = ({ millVendorID, token }) => {
      return new Promise((resolve, reject) => {
        this.$http.get(this.$attribution.url('/getmillVendorMaster'), {
          headers: {
            'Authorization': 'Bearer ' + token
          },
          params: {
            millVendorID
          }
        }).then(response => {
          resolve(response.body)
        }).catch(response => {
          reject({
            message: 'Failed to retrieve millVendorMaster.'
          })
        })
      })
    }

    this.$attribution.insertUpdateCategory = ({ Category, token }) => {
      return new Promise((resolve, reject) => {
        this.$http.post(this.$attribution.url('/insertUpdateCategory'), Category, {
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

    this.$attribution.getTierings = ({ token }) => {
      return new Promise((resolve, reject) => {
        this.$http.get(this.$attribution.url('/getTierings'), {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }).then(response => {
          resolve(response.body)
        }).catch(response => {
          reject({
            message: 'Failed to getTierings.'
          })
        })
      })
    }

    this.$attribution.getBrands = ({ token }) => {
      return new Promise((resolve, reject) => {
        this.$http.get(this.$attribution.url('/getBrands'), {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }).then(response => {
          resolve(response.body)
        }).catch(response => {
          reject({
            message: 'Failed to getBrands.'
          })
        })
      })
    }

    this.$attribution.getFinanicalReportType = ({ token }) => {
      return new Promise((resolve, reject) => {
        this.$http.get(this.$attribution.url('/getFinanicalReportType'), {
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

    this.$attribution.uploadAttachment = ({ file, token }) => {
      return new Promise((resolve, reject) => {
        this.$http.post(this.$attribution.uploadUrl('/uploadAttachment'), file, {
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
          resolve(response.body)
        }).catch(response => {
          reject({
            message: 'Failed to uploadAttachment.'
          })
        })
      })
    }

    this.$attribution.downloadAttachment = ({ folderId, attachment, token }) => {
      return new Promise((resolve, reject) => {
        this.$http.get(this.$attribution.uploadUrl('/downloadAttachment'), {
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'multipart/form-data'
          },
          params: {
            folderId,
            attachment
          }
        }).then(response => {
          resolve(response.body)
        }).catch(response => {
          reject({
            message: 'Failed to downloadAttachment.'
          })
        })
      })
    }

    this.$attribution.deleteAttachment = ({ attachment, token }) => {
      return new Promise((resolve, reject) => {
        this.$http.get(this.$attribution.uploadUrl('/deleteAttachment'), {
          headers: {
            'Authorization': 'Bearer ' + token
          },
          params: {
            attachment
          }
        }).then(response => {
          resolve(response.body)
        }).catch(response => {
          reject({
            message: 'Failed to deleteAttachment.'
          })
        })
      })
    }

    this.$attribution.insertUpdateFinanical = ({ finanical, token }) => {
      return new Promise((resolve, reject) => {
        this.$http.post(this.$attribution.url('/insertUpdateFinanical'), finanical, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }).then(response => {
          resolve(response.body)
        }).catch(response => {
          reject({
            message: 'Failed to update Finanical.'
          })
        })
      })
    }

    this.$attribution.deleteFinanical = ({ ID, token }) => {
      return new Promise((resolve, reject) => {
        this.$http.delete(this.$attribution.url('/deleteFinanical'), {
          headers: {
            'Authorization': 'Bearer ' + token
          },
          params: {
            ID
          }
        }).then(response => {
          resolve(response.body)
        }).catch(response => {
          reject({
            message: 'Failed to deleteFinanical.'
          })
        })
      })
    }

    this.$attribution.getStatus = ({ token }) => {
      return new Promise((resolve, reject) => {
        this.$http.get(this.$attribution.url('/getStatus'), {
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

    this.$attribution.getGisOffices = ({ token }) => {
      return new Promise((resolve, reject) => {
        this.$http.get(this.$attribution.url('/getGisOffices'), {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }).then(response => {
          resolve(response.body)
        }).catch(response => {
          reject({
            message: 'Failed to getGisOffices.'
          })
        })
      })
    }
  }
}
