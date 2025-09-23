import { MenuTree } from '@/api/request/types'
import { GlobalContext } from '@/utils/context'
import { Tree, TreeDataNode } from 'antd'
import type { DataNode, EventDataNode, TreeProps } from 'antd/es/tree'
import React, { useContext, useEffect, useState } from 'react'

const Test: React.FC = () => {
  const { menuItems } = useContext(GlobalContext)
  const [checkedKeys, setCheckedKeys] = useState<{
    checked: React.Key[]
    halfChecked: React.Key[]
  }>({ checked: [], halfChecked: [] })

  const findSiblings = (treeData: DataNode[], node: EventDataNode<DataNode>) => {
    const findParent = (data: DataNode[], targetKey: React.Key): TreeDataNode | null => {
      for (const item of data) {
        if (item.children) {
          for (const child of item.children) {
            if (child.key === targetKey) {
              return item
            }
          }
          const parent: DataNode | null = findParent(item.children, targetKey)
          if (parent) return parent
        }
      }
      return null
    }

    const parent = findParent(treeData, node.key)
    if (parent) {
      return parent.children
    }
    return []
  }

  const onCheck: TreeProps['onCheck'] = (checkedKeysValue, info) => {
    if (!checkedKeysValue || typeof checkedKeysValue !== 'object') return

    const checkedKeysArray = Array.isArray(checkedKeysValue) ? checkedKeysValue : checkedKeysValue.checked
    const newCheckedKeys: { checked: React.Key[]; halfChecked: React.Key[] } = { checked: [...checkedKeysArray], halfChecked: [] }
    const { node, checked } = info

    if (!(node.children && node.children.length > 0)) {
      const siblings = findSiblings(treeData, node) || []
      if (siblings.length > 0) {
        const firstSiblingKey = siblings[0].key
        if (checked) {
          newCheckedKeys.checked = [...checkedKeysArray, firstSiblingKey]
        } else {
          if (node.key === firstSiblingKey) {
            const siblingKeys = siblings.map((sibling: DataNode) => sibling.key)
            newCheckedKeys.checked = checkedKeysArray.filter((key) => !siblingKeys.includes(key))
          } else {
            newCheckedKeys.checked = [...checkedKeysArray]
          }
        }
      } else {
        newCheckedKeys.checked = [...checkedKeysArray]
      }
    } else {
      newCheckedKeys.checked = [...checkedKeysArray]
    }

    setCheckedKeys(() => {
      return { checked: newCheckedKeys.checked, halfChecked: [] }
    })
  }
  const transformMenuItemsToTreeData = (menuItems: MenuTree[] | undefined): DataNode[] => {
    if (!menuItems) return []
    return menuItems.map((item) => ({
      title: item.label,
      key: item.id,
      children: item.children ? transformMenuItemsToTreeData(item.children) : []
    }))
  }

  // Usage
  const treeData = transformMenuItemsToTreeData(menuItems)
  useEffect(() => {
    console.log(menuItems, 'menuItems')
  }, [])

  return <Tree checkable checkedKeys={checkedKeys} onCheck={onCheck} treeData={treeData} />
}

export default Test
