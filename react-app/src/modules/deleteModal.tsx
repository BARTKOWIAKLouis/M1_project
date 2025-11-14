import { useState } from 'react'
import { Button, Modal, Space } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

interface deleteModalProps {
  id: string
  onDelete: (id: string) => void
}

export function DeleteModal({ id, onDelete }: deleteModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <style>
        {`
        .ant-modal-title, .ant-modal-header{
          background-color: #F5F5DC;
        }
        `}
      </style>
      <Button type="primary" danger onClick={() => setIsOpen(true)}>
        <DeleteOutlined />
      </Button>
      <Modal
        open={isOpen}
        onCancel={onClose}
        onOk={() => {
          onDelete(id)
          onClose()
        }}
        okText="Delete"
        okButtonProps={{ danger: true }}
        title="Delete Item"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <span>Are you sure you want to delete this item ?</span>
        </Space>
      </Modal>
    </>
  )
}
