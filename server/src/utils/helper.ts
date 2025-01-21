import type { EventHandlerRequest, H3Event } from 'h3'
import type { PipelineStage } from 'mongoose'
import type { SafeParseReturnType } from 'zod'
import { createError, getHeader } from 'h3'
import { isObjectIdOrHexString, Types } from 'mongoose'

export function paramsError(body: SafeParseReturnType<any, any>) {
  return createError({
    status: 400,
    statusMessage: 'Bad Request',
    message: '参数错误',
    data: body,
  })
}
export function getAuthorization(event: H3Event<EventHandlerRequest>) {
  const token = getHeader(event, 'authorization')
  return token ? token.replace('Bearer ', '') : ''
}
export function isObjectId(id: string | string[]) {
  return Array.isArray(id) ? id.every(e => isObjectIdOrHexString(e)) : isObjectIdOrHexString(id)
}
export function timeProject(fields: { [field: string]: any }) {
  return {
    $project: {
      ...fields,
      createdAt: {
        $dateToString: {
          format: '%Y-%m-%d %H:%M:%S',
          date: '$createdAt',
          timezone: 'Asia/Shanghai',
        },
      },
      updatedAt: {
        $dateToString: {
          format: '%Y-%m-%d %H:%M:%S',
          date: '$updatedAt',
          timezone: 'Asia/Shanghai',
        },
      },
    },
  } as PipelineStage.Project
}
export function $page(page: number, limit: number) {
  return {
    $skip: (page - 1) * limit,
  } as PipelineStage.Skip
}

export function $limit(limit: number) {
  return {
    $limit: limit,
  } as PipelineStage.Limit
}
export function $unwind(field: string, preserveNullAndEmptyArrays = true) {
  return {
    $unwind: {
      path: `${field}`,
      preserveNullAndEmptyArrays,
    },

  } as PipelineStage.Unwind
}
export function string2ObjectId(id: string) {
  return new Types.ObjectId(id)
}
