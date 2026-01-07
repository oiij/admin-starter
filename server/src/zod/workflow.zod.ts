import type { output } from 'zod'
import { any, array, boolean, literal, object, string, union } from 'zod'
import { baseDeleteZod, baseFindZod, zodObjectId } from './base.zod'

const workflowNodeStartConfigSchema = object({
  id: string(),
  type: literal(['INPUT', 'SELECT', 'RADIO', 'CHECKBOX', 'SWITCH']).optional(),
  typeName: string().optional(),
  fieldLabel: string().optional(),
  fieldKey: string().optional(),
  fieldValue: string().optional(),
  required: boolean().optional(),
  placeholder: string().optional(),
  options: array(object({
    label: string(),
    value: string(),
  })).optional(),
})
const workflowNodeApprovalConfigSchema = object({
  id: string(),
  type: literal(['USER', 'ROLE', 'SUPERIOR', 'APPLICANT']).optional(),
  typeName: string().optional(),
  value: string().optional(),
  label: string().optional(),
})
const workflowNodeSchema = object({
  id: string(),
  name: string(),
  strategy: literal(['AND', 'OR']).optional(),
})
const workflowStartNodeSchema = workflowNodeSchema.extend({
  type: literal('START'),
  config: array(workflowNodeStartConfigSchema).optional(),
})
const workflowApprovalNodeSchema = workflowNodeSchema.extend({
  type: literal('APPROVAL'),
  config: array(workflowNodeApprovalConfigSchema).optional(),
})
const workflowCCNodeSchema = workflowNodeSchema.extend({
  type: literal('CC'),
  config: array(workflowNodeApprovalConfigSchema).optional(),
})
const workflowEndNodeSchema = workflowNodeSchema.extend({
  type: literal('END'),
  config: array(any()).optional(),
})

export const workflowCreateZod = object({
  name: string(),
  description: string().optional(),
  nodes: array(union([workflowStartNodeSchema, workflowApprovalNodeSchema, workflowCCNodeSchema, workflowEndNodeSchema])),
  disabled: boolean().optional(),
})

export const workflowDeleteZod = baseDeleteZod.extend({

})

export const workflowUpdateZod = workflowCreateZod.partial().extend({
  _id: zodObjectId(),
})

export const workflowFindZod = baseFindZod.extend({

})

export type WorkflowCreateZodType = output<typeof workflowCreateZod>
export type WorkflowUpdateZodType = output<typeof workflowUpdateZod>
export type WorkflowDeleteZodType = output<typeof workflowDeleteZod>
export type WorkflowFindZodType = output<typeof workflowFindZod>

export type WorkflowStartNodeType = output<typeof workflowStartNodeSchema>
export type WorkflowApprovalNodeType = output<typeof workflowApprovalNodeSchema>
export type WorkflowCCNodeType = output<typeof workflowCCNodeSchema>
export type WorkflowEndNodeType = output<typeof workflowEndNodeSchema>

export type WorkflowNodeType = WorkflowStartNodeType | WorkflowApprovalNodeType | WorkflowCCNodeType | WorkflowEndNodeType
