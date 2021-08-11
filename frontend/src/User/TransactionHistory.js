import {Table, Tag, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { getTransactionHistory, cancelTransaction } from '../Services/transactionService';
import {displayErrorMessage, displaySuccessMessage} from '../Services/modal';
import './UserInfoPage.css';
import {getUserInfo} from "../Services/userService";

const { Column } = Table;

function TransactionHistory(){

    const [tdata, settdata] = useState([]);
    const [userId, setUserId] = useState("");
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setReload(false);
        getTransactionHistory()
            .then((res) => {
                settdata(res);
            });
        getUserInfo()
            .then(res => {
                setUserId(res.uuid);
            });
    },[reload]);

    return(
        <>
        <br />
        <Table rowKey={record => record.orderNumber} 
            expandable={{expandedRowRender: record => (<div><img alt='animalImage' src={record.animalImg}/></div>)}} 
            dataSource={tdata}
            size='small'>
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
                render={rec => rec.status === "pending" && rec.buyerId === userId ?
                    <Button type="text" danger
                            onClick={() => cancelTransaction(rec.buyerId, rec.sellerId, rec._id, rec.stripeId, rec.animalId)
                                .then(success => {
                                    if(success) {
                                        displaySuccessMessage("Transaction is canceled successfully", 3);
                                        setReload(true);
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
