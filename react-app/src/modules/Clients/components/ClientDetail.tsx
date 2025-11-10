import { Image, Skeleton, Space, Typography, Row, Col } from 'antd'
import { useClientDetailProvider } from '../providers/useClientDetailProvider'
import { useEffect } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { Route as clientsRoute } from '../../../routes/clients'

interface ClientDetailsProps {
  id: string
}

export const ClientDetails = ({ id }: ClientDetailsProps) => {
  const { isLoading, clientInfo, loadClient } = useClientDetailProvider(id)

  useEffect(() => {
    loadClient()
  }, [id])

  if (isLoading) {
    return <Skeleton active />
  }
  console.log(clientInfo?.client)

  return (
    <Space direction="vertical" style={{ width: '95%', padding: '20px' }}>
      <Link to={clientsRoute.to}>
        <ArrowLeftOutlined
          style={{ color: 'white', fontSize: '20px', marginLeft: '-100%' }}
        />
      </Link>
      <Row gutter={[32, 32]}>
        <Col span={8}>
          <Image
            src={clientInfo?.client.picture}
            alt="Client Picture"
            width={300}
            style={{ borderRadius: '8px' }}
          />
        </Col>
        <Col span={16}>
          <Space direction="vertical" size="large">
            <Typography.Title level={1} style={{ color: 'white', margin: 0 }}>
              {clientInfo?.client.firstName} {clientInfo?.client.lastName}
            </Typography.Title>
            <Typography.Title level={2} style={{ color: 'white', margin: 0 }}>
              {clientInfo?.client.email}
            </Typography.Title>
          </Space>
        </Col>
      </Row>
      <div style={{ marginTop: '40px' }}>
        <Typography.Title level={4} style={{ color: 'white' }}>
          Books purchased by this client:
        </Typography.Title>
        <Space direction="vertical" style={{ width: '100%' }}>
          {clientInfo?.purchasedBooks.length === 0 ? (
            <Typography.Text style={{ color: 'white' }}>
              This client has not purchased any books.
            </Typography.Text>
          ) : (
            clientInfo?.purchasedBooks.map(book => (
              <div
                key={book.id}
                style={{
                  color: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  padding: '12px',
                  borderRadius: '6px',
                }}
              >
                {book.title} {book.author.firstName} ({book.author.lastName}) -{' '}
                {book.yearPublished}
              </div>
            ))
          )}
        </Space>
      </div>
    </Space>
  )
}
