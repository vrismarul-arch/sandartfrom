// BookingForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Upload, Select, Checkbox, Card, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { api } from "../api/api"; // axios instance
import NotificationCard from "../components/NotificationCard";

const { Option } = Select;

export default function BookingForm({ onSuccess }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = ["Event Details", "Add-ons", "Summary", "Contact"];

  const next = async () => {
    try {
      if (currentStep === 0) {
        await form.validateFields(["eventType", "date", "audienceSize", "duration"]);
      }
      setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {}
  };

  const prev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        if (key === "images") {
          values.images?.forEach((file) => formData.append("images", file.originFileObj));
        } else if (key === "addons") {
          formData.append("addons", JSON.stringify(values.addons || []));
        } else {
          formData.append(key, values[key] || "");
        }
      });

      // POST to backend
      await api.post("/api/entries/add", formData); // no Content-Type header

      form.resetFields();
      setNotification({
        status: "success",
        title: "🎉 Booking Confirmed!",
        message: "Your booking has been successfully submitted. Check your email for confirmation.",
        buttonText: "Go Home",
        onClick: () => {
          setNotification(null);
          if (onSuccess) onSuccess();
        },
      });
    } catch (err) {
      setNotification({
        status: "error",
        title: "⚠ Submission Failed",
        message: err?.response?.data?.message || "Please try again.",
        buttonText: "Retry",
        onClick: () => setNotification(null),
      });
    } finally {
      setLoading(false);
    }
  };

  if (notification) return <NotificationCard {...notification} />;

  return (
    <Card style={{ maxWidth: 700, margin: "auto", padding: 24 }}>
      <h2>Book Your Sand Art Event</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {/* STEP 1 */}
        {currentStep === 0 && (
          <>
            <Form.Item name="eventType" label="Event Type" rules={[{ required: true }]}>
              <Select placeholder="Select event type">
                <Option value="Corporate Live Show">Corporate Live Show</Option>
                <Option value="Wedding Event">Wedding Event</Option>
                <Option value="Birthday Celebration">Birthday Celebration</Option>
              </Select>
            </Form.Item>

            <Form.Item name="date" label="Event Date" rules={[{ required: true }]}>
              <Input type="date" />
            </Form.Item>

            <Form.Item name="audienceSize" label="Audience Size" rules={[{ required: true }]}>
              <Select placeholder="Select audience size">
                <Option value="Below 100">Below 100</Option>
                <Option value="100 - 300">100 - 300</Option>
                <Option value="300 - 600">300 - 600</Option>
                <Option value="600 - 1000">600 - 1000</Option>
                <Option value="1000+">1000+</Option>
              </Select>
            </Form.Item>

            <Form.Item name="duration" label="Event Duration" rules={[{ required: true }]}>
              <Select placeholder="Select duration">
                <Option value="1 Hour">1 Hour</Option>
                <Option value="2 Hours">2 Hours</Option>
                <Option value="Half Day">Half Day</Option>
                <Option value="Full Day">Full Day</Option>
              </Select>
            </Form.Item>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type="primary" onClick={next}>Next →</Button>
            </div>
          </>
        )}

        {/* STEP 2 */}
        {currentStep === 1 && (
          <>
            <Form.Item name="addons" label="Optional Add-ons">
              <Checkbox.Group>
                <Row>
                  <Col span={12}><Checkbox value="Portrait">Portrait</Checkbox></Col>
                  <Col span={12}><Checkbox value="Music Sync">Music Sync</Checkbox></Col>
                  <Col span={12}><Checkbox value="Live Mode">Live Mode</Checkbox></Col>
                  <Col span={12}><Checkbox value="Custom Theme">Custom Theme</Checkbox></Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item
              name="images"
              label="Upload Reference Images"
              valuePropName="fileList"
              getValueFromEvent={(e) => e.fileList}
            >
              <Upload beforeUpload={() => false} multiple maxCount={5} listType="picture">
                <Button icon={<UploadOutlined />}>Select Files</Button>
              </Upload>
            </Form.Item>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button onClick={prev}>← Back</Button>
              <Button type="primary" onClick={next}>Next →</Button>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {currentStep === 2 && (
          <>
            <div>
              <h3>Summary</h3>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button onClick={prev}>← Back</Button>
              <Button type="primary" onClick={next}>Next →</Button>
            </div>
          </>
        )}

        {/* STEP 4 */}
        {currentStep === 3 && (
          <>
            <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
              <Input placeholder="Your Name" />
            </Form.Item>

            <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true }]}>
              <Input placeholder="Contact Number" />
            </Form.Item>

            <Form.Item name="email" label="Email" rules={[{ type: "email", message: "Invalid email!" }]}>
              <Input placeholder="Email Address (Optional)" />
            </Form.Item>

            <Form.Item name="notes" label="Additional Notes">
              <Input.TextArea rows={3} placeholder="Any special requests" />
            </Form.Item>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button onClick={prev}>← Back</Button>
              <Button type="primary" htmlType="submit" loading={loading}>Submit Booking</Button>
            </div>
          </>
        )}
      </Form>
    </Card>
  );
}
