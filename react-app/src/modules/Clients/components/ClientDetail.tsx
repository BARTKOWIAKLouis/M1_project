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

  return (
    <>
      <style>
        {`
      .scrollable-books::-webkit-scrollbar {
  width: 8px;
}

.scrollable-books::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  transition: background-color 0.3s;
}

.scrollable-books::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.6);
}

.scrollable-books::-webkit-scrollbar-track {
  background: transparent;
}
  .scrollable-books {
  position: relative;
}

.scrollable-books::after {
  content: '';
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  height: 24px;
  background: linear-gradient(to bottom, transparent, rgba(101, 50, 57, 0.9));
  pointer-events: none;
}
`}
      </style>
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

          <div
            style={{
              marginTop: '20px',
              maxHeight: '250px',
              overflowY: 'auto',
              paddingLeft: '30px',
              paddingRight: '20px',
              scrollbarWidth: 'thin',
              scrollbarColor: '#b37a7a transparent',
              width: '95%',
              marginLeft: '0',
            }}
            className="scrollable-books"
          ></div>
          <Space direction="vertical" style={{ width: '100%' }}>
            {clientInfo?.purchasedBooks.length === 0 ? (
              <Typography.Text style={{ color: 'white' }}>
                This client has not purchased any books.
              </Typography.Text>
            ) : (
              clientInfo?.purchasedBooks.map(book => (
                <Row
                  key={book.id}
                  style={{
                    width: '100%',
                    height: '50px',
                    borderRadius: '10px',
                    backgroundColor: '#653239',
                    padding: '.25rem 1rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transition:
                      'transform 0.2s ease, background-color 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.02)'
                    e.currentTarget.style.backgroundColor = '#7d3a43'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.backgroundColor = '#653239'
                  }}
                >
                  <Link
                    to={`/books/$bookId`}
                    params={{ bookId: book.id }}
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      width: '100%',
                      fontWeight: 500,
                      textDecoration: 'none',
                    }}
                  >
                    <span>
                      {book.title} of {book.author.firstName}{' '}
                      {book.author.lastName}
                    </span>
                  </Link>
                </Row>
              ))
            )}
          </Space>
        </div>
      </Space>
    </>
  )
}
