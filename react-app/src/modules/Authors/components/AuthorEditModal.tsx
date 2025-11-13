import { useState } from 'react'
import type { UpdateAuthorModel, AuthorModel } from '../AuthorModel'
import { Button, Input, Modal, Space } from 'antd'
import { EditOutlined } from '@ant-design/icons'

interface EditAuthorModalProps {
  author: AuthorModel
  onUpdate: (id: string, input: UpdateAuthorModel) => void
}

export function EditAuthorModal({ author, onUpdate }: EditAuthorModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [firstName, setFirstName] = useState(author.firstName)
  const [lastName, setLastName] = useState(author.lastName)
  const [picture, setPicture] = useState<string | undefined>(author.picture)

  const onClose = () => {
    setFirstName(author.firstName)
    setLastName(author.lastName)
    setPicture(author.picture)
    setIsOpen(false)
  }

  //   const onSave = () => {
  //     onUpdate(author.id, { firstName, lastName, picture })
  //     onClose()
  //   }

  return (
    <>
      <Button
        icon={<EditOutlined style={{ fontSize: '20px' }} />}
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
        onOk={() => {
          if (!author.id) return
          onUpdate(author.id, { firstName, lastName, picture })
          onClose()
        }}
        okButtonProps={{
          disabled: !firstName.trim() || !lastName.trim(),
        }}
        title="Modifier l'auteur"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <label>Prénom :</label>
            <Input
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              placeholder="Prénom"
            />
          </div>

          <div>
            <label>Nom :</label>
            <Input
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              placeholder="Nom"
            />
          </div>

          <div>
            <label>Photo (URL) :</label>
            <Input
              value={picture ?? ''}
              onChange={e => setPicture(e.target.value)}
              placeholder="https://..."
            />
          </div>
        </Space>
      </Modal>
    </>
  )
}
