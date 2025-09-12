import { AlarmSendType } from '@/api/enum'
import { AlarmSendTypeData, StatusData } from '@/api/global'
// import { getTemplate } from '@/api/notify/template' // TODO: 实现 getTemplate API
import type { SendTemplateItem } from '@/api/request/types/model-types'
import { GlobalContext } from '@/utils/context'
import { CopyOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import {
  Avatar,
  Badge,
  Descriptions,
  type DescriptionsProps,
  Modal,
  type ModalProps,
  Space,
  Tooltip,
  message
} from 'antd'
import { useCallback, useContext, useEffect, useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import atomOneDark from 'react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark'
import atomOneLight from 'react-syntax-highlighter/dist/esm/styles/hljs/atom-one-light'

// 占位符函数，待实现
const getTemplate = async (id: number): Promise<{ detail: SendTemplateItem }> => {
  console.warn('getTemplate API not implemented yet')
  return Promise.resolve({
    detail: {
      id: 0,
      name: '示例模板',
      content: '模板内容',
      sendType: 0,
      status: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      creator: {
        id: 0,
        name: '系统',
        avatar: '',
        email: '',
        nickname: '系统'
      },
      remark: '这是一个示例模板'
    }
  })
}

export interface SendTemplateDetailModalProps extends ModalProps {
  sendTemplateId: number
  onOk?: () => void
}

export function SendTemplateDetailModal(props: SendTemplateDetailModalProps) {
  const { sendTemplateId, open, onCancel, onOk, ...rest } = props
  const { theme: sysTheme } = useContext(GlobalContext)
  const [detail, setDetail] = useState<SendTemplateItem>()

  const { run: runGetSendTemplateDetail, loading: getSendTemplateDetailLoading } = useRequest(getTemplate, {
    manual: true,
    onSuccess: (res) => {
      setDetail(res.detail)
    }
  })

  const getSendTemplateDetail = useCallback(() => {
    if (!sendTemplateId) {
      return
    }
    runGetSendTemplateDetail(sendTemplateId, true)
  }, [sendTemplateId, runGetSendTemplateDetail])

  useEffect(() => {
    if (sendTemplateId && open) {
      getSendTemplateDetail()
    }
  }, [sendTemplateId, open, getSendTemplateDetail])

  if (!detail) {
    return null
  }

  const items: DescriptionsProps['items'] = [
    {
      label: '名称',
      children: detail?.name,
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 }
    },
    {
      label: '通知类型',
      children: (
        <Space direction='horizontal'>
          <Avatar size='small' shape='square' icon={AlarmSendTypeData[detail.sendType]?.icon} />
          {AlarmSendTypeData[detail.sendType]?.label}
        </Space>
      ),
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 }
    },
    {
      label: '状态',
      children: detail ? (
        <Badge color={StatusData[detail?.status]?.color} text={StatusData[detail?.status]?.text} />
      ) : (
        '-'
      ),
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 }
    },
    {
      label: '创建人',
      children: (
        <Tooltip title={detail?.creator?.nickname || detail?.creator?.name}>
          <div className='flex items-center gap-2'>
            <Avatar src={detail?.creator?.avatar}>{detail?.creator?.nickname || detail?.creator?.name}</Avatar>
            {detail?.creator?.nickname || detail?.creator?.name}
          </div>
        </Tooltip>
      ),
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 }
    },
    {
      label: '模板内容',
      children: detail?.content ? (
        <div className='relative max-h-[300px] overflow-auto'>
          <SyntaxHighlighter
            wrapLines
            wrapLongLines
            lineProps={() => ({
              style: {
                whiteSpace: 'pre-wrap'
              }
            })}
            style={sysTheme === 'dark' ? { ...atomOneDark } : { ...atomOneLight }}
            language={detail.sendType === AlarmSendType.AlarmSendTypeEmail ? 'html' : 'json'}
          >
            {detail?.content}
          </SyntaxHighlighter>
          <CopyOutlined
            className='absolute top-2 right-2 cursor-pointer text-blue-500'
            onClick={() => {
              navigator.clipboard.writeText(detail?.content).then(() => {
                message.success('复制成功')
              })
            }}
          />
        </div>
      ) : (
        '-'
      ),
      span: 4
    },
    {
      label: '创建时间',
      children: detail?.createdAt,
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 }
    },
    {
      label: '更新时间',
      children: detail?.updatedAt,
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 }
    },
    {
      label: '备注',
      children: detail?.remark || '-',
      span: 3
    }
  ]

  return (
    <>
      <Modal
        {...rest}
        centered
        open={open}
        onOk={onOk}
        onCancel={onCancel}
        footer={null}
        loading={getSendTemplateDetailLoading}
      >
        <Descriptions title='通知模板信息' bordered items={items} />
      </Modal>
    </>
  )
}
