import type { NoticeGroupItem, TeamMetricDatasourceItem, TeamStrategyItem } from '@/api2/common.types'
import { ConditionMetric, DatasourceDriverMetric, DictType, GlobalStatus, SampleMode, StrategyType } from '@/api2/enum'
import { ConditionMetricData, SampleModeData, defaultPaginationReq } from '@/api2/global'
import { baseURL } from '@/api2/request'
import { listTeamMetricDatasource } from '@/api2/team/team-datasource'
import { selectTeamDict } from '@/api2/team/team-dict'
import type { SelectItem } from '@/api2/team/team-dict.types'
import { listTeamNoticeGroup } from '@/api2/team/team-notice'
import {
  getTeamMetricStrategy,
  saveTeamMetricStrategy,
  saveTeamMetricStrategyLevels,
  saveTeamStrategy
} from '@/api2/team/team-strategy'
import type { GetTeamMetricStrategyReply } from '@/api2/team/team-strategy.types'
import { AnnotationsEditor } from '@/components/data/child/annotation-editor'
import PromQLInput from '@/components/data/child/prom-ql'
import { DataFrom } from '@/components/data/form'
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
  Typography,
  theme
} from 'antd'
import type { StepProps } from 'antd/lib'
import { useEffect, useState } from 'react'
import { basicFormItems } from './options'

export interface MetricEditModalProps extends ModalProps {
  strategyDetail?: TeamStrategyItem
}

export default function MetricEditModal(props: MetricEditModalProps) {
  const { strategyDetail, ...restProps } = props
  const { token } = theme.useToken()
  const [form] = Form.useForm()

  const selectDatasource = Form.useWatch('datasource', form)
  const levelsWatch = Form.useWatch('levels', form)
  const [levelConditions, setLevelConditions] = useState<Record<number, ConditionMetric>>({})

  const [current, setCurrent] = useState(0)
  const [metricStrategyList, setMetricStrategyList] = useState<GetTeamMetricStrategyReply>()
  const [strategyId, setStrategyId] = useState<number | undefined>()
  const pathPrefix = `${baseURL}/api/team/datasource/metric/${selectDatasource?.at(0) || 0}`
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
  const [alarmLevelList, setAlarmLevelList] = useState<SelectItem[]>([])
  const [alarmPageList, setAlarmPageList] = useState<SelectItem[]>([])
  const [alarmGroupList, setAlarmGroupList] = useState<NoticeGroupItem[]>([])

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

  useEffect(() => {
    console.log('levelsWatch', levelsWatch)
    if (levelsWatch && Array.isArray(levelsWatch)) {
      const conditions: Record<number, ConditionMetric> = {}
      levelsWatch.forEach((level, index) => {
        if (level && typeof level === 'object' && 'condition' in level) {
          conditions[index] = level.condition
        }
      })
      setLevelConditions(conditions)
    }
  }, [levelsWatch])

  const { run: getStrategyDetail } = useRequest(getTeamMetricStrategy, {
    manual: true,
    onSuccess: (data) => {
      setMetricStrategyList(data)
      form.setFieldsValue({
        ...data
      })
    }
  })
  const { run: saveStrategy, loading: saveTeamStrategyLoading } = useRequest(saveTeamStrategy, {
    manual: true,
    onSuccess: (res) => {
      console.log(res)
      setStrategyId(res.strategyId)
      setCurrent(current + 1)
    }
  })
  const { run: saveMetricStrategy, loading: saveMetricStrategyLoading } = useRequest(saveTeamMetricStrategy, {
    manual: true,
    onSuccess: (res) => {
      console.log(res)
      setCurrent(current + 1)
    }
  })
  const { run: saveMetricStrategyLevels, loading: saveMetricStrategyLevelsLoading } = useRequest(
    saveTeamMetricStrategyLevels,
    {
      manual: true,
      onSuccess: (res) => {
        console.log(res)
      }
    }
  )
  const { run: initDatasourceList, loading: datasourceListLoading } = useRequest(listTeamMetricDatasource, {
    manual: true,
    onSuccess: (data) => {
      setDatasourceList(data?.items || [])
    }
  })

  const { run: initAlarmLevelList, loading: alarmLevelListLoading } = useRequest(selectTeamDict, {
    manual: true,
    onSuccess: (data) => {
      setAlarmLevelList(data?.items || [])
    }
  })

  const { run: initAlarmPageList, loading: alarmPageListLoading } = useRequest(selectTeamDict, {
    manual: true,
    onSuccess: (data) => {
      setAlarmPageList(data?.items || [])
    }
  })

  const { run: initAlarmGroupList, loading: alarmGroupListLoading } = useRequest(listTeamNoticeGroup, {
    manual: true,
    onSuccess: (data) => {
      setAlarmGroupList(
        data?.items || [
          {
            noticeGroupId: 0,
            name: '默认告警组',
            status: GlobalStatus.GLOBAL_STATUS_ENABLE
          }
        ]
      )
    }
  })

  const steps = [
    {
      title: '基本信息',

      //   content: <DataFrom props={{ form }} items={basicFormItems} />
      content: (
        <>
          <DataFrom props={{ form, layout: 'vertical' }} items={basicFormItems} />
        </>
      )
    },
    {
      title: '数据源',
      //   content: <DataFrom props={{ form }} items={metricStrategyFormItems} />
      content: (
        <>
          <Form form={form} layout='vertical'>
            <Form.Item label='数据源' name='datasource' rules={[{ required: true, message: '请选择数据源' }]}>
              <Select
                mode='multiple'
                allowClear
                loading={datasourceListLoading}
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
                <AnnotationsEditor
                  labels={summaryOkInfo.labels}
                  language='summary'
                  disabled={saveMetricStrategyLoading}
                />
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
                  disabled={saveMetricStrategyLevelsLoading}
                />
              </Form.Item>
            </Form.Item>
          </Form>
        </>
      )
    },
    {
      title: '告警等级',
      content: (
        <Form form={form} layout='vertical'>
          <Form.Item label={<b>告警等级</b>} required>
            <Form.List name='levels'>
              {(fields, { add, remove }) => (
                <div className='flex flex-col gap-4'>
                  {fields.map((field, index) => (
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
                                  <Tag bordered={false} color={item.extra?.color}>
                                    {item.label}
                                  </Tag>
                                ),
                                value: item.value,
                                disabled: item.disabled
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
                              options={Object.entries(ConditionMetricData)
                                .filter(([key]) => +key !== ConditionMetric.CONDITION_METRIC_UNKNOWN)
                                .map(([key, value]) => ({
                                  value: +key,
                                  label: value
                                }))}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.List name={[field.name, 'total']}>
                            {(fields, { add, remove }) => {
                              if (fields.length === 0) {
                                add()
                              }
                              if (
                                levelConditions[index] === ConditionMetric.CONDITION_METRIC_IN ||
                                levelConditions[index] === ConditionMetric.CONDITION_METRIC_NOT_IN
                              ) {
                                if (fields.length < 2) {
                                  add()
                                }
                              } else {
                                if (fields.length > 1) {
                                  // 删除多余的
                                  fields.forEach((field, index) => {
                                    if (index > 0) {
                                      remove(field.key)
                                    }
                                  })
                                }
                              }
                              return (
                                <div>
                                  {fields.map((field) => (
                                    <Form.Item key={field.key} name={field.name}>
                                      <InputNumber className='w-full' placeholder='请输入最小值' />
                                    </Form.Item>
                                  ))}
                                </div>
                              )
                            }}
                          </Form.List>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            label='触发类型'
                            name={[field.name, 'sampleMode']}
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
                              options={Object.entries(SampleModeData)
                                .filter(([key]) => +key !== SampleMode.SAMPLE_MODE_UNKNOWN)
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
                            name={[field.name, 'alarmPages']}
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
                                  <Tag bordered={false} color={item.extra?.color}>
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
                            name={[field.name, 'receiverRoutes']}
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
                                value: item.noticeGroupId,
                                disabled: item.status !== GlobalStatus.GLOBAL_STATUS_ENABLE
                              }))}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Form.Item label={<b>label通知对象</b>}>
                        <Form.List name={[field.name, 'labelNotices']}>
                          {(fields, { add, remove }) => (
                            <div key={`${fields.length}_1`}>
                              <Row gutter={24} wrap>
                                {fields.map(({ key, name, ...restField }) => (
                                  <Col span={24} key={key}>
                                    <span className='flex items-center gap-2'>
                                      <Row gutter={24} className='w-full'>
                                        <Col span={10}>
                                          <Form.Item
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
                                            name={[name, 'receiverRoutes']}
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
                                                value: item.noticeGroupId,
                                                disabled: item.status !== GlobalStatus.GLOBAL_STATUS_ENABLE
                                              }))}
                                            />
                                          </Form.Item>
                                        </Col>
                                      </Row>
                                      <MinusCircleOutlined
                                        onClick={() => remove(name)}
                                        style={{
                                          color: token.colorError
                                        }}
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
        </Form>
      )
    }
  ]
  const stepItems: StepProps[] = steps.map((item) => ({
    key: item.title,
    title: item.title
  }))

  const next = () => {
    setCurrent(current + 1)
    //   form.validateFields().then((values) => {
    //   console.log('values', values)
    //   // if (current === 0) {
    //   //   saveStrategy({ ...values, strategyType: 'STRATEGY_TYPE_METRIC', ...(strategyId && { strategyId }) })
    //   // } else if (current === 1) {
    //   //   console.log('strategyId', strategyId)
    //   //   saveMetricStrategy({ ...values, strategyId })
    //   // }
    // })
  }

  const prev = () => {
    setCurrent(current - 1)
  }
  const finish = () => {
    form.validateFields().then((values) => {
      const levels = values.strategyMetricLevels?.map((item: { levelId: number | undefined }) => ({
        ...item,
        levelName: alarmLevelList.find((level) => level.value === item.levelId)?.label
      }))
      console.log('levels', levels)
      saveMetricStrategyLevels({
        strategyId,
        levels
      })
    })
  }

  const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setStrategyId(undefined)
    setCurrent(0)
    form.resetFields()
    props.onCancel?.(e)
  }

  useEffect(() => {
    initDatasourceList({ pagination: defaultPaginationReq })
    initAlarmLevelList({
      pagination: defaultPaginationReq,
      dictTypes: [DictType.DICT_TYPE_ALARM_LEVEL]
    })
    initAlarmPageList({
      pagination: defaultPaginationReq,
      dictTypes: [DictType.DICT_TYPE_ALARM_PAGE]
    })
    initAlarmGroupList({ pagination: defaultPaginationReq })
  }, [initAlarmGroupList, initAlarmLevelList, initAlarmPageList, initDatasourceList])

  useEffect(() => {
    if (strategyDetail) {
      setStrategyId(strategyDetail.strategyId)
      getStrategyDetail({
        strategyId: strategyDetail.strategyId,
        strategyType: StrategyType.STRATEGY_TYPE_METRIC
      })
    } else {
      setStrategyId(undefined)
    }
  }, [strategyDetail, getStrategyDetail])

  return (
    <Modal {...restProps} footer={null} onCancel={onCancel}>
      <Steps current={current} items={stepItems} />
      <div className='mt-10 max-h-[60vh] overflow-y-auto overflow-x-hidden'>{steps[current].content}</div>
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
          <Button type='primary' onClick={() => finish()} loading={saveMetricStrategyLevelsLoading}>
            完成
          </Button>
        )}
      </div>
    </Modal>
  )
}
