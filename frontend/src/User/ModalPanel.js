import { Modal, Button, Space } from 'antd';

function InfoModal() {
    Modal.info({
        title: 'This is a notification message',
        content: (
            <div>
                <p>some messages...some messages...</p>
                <p>some messages...some messages...</p>
            </div>
        ),
        onOk() { },
    });
}

function SuccessModal() {
    Modal.success({
        content: 'some messages...some messages...',
    });
}

function ErrorModal() {
    Modal.error({
        title: 'This is an error message',
        content: 'some messages...some messages...',
    });
}

export default InfoModal;
export default ErrorModal;
export default SuccessModal;