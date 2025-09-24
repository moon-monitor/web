// import { getTeamConfig, updateTeamConfig } from '@/api/request/team' // TODO: 实现 team config API

// 占位符函数，待实现
const getTeamConfig = async (): Promise<TeamConfigItem> => { throw new Error('getTeamConfig API not implemented yet') }
const updateTeamConfig = async (params: TeamConfigFormData): Promise<TeamConfigItem> => { throw new Error('updateTeamConfig API not implemented yet') }
import type {
  AsymmetricEncryptionConfigItem,
  EmailConfigItem,
  SymmetricEncryptionConfigItem,
  TeamConfigItem
} from '@/api/request/types/model-types'
import { GlobalContext } from '@/utils/context'
import { SaveOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Button, Card, Col, Form, Row, Space, message } from 'antd'
import { FileLock2, FolderKey, Mail, Settings } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { AsymmetricEncryptionSection } from './config-asymmetric'
import { EmailConfigSection } from './config-email'
import { SymmetricEncryptionSection } from './config-symmetric'

export type TeamConfigFormData = {
  /** 邮箱配置 */
  emailConfig: EmailConfigItem[]
  /** 对称加密配置 */
  symmetricEncryptionConfig: SymmetricEncryptionConfigItem
  /** 非对称加密配置 */
  asymmetricEncryptionConfig: AsymmetricEncryptionConfigItem
}

export default function TeamConfig() {
  const [form] = Form.useForm<TeamConfigFormData>()
  const { contentHeight } = useContext(GlobalContext)

  const [teamConfig, setTeamConfig] = useState<TeamConfigItem>()
  const [emailConfigs, setEmailConfigs] = useState<EmailConfigItem[]>([
    {
      host: '',
      port: '',
      user: '',
      pass: ''
    }
  ])

  const { run: initTeamConfig, loading: isLoading } = useRequest(getTeamConfig, {
    manual: true,
    onSuccess: (data) => {
      setTeamConfig(data)
    }
  })

  const { run: editTeamConfig, loading: isEditing } = useRequest(updateTeamConfig, {
    manual: true,
    onSuccess: () => {
      message.success('配置保存成功')
    }
  })

  const handleSubmit = () => {
    console.log(form.getFieldsValue())
    try {
      const values = form.getFieldsValue()
      editTeamConfig({
        ...values
      })
    } catch (error) {
      console.error(error)
      message.error('请检查表单填写是否完整')
    }
  }

  useEffect(() => {
    initTeamConfig()
  }, [initTeamConfig])

  useEffect(() => {
    if (teamConfig) {
      form.setFieldsValue({
        ...teamConfig
      })
    }
  }, [teamConfig, form])

  const addEmailConfig = () => {
    setEmailConfigs([...emailConfigs, { user: '', pass: '', host: '', port: '' }])
  }

  return (
    <Form className='p-3 gap-3 flex flex-col' form={form} layout='vertical' onFinish={handleSubmit}>
      <Card
        loading={isLoading || isEditing}
        bordered={false}
        title={
          <div className='flex items-center gap-2'>
            <Settings />
            团队配置
            <Button size='small' color='default' variant='filled' onClick={initTeamConfig}>
              刷新
            </Button>
          </div>
        }
        extra={
          <Button type='primary' htmlType='submit' icon={<SaveOutlined />}>
            保存配置
          </Button>
        }
        className='shadow-md overflow-auto'
      >
        <Row gutter={16} className='h-full overflow-auto' style={{ height: contentHeight ? contentHeight - 24 : 0 }}>
          <Col span={24}>
            <Card
              type='inner'
              title={
                <div className='flex items-center gap-2 justify-between'>
                  <Space>
                    <Mail /> 邮箱配置
                  </Space>
                  <Button type='primary' onClick={addEmailConfig}>
                    添加配置
                  </Button>
                </div>
              }
              className='mb-4'
            >
              <EmailConfigSection emailConfigs={emailConfigs} setEmailConfigs={setEmailConfigs} form={form} />
            </Card>
          </Col>
          <Col span={24}>
            <Card
              type='inner'
              title={
                <div className='flex items-center gap-2'>
                  <FileLock2 /> 对称加密
                </div>
              }
              className='mb-4'
            >
              <SymmetricEncryptionSection />
            </Card>
          </Col>
          <Col span={24}>
            <Card
              type='inner'
              title={
                <div className='flex items-center gap-2'>
                  <FolderKey /> 非对称加密
                </div>
              }
              className='mb-4'
            >
              <AsymmetricEncryptionSection />
            </Card>
          </Col>
        </Row>
      </Card>
    </Form>
  )
}
