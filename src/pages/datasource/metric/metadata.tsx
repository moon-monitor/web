import { TeamMetricDatasourceItem, TeamMetricDatasourceMetadataItem } from '@/api2/common.types'
import { listMetricDatasourceMetadata, syncMetricDatasourceMetadata } from '@/api2/team/team-datasource'
import {
  defaultSearchMetricDatasourceMetadataParams,
  ListMetricDatasourceMetadataRequest,
  MetricTypeData
} from '@/api2/team/team-datasource.types'
import { DataInput } from '@/components/data/child/data-input'
import { useContainerHeightTop } from '@/hooks/useContainerHeightTop'
import { GlobalContext } from '@/utils/context'
import { useRequest } from 'ahooks'
import { Button, Flex, Form, Input, Space, Table, Tag, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { useContext, useEffect, useRef } from 'react'
import { Info } from './info'
import { Label } from './label'
export interface MetadataProps {
  datasource?: TeamMetricDatasourceItem
  toTimelyQuery?: (expr: string) => void
}

const { Text } = Typography

export const Metadata: React.FC<MetadataProps> = (props) => {
  const { datasource, toTimelyQuery } = props
  const [form] = Form.useForm()
  const { isFullscreen } = useContext(GlobalContext)

  const [searchMetricParams, setSearchMetricParams] = React.useState<ListMetricDatasourceMetadataRequest>(
    defaultSearchMetricDatasourceMetadataParams
  )
  const [metricListTotal, setMetricListTotal] = React.useState(0)
  const [metricList, setMetricList] = React.useState<TeamMetricDatasourceMetadataItem[]>([])
  const [metricDetail, setMetricDetail] = React.useState<TeamMetricDatasourceMetadataItem>()
  const [openMetricLabelModal, setOpenMetricLabelModal] = React.useState(false)
  const ADivRef = useRef<HTMLDivElement>(null)
  const AutoTableHeight = useContainerHeightTop(ADivRef, metricList, isFullscreen)

  const { run: getMetricList, loading } = useRequest(listMetricDatasourceMetadata, {
    manual: true,
    onSuccess: (reply) => {
      const { items } = reply
      setMetricList(items || [])
      setMetricListTotal(reply.pagination?.total || 0)
    }
  })

  const handleLabel = (record: TeamMetricDatasourceMetadataItem) => {
    setMetricDetail(record)
    setOpenMetricLabelModal(true)
  }

  const hanleLabelModalOnCancel = () => {
    setOpenMetricLabelModal(false)
    setMetricDetail(undefined)
  }

  const handleLabelModalOnOK = () => {
    setOpenMetricLabelModal(false)
    setMetricDetail(undefined)
  }

  const handleToTimelyQuery = (expr: string) => {
    toTimelyQuery?.(expr)
  }

  const columns: ColumnsType<TeamMetricDatasourceMetadataItem> = [
    {
      title: '指标类型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      fixed: 'left',
      render: (_, record) => {
        const { text, color } = MetricTypeData[record.type]
        return (
          <>
            <Tag color={color} style={{ width: '100%' }} className='center'>
              {text}
            </Tag>
          </>
        )
      }
    },
    {
      title: '指标名称',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      width: 400,
      render(value) {
        return (
          <Text copyable={{ text: value }}>
            <button className='text-violet-500' onClick={() => handleToTimelyQuery(value)}>
              {value.length > 42 ? `${value.slice(0, 42)}...` : value}
            </button>
          </Text>
        )
      }
    },
    {
      title: '指标描述',
      dataIndex: 'help',
      key: 'help',
      ellipsis: {
        showTitle: true
      }
    },
    {
      title: '标签数量',
      dataIndex: 'labelCount',
      key: 'labelCount',
      width: 120,
      align: 'center'
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record) => (
        <Space size='small'>
          <Button type='link' size='small' onClick={() => handleLabel(record)}>
            标签
          </Button>
        </Space>
      )
    }
  ]

  const fetchSyncMetric = () => {
    if (!datasource?.datasourceId) return
    syncMetricDatasourceMetadata({
      datasourceId: datasource?.datasourceId
    }).then(() => getMetricList(searchMetricParams))
  }

  useEffect(() => {
    if (!datasource?.datasourceId) return
    setSearchMetricParams((prev) => {
      return {
        ...prev,
        datasourceId: datasource?.datasourceId
      }
    })
  }, [datasource])

  useEffect(() => {
    getMetricList(searchMetricParams)
  }, [searchMetricParams, getMetricList])

  return (
    <div className='flex flex-col gap-3'>
      <Label
        metricDetail={metricDetail}
        open={openMetricLabelModal}
        onCancel={hanleLabelModalOnCancel}
        onOk={handleLabelModalOnOK}
      />
      <Info datasource={datasource} />
      <Flex justify='space-between' align='center' gap={12} className='gap-3'>
        <Space size='middle'>
          <Button type='primary' onClick={fetchSyncMetric}>
            同步数据
          </Button>
          <Button color='default' variant='filled' onClick={() => getMetricList(searchMetricParams)} loading={loading}>
            刷新
          </Button>
        </Space>
        <Form
          form={form}
          layout='inline'
          autoComplete='off'
          onChange={() => {
            form.validateFields().then((values) => {
              setSearchMetricParams((prev) => {
                return {
                  ...prev,
                  ...values
                }
              })
            })
          }}
        >
          <Form.Item name='metricType' initialValue={0}>
            <DataInput
              type='radio-group'
              props={{
                options: Object.entries(MetricTypeData).map((item) => {
                  return {
                    label: (
                      <div className='w-full' style={{ color: item[1].color }}>
                        {item[1].text}
                      </div>
                    ),
                    value: +item[0]
                  }
                }),
                optionType: 'button'
              }}
            />
          </Form.Item>
          <Form.Item name='keyword'>
            <Input.Search
              className='search'
              placeholder='请输入'
              allowClear
              onSearch={(value) => {
                setSearchMetricParams((prev) => {
                  return {
                    ...prev,
                    keyword: value
                  }
                })
              }}
              enterButton
            />
          </Form.Item>
        </Form>
      </Flex>
      <div ref={ADivRef}>
        <Table
          rowKey={(record) => record.metadataId}
          loading={loading}
          size='small'
          dataSource={metricList}
          columns={columns}
          scroll={{
            y: `calc(100vh - 170px  - ${AutoTableHeight}px)`,
            x: 1000
          }}
          pagination={{
            total: metricListTotal,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条`,
            pageSizeOptions: [20, 50, 100],
            defaultPageSize: 20,
            onChange: (page, pageSize) => {
              setSearchMetricParams((prev) => {
                return {
                  ...prev,
                  pagination: {
                    page,
                    pageSize: pageSize
                  }
                }
              })
            }
          }}
        />
      </div>
    </div>
  )
}
