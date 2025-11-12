import { useEffect, useState } from 'react'
import type { UpdateBookModel, BookModel } from '../BookModel'
import { Button, Input, Modal, Select, Space } from 'antd'
import { SaveOutlined } from '@ant-design/icons'
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
      loadAuthors()
    }
  }, [isOpen])

  return (
    <>
      <Button
        icon={<SaveOutlined />}
        style={{
          backgroundColor: '#fff',
          borderColor: '#653239',
          color: '#653239',
        }}
        onClick={() => setIsOpen(true)}
      >
        Modifier
      </Button>

      <Modal
        open={isOpen}
        onCancel={onClose}
        onOk={() => {
          if (!authorId) return
          onUpdate(book.id, { title, yearPublished, authorId, picture })
          onClose()
        }}
        okButtonProps={{
          disabled: !title || yearPublished == null || !authorId,
        }}
        title="Modifier le livre"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <label>Title :</label>
            <Input value={title} onChange={e => setTitle(e.target.value)} />
          </div>

          <div>
            <label>Picture :</label>
            <Input
              value={picture ?? ''}
              onChange={e => setPicture(e.target.value)}
            />
          </div>

          <div>
            <label>Author :</label>
            <Select
              style={{ width: '100%' }}
              options={authorList.map(a => ({
                label: `${a.Authors.firstName} ${a.Authors.lastName}`,
                value: a.Authors.id,
              }))}
              value={authorId}
              onChange={(value: string) => setAuthorId(value)}
            />
          </div>

          <div>
            <label>Year Published :</label>
            <Input
              type="number"
              value={yearPublished ?? ''}
              onChange={e => setYearPublished(Number(e.target.value))}
            />
          </div>
        </Space>
      </Modal>
    </>
  )
}
