import { TeamMetricDatasourceItem } from '@/api2/common.types'
import { GlobalStatus } from '@/api2/enum'
import { defaultPaginationReq } from '@/api2/global'
import { baseURL } from '@/api2/request'
import { listTeamMetricDatasource } from '@/api2/team/team-datasource'
import { saveTeamMetricStrategy } from '@/api2/team/team-strategy'
import { GetTeamMetricStrategyReply } from '@/api2/team/team-strategy.types'
import { AnnotationsEditor } from '@/components/data/child/annotation-editor'
import PromQLInput from '@/components/data/child/prom-ql'
import { MinusCircleOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  ModalProps,
  Popover,
  Row,
  Select,
  Space,
  theme,
  Typography
} from 'antd'
import { useEffect, useState } from 'react'

export interface MetricStrategyModalProps extends ModalProps {
  strategyDetail?: GetTeamMetricStrategyReply
}

export default function MetricStrategyModal(props: MetricStrategyModalProps) {
  const [form] = Form.useForm()
  const { token } = theme.useToken()
  const [datasourceList, setDatasourceList] = useState<TeamMetricDatasourceItem[]>([])
  const selectDatasource = Form.useWatch('datasource', form)
  const pathPrefix = `${baseURL}/api/team/datasource/metric/${selectDatasource?.at(0) || 0}`

  const [descriptionOkInfo] = useState<{
    info: string
    labels?: string[]
  }>({
    info: ''
  })
  const [summaryOkInfo] = useState<{
    info: string
    labels?: string[]
  }>({
    info: ''
  })
  const { run: saveMetricStrategy, loading: saveMetricStrategyLoading } = useRequest(saveTeamMetricStrategy, {
    manual: true,
    onSuccess: () => {
      message.success('保存成功')
      props.onCancel?.(new MouseEvent('click') as unknown as React.MouseEvent<HTMLButtonElement>)
    }
  })
  const { run: getDatasourceList, loading: getDatasourceListLoading } = useRequest(listTeamMetricDatasource, {
    manual: true,
    onSuccess: (res) => {
      setDatasourceList(res.items || [])
    }
  })
  const handleSubmit = () => {
    form.validateFields().then((values) => {
      saveMetricStrategy({
        ...values,
        strategyId: props.strategyDetail?.base.strategyId
      })
    })
  }

  useEffect(() => {
    if (props.open) {
      getDatasourceList({
        pagination: defaultPaginationReq
      })
    }

    if (props.open && props.strategyDetail) {
      form.setFieldsValue({
        ...props.strategyDetail,
        datasource: props.strategyDetail.datasource.map((item) => item.datasourceId)
      })
    }
  }, [props.open])

  return (
    <Modal {...props} onOk={handleSubmit}>
      <Form form={form} layout='vertical'>
        <Form.Item label='数据源' name='datasource' rules={[{ required: true, message: '请选择数据源' }]}>
          <Select
            mode='multiple'
            allowClear
            loading={getDatasourceListLoading}
            placeholder='请选择数据源'
            className='w-full'
            options={datasourceList.map((item) => ({
              label: item.name,
              value: item.datasourceId,
              disabled: item.status !== GlobalStatus.GLOBAL_STATUS_ENABLE
            }))}
          />
        </Form.Item>
        <Form.Item label='查询语句' name='expr' rules={[{ required: true, message: '请检查查询语句' }]}>
          <PromQLInput pathPrefix={pathPrefix} formatExpression />
        </Form.Item>
        <Form.Item label={<b>标签kv集合</b>} required>
          <Form.List
            name='labels'
            rules={[
              {
                message: '请输入至少一个标签',
                validator(_, value, callback) {
                  if (value.length === 0) {
                    callback('请输入至少一个标签')
                  } else {
                    callback()
                  }
                }
              }
            ]}
          >
            {(fields, { add, remove }) => (
              <div key={`${fields.length}_1`}>
                <Row gutter={12} wrap>
                  {fields.map(({ key, name, ...restField }) => (
                    <Col span={12} key={key}>
                      <Row gutter={12} className='w-[200%]'>
                        <Col span={4}>
                          <Form.Item
                            {...restField}
                            name={[name, 'key']}
                            label={[name, 'key'].join('.')}
                            rules={[
                              {
                                required: true,
                                message: '标签Key不允许为空'
                              }
                            ]}
                          >
                            <Input placeholder='key' />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <span className='flex items-center gap-2'>
                            <Form.Item
                              {...restField}
                              name={[name, 'value']}
                              label={[name, 'value'].join('.')}
                              rules={[
                                {
                                  required: true,
                                  message: '标签值不允许为空'
                                }
                              ]}
                              className='flex-1'
                            >
                              <Input placeholder='value' />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(name)} style={{ color: token.colorError }} />
                          </span>
                        </Col>
                      </Row>
                    </Col>
                  ))}
                </Row>
                <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
                  添加新标签
                </Button>
              </div>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item tooltip='注解用于告警展示的内容编辑' label={<b>注解</b>} required>
          <Form.Item
            name={['annotations', 'summary']}
            label={
              <Space size={8}>
                告警摘要
                <Popover
                  title='告警摘要, 告警内容如下所示'
                  content={
                    <Typography.Text ellipsis copyable className='w-[30vw]'>
                      {summaryOkInfo.info}
                    </Typography.Text>
                  }
                >
                  <QuestionCircleOutlined />
                </Popover>
              </Space>
            }
            rules={[{ required: true, message: '请输入告警摘要' }]}
          >
            <AnnotationsEditor labels={summaryOkInfo.labels} language='summary' disabled={saveMetricStrategyLoading} />
          </Form.Item>
          <Form.Item
            name={['annotations', 'description']}
            label={
              <Space size={8}>
                告警明细
                <Popover
                  title='告警明细, 告警内容如下所示'
                  content={
                    <Typography.Text ellipsis copyable className='w-[30vw]'>
                      {descriptionOkInfo.info}
                    </Typography.Text>
                  }
                >
                  <QuestionCircleOutlined />
                </Popover>
              </Space>
            }
            rules={[{ required: true, message: '请输入告警明细' }]}
          >
            <AnnotationsEditor
              height={64 * 2}
              labels={descriptionOkInfo.labels}
              language='description'
              disabled={saveMetricStrategyLoading}
            />
          </Form.Item>
        </Form.Item>
      </Form>
    </Modal>
  )
}
