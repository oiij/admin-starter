import qiniu from 'qiniu'

import { QINIU } from '../config'

const { accessKey, secretKey, bucket, expires } = QINIU

export function getUploadToken() {
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
  const putPolicy = new qiniu.rs.PutPolicy({
    scope: bucket,
    expires,
    returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
  })
  const uploadToken = putPolicy.uploadToken(mac)
  return uploadToken
}
export const uploadToken = getUploadToken()
const config = new qiniu.conf.Config()
export const formUploader = new qiniu.form_up.FormUploader(config)
export const putExtra = new qiniu.form_up.PutExtra()
