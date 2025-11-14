import { Image, Skeleton, Space, Typography, Row, Col } from 'antd'
import { useBookDetailsProvider } from '../providers/useBookDetailsProvider'
import { useEffect, useState } from 'react'
import { ArrowLeftOutlined, BookOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { Route as booksRoute } from '../../../routes/books'
import { RegisterSaleModal } from '../../Sales/components/RegisterSaleModal'
import { useSaleProvider } from '../../Sales/providers/useSaleProvider'
import { EditBookModal } from './BookEditModal'

interface BookDetailsProps {
  id: string
}

export const BookDetails = ({ id }: BookDetailsProps) => {
  const { isLoading, bookInfo, loadBook, updateBook } =
    useBookDetailsProvider(id)

  const { createSale } = useSaleProvider()

  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    loadBook()
  }, [id])

  if (isLoading) return <Skeleton active />

  return (
    <div style={{ width: '95vw', padding: '2vh' }}>
      <Row gutter={[32, 32]} align="top">
        <Col span={16}>
          <div
            style={{
              marginBottom: '2vh',
              alignItems: 'left',
              display: 'flex',
              gap: '1vw',
            }}
          >
            <Link to={booksRoute.to}>
              <ArrowLeftOutlined style={{ color: 'white', fontSize: '2vw' }} />
            </Link>
          </div>

          <Row gutter={[32, 32]} align="top">
            <Col span={10}>
              {!imageError && bookInfo?.book.picture ? (
                <Image
                  src={bookInfo.book.picture}
                  alt="Book Cover"
                  style={{
                    maxWidth: '25vw',
                    width: '90%',
                    height: '100%',
                    borderRadius: '0.5vw',
                    objectFit: 'contain',
                  }}
                  preview={false}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div
                  style={{
                    width: '25vw',
                    height: '40vh',
                    borderRadius: '0.5vw',
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
            <Col span={10}>
              <Space
                direction="vertical"
                size="large"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
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
                    {bookInfo?.book.title}
                  </Typography.Title>

                  {bookInfo && (
                    <EditBookModal book={bookInfo.book} onUpdate={updateBook} />
                  )}
                </div>

                <Typography.Title
                  level={2}
                  style={{
                    color: 'white',
                    margin: 0,
                    textAlign: 'left',
                    fontSize: '2.2vw',
                  }}
                >
                  {bookInfo?.book.author.firstName}{' '}
                  {bookInfo?.book.author.lastName}
                </Typography.Title>

                <Typography.Title
                  level={3}
                  style={{
                    color: 'white',
                    margin: 0,
                    textAlign: 'left',
                    fontSize: '1.8vw',
                  }}
                >
                  {bookInfo?.book.yearPublished}
                </Typography.Title>
              </Space>
            </Col>
          </Row>
        </Col>

        {/* RIGHT COLUMN = Clients */}
        <Col span={8}>
          {bookInfo && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '2vh',
              }}
            >
              <RegisterSaleModal onCreate={createSale} book={bookInfo.book} />

              <div
                style={{
                  width: '40vw',
                  height: '60vh',
                  backgroundColor: 'rgba(255, 255, 255, 0.26)',
                  borderRadius: '0.8vw',
                  padding: '2vh 1vw',
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
                  Clients who purchased this book:
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
                  {bookInfo?.clients.length === 0 ? (
                    <Typography.Text style={{ color: 'white' }}>
                      No clients have purchased this book.
                    </Typography.Text>
                  ) : (
                    bookInfo.clients.map(client => (
                      <Row
                        key={client.id}
                        style={{
                          width: '100%',
                          height: '6vh',
                          borderRadius: '1vw',
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
                          e.currentTarget.style.transform = 'scale(1)'
                          e.currentTarget.style.backgroundColor = '#7d3a43'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.transform = 'scale(1)'
                          e.currentTarget.style.backgroundColor = '#653239'
                        }}
                      >
                        <Link
                          to={`/clients/$clientId`}
                          params={{ clientId: client.id }}
                          style={{
                            color: 'white',
                            textAlign: 'center',
                            width: '100%',
                            fontWeight: 500,
                            textDecoration: 'none',
                            fontSize: '1.2vw',
                          }}
                        >
                          {client.firstName} {client.lastName}
                        </Link>
                      </Row>
                    ))
                  )}
                </Space>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </div>
  )
}
