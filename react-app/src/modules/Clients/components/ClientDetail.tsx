import { Image, Skeleton, Space, Typography, Row, Col } from 'antd'
import { useClientDetailProvider } from '../providers/useClientDetailProvider'
import { useEffect, useState } from 'react'
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { Route as clientsRoute } from '../../../routes/clients'
import { EditClientModal } from './EditClientModal'

interface ClientDetailsProps {
  id: string
}

export const ClientDetails = ({ id }: ClientDetailsProps) => {
  const { isLoading, clientInfo, loadClient, updateclient } =
    useClientDetailProvider(id)

  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    loadClient()
  }, [id])

  if (isLoading) return <Skeleton active />

  return (
    <>
      <style>
        {`
      .ant-modal .ant-modal-content {
          background-color: #F5F5DC;
          color: #653239;

          .ant-input {
          border: none;
          border-bottom: 2px solid #653239;
          background-color: transparent;
          color: #653239;
          }
          .ant-select-selector{
          background-color: transparent !important;
          }
          .ant-input:hover {
            color: #A9A9A9 !important;
          }
          .ant-select-selector:hover {
            border-color: #A9A9A9 !important;
          }
          .ant-btn-variant-outlined:hover {
              border-color: #A9A9A9 !important;
              color: #A9A9A9 !important;
          }
          .ant-modal-title{
            color: #653239  !important;
            font-weight: bold !important;
            }

        }
      `}
      </style>
      <div style={{ width: '95vw', padding: '2vh' }}>
        <Row gutter={[32, 32]} align="top">
          <Col span={16}>
            <div
              style={{
                marginBottom: '2vh',
                display: 'flex',
                alignItems: 'center',
                gap: '1vw',
              }}
            >
              <Link to={clientsRoute.to}>
                <ArrowLeftOutlined
                  style={{ color: 'white', fontSize: '2vw' }}
                />
              </Link>
            </div>

            <Row gutter={[32, 32]} align="top">
              <Col span={8}>
                {clientInfo?.client.picture && !imageError ? (
                  <Image
                    src={clientInfo.client.picture}
                    alt="Client Avatar"
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
                    <UserOutlined style={{ fontSize: '3vw', color: '#999' }} />
                  </div>
                )}
              </Col>
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
                      {clientInfo?.client.firstName}{' '}
                      {clientInfo?.client.lastName}
                    </Typography.Title>

                    {clientInfo && (
                      <EditClientModal
                        client={clientInfo.client}
                        onUpdate={updateclient}
                      />
                    )}
                  </div>

                  <Typography.Title
                    level={3}
                    style={{
                      color: 'white',
                      margin: 0,
                      textAlign: 'left',
                      fontSize: '1.3vw',
                    }}
                  >
                    {clientInfo?.client.email}
                  </Typography.Title>
                </Space>
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            {clientInfo && (
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
                    Books purchased by this client:
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
                    {clientInfo?.purchasedBooks.length === 0 ? (
                      <Typography.Text style={{ color: 'white' }}>
                        This client has not purchased any books.
                      </Typography.Text>
                    ) : (
                      clientInfo.purchasedBooks.map(book => (
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
                            e.currentTarget.style.backgroundColor = '#7d3a43'
                          }}
                          onMouseLeave={e => {
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
                            {book.title} — {book.author.firstName}{' '}
                            {book.author.lastName}
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
