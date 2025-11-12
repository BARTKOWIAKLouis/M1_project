import { Image, Skeleton, Space, Typography, Row, Col, Button } from 'antd'
import { useBookDetailsProvider } from '../providers/useBookDetailsProvider'
import { useEffect } from 'react'
import { ArrowLeftOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { Route as booksRoute } from '../../../routes/books'
interface BookDetailsProps {
  id: string
}

export const BookDetails = ({ id }: BookDetailsProps) => {
  const { isLoading, bookInfo, loadBook } = useBookDetailsProvider(id)

  useEffect(() => {
    loadBook()
  }, [id])

  if (isLoading) {
    return <Skeleton active />
  }
  console.log(bookInfo?.book)

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '95%',
          padding: '10px',
          paddingBottom: 0,
        }}
      >
        <Link to={booksRoute.to}>
          <ArrowLeftOutlined style={{ color: 'white', fontSize: '20px' }} />
        </Link>
        <Button
          type="primary"
          icon={<ShoppingCartOutlined />}
          style={{ backgroundColor: '#653239', borderColor: '#653239' }}
          size="large"
        >
          Buy Now
        </Button>
      </div>
      <Space direction="vertical" style={{ width: '95%', padding: '20px' }}>
        <Row gutter={[32, 32]}>
          <Col span={8}>
            <Image
              src={bookInfo?.book.picture}
              alt="Book Cover"
              width={300}
              style={{ borderRadius: '8px' }}
            />
          </Col>
          <Col span={16}>
            <Space
              direction="vertical"
              size="large"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                paddingLeft: '20px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  width: '100%',
                }}
              >
                <Typography.Title
                  level={1}
                  style={{
                    color: 'white',
                    margin: 0,
                    textAlign: 'left',
                    flex: 1,
                  }}
                >
                  {bookInfo?.book.title}
                </Typography.Title>
              </div>
              <Typography.Title
                level={2}
                style={{ color: 'white', margin: 0, textAlign: 'left' }}
              >
                {bookInfo?.book.author.firstName}{' '}
                {bookInfo?.book.author.lastName}
              </Typography.Title>
              <Typography.Title
                level={3}
                style={{ color: 'white', margin: 0, textAlign: 'left' }}
              >
                {bookInfo?.book.yearPublished}
              </Typography.Title>
            </Space>
          </Col>
        </Row>
        <div style={{ marginTop: '10%' }}>
          <Typography.Title level={4} style={{ color: 'white' }}>
            Clients who purchased this book:
          </Typography.Title>
          <Space direction="vertical" style={{ width: '100%' }}>
            {bookInfo?.clients.length === 0 ? (
              <Typography.Text style={{ color: 'white' }}>
                No clients have purchased this book.
              </Typography.Text>
            ) : (
              bookInfo?.clients.map(client => (
                <div
                  key={client.id}
                  style={{
                    color: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    padding: '12px',
                    borderRadius: '6px',
                  }}
                >
                  {client.firstName} {client.lastName} ({client.email})
                </div>
              ))
            )}
          </Space>
        </div>
      </Space>
    </>
  )
}
