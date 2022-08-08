import { Button, Drawer, Form, Input, Select } from 'antd'
import { useEffect } from 'react'

import { useDiagramContext } from '../../diagram.context'
import { iconSet } from '../../diagram.data'
import { NodeType } from '../../diagram.enum'
import useDiagramHelper from '../../diagram.helper'
import type { NodeData } from '../../diagram.type'

export default function NodeSetting() {
  const { digramData, editingNode, setEditingNode } = useDiagramContext()

  const [settingForm] = Form.useForm()

  const { updateNode } = useDiagramHelper()

  useEffect(() => {
    if (editingNode && digramData) {
      const targetNode = digramData.flowData?.nodes.find((nd) => nd.id === editingNode.id)

      if (targetNode) {
        console.log(targetNode)
        settingForm.setFieldsValue(targetNode.data)
      }
    } else {
      settingForm.resetFields()
    }
  }, [editingNode, digramData, settingForm])

  const handleDrawerClose = () => {
    setEditingNode(undefined)
  }

  const handleSettingSave = async (formData: NodeData): Promise<void> => {
    if (editingNode) {
      console.log('formData', formData)
      updateNode(editingNode.id, formData)
      handleDrawerClose()
    }
  }

  const renderForm = () => {
    switch (editingNode?.type) {
      case NodeType.Database:
        return (
          <>
            <Form.Item label="图标" name="icon">
              <Select
                allowClear
                options={iconSet
                  .filter(({ type }) => type === NodeType.Database)
                  .map(({ label, value }) => ({ label, value }))}
              />
            </Form.Item>
            <Form.Item label="布局" name="layout">
              <Select
                allowClear
                options={[
                  { label: 'vertical', value: 'vertical' },
                  { label: 'horizontal', value: 'horizontal' },
                ].map(({ label, value }) => ({
                  label,
                  value,
                }))}
              />
            </Form.Item>
          </>
        )

      case NodeType.Service:
        return (
          <>
            <Form.Item label="图标" name="icon">
              <Select
                allowClear
                options={iconSet
                  .filter(({ type }) => type === NodeType.Service || 'app')
                  .map(({ label, value }) => ({ label, value }))}
              />
            </Form.Item>
            <Form.Item label="布局" name="layout">
              <Select
                allowClear
                options={[
                  { label: 'vertical', value: 'vertical' },
                  { label: 'horizontal', value: 'horizontal' },
                ].map(({ label, value }) => ({
                  label,
                  value,
                }))}
              />
            </Form.Item>
          </>
        )

      case NodeType.Users:
        return (
          <>
            <Form.Item label="类型" name="icon">
              <Select
                allowClear
                options={[
                  { label: '桌面端', value: 'desktop' },
                  { label: '移动端', value: 'mobile' },
                  { label: '笔记本/平板', value: 'laptop' },
                ]}
              />
            </Form.Item>
          </>
        )

      default:
        return null
    }
  }

  return (
    <Drawer visible={!!editingNode} onClose={handleDrawerClose}>
      <Form form={settingForm} onFinish={handleSettingSave}>
        <Form.Item label="文字" name="label">
          <Input.TextArea />
        </Form.Item>

        {renderForm()}

        <Button htmlType="submit" type="primary">
          保存
        </Button>
      </Form>
    </Drawer>
  )
}
