import { MenuCategory, MenuProcessType } from '@/api/enum'
import { MenuProcessTypeData } from '@/api/global'
import { deleteMenu, getMenu, getMenuTree, getTeamMenuTree, saveMenu } from '@/api/request/menu'
import { MenuTreeItem } from '@/api/request/types'
import { DataFrom, DataFromItem } from '@/components/data/form'
import { numberToBinary, routeJoin } from '@/utils'
import { EditOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import {
  Button,
  Card,
  Checkbox,
  CheckboxProps,
  Descriptions,
  Form,
  Input,
  message,
  Modal,
  theme,
  Tree,
  TreeDataNode,
  TreeSelect
} from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { descriptionItems, editFormItems } from './options'
interface MenuItem extends TreeDataNode, MenuTreeItem {
  children: MenuItem[]
}

// 加载菜单鉴权选项，过滤掉全部
const processTypeOptions = Object.entries(MenuProcessTypeData)
  .filter(([key]) => +key !== MenuProcessType.MENU_PROCESS_TYPE_UNKNOWN)
  .map(([key, value]) => {
    return {
      label: value.label,
      value: +key
    }
  })
const Menu: React.FC = () => {
  const { token } = theme.useToken()
  const [form] = Form.useForm()
  const [checkedList, setCheckedList] = useState<string[]>([])
  const indeterminate = checkedList.length > 0 && checkedList.length < processTypeOptions.length
  const checkAll = checkedList.length === processTypeOptions.length
  const [hoverItem, setHoverItem] = useState<MenuItem | null>(null)
  const [title, setTitle] = useState<string>('新增菜单')
  const [menu, setMenu] = useState<MenuItem[]>([])
  const [parentTree, setParentTree] = useState<MenuItem[]>([])
  const [menuId, setMenuId] = useState<number>(0)
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([])
  const [autoExpandParent, setAutoExpandParent] = useState(true)
  const [searchValue, setSearchValue] = useState('')
  const [addItem, setAddItem] = useState<MenuItem | undefined>(undefined)
  const parentIdWatch = Form.useWatch('parentId', form)
  const menuCategoryWatch = Form.useWatch('menuCategory', form)
  const [isMenuType, setIsMenuType] = useState<boolean>(false)
  const [parentPath, setParentPath] = useState<string>('')
  const [isCheck, setIsCheck] = useState<boolean>(false)
  const [detail, setDetail] = useState<{
    menuDetail: MenuTreeItem
    parentDetail: MenuTreeItem
  }>({
    menuDetail: {},
    parentDetail: {}
  })

  const { run: handleSaveMenu } = useRequest(saveMenu, {
    manual: true,
    onSuccess: () => {
      message.success('保存成功')
      setTitle('新增菜单')
      form.resetFields()
      setMenuId(0)
      setCheckedList([])

      form.setFieldValue('parentId', addItem?.menuId || 0)
      form.setFieldValue('menuType', addItem?.menuType)

      loadMenuTree()
    }
  })
  const { run: getMenuDetail } = useRequest(getMenu, {
    manual: true,
    onSuccess: (data) => {
      const menuPath = data.menuPath?.replace(parentPath, '') || ''
      form.setFieldsValue({
        ...data,
        menuPath
      })
      setCheckedList(numberToBinary(data.processType || 0).map((item) => item.toString()))
    }
  })
  const { run: handleDeleteMenu } = useRequest(deleteMenu, {
    manual: true,
    onSuccess: () => {
      message.success('删除成功')
      loadMenuTree()
    }
  })

  useEffect(() => {
    if (parentIdWatch) {
      getMenu({ menuId: parentIdWatch }).then((data) => {
        form.setFieldValue('menuType', data.menuType)
        setIsMenuType(true)
        setParentPath(data.menuPath || '')
      })
    } else {
      setIsMenuType(false)
      setParentPath('')
      // form.setFieldValue('menuType', undefined)
    }
  }, [parentIdWatch, form])
  const loadMenuTree = async () => {
    const menuTree = await getMenuTree({})
    const teamMenuTree = await getTeamMenuTree({})
    setMenu(convertMenuTree([...menuTree.menus, ...teamMenuTree.menus]) as unknown as MenuItem[])
    setParentTree(convertMenuTree([...menuTree.menus, ...teamMenuTree.menus], true) as unknown as MenuItem[])
  }
  // 转换菜单树结构
  const convertMenuTree = (menus: MenuTreeItem[], isButton?: boolean) => {
    const treeData = menus.map((item) => {
      if (isButton) {
        if (item.menuCategory === MenuCategory.MENU_CATEGORY_BUTTON) {
          return null
        }
        return {
          ...item,
          key: item.menuId,
          title: item.name,
          children: item.children && item.children.length > 0 ? convertMenuTree(item.children, true) : []
        }
      } else {
        return {
          ...item,
          key: item.menuId,
          title: item.name,
          children: item.children && item.children.length > 0 ? convertMenuTree(item.children) : []
        }
      }
    }) as unknown as MenuItem[] | undefined
    return treeData?.filter((item) => item !== null) as MenuItem[]
  }
  useEffect(() => {
    loadMenuTree()
  }, [])
  const onChange = (checkedList: string[]) => {
    setCheckedList(checkedList)
  }

  const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
    setCheckedList(e.target.checked ? processTypeOptions.map((item) => item.value) : [])
  }
  const onMouseEnter = (item: MenuItem) => {
    setHoverItem(item)
  }
  const onEditMenu = (item: MenuItem) => {
    setTitle('编辑菜单')
    setIsCheck(false)
    setIsDisabled(false)
    setMenuId(item.menuId || 0)
    setAddItem(undefined)
    setParentPath(item.menuPath?.substring(0, item.menuPath.lastIndexOf('/')) || '')
    getMenuDetail({ menuId: item.menuId })
    console.log('isCheck', isCheck)
  }
  const onDeleteMenu = (item: MenuItem) => {
    Modal.confirm({
      title: '确定删除该菜单吗？',
      onOk: () => {
        handleDeleteMenu({ menuId: item.menuId })
      }
    })
  }
  const onAddMenu = (item: MenuItem) => {
    setTitle('新增菜单')
    setIsCheck(false)
    form.resetFields()
    form.setFieldValue('parentId', item.menuId || 0)
    form.setFieldValue('menuType', item.menuType)
    setAddItem(item)
    setParentPath(item.menuPath || '')
    setMenuId(0)
    setCheckedList([])
    setIsDisabled(!!item.menuId)
  }
  const onSaveMenu = () => {
    form?.validateFields().then((formData) => {
      const data = {
        ...formData,
        processType: checkedList.reduce((acc, curr) => acc + +curr, 0),
        menuPath: formData.menuPath ? routeJoin(parentPath, formData.menuPath || '') : '',
        sort: formData.sort ? +formData.sort : 0,
        menuId
      }
      handleSaveMenu(data)
    })
  }
  const searchMenu = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const newExpandedKeys = menu
      .map((item) => {
        const title = typeof item.title === 'string' ? item.title : ''
        if (title.includes(value)) {
          return item.key
        } else if (item.children) {
          return item.children?.reduce<React.Key[]>((acc, child) => {
            const childTitle = typeof child.title === 'string' ? child.title : ''
            if (childTitle.includes(value)) {
              acc.push(child.key)
            }
            return acc
          }, [])
        }
        return null
      })
      .flat()
      .filter((item, i, self): item is React.Key => !!item && self.indexOf(item) === i)
    setExpandedKeys(newExpandedKeys)
    setSearchValue(value)
    setAutoExpandParent(true)
  }

  const treeData = useMemo(() => {
    const loop = (data: TreeDataNode[]): TreeDataNode[] =>
      data.map((item) => {
        const strTitle = item.title as string
        const index = strTitle.indexOf(searchValue)
        const beforeStr = strTitle.substring(0, index)
        const afterStr = strTitle.slice(index + searchValue.length)
        const title =
          index > -1 ? (
            <span key={item.key}>
              {beforeStr}
              <span className=' text-red-500'>{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span key={item.key}>{strTitle}</span>
          )
        if (item.children) {
          return { ...item, title, key: item.key, children: loop(item.children) }
        }

        return {
          ...item,
          title,
          key: item.key
        }
      })
    return loop(menu) as unknown as TreeDataNode[]
  }, [searchValue, menu])
  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys)
    setAutoExpandParent(false)
  }
  const onSelect = (menuItem: MenuItem) => {
    setIsCheck(true)
    setMenuId(menuItem.menuId || 0)
    menuItem.parentId
      ? getMenu({ menuId: menuItem.parentId }).then((data) => {
        setDetail({
          menuDetail: menuItem,
          parentDetail: data
        })
        console.log('detail', detail)
      })
      : setDetail({
        menuDetail: menuItem,
        parentDetail: {
          name: '根节点'
        }
      })
    setAddItem(undefined)
    setTitle('菜单详情')
  }

  return (
    <div className='flex p-4 gap-4 h-full'>
      <div className='w-1/3 bg-white rounded-md p-4'>
        <div className='mb-4 flex justify-between gap-4 ml-4'>
          <Input.Search placeholder='请输入菜单名称' size='small' className='w-56' onChange={searchMenu} />
          <Button type='primary' size='small' onClick={() => onAddMenu({} as MenuItem)}>
            新增
          </Button>
        </div>
        <Tree
          className='h-[calc(100vh-220px)] overflow-y-auto'
          treeData={treeData as unknown as TreeDataNode[]}
          blockNode
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          selectable={false}
          titleRender={(item) => {
            const menuItem = item as unknown as MenuItem
            const title = item.title as React.ReactNode
            return (
              <div
                onMouseEnter={() => onMouseEnter(menuItem)}
                onMouseLeave={() => setHoverItem(null)}
                onClick={() => onSelect(menuItem)}
                className='flex items-center gap-3 '
                style={{
                  color:
                    menuItem.menuId === menuId || menuItem.menuId === addItem?.menuId ? token.colorPrimary : 'inherit',
                  backgroundColor:
                    menuItem.menuId === menuId || menuItem.menuId === addItem?.menuId ? token.colorPrimaryBg : 'inherit'
                }}
              >
                {title}
                {hoverItem?.key === item.key && (
                  <div className='flex '>
                    <Button
                      type='text'
                      size='small'
                      icon={<EditOutlined className='text-blue-500 ' />}
                      onClick={(e) => {
                        e.stopPropagation()
                        onEditMenu(menuItem)
                      }}
                    />
                    <Button
                      type='text'
                      size='small'
                      icon={<MinusCircleOutlined className='text-red-500 ' />}
                      onClick={(e) => {
                        e.stopPropagation()
                        onDeleteMenu(menuItem)
                      }}
                    />
                    {menuItem.menuCategory !== MenuCategory.MENU_CATEGORY_BUTTON && (
                      <Button
                        type='text'
                        size='small'
                        icon={<PlusCircleOutlined className='text-green-500 ' />}
                        onClick={(e) => {
                          e.stopPropagation()
                          onAddMenu(menuItem)
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
            )
          }}
        />
      </div>
      <Card title={title} className='flex-1 '>
        {isCheck ? (
          <Descriptions
            column={1}
            bordered
            labelStyle={{ width: '200px' }}
            items={descriptionItems(detail || { menuDetail: {}, parentDetail: {} })}
          />
        ) : (
          <div>
            <DataFrom
              items={editFormItems({ isMenuType, menuCategory: menuCategoryWatch }) as unknown as DataFromItem[]}
              props={{
                layout: 'vertical',
                form
              }}
              slot={{
                processType: (
                  <>
                    <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                      全部
                    </Checkbox>
                    <div>
                      <Checkbox.Group options={processTypeOptions} value={checkedList} onChange={onChange} />
                    </div>
                  </>
                ),
                parentId: (
                  <TreeSelect
                    disabled={isDisabled}
                    placeholder='请选择父级菜单'
                    treeData={[{ key: 0, title: '根节点', children: parentTree }]}
                    fieldNames={{ label: 'title', value: 'key', children: 'children' }}
                    allowClear
                  />
                ),
                menuPath: (
                  <Input
                    placeholder='请输入菜单路径'
                    prefix={parentPath}
                    onChange={(e) => form.setFieldValue('menuPath', e.target.value)}
                    styles={{
                      prefix: {
                        marginRight: '0px'
                      }
                    }}
                  />
                )
              }}
            />
            <Button type='primary' onClick={onSaveMenu}>
              保存
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}

export default Menu
