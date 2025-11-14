import { useEffect, useState } from 'react'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons';


interface SearchBarProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
}

export default function SearchBar({
    value = '',
    onChange,
    placeholder = 'Search...',
}: SearchBarProps) {
    const [inputValue, setInputValue] = useState(value);

    const debounce = 300 //300ms default value adviced online

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    useEffect(() => {
        if(!debounce){
            onChange?.(inputValue);
            return;
        }
        const time = setTimeout(()=>{
            onChange?.(inputValue);
        }, debounce);
        return () => clearTimeout(time);
    }, [inputValue, debounce, onChange]);

    return (
        <>
        <style>
        {`
        .ant-input-affix-wrapper {
            background-color: rgb(255,255,255, 0.27) !important;
         }
        `
        }
        </style>
        <Input
            prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />}
            placeholder={placeholder}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            style = {{border:'none', borderBottom:'1px solid #653239', width:'40%', maxWidth:'700px'}}
        />
        </>
    )
}