import React, { useMemo, useState } from 'react'
import {
  Activity, AlertTriangle, ArrowDownLeft, ArrowDownRight, ArrowUpRight,
  Bell, Boxes, CalendarDays, Check, ChevronDown, CircleHelp, ClipboardList,
  Download, LayoutDashboard, LifeBuoy, Menu, MoreHorizontal, Package,
  Search, Settings2, ShieldCheck, SlidersHorizontal, Truck, Warehouse, X,
} from 'lucide-react'
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts'
import { monthlyData, netFlowData, defectiveData, recentActivity } from './data'

const fmt = (n) => new Intl.NumberFormat('vi-VN').format(n)

function NavItem({ icon: Icon, label, active, badge, onClick }) {
  return (
    <button className={`nav-item ${active ? 'active' : ''}`} onClick={onClick}>
      <Icon size={18} strokeWidth={1.8} />
      <span>{label}</span>
      {badge && <span className="nav-badge">{badge}</span>}
    </button>
  )
}

function KpiCard({ title, value, unit, change, positive, icon: Icon, tint, note }) {
  return (
    <article className="kpi-card">
      <div className="kpi-top">
        <div className={`kpi-icon ${tint}`}><Icon size={19} /></div>
        <button className="icon-button subtle" aria-label={`Tùy chọn ${title}`}><MoreHorizontal size={19} /></button>
      </div>
      <p className="kpi-title">{title}</p>
      <div className="kpi-value-row"><strong>{value}</strong><span>{unit}</span></div>
      <div className="kpi-foot">
        <span className={`change ${positive ? 'good' : 'bad'}`}>
          {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {change}
        </span>
        <span className="muted">{note}</span>
      </div>
    </article>
  )
}

function PanelTitle({ eyebrow, title, action }) {
  return <div className="panel-title">
    <div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>
    {action}
  </div>
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return <div className="chart-tooltip">
    <strong>{label}</strong>
    {payload.map((item) => <div className="tooltip-line" key={item.dataKey}>
      <i style={{ background: item.color }} />{item.name}: <b>{fmt(item.value)}</b>
    </div>)}
  </div>
}

export default function App() {
  const [activeNav, setActiveNav] = useState('Tổng quan')
  const [period, setPeriod] = useState('12 tháng gần nhất')
  const [search, setSearch] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [showMobileNav, setShowMobileNav] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [toast, setToast] = useState('')

  const activities = useMemo(() => recentActivity.filter((a) =>
    `${a.id} ${a.title} ${a.detail} ${a.status}`.toLowerCase().includes(search.toLowerCase())
  ), [search])

  const notify = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2600)
  }

  const handleExport = () => {
    const rows = [['Mã', 'Hoạt động', 'Chi tiết', 'Thời gian', 'Trạng thái'], ...activities.map(a => [a.id, a.title, a.detail, a.time, a.status])]
    const csv = '\uFEFF' + rows.map(row => row.map(v => `"${String(v).replaceAll('"', '""')}"`).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'wms-hoat-dong-gan-day.csv'
    link.click()
    URL.revokeObjectURL(url)
    notify('Đã xuất danh sách hoạt động ra CSV')
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${showMobileNav ? 'mobile-open' : ''}`}>
        <div className="brand">
          <div className="brand-mark"><Boxes size={23} /></div>
          <div><strong>nex<span>WARE</span></strong><small>WAREHOUSE SYSTEM</small></div>
          <button className="mobile-close icon-button" onClick={() => setShowMobileNav(false)} aria-label="Đóng menu"><X size={18} /></button>
        </div>

        <div className="workspace-switch">
          <div className="workspace-icon"><Warehouse size={18} /></div>
          <div className="workspace-text"><strong>Kho trung tâm</strong><span>Hà Nội, Việt Nam</span></div>
          <ChevronDown size={15} />
        </div>

        <div className="nav-section-label">KHÔNG GIAN LÀM VIỆC</div>
        <nav className="main-nav">
          <NavItem icon={LayoutDashboard} label="Tổng quan" active={activeNav === 'Tổng quan'} onClick={() => { setActiveNav('Tổng quan'); setShowMobileNav(false) }} />
          <NavItem icon={Package} label="Quản lý hàng hóa" active={activeNav === 'Quản lý hàng hóa'} onClick={() => { setActiveNav('Quản lý hàng hóa'); notify('Khu vực Quản lý hàng hóa đang dùng dữ liệu demo') }} />
          <NavItem icon={ArrowDownLeft} label="Nhập kho" active={activeNav === 'Nhập kho'} onClick={() => { setActiveNav('Nhập kho'); notify('Khu vực Nhập kho đang dùng dữ liệu demo') }} />
          <NavItem icon={ArrowUpRight} label="Xuất kho" active={activeNav === 'Xuất kho'} onClick={() => { setActiveNav('Xuất kho'); notify('Khu vực Xuất kho đang dùng dữ liệu demo') }} />
          <NavItem icon={ClipboardList} label="Kiểm kê kho" active={activeNav === 'Kiểm kê kho'} onClick={() => { setActiveNav('Kiểm kê kho'); notify('Khu vực Kiểm kê kho đang dùng dữ liệu demo') }} />
          <NavItem icon={Truck} label="Vận chuyển" active={activeNav === 'Vận chuyển'} onClick={() => { setActiveNav('Vận chuyển'); notify('Khu vực Vận chuyển đang dùng dữ liệu demo') }} />
        </nav>

        <div className="nav-section-label second-label">PHÂN TÍCH & HỆ THỐNG</div>
        <nav className="main-nav">
          <NavItem icon={Activity} label="Báo cáo & phân tích" active={activeNav === 'Báo cáo & phân tích'} onClick={() => { setActiveNav('Báo cáo & phân tích'); notify('Khu vực Báo cáo đang dùng dữ liệu demo') }} />
          <NavItem icon={ShieldCheck} label="Kiểm soát chất lượng" badge="12" active={activeNav === 'Kiểm soát chất lượng'} onClick={() => { setActiveNav('Kiểm soát chất lượng'); notify('Có 12 mục cần kiểm tra trong dữ liệu demo') }} />
          <NavItem icon={Settings2} label="Cài đặt" active={activeNav === 'Cài đặt'} onClick={() => { setActiveNav('Cài đặt'); notify('Khu vực Cài đặt đang dùng dữ liệu demo') }} />
        </nav>

        <div className="sidebar-spacer" />
        <div className="support-card">
          <div className="support-icon"><LifeBuoy size={18} /></div>
          <strong>Cần hỗ trợ?</strong>
          <p>Đội ngũ của chúng tôi luôn sẵn sàng giúp bạn.</p>
          <button onClick={() => notify('Liên hệ quản trị viên hệ thống để được hỗ trợ')}>Trung tâm trợ giúp <ArrowUpRight size={14} /></button>
        </div>
        <div className="profile">
          <div className="avatar">NA</div>
          <div className="profile-info"><strong>Nguyễn Anh</strong><span>Quản lý kho</span></div>
          <MoreHorizontal size={18} />
        </div>
      </aside>

      {showMobileNav && <button className="scrim" onClick={() => setShowMobileNav(false)} aria-label="Đóng menu" />}

      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <button className="mobile-menu icon-button" onClick={() => setShowMobileNav(true)} aria-label="Mở menu"><Menu size={21} /></button>
            <div className="breadcrumb"><span>Không gian làm việc</span><span className="crumb-slash">/</span><strong>{activeNav}</strong></div>
          </div>
          <div className="topbar-actions">
            <label className="global-search"><Search size={16} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm hoạt động..." /><kbd>⌘ K</kbd></label>
            <div className="notification-wrap">
              <button className="icon-button notification-button" aria-label="Thông báo" onClick={() => setShowNotifications(!showNotifications)}><Bell size={19} /><i /></button>
              {showNotifications && <div className="notification-popover"><strong>Thông báo</strong><p><span className="notice-dot red" />12 sản phẩm cần kiểm tra chất lượng.</p><p><span className="notice-dot green" />Phiếu nhập PO-2084 đã hoàn tất.</p><button onClick={() => { setShowNotifications(false); notify('Bạn đã xem thông báo') }}>Đánh dấu đã đọc</button></div>}
            </div>
            <div className="topbar-divider" />
            <button className="help-button" onClick={() => notify('Trung tâm trợ giúp: liên hệ quản trị viên hệ thống')}><CircleHelp size={17} /><span>Trợ giúp</span></button>
          </div>
        </header>

        <div className="page-content">
          <section className="page-heading">
            <div>
              <div className="date-line"><span className="live-dot" /> THỨ HAI, 27 THÁNG 10, 2026</div>
              <h1>Tổng quan kho hàng <span className="wave">✦</span></h1>
              <p>Theo dõi hiệu suất vận hành và tình trạng kho của bạn.</p>
            </div>
            <div className="heading-actions">
              <div className="period-select"><CalendarDays size={16} /><select value={period} onChange={e => setPeriod(e.target.value)} aria-label="Chọn khoảng thời gian"><option>12 tháng gần nhất</option><option>30 ngày gần nhất</option><option>7 ngày gần nhất</option></select><ChevronDown size={14} /></div>
              <button className="filter-button" onClick={() => setShowFilters(!showFilters)}><SlidersHorizontal size={16} /> Bộ lọc</button>
              <button className="export-button" onClick={handleExport}><Download size={16} /> Xuất báo cáo</button>
            </div>
          </section>

          {showFilters && <section className="filter-strip"><span><span className="live-dot" /> Đang xem: <b>{period}</b></span><span>Kho: <b>Tất cả kho</b></span><span>Loại hàng: <b>Tất cả</b></span><button onClick={() => { setPeriod('12 tháng gần nhất'); setShowFilters(false); notify('Đã đặt lại bộ lọc') }}>Đặt lại bộ lọc</button></section>}

          <section className="kpi-grid">
            <KpiCard title="Tổng lượng nhập" value="24.680" unit="đơn vị" change="+12,8%" positive icon={ArrowDownLeft} tint="purple" note="so với kỳ trước" />
            <KpiCard title="Tổng lượng xuất" value="18.245" unit="đơn vị" change="+8,2%" positive icon={ArrowUpRight} tint="blue" note="so với kỳ trước" />
            <KpiCard title="Tồn kho hiện tại" value="86.420" unit="đơn vị" change="+4,6%" positive icon={Boxes} tint="teal" note="so với kỳ trước" />
            <KpiCard title="Vòng quay tồn kho" value="4,82" unit="vòng" change="-2,4%" positive={false} icon={Activity} tint="orange" note="so với kỳ trước" />
          </section>

          <section className="charts-grid">
            <article className="panel inventory-panel">
              <PanelTitle eyebrow="HIỆU SUẤT VẬN HÀNH" title="Tổng quan nhập / xuất kho"
                action={<button className="panel-menu" onClick={() => notify('Biểu đồ đang hiển thị dữ liệu mẫu') } aria-label="Tùy chọn biểu đồ"><MoreHorizontal size={20} /></button>} />
              <div className="chart-summary">
                <div><span className="legend-dot inbound" /> <span>Nhập kho</span><strong>24.680</strong><small className="positive-text">+12,8%</small></div>
                <div><span className="legend-dot outbound" /> <span>Xuất kho</span><strong>18.245</strong><small className="positive-text">+8,2%</small></div>
              </div>
              <div className="bar-chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData} margin={{ top: 8, right: 4, left: -16, bottom: 0 }} barGap={5}>
                    <CartesianGrid strokeDasharray="3 5" vertical={false} stroke="#273047" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#7f8ba5', fontSize: 11 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#7f8ba5', fontSize: 11 }} tickFormatter={(v) => `${v / 1000}k`} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(140, 124, 246, .07)' }} />
                    <Bar name="Nhập kho" dataKey="inbound" fill="#8b7cf6" radius={[4, 4, 0, 0]} maxBarSize={15} />
                    <Bar name="Xuất kho" dataKey="outbound" fill="#39c6b2" radius={[4, 4, 0, 0]} maxBarSize={15} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="panel-bottom-note"><span><i className="tiny-check"><Check size={10} /></i> Dữ liệu cập nhật theo thời gian thực</span><span>Đơn vị: sản phẩm</span></div>
            </article>

            <article className="panel netflow-panel">
              <PanelTitle eyebrow="DÒNG LƯU CHUYỂN" title="Dòng hàng ròng" action={<button className="mini-select" onClick={() => notify('Đang hiển thị dữ liệu 30 ngày')}>30 ngày <ChevronDown size={13} /></button>} />
              <div className="netflow-stat"><strong>+6.435</strong><span className="stat-unit">đơn vị</span><span className="change good"><ArrowUpRight size={14} /> 14,6%</span></div>
              <p className="muted small-copy">Chênh lệch giữa lượng nhập và xuất kho</p>
              <div className="area-chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={netFlowData} margin={{ top: 12, right: 0, left: -24, bottom: 0 }}>
                    <defs><linearGradient id="flowGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8b7cf6" stopOpacity={0.3} /><stop offset="100%" stopColor="#8b7cf6" stopOpacity={0} /></linearGradient></defs>
                    <CartesianGrid strokeDasharray="3 5" vertical={false} stroke="#273047" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#7f8ba5', fontSize: 10 }} dy={8} interval={3} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#7f8ba5', fontSize: 10 }} tickFormatter={(v) => `${v}`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area name="Dòng hàng ròng" type="monotone" dataKey="value" stroke="#9b8cff" strokeWidth={2.5} fill="url(#flowGradient)" activeDot={{ r: 4, fill: '#b4a8ff', stroke: '#151b2b', strokeWidth: 2 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="netflow-footer"><span><span className="legend-dot purple-dot" /> Dòng hàng ròng</span><span>01 — 31 Tháng 10</span></div>
            </article>
          </section>

          <section className="lower-grid">
            <article className="panel defect-panel">
              <PanelTitle eyebrow="CHẤT LƯỢNG HÀNG HÓA" title="Tổng quan tồn kho hàng lỗi" action={<button className="panel-menu" onClick={() => notify('Báo cáo chất lượng đang dùng dữ liệu mẫu')} aria-label="Tùy chọn"><MoreHorizontal size={20} /></button>} />
              <div className="defect-content">
                <div className="donut-wrap">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={defectiveData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius="68%" outerRadius="88%" paddingAngle={4} stroke="none">
                        {defectiveData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                      </Pie>
                      <Tooltip formatter={(v) => [`${v}%`, 'Tỷ lệ']} contentStyle={{ background: '#171e30', border: '1px solid #303a52', borderRadius: 10, color: '#eef2ff' }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="donut-center"><strong>1.248</strong><span>Sản phẩm</span><small>cần theo dõi</small></div>
                </div>
                <div className="defect-legend">
                  {defectiveData.map((item) => <div className="defect-legend-row" key={item.name}><span className="legend-dot" style={{ background: item.color }} /><span>{item.name}</span><strong>{item.value}%</strong></div>)}
                  <div className="defect-insight"><AlertTriangle size={15} /><span><b>60 sản phẩm</b> cần ưu tiên xử lý trong hôm nay.</span></div>
                </div>
              </div>
            </article>

            <article className="panel activity-panel">
              <PanelTitle eyebrow="CẬP NHẬT MỚI NHẤT" title="Hoạt động gần đây" action={<button className="view-all" onClick={() => notify('Bạn đang xem tất cả hoạt động trong dữ liệu demo')}>Xem tất cả <ArrowUpRight size={14} /></button>} />
              <div className="activity-list">
                {activities.length ? activities.map((item) => <div className="activity-row" key={item.id}>
                  <div className={`activity-icon ${item.type}`}>{item.type === 'in' ? <ArrowDownLeft size={17} /> : item.type === 'out' ? <ArrowUpRight size={17} /> : <AlertTriangle size={16} />}</div>
                  <div className="activity-main"><strong>{item.title}</strong><span>{item.detail}</span><small>{item.id}</small></div>
                  <div className="activity-meta"><time>{item.time}</time><span className={`status ${item.type}`}>{item.status}</span></div>
                </div>) : <div className="empty-state"><Search size={22} /><strong>Không tìm thấy hoạt động</strong><span>Thử từ khóa khác nhé.</span></div>}
              </div>
              <div className="activity-footer"><span>Hiển thị {activities.length} trên {recentActivity.length} hoạt động</span><button onClick={handleExport}><Download size={14} /> Tải CSV</button></div>
            </article>
          </section>

          <footer className="page-footer"><span>© 2026 nexWARE · Warehouse Management System</span><span><span className="footer-status" /> Tất cả hệ thống đang hoạt động <span className="footer-separator">·</span> v1.0.0</span></footer>
        </div>
      </main>
      {toast && <div className="toast"><Check size={16} />{toast}<button onClick={() => setToast('')} aria-label="Đóng"><X size={14} /></button></div>}
    </div>
  )
}
