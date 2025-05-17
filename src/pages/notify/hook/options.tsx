import { NoticeHookItem } from '@/api2/common.types'
import { ActionKey, GlobalStatus, HookAPP, HTTPMethod } from '@/api2/enum'
import { GlobalStatusData, HookAppData, MethodData } from '@/api2/global'
import { DataFromItem } from '@/components/data/form'
import { SearchFormItem } from '@/components/data/search-box'
import MoreMenu, { MoreMenuProps } from '@/components/moreMenu'
import { Badge, Button, Space, Tooltip, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'

const { Text } = Typography

export const formList: SearchFormItem[] = [
  {
    name: 'keyword',
    label: '名称',
    dataProps: {
      type: 'input',
      itemProps: {
        placeholder: '名称模糊查询',
        allowClear: true,
        autoComplete: 'off',
        maxLength: 20,
        showCount: true
      }
    }
  },
  {
    name: 'status',
    label: '状态',
    dataProps: {
      type: 'select',
      itemProps: {
        placeholder: '状态',
        allowClear: true,
        options: Object.entries(GlobalStatusData)
          .filter(([key]) => +key !== GlobalStatus.GLOBAL_STATUS_UNKNOWN)
          .map(([key, value]) => {
            return {
              label: <Badge {...value} />,
              value: +key
            }
          })
      }
    }
  },
  {
    name: 'apps',
    label: '类型',
    dataProps: {
      type: 'select',
      itemProps: {
        placeholder: '类型',
        allowClear: true,
        mode: 'multiple',
        maxTagCount: 1,
        options: Object.entries(HookAppData)
          .filter(([key]) => +key !== HookAPP.HOOK_APP_UNKNOWN)
          .map(([key, value]) => {
            const { text, icon } = value
            return {
              label: (
                <Space direction='horizontal'>
                  {icon}
                  {text}
                </Space>
              ),
              value: +key
            }
          })
      }
    }
  }
]

interface NotifyHookColumnProps {
  onHandleMenuOnClick: (item: NoticeHookItem, key: ActionKey) => void
  current: number
  pageSize: number
}

export const getColumnList = (props: NotifyHookColumnProps): ColumnsType<NoticeHookItem> => {
  const { onHandleMenuOnClick } = props
  const tableOperationItems = (record: NoticeHookItem): MoreMenuProps['items'] => [
    record.status !== GlobalStatus.GLOBAL_STATUS_ENABLE
      ? {
          key: ActionKey.ENABLE,
          label: (
            <Button type='link' size='small'>
              启用
            </Button>
          )
        }
      : {
          key: ActionKey.DISABLE,
          label: (
            <Button type='link' size='small' danger>
              禁用
            </Button>
          )
        },
    {
      key: ActionKey.OPERATION_LOG,
      label: (
        <Button size='small' type='link'>
          操作日志
        </Button>
      )
    },
    {
      key: ActionKey.EDIT,
      label: (
        <Button size='small' type='link'>
          编辑
        </Button>
      )
    },
    {
      key: ActionKey.DELETE,
      label: (
        <Button type='link' size='small' danger>
          删除
        </Button>
      )
    }
  ]

  return [
    {
      title: '类型',
      dataIndex: 'app',
      key: 'app',
      width: 100,
      align: 'center',
      render: (app: HookAPP) => {
        const { text, icon } = HookAppData[app]
        return (
          <Tooltip title={text}>
            <Button type='link' icon={icon} />
          </Tooltip>
        )
      }
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 220,
      render: (text: string, record: NoticeHookItem) => {
        return (
          <Space>
            <Badge color={GlobalStatusData[record.status].color} />
            <Text style={{ width: 180 }} ellipsis={true}>
              {text}
            </Text>
          </Space>
        )
      }
    },
    {
      title: '描述',
      dataIndex: 'remark',
      key: 'remark',
      ellipsis: true,
      render: (text: string) => {
        return text || '-'
      }
    },

    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 180
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      ellipsis: true,
      fixed: 'right',
      width: 120,
      render: (record: NoticeHookItem) => (
        <Space size={20}>
          <Button size='small' type='link' onClick={() => onHandleMenuOnClick(record, ActionKey.DETAIL)}>
            详情
          </Button>
          {tableOperationItems && tableOperationItems?.length > 0 && (
            <MoreMenu
              items={tableOperationItems(record)}
              onClick={(key: ActionKey) => {
                onHandleMenuOnClick(record, key)
              }}
            />
          )}
        </Space>
      )
    }
  ]
}

export const saveFormList: (DataFromItem | DataFromItem[])[] = [
  [
    {
      name: 'app',
      label: '类型',
      type: 'select',
      span: 6,
      props: {
        placeholder: '请选择类型',
        options: Object.entries(HookAppData)
          .filter(([key]) => key !== HookAPP.HOOK_APP_UNKNOWN.toString())
          .map(([key, value]) => ({
            label: (
              <Space direction='horizontal'>
                {value.icon}
                {value.text}
              </Space>
            ),
            value: +key
          }))
      },
      formProps: {
        rules: [{ required: true, message: '请选择类型' }]
      }
    },
    {
      name: 'name',
      label: '名称',
      type: 'input',
      span: 18,
      props: {
        placeholder: '请输入名称',
        maxLength: 64,
        showCount: true
      },
      formProps: {
        rules: [
          { required: true, message: '请输入名称' },
          { max: 64, message: '名称长度不能超过64个字符' }
        ]
      }
    }
  ],
  [
    {
      name: 'method',
      label: '请求方法',
      type: 'select',
      span: 6,
      props: {
        placeholder: '请选择请求方法',
        options: Object.entries(MethodData)
          .filter(([key]) => key !== HTTPMethod.HTTP_METHOD_UNKNOWN.toString())
          .map(([key, value]) => ({ label: <Badge {...value} />, value: +key }))
      },
      formProps: {
        rules: [{ required: true, message: '请选择请求方法' }],
        initialValue: HTTPMethod.HTTP_METHOD_POST
      }
    },
    {
      name: 'url',
      label: 'URL',
      type: 'input',
      span: 18,
      props: {
        placeholder: '请输入URL',
        maxLength: 256,
        showCount: true
      },
      formProps: {
        rules: [
          { required: true, message: '请输入URL' },
          { max: 256, message: 'URL长度不能超过256个字符' },
          { type: 'url', message: '请输入正确的URL' }
        ]
      }
    }
  ],
  {
    name: 'secret',
    label: '密钥',
    type: 'textarea',
    props: {
      placeholder: '请输入密钥',
      maxLength: 255,
      showCount: true
    }
  },
  {
    name: 'headers',
    label: '请求头',
    type: 'textarea'
  },
  {
    name: 'remark',
    label: '备注',
    type: 'textarea',
    props: {
      placeholder: '请输入备注',
      maxLength: 255,
      showCount: true
    }
  }
]
