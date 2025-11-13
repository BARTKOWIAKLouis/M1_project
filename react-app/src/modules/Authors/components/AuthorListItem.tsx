// import { useState } from 'react'
import type { AuthorModel } from '../AuthorModel'
import { Button, Col, Row, Image } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { SignatureOutlined } from '@ant-design/icons'
import { useState } from 'react'

interface AuthorListItemProps {
  author: AuthorModel
  Number_of_Books: number
  onDelete: (id: string) => void
}

export function AuthorListItem({
  author,
  Number_of_Books,
  onDelete,
}: AuthorListItemProps) {
  const [imageError, setImageError] = useState(false)
  const IMAGE_WIDTH = 30
  const IMAGE_HEIGHT = 45
  return (
    <Row
      style={{
        width: '100%',
        height: '50px',
        borderRadius: '10px',
        backgroundColor: '#653239',
        margin: '1rem 0',
        padding: '.25rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Col span={1}>
        {author.picture && !imageError ? (
          <Image
            src={author.picture}
            alt="Book Cover"
            style={{
              borderRadius: '3px',
              width: `${IMAGE_WIDTH}px`,
              height: `${IMAGE_HEIGHT}px`,
              margin: '0 0 0 60px',
              objectFit: 'cover',
            }}
            preview={false}
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            style={{
              width: `${IMAGE_WIDTH}px`,
              height: `${IMAGE_HEIGHT}px`,
              borderRadius: '3px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0 0 0 60px',
            }}
          >
            <SignatureOutlined style={{ fontSize: '32px', color: '#999' }} />
          </div>
        )}
      </Col>
      <Col span={5} style={{ margin: 'auto 0' }}>
        {
          <Link
            to={`/authors/$authorId`}
            params={{ authorId: author.id }}
            style={{
              margin: 'auto 0',
              textAlign: 'left',
              color: 'white',
            }}
          >
            <span style={{ fontWeight: 'bold' }}>
              {author.firstName}
              {author.lastName}
            </span>
          </Link>
        }
      </Col>

      <Col span={3} style={{ margin: 'auto 0' }}>
        Books written: <span>{String(Number_of_Books)}</span>
      </Col>
      <Col
        span={3}
        style={{
          alignItems: 'right',
          display: 'flex',
          gap: '.25rem',
          margin: 'auto 0',
        }}
      >
        <Button type="primary" danger onClick={() => onDelete(author.id)}>
          <DeleteOutlined />
        </Button>
      </Col>
    </Row>
  )
}
