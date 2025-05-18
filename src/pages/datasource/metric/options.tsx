import { DatasourceDriverMetric, HTTPMethod } from '@/api2/enum'
import { DatasourceDriverMetricData, HTTPMethodData } from '@/api2/global'
import { DataFromItem } from '@/components/data/form'
import { Badge } from 'antd'

export const formItems: (DataFromItem | DataFromItem[])[] = [
  [
    {
      label: '数据源名称',
      name: 'name',
      type: 'input',
      props: {
        placeholder: '请输入数据源名称'
      },
      formProps: {
        rules: [{ required: true, message: '请输入数据源名称' }]
      }
    },
    {
      label: '存储器类型',
      name: 'driver',
      type: 'select',
      props: {
        allowClear: true,
        placeholder: '请选择存储器类型',
        options: Object.entries(DatasourceDriverMetricData)
          .filter(([key]) => +key !== DatasourceDriverMetric.DATASOURCE_DRIVER_METRIC_UNKNOWN)
          .map(([key, value]) => ({
            label: value.text,
            value: +key
          }))
      },
      formProps: {
        rules: [{ required: true, message: '请选择存储器类型' }]
      }
    }
  ],
  {
    label: '数据源地址',
    name: 'endpoint',
    type: 'button-input',
    props: {
      allowClear: true,
      placeholder: '请输入数据源地址'
    },
    formProps: {
      rules: [{ required: true, message: '请输入数据源地址' }]
    }
  },
  [
    {
      label: '请求方式',
      name: 'queryMethod',
      type: 'select',
      formProps: {
        initialValue: HTTPMethod.HTTP_METHOD_GET,
        rules: [{ required: true, message: '请选择请求方式' }]
      },
      props: {
        allowClear: true,
        placeholder: '请选择请求方式',
        options: Object.entries(HTTPMethodData)
          .filter(([key]) => +key !== HTTPMethod.HTTP_METHOD_UNKNOWN)
          .map(([key, value]) => ({
            label: <Badge {...value} />,
            value: +key
          }))
      }
    },
    {
      label: '取样间隔',
      name: 'scrapeInterval',
      type: 'input',
      props: {
        placeholder: '请输入取样间隔',
        type: 'number',
        suffix: '秒',
        min: 1
      },
      formProps: {
        rules: [{ required: true, message: '请输入取样间隔' }],
        initialValue: 15
      }
    }
  ],
  {
    label: '说明信息',
    name: 'remark',
    type: 'textarea',
    props: {
      allowClear: true,
      placeholder: '请输入数据源说明信息',
      maxLength: 200,
      showCount: true
    }
  }
]
