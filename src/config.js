export const config = process.env.NODE_ENV === 'production' ? {
  apiURL: "https://61f90134783c1d0017c44886.mockapi.io/api/v1/"
} : {
  apiURL: "https://61f90134783c1d0017c44886.mockapi.io/api/v1/"
}

export const storageKey = {
  user: "etmabypp-user",
  role_id: "etmabypp-role-id",
}

export const staticDataUrls = {
  user: "user",
  company: "company",
  task: "task",
}

export const tableConfig = {
  bordered: false,
  wrapperClasses: "table-responsive",
  noDataIndication: "Data not found!",
}

export const cellEditConfig = {
  mode: 'click',
  blurToSave: true
}
