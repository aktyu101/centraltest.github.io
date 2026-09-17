import { useState, useMemo } from 'react'

type Grade = '1' | '2' | '3' | '4' | '5' | '인지지원'
type CopayType = '일반' | '감경(40%)' | '감경(60%)' | '기초' | '의료'

const GRADE_MONTHLY_LIMIT: Record<Grade, number> = {
  '1': 2512900,
  '2': 2331200,
  '3': 1528200,
  '4': 1409700,
  '5': 1208900,
  '인지지원': 676320,
}

const COPAY_RATES: Record<CopayType, number> = {
  '일반': 0.15,
  '감경(40%)': 0.09,
  '감경(60%)': 0.06,
  '기초': 0,
  '의료': 0.06,
}

const CARE_FEES = [
  { id: 'care_30', label: '30분 이상', fee: 17450 },
  { id: 'care_60', label: '60분 이상', fee: 25320 },
  { id: 'care_90', label: '90분 이상', fee: 34120 },
  { id: 'care_120', label: '120분 이상', fee: 43430 },
  { id: 'care_150', label: '150분 이상', fee: 50640 },
  { id: 'care_180', label: '180분 이상', fee: 57020 },
  { id: 'care_210', label: '210분 이상', fee: 63530 },
  { id: 'care_240', label: '240분 이상', fee: 70080 },
]

const BATH_FEES = [
  { id: 'bath_car_in_40', label: '차량이용 차량내 40분', fee: 71190 },
  { id: 'bath_car_in_60', label: '차량이용 차량내 60분', fee: 88990 },
  { id: 'bath_home_in_40', label: '차량이용 가정내 40분', fee: 64180 },
  { id: 'bath_home_in_60', label: '차량이용 가정내 60분', fee: 80230 },
  { id: 'bath_no_car_40', label: '차량 미이용 40분', fee: 40080 },
  { id: 'bath_no_car_60', label: '차량 미이용 60분', fee: 50100 },
]

const NURSE_FEES = [
  { id: 'nurse_15', label: '15분 이상 ~ 30분 미만', fee: 42880 },
  { id: 'nurse_30', label: '30분 이상 ~ 60분 미만', fee: 53770 },
  { id: 'nurse_60', label: '60분 이상', fee: 64690 },
]

interface Props {
  onClose: () => void
}

export default function BenefitCalculatorModal({ onClose }: Props) {
  const [year, setYear] = useState('2026')
  const [grade, setGrade] = useState<Grade>('3')
  const [copayType, setCopayType] = useState<CopayType>('일반')
  
  const [activeTab, setActiveTab] = useState<'요양' | '목욕' | '간호'>('요양')
  const [counts, setCounts] = useState<Record<string, number>>({})

  const monthlyLimit = GRADE_MONTHLY_LIMIT[grade]
  const copayRate = COPAY_RATES[copayType]

  const careTotal = useMemo(() => CARE_FEES.reduce((acc, f) => acc + (counts[f.id] || 0) * f.fee, 0), [counts])
  const bathTotal = useMemo(() => BATH_FEES.reduce((acc, f) => acc + (counts[f.id] || 0) * f.fee, 0), [counts])
  const nurseTotal = useMemo(() => NURSE_FEES.reduce((acc, f) => acc + (counts[f.id] || 0) * f.fee, 0), [counts])
  
  const estimatedCost = careTotal + bathTotal + nurseTotal

  const calcCopay = (total: number, rate: number) => Math.floor((total * rate) / 10) * 10

  const totalBaseCopay = calcCopay(careTotal, copayRate) + calcCopay(bathTotal, copayRate) + calcCopay(nurseTotal, copayRate)
  const totalCorpBase = estimatedCost - totalBaseCopay

  const maxCorpAmount = monthlyLimit - calcCopay(monthlyLimit, copayRate)
  const corpAmount = Math.min(totalCorpBase, maxCorpAmount)

  const isExceeding = estimatedCost > monthlyLimit
  const exceedingAmount = Math.max(0, estimatedCost - monthlyLimit)
  const utilizedLimit = Math.min(estimatedCost, monthlyLimit)
  
  const copayInLimit = utilizedLimit - corpAmount
  const finalCopay = copayInLimit + exceedingAmount

  const formatCurrency = (val: number) => val.toLocaleString() + '원'

  const handleCountChange = (id: string, delta: number) => {
    setCounts(prev => {
      const current = prev[id] || 0
      const next = Math.max(0, current + delta)
      return { ...prev, [id]: next }
    })
  }

  const handleCountInput = (id: string, value: string) => {
    const parsed = parseInt(value, 10)
    setCounts(prev => ({ ...prev, [id]: isNaN(parsed) ? 0 : Math.max(0, parsed) }))
  }

  const renderServiceList = (items: { id: string, label: string, fee: number }[]) => (
    <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-2">
      {items.map(item => (
        <div key={item.id} className="flex items-center justify-between p-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-[6px]">
          <div>
            <div className="text-[13px] font-bold text-[#1e293b]">{item.label}</div>
            <div className="text-[12px] text-[#64748b]">{formatCurrency(item.fee)} / 회</div>
          </div>
          <div className="flex items-center gap-2 bg-white border border-[#c2cfdf] rounded-[6px] px-1 py-1">
            <button 
              onClick={() => handleCountChange(item.id, -1)}
              className="w-6 h-6 flex items-center justify-center text-[#64748b] hover:bg-[#f1f5f9] rounded-[4px] cursor-pointer"
            >
              -
            </button>
            <input 
              type="text"
              value={counts[item.id] || ''}
              placeholder="0"
              onChange={(e) => handleCountInput(item.id, e.target.value)}
              className="w-8 text-center text-[13.5px] font-bold text-[#0e1225] bg-transparent outline-none focus:bg-[#f8fafc] rounded-[4px]"
            />
            <button 
              onClick={() => handleCountChange(item.id, 1)}
              className="w-6 h-6 flex items-center justify-center text-[#64748b] hover:bg-[#f1f5f9] rounded-[4px] cursor-pointer"
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white rounded-[16px] shadow-[0px_20px_40px_0px_rgba(0,0,0,0.1)] w-full max-w-[540px] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-[24px] py-[12px] border-b border-[#c2cfdf] shrink-0 bg-white">
          <div className="flex flex-col">
            <span className="font-['Pretendard:Bold',sans-serif] text-[17px] text-[#0e1225] tracking-[-0.34px]">재가급여 간편계산기</span>
            <span className="text-[12.5px] text-[#8a9cb4] mt-0.5 tracking-[-0.25px]">수급자 맞춤형 본인부담금 시뮬레이션</span>
          </div>
          <button onClick={onClose} className="p-[4px] rounded-[6px] hover:bg-[#f4f7fc] transition-colors cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="#8A9CB4" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col gap-5 text-[#334155]">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="block text-[12.5px] font-bold text-[#475569]">적용 년도</label>
              <select 
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full bg-[#f8fafc] border border-[#c2cfdf] rounded-[6px] px-2.5 py-1.5 text-[13.5px] text-[#0e1225] outline-none"
              >
                <option value="2026">2026년</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-[12.5px] font-bold text-[#475569]">장기요양등급 (월한도액)</label>
              <select 
                value={grade}
                onChange={(e) => setGrade(e.target.value as Grade)}
                className="w-full bg-white border border-[#c2cfdf] rounded-[6px] px-2.5 py-1.5 text-[13.5px] focus:border-[#ef5a27] focus:ring-1 focus:ring-[#ef5a27] outline-none transition-all cursor-pointer"
              >
                {(Object.keys(GRADE_MONTHLY_LIMIT) as Grade[]).map(g => (
                  <option key={g} value={g}>{g === '인지지원' ? '인지지원등급' : `${g}등급`}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-[12.5px] font-bold text-[#475569]">수급자 자격 (본인부담률)</label>
              <select 
                value={copayType}
                onChange={(e) => setCopayType(e.target.value as CopayType)}
                className="w-full bg-white border border-[#c2cfdf] rounded-[6px] px-2.5 py-1.5 text-[13.5px] focus:border-[#ef5a27] focus:ring-1 focus:ring-[#ef5a27] outline-none transition-all cursor-pointer"
              >
                {(Object.keys(COPAY_RATES) as CopayType[]).map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-[#f4f7fc] px-4 py-3 rounded-[8px] border border-[#d9e2ef]">
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-bold text-[#475569]">월 한도액 (A)</span>
              <span className="text-[15px] font-bold text-[#0e1225]">{formatCurrency(monthlyLimit)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex border-b border-[#c2cfdf]">
              {(['요양', '목욕', '간호'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 pb-2 text-[13.5px] font-bold transition-colors cursor-pointer ${
                    activeTab === tab 
                      ? 'text-[#2a3461] border-b-2 border-[#2a3461]' 
                      : 'text-[#94a3b8] hover:text-[#475569]'
                  }`}
                >
                  방문{tab}
                </button>
              ))}
            </div>
            
            <div className="mt-1">
              {activeTab === '요양' && renderServiceList(CARE_FEES)}
              {activeTab === '목욕' && renderServiceList(BATH_FEES)}
              {activeTab === '간호' && renderServiceList(NURSE_FEES)}
            </div>
          </div>

          <div className="border-t border-[#e2e8f0] pt-4 mt-1">
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between items-center px-1">
                <span className="text-[13px] font-bold text-[#475569]">월 예상 급여 이용 총액 (B)</span>
                <span className="text-[15px] font-bold text-[#0e1225]">{formatCurrency(estimatedCost)}</span>
              </div>
              <div className="flex justify-between items-center px-1 mt-1">
                <span className="text-[13px] text-[#64748b]">공단부담금</span>
                <span className="text-[13.5px] font-medium text-[#0e1225]">
                  {formatCurrency(corpAmount)}
                </span>
              </div>
              <div className="flex justify-between items-center px-1">
                <span className="text-[13px] text-[#64748b]">본인부담금 ({copayType})</span>
                <span className="text-[13.5px] font-medium text-[#0e1225]">
                  {formatCurrency(copayInLimit)}
                </span>
              </div>
              {isExceeding && (
                <div className="flex justify-between items-center px-1">
                  <span className="text-[13px] text-[#ef4444] font-medium">한도액 초과 금액 (100% 부담)</span>
                  <span className="text-[13.5px] font-bold text-[#ef4444]">
                    + {formatCurrency(exceedingAmount)}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center mt-1.5 p-3 bg-[#fff8f5] border border-[#fcd5c7] rounded-[8px]">
                <span className="text-[14.5px] font-bold text-[#ef5a27]">최종 예상 본인부담금</span>
                <span className="text-[18px] font-bold text-[#ef5a27]">
                  {formatCurrency(finalCopay)}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-[#f8fafc] border-t border-[#e2e8f0] flex justify-between items-center">
          <button
            onClick={() => setCounts({})}
            className="px-4 py-1.5 text-[13px] font-medium text-[#64748b] hover:bg-[#e2e8f0] rounded-[6px] transition-colors cursor-pointer"
          >
            초기화
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#2a3461] text-white rounded-[6px] text-[13.5px] font-bold hover:bg-[#1e2548] transition-colors cursor-pointer shadow-xs"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  )
}
