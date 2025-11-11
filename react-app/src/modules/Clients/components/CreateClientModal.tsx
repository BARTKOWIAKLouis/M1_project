import { useEffect, useState } from 'react'
import type { CreateClientModel } from '../ClientModel'
import { Button, Input, Modal, Select, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useAuthorsProviders } from '../../Authors/providers/useAuthorsProviders'

interface CreateClientModalProps {
  onCreate: (client: CreateClientModel) => void
}

export function CreateClientModal({ onCreate }: CreateClientModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [email, setemail] = useState('')
  const [picture, setPicture] = useState('')

  const onClose = () => {
    setfirstName('')
    setlastName('')
    setemail('')
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
        Create Book
      </Button>
      <Modal
        open={isOpen}
        onCancel={onClose}
        onOk={() => {
          onCreate({
            firstName,
            lastName,
            email,
            picture

        })
          onClose()
        }}
        okButtonProps={{
          disabled: !firstName || !lastName,
        }}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <span>
            <p>FirstName :</p>
            <Input
              type="text"
              placeholder="firstName"
              value={firstName}
              onChange={e => setfirstName(e.target.value)}
            />
          </span>

          <span>
            <p>LastName :</p>
            <Input
              type="text"
              placeholder="firsName"
              value={lastName}
              onChange={e => setlastName(e.target.value)}
            />
          </span>

          <span>
            <p>Email :</p>
            <Input
              type="text"
              placeholder="email"
              value={email}
              onChange={e => setemail(e.target.value)}
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
