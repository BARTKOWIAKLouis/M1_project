import { useEffect, useState } from 'react'
import type { UpdateBookModel, BookModel } from '../BookModel'
import { Button, Input, Modal, Select, Space } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useAuthorsProviders } from '../../Authors/providers/useAuthorsProviders'

interface EditBookModalProps {
  book: BookModel
  onUpdate: (id: string, input: UpdateBookModel) => void
}

export function EditBookModal({ book, onUpdate }: EditBookModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState(book.title)
  const [yearPublished, setYearPublished] = useState(book.yearPublished)
  const [authorId, setAuthorId] = useState<string | undefined>(book.author.id)
  const [picture, setPicture] = useState<string | undefined>(book.picture)
  const { authorList, loadAuthors } = useAuthorsProviders()

  const onClose = () => {
    setTitle(book.title)
    setYearPublished(book.yearPublished)
    setAuthorId(book.author.id)
    setPicture(book.picture)
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen) {
      setTitle(book.title)
      setYearPublished(book.yearPublished)
      setAuthorId(book.author.id)
      setPicture(book.picture)
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
          .ant-modal-title{
            color: #653239  !important;
            background-color: #F5F5DC !important;
            font-weight: bold !important;
            }

        }
        `}
      </style>
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
          if (!authorId) return
          try {
            await onUpdate(book.id, { title, yearPublished, authorId, picture })
            onClose()
          } catch (err) {
            console.error('Error updating book', err)
          }
        }}
        okButtonProps={{
          disabled: !title || yearPublished == null || !authorId,
        }}
        title="Modify Book"
        width="40vw"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <label style={{ fontSize: '1vw' }}>Title :</label>
            <Input
              value={title}
              onChange={e => setTitle(e.target.value)}
              style={{ fontSize: '1vw' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '1vw' }}>Picture :</label>
            <Input
              value={picture ?? ''}
              onChange={e => setPicture(e.target.value)}
              style={{ fontSize: '1vw' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '1vw' }}>Author :</label>
            <Select
              style={{ width: '100%', fontSize: '1vw' }}
              options={authorList.map(a => ({
                label: `${a.Authors.firstName} ${a.Authors.lastName}`,
                value: a.Authors.id,
              }))}
              value={authorId}
              onChange={(value: string) => setAuthorId(value)}
            />
          </div>

          <div>
            <label style={{ fontSize: '1vw' }}>Year Published :</label>
            <Input
              type="number"
              value={yearPublished ?? ''}
              onChange={e => setYearPublished(Number(e.target.value))}
              style={{ fontSize: '1vw' }}
            />
          </div>
        </Space>
      </Modal>
    </>
  )
}
