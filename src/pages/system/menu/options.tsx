import { GlobalStatus, MenuCategory, MenuProcessType, MenuType } from '@/api2/enum'
import { GlobalStatusData, MenuCategoryData, MenuProcessTypeData, MenuTypeData } from '@/api2/global'
import { MenuTreeItem } from '@/api2/menu/types'
import { DataFromItem } from '@/components/data/form'
import { numberToBinary } from '@/utils'
import { Badge, DescriptionsProps, Tag } from 'antd'

interface EditFormItemsProps {
  isMenuType: boolean
  menuCategory: MenuCategory
}
export const editFormItems = ({ isMenuType, menuCategory }: EditFormItemsProps): DataFromItem[][] | DataFromItem[] => {
  return [
    [
      {
        name: 'name',
        label: '菜单名称',
        type: 'input',
        formProps: {
          rules: [{ required: true, message: '请输入菜单名称' }]
        },
        props: {
          placeholder: '请输入菜单名称',
          width: 200
        }
      },
      {
        name: 'parentId',
        label: '父级菜单',
        type: 'select',
        props: {
          placeholder: '请选择父级菜单'
        }
      }
    ],
    [
      {
        name: 'menuIcon',
        label: '菜单图标',
        type: 'input',
        props: {
          placeholder: '请输入菜单图标'
        }
      },
      {
        name: 'menuType',
        label: '菜单类型',
        type: 'radio-group',
        formProps: {
          rules: [{ required: true, message: '请选择菜单类型' }]
        },
        props: {
          disabled: isMenuType,
          options: Object.entries(MenuTypeData)
            .filter(([key]) => +key !== MenuType.MENU_TYPE_UNKNOWN)
            .map(([key, value]) => ({
              label: value,
              value: +key
            }))
        }
      }
    ],
    [
      {
        span: 8,
        name: 'menuCategory',
        label: '菜单类目',
        type: 'radio-group',
        formProps: {
          rules: [{ required: true, message: '请选择菜单类目' }]
        },
        props: {
          options: Object.entries(MenuCategoryData)
            .filter(([key]) => +key !== MenuCategory.MENU_CATEGORY_UNKNOWN)
            .map(([key, value]) => ({
              label: value,
              value: +key
            }))
        }
      },
      menuCategory === MenuCategory.MENU_CATEGORY_BUTTON
        ? {
            span: 16,
            name: 'apiPath',
            label: '后端接口',
            type: 'input',
            props: {
              placeholder: '请输入后端接口'
            }
          }
        : {
            span: 16,
            name: 'menuPath',
            label: '前端路由',
            type: 'input',
            props: {
              placeholder: '请输入前端路由'
            }
          }
    ],
    [
      {
        name: 'status',
        label: '启用状态',
        type: 'radio-group',
        formProps: {
          rules: [{ required: true, message: '请选择启用状态' }]
        },
        props: {
          options: Object.entries(GlobalStatusData)
            .filter(([key]) => +key !== GlobalStatus.GLOBAL_STATUS_UNKNOWN)
            .map(([key, value]) => ({
              label: value.text,
              value: +key
            }))
        }
      },
      {
        name: 'isRelyOnBrother',
        label: '依赖兄弟菜单',
        type: 'radio-group',
        props: {
          options: [
            {
              label: '是',
              value: true
            },
            {
              label: '否',
              value: false
            }
          ]
        }
      },
      {
        name: 'sort',
        label: '排序',
        type: 'input',
        formProps: {
          rules: [
            {
              validator: (_, value) => {
                if (value < 0) {
                  return Promise.reject(new Error('排序不能小于0'))
                }
                return Promise.resolve()
              }
            }
          ]
        },
        props: {
          placeholder: '请输入排序',
          type: 'number'
        }
      }
    ],
    [
      {
        name: 'processType',
        label: '菜单鉴权',
        type: 'checkbox'
      }
    ]
  ]
}

export const descriptionItems = (detail: {
  menuDetail: MenuTreeItem
  parentDetail: MenuTreeItem
}): DescriptionsProps['items'] => {
  const { menuDetail, parentDetail } = detail
  return [
    {
      key: 'name',
      label: '菜单名称',
      children: menuDetail?.name
    },
    {
      key: 'parentId',
      label: '父级菜单',
      children: parentDetail?.name
    },
    {
      key: 'menuIcon',
      label: '菜单图标',
      children: menuDetail?.menuIcon
    },
    {
      key: 'menuType',
      label: '菜单类型',
      children: MenuTypeData[menuDetail?.menuType || MenuType.MENU_TYPE_UNKNOWN]
    },
    {
      key: 'menuCategory',
      label: '菜单类目',
      children: MenuCategoryData[menuDetail?.menuCategory || MenuCategory.MENU_CATEGORY_UNKNOWN]
    },
    menuDetail?.menuCategory === MenuCategory.MENU_CATEGORY_BUTTON
      ? {
          key: 'apiPath',
          label: '后端接口',
          children: menuDetail?.apiPath
        }
      : {
          key: 'menuPath',
          label: '前端路由',
          children: menuDetail?.menuPath
        },
    {
      key: 'status',
      label: '启用状态',
      children: <Badge {...GlobalStatusData[menuDetail?.status || GlobalStatus.GLOBAL_STATUS_UNKNOWN]}></Badge>
    },
    {
      key: 'sort',
      label: '排序',
      children: menuDetail?.sort
    },
    {
      key: 'isRelyOnBrother',
      label: '依赖兄弟菜单',
      children: menuDetail?.isRelyOnBrother ? '是' : '否'
    },
    {
      key: 'processType',
      label: '菜单鉴权',
      children: numberToBinary(menuDetail?.processType || 0).map((item) => (
        <Tag key={item} color='blue'>
          {MenuProcessTypeData[item as MenuProcessType]}
        </Tag>
      ))
    }
  ]
}
