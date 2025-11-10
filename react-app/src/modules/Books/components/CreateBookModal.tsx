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
  const { authorList, loadAuthors } = useAuthorsProviders()
  const [picture, setPicture] = useState('')

  const onClose = () => {
    setTitle('')
    setYearPublished(0)
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
        icon={<PlusOutlined />}
        style={{
          backgroundColor: 'transparent',
          borderColor: '#395e66',
          color: 'white',
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
            title,
            yearPublished,
            authorId: '4540d533-3100-445a-8796-ab5dfd9a3240',
          })
          onClose()
        }}
        okButtonProps={{
          disabled: !authorId || !title?.length || !yearPublished,
        }}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <span>
            <p>Title :</p>
            <Input
              type="text"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
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

          <span>
            <p>Author :</p>
            <Select
              style={{ width: '100%' }}
              options={authorList.map(authorInfo => ({
                label: `${authorInfo.Authors.firstName} ${authorInfo.Authors.lastName}`,
                value: authorInfo.Authors.id,
              }))}
              onChange={value => setAuthorId(value)}
            />
          </span>
          <span>
            <p>Year Published :</p>
            <Input
              type="number"
              placeholder="Year Published"
              value={yearPublished}
              onChange={e => setYearPublished(Number(e.target.value))}
            />
          </span>
        </Space>
      </Modal>
    </>
  )
}
