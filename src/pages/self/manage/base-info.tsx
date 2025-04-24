import { UserItem } from '@/api2/common.types'
import { updateSelfInfo } from '@/api2/user'
import { DataFrom } from '@/components/data/form'
import { useRequest } from 'ahooks'
import { Button, Form, Space, message } from 'antd'
import type React from 'react'
import { useCallback, useEffect } from 'react'
import { baseInfoOptions } from './options'

export interface BaseInfoProps {
  userInfo: UserItem
  onOK: () => void
}

export const BaseInfo: React.FC<BaseInfoProps> = (props) => {
  const { userInfo, onOK } = props
  const [form] = Form.useForm()

  const { run: editSelfInfo, loading } = useRequest(updateSelfInfo, {
    manual: true,
    onSuccess: () => {
      message.success('修改成功')
      onOK()
    }
  })

  const initSelfInfo = useCallback(() => {
    if (userInfo) {
      form.setFieldsValue(userInfo)
    }
  }, [userInfo, form])

  useEffect(() => {
    initSelfInfo()
  }, [initSelfInfo])

  return (
    <div>
      <DataFrom items={baseInfoOptions} props={{ layout: 'vertical', form, onFinish: editSelfInfo }}>
        <Space size={8}>
          <Form.Item>
            <Button type='default' onClick={initSelfInfo}>
              重置
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' loading={loading}>
              保存
            </Button>
          </Form.Item>
        </Space>
      </DataFrom>
    </div>
  )
}
