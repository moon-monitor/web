import { EmailConfigItem } from '@/api/model-types'
import { Button, Col, Form, FormInstance, Input, Row, Select, Table } from 'antd'
import { TeamConfigFormData } from '.'

interface EmailConfigProps {
  emailConfigs: EmailConfigItem[]
  setEmailConfigs: (emailConfigs: EmailConfigItem[]) => void
  form: FormInstance<TeamConfigFormData>
}
export const EmailConfigSection: React.FC<EmailConfigProps> = (props) => {
  const { emailConfigs, setEmailConfigs, form } = props

  const hostOptions = [
    { label: '网易(smtp.163.com)', value: 'smtp.163.com' },
    { label: '网易(smtp.126.com)', value: 'smtp.126.com' },
    { label: '移动(smtp.139.com)', value: 'smtp.139.com' },
    { label: '电信(smtp.189.com)', value: 'smtp.189.com' }
  ]
  const portOptions = [
    { label: '网易(25)', value: 25 },
    { label: '网易(465)', value: 465 },
    { label: '网易(587)', value: 587 },
    { label: 'QQ(464)', value: 464 },
    { label: 'QQ(588)', value: 588 }
  ]
  const columns = [
    {
      title: '邮箱账号',
      dataIndex: 'user',
      key: 'user',
      minWidth: 200,
      render: (_: string, __: EmailConfigItem, index: number) => (
        <Form.Item
          name={['emailConfig', index, 'user']}
          rules={[{ type: 'email', message: '请输入邮箱账号', required: true }]}
        >
          <Input placeholder='example@domain.com' />
        </Form.Item>
      )
    },
    {
      title: '邮箱密码',
      dataIndex: 'pass',
      key: 'pass',
      minWidth: 200,
      render: (_: string, __: EmailConfigItem, index: number) => (
        <Form.Item name={['emailConfig', index, 'pass']} rules={[{ required: true, message: '请输入邮箱密码' }]}>
          <Input placeholder='请输入邮箱密码' />
        </Form.Item>
      )
    },
    {
      title: 'SMTP服务器',
      dataIndex: 'host',
      key: 'host',
      minWidth: 200,
      render: (_: string, __: EmailConfigItem, index: number) => (
        <Form.Item
          name={['emailConfig', index, 'host']}
          rules={[
            {
              required: true,
              message: '请输入SMTP服务器地址'
            },
            {
              type: 'regexp',
              pattern: /^([a-zA-Z0-9][-a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$|^(\d{1,3}\.){3}\d{1,3}$/,
              message: '请输入正确的SMTP服务器地址'
            }
          ]}
        >
          <Select
            mode='tags'
            options={hostOptions}
            maxTagCount={1}
            maxCount={1}
            placeholder='请选择SMTP服务器, 也可以输入自定义SMTP服务器'
          />
        </Form.Item>
      )
    },
    {
      title: '端口',
      dataIndex: 'port',
      key: 'port',
      minWidth: 200,
      render: (_: string, __: EmailConfigItem, index: number) => (
        <Form.Item name={['emailConfig', index, 'port']} rules={[{ required: true, message: '请输入端口号' }]}>
          <Select mode='tags' options={portOptions} maxCount={1} placeholder='请选择端口号' />
        </Form.Item>
      )
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      minWidth: 100,
      render: (_: string, __: EmailConfigItem, index: number) => {
        return (
          <Button type='link' danger onClick={() => removeEmailConfig(index)}>
            删除
          </Button>
        )
      }
    }
  ]

  const removeEmailConfig = (index: number) => {
    setEmailConfigs(emailConfigs.filter((_, i) => i !== index))
    form.setFieldsValue({
      emailConfig: form.getFieldValue('emailConfig').filter((_: EmailConfigItem, i: number) => i !== index)
    })
  }
  return (
    <>
      {emailConfigs.length > 1 ? (
        <Table dataSource={emailConfigs} columns={columns} pagination={false}></Table>
      ) : (
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label='邮箱账号'
              name={['emailConfig', 0, 'user']}
              rules={[{ type: 'email', message: '请输入邮箱账号', required: true }]}
            >
              <Input placeholder='example@domain.com' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='邮箱密码'
              name={['emailConfig', 0, 'pass']}
              rules={[{ required: true, message: '请输入邮箱密码' }]}
            >
              <Input placeholder='请输入邮箱密码' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='SMTP服务器'
              name={['emailConfig', 0, 'host']}
              rules={[
                {
                  required: true,
                  message: '请输入SMTP服务器地址'
                },
                {
                  type: 'regexp',
                  pattern: /^([a-zA-Z0-9][-a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$|^(\d{1,3}\.){3}\d{1,3}$/,
                  message: '请输入正确的SMTP服务器地址'
                }
              ]}
            >
              <Select
                mode='tags'
                options={hostOptions}
                maxTagCount={1}
                maxCount={1}
                placeholder='请选择SMTP服务器, 也可以输入自定义SMTP服务器'
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='端口'
              name={['emailConfig', 0, 'port']}
              rules={[{ required: true, message: '请输入端口号' }]}
            >
              <Select mode='tags' options={portOptions} maxCount={1} placeholder='请选择端口号' />
            </Form.Item>
          </Col>
        </Row>
      )}
    </>
  )
}
