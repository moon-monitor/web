import { getTeamMetricDatasource, saveTeamMetricDatasource } from '@/api/team/team-datasource'
import { SaveTeamMetricDatasourceRequest } from '@/api/team/team-datasource.types'
import { DataFrom } from '@/components/data/form'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { useRequest, useSetState } from 'ahooks'
import { Button, Col, Form, Input, Modal, type ModalProps, Radio, Row, Space, Switch, theme } from 'antd'
import React, { useCallback, useEffect } from 'react'
import { formItems } from './options'

export interface EditModalProps extends ModalProps {
  datasourceId?: number
  onOk?: () => void
}

const { useToken } = theme

export const EditModal: React.FC<EditModalProps> = (props) => {
  const { token } = useToken()
  const { onCancel, onOk, open, datasourceId } = props
  const [form] = Form.useForm<SaveTeamMetricDatasourceRequest>()
  const [configState, setConfigState] = useSetState({
    basicAuth: false,
    tls: false,
    ca: false
  })

  const { run: getDatasourceDetail, loading: getDatasourceDetailLoading } = useRequest(getTeamMetricDatasource, {
    manual: true,
    onSuccess: (data) => {
      if (data) {
        form.setFieldsValue(data)
        setConfigState({
          basicAuth: !!data.basicAuth,
          tls: !!data.tls,
          ca: !!data.ca
        })
      }
    }
  })

  const { run: saveDatasourceDetail, loading: saveDatasourceDetailLoading } = useRequest(saveTeamMetricDatasource, {
    manual: true,
    onSuccess: () => {
      form.resetFields()
      onOk?.()
    }
  })

  const handleOnOk = () => {
    form.validateFields().then((values) => {
      saveDatasourceDetail({ ...values, datasourceId })
    })
  }

  const handleGetDatasource = useCallback(() => {
    if (!datasourceId) return
    getDatasourceDetail({ datasourceId })
  }, [datasourceId, getDatasourceDetail])

  useEffect(() => {
    if (open) {
      setConfigState({
        basicAuth: false,
        tls: false,
        ca: false
      })
      handleGetDatasource()
    }
  }, [open, handleGetDatasource, setConfigState])

  const handleOnCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    form.resetFields()
    onCancel?.(e)
  }

  return (
    <Modal
      {...props}
      title='新建数据源'
      open={open}
      onCancel={handleOnCancel}
      onOk={handleOnOk}
      confirmLoading={saveDatasourceDetailLoading}
      loading={getDatasourceDetailLoading}
      style={{ minWidth: 800 }}
    >
      <DataFrom props={{ form, layout: 'vertical' }} items={formItems}>
        <Form.Item label='请求头'>
          <Form.List name='headers'>
            {(fields, { add, remove }) => {
              return (
                <div key={fields.length} className='w-full'>
                  {fields.map(({ key, name, ...restField }) => {
                    return (
                      <Row gutter={12}>
                        <Col span={12} key={key}>
                          <Form.Item
                            {...restField}
                            name={[name, 'key']}
                            label={['请求头', name, 'KEY'].join('.')}
                            rules={[{ required: true, message: ['请求头', name, 'KEY'].join('.') }]}
                          >
                            <Input placeholder={['请输入请求头', name, 'KEY'].join('.')} />
                          </Form.Item>
                        </Col>
                        <Col span={11} key={key}>
                          <Form.Item
                            {...restField}
                            name={[name, 'value']}
                            label={['请求头', name, 'VALUE'].join('.')}
                            rules={[{ required: true, message: ['请求头', name, 'VALUE'].join('.') }]}
                          >
                            <Input placeholder={['请输入请求头', name, 'VALUE'].join('.')} />
                          </Form.Item>
                        </Col>
                        <Col span={1} className='flex items-center justify-center'>
                          <MinusCircleOutlined onClick={() => remove(name)} style={{ color: token.colorError }} />
                        </Col>
                      </Row>
                    )
                  })}
                  <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
                    添加新请求头
                  </Button>
                </div>
              )
            }}
          </Form.List>
        </Form.Item>
        <Form.Item
          label={
            <Space>
              基础认证配置{' '}
              <Switch
                size='small'
                checked={configState.basicAuth}
                onChange={(checked) => setConfigState({ basicAuth: checked })}
              />
            </Space>
          }
        >
          {configState.basicAuth && (
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name={['basicAuth', 'username']}
                  label='用户名'
                  rules={[{ required: true, message: '请输入用户名' }]}
                >
                  <Input placeholder='请输入用户名' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={['basicAuth', 'password']}
                  label='密码'
                  rules={[{ required: true, message: '请输入密码' }]}
                >
                  <Input placeholder='请输入密码' />
                </Form.Item>
              </Col>
            </Row>
          )}
        </Form.Item>
        <Form.Item
          label={
            <Space>
              自签证书
              <Switch size='small' checked={configState.ca} onChange={(checked) => setConfigState({ ca: checked })} />
            </Space>
          }
          required={configState.ca}
        >
          {configState.ca && (
            <Form.Item name='ca' rules={[{ required: true, message: '请输入自签证书' }]}>
              <Input.TextArea placeholder='请输入自签证书' />
            </Form.Item>
          )}
        </Form.Item>
        <Form.Item
          label={
            <Space>
              TLS
              <Switch size='small' checked={configState.tls} onChange={(checked) => setConfigState({ tls: checked })} />
            </Space>
          }
        >
          {configState.tls && (
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name={['tls', 'serverName']}
                  label='服务名'
                  rules={[{ required: true, message: '请输入服务名' }]}
                >
                  <Input placeholder='请输入服务名' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name={['tls', 'skipVerify']} label='跳过验证'>
                  <Radio.Group
                    options={[
                      { label: '是', value: true },
                      { label: '否', value: false }
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name={['tls', 'clientCert']}
                  label='客户端证书'
                  rules={[{ required: true, message: '请输入客户端证书' }]}
                >
                  <Input.TextArea placeholder='请输入客户端证书' />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name={['tls', 'clientKey']}
                  label='客户端密钥'
                  rules={[{ required: true, message: '请输入客户端密钥' }]}
                >
                  <Input.TextArea placeholder='请输入客户端密钥' />
                </Form.Item>
              </Col>
            </Row>
          )}
        </Form.Item>
      </DataFrom>
    </Modal>
  )
}
