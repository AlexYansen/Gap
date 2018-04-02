import Vue from 'vue'
import { microservice } from 'src/app-config'
const url = api => microservice.domain + '/vpsextension' + api
// const uri = api => microservice.domain + '/common' + api

export const folderId = 'vpse'

export const getMillVendorMasterList = params => {
  let { token, searchCriteria } = params
  return new Promise((resolve, reject) => {
    Vue.http.post(url('/millVendorMasterList'), searchCriteria, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve(response.body)
    }).catch(response => {
      reject({
        message: 'Failed to load /millVendorMasterList.'
      })
    })
  })
}

export const getCodeDetailInfo = params => {
  let { token, codeTableId } = params
  return new Promise((resolve, reject) => {
    Vue.http.get(url('/getCodeDetailInfo'), {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      params: {
        codeTableId
      }
    }).then(response => {
      resolve(response.body)
    }).catch(response => {
      reject({
        message: 'Failed to load /getCodeDetailInfo.'
      })
    })
  })
}

export const getMillVendorMasterProfile = params => {
  let { token, millVendorID } = params
  return new Promise((resolve, reject) => {
    Vue.http.get(url('/getmillVendorMasterProfile'), {
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
        message: 'Failed to load /getmillVendorMasterProfile.'
      })
    })
  })
}

export const getmillVendorMaster = params => {
  let { token, millVendorID } = params
  return new Promise((resolve, reject) => {
    Vue.http.get(url('/getmillVendorMaster'), {
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
        message: 'Failed to load /getmillVendorMaster.'
      })
    })
  })
}

export const getMillVendorMasterBusinessInfo = params => {
  let { token, millVendorID } = params
  return new Promise((resolve, reject) => {
    Vue.http.get(url('/millVendorMasterBusinessInfo'), {
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
        message: 'Failed to load /millVendorMasterBusinessInfo.'
      })
    })
  })
}

export const saveBusinessInfo = params => {
  let { token, info } = params
  return new Promise((resolve, reject) => {
    Vue.http.post(url('/updatemillVendorBusinessInfo'), info, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve()
    }).catch(response => {
      reject({
        message: 'Failed to update Business Information.'
      })
    })
  })
}

export const saveCapability = params => {
  let { token, capability } = params
  return new Promise((resolve, reject) => {
    Vue.http.post(url('/insertCapability'), capability, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve()
    }).catch(response => {
      reject()
    })
  })
}

export const saveFacility = params => {
  let { token, facility } = params
  return new Promise((resolve, reject) => {
    Vue.http.post(url('/insertFacility'), facility, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve()
    }).catch(response => {
      reject()
    })
  })
}

export const saveMainSubcontractors = params => {
  let { token, MainSubcontractors } = params
  return new Promise((resolve, reject) => {
    Vue.http.post(url('/insertMainSubcontractors'), MainSubcontractors, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve()
    }).catch(response => {
      reject()
    })
  })
}

export const getResearchDevelopment = params => {
  let { token, millVendorID } = params
  return new Promise((resolve, reject) => {
    Vue.http.get(url('/getResearchDevelopment'), {
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
        message: 'Failed to load /getResearchDevelopment.'
      })
    })
  })
}

export const getQualityAssuranceInfo = params => {
  let { token, millVendorID } = params
  return new Promise((resolve, reject) => {
    Vue.http.get(url('/getQualityAssuranceInfo'), {
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
        message: 'Failed to load /getQualityAssuranceInfo.'
      })
    })
  })
}

export const getStatus = params => {
  let { token } = params
  return new Promise((resolve, reject) => {
    Vue.http.get(url('/getStatus'), {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve(response.body)
    }).catch(response => {
      reject({
        message: 'Failed to load /getStatus.'
      })
    })
  })
}

export const saveViewProfileGeneralInfo = params => {
  let { token, info } = params
  return new Promise((resolve, reject) => {
    Vue.http.post(url('/updatemillVendorMasterProfile'), info, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve()
    }).catch(response => {
      reject({
        message: 'Failed to update General Information.'
      })
    })
  })
}

export const saveFunctionList = params => {
  let { token, functionList } = params
  return new Promise((resolve, reject) => {
    Vue.http.post(url('/insertFunc'), functionList, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve()
    }).catch(response => {
      reject()
    })
  })
}

export const saveFunctionListInUS = params => {
  let { token, functionListInUS } = params
  return new Promise((resolve, reject) => {
    Vue.http.post(url('/insertFunUs'), functionListInUS, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve()
    }).catch(response => {
      reject()
    })
  })
}

export const getMillVendorFunctionList = params => {
  let { token } = params
  return new Promise((resolve, reject) => {
    Vue.http.get(url('/getMillVendorFunction'), {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve(response.body)
    }).catch(response => {
      reject({
        message: 'Failed to load /getMillVendorFunction.'
      })
    })
  })
}

export const getSaleVolumeUNIT = params => {
  let { token } = params
  return new Promise((resolve, reject) => {
    Vue.http.get(url('/getSaleVolumeUNIT'), {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve(response.body)
    }).catch(response => {
      reject({
        message: 'Failed to load /getSaleVolumeUNIT.'
      })
    })
  })
}

export const getTopRetailCustomerNM = params => {
  let { token } = params
  return new Promise((resolve, reject) => {
    Vue.http.get(url('/getTopRetailCustomerNM'), {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve(response.body)
    }).catch(response => {
      reject({
        message: 'Failed to load /getTopRetailCustomerNM.'
      })
    })
  })
}

export const getCountryOfOrigin = params => {
  let { token } = params
  return new Promise((resolve, reject) => {
    Vue.http.get(url('/getCountryOfOrigin'), {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve(response.body)
    }).catch(response => {
      reject({
        message: 'Failed to load /getCountryOfOrigin.'
      })
    })
  })
}

export const getMillVendorCapability = params => {
  let { token } = params
  return new Promise((resolve, reject) => {
    Vue.http.get(url('/getMillVendorCapability'), {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve(response.body)
    }).catch(response => {
      reject({
        message: 'Failed to load /getMillVendorCapability.'
      })
    })
  })
}

export const getCapacityUNIT = params => {
  let { token } = params
  return new Promise((resolve, reject) => {
    Vue.http.get(url('/getCapacityUNIT'), {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve(response.body)
    }).catch(response => {
      reject({
        message: 'Failed to load /getCapacityUNIT.'
      })
    })
  })
}

export const getMillVendorProcess = params => {
  let { token } = params
  return new Promise((resolve, reject) => {
    Vue.http.get(url('/getMillVendorProcess'), {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve(response.body)
    }).catch(response => {
      reject({
        message: 'Failed to load /getMillVendorProcess.'
      })
    })
  })
}

export const saveResearchDevelopment = params => {
  let { token, info } = params
  return new Promise((resolve, reject) => {
    Vue.http.post(url('/updateResearchDevelopment'), info, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve(response.body)
    }).catch(response => {
      reject({
        message: 'Failed to update Research & Development.'
      })
    })
  })
}

export const savemIllVendorMasterBuyers = params => {
  let { token, info } = params
  return new Promise((resolve, reject) => {
    Vue.http.post(url('/insertBuyers'), info, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve(response.body)
    }).catch(response => {
      reject({
        message: 'Failed to load /insertBuyers.'
      })
    })
  })
}

export const savemillVendorMasterCerts = params => {
  let { token, certs } = params
  return new Promise((resolve, reject) => {
    Vue.http.post(url('/insertCerts'), certs, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve(response.body)
    }).catch(response => {
      reject({
        message: 'Failed to load /insertCerts.'
      })
    })
  })
}

export const deleteByID = params => {
  let { token, certs } = params
  return new Promise((resolve, reject) => {
    Vue.http.post(url('/deleteByID'), certs, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve(response.body)
    }).catch(response => {
      reject({
        message: 'Failed to update /deleteByID.'
      })
    })
  })
}

export const saveQualityAssuranceInfo = params => {
  let { token, info } = params
  return new Promise((resolve, reject) => {
    Vue.http.post(url('/updateQualityAssuranceInfo'), info, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve(response.body)
    }).catch(response => {
      reject({
        message: 'Failed to update Quality Assurance Information.'
      })
    })
  })
}

export const getInspectionSystem = params => {
  let { token } = params
  return new Promise((resolve, reject) => {
    Vue.http.get(url('/getInspectionSystem'), {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve(response.body)
    }).catch(response => {
      reject({
        message: 'Failed to load /getInspectionSystem.'
      })
    })
  })
}

export const getMillFacRelationship = params => {
  let { token } = params
  return new Promise((resolve, reject) => {
    Vue.http.get(url('/getMillFacRelationship'), {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve(response.body)
    }).catch(response => {
      reject({
        message: 'Failed to load /getMillFacRelationship.'
      })
    })
  })
}

export const getMillVendorAttachments = params => {
  let { token, millVendorID } = params
  return new Promise((resolve, reject) => {
    Vue.http.get(url('/getMillVendorAttachments'), {
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
        message: 'Failed to load /getMillVendorAttachments.'
      })
    })
  })
}

export const insertAttachments = params => {
  let { token, attachments } = params
  return new Promise((resolve, reject) => {
    Vue.http.post(url('/insertAttachments'), attachments, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve(response.body)
    }).catch(response => {
      reject({
        message: 'Failed to update Attachments.'
      })
    })
  })
}

// export const uploadAttachment = params => {
//   let { token, file, folderId } = params
//   return new Promise((resolve, reject) => {
//     Vue.http.post(uploadUrl('/box/files'), file, folderId, {
//       headers: {
//         'Authorization': 'Bearer ' + token,
//         'Content-Type': 'multipart/form-data'
//       }
//     }).then(response => {
//       resolve(response.body)
//     }).catch(response => {
//       reject({
//         message: 'Failed to folders.'
//       })
//     })
//   })
// }

export const downloadAttachment = params => {
  let { token, fileId, versionId } = params
  let downloadUrl = microservice.domain + '/files/download/' + fileId + '?version='
  console.info('download')
  console.info(downloadUrl)
  return new Promise((resolve, reject) => {
    Vue.http.get(downloadUrl, {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      params: {
        versionId
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

export const getGarMfgVendors = params => {
  let { token } = params
  return new Promise((resolve, reject) => {
    Vue.http.get(url('/getGarMfgVendors'), {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve(response.body)
    }).catch(response => {
      reject({
        message: 'Failed to load /getGarMfgVendors.'
      })
    })
  })
}

export const getManfacturingVendorRelationship = params => {
  let { token, id } = params
  return new Promise((resolve, reject) => {
    Vue.http.get(url('/getManfacturingVendorRelationship'), {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      params: {
        id
      }
    }).then(response => {
      resolve(response.body)
    }).catch(response => {
      reject({
        message: 'Failed to load /getManfacturingVendorRelationship.'
      })
    })
  })
}

export const getMfgVendors = params => {
  let { token } = params
  return new Promise((resolve, reject) => {
    Vue.http.get(url('/getGarMfgVendors'), {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve(response.body)
    }).catch(response => {
      reject({
        message: 'Failed to load /getGarMfgVendors.'
      })
    })
  })
}

export const updateManfacturingVendorRelationship = params => {
  let { token, formData } = params
  return new Promise((resolve, reject) => {
    Vue.http.post(url('/updateManfacturingVendorRelationship'), formData, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve()
    }).catch(response => {
      reject({
        message: 'Failed to load /updateManfacturingVendorRelationship.'
      })
    })
  })
}

export const updateParentManfacturingVendor = params => {
  let { token, formData } = params
  return new Promise((resolve, reject) => {
    Vue.http.post(url('/updateParentManfacturingVendor'), formData, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve()
    }).catch(response => {
      reject({
        message: 'Failed to load /updateParentManfacturingVendor.'
      })
    })
  })
}

export const getchangeLogDetails = params => {
  let { token, millVendorID, changeLogID } = params
  return new Promise((resolve, reject) => {
    Vue.http.get(url('/getchangeLogDetails'), {
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
        message: 'Failed to load /getchangeLogDetails.'
      })
    })
  })
}

export const getDropDownList = params => {
  let { token, codeTableId } = params
  return new Promise((resolve, reject) => {
    Vue.http.get(url('/getCodeDetailInfo'), {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      params: {
        codeTableId
      }
    }).then(response => {
      resolve(response.body)
    }).catch(response => {
      reject({
        message: 'Failed to load /getCodeDetailInfo.'
      })
    })
  })
}
