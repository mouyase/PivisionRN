export const log = (message: any, ...optionalParams: any[]) => {
  if (optionalParams) {
    console.log('\x1b[36m', message, ...optionalParams)
  } else {
    console.log('\x1b[36m', message)
  }
}
export const warn = (message: any, ...optionalParams: any[]) => {
  if (optionalParams) {
    console.warn('\x1b[33m', message, ...optionalParams)
  } else {
    console.warn('\x1b[33m', message)
  }
}

export const info = (message: any, ...optionalParams: any[]) => {
  if (optionalParams) {
    console.info('\x1b[32m', message, ...optionalParams)
  } else {
    console.info('\x1b[32m', message)
  }
}
export const error = (message: any, ...optionalParams: any[]) => {
  if (optionalParams) {
    console.error('\x1b[31m', message, ...optionalParams)
  } else {
    console.error('\x1b[31m', message)
  }
}
