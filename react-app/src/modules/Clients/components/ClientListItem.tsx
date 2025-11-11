import type { ClientModel } from '../ClientModel'
import { Button, Col, Row } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'

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
  return (
    <Row
      style={{
        width: '100%',
        height: '50px',
        borderRadius: '10px',
        backgroundColor: '#00c080ff',
        margin: '1rem 0',
        padding: '.25rem',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Col span={10} style={{ margin: 'auto 0' }}>
        <Link
          to={`/clients/$clientId`}
          params={{ clientId: client.id }}
          style={{
            margin: 'auto 0',
            textAlign: 'left',
          }}
        >
          <span style={{ fontWeight: 'bold' }}>{client.firstName}</span> -{' '}
          {client.lastName}
        </Link>
      </Col>
      <Col span={8} style={{ margin: 'auto 0' }}>
        by <span style={{ fontWeight: 'bold' }}>{client.email}</span>
      </Col>
      <Col span={3} style={{ margin: 'auto 0' }}>
        Sales: <span>{String(purchaseCount)}</span>
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
        <Button type="primary" danger onClick={() => onDelete(client.id)}>
          <DeleteOutlined />
        </Button>
      </Col>
    </Row>
  )
}
