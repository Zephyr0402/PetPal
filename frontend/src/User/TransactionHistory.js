import { Avatar, Table, Tag, Dropdown, Space } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import './UserInfoPage.css';

const { Column, ColumnGroup } = Table;

const data = [
    {
        key: '1',
        time:'21/01/2021',
        from: 'Julia',
        to: 'Samuel',
        total: 'CAD15.99',
        status: 'Complete',
        tags: ['kitten'],
        tid: 'dsfjkbjerkl',
    },
    {
        key: '2',
        time:'08/01/2021',
        from: 'Vincent',
        to: 'Julia',
        total: 'CAD12.33',
        status: 'Complete',
        tags: ['goldfish'],
        tid: 'kjshehjflk',
    },
    {
        key: '3',
        time:'11/02/2021',
        from: 'Julia',
        to: 'Runze',
        total: 'CAD9.11',
        status: 'Waiting for payment',
        tags: ['bird'],
        tid: 'dflgkiejrlfjklas'
    },
  ];

function TransactionHistory(){

    // const expandedRowRender = () => {
    //     // const columns = [
    //     //   { title: 'Transaction ID', dataIndex: 'tid', key: 'tid' },
    //     // ];
    //     // return <Table columns={columns} dataSource={data} pagination={false} />;
    //     return(
    //         <Table dataSource={data}>
    //             <Column 
    //             title='Transaction ID' 
    //             dataIndex='tid' 
    //             key='tid' 
    //             render={ tid =>(
    //                 <p>{data.tid}</p>
    //             )
    //             }
    //             />
    //         </Table>
    //     );
    //   };


    return(
        <>
        <br />
        <Table rowKey={record => record.key} expandable={{expandedRowRender: record =><p>Transaction ID: {record.tid}</p>}} dataSource={data}>
            <Column title="" dataIndex="key" key="key" />
            <Column title="Order Placed" dataIndex="time" key="time" />
            <Column title="From" dataIndex="from" key="from" />
            <Column title="Ship to" dataIndex="to" key="to" />
            <Column title="Total" dataIndex="total" key="total" />
            <Column title="Status" dataIndex="status" key="status" />
            <Column
            title="TAGS"
            dataIndex="tags"
            key="tags"
            render={tags => (
                <>
                {tags.map(tag => (
                    <Tag color="green" key={tag}>
                    {tag}
                    </Tag>
                ))}
                </>
            )}
            />
        </Table>
        </>
    );
}
export default TransactionHistory;