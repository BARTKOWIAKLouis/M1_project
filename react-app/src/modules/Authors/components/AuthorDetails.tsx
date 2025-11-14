import { Image, Skeleton, Space, Typography, Row, Col } from 'antd'
import { useAuthorDetailProvider } from '../providers/useAuthorDetailProvider'
import { useEffect, useState } from 'react'
import { ArrowLeftOutlined, BookOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { Route as authorsRoute } from '../../../routes/authors'
import { EditAuthorModal } from './AuthorEditModal'

interface AuthorDetailsProps {
  id: string
}

export const AuthorDetails = ({ id }: AuthorDetailsProps) => {
  const { isLoading, authorInfo, loadAuthorDetail, updateAuthor } =
    useAuthorDetailProvider(id)

  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    loadAuthorDetail()
  }, [id])

  if (isLoading) return <Skeleton active />

  return (
    <div style={{ width: '95vw', padding: '2vh' }}>
      <Row gutter={[32, 32]} align="top">
        {/* LEFT COLUMN */}
        <Col span={16}>
          {/* Back button */}
          <div
            style={{
              marginBottom: '2vh',
              alignItems: 'left',
              display: 'flex',
              gap: '1vw',
            }}
          >
            <Link to={authorsRoute.to}>
              <ArrowLeftOutlined style={{ color: 'white', fontSize: '2vw' }} />
            </Link>
          </div>

          <Row gutter={[32, 32]} align="top">
            {/* IMAGE */}
            <Col span={8}>
              {authorInfo?.author.picture && !imageError ? (
                <Image
                  src={authorInfo.author.picture}
                  alt="Author"
                  style={{
                    width: '25vw',
                    height: '25vw',
                    maxWidth: '300px',
                    maxHeight: '300px',
                    borderRadius: '100%',
                    objectFit: 'cover',
                  }}
                  preview={false}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div
                  style={{
                    width: '25vw',
                    height: '25vw',
                    maxWidth: '300px',
                    maxHeight: '300px',
                    borderRadius: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  }}
                >
                  <BookOutlined style={{ fontSize: '3vw', color: '#999' }} />
                </div>
              )}
            </Col>

            {/* DETAILS */}
            <Col span={12}>
              <Space
                direction="vertical"
                size="large"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  paddingLeft: '5vw',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1vw',
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
                      fontSize: '3vw',
                    }}
                  >
                    {authorInfo?.author.firstName} {authorInfo?.author.lastName}
                  </Typography.Title>

                  {authorInfo && (
                    <EditAuthorModal
                      author={authorInfo.author}
                      onUpdate={updateAuthor}
                    />
                  )}
                </div>

                <Typography.Title
                  level={3}
                  style={{
                    color: 'white',
                    margin: 0,
                    textAlign: 'left',
                    fontSize: '1.8vw',
                  }}
                >
                  Average author sales : {authorInfo?.averageSales.toFixed(2)}
                </Typography.Title>
              </Space>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '2vh',
            }}
          >
            <div
              style={{
                width: '40vw',
                height: '70vh',
                backgroundColor: 'rgba(255, 255, 255, 0.26)',
                borderRadius: '8px',
                padding: '2vh',
              }}
            >
              <Typography.Title
                level={4}
                style={{
                  color: 'white',
                  marginBottom: '1vh',
                  textAlign: 'center',
                  fontSize: '2vw',
                }}
              >
                Books written:
              </Typography.Title>

              <Space
                direction="vertical"
                style={{
                  display: 'flex',
                  alignItems: 'stretch',
                  width: '100%',
                  height: '85%',
                  overflowY: 'auto',
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#b37a7a transparent',
                }}
              >
                {authorInfo?.totalCount === 0 ? (
                  <Typography.Text style={{ color: 'white' }}>
                    This author hasn't written any books.
                  </Typography.Text>
                ) : (
                  authorInfo?.writtenBooks.map(book => (
                    <Row
                      key={book.id}
                      style={{
                        width: '100%',
                        height: '6vh',
                        borderRadius: '10px',
                        backgroundColor: '#653239',
                        padding: '0.5vh 1vw',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transition:
                          'transform 0.2s ease, background-color 0.3s ease',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'scale(1.001)'
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
                          fontSize: '1.2vw',
                        }}
                      >
                        <span>{book.title}</span>
                      </Link>
                    </Row>
                  ))
                )}
              </Space>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}
