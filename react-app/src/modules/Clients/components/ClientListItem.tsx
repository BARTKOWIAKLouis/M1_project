import type { ClientModel } from '../ClientModel'
import { Button, Col, Row, Image} from 'antd'
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
        backgroundColor: '#653239',
        margin: '1rem 0',
        padding: '.25rem',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Col span={1}>
        <Image
          src={client.picture}
          alt="client picture"
          height={1}
          style={{ borderRadius: '3px' }}
        />

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
          <span >{client.firstName}-{' '}{client.lastName}</span>
        </Link>
      </Col>
      <Col span={5} style={{margin: 'auto 0' }}>
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
        <Button type="primary" danger onClick={() => onDelete(client.id)}>
          <DeleteOutlined />
        </Button>
      </Col>
    </Row>
  )
}
