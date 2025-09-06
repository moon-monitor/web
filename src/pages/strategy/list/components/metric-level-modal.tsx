import { NoticeGroupItem, TeamStrategyMetricLevelItem } from '@/api/common.types'
import { ConditionMetric, DictType, GlobalStatus, SampleMode } from '@/api/enum'
import { ConditionMetricData, defaultPaginationReq, SampleModeData } from '@/api/global'
import { selectTeamDict } from '@/api/team/team-dict'
import { SelectItem } from '@/api/team/team-dict.types'
import { listTeamNoticeGroup } from '@/api/team/team-notice'
import { saveTeamMetricStrategyLevel, teamMetricStrategyLevelDetail } from '@/api/team/team-strategy'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Button, Col, Form, Input, InputNumber, message, Modal, ModalProps, Row, Select, Tag, theme } from 'antd'
import { useEffect, useRef, useState } from 'react'

export interface MetricLevelModalProps extends ModalProps {
  strategyMetricId?: number
  strategyMetricLevel?: TeamStrategyMetricLevelItem
}

export default function MetricLevelModal(props: MetricLevelModalProps) {
  const { token } = theme.useToken()
  const [form] = Form.useForm()
  const [alarmLevelList, setAlarmLevelList] = useState<SelectItem[]>([])
  const conditionWatch = Form.useWatch('condition', form)

  const prevConditionRef = useRef<number | undefined>()
  const [alarmPageList, setAlarmPageList] = useState<SelectItem[]>([])
  const [alarmGroupList, setAlarmGroupList] = useState<NoticeGroupItem[]>([])
  const [total, setTotal] = useState<number[]>()

  const { run: getAlarmLevelList, loading: alarmLevelListLoading } = useRequest(selectTeamDict, {
    manual: true,
    onSuccess: (data) => {
      setAlarmLevelList(data?.items || [])
    }
  })
  const { run: getAlarmPageList, loading: alarmPageListLoading } = useRequest(selectTeamDict, {
    manual: true,
    onSuccess: (data) => {
      setAlarmPageList(data?.items || [])
    }
  })
  const { run: getAlarmGroupList, loading: alarmGroupListLoading } = useRequest(listTeamNoticeGroup, {
    manual: true,
    onSuccess: (data) => {
      setAlarmGroupList(
        data?.items && data?.items?.length > 0
          ? data.items
          : [
            {
              noticeGroupId: 0,
              name: '默认告警组',
              status: GlobalStatus.GLOBAL_STATUS_ENABLE
            }
          ]
      )
    }
  })
  const { run: saveMetricLevel, loading: saveMetricLevelLoading } = useRequest(saveTeamMetricStrategyLevel, {
    manual: true,
    onSuccess: () => {
      message.success('保存成功')
      props.onOk?.(new MouseEvent('click') as unknown as React.MouseEvent<HTMLButtonElement>)
    }
  })
  const { run: getMetricLevelDetail } = useRequest(teamMetricStrategyLevelDetail, {
    manual: true,
    onSuccess: (data) => {
      form.setFieldsValue({
        ...data,
        levelId: data.level?.dictId,
        total: data.total ? +data.total : 1,
        alarmPages: data.alarmPages?.map((item) => item.dictId)
      })
      setTotal(data.values)
    }
  })

  useEffect(() => {
    getAlarmLevelList({
      dictTypes: [DictType.DICT_TYPE_ALARM_LEVEL],
      pagination: defaultPaginationReq
    })
    getAlarmPageList({
      dictTypes: [DictType.DICT_TYPE_ALARM_PAGE],
      pagination: defaultPaginationReq
    })
    getAlarmGroupList({
      pagination: defaultPaginationReq
    })
  }, [])

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (values.values) {
        values.values = total
      }
      saveMetricLevel({
        ...values,
        strategyMetricId: props.strategyMetricId,
        strategyMetricLevelId: props.strategyMetricLevel?.strategyMetricLevelId
      })
    })
  }

  // 清空表单数据
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    form.resetFields()
    setTotal(undefined)
    props.onCancel?.(e)
  }
  useEffect(() => {
    const prevValue = prevConditionRef.current
    const currentValue = conditionWatch
    // 判断条件变化时，清空阈值
    if (prevValue !== undefined && prevValue !== currentValue) {
      setTotal(undefined)
      form.setFieldValue('values', undefined)
    }
    prevConditionRef.current = currentValue
  }, [conditionWatch])
  useEffect(() => {
    if (props.open && props.strategyMetricLevel) {
      getMetricLevelDetail({
        strategyMetricLevelId: props.strategyMetricLevel?.strategyMetricLevelId
      })
    }
  }, [props.open])

  return (
    <Modal {...props} onOk={handleSubmit} onCancel={handleCancel} confirmLoading={saveMetricLevelLoading}>
      <Form form={form} layout='vertical'>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              label='告警等级'
              name='levelId'
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
              name='condition'
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
            <Form.Item
              name='values'
              label='阈值'
              rules={[
                {
                  validator: () => {
                    if (total && (total[0] >= total[1] || total[0] < 0 || total[1] < 0)) {
                      return Promise.reject(new Error('最大值不能小于最小值'))
                    }
                    if (!total || total.length === 0) {
                      return Promise.reject(new Error('请输入阈值'))
                    }
                    return Promise.resolve()
                  }
                }
              ]}
            >
              {conditionWatch === ConditionMetric.CONDITION_METRIC_IN ||
                conditionWatch === ConditionMetric.CONDITION_METRIC_NOT_IN ? (
                <Row gutter={12}>
                  <Col span={12}>
                    <InputNumber
                      className='w-full'
                      placeholder='请输入最小值'
                      name='min'
                      value={total?.[0]}
                      onChange={(value: number | null) => setTotal([value || 0, total?.[1] || 0])}
                    />
                  </Col>
                  <Col span={12}>
                    <InputNumber
                      className='w-full'
                      placeholder='请输入最大值'
                      name='max'
                      value={total?.[1]}
                      onChange={(value: number | null) => setTotal([total?.[0] || 0, value || 0])}
                    />
                  </Col>
                </Row>
              ) : (
                <InputNumber
                  className='w-full'
                  placeholder='请输入阈值'
                  onChange={(value: number | null) => setTotal([value || 0])}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='触发类型'
              name='sampleMode'
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
              name='duration'
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
              name='total'
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
              name='alarmPages'
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
              name='receiverRoutes'
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
          <Form.List name='labelNotices'>
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
      </Form>
    </Modal>
  )
}
