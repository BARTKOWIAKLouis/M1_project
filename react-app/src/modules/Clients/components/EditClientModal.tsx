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
      <Button
        icon={<EditOutlined style={{ fontSize: '1.5vw' }} />}
        style={{
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          color: '#653239',
        }}
        onClick={() => setIsOpen(true)}
      />

      <Modal
        open={isOpen}
        onCancel={onClose}
        onOk={async () => {
          await onUpdate(client.id, { firstName, lastName, email })
          onClose()
        }}
        okButtonProps={{
          disabled: !firstName || !lastName,
        }}
        title="Modify Client"
        bodyStyle={{ padding: '2vh 2vw' }}
      >
        <Space direction="vertical" style={{ width: '100%', gap: '1.5vh' }}>
          <div>
            <label style={{ fontSize: '1vw' }}>First Name:</label>
            <Input
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              style={{ fontSize: '1vw', padding: '0.5vh 0.5vw' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '1vw' }}>Last Name:</label>
            <Input
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              style={{ fontSize: '1vw', padding: '0.5vh 0.5vw' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '1vw' }}>Email:</label>
            <Input
              value={email ?? ''}
              onChange={e => setEmail(e.target.value)}
              style={{ fontSize: '1vw', padding: '0.5vh 0.5vw' }}
            />
          </div>
        </Space>
      </Modal>
    </>
  )
}
