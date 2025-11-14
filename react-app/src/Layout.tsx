import { Link } from '@tanstack/react-router'
import { Route as indexRoute } from './routes/index'
import { Route as booksRoute } from './routes/books'
import { Route as authorsRoute } from './routes/authors'
import { Route as clientsRoute } from './routes/clients'
import { Space, type MenuProps } from 'antd'
import {
  BookOutlined,
  HomeOutlined,
  UserOutlined,
  SignatureOutlined,
} from '@ant-design/icons'
import Menu from 'antd/es/menu/menu'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const items: Required<MenuProps>['items'] = [
    {
      label: <Link to={indexRoute.to}>Home</Link>,
      key: 'home',
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={booksRoute.to}>Books</Link>,
      key: 'books',
      icon: <BookOutlined />,
    },
    {
      label: <Link to={authorsRoute.to}>Authors</Link>,
      key: 'authors',
      icon: <SignatureOutlined />,
    },
    {
      label: <Link to={clientsRoute.to}>Clients</Link>,
      key: 'clients',
      icon: <UserOutlined />,
    },
  ]

  return (
    <>
      <style>
        {`
        .ant-menu-horizontal > .ant-menu-item {
  border-bottom: 2px solid transparent;
  box-sizing: border-box;
}
          .ant-menu-horizontal > .ant-menu-item::after,
    .ant-menu-horizontal > .ant-menu-item:hover::after,
    .ant-menu-horizontal > .ant-menu-item-selected::after {
      border-bottom: none !important;
    }

    .ant-menu-horizontal > .ant-menu-item:hover {
      border-bottom: 2px solid #653239 !important;
      transition: border-bottom 0.2s ease;
    }

    .ant-menu-light .ant-menu-item-selected a, .ant-menu-light.ant-menu-horizontal >.ant-menu-item-selected {
          color : #653239;
    }
        `}
      </style>
      <Space
        direction="vertical"
        style={{
          width: '100vw',
          height: '100vh',
          backgroundColor: '#CCC7B9',
        }}
      >
        <div
          style={{
            textAlign: 'left',
            width: '100%',
            backgroundColor: '#653239',
            color: 'white',
          }}
        >
          <h2
            style={{ marginTop: '0', padding: '0 0 0 50px  ', marginBottom: 0 }}
          >
            Babel&apos;s Library
          </h2>
          <Menu
            mode="horizontal"
            items={items}
            style={{
              backgroundColor: '#EAF9D9',
            }}
          />
        </div>
        <div
          style={{
            width: '100%',
          }}
        >
          {children}
        </div>
      </Space>
    </>
  )
}
