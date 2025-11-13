import { Image, Skeleton, Space, Typography, Row, Col } from 'antd'
import { useBookDetailsProvider } from '../providers/useBookDetailsProvider'
import { useEffect } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { Route as booksRoute } from '../../../routes/books'
import { RegisterSaleModal } from '../../Sales/components/RegisterSaleModal'
import { useSaleProvider } from '../../Sales/providers/useSaleProvider'

import { BookOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { EditBookModal } from './BookEditModal'
interface BookDetailsProps {
  id: string
}

export const BookDetails = ({ id }: BookDetailsProps) => {
  const { isLoading, bookInfo, loadBook, updateBook } =
    useBookDetailsProvider(id)
  const { createSale } = useSaleProvider()
  const [imageError, setImageError] = useState(false)
  // const IMAGE_WIDTH = 300
  useEffect(() => {
    loadBook()
  }, [id])

  if (isLoading) {
    return <Skeleton active />
  }

  return (
    <>
      <div style={{ width: '95%', padding: '20px' }}>
        {/* Ligne principale : flèche gauche + contenu + colonne droite */}
        <Row gutter={[32, 32]} align="top">
          {/* Colonne gauche : flèche + image + infos */}
          <Col span={16}>
            {/* Ligne du haut : flèche + bouton modifier à côté du titre */}
            <div
              style={{
                marginBottom: '20px',
                alignItems: 'left',
                display: 'flex',
                gap: '12px',
              }}
            >
              <Link to={booksRoute.to}>
                <ArrowLeftOutlined
                  style={{ color: 'white', fontSize: '22px' }}
                />
              </Link>
            </div>

            <Row gutter={[32, 32]} align="top">
              {/* Image du livre */}
              <Col span={8}>
                {!imageError && bookInfo ? (
                  <Image
                    src={bookInfo?.book.picture}
                    alt="Book Cover"
                    style={{
                      maxWidth: '500px',
                      maxHeight: '700px',
                      width: '100%',
                      height: 'auto',
                      borderRadius: '3px',
                      objectFit: 'contain',
                    }}
                    preview={false}
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div
                    style={{
                      width: '300px',
                      height: '450px',
                      borderRadius: '3px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    }}
                  >
                    <BookOutlined style={{ fontSize: '32px', color: '#999' }} />
                  </div>
                )}
              </Col>

              {/* Détails du livre */}
              <Col span={12}>
                <Space
                  direction="vertical"
                  size="large"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    paddingLeft: '10%',
                  }}
                >
                  {/* Titre + bouton Modifier */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
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

                    {bookInfo && (
                      <EditBookModal
                        book={bookInfo.book}
                        onUpdate={updateBook}
                      />
                    )}
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
          </Col>

          {/* Col right : button buy + list client */}
          <Col span={8}>
            {bookInfo && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '20px',
                }}
              >
                {/* Button buy */}
                <RegisterSaleModal
                  onCreate={createSale}
                  book={bookInfo?.book}
                />

                {/* List clients */}
                <div
                  style={{
                    width: '40vw',
                    height: '60vh',
                    backgroundColor: 'rgba(255, 255, 255, 0.26)',
                    borderRadius: '8px',
                    padding: '15px',
                  }}
                >
                  <Typography.Title
                    level={4}
                    style={{
                      color: 'white',
                      marginBottom: '10px',
                      textAlign: 'center',
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
                      bookInfo?.clients.map(client => (
                        <Row
                          key={client.id}
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
                            e.currentTarget.style.backgroundColor = '#7d3a43'
                          }}
                          onMouseLeave={e => {
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
                            }}
                          >
                            <span>
                              {client.firstName} {client.lastName}
                            </span>
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
    </>
  )
}
