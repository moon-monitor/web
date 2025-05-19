import {
  NoticeGroupItem,
  TeamDictItem,
  TeamMetricDatasourceItem,
  TeamStrategyGroupItem,
  TeamStrategyItem
} from '@/api2/common.types'
import { DatasourceDriverMetric, GlobalStatus } from '@/api2/enum'
import { defaultPaginationReq } from '@/api2/global'
import { baseURL } from '@/api2/request'
import { listTeamMetricDatasource } from '@/api2/team/team-datasource'
import { listTeamDict } from '@/api2/team/team-dict'
import { listTeamNoticeGroup } from '@/api2/team/team-notice'
import {
  getTeamMetricStrategy,
  listTeamStrategyGroup,
  saveTeamMetricStrategy,
  saveTeamStrategy
} from '@/api2/team/team-strategy'
import { GetTeamMetricStrategyReply } from '@/api2/team/team-strategy.types'
import { AnnotationsEditor } from '@/components/data/child/annotation-editor'
import PromQLInput from '@/components/data/child/prom-ql'
import { GlobalContext } from '@/utils/context'
import { MinusCircleOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  type ModalProps,
  Popover,
  Row,
  Select,
  Space,
  Steps,
  Tag,
  theme,
  Typography
} from 'antd'
import { StepProps } from 'antd/lib'
import { useContext, useEffect, useState } from 'react'

export interface MetricEditModalProps extends ModalProps {
  strategyDetail?: TeamStrategyItem
}

export default function MetricEditModal(props: MetricEditModalProps) {
  const { strategyDetail, ...restProps } = props
  const { token } = theme.useToken()
  const { teamInfo } = useContext(GlobalContext)
  const [form] = Form.useForm()

  const selectDatasource = Form.useWatch('datasource', form)

  const [current, setCurrent] = useState(0)
  const [metricStrategyList, setMetricStrategyList] = useState<GetTeamMetricStrategyReply>()
  const [strategyGroupList, setStrategyGroupList] = useState<TeamStrategyGroupItem[]>([])
  const [alarmGroupList, setAlarmGroupList] = useState<NoticeGroupItem[]>([])
  const [strategyId, setStrategyId] = useState<number | undefined>()
  const [metricStrategyId, setMetricStrategyId] = useState<number | undefined>()
  const pathPrefix = `${baseURL}/metric/${teamInfo?.id || 0}/${selectDatasource?.at(0) || 0}`
  const [datasourceList, setDatasourceList] = useState<TeamMetricDatasourceItem[]>([
    {
      datasourceId: 1,
      name: 'Prometheus',
      driver: DatasourceDriverMetric.DATASOURCE_DRIVER_METRIC_PROMETHEUS,
      status: GlobalStatus.GLOBAL_STATUS_ENABLE,
      endpoint: '',
      queryMethod: 0,
      remark: '',
      scrapeInterval: '',
      teamId: 0,
      updatedAt: '',
      creator: undefined
    }
  ])
  const [alarmLevelList, setAlarmLevelList] = useState<TeamDictItem[]>([])

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
  const loading = false

  const { run: initStrategyGroupList, loading: strategyGroupListLoading } = useRequest(listTeamStrategyGroup, {
    manual: true,
    onSuccess: ({ items }) => {
      setStrategyGroupList(items || [])
    }
  })

  const { run: initAlarmGroupList, loading: alarmGroupListLoading } = useRequest(listTeamNoticeGroup, {
    manual: true,
    onSuccess: (data) => {
      setAlarmGroupList(data?.items || [])
    }
  })

  const { run: getStrategyDetail } = useRequest(getTeamMetricStrategy, {
    manual: true,
    onSuccess: (data) => {
      setMetricStrategyList(data)
    }
  })
  const { run: saveStrategy, loading: saveTeamStrategyLoading } = useRequest(saveTeamStrategy, {
    manual: true,
    onSuccess: (res) => {
      console.log(res)
      setStrategyId(res.id)
      setCurrent(current + 1)
    }
  })
  const { run: saveMetricStrategy, loading: saveMetricStrategyLoading } = useRequest(saveTeamMetricStrategy, {
    manual: true,
    onSuccess: (res) => {
      console.log(res)
      setMetricStrategyId(res.id)
      setCurrent(current + 1)
    }
  })

  const { run: initDatasourceList, loading: datasourceListLoading } = useRequest(listTeamMetricDatasource, {
    manual: true,
    onSuccess: (data) => {
      setDatasourceList(data?.items || [])
    }
  })

  const { run: initAlarmLevelList, loading: alarmLevelListLoading } = useRequest(listTeamDict, {
    manual: true,
    onSuccess: (data) => {
      setAlarmLevelList(data?.items || [])
    }
  })

  const steps = [
    {
      title: '基本信息',
      //   content: <DataFrom props={{ form }} items={basicFormItems} />
      content: (
        <>
          <Form.Item label='策略名称' name='name' rules={[{ required: true, message: '请输入策略名称' }]}>
            <Input placeholder='请输入策略名称' allowClear />
          </Form.Item>
          <Form.Item label='策略组' name='groupId' rules={[{ required: true, message: '请选择策略组' }]}>
            <Select
              placeholder='请选择策略组'
              allowClear
              loading={strategyGroupListLoading}
              options={strategyGroupList.map((item) => ({
                label: item.name,
                value: item.groupId,
                disabled: item.status !== GlobalStatus.GLOBAL_STATUS_ENABLE
              }))}
            />
          </Form.Item>
          <Form.Item
            label='通知对象'
            name='receiverRoutes'
            rules={[
              {
                required: false,
                message: '请选择通知对象'
              }
            ]}
          >
            <Select
              placeholder='请选择通知对象'
              allowClear
              mode='multiple'
              loading={alarmGroupListLoading}
              options={alarmGroupList.map((item) => ({
                label: item.name,
                value: item.noticeGroupId,
                disabled: item.status !== GlobalStatus.GLOBAL_STATUS_ENABLE
              }))}
            />
          </Form.Item>
          <Form.Item label='备注' name='remark'>
            <Input.TextArea placeholder='请输入描述' allowClear maxLength={200} />
          </Form.Item>
        </>
      )
    },
    {
      title: '选择数据源',
      //   content: <DataFrom props={{ form }} items={metricStrategyFormItems} />
      content: (
        <>
          <Form.Item label='数据源' name='datasource' rules={[{ required: true, message: '请选择数据源' }]}>
            <Select
              mode='multiple'
              allowClear
              loading={datasourceListLoading}
              placeholder='请选择数据源'
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
              <AnnotationsEditor labels={summaryOkInfo.labels} language='summary' disabled={loading} />
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
                disabled={loading}
              />
            </Form.Item>
          </Form.Item>
        </>
      )
    },
    {
      title: '选择指标',
      content: (
        <>
          <Form.Item label={<b>告警等级</b>} required>
            <Form.List name='strategyMetricLevels'>
              {(fields, { add, remove }) => (
                <div className='flex flex-col gap-4'>
                  {fields.map((field) => (
                    <Card
                      size='small'
                      title={`策略等级明细 ${field.name + 1}`}
                      key={field.key}
                      extra={
                        <MinusCircleOutlined
                          style={{ color: token.colorError }}
                          onClick={() => {
                            remove(field.name)
                          }}
                        />
                      }
                    >
                      <Row gutter={12}>
                        <Col span={12}>
                          <Form.Item
                            label='告警等级'
                            name={[field.name, 'levelId']}
                            rules={[
                              {
                                required: true,
                                message: '请选择告警等级'
                              }
                            ]}
                          >
                            <Select
                              allowClear
                              placeholder='请选择告警等级'
                              loading={alarmLevelListLoading}
                              options={alarmLevelList.map((item) => ({
                                label: (
                                  <Tag bordered={false} color={item.color}>
                                    {item.value}
                                  </Tag>
                                ),
                                value: item.value,
                                disabled: item.status !== GlobalStatus.GLOBAL_STATUS_ENABLE
                              }))}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item
                            label='判断条件'
                            name={[field.name, 'condition']}
                            rules={[
                              {
                                required: true,
                                message: '请选择判断条件'
                              }
                            ]}
                          >
                            <Select
                              allowClear
                              placeholder='请选择判断条件'
                              options={Object.entries(ConditionData)
                                .filter(([key]) => +key !== Condition.ConditionUnknown)
                                .map(([key, value]) => ({
                                  value: +key,
                                  label: value
                                }))}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item
                            label='阈值'
                            name={[field.name, 'threshold']}
                            rules={[
                              {
                                required: true,
                                message: '请输入阈值'
                              }
                            ]}
                          >
                            <InputNumber className='w-full' placeholder='请输入阈值' />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            label='触发类型'
                            name={[field.name, 'sustainType']}
                            rules={[
                              {
                                required: true,
                                message: '请选择触发类型'
                              }
                            ]}
                          >
                            <Select
                              allowClear
                              placeholder='请选择触发类型'
                              options={Object.entries(SustainTypeData)
                                .filter(([key]) => +key !== SustainType.SustainTypeUnknown)
                                .map(([key, value]) => ({
                                  value: +key,
                                  label: value
                                }))}
                            />
                          </Form.Item>
                        </Col>

                        <Col span={6}>
                          <Form.Item
                            label='持续时间'
                            name={[field.name, 'duration']}
                            initialValue={10}
                            rules={[
                              {
                                required: true,
                                message: '请输入持续时间'
                              }
                            ]}
                          >
                            <InputNumber addonAfter='秒' className='w-full' placeholder='请输入持续时间' />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item
                            label='持续次数'
                            name={[field.name, 'count']}
                            initialValue={1}
                            rules={[
                              {
                                required: true,
                                message: '请输入持续次数'
                              }
                            ]}
                          >
                            <InputNumber addonAfter='次' className='w-full' placeholder='请输入持续次数' />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          <Form.Item
                            label='告警页面'
                            name={[field.name, 'alarmPageIds']}
                            rules={[
                              {
                                required: true,
                                message: '请选择告警页面'
                              }
                            ]}
                          >
                            <Select
                              allowClear
                              placeholder='请选择告警页面'
                              loading={alarmPageListLoading}
                              mode='multiple'
                              options={alarmPageList.map((item) => ({
                                label: (
                                  <Tag bordered={false} color={item.extend?.color}>
                                    {item.label}
                                  </Tag>
                                ),
                                value: item.value,
                                disabled: item.disabled
                              }))}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          <Form.Item
                            label='通知对象'
                            name={[field.name, 'alarmGroupIds']}
                            rules={[
                              {
                                required: false,
                                message: '请选择通知对象'
                              }
                            ]}
                          >
                            <Select
                              mode='multiple'
                              allowClear
                              loading={alarmGroupListLoading}
                              placeholder='请选择通知对象'
                              options={alarmGroupList.map((item) => ({
                                label: item.name,
                                value: item.id,
                                disabled: item.status !== 'GLOBAL_STATUS_ENABLE'
                              }))}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Form.Item label={<b>label通知对象</b>}>
                        <Form.List name={[field.name, 'strategyLabels']}>
                          {(fields, { add, remove }) => (
                            <div key={`${fields.length}_1`}>
                              <Row gutter={24} wrap>
                                {fields.map(({ key, name, ...restField }) => (
                                  <Col span={24} key={key}>
                                    <span className='flex items-center gap-2'>
                                      <Row gutter={24} className='w-full'>
                                        <Col span={10}>
                                          <Form.Item
                                            name={[name, 'name']}
                                            label={[name, 'name'].join('.')}
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
                                        <Col span={14}>
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
                                        </Col>
                                        <Col span={24}>
                                          <Form.Item
                                            {...restField}
                                            name={[name, 'alarmGroupIds']}
                                            label={[name, '通知对象'].join('.')}
                                            rules={[
                                              {
                                                required: true,
                                                message: '标签值不允许为空'
                                              }
                                            ]}
                                            className='flex-1'
                                          >
                                            <Select
                                              allowClear
                                              placeholder='请选择通知对象'
                                              loading={alarmGroupListLoading}
                                              options={alarmGroupList.map((item) => ({
                                                label: item.name,
                                                value: item.id,
                                                disabled: item.status !== 'GLOBAL_STATUS_ENABLE'
                                              }))}
                                            />
                                          </Form.Item>
                                        </Col>
                                      </Row>
                                      <MinusCircleOutlined
                                        onClick={() => remove(name)}
                                        style={{ color: token.colorError }}
                                      />
                                    </span>
                                  </Col>
                                ))}
                              </Row>
                              <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
                                添加新 label 通知对象
                              </Button>
                            </div>
                          )}
                        </Form.List>
                      </Form.Item>
                    </Card>
                  ))}
                  <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
                    添加策略等级
                  </Button>
                </div>
              )}
            </Form.List>
          </Form.Item>
        </>
      )
    }
  ]
  const stepItems: StepProps[] = steps.map((item) => ({
    key: item.title,
    title: item.title
  }))

  const next = () => {
    setCurrent(current + 1)
    // form.validateFields().then((values) => {
    //   console.log(values)
    //   setCurrent(current + 1)
    //   // if (current === 0) {
    //   //   saveStrategy({ ...values, strategyId, strategyType: 'STRATEGY_TYPE_METRIC' })
    //   // } else if (current === 1) {
    //   //   saveMetricStrategy({ ...values, strategyId, metricStrategyId })
    //   // }
    // })
  }

  const prev = () => {
    setCurrent(current - 1)
  }
  const finish = () => {
    form.validateFields().then((values) => {
      console.log(values)
    })
  }

  useEffect(() => {
    initStrategyGroupList({ pagination: defaultPaginationReq })
    initAlarmGroupList({ pagination: defaultPaginationReq })
    initDatasourceList({ pagination: defaultPaginationReq })
    initAlarmLevelList({ pagination: defaultPaginationReq })
  }, [])
  useEffect(() => {
    if (strategyDetail) {
      getStrategyDetail({ strategyId: strategyDetail.strategyId, strategyType: 'STRATEGY_TYPE_METRIC' })
    }
  }, [strategyDetail])
  return (
    <Modal {...restProps} footer={null}>
      <Steps current={current} items={stepItems} />
      <div className='mt-10 h-30'>
        <Form form={form}>{steps[current].content}</Form>
      </div>
      <div className='mt-10 flex justify-end'>
        {current > 0 && (
          <Button className='mr-2' onClick={() => prev()}>
            上一步
          </Button>
        )}
        {current < stepItems.length - 1 && (
          <Button type='primary' onClick={() => next()} loading={saveTeamStrategyLoading || saveMetricStrategyLoading}>
            下一步
          </Button>
        )}
        {current === stepItems.length - 1 && (
          <Button type='primary' onClick={() => finish()}>
            完成
          </Button>
        )}
      </div>
    </Modal>
  )
}
