import { TeamRoleItem } from '@/api/common.types'
import { getTeamMenuTree } from '@/api/menu'
import { MenuTreeItem } from '@/api/menu/types'
import { getTeamRole, saveTeamRole } from '@/api/team'
import { SaveTeamRoleRequest } from '@/api/team/types'
import { DataFrom } from '@/components/data/form'
import { useRequest } from 'ahooks'
import { Form, Modal, Tree, TreeProps, type ModalProps } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import type React from 'react'
import { useEffect, useState } from 'react'
import { editModalFormItems } from './options'

export interface GroupEditModalProps extends ModalProps {
  groupId?: number
  disabled?: boolean
  onOk?: () => void
}
export const GroupEditModal: React.FC<GroupEditModalProps> = (props) => {
  const { onCancel, onOk, open, title, groupId, disabled } = props
  const [form] = Form.useForm<SaveTeamRoleRequest>()
  const [grounpDetail, setGroupDetail] = useState<TeamRoleItem>()
  const [menuTree, setMenuTree] = useState<TreeProps['treeData']>([])

  const { run: initRoleDetail, loading: initRoleDetailLoading } = useRequest(getTeamRole, {
    manual: true,
    onSuccess: (res) => {
      setGroupDetail(res)
    }
  })

  const { run: initMenuTree } = useRequest(getTeamMenuTree, {
    manual: true,
    onSuccess: (res) => {
      const tree = convertToTree(res.menus || []) || []
      setMenuTree([
        {
          title: '根节点',
          key: 0,
          children: tree
        }
      ])
      console.log('menuTree', menuTree)
    }
  })

  const { run: updateRole, loading: editRoleLoading } = useRequest(saveTeamRole, {
    manual: true,
    onSuccess: () => {
      form?.resetFields()
      onOk?.()
    }
  })

  // 将menuTree转换为树形结构
  const convertToTree = (menuTree: MenuTreeItem[]): TreeProps['treeData'] => {
    return menuTree.map((item) => {
      return {
        title: item.name,
        key: item.menuId,
        children: item.children?.length ? convertToTree(item.children) : undefined
      }
    })
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (groupId && open) {
      initRoleDetail({ roleId: groupId })
    }
    if (open) {
      initMenuTree({})
    }
  }, [open, groupId, initRoleDetail, initMenuTree, disabled])

  useEffect(() => {
    if (open && form && grounpDetail) {
      form?.setFieldsValue({
        ...grounpDetail
        // permissions: grounpDetail?.resources?.map((item) => item.id) || []
      })
      return
    }
  }, [grounpDetail, open, form])

  const handleOnCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    onCancel?.(e)
    form?.resetFields()
    setGroupDetail(undefined)
    setMenuTree([])
  }

  const handleOnOk = () => {
    form?.validateFields().then((formValues) => {
      const data = {
        ...formValues
      }
      updateRole({ ...data, ...(groupId && { roleId: groupId }) })
    })
  }

  const handleOnCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    console.log('checkedKeys', checkedKeys)
    console.log('info', info.halfCheckedKeys)
    const checkedAllKeys = [...checkedKeys, ...(info.halfCheckedKeys || [])]
    console.log('checkedAllKeys', checkedAllKeys)
  }

  // 判断是否为叶子节点
  const isLeafNode = (node: TreeProps['treeData'][0]) => {
    return !node.children || node.children.length === 0
  }
  // 获取所有叶子节点的 key
  const getLeafKeys = (treeData: TreeProps['treeData']) => {
    const leafKeys: number[] = []

    const traverse = (nodes: TreeProps['treeData']) => {
      nodes?.forEach((node) => {
        if (isLeafNode(node)) {
          leafKeys.push(node.key as number)
        } else if (node.children) {
          traverse(node.children)
        }
      })
    }

    traverse(treeData)
    return leafKeys
  }

  useEffect(() => {
    if (menuTree?.length && open) {
      const leafKeys = getLeafKeys(menuTree)
      const backendKeys = [0, 55, 59]
      const checkedKeys = leafKeys.filter((key) => backendKeys.includes(key))
      console.log('checkedKeys', checkedKeys)
    }
  }, [menuTree, open])

  return (
    <>
      <Modal
        {...props}
        title={title}
        open={open}
        onCancel={handleOnCancel}
        onOk={handleOnOk}
        loading={initRoleDetailLoading}
        confirmLoading={editRoleLoading}
      >
        <DataFrom
          items={editModalFormItems}
          props={{
            form,
            layout: 'vertical',
            autoComplete: 'off',
            disabled: disabled || editRoleLoading
          }}
        >
          <FormItem label='权限列表' name='menuIds'>
            {/* <TreeSelect
              treeData={menuTree}
              multiple
              treeCheckable
              treeDefaultExpandAll
              maxTagCount={5}
              showCheckedStrategy={SHOW_ALL}
              onChange={handleOnChange}
            /> */}
            <div className='h-[40vh] overflow-y-auto'>
              <Tree treeData={menuTree} checkable defaultExpandAll multiple onCheck={handleOnCheck} />
            </div>
          </FormItem>
        </DataFrom>
      </Modal>
    </>
  )
}
