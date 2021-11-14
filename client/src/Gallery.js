import { Row, Col, Divider } from "antd";

const style = { background: "#0092ff", padding: "8px 0" };
export default function Gallery() {
  return (
    <main style={{ padding: "1rem 0" }}>
      <Divider orientation="left">Gallery</Divider>
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
      </Row>
    </main>
  );
}
