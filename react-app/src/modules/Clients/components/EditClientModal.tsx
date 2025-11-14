import type { ClientModel, UpdateClientModel } from '../ClientModel'
import { Button, Input, Modal, Space } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'

interface EditClientModalProps {
  client: ClientModel
  onUpdate: (id: string, input: UpdateClientModel) => void
}

export function EditClientModal({ client, onUpdate }: EditClientModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [firstName, setFirstName] = useState(client.firstName)
  const [lastName, setLastName] = useState(client.lastName)
  const [email, setEmail] = useState(client.email)

  const onClose = () => {
    setFirstName(client.firstName)
    setLastName(client.lastName)
    setEmail(client.email)
    setIsOpen(false)
  }
  useEffect(() => {
    if (isOpen) {
      setFirstName(client.firstName)
      setLastName(client.lastName)
      setEmail(client.email)
    }
  }, [isOpen])
  return (
    <>
      <style>
        {`
        .ant-modal .ant-modal-content {
          background-color: #F5F5DC !important;
          color: #653239 ! important;
        `}
      </style>
      <Button
        icon={<EditOutlined style={{ fontSize: '20px' }} />}
        style={{
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          color: '#653239',
        }}
        onClick={() => setIsOpen(true)}
      ></Button>

      <Modal
        open={isOpen}
        onCancel={onClose}
        onOk={async () => {
          await onUpdate(client.id, { firstName, lastName, email })
          onClose()
        }}
        okButtonProps={{
          disabled: !firstName || lastName == null,
        }}
        title="Modify Client"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <label>FirstName :</label>
            <Input
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </div>

          <div>
            <label>LastName :</label>
            <Input
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label>Email</label>
            <Input
              value={email ?? ''}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        </Space>
      </Modal>
    </>
  )
}
