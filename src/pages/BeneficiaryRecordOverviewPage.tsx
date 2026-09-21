import React, { useState, useMemo } from 'react'
import { Button } from '../components/Button'

// ─── Types & Models ──────────────────────────────────────────────────────────

export type OverviewMainTab = '기초평가' | '상담일지' | '상태변화기록' | '사회복지사 업무수행일지'
export type ServiceTab = '방문요양' | '방문목욕' | '방문간호' | '직원변경'

export interface MonthlyCounselStatus {
  date?: string
  badges?: ('급여제공반영' | '상태변화기록')[]
  status?: '작성완료' | '미작성' | '일정없음' | '급여개시' | '계약해지' | '해당없음'
  note?: string
  countText?: string
}

export interface BeneficiaryCounselOverviewRow {
  id: string
  no: number
  contractStatus: '계약중' | '만료' | '예정' | '해지'
  name: string
  rcgtNo: string
  grade: string // 1등급, 2등급 등
  months: Record<number, MonthlyCounselStatus>
  benefitReflectStatus: '반영완료' | '미반영' | '계약해지' | '상담미작성' | '0'
}

export interface BeneficiaryEvalOverviewRow {
  id: string
  no: number
  contractStatus: '계약중' | '만료' | '예정' | '해지'
  name: string
  rcgtNo: string
  grade: string
  fallRisk: { round: number; date: string; grade: string; score: string; evaluator: string; status: '평가완료' | '미작성' }
  bedsoreRisk: { round: number; date: string; grade: string; score: string; evaluator: string; status: '평가완료' | '미작성' }
  cognitive: { round: number; date: string; status: string; score: string; evaluator: string }
  needAssessment: { round: number; date: string; status: string; evaluator: string }
  overallStatus: '전체완료' | '일부미완료' | '미작성'
}

export interface BeneficiaryStatusChangeOverviewRow {
  id: string
  no: number
  contractStatus: '계약중' | '만료' | '예정' | '해지'
  name: string
  rcgtNo: string
  grade: string
  months: Record<number, { count: number; lastDate: string; signedRate: string; status: '완료' | '미작성' | '해당없음' }>
  totalCount: number
}

export interface BeneficiaryDutyLogOverviewRow {
  id: string
  no: number
  contractStatus: '계약중' | '만료' | '예정' | '해지'
  name: string
  rcgtNo: string
  grade: string
  worker: string
  months: Record<number, { visitDate: string; visitTime: string; visitType: string; status: '작성완료' | '미작성' | '해당없음' }>
  overallStatus: '완료' | '미작성'
}

// ─── Initial Mock Data ───────────────────────────────────────────────────────

const MOCK_COUNSEL_ROWS: BeneficiaryCounselOverviewRow[] = [
  {
    id: 'BEN-001',
    no: 1,
    contractStatus: '계약중',
    name: '김순자',
    rcgtNo: 'L2938471029',
    grade: '1등급',
    months: {
      1: { date: '2026.01.08', badges: ['급여제공반영', '상태변화기록'], status: '작성완료' },
      2: { date: '2026.02.10', badges: ['급여제공반영'], status: '작성완료' },
      3: { date: '2026.03.05', badges: ['상태변화기록'], status: '작성완료' },
      4: { status: '일정없음' },
      5: { status: '일정없음' },
      6: { status: '일정없음' },
      7: { status: '일정없음' },
      8: { status: '일정없음' },
      9: { status: '일정없음' },
      10: { status: '일정없음' },
      11: { status: '일정없음' },
      12: { status: '일정없음' },
    },
    benefitReflectStatus: '반영완료',
  },
  {
    id: 'BEN-002',
    no: 2,
    contractStatus: '계약중',
    name: '이만수',
    rcgtNo: 'L1982736450',
    grade: '2등급',
    months: {
      1: { date: '2026.01.12', badges: ['급여제공반영'], status: '작성완료' },
      2: { date: '2026.02.15', badges: ['급여제공반영', '상태변화기록'], status: '작성완료' },
      3: { status: '미작성' },
      4: { status: '일정없음' },
      5: { status: '일정없음' },
      6: { status: '일정없음' },
      7: { status: '일정없음' },
      8: { status: '일정없음' },
      9: { status: '일정없음' },
      10: { status: '일정없음' },
      11: { status: '일정없음' },
      12: { status: '일정없음' },
    },
    benefitReflectStatus: '반영완료',
  },
  {
    id: 'BEN-003',
    no: 3,
    contractStatus: '만료',
    name: '박복순',
    rcgtNo: 'L3847192038',
    grade: '3등급',
    months: {
      1: { status: '미작성' },
      2: { status: '미작성' },
      3: { status: '미작성' },
      4: { status: '해당없음' },
      5: { status: '해당없음' },
      6: { status: '해당없음' },
      7: { status: '해당없음' },
      8: { status: '해당없음' },
      9: { status: '해당없음' },
      10: { status: '해당없음' },
      11: { status: '해당없음' },
      12: { status: '해당없음' },
    },
    benefitReflectStatus: '미반영',
  },
  {
    id: 'BEN-004',
    no: 4,
    contractStatus: '계약중',
    name: '최영자',
    rcgtNo: 'L4820193847',
    grade: '4등급',
    months: {
      1: { date: '2026.01.15', badges: ['상태변화기록'], status: '작성완료' },
      2: { date: '2026.02.18', badges: ['급여제공반영'], status: '작성완료' },
      3: { date: '2026.03.10', badges: ['급여제공반영', '상태변화기록'], status: '작성완료' },
      4: { status: '일정없음' },
      5: { status: '일정없음' },
      6: { status: '일정없음' },
      7: { status: '일정없음' },
      8: { status: '일정없음' },
      9: { status: '일정없음' },
      10: { status: '일정없음' },
      11: { status: '일정없음' },
      12: { status: '일정없음' },
    },
    benefitReflectStatus: '반영완료',
  },
  {
    id: 'BEN-005',
    no: 5,
    contractStatus: '계약중',
    name: '정순희',
    rcgtNo: 'L5918273640',
    grade: '5등급',
    months: {
      1: { date: '2026.01.20', badges: ['급여제공반영'], status: '작성완료' },
      2: { date: '2026.02.22', badges: ['상태변화기록'], status: '작성완료' },
      3: { status: '미작성' },
      4: { status: '일정없음' },
      5: { status: '일정없음' },
      6: { status: '일정없음' },
      7: { status: '일정없음' },
      8: { status: '일정없음' },
      9: { status: '일정없음' },
      10: { status: '일정없음' },
      11: { status: '일정없음' },
      12: { status: '일정없음' },
    },
    benefitReflectStatus: '반영완료',
  },
]

const MOCK_EVAL_ROWS: BeneficiaryEvalOverviewRow[] = [
  {
    id: 'BEN-001',
    no: 1,
    contractStatus: '계약중',
    name: '김순자',
    rcgtNo: 'L2938471029',
    grade: '1등급',
    fallRisk: { round: 1, date: '2026.01.08', grade: '고위험', score: '18점', evaluator: '김정희', status: '평가완료' },
    bedsoreRisk: { round: 1, date: '2026.01.08', grade: '중위험', score: '14점', evaluator: '김정희', status: '평가완료' },
    cognitive: { round: 1, date: '2026.01.08', status: '치매진단', score: '치매', evaluator: '김정희' },
    needAssessment: { round: 1, date: '2026.01.08', status: '평가완료', evaluator: '김정희' },
    overallStatus: '전체완료',
  },
  {
    id: 'BEN-002',
    no: 2,
    contractStatus: '계약중',
    name: '이만수',
    rcgtNo: 'L1982736450',
    grade: '2등급',
    fallRisk: { round: 1, date: '2026.01.12', grade: '중위험', score: '12점', evaluator: '김정희', status: '평가완료' },
    bedsoreRisk: { round: 1, date: '2026.01.12', grade: '저위험', score: '17점', evaluator: '김정희', status: '평가완료' },
    cognitive: { round: 1, date: '2026.01.12', status: '평가완료', score: '24점', evaluator: '김정희' },
    needAssessment: { round: 1, date: '2026.01.12', status: '평가완료', evaluator: '김정희' },
    overallStatus: '전체완료',
  },
  {
    id: 'BEN-003',
    no: 3,
    contractStatus: '만료',
    name: '박복순',
    rcgtNo: 'L3847192038',
    grade: '3등급',
    fallRisk: { round: 1, date: '-', grade: '-', score: '-', evaluator: '-', status: '미작성' },
    bedsoreRisk: { round: 1, date: '-', grade: '-', score: '-', evaluator: '-', status: '미작성' },
    cognitive: { round: 1, date: '-', status: '미작성', score: '-', evaluator: '-' },
    needAssessment: { round: 1, date: '-', status: '미작성', evaluator: '-' },
    overallStatus: '미작성',
  },
  {
    id: 'BEN-004',
    no: 4,
    contractStatus: '계약중',
    name: '최영자',
    rcgtNo: 'L4820193847',
    grade: '4등급',
    fallRisk: { round: 1, date: '2026.01.15', grade: '저위험', score: '6점', evaluator: '김정희', status: '평가완료' },
    bedsoreRisk: { round: 1, date: '2026.01.15', grade: '저위험', score: '19점', evaluator: '김정희', status: '평가완료' },
    cognitive: { round: 1, date: '2026.01.15', status: '평가완료', score: '26점', evaluator: '김정희' },
    needAssessment: { round: 1, date: '2026.01.15', status: '평가완료', evaluator: '김정희' },
    overallStatus: '전체완료',
  },
  {
    id: 'BEN-005',
    no: 5,
    contractStatus: '계약중',
    name: '정순희',
    rcgtNo: 'L5918273640',
    grade: '5등급',
    fallRisk: { round: 1, date: '2026.01.20', grade: '중위험', score: '11점', evaluator: '김정희', status: '평가완료' },
    bedsoreRisk: { round: 1, date: '-', grade: '-', score: '-', evaluator: '-', status: '미작성' },
    cognitive: { round: 1, date: '2026.01.20', status: '평가완료', score: '22점', evaluator: '김정희' },
    needAssessment: { round: 1, date: '2026.01.20', status: '평가완료', evaluator: '김정희' },
    overallStatus: '일부미완료',
  },
]

const MOCK_STATUS_CHANGE_ROWS: BeneficiaryStatusChangeOverviewRow[] = [
  {
    id: 'BEN-001',
    no: 1,
    contractStatus: '계약중',
    name: '김순자',
    rcgtNo: 'L2938471029',
    grade: '1등급',
    months: {
      1: { count: 4, lastDate: '2026.01.28', signedRate: '100%', status: '완료' },
      2: { count: 3, lastDate: '2026.02.25', signedRate: '100%', status: '완료' },
      3: { count: 2, lastDate: '2026.03.15', signedRate: '100%', status: '완료' },
    },
    totalCount: 9,
  },
  {
    id: 'BEN-002',
    no: 2,
    contractStatus: '계약중',
    name: '이만수',
    rcgtNo: 'L1982736450',
    grade: '2등급',
    months: {
      1: { count: 3, lastDate: '2026.01.20', signedRate: '100%', status: '완료' },
      2: { count: 2, lastDate: '2026.02.18', signedRate: '100%', status: '완료' },
      3: { count: 0, lastDate: '-', signedRate: '0%', status: '미작성' },
    },
    totalCount: 5,
  },
  {
    id: 'BEN-003',
    no: 3,
    contractStatus: '만료',
    name: '박복순',
    rcgtNo: 'L3847192038',
    grade: '3등급',
    months: {
      1: { count: 0, lastDate: '-', signedRate: '0%', status: '미작성' },
      2: { count: 0, lastDate: '-', signedRate: '0%', status: '미작성' },
      3: { count: 0, lastDate: '-', signedRate: '0%', status: '미작성' },
    },
    totalCount: 0,
  },
  {
    id: 'BEN-004',
    no: 4,
    contractStatus: '계약중',
    name: '최영자',
    rcgtNo: 'L4820193847',
    grade: '4등급',
    months: {
      1: { count: 2, lastDate: '2026.01.15', signedRate: '100%', status: '완료' },
      2: { count: 2, lastDate: '2026.02.20', signedRate: '100%', status: '완료' },
      3: { count: 1, lastDate: '2026.03.10', signedRate: '100%', status: '완료' },
    },
    totalCount: 5,
  },
  {
    id: 'BEN-005',
    no: 5,
    contractStatus: '계약중',
    name: '정순희',
    rcgtNo: 'L5918273640',
    grade: '5등급',
    months: {
      1: { count: 2, lastDate: '2026.01.22', signedRate: '100%', status: '완료' },
      2: { count: 1, lastDate: '2026.02.19', signedRate: '100%', status: '완료' },
      3: { count: 0, lastDate: '-', signedRate: '0%', status: '미작성' },
    },
    totalCount: 3,
  },
]

const MOCK_DUTY_LOG_ROWS: BeneficiaryDutyLogOverviewRow[] = [
  {
    id: 'BEN-001',
    no: 1,
    contractStatus: '계약중',
    name: '김순자',
    rcgtNo: 'L2938471029',
    grade: '1등급',
    worker: '이지원 (사회복지사)',
    months: {
      1: { visitDate: '2026.01.15', visitTime: '10:00~11:30', visitType: '정기방문', status: '작성완료' },
      2: { visitDate: '2026.02.18', visitTime: '14:00~15:30', visitType: '급여모니터링', status: '작성완료' },
      3: { visitDate: '2026.03.15', visitTime: '10:00~11:30', visitType: '정기방문', status: '작성완료' },
    },
    overallStatus: '완료',
  },
  {
    id: 'BEN-002',
    no: 2,
    contractStatus: '계약중',
    name: '이만수',
    rcgtNo: 'L1982736450',
    grade: '2등급',
    worker: '이지원 (사회복지사)',
    months: {
      1: { visitDate: '2026.01.18', visitTime: '13:00~14:30', visitType: '정기방문', status: '작성완료' },
      2: { visitDate: '2026.02.20', visitTime: '10:00~11:30', visitType: '정기방문', status: '작성완료' },
      3: { visitDate: '-', visitTime: '-', visitType: '-', status: '미작성' },
    },
    overallStatus: '미작성',
  },
  {
    id: 'BEN-003',
    no: 3,
    contractStatus: '만료',
    name: '박복순',
    rcgtNo: 'L3847192038',
    grade: '3등급',
    worker: '이지원 (사회복지사)',
    months: {
      1: { visitDate: '-', visitTime: '-', visitType: '-', status: '미작성' },
      2: { visitDate: '-', visitTime: '-', visitType: '-', status: '미작성' },
      3: { visitDate: '-', visitTime: '-', visitType: '-', status: '미작성' },
    },
    overallStatus: '미작성',
  },
  {
    id: 'BEN-004',
    no: 4,
    contractStatus: '계약중',
    name: '최영자',
    rcgtNo: 'L4820193847',
    grade: '4등급',
    worker: '이지원 (사회복지사)',
    months: {
      1: { visitDate: '2026.01.20', visitTime: '15:00~16:30', visitType: '정기방문', status: '작성완료' },
      2: { visitDate: '2026.02.22', visitTime: '11:00~12:30', visitType: '정기방문', status: '작성완료' },
      3: { visitDate: '2026.03.18', visitTime: '14:00~15:30', visitType: '정기방문', status: '작성완료' },
    },
    overallStatus: '완료',
  },
  {
    id: 'BEN-005',
    no: 5,
    contractStatus: '계약중',
    name: '정순희',
    rcgtNo: 'L5918273640',
    grade: '5등급',
    worker: '이지원 (사회복지사)',
    months: {
      1: { visitDate: '2026.01.25', visitTime: '10:00~11:30', visitType: '정기방문', status: '작성완료' },
      2: { visitDate: '2026.02.26', visitTime: '14:00~15:30', visitType: '정기방문', status: '작성완료' },
      3: { visitDate: '-', visitTime: '-', visitType: '-', status: '미작성' },
    },
    overallStatus: '미작성',
  },
]

// ─── Main Component ──────────────────────────────────────────────────────────

interface BeneficiaryRecordOverviewPageProps {
  embedded?: boolean
}

export default function BeneficiaryRecordOverviewPage({ embedded = false }: BeneficiaryRecordOverviewPageProps) {
  const [mainTab, setMainTab] = useState<OverviewMainTab>('기초평가')
  const [selectedYear, setSelectedYear] = useState('2026년')
  const [serviceTab, setServiceTab] = useState<ServiceTab>('방문요양')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [statusFilter, setStatusFilter] = useState('전체')

  // 필터링된 상담일지 목록
  const filteredCounselRows = useMemo(() => {
    return MOCK_COUNSEL_ROWS.filter(r => {
      const matchKeyword = !searchKeyword || r.name.includes(searchKeyword) || r.rcgtNo.includes(searchKeyword)
      const matchStatus = statusFilter === '전체' || r.contractStatus === statusFilter
      return matchKeyword && matchStatus
    })
  }, [searchKeyword, statusFilter])

  // 필터링된 기초평가 목록
  const filteredEvalRows = useMemo(() => {
    return MOCK_EVAL_ROWS.filter(r => {
      const matchKeyword = !searchKeyword || r.name.includes(searchKeyword) || r.rcgtNo.includes(searchKeyword)
      const matchStatus = statusFilter === '전체' || r.contractStatus === statusFilter
      return matchKeyword && matchStatus
    })
  }, [searchKeyword, statusFilter])

  // 필터링된 상태변화기록 목록
  const filteredStatusChangeRows = useMemo(() => {
    return MOCK_STATUS_CHANGE_ROWS.filter(r => {
      const matchKeyword = !searchKeyword || r.name.includes(searchKeyword) || r.rcgtNo.includes(searchKeyword)
      const matchStatus = statusFilter === '전체' || r.contractStatus === statusFilter
      return matchKeyword && matchStatus
    })
  }, [searchKeyword, statusFilter])

  // 필터링된 사회복지사 업무수행일지 목록
  const filteredDutyLogRows = useMemo(() => {
    return MOCK_DUTY_LOG_ROWS.filter(r => {
      const matchKeyword = !searchKeyword || r.name.includes(searchKeyword) || r.rcgtNo.includes(searchKeyword)
      const matchStatus = statusFilter === '전체' || r.contractStatus === statusFilter
      return matchKeyword && matchStatus
    })
  }, [searchKeyword, statusFilter])

  // 통계 계산
  const currentRowsCount = mainTab === '기초평가' ? filteredEvalRows.length : mainTab === '상담일지' ? filteredCounselRows.length : mainTab === '상태변화기록' ? filteredStatusChangeRows.length : filteredDutyLogRows.length
  const totalCount = filteredEvalRows.length
  const completedCount = filteredEvalRows.filter(r => r.overallStatus === '전체완료').length
  const incompleteCount = filteredEvalRows.filter(r => r.overallStatus === '일부미완료').length
  const unwrittenCount = filteredEvalRows.filter(r => r.overallStatus === '미작성').length
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <div className={`flex flex-col flex-1 h-full overflow-hidden ${embedded ? '' : 'bg-[#eaedf2] p-2'}`}>

      {/* ─── 메인 점검 컨텐츠 영역 ─── */}
      <div className="flex flex-col flex-1 bg-white border border-[#c2cfdf] rounded-[4px] overflow-hidden shadow-2xs min-h-0">

        {/* ─── 점검항목 상단 탭 바 & 연도 선택 ─── */}
        <div className="bg-[#fafbfc] border-b border-[#c2cfdf] flex items-center justify-between shrink-0 h-[44px]">
          <div className="flex h-full items-center">
            {(['기초평가', '상담일지', '상태변화기록', '사회복지사 업무수행일지'] as const).map(tab => {
              const isActive = mainTab === tab
              let count = 0
              if (tab === '기초평가') count = filteredEvalRows.length
              else if (tab === '상담일지') count = filteredCounselRows.length
              else if (tab === '상태변화기록') count = filteredStatusChangeRows.length
              else if (tab === '사회복지사 업무수행일지') count = filteredDutyLogRows.length

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setMainTab(tab)}
                  className={`h-full px-5 text-[14px] whitespace-nowrap border-r border-[#c2cfdf] transition-colors cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-white text-[#ef5a27] font-bold border-b-2 border-b-[#ef5a27]'
                      : 'text-[#334155] font-semibold hover:bg-[#eef2f8]'
                  }`}
                >
                  <span>{tab}</span>
                  <span
                    className={`text-[12px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-[#fff0eb] text-[#ef5a27]' : 'bg-[#e2e8f0] text-[#64748b]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* 우측: 연도 선택 셀렉트 */}
          <div className="flex items-center gap-2 pr-3.5">
            <select
              value={selectedYear}
              onChange={e => setSelectedYear(e.target.value)}
              className="h-[32px] px-3 bg-white border border-[#c2cfdf] rounded-[6px] text-[13px] font-medium text-[#283445] focus:outline-none focus:border-[#ef5a27] cursor-pointer shadow-2xs"
            >
              <option value="2026년">2026년</option>
              <option value="2025년">2025년</option>
              <option value="2024년">2024년</option>
            </select>
          </div>
        </div>

        {/* ─── 상단 요약 통계 칩 바 ─── */}
        <div className="px-4 py-2.5 bg-[#f8fafc] border-b border-[#c2cfdf] flex flex-wrap items-center justify-between gap-3 text-[13px]">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="text-[#64748b]">전체 수급자:</span>
              <strong className="text-[#0e1225] font-bold text-[14px]">{totalCount}명</strong>
            </div>
            <span className="text-[#cbd5e1]">|</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[#64748b]">작성완료:</span>
              <span className="text-[#16a34a] font-bold">{completedCount}명</span>
            </div>
            <span className="text-[#cbd5e1]">|</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[#64748b]">일부미완료:</span>
              <span className="text-[#ea580c] font-bold">{incompleteCount}명</span>
            </div>
            <span className="text-[#cbd5e1]">|</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[#64748b]">미작성:</span>
              <span className="text-[#e11d48] font-bold">{unwrittenCount}명</span>
            </div>
          </div>

          {/* 작성률 프로그레스 */}
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-[#64748b] font-medium">전체 작성률</span>
            <div className="w-[120px] h-[8px] bg-[#e2e8f0] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#ef5a27] rounded-full transition-all duration-300"
                style={{ width: `${completionRate}%` }}
              />
            </div>
            <span className="text-[12.5px] font-bold text-[#ef5a27] font-mono">{completionRate}%</span>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            1. 기초평가 점검 탭 뷰
           ════════════════════════════════════════════════════════════════════ */}
        {mainTab === '기초평가' && (
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* 상단 툴바: 타이틀 + 검색 + 우측 [기초평가대장 출력] */}
            <div className="p-3 border-b border-[#c2cfdf] bg-[#fafbfc] flex flex-wrap items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-3">
                <h3 className="text-[15.5px] font-bold text-[#0e1225] flex items-center gap-1.5 leading-none">
                  <span className="w-1 h-3.5 bg-[#2a3461] rounded-full shrink-0" />
                  기초평가 점검 현황
                </h3>

                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={searchKeyword}
                    onChange={e => setSearchKeyword(e.target.value)}
                    placeholder="수급자명 / 인정번호"
                    className="h-[34px] px-2.5 text-[13px] border border-[#c2cfdf] rounded-[4px] bg-white text-[#0e1225] placeholder:text-[#94a3b8] focus:border-[#ef5a27] focus:outline-none w-[180px]"
                  />
                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="h-[34px] px-2.5 text-[13px] border border-[#c2cfdf] rounded-[4px] bg-white text-[#0e1225] font-medium focus:border-[#ef5a27] focus:outline-none cursor-pointer"
                  >
                    <option value="전체">계약전체</option>
                    <option value="계약중">계약중</option>
                    <option value="만료">만료</option>
                  </select>
                </div>
              </div>

              {/* 우측 액션 버튼: 기초평가대장 출력 */}
              <div className="flex items-center gap-1.5">
                <Button
                  type="Sub"
                  size="Medium"
                  icon="Print"
                  onClick={() => window.print()}
                >
                  기초평가대장 출력
                </Button>
              </div>
            </div>

            {/* 4대 기초평가 종합 매트릭스 테이블 */}
            <div className="flex-1 overflow-auto">
              <table className="w-full text-left border-collapse text-[13px] whitespace-nowrap min-w-[1200px] border-b border-[#c2cfdf]">
                <thead className="bg-[#f4f7fc] text-[#283445] font-bold border-b border-[#c2cfdf] sticky top-0 z-10">
                  <tr>
                    <th className="py-2.5 px-2 border-r border-[#c2cfdf] w-[50px] text-center">연번</th>
                    <th className="py-2.5 px-2 border-r border-[#c2cfdf] w-[70px] text-center">계약상태</th>
                    <th className="py-2.5 px-3 border-r border-[#c2cfdf] w-[140px]">수급자명 (인정번호)</th>
                    <th className="py-2.5 px-2 border-r border-[#c2cfdf] w-[70px] text-center">등급</th>
                    <th className="py-2.5 px-3 border-r border-[#c2cfdf] w-[22%] text-center bg-[#eff6ff]/30">낙상위험도 (연 1회)</th>
                    <th className="py-2.5 px-3 border-r border-[#c2cfdf] w-[22%] text-center bg-[#fefce8]/30">욕창위험도 (연 1회)</th>
                    <th className="py-2.5 px-3 border-r border-[#c2cfdf] w-[20%] text-center bg-[#f0fdf4]/30">인지기능 (연 1회)</th>
                    <th className="py-2.5 px-3 border-r border-[#c2cfdf] w-[20%] text-center bg-[#faf5ff]/30">욕구조사 (연 1회)</th>
                    <th className="py-2.5 px-3 w-[90px] text-center">종합상태</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#c2cfdf]">
                  {filteredEvalRows.map(row => (
                    <tr key={row.id} className="hover:bg-[#f8fafc] transition-colors border-b border-[#c2cfdf]">
                      <td className="py-2.5 px-2 border-r border-[#c2cfdf] text-center text-[#475569]">{row.no}</td>
                      <td className="py-2.5 px-2 border-r border-[#c2cfdf] text-center">
                        <span className={`inline-block px-2 py-0.5 rounded-[4px] text-[11.5px] font-bold border ${
                          row.contractStatus === '계약중'
                            ? 'bg-[#e8f8ed] text-[#1c9640] border-[#bbf7d0]'
                            : 'bg-[#f1f5f9] text-[#64748b] border-[#cbd5e1]'
                        }`}>
                          {row.contractStatus}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 border-r border-[#c2cfdf] font-bold text-[#0e1225]">
                        {row.name} <span className="font-mono text-[#64748b] text-[12px]">({row.rcgtNo})</span>
                      </td>
                      <td className="py-2.5 px-2 border-r border-[#c2cfdf] text-center text-[#2a3461] font-semibold">{row.grade}</td>

                      {/* 낙상위험도 */}
                      <td className="py-2.5 px-3 border-r border-[#c2cfdf] align-top">
                        {row.fallRisk.status === '평가완료' ? (
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col text-[12.5px]">
                              <span className="font-bold text-[#0e1225]">{row.fallRisk.date} ({row.fallRisk.round}회차)</span>
                              <span className="text-[#64748b]">{row.fallRisk.evaluator} · {row.fallRisk.score}</span>
                            </div>
                            <span className="text-[11px] font-bold px-1.5 py-0.5 rounded-[4px] bg-[#fee2e2] text-[#e11d48]">
                              {row.fallRisk.grade}
                            </span>
                          </div>
                        ) : (
                          <span className="text-[#e11d48] font-bold text-[12px]">미작성</span>
                        )}
                      </td>

                      {/* 욕창위험도 */}
                      <td className="py-2.5 px-3 border-r border-[#c2cfdf] align-top">
                        {row.bedsoreRisk.status === '평가완료' ? (
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col text-[12.5px]">
                              <span className="font-bold text-[#0e1225]">{row.bedsoreRisk.date} ({row.bedsoreRisk.round}회차)</span>
                              <span className="text-[#64748b]">{row.bedsoreRisk.evaluator} · {row.bedsoreRisk.score}</span>
                            </div>
                            <span className="text-[11px] font-bold px-1.5 py-0.5 rounded-[4px] bg-[#fef3c7] text-[#d97706]">
                              {row.bedsoreRisk.grade}
                            </span>
                          </div>
                        ) : (
                          <span className="text-[#e11d48] font-bold text-[12px]">미작성</span>
                        )}
                      </td>

                      {/* 인지기능 */}
                      <td className="py-2.5 px-3 border-r border-[#c2cfdf] align-top">
                        {row.cognitive.status !== '미작성' ? (
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col text-[12.5px]">
                              <span className="font-bold text-[#0e1225]">{row.cognitive.date}</span>
                              <span className="text-[#64748b]">{row.cognitive.evaluator}</span>
                            </div>
                            <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-[4px] ${
                              row.cognitive.status === '치매진단' ? 'bg-[#eff6ff] text-[#0284c7]' : 'bg-[#f1f5f9] text-[#64748b]'
                            }`}>
                              {row.cognitive.status}
                            </span>
                          </div>
                        ) : (
                          <span className="text-[#e11d48] font-bold text-[12px]">미작성</span>
                        )}
                      </td>

                      {/* 욕구조사 */}
                      <td className="py-2.5 px-3 border-r border-[#c2cfdf] align-top">
                        {row.needAssessment.status === '평가완료' ? (
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col text-[12.5px]">
                              <span className="font-bold text-[#0e1225]">{row.needAssessment.date}</span>
                              <span className="text-[#64748b]">{row.needAssessment.evaluator}</span>
                            </div>
                            <span className="text-[11px] font-bold px-1.5 py-0.5 rounded-[4px] bg-[#ecfdf5] text-[#059669]">
                              평가완료
                            </span>
                          </div>
                        ) : (
                          <span className="text-[#e11d48] font-bold text-[12px]">미작성</span>
                        )}
                      </td>

                      {/* 종합상태 */}
                      <td className="py-2.5 px-3 text-center">
                        <span className={`text-[12px] font-bold ${
                          row.overallStatus === '전체완료' ? 'text-[#16a34a]' : 'text-[#ea580c]'
                        }`}>
                          {row.overallStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 하단 푸터 바 (테이블 하단 닫힘 테두리 완벽 보장) */}
            <div className="px-4 py-2.5 bg-[#f8fafc] border-t border-[#c2cfdf] flex items-center justify-between shrink-0 text-[13px]">
              <span className="text-[#475569] font-medium">
                조회된 수급자: <strong className="text-[#0e1225] font-bold text-[13.5px]">{filteredEvalRows.length}</strong>명
              </span>
              <span className="text-[#64748b] text-[12px]">
                * 4대 기초평가는 연 1회 이상 정기 실시 대상입니다.
              </span>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            2. 상담일지 점검 탭 뷰
           ════════════════════════════════════════════════════════════════════ */}
        {mainTab === '상담일지' && (
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* 상단 툴바: 타이틀 + 검색 + 우측 [상담일지 출력] */}
            <div className="p-3 border-b border-[#c2cfdf] bg-[#fafbfc] flex flex-wrap items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-3">
                <h3 className="text-[15.5px] font-bold text-[#0e1225] flex items-center gap-1.5 leading-none">
                  <span className="w-1 h-3.5 bg-[#2a3461] rounded-full shrink-0" />
                  상담일지 관리 현황
                </h3>

                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={searchKeyword}
                    onChange={e => setSearchKeyword(e.target.value)}
                    placeholder="수급자명 / 인정번호"
                    className="h-[34px] px-2.5 text-[13px] border border-[#c2cfdf] rounded-[4px] bg-white text-[#0e1225] placeholder:text-[#94a3b8] focus:border-[#ef5a27] focus:outline-none w-[180px]"
                  />
                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="h-[34px] px-2.5 text-[13px] border border-[#c2cfdf] rounded-[4px] bg-white text-[#0e1225] font-medium focus:border-[#ef5a27] focus:outline-none cursor-pointer"
                  >
                    <option value="전체">계약전체</option>
                    <option value="계약중">계약중</option>
                    <option value="만료">만료</option>
                  </select>
                </div>

                {/* 4대 서비스 서브 탭 */}
                <div className="flex items-center bg-[#f1f5f9] p-0.5 rounded-[6px] border border-[#c2cfdf] h-[32px] ml-2">
                  {(['방문요양', '방문목욕', '방문간호', '직원변경'] as const).map(tab => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setServiceTab(tab)}
                      className={`h-full px-2.5 text-[12px] font-bold rounded-[4px] transition-all cursor-pointer ${
                        serviceTab === tab ? 'bg-white text-[#ef5a27] shadow-xs' : 'text-[#64748b] hover:text-[#0e1225]'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* 우측 2대 액션 버튼: 상담일지 출력 */}
              <div className="flex items-center gap-1.5">
                <Button
                  type="Sub"
                  size="Medium"
                  icon="Print"
                  onClick={() => window.print()}
                >
                  상담일지 출력
                </Button>
              </div>
            </div>

            {/* 상담일지 월별 매트릭스 테이블 */}
            <div className="flex-1 overflow-auto">
              <table className="w-full text-left border-collapse text-[13px] whitespace-nowrap min-w-[1200px] border-b border-[#c2cfdf]">
                <thead className="bg-[#f4f7fc] text-[#283445] font-bold border-b border-[#c2cfdf] sticky top-0 z-10">
                  <tr>
                    <th className="py-2.5 px-2 border-r border-[#c2cfdf] w-[50px] text-center">연번</th>
                    <th className="py-2.5 px-2 border-r border-[#c2cfdf] w-[70px] text-center">계약상태</th>
                    <th className="py-2.5 px-3 border-r border-[#c2cfdf] w-[140px]">수급자명 (인정번호)</th>
                    <th className="py-2.5 px-2 border-r border-[#c2cfdf] w-[60px] text-center">등급</th>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(m => (
                      <th key={m} className="py-2.5 px-2 border-r border-[#c2cfdf] text-center w-[75px]">{m}월</th>
                    ))}
                    <th className="py-2.5 px-3 w-[100px] text-center">급여반영상태</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#c2cfdf]">
                  {filteredCounselRows.map(row => (
                    <tr key={row.id} className="hover:bg-[#f8fafc] transition-colors border-b border-[#c2cfdf]">
                      <td className="py-2.5 px-2 border-r border-[#c2cfdf] text-center text-[#475569]">{row.no}</td>
                      <td className="py-2.5 px-2 border-r border-[#c2cfdf] text-center">
                        <span className={`inline-block px-2 py-0.5 rounded-[4px] text-[11.5px] font-bold border ${
                          row.contractStatus === '계약중'
                            ? 'bg-[#e8f8ed] text-[#1c9640] border-[#bbf7d0]'
                            : 'bg-[#f1f5f9] text-[#64748b] border-[#cbd5e1]'
                        }`}>
                          {row.contractStatus}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 border-r border-[#c2cfdf] font-bold text-[#0e1225]">
                        {row.name} <span className="font-mono text-[#64748b] text-[12px]">({row.rcgtNo})</span>
                      </td>
                      <td className="py-2.5 px-2 border-r border-[#c2cfdf] text-center text-[#2a3461] font-semibold">{row.grade}</td>

                      {/* 1월 ~ 12월 셀 */}
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(m => {
                        const cell = row.months[m] || { status: '일정없음' }
                        return (
                          <td key={m} className="py-2 px-1.5 border-r border-[#c2cfdf] text-center align-middle">
                            {cell.status === '작성완료' ? (
                              <div className="flex flex-col items-center gap-0.5">
                                <span className="text-[11px] font-mono font-bold text-[#0e1225]">{cell.date}</span>
                                <div className="flex flex-wrap gap-0.5 justify-center">
                                  {cell.badges?.map(b => (
                                    <span key={b} className={`text-[10px] px-1 py-0.2 rounded leading-tight font-bold ${
                                      b === '급여제공반영' ? 'bg-[#e0f2fe] text-[#0284c7]' : 'bg-[#fef3c7] text-[#d97706]'
                                    }`}>
                                      {b === '급여제공반영' ? '반영' : '상태'}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ) : cell.status === '미작성' ? (
                              <span className="text-[#e11d48] font-bold text-[12px]">미작성</span>
                            ) : (
                              <span className="text-[#94a3b8] text-[11.5px]">-</span>
                            )}
                          </td>
                        )
                      })}

                      <td className="py-2.5 px-3 text-center">
                        <span className={`text-[12px] font-bold ${
                          row.benefitReflectStatus === '반영완료' ? 'text-[#16a34a]' : 'text-[#ea580c]'
                        }`}>
                          {row.benefitReflectStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 하단 푸터 바 */}
            <div className="px-4 py-2.5 bg-[#f8fafc] border-t border-[#c2cfdf] flex items-center justify-between shrink-0 text-[13px]">
              <span className="text-[#475569] font-medium">
                조회된 수급자: <strong className="text-[#0e1225] font-bold text-[13.5px]">{filteredCounselRows.length}</strong>명
              </span>
              <span className="text-[#64748b] text-[12px]">
                * 4대 상담일지는 분기/반기별 정기 상담 대상입니다.
              </span>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            3. 상태변화기록 점검 탭 뷰
           ════════════════════════════════════════════════════════════════════ */}
        {mainTab === '상태변화기록' && (
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* 상단 툴바: 타이틀 + 검색 + 우측 [출력] */}
            <div className="p-3 border-b border-[#c2cfdf] bg-[#fafbfc] flex flex-wrap items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-3">
                <h3 className="text-[15.5px] font-bold text-[#0e1225] flex items-center gap-1.5 leading-none">
                  <span className="w-1 h-3.5 bg-[#2a3461] rounded-full shrink-0" />
                  상태변화기록 점검 현황
                </h3>

                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={searchKeyword}
                    onChange={e => setSearchKeyword(e.target.value)}
                    placeholder="수급자명 / 인정번호"
                    className="h-[34px] px-2.5 text-[13px] border border-[#c2cfdf] rounded-[4px] bg-white text-[#0e1225] placeholder:text-[#94a3b8] focus:border-[#ef5a27] focus:outline-none w-[180px]"
                  />
                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="h-[34px] px-2.5 text-[13px] border border-[#c2cfdf] rounded-[4px] bg-white text-[#0e1225] font-medium focus:border-[#ef5a27] focus:outline-none cursor-pointer"
                  >
                    <option value="전체">계약전체</option>
                    <option value="계약중">계약중</option>
                    <option value="만료">만료</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <Button
                  type="Sub"
                  size="Medium"
                  icon="Print"
                  onClick={() => window.print()}
                >
                  상태변화기록대장 출력
                </Button>
              </div>
            </div>

            {/* 상태변화기록 월별 매트릭스 테이블 */}
            <div className="flex-1 overflow-auto">
              <table className="w-full text-left border-collapse text-[13px] whitespace-nowrap min-w-[1200px] border-b border-[#c2cfdf]">
                <thead className="bg-[#f4f7fc] text-[#283445] font-bold border-b border-[#c2cfdf] sticky top-0 z-10">
                  <tr>
                    <th className="py-2.5 px-2 border-r border-[#c2cfdf] w-[50px] text-center">연번</th>
                    <th className="py-2.5 px-2 border-r border-[#c2cfdf] w-[70px] text-center">계약상태</th>
                    <th className="py-2.5 px-3 border-r border-[#c2cfdf] w-[140px]">수급자명 (인정번호)</th>
                    <th className="py-2.5 px-2 border-r border-[#c2cfdf] w-[60px] text-center">등급</th>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(m => (
                      <th key={m} className="py-2.5 px-2 border-r border-[#c2cfdf] text-center w-[85px]">{m}월</th>
                    ))}
                    <th className="py-2.5 px-3 w-[90px] text-center">연간 총건수</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#c2cfdf]">
                  {filteredStatusChangeRows.map(row => (
                    <tr key={row.id} className="hover:bg-[#f8fafc] transition-colors border-b border-[#c2cfdf]">
                      <td className="py-2.5 px-2 border-r border-[#c2cfdf] text-center text-[#475569]">{row.no}</td>
                      <td className="py-2.5 px-2 border-r border-[#c2cfdf] text-center">
                        <span className={`inline-block px-2 py-0.5 rounded-[4px] text-[11.5px] font-bold border ${
                          row.contractStatus === '계약중'
                            ? 'bg-[#e8f8ed] text-[#1c9640] border-[#bbf7d0]'
                            : 'bg-[#f1f5f9] text-[#64748b] border-[#cbd5e1]'
                        }`}>
                          {row.contractStatus}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 border-r border-[#c2cfdf] font-bold text-[#0e1225]">
                        {row.name} <span className="font-mono text-[#64748b] text-[12px]">({row.rcgtNo})</span>
                      </td>
                      <td className="py-2.5 px-2 border-r border-[#c2cfdf] text-center text-[#2a3461] font-semibold">{row.grade}</td>

                      {/* 1월 ~ 12월 셀 */}
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(m => {
                        const cell = row.months[m]
                        return (
                          <td key={m} className="py-2 px-1.5 border-r border-[#c2cfdf] text-center align-middle">
                            {cell && cell.count > 0 ? (
                              <div className="flex flex-col items-center gap-0.5">
                                <span className="text-[12px] font-bold text-[#2a3461]">{cell.count}건 작성</span>
                                <span className="text-[10px] text-[#64748b]">서명 {cell.signedRate}</span>
                              </div>
                            ) : (
                              <span className="text-[#94a3b8] text-[11.5px]">-</span>
                            )}
                          </td>
                        )
                      })}

                      <td className="py-2.5 px-3 text-center font-bold text-[#0e1225]">
                        {row.totalCount}건
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 하단 푸터 바 */}
            <div className="px-4 py-2.5 bg-[#f8fafc] border-t border-[#c2cfdf] flex items-center justify-between shrink-0 text-[13px]">
              <span className="text-[#475569] font-medium">
                조회된 수급자: <strong className="text-[#0e1225] font-bold text-[13.5px]">{filteredStatusChangeRows.length}</strong>명
              </span>
              <span className="text-[#64748b] text-[12px]">
                * 상태변화기록은 월별 1회 이상 작성 및 요양보호사 서명이 필요합니다.
              </span>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            4. 사회복지사 업무수행일지 점검 탭 뷰
           ════════════════════════════════════════════════════════════════════ */}
        {mainTab === '사회복지사 업무수행일지' && (
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* 상단 툴바: 타이틀 + 검색 + 우측 [출력] */}
            <div className="p-3 border-b border-[#c2cfdf] bg-[#fafbfc] flex flex-wrap items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-3">
                <h3 className="text-[15.5px] font-bold text-[#0e1225] flex items-center gap-1.5 leading-none">
                  <span className="w-1 h-3.5 bg-[#2a3461] rounded-full shrink-0" />
                  사회복지사 업무수행일지 점검 현황
                </h3>

                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={searchKeyword}
                    onChange={e => setSearchKeyword(e.target.value)}
                    placeholder="수급자명 / 인정번호"
                    className="h-[34px] px-2.5 text-[13px] border border-[#c2cfdf] rounded-[4px] bg-white text-[#0e1225] placeholder:text-[#94a3b8] focus:border-[#ef5a27] focus:outline-none w-[180px]"
                  />
                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="h-[34px] px-2.5 text-[13px] border border-[#c2cfdf] rounded-[4px] bg-white text-[#0e1225] font-medium focus:border-[#ef5a27] focus:outline-none cursor-pointer"
                  >
                    <option value="전체">계약전체</option>
                    <option value="계약중">계약중</option>
                    <option value="만료">만료</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <Button
                  type="Sub"
                  size="Medium"
                  icon="Print"
                  onClick={() => window.print()}
                >
                  업무수행일지대장 출력
                </Button>
              </div>
            </div>

            {/* 업무수행일지 월별 매트릭스 테이블 */}
            <div className="flex-1 overflow-auto">
              <table className="w-full text-left border-collapse text-[13px] whitespace-nowrap min-w-[1200px] border-b border-[#c2cfdf]">
                <thead className="bg-[#f4f7fc] text-[#283445] font-bold border-b border-[#c2cfdf] sticky top-0 z-10">
                  <tr>
                    <th className="py-2.5 px-2 border-r border-[#c2cfdf] w-[50px] text-center">연번</th>
                    <th className="py-2.5 px-2 border-r border-[#c2cfdf] w-[70px] text-center">계약상태</th>
                    <th className="py-2.5 px-3 border-r border-[#c2cfdf] w-[140px]">수급자명 (인정번호)</th>
                    <th className="py-2.5 px-2 border-r border-[#c2cfdf] w-[60px] text-center">등급</th>
                    <th className="py-2.5 px-3 border-r border-[#c2cfdf] w-[130px]">담당자</th>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(m => (
                      <th key={m} className="py-2.5 px-2 border-r border-[#c2cfdf] text-center w-[85px]">{m}월</th>
                    ))}
                    <th className="py-2.5 px-3 w-[90px] text-center">종합상태</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#c2cfdf]">
                  {filteredDutyLogRows.map(row => (
                    <tr key={row.id} className="hover:bg-[#f8fafc] transition-colors border-b border-[#c2cfdf]">
                      <td className="py-2.5 px-2 border-r border-[#c2cfdf] text-center text-[#475569]">{row.no}</td>
                      <td className="py-2.5 px-2 border-r border-[#c2cfdf] text-center">
                        <span className={`inline-block px-2 py-0.5 rounded-[4px] text-[11.5px] font-bold border ${
                          row.contractStatus === '계약중'
                            ? 'bg-[#e8f8ed] text-[#1c9640] border-[#bbf7d0]'
                            : 'bg-[#f1f5f9] text-[#64748b] border-[#cbd5e1]'
                        }`}>
                          {row.contractStatus}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 border-r border-[#c2cfdf] font-bold text-[#0e1225]">
                        {row.name} <span className="font-mono text-[#64748b] text-[12px]">({row.rcgtNo})</span>
                      </td>
                      <td className="py-2.5 px-2 border-r border-[#c2cfdf] text-center text-[#2a3461] font-semibold">{row.grade}</td>
                      <td className="py-2.5 px-3 border-r border-[#c2cfdf] text-[#475569] text-[12px]">{row.worker}</td>

                      {/* 1월 ~ 12월 셀 */}
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(m => {
                        const cell = row.months[m]
                        return (
                          <td key={m} className="py-2 px-1.5 border-r border-[#c2cfdf] text-center align-middle">
                            {cell && cell.status === '작성완료' ? (
                              <div className="flex flex-col items-center gap-0.5">
                                <span className="text-[11px] font-mono font-bold text-[#0e1225]">{cell.visitDate}</span>
                                <span className="text-[10px] px-1 py-0.2 rounded bg-[#e0f2fe] text-[#0284c7] font-bold">
                                  {cell.visitType}
                                </span>
                              </div>
                            ) : cell && cell.status === '미작성' ? (
                              <span className="text-[#e11d48] font-bold text-[12px]">미작성</span>
                            ) : (
                              <span className="text-[#94a3b8] text-[11.5px]">-</span>
                            )}
                          </td>
                        )
                      })}

                      <td className="py-2.5 px-3 text-center">
                        <span className={`text-[12px] font-bold ${
                          row.overallStatus === '완료' ? 'text-[#16a34a]' : 'text-[#ea580c]'
                        }`}>
                          {row.overallStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 하단 푸터 바 */}
            <div className="px-4 py-2.5 bg-[#f8fafc] border-t border-[#c2cfdf] flex items-center justify-between shrink-0 text-[13px]">
              <span className="text-[#475569] font-medium">
                조회된 수급자: <strong className="text-[#0e1225] font-bold text-[13.5px]">{filteredDutyLogRows.length}</strong>명
              </span>
              <span className="text-[#64748b] text-[12px]">
                * 사회복지사 업무수행일지는 매월 방문 및 상담 내역을 작성해야 합니다.
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
