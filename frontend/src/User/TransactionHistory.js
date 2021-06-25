import { Avatar, Table, Tag, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './UserInfoPage.css';

const { Column, ColumnGroup } = Table;

const data = [
    {
        key: '1',
        time:'21/01/2021',
        from: 'Julia',
        to: 'Samuel',
        status: 'Complete',
        tags: ['kitten'],
    },
    {
        key: '2',
        time:'08/01/2021',
        from: 'Vincent',
        to: 'Nawa',
        status: 'Complete',
        tags: ['goldfish'],
    },
    {
        key: '2',
        time:'11/02/2021',
        from: 'Bevis',
        to: 'Runze',
        status: 'Waiting for payment',
        tags: ['bird'],
    },
  ];

function TransactionHistory(){
    return(
        <>
        <div className="avatar">
            <Avatar size={64} icon={<UserOutlined />} />
        </div>
        <br />
        <Table dataSource={data}>
            <Column title="ID" dataIndex="key" key="key" />
            <Column title="TRANSACTION TIME" dataIndex="time" key="time" />
            <Column title="FROM" dataIndex="from" key="from" />
            <Column title="TO" dataIndex="to" key="to" />
            <Column title="STATUS" dataIndex="status" key="status" />
            <Column
            title="TAGS"
            dataIndex="tags"
            key="tags"
            render={tags => (
                <>
                {tags.map(tag => (
                    <Tag color="blue" key={tag}>
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