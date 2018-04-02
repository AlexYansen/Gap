import Vue from 'vue'
import { microservice } from 'src/app-config'
const url = api => microservice.domain + '/vpsextension' + api
// const uploadUrl = api => microservice.domain + '/common' + api

export const folderId = 'vpse'

export const searchMillFacilityProfileList = params => {
  let { token, searchCriteria } = params
  return new Promise((resolve, reject) => {
    Vue.http.post(url('/millFacilityProfileList'), searchCriteria, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve(response.body)
    }).catch(response => {
      reject({
        message: 'Failed to load /millFacilityProfileList.'
      })
    })
  })
}

export const insertUpdateFacilityMaster = params => {
  let { token, millFacilityMaster } = params
  return new Promise((resolve, reject) => {
    Vue.http.post(url('/insertUpdateFacilityMaster'), millFacilityMaster, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve()
    }).catch(response => {
      reject({
        message: 'Failed to load /insertUpdateFacilityMaster.'
      })
    })
  })
}

export const assignMillFacilityMaster = params => {
  let { token, info } = params
  return new Promise((resolve, reject) => {
    Vue.http.post(url('/updateFacilityMaster'), info, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve()
    }).catch(response => {
      reject({
        message: 'Failed to load /updateFacilityMaster.'
      })
    })
  })
}

export const downloadAttachment = params => {
  let { token, fileId, versionId } = params
  let downloadUrl = microservice.domain + '/files/download/' + fileId
  console.info('download')
  console.info(downloadUrl)
  return new Promise((resolve, reject) => {
    Vue.http.get(downloadUrl, {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      params: {
        version: versionId
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

export const getMillFacilityProfileGeneralInfo = params => {
  let { token, recordId } = params
  return new Promise((resolve, reject) => {
    Vue.http.get(url('/millFacilityProfileGeneralInfo'), {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      params: {
        ID: recordId
      }
    }).then(response => {
      resolve(response.body)
    }).catch(response => {
      reject({
        message: 'Failed to load /millFacilityProfileGeneralInfo.'
      })
    })
  })
}

export const getListOfRelationshipWithParentMill = params => {
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

export const saveGeneralInfo = params => {
  let { token, info } = params
  return new Promise((resolve, reject) => {
    Vue.http.post(url('/updateMillFacilityInfo'), info, {
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

export const getFacilityID = params => {
  let { token } = params
  return new Promise((resolve, reject) => {
    Vue.http.get(url('/getFacilityID'), {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve(response.body)
    }).catch(response => {
      reject({
        message: 'Failed to get Facility_ID.'
      })
    })
  })
}

export const saveFunctions = params => {
  let { token, functions } = params
  return new Promise((resolve, reject) => {
    Vue.http.post(url('/insertFunFac'), functions, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve()
    }).catch(response => {
      reject({
        message: 'Failed to load /insertFunFac.'
      })
    })
  })
}

export const getMillFacilityQualityAssuranceInfo = params => {
  let { token, recordId } = params
  return new Promise((resolve, reject) => {
    Vue.http.get(url('/getMillFacilityQualityAssuranceInfo'), {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      params: {
        millFacilityID: recordId
      }
    }).then(response => {
      resolve(response.body)
    }).catch(response => {
      reject({
        message: 'Failed to load /getMillFacilityQualityAssuranceInfo.'
      })
    })
  })
}

export const updateQualityAssuranceInfo = params => {
  let { token, info } = params
  return new Promise((resolve, reject) => {
    Vue.http.post(url('/updateMillFacilityQualityAssuranceInfo'), info, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve()
    }).catch(response => {
      reject({
        message: 'Failed to update Quality Assurance Information.'
      })
    })
  })
}

export const insertMillFacilityBuyers = params => {
  let { token, info } = params
  return new Promise((resolve, reject) => {
    Vue.http.post(url('/insertMillFacilityBuyers'), info, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve()
    }).catch(response => {
      reject({
        message: 'Failed to load /insertMillFacilityBuyers.'
      })
    })
  })
}

export const getMillFacilityProfileCert = params => {
  let { token, recordId } = params
  return new Promise((resolve, reject) => {
    Vue.http.get(url('/getMillFacilityProfileCert'), {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      params: {
        millFacilityID: recordId
      }
    }).then(response => {
      resolve(response.body)
    }).catch(response => {
      reject({
        message: 'Failed to load /getMillFacilityProfileCert.'
      })
    })
  })
}

export const updateFacilityProfileCert = params => {
  let { token, info } = params
  return new Promise((resolve, reject) => {
    Vue.http.post(url('/updateFacilityProfileCert'), info, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve()
    }).catch(response => {
      reject({
        message: 'Failed to update Certifications.'
      })
    })
  })
}

export const getMillFacilityProfilePrinting = params => {
  let { token, recordId } = params
  return new Promise((resolve, reject) => {
    Vue.http.get(url('/getMillFacilityProfilePrinting'), {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      params: {
        millFacilityID: recordId
      }
    }).then(response => {
      resolve(response.body)
    }).catch(response => {
      reject({
        message: 'Failed to load /getMillFacilityProfilePrinting.'
      })
    })
  })
}

export const updateMillFacilityProfilePrinting = params => {
  let { token, info } = params
  return new Promise((resolve, reject) => {
    Vue.http.post(url('/updateMillFacilityProfilePrinting'), info, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve()
    }).catch(response => {
      reject({
        message: 'Failed to update Printing.'
      })
    })
  })
}

export const getWovens = params => {
  let { token, recordId } = params
  return new Promise((resolve, reject) => {
    Vue.http.get(url('/getWovens'), {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      params: {
        id: recordId
      }
    }).then(response => {
      resolve(response.body)
    }).catch(response => {
      reject({
        message: 'Failed to load /getWovens.'
      })
    })
  })
}

export const updateWovens = params => {
  let { token, info } = params
  return new Promise((resolve, reject) => {
    Vue.http.post(url('/updateWovens'), info, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve()
    }).catch(response => {
      reject({
        message: 'Failed to update Wovens.'
      })
    })
  })
}

export const getMillFacilityProfileDenim = params => {
  let { token, recordId } = params
  return new Promise((resolve, reject) => {
    Vue.http.get(url('/getMillFacilityProfileDenim'), {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      params: {
        ID: recordId
      }
    }).then(response => {
      resolve(response.body)
    }).catch(response => {
      reject({
        message: 'Failed to load /getMillFacilityProfileDenim.'
      })
    })
  })
}

export const updateMillFacilityProfileDenim = params => {
  let { token, info } = params
  return new Promise((resolve, reject) => {
    Vue.http.post(url('/updateMillFacilityProfileDenim'), info, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve()
    }).catch(response => {
      reject({
        message: 'Failed to update Denim.'
      })
    })
  })
}

export const getYarnFabric = params => {
  let { token, recordId } = params
  return new Promise((resolve, reject) => {
    Vue.http.get(url('/getYarnFabric'), {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      params: {
        parentId: recordId
      }
    }).then(response => {
      resolve(response.body)
    }).catch(response => {
      reject({
        message: 'Failed to load /getYarnFabric.'
      })
    })
  })
}

export const updateYarnFabric = params => {
  let { token, info } = params
  return new Promise((resolve, reject) => {
    Vue.http.post(url('/updateYarnFabric'), info, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve()
    }).catch(response => {
      reject({
        message: 'Failed to update Yarn and Fabric.'
      })
    })
  })
}

export const getMillTableId = params => {
  let { token, tableName } = params
  return new Promise((resolve, reject) => {
    Vue.http.get(url('/getMillTableId'), {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      params: {
        tableName: tableName
      }
    }).then(response => {
      resolve(response.body)
    }).catch(response => {
      reject({
        message: 'Failed to load /getMillTableId.'
      })
    })
  })
}

export const getMillVendorMasterIdAndName = params => {
  let { token } = params
  return new Promise((resolve, reject) => {
    Vue.http.get(url('/getMillVendorMasterIdAndName'), {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve(response.body)
    }).catch(response => {
      reject({
        message: 'Failed to load /getMillVendorMasterIdAndName.'
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

export const getSustainabilityChemicals = params => {
  let { token, id } = params
  return new Promise((resolve, reject) => {
    Vue.http.get(url('/getSustainabilityChemicals'), {
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
        message: 'Failed to load /getSustainabilityChemicals.'
      })
    })
  })
}

export const updateSustainabilityChemicals = params => {
  let { token, form } = params
  return new Promise((resolve, reject) => {
    Vue.http.post(url('/updateSustainabilityChemicals'), form, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve()
    }).catch(response => {
      reject({
        message: 'Failed to update Sustainability & Chemicals.'
      })
    })
  })
}

export const getMillFacilityProfileSpinning = params => {
  let { token, id } = params
  return new Promise((resolve, reject) => {
    Vue.http.get(url('/getMillFacilityProfileSpinning'), {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      params: {
        ID: id
      }
    }).then(response => {
      resolve(response.body)
    }).catch(response => {
      reject({
        message: 'Failed to load /getMillFacilityProfileSpinning.'
      })
    })
  })
}

export const updateMillFacilityProfileSpinning = params => {
  let { token, form } = params
  return new Promise((resolve, reject) => {
    Vue.http.post(url('/updateMillFacilityProfileSpinning'), form, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve()
    }).catch(response => {
      reject({
        message: 'Failed to update Spinning.'
      })
    })
  })
}

export const getKnitting = params => {
  let { token, id } = params
  return new Promise((resolve, reject) => {
    Vue.http.get(url('/getKnitting'), {
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
        message: 'Failed to load /getKnitting.'
      })
    })
  })
}

export const updateKnitting = params => {
  let { token, form } = params
  return new Promise((resolve, reject) => {
    Vue.http.post(url('/updateKnitting'), form, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve()
    }).catch(response => {
      reject({
        message: 'Failed to update Knitting.'
      })
    })
  })
}
