import { GlobalStatus, MenuCategory, MenuType } from '@/api2/enum'
import { GlobalStatusData, MenuCategoryData, MenuTypeData } from '@/api2/global'
import { DataFromItem } from '@/components/data/form'

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
            name: 'apiPath',
            label: '后端接口',
            type: 'input',
            props: {
              placeholder: '请输入后端接口'
            }
          }
        : {
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
        formProps: {
          labelCol: { span: 8 }
        },
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
