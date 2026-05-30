import {
  Activity,
  AlertTriangle,
  Bell,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  CreditCard,
  Download,
  Filter,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  PackageSearch,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  ShoppingCart,
  Thermometer,
  Truck,
  UserRound,
  Warehouse
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { useServiceSnapshots } from "./hooks/useServiceSnapshots";

type ViewKey = "dashboard" | "inventory" | "orders";

interface InventoryItem {
  sku: string;
  product: string;
  batch: string;
  facility: string;
  stock: number;
  reserved: number;
  reorderPoint: number;
  expiry: string;
  qaStatus: "Released" | "Review" | "Hold";
  temperature: string;
  risk: "Low" | "Medium" | "High";
}

interface OrderItem {
  id: string;
  customer: string;
  channel: string;
  region: string;
  product: string;
  quantity: number;
  amount: string;
  status: "Confirmed" | "Picking" | "QA Gate" | "Dispatched" | "On Hold";
  priority: "Routine" | "High" | "Critical";
  sla: string;
  owner: string;
}

const inventoryItems: InventoryItem[] = [
  {
    sku: "PCM-500-TAB",
    product: "Paracetamol 500mg Tablets",
    batch: "PCM-2408-A",
    facility: "Mumbai FG Warehouse",
    stock: 14200,
    reserved: 4200,
    reorderPoint: 6000,
    expiry: "2027-02-18",
    qaStatus: "Released",
    temperature: "24 C",
    risk: "Low"
  },
  {
    sku: "AMX-250-CAP",
    product: "Amoxicillin 250mg Capsules",
    batch: "AMX-2410-C",
    facility: "Pune Cold Room",
    stock: 8200,
    reserved: 3900,
    reorderPoint: 7000,
    expiry: "2026-11-04",
    qaStatus: "Review",
    temperature: "6 C",
    risk: "Medium"
  },
  {
    sku: "ORS-CLN-SYP",
    product: "ORS Clean Syrup",
    batch: "ORS-2501-B",
    facility: "Hyderabad Dispatch",
    stock: 3900,
    reserved: 2600,
    reorderPoint: 5200,
    expiry: "2026-08-21",
    qaStatus: "Hold",
    temperature: "22 C",
    risk: "High"
  },
  {
    sku: "CTZ-10-TAB",
    product: "Cetirizine 10mg Tablets",
    batch: "CTZ-2502-F",
    facility: "Delhi Regional DC",
    stock: 21800,
    reserved: 7800,
    reorderPoint: 8000,
    expiry: "2027-06-13",
    qaStatus: "Released",
    temperature: "23 C",
    risk: "Low"
  }
];

const initialOrders: OrderItem[] = [
  {
    id: "SO-2026-1048",
    customer: "Apollo Hospitals",
    channel: "Hospital",
    region: "South",
    product: "Paracetamol 500mg Tablets",
    quantity: 2400,
    amount: "Rs 4.8L",
    status: "Picking",
    priority: "High",
    sla: "Today 18:00",
    owner: "Ritika Shah"
  },
  {
    id: "SO-2026-1051",
    customer: "MedPlus Distribution",
    channel: "Distributor",
    region: "West",
    product: "Amoxicillin 250mg Capsules",
    quantity: 1800,
    amount: "Rs 7.2L",
    status: "QA Gate",
    priority: "Critical",
    sla: "Today 16:30",
    owner: "Aman Verma"
  },
  {
    id: "SO-2026-1056",
    customer: "Fortis Pharmacy",
    channel: "Retail Chain",
    region: "North",
    product: "ORS Clean Syrup",
    quantity: 900,
    amount: "Rs 2.1L",
    status: "Confirmed",
    priority: "Routine",
    sla: "Tomorrow 11:00",
    owner: "Meera Iyer"
  }
];

export default function App() {
  const services = useServiceSnapshots();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState<ViewKey>("dashboard");
  const [inventoryQuery, setInventoryQuery] = useState("");
  const [inventoryFilter, setInventoryFilter] = useState("All");
  const [orders, setOrders] = useState<OrderItem[]>(initialOrders);
  const [orderCustomer, setOrderCustomer] = useState("");
  const [orderProduct, setOrderProduct] = useState(inventoryItems[0].product);
  const [orderQuantity, setOrderQuantity] = useState(500);
  const [orderPriority, setOrderPriority] = useState<OrderItem["priority"]>("Routine");

  const onlineServices = services.filter((service) => service.status === "online").length;
  const criticalStock = inventoryItems.filter((item) => item.risk === "High").length;
  const ordersInMotion = orders.filter((order) => order.status !== "Dispatched").length;
  const releasedStock = inventoryItems
    .filter((item) => item.qaStatus === "Released")
    .reduce((total, item) => total + item.stock, 0);

  const filteredInventory = useMemo(() => {
    return inventoryItems.filter((item) => {
      const matchesSearch = `${item.sku} ${item.product} ${item.batch} ${item.facility}`
        .toLowerCase()
        .includes(inventoryQuery.toLowerCase());
      const matchesFilter = inventoryFilter === "All" || item.risk === inventoryFilter;

      return matchesSearch && matchesFilter;
    });
  }, [inventoryFilter, inventoryQuery]);

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsAuthenticated(true);
  }

  function handleCreateOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const order: OrderItem = {
      id: `SO-2026-${Math.floor(1100 + Math.random() * 700)}`,
      customer: orderCustomer || "New Pharma Customer",
      channel: "Distributor",
      region: "West",
      product: orderProduct,
      quantity: orderQuantity,
      amount: `Rs ${(orderQuantity * 0.0021).toFixed(1)}L`,
      status: "Confirmed",
      priority: orderPriority,
      sla: "Tomorrow 10:00",
      owner: "Operations Desk"
    };

    setOrders((current) => [order, ...current]);
    setOrderCustomer("");
    setOrderQuantity(500);
    setOrderPriority("Routine");
    setActiveView("orders");
  }

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="erp-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark">
            <ShieldCheck size={22} />
          </div>
          <div>
            <strong>MedNova ERP</strong>
            <span>Pharma Operations</span>
          </div>
        </div>

        <nav className="nav-stack" aria-label="Main navigation">
          <button className={activeView === "dashboard" ? "active" : ""} onClick={() => setActiveView("dashboard")}>
            <LayoutDashboard size={18} />
            Dashboard
          </button>
          <button className={activeView === "inventory" ? "active" : ""} onClick={() => setActiveView("inventory")}>
            <PackageSearch size={18} />
            Inventory
          </button>
          <button className={activeView === "orders" ? "active" : ""} onClick={() => setActiveView("orders")}>
            <ShoppingCart size={18} />
            Orders
          </button>
        </nav>

        <div className="sidebar-status">
          <span>Service health</span>
          <strong>{onlineServices}/{services.length} online</strong>
        </div>

        <button className="logout-button" onClick={() => setIsAuthenticated(false)}>
          <LogOut size={17} />
          Sign out
        </button>
      </aside>

      <main className="workspace">
        <Topbar activeView={activeView} />

        {activeView === "dashboard" ? (
          <DashboardView
            criticalStock={criticalStock}
            onlineServices={onlineServices}
            ordersInMotion={ordersInMotion}
            releasedStock={releasedStock}
            services={services}
            onGoInventory={() => setActiveView("inventory")}
            onGoOrders={() => setActiveView("orders")}
          />
        ) : null}

        {activeView === "inventory" ? (
          <InventoryView
            inventoryFilter={inventoryFilter}
            inventoryQuery={inventoryQuery}
            items={filteredInventory}
            onFilterChange={setInventoryFilter}
            onQueryChange={setInventoryQuery}
          />
        ) : null}

        {activeView === "orders" ? (
          <OrdersView
            inventoryItems={inventoryItems}
            orderCustomer={orderCustomer}
            orderPriority={orderPriority}
            orderProduct={orderProduct}
            orderQuantity={orderQuantity}
            orders={orders}
            onCustomerChange={setOrderCustomer}
            onPriorityChange={setOrderPriority}
            onProductChange={setOrderProduct}
            onQuantityChange={setOrderQuantity}
            onSubmit={handleCreateOrder}
          />
        ) : null}
      </main>
    </div>
  );
}

function LoginScreen({ onLogin }: { onLogin: (event: FormEvent<HTMLFormElement>) => void }) {
  return (
    <main className="login-layout">
      <section className="login-visual">
        <div className="login-brand">
          <ShieldCheck size={28} />
          <span>MedNova ERP</span>
        </div>
        <div className="login-copy">
          <span>Validated pharma operations</span>
          <h1>Control inventory, orders, quality gates, and finance from one secure workspace.</h1>
        </div>
        <div className="login-ops-grid">
          <div>
            <PackageSearch size={20} />
            <strong>184</strong>
            <span>Live batches</span>
          </div>
          <div>
            <ClipboardCheck size={20} />
            <strong>93%</strong>
            <span>First pass QA</span>
          </div>
          <div>
            <Truck size={20} />
            <strong>97%</strong>
            <span>OTIF dispatch</span>
          </div>
        </div>
      </section>

      <section className="login-panel" aria-label="Sign in">
        <form className="login-card" onSubmit={onLogin}>
          <div>
            <span className="section-kicker">Secure access</span>
            <h2>Sign in to ERP</h2>
          </div>

          <label>
            <span>Email</span>
            <div className="input-shell">
              <UserRound size={18} />
              <input defaultValue="admin@mednova.com" type="email" />
            </div>
          </label>

          <label>
            <span>Password</span>
            <div className="input-shell">
              <LockKeyhole size={18} />
              <input defaultValue="redhat123" type="password" />
            </div>
          </label>

          <div className="form-row">
            <label className="check-line">
              <input defaultChecked type="checkbox" />
              Remember device
            </label>
            <button className="link-button" type="button">
              Reset
            </button>
          </div>

          <button className="primary-action" type="submit">
            Enter workspace
            <ChevronRight size={18} />
          </button>
        </form>
      </section>
    </main>
  );
}

function Topbar({ activeView }: { activeView: ViewKey }) {
  const title = activeView === "dashboard" ? "Command Center" : activeView === "inventory" ? "Inventory Control" : "Order Management";

  return (
    <header className="topbar">
      <div>
        <span className="section-kicker">Pharma ERP</span>
        <h1>{title}</h1>
      </div>
      <div className="topbar-actions">
        <button title="Refresh">
          <RefreshCw size={18} />
        </button>
        <button title="Export">
          <Download size={18} />
        </button>
        <button title="Notifications">
          <Bell size={18} />
        </button>
      </div>
    </header>
  );
}

function DashboardView({
  criticalStock,
  onlineServices,
  ordersInMotion,
  releasedStock,
  services,
  onGoInventory,
  onGoOrders
}: {
  criticalStock: number;
  onlineServices: number;
  ordersInMotion: number;
  releasedStock: number;
  services: ReturnType<typeof useServiceSnapshots>;
  onGoInventory: () => void;
  onGoOrders: () => void;
}) {
  const kpis = [
    { label: "Released stock", value: releasedStock.toLocaleString(), icon: CheckCircle2 },
    { label: "Orders in motion", value: ordersInMotion.toString(), icon: ShoppingCart },
    { label: "High risk batches", value: criticalStock.toString(), icon: AlertTriangle },
    { label: "Services online", value: `${onlineServices}/${services.length}`, icon: Activity }
  ] satisfies Array<{ label: string; value: string; icon: LucideIcon }>;

  return (
    <div className="view-stack">
      <section className="kpi-grid">
        {kpis.map((item) => {
          const Icon = item.icon;

          return (
            <article className="kpi-tile" key={item.label}>
              <Icon size={20} />
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </article>
          );
        })}
      </section>

      <section className="split-layout">
        <article className="operations-board">
          <div className="section-heading">
            <div>
              <span className="section-kicker">Today</span>
              <h2>Operational priority queue</h2>
            </div>
            <button className="subtle-button" onClick={onGoOrders}>
              Open orders
              <ChevronRight size={16} />
            </button>
          </div>

          {[
            ["QA release required", "AMX-2410-C needs lab sign-off before dispatch", "Critical"],
            ["Low stock watch", "ORS syrup is below reorder threshold in Hyderabad", "High"],
            ["Finance hold", "Distributor credit review pending for 2 orders", "Medium"]
          ].map(([title, body, level]) => (
            <div className="priority-row" key={title}>
              <span className={`risk-dot risk-dot--${level.toLowerCase()}`} />
              <div>
                <strong>{title}</strong>
                <span>{body}</span>
              </div>
              <em>{level}</em>
            </div>
          ))}
        </article>

        <article className="service-panel">
          <div className="section-heading">
            <div>
              <span className="section-kicker">System</span>
              <h2>Microservice mesh</h2>
            </div>
            <button className="subtle-button" onClick={onGoInventory}>
              Inventory
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="service-list">
            {services.map((service) => (
              <div className="service-row" key={service.definition.key}>
                <span className={`health-light health-light--${service.status}`} />
                <div>
                  <strong>{service.definition.title}</strong>
                  <span>{service.definition.baseUrl}</span>
                </div>
                <em>{service.health}</em>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}

function InventoryView({
  inventoryFilter,
  inventoryQuery,
  items,
  onFilterChange,
  onQueryChange
}: {
  inventoryFilter: string;
  inventoryQuery: string;
  items: InventoryItem[];
  onFilterChange: (value: string) => void;
  onQueryChange: (value: string) => void;
}) {
  return (
    <div className="view-stack">
      <section className="toolbar">
        <div className="search-box">
          <Search size={18} />
          <input
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search SKU, batch, product, warehouse"
            value={inventoryQuery}
          />
        </div>
        <div className="segmented-control" aria-label="Inventory risk filter">
          {["All", "Low", "Medium", "High"].map((filter) => (
            <button
              className={inventoryFilter === filter ? "active" : ""}
              key={filter}
              onClick={() => onFilterChange(filter)}
              type="button"
            >
              {filter === "All" ? <Filter size={16} /> : null}
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section className="inventory-grid">
        {items.map((item) => {
          const available = item.stock - item.reserved;
          const fill = Math.min(100, Math.round((available / item.stock) * 100));

          return (
            <article className="inventory-card" key={`${item.sku}-${item.batch}`}>
              <div className="card-topline">
                <span>{item.sku}</span>
                <em className={`status-pill status-pill--${item.risk.toLowerCase()}`}>{item.risk}</em>
              </div>
              <h3>{item.product}</h3>
              <div className="inventory-meta">
                <span>
                  <Warehouse size={15} />
                  {item.facility}
                </span>
                <span>
                  <Thermometer size={15} />
                  {item.temperature}
                </span>
              </div>
              <div className="stock-meter">
                <div style={{ width: `${fill}%` }} />
              </div>
              <div className="inventory-numbers">
                <div>
                  <span>Available</span>
                  <strong>{available.toLocaleString()}</strong>
                </div>
                <div>
                  <span>Reserved</span>
                  <strong>{item.reserved.toLocaleString()}</strong>
                </div>
                <div>
                  <span>Reorder</span>
                  <strong>{item.reorderPoint.toLocaleString()}</strong>
                </div>
              </div>
              <div className="card-footer">
                <span>Batch {item.batch}</span>
                <strong>{item.qaStatus}</strong>
              </div>
            </article>
          );
        })}
      </section>

      <section className="table-panel">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Batch Ledger</span>
            <h2>Inventory movement</h2>
          </div>
        </div>
        <div className="responsive-table">
          <table>
            <thead>
              <tr>
                <th>SKU</th>
                <th>Batch</th>
                <th>Facility</th>
                <th>Stock</th>
                <th>Reserved</th>
                <th>Expiry</th>
                <th>QA</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={`${item.sku}-row`}>
                  <td>{item.sku}</td>
                  <td>{item.batch}</td>
                  <td>{item.facility}</td>
                  <td>{item.stock.toLocaleString()}</td>
                  <td>{item.reserved.toLocaleString()}</td>
                  <td>{item.expiry}</td>
                  <td>{item.qaStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function OrdersView({
  inventoryItems,
  orderCustomer,
  orderPriority,
  orderProduct,
  orderQuantity,
  orders,
  onCustomerChange,
  onPriorityChange,
  onProductChange,
  onQuantityChange,
  onSubmit
}: {
  inventoryItems: InventoryItem[];
  orderCustomer: string;
  orderPriority: OrderItem["priority"];
  orderProduct: string;
  orderQuantity: number;
  orders: OrderItem[];
  onCustomerChange: (value: string) => void;
  onPriorityChange: (value: OrderItem["priority"]) => void;
  onProductChange: (value: string) => void;
  onQuantityChange: (value: number) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="orders-layout">
      <section className="table-panel">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Fulfillment</span>
            <h2>Order pipeline</h2>
          </div>
          <button className="subtle-button">
            <CreditCard size={16} />
            Credit holds
          </button>
        </div>

        <div className="order-kanban">
          {["Confirmed", "Picking", "QA Gate", "Dispatched", "On Hold"].map((status) => (
            <div className="kanban-column" key={status}>
              <strong>{status}</strong>
              <span>{orders.filter((order) => order.status === status).length} orders</span>
            </div>
          ))}
        </div>

        <div className="responsive-table">
          <table>
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Status</th>
                <th>Priority</th>
                <th>SLA</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>
                    <strong>{order.customer}</strong>
                    <span>{order.channel} / {order.region}</span>
                  </td>
                  <td>{order.product}</td>
                  <td>{order.quantity.toLocaleString()}</td>
                  <td>{order.status}</td>
                  <td>{order.priority}</td>
                  <td>{order.sla}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <aside className="order-form-panel">
        <form onSubmit={onSubmit}>
          <div>
            <span className="section-kicker">New Sales Order</span>
            <h2>Create order</h2>
          </div>
          <label>
            <span>Customer</span>
            <input
              onChange={(event) => onCustomerChange(event.target.value)}
              placeholder="Customer or distributor"
              value={orderCustomer}
            />
          </label>
          <label>
            <span>Product</span>
            <select onChange={(event) => onProductChange(event.target.value)} value={orderProduct}>
              {inventoryItems.map((item) => (
                <option key={item.sku} value={item.product}>
                  {item.product}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Quantity</span>
            <input
              min={100}
              onChange={(event) => onQuantityChange(Number(event.target.value))}
              step={100}
              type="number"
              value={orderQuantity}
            />
          </label>
          <label>
            <span>Priority</span>
            <select
              onChange={(event) => onPriorityChange(event.target.value as OrderItem["priority"])}
              value={orderPriority}
            >
              <option>Routine</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </label>
          <button className="primary-action" type="submit">
            <Plus size={18} />
            Create order
          </button>
        </form>
      </aside>
    </div>
  );
}
