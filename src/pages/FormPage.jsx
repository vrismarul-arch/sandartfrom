import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Upload, Select, Checkbox, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { api } from "../api/api";
import NotificationCard from "../components/NotificationCard";
import "./FormPage.css";
import showtime from './showtime.png';

const { Option } = Select;

export default function BookingForm({ onSuccess }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  const steps = [
    { key: "event", title: "Event Details" },
    { key: "addons", title: "Add-ons" },
    { key: "summary", title: "Summary" },
    { key: "contact", title: "Contact" },
  ];

  const calculatePrice = (values) => {
    if (!values) return 0;

    let basePrice = 0;
    switch (values.eventType) {
      case "Corporate Live Show": basePrice = 5000; break;
      case "Wedding Event": basePrice = 7000; break;
      case "Birthday Celebration": basePrice = 3000; break;
      default: basePrice = 2000;
    }

    const audienceMap = {
      "Below 100": 100,
      "100 - 300": 200,
      "300 - 600": 300,
      "600 - 1000": 400,
      "1000+": 500,
    };
    basePrice += audienceMap[values.audienceSize] || 0;

    const addonPrice = (values.addons || []).length * 500;
    basePrice += addonPrice;

    if (values.duration === "Half Day") basePrice *= 1.5;
    if (values.duration === "Full Day") basePrice *= 2;

    return basePrice;
  };

  const next = async () => {
    try {
      if (currentStep === 0) {
        await form.validateFields(["eventType", "date", "audienceSize", "duration"]);
      }
      if (currentStep === 2) {
        const values = form.getFieldsValue();
        setPrice(calculatePrice(values));
      }
      setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {}
  };

  const prev = () => {
    setCurrentStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await form.validateFields(["name", "phoneNumber"]);

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

      await api.post("/api/entries/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      form.resetFields();
// min
      // ✅ Notification JSX safe
      setNotification({
        status: "success",
        title: "🎉 Booking Confirmed!",
        message: (
          <div style={{ lineHeight: 1.6 }}>
            <div>Hi <strong>{values.name}</strong>,</div>
            <div>Your sand art booking has been successfully submitted!</div>
            <div>
              ✅ A detailed price catalog and your booking information have been sent to your registered email.<br/>
              ✅ Our team will review your request and contact you shortly to finalize the details.
            </div>
            <div style={{ fontStyle: "italic", color: "#555" }}>
              Thank you for choosing Sand Art — we look forward to making your event memorable!
            </div>
          </div>
        ),
        buttonText: "Go Home",
        onClick: () => {
          setNotification(null);
          if (onSuccess) onSuccess();
          navigate("/");
        },
      });
    } catch (err) {
      setNotification({
        status: "error",
        title: "⚠ Submission Failed",
        message: (
          <div style={{ lineHeight: 1.6 }}>
            <div>Oops! Something went wrong while submitting your booking.</div>
            <div>{err?.response?.data?.message || "Please try again."}</div>
            <div style={{ fontStyle: "italic", color: "#555" }}>If the issue persists, contact our support team.</div>
          </div>
        ),
        buttonText: "Retry",
        onClick: () => setNotification(null),
      });
    } finally {
      setLoading(false);
    }
  };

  if (notification) return <NotificationCard {...notification} />;

  return (
    <div className="onebyone-form-wrapper">
      <Card className="onebyone-card">
        {/* Banner */}
        <div className="form-banner">
          <img src={showtime} alt="Sand Art Banner" className="form-banner-img" />
          <div className="banner-text-overlay">
            <h1 className="banner-title">Book Your Sand Art Event</h1>
            <p className="banner-sub">One step at a time — we’ll guide you to a perfect booking.</p>
          </div>
        </div>

        {/* Step Progress */}
        <div className="simple-progress">
          {steps.map((s, i) => (
            <div key={s.key} className={`prog-step ${i === currentStep ? "active" : i < currentStep ? "done" : ""}`}>
              <div className="prog-circle">{i + 1}</div>
              <div className="prog-label">{s.title}</div>
            </div>
          ))}
        </div>

        {/* Form */}
        <Form form={form} layout="vertical" onFinish={onFinish} className="onebyone-form">
          {/* STEP 1 */}
          <div className={`step-panel ${currentStep === 0 ? "visible" : "hidden"}`}>
            <Form.Item label="Event Type" name="eventType" rules={[{ required: true, message: "Please select an event type." }]}>
              <Select placeholder="Select event type" size="large">
                <Option value="Corporate Live Show">Corporate Live Show</Option>
                <Option value="Wedding Event">Wedding Event</Option>
                <Option value="Birthday Celebration">Birthday Celebration</Option>
                <Option value="Portrait Gifting">Portrait Gifting</Option>
                <Option value="Corporate Pre-Shoot">Corporate Pre-Shoot</Option>
                <Option value="Sand Lightboard">Sand Lightboard</Option>
                <Option value="Name Revealing Ceremony">Name Revealing Ceremony</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Event Date" name="date" rules={[{ required: true, message: "Please select an event date." }]}>
              <Input type="date" size="large" />
            </Form.Item>

            <Form.Item label="Venue / Location" name="venue">
              <Input size="large" placeholder="City or Venue Name (Optional)" />
            </Form.Item>

            <Form.Item label="Audience Size" name="audienceSize" rules={[{ required: true, message: "Please specify audience size." }]}>
              <Select placeholder="Select audience size" size="large">
                <Option value="Below 100">Below 100</Option>
                <Option value="100 - 300">100 - 300</Option>
                <Option value="300 - 600">300 - 600</Option>
                <Option value="600 - 1000">600 - 1000</Option>
                <Option value="1000+">1000+</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Event Duration (hrs)" name="duration" rules={[{ required: true, message: "Please select event duration." }]}>
              <Select placeholder="Select duration" size="large">
                <Option value="1 Hour">1 Hour</Option>
                <Option value="2 Hours">2 Hours</Option>
                <Option value="3 Hours">3 Hours</Option>
                <Option value="Half Day">Half Day</Option>
                <Option value="Full Day">Full Day</Option>
              </Select>
            </Form.Item>

            <div className="controls-row">
              <div />
              <Button type="primary" onClick={next} size="large">Continue →</Button>
            </div>
          </div>

          {/* STEP 2 */}
          <div className={`step-panel ${currentStep === 1 ? "visible" : "hidden"}`}>
            <Form.Item label="Select Optional Add-ons" name="addons">
              <Checkbox.Group style={{ width: '100%' }}>
                <Row>
                  <Col span={12}><Checkbox value="Portrait">Portrait</Checkbox></Col>
                  <Col span={12}><Checkbox value="Making Video">Making Video</Checkbox></Col>
                  <Col span={12}><Checkbox value="Music Sync">Music Sync</Checkbox></Col>
                  <Col span={12}><Checkbox value="Custom Theme">Custom Theme</Checkbox></Col>
                  <Col span={12}><Checkbox value="Live Mode">Live Mode</Checkbox></Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item
              label="Upload Reference Images (Max 5)"
              name="images"
              valuePropName="fileList"
              getValueFromEvent={(e) => e.fileList}
              extra="Upload images or references that will help us understand your vision."
            >
              <Upload beforeUpload={() => false} multiple maxCount={5} listType="picture">
                <Button icon={<UploadOutlined />} size="large">Select Files</Button>
              </Upload>
            </Form.Item>

            <div className="controls-row">
              <Button onClick={prev} size="large">← Back</Button>
              <Button type="primary" onClick={next} size="large">Review Summary →</Button>
            </div>
          </div>

          {/* STEP 3 */}
          <div className={`step-panel ${currentStep === 2 ? "visible" : "hidden"}`}>
            <div className="summary-box">
              <h3>Booking Summary</h3>
              <div className="summary-rows">
                <div><strong>Event Type:</strong><span>{form.getFieldValue("eventType") || "—"}</span></div>
                <div><strong>Event Date:</strong><span>{form.getFieldValue("date") || "—"}</span></div>
                <div><strong>Audience Size:</strong><span>{form.getFieldValue("audienceSize") || "—"}</span></div>
                <div><strong>Duration:</strong><span>{form.getFieldValue("duration") || "—"}</span></div>
                <div><strong>Add-ons:</strong><span>{(form.getFieldValue("addons") || []).join(", ") || "None Selected"}</span></div>
                <div><strong>Ref. Images:</strong><span>{form.getFieldValue("images")?.length || 0} File(s)</span></div>
              </div>
            </div>

            <div className="controls-row">
              <Button onClick={prev} size="large">← Back</Button>
              <Button type="primary" onClick={next} size="large">Final Step →</Button>
            </div>
          </div>

          {/* STEP 4 */}
          <div className={`step-panel ${currentStep === 3 ? "visible" : "hidden"}`}>
            <Form.Item label="Full Name" name="name" rules={[{ required: true, message: "Please enter your name." }]}>
              <Input size="large" placeholder="Your Full Name" />
            </Form.Item>

            <Form.Item label="Phone Number" name="phoneNumber" rules={[{ required: true, message: "Please enter your phone number." }]}>
              <Input size="large" placeholder="Your Contact Number" />
            </Form.Item>

            <Form.Item label="Email Address" name="email" rules={[{ type: 'email', message: 'The input is not a valid E-mail!' }]}>
              <Input size="large" placeholder="Your Email Address (Optional)" />
            </Form.Item>

            <Form.Item label="Additional Notes" name="notes">
              <Input.TextArea rows={4} placeholder="Any specific requests or details you'd like us to know?" />
            </Form.Item>

            <div className="controls-row">
              <Button onClick={prev} size="large">← Back</Button>
              <Button type="primary" htmlType="submit" loading={loading} size="large">Submit Booking</Button>
            </div>
          </div>
        </Form>
      </Card>
    </div>
  );
}
