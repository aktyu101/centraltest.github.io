import { useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import svgPaths from '@/imports/SideBar/svg-o4o6c5ginm'
import EvaluationManualPage from './pages/EvaluationManualPage'
import EmployeeManagementPage from './pages/EmployeeManagementPage'
import BenefitCalculatorModal from './components/BenefitCalculatorModal'
import DatePickerModal from './components/DatePickerModal'
import topNavSvg from '@/imports/TopNav/svg-71k32nm55t'
import rightSvg from '@/imports/Right/svg-39sn13e4v2'

// ─── Types ────────────────────────────────────────────────────────────────────

type GradeHistory = { grade: string; rcgtNo: string; from: string; to: string; services: string[] }
type CopayHistory = { rate: number; label: string; qualifier: string; reason: string; from: string; to: string | null }
type ContractHistory = { service: string; contractDate: string; from: string; to: string }
type Beneficiary = {
  id: string
  rcgtNo: string
  name: string
  dob: string
  gender: '남' | '여'
  grade: string
  gradeHistory: GradeHistory[]
  contractStatus: '계약중' | '만료' | '해지'
  contractDate: string
  contractPeriod: string
  contractHistory: ContractHistory[]
  rcgtExpiry: string
  benefitStartDate?: string
  customLimit?: number
  address: string
  addressManaged?: boolean
  phone: string
  copayLabel: string
  copayHistory: CopayHistory[]
  livingRoom: string
  workers: { name: string }[]
  diagnosis: string
  memo: string
  services: string[]
  rcgtPeriod: string
}

// ─── Staff Data ───────────────────────────────────────────────────────────────

type Staff = { id: string; name: string; dob: string; job: string }

const STAFF_LIST: Staff[] = [
  { id: 'S001', name: '홍길순', dob: '1945.11.03', job: '요양보호사' },
  { id: 'S002', name: '이영희', dob: '1937.05.12', job: '요양보호사' },
  { id: 'S003', name: '박민수', dob: '1942.03.22', job: '요양보호사' },
  { id: 'S004', name: '김철호', dob: '1955.07.14', job: '사회복지사' },
  { id: 'S005', name: '최지영', dob: '1940.09.30', job: '시설장' },
  { id: 'S006', name: '정수진', dob: '1948.02.18', job: '요양보호사' },
  { id: 'S007', name: '강민준', dob: '1951.06.05', job: '요양보호사' },
  { id: 'S008', name: '윤서연', dob: '1939.12.27', job: '사회복지사' },
  { id: 'S009', name: '임태현', dob: '1946.04.11', job: '프로그램 관리자' },
  { id: 'S010', name: '한소희', dob: '1953.08.09', job: '요양보호사' },
]

// ─── Data ─────────────────────────────────────────────────────────────────────

const DATA: Beneficiary[] = [
  {
    id: 'B001', rcgtNo: '00000000001',
    name: '홍길순', dob: '1945.11.03', gender: '여', grade: '2',
    gradeHistory: [{ grade: '3등급', rcgtNo: '00000000001', from: '2021.03.01', to: '2023.02.28', services: ['방문요양'] }, { grade: '2등급', rcgtNo: '00000000001', from: '2023.03.01', to: '2027.02.28', services: ['방문요양', '방문목욕'] }],
    contractStatus: '계약중', contractDate: '2025.02.20', contractPeriod: '2025.03.01 - 2027.02.28',
    contractHistory: [
      { service: '방문요양', contractDate: '2021.02.10', from: '2021.03.01', to: '2023.02.28' },
      { service: '방문요양', contractDate: '2023.02.15', from: '2023.03.01', to: '2025.02.28' },
      { service: '방문요양', contractDate: '2025.02.20', from: '2025.03.01', to: '2027.02.28' },
      { service: '방문목욕', contractDate: '2023.02.15', from: '2023.03.01', to: '2025.02.28' },
      { service: '방문목욕', contractDate: '2025.02.20', from: '2025.03.01', to: '2027.02.28' },
    ],
    rcgtExpiry: '2026.01.08', rcgtPeriod: '2025.03.01 - 2027.02.28',
    address: '서울시 노원구 상계동 123-4', phone: '010-3214-5678',
    copayLabel: '감경(40%)-15%', copayHistory: [{ rate: 15, label: '감경(40%)-15%', qualifier: '감경(40%)', reason: '감경 갱신', from: '2023.03.01', to: null }, { rate: 20, label: '일반-20%', qualifier: '일반', reason: '최초 연동', from: '2021.03.01', to: '2023.02.28' }],
    livingRoom: '1생활실', workers: [{ name: '이지현' }],
    diagnosis: '치매, 고혈압', memo: '인슐린 투약 주의, 오전 방문 선호',
    services: ['방문요양', '방문목욕'],
  },
  {
    id: 'B002', rcgtNo: '00000000002',
    name: '이영희', dob: '1937.05.12', gender: '여', grade: '1',
    gradeHistory: [{ grade: '1등급', rcgtNo: '00000000002', from: '2024.01.01', to: '2026.12.31', services: ['방문요양'] }],
    contractStatus: '계약중', contractDate: '2023.12.22', contractPeriod: '2024.01.01 - 2026.12.31',
    contractHistory: [
      { service: '방문요양', contractDate: '2023.12.22', from: '2024.01.01', to: '2026.12.31' },
    ],
    rcgtExpiry: '2026.01.02', rcgtPeriod: '2024.01.01 - 2026.12.31',
    address: '서울시 노원구 월계동 55-2', phone: '010-4455-6677',
    copayLabel: '일반-15%', copayHistory: [{ rate: 15, label: '일반-15%', qualifier: '일반', reason: '최초 연동', from: '2024.01.01', to: null }],
    livingRoom: '-', workers: [{ name: '최민호' }],
    diagnosis: '파킨슨, 당뇨', memo: '낙상 위험, 이동 보조 필요',
    services: ['방문요양'],
  },
  {
    id: 'B003', rcgtNo: '00000000003',
    name: '박민수', dob: '1942.03.22', gender: '남', grade: '3',
    gradeHistory: [{ grade: '2등급', rcgtNo: '00000000003', from: '2022.08.01', to: '2024.07.31', services: ['방문요양'] }, { grade: '3등급', rcgtNo: '00000000003', from: '2024.08.01', to: '2026.07.31', services: ['방문요양', '방문간호'] }],
    contractStatus: '만료', contractDate: '2022.07.15', contractPeriod: '2022.08.01 - 2026.07.31',
    contractHistory: [
      { service: '방문요양', contractDate: '2022.07.15', from: '2022.08.01', to: '2024.07.31' },
      { service: '방문요양', contractDate: '2024.07.10', from: '2024.08.01', to: '2026.07.31' },
      { service: '방문간호', contractDate: '2024.07.10', from: '2024.08.01', to: '2026.07.31' },
    ],
    rcgtExpiry: '2026.01.05', rcgtPeriod: '2024.08.01 - 2026.07.31',
    address: '서울시 노원구 중계동 8-11', phone: '010-7788-9900',
    copayLabel: '감경(60%)-8%', copayHistory: [{ rate: 8, label: '감경(60%)-8%', qualifier: '감경(60%)', reason: '최초 연동', from: '2024.08.01', to: null }],
    livingRoom: '-', workers: [{ name: '이지현' }],
    diagnosis: '뇌졸중, 와상상태', memo: '입원 중 (서울의료원)',
    services: ['방문요양', '방문간호'],
  },
  {
    id: 'B004', rcgtNo: '00000000004',
    name: '김철호', dob: '1955.07.14', gender: '남', grade: '1',
    gradeHistory: [{ grade: '1등급', rcgtNo: '00000000004', from: '2025.02.01', to: '2027.01.31', services: ['방문요양'] }],
    contractStatus: '계약중', contractDate: '2025.01.24', contractPeriod: '2025.02.01 - 2027.01.31',
    contractHistory: [
      { service: '방문요양', contractDate: '2025.01.24', from: '2025.02.01', to: '2027.01.31' },
    ],
    rcgtExpiry: '2026.01.09', rcgtPeriod: '2025.02.01 - 2027.01.31',
    address: '서울시 노원구 공릉동 211-7', phone: '010-2233-4455',
    copayLabel: '일반-15%', copayHistory: [{ rate: 15, label: '일반-15%', qualifier: '일반', reason: '최초 연동', from: '2025.02.01', to: null }],
    livingRoom: '-', workers: [{ name: '최민호' }],
    diagnosis: '관절염, 우울증', memo: '정서적 지지 중심 서비스',
    services: ['방문요양'],
  },
  {
    id: 'B005', rcgtNo: '00000000005',
    name: '최지영', dob: '1940.09.30', gender: '여', grade: '2',
    gradeHistory: [{ grade: '인지지원등급', rcgtNo: '00000000005', from: '2024.05.01', to: '2025.04.30', services: ['방문요양'] }, { grade: '2등급', rcgtNo: '00000000005', from: '2025.05.01', to: '2027.04.30', services: ['방문요양', '방문목욕', '방문간호'] }],
    contractStatus: '계약중', contractDate: '2025.04.18', contractPeriod: '2025.05.01 - 2027.04.30',
    contractHistory: [
      { service: '방문요양', contractDate: '2024.04.20', from: '2024.05.01', to: '2025.04.30' },
      { service: '방문요양', contractDate: '2025.04.18', from: '2025.05.01', to: '2027.04.30' },
      { service: '방문목욕', contractDate: '2025.04.18', from: '2025.05.01', to: '2026.04.30' },
      { service: '방문간호', contractDate: '2025.04.18', from: '2025.05.01', to: '2027.04.30' },
    ],
    rcgtExpiry: '2026.01.12', rcgtPeriod: '2025.05.01 - 2027.04.30',
    address: '서울시 노원구 하계동 77-3', phone: '010-6677-8899',
    copayLabel: '일반-15%', copayHistory: [{ rate: 8, label: '감경(40%)-8%', qualifier: '감경(40%)', reason: '최초 연동', from: '2025.05.01', to: '2026.06.30' }, { rate: 15, label: '일반-15%', qualifier: '일반', reason: '자격 변경', from: '2026.07.01', to: null }],
    livingRoom: '1생활실', workers: [{ name: '이지현' }, { name: '오미란' }],
    diagnosis: '심부전, 당뇨, 고혈압', memo: '혈압 모니터링 주 1회 필수',
    services: ['방문요양', '방문목욕', '방문간호'],
  },
  {
    id: 'B006', rcgtNo: '00000000006',
    name: '정수진', dob: '1948.02.18', gender: '여', grade: '3',
    gradeHistory: [{ grade: '3등급', rcgtNo: '00000000006', from: '2023.06.01', to: '2026.05.31', services: ['방문요양', '방문목욕'] }],
    contractStatus: '계약중', contractDate: '2023.05.23', contractPeriod: '2023.06.01 - 2026.05.31',
    contractHistory: [
      { service: '방문요양', contractDate: '2023.05.23', from: '2023.06.01', to: '2026.05.31' },
      { service: '방문목욕', contractDate: '2023.05.23', from: '2023.06.01', to: '2025.05.31' },
      { service: '방문목욕', contractDate: '2025.05.10', from: '2025.06.01', to: '2026.05.31' },
    ],
    rcgtExpiry: '2026.01.15', rcgtPeriod: '2023.06.01 - 2026.05.31',
    address: '서울시 노원구 월계동 99-5', phone: '010-1122-3344',
    copayLabel: '일반-15%', copayHistory: [{ rate: 15, label: '일반-15%', qualifier: '일반', reason: '최초 연동', from: '2023.06.01', to: null }],
    livingRoom: '1생활실', workers: [{ name: '최민호' }],
    diagnosis: '척추협착증, 당뇨', memo: '',
    services: ['방문요양', '방문목욕'],
  },
  {
    id: 'B007', rcgtNo: '00000000007',
    name: '강민준', dob: '1951.06.05', gender: '남', grade: '1',
    gradeHistory: [{ grade: '1등급', rcgtNo: '00000000007', from: '2024.09.01', to: '2026.08.31', services: ['방문요양', '방문간호'] }],
    contractStatus: '계약중', contractDate: '2024.08.20', contractPeriod: '2024.09.01 - 2026.08.31',
    contractHistory: [
      { service: '방문요양', contractDate: '2024.08.20', from: '2024.09.01', to: '2026.08.31' },
      { service: '방문간호', contractDate: '2024.08.20', from: '2024.09.01', to: '2025.08.31' },
      { service: '방문간호', contractDate: '2025.08.10', from: '2025.09.01', to: '2026.08.31' },
    ],
    rcgtExpiry: '2026.01.18', rcgtPeriod: '2024.09.01 - 2026.08.31',
    address: '서울시 노원구 상계동 801-2', phone: '010-9988-7766',
    copayLabel: '감경(60%)-8%', copayHistory: [{ rate: 8, label: '감경(60%)-8%', qualifier: '감경(60%)', reason: '최초 연동', from: '2024.09.01', to: null }],
    livingRoom: '1생활실', workers: [{ name: '이지현' }],
    diagnosis: '뇌경색 후유증', memo: '언어장애, 필담 가능',
    services: ['방문요양', '방문간호'],
  },
  {
    id: 'B008', rcgtNo: '00000000008',
    name: '윤서연', dob: '1939.12.27', gender: '여', grade: '2',
    gradeHistory: [{ grade: '2등급', rcgtNo: '00000000008', from: '2023.01.01', to: '2025.12.31', services: ['방문요양'] }, { grade: '2등급', rcgtNo: '00000000008', from: '2026.01.01', to: '2027.12.31', services: ['방문요양'] }],
    contractStatus: '계약중', contractDate: '2025.12.15', contractPeriod: '2026.01.01 - 2027.12.31',
    contractHistory: [
      { service: '방문요양', contractDate: '2023.12.20', from: '2023.01.01', to: '2025.12.31' },
      { service: '방문요양', contractDate: '2025.12.15', from: '2026.01.01', to: '2027.12.31' },
    ],
    rcgtExpiry: '2026.01.20', rcgtPeriod: '2026.01.01 - 2027.12.31',
    address: '서울시 노원구 공릉동 5-77', phone: '010-5544-3322',
    copayLabel: '일반-15%', copayHistory: [{ rate: 15, label: '일반-15%', qualifier: '일반', reason: '최초 연동', from: '2023.01.01', to: null }],
    livingRoom: '-', workers: [{ name: '최민호' }],
    diagnosis: '치매', memo: '',
    services: ['방문요양'],
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function calcAge(dob: string) {
  const [y, m, d] = dob.split('.').map(Number)
  const today = new Date('2026-08-13')
  let age = today.getFullYear() - y
  if (today.getMonth() + 1 < m || (today.getMonth() + 1 === m && today.getDate() < d)) age--
  return age
}

const GRADE_COLOR: Record<string, string> = {
  '1': 'bg-error-bg-subtle text-error-text',
  '2': 'bg-primary-bg-subtle text-primary-text',
  '3': 'bg-warning-bg-subtle text-warning-text',
  '4': 'bg-success-bg-subtle text-success-text',
  '인지지원': 'bg-purple-100 text-purple-700',
}
function gradeDisplay(g: string) {
  if (g.includes('인지')) return '인지'
  return g.replace(/[^0-9]/g, '') || g
}
function gradeKey(grade: string) {
  if (grade.includes('인지')) return '인지지원'
  return grade.replace(/[^0-9]/g, '')
}

// 2026년 공단 고시 장기요양 재가급여 월 한도액
const GRADE_MONTHLY_LIMIT: Record<string, number> = {
  '1': 2512900,
  '2': 2331200,
  '3': 1528200,
  '4': 1409700,
  '5': 1208900,
  '인지지원': 676320,
}

function getMonthlyLimit(grade: string, customLimit?: number): number {
  if (customLimit) return customLimit
  const k = gradeKey(grade)
  return GRADE_MONTHLY_LIMIT[k] ?? 1869600
}

function formatCurrency(val: number): string {
  return `${val.toLocaleString()}원`
}

const SERVICE_SHORT: Record<string, string> = {
  '방문요양': '요',
  '방문목욕': '목',
  '방문간호': '간',
  '요양': '요',
  '목욕': '목',
  '간호': '간',
}
const SERVICE_COLORS: Record<string, string> = {
  '방문요양': 'bg-svc-care-bg text-svc-care-text border-svc-care-border',
  '방문목욕': 'bg-svc-bath-bg text-svc-bath-text border-svc-bath-border',
  '방문간호': 'bg-svc-nurse-bg text-svc-nurse-text border-svc-nurse-border',
}

const INITIAL_SCHEDULE_DATA = {
  '일간': [
    { id: 'd1', status: '미완료', title: '방문요양 급여제공기록지 발송', date: '9월 15일', enabled: true, autoDetermined: false },
    { id: 'd2', status: '미완료', title: '방문목욕 욕구평가', date: '9월 15일', enabled: true, autoDetermined: false },
    { id: 'd3', status: '진행중', title: '방문간호 지시서 갱신', date: '9월 15일', enabled: true, autoDetermined: false },
    { id: 'd4', status: '완료', title: '전월 급여산정 및 지급', date: '9월 1일', enabled: true, autoDetermined: true },
  ],
  '분기별': [
    { id: 'q1', status: '미완료', title: '수급자 급여제공계획서 재평가', date: '9월 30일', enabled: true, autoDetermined: false },
    { id: 'q2', status: '미완료', title: '종사자 안전보건 교육', date: '9월 30일', enabled: true, autoDetermined: false },
  ],
  '반기별': [
    { id: 'h1', status: '미완료', title: '소방시설 점검 및 보고', date: '9월 30일', enabled: true, autoDetermined: true },
  ],
  '연간': [
    { id: 'y1', status: '미완료', title: '운영규정 및 지침 점검', date: '12월 31일', enabled: true, autoDetermined: false },
  ]
};

function ScheduleListWidget({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState('일간');
  const tabs = ['일간', '분기별', '반기별', '연간'];
  const items = INITIAL_SCHEDULE_DATA[activeTab as keyof typeof INITIAL_SCHEDULE_DATA] || [];

  return (
    <div className={className || "flex flex-col bg-white overflow-hidden w-full border border-[#c2cfdf] h-full"}>
      <div className="flex border-b border-[#c2cfdf] bg-[#fafbfc]">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-[13.5px] font-bold text-center transition-colors border-r border-[#c2cfdf] last:border-r-0 ${activeTab === tab ? 'bg-[#2a3461] text-white' : 'text-[#475569] hover:bg-[#f1f5f9]'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-3 flex items-center justify-between border-b border-[#c2cfdf] bg-[#fafbfc]">
        <h2 className="text-[16px] font-bold text-[#0e1225] inline-flex items-center gap-1.5 leading-none shrink-0">
          <span className="w-[4px] h-[16px] bg-[#ef5a27] inline-block rounded-[2px] shrink-0" />
          {activeTab} 주요 일정 확인
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        <ul className="divide-y divide-[#e2e8f0]">
          {items.map((item, idx) => (
            <li key={item.id} className="flex items-center justify-between p-3 hover:bg-[#f8fafc] transition-colors">
              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded-[4px] text-[11px] font-bold border ${item.status === '미완료' ? 'bg-[#fff1f2] text-[#e11d48] border-[#ffe4e6]' : item.status === '진행중' ? 'bg-[#fefce8] text-[#ca8a04] border-[#fef08a]' : 'bg-[#f0fdf4] text-[#16a34a] border-[#dcfce7]'}`}>
                  {item.status}
                </span>
                <span className="text-[13px] font-medium text-[#0e1225]">{item.title}</span>
              </div>
              <div className="flex items-center gap-3">
                {activeTab === '일간' && (
                  <span className="text-[12px] text-[#64748b] font-medium">{item.date}</span>
                )}
                <button className="bg-white border border-[#c2cfdf] text-[#2a3461] hover:bg-[#f1f5f9] px-2 py-0.5 rounded-[4px] text-[11px] font-bold transition-colors shadow-xs flex items-center gap-1 group">
                  바로가기
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-3 bg-[#f8fafc] border-t border-[#c2cfdf] text-[11.5px] text-[#475569] leading-tight">
        <strong className="text-[#2a3461]">※</strong> 기관 운영에 필요한 주요 업무 일정을 제공합니다. 업무 진행 상황을 관리해 주세요.
      </div>
    </div>
  );
}

function BeneficiaryStatsWidget({ data, className }: { data: Beneficiary[], className?: string }) {
  const activeData = data.filter(d => d.contractStatus === '계약중')
  const total = activeData.length

  const services = activeData.reduce((acc, curr) => {
    curr.services.forEach(s => {
      acc[s] = (acc[s] || 0) + 1
    })
    return acc
  }, {} as Record<string, number>)

  const gradesList = ['1', '2', '3', '4', '5', '인지']
  const ratesList = ['일반', '감경(40%)', '감경(60%)', '의료', '기초']

  const rateLabel = (r: string) => {
    if (r === '일반') return '일반 15%'
    if (r === '감경(40%)') return '감경 9%'
    if (r === '감경(60%)') return '감경 6%'
    if (r === '의료') return '의료 6%'
    return '기초 0%'
  }

  // Precompute matrix
  const matrix: Record<string, Record<string, { m: number, f: number }>> = {}
  gradesList.forEach(g => {
    matrix[g] = {}
    ratesList.forEach(r => matrix[g][r] = { m: 0, f: 0 })
  })

  activeData.forEach(d => {
    const g = d.grade === '인지지원' ? '인지' : d.grade
    const r = d.copayHistory[0]?.qualifier ?? '일반'
    if (matrix[g] && matrix[g][r]) {
      if (d.gender === '남') matrix[g][r].m++
      if (d.gender === '여') matrix[g][r].f++
    }
  })

  return (
    <div className={className || "flex flex-col bg-white overflow-hidden w-full border border-[#c2cfdf] md:col-span-2 row-span-2"}>
      <div className="p-3 flex items-center justify-between border-b border-[#c2cfdf] bg-[#fafbfc]">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <h2 className="text-[16px] font-bold text-[#0e1225] inline-flex items-center gap-1.5 leading-none shrink-0">
              <span className="w-[4px] h-[16px] bg-[#ef5a27] inline-block rounded-[2px] shrink-0" />
              수급자 종합 현황 통계
            </h2>
            <span className="h-[22px] px-2 inline-flex items-center justify-center bg-[#f1f5f9] text-[#64748b] text-[12px] font-bold rounded-[6px] leading-none whitespace-nowrap">
              {total}명
            </span>
          </div>
          <div className="flex items-center gap-1 ml-1">
            <span className="text-[11px] text-[#64748b] font-medium mr-1 tracking-tight">이용자(계약중) :</span>
            <span className="text-[10px] bg-white text-[#475569] px-1.5 py-0.5 rounded-[4px] font-medium border border-[#cbd5e1] shadow-xs leading-none">
              방문요양 <strong className="text-[#0e1225] ml-0.5">{services['방문요양'] || 0}</strong>
            </span>
            <span className="text-[10px] bg-white text-[#475569] px-1.5 py-0.5 rounded-[4px] font-medium border border-[#cbd5e1] shadow-xs leading-none">
              방문목욕 <strong className="text-[#0e1225] ml-0.5">{services['방문목욕'] || 0}</strong>
            </span>
            <span className="text-[10px] bg-white text-[#475569] px-1.5 py-0.5 rounded-[4px] font-medium border border-[#cbd5e1] shadow-xs leading-none">
              방문간호 <strong className="text-[#0e1225] ml-0.5">{services['방문간호'] || 0}</strong>
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 p-0 overflow-x-auto flex flex-col">
        <table className="w-full h-full text-[12px] text-center border-collapse min-w-[500px]">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[#64748b]">
              <th className="py-2.5 px-2 font-medium border-r border-[#e2e8f0]">등급 \ 부담률</th>
              {ratesList.map(r => (
                <th key={r} className="py-2.5 px-2 font-medium border-r border-[#e2e8f0]">{rateLabel(r)}</th>
              ))}
              <th className="py-2.5 px-2 font-bold text-[#0e1225]">합계</th>
            </tr>
          </thead>
          <tbody>
            {gradesList.map(g => {
              let rowTotalM = 0;
              let rowTotalF = 0;
              return (
                <tr key={g} className="border-b border-[#e2e8f0] hover:bg-[#f1f5f9] transition-colors h-[14.28%]">
                  <td className="p-2 border-r border-[#e2e8f0] font-medium text-[#475569] bg-[#f8fafc]">{g}등급</td>
                  {ratesList.map(r => {
                    const cell = matrix[g][r];
                    const t = cell.m + cell.f;
                    rowTotalM += cell.m;
                    rowTotalF += cell.f;
                    return (
                      <td key={r} className="p-2 border-r border-[#e2e8f0]">
                        {t > 0 ? (
                          <div className="flex flex-col items-center justify-center leading-tight gap-0.5">
                            <span className="font-bold text-[#0e1225]">{t}</span>
                            <span className="text-[10px] text-[#94a3b8]">(남{cell.m}, 여{cell.f})</span>
                          </div>
                        ) : (
                          <span className="text-[#cbd5e1]">-</span>
                        )}
                      </td>
                    )
                  })}
                  <td className="p-2 bg-[#f8fafc]">
                    {(rowTotalM + rowTotalF) > 0 ? (
                      <div className="flex flex-col items-center justify-center leading-tight gap-0.5">
                        <span className="font-bold text-[#0e1225]">{rowTotalM + rowTotalF}</span>
                        <span className="text-[10px] text-[#94a3b8]">(남{rowTotalM}, 여{rowTotalF})</span>
                      </div>
                    ) : (
                      <span className="text-[#cbd5e1]">-</span>
                    )}
                  </td>
                </tr>
              )
            })}

            {/* 전체 합계 행 */}
            <tr className="bg-[#f8fafc] border-b border-[#e2e8f0] h-[14.28%]">
              <td className="p-2 border-r border-[#e2e8f0] font-bold text-[#0e1225]">합계</td>
              {ratesList.map(r => {
                let colM = 0; let colF = 0;
                gradesList.forEach(g => { colM += matrix[g][r].m; colF += matrix[g][r].f; })
                const ct = colM + colF;
                return (
                  <td key={r} className="p-2 border-r border-[#e2e8f0]">
                    {ct > 0 ? (
                      <div className="flex flex-col items-center justify-center leading-tight gap-0.5">
                        <span className="font-bold text-[#0e1225]">{ct}</span>
                        <span className="text-[10px] text-[#94a3b8]">(남{colM}, 여{colF})</span>
                      </div>
                    ) : (
                      <span className="text-[#cbd5e1]">-</span>
                    )}
                  </td>
                )
              })}
              <td className="p-2 font-bold text-[#0e1225] bg-[#f1f5f9]">
                <div className="flex flex-col items-center justify-center leading-tight gap-0.5">
                  <span className="text-[13px] text-[#ef5a27]">{total}</span>
                  <span className="text-[10px] text-[#94a3b8]">
                    (남{activeData.filter(d => d.gender === '남').length}, 여{activeData.filter(d => d.gender === '여').length})
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

function CertExpirationWidget({ data, className }: { data: Beneficiary[], className?: string }) {
  const [currentDate, setCurrentDate] = useState(new Date('2026-01-01')); // 2026년으로 기본 세팅 (Mock 데이터 기준)
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);

  const handlePrevMonth = () => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

  const yearStr = currentDate.getFullYear().toString();
  const monthStr = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const targetPrefix = `${yearStr}.${monthStr}`;

  const expiringList = data.filter(d =>
    d.contractStatus === '계약중' && d.rcgtExpiry.startsWith(targetPrefix)
  ).sort((a, b) => a.rcgtExpiry.localeCompare(b.rcgtExpiry));

  return (
    <div className={className || "flex flex-col bg-white overflow-hidden w-full border border-[#c2cfdf] h-[220px]"}>
      <div className="p-3 flex items-center justify-between border-b border-[#c2cfdf] bg-[#fafbfc]">
        <div className="flex items-center gap-2">
          <h2 className="text-[16px] font-bold text-[#0e1225] inline-flex items-center gap-1.5 leading-none shrink-0">
            <span className="w-[4px] h-[16px] bg-[#ef5a27] inline-block rounded-[2px] shrink-0" />
            인정만료 예정 수급자
          </h2>
          <span className="h-[22px] px-2 inline-flex items-center justify-center bg-[#f1f5f9] text-[#64748b] text-[12px] font-bold rounded-[6px] leading-none whitespace-nowrap">
            {expiringList.length}명
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={handlePrevMonth} className="text-[#475569] hover:text-[#0e1225] p-1 cursor-pointer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button
            onClick={() => setIsMonthPickerOpen(true)}
            className="text-[12.5px] font-bold text-[#0e1225] px-2 py-0.5 rounded-[4px] hover:bg-[#e2e8f0]/60 transition-colors tracking-tight cursor-pointer inline-flex items-center gap-1 border border-transparent hover:border-[#cbd5e1]"
            title="연월 선택"
          >
            <span>{yearStr}년 {currentDate.getMonth() + 1}월</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <button onClick={handleNextMonth} className="text-[#475569] hover:text-[#0e1225] p-1 cursor-pointer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>
      <div className="flex-1 p-0 overflow-y-auto bg-white">
        {expiringList.length > 0 ? (
          <ul className="divide-y divide-[#e2e8f0]">
            {expiringList.map(b => (
              <li key={b.id} className="flex items-center justify-between p-3 hover:bg-[#f8fafc] transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-bold text-[#0e1225]">{b.name}</span>
                  <span className="text-[11px] text-[#475569] bg-[#f1f5f9] px-1.5 py-0.5 rounded-[4px] border border-[#e2e8f0]">{b.grade}등급</span>
                </div>
                <div className="flex items-center gap-2 text-[12px]">
                  <span className="text-[#ef5a27] font-medium text-[11px] bg-[#fff1f2] px-1.5 py-0.5 rounded-[4px]">만료예정</span>
                  <span className="text-[#334155] font-semibold">{b.rcgtExpiry}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex h-full items-center justify-center text-[#94a3b8] text-[12.5px]">
            해당 월에 인정만료 예정인 수급자가 없습니다.
          </div>
        )}
      </div>

      {/* 연월 선택 모달 */}
      <DatePickerModal
        isOpen={isMonthPickerOpen}
        onClose={() => setIsMonthPickerOpen(false)}
        selectedDate={currentDate}
        onSelectDate={(newDate) => setCurrentDate(newDate)}
        mode="month"
        title="인정만료 조회 연월 선택"
      />
    </div>
  )
}

const DAILY_VISIT_DATA = [
  { id: 1, time: '19:00~07:00', recipient: '김만종', caregiver: '정금선', service: '방문요양', location: '-' },
  { id: 2, time: '15:50~16:50', recipient: '김은진', caregiver: '지춘경', service: '방문간호', location: '-' },
  { id: 3, time: '10:00~11:00', recipient: '홍수남', caregiver: '안샛별', service: '방문간호', location: '-' },
  { id: 4, time: '12:00~13:00', recipient: '강복희', caregiver: '안샛별', service: '방문간호', location: '-' },
  { id: 5, time: '07:00~08:00', recipient: '정언년', caregiver: '이진양', service: '가족요양', location: '-' },
  { id: 6, time: '09:30~10:30', recipient: '오인숙', caregiver: '송옥희', service: '방문간호', location: '-' },
  { id: 7, time: '10:00~13:00', recipient: '장나순', caregiver: '고삼희', service: '방문요양', location: '-' },
  { id: 8, time: '07:00~11:00', recipient: '김영덕', caregiver: '김재연', service: '방문요양', location: '-' },
  { id: 9, time: '17:00~05:00', recipient: '심미자', caregiver: '황윤자', service: '방문요양', location: '-' },
  { id: 10, time: '13:30~14:30', recipient: '양재만', caregiver: '류호연', service: '방문간호', location: '-' },
];

function DailyVisitScheduleWidget({ className }: { className?: string }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handlePrevDay = () => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() - 1));
  const handleNextDay = () => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() + 1));

  const yearStr = currentDate.getFullYear().toString();
  const monthStr = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const dayStr = currentDate.getDate().toString().padStart(2, '0');
  const dateStr = `${yearStr}.${monthStr}.${dayStr}`;

  return (
    <div className={className || "flex flex-col bg-white overflow-hidden w-full border border-[#c2cfdf] h-[200px]"}>
      <div className="p-3 flex items-center justify-between border-b border-[#c2cfdf] bg-[#fafbfc]">
        <div className="flex items-center gap-2">
          <h2 className="text-[16px] font-bold text-[#0e1225] inline-flex items-center gap-1.5 leading-none shrink-0">
            <span className="w-[4px] h-[16px] bg-[#ef5a27] inline-block rounded-[2px] shrink-0" />
            일일 방문일정
          </h2>
          <span className="h-[22px] px-2 inline-flex items-center justify-center bg-[#f1f5f9] text-[#64748b] text-[12px] font-bold rounded-[6px] leading-none whitespace-nowrap">
            {DAILY_VISIT_DATA.length}건
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={handlePrevDay} className="text-[#475569] hover:text-[#0e1225] p-1 cursor-pointer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button
            onClick={() => setIsDatePickerOpen(true)}
            className="text-[12.5px] font-bold text-[#0e1225] px-2 py-0.5 rounded-[4px] hover:bg-[#e2e8f0]/60 transition-colors tracking-tight cursor-pointer inline-flex items-center gap-1 border border-transparent hover:border-[#cbd5e1]"
            title="날짜 선택"
          >
            <span>{dateStr}</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <button onClick={handleNextDay} className="text-[#475569] hover:text-[#0e1225] p-1 cursor-pointer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse text-[12.5px] text-center min-w-[500px]">
          <thead className="sticky top-0 bg-[#f8fafc] border-b border-[#e2e8f0] z-10 text-[#475569]">
            <tr>
              <th className="py-2 px-2 font-medium border-r border-[#e2e8f0]">NO</th>
              <th className="py-2 px-2 font-medium border-r border-[#e2e8f0]">방문시간</th>
              <th className="py-2 px-2 font-medium border-r border-[#e2e8f0]">수급자명</th>
              <th className="py-2 px-2 font-medium border-r border-[#e2e8f0]">방문요원</th>
              <th className="py-2 px-2 font-medium border-r border-[#e2e8f0]">서비스</th>
            </tr>
          </thead>
          <tbody>
            {DAILY_VISIT_DATA.map((row) => (
              <tr key={row.id} className="border-b border-[#e2e8f0] hover:bg-[#f1f5f9] transition-colors">
                <td className="p-2 border-r border-[#e2e8f0] text-[#64748b]">{row.id}</td>
                <td className="p-2 border-r border-[#e2e8f0] font-semibold text-[#0e1225]">{row.time}</td>
                <td className="p-2 border-r border-[#e2e8f0] font-medium text-[#0e1225]">{row.recipient}</td>
                <td className="p-2 border-r border-[#e2e8f0] text-[#334155]">{row.caregiver}</td>
                <td className="p-2 border-r border-[#e2e8f0] text-[#334155]">{row.service}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 날짜 선택 모달 */}
      <DatePickerModal
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        selectedDate={currentDate}
        onSelectDate={(newDate) => setCurrentDate(newDate)}
        mode="date"
        title="방문일정 일자 선택"
      />
    </div>
  );
}

function LiabilityInsuranceWidget({ className }: { className?: string }) {
  const data = [
    { title: '한국사회복지공제회·요양기관전문직업인배상책임보험공제(재가)', period: '2024-05-09 ~ 2025-05-08', isExpiring: true },
    { title: '한국사회복지공제회·요양기관전문직업인배상책임보험공제(재가)', period: '2025-05-09 ~ 2026-05-08', isExpiring: true },
    { title: '한국사회복지공제회·요양기관전문직업인배상책임보험공제(재가)', period: '2026-05-09 ~ 2027-05-09', isExpiring: false },
  ];

  return (
    <div className={className || "flex flex-col bg-white overflow-hidden w-full border border-[#c2cfdf] h-[200px]"}>
      <div className="p-3 flex items-center justify-between border-b border-[#c2cfdf] bg-[#fafbfc] cursor-pointer hover:bg-[#f1f5f9] transition-colors">
        <div className="flex items-center gap-2">
          <h2 className="text-[16px] font-bold text-[#0e1225] inline-flex items-center gap-1.5 leading-none shrink-0">
            <span className="w-[4px] h-[16px] bg-[#ef5a27] inline-block rounded-[2px] shrink-0" />
            배상책임보험
          </h2>
          <span className="h-[20px] px-2 inline-flex items-center justify-center bg-[#fff0ef] text-[#e23a32] text-[11px] font-bold rounded-[10px] leading-none whitespace-nowrap">
            만료예정 2
          </span>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </div>
      <div className="flex-1 overflow-auto">
        <ul className="divide-y divide-[#e2e8f0]">
          {data.map((item, idx) => (
            <li key={idx} className="flex items-center justify-between p-3 hover:bg-[#f8fafc] transition-colors">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="w-[3px] h-[3px] rounded-full bg-[#94a3b8] shrink-0"></span>
                <span className="text-[13px] text-[#334155] font-medium truncate" title={item.title}>{item.title}</span>
              </div>
              <span className={`text-[12px] shrink-0 ml-3 font-medium whitespace-nowrap ${item.isExpiring ? 'text-[#e23a32]' : 'text-[#64748b]'}`}>
                {item.period}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function Icon({ d, size = 18 }: { d: string; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d={d} /></svg>
}

const ICONS = {
  dashboard: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
  beneficiary: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  staff: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  care: 'M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0zM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0zM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003z',
  nursing: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z',
  program: 'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2',
  food: 'M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3',
  eval: 'M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',
  copay: 'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
  message: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

type SidebarIconName = 'Dashboard' | 'RecipientManagement' | 'EmployeeManagement' | 'CareServiceProvision' | 'NursingServiceProvision' | 'ProgramManagement' | 'Inspection' | 'FacilityManagement' | 'Copayment' | 'MessageManagement'

function SidebarIcon({ icon, fill }: { icon: SidebarIconName; fill: string }) {
  if (icon === 'Dashboard') {
    return (
      <div className="relative size-[15px]">
        <svg className="absolute inset-0 size-full" fill="none" viewBox="0 0 15 15">
          <path d={svgPaths.p37964b40} fill={fill} />
        </svg>
      </div>
    )
  }
  if (icon === 'RecipientManagement') {
    return (
      <div className="relative size-[15px]">
        <svg className="absolute inset-0 size-full" fill="none" viewBox="0 0 10.8986 15">
          <path clipRule="evenodd" d={svgPaths.pff7bd00} fill={fill} fillRule="evenodd" />
        </svg>
      </div>
    )
  }
  if (icon === 'EmployeeManagement') {
    return (
      <div className="relative size-[15px]">
        <svg className="absolute inset-0 size-full" fill="none" viewBox="0 0 15 15">
          <path clipRule="evenodd" d={svgPaths.p3993fb00} fill={fill} fillRule="evenodd" />
          <path clipRule="evenodd" d={svgPaths.p26dc8900} fill={fill} fillRule="evenodd" />
        </svg>
      </div>
    )
  }
  if (icon === 'CareServiceProvision') {
    return (
      <div className="relative size-[15px]">
        <svg className="absolute inset-0 size-full" fill="none" viewBox="0 0 13.4295 11.943">
          <path d={svgPaths.p22814800} fill={fill} />
        </svg>
      </div>
    )
  }
  if (icon === 'NursingServiceProvision') {
    return (
      <div className="relative size-[15px]">
        <svg className="absolute inset-0 size-full" fill="none" viewBox="0 0 15 15">
          <path clipRule="evenodd" d={svgPaths.p25814680} fill={fill} fillRule="evenodd" />
        </svg>
      </div>
    )
  }
  if (icon === 'ProgramManagement') {
    return (
      <div className="relative size-[15px]">
        <svg className="absolute inset-0 size-full" fill="none" viewBox="0 0 13.75 11.875">
          <path d={svgPaths.p54d2000} fill={fill} />
        </svg>
      </div>
    )
  }
  if (icon === 'Inspection') {
    return (
      <div className="relative size-[15px]">
        <div className="absolute inset-[0_12.5%_18.75%_0]">
          <svg className="absolute inset-0 size-full" fill="none" viewBox="0 0 13.125 12.1875">
            <path d={svgPaths.p19b64800} fill={fill} />
          </svg>
        </div>
        <div className="absolute bottom-[0.01%] left-1/2 right-0 top-[49.99%]">
          <svg className="absolute inset-0 size-full" fill="none" viewBox="0 0 7.5 7.5">
            <path clipRule="evenodd" d={svgPaths.p1cd36500} fill={fill} fillRule="evenodd" />
          </svg>
        </div>
      </div>
    )
  }
  if (icon === 'FacilityManagement') {
    return (
      <div className="relative size-[15px]">
        <svg className="absolute inset-0 size-full" fill="none" viewBox="0 0 11.25 15">
          <path d={svgPaths.p1fade400} fill={fill} />
        </svg>
      </div>
    )
  }
  if (icon === 'Copayment') {
    return (
      <div className="relative size-[15px]">
        <svg className="absolute inset-0 size-full" fill="none" viewBox="0 0 15 13.9286">
          <path clipRule="evenodd" d={svgPaths.p30137480} fill={fill} fillRule="evenodd" />
        </svg>
      </div>
    )
  }
  // MessageManagement
  return (
    <div className="relative size-[15px]">
      <svg className="absolute inset-0 size-full" fill="none" viewBox="0 0 11.3065 12.4967">
        <path d={svgPaths.p37812f00} fill={fill} />
      </svg>
    </div>
  )
}

const SIDEBAR_NAV: { label: string; icon: SidebarIconName; active?: boolean }[] = [
  { label: '대시보드', icon: 'Dashboard' },
  { label: '수급자 관리', icon: 'RecipientManagement', active: true },
  { label: '종사자 관리', icon: 'EmployeeManagement' },
  { label: '요양급여', icon: 'CareServiceProvision' },
  { label: '간호·물리', icon: 'NursingServiceProvision' },
  { label: '프로그램', icon: 'ProgramManagement' },
  { label: '식단·위생점검', icon: 'Inspection' },
  { label: '운영·평가', icon: 'FacilityManagement' },
  { label: '본인부담금', icon: 'Copayment' },
  { label: '메시지', icon: 'MessageManagement' },
]

function Sidebar({
  collapsed,
  onToggleCollapse,
  activeMenu,
  onMenuChange
}: {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  activeMenu?: string;
  onMenuChange?: (menu: string) => void;
}) {
  const [supportModalOpen, setSupportModalOpen] = useState(false)

  return (
    <>
      <aside className={`relative ${collapsed ? 'w-[70px]' : 'w-[196px]'} h-full bg-[#f4f7fc] border-r border-[#c2cfdf] flex flex-col shrink-0 transition-all duration-300 ease-in-out z-40`}>
        {/* Right boundary collapse toggle */}
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="absolute -right-[13px] top-[17px] z-50 size-[28px] bg-white border border-[#c2cfdf] rounded-full flex items-center justify-center text-[#475569] hover:text-[#ef5a27] hover:border-[#ef5a27] hover:bg-[#fff7f4] shadow-[0px_2px_8px_rgba(0,0,0,0.12)] transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer group"
            title={collapsed ? '사이드바 펼치기 (작업영역 기본)' : '사이드바 접기 (작업영역 확장)'}
          >
            {collapsed ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:scale-90">
                <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:scale-110">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            )}
          </button>
        )}

        {/* Brand / Logo Section */}
        <div className={`h-[60px] flex items-center ${collapsed ? 'justify-center px-0' : 'justify-start px-[16px]'} border-b border-[#c2cfdf] bg-white shrink-0 transition-all duration-300 ease-in-out`}>
          <div className="flex items-center gap-[10px] overflow-hidden cursor-pointer group" title="케어포 중앙">
            <div className="h-[25px] w-[20px] relative shrink-0 transition-transform duration-300 group-hover:scale-105">
              <svg className="block size-full" fill="none" viewBox="0 0 20 25">
                <g id="Frame 1597881711">
                  <g id="N">
                    <path d={topNavSvg.p2ae8b1c0} fill="url(#sidebar_logo_g0)" />
                    <path clipRule="evenodd" d={topNavSvg.p3696b980} fill="url(#sidebar_logo_g1)" fillRule="evenodd" />
                    <path d={topNavSvg.p100557f0} fill="url(#sidebar_logo_g2)" />
                  </g>
                </g>
                <defs>
                  <linearGradient id="sidebar_logo_g0" gradientUnits="userSpaceOnUse" x1="10" x2="10" y1="0" y2="25">
                    <stop stopColor="#E83D3C" />
                    <stop offset="0.524038" stopColor="#F76501" />
                    <stop offset="0.850962" stopColor="#F8CD53" />
                  </linearGradient>
                  <linearGradient id="sidebar_logo_g1" gradientUnits="userSpaceOnUse" x1="10" x2="10" y1="0" y2="25">
                    <stop stopColor="#197E21" />
                    <stop offset="1" stopColor="#9BCB13" />
                  </linearGradient>
                  <linearGradient id="sidebar_logo_g2" gradientUnits="userSpaceOnUse" x1="10" x2="10" y1="0" y2="25">
                    <stop stopColor="#0093A9" />
                    <stop offset="0.432692" stopColor="#4AB6DC" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            {!collapsed && (
              <div className="flex flex-col min-w-0 transition-opacity duration-200">
                <span className="font-['Pretendard:Bold',sans-serif] font-bold text-[16px] leading-[20px] text-[#0e1225] tracking-[-0.3px] truncate">
                  센트럴케어
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-[10px] px-[8px] flex flex-col gap-[3px]">
          {SIDEBAR_NAV.map(item => {
            const isActive = activeMenu ? item.label === activeMenu : item.label === '수급자 관리'
            return (
              <button
                key={item.label}
                title={collapsed ? item.label : undefined}
                onClick={() => onMenuChange?.(item.label)}
                className={`w-full flex items-center ${collapsed ? 'justify-center px-0 h-[44px]' : 'gap-[10px] px-[12px] h-[40px]'} rounded-[6px] text-[13.5px] font-semibold tracking-[-0.2px] transition-all cursor-pointer ${isActive
                  ? 'bg-[#ef5a27] text-white shadow-sm'
                  : 'text-[#64748b] hover:bg-[#e8eef8] hover:text-[#0e1225]'
                  }`}
              >
                <div className="shrink-0 flex items-center justify-center">
                  <SidebarIcon icon={item.icon} fill={isActive ? '#ffffff' : '#64748b'} />
                </div>
                {!collapsed && <span className="truncate">{item.label}</span>}
              </button>
            )
          })}
        </div>

        {/* Customer Support Banner */}
        <div className="p-[8px] border-t border-[#c2cfdf] shrink-0 bg-[#f4f7fc]">
          {!collapsed ? (
            <div className="p-[10px] bg-white border border-[#c2cfdf] rounded-[8px] flex flex-col gap-[6px] shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#ef5a27] tracking-wider uppercase">고객센터</span>
                <span className="text-[10px] text-[#8a9cb4]">09:00 ~ 18:00</span>
              </div>
              <div className="text-[14px] font-bold text-[#0e1225] tracking-tight">
                02-0000-0000
              </div>
              <button
                onClick={() => setSupportModalOpen(true)}
                className="w-full mt-0.5 py-1 text-center bg-[#f4f7fc] hover:bg-[#e8eef8] text-[#2a3461] border border-[#c2cfdf] rounded-[4px] text-[11px] font-semibold transition-colors cursor-pointer"
              >
                문의하기
              </button>
            </div>
          ) : (
            <div className="flex justify-center py-1">
              <button
                onClick={() => setSupportModalOpen(true)}
                className="size-[36px] bg-white border border-[#c2cfdf] rounded-[8px] flex items-center justify-center text-[#ef5a27] hover:bg-[#fff7f4] hover:border-[#ef5a27] transition-all shadow-2xs cursor-pointer group"
                title="고객센터 문의 (02-0000-0000)"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Support Modal */}
      {supportModalOpen && createPortal(
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-[12px] shadow-2xl border border-[#c2cfdf] w-full max-w-[440px] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-[#2a3461] px-5 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div>
                  <h3 className="text-[16px] font-bold tracking-tight">케어포 중앙 고객센터 문의</h3>
                  <p className="text-[12.5px] text-[#cbd5e1] mt-0.5">원활한 업무 지원 및 맞춤형 상담</p>
                </div>
              </div>
              <button
                onClick={() => setSupportModalOpen(false)}
                className="text-[#94a3b8] hover:text-white transition-colors cursor-pointer p-1 rounded-full hover:bg-white/10"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 flex flex-col gap-4 text-[#334155]">
              <div className="bg-[#fff9f5] border border-[#ffddc9] rounded-[10px] p-4 flex items-center justify-between">
                <div>
                  <span className="text-[12px] font-semibold text-[#ef5a27] tracking-wider uppercase">대표 전화</span>
                  <div className="text-[22px] font-bold text-[#ef5a27] tracking-tight mt-0.5">
                    02-0000-0000
                  </div>
                  <p className="text-[12.5px] text-[#64748b] mt-0.5">평일 09:00 ~ 18:00 (점심 12:00 ~ 13:00)</p>
                </div>
              </div>

              <div className="space-y-2.5 text-[13px]">
                <div className="flex items-start gap-3 p-3 bg-[#f8fafc] rounded-[8px] border border-[#e2e8f0]">
                  <div className="bg-[#2a3461] text-white text-[11px] font-bold px-2 py-0.5 rounded-[4px] shrink-0 mt-0.5">
                    원격지원
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#1e293b] text-[13.5px]">전문 상담원 1:1 원격 문제해결</p>
                    <p className="text-[12.5px] text-[#64748b] mt-0.5">시스템 오류 및 데이터 오류 시 신속하게 지원합니다.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[#f8fafc] rounded-[8px] border border-[#e2e8f0]">
                  <div className="bg-[#0284c7] text-white text-[11px] font-bold px-2 py-0.5 rounded-[4px] shrink-0 mt-0.5">
                    채팅상담
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#1e293b] text-[13.5px]">월~금 09:00 ~ 18:00</p>
                    <p className="text-[12.5px] text-[#64748b] mt-0.5">통화 중 대기없이 실시간 1:1 상담을 시작하세요.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3.5 bg-[#f8fafc] border-t border-[#e2e8f0] flex items-center justify-end gap-2">
              <button
                onClick={() => setSupportModalOpen(false)}
                className="px-4 py-2 border border-[#cbd5e1] bg-white text-[#475569] rounded-[6px] text-[13px] font-medium hover:bg-[#f1f5f9] transition-colors cursor-pointer"
              >
                닫기
              </button>
              <button
                onClick={() => {
                  alert('상담원 연결 중 문제가 발생 시 안내됩니다.')
                  setSupportModalOpen(false)
                }}
                className="px-4 py-2 bg-[#ef5a27] text-white rounded-[6px] text-[13px] font-semibold hover:bg-[#d94e1f] transition-colors cursor-pointer shadow-xs"
              >
                원격상담 요청
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

function GNB() {
  const [activeTab, setActiveTab] = useState<'방문요양' | '기관회계'>('방문요양')
  const [keyword, setKeyword] = useState('')
  const [noticeModalOpen, setNoticeModalOpen] = useState(false)
  const [notiDropdownOpen, setNotiDropdownOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [accountModalOpen, setAccountModalOpen] = useState(false)

  // 사용자 계정 상태
  const [userInfo, setUserInfo] = useState({
    name: '김관리',
    role: '시설장',
    org: '행복요양 노원점',
    email: 'admin@centralcare.co.kr',
    phone: '010-1234-5678',
  })

  // 모달 폼 상태
  const [formName, setFormName] = useState(userInfo.name)
  const [formRole, setFormRole] = useState(userInfo.role)
  const [formEmail, setFormEmail] = useState(userInfo.email)
  const [formPhone, setFormPhone] = useState(userInfo.phone)
  const [formNewPw, setFormNewPw] = useState('')
  const [formConfirmPw, setFormConfirmPw] = useState('')

  function openAccountModal() {
    setFormName(userInfo.name)
    setFormRole(userInfo.role)
    setFormEmail(userInfo.email)
    setFormPhone(userInfo.phone)
    setFormNewPw('')
    setFormConfirmPw('')
    setUserMenuOpen(false)
    setAccountModalOpen(true)
  }

  function handleSaveAccount() {
    if (formNewPw && formNewPw !== formConfirmPw) {
      alert('새 비밀번호와 비밀번호 확인이 일치하지 않습니다.')
      return
    }
    setUserInfo({
      ...userInfo,
      name: formName,
      role: formRole,
      email: formEmail,
      phone: formPhone,
    })
    setAccountModalOpen(false)
    alert('계정 정보가 성공적으로 수정되었습니다.')
  }

  function handleLogout() {
    setUserMenuOpen(false)
    if (window.confirm('로그아웃 하시겠습니까?')) {
      alert('안전하게 로그아웃 되었습니다.')
    }
  }

  return (
    <header className="bg-white h-[60px] border-b border-[#c2cfdf] flex items-center justify-between px-[20px] shrink-0 z-30 shadow-2xs">
      {/* Left: 서비스 모듈 네비게이션 — 클래식 엔터프라이즈 언더라인 탭 */}
      <div className="flex items-center h-full gap-[10px]">
        {(['방문요양', '기관회계'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative h-full px-[20px] text-[16.5px] font-['Pretendard:SemiBold',sans-serif] tracking-[-0.3px] transition-colors flex items-center justify-center cursor-pointer ${activeTab === tab
              ? 'text-[#2a3461] font-bold'
              : 'text-[#8694b1] hover:text-[#2a3461]'
              }`}
          >
            <span>{tab}</span>
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#2a3461] rounded-t-[2px]" />
            )}
          </button>
        ))}
      </div>

      {/* Right: 통합검색 + 액션 버튼 + 사용자 유틸리티 */}
      <div className="flex items-center gap-[12px]">
        {/* Search Bar */}
        <div className="relative flex items-center">
          <div className="bg-[#f5f8fc] focus-within:bg-white flex items-center gap-[8px] h-[38px] px-[12px] rounded-[8px] border border-[#d9e2ef] focus-within:border-[#2a3461] focus-within:ring-2 focus-within:ring-[#2a3461]/10 transition-all w-[230px] lg:w-[270px]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-[#8a9cb4]">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.8" />
              <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              placeholder="검색어를 입력하세요"
              className="w-full bg-transparent text-[14px] font-['Pretendard:Regular',sans-serif] text-[#0e1225] placeholder-[#8a9cb4] focus:outline-none"
            />
            {keyword && (
              <button onClick={() => setKeyword('')} className="text-[#8a9cb4] hover:text-[#0e1225]">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4l8 8M12 4l-8 8" /></svg>
              </button>
            )}
          </div>
        </div>

        {/* 액션 버튼 그룹 */}
        <div className="flex items-center gap-[6px]">
          {/* 사용법 버튼 */}
          <button className="bg-white flex items-center gap-[6px] h-[38px] px-[13px] rounded-[8px] border border-[#d9e2ef] text-[#ef5a27] font-['Pretendard:SemiBold',sans-serif] text-[13.5px] hover:bg-[#fff8f5] hover:border-[#fcd5c7] transition-all shrink-0 shadow-2xs cursor-pointer">
            <svg className="shrink-0" fill="none" height="17" viewBox="0 0 20 20" width="17">
              <g clipPath="url(#gnb_book_clip)">
                <path clipRule="evenodd" d={topNavSvg.p2e285600} fill="#EF5A27" fillRule="evenodd" />
              </g>
              <defs>
                <clipPath id="gnb_book_clip"><rect fill="white" height="20" width="20" /></clipPath>
              </defs>
            </svg>
            <span>사용법</span>
          </button>

          {/* AI 챗봇 버튼 */}
          <button className="bg-gradient-to-r from-[#0093a9]/10 to-[#4ab6dc]/10 flex items-center gap-[6px] h-[38px] px-[13px] rounded-[8px] border border-[#0093a9]/30 text-[#0093a9] font-['Pretendard:SemiBold',sans-serif] text-[13.5px] hover:bg-[#0093a9]/15 transition-all shrink-0 cursor-pointer">
            <svg className="shrink-0" fill="none" height="17" viewBox="0 0 24 24" width="17">
              <path d={topNavSvg.p1145cc70} fill="url(#gnb_chat_grad_btn)" />
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="gnb_chat_grad_btn" x1="12" x2="12" y1="3" y2="21.9996">
                  <stop stopColor="#0093A9" />
                  <stop offset="1" stopColor="#4AB6DC" />
                </linearGradient>
              </defs>
            </svg>
            <span>AI 챗봇</span>
          </button>
        </div>

        {/* 구분선 */}
        <div className="w-[1px] h-[24px] bg-[#d9e2ef] mx-[2px]" />

        {/* 알림 및 공지사항 아이콘 그룹 */}
        <div className="flex items-center gap-[4px] relative">
          {/* 1. 알림 버튼 */}
          <button
            onClick={() => setNotiDropdownOpen(o => !o)}
            className="relative w-[36px] h-[36px] rounded-[8px] flex items-center justify-center hover:bg-[#f4f7fc] text-[#475569] hover:text-[#2a3461] transition-colors cursor-pointer"
            title="알림 (3건)"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="absolute top-[6px] right-[6px] w-[7px] h-[7px] bg-[#ef4444] rounded-full ring-2 ring-white" />
          </button>

          {/* 2. 공지사항 버튼 (알림 아이콘 바로 우측 배치) */}
          <button
            onClick={() => setNoticeModalOpen(true)}
            className="relative w-[36px] h-[36px] rounded-[8px] flex items-center justify-center hover:bg-[#f4f7fc] text-[#475569] hover:text-[#ef5a27] transition-colors cursor-pointer group"
            title="공지사항 확인"
          >
            {/* 확성기(Megaphone) 공지사항 아이콘 */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:scale-105">
              <path d="M3 11l15-5v12L3 13v-2z" />
              <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
            </svg>
            {/* 신규 공지 N 배지 */}
            <span className="absolute -top-[1px] -right-[1px] px-1 py-0.1 bg-[#ef5a27] text-white text-[9px] font-bold rounded-full ring-2 ring-white">
              N
            </span>
          </button>

          {/* 알림 드롭다운 팝오버 */}
          {notiDropdownOpen && (
            <div className="absolute right-0 top-[44px] w-[280px] bg-white rounded-[10px] shadow-xl border border-[#c2cfdf] p-3 z-50 text-[12px] flex flex-col gap-2 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-2 font-bold text-[#0e1225]">
                <span>알림 센터</span>
                <span className="text-[11px] text-[#ef5a27]">새로운 알림 3건</span>
              </div>
              <div className="space-y-1.5 text-[#475569]">
                <div className="p-2 bg-[#f8fafc] rounded-[6px] hover:bg-[#f1f5f9] cursor-pointer">
                  <p className="font-semibold text-[#1e293b]">김영희 수급자 계약 만료 7일 전</p>
                  <p className="text-[10px] text-[#94a3b8] mt-0.5">10분 전</p>
                </div>
                <div className="p-2 bg-[#f8fafc] rounded-[6px] hover:bg-[#f1f5f9] cursor-pointer">
                  <p className="font-semibold text-[#1e293b]">3월 장기요양 급여비용 청구 접수 완료</p>
                  <p className="text-[10px] text-[#94a3b8] mt-0.5">1시간 전</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 사용자 / 기관 프로필 카드 & 드롭다운 */}
        <div className="relative">
          <div
            onClick={() => setUserMenuOpen(o => !o)}
            className="flex items-center gap-[8px] pl-[8px] pr-[8px] py-[4px] rounded-[8px] hover:bg-[#f4f7fc] cursor-pointer transition-colors border border-transparent hover:border-[#d9e2ef] select-none group"
            title="내 계정 메뉴"
          >
            <div className="w-[30px] h-[30px] rounded-full bg-[#2a3461] text-white flex items-center justify-center font-bold text-[13px] shadow-xs group-hover:scale-105 transition-transform">
              {userInfo.name.charAt(0)}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[12px] font-bold text-[#0e1225] leading-tight flex items-center gap-1">
                {userInfo.name} <span className="text-[10px] text-[#64748b] font-normal">{userInfo.role}</span>
              </span>

            </div>
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              className={`text-[#8a9cb4] ml-1 transition-transform duration-200 ${userMenuOpen ? 'rotate-180 text-[#2a3461]' : ''}`}
            >
              <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* 프로필 드롭다운 메뉴 */}
          {userMenuOpen && (
            <div className="absolute right-0 top-[46px] w-[220px] bg-white rounded-[10px] shadow-2xl border border-[#c2cfdf] py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
              {/* 상단 프로필 요약 */}
              <div className="px-3.5 py-2.5 border-b border-[#e2e8f0] bg-[#f8fafc]">
                <div className="flex items-center gap-2">
                  <div className="w-[28px] h-[28px] rounded-full bg-[#2a3461] text-white flex items-center justify-center font-bold text-[12px]">
                    {userInfo.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-[#0e1225] truncate">
                      {userInfo.name} <span className="text-[11px] font-normal text-[#64748b]">({userInfo.role})</span>
                    </p>
                    <p className="text-[11px] text-[#8a9cb4] truncate">{userInfo.email}</p>
                  </div>
                </div>
              </div>

              {/* 메뉴 목록 */}
              <div className="py-1">
                {/* 1. 내 계정 정보 수정 */}
                <button
                  onClick={openAccountModal}
                  className="w-full px-3.5 py-2 text-left text-[12px] font-medium text-[#334155] hover:bg-[#f1f5f9] hover:text-[#2a3461] flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#64748b]">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span>내 계정 정보 수정</span>
                </button>

                {/* 2. 비밀번호 변경 바로가기 */}
                <button
                  onClick={openAccountModal}
                  className="w-full px-3.5 py-2 text-left text-[12px] font-medium text-[#334155] hover:bg-[#f1f5f9] hover:text-[#2a3461] flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#64748b]">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span>비밀번호 변경</span>
                </button>
              </div>

              {/* 구분선 & 로그아웃 */}
              <div className="border-t border-[#e2e8f0] pt-1 mt-1">
                <button
                  onClick={handleLogout}
                  className="w-full px-3.5 py-2 text-left text-[12px] font-medium text-[#ef4444] hover:bg-[#fef2f2] flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  <span>로그아웃</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 내 계정 정보 수정 모달 */}
      {accountModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-[12px] shadow-2xl border border-[#c2cfdf] w-full max-w-[460px] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-[#2a3461] px-5 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-[30px] h-[30px] rounded-full bg-white/10 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[15px] font-bold tracking-tight">내 계정 정보 수정</h3>
                  <p className="text-[11px] text-[#cbd5e1] mt-0.5">사용자 프로필 및 로그인 보안 설정</p>
                </div>
              </div>
              <button
                onClick={() => setAccountModalOpen(false)}
                className="text-[#94a3b8] hover:text-white transition-colors cursor-pointer p-1 rounded-full hover:bg-white/10"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 flex flex-col gap-3.5 text-[#334155] text-[13px] max-h-[480px] overflow-y-auto">
              {/* 성명 & 직책 */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-semibold text-[#475569]">
                    성명 <span className="text-[#ef5a27]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                    className="h-[36px] bg-white border border-[#c2cfdf] rounded-[6px] px-3 text-[13px] text-[#0e1225] focus:outline-none focus:border-[#2a3461]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-semibold text-[#475569]">
                    직책 / 역할 <span className="text-[#ef5a27]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formRole}
                    onChange={e => setFormRole(e.target.value)}
                    className="h-[36px] bg-white border border-[#c2cfdf] rounded-[6px] px-3 text-[13px] text-[#0e1225] focus:outline-none focus:border-[#2a3461]"
                  />
                </div>
              </div>

              {/* 소속 기관 (읽기 전용) */}
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-semibold text-[#475569]">소속 기관</label>
                <input
                  type="text"
                  value={userInfo.org}
                  disabled
                  className="h-[36px] bg-[#f1f5f9] border border-[#c2cfdf] rounded-[6px] px-3 text-[13px] text-[#64748b] cursor-not-allowed"
                />
              </div>

              {/* 이메일 & 휴대폰 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-semibold text-[#475569]">이메일</label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={e => setFormEmail(e.target.value)}
                    className="h-[36px] bg-white border border-[#c2cfdf] rounded-[6px] px-3 text-[13px] text-[#0e1225] focus:outline-none focus:border-[#2a3461]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-semibold text-[#475569]">휴대폰 번호</label>
                  <input
                    type="tel"
                    value={formPhone}
                    onChange={e => setFormPhone(e.target.value)}
                    className="h-[36px] bg-white border border-[#c2cfdf] rounded-[6px] px-3 text-[13px] text-[#0e1225] focus:outline-none focus:border-[#2a3461]"
                  />
                </div>
              </div>

              {/* 비밀번호 변경 섹션 */}
              <div className="border-t border-[#e2e8f0] pt-3.5 mt-1 flex flex-col gap-2.5">
                <span className="text-[12px] font-bold text-[#2a3461] flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  비밀번호 변경 (선택사항)
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] text-[#64748b]">새 비밀번호</label>
                    <input
                      type="password"
                      value={formNewPw}
                      onChange={e => setFormNewPw(e.target.value)}
                      placeholder="변경 시 입력"
                      className="h-[34px] bg-white border border-[#c2cfdf] rounded-[6px] px-2.5 text-[12px] focus:outline-none focus:border-[#2a3461]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] text-[#64748b]">비밀번호 확인</label>
                    <input
                      type="password"
                      value={formConfirmPw}
                      onChange={e => setFormConfirmPw(e.target.value)}
                      placeholder="비밀번호 재입력"
                      className="h-[34px] bg-white border border-[#c2cfdf] rounded-[6px] px-2.5 text-[12px] focus:outline-none focus:border-[#2a3461]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3.5 bg-[#f8fafc] border-t border-[#e2e8f0] flex items-center justify-end gap-2">
              <button
                onClick={() => setAccountModalOpen(false)}
                className="px-4 py-2 border border-[#cbd5e1] bg-white text-[#475569] rounded-[6px] text-[12px] font-medium hover:bg-[#f1f5f9] transition-colors cursor-pointer"
              >
                취소
              </button>
              <button
                onClick={handleSaveAccount}
                className="px-4 py-2 bg-[#2a3461] text-white rounded-[6px] text-[12px] font-medium hover:bg-[#364275] transition-colors cursor-pointer shadow-xs"
              >
                변경사항 저장
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 공지사항 상세 모달 */}
      {noticeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-[12px] shadow-2xl border border-[#c2cfdf] w-full max-w-[540px] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-[#2a3461] px-5 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="bg-[#ef5a27] rounded-[6px] size-[28px] flex items-center justify-center font-bold text-white">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 11l15-5v12L3 13v-2z" />
                    <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[15px] font-bold tracking-tight">센트럴케어 공지사항</h3>
                  <p className="text-[11px] text-[#cbd5e1] mt-0.5">시스템 업데이트 및 주요 정책 안내</p>
                </div>
              </div>
              <button
                onClick={() => setNoticeModalOpen(false)}
                className="text-[#94a3b8] hover:text-white transition-colors cursor-pointer p-1 rounded-full hover:bg-white/10"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 flex flex-col gap-3 max-h-[420px] overflow-y-auto">
              {[
                {
                  badge: '중요',
                  badgeColor: 'bg-[#ef4444] text-white',
                  title: '2026년도 장기요양 수가 개정 및 시스템 반영 안내',
                  date: '2026.03.01',
                  desc: '2026년 3월 1일부터 적용되는 등급별 급여제공 월 한도액 및 본인부담금 산정 기준이 시스템에 자동 업데이트되었습니다.',
                },
                {
                  badge: '기능개선',
                  badgeColor: 'bg-[#0284c7] text-white',
                  title: '수급자 급여제공한도 자동 표기 및 필터 최적화',
                  date: '2026.02.20',
                  desc: '수급자 상세 기본정보에서 등급별 급여제공한도가 즉시 계산되어 표시되며, 조회조건의 반응형 레이아웃이 개선되었습니다.',
                },
                {
                  badge: '안내',
                  badgeColor: 'bg-[#64748b] text-white',
                  title: '국민건강보험공단 전산망 정기 점검에 따른 연동 안내',
                  date: '2026.01.15',
                  desc: '공단 정기 시스템 점검 기간 동안 공단조회 연동이 지연될 수 있으니 업무에 참고하시기 바랍니다.',
                },
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-[8px] hover:border-[#2a3461] transition-all cursor-pointer">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-[4px] ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                    <span className="text-[11px] text-[#94a3b8]">{item.date}</span>
                  </div>
                  <h4 className="text-[13px] font-bold text-[#1e293b] mb-1">{item.title}</h4>
                  <p className="text-[12px] text-[#64748b] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3.5 bg-[#f8fafc] border-t border-[#e2e8f0] flex items-center justify-end">
              <button
                onClick={() => setNoticeModalOpen(false)}
                className="px-4 py-2 bg-[#2a3461] text-white rounded-[6px] text-[12px] font-medium hover:bg-[#364275] transition-colors cursor-pointer shadow-xs"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function ModalRecipientBar({
  person,
  action,
}: {
  person: Beneficiary
  action?: React.ReactNode
}) {
  const age = calcAge(person.dob)
  return (
    <div className="px-[24px] py-[12px] bg-[#f8fafc] border-b border-[#c2cfdf] flex items-center justify-between shrink-0">
      <div className="flex items-center gap-[8px] h-[32px] flex-wrap">
        <div className={`w-[20px] h-[20px] rounded-[6px] flex items-center justify-center shrink-0 ${person.gender === '여' ? 'bg-[#fce7f3]' : 'bg-[#e0e7ff]'}`}>
          <svg width="8" height="13" viewBox="0 0 8.25 12.75" fill="none">
            <path d={rightSvg.p26aa8900} fill={person.gender === '여' ? '#BE185D' : '#1D4ED8'} />
          </svg>
        </div>
        <span className="font-['Pretendard:Bold',sans-serif] text-[18px] text-[#0e1225] tracking-[-0.36px]">{person.name}</span>
        <span className="font-['Pretendard:Regular',sans-serif] text-[14px] text-[#8a9cb4] tracking-[-0.28px]">{person.dob} ({age}세)</span>
        <span className="bg-[#eef1f8] rounded-[6px] px-[8px] py-[4px] text-[12px] text-[#2a3461] font-['Pretendard:Regular',sans-serif] whitespace-nowrap">
          {person.grade}등급
        </span>
      </div>
      {action}
    </div>
  )
}

// ─── 수급자 사진 설정 모달 ──────────────────────────────────────────────────────

function PhotoEditModal({ person, currentUrl, onSave, onClose }: {
  person: Beneficiary
  currentUrl: string | null
  onSave: (url: string | null) => void
  onClose: () => void
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentUrl)
  const [fileName, setFileName] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setFileName(file.name)
    setPreviewUrl(URL.createObjectURL(file))
    e.target.value = ''
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white rounded-[16px] shadow-[0px_20px_40px_0px_rgba(0,0,0,0.1)] w-[400px] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-[24px] py-[12px] border-b border-[#c2cfdf] shrink-0">
          <span className="font-['Pretendard:Bold',sans-serif] text-[17px] text-[#0e1225] tracking-[-0.34px]">수급자 사진 설정</span>
          <button onClick={onClose} className="p-[4px] rounded-[6px] hover:bg-[#f4f7fc] transition-colors">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="#8A9CB4" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </button>
        </div>

        {/* Recipient summary bar */}
        <ModalRecipientBar person={person} />

        {/* Body */}
        <div className="px-[24px] py-[20px] flex flex-col gap-[12px]">

          {/* Preview + form */}
          <div className="border border-[#d9e2ef] rounded-[8px] p-[12px] flex items-center justify-center">
            <div className="bg-[#d9e2ef] rounded-[8px] overflow-hidden shrink-0" style={{ width: 84, height: 100 }}>
              {previewUrl ? (
                <img src={previewUrl} alt="미리보기" className="w-full h-full object-cover" />
              ) : (
                <div className="bg-[#eef3fa] w-full h-full flex flex-col items-center justify-center">
                  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                    <path d={rightSvg.p204ea200} fill="#C2CFDF" />
                  </svg>
                  <span className="text-[#8a9cb4] text-[14px] font-['Pretendard:Regular',sans-serif] tracking-[-0.28px]">사진 없음</span>
                </div>
              )}
            </div>
          </div>

          {/* File input row */}
          <div className="flex gap-[8px] items-center">
            <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/gif" className="hidden" onChange={handleFile} />
            <div className="flex-1 h-[36px] bg-white border border-[#d7e1ee] rounded-[8px] px-[10px] flex items-center">
              <span className={`text-[13px] font-['Pretendard:Regular',sans-serif] truncate ${fileName ? 'text-[#283445]' : 'text-[#a8b7cb]'}`}>
                {fileName || '텍스트를 입력하세요'}
              </span>
            </div>
            <button onClick={() => fileInputRef.current?.click()}
              className="h-[36px] bg-[#fff4db] rounded-[8px] px-[10px] text-[14px] text-[#ef5a27] font-['Pretendard:Regular',sans-serif] whitespace-nowrap hover:bg-[#ffe8a0] transition-colors shrink-0">
              파일 선택
            </button>
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-0">
            <span className="text-[12px] text-[#6d819b] font-['Pretendard:Regular',sans-serif]">* JPG, PNG, GIF 파일만 업로드 가능합니다.</span>
            <span className="text-[12px] text-[#6d819b] font-['Pretendard:Regular',sans-serif]">* 5MB 이하의 파일을 권장합니다.</span>
          </div>

          {/* 사진 삭제 옵션 */}
          {previewUrl && (
            <button onClick={() => { setPreviewUrl(null); setFileName('') }}
              className="self-start h-[24px] rounded-[6px] border border-[#c2cfdf] bg-white flex items-center gap-[4px] px-[8px] text-[12px] text-[#8a9cb4] font-['Pretendard:Regular',sans-serif] hover:border-[#e05a5a] hover:text-[#e05a5a] transition-colors">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1.5 2.5H8.5M3.5 2.5V1.5H6.5V2.5M4 4.5V7.5M6 4.5V7.5M2 2.5L2.5 8.5H7.5L8 2.5" />
              </svg>
              사진 삭제
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#eef1f8] flex items-center justify-end gap-[12px] px-[20px] py-[12px] shrink-0">
          <button onClick={() => onSave(previewUrl)}
            className="h-[40px] bg-[#2a3461] rounded-[8px] px-[14px] flex items-center gap-[6px] text-white text-[14px] font-['Pretendard:Regular',sans-serif] hover:bg-[#364275] transition-colors">
            <svg width="10" height="7" viewBox="0 0 10 7" fill="none"><path d="M0.5 3.5L3.5 6.5L9.5 0.5" stroke="white" strokeLinecap="round" strokeLinejoin="round" /></svg>
            저장
          </button>
          <button onClick={onClose}
            className="h-[40px] bg-[#eef1f8] rounded-[8px] px-[14px] text-[#3e4d63] text-[14px] font-['Pretendard:Regular',sans-serif] hover:bg-[#e0e5f0] transition-colors">
            취소
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── 담당복지사 지정 모달 ───────────────────────────────────────────────────────

function WelfareSelectModal({ initial, onSave, onClose }: {
  initial: string[]
  onSave: (ids: string[]) => void
  onClose: () => void
}) {
  const [selected, setSelected] = useState<string[]>(initial)
  const [jobFilter, setJobFilter] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  const filtered = STAFF_LIST.filter(s =>
    (!jobFilter || s.job === jobFilter) &&
    (!nameFilter || s.name.includes(nameFilter))
  )
  const selectedStaff = STAFF_LIST.filter(s => selected.includes(s.id))

  function toggle(id: string) {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }
  function toggleAll() {
    const allIds = filtered.map(s => s.id)
    const allChecked = allIds.every(id => selected.includes(id))
    if (allChecked) setSelected(prev => prev.filter(id => !allIds.includes(id)))
    else setSelected(prev => Array.from(new Set([...prev, ...allIds])))
  }

  const jobs = Array.from(new Set(STAFF_LIST.map(s => s.job)))
  const allChecked = filtered.length > 0 && filtered.every(s => selected.includes(s.id))

  // 테이블 헤더 공통
  function TableHead({ showCheck = false }: { showCheck?: boolean }) {
    return (
      <div className="bg-[#f4f7fc] h-[44px] flex border-b border-[#c2cfdf] shrink-0">
        {showCheck && (
          <div className="w-[36px] shrink-0 flex items-center justify-center border-r border-[#c2cfdf]">
            <div onClick={toggleAll} className="cursor-pointer w-[16px] h-[16px] rounded-[4px] border border-[#d7e1ee] bg-white flex items-center justify-center"
              style={allChecked ? { background: '#ef5a27', borderColor: '#ef5a27' } : {}}>
              {allChecked && <svg width="10" height="8" viewBox="0 0 10.46 7.5" fill="none"><path d="M1 3.5L4 6.5L9.5 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>}
            </div>
          </div>
        )}
        {[['이름', 'flex-1'], ['생년월일', 'flex-1'], ['직종', 'flex-1']].map(([label, cls]) => (
          <div key={label} className={`${cls} h-full flex items-center justify-between pl-[10px] pr-[8px] border-r border-[#c2cfdf] last:border-r-0`}>
            <span className="text-[13px] text-[#283445] font-['Pretendard:Regular',sans-serif] tracking-[-0.26px]">{label}</span>
            <span className="text-[10px] text-[#8a9cb4] tracking-[-0.2px]"> ↕</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white rounded-[16px] shadow-[0px_20px_40px_0px_rgba(0,0,0,0.1)] w-[700px] flex flex-col overflow-hidden" style={{ maxHeight: '88vh' }}>

        {/* Header — 고정 */}
        <div className="flex items-center justify-between px-[24px] py-[12px] border-b border-[#c2cfdf] shrink-0">
          <span className="font-['Pretendard:Bold',sans-serif] text-[17px] text-[#0e1225] tracking-[-0.34px]">담당 복지사 선택</span>
          <button onClick={onClose} className="p-[4px] rounded-[6px] hover:bg-[#f4f7fc] transition-colors">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="#8A9CB4" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </button>
        </div>

        {/* Body — 스크롤 */}
        <div className="flex flex-col gap-[16px] px-[24px] py-[20px] overflow-y-auto min-h-0">

          {/* Filter bar: 직종 + 종사자명만 */}
          <div className="bg-[#f4f7fc] rounded-[12px] px-[16px] py-[12px] flex gap-[12px] items-end shrink-0">
            <div className="flex flex-col gap-[4px] flex-1">
              <span className="text-[13px] text-[#283445] font-['Pretendard:Regular',sans-serif] tracking-[-0.26px]">직종</span>
              <div className="relative">
                <select value={jobFilter} onChange={e => setJobFilter(e.target.value)}
                  className="w-full h-[30px] bg-white border border-[#a8b7cb] rounded-[8px] px-[8px] text-[14px] font-['Pretendard:Regular',sans-serif] text-[#283445] appearance-none focus:outline-none focus:border-[#2a3461] pr-[24px]">
                  <option value="">전체</option>
                  {jobs.map(j => <option key={j} value={j}>{j}</option>)}
                </select>
                <svg className="absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="6" viewBox="0 0 13.5 7.5" fill="none"><path d="M0.75 0.75L6.75 6.75L12.75 0.75" stroke="#8A9CB4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /></svg>
              </div>
            </div>
            <div className="flex flex-col gap-[4px] flex-1">
              <span className="text-[13px] text-[#283445] font-['Pretendard:Regular',sans-serif] tracking-[-0.26px]">종사자명</span>
              <input value={nameFilter} onChange={e => setNameFilter(e.target.value)} placeholder="이름 검색"
                className="w-full h-[30px] bg-white border border-[#a8b7cb] rounded-[8px] px-[8px] text-[14px] font-['Pretendard:Regular',sans-serif] text-[#283445] focus:outline-none focus:border-[#2a3461]" />
            </div>
            <button onClick={() => { setJobFilter(''); setNameFilter('') }}
              className="h-[30px] bg-white border border-[#c2cfdf] rounded-[6px] px-[6px] text-[12px] text-[#2a3461] font-['Pretendard:Regular',sans-serif] whitespace-nowrap hover:border-[#2a3461] hover:bg-[#f4f7fc] transition-colors shrink-0">
              초기화
            </button>
          </div>

          {/* Result count */}
          <div className="h-[28px] flex items-center shrink-0">
            <span className="text-[13px] text-[#6b7382] font-['Pretendard:Regular',sans-serif]">
              검색 <strong className="font-['Pretendard:SemiBold',sans-serif] text-[#2a3461]">{filtered.length}</strong>{' / 전체 '}{STAFF_LIST.length}
            </span>
          </div>

          {/* Search result table — 고정 높이, 내부 스크롤 */}
          <div className="border border-[#c2cfdf] overflow-hidden shrink-0 flex flex-col" style={{ height: 44 + Math.min(filtered.length, 6) * 40 }}>
            <TableHead showCheck />
            <div className="overflow-y-auto">
              {filtered.map(s => {
                const checked = selected.includes(s.id)
                return (
                  <div key={s.id} onClick={() => toggle(s.id)} className="h-[40px] flex border-b border-[#c2cfdf] last:border-b-0 cursor-pointer hover:bg-[#f9fafc] transition-colors">
                    <div className="w-[36px] shrink-0 flex items-center justify-center border-r border-[#c2cfdf]">
                      <div className="w-[16px] h-[16px] rounded-[4px] border flex items-center justify-center"
                        style={checked ? { background: '#ef5a27', borderColor: '#ef5a27' } : { background: 'white', borderColor: '#d7e1ee' }}>
                        {checked && <svg width="10" height="8" viewBox="0 0 10.46 7.5" fill="none"><path d="M1 3.5L4 6.5L9.5 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>}
                      </div>
                    </div>
                    <div className="flex-1 flex items-center px-[10px] border-r border-[#c2cfdf]">
                      <span className="text-[14px] text-[#283445] font-['Pretendard:Regular',sans-serif]">{s.name}</span>
                    </div>
                    <div className="flex-1 flex items-center px-[10px] border-r border-[#c2cfdf]">
                      <span className="text-[14px] text-[#283445] font-['Pretendard:Regular',sans-serif]">{s.dob}</span>
                    </div>
                    <div className="flex-1 flex items-center px-[10px]">
                      <span className="text-[14px] text-[#283445] font-['Pretendard:Regular',sans-serif]">{s.job}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Selected staff list */}
          <div className="flex flex-col gap-[8px]">
            <span className="text-[13px] text-[#283445] font-['Pretendard:Regular',sans-serif] tracking-[-0.26px]">
              선택된 종사자 <strong className="font-['Pretendard:SemiBold',sans-serif] text-[#ef5a27]">{selectedStaff.length}</strong>명
            </span>
            <div className="border border-[#c2cfdf] rounded-[8px] p-[10px] min-h-[48px] flex flex-wrap gap-[6px] items-center bg-[#fafbfc]">
              {selectedStaff.length === 0 ? (
                <span className="text-[12px] text-[#8a9cb4]">선택된 종사자가 없습니다.</span>
              ) : (
                selectedStaff.map(s => (
                  <div key={s.id} className="h-[28px] bg-white border border-[#c2cfdf] rounded-[6px] px-[8px] flex items-center gap-[6px]">
                    <span className="text-[12px] text-[#283445]">{s.name} ({s.job})</span>
                    <button onClick={() => toggle(s.id)} className="text-[#8a9cb4] hover:text-[#e05a5a]">
                      <svg width="12" height="12" viewBox="0 0 20 20" fill="none"><path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#eef1f8] flex items-center justify-end gap-[12px] px-[20px] py-[12px] shrink-0">
          <button onClick={() => onSave(selected)}
            className="h-[40px] bg-[#2a3461] rounded-[8px] px-[14px] flex items-center gap-[6px] text-white text-[14px] font-['Pretendard:Regular',sans-serif] hover:bg-[#364275] transition-colors">
            <svg width="10" height="7" viewBox="0 0 10 7" fill="none"><path d="M0.5 3.5L3.5 6.5L9.5 0.5" stroke="white" strokeLinecap="round" strokeLinejoin="round" /></svg>
            선택 완료
          </button>
          <button onClick={onClose}
            className="h-[40px] bg-[#eef1f8] rounded-[8px] px-[14px] text-[#3e4d63] text-[14px] font-['Pretendard:Regular',sans-serif] hover:bg-[#e0e5f0] transition-colors">
            취소
          </button>
        </div>
      </div>
    </div>
  )
}

function HistoryLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-white h-[22px] px-2 rounded-[6px] border border-[#c2cfdf] text-[#2a3461] text-[11px] font-medium hover:border-[#2a3461] hover:bg-[#f4f7fc] transition-colors inline-flex items-center gap-1"
    >
      <span>{label}</span>
      <svg width="6" height="8" viewBox="0 0 6 9" fill="none">
        <path d="M1.5 1.5L4.5 4.5L1.5 7.5" stroke="#2A3461" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
      </svg>
    </button>
  )
}

// ─── Detail Panel Types & Constants ──────────────────────────────────────────

type SubTab = '보호자정보' | '기타비용' | '급여일정' | '청구내역' | '이용확인서'

const SUB_TABS: SubTab[] = ['보호자정보', '기타비용', '급여일정', '청구내역', '이용확인서']

type SmsTarget = {
  id: string
  targetType: string
  name: string
  relation?: string
  isPrimary?: boolean
  phone: string
  billing: boolean
  salaryRecord: boolean
  notice: boolean
}

// ─── Guardian Types & Modal ───────────────────────────────────────────────────

type Guardian = {
  id: string
  name: string
  relation: string
  isPrimary: boolean
  phone: string
  noticeSync: boolean
  billingSync: boolean
  salarySync?: boolean
  zipCode: string
  address: string
  addressDetail: string
}

const INITIAL_GUARDIANS: Guardian[] = [
  {
    id: 'G01',
    name: '김수지',
    relation: '자녀',
    isPrimary: true,
    phone: '010-0000-0000',
    noticeSync: true,
    billingSync: true,
    salarySync: false,
    zipCode: '08378',
    address: '서울시 구로구 디지털로 34길 55, 코오롱싸이언스밸리 2차',
    addressDetail: 'B101호 (워크앤코)',
  },
  {
    id: 'G02',
    name: '김수정',
    relation: '자녀',
    isPrimary: false,
    phone: '010-0000-0000',
    noticeSync: true,
    billingSync: true,
    salarySync: false,
    zipCode: '08378',
    address: '서울시 구로구 디지털로 34길 55, 코오롱싸이언스밸리 2차',
    addressDetail: 'B101호 (워크앤코)',
  },
]

function GuardianModal({
  person,
  guardians,
  onSave,
  onClose,
}: {
  person: Beneficiary
  guardians: Guardian[]
  onSave: (list: Guardian[]) => void
  onClose: () => void
}) {
  const [list, setList] = useState<Guardian[]>(guardians.length > 0 ? guardians : [
    {
      id: 'G_NEW_1',
      name: '',
      relation: '',
      isPrimary: true,
      phone: '',
      noticeSync: true,
      billingSync: true,
      zipCode: '',
      address: '',
      addressDetail: '',
    }
  ])
  const age = calcAge(person.dob)

  function addGuardian() {
    setList(prev => [
      ...prev,
      {
        id: `G_NEW_${Date.now()}`,
        name: '',
        relation: '',
        isPrimary: prev.length === 0,
        phone: '',
        noticeSync: true,
        billingSync: true,
        zipCode: '',
        address: '',
        addressDetail: '',
      }
    ])
  }

  function removeGuardian(index: number) {
    setList(prev => prev.filter((_, i) => i !== index))
  }

  function updateField<K extends keyof Guardian>(index: number, field: K, value: Guardian[K]) {
    setList(prev => {
      const next = [...prev]
      if (field === 'isPrimary' && value === true) {
        next.forEach((g, i) => { g.isPrimary = (i === index) })
      } else {
        next[index] = { ...next[index], [field]: value }
      }
      return next
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-[16px] shadow-2xl w-[720px] flex flex-col overflow-hidden" style={{ maxHeight: '90vh' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#c2cfdf] bg-white shrink-0">
          <span className="font-bold text-[17px] text-[#0e1225]">보호자 등록</span>
          <button onClick={onClose} className="p-1 rounded-[6px] text-[#8a9cb4] hover:text-[#0e1225] hover:bg-[#f4f7fc] transition-colors">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
        </div>

        {/* Recipient summary bar */}
        <div className="px-6 py-3 bg-[#f8fafc] border-b border-[#c2cfdf] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-[20px] h-[20px] rounded-[4px] bg-[#fce7f3] flex items-center justify-center shrink-0">
              <svg width="8" height="13" viewBox="0 0 8.25 12.75" fill="none"><path d={rightSvg.p26aa8900} fill="#BE185D" /></svg>
            </div>
            <strong className="text-[15px] text-[#0e1225]">{person.name}</strong>
            <span className="text-[13px] text-[#64748b]">{person.dob} ({age}세)</span>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-[4px] border ${GRADE_COLOR[gradeKey(person.grade)] ?? 'bg-white text-[#283445]'}`}>
              {person.grade}등급
            </span>
          </div>

          <button
            onClick={addGuardian}
            className="h-[32px] px-3 rounded-[8px] border border-[#c2cfdf] bg-white text-[#2a3461] text-[13px] font-semibold hover:bg-[#f4f7fc] hover:border-[#2a3461] transition-colors flex items-center gap-1 shadow-xs"
          >
            <span className="text-[15px] leading-none font-bold">+</span>
            <span>보호자 추가</span>
          </button>
        </div>

        {/* Body list */}
        <div className="p-6 flex flex-col gap-4 overflow-y-auto min-h-0 bg-[#f4f7fc]">
          {list.length === 0 ? (
            <div className="bg-white rounded-[12px] p-8 border border-[#c2cfdf] flex flex-col items-center justify-center gap-2 text-center">
              <span className="text-[#8a9cb4] text-[14px]">등록된 보호자가 없습니다.</span>
              <button
                onClick={addGuardian}
                className="mt-2 h-[34px] px-4 rounded-[8px] bg-[#2a3461] text-white text-[13px] font-medium hover:bg-[#364275]"
              >
                + 첫 번째 보호자 등록하기
              </button>
            </div>
          ) : (
            list.map((g, idx) => (
              <div key={g.id || idx} className="bg-white rounded-[12px] border border-[#c2cfdf] p-4 flex flex-col gap-3 shadow-xs">
                {/* Card Header */}
                <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-2">
                  <span className="text-[14px] font-bold text-[#0e1225]">보호자 {idx + 1}</span>
                  <button
                    onClick={() => removeGuardian(idx)}
                    className="h-[26px] px-2 rounded-[6px] border border-[#fca5a5] text-[#e23a32] text-[11px] font-medium hover:bg-[#fee2e2] transition-colors flex items-center gap-1"
                  >
                    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 4h10M6 4V2h4v2M5 4v9h6V4" /></svg>
                    삭제
                  </button>
                </div>

                {/* Form row 1: Name + Relation */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <label className="text-[12px] font-semibold text-[#334155]">
                        보호자명 <span className="text-[#ef5a27]">*</span>
                      </label>
                      <label className="flex items-center gap-1 cursor-pointer text-[11px] text-[#64748b]">
                        <input
                          type="checkbox"
                          checked={g.isPrimary}
                          onChange={e => updateField(idx, 'isPrimary', e.target.checked)}
                          className="accent-[#2a3461] rounded"
                        />
                        <span>주보호자</span>
                      </label>
                    </div>
                    <input
                      value={g.name}
                      onChange={e => updateField(idx, 'name', e.target.value)}
                      placeholder="이름"
                      className="h-[36px] bg-white border border-[#d7e1ee] rounded-[8px] px-3 text-[13px] text-[#0e1225] focus:outline-none focus:border-[#2a3461]"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-semibold text-[#334155]">
                      수급자와의 관계 <span className="text-[#ef5a27]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={g.relation}
                        onChange={e => updateField(idx, 'relation', e.target.value)}
                        className="w-full h-[36px] bg-white border border-[#d7e1ee] rounded-[8px] px-3 text-[13px] text-[#0e1225] focus:outline-none focus:border-[#2a3461] appearance-none"
                      >
                        <option value="">선택하세요</option>
                        <option value="자녀">자녀</option>
                        <option value="배우자">배우자</option>
                        <option value="부모">부모</option>
                        <option value="형제자매">형제자매</option>
                        <option value="사위/며느리">사위/며느리</option>
                        <option value="손자/손녀">손자/손녀</option>
                        <option value="기타">기타</option>
                      </select>
                      <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="#8A9CB4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                  </div>
                </div>

                {/* Form row 2: Phone + Address */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <label className="text-[12px] font-semibold text-[#334155]">
                        연락처 <span className="text-[#ef5a27]">*</span>
                      </label>
                      <label className="flex items-center gap-1 cursor-pointer text-[11px] text-[#64748b]">
                        <input
                          type="checkbox"
                          checked={g.noticeSync}
                          onChange={e => updateField(idx, 'noticeSync', e.target.checked)}
                          className="accent-[#2a3461] rounded"
                        />
                        <span>공지 수신</span>
                      </label>
                    </div>
                    <input
                      value={g.phone}
                      onChange={e => updateField(idx, 'phone', e.target.value)}
                      placeholder="010-0000-0000"
                      className="h-[36px] bg-white border border-[#d7e1ee] rounded-[8px] px-3 text-[13px] text-[#0e1225] focus:outline-none focus:border-[#2a3461]"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-semibold text-[#334155]">주소</label>
                    <div className="flex gap-2">
                      <input
                        value={g.zipCode}
                        onChange={e => updateField(idx, 'zipCode', e.target.value)}
                        placeholder="우편번호"
                        className="flex-1 h-[36px] bg-white border border-[#d7e1ee] rounded-[8px] px-3 text-[13px] text-[#0e1225] focus:outline-none focus:border-[#2a3461]"
                      />
                      <button
                        onClick={() => {
                          updateField(idx, 'zipCode', '08378')
                          updateField(idx, 'address', '서울시 구로구 디지털로 34길 55, 코오롱싸이언스밸리 2차')
                        }}
                        className="h-[36px] px-3 bg-[#fff4db] text-[#ef5a27] rounded-[6px] text-[13px] font-bold hover:bg-[#ffe8a0] transition-colors shrink-0"
                      >
                        검색
                      </button>
                    </div>
                    <input
                      value={g.address}
                      onChange={e => updateField(idx, 'address', e.target.value)}
                      placeholder="기본주소 (자동 입력)"
                      className="h-[36px] bg-[#f8fafc] border border-[#d7e1ee] rounded-[8px] px-3 text-[13px] text-[#0e1225] focus:outline-none focus:border-[#2a3461] mt-1"
                    />
                    <input
                      value={g.addressDetail}
                      onChange={e => updateField(idx, 'addressDetail', e.target.value)}
                      placeholder="상세주소를 입력하세요"
                      className="h-[36px] bg-white border border-[#d7e1ee] rounded-[8px] px-3 text-[13px] text-[#0e1225] focus:outline-none focus:border-[#2a3461] mt-1"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#f8fafc] border-t border-[#c2cfdf] px-6 py-3 flex items-center justify-end gap-2 shrink-0">
          <button
            onClick={() => onSave(list)}
            className="h-[38px] bg-[#2a3461] rounded-[8px] px-4 flex items-center gap-1.5 text-white text-[13px] font-semibold hover:bg-[#364275] transition-colors"
          >
            <svg width="10" height="7" viewBox="0 0 10 7" fill="none"><path d="M0.5 3.5L3.5 6.5L9.5 0.5" stroke="white" strokeLinecap="round" strokeLinejoin="round" /></svg>
            저장
          </button>
          <button
            onClick={onClose}
            className="h-[38px] bg-white border border-[#c2cfdf] rounded-[8px] px-4 text-[#475569] text-[13px] font-medium hover:bg-[#f1f5f9] transition-colors"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  )
}


function SmsManagementModal({
  person,
  guardians,
  onClose,
}: {
  person: Beneficiary
  guardians: Guardian[]
  onClose: () => void
}) {
  const [targets, setTargets] = useState<SmsTarget[]>(() => {
    const list: SmsTarget[] = [
      {
        id: 'recipient',
        targetType: '수급자',
        name: person.name,
        phone: person.phone,
        billing: false,
        salaryRecord: false,
        notice: false,
      }
    ]
    guardians.forEach((g, idx) => {
      list.push({
        id: g.id || `guardian_${idx}`,
        targetType: '보호자',
        name: g.name || `보호자 ${idx + 1}`,
        relation: g.relation || '자녀',
        isPrimary: g.isPrimary,
        phone: g.phone || '010-0000-0000',
        billing: g.billingSync ?? false,
        salaryRecord: g.salarySync ?? false,
        notice: g.noticeSync ?? false,
      })
    })
    return list
  })

  function toggleField(id: string, field: 'billing' | 'salaryRecord' | 'notice') {
    setTargets(prev => prev.map(t => t.id === id ? { ...t, [field]: !t[field] } : t))
  }

  function handleSave() {
    alert('문자 발송 설정이 안전하게 저장되었습니다.')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-[16px] shadow-[0px_20px_40px_0px_rgba(0,0,0,0.15)] w-full max-w-[700px] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-[24px] py-[16px] border-b border-[#c2cfdf] bg-white shrink-0">
          <span className="font-['Pretendard:Bold',sans-serif] text-[18px] text-[#0e1225] tracking-[-0.34px]">문자 발송 관리</span>
          <button onClick={onClose} className="p-[4px] rounded-[6px] hover:bg-[#f4f7fc] text-[#8a9cb4] hover:text-[#0e1225] transition-colors cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </button>
        </div>

        {/* Recipient summary bar */}
        <ModalRecipientBar person={person} />

        {/* Body Table */}
        <div className="p-[20px] overflow-y-auto max-h-[60vh]">
          <table className="w-full border-collapse text-[13.5px] border border-[#c2cfdf]">
            <thead>
              <tr className="bg-[#f4f7fc] text-[#334155] border-b border-[#c2cfdf]">
                <th className="h-[42px] px-3 text-center font-bold border-r border-[#c2cfdf] w-[80px] text-[14px]">구분 ↕</th>
                <th className="h-[42px] px-3 text-left font-bold border-r border-[#c2cfdf] w-[160px] text-[14px]">이름 ↕</th>
                <th className="h-[42px] px-3 text-left font-bold border-r border-[#c2cfdf] text-[14px]">연락처 ↕</th>
                <th className="h-[42px] px-2 text-center font-bold border-r border-[#c2cfdf] w-[85px] text-[14px]">청구서</th>
                <th className="h-[42px] px-2 text-center font-bold border-r border-[#c2cfdf] w-[120px] text-[14px]">급여제공기록지</th>
                <th className="h-[42px] px-2 text-center font-bold w-[90px] text-[14px]">공지문자</th>
              </tr>
            </thead>
            <tbody>
              {targets.map(t => (
                <tr key={t.id} className="border-b border-[#c2cfdf] last:border-b-0 hover:bg-[#f9fafc] transition-colors">
                  <td className="h-[46px] px-3 text-center border-r border-[#c2cfdf] text-[#475569] font-medium text-[14px]">
                    {t.targetType}
                  </td>
                  <td className="h-[46px] px-3 border-r border-[#c2cfdf] text-[#0e1225] font-semibold text-[14px]">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span>{t.name}{t.relation ? `(${t.relation})` : ''}</span>
                      {t.isPrimary && (
                        <span className="bg-[#0093a9] text-white text-[11.5px] font-bold px-1.5 py-0.5 rounded-[4px] whitespace-nowrap">
                          주보호자
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="h-[46px] px-3 border-r border-[#c2cfdf] text-[#334155] font-mono text-[14px]">
                    {t.phone}
                  </td>
                  <td className="h-[46px] px-2 text-center border-r border-[#c2cfdf]">
                    <input
                      type="checkbox"
                      checked={t.billing}
                      onChange={() => toggleField(t.id, 'billing')}
                      className="w-[18px] h-[18px] accent-[#2a3461] rounded cursor-pointer"
                    />
                  </td>
                  <td className="h-[46px] px-2 text-center border-r border-[#c2cfdf]">
                    <input
                      type="checkbox"
                      checked={t.salaryRecord}
                      onChange={() => toggleField(t.id, 'salaryRecord')}
                      className="w-[18px] h-[18px] accent-[#2a3461] rounded cursor-pointer"
                    />
                  </td>
                  <td className="h-[46px] px-2 text-center">
                    <input
                      type="checkbox"
                      checked={t.notice}
                      onChange={() => toggleField(t.id, 'notice')}
                      className="w-[18px] h-[18px] accent-[#2a3461] rounded cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="bg-[#eef1f8] flex items-center justify-end gap-[12px] px-[20px] py-[12px] shrink-0 border-t border-[#c2cfdf]">
          <button
            onClick={handleSave}
            className="h-[40px] bg-[#2a3461] rounded-[8px] px-[18px] flex items-center gap-[6px] text-white text-[14.5px] font-semibold hover:bg-[#364275] transition-colors cursor-pointer shadow-xs"
          >
            <svg width="12" height="9" viewBox="0 0 10 7" fill="none">
              <path d="M0.5 3.5L3.5 6.5L9.5 0.5" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
            </svg>
            저장
          </button>
          <button
            onClick={onClose}
            className="h-[40px] bg-white border border-[#c2cfdf] rounded-[8px] px-[16px] text-[#475569] text-[14.5px] font-medium hover:bg-[#f1f5f9] hover:border-[#2a3461] transition-colors cursor-pointer"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  )
}

function DetailPanel({ person, onClose }: { person: Beneficiary; onClose: () => void }) {
  const [subTab, setSubTab] = useState<SubTab>('보호자정보')
  const [collapsed, setCollapsed] = useState(false)
  const [isWideView, setIsWideView] = useState(false)
  const [diagnosis, setDiagnosis] = useState(person.diagnosis)
  const [memo, setMemo] = useState(person.memo)
  const [actualDob, setActualDob] = useState('')
  const [actualDobType, setActualDobType] = useState<'양력' | '음력'>('양력')
  const [dobSyncLtc, setDobSyncLtc] = useState(false)
  const [phoneSyncLtc, setPhoneSyncLtc] = useState(true)
  const [phoneCustom, setPhoneCustom] = useState(person.phone)
  const [addressSyncLtc, setAddressSyncLtc] = useState(true)
  const [addressCustom, setAddressCustom] = useState(person.address)
  const [modalOpen, setModalOpen] = useState(false)
  const [smsModalOpen, setSmsModalOpen] = useState(false)
  const [welfareModalOpen, setWelfareModalOpen] = useState(false)
  const [guardianModalOpen, setGuardianModalOpen] = useState(false)
  const [guardians, setGuardians] = useState<Guardian[]>(INITIAL_GUARDIANS)
  const [selectedWorkerIds, setSelectedWorkerIds] = useState<string[]>([])
  const [historyModal, setHistoryModal] = useState<null | 'grade' | 'copay' | 'contract'>(null)
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [photoModalOpen, setPhotoModalOpen] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [modalDiagnosis, setModalDiagnosis] = useState(diagnosis)
  const [modalMemo, setModalMemo] = useState(memo)
  const [modalActualDob, setModalActualDob] = useState(actualDob)
  const [modalActualDobType, setModalActualDobType] = useState<'양력' | '음력'>(actualDobType)
  const [modalDobSync, setModalDobSync] = useState(dobSyncLtc)
  const [modalPhoneSync, setModalPhoneSync] = useState(phoneSyncLtc)
  const [modalPhoneVal, setModalPhoneVal] = useState(phoneCustom)
  const [modalAddressSync, setModalAddressSync] = useState(addressSyncLtc)
  const [modalAddressVal, setModalAddressVal] = useState(addressCustom)
  const gk = gradeKey(person.grade)
  const age = calcAge(person.dob)
  const monthlyLimit = getMonthlyLimit(person.grade, person.customLimit)

  function openModal() {
    setModalDiagnosis(diagnosis)
    setModalMemo(memo)
    setModalActualDob(actualDob)
    setModalActualDobType(actualDobType)
    setModalDobSync(dobSyncLtc)
    setModalPhoneSync(phoneSyncLtc)
    setModalPhoneVal(phoneCustom)
    setModalAddressSync(addressSyncLtc)
    setModalAddressVal(addressCustom)
    setModalOpen(true)
  }

  function saveModal() {
    setDiagnosis(modalDiagnosis)
    setMemo(modalMemo)
    setActualDob(modalActualDob)
    setActualDobType(modalActualDobType)
    setDobSyncLtc(modalDobSync)
    setPhoneSyncLtc(modalPhoneSync)
    setPhoneCustom(modalPhoneVal)
    setAddressSyncLtc(modalAddressSync)
    setAddressCustom(modalAddressVal)
    setModalOpen(false)
  }

  return (
    <div className="flex flex-col h-full gap-2 overflow-hidden">
      {/* ─── 섹션 1: 수급자 기본정보 ─── */}
      <div className="flex flex-col bg-white border border-[#c2cfdf] shrink-0 shadow-2xs">
        {/* 섹션 1 헤더 바 */}
        <div className="p-3 flex items-center justify-between border-b border-[#c2cfdf] bg-[#fafbfc] flex-wrap gap-2">
          <div className="flex items-center gap-2 flex-wrap">


            {/* 성별 기호 뱃지 박스 */}
            <span className={`w-[22px] h-[22px] rounded-[6px] flex items-center justify-center font-bold text-[13px] leading-none shrink-0 ${person.gender === '여'
              ? 'bg-[#fdf2f8] text-[#e11d48]'
              : 'bg-[#eff6ff] text-[#2563eb]'
              }`}>
              {person.gender === '여' ? '♀' : '♂'}
            </span>
            {/* 수급자 성명 */}
            <span className="text-[16px] font-bold text-[#0e1225] leading-none tracking-tight ml-0.5">
              {person.name}
            </span>
            {/* 생년월일 (나이) */}
            <span className="text-[13.5px] text-[#64748b] font-normal leading-none mr-1">
              {person.dob} ({age}세)
            </span>
            {/* 수급 등급 뱃지 */}
            <span className="h-[24px] px-2.5 inline-flex items-center justify-center text-[12px] font-medium bg-[#eef2f8] text-[#334155] rounded-[4px] leading-none whitespace-nowrap">
              {person.grade}등급
            </span>
            {/* 계약 상태 뱃지 */}
            <span className="h-[24px] px-2.5 inline-flex items-center justify-center text-[12px] font-medium bg-[#e8f8ed] text-[#1c9640] border border-[#a7f3d0] rounded-[4px] leading-none whitespace-nowrap">
              {person.contractStatus}
            </span>
            {/* 급여제공한도 뱃지 */}
            <span className="h-[24px] px-2.5 inline-flex items-center justify-center text-[12px] bg-[#dff8fb] text-[#0891b2] border border-[#a5f3fc] rounded-[4px] leading-none whitespace-nowrap gap-1">
              <span className="font-normal">한도:</span>
              <strong className="font-bold">{formatCurrency(monthlyLimit)}</strong>
            </span>

            {/* 접기/펼치기 토글 버튼 */}
            {/* <button
              onClick={() => setIsWideView(w => !w)}
              className={`h-[24px] px-2 rounded-[4px] border text-[11.5px] font-medium transition-all flex items-center gap-1 cursor-pointer ml-1 ${isWideView
                ? 'border-[#fcd8cc] bg-[#fff5f0] text-[#ef5a27] hover:bg-[#ffe8de] hover:border-[#ef5a27]'
                : 'border-[#c2cfdf] bg-white text-[#475569] hover:border-[#2a3461] hover:text-[#2a3461] hover:bg-[#eef3fa]'
                }`}
              title={isWideView ? '기본정보 펼치기' : '기본정보 접기 (넓게보기)'}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                {isWideView ? (
                  <path d="M6 9l6 6 6-6" />
                ) : (
                  <path d="M18 15l-6-6-6 6" />
                )}
              </svg>
              <span>{isWideView ? '펼치기' : '접기'}</span>
            </button> */}
          </div>

          {/* 우측 액션 버튼 및 패널 닫기 */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSmsModalOpen(true)}
              className="h-[28px] px-2.5 rounded-[6px] border border-[#c2cfdf] bg-white text-[#2a3461] text-[12.5px] font-semibold hover:border-[#2a3461] hover:bg-[#f4f7fc] transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <svg width="12" height="10" viewBox="0 0 14 11" fill="none">
                <path d={rightSvg.p1f34af00} stroke="#2a3461" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d={rightSvg.p12c14080} stroke="#2a3461" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              문자 발송
            </button>
            <button
              onClick={openModal}
              className="h-[28px] px-2.5 rounded-[6px] bg-[#2a3461] text-white text-[12.5px] font-semibold hover:bg-[#364275] transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <svg width="11" height="11" viewBox="0 0 13 13" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
                <path d="M9 1.5L11.5 4L4.5 11H2V8.5L9 1.5Z" />
              </svg>
              정보 수정
            </button>

            <div className="w-[1px] h-[16px] bg-[#c2cfdf] mx-0.5" />

            <button
              onClick={onClose}
              className="p-1 rounded-[6px] text-[#8a9cb4] hover:text-[#2a3461] hover:bg-[#eef3fa] transition-colors cursor-pointer"
              title="상세창 닫기"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* 수급자 기본정보 상세 영역 (접기/펼치기 제어) */}
        {!isWideView && (
          <div className="flex flex-col md:flex-row items-stretch">
            {/* 사진 영역 */}
            <div className="w-[104px] shrink-0 border-b md:border-b-0 md:border-r border-[#c2cfdf] p-2 flex flex-col items-center justify-center gap-1.5 bg-[#fafbfc]">
              <div
                onClick={() => setPhotoModalOpen(true)}
                className="w-[88px] h-[102px] border border-[#c2cfdf] rounded-[8px] bg-[#eef3fa] cursor-pointer overflow-hidden group relative flex flex-col items-center justify-center"
              >
                {photoUrl ? (
                  <img src={photoUrl} alt="수급자 사진" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <svg width="34" height="34" viewBox="0 0 44 44" fill="none"><path d={rightSvg.p204ea200} fill="#C2CFDF" /></svg>
                    <span className="text-[#8a9cb4] text-[10px] font-medium mt-0.5">사진 등록</span>
                  </>
                )}
                <div className="absolute inset-0 bg-black/40 group-hover:opacity-100 opacity-0 transition-opacity flex items-center justify-center">
                  <span className="text-white text-[10px] font-medium bg-black/60 rounded-[4px] px-1.5 py-0.5">{photoUrl ? '변경' : '등록'}</span>
                </div>
              </div>
            </div>

            {/* 격자 테이블 — 3열 구조(한 줄에 3개) 최적화로 세로 높이 최소화 및 가로 활용 극대화 */}
            <div className="flex-1 text-[13.5px]">
              {/* Row 1: 수급자명 / 생년월일 / 인정등급 */}
              <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_100px_1fr_100px_1fr] border-b border-[#c2cfdf]">
                <div className="bg-[#f4f7fc] px-3 py-2 font-semibold text-[#334155] flex items-center border-b md:border-b-0 md:border-r border-[#c2cfdf] whitespace-nowrap">
                  수급자명
                </div>
                <div className="px-3 py-2 text-[#0e1225] flex items-center border-b md:border-b-0 md:border-r border-[#c2cfdf]">
                  <strong className="text-[#0e1225] text-[14.5px] mr-1">{person.name}</strong> ({person.gender}/만{age}세)
                </div>
                <div className="bg-[#f4f7fc] px-3 py-2 font-semibold text-[#334155] flex items-center border-b md:border-b-0 md:border-r border-[#c2cfdf] whitespace-nowrap">
                  생년월일
                </div>
                <div className="px-3 py-2 text-[#0e1225] flex items-center border-b md:border-b-0 md:border-r border-[#c2cfdf]">
                  <span>{person.dob}</span>
                  {actualDob && !dobSyncLtc && (
                    <span className="text-[#64748b] text-[11.5px] ml-1.5 font-normal">[{actualDob}({actualDobType})]</span>
                  )}
                </div>
                <div className="bg-[#f4f7fc] px-3 py-2 font-semibold text-[#334155] flex items-center border-b md:border-b-0 md:border-r border-[#c2cfdf] whitespace-nowrap">
                  인정등급
                </div>
                <div className="px-3 py-2 text-[#0e1225] flex items-center justify-between">
                  <span className="text-[14px]"><strong>{person.grade}등급</strong></span>
                  <HistoryLink label="이력" onClick={() => setHistoryModal('grade')} />
                </div>
              </div>

              {/* Row 2: 인정번호 / 본인부담률 / 연락처 */}
              <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_100px_1fr_100px_1fr] border-b border-[#c2cfdf]">
                <div className="bg-[#f4f7fc] px-3 py-2 font-semibold text-[#334155] flex items-center border-b md:border-b-0 md:border-r border-[#c2cfdf] whitespace-nowrap">
                  인정번호
                </div>
                <div className="px-3 py-2 text-[#0e1225] font-mono flex items-center text-[13px] border-b md:border-b-0 md:border-r border-[#c2cfdf]">
                  {person.rcgtNo}
                </div>
                <div className="bg-[#f4f7fc] px-3 py-2 font-semibold text-[#334155] flex items-center border-b md:border-b-0 md:border-r border-[#c2cfdf] whitespace-nowrap">
                  본인부담률
                </div>
                <div className="px-3 py-2 text-[#0e1225] flex items-center justify-between border-b md:border-b-0 md:border-r border-[#c2cfdf]">
                  <span>{person.copayLabel}</span>
                  <HistoryLink label="이력" onClick={() => setHistoryModal('copay')} />
                </div>
                <div className="bg-[#f4f7fc] px-3 py-2 font-semibold text-[#334155] flex items-center border-b md:border-b-0 md:border-r border-[#c2cfdf] whitespace-nowrap">
                  연락처
                </div>
                <div className="px-3 py-2 text-[#0e1225] font-mono flex items-center">
                  {phoneSyncLtc ? person.phone : phoneCustom}
                </div>
              </div>

              {/* Row 3: 계약기간 (단독 1줄 전체 너비) */}
              <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] border-b border-[#c2cfdf]">
                <div className="bg-[#f4f7fc] px-3 py-2 font-semibold text-[#334155] flex items-center border-b md:border-b-0 md:border-r border-[#c2cfdf] whitespace-nowrap">
                  계약기간
                </div>
                <div className="px-3 py-2 text-[#0e1225] flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    {['방문요양', '방문목욕', '방문간호']
                      .filter(s => (person.contractHistory ?? []).some(h => h.service === s))
                      .map(s => {
                        const latest = [...(person.contractHistory ?? [])].filter(h => h.service === s).at(-1)
                        return (
                          <div key={s} className="flex items-center gap-1.5 border border-[#c2cfdf] rounded-[6px] px-2 py-0.5 bg-[#f8fafc]">
                            <span className={`text-[11px] px-1.5 py-0.2 rounded-[4px] font-semibold ${SERVICE_COLORS[s] ?? ''}`}>{SERVICE_SHORT[s]}</span>
                            <span className="text-[13px] text-[#334155]">{latest?.from} ~ {latest?.to}</span>
                          </div>
                        )
                      })}
                  </div>
                  <HistoryLink label="이력" onClick={() => setHistoryModal('contract')} />
                </div>
              </div>

              {/* Row 4: 담당 복지사 / 주요질환 / 주소 (위치정보) */}
              <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_100px_1fr_100px_1fr] border-b border-[#c2cfdf]">
                <div className="bg-[#f4f7fc] px-3 py-2 font-semibold text-[#334155] flex items-center border-b md:border-b-0 md:border-r border-[#c2cfdf] whitespace-nowrap">
                  담당 복지사
                </div>
                <div className="px-3 py-2 text-[#0e1225] flex items-center justify-between border-b md:border-b-0 md:border-r border-[#c2cfdf]">
                  <span className="truncate font-medium">
                    {selectedWorkerIds.length > 0
                      ? STAFF_LIST.filter(s => selectedWorkerIds.includes(s.id)).map(s => s.name).join(', ')
                      : person.workers.map(w => w.name).join(', ')}
                  </span>
                  <button
                    onClick={() => setWelfareModalOpen(true)}
                    className="ml-1.5 bg-white h-[22px] px-1.5 rounded-[4px] border border-[#c2cfdf] text-[#2a3461] text-[11.5px] font-medium hover:border-[#2a3461] hover:bg-[#f4f7fc] transition-colors cursor-pointer shrink-0"
                  >
                    배정
                  </button>
                </div>
                <div className="bg-[#f4f7fc] px-3 py-2 font-semibold text-[#334155] flex items-center border-b md:border-b-0 md:border-r border-[#c2cfdf] whitespace-nowrap">
                  주요질환
                </div>
                <div className="px-3 py-2 text-[#0e1225] flex items-center border-b md:border-b-0 md:border-r border-[#c2cfdf] truncate">
                  <span className="truncate">{diagnosis || '-'}</span>
                </div>
                <div className="bg-[#f4f7fc] px-3 py-2 font-semibold text-[#334155] flex items-center border-b md:border-b-0 md:border-r border-[#c2cfdf] whitespace-nowrap">
                  주소
                </div>
                <div className="px-3 py-2 text-[#0e1225] flex items-center truncate">
                  <span className="truncate">{addressSyncLtc ? person.address : addressCustom}</span>
                </div>
              </div>

              {/* Row 5: 특이사항 (비고) */}
              <div className="grid grid-cols-1 md:grid-cols-[100px_1fr]">
                <div className="bg-[#f4f7fc] px-3 py-2 font-semibold text-[#334155] flex items-center border-b md:border-b-0 md:border-r border-[#c2cfdf] whitespace-nowrap">
                  특이사항
                </div>
                <div className="px-3 py-2 text-[#0e1225] flex items-center truncate">
                  <span className="truncate">{memo || '-'}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ─── 섹션 2: 상세 업무 및 이력 관리 ─── */}
      <div className="flex flex-col bg-white border border-[#c2cfdf] flex-1 min-h-0 overflow-hidden shadow-2xs">
        {/* 서브 탭 바 */}
        <div className="bg-[#f4f7fc] border-b border-[#c2cfdf] flex items-center justify-between shrink-0 overflow-x-auto">
          <div className="flex items-center overflow-x-auto">
            {SUB_TABS.map(t => (
              <button
                key={t}
                onClick={() => setSubTab(t)}
                className={`px-4 py-2.5 text-[13.5px] font-semibold whitespace-nowrap border-r border-[#c2cfdf] transition-colors cursor-pointer ${subTab === t
                  ? 'bg-white text-[#ef5a27] font-bold border-b-2 border-b-[#ef5a27]'
                  : 'text-[#334155] hover:bg-[#eef2f8]'
                  }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* 서브 탭 컨텐츠 (스크롤 가능) */}
        <div className="p-3 flex-1 overflow-y-auto flex flex-col min-h-0">
          {/* 서브 탭 1: 보호자 정보 (기타비용 탭 스타일 준용 표준 그리드 테이블) */}
          {subTab === '보호자정보' && (() => {
            const primaryGuardian = guardians.find(g => g.isPrimary) || guardians[0]
            return (
              <div className="flex flex-col gap-2.5 flex-1">
                {/* 상단 컨트롤 */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[14.5px] font-bold text-[#0e1225]">보호자 정보</span>
                    {primaryGuardian && (
                      <span className="h-[24px] px-2.5 inline-flex items-center justify-center text-[12.5px] font-semibold text-[#0e1225] bg-[#eef3fa] rounded-[4px] border border-[#c2cfdf] leading-none whitespace-nowrap">
                        주보호자: {primaryGuardian.name} ({primaryGuardian.relation || '관계 미지정'}) {primaryGuardian.phone ? `· ${primaryGuardian.phone}` : ''}
                      </span>
                    )}
                    <span className="h-[24px] px-2 inline-flex items-center justify-center text-[12px] bg-[#e8f8ed] text-[#1c9640] border border-[#c6f0d2] rounded-[4px] font-bold leading-none whitespace-nowrap">
                      등록 {guardians.length}명
                    </span>
                  </div>
                  <button
                    onClick={() => setGuardianModalOpen(true)}
                    className="h-[32px] px-3 rounded-[8px] bg-[#2a3461] text-white text-[13px] font-semibold hover:bg-[#364275] flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <svg width="12" height="12" viewBox="0 0 13 13" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M9 1.5L11.5 4L4.5 11H2V8.5L9 1.5Z" />
                    </svg>
                    보호자 등록/수정
                  </button>
                </div>

                {/* 테이블 */}
                <div className="overflow-x-auto border border-[#c2cfdf]">
                  <table className="w-full border-collapse text-[13px]" style={{ minWidth: 640 }}>
                    <thead>
                      <tr className="bg-[#f4f7fc] border-b border-[#c2cfdf] text-[#334155] font-bold">
                        {[
                          { label: '구분', w: 80 },
                          { label: '보호자명', w: 90 },
                          { label: '관계', w: 80 },
                          { label: '연락처', w: 125 },
                          { label: '동기화/알림설정', w: 140 },
                          { label: '주소', w: undefined },
                        ].map(col => (
                          <th
                            key={col.label}
                            className="px-3 py-2 text-left font-bold border-r border-[#c2cfdf] last:border-r-0 whitespace-nowrap"
                            style={col.w ? { width: col.w } : undefined}
                          >
                            {col.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {guardians.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center py-8 text-[#8a9cb4]">
                            등록된 보호자가 없습니다.
                          </td>
                        </tr>
                      ) : (
                        guardians.map((g, idx) => (
                          <tr
                            key={g.id || idx}
                            className="border-b border-[#c2cfdf] last:border-b-0 hover:bg-[#f8fafc] transition-colors"
                          >
                            {/* 구분 */}
                            <td className="px-3 py-2.5 border-r border-[#c2cfdf] whitespace-nowrap">
                              {g.isPrimary ? (
                                <span className="text-[11px] font-bold px-1.5 py-0.5 rounded-[4px] bg-[#fff5f0] text-[#ef5a27] border border-[#fcd8cc]">
                                  주보호자
                                </span>
                              ) : (
                                <span className="text-[12px] text-[#64748b]">일반</span>
                              )}
                            </td>
                            {/* 보호자명 */}
                            <td className="px-3 py-2.5 font-bold text-[#0e1225] border-r border-[#c2cfdf] whitespace-nowrap">
                              {g.name}
                            </td>
                            {/* 관계 */}
                            <td className="px-3 py-2.5 text-[#475569] border-r border-[#c2cfdf] whitespace-nowrap">
                              {g.relation || '미지정'}
                            </td>
                            {/* 연락처 */}
                            <td className="px-3 py-2.5 font-mono text-[#0e1225] font-semibold border-r border-[#c2cfdf] whitespace-nowrap">
                              {g.phone || '-'}
                            </td>
                            {/* 동기화/알림설정 배지 */}
                            <td className="px-3 py-2.5 border-r border-[#c2cfdf] whitespace-nowrap">
                              <div className="flex items-center gap-1">
                                <span
                                  className={`border px-1.5 py-0.5 rounded-[4px] text-[11px] font-bold ${g.salarySync
                                    ? 'border-[#ef5a27] text-[#ef5a27] bg-[#fff5f0]'
                                    : 'border-[#d9e2ef] text-[#94a3b8] bg-white'
                                    }`}
                                >
                                  급여
                                </span>
                                <span
                                  className={`border px-1.5 py-0.5 rounded-[4px] text-[11px] font-bold ${g.billingSync
                                    ? 'border-[#ef5a27] text-[#ef5a27] bg-[#fff5f0]'
                                    : 'border-[#d9e2ef] text-[#94a3b8] bg-white'
                                    }`}
                                >
                                  청구
                                </span>
                                <span
                                  className={`border px-1.5 py-0.5 rounded-[4px] text-[11px] font-bold ${g.noticeSync
                                    ? 'border-[#ef5a27] text-[#ef5a27] bg-[#fff5f0]'
                                    : 'border-[#d9e2ef] text-[#94a3b8] bg-white'
                                    }`}
                                >
                                  공지
                                </span>
                              </div>
                            </td>
                            {/* 주소 */}
                            <td className="px-3 py-2.5 text-[#334155]">
                              {g.zipCode ? `[${g.zipCode}] ` : ''}
                              {g.address} {g.addressDetail}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )
          })()}
          {subTab === '기타비용' && (
            <div className="flex flex-col gap-2.5 flex-1">
              {/* 상단 컨트롤 */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[14.5px] font-bold text-[#0e1225]">기타비용 발생내역</span>
                  <button className="bg-white border border-[#c2cfdf] rounded-[6px] px-3 py-1 text-[#334155] text-[13px] font-medium hover:border-[#2a3461] cursor-pointer">2026년</button>
                  <button className="bg-white border border-[#c2cfdf] rounded-[6px] px-3 py-1 text-[#334155] text-[13px] font-medium hover:border-[#2a3461] cursor-pointer">1월</button>
                  <button className="bg-[#fff4db] rounded-[6px] px-3 py-1 text-[#ef5a27] text-[13px] font-bold hover:bg-[#ffe8a0] cursor-pointer">당월</button>
                </div>
                <button className="h-[32px] px-3 rounded-[8px] bg-[#2a3461] text-white text-[13px] font-semibold hover:bg-[#364275] flex items-center gap-1.5 shadow-xs cursor-pointer">
                  <svg width="11" height="11" viewBox="0 0 13 13" fill="none"><path d={rightSvg.p3873da80} stroke="white" strokeWidth="1.8" strokeLinecap="round" /></svg>
                  기타비용 신규등록
                </button>
              </div>

              {/* 테이블 */}
              <div className="overflow-x-auto border border-[#c2cfdf]">
                <table className="w-full border-collapse text-[13px]" style={{ minWidth: 620 }}>
                  <thead>
                    <tr className="bg-[#f4f7fc] border-b border-[#c2cfdf] text-[#334155] font-bold">
                      {[
                        { label: '발생일', w: 95 },
                        { label: '비용처리자', w: 90 },
                        { label: '비용항목', w: 100 },
                        { label: '금액', w: 90 },
                        { label: '비고', w: undefined },
                      ].map(col => (
                        <th key={col.label} className="px-3 py-2 text-left font-bold border-r border-[#c2cfdf] last:border-r-0" style={col.w ? { width: col.w } : undefined}>{col.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={5} className="text-center py-6 text-[#8a9cb4]">등록된 기타비용 내역이 없습니다.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 서브 탭: 급여일정 */}
          {subTab === '급여일정' && (
            <div className="flex items-center justify-center py-12 text-[#8a9cb4] text-[14px]">급여일정 기능 준비 중입니다.</div>
          )}

          {/* 서브 탭: 청구내역 */}
          {subTab === '청구내역' && (
            <div className="flex items-center justify-center py-12 text-[#8a9cb4] text-[14px]">청구내역 기능 준비 중입니다.</div>
          )}

          {/* 서브 탭: 이용확인서 */}
          {subTab === '이용확인서' && (
            <div className="flex items-center justify-center py-12 text-[#8a9cb4] text-[14px]">이용확인서 기능 준비 중입니다.</div>
          )}
        </div>
      </div>

      {/* 4. 하단 고정 액션 바 */}
      {/* <div className="pt-2 border-t border-[#c2cfdf] flex items-center justify-between gap-2 shrink-0 flex-wrap">
        <div className="flex items-center gap-1.5">
          <button className="h-[32px] px-3 rounded-[8px] border border-[#fca5a5] bg-[#fff5f5] text-[#b91c1c] text-[12px] font-semibold hover:bg-[#fee2e2] transition-colors shadow-xs">
            계약해지 처리
          </button>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button className="h-[32px] px-3 rounded-[8px] border border-[#c2cfdf] bg-white text-[#2a3461] text-[12px] font-medium hover:border-[#2a3461] hover:bg-[#f4f7fc] transition-colors shadow-xs">
            수급자 정보 출력
          </button>
          <button className="h-[32px] px-3 rounded-[8px] border border-[#c2cfdf] bg-white text-[#2a3461] text-[12px] font-medium hover:border-[#2a3461] hover:bg-[#f4f7fc] transition-colors shadow-xs">
            가정방문이용 확인서 출력
          </button>
          <button className="h-[32px] px-3.5 rounded-[8px] bg-[#2a3461] text-white text-[12px] font-semibold hover:bg-[#364275] transition-colors shadow-xs">
            급여수가 변경안내 출력
          </button>
        </div>
      </div> */}

      {/* 모달: 사진 설정 */}
      {photoModalOpen && createPortal(
        <PhotoEditModal
          person={person}
          currentUrl={photoUrl}
          onSave={url => { setPhotoUrl(url); setPhotoModalOpen(false) }}
          onClose={() => setPhotoModalOpen(false)}
        />,
        document.body
      )}

      {/* 모달: 담당복지사 지정 */}
      {welfareModalOpen && createPortal(
        <WelfareSelectModal
          initial={selectedWorkerIds}
          onSave={ids => { setSelectedWorkerIds(ids); setWelfareModalOpen(false) }}
          onClose={() => setWelfareModalOpen(false)}
        />,
        document.body
      )}

      {/* 모달: 보호자 등록/수정 */}
      {guardianModalOpen && createPortal(
        <GuardianModal
          person={person}
          guardians={guardians}
          onSave={list => { setGuardians(list); setGuardianModalOpen(false) }}
          onClose={() => setGuardianModalOpen(false)}
        />,
        document.body
      )}

      {/* 모달: 문자 발송 관리 */}
      {smsModalOpen && createPortal(
        <SmsManagementModal
          person={person}
          guardians={guardians}
          onClose={() => setSmsModalOpen(false)}
        />,
        document.body
      )}

      {/* 모달: 정보 수정 */}
      {modalOpen && createPortal(
        <div className="fixed inset-0 z-[70] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setModalOpen(false)} />
          <div className="relative bg-white rounded-[16px] shadow-[0px_20px_40px_0px_rgba(0,0,0,0.15)] w-[480px] flex flex-col overflow-hidden max-h-[88vh]">
            <div className="flex items-center justify-between px-[24px] py-[12px] border-b border-[#c2cfdf] bg-white shrink-0">
              <span className="font-['Pretendard:Bold',sans-serif] text-[17px] text-[#0e1225] tracking-[-0.34px]">수급자 정보 수정</span>
              <button onClick={() => setModalOpen(false)} className="p-[4px] rounded-[6px] hover:bg-[#f4f7fc] transition-colors cursor-pointer">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 5L5 15M5 5L15 15" stroke="#8A9CB4" strokeLinecap="round" strokeWidth="2" />
                </svg>
              </button>
            </div>
            <ModalRecipientBar person={person} />
            <div className="overflow-y-auto flex-1 px-[24px] py-[20px] flex flex-col gap-3.5 text-[13px]">
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-[#283445]">실 생년월일</label>
                <div className="px-3 py-2 bg-[#f4f7fc] border border-[#c2cfdf] rounded-[8px] text-[12px] flex justify-between">
                  <span className="text-[#64748b]">공단 등록일:</span>
                  <span className="font-semibold text-[#2a3461]">{person.dob}</span>
                </div>
                <label className="flex items-center gap-2 cursor-pointer mt-1">
                  <input type="checkbox" checked={modalDobSync} onChange={e => setModalDobSync(e.target.checked)} className="accent-[#2a3461] rounded" />
                  <span>공단 정보와 동일하게 사용</span>
                </label>
                {!modalDobSync && (
                  <div className="flex gap-2 mt-1">
                    <input value={modalActualDob} onChange={e => setModalActualDob(e.target.value)} placeholder="예) 1945.03.15"
                      className="flex-1 h-8 px-2.5 border border-[#c2cfdf] rounded-[8px] text-[13px] focus:outline-none focus:border-[#2a3461]" />
                    <div className="flex border border-[#c2cfdf] rounded-[8px] overflow-hidden">
                      {(['양력', '음력'] as const).map(t => (
                        <button key={t} onClick={() => setModalActualDobType(t)}
                          className={`px-2.5 h-8 ${modalActualDobType === t ? 'bg-[#2a3461] text-white font-medium' : 'text-[#64748b] bg-white'}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-[#283445]">연락처</label>
                <div className="px-3 py-2 bg-[#f4f7fc] border border-[#c2cfdf] rounded-[8px] text-[12px] flex justify-between">
                  <span className="text-[#64748b]">희망이음 데이터:</span>
                  <span className="font-semibold text-[#2a3461]">{person.phone}</span>
                </div>
                <label className="flex items-center gap-2 cursor-pointer mt-1">
                  <input type="checkbox" checked={modalPhoneSync} onChange={e => setModalPhoneSync(e.target.checked)} className="accent-[#2a3461] rounded" />
                  <span>희망이음 정보와 동일하게 사용</span>
                </label>
                {!modalPhoneSync && (
                  <input value={modalPhoneVal} onChange={e => setModalPhoneVal(e.target.value)} placeholder="010-0000-0000"
                    className="h-8 px-2.5 border border-[#c2cfdf] rounded-[8px] text-[13px] focus:outline-none focus:border-[#2a3461] mt-1" />
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-[#283445]">주소</label>
                <div className="px-3 py-2 bg-[#f4f7fc] border border-[#c2cfdf] rounded-[8px] text-[12px]">
                  <span className="font-semibold text-[#2a3461]">{person.address}</span>
                </div>
                <label className="flex items-center gap-2 cursor-pointer mt-1">
                  <input type="checkbox" checked={modalAddressSync} onChange={e => setModalAddressSync(e.target.checked)} className="accent-[#2a3461] rounded" />
                  <span>희망이음 정보와 동일하게 사용</span>
                </label>
                {!modalAddressSync && (
                  <input value={modalAddressVal} onChange={e => setModalAddressVal(e.target.value)} placeholder="주소 입력"
                    className="h-8 px-2.5 border border-[#c2cfdf] rounded-[8px] text-[13px] focus:outline-none focus:border-[#2a3461] mt-1" />
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-[#283445]">주요질환</label>
                <input value={modalDiagnosis} onChange={e => setModalDiagnosis(e.target.value)} placeholder="예) 치매, 고혈압"
                  className="h-8 px-2.5 border border-[#c2cfdf] rounded-[8px] text-[13px] focus:outline-none focus:border-[#2a3461]" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-[#283445]">특이사항 (비고)</label>
                <textarea value={modalMemo} onChange={e => setModalMemo(e.target.value)} placeholder="특이사항 입력" rows={2}
                  className="p-2.5 border border-[#c2cfdf] rounded-[8px] text-[13px] focus:outline-none focus:border-[#2a3461] resize-none" />
              </div>
            </div>
            <div className="bg-[#eef1f8] flex items-center justify-end gap-[12px] px-[20px] py-[12px] shrink-0">
              <button
                onClick={saveModal}
                className="h-[40px] bg-[#2a3461] rounded-[8px] px-[16px] flex items-center gap-[6px] text-white text-[14px] font-['Pretendard:Regular',sans-serif] hover:bg-[#364275] transition-colors cursor-pointer"
              >
                <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
                  <path d="M0.5 3.5L3.5 6.5L9.5 0.5" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                저장
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="h-[40px] bg-[#eef1f8] border border-[#c2cfdf] rounded-[8px] px-[16px] text-[#3e4d63] text-[14px] font-['Pretendard:Regular',sans-serif] hover:bg-[#e0e5f0] transition-colors"
              >
                취소
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}


      {/* 모달: 이력 팝업 */}
      {historyModal && createPortal(
        <div className="fixed inset-0 z-[80] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setHistoryModal(null)} />
          <div className="relative bg-white rounded-[16px] shadow-[0px_20px_40px_0px_rgba(0,0,0,0.15)] w-[640px] flex flex-col overflow-hidden max-h-[88vh]">
            <div className="flex items-center justify-between px-[24px] py-[14px] border-b border-[#c2cfdf] bg-white shrink-0">
              <span className="font-['Pretendard:Bold',sans-serif] text-[18px] text-[#0e1225] tracking-[-0.34px]">
                {historyModal === 'grade' ? '등급 이력' : historyModal === 'copay' ? '본인부담률 이력' : '계약기간 이력'}
              </span>
              <button onClick={() => setHistoryModal(null)} className="p-[4px] rounded-[6px] hover:bg-[#f4f7fc] transition-colors cursor-pointer">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 5L5 15M5 5L15 15" stroke="#8A9CB4" strokeLinecap="round" strokeWidth="2" />
                </svg>
              </button>
            </div>

            <ModalRecipientBar person={person} />

            <div className="overflow-y-auto flex-1 p-5 flex flex-col gap-4 text-[13.5px]">

              {historyModal === 'grade' && (
                <table className="w-full text-[13px] border-collapse border border-[#c2cfdf]">
                  <thead>
                    <tr className="bg-[#f4f7fc] border-b border-[#c2cfdf] text-[#334155]">
                      {['연번', '등급', '인정번호', '적용기간', '적용 급여'].map(h => (
                        <th key={h} className="px-3 py-2.5 text-left font-bold border-r border-[#c2cfdf] last:border-r-0 text-[13.5px]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[...(person.gradeHistory ?? [])].reverse().map((h, i) => (
                      <tr key={i} className="border-b border-[#c2cfdf] last:border-b-0 hover:bg-[#f9fafc]">
                        <td className="px-3 py-2.5 text-[#94a3b8] border-r border-[#c2cfdf] font-medium">{person.gradeHistory.length - i}</td>
                        <td className="px-3 py-2.5 border-r border-[#c2cfdf]">
                          <span className={`text-[12px] font-bold px-2 py-0.5 rounded-[4px] border ${GRADE_COLOR[gradeKey(h.grade)] ?? 'bg-white'}`}>
                            {h.grade.includes('인지') ? '인지지원' : h.grade}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 font-mono border-r border-[#c2cfdf] text-[13px]">{h.rcgtNo}</td>
                        <td className="px-3 py-2.5 whitespace-nowrap border-r border-[#c2cfdf] text-[#334155]">{h.from} ~ {h.to}</td>
                        <td className="px-3 py-2.5">
                          <div className="flex gap-1 flex-wrap">
                            {(h.services ?? []).map(s => (
                              <span key={s} className={`text-[11px] px-1.5 py-0.5 rounded-[4px] border font-bold ${SERVICE_COLORS[s] ?? ''}`}>{SERVICE_SHORT[s] ?? s}</span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {historyModal === 'contract' && (() => {
                const history = person.contractHistory ?? []
                const services = ['방문요양', '방문목욕', '방문간호'].filter(s => history.some(h => h.service === s))
                return (
                  <div className="flex flex-col gap-3.5">
                    {services.map(svc => {
                      const rows = [...history.filter(h => h.service === svc)].reverse()
                      return (
                        <div key={svc} className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-1.5">
                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-[4px] border ${SERVICE_COLORS[svc] ?? ''}`}>{SERVICE_SHORT[svc]}</span>
                            <span className="text-[13.5px] font-bold text-[#1e293b]">{svc}</span>
                          </div>
                          <table className="w-full text-[13px] border-collapse border border-[#c2cfdf]">
                            <thead>
                              <tr className="bg-[#f4f7fc] border-b border-[#c2cfdf] text-[#334155]">
                                {['연번', '계약일', '계약기간'].map(h => (
                                  <th key={h} className="px-3 py-2.5 text-left font-bold border-r border-[#c2cfdf] last:border-r-0 text-[13.5px]">{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {rows.map((h, i) => (
                                <tr key={i} className="border-b border-[#c2cfdf] last:border-b-0 hover:bg-[#f9fafc]">
                                  <td className="px-3 py-2.5 text-[#94a3b8] border-r border-[#c2cfdf] font-medium">{rows.length - i}</td>
                                  <td className="px-3 py-2.5 border-r border-[#c2cfdf] text-[#334155]">{h.contractDate}</td>
                                  <td className="px-3 py-2.5 text-[#334155]">{h.from} ~ {h.to}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )
                    })}
                  </div>
                )
              })()}

              {historyModal === 'copay' && (
                <table className="w-full text-[13px] border-collapse border border-[#c2cfdf]">
                  <thead>
                    <tr className="bg-[#f4f7fc] border-b border-[#c2cfdf] text-[#334155]">
                      {['연번', '자격', '요율', '적용기간', '변경사유'].map(h => (
                        <th key={h} className="px-3 py-2.5 text-left font-bold border-r border-[#c2cfdf] last:border-r-0 text-[13.5px]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[...(person.copayHistory ?? [])].reverse().map((h, i) => (
                      <tr key={i} className="border-b border-[#c2cfdf] last:border-b-0 hover:bg-[#f9fafc]">
                        <td className="px-3 py-2.5 text-[#94a3b8] border-r border-[#c2cfdf] font-medium">{person.copayHistory.length - i}</td>
                        <td className="px-3 py-2.5 border-r border-[#c2cfdf] text-[#334155] font-semibold">{h.qualifier}</td>
                        <td className="px-3 py-2.5 font-bold text-[#2a3461] border-r border-[#c2cfdf] text-[14px]">{h.rate}%</td>
                        <td className="px-3 py-2.5 whitespace-nowrap border-r border-[#c2cfdf] text-[#334155]">{h.from} ~ {h.to ?? '현재'}</td>
                        <td className="px-3 py-2.5 text-[#475569]">{h.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

            </div>

            <div className="bg-[#eef1f8] flex items-center justify-end px-[20px] py-[12px] shrink-0 border-t border-[#c2cfdf]">
              <button
                onClick={() => setHistoryModal(null)}
                className="h-[36px] px-4 bg-[#2a3461] text-white rounded-[8px] text-[13.5px] font-semibold hover:bg-[#364275] transition-colors cursor-pointer"
              >
                확인
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [activeMenu, setActiveMenu] = useState('수급자 관리')
  const [search, setSearch] = useState('')
  const [filterContract, setFilterContract] = useState('')
  const [filterGrade, setFilterGrade] = useState('')
  const [filterName, setFilterName] = useState('')
  const [filterRoom, setFilterRoom] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isWorkspaceMaximized, setIsWorkspaceMaximized] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [isCalcModalOpen, setIsCalcModalOpen] = useState(false)

  const activeFilters = [filterContract, filterGrade, filterName, filterRoom].filter(Boolean).length
  const selected = DATA.find(b => b.id === selectedId) ?? null

  const filtered = DATA.filter(b => {
    const q = search.trim()
    const matchSearch = !q || b.name.includes(q) || b.rcgtNo.includes(q)
    const matchContract = !filterContract || b.contractStatus === filterContract
    const matchGrade = !filterGrade || b.grade === filterGrade
    const matchName = !filterName || b.name.includes(filterName)
    const matchRoom = !filterRoom || b.livingRoom.includes(filterRoom)
    return matchSearch && matchContract && matchGrade && matchName && matchRoom
  })

  const maleCount = filtered.filter(b => b.gender === '남').length
  const femaleCount = filtered.filter(b => b.gender === '여').length

  const COLS = [
    { key: 'contractStatus', label: '현황' },
    { key: 'name', label: '수급자명' },
    { key: 'dob', label: '생년월일' },
    { key: 'grade', label: '등급' },
    { key: 'gender', label: '성별' },
    { key: 'services', label: '계약유효' },
  ]

  return (
    <div className="flex h-screen bg-[#eaedf2] relative overflow-hidden">
      {/* 1. 왼쪽 최상단부터 시작하는 사이드바 — 통합 최소/최대 토글 버튼 포함 */}
      <Sidebar
        collapsed={isWorkspaceMaximized}
        onToggleCollapse={() => setIsWorkspaceMaximized(m => !m)}
        activeMenu={activeMenu}
        onMenuChange={setActiveMenu}
      />

      {/* 2. 우측 영역 (상단 GNB + 메인 본문) */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
        {/* GNB (Header) — 최소/최대화 상태 전환 시 부드러운 슬라이드 모션 */}
        <div className={`transition-all duration-300 ease-in-out shrink-0 ${isWorkspaceMaximized ? 'max-h-0 opacity-0 -translate-y-2 pointer-events-none overflow-hidden' : 'max-h-[60px] opacity-100 translate-y-0 z-30 relative'}`}>
          <GNB />
        </div>

        {/* Main area */}
        {activeMenu === '대시보드' ? (
          <div className="flex flex-1 overflow-y-auto p-2 bg-[#eaedf2]">
            <div className="flex flex-col w-full gap-2">

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 grid-flow-dense">

                {/* 좌측: 일정 리스트 (1칸 차지) */}
                <ScheduleListWidget className="flex flex-col bg-white overflow-hidden w-full border border-[#c2cfdf] lg:col-span-1 h-[428px]" />

                {/* 우측: 간편계산기 + 일일 방문일정 (상하 배치, 2칸 차지) */}
                <div className="flex flex-col gap-2 lg:col-span-2">

                  <div className="grid grid-cols-2 gap-2">
                    {/* 1. 배상책임보험 */}
                    <LiabilityInsuranceWidget className="flex flex-col bg-white overflow-hidden w-full border border-[#c2cfdf] h-[200px]" />

                    {/* 2. 재가급여 간편계산기 (위젯 형태) */}
                    <div className="flex flex-col bg-white overflow-hidden w-full border border-[#c2cfdf] h-[200px]">
                      <div className="p-3 flex items-center justify-between border-b border-[#c2cfdf] bg-[#fafbfc]">
                        <h2 className="text-[16px] font-bold text-[#0e1225] inline-flex items-center gap-1.5 leading-none shrink-0">
                          <span className="w-[4px] h-[16px] bg-[#ef5a27] inline-block rounded-[2px] shrink-0" />
                          재가급여 간편계산기
                        </h2>
                      </div>

                      <div className="flex-1 px-4 py-3 flex flex-col justify-center gap-4 bg-white">
                        <p className="text-[12.5px] text-[#475569] leading-snug break-keep text-center mt-2">
                          장기요양등급과 본인부담률을 기준으로 <br /><strong className="text-[#0e1225]">예상 급여 총액 및 본인부담금</strong>을 시뮬레이션 합니다.
                        </p>
                        <button
                          onClick={() => setIsCalcModalOpen(true)}
                          className="w-full h-[36px] shrink-0 flex items-center justify-center gap-1.5 rounded-[6px] bg-[#2a3461] text-[13px] font-semibold text-white hover:bg-[#364275] transition-colors shadow-xs cursor-pointer mb-2"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                            <rect x="8" y="8" width="8" height="2"></rect>
                            <line x1="8" y1="13" x2="8.01" y2="13"></line>
                            <line x1="12" y1="13" x2="12.01" y2="13"></line>
                            <line x1="16" y1="13" x2="16.01" y2="13"></line>
                            <line x1="8" y1="17" x2="8.01" y2="17"></line>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            <line x1="16" y1="17" x2="16.01" y2="17"></line>
                          </svg>
                          간편계산기 실행
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 2. 일일 방문일정 */}
                  <DailyVisitScheduleWidget className="flex flex-col bg-white overflow-hidden w-full border border-[#c2cfdf] h-[220px]" />
                </div>

                {/* 5. 공지사항 / 알림 */}


                {/* 3. 수급자 종합 현황 통계 - 좌측 */}
                <BeneficiaryStatsWidget data={DATA} className="flex flex-col bg-white overflow-hidden w-full border border-[#c2cfdf] lg:col-span-2 h-[408px]" />

                {/* 6. 인정만료 예정 수급자 - 우측 */}
                <CertExpirationWidget data={DATA} className="flex flex-col bg-white overflow-hidden w-full border border-[#c2cfdf] lg:col-span-1 h-[408px]" />

              </div>

            </div>
          </div>
        ) : activeMenu === '운영·평가' ? (
          <EvaluationManualPage onBackToBeneficiaries={() => setActiveMenu('수급자 관리')} />
        ) : activeMenu === '종사자 관리' ? (
          <EmployeeManagementPage />
        ) : (
          <div className="flex flex-1 overflow-hidden p-2 gap-2">

            {/* List panel */}
            <div
              className="flex flex-col bg-white overflow-hidden shrink-0 border border-[#c2cfdf] transition-all duration-300 ease-in-out"
              style={{
                width: selected ? '30%' : '100%',
                minWidth: selected ? '300px' : 'auto',
              }}
            >
              {/* List header */}
              <div className="p-3 flex flex-col gap-2.5 shrink-0 border-b border-[#c2cfdf] bg-[#fafbfc]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="text-[16px] font-bold text-[#0e1225] inline-flex items-center gap-1.5 leading-none">
                      <span className="w-[4px] h-[16px] bg-[#ef5a27] inline-block rounded-[2px] shrink-0" />
                      수급자 목록
                    </h2>
                    <span className="h-[22px] px-2 inline-flex items-center justify-center bg-[#f1f5f9] text-[#64748b] text-[12px] font-bold rounded-[6px] leading-none whitespace-nowrap">
                      {filtered.length}명
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button className="flex items-center gap-1.5 h-[32px] px-3 rounded-[8px] border border-[#c2cfdf] bg-white text-[13px] font-semibold text-[#334155] hover:border-[#334155] hover:bg-[#f8fafc] transition-colors shadow-xs cursor-pointer">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      엑셀 다운로드
                    </button>
                    <button className="h-[32px] px-3 rounded-[8px] bg-[#2a3461] text-[13px] font-semibold text-white hover:bg-[#364275] transition-colors shadow-xs cursor-pointer">
                      공단 조회
                    </button>
                  </div>
                </div>

                {/* Filter accordion */}
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
                    {activeFilters > 0 && (
                      <>
                        <span className="bg-[#ef5a27] text-white text-[11px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center leading-none">
                          {activeFilters}
                        </span>
                        <span className="text-[12.5px] text-[#64748b] ml-1">
                          생활실, 이용상태, 성별 외 3개
                        </span>
                      </>
                    )}
                    <div className="flex-1" />
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className={`transition-transform text-[#64748b] ${filterOpen ? '' : 'rotate-180'}`}>
                      <path d="M2 11L8 5L14 11" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </button>

                  {filterOpen && (
                    <div className="p-2.5 flex flex-col gap-2">
                      <div className="flex flex-wrap items-end gap-2">
                        {[
                          { label: '생활실', value: filterRoom, setter: setFilterRoom, options: [{ v: '', l: '전체' }, { v: '1생활실', l: '1생활실' }], type: 'select' as const },
                          { label: '계약상태', value: filterContract, setter: setFilterContract, options: [{ v: '', l: '전체' }, { v: '계약중', l: '계약중' }, { v: '만료', l: '만료' }, { v: '해지', l: '해지' }], type: 'select' as const },
                          { label: '등급', value: filterGrade, setter: setFilterGrade, options: [{ v: '', l: '전체' }, ...['1', '2', '3', '4', '5'].map(g => ({ v: g, l: `${g}등급` }))], type: 'select' as const },
                          { label: '수급자명', value: filterName, setter: setFilterName, options: [], type: 'input' as const },
                        ].map(({ label, value, setter, options, type }) => (
                          <div key={label} className="flex-1 min-w-[95px] flex flex-col gap-1">
                            <label className="text-[12.5px] font-semibold text-[#475569]">{label}</label>
                            {type === 'select' ? (
                              <select
                                value={value}
                                onChange={e => setter(e.target.value)}
                                className="h-[32px] w-full bg-white border border-[#c2cfdf] rounded-[6px] px-2 text-[13.5px] text-[#0e1225] focus:outline-none focus:border-[#2a3461]"
                              >
                                {options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                              </select>
                            ) : (
                              <input
                                value={value}
                                onChange={e => setter(e.target.value)}
                                placeholder="이름 입력"
                                className="h-[32px] w-full bg-white border border-[#c2cfdf] rounded-[6px] px-2 text-[13.5px] text-[#0e1225] focus:outline-none focus:border-[#2a3461]"
                              />
                            )}
                          </div>
                        ))}
                        <div className="flex items-end shrink-0">
                          <button
                            onClick={() => { setFilterRoom(''); setFilterContract(''); setFilterGrade(''); setFilterName('') }}
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

              {/* Table */}
              <div className="flex-1 overflow-auto px-3 py-2">
                <div className="border border-[#c2cfdf] rounded-[4px] overflow-hidden bg-white">
                  <table className="w-full border-collapse text-[13px]" style={{ minWidth: 360 }}>
                    <thead className="sticky top-0 z-10">
                      <tr className="bg-[#f4f7fc] text-[#334155] border-b border-[#c2cfdf]">
                        {COLS.map(({ key, label }) => (
                          <th
                            key={key}
                            onClick={() => toggleSort(key)}
                            className="h-[38px] px-2.5 text-left font-bold whitespace-nowrap cursor-pointer hover:bg-[#eef2f8] border-r border-[#c2cfdf] last:border-r-0 text-[13.5px]"
                          >
                            <span className="flex items-center justify-between gap-1">
                              <span>{label}</span>
                              <span className="text-[10px] text-[#8a9cb4]">↕</span>
                            </span>
                          </th>
                        ))}
                        <th className="h-[38px] px-2 text-center font-bold whitespace-nowrap text-[13.5px]">연동</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.length === 0 && (
                        <tr>
                          <td colSpan={COLS.length + 1} className="text-center py-10 text-[#8a9cb4] text-[14px]">
                            일치하는 수급자가 없습니다.
                          </td>
                        </tr>
                      )}
                      {filtered.map((b, idx) => {
                        const isSelected = selected?.id === b.id
                        const gk = gradeKey(b.grade)
                        return (
                          <tr
                            key={b.id}
                            onClick={() => setSelectedId(isSelected ? null : b.id)}
                            className={`cursor-pointer transition-colors border-b border-[#c2cfdf] last:border-b-0 ${isSelected
                              ? 'bg-[#d9ecff] font-semibold text-[#1e3a8a]'
                              : idx % 2 === 1 ? 'bg-[#fafbfc] hover:bg-[#f0f4fa]' : 'bg-white hover:bg-[#f0f4fa]'
                              }`}
                          >
                            <td className="h-[40px] px-2.5 border-r border-[#c2cfdf]">
                              <span className={`text-[12.5px] font-bold px-2 py-0.5 rounded-[4px] whitespace-nowrap ${b.contractStatus === '계약중' ? 'bg-[#e8f8ed] text-[#1c9640]' :
                                b.contractStatus === '만료' ? 'bg-[#f1f5f9] text-[#64748b]' : 'bg-[#fff0ef] text-[#e23a32]'
                                }`}>
                                {b.contractStatus}
                              </span>
                            </td>
                            <td className="h-[40px] px-2.5 font-bold whitespace-nowrap border-r border-[#c2cfdf] text-[#0e1225] text-[15px]">{b.name}</td>
                            <td className="h-[40px] px-2.5 text-[12.5px] whitespace-nowrap border-r border-[#c2cfdf] text-[#475569]">{b.dob}</td>
                            <td className="h-[40px] px-1.5 border-r border-[#c2cfdf] text-center">
                              <span className={`size-[22px] inline-flex items-center justify-center text-[12px] font-bold rounded-[4px] border leading-none mx-auto ${GRADE_COLOR[gk] ?? 'bg-white text-[#283445]'}`}>
                                {gradeDisplay(b.grade)}
                              </span>
                            </td>
                            <td className="h-[40px] px-2.5 text-[13px] border-r border-[#c2cfdf] text-center font-medium">{b.gender}</td>
                            <td className="h-[40px] px-1.5 border-r border-[#c2cfdf] whitespace-nowrap">
                              {b.contractStatus !== '만료' && (
                                <div className="flex items-center gap-0.5 flex-nowrap whitespace-nowrap">
                                  {b.services.map(s => {
                                    const short = SERVICE_SHORT[s] ?? s
                                    const cls = SERVICE_COLORS[s] ?? 'bg-neutral-bg-subtle text-neutral-text border-neutral-border'
                                    return <span key={s} className={`w-[19px] h-[19px] inline-flex items-center justify-center text-[10.5px] border rounded-[3px] font-bold leading-none shrink-0 ${cls}`}>{short}</span>
                                  })}
                                </div>
                              )}
                            </td>
                            <td className="h-[40px] px-1 text-center whitespace-nowrap">
                              <div className="flex items-center justify-center gap-0.5 flex-nowrap">
                                <span className="w-[18px] h-[18px] inline-flex items-center justify-center bg-[#0093a9] text-white text-[10.5px] font-bold rounded-[3px] leading-none shrink-0" title="희망이음 연동">
                                  희
                                </span>
                                <span className="w-[18px] h-[18px] inline-flex items-center justify-center bg-[#2a3461] text-white text-[10.5px] font-bold rounded-[3px] leading-none shrink-0" title="롱텀(공단) 연동">
                                  롱
                                </span>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* List Footer Stat Bar */}
              <div className="px-3.5 py-2 bg-[#f4f7fc] border-t border-[#c2cfdf] flex items-center justify-between text-[13px] text-[#475569]">
                <div className="flex items-center gap-2.5">
                  <span>전체 <strong className="text-[#0e1225] text-[14px]">{filtered.length}</strong>명</span>
                  <span>남 <strong className="text-[#0284c7] text-[14px]">{maleCount}</strong>명</span>
                  <span>여 <strong className="text-[#db2777] text-[14px]">{femaleCount}</strong>명</span>
                </div>
                <label className="flex items-center gap-1.5 cursor-pointer text-[12.5px]">
                  <input type="checkbox" className="accent-[#2a3461] rounded w-4 h-4" />
                  <span>계약해지자 포함</span>
                </label>
              </div>
            </div>

            {/* Detail panel */}
            {selected && (
              <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <DetailPanel person={selected} onClose={() => setSelectedId(null)} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* 간편계산기 모달 */}
      {isCalcModalOpen && createPortal(
        <BenefitCalculatorModal onClose={() => setIsCalcModalOpen(false)} />,
        document.body
      )}
    </div>
  )
}
