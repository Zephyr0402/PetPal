import { Row, Table, Tag, Col, Space, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { getTransactionHistory, cancelTransaction } from '../Services/transactionService';
import {displayErrorMessage, displaySuccessMessage} from '../Services/modal';
import './UserInfoPage.css';

const { Column, ColumnGroup } = Table;

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
        <Table rowKey={record => record.orderNumber} 
            expandable={{expandedRowRender: record => (<div><img src={record.animalImg}/></div>)}} 
            dataSource={tdata}>
            <Column title="Order#" dataIndex="orderNumber" key="orderNumber" />
            <Column title="Date" dataIndex="timestamp" key="timestamp" render={timestamp => new Date(timestamp).toLocaleString('en-CA')}/>
            <Column title="From" dataIndex="sellerName" key="sellerName" />
            <Column title="Ship to" dataIndex="buyerName" key="buyerName" />
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
                                        window.location.reload();
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
