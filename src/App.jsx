import React, { useState, useCallback } from 'react'

// ─── Default values ───────────────────────────────────────────────────────────
const MARKETED_BY_DEFAULT =
  'Urban Company Limited 7th Floor, GoWorks, Plot 183, Udyog Vihar Phase 1, Gurugram, Haryana - 122008'

const CUSTOMER_CARE_DEFAULT =
  'Contact customer care officer at ucwaterpurifier@urbancompany.com, +911244577306 or reach out at Urban Company Limited, 7th floor, GoWorks, Plot 183, Udyog Vihar Phase 1, Gurugram, Haryana - 122008'

const F = '"Open Sauce One", sans-serif'

// ─── Initial form state factories ────────────────────────────────────────────
const makeInnerState = () => ({
  productName: '',
  skuCode: '',
  commodity: '',
  mrp: '',
  unitSalePrice: '',
  netQuantity: '',
  boxDimension: '',
  netWeight: '',
  grossWeight: '',
  countryOfOrigin: 'India',
  manufacturedOn: '',
  marketedBy: MARKETED_BY_DEFAULT,
  manufacturedBy: '',
  customerCare: CUSTOMER_CARE_DEFAULT,
  showNetWeight: true,
  showGrossWeight: true,
  showManufacturedOn: true,
})

const makeOuterState = () => ({
  productName: '',
  skuCode: '',
  commodity: '',
  qtyInOuterBox: '',
  innerPolybagDimensions: '',
  outerBoxDimensions: '',
  netWeight: '',
  grossWeight: '',
  countryOfOrigin: 'India',
  manufacturedOn: '',
  marketedBy: MARKETED_BY_DEFAULT,
  manufacturedBy: '',
  showManufacturedOn: true,
})

// ─── Toggle Switch ────────────────────────────────────────────────────────────
function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 ${
        checked ? 'bg-indigo-500' : 'bg-gray-300'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ${
          checked ? 'translate-x-4' : 'translate-x-0'
        }`}
      />
    </button>
  )
}

// ─── Form field ───────────────────────────────────────────────────────────────
function Field({ label, name, value, onChange, placeholder = '', multiline = false, optional = false, shown, onToggle }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          {label}
          {optional && <span className="ml-1 text-gray-400 font-normal normal-case">(optional)</span>}
        </label>
        {optional && <Toggle checked={shown} onChange={onToggle} />}
      </div>
      {(!optional || shown) && (
        multiline ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={3}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-300 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400 resize-none transition"
          />
        ) : (
          <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-300 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400 transition"
          />
        )
      )}
    </div>
  )
}

// ─── Label building blocks ────────────────────────────────────────────────────

// Each row: label name left (80px fixed) | value right (flex)
// Followed by a 0.5px #EEEEEE divider line
function LabelRow({ label, value }) {
  if (value === null || value === undefined || value === '') return null
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', paddingTop: 4, paddingBottom: 4 }}>
        <div
          style={{
            width: 80,
            minWidth: 80,
            fontSize: 5,
            fontWeight: 600,
            color: '#757575',
            lineHeight: 1.5,
            fontFamily: F,
            paddingRight: 6,
            flexShrink: 0,
          }}
        >
          {label}
        </div>
        <div
          style={{
            flex: 1,
            fontSize: 5,
            fontWeight: 400,
            color: '#757575',
            lineHeight: 1.5,
            fontFamily: F,
          }}
        >
          {value}
        </div>
      </div>
      <div style={{ height: 0.5, background: '#EEEEEE' }} />
    </div>
  )
}

function LogoBar() {
  return (
    <div
      style={{
        height: 14,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
        paddingTop: 2,
      }}
    >
      {/* NATIVE placeholder — 8h × 64w px */}
      <div
        style={{
          width: 64,
          height: 8,
          background: '#E5E7EB',
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ fontSize: 4, fontWeight: 700, color: '#9CA3AF', letterSpacing: 1, fontFamily: F }}>
          NATIVE LOGO
        </span>
      </div>

      {/* UC placeholder — 14h × 49w px */}
      <div
        style={{
          width: 49,
          height: 14,
          background: '#E5E7EB',
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ fontSize: 4, fontWeight: 700, color: '#9CA3AF', letterSpacing: 0.5, fontFamily: F }}>
          UC LOGO
        </span>
      </div>
    </div>
  )
}

// ─── Inner Label ──────────────────────────────────────────────────────────────
function InnerLabel({ data }) {
  const fields = [
    { label: 'SKU code', value: data.skuCode },
    { label: 'Commodity', value: data.commodity },
    { label: 'MRP', value: data.mrp },
    { label: 'Unit sale price', value: data.unitSalePrice },
    { label: 'Net quantity', value: data.netQuantity },
    { label: 'Packaging dimensions', value: data.boxDimension },
    ...(data.showNetWeight ? [{ label: 'Net weight', value: data.netWeight }] : []),
    ...(data.showGrossWeight ? [{ label: 'Gross weight', value: data.grossWeight }] : []),
    { label: 'Country of origin', value: data.countryOfOrigin },
    ...(data.showManufacturedOn ? [{ label: 'Manufactured on', value: data.manufacturedOn }] : []),
    { label: 'Marketed by', value: data.marketedBy },
    { label: 'Manufactured by', value: data.manufacturedBy },
    { label: 'Customer care', value: data.customerCare },
  ]

  return (
    <div
      style={{
        width: 320,
        height: 320,
        background: '#FFFFFF',
        padding: '20px 20px 16px 20px',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        fontFamily: F,
      }}
    >
      {/* Product name: Medium 14px, #757575 */}
      <div
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: '#757575',
          lineHeight: 1.3,
          marginBottom: 4,
          fontFamily: F,
          flexShrink: 0,
        }}
      >
        {data.productName || <span style={{ color: '#D1D5DB' }}>Product Name</span>}
      </div>

      {/* Divider below product name — same style as row dividers */}
      <div style={{ height: 0.5, background: '#EEEEEE' }} />

      {/* Rows */}
      <div style={{ flex: 1, overflow: 'hidden', minHeight: 0 }}>
        {fields.map(({ label, value }) => (
          <LabelRow key={label} label={label} value={value} />
        ))}
      </div>

      {/* Logo bar pinned to bottom */}
      <LogoBar />
    </div>
  )
}

// ─── Outer Label ──────────────────────────────────────────────────────────────
function OuterLabel({ data }) {
  const fields = [
    { label: 'SKU code', value: data.skuCode },
    { label: 'Commodity', value: data.commodity },
    { label: 'Quantity in outer box', value: data.qtyInOuterBox },
    { label: 'Inner polybag dimensions', value: data.innerPolybagDimensions },
    { label: 'Outer box dimensions', value: data.outerBoxDimensions },
    { label: 'Net weight', value: data.netWeight },
    { label: 'Gross weight', value: data.grossWeight },
    { label: 'Country of origin', value: data.countryOfOrigin },
    ...(data.showManufacturedOn ? [{ label: 'Manufactured on', value: data.manufacturedOn }] : []),
    { label: 'Marketed by', value: data.marketedBy },
    { label: 'Manufactured by', value: data.manufacturedBy },
  ]

  return (
    <div
      style={{
        width: 320,
        height: 320,
        background: '#FFFFFF',
        padding: '20px 20px 16px 20px',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        fontFamily: F,
      }}
    >
      <div
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: '#757575',
          lineHeight: 1.3,
          marginBottom: 4,
          fontFamily: F,
          flexShrink: 0,
        }}
      >
        {data.productName || <span style={{ color: '#D1D5DB' }}>Product Name</span>}
      </div>

      <div style={{ height: 0.5, background: '#EEEEEE' }} />

      <div style={{ flex: 1, overflow: 'hidden', minHeight: 0 }}>
        {fields.map(({ label, value }) => (
          <LabelRow key={label} label={label} value={value} />
        ))}

        {/* NOT FOR RETAIL SALE row */}
        <div>
          <div style={{ paddingTop: 4, paddingBottom: 4 }}>
            <span style={{ fontSize: 5, fontWeight: 600, color: '#757575', fontFamily: F }}>
              NOT FOR RETAIL SALE
            </span>
          </div>
          <div style={{ height: 0.5, background: '#EEEEEE' }} />
        </div>
      </div>

      <LogoBar />
    </div>
  )
}

// ─── SVG Export ───────────────────────────────────────────────────────────────
function generateSVGExport(labelRef) {
  if (!labelRef.current) return
  const html = labelRef.current.outerHTML
  const fontFaceStyle = `
    <style>
      @font-face { font-family:'Open Sauce One'; src:url('/fonts/OpenSauceOne-Regular.woff2') format('woff2'); font-weight:400; }
      @font-face { font-family:'Open Sauce One'; src:url('/fonts/OpenSauceOne-Medium.woff2') format('woff2'); font-weight:500; }
      @font-face { font-family:'Open Sauce One'; src:url('/fonts/OpenSauceOne-SemiBold.woff2') format('woff2'); font-weight:600; }
      * { box-sizing:border-box; }
    </style>`
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320">
  <defs>${fontFaceStyle}</defs>
  <foreignObject width="320" height="320">
    <div xmlns="http://www.w3.org/1999/xhtml">${html}</div>
  </foreignObject>
</svg>`
  const blob = new Blob([svg], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'label.svg'
  a.click()
  URL.revokeObjectURL(url)
}

// ─── Inner Form ───────────────────────────────────────────────────────────────
function InnerForm({ data, onChange }) {
  const h = (e) => onChange({ ...data, [e.target.name]: e.target.value })
  const t = (key) => (val) => onChange({ ...data, [key]: val })
  return (
    <div className="flex flex-col gap-4">
      <Field label="Product Name" name="productName" value={data.productName} onChange={h} placeholder="e.g. Flow Restrictor 300" />
      <Field label="SKU Code" name="skuCode" value={data.skuCode} onChange={h} placeholder="e.g. UC-NATIVE-75300" />
      <Field label="Commodity" name="commodity" value={data.commodity} onChange={h} placeholder="e.g. Water Purifier Spare Part" />
      <Field label="MRP" name="mrp" value={data.mrp} onChange={h} placeholder="e.g. ₹499 (incl. of all taxes)" />
      <Field label="Unit Sale Price" name="unitSalePrice" value={data.unitSalePrice} onChange={h} placeholder="e.g. ₹399" />
      <Field label="Net Quantity" name="netQuantity" value={data.netQuantity} onChange={h} placeholder="e.g. 1 Unit" />
      <Field label="Packaging Dimensions" name="boxDimension" value={data.boxDimension} onChange={h} placeholder="e.g. 120 × 200 mm" />
      <Field label="Net Weight" name="netWeight" value={data.netWeight} onChange={h} placeholder="e.g. 20 g" optional shown={data.showNetWeight} onToggle={t('showNetWeight')} />
      <Field label="Gross Weight" name="grossWeight" value={data.grossWeight} onChange={h} placeholder="e.g. 22 g" optional shown={data.showGrossWeight} onToggle={t('showGrossWeight')} />
      <Field label="Country of Origin" name="countryOfOrigin" value={data.countryOfOrigin} onChange={h} />
      <Field label="Manufactured On" name="manufacturedOn" value={data.manufacturedOn} onChange={h} placeholder="e.g. Jan 2024" optional shown={data.showManufacturedOn} onToggle={t('showManufacturedOn')} />
      <Field label="Marketed By" name="marketedBy" value={data.marketedBy} onChange={h} multiline />
      <Field label="Manufactured By" name="manufacturedBy" value={data.manufacturedBy} onChange={h} multiline placeholder="Manufacturer name and address" />
      <Field label="Customer Care" name="customerCare" value={data.customerCare} onChange={h} multiline />
    </div>
  )
}

// ─── Outer Form ───────────────────────────────────────────────────────────────
function OuterForm({ data, onChange }) {
  const h = (e) => onChange({ ...data, [e.target.name]: e.target.value })
  const t = (key) => (val) => onChange({ ...data, [key]: val })
  return (
    <div className="flex flex-col gap-4">
      <Field label="Product Name" name="productName" value={data.productName} onChange={h} placeholder="e.g. Flow Restrictor 300" />
      <Field label="SKU Code" name="skuCode" value={data.skuCode} onChange={h} placeholder="e.g. UC-NATIVE-75300" />
      <Field label="Commodity" name="commodity" value={data.commodity} onChange={h} placeholder="e.g. Water Purifier Spare Part" />
      <Field label="Quantity in Outer Box" name="qtyInOuterBox" value={data.qtyInOuterBox} onChange={h} placeholder="e.g. 12" />
      <Field label="Inner Polybag Dimensions" name="innerPolybagDimensions" value={data.innerPolybagDimensions} onChange={h} placeholder="e.g. 200×150mm" />
      <Field label="Outer Box Dimensions" name="outerBoxDimensions" value={data.outerBoxDimensions} onChange={h} placeholder="e.g. 400×300×250mm" />
      <Field label="Net Weight" name="netWeight" value={data.netWeight} onChange={h} placeholder="e.g. 3 kg" />
      <Field label="Gross Weight" name="grossWeight" value={data.grossWeight} onChange={h} placeholder="e.g. 3.5 kg" />
      <Field label="Country of Origin" name="countryOfOrigin" value={data.countryOfOrigin} onChange={h} />
      <Field label="Manufactured On" name="manufacturedOn" value={data.manufacturedOn} onChange={h} placeholder="e.g. Jan 2024" optional shown={data.showManufacturedOn} onToggle={t('showManufacturedOn')} />
      <Field label="Marketed By" name="marketedBy" value={data.marketedBy} onChange={h} multiline />
      <Field label="Manufactured By" name="manufacturedBy" value={data.manufacturedBy} onChange={h} multiline placeholder="Manufacturer name and address" />
    </div>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [labelType, setLabelType] = useState('inner')
  const [innerData, setInnerData] = useState(makeInnerState)
  const [outerData, setOuterData] = useState(makeOuterState)
  const labelRef = React.useRef(null)
  const isInner = labelType === 'inner'
  const handleExport = useCallback(() => generateSVGExport(labelRef), [])

  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F5F0]" style={{ fontFamily: F }}>

      {/* ── Left panel ── */}
      <aside className="w-[380px] flex-shrink-0 flex flex-col border-r border-gray-200 bg-white overflow-hidden">
        <div className="px-6 pt-6 pb-4 border-b border-gray-100">
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Label Maker</h1>
          <p className="text-xs text-gray-400 mt-0.5">Native × Urban Company</p>
          <div className="mt-4 flex rounded-xl overflow-hidden border border-gray-200 bg-gray-50 p-1 gap-1">
            {['inner', 'outer'].map((type) => (
              <button
                key={type}
                onClick={() => setLabelType(type)}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-200 ${
                  labelType === type
                    ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-gray-200'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {type === 'inner' ? 'Inner LM' : 'Outer LM'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {isInner
            ? <InnerForm data={innerData} onChange={setInnerData} />
            : <OuterForm data={outerData} onChange={setOuterData} />
          }
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex gap-2">
          <button
            onClick={() => isInner ? setInnerData(makeInnerState()) : setOuterData(makeOuterState())}
            className="flex-1 py-2.5 text-xs font-semibold text-gray-500 rounded-xl border border-gray-200 hover:border-gray-300 hover:text-gray-700 transition"
          >
            Reset
          </button>
          <button
            onClick={handleExport}
            className="flex-1 py-2.5 text-xs font-semibold text-white rounded-xl bg-indigo-500 hover:bg-indigo-600 transition"
          >
            Export SVG
          </button>
        </div>
      </aside>

      {/* ── Right panel ── */}
      <main className="flex-1 flex items-center justify-center overflow-auto p-10">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="px-2.5 py-1 rounded-full bg-white border border-gray-200 font-medium">320 × 320 px</span>
            <span>→</span>
            <span className="px-2.5 py-1 rounded-full bg-white border border-gray-200 font-medium">80 × 80 mm (print)</span>
            <span className="px-2.5 py-1 rounded-full bg-white border border-gray-200 font-medium capitalize text-indigo-500">
              {isInner ? 'Inner LM' : 'Outer LM'}
            </span>
          </div>

          <div
            style={{
              width: 320,
              height: 320,
              boxShadow: '0 0 0 1.5px #CBD5E1, 0 4px 24px 0 rgba(0,0,0,0.08)',
              borderRadius: 2,
              overflow: 'hidden',
              background: '#FFFFFF',
              outline: '2px dashed #CBD5E1',
              outlineOffset: 4,
            }}
            ref={labelRef}
          >
            {isInner ? <InnerLabel data={innerData} /> : <OuterLabel data={outerData} />}
          </div>

          <p className="text-xs text-gray-400 mt-1">Dashed border represents physical sticker edge</p>
        </div>
      </main>
    </div>
  )
}
