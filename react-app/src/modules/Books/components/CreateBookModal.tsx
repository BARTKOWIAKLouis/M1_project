import { useEffect, useState } from 'react'
import type { CreateBookModel } from '../BookModel'
import { Button, Input, Modal, Select, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useAuthorsProviders } from '../../Authors/providers/useAuthorsProviders'

interface CreateBookModalProps {
  onCreate: (book: CreateBookModel) => void
}

export function CreateBookModal({ onCreate }: CreateBookModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [yearPublished, setYearPublished] = useState(0)
  const [authorId, setAuthorId] = useState<string | undefined>(undefined)
  const [picture, setPicture] = useState<string | undefined>(undefined)
  const { authorList, loadAuthors } = useAuthorsProviders()

  const onClose = () => {
    setTitle('')
    setYearPublished(0)
    setAuthorId(undefined)
    setPicture(undefined)
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen) {
      loadAuthors()
    }
  }, [isOpen])

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
        icon={<PlusOutlined style={{ fontSize: '1.5vw' }} />}
        style={{
          backgroundColor: 'white',
          borderColor: '#653239',
          color: '#653239',
          fontSize: '1vw',
          padding: '0.8vh 1vw',
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
          if (!authorId) return
          onCreate({
            title,
            yearPublished,
            authorId,
            picture,
          })
          onClose()
        }}
        okButtonProps={{
          disabled: !authorId || !title?.length || !yearPublished,
        }}
        width="40vw"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <label style={{ fontSize: '1vw' }}>Title :</label>
            <Input
              type="text"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              style={{ fontSize: '1vw' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '1vw' }}>Picture :</label>
            <Input
              type="text"
              placeholder="Link Picture"
              value={picture}
              onChange={e => setPicture(e.target.value)}
              style={{ fontSize: '1vw' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '1vw' }}>Author :</label>
            <Select
              style={{ width: '100%', fontSize: '1vw' }}
              options={authorList.map(authorInfo => ({
                label: `${authorInfo.Authors.firstName} ${authorInfo.Authors.lastName}`,
                value: authorInfo.Authors.id,
              }))}
              onChange={value => setAuthorId(value)}
            />
          </div>

          <div>
            <label style={{ fontSize: '1vw' }}>Year Published :</label>
            <Input
              type="number"
              placeholder="Year Published"
              value={yearPublished}
              onChange={e => setYearPublished(Number(e.target.value))}
              style={{ fontSize: '1vw' }}
            />
          </div>
        </Space>
      </Modal>
    </>
  )
}
