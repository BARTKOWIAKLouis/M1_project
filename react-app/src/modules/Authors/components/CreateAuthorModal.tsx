import { useState } from 'react'
import type { CreateAuthorModel } from '../AuthorModel'
import { Button, Input, Modal, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

interface CreateAuthorModalProps {
  onCreate: (author: CreateAuthorModel) => void
}

export function CreateAuthorModal({ onCreate }: CreateAuthorModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [picture, setPicture] = useState('')

  const onClose = () => {
    setFirstName('')
    setLastName('')
    setPicture('')
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
        Add Author
      </Button>

      <Modal
        open={isOpen}
        onCancel={onClose}
        onOk={() => {
          onCreate({ firstName, lastName, picture })
          onClose()
        }}
        okButtonProps={{
          disabled: !firstName?.length || !lastName?.length,
        }}
        width="40vw"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <div style={{ fontSize: '1vw' }}>
            <label>First name :</label>
            <Input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              style={{ fontSize: '1vw' }}
            />
          </div>

          <div style={{ fontSize: '1vw' }}>
            <label>Last name :</label>
            <Input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              style={{ fontSize: '1vw' }}
            />
          </div>

          <div style={{ fontSize: '1vw' }}>
            <label>Picture :</label>
            <Input
              type="text"
              placeholder="Link Picture"
              value={picture}
              onChange={e => setPicture(e.target.value)}
              style={{ fontSize: '1vw' }}
            />
          </div>
        </Space>
      </Modal>
    </>
  )
}
