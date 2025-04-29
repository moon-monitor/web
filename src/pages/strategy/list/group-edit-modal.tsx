import { TeamStrategyGroupItem } from '@/api2/common.types'
import { GlobalStatus } from '@/api2/enum'
import { getTeamStrategyGroup, saveTeamStrategyGroup } from '@/api2/team/team-strategy'
import { useRequest } from 'ahooks'
import { Form, Input, Modal, type ModalProps } from 'antd'
import type React from 'react'
import { useEffect, useState } from 'react'

export type GroupEditModalFormData = {
  name: string
  remark: string
  status?: keyof typeof GlobalStatus
  // categoriesIds: number[]
  teamId?: number
}

export type GroupEditModalData = {
  id?: number
  // 规则组名称
  name: string
  // 规则组描述
  remark: string
  // 规则分类类型
  categoriesIds: number[]
}

export interface GroupEditModalProps extends ModalProps {
  groupId?: number
  disabled?: boolean
  onOk?: () => void
}

export const GroupEditModal: React.FC<GroupEditModalProps> = (props) => {
  const { onCancel, onOk, open, title, groupId, disabled } = props

  const [form] = Form.useForm<GroupEditModalFormData>()

  const [grounpDetail, setGroupDetail] = useState<TeamStrategyGroupItem>()
  // const [strategyCategoryList, setStrategyCategoryList] = useState<SelectItem[]>([])

  // const { run: initStrategyCategoryList, loading: strategyCategoryListLoading } = useRequest(dictSelectList, {
  //   manual: true,
  //   onSuccess: (data) => {
  //     setStrategyCategoryList(data?.list || [])
  //   }
  // })

  const { run: initDetail, loading: detailLoading } = useRequest(getTeamStrategyGroup, {
    manual: true,
    onSuccess: (data) => {
      setGroupDetail(data)
    }
  })

  const { runAsync: saveStrategyGroup, loading: saveStrategyGroupLoading } = useRequest(saveTeamStrategyGroup, {
    manual: true,
    onSuccess: () => {
      form?.resetFields()
      setGroupDetail(undefined)
    }
  })

  // const initFormDeps = useCallback(() => {
  //   initStrategyCategoryList({
  //     pagination: defaultPaginationReq,
  //     dictType: DictType.DictTypeStrategyGroupCategory
  //   })
  //   if (groupId) {
  //     initDetail({ groupId: groupId })
  //   }
  // }, [initStrategyCategoryList, initDetail, groupId])

  useEffect(() => {
    if (open && grounpDetail) {
      form?.setFieldsValue({
        ...grounpDetail
        // categoriesIds: grounpDetail.categories?.map((item) => item.id) || []
      })
      return
    }
    form?.resetFields()
  }, [grounpDetail, open, form])

  useEffect(() => {
    if (open && groupId) {
      // initFormDeps()
      initDetail({ groupId: groupId })
    }
  }, [open, groupId, form])

  const handleOnCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    onCancel?.(e)
    form?.resetFields()
    setGroupDetail(undefined)
  }

  const handleOnOk = () => {
    form?.validateFields().then((formValues) => {
      const { name, remark } = formValues
      const data = {
        id: groupId,
        name,
        remark
        // categoriesIds
      }
      Promise.all([groupId ? saveStrategyGroup({ groupId: groupId, ...data }) : saveStrategyGroup(data)]).then(() => {
        onOk?.()
      })
    })
  }

  return (
    <>
      <Modal
        {...props}
        title={title}
        loading={detailLoading}
        open={open}
        onCancel={handleOnCancel}
        onOk={handleOnOk}
        confirmLoading={saveStrategyGroupLoading}
      >
        <Form form={form} layout='vertical' autoComplete='off' disabled={disabled || saveStrategyGroupLoading}>
          <Form.Item label='规则组名称' name='name' rules={[{ required: true, message: '请输入规则组名称' }]}>
            <Input placeholder='请输入规则组名称' allowClear />
          </Form.Item>
          {/* <Form.Item label='规则组分类' name='categoriesIds' rules={[{ required: true, message: '请选择规则组分类' }]}>
            <Select
              placeholder='请选择策略组类型'
              allowClear
              mode='multiple'
              loading={strategyCategoryListLoading}
              options={strategyCategoryList.map((item) => ({
                label: (
                  <Tag bordered={false} color={item.extend?.color}>
                    {item.label}
                  </Tag>
                ),
                value: item.value,
                disabled: item.disabled
              }))}
            />
          </Form.Item> */}
          <Form.Item label='规则组描述' name='remark'>
            <Input.TextArea placeholder='请输入200字以内的规则组描述' allowClear maxLength={200} showCount />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
