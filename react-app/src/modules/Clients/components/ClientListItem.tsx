import type { ClientModel } from '../ClientModel'
import { Col, Row, Image } from 'antd'
import { Link } from '@tanstack/react-router'
import { UserOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { DeleteModal } from '../../deleteModal'

interface ClientListItemProps {
  client: ClientModel
  purchaseCount: number
  onDelete: (id: string) => void
}

export function ClientListItem({
  client,
  purchaseCount,
  onDelete,
}: ClientListItemProps) {
  const [imageError, setImageError] = useState(false)
  const IMAGE_WIDTH = 4
  const IMAGE_HEIGHT = 6

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
      <Col span={3}>
        {client.picture && !imageError ? (
          <Image
            src={client.picture}
            alt="Client Avatar"
            style={{
              borderRadius: '3px',
              width: `${IMAGE_WIDTH}vw`,
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
              borderRadius: '3px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 'auto',
            }}
          >
            <UserOutlined style={{ fontSize: '2.5vw', color: '#999' }} />
          </div>
        )}
      </Col>

      <Col span={10} style={{ display: 'flex', alignItems: 'center' }}>
        <Link
          to={`/clients/$clientId`}
          params={{ clientId: client.id }}
          style={{
            margin: 'auto 0',
            textAlign: 'left',
            color: 'white',
            fontSize: '1.2vw',
            textDecoration: 'bold',
          }}
        >
          {client.firstName} {client.lastName}
        </Link>
      </Col>

      <Col
        span={5}
        style={{ display: 'flex', alignItems: 'center', fontSize: '1vw' }}
      >
        Purchases: <strong>{purchaseCount}</strong>
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
        <DeleteModal id={client.id} onDelete={onDelete} />
      </Col>
    </Row>
  )
}
