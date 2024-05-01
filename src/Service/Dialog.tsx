import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';

type DeletedModalProps = {
    visible: any,
    handleCancel: () => void,
    handleDelete: () => void
}
const DeletedModal: React.FC<DeletedModalProps> = ({ visible, handleCancel, handleDelete }) => {
    return (
        <Modal
            title='Confirm deletion'
            visible={visible}
            onCancel={handleCancel}
            footer={[
                <Button key='cancel' onClick={handleCancel}>Cancel</Button>,
                <Button key='delete' type='primary' danger onClick={handleDelete}>Delete</Button>
            ]}
        >
            <p>Are you sure you want to delete this item?</p>
            Are you sure you want to delete this item?</Modal>
    )
}


// export default DeletedModal

// const ConfirmEdit: React.FC<DeletedModalProps> = ({ }) => {
//     return (
//         <Modal
//             title='Confirm Edit'
//             visible={ }
//             onCancel={() => { }}
//             footer={[
//                 <Button key='cancel' onClick={}>Cancel</Button>
//                 <Button key='edit' onClick={}  type='primary' danger>Edit</Button>
//             ]}
//         >
//             <p>Can you sure to edit this user ?</p>

//         </Modal>
//     )
// }