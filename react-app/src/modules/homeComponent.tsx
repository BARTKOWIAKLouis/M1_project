import { Link } from '@tanstack/react-router'

interface HomeComponentProps {
  title: string
  desciption: string
  goTo: string
}
export function HomeComponent({ title, desciption, goTo }: HomeComponentProps) {
  return (
    <Link
      to={goTo}
      style={{
        width: '30%',
        height: '-webkit-fill-available',
        transition: 'transform 0.2s ease',
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <div
        style={{
          textAlign: 'center',
          backgroundColor: '#F5F5DC',
          borderRadius: '8px',
          height: '100%',
        }}
      >
        <div
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            width: '100%',
            textAlign: 'center',
            height: '20%',
            backgroundColor: '#653239',
            color: 'white',
            borderTopLeftRadius: 'inherit',
            borderTopRightRadius: 'inherit',
          }}
        >
          {title}
        </div>
        <p style={{ fontSize: '1.2rem', padding: '1rem', color: 'black' }}>
          {desciption}
        </p>
      </div>
    </Link>
  )
}
