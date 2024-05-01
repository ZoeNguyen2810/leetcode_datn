import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './About.scss';
import { useNavigate } from 'react-router-dom';
import { Divider, Table, Typography, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ItemRepair from './ItemRepart/ItemRepair';

interface BookingInfo {
    problemId?: string;
    problemName?: string;
}

interface UserInfoProps {
    // userId: string;
}

const UserInfo: React.FC<UserInfoProps> = () => {
    const [userData, setUserData] = useState<BookingInfo[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://garagesystem.azurewebsites.net/api/InProgress/inprogress/getproblemdata`);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!userData) {
        return <div>No data available for the user.</div>;
    }

    const columns = [
        {
            title: 'Số thứ tự',
            dataIndex: 'index',
            key: 'index',
            render: (text: any, record: any, index: number) => index + 1,
        },
        {
            title: 'Tên vấn đề',
            dataIndex: 'problemName',
            key: 'problemName',
        },
    ];

    const handleSearch = (selectedKeys: React.Key[], confirm: () => void) => {
        confirm();
        setSearchText(selectedKeys[0] as string);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: string) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm)}
                    style={{ width: 358, marginBottom: 15, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: '#1677ff', fontSize: '30px' }} />,
        onFilter: (value: string, record: { [key: string]: any }) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    });

    columns[1] = {
        ...columns[1],
        ...getColumnSearchProps('problemName'),
    };


    return (
        <div className='UserInfo'>
            <h2 style={{ color: '#1677ff' }} > Các Vấn đề của Xe</h2>
            <Button type='primary' style={{ marginBottom: '20px' }}
                onClick={() => navigate('/about/create-problems')}
            >Thêm vấn đề cho xe</Button>
            <Button type='primary'
                style={{ marginBottom: '20px', marginLeft: '20px' }}
                onClick={() => navigate('/about/item-repair')} >Dịch Vụ Sửa Chữa</Button>
            <Table
                columns={columns}
                dataSource={userData.map((item, index) => ({ ...item, key: index }))}
                pagination={{ pageSize: 7 }} // Nếu bạn muốn bật phân trang, hãy xóa dòng này
            />
        </div>
    );
};

export default UserInfo;
