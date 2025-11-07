import React, { useEffect, useState, useMemo } from "react";
import {
  Table,
  Spin,
  Select,
  Input,
  Card,
  Row,
  Col,
  Tag,
  Statistic,
  Button,
  Modal,
  Descriptions,
  Badge,
} from "antd";
import {
  FilterOutlined,
  ArrowUpOutlined,
  DollarOutlined,
  SolutionOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  // PieChartOutlined is imported but not used in the final JSX
  // PieChartOutlined, 
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {
  // Keeping Recharts imports though they aren't used in the final JSX
  // PieChart,
  // Pie,
  // Cell,
  // ResponsiveContainer,
  // Tooltip,
  // Legend,
} from "recharts";
import { api } from "../../api/api";
import toast, { Toaster } from "react-hot-toast";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./DashboardSheet.css";
import Topbar from "../../components/layout/Topbar";

const { Option } = Select;

// ✅ UPDATED STATUS_OPTIONS: Added "Quotation Sent"
const STATUS_OPTIONS = [
 { label: "Quotation Sent", value: "Quotation Sent", color: "#FFB200" },
  { label: "PO Received", value: "PO Received", color: "#FF7A45" },
  { label: "SO Sent", value: "SO Sent", color: "#36CFC9" },
  { label: "Not Intersted", value: "Not Intersted", color: "#c70404ff" },
  { label: "Order Confirmed", value: "Order Confirmed", color: "#52C41A" },
  { label: "Payment Received", value: "Payment Received", color: "#2F54EB" },
  { label: "Completed", value: "Completed", color: "#13C2C2" },
];

const STATUS_ORDER = STATUS_OPTIONS.map((s) => s.label);

// Function to format currency
const formatCurrency = (val) =>
  (val || 0).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  });

// Function to format percentage (Note: Not explicitly used in final table columns but kept for utility)
// const formatPercentage = (val) => (val || 0).toFixed(2) + "%";

// Function to format the date/time string
const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) return "N/A";
  try {
    const date = new Date(dateTimeString);
    // Format: YYYY-MM-DD HH:MM:SS (24-hour)
    return date.toLocaleString('en-IN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(',', ''); // Remove comma from the default locale output
  } catch (e) {
    return dateTimeString; // Return original if formatting fails
  }
};


export default function DashboardSheet() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  // Assuming default status remains 'Quotation Sent' for initial fetch
  const [selectedStatus, setSelectedStatus] = useState("Quotation Sent"); 

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);

  let searchInput;

  // ✅ Fetch leads + normalize keys
  const fetchData = async () => {
    setLoading(true);
    try {
      // NOTE: The code filters by selectedStatus in the API call, 
      // but the UI currently does not have a filter dropdown to change this value.
      // It always uses the default "Quotation Sent". This might be an intentional design
      // choice or an area for future improvement.
      const res = await api.get("/api/leads", {
        params: { status: selectedStatus },
      });
      setData(
        res.data.map((item, idx) => ({
          ...item,
          key: item.key || idx,
          // ✅ Normalize possible variations of Product field
          Product: item.Product || item.Products || item.product || "",
          // Ensure all financial fields are parsed as floats
          TotalPrice: parseFloat(item.TotalPrice) || 0,
          SVJShare: parseFloat(item.SVJShare) || 0,
          VrismShare: parseFloat(item.VrismShare) || 0,
          TotalRevenue: parseFloat(item.TotalRevenue) || 0,
          SvjRevenue: parseFloat(item.SvjRevenue) || 0,
          VrismRevenue: parseFloat(item.VrismRevenue) || 0,
        }))
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedStatus]); // Re-fetch when selectedStatus changes

  const handleFieldChange = async (record, field, value) => {
    setUpdateLoading(true);
    try {
      const res = await api.patch(`/api/leads/${record.key}`, {
        [field]: value,
      });
      setData((prev) =>
        prev.map((r) =>
          r.key === record.key
            ? {
                ...r,
                [field]: value,
                // Update calculated fields from the API response
                SVJShare: parseFloat(res.data.SVJShare) || 0,
                VrismShare: parseFloat(res.data.VrismShare) || 0,
              }
            : r
        )
      );
      toast.success(`${field} updated`);
    } catch (err) {
      console.error(err);
      toast.error(`Failed to update ${field}`);
    } finally {
      setUpdateLoading(false);
    }
  };

  // Standard Ant Design function for column filtering
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => (searchInput = node)}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => {
            setSearchText(selectedKeys[0]);
            setSearchedColumn(dataIndex);
            confirm();
          }}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => {
            setSearchText(selectedKeys[0]);
            setSearchedColumn(dataIndex);
            confirm();
          }}
          size="small"
          style={{ marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => {
            clearFilters();
            setSearchText("");
            setSearchedColumn("");
          }}
          size="small"
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <FilterOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffe58f", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  // ✅ Data and Metrics Calculations
  const processedData = useMemo(() => {
    // 1. Sort the data by 'submittedAt' in descending order (newest first)
    const sortedData = [...data].sort((a, b) => {
      // Use 'submittedAt' or fallback to a far past date for missing values
      const dateA = new Date(a.submittedAt || 0); 
      const dateB = new Date(b.submittedAt || 0);
      return dateB.getTime() - dateA.getTime(); // Descending sort
    });

    return sortedData;
  }, [data]);

  // ✅ Metrics Calculations
  const {
    totalRevenue,
    totalLeads,
    totalVrismRevenue,
    statusCounts,
  } = useMemo(() => {
    const statusMap = {};
    const metrics = {
      // Assuming TotalRevenue is the sum of all lead revenues
      totalRevenue: processedData.reduce(
        (sum, item) => sum + (parseFloat(item.TotalRevenue) || 0),
        0
      ),
      // SVJ Revenue metric was removed from the cards in the provided code, but kept the value calculation here for completeness
      // totalSvjRevenue: processedData.reduce(
      //   (sum, item) => sum + (parseFloat(item.SvjRevenue) || 0),
      //   0
      // ), 
      totalVrismRevenue: processedData.reduce(
        (sum, item) => sum + (parseFloat(item.VrismRevenue) || 0),
        0
      ),
      totalLeads: processedData.length,
    };

    // Calculate lead count for each status
    processedData.forEach((item) => {
      // Fallback to 'Other' if status is not in the defined list, though it should ideally be one of STATUS_ORDER
      const status = STATUS_ORDER.includes(item.Status) ? item.Status : 'Other'; 
      statusMap[status] = (statusMap[status] || 0) + 1;
    });

    // statusDistribution calculation (for PieChart, which is commented out)
    // const statusDistribution = STATUS_ORDER.map((status) => ({
    //   name: status,
    //   value: statusMap[status] || 0,
    //   color:
    //     STATUS_OPTIONS.find((o) => o.label === status)?.color || "#999999",
    // }));

    return { 
        ...metrics, 
        // statusDistribution, // Not used in final JSX
        statusCounts: statusMap,
    };
  }, [processedData]);

  // ✅ Columns Definition (Updated with all financial columns and fixed widths)
  const columns = [
    {
      title: "S.No",
      dataIndex: "index",
      key: "index",
      width: 50,
      align: "center",
      fixed: 'left',
      render: (_, __, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      width: 150,
      ...getColumnSearchProps("Name"),
      fixed: 'left',
    },
    {
      title: "Submitted At", 
      dataIndex: "submittedAt",
      key: "submittedAt",
      width: 160,
      render: (text) => formatDateTime(text),
      sorter: (a, b) => {
          const dateA = new Date(a.submittedAt || 0);
          const dateB = new Date(b.submittedAt || 0);
          return dateA.getTime() - dateB.getTime();
      },
      defaultSortOrder: 'descend', 
    },
    {
      title: "Phone",
      dataIndex: "Phone Number",
      key: "Phone Number",
      width: 120,
      ...getColumnSearchProps("Phone Number"),
    },
    {
      title: "Product",
      dataIndex: "Product",
      key: "Product",
      width: 150,
      ...getColumnSearchProps("Product"),
      render: (value) => {
        // Handle array of products
        const display = Array.isArray(value) ? value.join(", ") : value;
        return display || "—";
      },
    },
    {
      title: "ON SITE VIEW",
      dataIndex: "ON SITE VIEW",
      key: "ON SITE VIEW",
      width: 150,
      render: (text, record) => (
        <Select
          value={text || ""}
          onChange={(val) => handleFieldChange(record, "ON SITE VIEW", val)}
          disabled={updateLoading}
          style={{ width: "100%" }}
        >
          <Option value="YES VISIT">YES VISIT</Option>
          <Option value="NO">NO</Option>
          <Option value="VisitComplete">VisitComplete</Option>
        </Select>
      ),
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      width: 150,
      render: (text, record) => (
        <Select
          value={text || "Quotation Sent"}
          onChange={(val) => handleFieldChange(record, "Status", val)}
          disabled={updateLoading}
          style={{ width: "100%" }}
        >
          {/* Status options are dynamically mapped from the updated STATUS_OPTIONS */}
          {STATUS_OPTIONS.map((s) => (
            <Option key={s.label} value={s.label}>
              <Tag color={s.color}>{s.label}</Tag>
            </Option>
          ))}
        </Select>
      ),
    },
    // The provided code did not include financial columns in the table definition. 
    // If they are needed, they should be added here, e.g.:
    /*
    {
      title: "Total Price",
      dataIndex: "TotalPrice",
      key: "TotalPrice",
      width: 120,
      render: formatCurrency,
      sorter: (a, b) => a.TotalPrice - b.TotalPrice,
    },
    // ... other financial columns
    */
    {
      title: "Actions",
      key: "actions",
      width: 80,
      fixed: 'right', // Fixed column for better UX
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => {
            setModalData(record);
            setModalVisible(true);
          }}
        >
          View Details
        </Button>
      ),
    },
  ];


  // ✅ Export Functions
  const exportExcel = () => {
    // Modify the data structure for Excel to include the calculated percentage
    const exportData = processedData.map(item => {
      const svjSharePercentage = item.TotalPrice > 0 
        ? (item.SVJShare / item.TotalPrice * 100).toFixed(2) + "%" 
        : "0.00%";

      return {
        ...item,
        "Submitted At": formatDateTime(item.submittedAt), // ✅ Add Submitted At
        "SVJ Share %": svjSharePercentage, // Calculated field
        "Total Price (INR)": item.TotalPrice,
        "SVJ Share (INR)": item.SVJShare,
        "Vrism Share (INR)": item.VrismShare,
        "Total Revenue (INR)": item.TotalRevenue,
        "Svj Revenue (INR)": item.SvjRevenue,
        "Vrism Revenue (INR)": item.VrismRevenue,
      };
    });
    
    // Select relevant fields for export (removes internal keys)
    const simplifiedData = exportData.map(({ key, index, ...rest }) => rest);

    const ws = XLSX.utils.json_to_sheet(simplifiedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leads");
    XLSX.writeFile(wb, "LeadsData.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
  
    // Define columns for the PDF export, excluding S.No and Actions
    const pdfExportColumns = [
        ...columns.filter(c => c.key !== "index" && c.key !== "actions"),
    ];
    
    // Find the index of 'Phone Number' to insert 'Submitted At' before it
    const phoneIndex = pdfExportColumns.findIndex(c => c.key === 'Phone Number');
    if (phoneIndex !== -1) {
        // Insert 'Submitted At' after 'Name'
        pdfExportColumns.splice(phoneIndex - 1, 0, {
            title: "Submitted At",
            dataIndex: "submittedAt",
            key: "submittedAt",
        });
    }

    // Add a calculated column for SVJ Share % for PDF
    pdfExportColumns.push({
        title: "SVJ Share %",
        dataIndex: "svjSharePercentage",
        key: "svjSharePercentage",
    });

    const tableColumn = pdfExportColumns.map((c) => c.title);

    const tableRows = processedData.map((d) =>
      pdfExportColumns.map((c) => {
        let value = d[c.dataIndex] || "";
        
        if (c.key === "submittedAt") {
            return formatDateTime(value);
        }

        // Handle calculated SVJ Share % column
        if (c.key === "svjSharePercentage") {
            const total = d.TotalPrice;
            const share = d.SVJShare;
            if (total > 0) {
              const percentage = (share / total) * 100;
              return percentage.toFixed(2) + "%";
            }
            return "0.00%";
        }
        
        // Format currency fields for PDF (NOTE: The provided code formats them here, 
        // but it's important that the column array is extended to include these financial fields 
        // if they are to appear in the PDF, which they were not in the provided `columns` definition.)
        if (["TotalPrice", "SVJShare", "VrismShare", "TotalRevenue", "SvjRevenue", "VrismRevenue"].includes(c.dataIndex)) {
            return formatCurrency(value);
        }
        return value;
      })
    );

    doc.autoTable({ head: [tableColumn], body: tableRows });
    doc.save("LeadsData.pdf");
  };

  return (
    <div className="dashboard-container">
      <Topbar/>
      <Toaster position="top-right" />
      

      {loading ? (
        <Spin size="large" className="loading-spinner" />
      ) : (
        <>
          {/* ✅ Primary Metric Cards (Total & Revenue) - NOW WITH RIBBONS */}
          <Row gutter={[24, 24]} className="metrics-row">
            
            {/* 1. TOTAL LEADS CARD */}
            <Col xs={24} sm={12} md={6}>
              <Badge.Ribbon text="COUNT" color="blue">
                <Card>
                  <Statistic
                    title="TOTAL LEADS"
                    value={totalLeads}
                    prefix={<SolutionOutlined />}
                  />
                </Card>
              </Badge.Ribbon>
            </Col>

            {/* 2. TOTAL REVENUE CARD */}
            <Col xs={24} sm={12} md={6}>
              <Badge.Ribbon text="GROSS" color="green">
                <Card>
                  <Statistic
                    title="TOTAL REVENUE"
                    value={formatCurrency(totalRevenue)}
                    prefix={<DollarOutlined />}
                  />
                </Card>
              </Badge.Ribbon>
            </Col>

          
            {/* 4. VRISM REVENUE CARD (10% Share is implied based on the card's text) */}
            <Col xs={24} sm={12} md={6}>
              <Badge.Ribbon text="10% SHARE" color="cyan">
                <Card>
                  <Statistic
                    title="VRISM REVENUE (10%)"
                    value={formatCurrency(totalVrismRevenue)}
                    prefix={<ArrowUpOutlined style={{ color: "#1890ff" }} />}
                  />
                </Card>
              </Badge.Ribbon>
            </Col>
          </Row>

          {/* ✅ Status-Based Metric Cards */}
          <h3 className="dashboard-subheader" style={{ marginTop: 30, marginBottom: 15 }}>
            Lead Status Breakdown
          </h3>
          <Row gutter={[16, 16]} className="status-metrics-row">
            {STATUS_OPTIONS.map((status) => (
              <Col key={status.value} xs={24} sm={12} md={8} lg={4}>
                <Card 
                  size="small" 
                  // Status card colors are updated based on the new STATUS_OPTIONS
                  style={{ borderLeft: `5px solid ${status.color}` }} 
                >
                  <Statistic
                    title={status.label.toUpperCase()}
                    // statusCounts should contain keys matching status.value/label
                    value={statusCounts[status.value] || 0} 
                    valueStyle={{ color: status.color, fontSize: '1.2em' }}
                    prefix={<FilterOutlined />}
                  />
                </Card>
              </Col>
            ))}
          </Row>

          {/* ✅ Export Buttons & Status Filter (Filter is not visible, but the selectedStatus state is used for data fetching) */}
          <Row justify="space-between" align="middle" gutter={[16, 16]} style={{ marginTop: 20 }}>
           
            <Col>
              <Button
                type="primary"
                icon={<FileExcelOutlined />}
                onClick={exportExcel}
                style={{ marginRight: 8 }}
              >
                Export Excel
              </Button>
              <Button
                type="primary"
                icon={<FilePdfOutlined />}
                onClick={exportPDF}
              >
                Export PDF
              </Button>
            </Col>

            {/* If a status filter dropdown were desired, it would go here: */}
            {/* <Col>
                <Select value={selectedStatus} onChange={setSelectedStatus} style={{ width: 200 }}>
                    {STATUS_OPTIONS.map(s => <Option key={s.value} value={s.value}>{s.label}</Option>)}
                </Select>
            </Col> */}

          </Row>

          {/* ✅ Data Table */}
          <Table
            dataSource={processedData} // Use the sorted data
            columns={columns}
            bordered
            rowKey="key"
            scroll={{ x: 'max-content' }} // Enable horizontal scroll for many columns
            pagination={{ pageSize: 10 }}
            style={{ marginTop: 20 }}
          />

          {/* ✅ Modal */}
          <Modal
            open={modalVisible}
            title="Lead Details"
            footer={<Button onClick={() => setModalVisible(false)}>Close</Button>}
            onCancel={() => setModalVisible(false)}
          >
            {modalData && (
              <Descriptions column={1} bordered size="small">
                {Object.entries(modalData).map(([key, value]) => {
                  // Hide fields already visible in table or internal keys
                  if (
                    [
                      "Name",
                      "Phone Number",
                      "Status",
                      "ON SITE VIEW",
                      "key",
                      "index",
                      "TotalPrice",
                      "SVJShare",
                      "VrismShare",
                      "TotalRevenue",
                      "SvjRevenue",
                      "VrismRevenue",
                      "submittedAt", 
                    ].includes(key)
                    )
                    return null;
                  
                  // Format value for display in modal
                  let displayValue = value;
                  if (Array.isArray(value)) {
                    displayValue = value.join(", ");
                  } else if (
                    ["TotalPrice", "SVJShare", "VrismShare", "TotalRevenue", "SvjRevenue", "VrismRevenue"].includes(key)
                  ) {
                    displayValue = formatCurrency(value);
                  } else if (key === "submittedAt") {
                    displayValue = formatDateTime(value);
                  }

                  if (!displayValue) return null;

                  return (
                    <Descriptions.Item key={key} label={key}>
                      {displayValue}
                    </Descriptions.Item>
                  );
                })}
              </Descriptions>
            )}
          </Modal>
        </>
      )}
    </div>
  );
}