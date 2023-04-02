import { Alert } from 'react-bootstrap';

function MessageBox({ children, variant = 'info' }) {
	return <Alert variant={variant}>{children}</Alert>;
}

export default MessageBox;
