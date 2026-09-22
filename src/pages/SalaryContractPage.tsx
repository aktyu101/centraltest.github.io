import React, { useState, useMemo } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export type SalaryContractType = '월급제' | '방문급여'
export type EmploymentStatus = '재직' | '휴직' | '퇴직'

export interface SalaryContractHistoryItem {
  id: string
  no: number
  period: string // e.g. "2026.01.01 ~ 2026.12.31"
  contractType: SalaryContractType
  amount: number
  createdAt: string
  note?: string
}

export interface SalaryItemDetail {
  name: string
  taxType: '과세' | '비과세'
  amount: number
}

export interface DeductionItemDetail {
  name: string
  amount: number
}

// 시급제 일반시급 항목 (15종)
export interface GeneralHourlyWageItems {
  baseWage: number // 기본급(시간당)
  weeklyHolidayAllowance: number // 주휴수당(시간당)
  annualLeaveAllowance: number // 연차수당(시간당)
  otherAllowance1: number // 기타수당(시간당)
  longServiceAllowance: number // 장기근속수당
  severeCareAllowance: number // 중증가산수당
  refresherTrainingFee: number // 요양보호사 보수교육비
  remoteTransportAllowance: number // 원거리교통비 가산수당
  nurseAddAllowance: number // 간호가산수당
  mealAllowance: number // 식대
  carAllowance: number // 자가운전보조금
  educationAllowance: number // 교육비
  ruralSpecialAllowance: number // 농어촌특별수당
  otherAllowance2: number // 기타수당2
  otherAllowance3: number // 기타수당3
}

// 시급제 건별시급 항목 (12종)
export interface CaseHourlyWageItems {
  familyCare60m: number // 가족요양 60분 시급 (60분당)
  familyCare90m: number // 가족요양 90분 건별시급 (90분당)
  allDayCare12to24: number // 종일방문요양 12시간~24시간 미만 건별(480분당)
  bathCarIn60m: number // 방문목욕 차량이용 차량내 60분 건별 (60분당)
  bathCarIn40m: number // 방문목욕 차량이용 차량내 40분 건별 (40분당)
  bathCarHome60m: number // 방문목욕 차량이용 가정내 60분 건별 (60분당)
  bathCarHome40m: number // 방문목욕 차량이용 가정내 40분 건별 (40분당)
  bathNormal60m: number // 방문목욕 60분 건별 (60분당)
  bathNormal40m: number // 방문목욕 40분 건별 (40분당)
  nurseVisit15m: number // 방문간호 15분 건당
  nurseVisit30m: number // 방문간호 30분 건당
  nurseVisit60m: number // 방문간호 60분 건당
}

// 시급제 종합 설정 프로필
export interface HourlyWageProfile {
  period: string
  calcSetting: '시설 기초설정' | '개별 설정'

  // 세무 및 공제/지원 설정
  dependentsTotal: number // 부양가족수 총N명
  dependentsMinor: number // 20세 이하 N명
  taxMethod: '근로소득세' | '사업소득세' // 원천징수 방식
  deductCopayment: boolean // 본인부담금 공제
  dourunuriNationalPension: boolean // 두루누리 국민연금
  dourunuriHealthInsurance: boolean // 두루누리 건강보험
  longTermCare30Discount: '사용' | '미사용' // 장기요양보험 30%적용

  // 일반시급 항목 (15개)
  general: GeneralHourlyWageItems

  // 건별시급 항목 (12개)
  cases: CaseHourlyWageItems

  isContracted: boolean // 계약 등록 여부
  isEdited?: boolean
}

export interface EmployeeSalaryProfile {
  id: string
  name: string
  status: EmploymentStatus
  role: string
  salaryType: SalaryContractType
  dob: string // '1957.05.12'
  age: number // 만나이
  hireDate: string // '2020.06.15'
  leaveDate: string // '-' 또는 '2026.12.31'
  phone: string
  workLocation: string
  mainJob: string
  mainOffice: string
  isContracted: boolean // 계약 등록 여부 (미계약자 구분)
  // 현재 급여 계약 정보 (피그마 뷰 연동)
  currentContract: {
    period: string
    salaryType: SalaryContractType
    dependentsTotal: number
    dependentsMinor: number
    taxMethod: '근로소득세' | '사업소득세'
    dourunuriNationalPension: boolean
    dourunuriEmployment: boolean
    workType: '상근' | '시간제'
    longTermCareDiscount: boolean
    calcSetting: '시설 기초설정' | '시설 설정'
    monthlyTotal: number
    regularHourlyWage: number
    withholdingTaxTotal: number
    items: SalaryItemDetail[]
    deductions: DeductionItemDetail[]
    visitAgreedHourlyWage?: number
  }
  hourlyProfile?: HourlyWageProfile
  history: SalaryContractHistoryItem[]
}

// ─── 시설 기초설정 기본값 (센터 표준 템플릿) ──────────────────────────────

const FACILITY_BASE_GENERAL: GeneralHourlyWageItems = {
  baseWage: 10030,
  weeklyHolidayAllowance: 2006,
  annualLeaveAllowance: 580,
  otherAllowance1: 0,
  longServiceAllowance: 0,
  severeCareAllowance: 0,
  refresherTrainingFee: 0,
  remoteTransportAllowance: 0,
  nurseAddAllowance: 0,
  mealAllowance: 0,
  carAllowance: 0,
  educationAllowance: 0,
  ruralSpecialAllowance: 0,
  otherAllowance2: 0,
  otherAllowance3: 0,
}

const FACILITY_BASE_CASES: CaseHourlyWageItems = {
  familyCare60m: 19500,
  familyCare90m: 29500,
  allDayCare12to24: 120000,
  bathCarIn60m: 16000,
  bathCarIn40m: 14000,
  bathCarHome60m: 15000,
  bathCarHome40m: 13000,
  bathNormal60m: 14000,
  bathNormal40m: 12000,
  nurseVisit15m: 15000,
  nurseVisit30m: 25000,
  nurseVisit60m: 35000,
}

// ─── Initial Mock Data ─────────────────────────────────────────────────────────

const INITIAL_EMPLOYEES: EmployeeSalaryProfile[] = [
  {
    id: 'EMP-001',
    name: '김순수',
    status: '재직',
    role: '요양보호사',
    salaryType: '방문급여',
    dob: '1957.05.12',
    age: 67,
    hireDate: '2020.06.15',
    leaveDate: '-',
    phone: '010-9281-7483',
    workLocation: '관내 재가방문',
    mainJob: '방문요양, 방문목욕',
    mainOffice: '재가복지팀',
    isContracted: true,
    currentContract: {
      period: '2026.01.01 ~ 2026.12.31',
      salaryType: '방문급여',
      dependentsTotal: 2,
      dependentsMinor: 1,
      taxMethod: '근로소득세',
      dourunuriNationalPension: false,
      dourunuriEmployment: false,
      workType: '시간제',
      longTermCareDiscount: true,
      calcSetting: '시설 기초설정',
      monthlyTotal: 0,
      regularHourlyWage: 10320,
      withholdingTaxTotal: 0,
      visitAgreedHourlyWage: 12384,
      items: [
        { name: '기본급 (시급/h)', taxType: '과세', amount: 10320 },
        { name: '주휴수당 (시급/h)', taxType: '과세', amount: 2064 },
        { name: '연차수당 (시급/h)', taxType: '과세', amount: 584 },
      ],
      deductions: [],
    },
    hourlyProfile: {
      period: '2026.01.01 ~ 2026.12.31',
      calcSetting: '시설 기초설정',
      dependentsTotal: 2,
      dependentsMinor: 1,
      taxMethod: '근로소득세',
      deductCopayment: false,
      dourunuriNationalPension: false,
      dourunuriHealthInsurance: false,
      longTermCare30Discount: '사용',
      general: {
        baseWage: 10320,
        weeklyHolidayAllowance: 2064,
        annualLeaveAllowance: 584,
        otherAllowance1: 0,
        longServiceAllowance: 30000,
        severeCareAllowance: 10000,
        refresherTrainingFee: 0,
        remoteTransportAllowance: 0,
        nurseAddAllowance: 0,
        mealAllowance: 0,
        carAllowance: 0,
        educationAllowance: 0,
        ruralSpecialAllowance: 0,
        otherAllowance2: 0,
        otherAllowance3: 0,
      },
      cases: {
        familyCare60m: 20000,
        familyCare90m: 30000,
        allDayCare12to24: 125000,
        bathCarIn60m: 17000,
        bathCarIn40m: 15000,
        bathCarHome60m: 16000,
        bathCarHome40m: 14000,
        bathNormal60m: 15000,
        bathNormal40m: 13000,
        nurseVisit15m: 0,
        nurseVisit30m: 0,
        nurseVisit60m: 0,
      },
      isContracted: true,
    },
    history: [
      { id: 'H1', no: 1, period: '2026.01.01 ~ 2026.12.31', contractType: '방문급여', amount: 12384, createdAt: '2026.01.10 11:20', note: '방문시급 약정' },
    ],
  },
  {
    id: 'EMP-002',
    name: '이영희',
    status: '재직',
    role: '요양보호사',
    salaryType: '방문급여',
    dob: '1961.08.20',
    age: 63,
    hireDate: '2021.03.10',
    leaveDate: '-',
    phone: '010-4421-9823',
    workLocation: '관내 재가방문',
    mainJob: '방문요양',
    mainOffice: '재가복지팀',
    isContracted: true,
    currentContract: {
      period: '2026.01.01 ~ 2026.12.31',
      salaryType: '방문급여',
      dependentsTotal: 1,
      dependentsMinor: 0,
      taxMethod: '근로소득세',
      dourunuriNationalPension: false,
      dourunuriEmployment: false,
      workType: '시간제',
      longTermCareDiscount: true,
      calcSetting: '시설 기초설정',
      monthlyTotal: 0,
      regularHourlyWage: 10500,
      withholdingTaxTotal: 0,
      visitAgreedHourlyWage: 13200,
      items: [
        { name: '기본급 (시급/h)', taxType: '과세', amount: 10500 },
        { name: '주휴수당 (시급/h)', taxType: '과세', amount: 2100 },
        { name: '연차수당 (시급/h)', taxType: '과세', amount: 600 },
      ],
      deductions: [],
    },
    hourlyProfile: {
      period: '2026.01.01 ~ 2026.12.31',
      calcSetting: '개별 설정',
      dependentsTotal: 1,
      dependentsMinor: 0,
      taxMethod: '근로소득세',
      deductCopayment: true,
      dourunuriNationalPension: true,
      dourunuriHealthInsurance: true,
      longTermCare30Discount: '사용',
      general: {
        baseWage: 10500,
        weeklyHolidayAllowance: 2100,
        annualLeaveAllowance: 600,
        otherAllowance1: 500,
        longServiceAllowance: 40000,
        severeCareAllowance: 0,
        refresherTrainingFee: 20000,
        remoteTransportAllowance: 10000,
        nurseAddAllowance: 0,
        mealAllowance: 100000,
        carAllowance: 0,
        educationAllowance: 0,
        ruralSpecialAllowance: 0,
        otherAllowance2: 0,
        otherAllowance3: 0,
      },
      cases: {
        familyCare60m: 21000,
        familyCare90m: 31000,
        allDayCare12to24: 130000,
        bathCarIn60m: 18000,
        bathCarIn40m: 16000,
        bathCarHome60m: 17000,
        bathCarHome40m: 15000,
        bathNormal60m: 16000,
        bathNormal40m: 14000,
        nurseVisit15m: 0,
        nurseVisit30m: 0,
        nurseVisit60m: 0,
      },
      isContracted: true,
    },
    history: [
      { id: 'H2', no: 1, period: '2026.01.01 ~ 2026.12.31', contractType: '방문급여', amount: 13200, createdAt: '2026.01.08 14:10' },
    ],
  },
  {
    id: 'EMP-003',
    name: '박민수',
    status: '재직',
    role: '요양보호사',
    salaryType: '방문급여',
    dob: '1959.11.03',
    age: 65,
    hireDate: '2022.05.01',
    leaveDate: '-',
    phone: '010-8832-1920',
    workLocation: '관내 재가방문',
    mainJob: '방문요양 및 목욕',
    mainOffice: '요양1팀',
    isContracted: true,
    currentContract: {
      period: '2026.01.01 ~ 2026.12.31',
      salaryType: '방문급여',
      dependentsTotal: 1,
      dependentsMinor: 0,
      taxMethod: '근로소득세',
      dourunuriNationalPension: false,
      dourunuriEmployment: false,
      workType: '시간제',
      longTermCareDiscount: true,
      calcSetting: '시설 기초설정',
      monthlyTotal: 0,
      regularHourlyWage: 10320,
      withholdingTaxTotal: 0,
      visitAgreedHourlyWage: 12384,
      items: [
        { name: '기본급 (시급/h)', taxType: '과세', amount: 10320 },
        { name: '주휴수당 (시급/h)', taxType: '과세', amount: 2064 },
      ],
      deductions: [],
    },
    hourlyProfile: {
      period: '2026.01.01 ~ 2026.12.31',
      calcSetting: '시설 기초설정',
      dependentsTotal: 1,
      dependentsMinor: 0,
      taxMethod: '사업소득세',
      deductCopayment: false,
      dourunuriNationalPension: false,
      dourunuriHealthInsurance: false,
      longTermCare30Discount: '미사용',
      general: {
        baseWage: 10320,
        weeklyHolidayAllowance: 2064,
        annualLeaveAllowance: 584,
        otherAllowance1: 0,
        longServiceAllowance: 0,
        severeCareAllowance: 0,
        refresherTrainingFee: 0,
        remoteTransportAllowance: 0,
        nurseAddAllowance: 0,
        mealAllowance: 0,
        carAllowance: 0,
        educationAllowance: 0,
        ruralSpecialAllowance: 0,
        otherAllowance2: 0,
        otherAllowance3: 0,
      },
      cases: {
        familyCare60m: 20000,
        familyCare90m: 30000,
        allDayCare12to24: 120000,
        bathCarIn60m: 16000,
        bathCarIn40m: 14000,
        bathCarHome60m: 15000,
        bathCarHome40m: 13000,
        bathNormal60m: 14000,
        bathNormal40m: 12000,
        nurseVisit15m: 0,
        nurseVisit30m: 0,
        nurseVisit60m: 0,
      },
      isContracted: true,
    },
    history: [
      { id: 'H3', no: 1, period: '2026.01.01 ~ 2026.12.31', contractType: '방문급여', amount: 12384, createdAt: '2026.01.05 10:20' },
    ],
  },
  {
    id: 'EMP-004',
    name: '정순희',
    status: '재직',
    role: '요양보호사',
    salaryType: '방문급여',
    dob: '1964.04.15',
    age: 60,
    hireDate: '2023.01.15',
    leaveDate: '-',
    phone: '010-3329-8711',
    workLocation: '관내 재가방문',
    mainJob: '방문요양',
    mainOffice: '요양2팀',
    isContracted: true,
    currentContract: {
      period: '2026.01.01 ~ 2026.12.31',
      salaryType: '방문급여',
      dependentsTotal: 1,
      dependentsMinor: 0,
      taxMethod: '근로소득세',
      dourunuriNationalPension: false,
      dourunuriEmployment: false,
      workType: '시간제',
      longTermCareDiscount: true,
      calcSetting: '시설 기초설정',
      monthlyTotal: 0,
      regularHourlyWage: 10400,
      withholdingTaxTotal: 0,
      visitAgreedHourlyWage: 12480,
      items: [
        { name: '기본급 (시급/h)', taxType: '과세', amount: 10400 },
        { name: '주휴수당 (시급/h)', taxType: '과세', amount: 2080 },
      ],
      deductions: [],
    },
    hourlyProfile: {
      period: '2026.01.01 ~ 2026.12.31',
      calcSetting: '개별 설정',
      dependentsTotal: 1,
      dependentsMinor: 0,
      taxMethod: '근로소득세',
      deductCopayment: false,
      dourunuriNationalPension: false,
      dourunuriHealthInsurance: false,
      longTermCare30Discount: '사용',
      general: {
        baseWage: 10400,
        weeklyHolidayAllowance: 2080,
        annualLeaveAllowance: 600,
        otherAllowance1: 0,
        longServiceAllowance: 0,
        severeCareAllowance: 15000,
        refresherTrainingFee: 0,
        remoteTransportAllowance: 0,
        nurseAddAllowance: 0,
        mealAllowance: 0,
        carAllowance: 0,
        educationAllowance: 0,
        ruralSpecialAllowance: 0,
        otherAllowance2: 0,
        otherAllowance3: 0,
      },
      cases: {
        familyCare60m: 20000,
        familyCare90m: 30000,
        allDayCare12to24: 120000,
        bathCarIn60m: 15000,
        bathCarIn40m: 13000,
        bathCarHome60m: 15000,
        bathCarHome40m: 13000,
        bathNormal60m: 15000,
        bathNormal40m: 13000,
        nurseVisit15m: 0,
        nurseVisit30m: 0,
        nurseVisit60m: 0,
      },
      isContracted: true,
    },
    history: [
      { id: 'H4', no: 1, period: '2026.01.01 ~ 2026.12.31', contractType: '방문급여', amount: 12480, createdAt: '2026.01.12 16:30' },
    ],
  },
  {
    id: 'EMP-005',
    name: '최영자',
    status: '휴직',
    role: '요양보호사',
    salaryType: '방문급여',
    dob: '1958.07.22',
    age: 66,
    hireDate: '2021.09.01',
    leaveDate: '-',
    phone: '010-7761-3920',
    workLocation: '관내 재가방문',
    mainJob: '방문요양',
    mainOffice: '요양1팀',
    isContracted: true,
    currentContract: {
      period: '2026.01.01 ~ 2026.12.31',
      salaryType: '방문급여',
      dependentsTotal: 1,
      dependentsMinor: 0,
      taxMethod: '근로소득세',
      dourunuriNationalPension: false,
      dourunuriEmployment: false,
      workType: '시간제',
      longTermCareDiscount: true,
      calcSetting: '시설 기초설정',
      monthlyTotal: 0,
      regularHourlyWage: 10320,
      withholdingTaxTotal: 0,
      visitAgreedHourlyWage: 12384,
      items: [{ name: '기본급 (시급/h)', taxType: '과세', amount: 10320 }],
      deductions: [],
    },
    hourlyProfile: {
      period: '2026.01.01 ~ 2026.12.31',
      calcSetting: '시설 기초설정',
      dependentsTotal: 1,
      dependentsMinor: 0,
      taxMethod: '근로소득세',
      deductCopayment: false,
      dourunuriNationalPension: false,
      dourunuriHealthInsurance: false,
      longTermCare30Discount: '사용',
      general: { ...FACILITY_BASE_GENERAL, baseWage: 10320, weeklyHolidayAllowance: 2064 },
      cases: { ...FACILITY_BASE_CASES },
      isContracted: true,
    },
    history: [
      { id: 'H5', no: 1, period: '2026.01.01 ~ 2026.12.31', contractType: '방문급여', amount: 12384, createdAt: '2026.01.05 13:40' },
    ],
  },
  // 미계약 종사자 샘플 1
  {
    id: 'EMP-006',
    name: '강순자',
    status: '재직',
    role: '요양보호사',
    salaryType: '방문급여',
    dob: '1962.11.14',
    age: 62,
    hireDate: '2026.01.02',
    leaveDate: '-',
    phone: '010-6391-4820',
    workLocation: '관내 재가방문',
    mainJob: '방문요양',
    mainOffice: '재가복지팀',
    isContracted: false, // 미계약 상태
    currentContract: {
      period: '2026.01.01 ~ 2026.12.31',
      salaryType: '방문급여',
      dependentsTotal: 1,
      dependentsMinor: 0,
      taxMethod: '근로소득세',
      dourunuriNationalPension: false,
      dourunuriEmployment: false,
      workType: '시간제',
      longTermCareDiscount: true,
      calcSetting: '시설 기초설정',
      monthlyTotal: 0,
      regularHourlyWage: 10030,
      withholdingTaxTotal: 0,
      items: [],
      deductions: [],
    },
    hourlyProfile: {
      period: '2026.01.01 ~ 2026.12.31',
      calcSetting: '시설 기초설정',
      dependentsTotal: 1,
      dependentsMinor: 0,
      taxMethod: '근로소득세',
      deductCopayment: false,
      dourunuriNationalPension: false,
      dourunuriHealthInsurance: false,
      longTermCare30Discount: '사용',
      general: { ...FACILITY_BASE_GENERAL },
      cases: { ...FACILITY_BASE_CASES },
      isContracted: false,
    },
    history: [],
  },
  // 미계약 종사자 샘플 2
  {
    id: 'EMP-007',
    name: '윤미경',
    status: '재직',
    role: '간호사',
    salaryType: '방문급여',
    dob: '1970.03.25',
    age: 54,
    hireDate: '2026.02.01',
    leaveDate: '-',
    phone: '010-8274-1948',
    workLocation: '센터 간호실',
    mainJob: '방문간호',
    mainOffice: '의료지원팀',
    isContracted: false, // 미계약 상태
    currentContract: {
      period: '2026.02.01 ~ 2027.01.31',
      salaryType: '방문급여',
      dependentsTotal: 2,
      dependentsMinor: 1,
      taxMethod: '근로소득세',
      dourunuriNationalPension: false,
      dourunuriEmployment: false,
      workType: '시간제',
      longTermCareDiscount: true,
      calcSetting: '개별 설정',
      monthlyTotal: 0,
      regularHourlyWage: 15000,
      withholdingTaxTotal: 0,
      items: [],
      deductions: [],
    },
    hourlyProfile: {
      period: '2026.02.01 ~ 2027.01.31',
      calcSetting: '개별 설정',
      dependentsTotal: 2,
      dependentsMinor: 1,
      taxMethod: '근로소득세',
      deductCopayment: false,
      dourunuriNationalPension: false,
      dourunuriHealthInsurance: false,
      longTermCare30Discount: '사용',
      general: { ...FACILITY_BASE_GENERAL, baseWage: 15000, weeklyHolidayAllowance: 3000 },
      cases: { ...FACILITY_BASE_CASES, nurseVisit15m: 20000, nurseVisit30m: 30000, nurseVisit60m: 45000 },
      isContracted: false,
    },
    history: [],
  },
  // 월급제 종사자
  {
    id: 'EMP-008',
    name: '홍길동',
    status: '재직',
    role: '요양보호사',
    salaryType: '월급제',
    dob: '1949.03.05',
    age: 69,
    hireDate: '2021.09.15',
    leaveDate: '-',
    phone: '010-3849-1029',
    workLocation: '센터 본사',
    mainJob: '요양보호 서비스',
    mainOffice: '행정지원실',
    isContracted: true,
    currentContract: {
      period: '2026.01.01 ~ 2026.12.31',
      salaryType: '월급제',
      dependentsTotal: 2,
      dependentsMinor: 1,
      taxMethod: '근로소득세',
      dourunuriNationalPension: false,
      dourunuriEmployment: false,
      workType: '상근',
      longTermCareDiscount: true,
      calcSetting: '시설 기초설정',
      monthlyTotal: 2158680,
      regularHourlyWage: 10320,
      withholdingTaxTotal: 0,
      items: [
        { name: '기본급', taxType: '과세', amount: 1795680 },
        { name: '주휴수당', taxType: '과세', amount: 361200 },
        { name: '기타수당', taxType: '과세', amount: 0 },
        { name: '연차수당', taxType: '과세', amount: 0 },
        { name: '심야근무수당', taxType: '과세', amount: 0 },
        { name: '식대', taxType: '비과세', amount: 0 },
      ],
      deductions: [
        { name: '수당신청시 공제 항목', amount: 0 },
        { name: '국민연금', amount: 96300 },
        { name: '건강보험', amount: 74500 },
      ],
    },
    history: [
      { id: 'H7', no: 1, period: '2026.01.01 ~ 2026.12.31', contractType: '월급제', amount: 2158680, createdAt: '2026.01.04 14:30' },
    ],
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function SalaryContractPage() {
  const [employees, setEmployees] = useState<EmployeeSalaryProfile[]>(INITIAL_EMPLOYEES)
  const [selectedId, setSelectedId] = useState<string>(INITIAL_EMPLOYEES[0].id)

  // 상단 최상위 뷰 모드 탭: '시급현황' | '개별상세'
  const [viewMode, setViewMode] = useState<'시급현황' | '개별상세'>('시급현황')

  // 시급 현황 세부 3-Tab: '기본설정' | '일반시급' | '건별시급'
  const [hourlyTab, setHourlyTab] = useState<'기본설정' | '일반시급' | '건별시급'>('기본설정')

  // 다중 선택된 시급제 종사자 ID 세트
  const [selectedHourlyIds, setSelectedHourlyIds] = useState<string[]>([])

  // 상단 일괄 적용 툴바 입력값
  const [batchPeriod, setBatchPeriod] = useState<string>('2026.01.01 ~ 2026.12.31')
  // 일반시급 일괄 주입용
  const [batchBaseWage, setBatchBaseWage] = useState<string>('10,030')
  const [batchWeeklyHoliday, setBatchWeeklyHoliday] = useState<string>('2,006')
  const [batchAnnualLeave, setBatchAnnualLeave] = useState<string>('580')
  const [batchOtherAllowance1, setBatchOtherAllowance1] = useState<string>('0')
  // 건별시급 일괄 주입용 (12개 항목)
  const [batchFamily60, setBatchFamily60] = useState<string>('20,000')
  const [batchFamily90, setBatchFamily90] = useState<string>('30,000')
  const [batchAllDay12to24, setBatchAllDay12to24] = useState<string>('0')
  const [batchBathCarIn60, setBatchBathCarIn60] = useState<string>('0')
  const [batchBathCarIn40, setBatchBathCarIn40] = useState<string>('0')
  const [batchBathHome60, setBatchBathHome60] = useState<string>('0')
  const [batchBathHome40, setBatchBathHome40] = useState<string>('0')
  const [batchBathNormal60, setBatchBathNormal60] = useState<string>('0')
  const [batchBathNormal40, setBatchBathNormal40] = useState<string>('0')
  const [batchNurse15, setBatchNurse15] = useState<string>('0')
  const [batchNurse30, setBatchNurse30] = useState<string>('0')
  const [batchNurse60, setBatchNurse60] = useState<string>('0')

  // 인라인 편집 버퍼
  const [editedHourlyMap, setEditedHourlyMap] = useState<{ [empId: string]: HourlyWageProfile }>({})

  // 신규 시급제 종사자 선택 추가 모달 상태
  const [isAddEmpModalOpen, setIsAddEmpModalOpen] = useState<boolean>(false)
  const [selectedModalEmpIds, setSelectedModalEmpIds] = useState<string[]>([])
  const [modalSearchKeyword, setModalSearchKeyword] = useState<string>('')
  const [modalRoleFilter, setModalRoleFilter] = useState<string>('전체')
  const [modalOnlyUncontracted, setModalOnlyUncontracted] = useState<boolean>(false)
  const [modalAddPeriod, setModalAddPeriod] = useState<string>('2026.01.01 ~ 2026.12.31')

  // ── [개별상세 뷰 전용 필터 상태] ──
  const [statusFilter, setStatusFilter] = useState<string>('전체')
  const [roleFilter, setRoleFilter] = useState<string>('전체')
  const [nameKeyword, setNameKeyword] = useState<string>('')
  const [statusTab, setStatusTab] = useState<'전체' | EmploymentStatus>('전체')

  // 개별 상세 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('edit')
  const [modalForm, setModalForm] = useState<{
    periodStart: string
    periodEnd: string
    dependentsTotal: number
    dependentsMinor: number
    salaryType: SalaryContractType
    taxMethod: '근로소득세' | '사업소득세'
    dourunuriNationalPension: boolean
    dourunuriEmployment: boolean
    workType: '상근' | '시간제'
    longTermCareDiscount: boolean
    calcSetting: '시설 기초설정' | '시설 설정'
    items: { name: string; taxType: '과세' | '비과세'; amount: number }[]
    deductions: { name: string; amount: number }[]
  }>({
    periodStart: '2026.01.01',
    periodEnd: '2026.12.31',
    dependentsTotal: 2,
    dependentsMinor: 1,
    salaryType: '월급제',
    taxMethod: '근로소득세',
    dourunuriNationalPension: false,
    dourunuriEmployment: false,
    workType: '상근',
    longTermCareDiscount: true,
    calcSetting: '시설 기초설정',
    items: [],
    deductions: [],
  })

  // 시급제 대상 종사자 목록 (방문급여 종사자 전체: 계약자 + 미계약자)
  const hourlyEmployees = useMemo(() => {
    return employees.filter(e => e.salaryType === '방문급여')
  }, [employees])

  // 미계약 종사자 풀 (모달에서 선택 추가 가능한 종사자들)
  const uncontractedPool = useMemo(() => {
    return employees.filter(e => e.salaryType === '방문급여' && !e.isContracted)
  }, [employees])

  // 개별상세 뷰용 필터 목록
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      if (statusFilter !== '전체' && emp.status !== statusFilter) return false
      if (roleFilter !== '전체' && emp.role !== roleFilter) return false
      if (statusTab !== '전체' && emp.status !== statusTab) return false
      if (nameKeyword.trim() && !emp.name.includes(nameKeyword.trim())) return false
      return true
    })
  }, [employees, statusFilter, roleFilter, statusTab, nameKeyword])

  // 현재 선택된 종사자 (개별상세 뷰)
  const selectedEmp = useMemo(() => {
    return employees.find(e => e.id === selectedId) || employees[0]
  }, [employees, selectedId])

  // ── [시급제 설정값 헬퍼] ──

  const getEmpHourlyProfile = (emp: EmployeeSalaryProfile): HourlyWageProfile => {
    if (editedHourlyMap[emp.id]) return editedHourlyMap[emp.id]
    if (emp.hourlyProfile) return emp.hourlyProfile

    return {
      period: '2026.01.01 ~ 2026.12.31',
      calcSetting: '시설 기초설정',
      dependentsTotal: 1,
      dependentsMinor: 0,
      taxMethod: '근로소득세',
      deductCopayment: false,
      dourunuriNationalPension: false,
      dourunuriHealthInsurance: false,
      longTermCare30Discount: '사용',
      general: { ...FACILITY_BASE_GENERAL },
      cases: { ...FACILITY_BASE_CASES },
      isContracted: emp.isContracted,
    }
  }

  // 인라인 기본필드 수정
  const handleProfileChange = (empId: string, field: keyof HourlyWageProfile, value: any) => {
    const emp = employees.find(e => e.id === empId)
    if (!emp) return
    const current = getEmpHourlyProfile(emp)
    setEditedHourlyMap(prev => ({
      ...prev,
      [empId]: {
        ...current,
        [field]: value,
        isEdited: true,
      },
    }))
  }

  // 일반시급 항목 수정
  const handleGeneralItemChange = (empId: string, itemKey: keyof GeneralHourlyWageItems, value: number) => {
    const emp = employees.find(e => e.id === empId)
    if (!emp) return
    const current = getEmpHourlyProfile(emp)
    setEditedHourlyMap(prev => ({
      ...prev,
      [empId]: {
        ...current,
        general: {
          ...current.general,
          [itemKey]: value,
        },
        isEdited: true,
      },
    }))
  }

  // 건별시급 항목 수정
  const handleCaseItemChange = (empId: string, itemKey: keyof CaseHourlyWageItems, value: number) => {
    const emp = employees.find(e => e.id === empId)
    if (!emp) return
    const current = getEmpHourlyProfile(emp)
    setEditedHourlyMap(prev => ({
      ...prev,
      [empId]: {
        ...current,
        cases: {
          ...current.cases,
          [itemKey]: value,
        },
        isEdited: true,
      },
    }))
  }

  // ── [선택 및 일괄 처리] ──

  const handleToggleSelectAll = () => {
    if (selectedHourlyIds.length === hourlyEmployees.length) {
      setSelectedHourlyIds([])
    } else {
      setSelectedHourlyIds(hourlyEmployees.map(e => e.id))
    }
  }

  const handleToggleSelect = (id: string) => {
    setSelectedHourlyIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  // 상단 툴바 일괄 적용 (탭별 분기)
  const parseBatchVal = (v: string, fallback = 0) => parseInt(v.replace(/[^0-9]/g, ''), 10) || fallback

  const handleApplyBatchToolbar = () => {
    if (selectedHourlyIds.length === 0) {
      alert('일괄 적용할 종사자를 최소 1명 이상 선택해 주세요.')
      return
    }

    const nextEdited = { ...editedHourlyMap }
    selectedHourlyIds.forEach(id => {
      const emp = employees.find(e => e.id === id)
      if (emp) {
        const current = getEmpHourlyProfile(emp)
        if (hourlyTab === '기본설정') {
          // 기본설정: 계약기간만 일괄 적용
          nextEdited[id] = { ...current, period: batchPeriod, isEdited: true }
        } else if (hourlyTab === '일반시급') {
          // 일반시급: 기본급/주휴/연차/기타수당 일괄 주입
          nextEdited[id] = {
            ...current,
            general: {
              ...current.general,
              baseWage: parseBatchVal(batchBaseWage, 10030),
              weeklyHolidayAllowance: parseBatchVal(batchWeeklyHoliday),
              annualLeaveAllowance: parseBatchVal(batchAnnualLeave),
              otherAllowance1: parseBatchVal(batchOtherAllowance1),
            },
            isEdited: true,
          }
        } else {
          // 건별시급: 12개 항목 전부 일괄 주입
          nextEdited[id] = {
            ...current,
            cases: {
              familyCare60m: parseBatchVal(batchFamily60),
              familyCare90m: parseBatchVal(batchFamily90),
              allDayCare12to24: parseBatchVal(batchAllDay12to24),
              bathCarIn60m: parseBatchVal(batchBathCarIn60),
              bathCarIn40m: parseBatchVal(batchBathCarIn40),
              bathCarHome60m: parseBatchVal(batchBathHome60),
              bathCarHome40m: parseBatchVal(batchBathHome40),
              bathNormal60m: parseBatchVal(batchBathNormal60),
              bathNormal40m: parseBatchVal(batchBathNormal40),
              nurseVisit15m: parseBatchVal(batchNurse15),
              nurseVisit30m: parseBatchVal(batchNurse30),
              nurseVisit60m: parseBatchVal(batchNurse60),
            },
            isEdited: true,
          }
        }
      }
    })
    setEditedHourlyMap(nextEdited)
    const tabLabel = hourlyTab === '기본설정' ? '계약기간' : hourlyTab === '일반시급' ? '일반시급' : '건별시급'
    alert(`선택된 ${selectedHourlyIds.length}명의 종사자 ${tabLabel} 조건이 일괄 적용되었습니다. [변경사항 전체 일괄 저장] 버튼을 눌러 최종 확정하세요.`)
  }

  // 계약 삭제 (등록된 계약 -> 미계약 상태로 전환)
  const handleDeleteContract = (empId: string) => {
    const emp = employees.find(e => e.id === empId)
    if (!emp) return
    if (!window.confirm(`[${emp.name}] 종사자의 급여 계약을 삭제하시겠습니까?\n삭제 시 미계약 상태로 전환되며 시급 설정값이 초기화됩니다.`)) {
      return
    }

    setEmployees(prev =>
      prev.map(item => {
        if (item.id === empId) {
          return {
            ...item,
            isContracted: false,
            hourlyProfile: {
              ...getEmpHourlyProfile(item),
              isContracted: false,
              calcSetting: '시설 기초설정',
              general: { ...FACILITY_BASE_GENERAL },
              cases: { ...FACILITY_BASE_CASES },
              isEdited: false,
            },
          }
        }
        return item
      })
    )

    setEditedHourlyMap(prev => {
      const next = { ...prev }
      delete next[empId]
      return next
    })

    alert(`[${emp.name}] 종사자의 급여 계약이 삭제되어 미계약 상태로 전환되었습니다.`)
  }

  // 미계약자 -> 계약 등록 처리
  const handleRegisterContract = (empId: string) => {
    const emp = employees.find(e => e.id === empId)
    if (!emp) return
    const profile = getEmpHourlyProfile(emp)

    setEmployees(prev =>
      prev.map(item => {
        if (item.id === empId) {
          const newHistory: SalaryContractHistoryItem = {
            id: `H-${Date.now()}`,
            no: item.history.length + 1,
            period: profile.period,
            contractType: '방문급여',
            amount: profile.general.baseWage + profile.general.weeklyHolidayAllowance,
            createdAt: '2026.02.24 14:00',
            note: '신규 시급계약 등록',
          }
          return {
            ...item,
            isContracted: true,
            hourlyProfile: { ...profile, isContracted: true, isEdited: false },
            currentContract: {
              ...item.currentContract,
              period: profile.period,
              regularHourlyWage: profile.general.baseWage,
              visitAgreedHourlyWage: profile.general.baseWage + profile.general.weeklyHolidayAllowance,
            },
            history: [newHistory, ...item.history],
          }
        }
        return item
      })
    )

    setEditedHourlyMap(prev => {
      const next = { ...prev }
      delete next[empId]
      return next
    })

    alert(`[${emp.name}] 종사자의 급여계약이 정식 등록되었습니다.`)
  }

  // 단일 행 저장
  const handleSaveSingleRow = (empId: string) => {
    const emp = employees.find(e => e.id === empId)
    if (!emp) return
    const profile = getEmpHourlyProfile(emp)

    setEmployees(prev =>
      prev.map(item => {
        if (item.id === empId) {
          const newHistory: SalaryContractHistoryItem = {
            id: `H-${Date.now()}`,
            no: item.history.length + 1,
            period: profile.period,
            contractType: '방문급여',
            amount: profile.general.baseWage + profile.general.weeklyHolidayAllowance,
            createdAt: '2026.02.24 14:00',
            note: '시급제 계약 갱신',
          }
          return {
            ...item,
            isContracted: true,
            hourlyProfile: { ...profile, isContracted: true, isEdited: false },
            currentContract: {
              ...item.currentContract,
              period: profile.period,
              regularHourlyWage: profile.general.baseWage,
              visitAgreedHourlyWage: profile.general.baseWage + profile.general.weeklyHolidayAllowance,
            },
            history: [newHistory, ...item.history],
          }
        }
        return item
      })
    )

    setEditedHourlyMap(prev => {
      const next = { ...prev }
      delete next[empId]
      return next
    })

    alert(`[${emp.name}] 종사자의 변경된 급여계약이 저장되었습니다.`)
  }

  // 전체 변경사항 일괄 저장
  const handleSaveAllEdited = () => {
    const editedEmpIds = Object.keys(editedHourlyMap)
    if (editedEmpIds.length === 0) {
      alert('수정된 시급 정보가 없습니다.')
      return
    }

    setEmployees(prev =>
      prev.map(item => {
        if (editedHourlyMap[item.id]) {
          const profile = editedHourlyMap[item.id]
          const newHistory: SalaryContractHistoryItem = {
            id: `H-${Date.now()}-${item.id}`,
            no: item.history.length + 1,
            period: profile.period,
            contractType: '방문급여',
            amount: profile.general.baseWage + profile.general.weeklyHolidayAllowance,
            createdAt: '2026.02.24 14:00',
            note: '시급제 일괄 계약 갱신',
          }
          return {
            ...item,
            isContracted: true,
            hourlyProfile: { ...profile, isContracted: true, isEdited: false },
            currentContract: {
              ...item.currentContract,
              period: profile.period,
              regularHourlyWage: profile.general.baseWage,
              visitAgreedHourlyWage: profile.general.baseWage + profile.general.weeklyHolidayAllowance,
            },
            history: [newHistory, ...item.history],
          }
        }
        return item
      })
    )

    setEditedHourlyMap({})
    alert(`총 ${editedEmpIds.length}명의 시급제 종사자 급여계약이 성공적으로 일괄 저장되었습니다.`)
  }

  // ── [통계 요약] ──
  const contractedCount = useMemo(() => hourlyEmployees.filter(e => e.isContracted).length, [hourlyEmployees])
  const uncontractedCount = useMemo(() => hourlyEmployees.filter(e => !e.isContracted).length, [hourlyEmployees])
  const avgHourlyWage = useMemo(() => {
    if (hourlyEmployees.length === 0) return 0
    const sum = hourlyEmployees.reduce((acc, emp) => {
      const p = getEmpHourlyProfile(emp)
      return acc + p.general.baseWage
    }, 0)
    return Math.round(sum / hourlyEmployees.length)
  }, [hourlyEmployees, editedHourlyMap])

  // ── [신규 시급제 종사자 추가 모달 필터 및 핸들러] ──
  const modalFilteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      // 1. 이미 시급제(방문급여)로 계약 완료된 종사자는 신규 추가 대상에서 원천 제외
      if (emp.salaryType === '방문급여' && emp.isContracted) return false
      // 2. 검색어 필터
      if (modalSearchKeyword.trim() && !emp.name.includes(modalSearchKeyword.trim())) return false
      // 3. 직종 필터
      if (modalRoleFilter !== '전체' && emp.role !== modalRoleFilter) return false
      // 4. 미계약 종사자만 보기 필터
      if (modalOnlyUncontracted && (emp.salaryType !== '방문급여' || emp.isContracted)) return false
      return true
    })
  }, [employees, modalSearchKeyword, modalRoleFilter, modalOnlyUncontracted])

  const handleToggleSelectModalEmp = (id: string) => {
    setSelectedModalEmpIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const handleToggleSelectAllModal = () => {
    if (selectedModalEmpIds.length === modalFilteredEmployees.length && modalFilteredEmployees.length > 0) {
      setSelectedModalEmpIds([])
    } else {
      setSelectedModalEmpIds(modalFilteredEmployees.map(e => e.id))
    }
  }

  const handleConfirmAddHourlyEmployees = () => {
    if (selectedModalEmpIds.length === 0) {
      alert('추가할 종사자를 1명 이상 선택해주세요.')
      return
    }

    setEmployees(prev =>
      prev.map(emp => {
        if (selectedModalEmpIds.includes(emp.id)) {
          return {
            ...emp,
            salaryType: '방문급여',
            isContracted: true,
            hourlyProfile: {
              period: modalAddPeriod,
              calcSetting: '시설 기초설정',
              dependentsTotal: emp.hourlyProfile?.dependentsTotal ?? 1,
              dependentsMinor: emp.hourlyProfile?.dependentsMinor ?? 0,
              taxMethod: emp.hourlyProfile?.taxMethod ?? '근로소득세',
              deductCopayment: false,
              dourunuriNationalPension: false,
              dourunuriHealthInsurance: false,
              longTermCare30Discount: '사용',
              general: { ...FACILITY_BASE_GENERAL },
              cases: { ...FACILITY_BASE_CASES },
              isContracted: true,
            },
          }
        }
        return emp
      })
    )

    alert(`선택된 ${selectedModalEmpIds.length}명의 종사자가 시급제(방문급여) 계약 목록에 성공적으로 등록되었습니다.`)
    setIsAddEmpModalOpen(false)
    setSelectedModalEmpIds([])
  }

  // 개별 모달 열기 핸들러
  const handleOpenEditModal = (contractItem?: SalaryContractHistoryItem) => {
    setModalMode('edit')
    setModalForm({
      periodStart: contractItem ? contractItem.period.split(' ~ ')[0] : '2026.01.01',
      periodEnd: contractItem ? contractItem.period.split(' ~ ')[1] : '2026.12.31',
      dependentsTotal: selectedEmp.currentContract.dependentsTotal,
      dependentsMinor: selectedEmp.currentContract.dependentsMinor,
      salaryType: selectedEmp.currentContract.salaryType,
      taxMethod: selectedEmp.currentContract.taxMethod,
      dourunuriNationalPension: selectedEmp.currentContract.dourunuriNationalPension,
      dourunuriEmployment: selectedEmp.currentContract.dourunuriEmployment,
      workType: selectedEmp.currentContract.workType,
      longTermCareDiscount: selectedEmp.currentContract.longTermCareDiscount,
      calcSetting: selectedEmp.currentContract.calcSetting,
      items: [...selectedEmp.currentContract.items],
      deductions: [...selectedEmp.currentContract.deductions],
    })
    setIsModalOpen(true)
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#eaedf2]">
      {/* ── 최상단 헤더 타이틀 & 뷰 모드 탭 바 ── */}
      <div className="px-5 py-2.5 bg-white border-b border-[#c2cfdf] flex items-center justify-between shrink-0 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-[4px] h-[18px] bg-[#ef5a27] rounded-[2px]" />
            <h1 className="text-[17px] font-bold text-[#0e1225] tracking-tight">급여 계약관리</h1>
          </div>

          {/* 뷰 전환 탭: 시급 현황 vs 개별상세 */}
          <div className="flex items-center p-1 bg-[#f4f7fc] border border-[#c2cfdf] rounded-[6px] ml-4 gap-1">
            <button
              onClick={() => setViewMode('시급현황')}
              className={`px-3 py-1 text-[12.5px] font-bold rounded-[4px] transition-all cursor-pointer flex items-center gap-1.5 ${viewMode === '시급현황'
                ? 'bg-[#2a3461] text-white shadow-xs'
                : 'text-[#556780] hover:text-[#0e1225] hover:bg-[#e2e8f0]'
                }`}
            >
              <span className="size-[6px] rounded-full bg-[#ef5a27]" />
              시급제(방문급여) 시급 현황 및 일괄수정
              <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${viewMode === '시급현황' ? 'bg-white/20 text-white' : 'bg-[#e2e8f0] text-[#475569]'}`}>
                {hourlyEmployees.length}명
              </span>
            </button>

            <button
              onClick={() => setViewMode('개별상세')}
              className={`px-3 py-1 text-[12.5px] font-bold rounded-[4px] transition-all cursor-pointer ${viewMode === '개별상세'
                ? 'bg-[#2a3461] text-white shadow-xs'
                : 'text-[#556780] hover:text-[#0e1225] hover:bg-[#e2e8f0]'
                }`}
            >
              종사자별 급여계약 상세
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {viewMode === '시급현황' && Object.keys(editedHourlyMap).length > 0 && (
            <div className="text-[12px] text-[#ef5a27] font-bold bg-[#fff5f1] px-2.5 py-1 rounded-[4px] border border-[#ef5a27]/40">
              ● 수정 중인 종사자 {Object.keys(editedHourlyMap).length}명
            </div>
          )}
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* 뷰 A: [시급제(방문급여) 시급 현황 및 일괄수정] 전용 화면                     */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      {viewMode === '시급현황' ? (
        <div className="flex-1 flex flex-col p-3 gap-3 overflow-hidden">
          {/* 1. 상단 안내 문구 & 일괄 적용 제어 통합 슬림 바 */}
          <div className="bg-white border border-[#c2cfdf] rounded-[6px] p-2 px-3 shadow-2xs shrink-0 flex flex-col gap-1.5">
            {/* 상단 미니 정보 행: 안내 문구 + 현황 통계 */}
            <div className="flex items-center justify-between text-[11.5px] text-[#64748b]">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#ef5a27]">※</span>
                <span>기 계약자는 가장 최근 계약 기준으로 표시되며, 수급자별 시급 설정은 종사자별 급여계약 상세 화면에서 설정 가능합니다.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span>계약등록자: <strong className="text-[#137333] font-bold">{contractedCount}명</strong></span>
                <span className="text-[#cbd5e1]">|</span>
                <span>미계약자: <strong className="text-[#ef5a27] font-bold">{uncontractedCount}명</strong></span>
              </div>
            </div>

            {/* 일괄 적용 슬림 1줄 툴바 */}
            <div className="p-1.5 px-2.5 bg-[#f8fafc] border border-[#dbe3eb] rounded-[4px] flex items-center justify-between gap-3 overflow-x-auto min-h-[38px]">
              {/* 좌측: 타이틀 및 인원수 */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="size-[6px] rounded-full bg-[#ef5a27]" />
                <span className="text-[12px] font-bold text-[#0e1225] whitespace-nowrap">
                  {hourlyTab === '기본설정' ? '기본설정'
                    : hourlyTab === '일반시급' ? '일반시급'
                      : '건별시급'}
                </span>
                <span className="text-[11px] text-[#64748b] whitespace-nowrap">
                  (<strong className="text-[#2a3461]">{selectedHourlyIds.length}명</strong> 선택)
                </span>
              </div>

              {/* 우측: 탭별 가로 인라인 입력 필드 및 버튼 */}
              {hourlyTab === '기본설정' ? (
                /* 기본설정 탭 1줄 */
                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[11.5px] font-bold text-[#475569] whitespace-nowrap">계약기간</span>
                    <input
                      type="text"
                      value={batchPeriod}
                      onChange={e => setBatchPeriod(e.target.value)}
                      className="w-[220px] h-[28px] px-2 bg-white border border-[#c2cfdf] rounded-[4px] text-[12px] font-semibold text-[#0e1225]"
                    />
                  </div>
                  <span className="text-[11px] text-[#64748b] whitespace-nowrap">
                    ※ 세무/공제/지원은 개별 설정
                  </span>
                  <button
                    onClick={handleApplyBatchToolbar}
                    className="h-[28px] px-4 bg-[#ef5a27] hover:bg-[#d84a1c] text-white font-bold text-[12px] rounded-[4px] shadow-xs flex items-center justify-center whitespace-nowrap transition-colors cursor-pointer"
                  >
                    선택자 계약기간 일괄 적용
                  </button>
                </div>
              ) : hourlyTab === '일반시급' ? (
                /* 일반시급 탭 1줄: 최저/권장 제거 + 넉넉하게 넓어진 4개 인풋 + 합계 배지 + 적용버튼 */
                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11.5px] font-bold text-[#475569] whitespace-nowrap">기본급</span>
                    <input
                      type="text"
                      value={batchBaseWage}
                      onChange={e => setBatchBaseWage(e.target.value)}
                      className="w-[95px] h-[28px] px-2 bg-white border border-[#c2cfdf] rounded-[4px] text-[12.5px] font-bold text-[#ef5a27] text-right"
                    />
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[11.5px] font-bold text-[#475569] whitespace-nowrap">주휴수당</span>
                    <input
                      type="text"
                      value={batchWeeklyHoliday}
                      onChange={e => setBatchWeeklyHoliday(e.target.value)}
                      className="w-[90px] h-[28px] px-2 bg-white border border-[#c2cfdf] rounded-[4px] text-[12.5px] font-semibold text-right"
                    />
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[11.5px] font-bold text-[#475569] whitespace-nowrap">연차수당</span>
                    <input
                      type="text"
                      value={batchAnnualLeave}
                      onChange={e => setBatchAnnualLeave(e.target.value)}
                      className="w-[85px] h-[28px] px-2 bg-white border border-[#c2cfdf] rounded-[4px] text-[12.5px] font-semibold text-right"
                    />
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[11.5px] font-bold text-[#475569] whitespace-nowrap">기타수당</span>
                    <input
                      type="text"
                      value={batchOtherAllowance1}
                      onChange={e => setBatchOtherAllowance1(e.target.value)}
                      className="w-[85px] h-[28px] px-2 bg-white border border-[#c2cfdf] rounded-[4px] text-[12.5px] font-semibold text-right"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 bg-[#edf2f7] border border-[#cbd5e1] px-3 py-0.5 rounded-[4px] h-[28px]">
                    <span className="text-[11.5px] font-bold text-[#2a3461] whitespace-nowrap">책정시급(합계)</span>
                    <span className="text-[13px] font-extrabold text-[#2a3461] whitespace-nowrap">
                      {((Number(batchBaseWage.replace(/[^0-9]/g, '')) || 0) + (Number(batchWeeklyHoliday.replace(/[^0-9]/g, '')) || 0) + (Number(batchAnnualLeave.replace(/[^0-9]/g, '')) || 0) + (Number(batchOtherAllowance1.replace(/[^0-9]/g, '')) || 0)).toLocaleString()}원
                    </span>
                  </div>

                  <button
                    onClick={handleApplyBatchToolbar}
                    className="h-[28px] px-4 bg-[#ef5a27] hover:bg-[#d84a1c] text-white font-bold text-[12px] rounded-[4px] shadow-xs flex items-center justify-center whitespace-nowrap transition-colors cursor-pointer"
                  >
                    선택자 일반시급 주입
                  </button>
                </div>
              ) : (
                /* 건별시급 탭 1줄: 12개 항목 인라인 가로 스크롤 */
                <div className="flex items-center gap-2.5 shrink-0">
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-bold text-[#ef5a27] whitespace-nowrap">가족60</span>
                    <input type="text" value={batchFamily60} onChange={e => setBatchFamily60(e.target.value)}
                      className="w-[64px] h-[28px] px-1.5 bg-white border border-[#c2cfdf] rounded-[4px] text-[11.5px] font-bold text-[#ef5a27] text-right" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-bold text-[#ef5a27] whitespace-nowrap">가족90</span>
                    <input type="text" value={batchFamily90} onChange={e => setBatchFamily90(e.target.value)}
                      className="w-[64px] h-[28px] px-1.5 bg-white border border-[#c2cfdf] rounded-[4px] text-[11.5px] font-bold text-[#ef5a27] text-right" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-bold text-[#475569] whitespace-nowrap">종일</span>
                    <input type="text" value={batchAllDay12to24} onChange={e => setBatchAllDay12to24(e.target.value)}
                      className="w-[56px] h-[28px] px-1.5 bg-white border border-[#c2cfdf] rounded-[4px] text-[11.5px] font-semibold text-right" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-bold text-[#475569] whitespace-nowrap">차량60</span>
                    <input type="text" value={batchBathCarIn60} onChange={e => setBatchBathCarIn60(e.target.value)}
                      className="w-[56px] h-[28px] px-1.5 bg-white border border-[#c2cfdf] rounded-[4px] text-[11.5px] font-semibold text-right" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-bold text-[#475569] whitespace-nowrap">차량40</span>
                    <input type="text" value={batchBathCarIn40} onChange={e => setBatchBathCarIn40(e.target.value)}
                      className="w-[56px] h-[28px] px-1.5 bg-white border border-[#c2cfdf] rounded-[4px] text-[11.5px] font-semibold text-right" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-bold text-[#475569] whitespace-nowrap">가정60</span>
                    <input type="text" value={batchBathHome60} onChange={e => setBatchBathHome60(e.target.value)}
                      className="w-[56px] h-[28px] px-1.5 bg-white border border-[#c2cfdf] rounded-[4px] text-[11.5px] font-semibold text-right" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-bold text-[#475569] whitespace-nowrap">가정40</span>
                    <input type="text" value={batchBathHome40} onChange={e => setBatchBathHome40(e.target.value)}
                      className="w-[56px] h-[28px] px-1.5 bg-white border border-[#c2cfdf] rounded-[4px] text-[11.5px] font-semibold text-right" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-bold text-[#475569] whitespace-nowrap">방목60</span>
                    <input type="text" value={batchBathNormal60} onChange={e => setBatchBathNormal60(e.target.value)}
                      className="w-[56px] h-[28px] px-1.5 bg-white border border-[#c2cfdf] rounded-[4px] text-[11.5px] font-semibold text-right" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-bold text-[#475569] whitespace-nowrap">방목40</span>
                    <input type="text" value={batchBathNormal40} onChange={e => setBatchBathNormal40(e.target.value)}
                      className="w-[56px] h-[28px] px-1.5 bg-white border border-[#c2cfdf] rounded-[4px] text-[11.5px] font-semibold text-right" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-bold text-[#475569] whitespace-nowrap">간호15</span>
                    <input type="text" value={batchNurse15} onChange={e => setBatchNurse15(e.target.value)}
                      className="w-[56px] h-[28px] px-1.5 bg-white border border-[#c2cfdf] rounded-[4px] text-[11.5px] font-semibold text-right" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-bold text-[#475569] whitespace-nowrap">간호30</span>
                    <input type="text" value={batchNurse30} onChange={e => setBatchNurse30(e.target.value)}
                      className="w-[56px] h-[28px] px-1.5 bg-white border border-[#c2cfdf] rounded-[4px] text-[11.5px] font-semibold text-right" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-bold text-[#475569] whitespace-nowrap">간호60</span>
                    <input type="text" value={batchNurse60} onChange={e => setBatchNurse60(e.target.value)}
                      className="w-[56px] h-[28px] px-1.5 bg-white border border-[#c2cfdf] rounded-[4px] text-[11.5px] font-semibold text-right" />
                  </div>

                  <button
                    onClick={handleApplyBatchToolbar}
                    className="h-[28px] px-4 bg-[#ef5a27] hover:bg-[#d84a1c] text-white font-bold text-[12px] rounded-[4px] shadow-xs flex items-center justify-center whitespace-nowrap transition-colors cursor-pointer"
                  >
                    선택자 건별시급 주입
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 2. 메인 시급 현황 테이블 컨테이너 (일반시급 / 건별시급 탭 포함) */}
          <div className="flex-1 bg-white border border-[#c2cfdf] rounded-[6px] overflow-hidden flex flex-col shadow-2xs">
            {/* 테이블 상단 탭 및 필터 바 */}
            <div className="p-2.5 bg-[#fafbfc] border-b border-[#c2cfdf] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                {/* 3-Tab: 기본설정 / 일반시급 / 건별시급 */}
                <div className="flex items-center p-0.5 bg-[#eef2f7] border border-[#c2cfdf] rounded-[5px]">
                  {(['기본설정', '일반시급', '건별시급'] as const).map(tab => {
                    const labelMap = {
                      '기본설정': '기본 설정 (세무/공제/지원)',
                      '일반시급': '일반 시급 현황',
                      '건별시급': '건별 시급 현황',
                    }
                    const countMap = {
                      '기본설정': '7개 항목',
                      '일반시급': '15개 항목',
                      '건별시급': '12개 항목',
                    }
                    return (
                      <button
                        key={tab}
                        onClick={() => setHourlyTab(tab)}
                        className={`px-3 py-1 text-[12px] font-bold rounded-[4px] transition-all cursor-pointer flex items-center gap-1.5 ${hourlyTab === tab
                          ? 'bg-white text-[#2a3461] shadow-2xs border border-[#c2cfdf]'
                          : 'text-[#64748b] hover:text-[#0e1225]'
                          }`}
                      >
                        <span>{labelMap[tab]}</span>
                        <span className="text-[10.5px] px-1.5 py-0.2 bg-[#f0f4f9] text-[#2a3461] rounded font-bold">{countMap[tab]}</span>
                      </button>
                    )
                  })}
                </div>

                <span className="text-[12px] text-[#64748b]">
                  총 <strong className="text-[#0e1225]">{hourlyEmployees.length}명</strong> (선택: <strong className="text-[#ef5a27]">{selectedHourlyIds.length}명</strong>)
                </span>
              </div>

              {/* 우측: 신규 시급제 종사자 추가 버튼 */}
              <button
                onClick={() => {
                  setSelectedModalEmpIds([])
                  setModalSearchKeyword('')
                  setModalRoleFilter('전체')
                  setModalOnlyUncontracted(false)
                  setModalAddPeriod('2026.01.01 ~ 2026.12.31')
                  setIsAddEmpModalOpen(true)
                }}
                className="h-[30px] px-3 bg-[#2a3461] hover:bg-[#38467d] text-white text-[12px] font-bold rounded-[4px] shadow-xs flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                신규 시급제 종사자 추가
              </button>
            </div>

            {/* 테이블 본문 */}
            <div className="flex-1 overflow-auto">
              <table className={`w-full text-left border-collapse text-[12px] border-b border-[#c2cfdf] ${hourlyTab === '기본설정' ? 'min-w-[900px]' : hourlyTab === '일반시급' ? 'min-w-[1800px]' : 'min-w-[1600px]'}`}>
                <thead className="bg-[#f4f7fc] text-[#283445] font-bold border-b border-[#c2cfdf] sticky top-0 z-20">
                  <tr>
                    <th className="py-2 px-2.5 w-[40px] min-w-[40px] max-w-[40px] text-center sticky left-0 bg-[#f4f7fc] z-30 shadow-[inset_-1px_0_0_#c2cfdf]">
                      <input
                        type="checkbox"
                        checked={selectedHourlyIds.length === hourlyEmployees.length && hourlyEmployees.length > 0}
                        onChange={handleToggleSelectAll}
                        className="cursor-pointer"
                      />
                    </th>
                    {/* 종사자 정보: 이름 / 만나이 / 상태 / 직종 / 입사일, 퇴사일 */}
                    <th className="py-2 px-3 w-[210px] min-w-[210px] max-w-[210px] sticky left-[40px] bg-[#f4f7fc] z-30 shadow-[inset_-1px_0_0_#c2cfdf]">
                      종사자 정보
                    </th>
                    {/* 급여계약 설정 - 모든 탭에서 sticky 고정 및 굵은 우측 경계 구분선 */}
                    <th className="py-2 px-2.5 w-[140px] min-w-[140px] max-w-[140px] text-center sticky left-[250px] bg-[#f4f7fc] z-30 shadow-[inset_-2px_0_0_#94a3b8,3px_0_6px_rgba(0,0,0,0.08)]">
                      급여계약 설정
                    </th>
                    {/* ── 탭별 동적 컬럼 ── */}
                    {hourlyTab === '기본설정' ? (
                      /* ── 탭 1: 기본설정 (세무/공제/지원 6개) ── */
                      <>
                        <th className="py-2 px-2 border-r border-[#c2cfdf] w-[135px] min-w-[135px] text-center whitespace-nowrap">부양가족수</th>
                        <th className="py-2 px-2 border-r border-[#c2cfdf] w-[100px] min-w-[100px] text-center whitespace-nowrap">원천징수</th>
                        <th className="py-2 px-2 border-r border-[#c2cfdf] w-[115px] min-w-[115px] text-center whitespace-nowrap">본인부담금 공제</th>
                        <th className="py-2 px-2 border-r border-[#c2cfdf] w-[130px] min-w-[130px] text-center whitespace-nowrap">두루누리 지원</th>
                        <th className="py-2 px-2 border-r border-[#c2cfdf] w-[95px] min-w-[95px] text-center whitespace-nowrap">장기요양30%</th>
                        <th className="py-2 px-2 border-r border-[#c2cfdf] min-w-[190px] text-center whitespace-nowrap">계약기간</th>
                      </>
                    ) : hourlyTab === '일반시급' ? (
                      /* ── 탭 2: 일반시급 15개 컬럼 ── */
                      <>
                        <th className="py-2 px-2 border-r border-[#c2cfdf] w-[105px] min-w-[105px] text-right bg-[#fff7f4] text-[#ef5a27] whitespace-nowrap">기본급(h)</th>
                        <th className="py-2 px-2 border-r border-[#c2cfdf] w-[95px] min-w-[95px] text-right whitespace-nowrap">주휴수당(h)</th>
                        <th className="py-2 px-2 border-r border-[#c2cfdf] w-[90px] min-w-[90px] text-right whitespace-nowrap">연차수당(h)</th>
                        <th className="py-2 px-2 border-r-2 border-r-[#94a3b8] w-[90px] min-w-[90px] text-right bg-[#f1f5f9] whitespace-nowrap">기타수당(h)</th>
                        <th className="py-2 px-2 border-r border-[#c2cfdf] w-[95px] min-w-[95px] text-right whitespace-nowrap">장기근속수당</th>
                        <th className="py-2 px-2 border-r border-[#c2cfdf] w-[95px] min-w-[95px] text-right whitespace-nowrap">중증가산수당</th>
                        <th className="py-2 px-2 border-r border-[#c2cfdf] w-[105px] min-w-[105px] text-right whitespace-nowrap">보수교육비</th>
                        <th className="py-2 px-2 border-r border-[#c2cfdf] w-[105px] min-w-[105px] text-right whitespace-nowrap">원거리교통비</th>
                        <th className="py-2 px-2 border-r border-[#c2cfdf] w-[95px] min-w-[95px] text-right whitespace-nowrap">간호가산수당</th>
                        <th className="py-2 px-2 border-r border-[#c2cfdf] w-[85px] min-w-[85px] text-right whitespace-nowrap">식대</th>
                        <th className="py-2 px-2 border-r border-[#c2cfdf] w-[95px] min-w-[95px] text-right whitespace-nowrap">자가운전보조</th>
                        <th className="py-2 px-2 border-r border-[#c2cfdf] w-[85px] min-w-[85px] text-right whitespace-nowrap">교육비</th>
                        <th className="py-2 px-2 border-r border-[#c2cfdf] w-[95px] min-w-[95px] text-right whitespace-nowrap">농어촌특별</th>
                        <th className="py-2 px-2 border-r border-[#c2cfdf] w-[85px] min-w-[85px] text-right whitespace-nowrap">기타수당2</th>
                        <th className="py-2 px-2 border-r border-[#c2cfdf] w-[85px] min-w-[85px] text-right whitespace-nowrap">기타수당3</th>
                      </>
                    ) : (
                      /* ── 탭 3: 건별시급 12개 컬럼 ── */
                      <>
                        <th className="py-2 px-2 border-r border-[#c2cfdf] w-[115px] min-w-[115px] text-right bg-[#fff7f4] text-[#ef5a27] whitespace-nowrap">가족요양 60분</th>
                        <th className="py-2 px-2 border-r-2 border-r-[#94a3b8] w-[115px] min-w-[115px] text-right bg-[#fff7f4] text-[#ef5a27] whitespace-nowrap">가족요양 90분</th>
                        <th className="py-2 px-2 border-r-2 border-r-[#94a3b8] w-[130px] min-w-[130px] text-right whitespace-nowrap">종일요양(480분)</th>
                        <th className="py-2 px-2 border-r border-[#c2cfdf] w-[135px] min-w-[135px] text-right whitespace-nowrap">목욕 차량내 60분</th>
                        <th className="py-2 px-2 border-r border-[#c2cfdf] w-[135px] min-w-[135px] text-right whitespace-nowrap">목욕 차량내 40분</th>
                        <th className="py-2 px-2 border-r border-[#c2cfdf] w-[135px] min-w-[135px] text-right whitespace-nowrap">목욕 가정내 60분</th>
                        <th className="py-2 px-2 border-r border-[#c2cfdf] w-[135px] min-w-[135px] text-right whitespace-nowrap">목욕 가정내 40분</th>
                        <th className="py-2 px-2 border-r border-[#c2cfdf] w-[115px] min-w-[115px] text-right whitespace-nowrap">방문목욕 60분</th>
                        <th className="py-2 px-2 border-r-2 border-r-[#94a3b8] w-[115px] min-w-[115px] text-right whitespace-nowrap">방문목욕 40분</th>
                        <th className="py-2 px-2 border-r border-[#c2cfdf] w-[110px] min-w-[110px] text-right whitespace-nowrap">방문간호 15분</th>
                        <th className="py-2 px-2 border-r border-[#c2cfdf] w-[110px] min-w-[110px] text-right whitespace-nowrap">방문간호 30분</th>
                        <th className="py-2 px-2 border-r border-[#c2cfdf] w-[110px] min-w-[110px] text-right whitespace-nowrap">방문간호 60분</th>
                      </>
                    )}

                    {/* 액션 (계약삭제 / 계약등록 / 저장) */}
                    <th className="py-2 px-3 text-center w-[110px] min-w-[110px] max-w-[110px] sticky right-0 bg-[#f4f7fc] z-30 shadow-[inset_2px_0_0_#94a3b8,-3px_0_6px_rgba(0,0,0,0.06)] whitespace-nowrap">
                      계약관리
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#c2cfdf]">
                  {hourlyEmployees.map(emp => {
                    const profile = getEmpHourlyProfile(emp)
                    const isSelected = selectedHourlyIds.includes(emp.id)
                    const isContracted = profile.isContracted
                    const isIndividual = profile.calcSetting === '개별 설정'
                    const isRowEdited = !!profile.isEdited

                    return (
                      <tr
                        key={emp.id}
                        className={`transition-colors ${!isContracted
                          ? 'bg-[#fffaf0] hover:bg-[#fff6e5]' // 미계약자 전용 음영 배경
                          : isRowEdited
                            ? 'bg-[#f0f9ff]'
                            : isSelected
                              ? 'bg-[#f8fafc]'
                              : 'hover:bg-[#fcfdfe]'
                          }`}
                      >
                        {/* 1. 체크박스 */}
                        <td className={`py-2 px-2 text-center w-[40px] min-w-[40px] max-w-[40px] sticky left-0 z-10 shadow-[inset_-1px_0_0_#c2cfdf] ${!isContracted ? 'bg-[#fffaf0]' : 'bg-white'}`}>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleSelect(emp.id)}
                            className="cursor-pointer"
                          />
                        </td>

                        {/* 2. 종사자 정보 (이름 / 만나이 / 상태 / 직종 / 입사일, 퇴사일) */}
                        <td className={`py-1.5 px-3 w-[210px] min-w-[210px] max-w-[210px] sticky left-[40px] z-10 shadow-[inset_-1px_0_0_#c2cfdf] ${!isContracted ? 'bg-[#fffaf0]' : 'bg-white'}`}>
                          <div className="flex items-center gap-1.5 whitespace-nowrap overflow-hidden">
                            <span className="font-bold text-[#0e1225] text-[12.5px] truncate max-w-[85px]">{emp.name}</span>
                            <span className="text-[11px] text-[#64748b]">({emp.age}세)</span>
                            <span
                              className={`inline-block px-1.5 py-0.2 text-[10px] font-bold rounded-[3px] ${emp.status === '재직'
                                ? 'bg-[#e6f4ea] text-[#137333]'
                                : emp.status === '휴직'
                                  ? 'bg-[#fef7e0] text-[#b06000]'
                                  : 'bg-[#fce8e6] text-[#c5221f]'
                                }`}
                            >
                              {emp.status}
                            </span>
                            {!isContracted && (
                              <span className="px-1 py-0.2 rounded text-[10px] font-bold bg-[#ef5a27] text-white">
                                미계약
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-[#475569] mt-0.5 truncate">
                            <span className="font-semibold text-[#2a3461]">{emp.role}</span>
                            <span className="text-[#94a3b8] mx-1">|</span>
                            <span>{emp.hireDate} ~ {emp.leaveDate}</span>
                          </div>
                        </td>

                        {/* 3. 급여계약 설정 - 모든 탭에서 sticky 고정 및 굵은 우측 경계 구분선 */}
                        <td className={`py-1.5 px-2 text-center w-[140px] min-w-[140px] max-w-[140px] sticky left-[250px] z-10 shadow-[inset_-2px_0_0_#94a3b8,3px_0_6px_rgba(0,0,0,0.08)] ${!isContracted ? 'bg-[#fffaf0]' : 'bg-white'}`}>
                          <div className="flex items-center justify-center gap-2 text-[11px]">
                            <label className="flex items-center gap-1 cursor-pointer">
                              <input
                                type="radio"
                                name={`calcSetting-${emp.id}`}
                                checked={profile.calcSetting === '시설 기초설정'}
                                onChange={() => handleProfileChange(emp.id, 'calcSetting', '시설 기초설정')}
                              />
                              <span className={profile.calcSetting === '시설 기초설정' ? 'font-bold text-[#2a3461]' : 'text-[#64748b]'}>기초설정</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <input
                                type="radio"
                                name={`calcSetting-${emp.id}`}
                                checked={profile.calcSetting === '개별 설정'}
                                onChange={() => handleProfileChange(emp.id, 'calcSetting', '개별 설정')}
                              />
                              <span className={profile.calcSetting === '개별 설정' ? 'font-bold text-[#ef5a27]' : 'text-[#64748b]'}>개별설정</span>
                            </label>
                          </div>
                        </td>

                        {/* ── 탭별 동적 셀 ── */}
                        {hourlyTab === '기본설정' ? (
                          <>

                            {/* 5. 부양가족수: 총 N명 / 20세이하 N명 */}
                            <td className="py-1 px-1.5 text-center border-r border-[#c2cfdf] whitespace-nowrap">
                              <div className="flex items-center justify-center gap-1 text-[11px] whitespace-nowrap">
                                <span>총</span>
                                <input
                                  type="number"
                                  value={profile.dependentsTotal}
                                  onChange={e => handleProfileChange(emp.id, 'dependentsTotal', parseInt(e.target.value, 10) || 1)}
                                  className="w-[28px] h-[22px] text-center border rounded text-[11px] font-bold bg-white border-[#c2cfdf]"
                                />
                                <span className="text-[#64748b] text-[10.5px]">(20세↓</span>
                                <input
                                  type="number"
                                  value={profile.dependentsMinor}
                                  onChange={e => handleProfileChange(emp.id, 'dependentsMinor', parseInt(e.target.value, 10) || 0)}
                                  className="w-[28px] h-[22px] text-center border rounded text-[11px] font-bold bg-white border-[#c2cfdf]"
                                />
                                <span className="text-[#64748b] text-[10.5px]">)</span>
                              </div>
                            </td>

                            {/* 6. 원천징수 방식 */}
                            <td className="py-1 px-1.5 text-center border-r border-[#c2cfdf]">
                              <select
                                value={profile.taxMethod}
                                onChange={e => handleProfileChange(emp.id, 'taxMethod', e.target.value as any)}
                                className="h-[24px] px-1 text-[11px] font-semibold rounded border bg-white border-[#c2cfdf] text-[#0e1225]"
                              >
                                <option value="근로소득세">근로소득세</option>
                                <option value="사업소득세">사업소득세</option>
                              </select>
                            </td>

                            {/* 7. 본인부담금 공제 체크박스 */}
                            <td className="py-1 px-1.5 text-center border-r border-[#c2cfdf]">
                              <input
                                type="checkbox"
                                checked={profile.deductCopayment}
                                onChange={e => handleProfileChange(emp.id, 'deductCopayment', e.target.checked)}
                                className="cursor-pointer"
                              />
                            </td>

                            {/* 8. 두루누리 지원: 국민연금 / 건강보험 */}
                            <td className="py-1 px-1.5 text-center border-r border-[#c2cfdf]">
                              <div className="flex items-center justify-center gap-1.5 text-[11px]">
                                <label className="flex items-center gap-0.5 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={profile.dourunuriNationalPension}
                                    onChange={e => handleProfileChange(emp.id, 'dourunuriNationalPension', e.target.checked)}
                                  />
                                  <span>연금</span>
                                </label>
                                <label className="flex items-center gap-0.5 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={profile.dourunuriHealthInsurance}
                                    onChange={e => handleProfileChange(emp.id, 'dourunuriHealthInsurance', e.target.checked)}
                                  />
                                  <span>건강</span>
                                </label>
                              </div>
                            </td>

                            {/* 9. 장기요양보험 30%적용 */}
                            <td className="py-1 px-1.5 text-center border-r border-[#c2cfdf]">
                              <select
                                value={profile.longTermCare30Discount}
                                onChange={e => handleProfileChange(emp.id, 'longTermCare30Discount', e.target.value as any)}
                                className="h-[24px] px-1 text-[11px] font-semibold rounded border bg-white border-[#c2cfdf]"
                              >
                                <option value="사용">사용</option>
                                <option value="미사용">미사용</option>
                              </select>
                            </td>

                            {/* 10. 계약기간 */}
                            <td className="py-1 px-1.5 border-r border-[#c2cfdf]">
                              <input
                                type="text"
                                value={profile.period}
                                onChange={e => handleProfileChange(emp.id, 'period', e.target.value)}
                                className="w-full h-[24px] px-1 text-[12px] font-medium rounded bg-white border border-[#c2cfdf] text-[#0e1225]"
                              />
                            </td>
                          </>
                        ) : hourlyTab === '일반시급' ? (
                          <>

                            {/* 1. 기본급 */}
                            <td className="py-1 px-1.5 text-right border-r border-[#c2cfdf] bg-[#fffbf8]">
                              <input
                                type="text"
                                disabled={!isIndividual}
                                value={profile.general.baseWage.toLocaleString()}
                                onChange={e => {
                                  const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0
                                  handleGeneralItemChange(emp.id, 'baseWage', val)
                                }}
                                className={`w-full h-[24px] px-1 text-right text-[11.5px] font-bold rounded ${isIndividual ? 'bg-white border border-[#ef5a27] text-[#ef5a27]' : 'bg-transparent text-[#64748b]'}`}
                              />
                            </td>
                            {/* 2. 주휴수당 */}
                            <td className="py-1 px-1.5 text-right border-r border-[#c2cfdf]">
                              <input
                                type="text"
                                disabled={!isIndividual}
                                value={profile.general.weeklyHolidayAllowance.toLocaleString()}
                                onChange={e => {
                                  const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0
                                  handleGeneralItemChange(emp.id, 'weeklyHolidayAllowance', val)
                                }}
                                className={`w-full h-[24px] px-1 text-right text-[11.5px] font-semibold rounded ${isIndividual ? 'bg-white border border-[#c2cfdf] text-[#0e1225]' : 'bg-transparent text-[#64748b]'}`}
                              />
                            </td>
                            {/* 3. 연차수당 */}
                            <td className="py-1 px-1.5 text-right border-r border-[#c2cfdf]">
                              <input
                                type="text"
                                disabled={!isIndividual}
                                value={profile.general.annualLeaveAllowance.toLocaleString()}
                                onChange={e => {
                                  const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0
                                  handleGeneralItemChange(emp.id, 'annualLeaveAllowance', val)
                                }}
                                className={`w-full h-[24px] px-1 text-right text-[11.5px] rounded ${isIndividual ? 'bg-white border border-[#c2cfdf] text-[#0e1225]' : 'bg-transparent text-[#64748b]'}`}
                              />
                            </td>
                            {/* 4. 기타수당1 (4대 시간당 기본항목 경계) */}
                            <td className="py-1 px-1.5 text-right border-r-2 border-r-[#94a3b8] bg-[#f8fafc]">
                              <input
                                type="text"
                                disabled={!isIndividual}
                                value={profile.general.otherAllowance1.toLocaleString()}
                                onChange={e => {
                                  const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0
                                  handleGeneralItemChange(emp.id, 'otherAllowance1', val)
                                }}
                                className={`w-full h-[24px] px-1 text-right text-[11.5px] rounded ${isIndividual ? 'bg-white border border-[#c2cfdf] text-[#0e1225]' : 'bg-transparent text-[#64748b]'}`}
                              />
                            </td>
                            {/* 5. 장기근속수당 */}
                            <td className="py-1 px-1.5 text-right border-r border-[#c2cfdf]">
                              <input
                                type="text"
                                disabled={!isIndividual}
                                value={profile.general.longServiceAllowance.toLocaleString()}
                                onChange={e => {
                                  const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0
                                  handleGeneralItemChange(emp.id, 'longServiceAllowance', val)
                                }}
                                className={`w-full h-[24px] px-1 text-right text-[11.5px] rounded ${isIndividual ? 'bg-white border border-[#c2cfdf] text-[#0e1225]' : 'bg-transparent text-[#64748b]'}`}
                              />
                            </td>
                            {/* 6. 중증가산수당 */}
                            <td className="py-1 px-1.5 text-right border-r border-[#c2cfdf]">
                              <input
                                type="text"
                                disabled={!isIndividual}
                                value={profile.general.severeCareAllowance.toLocaleString()}
                                onChange={e => {
                                  const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0
                                  handleGeneralItemChange(emp.id, 'severeCareAllowance', val)
                                }}
                                className={`w-full h-[24px] px-1 text-right text-[11.5px] rounded ${isIndividual ? 'bg-white border border-[#c2cfdf] text-[#0e1225]' : 'bg-transparent text-[#64748b]'}`}
                              />
                            </td>
                            {/* 7. 요양보호사 보수교육비 */}
                            <td className="py-1 px-1.5 text-right border-r border-[#c2cfdf]">
                              <input
                                type="text"
                                disabled={!isIndividual}
                                value={profile.general.refresherTrainingFee.toLocaleString()}
                                onChange={e => {
                                  const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0
                                  handleGeneralItemChange(emp.id, 'refresherTrainingFee', val)
                                }}
                                className={`w-full h-[24px] px-1 text-right text-[11.5px] rounded ${isIndividual ? 'bg-white border border-[#c2cfdf] text-[#0e1225]' : 'bg-transparent text-[#64748b]'}`}
                              />
                            </td>
                            {/* 8. 원거리교통비 가산수당 */}
                            <td className="py-1 px-1.5 text-right border-r border-[#c2cfdf]">
                              <input
                                type="text"
                                disabled={!isIndividual}
                                value={profile.general.remoteTransportAllowance.toLocaleString()}
                                onChange={e => {
                                  const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0
                                  handleGeneralItemChange(emp.id, 'remoteTransportAllowance', val)
                                }}
                                className={`w-full h-[24px] px-1 text-right text-[11.5px] rounded ${isIndividual ? 'bg-white border border-[#c2cfdf] text-[#0e1225]' : 'bg-transparent text-[#64748b]'}`}
                              />
                            </td>
                            {/* 9. 간호가산수당 */}
                            <td className="py-1 px-1.5 text-right border-r border-[#c2cfdf]">
                              <input
                                type="text"
                                disabled={!isIndividual}
                                value={profile.general.nurseAddAllowance.toLocaleString()}
                                onChange={e => {
                                  const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0
                                  handleGeneralItemChange(emp.id, 'nurseAddAllowance', val)
                                }}
                                className={`w-full h-[24px] px-1 text-right text-[11.5px] rounded ${isIndividual ? 'bg-white border border-[#c2cfdf] text-[#0e1225]' : 'bg-transparent text-[#64748b]'}`}
                              />
                            </td>
                            {/* 10. 식대 */}
                            <td className="py-1 px-1.5 text-right border-r border-[#c2cfdf]">
                              <input
                                type="text"
                                disabled={!isIndividual}
                                value={profile.general.mealAllowance.toLocaleString()}
                                onChange={e => {
                                  const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0
                                  handleGeneralItemChange(emp.id, 'mealAllowance', val)
                                }}
                                className={`w-full h-[24px] px-1 text-right text-[11.5px] rounded ${isIndividual ? 'bg-white border border-[#c2cfdf] text-[#0e1225]' : 'bg-transparent text-[#64748b]'}`}
                              />
                            </td>
                            {/* 11. 자가운전보조금 */}
                            <td className="py-1 px-1.5 text-right border-r border-[#c2cfdf]">
                              <input
                                type="text"
                                disabled={!isIndividual}
                                value={profile.general.carAllowance.toLocaleString()}
                                onChange={e => {
                                  const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0
                                  handleGeneralItemChange(emp.id, 'carAllowance', val)
                                }}
                                className={`w-full h-[24px] px-1 text-right text-[11.5px] rounded ${isIndividual ? 'bg-white border border-[#c2cfdf] text-[#0e1225]' : 'bg-transparent text-[#64748b]'}`}
                              />
                            </td>
                            {/* 12. 교육비 */}
                            <td className="py-1 px-1.5 text-right border-r border-[#c2cfdf]">
                              <input
                                type="text"
                                disabled={!isIndividual}
                                value={profile.general.educationAllowance.toLocaleString()}
                                onChange={e => {
                                  const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0
                                  handleGeneralItemChange(emp.id, 'educationAllowance', val)
                                }}
                                className={`w-full h-[24px] px-1 text-right text-[11.5px] rounded ${isIndividual ? 'bg-white border border-[#c2cfdf] text-[#0e1225]' : 'bg-transparent text-[#64748b]'}`}
                              />
                            </td>
                            {/* 13. 농어촌특별수당 */}
                            <td className="py-1 px-1.5 text-right border-r border-[#c2cfdf]">
                              <input
                                type="text"
                                disabled={!isIndividual}
                                value={profile.general.ruralSpecialAllowance.toLocaleString()}
                                onChange={e => {
                                  const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0
                                  handleGeneralItemChange(emp.id, 'ruralSpecialAllowance', val)
                                }}
                                className={`w-full h-[24px] px-1 text-right text-[11.5px] rounded ${isIndividual ? 'bg-white border border-[#c2cfdf] text-[#0e1225]' : 'bg-transparent text-[#64748b]'}`}
                              />
                            </td>
                            {/* 14. 기타수당2 */}
                            <td className="py-1 px-1.5 text-right border-r border-[#c2cfdf]">
                              <input
                                type="text"
                                disabled={!isIndividual}
                                value={profile.general.otherAllowance2.toLocaleString()}
                                onChange={e => {
                                  const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0
                                  handleGeneralItemChange(emp.id, 'otherAllowance2', val)
                                }}
                                className={`w-full h-[24px] px-1 text-right text-[11.5px] rounded ${isIndividual ? 'bg-white border border-[#c2cfdf] text-[#0e1225]' : 'bg-transparent text-[#64748b]'}`}
                              />
                            </td>
                            {/* 15. 기타수당3 */}
                            <td className="py-1 px-1.5 text-right border-r border-[#c2cfdf]">
                              <input
                                type="text"
                                disabled={!isIndividual}
                                value={profile.general.otherAllowance3.toLocaleString()}
                                onChange={e => {
                                  const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0
                                  handleGeneralItemChange(emp.id, 'otherAllowance3', val)
                                }}
                                className={`w-full h-[24px] px-1 text-right text-[11.5px] rounded ${isIndividual ? 'bg-white border border-[#c2cfdf] text-[#0e1225]' : 'bg-transparent text-[#64748b]'}`}
                              />
                            </td>
                          </>
                        ) : (
                          /* ── 탭 B: 건별시급 12개 항목 셀 ── */
                          <>
                            {/* 1. 가족요양 60분 */}
                            <td className="py-1 px-1.5 text-right border-r border-[#c2cfdf] bg-[#fffbf8]">
                              <input
                                type="text"
                                disabled={!isIndividual}
                                value={profile.cases.familyCare60m.toLocaleString()}
                                onChange={e => {
                                  const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0
                                  handleCaseItemChange(emp.id, 'familyCare60m', val)
                                }}
                                className={`w-full h-[24px] px-1 text-right text-[11.5px] font-bold rounded ${isIndividual ? 'bg-white border border-[#ef5a27] text-[#ef5a27]' : 'bg-transparent text-[#64748b]'}`}
                              />
                            </td>
                            {/* 2. 가족요양 90분 (가족요양 그룹 경계) */}
                            <td className="py-1 px-1.5 text-right border-r-2 border-r-[#94a3b8] bg-[#fffbf8]">
                              <input
                                type="text"
                                disabled={!isIndividual}
                                value={profile.cases.familyCare90m.toLocaleString()}
                                onChange={e => {
                                  const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0
                                  handleCaseItemChange(emp.id, 'familyCare90m', val)
                                }}
                                className={`w-full h-[24px] px-1 text-right text-[11.5px] font-bold rounded ${isIndividual ? 'bg-white border border-[#ef5a27] text-[#ef5a27]' : 'bg-transparent text-[#64748b]'}`}
                              />
                            </td>
                            {/* 3. 종일방문요양 12~24시간 미만 (종일요양 경계) */}
                            <td className="py-1 px-1.5 text-right border-r-2 border-r-[#94a3b8]">
                              <input
                                type="text"
                                disabled={!isIndividual}
                                value={profile.cases.allDayCare12to24.toLocaleString()}
                                onChange={e => {
                                  const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0
                                  handleCaseItemChange(emp.id, 'allDayCare12to24', val)
                                }}
                                className={`w-full h-[24px] px-1 text-right text-[11.5px] rounded ${isIndividual ? 'bg-white border border-[#c2cfdf] text-[#0e1225]' : 'bg-transparent text-[#64748b]'}`}
                              />
                            </td>
                            {/* 4. 목욕 차량이용 차량내 60분 */}
                            <td className="py-1 px-1.5 text-right border-r border-[#c2cfdf]">
                              <input
                                type="text"
                                disabled={!isIndividual}
                                value={profile.cases.bathCarIn60m.toLocaleString()}
                                onChange={e => {
                                  const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0
                                  handleCaseItemChange(emp.id, 'bathCarIn60m', val)
                                }}
                                className={`w-full h-[24px] px-1 text-right text-[11.5px] rounded ${isIndividual ? 'bg-white border border-[#c2cfdf] text-[#0e1225]' : 'bg-transparent text-[#64748b]'}`}
                              />
                            </td>
                            {/* 5. 목욕 차량이용 차량내 40분 */}
                            <td className="py-1 px-1.5 text-right border-r border-[#c2cfdf]">
                              <input
                                type="text"
                                disabled={!isIndividual}
                                value={profile.cases.bathCarIn40m.toLocaleString()}
                                onChange={e => {
                                  const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0
                                  handleCaseItemChange(emp.id, 'bathCarIn40m', val)
                                }}
                                className={`w-full h-[24px] px-1 text-right text-[11.5px] rounded ${isIndividual ? 'bg-white border border-[#c2cfdf] text-[#0e1225]' : 'bg-transparent text-[#64748b]'}`}
                              />
                            </td>
                            {/* 6. 목욕 차량이용 가정내 60분 */}
                            <td className="py-1 px-1.5 text-right border-r border-[#c2cfdf]">
                              <input
                                type="text"
                                disabled={!isIndividual}
                                value={profile.cases.bathCarHome60m.toLocaleString()}
                                onChange={e => {
                                  const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0
                                  handleCaseItemChange(emp.id, 'bathCarHome60m', val)
                                }}
                                className={`w-full h-[24px] px-1 text-right text-[11.5px] rounded ${isIndividual ? 'bg-white border border-[#c2cfdf] text-[#0e1225]' : 'bg-transparent text-[#64748b]'}`}
                              />
                            </td>
                            {/* 7. 목욕 차량이용 가정내 40분 */}
                            <td className="py-1 px-1.5 text-right border-r border-[#c2cfdf]">
                              <input
                                type="text"
                                disabled={!isIndividual}
                                value={profile.cases.bathCarHome40m.toLocaleString()}
                                onChange={e => {
                                  const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0
                                  handleCaseItemChange(emp.id, 'bathCarHome40m', val)
                                }}
                                className={`w-full h-[24px] px-1 text-right text-[11.5px] rounded ${isIndividual ? 'bg-white border border-[#c2cfdf] text-[#0e1225]' : 'bg-transparent text-[#64748b]'}`}
                              />
                            </td>
                            {/* 8. 방문목욕 60분 */}
                            <td className="py-1 px-1.5 text-right border-r border-[#c2cfdf]">
                              <input
                                type="text"
                                disabled={!isIndividual}
                                value={profile.cases.bathNormal60m.toLocaleString()}
                                onChange={e => {
                                  const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0
                                  handleCaseItemChange(emp.id, 'bathNormal60m', val)
                                }}
                                className={`w-full h-[24px] px-1 text-right text-[11.5px] rounded ${isIndividual ? 'bg-white border border-[#c2cfdf] text-[#0e1225]' : 'bg-transparent text-[#64748b]'}`}
                              />
                            </td>
                            {/* 9. 방문목욕 40분 (목욕 그룹 경계) */}
                            <td className="py-1 px-1.5 text-right border-r-2 border-r-[#94a3b8]">
                              <input
                                type="text"
                                disabled={!isIndividual}
                                value={profile.cases.bathNormal40m.toLocaleString()}
                                onChange={e => {
                                  const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0
                                  handleCaseItemChange(emp.id, 'bathNormal40m', val)
                                }}
                                className={`w-full h-[24px] px-1 text-right text-[11.5px] rounded ${isIndividual ? 'bg-white border border-[#c2cfdf] text-[#0e1225]' : 'bg-transparent text-[#64748b]'}`}
                              />
                            </td>
                            {/* 10. 방문간호 15분 */}
                            <td className="py-1 px-1.5 text-right border-r border-[#c2cfdf]">
                              <input
                                type="text"
                                disabled={!isIndividual}
                                value={profile.cases.nurseVisit15m.toLocaleString()}
                                onChange={e => {
                                  const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0
                                  handleCaseItemChange(emp.id, 'nurseVisit15m', val)
                                }}
                                className={`w-full h-[24px] px-1 text-right text-[11.5px] rounded ${isIndividual ? 'bg-white border border-[#c2cfdf] text-[#0e1225]' : 'bg-transparent text-[#64748b]'}`}
                              />
                            </td>
                            {/* 11. 방문간호 30분 */}
                            <td className="py-1 px-1.5 text-right border-r border-[#c2cfdf]">
                              <input
                                type="text"
                                disabled={!isIndividual}
                                value={profile.cases.nurseVisit30m.toLocaleString()}
                                onChange={e => {
                                  const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0
                                  handleCaseItemChange(emp.id, 'nurseVisit30m', val)
                                }}
                                className={`w-full h-[24px] px-1 text-right text-[11.5px] rounded ${isIndividual ? 'bg-white border border-[#c2cfdf] text-[#0e1225]' : 'bg-transparent text-[#64748b]'}`}
                              />
                            </td>
                            {/* 12. 방문간호 60분 */}
                            <td className="py-1 px-1.5 text-right border-r border-[#c2cfdf]">
                              <input
                                type="text"
                                disabled={!isIndividual}
                                value={profile.cases.nurseVisit60m.toLocaleString()}
                                onChange={e => {
                                  const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0
                                  handleCaseItemChange(emp.id, 'nurseVisit60m', val)
                                }}
                                className={`w-full h-[24px] px-1 text-right text-[11.5px] rounded ${isIndividual ? 'bg-white border border-[#c2cfdf] text-[#0e1225]' : 'bg-transparent text-[#64748b]'}`}
                              />
                            </td>
                          </>
                        )}

                        {/* 10. 계약 관리 액션 버튼: 계약삭제 / 계약등록 / 저장 */}
                        <td className={`py-1 px-2 text-center w-[110px] min-w-[110px] max-w-[110px] sticky right-0 z-10 shadow-[inset_2px_0_0_#94a3b8,-3px_0_6px_rgba(0,0,0,0.06)] ${!isContracted ? 'bg-[#fffaf0]' : 'bg-white'}`}>
                          <div className="flex items-center justify-center gap-1">
                            {isContracted ? (
                              <>
                                {isRowEdited ? (
                                  <button
                                    onClick={() => handleSaveSingleRow(emp.id)}
                                    className="px-2 py-0.5 bg-[#2a3461] hover:bg-[#364275] text-white text-[11px] font-bold rounded cursor-pointer"
                                  >
                                    저장
                                  </button>
                                ) : (
                                  <span className="text-[#94a3b8] text-[11px]">정상</span>
                                )}
                                <button
                                  onClick={() => handleDeleteContract(emp.id)}
                                  className="px-1.5 py-0.5 bg-white hover:bg-[#fff5f5] text-[#c5221f] border border-[#f5c2c7] text-[10.5px] font-bold rounded cursor-pointer transition-colors"
                                  title="계약 삭제 (미계약 상태로 전환)"
                                >
                                  계약삭제
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => handleRegisterContract(emp.id)}
                                className="px-2 py-1 bg-[#ef5a27] hover:bg-[#d84a1c] text-white text-[11px] font-bold rounded cursor-pointer shadow-2xs whitespace-nowrap"
                              >
                                계약등록
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* 3. 하단 요약 통계 및 전체 일괄 저장 푸터 바 */}
            <div className="p-3 bg-[#f8fafc] border-t border-[#c2cfdf] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-4 text-[12.5px] text-[#334155]">
                <div>시급제 총원: <strong className="text-[#0e1225] font-bold">{hourlyEmployees.length}명</strong></div>
                <div className="h-[12px] w-[1px] bg-[#c2cfdf]" />
                <div>계약 완료: <strong className="text-[#137333] font-bold">{contractedCount}명</strong></div>
                <div className="h-[12px] w-[1px] bg-[#c2cfdf]" />
                <div>미계약: <strong className="text-[#ef5a27] font-bold">{uncontractedCount}명</strong></div>
                <div className="h-[12px] w-[1px] bg-[#c2cfdf]" />
                <div>선택 인원: <strong className="text-[#2a3461] font-bold">{selectedHourlyIds.length}명</strong></div>
                <div className="h-[12px] w-[1px] bg-[#c2cfdf]" />
                <div>평균 기본시급: <strong className="text-[#2a3461] font-bold">{avgHourlyWage.toLocaleString()} 원</strong></div>
              </div>

              <div className="flex items-center gap-2">
                {Object.keys(editedHourlyMap).length > 0 && (
                  <button
                    onClick={() => {
                      if (window.confirm('입력 및 수정한 모든 변경사항을 취소하시겠습니까?')) {
                        setEditedHourlyMap({})
                      }
                    }}
                    className="h-[32px] px-3 rounded-[4px] border border-[#c2cfdf] bg-white hover:bg-[#f4f7fc] text-[#64748b] text-[12px] font-semibold transition-colors cursor-pointer"
                  >
                    변경 취소
                  </button>
                )}

                <button
                  onClick={handleSaveAllEdited}
                  disabled={Object.keys(editedHourlyMap).length === 0}
                  className={`h-[32px] px-4 rounded-[4px] font-bold text-[12.5px] flex items-center gap-1.5 transition-colors shadow-xs ${Object.keys(editedHourlyMap).length > 0
                    ? 'bg-[#2a3461] hover:bg-[#364275] text-white cursor-pointer'
                    : 'bg-[#cbd5e1] text-[#64748b] cursor-not-allowed'
                    }`}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                    <polyline points="17 21 17 13 7 13 7 21"></polyline>
                    <polyline points="7 3 7 8 15 8"></polyline>
                  </svg>
                  변경사항 전체 일괄 저장 ({Object.keys(editedHourlyMap).length}건)
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ────────────────────────────────────────────────────────────────────── */
        /* 뷰 B: [종사자별 급여계약 상세] (피그마 1290-78508 원본 뷰)                */
        /* ────────────────────────────────────────────────────────────────────── */
        <div className="flex-1 flex p-3 gap-3 overflow-hidden">
          {/* 좌측 컬럼: 종사자 목록 및 필터 */}
          <div className="w-[380px] lg:w-[420px] flex flex-col bg-white border border-[#c2cfdf] rounded-[6px] overflow-hidden shrink-0 shadow-2xs">
            <div className="p-3 border-b border-[#c2cfdf] bg-[#fafbfc]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] font-bold text-[#0e1225]">종사자 검색 및 필터</span>
                <span className="text-[11.5px] text-[#64748b]">총 {filteredEmployees.length}명</span>
              </div>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="종사자 이름 검색"
                  value={nameKeyword}
                  onChange={e => setNameKeyword(e.target.value)}
                  className="flex-1 h-[28px] px-2 bg-white border border-[#c2cfdf] rounded text-[12px]"
                />
                <select
                  value={roleFilter}
                  onChange={e => setRoleFilter(e.target.value)}
                  className="h-[28px] px-1.5 bg-white border border-[#c2cfdf] rounded text-[12px]"
                >
                  <option value="전체">전체 직종</option>
                  <option value="요양보호사">요양보호사</option>
                  <option value="간호사">간호사</option>
                  <option value="사회복지사">사회복지사</option>
                </select>
              </div>
            </div>

            <div className="flex-1 overflow-auto divide-y divide-[#edf2f7]">
              {filteredEmployees.map(emp => {
                const isCur = emp.id === selectedId
                return (
                  <div
                    key={emp.id}
                    onClick={() => setSelectedId(emp.id)}
                    className={`p-3 cursor-pointer transition-colors ${isCur ? 'bg-[#eef2f7] border-l-4 border-[#2a3461]' : 'hover:bg-[#f8fafc]'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[13px] text-[#0e1225]">{emp.name}</span>
                        <span className="text-[11px] text-[#64748b]">({emp.age}세)</span>
                        <span className="text-[10.5px] px-1.5 py-0.2 rounded font-semibold bg-[#eef1f8] text-[#2a3461]">
                          {emp.salaryType}
                        </span>
                      </div>
                      <span className={`text-[10.5px] px-1.5 py-0.2 rounded font-bold ${emp.status === '재직' ? 'bg-[#e6f4ea] text-[#137333]' : 'bg-[#fce8e6] text-[#c5221f]'}`}>
                        {emp.status}
                      </span>
                    </div>
                    <div className="text-[11.5px] text-[#64748b] mt-1">
                      {emp.role} | 입사: {emp.hireDate}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 우측 컬럼: 종사자 급여계약 상세 프로필 */}
          <div className="flex-1 bg-white border border-[#c2cfdf] rounded-[6px] overflow-auto p-4 flex flex-col gap-4 shadow-2xs">
            <div className="flex items-center justify-between border-b border-[#c2cfdf] pb-3">
              <div>
                <h2 className="text-[16px] font-bold text-[#0e1225] flex items-center gap-2">
                  <span>{selectedEmp.name} 종사자 급여계약 상세</span>
                  <span className="text-[12px] px-2 py-0.5 rounded font-bold bg-[#ef5a27] text-white">{selectedEmp.salaryType}</span>
                </h2>
                <div className="text-[12px] text-[#64748b] mt-0.5">
                  직종: {selectedEmp.role} | 생년월일: {selectedEmp.dob} | 입사일: {selectedEmp.hireDate}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEditModal()}
                  className="px-3.5 py-1.5 bg-[#2a3461] hover:bg-[#364275] text-white text-[12px] font-bold rounded-[4px] cursor-pointer"
                >
                  급여 계약서 수정
                </button>
              </div>
            </div>

            {/* 기본 계약 정보 카드 */}
            <div className="p-3 bg-[#f8fafc] border border-[#c2cfdf] rounded-[4px] grid grid-cols-2 md:grid-cols-4 gap-3 text-[12.5px]">
              <div>
                <span className="text-[#64748b] block text-[11.5px]">계약 기간</span>
                <strong className="text-[#0e1225]">{selectedEmp.currentContract.period}</strong>
              </div>
              <div>
                <span className="text-[#64748b] block text-[11.5px]">원천징수 방식</span>
                <strong className="text-[#2a3461]">{selectedEmp.currentContract.taxMethod}</strong>
              </div>
              <div>
                <span className="text-[#64748b] block text-[11.5px]">부양가족수</span>
                <strong className="text-[#0e1225]">총 {selectedEmp.currentContract.dependentsTotal}명 (20세 이하 {selectedEmp.currentContract.dependentsMinor}명)</strong>
              </div>
              <div>
                <span className="text-[#64748b] block text-[11.5px]">약정 기본시급</span>
                <strong className="text-[#ef5a27]">{selectedEmp.currentContract.regularHourlyWage?.toLocaleString()} 원</strong>
              </div>
            </div>

            {/* 계약 이력 테이블 */}
            <div className="mt-2">
              <div className="text-[13.5px] font-bold text-[#0e1225] mb-2">급여 계약 이력</div>
              <table className="w-full text-left border-collapse text-[12px]">
                <thead className="bg-[#f4f7fc] text-[#475569] font-bold border-b border-[#c2cfdf]">
                  <tr>
                    <th className="py-2 px-3 border-r border-[#c2cfdf] w-[50px] text-center">No</th>
                    <th className="py-2 px-3 border-r border-[#c2cfdf]">계약기간</th>
                    <th className="py-2 px-3 border-r border-[#c2cfdf] w-[100px]">구분</th>
                    <th className="py-2 px-3 border-r border-[#c2cfdf] text-right">계약금액(시급)</th>
                    <th className="py-2 px-3 border-r border-[#c2cfdf]">등록일시</th>
                    <th className="py-2 px-3">비고</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#edf2f7]">
                  {selectedEmp.history.map(item => (
                    <tr key={item.id} className="hover:bg-[#f8fafc]">
                      <td className="py-2 px-3 text-center border-r border-[#c2cfdf]">{item.no}</td>
                      <td className="py-2 px-3 font-semibold border-r border-[#c2cfdf]">{item.period}</td>
                      <td className="py-2 px-3 border-r border-[#c2cfdf]">{item.contractType}</td>
                      <td className="py-2 px-3 text-right font-bold text-[#2a3461] border-r border-[#c2cfdf]">{item.amount.toLocaleString()} 원</td>
                      <td className="py-2 px-3 text-[#64748b] border-r border-[#c2cfdf]">{item.createdAt}</td>
                      <td className="py-2 px-3 text-[#64748b]">{item.note || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── 개별 급여계약서 수정 모달 ── */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[8px] w-[550px] max-w-full shadow-xl overflow-hidden flex flex-col">
            <div className="px-4 py-3 bg-[#2a3461] text-white font-bold text-[14px] flex items-center justify-between">
              <span>급여 계약서 상세 수정</span>
              <button onClick={() => setIsModalOpen(false)} className="text-white hover:text-[#ef5a27] cursor-pointer">✕</button>
            </div>
            <div className="p-4 flex flex-col gap-3 text-[12.5px]">
              <div>
                <label className="text-[11.5px] font-bold text-[#475569] block mb-1">계약 기간</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={modalForm.periodStart}
                    onChange={e => setModalForm(prev => ({ ...prev, periodStart: e.target.value }))}
                    className="flex-1 h-[30px] px-2 border border-[#c2cfdf] rounded text-[12px]"
                  />
                  <span>~</span>
                  <input
                    type="text"
                    value={modalForm.periodEnd}
                    onChange={e => setModalForm(prev => ({ ...prev, periodEnd: e.target.value }))}
                    className="flex-1 h-[30px] px-2 border border-[#c2cfdf] rounded text-[12px]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11.5px] font-bold text-[#475569] block mb-1">급여 형태</label>
                  <select
                    value={modalForm.salaryType}
                    onChange={e => setModalForm(prev => ({ ...prev, salaryType: e.target.value as any }))}
                    className="w-full h-[30px] px-2 border border-[#c2cfdf] rounded text-[12px]"
                  >
                    <option value="월급제">월급제</option>
                    <option value="방문급여">방문급여 (시급제)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11.5px] font-bold text-[#475569] block mb-1">원천징수 방식</label>
                  <select
                    value={modalForm.taxMethod}
                    onChange={e => setModalForm(prev => ({ ...prev, taxMethod: e.target.value as any }))}
                    className="w-full h-[30px] px-2 border border-[#c2cfdf] rounded text-[12px]"
                  >
                    <option value="근로소득세">근로소득세</option>
                    <option value="사업소득세">사업소득세</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-3 bg-[#f8fafc] border-t border-[#c2cfdf] flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-3 py-1.5 border border-[#c2cfdf] bg-white rounded text-[12px] font-semibold cursor-pointer"
              >
                닫기
              </button>
              <button
                onClick={() => {
                  alert('급여 계약서가 저장되었습니다.')
                  setIsModalOpen(false)
                }}
                className="px-4 py-1.5 bg-[#2a3461] hover:bg-[#364275] text-white rounded text-[12px] font-bold cursor-pointer"
              >
                저장 확정
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 👥 신규 시급제(방문급여) 종사자 다중 선택 추가 모달 ── */}
      {isAddEmpModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[10px] w-[780px] max-w-full shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in duration-150">
            {/* 1. 모달 헤더 */}
            <div className="px-5 py-3.5 bg-[#2a3461] text-white font-bold text-[14.5px] flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2">
                <span className="size-[8px] rounded-full bg-[#ef5a27]" />
                <span>신규 시급제(방문급여) 종사자 선택 추가</span>
                <span className="text-[11.5px] font-normal text-white/80 bg-white/15 px-2 py-0.5 rounded">
                  다중 선택 가능
                </span>
              </div>
              <button
                onClick={() => setIsAddEmpModalOpen(false)}
                className="text-white/80 hover:text-white text-[16px] transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* 2. 상단 검색 및 직종 필터 바 */}
            <div className="p-3.5 bg-[#f8fafc] border-b border-[#c2cfdf] flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2 flex-1 min-w-[280px]">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="종사자 이름 검색..."
                    value={modalSearchKeyword}
                    onChange={e => setModalSearchKeyword(e.target.value)}
                    className="w-full h-[32px] pl-8 pr-3 bg-white border border-[#c2cfdf] rounded-[4px] text-[12.5px] focus:outline-none focus:border-[#2a3461]"
                  />
                  <svg className="absolute left-2.5 top-[9px] text-[#94a3b8]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>

                <select
                  value={modalRoleFilter}
                  onChange={e => setModalRoleFilter(e.target.value)}
                  className="h-[32px] px-2.5 bg-white border border-[#c2cfdf] rounded-[4px] text-[12.5px] font-semibold text-[#0e1225] focus:outline-none focus:border-[#2a3461]"
                >
                  <option value="전체">전체 직종</option>
                  <option value="요양보호사">요양보호사</option>
                  <option value="사회복지사">사회복지사</option>
                  <option value="간호사">간호사</option>
                  <option value="물리치료사">물리치료사</option>
                  <option value="조리원">조리원</option>
                </select>
              </div>

              <label className="flex items-center gap-1.5 text-[12px] text-[#475569] font-semibold cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={modalOnlyUncontracted}
                  onChange={e => setModalOnlyUncontracted(e.target.checked)}
                  className="cursor-pointer"
                />
                <span>미계약 종사자만 표시</span>
              </label>
            </div>

            {/* 3. 종사자 선택 테이블 목록 */}
            <div className="flex-1 overflow-y-auto max-h-[380px]">
              <table className="w-full text-left border-collapse text-[12px]">
                <thead className="bg-[#f4f7fc] text-[#283445] font-bold border-b border-[#c2cfdf] sticky top-0 z-10">
                  <tr>
                    <th className="py-2 px-3 w-[45px] text-center border-r border-[#c2cfdf]">
                      <input
                        type="checkbox"
                        checked={selectedModalEmpIds.length === modalFilteredEmployees.length && modalFilteredEmployees.length > 0}
                        onChange={handleToggleSelectAllModal}
                        className="cursor-pointer"
                      />
                    </th>
                    <th className="py-2 px-3 border-r border-[#c2cfdf]">종사자명 (나이)</th>
                    <th className="py-2 px-3 border-r border-[#c2cfdf]">직종</th>
                    <th className="py-2 px-3 border-r border-[#c2cfdf]">입사일 ~ 퇴사일</th>
                    <th className="py-2 px-3 border-r border-[#c2cfdf] text-center">재직상태</th>
                    <th className="py-2 px-3 text-center">현재 급여형태</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#edf2f7]">
                  {modalFilteredEmployees.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-[#94a3b8] text-[13px]">
                        추가 가능한 대상 종사자가 없습니다. (모든 시급제 계약이 완료되었거나 검색 조건 불일치)
                      </td>
                    </tr>
                  ) : (
                    modalFilteredEmployees.map(emp => {
                      const isSelected = selectedModalEmpIds.includes(emp.id)

                      return (
                        <tr
                          key={emp.id}
                          onClick={() => handleToggleSelectModalEmp(emp.id)}
                          className={`cursor-pointer transition-colors ${isSelected
                            ? 'bg-[#eef4ff]'
                            : 'hover:bg-[#f8fafc]'
                            }`}
                        >
                          <td className="py-2.5 px-3 text-center border-r border-[#edf2f7]" onClick={e => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleToggleSelectModalEmp(emp.id)}
                              className="cursor-pointer"
                            />
                          </td>
                          <td className="py-2.5 px-3 border-r border-[#edf2f7]">
                            <span className="font-bold text-[#0e1225] text-[12.5px]">{emp.name}</span>
                            <span className="text-[11px] text-[#64748b] ml-1">({emp.age}세)</span>
                          </td>
                          <td className="py-2.5 px-3 border-r border-[#edf2f7] font-semibold text-[#2a3461]">
                            {emp.role}
                          </td>
                          <td className="py-2.5 px-3 border-r border-[#edf2f7] text-[#475569] text-[11.5px]">
                            <span>{emp.hireDate}</span>
                            <span className="text-[#94a3b8] mx-1">~</span>
                            <span className={emp.leaveDate && emp.leaveDate !== '-' ? 'text-[#c5221f] font-semibold' : 'text-[#64748b]'}>
                              {emp.leaveDate || '-'}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 border-r border-[#edf2f7] text-center">
                            <span className={`inline-block px-1.5 py-0.2 text-[10.5px] font-bold rounded ${emp.status === '재직'
                              ? 'bg-[#e6f4ea] text-[#137333]'
                              : emp.status === '휴직'
                                ? 'bg-[#fef7e0] text-[#b06000]'
                                : 'bg-[#fce8e6] text-[#c5221f]'
                              }`}>
                              {emp.status}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            {emp.salaryType === '방문급여' ? (
                              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#fff5f1] text-[#ef5a27] border border-[#ef5a27]/30">
                                시급제 (미계약)
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#eef2f7] text-[#475569] border border-[#c2cfdf]">
                                월급제
                              </span>
                            )}
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* 4. 모달 하단 액션 바 */}
            <div className="p-4 bg-[#f8fafc] border-t border-[#c2cfdf] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-[12.5px]">
                  <span className="text-[#64748b]">선택된 종사자:</span>
                  <span className="font-bold text-[#ef5a27] bg-[#fff5f1] px-2 py-0.5 rounded border border-[#ef5a27]/30">
                    {selectedModalEmpIds.length}명
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-bold text-[#475569]">계약기간</span>
                  <input
                    type="text"
                    value={modalAddPeriod}
                    onChange={e => setModalAddPeriod(e.target.value)}
                    className="w-[200px] h-[30px] px-2 bg-white border border-[#c2cfdf] rounded text-[12px] font-semibold text-[#0e1225]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAddEmpModalOpen(false)}
                  className="px-4 py-1.5 border border-[#c2cfdf] bg-white hover:bg-[#f1f5f9] rounded text-[12.5px] font-semibold text-[#475569] transition-colors cursor-pointer"
                >
                  취소
                </button>
                <button
                  onClick={handleConfirmAddHourlyEmployees}
                  disabled={selectedModalEmpIds.length === 0}
                  className={`px-4 py-1.5 rounded text-[12.5px] font-bold flex items-center gap-1.5 shadow-xs transition-colors ${selectedModalEmpIds.length > 0
                    ? 'bg-[#ef5a27] hover:bg-[#d84a1c] text-white cursor-pointer'
                    : 'bg-[#cbd5e1] text-[#64748b] cursor-not-allowed'
                    }`}
                >
                  선택 종사자 시급제 계약 일괄 추가 ({selectedModalEmpIds.length}명)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

