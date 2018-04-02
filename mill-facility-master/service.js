import Vue from 'vue'
import { microservice } from 'src/app-config'
const url = api => microservice.domain + '/vpsextension' + api

export const getMillFacilityMasterList = params => {
  let { token, searchCriteria } = params
  return new Promise((resolve, reject) => {
    Vue.http.post(url('/getMillFacilityMasterList'), searchCriteria, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve(response.body)
    }).catch(response => {
      reject({
        message: 'Failed to load /millFacilityMasterList.'
      })
    })
  })
}

export const updateMillFacilityRel = params => {
  let { token, list } = params
  return new Promise((resolve, reject) => {
    Vue.http.post(url('/updateMillFacilityRel'), list, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve(response.body)
    }).catch(response => {
      reject({
        message: 'Failed to load /updateMillFacilityRel.'
      })
    })
  })
}

export const getMillFacilityRel = params => {
  let { token, ID } = params
  return new Promise((resolve, reject) => {
    Vue.http.get(url('/getMillFacilityRel'), {
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
        message: 'Failed to get MillFacility Relationship.'
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

export const getFacilityMasterStatus = params => {
  let { token } = params
  return new Promise((resolve, reject) => {
    Vue.http.get(url('/getFacilityMasterStatus'), {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      resolve(response.body)
    }).catch(response => {
      reject({
        message: 'Failed to load /getFacilityMasterStatus.'
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
