import { Image, Skeleton, Space, Typography, Row, Col } from 'antd'
import { useAuthorDetailProvider } from '../providers/useAuthorDetailProvider'
import { useEffect } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { Route as authorsRoute } from '../../../routes/authors'
import { BookOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { EditAuthorModal } from './AuthorEditModal'

interface AuthorDetailsProps {
  id: string
}

export const AuthorDetails = ({ id }: AuthorDetailsProps) => {
  const { isLoading, authorInfo, loadAuthorDetail, updateAuthor } =
    useAuthorDetailProvider(id)
  const [imageError, setImageError] = useState(false)
  const IMAGE_WIDTH = 65

  useEffect(() => {
    loadAuthorDetail()
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
        <Link to={authorsRoute.to}>
          <ArrowLeftOutlined
            style={{ color: 'white', fontSize: '20px', marginLeft: '-100%' }}
          />
        </Link>
        <Row gutter={[32, 32]}>
          <Col span={8}>
            {authorInfo?.author.picture && !imageError ? (
              <Image
                src={authorInfo?.author.picture}
                alt="Book Cover"
                style={{
                  borderRadius: '100%',
                  width: `${IMAGE_WIDTH}px`,
                  margin: '0 0 0 60px',
                  objectFit: 'cover',
                }}
                preview={false}
                onError={() => setImageError(true)}
              />
            ) : (
              <div
                style={{
                  width: `${IMAGE_WIDTH}px`,
                  borderRadius: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '0 0 0 60px',
                }}
              >
                <BookOutlined style={{ fontSize: '32px', color: '#999' }} />
              </div>
            )}
          </Col>
          <Col span={16}>
            <Space direction="vertical" size="large">
              <Typography.Title level={1} style={{ color: 'white', margin: 0 }}>
                {authorInfo?.author.firstName} {authorInfo?.author.lastName}
                {authorInfo && (
                  <EditAuthorModal
                    author={authorInfo.author}
                    onUpdate={updateAuthor}
                  />
                )}
              </Typography.Title>
            </Space>
          </Col>
        </Row>
        <div>
          <Typography.Title level={4} style={{ color: 'white' }}>
            Books written:
          </Typography.Title>
        </div>
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
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            {authorInfo?.totalCount === 0 ? (
              <Typography.Text style={{ color: 'white' }}>
                <p>This author hasn&apos;t written any book.</p>
              </Typography.Text>
            ) : (
              authorInfo?.writtenBooks.map(book => (
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
                    <span>{book.title}</span>
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
