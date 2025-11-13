import type { BookModel } from '../BookModel'
import { Col, Row, Image } from 'antd'
import { Link } from '@tanstack/react-router'
import { BookOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { DeleteModal } from '../../deleteModal'

interface BookListItemProps {
  book: BookModel
  sales_count: number
  onDelete: (id: string) => void
}

export function BookListItem({
  book,
  sales_count,
  onDelete,
}: BookListItemProps) {
  // debug: log the picture URL to verify it's valid on the list page
  const [imageError, setImageError] = useState(false)
  const IMAGE_WIDTH = 30
  const IMAGE_HEIGHT = 45
  return (
    <>
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
          {book.picture && !imageError ? (
            <Image
              src={book.picture}
              alt="Book Cover"
              style={{
                borderRadius: '3px',
                width: `${IMAGE_WIDTH}px`,
                height: `${IMAGE_HEIGHT}px`,
                margin: '0 0 0 60px',
                objectFit: 'cover', // 👈 garde le bon ratio sans déformer l’image
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
              <BookOutlined style={{ fontSize: '32px', color: '#999' }} />
            </div>
          )}
        </Col>
        <Col span={8} style={{ margin: 'auto 0' }}>
          <Link
            to={`/books/$bookId`}
            params={{ bookId: book.id }}
            style={{
              margin: 'auto 0',
              textAlign: 'left',
              color: 'white',
            }}
          >
            <span style={{ fontWeight: 'bold' }}>{book.title}</span>
            {'  '}
          </Link>
        </Col>
        <Col span={1} style={{ margin: 'auto 0', color: 'white' }}>
          <span>{book.yearPublished}</span>
        </Col>
        <Col span={5} style={{ margin: 'auto 0' }}>
          by <span style={{ fontWeight: 'bold' }}>{book.author.firstName}</span>{' '}
          <span style={{ fontWeight: 'bold' }}>{book.author.lastName}</span>
        </Col>
        <Col span={3} style={{ margin: 'auto 0' }}>
          Sales: <span>{String(sales_count)}</span>
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
          <DeleteModal id={book.id} onDelete={onDelete} />
        </Col>
      </Row>
    </>
  )
}
