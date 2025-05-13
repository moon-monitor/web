import { NoticeGroupItem, TeamStrategyGroupItem, TeamStrategyItem } from '@/api2/common.types'
import { defaultPaginationReq } from '@/api2/global'
import { listTeamNoticeGroup } from '@/api2/team/team-notice'
import { getTeamMetricStrategy, listTeamStrategyGroup } from '@/api2/team/team-strategy'
import { GetTeamMetricStrategyReply } from '@/api2/team/types'
import { useRequest } from 'ahooks'
import { Button, Form, Input, Modal, type ModalProps, Select, Steps } from 'antd'
import { StepProps } from 'antd/lib'
import { useEffect, useState } from 'react'

export interface MetricEditModalProps extends ModalProps {
  strategyDetail?: TeamStrategyItem
}

export default function MetricEditModal(props: MetricEditModalProps) {
  const { strategyDetail, ...restProps } = props
  const [current, setCurrent] = useState(0)
  const [metricStrategyList, setMetricStrategyList] = useState<GetTeamMetricStrategyReply>()
  const [strategyGroupList, setStrategyGroupList] = useState<TeamStrategyGroupItem[]>([])
  const [alarmGroupList, setAlarmGroupList] = useState<NoticeGroupItem[]>([])
  const [form] = Form.useForm()

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
                disabled: item.status === 'GLOBAL_STATUS_DISABLE'
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
                disabled: item.status === 'GLOBAL_STATUS_DISABLE'
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
      title: '选择数据源'
      //   content: <DataFrom props={{ form }} items={metricStrategyFormItems} />
    },
    {
      title: '选择指标'
      //   content: <DataFrom props={{ form }} items={metricStrategyLevelsformItems} />
    }
  ]
  const stepItems: StepProps[] = steps.map((item) => ({
    key: item.title,
    title: item.title
  }))

  const next = () => {
    form.validateFields().then((values) => {
      console.log(values)
      setCurrent(current + 1)
    })
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
  }, [])
  useEffect(() => {
    if (strategyDetail) {
      getStrategyDetail({ strategyId: strategyDetail.strategyId })
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
          <Button type='primary' onClick={() => next()}>
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
