import { useState } from 'react'
import type { CreateClientModel } from '../ClientModel'
import { Button, Input, Modal, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

interface CreateClientModalProps {
  onCreate: (client: CreateClientModel) => void
}

export function CreateClientModal({ onCreate }: CreateClientModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState<string | undefined>(undefined)
  const [picture, setPicture] = useState<string | undefined>(undefined)

  const onClose = () => {
    setFirstName('')
    setLastName('')
    setEmail(undefined)
    setPicture(undefined)
    setIsOpen(false)
  }

  return (
    <>
      <style>
        {`
      .ant-modal .ant-modal-content {
          background-color: #F5F5DC;
          color: #653239;

          .ant-input {
          border: none;
          border-bottom: 2px solid #653239;
          background-color: transparent;
          color: #653239;
          }
          .ant-select-selector{
          background-color: transparent !important;
          }
          .ant-input:hover {
            color: #A9A9A9 !important;
          }
          .ant-select-selector:hover {
            border-color: #A9A9A9 !important;
          }
          .ant-btn-variant-outlined:hover {
              border-color: #A9A9A9 !important;
              color: #A9A9A9 !important;
          }
        }
      `}
      </style>
      <Button
        icon={<PlusOutlined />}
        style={{
          backgroundColor: 'white',
          borderColor: '#653239',
          color: '#653239',
          fontSize: '1vw',
          padding: '0.5vh 1vw',
        }}
        type="primary"
        onClick={() => setIsOpen(true)}
      >
        Add Client
      </Button>

      <Modal
        open={isOpen}
        onCancel={onClose}
        onOk={() => {
          onCreate({ firstName, lastName, email, picture })
          onClose()
        }}
        okButtonProps={{
          disabled: !firstName || !lastName,
        }}
        bodyStyle={{ padding: '2vh 2vw' }}
      >
        <Space direction="vertical" style={{ width: '100%', gap: '1.5vh' }}>
          <div>
            <label style={{ fontSize: '1vw' }}>First Name:</label>
            <Input
              placeholder="First Name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              style={{ fontSize: '1vw', padding: '0.5vh 0.5vw' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '1vw' }}>Last Name:</label>
            <Input
              placeholder="Last Name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              style={{ fontSize: '1vw', padding: '0.5vh 0.5vw' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '1vw' }}>Email:</label>
            <Input
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ fontSize: '1vw', padding: '0.5vh 0.5vw' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '1vw' }}>Picture URL:</label>
            <Input
              placeholder="Link Picture"
              value={picture}
              onChange={e => setPicture(e.target.value)}
              style={{ fontSize: '1vw', padding: '0.5vh 0.5vw' }}
            />
          </div>
        </Space>
      </Modal>
    </>
  )
}
