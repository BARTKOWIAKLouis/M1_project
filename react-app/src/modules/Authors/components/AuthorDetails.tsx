import { Image, Skeleton, Space, Typography, Row, Col } from 'antd'
import { useAuthorDetailProvider } from '../providers/useAuthorDetailProvider'
import { useEffect } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { Route as authorsRoute } from '../../../routes/authors'

interface AuthorDetailsProps {
  id: string
}

export const AuthorDetails = ({ id }: AuthorDetailsProps) => {
  const { isLoading, authorInfo, loadAuthorDetail } = useAuthorDetailProvider(id)

  useEffect(() => {
    loadAuthorDetail()
  }, [id])

  if (isLoading) {
    return <Skeleton active />
  }

  return (
    <Space direction="vertical" style={{ width: '95%', padding: '20px' }}>
      <Link to={authorsRoute.to}>
        <ArrowLeftOutlined
          style={{ color: 'white', fontSize: '20px', marginLeft: '-100%' }}
        />
      </Link>
      <Row gutter={[32, 32]}>
        <Col span={8}>
          <Image
            src={authorInfo?.author.picture}
            alt="Author Picture"
            width={300}
            style={{ borderRadius: '8px' }}
          />
        </Col>
        <Col span={16}>
          <Space direction="vertical" size="large">
            <Typography.Title level={1} style={{ color: 'white', margin: 0 }}>
              {authorInfo?.author.firstName}
            </Typography.Title>
            <Typography.Title level={2} style={{ color: 'white', margin: 0 }}>
              {authorInfo?.author.lastName}
            </Typography.Title>
          </Space>
        </Col>
      </Row>
      <div style={{ marginTop: '40px' }}>
        <Typography.Title level={4} style={{ color: 'white' }}>
          Books written:
        </Typography.Title>
        <Space direction="vertical" style={{ width: '100%' }}>
          {authorInfo?.totalCount === 0 ? (
            <Typography.Text style={{ color: 'white' }}>
              This author hasn't written any book.
            </Typography.Text>
          ) : (
            authorInfo?.writtenBooks.map(book => (
              <Row key={book.id}
                    style={{
                      width: '100%',
                      height: '50px',
                      borderRadius: '10px',
                      backgroundColor: '#653239',
                      padding: '.25rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                    onMouseEnter={(e) => {e.currentTarget.style.transform='scale(1.02)'}}
                    onMouseLeave={(e) => {e.currentTarget.style.transform='scale(1)'}}
              >
                <Link
                  to={`/books/$bookId`}
                  params={{bookId: book.id}}
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    width: '100%',
                  }}
                >
                  <span>{book.title}</span>
              </Link>
              </Row>
            ))
          )}
        </Space>
      </div>
    </Space>
  )
}
