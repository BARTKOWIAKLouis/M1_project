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
      }}
    >
      <Col span={1}>
        {client.picture && !imageError ? (
          <Image
            src={client.picture}
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
            <UserOutlined style={{ fontSize: '32px', color: '#999' }} />
          </div>
        )}
      </Col>
      <Col span={10} style={{ margin: 'auto 0' }}>
        <Link
          to={`/clients/$clientId`}
          params={{ clientId: client.id }}
          style={{
            margin: 'auto 0',
            textAlign: 'left',
            color: 'white',
          }}
        >
          <span>
            {client.firstName}- {client.lastName}
          </span>
        </Link>
      </Col>
      <Col span={5} style={{ margin: 'auto 0' }}>
        Purchases: <strong>{purchaseCount}</strong>
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
        <DeleteModal id={client.id} onDelete={onDelete} />
      </Col>
    </Row>
  )
}
