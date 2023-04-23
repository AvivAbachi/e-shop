import { Col, ListGroupItem, Row } from 'react-bootstrap';

function SummaryItem({ title, text, strong = false }) {
	return (
		<ListGroupItem>
			{strong ? (
				<strong>
					<Row>
						<Col>{title}</Col>
						<Col>{text}</Col>
					</Row>
				</strong>
			) : (
				<Row>
					<Col>{title}</Col>
					<Col>{text}</Col>
				</Row>
			)}
		</ListGroupItem>
	);
}

export default SummaryItem;
