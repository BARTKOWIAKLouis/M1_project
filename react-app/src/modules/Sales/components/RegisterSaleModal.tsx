import { useEffect, useState } from 'react'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Button, Modal, Space, Input, Select } from 'antd'
import { useClientProvider } from '../../Clients/providers/useClientProvider'
import type { CreateSaleModel } from '../SaleModel'
import type { BookModel } from '../../Books/BookModel'

interface CreateSaleModalProps {
    onCreate: (sale: CreateSaleModel) => void;
    book: BookModel
}

export function RegisterSaleModal({onCreate, book}: CreateSaleModalProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [clientId, setClientId] = useState<string | undefined>(undefined)
    const {clientList, loadClients}= useClientProvider()

    const onClose = () => {
        setIsOpen(false)
        setClientId(undefined)
    }
    useEffect(() => {
        if (isOpen) {
            loadClients()
        }
    }, [isOpen])

    return (
        <>
        <Button
          type="primary"
          icon={<ShoppingCartOutlined />}
          style={{ backgroundColor: '#653239', borderColor: '#653239' }}
          size="large"
          onClick={()=> setIsOpen(true)}
        >
          Buy Now
        </Button>
        <Modal
            open={isOpen}
            onCancel={onClose}
            title="Register Sale"
            onOk ={()=>{
                onCreate({
                    clientId: clientId!,
                    bookId: book.id,
                    saleDate: new Date(),
                })
                onClose()
            }}
            okButtonProps={{
                disabled: !clientId || !book.id,
            }}
        >
            <Space direction="vertical" style={{ width: '100%' }}>
                <span>
                    <p>Book Selected:</p>
                    <Input
                        type="text"
                        value={book.title}
                        readOnly
                    />
                </span>
                <span>
                    <p>Client :</p>
                    <Select
                        style={{ width: '100%' }}
                        options={clientList.map(client =>({
                            label: `${client.client.firstName} ${client.client.lastName}`,
                            value: client.client.id,
                        }))}
                        value={clientId}
                        onChange={(value) => setClientId(value)}
                    ></Select>
                </span>
            </Space>
            {/* Modal content for registering a sale goes here */}
        </Modal>
        </>
    )
}