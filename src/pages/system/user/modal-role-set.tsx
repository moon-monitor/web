import { UserItem } from '@/api/common.types'
import { UserPosition } from '@/api/enum'
import { updateUserPosition } from '@/api/system'
import { UpdateUserPositionRequest } from '@/api/system/types'
import { handleFormError } from '@/utils'
import { useRequest } from 'ahooks'
import { Alert, Form, Modal, Select, type ModalProps } from 'antd'

interface ModalRoleSetProps extends ModalProps {
  detail?: UserItem
}

export const ModalRoleSet: React.FC<ModalRoleSetProps> = (props) => {
  const { detail = { position: 'USER_POSITION_UNKNOWN', username: '', userId: 0 }, onOk, ...rest } = props
  const [form] = Form.useForm<UpdateUserPositionRequest>()

  const { runAsync: setUserRole, loading: setUserRoleLoading } = useRequest(updateUserPosition, {
    manual: true
  })

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    form.validateFields().then((values) => {
      setUserRole({ userId: detail.userId, position: values.position })
        .then(() => {
          onOk?.(e)
        })
        .catch((err) => {
          handleFormError(form, err)
        })
    })
  }

  return (
    <Modal {...rest} onOk={onSubmit} confirmLoading={setUserRoleLoading}>
      <div className='flex flex-col gap-3'>
        <Alert message={`${detail.username} 当前角色为 ${UserPosition[detail.position]}`} type='info' showIcon />
        <Form form={form} layout='vertical' initialValues={{ role: detail.position }}>
          <Form.Item label='角色' name='position' rules={[{ required: true, message: '请选择角色' }]}>
            <Select
              options={Object.entries(UserPosition)
                .filter(([key]) => key !== 'USER_POSITION_UNKNOWN')
                .map(([key, value]) => ({ label: value, value: key }))}
              placeholder='请选择角色'
            />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}
