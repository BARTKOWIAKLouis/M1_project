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
    setIsOpen(false)
  }

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        style={{
          backgroundColor: 'white',
          borderColor: '#653239',
          color: '#653239',
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
          onCreate({
            firstName,
            lastName,
            picture,
          })
          onClose()
        }}
        okButtonProps={{
          disabled: !firstName?.length || !lastName?.length,
        }}
      >

        <Space direction="vertical" style={{ width: '100%' }}>
          <span>
            <p>First name :</p>
          <Input
            type="text"
            placeholder="First_name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          </span>

          <span>
            <p>Last name :</p>
          <Input
            type="text"
            placeholder="Last_name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          </span>

          <span>
            <p>Picture :</p>
          <Input
            type="text"
            placeholder="Link Picture"
            value={picture}
            onChange={e => setPicture(e.target.value)}
          />
          </span>

        </Space>
      </Modal>
    </>
  )
}
