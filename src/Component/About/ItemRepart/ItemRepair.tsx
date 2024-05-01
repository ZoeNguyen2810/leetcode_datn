import React, { useState, useEffect } from 'react';
import { Table, Button, Select } from 'antd';
import axios from 'axios';
import './ItemRepair.scss';
import { useNavigate } from 'react-router-dom';

interface ItemRepair {
  itemId: string;
  problemId: string;
  problemName: string;
  itemRepairName: string;
  tax: string;
  price: number;
  intenedMinutes: number;
  discount: string[];
  itemNameRepair: string; // Additional field
}

const ItemRepair: React.FC = () => {
  const [data, setData] = useState<ItemRepair[]>([]);
  const [selectedProblemId, setSelectedProblemId] = useState<string>('');
  const [problemOptions, setProblemOptions] = useState<{ value: string; label: string }[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [selectedProblemId]);

  useEffect(() => {
    if (data.length > 0) {
      const filteredOptions = removeDuplicates(data, 'problemName').map((item) => ({
        value: item.problemId,
        label: item.problemName
      }));
      // Add "Tất cả" option
      filteredOptions.unshift({ value: '', label: 'Tất cả' });
      setProblemOptions(filteredOptions);
    }
  }, [data]);

  const removeDuplicates = (arr: any[], key: string) => {
    return arr.filter((item, index, self) => self.findIndex((t) => t[key] === item[key]) === index);
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(
        'https://garagesystem.azurewebsites.net/api/InProgress/inprogress/getitemrepairs',
        {
          problemIds: selectedProblemId ? [selectedProblemId] : [],
          pageSize: 10,
          pageNumber: 1
        },
        {
          headers: {
            Accept: 'text/plain',
            Authorization: 'Bearer eyJhbGciOiJod...FQ', // Replace with your actual bearer token
            'Content-Type': 'application/json'
          }
        }
      );
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleProblemChange = (value: string) => {
    setSelectedProblemId(value);
  };

  const columns = [
    {
      title: 'Tên Vấn Đề',
      dataIndex: 'problemName',
      key: 'problemName'
    },
    {
      title: 'Tên Danh Mục Sửa Chữa',
      dataIndex: 'itemRepairName',
      key: 'itemRepairName'
    },
    {
      title: 'Giá(vnđ)',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Thuế (%)',
      dataIndex: 'tax',
      key: 'tax'
    },
    {
      title: 'Thời gian dự kiên (phút)',
      dataIndex: 'intenedMinutes',
      key: 'intenedMinutes'
    },
    {
      title: 'Giảm Giá (%)',
      dataIndex: 'discount',
      key: 'discount',
      render: (discount: string[]) => discount.join(', ') // Rendering array as a comma-separated string
    }
  ];

  return (
    <div className="item">
      <h3 style={{ color: '#1677ff' }}>Dịch Vụ Sửa Chữa</h3>
      <div className="filter-section">
        <Select
          placeholder="Chọn vấn đề"
          style={{ width: 200, marginRight: 16 }}
          onChange={handleProblemChange}
          value={selectedProblemId}
          options={problemOptions}
        />
      </div>
      <Button
        type="primary"
        style={{ marginBottom: '30px', marginRight: '50px', float: 'right' }}
        onClick={() => navigate('/about/item-repair/Add-item')}
      >
        Thêm Danh Mục Sửa Chữa
      </Button>
      <Button
        type="primary"
        style={{ marginBottom: '30px', marginRight: '10px', float: 'right' }}
        onClick={() => navigate(-1)}
      >
        Quay lại trang các vấn đề của xe
      </Button>
      <Table columns={columns} dataSource={data} rowKey="itemId" pagination={{ pageSize: 8 }} />
    </div>
  );
};

export default ItemRepair;
