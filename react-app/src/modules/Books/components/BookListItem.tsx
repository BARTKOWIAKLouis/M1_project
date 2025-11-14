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
  const [imageError, setImageError] = useState(false)

  const IMAGE_WIDTH = '2.5vw'
  const IMAGE_HEIGHT = '3.5vw'

  return (
    <Row
      style={{
        width: '100%',
        height: '9vh',
        borderRadius: '1vw',
        backgroundColor: '#653239',
        margin: '2vh 0',
        padding: '0.5vh 1vw',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Col span={2} style={{ display: 'flex', justifyContent: 'center' }}>
        {book.picture && !imageError ? (
          <Image
            src={book.picture}
            alt="Book Cover"
            style={{
              borderRadius: '0.5vw',
              width: IMAGE_WIDTH,
              height: IMAGE_HEIGHT,
              objectFit: 'cover',
            }}
            preview={false}
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            style={{
              width: IMAGE_WIDTH,
              height: IMAGE_HEIGHT,
              borderRadius: '0.5vw',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.1)',
            }}
          >
            <BookOutlined style={{ fontSize: '2vw', color: '#999' }} />
          </div>
        )}
      </Col>
      <Col
        span={6}
        style={{
          margin: 'auto 0',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
      >
        <Link
          to={`/books/$bookId`}
          params={{ bookId: book.id }}
          style={{
            color: 'white',
            fontSize: '1.3vw',
            fontWeight: 'bold',
            textDecoration: 'none',
          }}
        >
          {book.title}
        </Link>
      </Col>
      <Col
        span={2}
        style={{
          margin: 'auto 0',
          color: 'white',
          fontSize: '1.2vw',
          textAlign: 'center',
        }}
      >
        {book.yearPublished}
      </Col>
      <Col
        span={6}
        style={{
          margin: 'auto 0',
          color: 'white',
          fontSize: '1.2vw',
        }}
      >
        by{' '}
        <span style={{ fontWeight: 'bold' }}>
          {book.author.firstName} {book.author.lastName}
        </span>
      </Col>
      <Col
        span={3}
        style={{
          margin: 'auto 0',
          color: 'white',
          fontSize: '1.2vw',
        }}
      >
        Sales: <span style={{ fontWeight: 'bold' }}>{String(sales_count)}</span>
      </Col>
      <Col
        span={3}
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1vw',
        }}
      >
        <DeleteModal id={book.id} onDelete={onDelete} />
      </Col>
    </Row>
  )
}
