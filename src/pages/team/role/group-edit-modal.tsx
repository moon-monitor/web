import type { ResourceItem } from '@/api/model-types'
import { listResource } from '@/api/resource'
import { getRole } from '@/api/team/role'
import { TeamRoleItem } from '@/api2/common.types'
import { saveTeamRole } from '@/api2/team'
import { SaveTeamRoleRequest } from '@/api2/team/types'
import { DataFrom } from '@/components/data/form'
import { useRequest } from 'ahooks'
import { Form, Modal, type ModalProps } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import type React from 'react'
import { useEffect, useState } from 'react'
import { editModalFormItems } from './options'
import PermissionTree from './permission-tree'

export interface GroupEditModalProps extends ModalProps {
  groupId?: number
  disabled?: boolean
  onOk?: () => void
}

export const GroupEditModal: React.FC<GroupEditModalProps> = (props) => {
  const { onCancel, onOk, open, title, groupId, disabled } = props
  const [form] = Form.useForm<SaveTeamRoleRequest>()
  const [grounpDetail, setGroupDetail] = useState<TeamRoleItem>()
  const [resourceList, setResourceList] = useState<ResourceItem[]>([])

  const { run: initRoleDetail, loading: initRoleDetailLoading } = useRequest(getRole, {
    manual: true,
    onSuccess: (res) => {
      setGroupDetail(res.detail)
    }
  })

  const { run: initResourceList, loading: initResourceListLoading } = useRequest(listResource, {
    manual: true,
    onSuccess: (res) => {
      setResourceList(res.list || [])
    }
  })

  const { run: updateRole, loading: editRoleLoading } = useRequest(saveTeamRole, {
    manual: true,
    onSuccess: () => {
      form?.resetFields()
      onOk?.()
    }
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (groupId && open) {
      initRoleDetail({ id: groupId })
    }
    if (open) {
      initResourceList({ pagination: { pageNum: 1, pageSize: 999 } })
    }
  }, [open, groupId, initRoleDetail, initResourceList, disabled])

  useEffect(() => {
    if (open && form && grounpDetail) {
      form?.setFieldsValue({
        ...grounpDetail
        // permissions: grounpDetail?.resources?.map((item) => item.id) || []
      })
      return
    }
  }, [grounpDetail, open, form])

  const handleOnCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    onCancel?.(e)
    form?.resetFields()
    setGroupDetail(undefined)
    setResourceList([])
  }

  const handleOnOk = () => {
    form?.validateFields().then((formValues) => {
      const data = {
        ...formValues
      }
      updateRole({ ...data, ...(groupId && { roleId: groupId }) })
    })
  }

  return (
    <>
      <Modal
        {...props}
        title={title}
        open={open}
        onCancel={handleOnCancel}
        onOk={handleOnOk}
        loading={initRoleDetailLoading || initResourceListLoading}
        confirmLoading={editRoleLoading}
      >
        <DataFrom
          items={editModalFormItems}
          props={{
            form,
            layout: 'vertical',
            autoComplete: 'off',
            disabled: disabled || editRoleLoading
          }}
        >
          <FormItem label='权限列表' name='permissions'>
            <PermissionTree items={resourceList} disabled={disabled} />
          </FormItem>
        </DataFrom>
      </Modal>
    </>
  )
}
