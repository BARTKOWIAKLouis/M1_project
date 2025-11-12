// import { useState } from 'react'
import type { AuthorModel } from '../AuthorModel'
import { Button, Col, Row, Image} from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'

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
          src={author.picture}
          alt="Author Picture"
          height={1}
          style={{ borderRadius: '3px' }}
        />
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
            <span style={{ fontWeight: 'bold' }}>{author.firstName}{author.lastName}</span>

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
