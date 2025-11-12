import type { BookModel, UpdateBookModel } from '../BookModel'
import { Button, Col, Row, Image } from 'antd'
import {
  DeleteOutlined,
} from '@ant-design/icons'
import { Link } from '@tanstack/react-router'

interface BookListItemProps {
  book: BookModel
  sales_count: number
  onDelete: (id: string) => void
  onUpdate: (id: string, input: UpdateBookModel) => void
}

export function BookListItem({
  book,
  sales_count,
  onDelete,
}: BookListItemProps) {



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
        <Image
          src={book.picture}
          alt="Book Cover"
          height={1}
          style={{ borderRadius: '3px' }}
        />
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
        <Button type="primary" danger onClick={() => onDelete(book.id)}>
          <DeleteOutlined />
        </Button>
      </Col>
    </Row>
  )
}
