// import useFetch from "../Fetch/fetch";
import './Service.scss'
import './Service.scss'
import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Modal } from 'antd';
import { chownSync } from 'fs';
import { Routes, Route } from 'react-router-dom';
import { EditUserDTO } from './EditUser/Edit';
import EditUserForm from './EditUser/Edit';
type MyGridRowId = number | string;




const columns: GridColDef[] = [
    { field: 'id', headerName: 'Số ID', width: 70 },
    { field: 'firstName', headerName: 'Tên', width: 130 },
    { field: 'lastName', headerName: 'Họ', width: 130 },
    {
        field: 'age',
        headerName: 'Tuổi',
        type: 'number',
        width: 90,
    },
    {
        field: 'position',
        headerName: 'Chức Danh',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 260,
        // valueGetter: (params: GridValueGetterParams) =>
        //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];




const Services = () => {
    const [editedUserDTO, setEditedUserDTO] = useState<EditUserDTO | null>(null);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState<MyGridRowId[] | null>([]);
    const [selectedUserDetails, setSelectedUserDetails] = useState<any>(null);


    const handleDelete = () => {
        const UserDelete = rows.filter((item) => !selectedUsers?.includes(item.id))
        console.log(UserDelete)
        setRows(UserDelete)
    }

    const handleEditUser = () => {

    }
    const setShowModalDelete = () => {
        setIsModalVisible(true)
    }
    const handleOk = () => {
        handleDelete();
        setIsModalVisible(false)
    }
    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const handleChangeSelection = (selection: MyGridRowId[]) => {
        setSelectedUsers(selection as number[]);
        const selecNumber = selection[0] as number;

        // Check if a row is selected
        if (selecNumber !== undefined && selecNumber !== null) {
            const selectedRow = rows.find(row => row.id === selecNumber);

            if (selectedRow) {
                // Ép kiểu thành EditUserDTO
                const userDTO: EditUserDTO = {
                    id: selectedRow.id,
                    firstName: selectedRow.firstName || '',
                    lastName: selectedRow.lastName,
                    age: selectedRow.age,
                };

                // Lưu trữ vào state
                setEditedUserDTO(userDTO);
            }
        }
    };



    const [rows, setRows] = useState([
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, position: 'Sửa Chữa' },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, position: 'Sửa Chữa' },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, position: 'Sửa Chữa' },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, position: 'Sửa Chữa' },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, position: 'Sửa Chữa' },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150, position: 'Hỗ Trợ' },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, position: 'hỗ trợ' },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, position: 'Sửa Chữa' },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, position: 'Sửa Chữa' },
    ]);

    return (
        <div style={{ height: 550, width: '100%' }}>
            <div className="buttonStaff" style={{ marginBottom: '20px' }}>
                <button className='add1'>
                    <Link to='/service/add-staff' style={{ textDecorationLine: 'none', color: 'white', width: '100%' }}>Thêm Nhân Viên</Link>
                </button>
                <button className='add2' >
                    <Link to='/service/Edit-staff' style={{ textDecorationLine: 'none', color: 'white' }}>Chỉnh Sửa</Link>
                </button>
                <button className='add3' onClick={setShowModalDelete} >
                    Xóa
                </button>
            </div>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                onRowSelectionModelChange={handleChangeSelection}
            />
            <Modal
                title='Confirm Delete'
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
            </Modal>
        </div>
    );
};

export default Services;


