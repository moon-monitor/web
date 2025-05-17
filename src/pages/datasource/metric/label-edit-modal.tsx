import { MetadataItemLabel } from '@/api2/common.types'
import { Modal, ModalProps } from 'antd'
import React from 'react'

export interface LabelEditModalProps extends ModalProps {
  labelDetail?: MetadataItemLabel
}

export const LabelEditModal: React.FC<LabelEditModalProps> = (props) => {
  const { labelDetail } = props

  return <Modal {...props} title={labelDetail?.key}></Modal>
}
