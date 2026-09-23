import React, { useState } from 'react'

interface Props {
  onClose: () => void
}

// 지원금 수혜 대상 직원
interface EligibleEmployee {
  id: string
  no: number
  name: string
  residentNo: string
  age: number
  role: string
  grantName: string
  grantType: 'keep' | 'youth' | 'promote'
  monthlyAmount: number
  durationMonths: number
  totalAmount: number
  statusBadge: string
  year?: string
}

// 1. 받을 수 있는 지원금 (현재 2026년 기준) 데이터
const CURRENT_EMPLOYEES: EligibleEmployee[] = [
  {
    id: 'cur-1',
    no: 1,
    name: '박명자',
    residentNo: '610620-2******',
    age: 65,
    role: '요양보호사 (상시)',
    grantName: '고령자 계속고용장려금',
    grantType: 'keep',
    monthlyAmount: 300000,
    durationMonths: 24,
    totalAmount: 7200000,
    statusBadge: '적격 100%',
  },
  {
    id: 'cur-2',
    no: 2,
    name: '이순희',
    residentNo: '630812-2******',
    age: 63,
    role: '요양보호사 (상시)',
    grantName: '고령자 계속고용장려금',
    grantType: 'keep',
    monthlyAmount: 300000,
    durationMonths: 24,
    totalAmount: 7200000,
    statusBadge: '적격 100%',
  },
  {
    id: 'cur-3',
    no: 3,
    name: '김정숙',
    residentNo: '640220-2******',
    age: 62,
    role: '조리원 (상시)',
    grantName: '고령자 계속고용장려금',
    grantType: 'keep',
    monthlyAmount: 300000,
    durationMonths: 24,
    totalAmount: 7200000,
    statusBadge: '적격 100%',
  },
  {
    id: 'cur-4',
    no: 4,
    name: '최영자',
    residentNo: '601104-2******',
    age: 65,
    role: '요양보호사 (상시)',
    grantName: '고령자 계속고용장려금',
    grantType: 'keep',
    monthlyAmount: 300000,
    durationMonths: 24,
    totalAmount: 7200000,
    statusBadge: '적격 100%',
  },
  {
    id: 'cur-5',
    no: 5,
    name: '정현우',
    residentNo: '940315-1******',
    age: 32,
    role: '사회복지사 (신규)',
    grantName: '청년일자리도약장려금',
    grantType: 'youth',
    monthlyAmount: 600000,
    durationMonths: 20,
    totalAmount: 12000000,
    statusBadge: '적격 100%',
  },
]

// 2. 놓친 지원금 (최근 3년 지원금) 데이터
const MISSED_EMPLOYEES: EligibleEmployee[] = [
  {
    id: 'mis-1',
    no: 1,
    name: '박명자',
    residentNo: '610620-2******',
    age: 64,
    role: '요양보호사 (상시)',
    grantName: '고령자 계속고용장려금',
    grantType: 'keep',
    monthlyAmount: 300000,
    durationMonths: 24,
    totalAmount: 7200000,
    statusBadge: '2025년 미신청',
    year: '2025년',
  },
  {
    id: 'mis-2',
    no: 2,
    name: '이순희',
    residentNo: '630812-2******',
    age: 62,
    role: '요양보호사 (상시)',
    grantName: '고령자 계속고용장려금',
    grantType: 'keep',
    monthlyAmount: 300000,
    durationMonths: 24,
    totalAmount: 7200000,
    statusBadge: '2025년 미신청',
    year: '2025년',
  },
  {
    id: 'mis-3',
    no: 3,
    name: '강민지',
    residentNo: '880512-2******',
    age: 37,
    role: '사회복지사 (취약계층)',
    grantName: '고용촉진장려금',
    grantType: 'promote',
    monthlyAmount: 600000,
    durationMonths: 18,
    totalAmount: 10800000,
    statusBadge: '2025년 미신청',
    year: '2025년',
  },
  {
    id: 'mis-4',
    no: 4,
    name: '최영자',
    residentNo: '601104-2******',
    age: 63,
    role: '요양보호사 (상시)',
    grantName: '고령자 계속고용장려금',
    grantType: 'keep',
    monthlyAmount: 300000,
    durationMonths: 24,
    totalAmount: 7200000,
    statusBadge: '2024년 미신청',
    year: '2024년',
  },
  {
    id: 'mis-5',
    no: 5,
    name: '김정숙',
    residentNo: '640220-2******',
    age: 60,
    role: '조리원 (상시)',
    grantName: '고령자 계속고용장려금',
    grantType: 'keep',
    monthlyAmount: 300000,
    durationMonths: 24,
    totalAmount: 7200000,
    statusBadge: '2024년 미신청',
    year: '2024년',
  },
  {
    id: 'mis-6',
    no: 6,
    name: '박명자',
    residentNo: '610620-2******',
    age: 62,
    role: '요양보호사 (상시)',
    grantName: '고령자 계속고용장려금',
    grantType: 'keep',
    monthlyAmount: 300000,
    durationMonths: 24,
    totalAmount: 7200000,
    statusBadge: '2023년 미신청',
    year: '2023년',
  },
]

export default function EmploymentGrantModal({ onClose }: Props) {
  // 화면 단계: 'intro' (첫 화면) | 'scanning' (1초 스캔 연출) | 'result' (결과 명세표 및 신고)
  const [step, setStep] = useState<'intro' | 'scanning' | 'result'>('intro')
  // 모드: 'available' (받을 수 있는 지원금 조회) | 'missed' (놓친 지원금 찾기)
  const [activeTab, setActiveTab] = useState<'available' | 'missed'>('available')
  const [scanText, setScanText] = useState<string>('지원금 데이터 확인 중...')

  // 선택된 항목 ID 목록 (기본값: 전체 선택)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  // 첫 화면에서 선택하여 스캔 시작
  const handleStartScan = (mode: 'available' | 'missed') => {
    setActiveTab(mode)
    const targetList = mode === 'available' ? CURRENT_EMPLOYEES : MISSED_EMPLOYEES
    setSelectedIds(targetList.map((e) => e.id))
    setStep('scanning')
    setScanText(
      mode === 'available'
        ? '현재 우리 기관 지원금 적격 여부 확인 중...'
        : '지난 3년간 미신청 지원금 내역 확인 중...'
    )

    setTimeout(() => {
      setStep('result')
    }, 1000)
  }

  const currentList = activeTab === 'available' ? CURRENT_EMPLOYEES : MISSED_EMPLOYEES
  const isAllSelected = currentList.length > 0 && selectedIds.length === currentList.length

  // 전체 선택 / 해제 토글
  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([])
    } else {
      setSelectedIds(currentList.map((e) => e.id))
    }
  }

  // 개별 선택 토글
  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  // 선택된 총 금액 및 월 지원액 계산
  const selectedEmployees = currentList.filter((e) => selectedIds.includes(e.id))
  const selectedTotalAmount = selectedEmployees.reduce((sum, e) => sum + e.totalAmount, 0)
  const selectedMonthlyAmount = selectedEmployees.reduce((sum, e) => sum + e.monthlyAmount, 0)

  // 신고하기 실행 핸들러
  const handleApplyGrants = () => {
    if (selectedIds.length === 0) {
      alert('신고할 지원금 대상을 최소 1명 이상 선택해주세요.')
      return
    }

    const confirmMsg = `선택하신 ${selectedIds.length}건 (총 ${selectedTotalAmount.toLocaleString()}원)의 고용지원금을 정식 신고하시겠습니까?`
    if (window.confirm(confirmMsg)) {
      alert(`[신고 완료]\n봄빛재가주야간보호센터 고용지원금 ${selectedIds.length}건(총 ${selectedTotalAmount.toLocaleString()}원)의 전자 신고가 정상 접수되었습니다.`)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-3 sm:p-4 animate-in fade-in duration-100">
      <div className="flex flex-col bg-white rounded-[6px] shadow-2xl border border-[#c2cfdf] w-full max-w-[940px] max-h-[92vh] overflow-hidden">

        {/* 1. 모달 헤더 (표준 네이비 스타일) */}
        <div className="px-4 py-2.5 bg-[#2a3461] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[14px]">
              고용지원금 간편 조회/신고
            </span>
            <span className="text-[11px] bg-white/15 px-2 py-0.5 rounded text-white/90 font-medium">
              봄빛재가주야간보호센터
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-[#ef5a27] text-[18px] leading-none transition-colors cursor-pointer"
            title="닫기"
          >
            ✕
          </button>
        </div>

        {/* ── 화면 1: 첫 화면 (2가지 조회 유형 선택) ── */}
        {step === 'intro' && (
          <div className="p-6 sm:p-8 bg-[#f8fafc] flex flex-col items-center justify-center min-h-[400px] overflow-y-auto">
            <div className="text-center max-w-[580px] mb-6">
              <span className="inline-block px-3 py-1 rounded-full bg-[#eef2f6] text-[#2a3461] text-[11.5px] font-bold mb-2 border border-[#c2cfdf]">
                고용지원금 조회부터 신청까지 한번에
              </span>
              <h3 className="text-[19px] font-bold text-[#0e1225]">
                조회하실 지원금 유형을 선택해주세요
              </h3>
            </div>

            {/* 2가지 선택 카드 그리드 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-[680px] mb-2">

              {/* 카드 1: 받을 수 있는 지원금 조회 */}
              <div
                onClick={() => handleStartScan('available')}
                className="p-6 bg-white rounded-[6px] border border-[#c2cfdf] hover:border-[#2a3461] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#f0fdf4] text-[#15803d] border border-[#bbf7d0]">
                      신규 지원금
                    </span>
                  </div>
                  <h4 className="text-[17px] font-bold text-[#0e1225] group-hover:text-[#2a3461] transition-colors mb-5">
                    받을 수 있는 지원금 조회
                  </h4>
                </div>

                <button className="w-full py-2.5 bg-[#2a3461] group-hover:bg-[#364275] text-white rounded text-[13px] font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs">
                  <span>받을 수 있는 지원금 조회하기</span>
                  <span>➔</span>
                </button>
              </div>

              {/* 카드 2: 놓친 지원금 찾기 */}
              <div
                onClick={() => handleStartScan('missed')}
                className="p-6 bg-white rounded-[6px] border border-[#c2cfdf] hover:border-[#ef5a27] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#fee2e2] text-[#b91c1c] border border-[#fecaca]">
                      지난 3년 지원금
                    </span>
                  </div>
                  <h4 className="text-[17px] font-bold text-[#0e1225] group-hover:text-[#ef5a27] transition-colors mb-5">
                    놓친 지원금 찾기
                  </h4>
                </div>

                <button className="w-full py-2.5 bg-[#ef5a27] group-hover:bg-[#d84a1c] text-white rounded text-[13px] font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs">
                  <span>놓친 지원금 찾기</span>
                  <span>➔</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ── 화면 2: 1초 실시간 스캔 애니메이션 ── */}
        {step === 'scanning' && (
          <div className="p-12 flex flex-col items-center justify-center min-h-[420px] bg-[#f8fafc]">
            <div className="relative size-[64px] mb-4 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-3 border-[#e2e8f0] border-t-[#2a3461] animate-spin" />
              <div className="size-[44px] rounded-full bg-[#2a3461] flex items-center justify-center text-white font-bold text-[15px]">
                GO
              </div>
            </div>

            <h3 className="text-[16px] font-bold text-[#0e1225] mb-1.5">
              고용지원금 적격 데이터를 대조하고 있습니다
            </h3>
            <p className="text-[12.5px] text-[#2a3461] font-semibold mb-5 animate-pulse">
              {scanText}
            </p>

            <div className="w-full max-w-[320px] bg-[#e2e8f0] rounded-full h-[6px] overflow-hidden">
              <div className="bg-[#2a3461] h-full w-4/5 animate-[pulse_0.8s_ease-in-out_infinite] rounded-full" />
            </div>
            <span className="text-[11px] text-[#64748b] mt-2">약 1초 소요</span>
          </div>
        )}

        {/* ── 화면 3: 결과 명세표 & 신고 화면 ── */}
        {step === 'result' && (
          <>
            {/* 상단 페이지 타이틀 바 */}
            <div className="bg-[#f0f4f9] px-4 py-2.5 border-b border-[#c2cfdf] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <h3 className="text-[14px] font-bold text-[#0e1225] flex items-center gap-2">
                  <span>
                    {activeTab === 'available'
                      ? '받을 수 있는 지원금 조회 결과'
                      : '놓친 지원금 찾기 결과'}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${activeTab === 'available'
                    ? 'bg-[#2a3461] text-white'
                    : 'bg-[#ef5a27] text-white'
                    }`}>
                    {activeTab === 'available' ? '5명 적격' : '6건 발견'}
                  </span>
                </h3>
              </div>

              <button
                onClick={() => setStep('intro')}
                className="px-2.5 py-1 bg-white hover:bg-[#e2e8f0] text-[#334155] border border-[#cbd5e1] rounded text-[11.5px] font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
              >
                <span>↺</span>
                <span>다른 지원금 조회</span>
              </button>
            </div>

            {/* 모달 본문 컨텐츠 */}
            <div className="flex-1 overflow-y-auto p-4 bg-[#f8fafc] flex flex-col gap-3">

              {/* 상단 요약 배너 (선택 항목 실시간 반영) */}
              {activeTab === 'available' ? (
                <div className="bg-white rounded-[4px] p-3 border border-[#c2cfdf] flex flex-wrap items-center justify-between gap-3 shadow-2xs">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[12.5px] text-[#64748b] font-medium">예상 지원금 합계:</span>
                      <strong className="text-[24px] font-bold text-[#ef5a27] tracking-tight">
                        {selectedTotalAmount.toLocaleString()}
                      </strong>
                      <span className="text-[14px] font-bold text-[#0e1225]">원</span>
                      <span className="text-[11.5px] text-[#64748b] ml-1">
                        (선택 {selectedIds.length}명 / 월 {selectedMonthlyAmount.toLocaleString()}원)
                      </span>
                    </div>
                  </div>

                  {/* 지원금 종목별 요약 카드 */}
                  <div className="flex items-center gap-2 text-[11.5px]">
                    <div className="bg-[#f0f4f9] px-2.5 py-1.5 rounded border border-[#cbd5e1]">
                      <span className="text-[#475569] block">고령자 계속고용장려금 (4명)</span>
                      <strong className="text-[#0e1225] font-bold">28,800,000원</strong>
                    </div>
                    <div className="bg-[#f0f4f9] px-2.5 py-1.5 rounded border border-[#cbd5e1]">
                      <span className="text-[#475569] block">청년일자리도약장려금 (1명)</span>
                      <strong className="text-[#2a3461] font-bold">12,000,000원</strong>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-[#fffaf8] rounded-[4px] p-3 border border-[#fed7aa] flex flex-wrap items-center justify-between gap-3 shadow-2xs">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[12.5px] text-[#64748b] font-medium">예상 지원금 합계:</span>
                      <strong className="text-[24px] font-bold text-[#b91c1c] tracking-tight">
                        {selectedTotalAmount.toLocaleString()}
                      </strong>
                      <span className="text-[14px] font-bold text-[#0e1225]">원</span>
                      <span className="text-[11.5px] text-[#b91c1c] font-semibold ml-1">
                        (선택 {selectedIds.length}건 신청 가능)
                      </span>
                    </div>
                  </div>

                  {/* 연도별 요약 */}
                  <div className="flex items-center gap-2 text-[11.5px]">
                    <div className="bg-white px-2.5 py-1.5 rounded border border-[#fed7aa]">
                      <span className="text-[#64748b] block">2025년 미신청 (3건)</span>
                      <strong className="text-[#0e1225] font-bold">25,200,000원</strong>
                    </div>
                    <div className="bg-white px-2.5 py-1.5 rounded border border-[#fed7aa]">
                      <span className="text-[#64748b] block">2024년 미신청 (2건)</span>
                      <strong className="text-[#0e1225] font-bold">14,400,000원</strong>
                    </div>
                    <div className="bg-white px-2.5 py-1.5 rounded border border-[#fed7aa]">
                      <span className="text-[#b91c1c] block">2023년 미신청 (1건)</span>
                      <strong className="text-[#b91c1c] font-bold">7,200,000원</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* 대상자 및 지원금 선택 명세표 테이블 */}
              <div className="bg-white rounded-[4px] border border-[#c2cfdf] overflow-hidden shadow-2xs">
                <div className="px-3 py-2 bg-[#f0f4f9] border-b border-[#c2cfdf] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-bold text-[#2a3461] flex items-center gap-1.5">
                      <span className="size-[5px] rounded-full bg-[#2a3461]" />
                      {activeTab === 'available'
                        ? '신고 대상 지원금 선택 명세표'
                        : '신고 대상 놓친 지원금 선택 명세표'}
                    </span>
                    <span className="text-[11px] text-[#64748b]">
                      (체크박스를 선택하여 원하는 항목만 신고할 수 있습니다)
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-[#ef5a27]">
                    선택: {selectedIds.length}건 / {currentList.length}건
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-[11.5px]">
                    <thead>
                      <tr className="bg-[#f8fafc] text-[#475569] border-b border-[#cbd5e1] font-bold">
                        <th className="py-2 px-2 text-center w-[36px]">
                          <input
                            type="checkbox"
                            checked={isAllSelected}
                            onChange={handleToggleSelectAll}
                            className="accent-[#2a3461] size-3.5 cursor-pointer"
                            title="전체 선택 / 해제"
                          />
                        </th>
                        <th className="py-2 px-2 text-center w-[40px]">순번</th>
                        {activeTab === 'missed' && (
                          <th className="py-2 px-2 text-center w-[65px]">발생연도</th>
                        )}
                        <th className="py-2 px-2.5">성명</th>
                        <th className="py-2 px-2.5 text-center">주민번호</th>
                        <th className="py-2 px-2 text-center">연령</th>
                        <th className="py-2 px-2.5">담당 직무</th>
                        <th className="py-2 px-3">추천 지원금 종목</th>
                        <th className="py-2 px-2.5 text-right">월 지원액</th>
                        <th className="py-2 px-2 text-center">지원 기간</th>
                        <th className="py-2 px-3 text-right">총 예상 지원액</th>
                        <th className="py-2 px-2 text-center w-[90px]">상태</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#edf2f7]">
                      {currentList.map((emp) => {
                        const isChecked = selectedIds.includes(emp.id)
                        return (
                          <tr
                            key={emp.id}
                            onClick={() => handleToggleSelect(emp.id)}
                            className={`cursor-pointer transition-colors ${isChecked ? 'bg-[#fffaf8] hover:bg-[#fff5f0]' : 'hover:bg-[#f1f5f9]'
                              }`}
                          >
                            <td className="py-2 px-2 text-center" onClick={(e) => e.stopPropagation()}>
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleToggleSelect(emp.id)}
                                className="accent-[#ef5a27] size-3.5 cursor-pointer"
                              />
                            </td>
                            <td className="py-2 px-2 text-center font-bold text-[#64748b]">{emp.no}</td>
                            {activeTab === 'missed' && (
                              <td className="py-2 px-2 text-center font-bold text-[#2a3461]">
                                {emp.year}
                              </td>
                            )}
                            <td className="py-2 px-2.5 font-bold text-[#0e1225]">{emp.name}</td>
                            <td className="py-2 px-2.5 text-center font-mono text-[#475569]">{emp.residentNo}</td>
                            <td className="py-2 px-2 text-center font-medium text-[#334155]">{emp.age}세</td>
                            <td className="py-2 px-2.5 text-[#334155]">{emp.role}</td>
                            <td className="py-2 px-3">
                              <span className={`inline-block px-1.5 py-0.5 rounded text-[10.5px] font-bold ${emp.grantType === 'youth'
                                ? 'bg-[#fff7ed] text-[#c2410c] border border-[#fed7aa]'
                                : emp.grantType === 'promote'
                                  ? 'bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe]'
                                  : 'bg-[#f0fdf4] text-[#15803d] border border-[#bbf7d0]'
                                }`}>
                                {emp.grantName}
                              </span>
                            </td>
                            <td className="py-2 px-2.5 text-right font-medium text-[#0e1225]">
                              {emp.monthlyAmount.toLocaleString()}원
                            </td>
                            <td className="py-2 px-2 text-center text-[#64748b]">
                              {emp.durationMonths}개월
                            </td>
                            <td className="py-2 px-3 text-right font-bold text-[#ef5a27]">
                              {emp.totalAmount.toLocaleString()}원
                            </td>
                            <td className="py-2 px-2 text-center">
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${activeTab === 'available'
                                ? 'bg-[#f0fdf4] text-[#15803d]'
                                : emp.year === '2023년'
                                  ? 'bg-[#fee2e2] text-[#b91c1c]'
                                  : 'bg-[#eff6ff] text-[#1d4ed8]'
                                }`}>
                                {emp.statusBadge}
                              </span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                    <tfoot>
                      <tr className="bg-[#f0f4f9] font-bold border-t border-[#cbd5e1] text-[12px]">
                        <td colSpan={activeTab === 'missed' ? 8 : 7} className="py-2 px-3 text-center text-[#2a3461]">
                          선택 합계 ({selectedIds.length}건)
                        </td>
                        <td className="py-2 px-2.5 text-right text-[#0e1225]">
                          {activeTab === 'available' ? `월 ${selectedMonthlyAmount.toLocaleString()}원` : '-'}
                        </td>
                        <td className="py-2 px-2 text-center text-[#64748b]">-</td>
                        <td className="py-2 px-3 text-right text-[#ef5a27] font-bold text-[13px]">
                          {selectedTotalAmount.toLocaleString()}원
                        </td>
                        <td className="py-2 px-2 text-center text-[#15803d]">선택 완료</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

            </div>
          </>
        )}

        {/* 4. 모달 푸터 (신고 버튼 탑재) */}
        <div className="px-4 py-2.5 bg-[#f0f4f9] border-t border-[#c2cfdf] flex items-center justify-between shrink-0 text-[11.5px]">
          <div className="text-[#475569] flex items-center gap-1.5">
            {step === 'result' ? (
              <span>
                선택된 <strong className="text-[#0e1225]">{selectedIds.length}건</strong> (총 <strong className="text-[#ef5a27]">{selectedTotalAmount.toLocaleString()}원</strong>)
              </span>
            ) : (
              <span>장기요양기관 맞춤형 고용지원금 간편 조회 및 신고</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {step === 'result' && (
              <button
                onClick={handleApplyGrants}
                disabled={selectedIds.length === 0}
                className={`px-4 py-1.5 rounded text-[12px] font-bold transition-all shadow-xs flex items-center gap-1.5 ${selectedIds.length > 0
                  ? 'bg-[#ef5a27] hover:bg-[#d84a1c] text-white cursor-pointer'
                  : 'bg-[#cbd5e1] text-[#94a3b8] cursor-not-allowed'
                  }`}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>선택한 지원금({selectedIds.length}건) 신고하기</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="px-3.5 py-1.5 bg-[#2a3461] hover:bg-[#364275] text-white rounded text-[12px] font-bold transition-colors cursor-pointer"
            >
              닫기
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
