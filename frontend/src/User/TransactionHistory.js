import { Avatar, Table, Tag, Dropdown, Space, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { getTransactionHistory, cancelTransaction } from '../Services/transactionService';
import {displayErrorMessage, displaySuccessMessage} from '../Services/modal';
import './UserInfoPage.css';

const { Column, ColumnGroup } = Table;

// const data = [
//     {
//         key: '1',
//         time:'21/01/2021',
//         from: 'Julia',
//         to: 'Samuel',
//         total: 'CAD15.99',
//         status: 'Complete',
//         tags: ['kitten'],
//         tid: 'dsfjkbjerkl',
//     },
//     {
//         key: '2',
//         time:'08/01/2021',
//         from: 'Vincent',
//         to: 'Julia',
//         total: 'CAD12.33',
//         status: 'Complete',
//         tags: ['goldfish'],
//         tid: 'kjshehjflk',
//     },
//     {
//         key: '3',
//         time:'11/02/2021',
//         from: 'Julia',
//         to: 'Runze',
//         total: 'CAD9.11',
//         status: 'Waiting for payment',
//         tags: ['bird'],
//         tid: 'dflgkiejrlfjklas'
//     },
//   ];

function TransactionHistory(){

    const [tdata, settdata] = useState([]);

    useEffect(async () => {
        getTransactionHistory()
            .then((res) => {
                settdata(res);
                console.log(tdata);
            })
    },[]);

    return(
        <>
        <br />
        <Table rowKey={record => record.orderNumber} expandable={{expandedRowRender: record =><p>Transaction ID: {record._id}</p>}} dataSource={tdata}>
            <Column title="Order#" dataIndex="orderNumber" key="orderNumber" />
            <Column title="Date" dataIndex="timestamp" key="timestamp" render={timestamp => new Date(timestamp).toLocaleString('en-CA')}/>
            <Column title="From" dataIndex="sellerId" key="sellerId" />
            <Column title="Ship to" dataIndex="buyerId" key="buyerId" />
            <Column title="Total (CAD)" dataIndex="price" key="price" />
            <Column title="Status" dataIndex="status" key="status" />
            <Column
            title="TAG"
            dataIndex="tag"
            key="tag"
            render={tag => (
                <>
                <Tag color="green" key={tag}>
                {tag}
                </Tag>
                </>
            )}
            />
            <Column
                title="Action"
                dataIndex=""
                key="cancel"
                render={rec => rec.status === "pending"?
                    <Button type="text" danger
                            onClick={() => cancelTransaction(rec._id, rec.stripeId, rec.animalId)
                                .then(success => {
                                    if(success) {
                                        displaySuccessMessage("Transaction is canceled successfully", 3);
                                    }else{
                                        displayErrorMessage("There an error cancelling your transaction. Please try" +
                                            " again.", 3);
                                    }
                                })}>
                        Cancel
                    </Button> :
                    <span>-</span>
                }
            />
        </Table>
        </>
    );
}
export default TransactionHistory;
