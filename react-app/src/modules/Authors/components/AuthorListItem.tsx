import type { AuthorModel } from '../AuthorModel'
import { Col, Row, Image } from 'antd'
import { Link } from '@tanstack/react-router'
import { SignatureOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { DeleteModal } from '../../deleteModal'

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
  const IMAGE_WIDTH = 2.5
  const IMAGE_HEIGHT = 7

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
      <Col span={2}>
        {author.picture && !imageError ? (
          <Image
            src={author.picture}
            alt="Author"
            style={{
              borderRadius: '100% ',
              height: `${IMAGE_HEIGHT}vh`,
              objectFit: 'cover',
            }}
            preview={false}
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            style={{
              width: `${IMAGE_WIDTH}vw`,
              height: `${IMAGE_HEIGHT}vh`,
              borderRadius: '0.5vw',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 'auto',
            }}
          >
            <SignatureOutlined
              style={{
                fontSize: '2.5vw',
                color: '#999',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          </div>
        )}
      </Col>

      <Col span={8} style={{ margin: 'auto 0' }}>
        <Link
          to={`/authors/$authorId`}
          params={{ authorId: author.id }}
          style={{
            margin: 'auto 0',
            textAlign: 'left',
            color: 'white',
            fontSize: '1.2vw',
            fontWeight: 'bold',
          }}
        >
          {author.firstName} {author.lastName}
        </Link>
      </Col>

      <Col span={5} style={{ margin: 'auto 0', fontSize: '1vw' }}>
        Books written: <span>{Number_of_Books}</span>
      </Col>

      <Col
        span={3}
        style={{
          alignItems: 'right',
          display: 'flex',
          gap: '0.5vw',
          margin: 'auto 0',
        }}
      >
        <DeleteModal id={author.id} onDelete={onDelete} />
      </Col>
    </Row>
  )
}
