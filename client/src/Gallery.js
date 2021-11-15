import { Row, Col, Divider, Card } from "antd";
import React from "react";
const { Meta } = Card;

export default function Gallery() {
  const [files, setFiles] = React.useState(null);
  React.useEffect(() => {
    fetch("/files")
      .then((res) => res.json())
      .then((data) => {
        setFiles(data);
        console.log("--->", data);
      });
  }, []);
  return (
    <main style={{ padding: "1rem 0" }}>
      <Divider orientation="left">Gallery</Divider>
      <Row gutter={[16, 16]}>
        {files &&
          files.length > 0 &&
          files.map((file) => {
            return (
              <Col className="gutter-row" span={6}>
                <div>
                  {" "}
                  <Card
                    hoverable
                    style={{ width: "100%" }}
                    cover={<img alt="example" src={file.name} />}
                  >
                    <Meta title="Links" />
                    <a href={file.normal} target="_blank">
                      Normal image
                    </a>
                    <br />
                    <a href={file.name} target="_blank">
                      Resized image
                    </a>
                  </Card>
                </div>
              </Col>
            );
          })}
      </Row>
    </main>
  );
}
