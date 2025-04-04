import { listDatasource } from '@/api/datasource'
import { dictSelectList } from '@/api/dict'
import { DatasourceType, DictType, EventDataType, MQCondition, Status, StrategyType } from '@/api/enum'
import { EventDataTypeData, MQConditionData, defaultPaginationReq } from '@/api/global'
import type {
  AlarmNoticeGroupItem,
  DatasourceItem,
  SelectItem,
  StrategyGroupItem,
  StrategyItem
} from '@/api/model-types'
import { listAlarmGroup } from '@/api/notify/alarm-group'
import {
  type CreateStrategyRequestFormData,
  createStrategy,
  getStrategy,
  listStrategyGroup,
  parseEventStrategyDetailToFormData,
  parseFormDataToStrategyLabels,
  updateStrategy
} from '@/api/strategy'
import { AnnotationsEditor } from '@/components/data/child/annotation-editor'
import { useSubmit } from '@/hooks/submit'
import { MinusCircleOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  type ModalProps,
  Popover,
  Row,
  Select,
  Space,
  Tag,
  Typography,
  theme
} from 'antd'
import { useCallback, useEffect, useState } from 'react'

export interface EventEditModalProps extends ModalProps {
  eventStrategyDetail?: StrategyItem
}

export default function EventEditModal(props: EventEditModalProps) {
  const { eventStrategyDetail, onOk, ...restProps } = props
  const { token } = theme.useToken()
  const [form] = Form.useForm<CreateStrategyRequestFormData>()

  const [datasourceList, setDatasourceList] = useState<DatasourceItem[]>([])
  const [strategyGroupList, setStrategyGroupList] = useState<StrategyGroupItem[]>([])
  const [strategyCategoryList, setStrategyCategoryList] = useState<SelectItem[]>([])
  const [alarmGroupList, setAlarmGroupList] = useState<AlarmNoticeGroupItem[]>([])
  const [alarmPageList, setAlarmPageList] = useState<SelectItem[]>([])
  const [alarmLevelList, setAlarmLevelList] = useState<SelectItem[]>([])
  const [detail, setDetail] = useState<StrategyItem>()

  const { run: initDetail, loading: detailLoading } = useRequest(getStrategy, {
    manual: true,
    onSuccess: (data) => {
      setDetail(data?.detail)
    }
  })

  const { run: initDatasourceList, loading: datasourceListLoading } = useRequest(listDatasource, {
    manual: true,
    onSuccess: (data) => {
      setDatasourceList(data?.list || [])
    }
  })
  const { run: initStrategyCategoryList, loading: strategyCategoryListLoading } = useRequest(dictSelectList, {
    manual: true,
    onSuccess: (data) => {
      setStrategyCategoryList(data?.list || [])
    }
  })

  const { run: initStrategyGroupList, loading: strategyGroupListLoading } = useRequest(listStrategyGroup, {
    manual: true,
    onSuccess: (data) => {
      setStrategyGroupList(data?.list || [])
    }
  })

  const { run: initAlarmGroupList, loading: alarmGroupListLoading } = useRequest(listAlarmGroup, {
    manual: true,
    onSuccess: (data) => {
      setAlarmGroupList(data?.list || [])
    }
  })

  const { run: initAlarmPageList, loading: alarmPageListLoading } = useRequest(dictSelectList, {
    manual: true,
    onSuccess: (data) => {
      setAlarmPageList(data?.list || [])
    }
  })

  const { run: initAlarmLevelList, loading: alarmLevelListLoading } = useRequest(dictSelectList, {
    manual: true,
    onSuccess: (data) => {
      setAlarmLevelList(data?.list || [])
    }
  })

  const initFormDeps = useCallback(() => {
    initDatasourceList({
      datasourceType: DatasourceType.DatasourceTypeEvent,
      pagination: defaultPaginationReq
    })
    initStrategyGroupList({
      pagination: defaultPaginationReq
    })
    initStrategyCategoryList({
      pagination: defaultPaginationReq,
      dictType: DictType.DictTypeStrategyCategory
    })
    initAlarmGroupList({
      pagination: defaultPaginationReq
    })
    initAlarmPageList({
      pagination: defaultPaginationReq,
      dictType: DictType.DictTypeAlarmPage
    })
    initAlarmLevelList({
      pagination: defaultPaginationReq,
      dictType: DictType.DictTypeAlarmLevel
    })
    if (eventStrategyDetail) {
      initDetail({
        id: eventStrategyDetail.id
      })
    }
  }, [
    initDatasourceList,
    initStrategyGroupList,
    initStrategyCategoryList,
    initAlarmGroupList,
    initAlarmPageList,
    initAlarmLevelList,
    eventStrategyDetail,
    initDetail
  ])

  useEffect(() => {
    if (restProps.open) {
      initFormDeps()
    }
  }, [restProps.open, initFormDeps])

  const { submit, loading } = useSubmit(updateStrategy, createStrategy, eventStrategyDetail?.id)

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

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    form
      .validateFields()
      .then((values) => {
        const submitValues = {
          ...values,
          labels: parseFormDataToStrategyLabels(values.labels)
        }
        if (eventStrategyDetail) {
          return submit({ data: submitValues, id: eventStrategyDetail?.id })
        }
        return submit(submitValues)
      })
      .then(() => {
        onOk?.(e)
      })
  }

  useEffect(() => {
    if (restProps.open) {
      if (detail) {
        form.setFieldsValue(parseEventStrategyDetailToFormData(detail))
      } else {
        form.resetFields()
      }
    }
  }, [detail, restProps.open, form])

  return (
    <Modal {...restProps} onOk={handleSubmit} loading={detailLoading} confirmLoading={loading}>
      <div className='max-h-[70vh] overflow-y-auto overflow-x-hidden'>
        <Form form={form} layout='vertical' autoComplete='off' disabled={loading}>
          <Form.Item name='strategyType' initialValue={StrategyType.StrategyTypeEvent} className='hidden'>
            <Input className='hidden' />
          </Form.Item>
          <Form.Item label='数据源' name='datasourceIds' rules={[{ required: true, message: '请选择数据源' }]}>
            <Select
              loading={datasourceListLoading}
              mode='multiple'
              allowClear
              placeholder='请选择数据源'
              options={datasourceList.map((item) => ({
                label: item.name,
                value: item.id,
                disabled: item.status !== Status.StatusEnable
              }))}
            />
          </Form.Item>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item label='策略名称' name='name' rules={[{ required: true, message: '请输入策略名称' }]}>
                <Input placeholder='请输入策略名称' allowClear />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label='策略组' name='groupId' rules={[{ required: true, message: '请选择策略组' }]}>
                <Select
                  placeholder='请选择策略组'
                  allowClear
                  loading={strategyGroupListLoading}
                  options={strategyGroupList.map((item) => ({
                    label: item.name,
                    value: item.id,
                    disabled: item.status !== Status.StatusEnable
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label='策略类型' name='categoriesIds' rules={[{ required: true, message: '请选择策略类型' }]}>
            <Select
              placeholder='请选择策略类型'
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
          </Form.Item>
          <Form.Item
            label='通知对象'
            name='alarmGroupIds'
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
                value: item.id,
                disabled: item.status !== Status.StatusEnable
              }))}
            />
          </Form.Item>
          <Form.Item label='主题' name='expr' rules={[{ required: true, message: '请输入主题' }]}>
            <Input placeholder='请输入主题' allowClear />
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
              <AnnotationsEditor labels={summaryOkInfo.labels} language='summary' />
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
              <AnnotationsEditor height={64 * 2} labels={descriptionOkInfo.labels} language='description' />
            </Form.Item>
          </Form.Item>
          <Form.Item label={<b>告警等级</b>} required>
            <Form.List name='strategyEventLevels'>
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
                              options={Object.entries(MQConditionData)
                                .filter(([key]) => +key !== MQCondition.MQConditionUnknown)
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
                            <Input className='w-full' placeholder='请输入阈值' />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            label='数据类型'
                            name={[field.name, 'dataType']}
                            rules={[
                              {
                                required: true,
                                message: '请选择数据类型'
                              }
                            ]}
                          >
                            <Select
                              allowClear
                              placeholder='请选择数据类型'
                              options={Object.entries(EventDataTypeData)
                                .filter(([key]) => +key !== EventDataType.EventDataTypeUnknown)
                                .map(([key, value]) => ({
                                  value: +key,
                                  label: value
                                }))}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            label='数据KEY'
                            name={[field.name, 'pathKey']}
                            tooltip={
                              <div>
                                <p>假设数据json为: {JSON.stringify({ data: [{ key: 'value' }] })}</p>
                                <p>则数据KEY为: data.0.key</p>
                              </div>
                            }
                          >
                            <Input className='w-full' placeholder='请输入数据KEY, 例如: data.0.key' />
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
                              mode='multiple'
                              allowClear
                              placeholder='请选择告警页面'
                              loading={alarmPageListLoading}
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
                              placeholder='请选择通知对象'
                              options={alarmGroupList.map((item) => ({
                                label: item.name,
                                value: item.id,
                                disabled: item.status !== Status.StatusEnable
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
                                            <Input placeholder='通知对象' />
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
        </Form>
      </div>
    </Modal>
  )
}
