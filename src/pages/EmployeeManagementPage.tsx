import { useState } from 'react'
import DatePickerModal from '../components/DatePickerModal'

// ─── Types & Models ──────────────────────────────────────────────────────────

export type WorkStatus = '재직' | '휴직' | '보류' | '퇴직'
export type JobType =
  | '요양보호사'
  | '사회복지사'
  | '간호사'
  | '간호조무사'
  | '물리치료사'
  | '시설장'
  | '프로그램 관리자'
  | '조리원'
  | '사무원'

export interface SalaryItem {
  name: string
  taxType: '과세' | '비과세'
  amount: number
}

export interface DeductionItem {
  name: string
  amount: number
}

export interface CareerHistoryItem {
  id: string
  seq: number
  type: string // '최초입사일' | '퇴직' | '휴직' | '보류' | '재입사' | '직무변경'
  date: string // YYYY-MM-DD
  reason: string // 비고 / 변경 사유
  syncStatus?: '희' | '미연동'
}

export interface Employee {
  id: string
  name: string
  gender: '남' | '여'
  dob: string
  status: WorkStatus
  job: JobType
  hireDate: string
  retireDate: string | null
  syncStatus: '희' | '미연동'
  phone: string
  smsConsent: boolean
  email: string
  emailConsent: boolean
  zipCode?: string
  address: string
  addressDetail?: string
  photo: string | null
  // 동기화 옵션 플래그
  syncJobWithLtc: boolean
  syncPhoneWithLtc: boolean
  syncEmailWithLtc: boolean
  syncAddressWithLtc: boolean
  // 재직 이력 목록
  careerHistory: CareerHistoryItem[]
  // 급여계약 정보
  contractPeriod: string
  salaryType: '월급제' | '시급제' | '일급제'
  dependentsCount: number
  minorCount: number
  hourlyWage: number
  bankName?: string
  accountNumber?: string
  accountHolder?: string
  salaryItems: SalaryItem[]
  deductionItems: DeductionItem[]
  // 4대보험 정보
  pension: boolean
  health: boolean
  employment: boolean
  employmentUnemployment: boolean // 실업급여 적용 여부
  workComp: boolean
}

// ─── Initial Mock Data ───────────────────────────────────────────────────────

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'EMP-001',
    name: '홍길동',
    gender: '여',
    dob: '1949.03.06',
    status: '재직',
    job: '요양보호사',
    hireDate: '2020-03-01',
    retireDate: null,
    syncStatus: '희',
    phone: '010-3245-8912',
    smsConsent: true,
    email: 'hong.gd@example.com',
    emailConsent: true,
    zipCode: '01789',
    address: '서울특별시 노원구 동일로 1234',
    addressDetail: '102동 304호',
    photo: null,
    syncJobWithLtc: true,
    syncPhoneWithLtc: true,
    syncEmailWithLtc: true,
    syncAddressWithLtc: true,
    careerHistory: [
      {
        id: 'CH-001',
        seq: 1,
        type: '최초입사일',
        date: '2020-03-01',
        reason: '센트럴케어 신규 채용',
        syncStatus: '희',
      },
    ],
    contractPeriod: '2025.01.01 ~ 2025.12.31',
    salaryType: '월급제',
    dependentsCount: 2,
    minorCount: 1,
    hourlyWage: 10320,
    bankName: '국민은행',
    accountNumber: '123-456-789012',
    accountHolder: '홍길동',
    salaryItems: [
      { name: '기본급', taxType: '과세', amount: 1850000 },
      { name: '주휴수당', taxType: '과세', amount: 0 },
      { name: '처우개선비', taxType: '과세', amount: 150000 },
      { name: '휴일근로수당', taxType: '과세', amount: 0 },
      { name: '장기근속수당', taxType: '과세', amount: 50000 },
      { name: '요양보호사 보수교육비', taxType: '비과세', amount: 0 },
      { name: '식대', taxType: '비과세', amount: 100000 },
      { name: '자가운전보조금', taxType: '비과세', amount: 100000 },
    ],
    deductionItems: [
      { name: '국민연금', amount: 85500 },
      { name: '건강보험', amount: 67350 },
      { name: '장기요양보험', amount: 8720 },
      { name: '고용보험', amount: 17100 },
      { name: '소득세', amount: 15400 },
      { name: '지방소득세', amount: 1540 },
    ],
    pension: true,
    health: true,
    employment: true,
    employmentUnemployment: false, // 만 65세 이상 취득
    workComp: true,
  },
  {
    id: 'EMP-002',
    name: '김민수',
    gender: '남',
    dob: '1962.08.14',
    status: '재직',
    job: '사회복지사',
    hireDate: '2021-05-10',
    retireDate: null,
    syncStatus: '희',
    phone: '010-8877-2211',
    smsConsent: true,
    email: 'mskim@care.or.kr',
    emailConsent: true,
    zipCode: '01345',
    address: '서울특별시 도봉구 도봉로 55',
    addressDetail: '301호',
    photo: null,
    syncJobWithLtc: true,
    syncPhoneWithLtc: true,
    syncEmailWithLtc: true,
    syncAddressWithLtc: true,
    careerHistory: [
      {
        id: 'CH-002',
        seq: 1,
        type: '최초입사일',
        date: '2021-05-10',
        reason: '사회복지사 정규 채용',
        syncStatus: '희',
      },
    ],
    contractPeriod: '2025.01.01 ~ 2025.12.31',
    salaryType: '월급제',
    dependentsCount: 3,
    minorCount: 2,
    hourlyWage: 12500,
    bankName: '신한은행',
    accountNumber: '110-222-334455',
    accountHolder: '김민수',
    salaryItems: [
      { name: '기본급', taxType: '과세', amount: 2200000 },
      { name: '주휴수당', taxType: '과세', amount: 0 },
      { name: '기타수당', taxType: '과세', amount: 100000 },
      { name: '연차수당', taxType: '과세', amount: 80000 },
      { name: '식대', taxType: '비과세', amount: 150000 },
    ],
    deductionItems: [
      { name: '국민연금', amount: 105000 },
      { name: '건강보험', amount: 82000 },
      { name: '장기요양보험', amount: 10600 },
      { name: '고용보험', amount: 21000 },
      { name: '소득세', amount: 22000 },
      { name: '지방소득세', amount: 2200 },
    ],
    pension: true,
    health: true,
    employment: true,
    employmentUnemployment: true,
    workComp: true,
  },
  {
    id: 'EMP-003',
    name: '한소희',
    gender: '여',
    dob: '1975.11.23',
    status: '재직',
    job: '간호사',
    hireDate: '2019-11-01',
    retireDate: null,
    syncStatus: '희',
    phone: '010-5544-3322',
    smsConsent: true,
    email: 'shhan@health.kr',
    emailConsent: true,
    zipCode: '11782',
    address: '경기도 의정부시 평화로 210',
    addressDetail: '105동 801호',
    photo: null,
    syncJobWithLtc: true,
    syncPhoneWithLtc: true,
    syncEmailWithLtc: true,
    syncAddressWithLtc: true,
    careerHistory: [
      {
        id: 'CH-003',
        seq: 1,
        type: '최초입사일',
        date: '2019-11-01',
        reason: '간호사 정규 채용',
        syncStatus: '희',
      },
    ],
    contractPeriod: '2025.01.01 ~ 2025.12.31',
    salaryType: '월급제',
    dependentsCount: 1,
    minorCount: 0,
    hourlyWage: 14500,
    bankName: '하나은행',
    accountNumber: '332-910-123456',
    accountHolder: '한소희',
    salaryItems: [
      { name: '기본급', taxType: '과세', amount: 2500000 },
      { name: '기타수당', taxType: '과세', amount: 150000 },
      { name: '식대', taxType: '비과세', amount: 150000 },
    ],
    deductionItems: [
      { name: '국민연금', amount: 120000 },
      { name: '건강보험', amount: 95000 },
      { name: '장기요양보험', amount: 12300 },
      { name: '고용보험', amount: 24000 },
      { name: '소득세', amount: 35000 },
      { name: '지방소득세', amount: 3500 },
    ],
    pension: true,
    health: true,
    employment: true,
    employmentUnemployment: true,
    workComp: true,
  },
]

// ─── Utilities ───────────────────────────────────────────────────────────────

function formatCurrency(n: number) {
  return n.toLocaleString('ko-KR') + '원'
}

function calcAge(dobStr: string) {
  const parts = dobStr.split(/[.\-/]/)
  if (parts.length < 3) return 0
  const birthYear = parseInt(parts[0], 10)
  const currentYear = new Date().getFullYear()
  return currentYear - birthYear
}

const STATUS_BADGE_STYLE: Record<WorkStatus, string> = {
  재직: 'bg-[#e8f8ed] text-[#1c9640] border-[#c6f0d2]',
  휴직: 'bg-[#fff7ed] text-[#ea580c] border-[#fed7aa]',
  보류: 'bg-[#fefce8] text-[#ca8a04] border-[#fef08a]',
  퇴직: 'bg-[#f1f5f9] text-[#64748b] border-[#cbd5e1]',
}

const SYNC_BADGE_STYLE: Record<string, string> = {
  최신: 'bg-[#0093a9] text-white',
  회동: 'bg-[#2a3461] text-white',
  미연동: 'bg-[#94a3b8] text-white',
}

// ─── Figma 1:1 재직 상태 관리 (퇴사/휴직/보류) 모달 (Node 2589-30921) ───────────

function formatDateString(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function TenureStatusModal({
  employee,
  onSave,
  onClose,
}: {
  employee: Employee
  onSave: (status: WorkStatus, date: string, reason: string) => void
  onClose: () => void
}) {
  const age = calcAge(employee.dob)
  const todayStr = formatDateString(new Date())

  const [targetDate, setTargetDate] = useState(employee.retireDate || todayStr)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [status, setStatus] = useState<WorkStatus>(
    employee.status === '재직' ? '퇴직' : employee.status
  )
  const [reason, setReason] = useState(
    status === '퇴직' ? '개인사정으로 인한 퇴직' : ''
  )

  function handleSubmit() {
    if (!targetDate) {
      alert('적용 일자를 입력해 주세요.')
      return
    }
    onSave(status, targetDate, reason)
  }

  return (
    <div className="fixed inset-0 z-[75] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative bg-white rounded-[16px] shadow-[0px_20px_50px_rgba(0,0,0,0.2)] w-full max-w-[480px] flex flex-col overflow-hidden border border-[#c2cfdf] animate-in fade-in zoom-in-95 duration-200">
        {/* 1. Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#c2cfdf] bg-white shrink-0">
          <span className="font-bold text-[17px] text-[#0e1225] tracking-tight">재직 상태 관리</span>
          <button
            onClick={onClose}
            className="p-1 rounded-[6px] text-[#8a9cb4] hover:text-[#0e1225] hover:bg-[#f1f5f9] transition-colors cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 2. Target Employee Summary Bar */}
        <div className="px-5 py-2.5 bg-[#f8fafc] border-b border-[#c2cfdf] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span
              className={`w-[22px] h-[22px] rounded-[6px] flex items-center justify-center font-bold text-[13px] leading-none shrink-0 ${employee.gender === '여' ? 'bg-[#fdf2f8] text-[#e11d48]' : 'bg-[#eff6ff] text-[#2563eb]'
                }`}
            >
              {employee.gender === '여' ? '♀' : '♂'}
            </span>
            <span className="text-[16px] font-bold text-[#0e1225] tracking-tight ml-0.5">{employee.name}</span>
            <span className="text-[13px] text-[#64748b] font-normal">
              {employee.dob} ({age}세)
            </span>
          </div>
          <span className="px-2.5 py-1 bg-[#eef2f8] text-[#334155] rounded-[4px] text-[12px] font-semibold border border-[#d8e2ee]">
            {employee.job}
          </span>
        </div>

        {/* 3. Form Body */}
        <div className="p-5 flex flex-col gap-4 text-[13px]">
          {/* 적용 일자 (디자인 시스템 전용 달력 모달 연동) */}
          <div className="flex flex-col gap-1.5">
            <label className="font-bold text-[#0e1225] flex items-center gap-1">
              적용 일자 <span className="text-[#ef5a27]">*</span>
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                readOnly
                value={targetDate}
                onClick={() => setIsDatePickerOpen(true)}
                placeholder="YYYY-MM-DD"
                className="w-full h-[38px] border border-[#c2cfdf] rounded-[6px] pl-3 pr-10 text-[13px] text-[#0e1225] bg-white cursor-pointer focus:outline-none focus:border-[#2a3461]"
              />
              <button
                type="button"
                onClick={() => setIsDatePickerOpen(true)}
                className="absolute right-2 p-1 text-[#64748b] hover:text-[#2a3461] transition-colors cursor-pointer"
                title="달력 선택"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </button>
            </div>
          </div>

          {/* 상태 선택 */}
          <div className="flex flex-col gap-1.5">
            <label className="font-bold text-[#0e1225] flex items-center gap-1">
              상태 <span className="text-[#ef5a27]">*</span>
            </label>
            <div className="flex items-center gap-6 py-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="radio"
                  name="workStatus"
                  value="휴직"
                  checked={status === '휴직'}
                  onChange={() => setStatus('휴직')}
                  className="accent-[#2a3461] w-4 h-4 cursor-pointer"
                />
                <span className="text-[13.5px] font-medium text-[#0e1225]">휴직</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="radio"
                  name="workStatus"
                  value="퇴직"
                  checked={status === '퇴직'}
                  onChange={() => setStatus('퇴직')}
                  className="accent-[#2a3461] w-4 h-4 cursor-pointer"
                />
                <span className="text-[13.5px] font-medium text-[#0e1225]">퇴직</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="radio"
                  name="workStatus"
                  value="보류"
                  checked={status === '보류'}
                  onChange={() => setStatus('보류')}
                  className="accent-[#2a3461] w-4 h-4 cursor-pointer"
                />
                <span className="text-[13.5px] font-medium text-[#0e1225]">보류</span>
              </label>
            </div>
          </div>

          {/* 비고 (변경사유) */}
          <div className="flex flex-col gap-1.5">
            <label className="font-bold text-[#0e1225]">비고 (변경사유)</label>
            <textarea
              value={reason}
              onChange={e => setReason(e.target.value)}
              rows={3}
              placeholder="상태 변경 사유를 입력하세요 (예: 개인사정으로 인한 퇴직, 출산휴가 등)"
              className="w-full border border-[#c2cfdf] rounded-[6px] p-3 text-[13px] text-[#0e1225] bg-white focus:outline-none focus:border-[#2a3461] resize-none placeholder:text-[#94a3b8]"
            />
          </div>

          {/* 주의사항 안내 박스 (Figma 노란색 경고박스 1:1) */}
          <div className="p-3 bg-[#fffbeb] border border-[#fef3c7] rounded-[8px] flex flex-col gap-1.5 text-[12px] text-[#92400e]">
            <div className="flex items-start gap-1.5">
              <span className="font-bold leading-tight">⚠️</span>
              <span className="leading-tight">퇴사일은 마지막 근무일의 <span className="font-bold underline">다음 날</span>로 선택해 주세요.</span>
            </div>
            <div className="flex items-start gap-1.5">
              <span className="font-bold leading-tight">⚠️</span>
              <span className="leading-tight">퇴사 처리 시 퇴사일 00:00부터 센트럴케어 이용이 제한됩니다.</span>
            </div>
          </div>
        </div>

        {/* 4. Modal Footer */}
        <div className="px-5 py-3.5 border-t border-[#c2cfdf] bg-[#fafbfc] flex items-center justify-end gap-2 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="h-[36px] px-4 border border-[#c2cfdf] rounded-[8px] text-[13px] font-semibold text-[#475569] hover:bg-[#f1f5f9] transition-colors cursor-pointer"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="h-[36px] px-5 bg-[#2a3461] text-white rounded-[8px] text-[13px] font-bold hover:bg-[#364275] transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            저장
          </button>
        </div>
      </div>

      {/* ─── 디자인 시스템 전용 달력 모달 ─── */}
      <DatePickerModal
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        selectedDate={targetDate ? new Date(targetDate) : new Date()}
        onSelectDate={d => {
          setTargetDate(formatDateString(d))
          setIsDatePickerOpen(false)
        }}
        title="적용 일자 선택"
      />
    </div>
  )
}

// ─── 수정 이력 팝업 모달 ──────────────────────────────────────────────────────

function CareerAuditModal({
  employee,
  onClose,
}: {
  employee: Employee
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 z-[75] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity" onClick={onClose} />
      <div className="relative bg-white rounded-[16px] shadow-[0px_20px_50px_rgba(0,0,0,0.2)] w-full max-w-[560px] flex flex-col overflow-hidden border border-[#c2cfdf] animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#c2cfdf] bg-white shrink-0">
          <span className="font-bold text-[17px] text-[#0e1225] tracking-tight">{employee.name} 종사자 이력 변경 로그</span>
          <button onClick={onClose} className="p-1 rounded-[6px] text-[#8a9cb4] hover:text-[#0e1225]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-5 flex flex-col gap-3 text-[13px] max-h-[60vh] overflow-y-auto">
          <div className="border border-[#c2cfdf] rounded-[6px] overflow-hidden">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className="bg-[#f4f7fc] border-b border-[#c2cfdf] text-[#334155] font-bold">
                  <th className="px-3 py-2 text-left border-r border-[#c2cfdf]">일자</th>
                  <th className="px-3 py-2 text-left border-r border-[#c2cfdf]">구분</th>
                  <th className="px-3 py-2 text-left border-r border-[#c2cfdf]">내용</th>
                  <th className="px-3 py-2 text-center">처리자</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0]">
                {employee.careerHistory.map(item => (
                  <tr key={item.id} className="hover:bg-[#f8fafc]">
                    <td className="px-3 py-2 font-mono text-[#0e1225] border-r border-[#c2cfdf]">{item.date}</td>
                    <td className="px-3 py-2 font-semibold text-[#2a3461] border-r border-[#c2cfdf]">{item.type}</td>
                    <td className="px-3 py-2 text-[#334155] border-r border-[#c2cfdf]">{item.reason || '-'}</td>
                    <td className="px-3 py-2 text-center text-[#64748b]">관리자</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="px-5 py-3.5 border-t border-[#c2cfdf] bg-[#fafbfc] flex justify-end">
          <button onClick={onClose} className="h-[36px] px-5 bg-[#1e293b] text-white rounded-[8px] text-[13px] font-bold hover:bg-[#334155] cursor-pointer">
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Figma 1:1 재직 이력 등록 / 수정 팝업 모달 (앞/뒤 상태 교차 검증 엔진 탑재) ───────

const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  최초입사일: ['휴직', '퇴직'],
  재직: ['휴직', '퇴직'],
  퇴직: ['재입사', '보류'],
  휴직: ['재입사', '퇴직', '보류'],
  보류: ['재입사', '퇴직', '휴직'],
  재입사: ['퇴직', '휴직', '보류'],
}

const ALL_CAREER_STATUSES = ['휴직', '퇴직', '재입사', '보류']

const STATUS_COLOR_MAP: Record<string, { bg: string; text: string; border: string }> = {
  최초입사일: { bg: 'bg-[#e8f8ed]', text: 'text-[#1c9640]', border: 'border-[#c6f0d2]' },
  재직: { bg: 'bg-[#e8f8ed]', text: 'text-[#1c9640]', border: 'border-[#c6f0d2]' },
  재입사: { bg: 'bg-[#eff6ff]', text: 'text-[#2563eb]', border: 'border-[#bfdbfe]' },
  휴직: { bg: 'bg-[#fff7ed]', text: 'text-[#ea580c]', border: 'border-[#fed7aa]' },
  보류: { bg: 'bg-[#fefce8]', text: 'text-[#ca8a04]', border: 'border-[#fef08a]' },
  퇴직: { bg: 'bg-[#f1f5f9]', text: 'text-[#64748b]', border: 'border-[#cbd5e1]' },
}

function CareerHistoryEditModal({
  employee,
  initialItem,
  initialInsertAfterId,
  onSave,
  onClose,
}: {
  employee: Employee
  initialItem?: CareerHistoryItem | null
  initialInsertAfterId?: string | null
  onSave: (date: string, type: string, reason: string) => void
  onClose: () => void
}) {
  const age = calcAge(employee.dob)
  const isEdit = !!(initialItem && initialItem.id)

  // 1. 기존 이력 정렬 목록 (수정 중인 항목 제외)
  const existingList = [...(employee.careerHistory || [])]
    .filter(h => (!isEdit ? true : h.id !== initialItem?.id))
    .sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date)
      return (a.seq ?? 0) - (b.seq ?? 0)
    })

  // 2. 삽입 위치 슬롯 (0: 1번 이력 뒤, ..., existingList.length: 맨 뒤)
  const defaultSlotIndex = () => {
    if (isEdit && initialItem) {
      // 수정인 경우 기존 위치 기준
      const idx = existingList.findIndex(h => h.date >= initialItem.date)
      return idx === -1 ? existingList.length : idx
    }
    if (initialInsertAfterId) {
      const idx = existingList.findIndex(h => h.id === initialInsertAfterId)
      return idx === -1 ? existingList.length : idx + 1
    }
    return existingList.length
  }

  const [slotIndex, setSlotIndex] = useState<number>(defaultSlotIndex)
  const [reason, setReason] = useState(initialItem?.reason || '')

  // 앞 이력 & 뒤 이력 탐색
  const prevItem = slotIndex > 0 ? existingList[slotIndex - 1] : existingList[0] || null
  const nextItem = slotIndex < existingList.length ? existingList[slotIndex] : null

  const prevStatus = prevItem ? prevItem.type : '재직'
  const nextStatus = nextItem ? nextItem.type : null

  // 3. 앞/뒤 상태 교차 검증 (Double-Bounded Transition Logic)
  // S_from: prevStatus에서 전이 가능한 상태들
  const fromAllowed = ALLOWED_TRANSITIONS[prevStatus] || ALL_CAREER_STATUSES
  // S_to: 신규 상태 X에서 nextStatus로 전이 가능한 X의 집합
  const toAllowed = nextStatus
    ? ALL_CAREER_STATUSES.filter(candidate => (ALLOWED_TRANSITIONS[candidate] || []).includes(nextStatus))
    : ALL_CAREER_STATUSES

  // 교집합 (S_valid = S_from ∩ S_to)
  const validCandidateStatuses = fromAllowed.filter(st => toAllowed.includes(st))

  // 기본 일자 설정
  const defaultDateStr = () => {
    if (initialItem?.date) return initialItem.date
    if (prevItem && nextItem) {
      // 앞/뒤 중간 날짜 또는 앞 날짜
      return prevItem.date
    }
    if (prevItem) return prevItem.date
    return formatDateString(new Date())
  }

  const [date, setDate] = useState<string>(defaultDateStr)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  // 선택된 상태
  const [type, setType] = useState<string>(() => {
    if (initialItem?.type && validCandidateStatuses.includes(initialItem.type)) {
      return initialItem.type
    }
    return validCandidateStatuses[0] || fromAllowed[0] || '휴직'
  })

  // 슬롯 변경 시 앞/뒤 재계산 및 유효 상태 자동 보정
  const handleSlotChange = (newSlot: number) => {
    setSlotIndex(newSlot)
    const p = newSlot > 0 ? existingList[newSlot - 1] : existingList[0] || null
    const n = newSlot < existingList.length ? existingList[newSlot] : null

    const pStat = p ? p.type : '재직'
    const nStat = n ? n.type : null

    const fAllow = ALLOWED_TRANSITIONS[pStat] || ALL_CAREER_STATUSES
    const tAllow = nStat
      ? ALL_CAREER_STATUSES.filter(c => (ALLOWED_TRANSITIONS[c] || []).includes(nStat))
      : ALL_CAREER_STATUSES
    const vCandidates = fAllow.filter(st => tAllow.includes(st))

    if (!vCandidates.includes(type)) {
      setType(vCandidates[0] || fAllow[0] || '휴직')
    }

    // 날짜도 해당 슬롯 범위로 가이드
    if (p && date < p.date) {
      setDate(p.date)
    } else if (n && date > n.date) {
      setDate(n.date)
    }
  }

  function handleSubmit() {
    if (!date) {
      alert('적용 일자를 입력해 주세요.')
      return
    }
    if (prevItem && date < prevItem.date) {
      alert(`적용 일자는 앞선 이력 일자(${prevItem.date})보다 이전일 수 없습니다.`)
      return
    }
    if (nextItem && date > nextItem.date) {
      alert(`적용 일자는 뒷선 이력 일자(${nextItem.date})보다 이후일 수 없습니다.`)
      return
    }
    if (!type) {
      alert('직원 상태를 선택해 주세요.')
      return
    }
    onSave(date, type, reason)
  }

  return (
    <div className="fixed inset-0 z-[75] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity" onClick={onClose} />
      <div className="relative bg-white rounded-[16px] shadow-[0px_20px_50px_rgba(0,0,0,0.2)] w-full max-w-[500px] flex flex-col overflow-hidden border border-[#c2cfdf] animate-in fade-in zoom-in-95 duration-200">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#c2cfdf] bg-white shrink-0">
          <span className="font-bold text-[17px] text-[#0e1225] tracking-tight">
            {isEdit ? '재직 이력 수정' : '재직 이력 등록'}
          </span>
          <button onClick={onClose} className="p-1 rounded-[6px] text-[#8a9cb4] hover:text-[#0e1225] cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 대상자 요약 바 */}
        <div className="px-5 py-2.5 bg-[#f8fafc] border-b border-[#c2cfdf] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span
              className={`w-[22px] h-[22px] rounded-[6px] flex items-center justify-center font-bold text-[13px] leading-none shrink-0 ${
                employee.gender === '여' ? 'bg-[#fdf2f8] text-[#e11d48]' : 'bg-[#eff6ff] text-[#2563eb]'
              }`}
            >
              {employee.gender === '여' ? '♀' : '♂'}
            </span>
            <span className="text-[16px] font-bold text-[#0e1225] tracking-tight">{employee.name}</span>
            <span className="text-[13px] text-[#64748b]">
              {employee.dob} ({age}세)
            </span>
          </div>
          <span className="px-2.5 py-1 bg-[#eef2f8] text-[#334155] rounded-[4px] text-[12px] font-semibold border border-[#d8e2ee]">
            {employee.job}
          </span>
        </div>

        {/* 폼 본문 */}
        <div className="p-5 flex flex-col gap-4 text-[13px] max-h-[70vh] overflow-y-auto">
          {/* 1. 어느 이력 사이에 추가할지 (삽입 위치 슬롯 선택) */}
          {!isEdit && existingList.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-[#0e1225] flex items-center gap-1">
                이력 삽입 위치 <span className="text-[#ef5a27]">*</span>
              </label>
              <select
                value={slotIndex}
                onChange={e => handleSlotChange(parseInt(e.target.value, 10))}
                className="h-[38px] w-full border border-[#c2cfdf] rounded-[6px] px-3 text-[13px] text-[#0e1225] bg-white focus:outline-none focus:border-[#2a3461] cursor-pointer"
              >
                {existingList.map((h, idx) => (
                  <option key={h.id || idx} value={idx + 1}>
                    {idx + 1}번 [{h.type} : {h.date}] 다음 위치에 추가
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* 2. 앞/뒤 상태 흐름 시각화 카드 */}
          <div className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-[8px] flex flex-col gap-1.5">
            <span className="text-[11px] font-bold text-[#64748b]">앞 / 뒤 상태 전이 검증 흐름:</span>
            <div className="flex items-center justify-between gap-1 text-[12px] pt-0.5">
              {/* 앞선 상태 */}
              <div className="flex-1 bg-white border border-[#cbd5e1] rounded-[6px] p-2 flex flex-col items-center text-center">
                <span className="text-[10.5px] text-[#64748b]">앞선 이력</span>
                <span className="font-bold text-[#0e1225]">{prevStatus}</span>
                <span className="text-[10px] text-[#94a3b8] font-mono">{prevItem?.date || '-'}</span>
              </div>

              {/* 연결 화살표 */}
              <div className="flex flex-col items-center px-1">
                <span className="text-[#2a3461] font-bold">➔</span>
              </div>

              {/* 신규 선택 상태 */}
              <div className="flex-1 bg-[#f0f4fa] border-2 border-[#2a3461] rounded-[6px] p-2 flex flex-col items-center text-center shadow-xs">
                <span className="text-[10.5px] text-[#2a3461] font-semibold">신규 추가</span>
                <span className="font-bold text-[#2a3461]">{type}</span>
                <span className="text-[10px] text-[#2a3461] font-mono">{date || '선택일'}</span>
              </div>

              {/* 연결 화살표 */}
              <div className="flex flex-col items-center px-1">
                <span className="text-[#2a3461] font-bold">➔</span>
              </div>

              {/* 뒷선 상태 */}
              <div className="flex-1 bg-white border border-[#cbd5e1] rounded-[6px] p-2 flex flex-col items-center text-center">
                <span className="text-[10.5px] text-[#64748b]">뒷선 이력</span>
                <span className="font-bold text-[#0e1225]">{nextStatus || '없음(최신)'}</span>
                <span className="text-[10px] text-[#94a3b8] font-mono">{nextItem?.date || '현재'}</span>
              </div>
            </div>
          </div>

          {/* 3. 적용 일자 (디자인 시스템 전용 달력 모달 연동) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="font-bold text-[#0e1225] flex items-center gap-1">
                적용 일자 <span className="text-[#ef5a27]">*</span>
              </label>
              <span className="text-[11px] text-[#64748b]">
                허용 범위: {prevItem?.date || '-'} ~ {nextItem?.date || '현재'}
              </span>
            </div>
            <div className="relative flex items-center">
              <input
                type="text"
                readOnly
                value={date}
                onClick={() => setIsDatePickerOpen(true)}
                placeholder="YYYY-MM-DD"
                className="w-full h-[38px] border border-[#c2cfdf] rounded-[6px] pl-3 pr-10 text-[13px] text-[#0e1225] bg-white cursor-pointer focus:outline-none focus:border-[#2a3461]"
              />
              <button
                type="button"
                onClick={() => setIsDatePickerOpen(true)}
                className="absolute right-2 p-1 text-[#64748b] hover:text-[#2a3461] transition-colors cursor-pointer"
                title="달력 선택"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </button>
            </div>
          </div>

          {/* 4. 직원 상태 선택 (앞/뒤 상태를 모두 만족하는 상태만 활성화) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="font-bold text-[#0e1225] flex items-center gap-1">
                직원상태 <span className="text-[#ef5a27]">*</span>
              </label>
              <span className="text-[11px] text-[#64748b]">
                *앞({prevStatus}) 및 뒤({nextStatus || '최신'}) 상태 기준 전이 가능 상태
              </span>
            </div>

            {validCandidateStatuses.length === 0 ? (
              <div className="p-3 bg-[#fef2f2] border border-[#fecaca] rounded-[8px] text-[12px] text-[#b91c1c] flex flex-col gap-1">
                <span className="font-bold">⚠️ 선택 가능한 직원상태가 없습니다.</span>
                <span>
                  앞선 상태({prevStatus})에서 전이될 수 있고, 뒷선 상태({nextStatus})로 이어질 수 있는 유효 상태가 존재하지 않습니다. 삽입 위치나 앞/뒤 이력을 먼저 확인해 주세요.
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                {ALL_CAREER_STATUSES.map(st => {
                  const isAllowed = validCandidateStatuses.includes(st)
                  const isSelected = type === st
                  const color = STATUS_COLOR_MAP[st] || { bg: 'bg-white', text: 'text-[#0e1225]', border: 'border-[#c2cfdf]' }

                  return (
                    <button
                      key={st}
                      type="button"
                      disabled={!isAllowed}
                      onClick={() => isAllowed && setType(st)}
                      className={`h-[42px] rounded-[8px] border text-[13px] font-semibold flex items-center justify-between px-3 transition-all ${
                        !isAllowed
                          ? 'bg-[#f8fafc] text-[#cbd5e1] border-[#e2e8f0] cursor-not-allowed opacity-50'
                          : isSelected
                            ? 'border-[#2a3461] bg-[#f0f4fa] text-[#2a3461] ring-2 ring-[#2a3461]/20 shadow-2xs font-bold'
                            : 'border-[#c2cfdf] bg-white text-[#334155] hover:border-[#2a3461] hover:bg-[#fafbfc] cursor-pointer'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-[#2a3461] bg-[#2a3461]' : 'border-[#94a3b8]'
                          }`}
                        >
                          {isSelected && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </span>
                        {st}
                      </span>
                      <span className={`px-2 py-0.5 rounded-[4px] text-[11px] border ${color.bg} ${color.text} ${color.border}`}>
                        {st}
                      </span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* 5. 비고 (변경사유) */}
          <div className="flex flex-col gap-1.5">
            <label className="font-bold text-[#0e1225]">비고 (변경사유)</label>
            <textarea
              rows={2}
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="상태 변경 사유를 입력하세요 (예: 중간 휴직, 복직, 개인사정 등)"
              className="w-full border border-[#c2cfdf] rounded-[6px] p-2.5 text-[12.5px] text-[#0e1225] bg-white focus:outline-none focus:border-[#2a3461] resize-none placeholder:text-[#94a3b8]"
            />
          </div>

          {/* 퇴직 선택 시 안내 박스 */}
          {type === '퇴직' && (
            <div className="p-2.5 bg-[#fffbeb] border border-[#fef3c7] rounded-[8px] flex flex-col gap-1 text-[11.5px] text-[#92400e]">
              <div className="flex items-start gap-1 font-medium">
                <span>⚠️</span>
                <span>퇴사일은 마지막 근무일의 <span className="font-bold underline">다음 날</span>로 선택해 주세요.</span>
              </div>
            </div>
          )}
        </div>

        {/* 풋터 */}
        <div className="px-5 py-3.5 border-t border-[#c2cfdf] bg-[#fafbfc] flex items-center justify-end gap-2 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="h-[36px] px-4 border border-[#c2cfdf] rounded-[8px] text-[13px] font-semibold text-[#475569] hover:bg-[#f1f5f9] cursor-pointer"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={validCandidateStatuses.length === 0}
            className={`h-[36px] px-5 rounded-[8px] text-[13px] font-bold flex items-center gap-1.5 shadow-xs transition-colors ${
              validCandidateStatuses.length === 0
                ? 'bg-[#cbd5e1] text-white cursor-not-allowed'
                : 'bg-[#2a3461] text-white hover:bg-[#364275] cursor-pointer'
            }`}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {isEdit ? '수정 완료' : '저장'}
          </button>
        </div>
      </div>

      {/* ─── 디자인 시스템 전용 달력 모달 ─── */}
      <DatePickerModal
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        selectedDate={date ? new Date(date) : new Date()}
        onSelectDate={d => {
          const newDateStr = formatDateString(d)
          setDate(newDateStr)
          setIsDatePickerOpen(false)
        }}
        title="적용 일자 선택"
      />
    </div>
  )
}

// ─── Figma 1:1 종사자 정보 수정 모달 (Node 2282-76979) ──────────────────────────

function EmployeeInfoEditModal({
  employee,
  onSave,
  onClose,
}: {
  employee: Employee
  onSave: (updated: Employee) => void
  onClose: () => void
}) {
  const age = calcAge(employee.dob)

  // Form State
  const [syncJob, setSyncJob] = useState(employee.syncJobWithLtc)
  const [job, setJob] = useState<JobType>(employee.job)

  const [syncPhone, setSyncPhone] = useState(employee.syncPhoneWithLtc)
  const [phone, setPhone] = useState(employee.phone)
  const [smsConsent, setSmsConsent] = useState(employee.smsConsent)

  const [syncEmail, setSyncEmail] = useState(employee.syncEmailWithLtc)
  const [emailUser, setEmailUser] = useState(employee.email ? employee.email.split('@')[0] : '')
  const [emailDomain, setEmailDomain] = useState(employee.email ? employee.email.split('@')[1] || 'naver.com' : 'naver.com')
  const [isCustomDomain, setIsCustomDomain] = useState(false)
  const [customDomain, setCustomDomain] = useState('')
  const [emailConsent, setEmailConsent] = useState(employee.emailConsent)

  const [syncAddress, setSyncAddress] = useState(employee.syncAddressWithLtc)
  const [zipCode, setZipCode] = useState(employee.zipCode || '01789')
  const [address, setAddress] = useState(employee.address)
  const [addressDetail, setAddressDetail] = useState(employee.addressDetail || '')

  function handleSubmit() {
    const finalEmail = isCustomDomain
      ? `${emailUser}@${customDomain}`
      : `${emailUser}@${emailDomain}`

    const updated: Employee = {
      ...employee,
      job: syncJob ? employee.job : job,
      syncJobWithLtc: syncJob,
      phone: syncPhone ? employee.phone : phone,
      smsConsent,
      syncPhoneWithLtc: syncPhone,
      email: syncEmail ? employee.email : finalEmail,
      emailConsent,
      syncEmailWithLtc: syncEmail,
      zipCode: syncAddress ? employee.zipCode : zipCode,
      address: syncAddress ? employee.address : address,
      addressDetail: syncAddress ? employee.addressDetail : addressDetail,
      syncAddressWithLtc: syncAddress,
    }

    onSave(updated)
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative bg-white rounded-[16px] shadow-[0px_20px_50px_rgba(0,0,0,0.2)] w-full max-w-[448px] flex flex-col overflow-hidden border border-[#c2cfdf] animate-in fade-in zoom-in-95 duration-200">
        {/* 1. Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#c2cfdf] bg-white shrink-0">
          <span className="font-bold text-[17px] text-[#0e1225] tracking-tight">종사자 정보 수정</span>
          <button
            onClick={onClose}
            className="p-1 rounded-[6px] text-[#8a9cb4] hover:text-[#0e1225] hover:bg-[#f1f5f9] transition-colors cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 2. Employee Summary Bar */}
        <div className="px-5 py-2.5 bg-[#f8fafc] border-b border-[#c2cfdf] flex items-center gap-2 shrink-0">
          <span
            className={`w-[22px] h-[22px] rounded-[6px] flex items-center justify-center font-bold text-[13px] leading-none shrink-0 ${employee.gender === '여' ? 'bg-[#fdf2f8] text-[#e11d48]' : 'bg-[#eff6ff] text-[#2563eb]'
              }`}
          >
            {employee.gender === '여' ? '♀' : '♂'}
          </span>
          <span className="text-[16px] font-bold text-[#0e1225] tracking-tight ml-0.5">{employee.name}</span>
          <span className="text-[13.5px] text-[#64748b] font-normal">
            {employee.dob} ({age}세)
          </span>
        </div>

        {/* 3. Modal Form Body (Scrollable) */}
        <div className="px-5 py-4 flex flex-col gap-4 overflow-y-auto max-h-[70vh] text-[13px]">
          {/* Section 1: 직종 */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="font-bold text-[#0e1225] flex items-center gap-0.5">
                직종 <span className="text-[#ef5a27]">*</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer select-none text-[12px] text-[#475569]">
                <input
                  type="checkbox"
                  checked={syncJob}
                  onChange={e => setSyncJob(e.target.checked)}
                  className="accent-[#2a3461] rounded w-3.5 h-3.5 cursor-pointer"
                />
                <span>공단 정보와 동일하게 사용</span>
              </label>
            </div>

            {/* 희망이음 / 공단 최신 데이터 박스 */}
            <div className="px-3 py-2 bg-[#f1f5f9] border border-[#e2e8f0] rounded-[6px] text-[#475569] text-[12.5px] flex items-center justify-between">
              <span className="font-medium">희망이음 최신:</span>
              <span className="font-semibold text-[#0e1225]">{employee.job} ({employee.hireDate})</span>
            </div>

            {!syncJob && (
              <select
                value={job}
                onChange={e => setJob(e.target.value as JobType)}
                className="h-[36px] w-full bg-white border border-[#c2cfdf] rounded-[6px] px-3 text-[13px] text-[#0e1225] focus:outline-none focus:border-[#2a3461]"
              >
                <option value="요양보호사">요양보호사</option>
                <option value="사회복지사">사회복지사</option>
                <option value="간호사">간호사</option>
                <option value="간호조무사">간호조무사</option>
                <option value="물리치료사">물리치료사</option>
                <option value="시설장">시설장</option>
                <option value="프로그램 관리자">프로그램 관리자</option>
                <option value="조리원">조리원</option>
                <option value="사무원">사무원</option>
              </select>
            )}
          </div>

          <div className="h-[1px] bg-[#eef2f8]" />

          {/* Section 2: 연락처 */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="font-bold text-[#0e1225] flex items-center gap-0.5">
                연락처 <span className="text-[#ef5a27]">*</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer select-none text-[12px] text-[#475569]">
                <input
                  type="checkbox"
                  checked={syncPhone}
                  onChange={e => setSyncPhone(e.target.checked)}
                  className="accent-[#2a3461] rounded w-3.5 h-3.5 cursor-pointer"
                />
                <span>공단 정보와 동일하게 사용</span>
              </label>
            </div>

            {/* 공단 최신 데이터 박스 */}
            <div className="px-3 py-2 bg-[#f1f5f9] border border-[#e2e8f0] rounded-[6px] text-[#475569] text-[12.5px] flex items-center justify-between">
              <span className="font-medium">공단 연동 번호:</span>
              <span className="font-mono font-semibold text-[#0e1225]">{employee.phone}</span>
            </div>

            {!syncPhone && (
              <input
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="전화번호 입력 (010-0000-0000)"
                className="h-[36px] w-full bg-white border border-[#c2cfdf] rounded-[6px] px-3 font-mono text-[13px] text-[#0e1225] focus:outline-none focus:border-[#2a3461]"
              />
            )}

            {/* 수신동의 버튼 그룹 */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[12px] font-medium text-[#475569]">문자(SMS) 수신동의</span>
              <div className="flex items-center border border-[#c2cfdf] rounded-[6px] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setSmsConsent(true)}
                  className={`px-3 py-1 text-[11.5px] font-semibold transition-colors cursor-pointer ${smsConsent ? 'bg-[#2a3461] text-white' : 'bg-white text-[#64748b] hover:bg-[#f8fafc]'
                    }`}
                >
                  수신동의
                </button>
                <button
                  type="button"
                  onClick={() => setSmsConsent(false)}
                  className={`px-3 py-1 text-[11.5px] font-semibold transition-colors cursor-pointer ${!smsConsent ? 'bg-[#ef4444] text-white' : 'bg-white text-[#64748b] hover:bg-[#f8fafc]'
                    }`}
                >
                  미동의
                </button>
              </div>
            </div>
          </div>

          <div className="h-[1px] bg-[#eef2f8]" />

          {/* Section 3: 이메일 */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="font-bold text-[#0e1225] flex items-center gap-0.5">
                이메일 <span className="text-[#ef5a27]">*</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer select-none text-[12px] text-[#475569]">
                <input
                  type="checkbox"
                  checked={syncEmail}
                  onChange={e => setSyncEmail(e.target.checked)}
                  className="accent-[#2a3461] rounded w-3.5 h-3.5 cursor-pointer"
                />
                <span>공단 정보와 동일하게 사용</span>
              </label>
            </div>

            {/* 공단 최신 데이터 박스 */}
            <div className="px-3 py-2 bg-[#f1f5f9] border border-[#e2e8f0] rounded-[6px] text-[#475569] text-[12.5px] flex items-center justify-between">
              <span className="font-medium">공단 연동 이메일:</span>
              <span className="font-semibold text-[#0e1225]">{employee.email || '미등록'}</span>
            </div>

            {!syncEmail && (
              <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap">
                <input
                  value={emailUser}
                  onChange={e => setEmailUser(e.target.value)}
                  placeholder="이메일 아이디"
                  className="flex-1 min-w-[110px] h-[36px] bg-white border border-[#c2cfdf] rounded-[6px] px-2.5 text-[13px] text-[#0e1225] focus:outline-none focus:border-[#2a3461]"
                />
                <span className="text-[#64748b] font-bold">@</span>
                {isCustomDomain ? (
                  <div className="flex-1 flex gap-1">
                    <input
                      value={customDomain}
                      onChange={e => setCustomDomain(e.target.value)}
                      placeholder="도메인 직접입력"
                      className="flex-1 h-[36px] bg-white border border-[#c2cfdf] rounded-[6px] px-2.5 text-[13px] text-[#0e1225] focus:outline-none focus:border-[#2a3461]"
                    />
                    <button
                      type="button"
                      onClick={() => setIsCustomDomain(false)}
                      className="px-2 h-[36px] border border-[#c2cfdf] rounded-[6px] bg-[#f8fafc] text-[11.5px] text-[#475569]"
                    >
                      선택
                    </button>
                  </div>
                ) : (
                  <select
                    value={emailDomain}
                    onChange={e => {
                      if (e.target.value === 'custom') {
                        setIsCustomDomain(true)
                      } else {
                        setEmailDomain(e.target.value)
                      }
                    }}
                    className="flex-1 h-[36px] bg-white border border-[#c2cfdf] rounded-[6px] px-2 text-[13px] text-[#0e1225] focus:outline-none focus:border-[#2a3461]"
                  >
                    <option value="naver.com">naver.com</option>
                    <option value="daum.net">daum.net</option>
                    <option value="gmail.com">gmail.com</option>
                    <option value="kakao.com">kakao.com</option>
                    <option value="custom">직접입력</option>
                  </select>
                )}
              </div>
            )}

            {/* 이메일 수신동의 버튼 그룹 */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[12px] font-medium text-[#475569]">이메일 수신동의</span>
              <div className="flex items-center border border-[#c2cfdf] rounded-[6px] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setEmailConsent(true)}
                  className={`px-3 py-1 text-[11.5px] font-semibold transition-colors cursor-pointer ${emailConsent ? 'bg-[#2a3461] text-white' : 'bg-white text-[#64748b] hover:bg-[#f8fafc]'
                    }`}
                >
                  수신동의
                </button>
                <button
                  type="button"
                  onClick={() => setEmailConsent(false)}
                  className={`px-3 py-1 text-[11.5px] font-semibold transition-colors cursor-pointer ${!emailConsent ? 'bg-[#ef4444] text-white' : 'bg-white text-[#64748b] hover:bg-[#f8fafc]'
                    }`}
                >
                  미동의
                </button>
              </div>
            </div>
          </div>

          <div className="h-[1px] bg-[#eef2f8]" />

          {/* Section 4: 주소 */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="font-bold text-[#0e1225]">주소</label>
              <label className="flex items-center gap-1.5 cursor-pointer select-none text-[12px] text-[#475569]">
                <input
                  type="checkbox"
                  checked={syncAddress}
                  onChange={e => setSyncAddress(e.target.checked)}
                  className="accent-[#2a3461] rounded w-3.5 h-3.5 cursor-pointer"
                />
                <span>공단 정보와 동일하게 사용</span>
              </label>
            </div>

            {/* 공단 최신 데이터 박스 */}
            <div className="px-3 py-2 bg-[#f1f5f9] border border-[#e2e8f0] rounded-[6px] text-[#475569] text-[12.5px] flex flex-col gap-0.5">
              <span className="text-[11px] text-[#64748b]">공단 연동 주소:</span>
              <span className="font-semibold text-[#0e1225] leading-snug">{employee.address} {employee.addressDetail || ''}</span>
            </div>

            {!syncAddress && (
              <div className="flex flex-col gap-1.5">
                {/* 우편번호 & 검색 버튼 */}
                <div className="flex items-center gap-2">
                  <input
                    value={zipCode}
                    onChange={e => setZipCode(e.target.value)}
                    placeholder="우편번호"
                    className="w-[110px] h-[36px] bg-white border border-[#c2cfdf] rounded-[6px] px-3 font-mono text-[13px] text-[#0e1225] focus:outline-none focus:border-[#2a3461]"
                  />
                  <button
                    type="button"
                    onClick={() => alert('도로명 주소 검색 팝업을 실행합니다.')}
                    className="h-[36px] px-3 rounded-[6px] border border-[#ef5a27] bg-[#fff5f0] text-[#ef5a27] text-[12.5px] font-bold hover:bg-[#ffe8de] transition-colors cursor-pointer"
                  >
                    검색
                  </button>
                </div>

                {/* 기본주소 */}
                <input
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="기본 주소"
                  className="h-[36px] w-full bg-white border border-[#c2cfdf] rounded-[6px] px-3 text-[13px] text-[#0e1225] focus:outline-none focus:border-[#2a3461]"
                />

                {/* 상세주소 */}
                <input
                  value={addressDetail}
                  onChange={e => setAddressDetail(e.target.value)}
                  placeholder="상세 주소 (동·호수 등)"
                  className="h-[36px] w-full bg-white border border-[#c2cfdf] rounded-[6px] px-3 text-[13px] text-[#0e1225] focus:outline-none focus:border-[#2a3461]"
                />
              </div>
            )}
          </div>
        </div>

        {/* 4. Modal Footer Actions */}
        <div className="px-5 py-3.5 border-t border-[#c2cfdf] bg-[#fafbfc] flex items-center justify-end gap-2 shrink-0">
          <button
            onClick={onClose}
            className="h-[36px] px-4 rounded-[8px] border border-[#c2cfdf] bg-white text-[#475569] text-[13px] font-semibold hover:bg-[#f1f5f9] transition-colors cursor-pointer"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="h-[36px] px-5 rounded-[8px] bg-[#1e293b] text-white text-[13px] font-bold hover:bg-[#334155] transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            저장
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Employee Management Page Component ─────────────────────────────────

export default function EmployeeManagementPage() {
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES)
  const [selectedId, setSelectedId] = useState<string | null>('EMP-001')
  const [searchName, setSearchName] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('')
  const [filterJob, setFilterJob] = useState<string>('')
  const [includeRetired, setIncludeRetired] = useState<boolean>(false)
  const [filterOpen, setFilterOpen] = useState(true)

  // Sub Tab
  const [activeSubTab, setActiveSubTab] = useState<
    '재직이력' | '급여계약' | '4대보험' | '자격증' | '인력변경 신고내역' | '급여지급내역'
  >('재직이력')

  // Modals
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false)
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  const [isTenureModalOpen, setIsTenureModalOpen] = useState(false)
  const [isCareerAuditModalOpen, setIsCareerAuditModalOpen] = useState(false)
  const [isCareerEditModalOpen, setIsCareerEditModalOpen] = useState(false)
  const [editingCareerItem, setEditingCareerItem] = useState<CareerHistoryItem | null>(null)
  const [insertAfterCareerId, setInsertAfterCareerId] = useState<string | null>(null)

  const selected = employees.find(e => e.id === selectedId) ?? employees[0] ?? null

  // Filtered List
  const filtered = employees.filter(e => {
    if (!includeRetired && e.status === '퇴직') return false
    if (filterStatus && e.status !== filterStatus) return false
    if (filterJob && e.job !== filterJob) return false
    if (searchName && !e.name.includes(searchName.trim())) return false
    return true
  })

  const maleCount = filtered.filter(e => e.gender === '남').length
  const femaleCount = filtered.filter(e => e.gender === '여').length
  const activeFiltersCount = [filterStatus, filterJob, searchName].filter(Boolean).length

  // 급여 총액 계산
  const totalSalary = selected
    ? selected.salaryItems.reduce((sum, item) => sum + item.amount, 0)
    : 0
  const totalDeduction = selected
    ? selected.deductionItems.reduce((sum, item) => sum + item.amount, 0)
    : 0
  const netSalary = totalSalary - totalDeduction

  function handleResetFilter() {
    setFilterStatus('')
    setFilterJob('')
    setSearchName('')
  }

  function handleSaveEmployee(updated: Employee) {
    setEmployees(prev => prev.map(emp => (emp.id === updated.id ? updated : emp)))
    setIsEditModalOpen(false)
  }

  // 1. 재직 상태 관리 (퇴사/휴직/보류) 모달 저장
  function handleSaveTenureStatus(newStatus: WorkStatus, date: string, reason: string) {
    if (!selected) return
    const currentHist = selected.careerHistory || []
    const newCareerItem: CareerHistoryItem = {
      id: `CH-${Date.now()}`,
      seq: currentHist.length + 1,
      type: newStatus,
      date,
      reason: reason || `${newStatus} 처리`,
      syncStatus: '희',
    }
    const updated: Employee = {
      ...selected,
      status: newStatus,
      retireDate: newStatus === '퇴직' ? date : selected.retireDate,
      careerHistory: [...currentHist, newCareerItem],
    }
    handleSaveEmployee(updated)
    setIsTenureModalOpen(false)
  }

  // 2. 재직 이력 등록 / 수정 팝업 모달 저장 (Figma 2596-30660 체인 정렬 및 최종 상태 재계산)
  function handleSaveCareerModal(date: string, type: string, reason: string) {
    if (!selected) return
    let nextHistory = [...(selected.careerHistory || [])]
    if (editingCareerItem && editingCareerItem.id) {
      nextHistory = nextHistory.map(item =>
        item.id === editingCareerItem.id
          ? { ...item, date, type, reason }
          : item
      )
    } else {
      const newItem: CareerHistoryItem = {
        id: `CH-${Date.now()}`,
        seq: nextHistory.length + 1,
        type,
        date,
        reason,
        syncStatus: '희',
      }
      nextHistory.push(newItem)
    }

    // 날짜 오름차순 정렬
    nextHistory.sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date)
      return (a.seq ?? 0) - (b.seq ?? 0)
    })
    nextHistory = nextHistory.map((item, idx) => ({ ...item, seq: idx + 1 }))

    // 최종 이력 기준 현재 상태 & 퇴사일 자동 산출
    const lastItem = nextHistory[nextHistory.length - 1]
    let updatedStatus: WorkStatus = selected.status
    let updatedRetire: string | null = selected.retireDate

    if (lastItem) {
      if (lastItem.type === '퇴직') {
        updatedStatus = '퇴직'
        updatedRetire = lastItem.date
      } else if (lastItem.type === '휴직') {
        updatedStatus = '휴직'
      } else if (lastItem.type === '보류') {
        updatedStatus = '보류'
      } else {
        // 최초입사일, 재직, 재입사
        updatedStatus = '재직'
        updatedRetire = null
      }
    }

    const updated: Employee = {
      ...selected,
      status: updatedStatus,
      retireDate: updatedRetire,
      careerHistory: nextHistory,
    }
    handleSaveEmployee(updated)
    setIsCareerEditModalOpen(false)
    setEditingCareerItem(null)
  }

  // 3. 재직 이력 삭제 (최초 입사 이력 삭제 방지 및 최종 상태 재계산)
  function handleDeleteCareerItem(itemId: string) {
    if (!selected) return
    const target = (selected.careerHistory || []).find(item => item.id === itemId)
    if (target?.type === '최초입사일') {
      alert('최초 입사 이력은 삭제할 수 없습니다. (정보 변경이 필요하시면 수정을 이용해 주세요)')
      return
    }

    if (!confirm('해당 재직 이력을 삭제하시겠습니까?')) return
    let nextHistory = (selected.careerHistory || []).filter(item => item.id !== itemId)
    nextHistory.sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date)
      return (a.seq ?? 0) - (b.seq ?? 0)
    })
    nextHistory = nextHistory.map((item, idx) => ({ ...item, seq: idx + 1 }))

    const lastItem = nextHistory[nextHistory.length - 1]
    let updatedStatus: WorkStatus = '재직'
    let updatedRetire: string | null = null

    if (lastItem) {
      if (lastItem.type === '퇴직') {
        updatedStatus = '퇴직'
        updatedRetire = lastItem.date
      } else if (lastItem.type === '휴직') {
        updatedStatus = '휴직'
      } else if (lastItem.type === '보류') {
        updatedStatus = '보류'
      } else {
        updatedStatus = '재직'
        updatedRetire = null
      }
    }

    const updated: Employee = {
      ...selected,
      status: updatedStatus,
      retireDate: updatedRetire,
      careerHistory: nextHistory,
    }
    handleSaveEmployee(updated)
  }

  // 4. 이력 수정 모달 오픈
  function handleStartEditCareer(item: CareerHistoryItem) {
    setEditingCareerItem(item)
    setInsertAfterCareerId(null)
    setIsCareerEditModalOpen(true)
  }

  // 5. 신규 이력 등록 모달 오픈 (기본: 맨 뒤)
  function handleStartCreateCareer() {
    setEditingCareerItem(null)
    setInsertAfterCareerId(null)
    setIsCareerEditModalOpen(true)
  }

  // 6. 특정 이력 바로 뒤에 중간 이력 삽입 모달 오픈
  function handleStartInsertCareer(afterId: string) {
    setEditingCareerItem(null)
    setInsertAfterCareerId(afterId)
    setIsCareerEditModalOpen(true)
  }

  // 7. 재입사 처리 모달 오픈
  function handleStartRehire() {
    setEditingCareerItem({
      id: '',
      seq: (selected?.careerHistory?.length || 0) + 1,
      type: '재입사',
      date: new Date().toISOString().split('T')[0],
      reason: '센트럴케어 직원 재입사',
      syncStatus: '희',
    })
    setInsertAfterCareerId(null)
    setIsCareerEditModalOpen(true)
    setActiveSubTab('재직이력')
  }

  return (
    <div className="flex flex-1 overflow-hidden p-2 gap-2 h-full bg-[#eaedf2]">
      {/* ─── 좌측: 종사자 목록 패널 ─── */}
      <div
        className="flex flex-col bg-white overflow-hidden shrink-0 border border-[#c2cfdf] transition-all duration-300 ease-in-out shadow-2xs"
        style={{
          width: selected ? '30%' : '100%',
          minWidth: selected ? '300px' : 'auto',
        }}
      >
        {/* 목록 헤더 */}
        <div className="p-3 flex flex-col gap-2.5 shrink-0 border-b border-[#c2cfdf] bg-[#fafbfc]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-[16px] font-bold text-[#0e1225] inline-flex items-center gap-1.5 leading-none">
                <span className="w-[4px] h-[16px] bg-[#ef5a27] inline-block rounded-[2px] shrink-0" />
                종사자 목록
              </h2>
              <span className="h-[22px] px-2 inline-flex items-center justify-center bg-[#f1f5f9] text-[#64748b] text-[12px] font-bold rounded-[6px] leading-none whitespace-nowrap">
                {filtered.length}명
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => alert('종사자 목록 엑셀 다운로드가 시작됩니다.')}
                className="flex items-center gap-1.5 h-[32px] px-3 rounded-[8px] border border-[#c2cfdf] bg-white text-[13px] font-semibold text-[#334155] hover:border-[#334155] hover:bg-[#f8fafc] transition-colors shadow-xs cursor-pointer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                엑셀 다운로드
              </button>
              <button
                onClick={() => alert('국민건강보험공단 종사자 데이터 실시간 조회를 시작합니다.')}
                className="h-[32px] px-3 rounded-[8px] bg-[#2a3461] text-[13px] font-semibold text-white hover:bg-[#364275] transition-colors shadow-xs cursor-pointer"
              >
                공단 조회
              </button>
            </div>
          </div>

          {/* 조회조건 아코디언 */}
          <div className="border border-[#c2cfdf] bg-white rounded-[4px] overflow-hidden">
            <button
              onClick={() => setFilterOpen(o => !o)}
              className="w-full flex items-center gap-2 px-3 py-2 text-left bg-white border-b border-[#c2cfdf] cursor-pointer"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="21" x2="4" y2="14" />
                <line x1="4" y1="10" x2="4" y2="3" />
                <line x1="12" y1="21" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12" y2="3" />
                <line x1="20" y1="21" x2="20" y2="16" />
                <line x1="20" y1="12" x2="20" y2="3" />
                <line x1="1" y1="14" x2="7" y2="14" />
                <line x1="9" y1="8" x2="15" y2="8" />
                <line x1="17" y1="16" x2="23" y2="16" />
              </svg>
              <span className="text-[13.5px] font-bold text-[#1e293b]">조회조건</span>
              {activeFiltersCount > 0 && (
                <span className="bg-[#ef5a27] text-white text-[11px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center leading-none">
                  {activeFiltersCount}
                </span>
              )}
              <div className="flex-1" />
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className={`transition-transform text-[#64748b] ${filterOpen ? '' : 'rotate-180'}`}>
                <path d="M2 11L8 5L14 11" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </button>

            {filterOpen && (
              <div className="p-2.5 flex flex-col gap-2">
                <div className="flex flex-wrap items-end gap-2">
                  {/* 근무상태 */}
                  <div className="flex-1 min-w-[85px] flex flex-col gap-1">
                    <label className="text-[12px] font-semibold text-[#475569]">근무상태</label>
                    <select
                      value={filterStatus}
                      onChange={e => setFilterStatus(e.target.value)}
                      className="h-[32px] w-full bg-white border border-[#c2cfdf] rounded-[6px] px-2 text-[13px] text-[#0e1225] focus:outline-none focus:border-[#2a3461]"
                    >
                      <option value="">전체</option>
                      <option value="재직">재직</option>
                      <option value="휴직">휴직</option>
                      <option value="보류">보류</option>
                      <option value="퇴직">퇴직</option>
                    </select>
                  </div>

                  {/* 직종 */}
                  <div className="flex-1 min-w-[95px] flex flex-col gap-1">
                    <label className="text-[12px] font-semibold text-[#475569]">직종</label>
                    <select
                      value={filterJob}
                      onChange={e => setFilterJob(e.target.value)}
                      className="h-[32px] w-full bg-white border border-[#c2cfdf] rounded-[6px] px-2 text-[13px] text-[#0e1225] focus:outline-none focus:border-[#2a3461]"
                    >
                      <option value="">전체</option>
                      <option value="요양보호사">요양보호사</option>
                      <option value="사회복지사">사회복지사</option>
                      <option value="간호사">간호사</option>
                      <option value="간호조무사">간호조무사</option>
                      <option value="물리치료사">물리치료사</option>
                      <option value="시설장">시설장</option>
                      <option value="프로그램 관리자">프로그램 관리자</option>
                      <option value="조리원">조리원</option>
                    </select>
                  </div>

                  {/* 직원명 */}
                  <div className="flex-1 min-w-[95px] flex flex-col gap-1">
                    <label className="text-[12px] font-semibold text-[#475569]">직원명</label>
                    <input
                      value={searchName}
                      onChange={e => setSearchName(e.target.value)}
                      placeholder="이름 입력"
                      className="h-[32px] w-full bg-white border border-[#c2cfdf] rounded-[6px] px-2 text-[13px] text-[#0e1225] focus:outline-none focus:border-[#2a3461]"
                    />
                  </div>

                  <div className="flex items-end shrink-0">
                    <button
                      onClick={handleResetFilter}
                      className="h-[32px] px-3 bg-white border border-[#c2cfdf] rounded-[6px] text-[12.5px] font-medium text-[#475569] hover:bg-[#f1f5f9] hover:border-[#2a3461] transition-colors whitespace-nowrap cursor-pointer shadow-2xs flex items-center gap-1"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                      </svg>
                      <span>초기화</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 테이블 본문 */}
        <div className="flex-1 overflow-auto px-3 py-2">
          <div className="border border-[#c2cfdf] rounded-[4px] overflow-hidden bg-white">
            <table className="w-full border-collapse text-[13px]" style={{ minWidth: 460 }}>
              <thead className="sticky top-0 z-10">
                <tr className="bg-[#f4f7fc] text-[#334155] border-b border-[#c2cfdf]">
                  <th className="h-[38px] px-2 text-center font-bold whitespace-nowrap border-r border-[#c2cfdf] text-[13px]">연동</th>
                  <th className="h-[38px] px-2.5 text-left font-bold whitespace-nowrap border-r border-[#c2cfdf] text-[13px]">근무상태</th>
                  <th className="h-[38px] px-2.5 text-left font-bold whitespace-nowrap border-r border-[#c2cfdf] text-[13px]">직원명</th>
                  <th className="h-[38px] px-2 text-center font-bold whitespace-nowrap border-r border-[#c2cfdf] text-[13px]">성별</th>
                  <th className="h-[38px] px-2.5 text-left font-bold whitespace-nowrap border-r border-[#c2cfdf] text-[13px]">생년월일</th>
                  <th className="h-[38px] px-2.5 text-left font-bold whitespace-nowrap border-r border-[#c2cfdf] text-[13px]">직종</th>
                  <th className="h-[38px] px-2.5 text-left font-bold whitespace-nowrap border-r border-[#c2cfdf] text-[13px]">입사일</th>
                  <th className="h-[38px] px-2.5 text-left font-bold whitespace-nowrap text-[13px]">퇴사일</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-12 text-[#8a9cb4] text-[14px]">
                      일치하는 종사자가 없습니다.
                    </td>
                  </tr>
                ) : (
                  filtered.map((emp, idx) => {
                    const isSelected = selected?.id === emp.id
                    return (
                      <tr
                        key={emp.id}
                        onClick={() => setSelectedId(isSelected ? null : emp.id)}
                        className={`cursor-pointer transition-colors border-b border-[#c2cfdf] last:border-b-0 ${isSelected
                          ? 'bg-[#d9ecff] font-semibold text-[#1e3a8a]'
                          : idx % 2 === 1
                            ? 'bg-[#fafbfc] hover:bg-[#f0f4fa]'
                            : 'bg-white hover:bg-[#f0f4fa]'
                          }`}
                      >
                        {/* 연동 */}
                        <td className="h-[40px] px-1 text-center border-r border-[#c2cfdf] whitespace-nowrap">
                          {emp.syncStatus === '희' ? (
                            <span className="w-[18px] h-[18px] inline-flex items-center justify-center bg-[#0093a9] text-white text-[10.5px] font-bold rounded-[3px] leading-none mx-auto" title="희망이음 연동">
                              희
                            </span>
                          ) : (
                            <span className="text-[#94a3b8] text-[12px] font-mono">-</span>
                          )}
                        </td>
                        {/* 근무상태 */}
                        <td className="h-[40px] px-2.5 border-r border-[#c2cfdf] whitespace-nowrap">
                          <span className={`text-[12px] font-bold px-2 py-0.5 rounded-[4px] border ${STATUS_BADGE_STYLE[emp.status]}`}>
                            {emp.status}
                          </span>
                        </td>
                        {/* 직원명 */}
                        <td className="h-[40px] px-2.5 font-bold whitespace-nowrap border-r border-[#c2cfdf] text-[#0e1225] text-[14.5px]">
                          {emp.name}
                        </td>
                        {/* 성별 */}
                        <td className="h-[40px] px-2 text-center border-r border-[#c2cfdf] whitespace-nowrap font-medium text-[13px]">
                          {emp.gender}
                        </td>
                        {/* 생년월일 */}
                        <td className="h-[40px] px-2.5 text-[12.5px] whitespace-nowrap border-r border-[#c2cfdf] text-[#475569] font-mono">
                          {emp.dob}
                        </td>
                        {/* 직종 */}
                        <td className="h-[40px] px-2.5 text-[13px] whitespace-nowrap border-r border-[#c2cfdf] text-[#334155] font-medium">
                          {emp.job}
                        </td>
                        {/* 입사일 */}
                        <td className="h-[40px] px-2.5 text-[12.5px] whitespace-nowrap border-r border-[#c2cfdf] text-[#64748b] font-mono">
                          {emp.hireDate}
                        </td>
                        {/* 퇴사일 */}
                        <td className="h-[40px] px-2.5 text-[12.5px] whitespace-nowrap text-[#64748b] font-mono">
                          {emp.retireDate || '-'}
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 안내 문구 및 통계 바 */}
        <div className="p-2.5 bg-[#f8fafc] border-t border-[#c2cfdf] flex items-center justify-between text-[12px] text-[#475569] shrink-0">
          <div className="flex items-center gap-2">
            <span>검색 <strong className="text-[#0e1225]">{filtered.length}</strong></span>
            <span className="text-[#cbd5e1]">|</span>
            <span>전체 <strong className="text-[#0e1225]">{employees.length}</strong></span>
            <span className="text-[#cbd5e1]">|</span>
            <span>남 <strong className="text-[#0284c7]">{maleCount}</strong></span>
            <span className="text-[#cbd5e1]">|</span>
            <span>여 <strong className="text-[#db2777]">{femaleCount}</strong></span>
          </div>
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={includeRetired}
              onChange={e => setIncludeRetired(e.target.checked)}
              className="accent-[#2a3461] rounded w-3.5 h-3.5"
            />
            <span className="text-[12px] font-medium text-[#475569]">퇴직자 포함</span>
          </label>
        </div>
      </div>

      {/* ─── 우측: 종사자 상세 정보 패널 (2단 독립 카드 구조) ─── */}
      {selected ? (
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden gap-2">
          {/* ─── 섹션 1: 종사자 기본정보 카드 ─── */}
          <div className="flex flex-col bg-white border border-[#c2cfdf] shrink-0 shadow-2xs">
            {/* 상단 헤더 바 */}
            <div className="p-3 flex items-center justify-between border-b border-[#c2cfdf] bg-[#fafbfc] flex-wrap gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                {/* 성별 기호 뱃지 */}
                <span
                  className={`w-[22px] h-[22px] rounded-[6px] flex items-center justify-center font-bold text-[13px] leading-none shrink-0 ${selected.gender === '여' ? 'bg-[#fdf2f8] text-[#e11d48]' : 'bg-[#eff6ff] text-[#2563eb]'
                    }`}
                >
                  {selected.gender === '여' ? '♀' : '♂'}
                </span>

                {/* 성명 */}
                <span className="text-[16px] font-bold text-[#0e1225] leading-none tracking-tight ml-0.5">
                  {selected.name}
                </span>

                {/* 생년월일 (나이) */}
                <span className="text-[13.5px] text-[#64748b] font-normal leading-none mr-1">
                  {selected.dob} ({calcAge(selected.dob)}세)
                </span>

                {/* 직종 뱃지 */}
                <span className="h-[24px] px-2.5 inline-flex items-center justify-center text-[12px] font-medium bg-[#eef2f8] text-[#334155] rounded-[4px] leading-none whitespace-nowrap">
                  {selected.job}
                </span>

                {/* 재직상태 뱃지 */}
                <span className={`h-[24px] px-2.5 inline-flex items-center justify-center text-[12px] font-medium rounded-[4px] border leading-none whitespace-nowrap ${STATUS_BADGE_STYLE[selected.status]}`}>
                  {selected.status}중
                </span>
              </div>

              {/* 우측 액션 버튼 */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsScheduleModalOpen(true)}
                  className="h-[28px] px-2.5 rounded-[6px] border border-[#c2cfdf] bg-white text-[#2a3461] text-[12.5px] font-semibold hover:border-[#2a3461] hover:bg-[#f4f7fc] transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  일정표 보기
                </button>
                <button
                  onClick={() => setIsTenureModalOpen(true)}
                  className="h-[28px] px-2.5 rounded-[6px] border border-[#cbd5e1] bg-[#f8fafc] text-[#334155] text-[12.5px] font-semibold hover:border-[#2a3461] hover:bg-[#edf2f7] hover:text-[#2a3461] transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                  title="퇴사 / 휴직 / 보류 상태 변경"
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <line x1="18" y1="8" x2="23" y2="13" />
                    <line x1="23" y1="8" x2="18" y2="13" />
                  </svg>
                  재직 상태 관리
                </button>
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="h-[28px] px-2.5 rounded-[6px] bg-[#2a3461] text-white text-[12.5px] font-semibold hover:bg-[#364275] transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <svg width="11" height="11" viewBox="0 0 13 13" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M9 1.5L11.5 4L4.5 11H2V8.5L9 1.5Z" />
                  </svg>
                  정보 수정
                </button>
                <div className="w-[1px] h-[16px] bg-[#c2cfdf] mx-0.5" />
                <button
                  onClick={() => setSelectedId(null)}
                  className="p-1 rounded-[6px] text-[#8a9cb4] hover:text-[#2a3461] hover:bg-[#eef3fa] transition-colors cursor-pointer"
                  title="상세창 닫기"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* 인적사항 바디 (사진 + 3열 그리드) */}
            <div className="flex flex-col md:flex-row items-stretch">
              {/* 사진 뷰어 영역 */}
              <div className="w-[104px] shrink-0 border-b md:border-b-0 md:border-r border-[#c2cfdf] p-2 flex flex-col items-center justify-center gap-1.5 bg-[#fafbfc]">
                <div className="w-[88px] h-[102px] border border-[#c2cfdf] rounded-[8px] bg-[#eef3fa] cursor-pointer overflow-hidden group relative flex flex-col items-center justify-center">
                  {selected.photo ? (
                    <img src={selected.photo} alt="직원 사진" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" strokeWidth="1.5">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <span className="text-[#8a9cb4] text-[10px] font-medium mt-0.5">사진 없음</span>
                    </>
                  )}
                  <div className="absolute inset-0 bg-black/40 group-hover:opacity-100 opacity-0 transition-opacity flex items-center justify-center">
                    <span className="text-white text-[10px] font-medium bg-black/60 rounded-[4px] px-1.5 py-0.5">
                      {selected.photo ? '변경' : '등록'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 인적사항 테이블 그리드 */}
              <div className="flex-1 flex flex-col text-[13.5px]">
                {/* Row 1: 생년월일 / 입사일 / 퇴사일 */}
                <div className="grid grid-cols-1 md:grid-cols-[90px_1fr_90px_1fr_90px_1fr] border-b border-[#c2cfdf]">
                  <div className="bg-[#f4f7fc] px-3 py-2 font-semibold text-[#334155] flex items-center border-b md:border-b-0 md:border-r border-[#c2cfdf] whitespace-nowrap">
                    생년월일
                  </div>
                  <div className="px-3 py-2 text-[#0e1225] flex items-center border-b md:border-b-0 md:border-r border-[#c2cfdf]">
                    <span className="font-mono">{selected.dob}</span>
                    <span className="text-[#64748b] text-[12px] ml-1">({calcAge(selected.dob)}세)</span>
                  </div>
                  <div className="bg-[#f4f7fc] px-3 py-2 font-semibold text-[#334155] flex items-center border-b md:border-b-0 md:border-r border-[#c2cfdf] whitespace-nowrap">
                    입사일
                  </div>
                  <div className="px-3 py-2 text-[#0e1225] font-mono flex items-center border-b md:border-b-0 md:border-r border-[#c2cfdf]">
                    {selected.hireDate}
                  </div>
                  <div className="bg-[#f4f7fc] px-3 py-2 font-semibold text-[#334155] flex items-center border-b md:border-b-0 md:border-r border-[#c2cfdf] whitespace-nowrap">
                    퇴사일
                  </div>
                  <div className="px-3 py-2 text-[#0e1225] font-mono flex items-center">
                    {selected.retireDate || '-'}
                  </div>
                </div>

                {/* Row 2: 연락처 / 이메일 / 직종 */}
                <div className="grid grid-cols-1 md:grid-cols-[90px_1fr_90px_1fr_90px_1fr] border-b border-[#c2cfdf]">
                  <div className="bg-[#f4f7fc] px-3 py-2 font-semibold text-[#334155] flex items-center border-b md:border-b-0 md:border-r border-[#c2cfdf] whitespace-nowrap">
                    연락처
                  </div>
                  <div className="px-3 py-2 text-[#0e1225] font-mono flex items-center border-b md:border-b-0 md:border-r border-[#c2cfdf]">
                    {selected.phone}
                  </div>
                  <div className="bg-[#f4f7fc] px-3 py-2 font-semibold text-[#334155] flex items-center border-b md:border-b-0 md:border-r border-[#c2cfdf] whitespace-nowrap">
                    이메일
                  </div>
                  <div className="px-3 py-2 text-[#0e1225] flex items-center border-b md:border-b-0 md:border-r border-[#c2cfdf] truncate">
                    <span className="truncate">{selected.email || '-'}</span>
                  </div>
                  <div className="bg-[#f4f7fc] px-3 py-2 font-semibold text-[#334155] flex items-center border-b md:border-b-0 md:border-r border-[#c2cfdf] whitespace-nowrap">
                    직종
                  </div>
                  <div className="px-3 py-2 text-[#0e1225] flex items-center justify-between">
                    <span className="font-semibold">{selected.job}</span>
                    <button
                      onClick={() => setIsEditModalOpen(true)}
                      className="ml-1 bg-white h-[22px] px-1.5 rounded-[4px] border border-[#c2cfdf] text-[#2a3461] text-[11px] font-medium hover:border-[#2a3461] hover:bg-[#f4f7fc] transition-colors cursor-pointer shrink-0"
                    >
                      관리
                    </button>
                  </div>
                </div>

                {/* Row 3: 주소 (세로 높이 끝까지 꽉 채움) */}
                <div className="grid grid-cols-1 md:grid-cols-[90px_1fr] flex-1">
                  <div className="bg-[#f4f7fc] px-3 py-2 font-semibold text-[#334155] flex items-center border-b md:border-b-0 md:border-r border-[#c2cfdf] whitespace-nowrap h-full">
                    주소
                  </div>
                  <div className="px-3 py-2 text-[#0e1225] flex items-center truncate h-full">
                    <span className="truncate">{selected.address} {selected.addressDetail || ''}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── 섹션 2: 상세 업무 및 이력 관리 카드 ─── */}
          <div className="flex flex-col bg-white border border-[#c2cfdf] flex-1 min-h-0 overflow-hidden shadow-2xs">
            {/* 서브 탭 바 */}
            <div className="bg-[#f4f7fc] border-b border-[#c2cfdf] flex items-center justify-between shrink-0 overflow-x-auto">
              <div className="flex items-center overflow-x-auto">
                {(['재직이력', '급여계약', '4대보험', '자격증', '인력변경 신고내역', '급여지급내역'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setActiveSubTab(t)}
                    className={`px-4 py-2.5 text-[13.5px] font-semibold whitespace-nowrap border-r border-[#c2cfdf] transition-colors cursor-pointer ${activeSubTab === t
                      ? 'bg-white text-[#ef5a27] font-bold border-b-2 border-b-[#ef5a27]'
                      : 'text-[#334155] hover:bg-[#eef2f8]'
                      }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* 서브 탭 컨텐츠 */}
            <div className="p-3.5 flex-1 overflow-y-auto flex flex-col min-h-0">
              {/* 1. 급여계약 서브 탭 (피그마 디자인 메인) */}
              {activeSubTab === '급여계약' && (
                <div className="flex flex-col gap-3 flex-1">
                  {/* 상단 컨트롤 및 근로조건 요약 */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2 flex-wrap text-[13px]">
                      <span className="font-bold text-[#0e1225] text-[14px]">근로계약 조건</span>
                      <span className="h-[24px] px-2.5 inline-flex items-center justify-center font-medium bg-[#eef3fa] text-[#2a3461] rounded-[4px] border border-[#c2cfdf]">
                        계약기간: <strong className="ml-1 text-[#0e1225]">{selected.contractPeriod}</strong>
                      </span>
                      <span className="h-[24px] px-2.5 inline-flex items-center justify-center font-medium bg-[#f0fdf4] text-[#16a34a] rounded-[4px] border border-[#bbf7d0]">
                        급여구분: <strong className="ml-1">{selected.salaryType}</strong>
                      </span>
                      <span className="h-[24px] px-2.5 inline-flex items-center justify-center font-medium bg-[#f8fafc] text-[#475569] rounded-[4px] border border-[#e2e8f0]">
                        부양가족수: 총 <strong className="text-[#0e1225] mx-0.5">{selected.dependentsCount}</strong>명 (20세 미만 {selected.minorCount}명)
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setIsAccountModalOpen(true)}
                        className="h-[30px] px-2.5 rounded-[6px] border border-[#c2cfdf] bg-white text-[#2a3461] text-[12.5px] font-semibold hover:bg-[#f8fafc] flex items-center gap-1 shadow-2xs cursor-pointer"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="5" width="20" height="14" rx="2" />
                          <line x1="2" y1="10" x2="22" y2="10" />
                        </svg>
                        지급계좌 정보
                      </button>
                      <button
                        onClick={() => setIsEditModalOpen(true)}
                        className="h-[30px] px-2.5 rounded-[6px] bg-[#2a3461] text-white text-[12.5px] font-semibold hover:bg-[#364275] flex items-center gap-1 shadow-2xs cursor-pointer"
                      >
                        <svg width="11" height="11" viewBox="0 0 13 13" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
                          <path d="M9 1.5L11.5 4L4.5 11H2V8.5L9 1.5Z" />
                        </svg>
                        기본정보 수정
                      </button>
                    </div>
                  </div>

                  {/* 급여 및 공제 내역 그리드 (2단 분할 테이블) */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {/* 좌측: 지급 항목 내역 */}
                    <div className="border border-[#c2cfdf] rounded-[4px] overflow-hidden flex flex-col bg-white">
                      <div className="bg-[#f4f7fc] px-3 py-2 border-b border-[#c2cfdf] flex items-center justify-between">
                        <span className="font-bold text-[#334155] text-[13px]">급여 지급 항목</span>
                        <span className="text-[11.5px] text-[#64748b]">과세 / 비과세 구분</span>
                      </div>
                      <table className="w-full border-collapse text-[13px]">
                        <thead>
                          <tr className="bg-[#fafbfc] border-b border-[#e2e8f0] text-[#64748b] text-[12px]">
                            <th className="px-3 py-1.5 text-left font-semibold">급여항목</th>
                            <th className="px-3 py-1.5 text-center font-semibold w-[80px]">과세구분</th>
                            <th className="px-3 py-1.5 text-right font-semibold w-[120px]">소득액</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f1f5f9]">
                          {selected.salaryItems.map((item, idx) => (
                            <tr key={idx} className="hover:bg-[#f8fafc]">
                              <td className="px-3 py-2 text-[#0e1225] font-medium">{item.name}</td>
                              <td className="px-3 py-2 text-center">
                                <span
                                  className={`px-1.5 py-0.5 rounded-[3px] text-[11px] font-bold ${item.taxType === '과세'
                                    ? 'bg-[#eff6ff] text-[#2563eb] border border-[#dbeafe]'
                                    : 'bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0]'
                                    }`}
                                >
                                  {item.taxType}
                                </span>
                              </td>
                              <td className="px-3 py-2 text-right font-mono text-[#0e1225] font-semibold">
                                {item.amount > 0 ? formatCurrency(item.amount) : '-'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="bg-[#f8fafc] border-t-2 border-[#c2cfdf] font-bold">
                            <td className="px-3 py-2.5 text-[#0e1225]" colSpan={2}>
                              급여 총액 (과세 + 비과세)
                            </td>
                            <td className="px-3 py-2.5 text-right font-mono text-[#ef5a27] text-[14px]">
                              {formatCurrency(totalSalary)}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>

                    {/* 우측: 공제 항목 내역 */}
                    <div className="border border-[#c2cfdf] rounded-[4px] overflow-hidden flex flex-col bg-white">
                      <div className="bg-[#f4f7fc] px-3 py-2 border-b border-[#c2cfdf] flex items-center justify-between">
                        <span className="font-bold text-[#334155] text-[13px]">공제 항목 (4대보험 및 세액)</span>
                        <span className="text-[11.5px] text-[#64748b]">월 예상 공제액</span>
                      </div>
                      <table className="w-full border-collapse text-[13px]">
                        <thead>
                          <tr className="bg-[#fafbfc] border-b border-[#e2e8f0] text-[#64748b] text-[12px]">
                            <th className="px-3 py-1.5 text-left font-semibold">공제항목</th>
                            <th className="px-3 py-1.5 text-right font-semibold w-[130px]">공제액</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f1f5f9]">
                          {selected.deductionItems.map((item, idx) => (
                            <tr key={idx} className="hover:bg-[#f8fafc]">
                              <td className="px-3 py-2 text-[#0e1225] font-medium">{item.name}</td>
                              <td className="px-3 py-2 text-right font-mono text-[#e11d48] font-semibold">
                                -{formatCurrency(item.amount)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="bg-[#f8fafc] border-t-2 border-[#c2cfdf] font-bold">
                            <td className="px-3 py-2.5 text-[#0e1225]">공제액 합계</td>
                            <td className="px-3 py-2.5 text-right font-mono text-[#e11d48] text-[14px]">
                              -{formatCurrency(totalDeduction)}
                            </td>
                          </tr>
                        </tfoot>
                      </table>

                      {/* 실지급액 안내 박스 */}
                      <div className="m-3 p-3 bg-[#f0fdf4] border border-[#bbf7d0] rounded-[6px] flex items-center justify-between">
                        <div>
                          <div className="text-[12px] font-bold text-[#166534]">예상 실지급액 (세후 수령액)</div>
                          <div className="text-[11px] text-[#15803d]">통상시급: {formatCurrency(selected.hourlyWage)}</div>
                        </div>
                        <div className="text-[17px] font-bold text-[#15803d] font-mono">
                          {formatCurrency(netSalary)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. 재직이력 (Figma 1:1 2단 분할 레이아웃) */}
              {activeSubTab === '재직이력' && (
                <div className="flex flex-col gap-3">
                  {/* 상단 액션 바 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-[3px] h-[14px] bg-[#2a3461] rounded-full inline-block" />
                      <span className="font-bold text-[#0e1225] text-[14px]">재직 이력</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setIsCareerAuditModalOpen(true)}
                        className="h-[28px] px-2.5 rounded-[6px] border border-[#c2cfdf] bg-white text-[#334155] text-[12px] font-semibold hover:bg-[#f8fafc] hover:border-[#2a3461] transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                        수정이력
                      </button>
                      <button
                        onClick={handleStartRehire}
                        className="h-[28px] px-2.5 rounded-[6px] bg-[#2a3461] text-white text-[12px] font-semibold hover:bg-[#364275] transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="8.5" cy="7" r="4" />
                          <line x1="20" y1="8" x2="20" y2="14" />
                          <line x1="23" y1="11" x2="17" y2="11" />
                        </svg>
                        직원 재입사 처리
                      </button>
                      <button
                        onClick={handleStartCreateCareer}
                        className="h-[28px] px-2.5 rounded-[6px] bg-[#2a3461] text-white text-[12px] font-semibold hover:bg-[#364275] transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        이력 등록
                      </button>
                    </div>
                  </div>

                  {/* 재직 이력 목록 테이블 (Full Width) */}
                  <div className="border border-[#c2cfdf] rounded-[6px] overflow-hidden bg-white shadow-2xs">
                    <table className="w-full border-collapse text-[13px]">
                      <thead>
                        <tr className="bg-[#f4f7fc] border-b border-[#c2cfdf] text-[#334155] font-bold">
                          <th className="px-3 py-2 text-center w-[60px] border-r border-[#c2cfdf]">연번</th>
                          <th className="px-3 py-2 text-left w-[140px] border-r border-[#c2cfdf]">구분</th>
                          <th className="px-3 py-2 text-left w-[140px] border-r border-[#c2cfdf]">일자</th>
                          <th className="px-3 py-2 text-left border-r border-[#c2cfdf]">비고</th>
                          <th className="px-3 py-2 text-center w-[160px]">관리</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#e2e8f0]">
                        {(selected.careerHistory || []).length === 0 ? (
                          <tr>
                            <td colSpan={5} className="text-center py-10 text-[#8a9cb4]">
                              등록된 재직 이력이 없습니다. 상단의 [이력 등록] 버튼을 눌러 이력을 추가해 주세요.
                            </td>
                          </tr>
                        ) : (
                          (selected.careerHistory || []).map((item, idx) => (
                            <tr
                              key={item.id}
                              className="hover:bg-[#f8fafc] transition-colors"
                            >
                              <td className="px-3 py-2.5 text-center font-mono text-[#64748b] border-r border-[#c2cfdf]">
                                {item.seq ?? idx + 1}
                              </td>
                              <td className="px-3 py-2.5 border-r border-[#c2cfdf]">
                                <div className="flex items-center gap-1.5">
                                  <span className="font-semibold text-[#0e1225]">{item.type}</span>
                                  {item.syncStatus === '희' && (
                                    <span className="w-[18px] h-[18px] inline-flex items-center justify-center bg-[#0093a9] text-white text-[10px] font-bold rounded-[3px] leading-none shrink-0" title="희망이음 연동">
                                      희
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="px-3 py-2.5 font-mono text-[#334155] border-r border-[#c2cfdf]">
                                {item.date}
                              </td>
                              <td className="px-3 py-2.5 text-[#475569] border-r border-[#c2cfdf]">
                                {item.reason || '-'}
                              </td>
                              <td className="px-2 py-2.5 text-center">
                                <div className="flex items-center justify-center gap-1">
                                  <button
                                    onClick={() => handleStartInsertCareer(item.id)}
                                    title="이 이력 바로 다음에 중간 이력 추가"
                                    className="px-2 py-1 border border-[#bfdbfe] bg-[#eff6ff] rounded-[4px] text-[11px] font-semibold text-[#2563eb] hover:bg-[#dbeafe] transition-colors cursor-pointer"
                                  >
                                    + 삽입
                                  </button>
                                  <button
                                    onClick={() => handleStartEditCareer(item)}
                                    className="px-2 py-1 border border-[#c2cfdf] rounded-[4px] text-[11px] font-medium text-[#2a3461] hover:bg-[#eef3fa] hover:border-[#2a3461] transition-colors cursor-pointer"
                                  >
                                    수정
                                  </button>
                                  <button
                                    onClick={() => handleDeleteCareerItem(item.id)}
                                    disabled={item.type === '최초입사일'}
                                    title={item.type === '최초입사일' ? '최초입사일 이력은 삭제할 수 없습니다.' : '이력 삭제'}
                                    className={`px-2 py-1 border rounded-[4px] text-[11px] font-medium transition-colors ${
                                      item.type === '최초입사일'
                                        ? 'border-[#e2e8f0] text-[#cbd5e1] cursor-not-allowed bg-[#f8fafc]'
                                        : 'border-[#fecaca] text-[#e11d48] hover:bg-[#fee2e2] cursor-pointer'
                                    }`}
                                  >
                                    삭제
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 3. 4대보험 */}
              {activeSubTab === '4대보험' && (
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#0e1225] text-[14px]">4대보험 취득 및 상실 현황</span>
                    <button
                      onClick={() => alert('4대보험 가입/상실 상태 변경 모달을 엽니다.')}
                      className="h-[28px] px-2.5 bg-[#2a3461] text-white rounded-[6px] text-[12px] font-semibold"
                    >
                      보험 설정
                    </button>
                  </div>
                  <div className="border border-[#c2cfdf] rounded-[4px] overflow-hidden">
                    <table className="w-full border-collapse text-[13px]">
                      <thead>
                        <tr className="bg-[#f4f7fc] border-b border-[#c2cfdf] text-[#334155] font-bold">
                          <th className="px-3 py-2 text-left border-r border-[#c2cfdf]">보험종류</th>
                          <th className="px-3 py-2 text-center border-r border-[#c2cfdf]">가입여부</th>
                          <th className="px-3 py-2 text-left border-r border-[#c2cfdf]">취득일자</th>
                          <th className="px-3 py-2 text-left">비고/특이사항</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#e2e8f0]">
                        <tr className="hover:bg-[#f8fafc]">
                          <td className="px-3 py-2.5 font-semibold text-[#0e1225] border-r border-[#c2cfdf]">국민연금</td>
                          <td className="px-3 py-2.5 text-center border-r border-[#c2cfdf]">
                            <span className="px-2 py-0.5 bg-[#e8f8ed] text-[#1c9640] rounded-[4px] text-[11px] font-bold">가입</span>
                          </td>
                          <td className="px-3 py-2.5 font-mono text-[#475569] border-r border-[#c2cfdf]">{selected.hireDate}</td>
                          <td className="px-3 py-2.5 text-[#64748b]">정상 취득</td>
                        </tr>
                        <tr className="hover:bg-[#f8fafc]">
                          <td className="px-3 py-2.5 font-semibold text-[#0e1225] border-r border-[#c2cfdf]">건강보험</td>
                          <td className="px-3 py-2.5 text-center border-r border-[#c2cfdf]">
                            <span className="px-2 py-0.5 bg-[#e8f8ed] text-[#1c9640] rounded-[4px] text-[11px] font-bold">가입</span>
                          </td>
                          <td className="px-3 py-2.5 font-mono text-[#475569] border-r border-[#c2cfdf]">{selected.hireDate}</td>
                          <td className="px-3 py-2.5 text-[#64748b]">장기요양 포함</td>
                        </tr>
                        <tr className="hover:bg-[#f8fafc]">
                          <td className="px-3 py-2.5 font-semibold text-[#0e1225] border-r border-[#c2cfdf]">고용보험</td>
                          <td className="px-3 py-2.5 text-center border-r border-[#c2cfdf]">
                            <span className="px-2 py-0.5 bg-[#e8f8ed] text-[#1c9640] rounded-[4px] text-[11px] font-bold">가입</span>
                          </td>
                          <td className="px-3 py-2.5 font-mono text-[#475569] border-r border-[#c2cfdf]">{selected.hireDate}</td>
                          <td className="px-3 py-2.5 text-[#64748b]">
                            {selected.employmentUnemployment ? '실업급여 적용' : '고용안정·직능개발만 적용 (만65세 이후 신규고용)'}
                          </td>
                        </tr>
                        <tr className="hover:bg-[#f8fafc]">
                          <td className="px-3 py-2.5 font-semibold text-[#0e1225] border-r border-[#c2cfdf]">산재보험</td>
                          <td className="px-3 py-2.5 text-center border-r border-[#c2cfdf]">
                            <span className="px-2 py-0.5 bg-[#e8f8ed] text-[#1c9640] rounded-[4px] text-[11px] font-bold">가입</span>
                          </td>
                          <td className="px-3 py-2.5 font-mono text-[#475569] border-r border-[#c2cfdf]">{selected.hireDate}</td>
                          <td className="px-3 py-2.5 text-[#64748b]">전액 사업주 부담</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 4. 자격증 */}
              {activeSubTab === '자격증' && (
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#0e1225] text-[14px]">보유 자격 및 면허 정보</span>
                    <button className="h-[28px] px-2.5 bg-[#2a3461] text-white rounded-[6px] text-[12px] font-semibold">
                      자격증 등록
                    </button>
                  </div>
                  <div className="border border-[#c2cfdf] rounded-[4px] overflow-hidden">
                    <table className="w-full border-collapse text-[13px]">
                      <thead>
                        <tr className="bg-[#f4f7fc] border-b border-[#c2cfdf] text-[#334155] font-bold">
                          <th className="px-3 py-2 text-left border-r border-[#c2cfdf]">자격/면허명</th>
                          <th className="px-3 py-2 text-left border-r border-[#c2cfdf]">자격번호</th>
                          <th className="px-3 py-2 text-left border-r border-[#c2cfdf]">취득일자</th>
                          <th className="px-3 py-2 text-left">발급기관</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-[#e2e8f0]">
                          <td className="px-3 py-2.5 font-bold text-[#0e1225] border-r border-[#c2cfdf]">{selected.job} 1급</td>
                          <td className="px-3 py-2.5 font-mono text-[#475569] border-r border-[#c2cfdf]">2019-1-12345</td>
                          <td className="px-3 py-2.5 font-mono text-[#475569] border-r border-[#c2cfdf]">2019-02-20</td>
                          <td className="px-3 py-2.5 text-[#334155]">보건복지부</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 5. 인력변경 신고내역 */}
              {activeSubTab === '인력변경 신고내역' && (
                <div className="flex flex-col gap-2.5">
                  <span className="font-bold text-[#0e1225] text-[14px]">공단 인력변경(입·퇴사/직무변경) 통보 내역</span>
                  <div className="border border-[#c2cfdf] rounded-[4px] overflow-hidden p-6 text-center text-[#8a9cb4]">
                    최근 1년간 공단 통보 완료된 인력변경 신고 이력이 1건 있습니다. (2020-03-01 채용신고 완료)
                  </div>
                </div>
              )}

              {/* 6. 급여지급내역 */}
              {activeSubTab === '급여지급내역' && (
                <div className="flex flex-col gap-2.5">
                  <span className="font-bold text-[#0e1225] text-[14px]">월별 급여대장 지급 이력</span>
                  <div className="border border-[#c2cfdf] rounded-[4px] overflow-hidden">
                    <table className="w-full border-collapse text-[13px]">
                      <thead>
                        <tr className="bg-[#f4f7fc] border-b border-[#c2cfdf] text-[#334155] font-bold">
                          <th className="px-3 py-2 text-left border-r border-[#c2cfdf]">귀속년월</th>
                          <th className="px-3 py-2 text-right border-r border-[#c2cfdf]">지급총액</th>
                          <th className="px-3 py-2 text-right border-r border-[#c2cfdf]">공제총액</th>
                          <th className="px-3 py-2 text-right border-r border-[#c2cfdf]">실지급액</th>
                          <th className="px-3 py-2 text-center">지급일자</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#e2e8f0]">
                        {[
                          { m: '2026년 02월', gross: 2156880, ded: 195410, net: 1961470, date: '2026-02-25' },
                          { m: '2026년 01월', gross: 2156880, ded: 195410, net: 1961470, date: '2026-01-25' },
                          { m: '2025년 12월', gross: 2156880, ded: 192800, net: 1964080, date: '2025-12-25' },
                        ].map((row, idx) => (
                          <tr key={idx} className="hover:bg-[#f8fafc]">
                            <td className="px-3 py-2.5 font-medium text-[#0e1225] border-r border-[#c2cfdf]">{row.m}</td>
                            <td className="px-3 py-2.5 text-right font-mono text-[#0e1225] border-r border-[#c2cfdf]">{formatCurrency(row.gross)}</td>
                            <td className="px-3 py-2.5 text-right font-mono text-[#e11d48] border-r border-[#c2cfdf]">-{formatCurrency(row.ded)}</td>
                            <td className="px-3 py-2.5 text-right font-mono text-[#15803d] font-bold border-r border-[#c2cfdf]">{formatCurrency(row.net)}</td>
                            <td className="px-3 py-2.5 text-center font-mono text-[#64748b]">{row.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 bg-white border border-[#c2cfdf] flex items-center justify-center text-[#8a9cb4] text-[15px] font-medium shadow-2xs">
          좌측 목록에서 조회할 종사자를 선택해 주세요.
        </div>
      )}

      {/* ─── 피그마 1:1 종사자 정보 수정 모달 (Node 2282-76979) ─── */}
      {isEditModalOpen && selected && (
        <EmployeeInfoEditModal
          employee={selected}
          onSave={handleSaveEmployee}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}

      {/* ─── 피그마 1:1 재직 상태 관리 (퇴사/휴직/보류) 모달 (Node 2589-30921) ─── */}
      {isTenureModalOpen && selected && (
        <TenureStatusModal
          employee={selected}
          onSave={handleSaveTenureStatus}
          onClose={() => setIsTenureModalOpen(false)}
        />
      )}

      {/* ─── 이력 수정 로그 모달 ─── */}
      {isCareerAuditModalOpen && selected && (
        <CareerAuditModal
          employee={selected}
          onClose={() => setIsCareerAuditModalOpen(false)}
        />
      )}

      {/* ─── 재직 이력 등록 / 수정 모달 (중간 이력 삽입 및 앞/뒤 교차 검증) ─── */}
      {isCareerEditModalOpen && selected && (
        <CareerHistoryEditModal
          employee={selected}
          initialItem={editingCareerItem}
          initialInsertAfterId={insertAfterCareerId}
          onSave={handleSaveCareerModal}
          onClose={() => {
            setIsCareerEditModalOpen(false)
            setEditingCareerItem(null)
            setInsertAfterCareerId(null)
          }}
        />
      )}

      {/* ─── 모달: 지급계좌 정보 ─── */}
      {isAccountModalOpen && selected && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setIsAccountModalOpen(false)} />
          <div className="relative bg-white rounded-[16px] shadow-[0px_20px_50px_rgba(0,0,0,0.2)] w-full max-w-[420px] flex flex-col overflow-hidden border border-[#c2cfdf]">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#c2cfdf] bg-white">
              <span className="font-bold text-[16px] text-[#0e1225]">급여 지급계좌 정보</span>
              <button onClick={() => setIsAccountModalOpen(false)} className="p-1 rounded-[6px] text-[#8a9cb4] hover:text-[#0e1225]">
                ✕
              </button>
            </div>
            <div className="p-5 flex flex-col gap-3.5 text-[13px]">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#0e1225]">은행명</label>
                <input
                  defaultValue={selected.bankName || '국민은행'}
                  id="modal-bank-name"
                  className="h-[36px] border border-[#c2cfdf] rounded-[6px] px-3 text-[13px] text-[#0e1225]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#0e1225]">계좌번호</label>
                <input
                  defaultValue={selected.accountNumber || '123-456-789012'}
                  id="modal-account-no"
                  className="h-[36px] border border-[#c2cfdf] rounded-[6px] px-3 font-mono text-[13px] text-[#0e1225]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#0e1225]">예금주명</label>
                <input
                  defaultValue={selected.accountHolder || selected.name}
                  id="modal-account-holder"
                  className="h-[36px] border border-[#c2cfdf] rounded-[6px] px-3 text-[13px] text-[#0e1225]"
                />
              </div>
            </div>
            <div className="px-5 py-3.5 border-t border-[#c2cfdf] bg-[#fafbfc] flex justify-end gap-2">
              <button
                onClick={() => setIsAccountModalOpen(false)}
                className="h-[36px] px-4 border border-[#c2cfdf] rounded-[8px] text-[13px] font-semibold text-[#475569] hover:bg-[#f1f5f9]"
              >
                취소
              </button>
              <button
                onClick={() => {
                  const bName = (document.getElementById('modal-bank-name') as HTMLInputElement)?.value || '국민은행'
                  const aNo = (document.getElementById('modal-account-no') as HTMLInputElement)?.value || ''
                  const aHolder = (document.getElementById('modal-account-holder') as HTMLInputElement)?.value || selected.name

                  handleSaveEmployee({
                    ...selected,
                    bankName: bName,
                    accountNumber: aNo,
                    accountHolder: aHolder,
                  })
                  setIsAccountModalOpen(false)
                }}
                className="h-[36px] px-5 bg-[#1e293b] text-white rounded-[8px] text-[13px] font-bold hover:bg-[#334155] flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                저장
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── 모달: 일정표 보기 ─── */}
      {isScheduleModalOpen && selected && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setIsScheduleModalOpen(false)} />
          <div className="relative bg-white rounded-[16px] shadow-[0px_20px_50px_rgba(0,0,0,0.2)] w-full max-w-[620px] flex flex-col overflow-hidden border border-[#c2cfdf]">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#c2cfdf] bg-white">
              <span className="font-bold text-[16px] text-[#0e1225]">
                {selected.name} 님의 근무 및 방문 일정표
              </span>
              <button onClick={() => setIsScheduleModalOpen(false)} className="p-1 rounded-[6px] text-[#8a9cb4] hover:text-[#0e1225]">
                ✕
              </button>
            </div>
            <div className="p-5 flex flex-col gap-3">
              <div className="border border-[#c2cfdf] rounded-[6px] overflow-hidden">
                <table className="w-full border-collapse text-[13px]">
                  <thead>
                    <tr className="bg-[#f4f7fc] border-b border-[#c2cfdf] text-[#334155] font-bold">
                      <th className="px-3 py-2 text-left border-r border-[#c2cfdf]">시간</th>
                      <th className="px-3 py-2 text-left border-r border-[#c2cfdf]">수급자</th>
                      <th className="px-3 py-2 text-left border-r border-[#c2cfdf]">서비스</th>
                      <th className="px-3 py-2 text-center">상태</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e2e8f0]">
                    {[
                      { time: '09:00 ~ 12:00', recipient: '홍길순 수급자', service: '방문요양', status: '완료' },
                      { time: '13:00 ~ 16:00', recipient: '이영희 수급자', service: '방문요양', status: '진행중' },
                      { time: '16:30 ~ 17:30', recipient: '박민수 수급자', service: '방문목욕', status: '예정' },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#f8fafc]">
                        <td className="px-3 py-2.5 font-mono text-[#0e1225] border-r border-[#c2cfdf]">{row.time}</td>
                        <td className="px-3 py-2.5 font-bold text-[#2a3461] border-r border-[#c2cfdf]">{row.recipient}</td>
                        <td className="px-3 py-2.5 text-[#334155] border-r border-[#c2cfdf]">{row.service}</td>
                        <td className="px-3 py-2.5 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-[4px] text-[11px] font-bold ${row.status === '완료'
                              ? 'bg-[#e8f8ed] text-[#1c9640]'
                              : row.status === '진행중'
                                ? 'bg-[#eff6ff] text-[#2563eb]'
                                : 'bg-[#f1f5f9] text-[#64748b]'
                              }`}
                          >
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="px-5 py-3.5 border-t border-[#c2cfdf] bg-[#fafbfc] flex justify-end">
              <button onClick={() => setIsScheduleModalOpen(false)} className="h-[36px] px-5 bg-[#1e293b] text-white rounded-[8px] text-[13px] font-bold hover:bg-[#334155]">
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
