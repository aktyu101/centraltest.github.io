import React, { useState, useEffect, useMemo, Fragment } from 'react'
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
  type: string // '재직' | '퇴직' | '휴직' | '보류'
  date: string // YYYY-MM-DD
  reason: string // 비고 / 변경 사유
  syncStatus?: '희' | '미연동'
}

// ─── 표준 자격면허종류 16종 목록 ──────────────────────────────────────────────
export const LICENSE_TYPE_OPTIONS = [
  '사회복지사 1급',
  '사회복지사 2급',
  '사회복지사 3급',
  '의사',
  '방문간호전담 간호사',
  '방문간호 이외 간호사',
  '방문간호전담 간호조무사',
  '방문간호 이외 간호조무사',
  '치과위생사',
  '물리치료사',
  '작업치료사',
  '요양보호사 1급',
  '요양보호사 2급',
  '요양보호사 기존유예자',
  '영양사',
  '기타',
] as const

export type LicenseType = (typeof LICENSE_TYPE_OPTIONS)[number]

export interface CertificateItem {
  id: string
  seq: number
  licenseType: LicenseType | string
  licenseNumber: string // 자격면허번호
  issueDate: string // 취득일자 YYYY.MM.DD 또는 YYYY-MM-DD
  expireDate: string // 만기일자 YYYY.MM.DD 또는 YYYY-MM-DD
  issuer?: string // 발급기관명
}

// ─── 4대보험 이력 모델 ────────────────────────────────────────────────────────
export type InsuranceType = '국민연금' | '건강보험' | '고용보험' | '산재보험' | '4대보험 전체' | string
export type InsuranceStatus = '취득' | '상실'

export interface InsuranceHistoryItem {
  id: string
  seq: number
  date: string // YYYY-MM-DD
  insuranceType: InsuranceType
  status: InsuranceStatus
  reason: string // 비고 / 사유
  monthlyWage?: number // 국민연금 보수월액 (선택 시)
  unemploymentApplied?: boolean // 고용보험 실업급여 적용 여부 (선택 시)
  syncStatus?: '연동' | '미연동' | '희'
  syncedInsurances?: ('국민연금' | '건강보험' | '고용보험' | '산재보험')[] // 사업장 가입자명부 연동 확인된 보험 목록
}

// ─── 수정 이력(감사 로그) 모델 ───────────────────────────────────────────────
export interface AuditAuthor {
  name: string
  id: string
}

export interface CareerAuditLog {
  id: string
  updatedAt: string // 'YYYY-MM-DD HH:mm:ss'
  author: AuditAuthor
  summary: string
  beforeList: CareerHistoryItem[]
  afterList: CareerHistoryItem[]
}

export interface InsuranceAuditLog {
  id: string
  updatedAt: string // 'YYYY-MM-DD HH:mm:ss'
  author: AuditAuthor
  summary: string
  beforeList: InsuranceHistoryItem[]
  afterList: InsuranceHistoryItem[]
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
  // 재직 이력 감사 로그
  careerAuditLogs?: CareerAuditLog[]
  // 자격증 목록
  certificates?: CertificateItem[]
  // 4대보험 이력 목록
  insuranceHistory?: InsuranceHistoryItem[]
  // 4대보험 이력 감사 로그
  insuranceAuditLogs?: InsuranceAuditLog[]
  // 인력변경 신고내역 목록
  personnelChangeReports?: PersonnelChangeReport[]
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

// ─── 인력변경 신고내역 타입 ───────────────────────────────────────────────────

export interface PersonnelChangeReport {
  id: string
  startDate: string
  endDate?: string | null
  status: '재직' | '퇴직' | '휴직'
  serviceType: string // 예: 방문요양
  tenureText?: string // 예: 근속 9개월
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
        type: '재직',
        date: '2020-03-01',
        reason: '센트럴케어 신규 채용',
        syncStatus: '희',
      },
    ],
    personnelChangeReports: [
      {
        id: 'PCR-001',
        startDate: '2025-10-17',
        endDate: null,
        status: '재직',
        serviceType: '방문요양',
        tenureText: '근속 9개월',
      },
      {
        id: 'PCR-002',
        startDate: '2020-10-06',
        endDate: '2023-08-31',
        status: '퇴직',
        serviceType: '방문요양',
        tenureText: '근속 2년 10개월',
      },
    ],
    careerAuditLogs: [
      {
        id: 'CAL-003',
        updatedAt: '2026-08-01 09:00:00',
        author: { name: '김관리', id: 'admin01' },
        summary: '휴직 종료에 따른 재직 복귀 이력 등록',
        beforeList: [
          {
            id: 'CH-001',
            seq: 1,
            type: '재직',
            date: '2020-03-01',
            reason: '센트럴케어 신규 채용',
            syncStatus: '희',
          },
          {
            id: 'CH-002',
            seq: 2,
            type: '휴직',
            date: '2026-05-10',
            reason: '개인사유 육아휴직',
            syncStatus: '희',
          },
        ],
        afterList: [
          {
            id: 'CH-001',
            seq: 1,
            type: '재직',
            date: '2020-03-01',
            reason: '센트럴케어 신규 채용',
            syncStatus: '희',
          },
          {
            id: 'CH-002',
            seq: 2,
            type: '휴직',
            date: '2026-05-10',
            reason: '개인사유 육아휴직',
            syncStatus: '희',
          },
          {
            id: 'CH-003',
            seq: 3,
            type: '재직',
            date: '2026-08-01',
            reason: '휴직 만료 후 복직',
            syncStatus: '희',
          },
        ],
      },
      {
        id: 'CAL-002',
        updatedAt: '2026-05-10 11:20:15',
        author: { name: '박인사', id: 'hr_park' },
        summary: '육아휴직 신청에 따른 휴직 처리',
        beforeList: [
          {
            id: 'CH-001',
            seq: 1,
            type: '재직',
            date: '2020-03-01',
            reason: '센트럴케어 신규 채용',
            syncStatus: '희',
          },
        ],
        afterList: [
          {
            id: 'CH-001',
            seq: 1,
            type: '재직',
            date: '2020-03-01',
            reason: '센트럴케어 신규 채용',
            syncStatus: '희',
          },
          {
            id: 'CH-002',
            seq: 2,
            type: '휴직',
            date: '2026-05-10',
            reason: '개인사유 육아휴직',
            syncStatus: '희',
          },
        ],
      },
      {
        id: 'CAL-001',
        updatedAt: '2026-03-15 14:32:00',
        author: { name: '김관리', id: 'admin01' },
        summary: '재직 이력 최초 등록 (입사 처리)',
        beforeList: [],
        afterList: [
          {
            id: 'CH-001',
            seq: 1,
            type: '재직',
            date: '2020-03-01',
            reason: '센트럴케어 신규 채용',
            syncStatus: '희',
          },
        ],
      },
    ],
    insuranceHistory: [
      {
        id: 'INS-001',
        seq: 1,
        date: '2020-03-01',
        insuranceType: '4대보험 전체',
        status: '취득',
        monthlyWage: 2150000,
        unemploymentApplied: false,
        reason: '',
        syncStatus: '연동',
        syncedInsurances: ['국민연금', '건강보험', '고용보험', '산재보험'],
      },
      {
        id: 'INS-002',
        seq: 2,
        date: '2024-01-01',
        insuranceType: '국민연금',
        status: '상실',
        monthlyWage: 2150000,
        reason: '만 60세 도달 가입 상실',
        syncStatus: '연동',
        syncedInsurances: ['국민연금'],
      },
    ],
    insuranceAuditLogs: [
      {
        id: 'IAL-003',
        updatedAt: '2026-01-01 09:00:00',
        author: { name: '김관리', id: 'admin01' },
        summary: '2026년도 국민연금 보수월액 변경 (2,300,000원)',
        beforeList: [
          {
            id: 'INS-001',
            seq: 1,
            date: '2020-03-01',
            insuranceType: '4대보험 전체',
            status: '취득',
            monthlyWage: 2150000,
            unemploymentApplied: false,
            reason: '신규 입사 취득',
            syncStatus: '연동',
            syncedInsurances: ['국민연금', '건강보험', '고용보험', '산재보험'],
          },
          {
            id: 'INS-002',
            seq: 2,
            date: '2024-01-01',
            insuranceType: '국민연금',
            status: '상실',
            monthlyWage: 2150000,
            reason: '만 60세 도달 가입 상실',
            syncStatus: '연동',
            syncedInsurances: ['국민연금'],
          },
        ],
        afterList: [
          {
            id: 'INS-001',
            seq: 1,
            date: '2020-03-01',
            insuranceType: '4대보험 전체',
            status: '취득',
            monthlyWage: 2300000,
            unemploymentApplied: false,
            reason: '보수월액 정기 인상 반영',
            syncStatus: '연동',
            syncedInsurances: ['국민연금', '건강보험', '고용보험', '산재보험'],
          },
          {
            id: 'INS-002',
            seq: 2,
            date: '2024-01-01',
            insuranceType: '국민연금',
            status: '상실',
            monthlyWage: 2300000,
            reason: '만 60세 도달 가입 상실',
            syncStatus: '연동',
            syncedInsurances: ['국민연금'],
          },
        ],
      },
      {
        id: 'IAL-002',
        updatedAt: '2024-01-02 09:15:30',
        author: { name: '박인사', id: 'hr_park' },
        summary: '만 60세 도달에 따른 국민연금 상실 이력 추가',
        beforeList: [
          {
            id: 'INS-001',
            seq: 1,
            date: '2020-03-01',
            insuranceType: '4대보험 전체',
            status: '취득',
            monthlyWage: 2150000,
            unemploymentApplied: false,
            reason: '',
            syncStatus: '연동',
            syncedInsurances: ['국민연금', '건강보험', '고용보험', '산재보험'],
          },
        ],
        afterList: [
          {
            id: 'INS-001',
            seq: 1,
            date: '2020-03-01',
            insuranceType: '4대보험 전체',
            status: '취득',
            monthlyWage: 2150000,
            unemploymentApplied: false,
            reason: '',
            syncStatus: '연동',
            syncedInsurances: ['국민연금', '건강보험', '고용보험', '산재보험'],
          },
          {
            id: 'INS-002',
            seq: 2,
            date: '2024-01-01',
            insuranceType: '국민연금',
            status: '상실',
            monthlyWage: 2150000,
            reason: '만 60세 도달 가입 상실',
            syncStatus: '연동',
            syncedInsurances: ['국민연금'],
          },
        ],
      },
      {
        id: 'IAL-001',
        updatedAt: '2020-03-01 10:00:00',
        author: { name: '김관리', id: 'admin01' },
        summary: '4대보험 최초 취득 등록',
        beforeList: [],
        afterList: [
          {
            id: 'INS-001',
            seq: 1,
            date: '2020-03-01',
            insuranceType: '4대보험 전체',
            status: '취득',
            monthlyWage: 2150000,
            unemploymentApplied: false,
            reason: '신규 입사 최초 취득',
            syncStatus: '연동',
            syncedInsurances: ['국민연금', '건강보험', '고용보험', '산재보험'],
          },
        ],
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
        type: '재직',
        date: '2021-05-10',
        reason: '사회복지사 정규 채용',
        syncStatus: '희',
      },
    ],
    insuranceHistory: [
      {
        id: 'INS-003',
        seq: 1,
        date: '2021-05-10',
        insuranceType: '4대보험 전체',
        status: '취득',
        reason: '',
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
        type: '재직',
        date: '2019-11-01',
        reason: '간호사 정규 채용',
        syncStatus: '희',
      },
    ],
    insuranceHistory: [
      {
        id: 'INS-004',
        seq: 1,
        date: '2019-11-01',
        insuranceType: '4대보험 전체',
        status: '취득',
        reason: '간호사 정규 채용 취득',
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

function formatDateString(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function formatDateTimeString(d: Date = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const h = String(d.getHours()).padStart(2, '0')
  const min = String(d.getMinutes()).padStart(2, '0')
  const s = String(d.getSeconds()).padStart(2, '0')
  return `${y}-${m}-${day} ${h}:${min}:${s}`
}

// ─── 피그마 1:1 재직 이력 수정 이력 감사 모달 (마스터-디테일 레이아웃) ───────

function CareerAuditModal({
  employee,
  onClose,
}: {
  employee: Employee
  onClose: () => void
}) {
  const logs = employee.careerAuditLogs || []
  const [selectedLogId, setSelectedLogId] = useState<string>(() => {
    return logs[0]?.id || ''
  })

  // 로그가 전혀 없을 때 현재 상태를 단일 로그 형태로 표시하기 위한 fallback
  const currentFallbackLog: CareerAuditLog = useMemo(() => {
    return {
      id: 'CAL-CURRENT',
      updatedAt: formatDateTimeString(new Date()),
      author: { name: '시스템', id: 'system' },
      summary: '현재 등록된 재직 이력 기준',
      beforeList: [],
      afterList: employee.careerHistory || [],
    }
  }, [employee])

  const activeLog = logs.find(l => l.id === selectedLogId) || logs[0] || currentFallbackLog

  return (
    <div className="fixed inset-0 z-[75] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/45 backdrop-blur-xs transition-opacity" onClick={onClose} />

      {/* Modal Card (마스터-디테일 와이드 컨테이너) */}
      <div className="relative bg-white rounded-[16px] shadow-[0px_20px_60px_rgba(0,0,0,0.25)] w-[96vw] max-w-[1260px] h-[800px] max-h-[90vh] flex flex-col overflow-hidden border border-[#c2cfdf] animate-in fade-in zoom-in-95 duration-200">
        {/* 1. Modal Header */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-[#c2cfdf] bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[8px] bg-[#eef2f8] flex items-center justify-center text-[#2a3461]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[17px] text-[#0e1225] tracking-tight">재직 이력 수정 이력 관리</span>
                <span className="px-2.5 py-0.5 bg-[#eef2f8] text-[#2a3461] rounded-[4px] text-[12px] font-bold border border-[#d8e2ee]">
                  {employee.name} ({employee.job})
                </span>
                <span className="text-[12px] text-[#64748b] font-medium">
                  총 {logs.length > 0 ? logs.length : 1}개의 변경 세션
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-[6px] text-[#8a9cb4] hover:text-[#0e1225] hover:bg-[#f1f5f9] transition-colors cursor-pointer"
            title="닫기"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 2. Modal Body: 마스터-디테일 레이아웃 (좌측 세션 목록 + 우측 변경 전/후 2단 비교) */}
        <div className="flex-1 flex min-h-0 overflow-hidden">
          {/* ─── 좌측 마스터 패널: 변경일시 목록 (타임라인 카드) ─── */}
          <div className="w-[300px] shrink-0 border-r border-[#c2cfdf] bg-[#f8fafc] flex flex-col min-h-0">
            <div className="px-4 py-3 border-b border-[#c2cfdf] bg-[#f1f5f9] flex items-center justify-between shrink-0">
              <span className="font-bold text-[13px] text-[#334155] flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 8v4l3 3" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
                변경일시 목록
              </span>
              <span className="text-[11px] font-bold text-[#64748b] bg-white px-2 py-0.5 rounded-[4px] border border-[#cbd5e1]">
                {logs.length > 0 ? `${logs.length}건` : '1건'}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-2.5 flex flex-col gap-2">
              {logs.length === 0 ? (
                <div className="p-4 text-center text-[#94a3b8] text-[12.5px]">
                  등록된 수정 이력이 없습니다.
                </div>
              ) : (
                logs.map((log, idx) => {
                  const isSelected = log.id === activeLog.id
                  const isLatest = idx === 0
                  return (
                    <div
                      key={log.id}
                      onClick={() => setSelectedLogId(log.id)}
                      className={`p-3 rounded-[8px] border transition-all cursor-pointer flex flex-col gap-1.5 select-none ${
                        isSelected
                          ? 'bg-[#eff6ff] border-[#2563eb] shadow-xs ring-1 ring-[#2563eb]'
                          : 'bg-white border-[#c2cfdf] hover:border-[#94a3b8] hover:bg-[#fafbfc]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-[12.5px] font-bold font-mono text-[#0e1225]">
                          <span>{log.updatedAt}</span>
                        </div>
                        {isLatest && (
                          <span className="px-1.5 py-0.5 bg-[#dbeafe] text-[#1e40af] text-[10.5px] font-bold rounded">
                            최신
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-[12px]">
                        <span className="font-semibold text-[#475569] flex items-center gap-1">
                          <span className="text-[#94a3b8]">변경자:</span>
                          <strong className="text-[#1e3a8a]">{log.author.name}</strong>
                          <span className="font-mono text-[11px] text-[#64748b]">({log.author.id})</span>
                        </span>
                      </div>
                      <div className="text-[11.5px] text-[#64748b] truncate bg-white/60 p-1 rounded border border-[#e2e8f0]" title={log.summary}>
                        {log.summary}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          {/* ─── 우측 디테일 패널: 선택된 시점의 변경 전 vs 변경 후 2단 대조 ─── */}
          <div className="flex-1 flex flex-col min-w-0 bg-[#eaedf2] overflow-hidden">
            {/* 상단 선택 로그 요약 정보 바 */}
            <div className="px-5 py-2.5 bg-white border-b border-[#c2cfdf] flex items-center justify-between flex-wrap gap-2 text-[12.5px] shrink-0">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-[#475569]">선택된 변경일시:</span>
                  <span className="font-mono font-bold text-[#0e1225] bg-[#f8fafc] px-2.5 py-1 rounded-[6px] border border-[#c2cfdf]">
                    {activeLog.updatedAt}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-[#475569]">변경한 사람:</span>
                  <span className="font-bold text-[#1e40af] bg-[#eff6ff] px-2.5 py-1 rounded-[6px] border border-[#bfdbfe]">
                    {activeLog.author.name} <span className="font-mono text-[11.5px] text-[#3b82f6]">({activeLog.author.id})</span>
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-[#475569]">변경 요약:</span>
                <span className="font-bold text-[#0e1225] bg-[#fffbeb] px-2.5 py-1 rounded-[6px] border border-[#fde68a] text-[12px]">
                  {activeLog.summary}
                </span>
              </div>
            </div>

            {/* 본문: 변경 전 vs 변경 후 2단 수평 테이블 대조 */}
            <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-3 min-h-0">
              <div className="grid grid-cols-2 gap-3 h-full min-h-[420px]">
                {/* ─── 좌측: 변경 전 (Before) ─── */}
                <div className="flex flex-col bg-white border border-[#c2cfdf] rounded-[8px] overflow-hidden shadow-2xs">
                  <div className="px-4 py-2.5 bg-[#f4f7fc] border-b border-[#c2cfdf] flex items-center justify-between shrink-0">
                    <span className="font-bold text-[13.5px] text-[#475569] flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#94a3b8]" />
                      변경 전 이력 목록 ({activeLog.beforeList.length}건)
                    </span>
                    <span className="text-[11.5px] text-[#64748b] font-medium">수정 전 스냅샷</span>
                  </div>
                  <div className="flex-1 overflow-auto">
                    <table className="w-full border-collapse text-[12.5px]">
                      <thead className="sticky top-0 z-10 bg-[#f8fafc] shadow-2xs">
                        <tr className="border-b border-[#c2cfdf] text-[#475569] font-bold h-[36px]">
                          <th className="px-2 text-center w-[45px] border-r border-[#c2cfdf] whitespace-nowrap">연번</th>
                          <th className="px-3 text-center w-[110px] border-r border-[#c2cfdf] whitespace-nowrap">적용일자</th>
                          <th className="px-3 text-center w-[80px] border-r border-[#c2cfdf] whitespace-nowrap">구분</th>
                          <th className="px-3 text-left whitespace-nowrap">비고 / 사유</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeLog.beforeList.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="text-center py-16 text-[#94a3b8]">
                              이전 등록된 이력이 없습니다 (최초 등록)
                            </td>
                          </tr>
                        ) : (
                          activeLog.beforeList.map((item, idx) => (
                            <tr key={item.id || idx} className="border-b border-[#c2cfdf] h-[40px] bg-[#fafbfc] hover:bg-[#f1f5f9]">
                              <td className="px-2 text-center font-mono text-[#64748b] border-r border-[#c2cfdf] whitespace-nowrap">{item.seq ?? idx + 1}</td>
                              <td className="px-3 text-center font-mono text-[#475569] border-r border-[#c2cfdf] whitespace-nowrap">{item.date}</td>
                              <td className="px-3 text-center border-r border-[#c2cfdf] whitespace-nowrap">
                                <span className="px-2.5 py-0.5 rounded-[4px] text-[11.5px] font-bold bg-[#f1f5f9] text-[#475569] border border-[#cbd5e1] inline-block">
                                  {item.type}
                                </span>
                              </td>
                              <td className="px-3 text-left text-[#64748b] truncate max-w-[200px]" title={item.reason}>
                                {item.reason || '-'}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* ─── 우측: 변경 후 (After) ─── */}
                <div className="flex flex-col bg-white border border-[#2a3461]/40 rounded-[8px] overflow-hidden shadow-2xs">
                  <div className="px-4 py-2.5 bg-[#eef2f8] border-b border-[#2a3461]/30 flex items-center justify-between shrink-0">
                    <span className="font-bold text-[13.5px] text-[#1e3a8a] flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb]" />
                      변경 후 최종 반영 목록 ({activeLog.afterList.length}건)
                    </span>
                    <span className="text-[11.5px] font-bold text-[#2563eb]">저장된 상태</span>
                  </div>
                  <div className="flex-1 overflow-auto">
                    <table className="w-full border-collapse text-[12.5px]">
                      <thead className="sticky top-0 z-10 bg-[#f8fafc] shadow-2xs">
                        <tr className="border-b border-[#c2cfdf] text-[#334155] font-bold h-[36px]">
                          <th className="px-2 text-center w-[45px] border-r border-[#c2cfdf] whitespace-nowrap">연번</th>
                          <th className="px-3 text-center w-[110px] border-r border-[#c2cfdf] whitespace-nowrap">적용일자</th>
                          <th className="px-3 text-center w-[80px] border-r border-[#c2cfdf] whitespace-nowrap">구분</th>
                          <th className="px-3 text-left border-r border-[#c2cfdf] whitespace-nowrap">비고 / 사유</th>
                          <th className="px-2.5 text-center w-[75px] whitespace-nowrap">상태</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeLog.afterList.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="text-center py-16 text-[#94a3b8]">
                              이력 목록이 비어 있습니다.
                            </td>
                          </tr>
                        ) : (
                          activeLog.afterList.map((item, idx) => {
                            const isNew = !activeLog.beforeList.some(b => b.id === item.id)
                            const isModified = !isNew && activeLog.beforeList.some(b => b.id === item.id && (b.date !== item.date || b.type !== item.type || b.reason !== item.reason))
                            const statusColor = STATUS_COLOR_MAP[item.type] || STATUS_COLOR_MAP['재직']

                            return (
                              <tr
                                key={item.id || idx}
                                className={`border-b border-[#c2cfdf] h-[40px] transition-colors ${
                                  isNew
                                    ? 'bg-[#f0fdf4] hover:bg-[#dcfce7]'
                                    : isModified
                                      ? 'bg-[#fffbeb] hover:bg-[#fef3c7]'
                                      : 'bg-white hover:bg-[#f8fafc]'
                                }`}
                              >
                                <td className="px-2 text-center font-mono text-[#0e1225] border-r border-[#c2cfdf] whitespace-nowrap">{item.seq ?? idx + 1}</td>
                                <td className="px-3 text-center font-mono font-bold text-[#0e1225] border-r border-[#c2cfdf] whitespace-nowrap">{item.date}</td>
                                <td className="px-3 text-center border-r border-[#c2cfdf] whitespace-nowrap">
                                  <span className={`px-2.5 py-0.5 rounded-[4px] text-[11.5px] font-bold border inline-block ${statusColor.bg} ${statusColor.text} ${statusColor.border}`}>
                                    {item.type}
                                  </span>
                                </td>
                                <td className="px-3 text-left text-[#0e1225] border-r border-[#c2cfdf] truncate max-w-[200px]" title={item.reason}>
                                  {item.reason || '-'}
                                </td>
                                <td className="px-2.5 text-center whitespace-nowrap">
                                  {isNew ? (
                                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#dcfce7] text-[#15803d] border border-[#bbf7d0]">
                                      신규추가
                                    </span>
                                  ) : isModified ? (
                                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#fef3c7] text-[#b45309] border border-[#fde68a]">
                                      수정됨
                                    </span>
                                  ) : (
                                    <span className="text-[11.5px] text-[#94a3b8] font-medium">유지</span>
                                  )}
                                </td>
                              </tr>
                            )
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Modal Footer */}
        <div className="px-6 py-3 border-t border-[#c2cfdf] bg-[#fafbfc] flex items-center justify-between shrink-0">
          <div className="text-[12px] text-[#64748b]">
            * 좌측 목록에서 변경일시를 선택하면 해당 시점의 변경 전/후 상세 내역을 1:1로 대조할 수 있습니다.
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-[36px] px-6 bg-[#2a3461] text-white rounded-[8px] text-[13px] font-bold hover:bg-[#364275] transition-colors shadow-xs cursor-pointer"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  )
}


// ─── 피그마 1:1 자격증 상세 모달 ──────────────────────────────────────────────
function CertificateDetailModal({
  cert,
  onClose,
}: {
  cert: CertificateItem
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity" onClick={onClose} />
      <div className="relative bg-white rounded-[12px] shadow-[0px_20px_50px_rgba(0,0,0,0.2)] w-full max-w-[620px] flex flex-col overflow-hidden border border-[#c2cfdf] animate-in fade-in zoom-in-95 duration-200">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#e2e8f0] bg-white shrink-0">
          <span className="font-bold text-[17px] text-[#0e1225] tracking-tight">자격증 상세</span>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center border border-[#c2cfdf] rounded-[4px] text-[#64748b] hover:text-[#0e1225] hover:bg-[#f1f5f9] cursor-pointer"
            title="닫기"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 본문 그리드 테이블 */}
        <div className="p-5 flex flex-col gap-4 text-[13px]">
          <div className="border border-[#c2cfdf] rounded-[4px] overflow-hidden">
            <div className="grid grid-cols-12 border-b border-[#c2cfdf] min-h-[44px]">
              <div className="col-span-3 bg-[#f4f7fc] px-3.5 py-2.5 font-bold text-[#2a3461] border-r border-[#c2cfdf] flex items-center">
                자격면허종류
              </div>
              <div className="col-span-3 px-3.5 py-2.5 text-[#0e1225] font-medium border-r border-[#c2cfdf] flex items-center">
                {cert.licenseType}
              </div>
              <div className="col-span-3 bg-[#f4f7fc] px-3.5 py-2.5 font-bold text-[#2a3461] border-r border-[#c2cfdf] flex items-center">
                자격면허번호
              </div>
              <div className="col-span-3 px-3.5 py-2.5 text-[#0e1225] font-mono flex items-center">
                {cert.licenseNumber || '-'}
              </div>
            </div>

            <div className="grid grid-cols-12 border-b border-[#c2cfdf] min-h-[44px]">
              <div className="col-span-3 bg-[#f4f7fc] px-3.5 py-2.5 font-bold text-[#2a3461] border-r border-[#c2cfdf] flex items-center">
                발급기관명
              </div>
              <div className="col-span-3 px-3.5 py-2.5 text-[#0e1225] font-medium border-r border-[#c2cfdf] flex items-center">
                {cert.issuer || '-'}
              </div>
              <div className="col-span-3 bg-[#f4f7fc] px-3.5 py-2.5 font-bold text-[#2a3461] border-r border-[#c2cfdf] flex items-center">
                자격취득일자
              </div>
              <div className="col-span-3 px-3.5 py-2.5 text-[#0e1225] font-mono flex items-center">
                {cert.issueDate ? cert.issueDate.replace(/\./g, '-') : '-'}
              </div>
            </div>

            <div className="grid grid-cols-12 min-h-[44px]">
              <div className="col-span-3 bg-[#f4f7fc] px-3.5 py-2.5 font-bold text-[#2a3461] border-r border-[#c2cfdf] flex items-center">
                자격만기일자
              </div>
              <div className="col-span-9 px-3.5 py-2.5 text-[#0e1225] font-mono flex items-center">
                {cert.expireDate ? cert.expireDate.replace(/\./g, '-') : '-'}
              </div>
            </div>
          </div>

          {/* 푸터 */}
          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={onClose}
              className="h-[34px] px-5 border border-[#c2cfdf] rounded-[6px] text-[13px] font-semibold text-[#475569] hover:bg-[#f1f5f9] cursor-pointer"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Figma 1:1 재직 이력 통합 관리 모달 (연속 추가 & 드래그 앤 드롭 순서 변경 지원) ───────

const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  재직: ['휴직', '퇴직'],
  입사: ['휴직', '퇴직'],
  최초입사일: ['휴직', '퇴직'],
  휴직: ['재직', '퇴직'],
  퇴직: ['재직', '보류'],
  보류: ['재직'],
}

const ALL_CAREER_STATUSES = ['재직', '휴직', '퇴직', '보류']

const STATUS_COLOR_MAP: Record<string, { bg: string; text: string; border: string }> = {
  재직: { bg: 'bg-[#e8f8ed]', text: 'text-[#1c9640]', border: 'border-[#c6f0d2]' },
  입사: { bg: 'bg-[#e8f8ed]', text: 'text-[#1c9640]', border: 'border-[#c6f0d2]' },
  최초입사일: { bg: 'bg-[#e8f8ed]', text: 'text-[#1c9640]', border: 'border-[#c6f0d2]' },
  휴직: { bg: 'bg-[#fff7ed]', text: 'text-[#ea580c]', border: 'border-[#fed7aa]' },
  보류: { bg: 'bg-[#fefce8]', text: 'text-[#ca8a04]', border: 'border-[#fef08a]' },
  퇴직: { bg: 'bg-[#f1f5f9]', text: 'text-[#64748b]', border: 'border-[#cbd5e1]' },
}

function CareerHistoryManageModal({
  employee,
  initialItem,
  onSave,
  onClose,
}: {
  employee: Employee
  initialItem?: CareerHistoryItem | null
  onSave: (updatedList: CareerHistoryItem[]) => void
  onClose: () => void
}) {
  const age = calcAge(employee.dob)

  // 모달 내부 편집용 로컬 이력 목록 (입사/최초입사일 ➔ 재직 자동 정규화)
  const [draftList, setDraftList] = useState<CareerHistoryItem[]>(() => {
    const list = (employee.careerHistory || []).map(item => ({
      ...item,
      type: (item.type === '입사' || (item.type as string) === '최초입사일') ? '재직' : item.type,
    }))
    return list.sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date)
      return (a.seq ?? 0) - (b.seq ?? 0)
    }).map((item, idx) => ({ ...item, seq: idx + 1 }))
  })

  // 신규 이력 연속 추가 입력 폼 상태
  const [formDate, setFormDate] = useState<string>(() => {
    if (initialItem?.date) return initialItem.date
    return formatDateString(new Date())
  })
  const [formType, setFormType] = useState<string>(() => {
    if (initialItem?.type) return (initialItem.type === '입사' || (initialItem.type as string) === '최초입사일') ? '재직' : initialItem.type
    return '재직'
  })
  const [formReason, setFormReason] = useState<string>(initialItem?.reason || '')
  const [editingId, setEditingId] = useState<string | null>(initialItem?.id || null)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [recentAddedMsg, setRecentAddedMsg] = useState<string | null>(null)

  // ─── 전체 체인 실시간 오류 분석 (테이블 시각 피드백용) ───
  const chainErrors = useMemo(() => {
    const errors: Record<string, string> = {}
    if (draftList.length === 0) return errors

    // 1번 항목은 반드시 '재직' 또는 '보류'여야 함
    const firstItem = draftList[0]
    const firstType = (firstItem.type === '입사' || (firstItem.type as string) === '최초입사일') ? '재직' : firstItem.type
    if (firstType !== '재직' && firstType !== '보류') {
      errors[firstItem.id] = `첫 번째 이력은 [재직] 또는 [보류]여야 합니다. (${firstType} 불가)`
    }

    for (let i = 0; i < draftList.length - 1; i++) {
      const cur = draftList[i]
      const next = draftList[i + 1]
      const curType = (cur.type === '입사' || (cur.type as string) === '최초입사일') ? '재직' : cur.type
      const nextType = (next.type === '입사' || (next.type as string) === '최초입사일') ? '재직' : next.type
      const allowedNexts = ALLOWED_TRANSITIONS[curType] || ['휴직', '퇴직']

      if (!allowedNexts.includes(nextType)) {
        errors[next.id] = `직전 [${curType} (${cur.date})] 직후에 [${nextType}] 연결 불가`
      }
    }
    return errors
  }, [draftList])

  const errorCount = Object.keys(chainErrors).length

  // ─── 적용 일자(formDate) 기준 앞/뒤 상태 전이 교차 검증 (Bi-directional Validation) ───
  const { prevItem, nextItem, prevStatus, nextStatus, validStatuses, getInvalidReason } = useMemo(() => {
    const existing = draftList
      .filter(item => (!editingId ? true : item.id !== editingId))
      .sort((a, b) => a.date.localeCompare(b.date))

    const prevItems = existing.filter(item => item.date <= formDate)
    const prev = prevItems.length > 0 ? prevItems[prevItems.length - 1] : null
    const next = existing.find(item => item.date > formDate) || null

    // 직전 이력이 없는 최초 시작점(이력 0건 또는 맨 앞 등록)이면 '재직' 또는 '보류'로 시작
    const fromAllowed = !prev
      ? ['재직', '보류']
      : ALLOWED_TRANSITIONS[(prev.type === '입사' || (prev.type as string) === '최초입사일') ? '재직' : prev.type] || ['휴직', '퇴직']

    const rawNStatus = next ? next.type : null
    const nStatus = (rawNStatus === '입사' || (rawNStatus as string) === '최초입사일') ? '재직' : rawNStatus

    const toAllowed = nStatus
      ? ALL_CAREER_STATUSES.filter(candidate => (ALLOWED_TRANSITIONS[candidate] || []).includes(nStatus))
      : ALL_CAREER_STATUSES

    const valids = fromAllowed.filter(st => toAllowed.includes(st))

    const getReason = (st: string) => {
      if (!prev) {
        if (st !== '재직' && st !== '보류') return `최초 재직 이력은 '재직' 또는 '보류'로 등록해야 합니다.`
      }
      const pStatus = prev ? ((prev.type === '입사' || (prev.type as string) === '최초입사일') ? '재직' : prev.type) : null
      const fromOk = fromAllowed.includes(st)
      const toOk = toAllowed.includes(st)
      if (!fromOk && !toOk) return `직전(${pStatus || '시작'}) 및 직후(${nStatus}) 상태 모두 전이 불가`
      if (!fromOk) {
        if (pStatus === '재직') {
          return `재직 상태에서는 '${st}'(으)로 바로 전이할 수 없습니다. (퇴직 또는 휴직 처리 후 가능)`
        }
        if (pStatus === '휴직') {
          return `휴직 상태에서는 '${st}'(으)로 전이할 수 없습니다. (재직 복귀 또는 퇴직 처리만 가능)`
        }
        if (pStatus === '퇴직') {
          return `퇴직 상태에서는 '${st}'(으)로 전이할 수 없습니다. (재직 또는 보류만 가능)`
        }
        if (pStatus === '보류') {
          return `보류 상태에서는 '${st}'(으)로 전이할 수 없습니다. (재직 또는 퇴직만 가능)`
        }
        return `직전 '${pStatus}' 상태에서는 '${st}'(으)로 전이할 수 없습니다.`
      }
      if (!toOk) return `'${st}' 다음에는 직후 '${nStatus}'(으)로 이어질 수 없습니다.`
      return '선택 불가'
    }

    return {
      prevItem: prev,
      nextItem: next,
      prevStatus: prev ? ((prev.type === '입사' || (prev.type as string) === '최초입사일') ? '재직' : prev.type) : null,
      nextStatus: nStatus,
      validStatuses: valids,
      getInvalidReason: getReason,
    }
  }, [formDate, editingId, draftList])

  // 유효 상태 목록 변경 시 formType 자동 보정
  useEffect(() => {
    if (validStatuses.length > 0 && !validStatuses.includes(formType)) {
      setFormType(validStatuses[0])
    }
  }, [validStatuses, formType])

  // 이력 추가 또는 수정 완료 (연속 추가 지원)
  function handleAddOrUpdateItem() {
    if (!formDate) {
      alert('적용 일자를 입력해 주세요.')
      return
    }
    if (!formType) {
      alert('직원 상태(구분)를 선택해 주세요.')
      return
    }

    // 상태 전이 유효성 검증
    if (!validStatuses.includes(formType)) {
      alert(`[입력 제한] ${getInvalidReason(formType)}`)
      return
    }

    if (editingId) {
      // 기존 항목 수정 (일자순 자동 정렬)
      const updated = draftList
        .map(item =>
          item.id === editingId
            ? { ...item, date: formDate, type: formType, reason: formReason }
            : item
        )
        .sort((a, b) => a.date.localeCompare(b.date))
        .map((item, idx) => ({ ...item, seq: idx + 1 }))
      setDraftList(updated)
      setEditingId(null)
      setFormReason('')
      setRecentAddedMsg('이력이 수정되었습니다.')
    } else {
      // 신규 항목 연속 추가 (일자순 자동 정렬)
      const newItem: CareerHistoryItem = {
        id: `CH-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
        seq: draftList.length + 1,
        type: formType,
        date: formDate,
        reason: formReason,
        syncStatus: '희',
      }
      const updated = [...draftList, newItem]
        .sort((a, b) => a.date.localeCompare(b.date))
        .map((item, idx) => ({ ...item, seq: idx + 1 }))
      setDraftList(updated)
      setFormReason('')
      setRecentAddedMsg(`'${formType}' 이력이 추가되었습니다.`)
    }

    setTimeout(() => setRecentAddedMsg(null), 3500)
  }

  // 행 편집 모드로 전환
  function handleEditRow(item: CareerHistoryItem) {
    setEditingId(item.id)
    setFormDate(item.date)
    setFormType(item.type)
    setFormReason(item.reason || '')
  }

  // 행 수정 취소
  function handleCancelEdit() {
    setEditingId(null)
    setFormReason('')
    setFormDate(formatDateString(new Date()))
  }

  // 행 삭제 (자유로운 편집 허용)
  function handleDeleteRow(itemId: string) {
    if (!confirm('해당 재직 이력을 삭제하시겠습니까?')) return

    const filtered = draftList
      .filter(i => i.id !== itemId)
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((item, idx) => ({ ...item, seq: idx + 1 }))
    setDraftList(filtered)
    if (editingId === itemId) {
      handleCancelEdit()
    }
  }

  // 최종 저장 시 전체 체인 무결성 전수 검증
  function handleSubmit() {
    // 이력이 0건인 경우 저장 허용
    if (draftList.length === 0) {
      onSave([])
      return
    }

    // 날짜 및 순서 기준 전수 검사
    const normalizedList = draftList.map(item => ({
      ...item,
      type: (item.type === '입사' || (item.type as string) === '최초입사일') ? '재직' : item.type,
    }))

    // 1건 이상 등록 시 첫 번째 이력은 '재직' 또는 '보류'여야 함
    if (normalizedList[0].type !== '재직' && normalizedList[0].type !== '보류') {
      alert('첫 번째 재직 이력은 반드시 \'재직\' 또는 \'보류\'여야 합니다.\n(휴직이나 퇴직으로 시작할 수 없습니다)')
      return
    }

    if (errorCount > 0) {
      alert('상태 전이 순서에 모순이 있는 이력이 있습니다.\n테이블의 안내 문구를 확인하시고 이력을 올바르게 수정한 후 저장해 주세요.')
      return
    }

    for (let i = 0; i < normalizedList.length - 1; i++) {
      const cur = normalizedList[i]
      const next = normalizedList[i + 1]
      const allowedNexts = ALLOWED_TRANSITIONS[cur.type] || ['휴직', '퇴직']

      if (!allowedNexts.includes(next.type)) {
        alert(
          `[상태 전이 오류] ${i + 1}번 [${cur.type} (${cur.date})] 직후에 ${i + 2}번 [${next.type} (${next.date})] 상태로 바로 전이될 수 없습니다.\n\n(예: 재직 ➔ 재직 중복 불가, 퇴직 ➔ 퇴직 중복 불가)\n순서를 조정하거나 상태를 확인해 주세요.`
        )
        return
      }
    }

    onSave(normalizedList)
  }

  return (
    <div className="fixed inset-0 z-[75] flex items-center justify-center p-4">
      {/* 배경 백드롭 */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity" onClick={onClose} />

      {/* 모달 창 */}
      <div className="relative bg-white rounded-[16px] shadow-[0px_20px_50px_rgba(0,0,0,0.2)] w-full max-w-[868px] h-[706px] max-h-[92vh] flex flex-col overflow-hidden border border-[#c2cfdf] animate-in fade-in zoom-in-95 duration-200">
        {/* 1. 헤더 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2e8f0] bg-white shrink-0">
          <span className="font-bold text-[18px] text-[#0e1225] tracking-tight">재직 이력 관리</span>
          <button onClick={onClose} className="p-1 rounded-[6px] text-[#8a9cb4] hover:text-[#0e1225] cursor-pointer" title="닫기">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 2. 대상자 요약 바 */}
        <div className="px-6 py-3 bg-[#f8fafc] border-b border-[#e2e8f0] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span
              className={`text-[16px] font-bold leading-none shrink-0 ${employee.gender === '여' ? 'text-[#e11d48]' : 'text-[#2563eb]'
                }`}
            >
              {employee.gender === '여' ? '♀' : '♂'}
            </span>
            <span className="text-[15px] font-bold text-[#0e1225]">{employee.name}</span>
            <span className="text-[13px] text-[#64748b]">
              {employee.dob} ({age}세)
            </span>
            <span className="px-2.5 py-0.5 bg-[#eef2f8] text-[#334155] rounded-[4px] text-[12px] font-semibold border border-[#d8e2ee]">
              {employee.job}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-[4px] text-[12px] font-bold border ${STATUS_COLOR_MAP[employee.status]?.bg || 'bg-[#e8f8ed]'} ${STATUS_COLOR_MAP[employee.status]?.text || 'text-[#1c9640]'} ${STATUS_COLOR_MAP[employee.status]?.border || 'border-[#c6f0d2]'}`}>
              현재 상태: {employee.status}
            </span>
          </div>
        </div>

        {/* 3. 본문 고정 레이아웃 영역 (테이블만 가변 스크롤) */}
        <div className="p-6 flex-1 min-h-0 flex flex-col gap-4 overflow-hidden text-[13px]">
          {/* 3-1. Figma 1:1 이력 입력 카드 */}
          <div className={`p-4 rounded-[8px] border shrink-0 transition-colors ${editingId ? 'bg-[#fffbeb] border-[#fde68a]' : 'bg-white border-[#c2cfdf]'}`}>
            {/* 카드 상단: 신규 등록 / 수정 모드 타이틀 바 */}
            <div className={`flex items-center justify-between mb-3 pb-2 border-b ${editingId ? 'border-[#fef08a]' : 'border-[#e2e8f0]'}`}>
              <span className={`font-bold text-[13px] flex items-center gap-1.5 ${editingId ? 'text-[#b45309]' : 'text-[#0e1225]'}`}>
                <span className={`w-2 h-2 rounded-full ${editingId ? 'bg-[#d97706]' : 'bg-[#ef5a27]'}`} />
                {editingId ? '재직 이력 수정' : '신규 재직 이력 등록'}
              </span>
              <div className="flex items-center gap-2">
                {recentAddedMsg && (
                  <span className="text-[12px] text-[#16a34a] font-bold animate-in fade-in">
                    ✓ {recentAddedMsg}
                  </span>
                )}
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="text-[11.5px] font-semibold text-[#b45309] hover:underline cursor-pointer"
                  >
                    수정 취소 (신규 등록으로 전환)
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-start">
              {/* 1. 적용일자 (3/12) */}
              <div className="md:col-span-3 flex flex-col gap-1">
                <label className="font-bold text-[#0e1225] text-[13px]">
                  적용일자 <span className="text-[#ef4444]">*</span>
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    readOnly
                    value={formDate ? formDate.replace(/-/g, '.') : ''}
                    onClick={() => setIsDatePickerOpen(true)}
                    placeholder="날짜 선택"
                    className="w-full h-[36px] border border-[#c2cfdf] rounded-[6px] px-3 pr-8 text-[13px] font-mono text-[#0e1225] bg-white cursor-pointer focus:outline-none focus:border-[#2a3461]"
                  />
                  <button
                    type="button"
                    onClick={() => setIsDatePickerOpen(true)}
                    className="absolute right-2 p-0.5 text-[#64748b] hover:text-[#1e293b] cursor-pointer"
                    title="달력 선택"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </button>
                </div>
                <div className="text-[11px] text-[#ef4444] font-medium leading-tight">
                  *퇴사일은 마지막 근무일의 다음 날로 선택
                </div>
              </div>

              {/* 2. 구분 상태 (4/12) */}
              <div className="md:col-span-4 flex flex-col gap-1">
                <label className="font-bold text-[#0e1225] text-[13px]">
                  구분 상태 <span className="text-[#ef4444]">*</span>
                </label>
                <div className="flex items-center justify-between h-[36px] px-1">
                  {ALL_CAREER_STATUSES.map(st => {
                    const isAllowed = validStatuses.includes(st)
                    const isSelected = formType === st
                    const reason = !isAllowed ? getInvalidReason(st) : ''

                    return (
                      <label
                        key={st}
                        title={!isAllowed ? `[선택불가] ${reason}` : `${st} 선택`}
                        className={`flex items-center gap-1 select-none transition-opacity ${!isAllowed ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
                          }`}
                      >
                        <input
                          type="radio"
                          name="career-form-status"
                          disabled={!isAllowed}
                          checked={isSelected}
                          onChange={() => isAllowed && setFormType(st)}
                          className="w-3.5 h-3.5 accent-[#ef5a27] cursor-pointer disabled:cursor-not-allowed"
                        />
                        <span className={`text-[12.5px] ${isSelected ? 'font-bold text-[#0e1225]' : isAllowed ? 'text-[#334155]' : 'text-[#94a3b8] line-through'}`}>
                          {st}
                        </span>
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* 3. 비고(변경사유) (5/12) */}
              <div className="md:col-span-5 flex flex-col gap-1">
                <label className="font-bold text-[#0e1225] text-[13px]">
                  비고(변경사유)
                </label>
                <input
                  type="text"
                  value={formReason}
                  onChange={e => setFormReason(e.target.value)}
                  placeholder="예: 육아휴직, 개인사정 등"
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddOrUpdateItem()
                    }
                  }}
                  className="w-full h-[36px] border border-[#c2cfdf] rounded-[6px] px-3 text-[13px] text-[#0e1225] bg-white focus:outline-none focus:border-[#2a3461]"
                />
              </div>
            </div>

            {/* 중앙 주황색 추가/수정 버튼 */}
            <div className="flex flex-col items-center justify-center pt-2 gap-1">
              <button
                type="button"
                onClick={handleAddOrUpdateItem}
                disabled={validStatuses.length === 0}
                className={`h-[36px] px-7 rounded-[6px] text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer ${validStatuses.length === 0
                  ? 'bg-[#cbd5e1] text-white cursor-not-allowed'
                  : 'bg-[#ef5a27] text-white hover:bg-[#d94e1f]'
                  }`}
              >
                <span>{editingId ? '수정 반영' : '이력 추가'}</span>
              </button>

              {/* 피드백 메시지 */}
              {recentAddedMsg && (
                <span className="text-[#16a34a] text-[12px] font-bold flex items-center gap-1 animate-in fade-in duration-150">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {recentAddedMsg}
                </span>
              )}
            </div>
          </div>

          {/* 3-2. 전체 재직 이력 목록 테이블 영역 */}
          <div className="flex-1 min-h-0 flex flex-col gap-2 overflow-hidden">
            <div className="flex items-center justify-between shrink-0">
              <span className="font-bold text-[#0e1225] text-[14px]">
                • 전체 재직 이력 목록 ({draftList.length}건)
              </span>
              {errorCount > 0 && (
                <span className="text-[12px] text-[#dc2626] font-bold bg-[#fef2f2] px-2.5 py-0.5 rounded-[4px] border border-[#fecaca]">
                  상태 전이 오류 {errorCount}건 발견 (수정 필요)
                </span>
              )}
            </div>

            <div className="flex-1 min-h-0 border border-[#c2cfdf] rounded-[8px] overflow-y-auto bg-white shadow-2xs">
              <table className="w-full border-collapse text-[13px]">
                <thead className="sticky top-0 z-10 bg-[#f4f7fc] shadow-2xs">
                  <tr className="border-b border-[#c2cfdf] text-[#334155] font-bold h-[44px]">
                    <th className="px-2 text-center w-[70px] border-r border-[#c2cfdf] whitespace-nowrap align-middle">연번 ↕</th>
                    <th className="px-3 text-center w-[120px] border-r border-[#c2cfdf] whitespace-nowrap align-middle">상태 ↕</th>
                    <th className="px-3 text-center w-[130px] border-r border-[#c2cfdf] whitespace-nowrap align-middle">적용 일자 ↕</th>
                    <th className="px-4 text-left border-r border-[#c2cfdf] whitespace-nowrap align-middle">비고(사유) ↕</th>
                    <th className="px-2 text-center w-[60px] border-r border-[#c2cfdf] whitespace-nowrap align-middle">연동</th>
                    <th className="px-2 text-center w-[130px] whitespace-nowrap align-middle">관리</th>
                  </tr>
                </thead>
                <tbody>
                  {draftList.length === 0 ? (
                    <tr className="border-b border-[#c2cfdf]">
                      <td colSpan={6} className="text-center py-10 text-[#8a9cb4]">
                        등록된 재직 이력이 없습니다. 상단 폼에서 이력을 추가해 주세요.
                      </td>
                    </tr>
                  ) : (
                    draftList.map((item, idx) => {
                      const color = STATUS_COLOR_MAP[item.type] || { bg: 'bg-[#f1f5f9]', text: 'text-[#64748b]', border: 'border-[#cbd5e1]' }
                      const isEditingThis = editingId === item.id
                      const hasError = !!chainErrors[item.id]

                      return (
                        <tr
                          key={item.id || idx}
                          className={`border-b border-[#c2cfdf] transition-colors ${hasError
                            ? 'bg-[#fff1f2] hover:bg-[#ffe4e6]'
                            : isEditingThis
                              ? 'bg-[#fffbeb]'
                              : 'hover:bg-[#f8fafc]'
                            }`}
                        >
                          {/* 연번 */}
                          <td className="px-3 py-2.5 text-center font-mono font-medium text-[#475569] border-r border-[#c2cfdf]">
                            {idx + 1}
                          </td>

                          {/* 상태 */}
                          <td className="px-3 py-2.5 text-center border-r border-[#c2cfdf]">
                            <div className="flex flex-col items-center gap-0.5">
                              <span className={`px-2.5 py-0.5 rounded-[4px] text-[12px] font-bold border inline-block ${color.bg} ${color.text} ${color.border}`}>
                                {item.type}
                              </span>
                              {hasError && (
                                <span className="text-[11px] text-[#dc2626] font-semibold leading-tight">
                                  {chainErrors[item.id]}
                                </span>
                              )}
                            </div>
                          </td>

                          {/* 적용 일자 */}
                          <td className="px-3 py-2.5 text-center font-mono font-medium text-[#0e1225] border-r border-[#c2cfdf]">
                            {item.date ? item.date.replace(/-/g, '.') : '-'}
                          </td>

                          {/* 비고(사유) */}
                          <td className="px-4 py-2.5 text-[#475569] border-r border-[#c2cfdf] max-w-[240px] truncate" title={item.reason || ''}>
                            {item.reason || '-'}
                          </td>

                          {/* 연동 */}
                          <td className="px-2 py-2.5 text-center border-r border-[#c2cfdf]">
                            {item.syncStatus === '희' ? (
                              <span className="w-[20px] h-[20px] inline-flex items-center justify-center bg-[#0093a9] text-white text-[11px] font-bold rounded-[3px] leading-none" title="희망이음 연동">
                                희
                              </span>
                            ) : (
                              <span className="text-[#94a3b8] text-[12px]">-</span>
                            )}
                          </td>

                          {/* 관리 버튼 (수정, 삭제) */}
                          <td className="px-2 py-2.5 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleEditRow(item)}
                                className={`px-2.5 py-0.5 border rounded-[4px] text-[11.5px] font-medium transition-colors cursor-pointer ${isEditingThis
                                  ? 'bg-[#1e293b] text-white border-[#1e293b]'
                                  : 'border-[#c2cfdf] text-[#475569] hover:bg-[#f1f5f9] hover:text-[#0e1225]'
                                  }`}
                              >
                                {isEditingThis ? '수정중' : '수정'}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteRow(item.id)}
                                title="이력 삭제"
                                className="px-2.5 py-0.5 border border-[#fecaca] text-[#e11d48] hover:bg-[#fee2e2] rounded-[4px] text-[11.5px] font-medium transition-colors cursor-pointer"
                              >
                                삭제
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 4. 풋터 */}
        <div className="px-6 py-3.5 border-t border-[#e2e8f0] bg-[#fafbfc] flex items-center justify-between shrink-0">
          <span className="text-[12px] text-[#64748b]">
            *저장 시 최종 이력 기준으로 종사자의 재직 상태가 자동 업데이트됩니다.
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="h-[36px] px-4 rounded-[6px] text-[13px] font-semibold text-[#64748b] hover:bg-[#f1f5f9] cursor-pointer"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="h-[36px] px-5 bg-[#1e293b] text-white rounded-[6px] text-[13px] font-bold flex items-center gap-1.5 shadow-xs hover:bg-[#0f172a] cursor-pointer"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              전체 저장
            </button>
          </div>
        </div>
      </div>

      {/* ─── 디자인 시스템 전용 달력 모달 ─── */}
      <DatePickerModal
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        selectedDate={formDate ? new Date(formDate) : new Date()}
        onSelectDate={d => {
          const newDateStr = formatDateString(d)
          setFormDate(newDateStr)
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

// ─── 4대보험 상태 및 파생 헬퍼 ───────────────────────────────────────────────

const INSURANCE_STATUS_COLOR_MAP: Record<InsuranceStatus, { bg: string; text: string; border: string }> = {
  취득: { bg: 'bg-[#e8f8ed]', text: 'text-[#1c9640]', border: 'border-[#c6f0d2]' },
  상실: { bg: 'bg-[#f1f5f9]', text: 'text-[#64748b]', border: 'border-[#cbd5e1]' },
}

export function isItemMatchingInsurance(itemType: string, target: '국민연금' | '건강보험' | '고용보험' | '산재보험'): boolean {
  if (itemType === '4대보험 전체') return true
  if (itemType === target) return true
  const shortMap: Record<string, string> = { 국민연금: '국', 건강보험: '건', 고용보험: '고', 산재보험: '산' }
  const short = shortMap[target]
  if (itemType.includes(target) || itemType.split(/[,·/ +]+/).includes(short)) return true
  return false
}

export function parseInsurancesFromType(item: InsuranceHistoryItem): ('국민연금' | '건강보험' | '고용보험' | '산재보험')[] {
  if (item.syncedInsurances && item.syncedInsurances.length > 0) {
    return item.syncedInsurances
  }
  if (item.insuranceType === '4대보험 전체') {
    return ['국민연금', '건강보험', '고용보험', '산재보험']
  }
  const result: ('국민연금' | '건강보험' | '고용보험' | '산재보험')[] = []
  const raw = item.insuranceType
  if (raw.includes('국민연금') || raw.split(/[,·/ +]+/).includes('국')) result.push('국민연금')
  if (raw.includes('건강보험') || raw.split(/[,·/ +]+/).includes('건')) result.push('건강보험')
  if (raw.includes('고용보험') || raw.split(/[,·/ +]+/).includes('고')) result.push('고용보험')
  if (raw.includes('산재보험') || raw.split(/[,·/ +]+/).includes('산')) result.push('산재보험')
  return result.length > 0 ? result : (['국민연금', '건강보험', '고용보험', '산재보험'].filter(k => k === raw) as any)
}

export function formatSelectedInsuranceType(selected: ('국민연금' | '건강보험' | '고용보험' | '산재보험')[]): InsuranceType {
  if (selected.length === 4) return '4대보험 전체'
  if (selected.length === 1) return selected[0]
  const order: ('국민연금' | '건강보험' | '고용보험' | '산재보험')[] = ['국민연금', '건강보험', '고용보험', '산재보험']
  const shortMap: Record<string, string> = { 국민연금: '국', 건강보험: '건', 고용보험: '고', 산재보험: '산' }
  const sorted = order.filter(k => selected.includes(k))
  return sorted.map(k => shortMap[k]).join('·') as InsuranceType
}

export function formatInsuranceTypeShort(type: string): string {
  if (type === '4대보험 전체') return '국·건·고·산'
  if (type === '국민연금') return '국'
  if (type === '건강보험') return '건'
  if (type === '고용보험') return '고'
  if (type === '산재보험') return '산'
  const map: Record<string, string> = {
    국민연금: '국',
    건강보험: '건',
    고용보험: '고',
    산재보험: '산',
    '4대보험 전체': '국·건·고·산',
  }
  const parts = type.split(/[,·/ +]+/).map(p => map[p.trim()] || p.trim()).filter(Boolean)
  return parts.length > 0 ? parts.join('·') : type
}

export function formatTenureText(startDateStr?: string | null, endDateStr?: string | null): string {
  if (!startDateStr) return '근속 1개월'
  const start = new Date(startDateStr)
  const end = endDateStr ? new Date(endDateStr) : new Date()
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return '근속 1개월'

  let totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
  if (end.getDate() >= start.getDate()) {
    totalMonths += 1
  }
  if (totalMonths < 1) totalMonths = 1

  const years = Math.floor(totalMonths / 12)
  const remMonths = totalMonths % 12

  if (years > 0 && remMonths > 0) {
    return `근속 ${years}년 ${remMonths}개월`
  } else if (years > 0) {
    return `근속 ${years}년`
  } else {
    return `근속 ${totalMonths}개월`
  }
}

export function formatSyncedInsurances(item: InsuranceHistoryItem): string {
  if (item.syncedInsurances && item.syncedInsurances.length > 0) {
    const map: Record<string, string> = {
      국민연금: '국',
      건강보험: '건',
      고용보험: '고',
      산재보험: '산',
    }
    return item.syncedInsurances.map(k => map[k] || k).join('·')
  }
  if (item.syncStatus === '희' || item.syncStatus === '연동') {
    return formatInsuranceTypeShort(item.insuranceType)
  }
  return '-'
}

export function deriveInsuranceStatus(history: InsuranceHistoryItem[] = [], hireDate: string) {
  const today = formatDateString(new Date())
  const sorted = [...(history || [])].sort((a, b) => a.date.localeCompare(b.date))
  const effectiveItems = sorted.filter(item => item.date <= today)

  const getStatusForType = (type: '국민연금' | '건강보험' | '고용보험' | '산재보험') => {
    const matches = effectiveItems.filter(item => isItemMatchingInsurance(item.insuranceType, type))
    if (matches.length === 0) {
      return { status: '취득' as InsuranceStatus, date: hireDate || '-', reason: '', monthlyWage: undefined, unemploymentApplied: undefined }
    }
    const last = matches[matches.length - 1]
    // 마지막으로 입력된 보수월액이나 실업급여 적용여부 찾기 (역순 검색)
    const lastWithWage = [...matches].reverse().find(m => m.monthlyWage !== undefined)
    const lastWithUnemployment = [...matches].reverse().find(m => m.unemploymentApplied !== undefined)

    return {
      status: last.status,
      date: last.date,
      reason: last.reason,
      monthlyWage: lastWithWage?.monthlyWage,
      unemploymentApplied: lastWithUnemployment?.unemploymentApplied,
    }
  }

  const pension = getStatusForType('국민연금')
  const health = getStatusForType('건강보험')
  const employment = getStatusForType('고용보험')
  const workComp = getStatusForType('산재보험')

  return {
    pension,
    health,
    employment,
    workComp,
    currentMonthlyWage: pension.monthlyWage,
    currentUnemploymentApplied: employment.unemploymentApplied,
  }
}

// ─── 4대보험 수정 이력 감사 모달 (마스터-디테일 와이드 레이아웃) ───────────

function InsuranceAuditModal({
  employee,
  onClose,
}: {
  employee: Employee
  onClose: () => void
}) {
  const logs = employee.insuranceAuditLogs || []
  const [selectedLogId, setSelectedLogId] = useState<string>(() => {
    return logs[0]?.id || ''
  })

  // 로그가 없을 때 현재 상태를 단일 로그 형태로 표시하는 fallback
  const currentFallbackLog: InsuranceAuditLog = useMemo(() => {
    return {
      id: 'IAL-CURRENT',
      updatedAt: formatDateTimeString(new Date()),
      author: { name: '시스템', id: 'system' },
      summary: '현재 등록된 4대보험 이력 기준',
      beforeList: [],
      afterList: employee.insuranceHistory || [],
    }
  }, [employee])

  const activeLog = logs.find(l => l.id === selectedLogId) || logs[0] || currentFallbackLog

  return (
    <div className="fixed inset-0 z-[75] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/45 backdrop-blur-xs transition-opacity" onClick={onClose} />

      {/* Modal Card (마스터-디테일 와이드 컨테이너) */}
      <div className="relative bg-white rounded-[16px] shadow-[0px_20px_60px_rgba(0,0,0,0.25)] w-[96vw] max-w-[1280px] h-[800px] max-h-[90vh] flex flex-col overflow-hidden border border-[#c2cfdf] animate-in fade-in zoom-in-95 duration-200">
        {/* 1. Modal Header */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-[#c2cfdf] bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[8px] bg-[#eef2f8] flex items-center justify-center text-[#2a3461]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[17px] text-[#0e1225] tracking-tight">4대보험 수정 이력 관리</span>
                <span className="px-2.5 py-0.5 bg-[#eef2f8] text-[#2a3461] rounded-[4px] text-[12px] font-bold border border-[#d8e2ee]">
                  {employee.name} ({employee.job})
                </span>
                <span className="text-[12px] text-[#64748b] font-medium">
                  총 {logs.length > 0 ? logs.length : 1}개의 변경 세션
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-[6px] text-[#8a9cb4] hover:text-[#0e1225] hover:bg-[#f1f5f9] transition-colors cursor-pointer"
            title="닫기"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 2. Modal Body: 마스터-디테일 레이아웃 (좌측 변경일시 목록 + 우측 변경 전/후 2단 비교) */}
        <div className="flex-1 flex min-h-0 overflow-hidden">
          {/* ─── 좌측 마스터 패널: 변경일시 목록 (타임라인 카드) ─── */}
          <div className="w-[300px] shrink-0 border-r border-[#c2cfdf] bg-[#f8fafc] flex flex-col min-h-0">
            <div className="px-4 py-3 border-b border-[#c2cfdf] bg-[#f1f5f9] flex items-center justify-between shrink-0">
              <span className="font-bold text-[13px] text-[#334155] flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 8v4l3 3" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
                변경일시 목록
              </span>
              <span className="text-[11px] font-bold text-[#64748b] bg-white px-2 py-0.5 rounded-[4px] border border-[#cbd5e1]">
                {logs.length > 0 ? `${logs.length}건` : '1건'}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-2.5 flex flex-col gap-2">
              {logs.length === 0 ? (
                <div className="p-4 text-center text-[#94a3b8] text-[12.5px]">
                  등록된 수정 이력이 없습니다.
                </div>
              ) : (
                logs.map((log, idx) => {
                  const isSelected = log.id === activeLog.id
                  const isLatest = idx === 0
                  return (
                    <div
                      key={log.id}
                      onClick={() => setSelectedLogId(log.id)}
                      className={`p-3 rounded-[8px] border transition-all cursor-pointer flex flex-col gap-1.5 select-none ${
                        isSelected
                          ? 'bg-[#eff6ff] border-[#2563eb] shadow-xs ring-1 ring-[#2563eb]'
                          : 'bg-white border-[#c2cfdf] hover:border-[#94a3b8] hover:bg-[#fafbfc]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-[12.5px] font-bold font-mono text-[#0e1225]">
                          <span>{log.updatedAt}</span>
                        </div>
                        {isLatest && (
                          <span className="px-1.5 py-0.5 bg-[#dbeafe] text-[#1e40af] text-[10.5px] font-bold rounded">
                            최신
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-[12px]">
                        <span className="font-semibold text-[#475569] flex items-center gap-1">
                          <span className="text-[#94a3b8]">변경자:</span>
                          <strong className="text-[#1e3a8a]">{log.author.name}</strong>
                          <span className="font-mono text-[11px] text-[#64748b]">({log.author.id})</span>
                        </span>
                      </div>
                      <div className="text-[11.5px] text-[#64748b] truncate bg-white/60 p-1 rounded border border-[#e2e8f0]" title={log.summary}>
                        {log.summary}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          {/* ─── 우측 디테일 패널: 선택된 시점의 변경 전 vs 변경 후 2단 대조 ─── */}
          <div className="flex-1 flex flex-col min-w-0 bg-[#eaedf2] overflow-hidden">
            {/* 상단 선택 로그 요약 정보 바 */}
            <div className="px-5 py-2.5 bg-white border-b border-[#c2cfdf] flex items-center justify-between flex-wrap gap-2 text-[12.5px] shrink-0">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-[#475569]">선택된 변경일시:</span>
                  <span className="font-mono font-bold text-[#0e1225] bg-[#f8fafc] px-2.5 py-1 rounded-[6px] border border-[#c2cfdf]">
                    {activeLog.updatedAt}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-[#475569]">변경한 사람:</span>
                  <span className="font-bold text-[#1e40af] bg-[#eff6ff] px-2.5 py-1 rounded-[6px] border border-[#bfdbfe]">
                    {activeLog.author.name} <span className="font-mono text-[11.5px] text-[#3b82f6]">({activeLog.author.id})</span>
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-[#475569]">변경 요약:</span>
                <span className="font-bold text-[#0e1225] bg-[#fffbeb] px-2.5 py-1 rounded-[6px] border border-[#fde68a] text-[12px]">
                  {activeLog.summary}
                </span>
              </div>
            </div>

            {/* 본문: 변경 전 vs 변경 후 2단 수평 테이블 대조 */}
            <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-3 min-h-0">
              <div className="grid grid-cols-2 gap-3 h-full min-h-[420px]">
                {/* 좌측: 변경 전 (Before) */}
                <div className="flex flex-col bg-white border border-[#c2cfdf] rounded-[8px] overflow-hidden shadow-2xs">
                  <div className="px-4 py-2.5 bg-[#f4f7fc] border-b border-[#c2cfdf] flex items-center justify-between shrink-0">
                    <span className="font-bold text-[13.5px] text-[#475569] flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#94a3b8]" />
                      변경 전 4대보험 이력 ({activeLog.beforeList.length}건)
                    </span>
                    <span className="text-[11.5px] text-[#64748b] font-medium">수정 전 스냅샷</span>
                  </div>
                  <div className="flex-1 overflow-auto">
                    <table className="w-full border-collapse text-[12px]">
                      <thead className="sticky top-0 z-10 bg-[#f8fafc] shadow-2xs">
                        <tr className="border-b border-[#c2cfdf] text-[#475569] font-bold h-[36px]">
                          <th className="px-1.5 text-center w-[40px] border-r border-[#c2cfdf] whitespace-nowrap">연번</th>
                          <th className="px-2 text-center w-[90px] border-r border-[#c2cfdf] whitespace-nowrap">적용일자</th>
                          <th className="px-2 text-left w-[95px] border-r border-[#c2cfdf] whitespace-nowrap">보험구분</th>
                          <th className="px-1.5 text-center w-[55px] border-r border-[#c2cfdf] whitespace-nowrap">상태</th>
                          <th className="px-2 text-right w-[100px] border-r border-[#c2cfdf] whitespace-nowrap">보수월액</th>
                          <th className="px-2.5 text-left whitespace-nowrap">비고/사유</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeLog.beforeList.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="text-center py-16 text-[#94a3b8]">
                              이전 등록된 4대보험 이력이 없습니다.
                            </td>
                          </tr>
                        ) : (
                          activeLog.beforeList.map((item, idx) => (
                            <tr key={item.id || idx} className="border-b border-[#c2cfdf] h-[40px] bg-[#fafbfc] hover:bg-[#f1f5f9]">
                              <td className="px-1.5 text-center font-mono text-[#64748b] border-r border-[#c2cfdf] whitespace-nowrap">{item.seq ?? idx + 1}</td>
                              <td className="px-2 text-center font-mono text-[#475569] border-r border-[#c2cfdf] whitespace-nowrap">{item.date}</td>
                              <td className="px-2 text-left font-medium text-[#475569] border-r border-[#c2cfdf] truncate max-w-[100px] whitespace-nowrap" title={item.insuranceType}>
                                {formatInsuranceTypeShort(item.insuranceType)}
                              </td>
                              <td className="px-1.5 text-center border-r border-[#c2cfdf] whitespace-nowrap">
                                <span className="px-2 py-0.5 rounded-[4px] text-[11px] font-bold bg-[#f1f5f9] text-[#475569] border border-[#cbd5e1] inline-block">
                                  {item.status}
                                </span>
                              </td>
                              <td className="px-2 text-right font-mono text-[#475569] border-r border-[#c2cfdf] whitespace-nowrap">
                                {item.monthlyWage ? `${item.monthlyWage.toLocaleString()}원` : '-'}
                              </td>
                              <td className="px-2.5 text-left text-[#64748b] truncate max-w-[160px]" title={item.reason}>
                                {item.reason || '-'}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 우측: 변경 후 (After) */}
                <div className="flex flex-col bg-white border border-[#2a3461]/40 rounded-[8px] overflow-hidden shadow-2xs">
                  <div className="px-4 py-2.5 bg-[#eef2f8] border-b border-[#2a3461]/30 flex items-center justify-between shrink-0">
                    <span className="font-bold text-[13.5px] text-[#1e3a8a] flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb]" />
                      변경 후 최종 반영 목록 ({activeLog.afterList.length}건)
                    </span>
                    <span className="text-[11.5px] font-bold text-[#2563eb]">저장된 상태</span>
                  </div>
                  <div className="flex-1 overflow-auto">
                    <table className="w-full border-collapse text-[12.5px]">
                      <thead className="sticky top-0 z-10 bg-[#f8fafc] shadow-2xs">
                        <tr className="border-b border-[#c2cfdf] text-[#334155] font-bold h-[36px]">
                          <th className="px-1.5 text-center w-[40px] border-r border-[#c2cfdf] whitespace-nowrap">연번</th>
                          <th className="px-2 text-center w-[90px] border-r border-[#c2cfdf] whitespace-nowrap">적용일자</th>
                          <th className="px-2 text-left w-[95px] border-r border-[#c2cfdf] whitespace-nowrap">보험구분</th>
                          <th className="px-1.5 text-center w-[55px] border-r border-[#c2cfdf] whitespace-nowrap">상태</th>
                          <th className="px-2 text-right w-[100px] border-r border-[#c2cfdf] whitespace-nowrap">보수월액</th>
                          <th className="px-2.5 text-left border-r border-[#c2cfdf] whitespace-nowrap">비고/사유</th>
                          <th className="px-2 text-center w-[70px] whitespace-nowrap">상태</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeLog.afterList.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="text-center py-16 text-[#94a3b8]">
                              4대보험 이력이 비어 있습니다.
                            </td>
                          </tr>
                        ) : (
                          activeLog.afterList.map((item, idx) => {
                            const isNew = !activeLog.beforeList.some(b => b.id === item.id)
                            const isModified = !isNew && activeLog.beforeList.some(b => b.id === item.id && (
                              b.date !== item.date ||
                              b.insuranceType !== item.insuranceType ||
                              b.status !== item.status ||
                              b.monthlyWage !== item.monthlyWage ||
                              b.unemploymentApplied !== item.unemploymentApplied ||
                              b.reason !== item.reason
                            ))
                            const color = INSURANCE_STATUS_COLOR_MAP[item.status] || INSURANCE_STATUS_COLOR_MAP['취득']

                            return (
                              <tr
                                key={item.id || idx}
                                className={`border-b border-[#c2cfdf] h-[40px] transition-colors ${
                                  isNew
                                    ? 'bg-[#f0fdf4] hover:bg-[#dcfce7]'
                                    : isModified
                                      ? 'bg-[#fffbeb] hover:bg-[#fef3c7]'
                                      : 'bg-white hover:bg-[#f8fafc]'
                                }`}
                              >
                                <td className="px-1.5 text-center font-mono text-[#0e1225] border-r border-[#c2cfdf] whitespace-nowrap">{item.seq ?? idx + 1}</td>
                                <td className="px-2 text-center font-mono font-bold text-[#0e1225] border-r border-[#c2cfdf] whitespace-nowrap">{item.date}</td>
                                <td className="px-2 text-left font-semibold text-[#2a3461] border-r border-[#c2cfdf] truncate max-w-[100px] whitespace-nowrap" title={item.insuranceType}>
                                  {formatInsuranceTypeShort(item.insuranceType)}
                                </td>
                                <td className="px-1.5 text-center border-r border-[#c2cfdf] whitespace-nowrap">
                                  <span className={`px-2 py-0.5 rounded-[4px] text-[11px] font-bold border inline-block ${color.bg} ${color.text} ${color.border}`}>
                                    {item.status}
                                  </span>
                                </td>
                                <td className="px-2 text-right font-mono font-semibold text-[#1e40af] border-r border-[#c2cfdf] whitespace-nowrap">
                                  {item.monthlyWage ? `${item.monthlyWage.toLocaleString()}원` : '-'}
                                </td>
                                <td className="px-2.5 text-left text-[#0e1225] border-r border-[#c2cfdf] truncate max-w-[160px]" title={item.reason}>
                                  {item.reason || '-'}
                                </td>
                                <td className="px-2 text-center whitespace-nowrap">
                                  {isNew ? (
                                    <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-[#dcfce7] text-[#15803d] border border-[#bbf7d0]">
                                      신규추가
                                    </span>
                                  ) : isModified ? (
                                    <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-[#fef3c7] text-[#b45309] border border-[#fde68a]">
                                      수정됨
                                    </span>
                                  ) : (
                                    <span className="text-[11.5px] text-[#94a3b8] font-medium">유지</span>
                                  )}
                                </td>
                              </tr>
                            )
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Modal Footer */}
        <div className="px-6 py-3 border-t border-[#c2cfdf] bg-[#fafbfc] flex items-center justify-between shrink-0">
          <div className="text-[12px] text-[#64748b]">
            * 좌측 목록에서 변경일시를 선택하면 해당 시점의 변경 전/후 상세 내역을 1:1로 대조할 수 있습니다.
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-[36px] px-6 bg-[#2a3461] text-white rounded-[8px] text-[13px] font-bold hover:bg-[#364275] transition-colors shadow-xs cursor-pointer"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  )
}


// ─── 4대보험 이력 통합 관리 모달 (Figma 1:1 패밀리룩 디자인) ─────────────────────

function InsuranceHistoryManageModal({
  employee,
  initialItem,
  onSave,
  onClose,
}: {
  employee: Employee
  initialItem?: InsuranceHistoryItem | null
  onSave: (updatedList: InsuranceHistoryItem[]) => void
  onClose: () => void
}) {
  const age = calcAge(employee.dob)

  const [draftList, setDraftList] = useState<InsuranceHistoryItem[]>(() => {
    const list = [...(employee.insuranceHistory || [])]
    return list
      .sort((a, b) => {
        if (a.date !== b.date) return a.date.localeCompare(b.date)
        return (a.seq ?? 0) - (b.seq ?? 0)
      })
      .map((item, idx) => ({ ...item, seq: idx + 1 }))
  })

  // 신규/수정 입력 폼 상태 (체크박스 다중 선택 지원)
  const [formDate, setFormDate] = useState<string>(() => {
    if (initialItem?.date) return initialItem.date
    return formatDateString(new Date())
  })
  const [selectedInsurances, setSelectedInsurances] = useState<('국민연금' | '건강보험' | '고용보험' | '산재보험')[]>(() => {
    if (initialItem?.insuranceType === '4대보험 전체') {
      return ['국민연금', '건강보험', '고용보험', '산재보험']
    }
    if (initialItem?.insuranceType && initialItem.insuranceType !== '4대보험 전체') {
      return [initialItem.insuranceType as '국민연금' | '건강보험' | '고용보험' | '산재보험']
    }
    return ['국민연금', '건강보험', '고용보험', '산재보험']
  })
  const [formStatus, setFormStatus] = useState<InsuranceStatus>(() => {
    if (initialItem?.status) return initialItem.status
    return '취득'
  })
  const [formMonthlyWage, setFormMonthlyWage] = useState<string>(() => {
    if (initialItem?.monthlyWage) return initialItem.monthlyWage.toLocaleString()
    return ''
  })
  const [formUnemploymentApplied, setFormUnemploymentApplied] = useState<boolean>(() => {
    if (initialItem?.unemploymentApplied !== undefined) return initialItem.unemploymentApplied
    return true
  })
  const [formReason, setFormReason] = useState<string>(initialItem?.reason || '')
  const [editingId, setEditingId] = useState<string | null>(initialItem?.id || null)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [showUnemploymentTooltip, setShowUnemploymentTooltip] = useState(false)
  const [recentAddedMsg, setRecentAddedMsg] = useState<string | null>(null)

  // 현재 유효 4대보험 요약
  const currentSummary = useMemo(() => {
    return deriveInsuranceStatus(draftList, employee.hireDate)
  }, [draftList, employee.hireDate])

  // ─── 적용일자(formDate) 기준 각 4개 보험의 직전 상태 파악 ───
  const statusAtFormDate = useMemo(() => {
    const existing = draftList
      .filter(item => (!editingId ? true : item.id !== editingId))
      .filter(item => item.date <= formDate)
      .sort((a, b) => a.date.localeCompare(b.date))

    const getStatus = (type: '국민연금' | '건강보험' | '고용보험' | '산재보험'): InsuranceStatus | '미가입' => {
      const matches = existing.filter(i => isItemMatchingInsurance(i.insuranceType, type))
      if (matches.length === 0) return '미가입'
      return matches[matches.length - 1].status
    }

    return {
      국민연금: getStatus('국민연금'),
      건강보험: getStatus('건강보험'),
      고용보험: getStatus('고용보험'),
      산재보험: getStatus('산재보험'),
    }
  }, [draftList, formDate, editingId])

  // ─── 선택된 상태(formStatus: '취득' | '상실')에 따라 적용 가능한 보험 목록 산출 ───
  const availableInsuranceMap = useMemo(() => {
    const checkAvailable = (type: '국민연금' | '건강보험' | '고용보험' | '산재보험') => {
      const current = statusAtFormDate[type]
      if (formStatus === '취득') {
        return current !== '취득' // 현재 상실(또는 미가입) 상태여야 취득 가능
      }
      if (formStatus === '상실') {
        return current === '취득' // 현재 취득 상태여야 상실 가능
      }
      return true
    }

    return {
      국민연금: { label: '국', available: checkAvailable('국민연금') },
      건강보험: { label: '건', available: checkAvailable('건강보험') },
      고용보험: { label: '고', available: checkAvailable('고용보험') },
      산재보험: { label: '산', available: checkAvailable('산재보험') },
    }
  }, [statusAtFormDate, formStatus])

  const allAvailableKeys = useMemo(() => {
    const keys: ('국민연금' | '건강보험' | '고용보험' | '산재보험')[] = []
    if (availableInsuranceMap.국민연금.available) keys.push('국민연금')
    if (availableInsuranceMap.건강보험.available) keys.push('건강보험')
    if (availableInsuranceMap.고용보험.available) keys.push('고용보험')
    if (availableInsuranceMap.산재보험.available) keys.push('산재보험')
    return keys
  }, [availableInsuranceMap])

  // 날짜나 상태 변경 시, 불가능한 보험은 선택 목록에서 자동 제외
  useEffect(() => {
    setSelectedInsurances(prev => {
      const next = prev.filter(k => availableInsuranceMap[k].available)
      if (next.length === 0 && allAvailableKeys.length > 0) {
        return allAvailableKeys
      }
      return next
    })
  }, [availableInsuranceMap, allAvailableKeys])

  const isAllChecked = allAvailableKeys.length > 0 && allAvailableKeys.every(k => selectedInsurances.includes(k))

  function handleToggleAll() {
    if (isAllChecked) {
      setSelectedInsurances([])
    } else {
      setSelectedInsurances(allAvailableKeys)
    }
  }

  function handleToggleInsurance(key: '국민연금' | '건강보험' | '고용보험' | '산재보험') {
    if (!availableInsuranceMap[key].available) return
    setSelectedInsurances(prev => {
      if (prev.includes(key)) {
        return prev.filter(k => k !== key)
      } else {
        return [...prev, key]
      }
    })
  }

  function handleStartEdit(item: InsuranceHistoryItem) {
    setEditingId(item.id)
    setFormDate(item.date)
    setSelectedInsurances(parseInsurancesFromType(item))
    setFormStatus(item.status)
    setFormMonthlyWage(item.monthlyWage ? item.monthlyWage.toLocaleString() : '')
    setFormUnemploymentApplied(item.unemploymentApplied !== undefined ? item.unemploymentApplied : true)
    setFormReason(item.reason || '')
    setShowUnemploymentTooltip(false)
  }

  function handleCancelEdit() {
    setEditingId(null)
    setFormDate(formatDateString(new Date()))
    setSelectedInsurances(allAvailableKeys)
    setFormStatus('취득')
    setFormMonthlyWage('')
    setFormUnemploymentApplied(true)
    setFormReason('')
    setShowUnemploymentTooltip(false)
  }

  function handleAddOrUpdate() {
    if (!formDate) {
      alert('적용 일자를 선택해 주세요.')
      return
    }

    if (selectedInsurances.length === 0) {
      alert('반영할 보험을 최소 1개 이상 선택해 주세요.')
      return
    }

    const wageNum = (formStatus === '취득' && selectedInsurances.includes('국민연금') && formMonthlyWage)
      ? parseInt(formMonthlyWage.replace(/[^0-9]/g, ''), 10)
      : undefined
    const unempApp = (formStatus === '취득' && selectedInsurances.includes('고용보험'))
      ? formUnemploymentApplied
      : undefined

    const targetType = formatSelectedInsuranceType(selectedInsurances)

    if (editingId) {
      // 단일 수정
      setDraftList(prev => {
        const next = prev.map(item =>
          item.id === editingId
            ? {
              ...item,
              date: formDate,
              insuranceType: targetType,
              status: formStatus,
              monthlyWage: wageNum,
              unemploymentApplied: unempApp,
              reason: formReason,
              syncedInsurances: [...selectedInsurances],
            }
            : item
        )
        return next
          .sort((a, b) => {
            if (a.date !== b.date) return a.date.localeCompare(b.date)
            return (a.seq ?? 0) - (b.seq ?? 0)
          })
          .map((item, idx) => ({ ...item, seq: idx + 1 }))
      })
      setRecentAddedMsg(`[${targetType} - ${formStatus}] 이력이 수정되었습니다.`)
      handleCancelEdit()
    } else {
      // 신규 등록: 선택한 모든 보험을 1개의 행(리스트)으로 묶어서 등록!
      const newItem: InsuranceHistoryItem = {
        id: `INS-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        seq: draftList.length + 1,
        date: formDate,
        insuranceType: targetType,
        status: formStatus,
        monthlyWage: wageNum,
        unemploymentApplied: unempApp,
        reason: formReason,
        syncStatus: '희',
        syncedInsurances: [...selectedInsurances],
      }

      setDraftList(prev => {
        const next = [...prev, newItem]
        return next
          .sort((a, b) => {
            if (a.date !== b.date) return a.date.localeCompare(b.date)
            return (a.seq ?? 0) - (b.seq ?? 0)
          })
          .map((item, idx) => ({ ...item, seq: idx + 1 }))
      })
      setRecentAddedMsg(`[${targetType} - ${formStatus}] 이력이 등록되었습니다.`)
      setFormMonthlyWage('')
      setFormReason('')
    }
  }

  function handleDeleteItem(id: string) {
    if (!confirm('해당 4대보험 이력을 삭제하시겠습니까?')) return
    setDraftList(prev =>
      prev
        .filter(i => i.id !== id)
        .map((item, idx) => ({ ...item, seq: idx + 1 }))
    )
    if (editingId === id) handleCancelEdit()
  }

  function handleFinalSave() {
    onSave(draftList)
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity" onClick={onClose} />
      <div className="relative bg-white rounded-[12px] shadow-[0px_20px_50px_rgba(0,0,0,0.2)] w-full max-w-[900px] h-[740px] flex flex-col overflow-hidden border border-[#c2cfdf] animate-in fade-in zoom-in-95 duration-200">
        {/* 1. Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#e2e8f0] bg-white shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[17px] text-[#0e1225] tracking-tight">4대보험 이력 관리</span>
            <span className="px-2 py-0.5 bg-[#eef2f8] text-[#2a3461] rounded-[4px] text-[11px] font-bold">
              총 {draftList.length}건
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center border border-[#c2cfdf] rounded-[4px] text-[#64748b] hover:text-[#0e1225] hover:bg-[#f1f5f9] cursor-pointer"
            title="닫기"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 2. Employee Summary Banner */}
        <div className="px-5 py-2.5 bg-[#fafbfc] border-b border-[#c2cfdf] flex items-center justify-between shrink-0 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[14px] text-[#0e1225]">{employee.name}</span>
            <span className="text-[12.5px] text-[#64748b]">{employee.dob} ({age}세)</span>
            <span className="px-2 py-0.5 bg-[#eef2f8] text-[#334155] rounded-[4px] text-[11.5px] font-semibold border border-[#d8e2ee]">
              {employee.job}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11.5px]">
            <span className="text-[#64748b] font-medium">현재 가입현황:</span>
            <span className={`px-1.5 py-0.5 rounded-[3px] font-bold border ${INSURANCE_STATUS_COLOR_MAP[currentSummary.pension.status]?.bg} ${INSURANCE_STATUS_COLOR_MAP[currentSummary.pension.status]?.text} ${INSURANCE_STATUS_COLOR_MAP[currentSummary.pension.status]?.border}`}>
              국민: {currentSummary.pension.status}
            </span>
            <span className={`px-1.5 py-0.5 rounded-[3px] font-bold border ${INSURANCE_STATUS_COLOR_MAP[currentSummary.health.status]?.bg} ${INSURANCE_STATUS_COLOR_MAP[currentSummary.health.status]?.text} ${INSURANCE_STATUS_COLOR_MAP[currentSummary.health.status]?.border}`}>
              건강: {currentSummary.health.status}
            </span>
            <span className={`px-1.5 py-0.5 rounded-[3px] font-bold border ${INSURANCE_STATUS_COLOR_MAP[currentSummary.employment.status]?.bg} ${INSURANCE_STATUS_COLOR_MAP[currentSummary.employment.status]?.text} ${INSURANCE_STATUS_COLOR_MAP[currentSummary.employment.status]?.border}`}>
              고용: {currentSummary.employment.status}
            </span>
            <span className={`px-1.5 py-0.5 rounded-[3px] font-bold border ${INSURANCE_STATUS_COLOR_MAP[currentSummary.workComp.status]?.bg} ${INSURANCE_STATUS_COLOR_MAP[currentSummary.workComp.status]?.text} ${INSURANCE_STATUS_COLOR_MAP[currentSummary.workComp.status]?.border}`}>
              산재: {currentSummary.workComp.status}
            </span>
          </div>
        </div>

        {/* 3. Modal Body */}
        <div className="flex-1 flex flex-col p-4 overflow-hidden gap-3 min-h-0">
          {/* Top: Figma 1:1 너비 100% 2단 그리드 이력 입력 카드 */}
          <div className={`p-4 rounded-[8px] border shrink-0 transition-colors ${editingId ? 'bg-[#fffbeb] border-[#fde68a]' : 'bg-white border-[#c2cfdf]'}`}>
            {/* 카드 상단: 신규 등록 / 수정 모드 타이틀 바 */}
            <div className={`flex items-center justify-between mb-3 pb-2 border-b ${editingId ? 'border-[#fef08a]' : 'border-[#e2e8f0]'}`}>
              <span className={`font-bold text-[13px] flex items-center gap-1.5 ${editingId ? 'text-[#b45309]' : 'text-[#0e1225]'}`}>
                <span className={`w-2 h-2 rounded-full ${editingId ? 'bg-[#d97706]' : 'bg-[#ef5a27]'}`} />
                {editingId ? '4대보험 이력 수정' : '신규 4대보험 이력 등록'}
              </span>
              <div className="flex items-center gap-2">
                {recentAddedMsg && (
                  <span className="text-[12px] text-[#16a34a] font-bold animate-in fade-in">
                    ✓ {recentAddedMsg}
                  </span>
                )}
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="text-[11.5px] font-semibold text-[#b45309] hover:underline cursor-pointer"
                  >
                    수정 취소 (신규 등록으로 전환)
                  </button>
                )}
              </div>
            </div>

            {/* 2단 그리드 (너비 100% 꽉 채우고 왼쪽 정렬) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-start w-full">
              {/* 1. 적용일자 (3/12) */}
              <div className="md:col-span-3 flex flex-col gap-1">
                <label className="font-bold text-[#0e1225] text-[13px]">
                  적용일자 <span className="text-[#ef4444]">*</span>
                </label>
                <div className="relative flex items-center w-full">
                  <input
                    type="text"
                    readOnly
                    value={formDate ? formDate.replace(/-/g, '.') : ''}
                    onClick={() => setIsDatePickerOpen(true)}
                    placeholder="YYYY.MM.DD"
                    className="w-full h-[36px] border border-[#c2cfdf] rounded-[6px] pl-3 pr-8 text-[13px] font-mono text-[#0e1225] bg-white cursor-pointer focus:outline-none focus:border-[#2a3461]"
                  />
                  <button
                    type="button"
                    onClick={() => setIsDatePickerOpen(true)}
                    className="absolute right-2 p-0.5 text-[#64748b] hover:text-[#1e293b] cursor-pointer"
                    title="달력 선택"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* 2. 상태 (3/12) */}
              <div className="md:col-span-3 flex flex-col gap-1">
                <label className="font-bold text-[#0e1225] text-[13px]">
                  구분 상태 <span className="text-[#ef4444]">*</span>
                </label>
                <div className="flex items-center gap-4 h-[36px] px-3 bg-white border border-[#c2cfdf] rounded-[6px] w-full">
                  {(['취득', '상실'] as const).map(st => (
                    <label key={st} className="flex items-center gap-1.5 cursor-pointer select-none text-[12.5px] font-medium text-[#334155]">
                      <input
                        type="radio"
                        name="insStatus"
                        value={st}
                        checked={formStatus === st}
                        onChange={() => setFormStatus(st)}
                        className="accent-[#ef5a27] w-3.5 h-3.5 cursor-pointer"
                      />
                      <span className={formStatus === st ? 'font-bold text-[#0e1225]' : 'text-[#334155]'}>{st}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 3. 반영보험 (6/12) */}
              <div className="md:col-span-6 flex flex-col gap-1">
                <label className="font-bold text-[#0e1225] text-[13px]">
                  반영보험 선택 <span className="text-[#ef4444]">*</span>
                </label>
                <div className="flex items-center gap-2 px-3 h-[36px] bg-white border border-[#c2cfdf] rounded-[6px] w-full justify-start">
                  {/* 전체 체크박스 토글 */}
                  <label
                    className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[12px] font-bold select-none cursor-pointer ${allAvailableKeys.length === 0
                      ? 'opacity-40 cursor-not-allowed text-[#94a3b8]'
                      : isAllChecked
                        ? 'bg-[#eef2f8] text-[#2a3461]'
                        : 'text-[#475569] hover:bg-[#f8fafc]'
                      }`}
                  >
                    <input
                      type="checkbox"
                      checked={isAllChecked}
                      disabled={allAvailableKeys.length === 0}
                      onChange={handleToggleAll}
                      className="accent-[#ef5a27] w-3.5 h-3.5 cursor-pointer"
                    />
                    <span>전체</span>
                  </label>

                  <div className="w-[1px] h-3.5 bg-[#cbd5e1] mx-1" />

                  {/* 국 / 건 / 고 / 산 개별 체크박스 */}
                  {(['국민연금', '건강보험', '고용보험', '산재보험'] as const).map(key => {
                    const info = availableInsuranceMap[key]
                    const isChecked = selectedInsurances.includes(key)
                    const isAvail = info.available
                    return (
                      <label
                        key={key}
                        title={!isAvail ? `${key}은(는) 해당 일자 기준 이미 [${statusAtFormDate[key]}] 상태여서 ${formStatus} 불가` : ''}
                        className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[12px] font-bold select-none ${!isAvail
                          ? 'opacity-35 text-[#94a3b8] cursor-not-allowed line-through'
                          : isChecked
                            ? 'bg-[#eef2f8] text-[#2a3461] cursor-pointer'
                            : 'text-[#475569] hover:bg-[#f8fafc] cursor-pointer'
                          }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          disabled={!isAvail}
                          onChange={() => handleToggleInsurance(key)}
                          className="accent-[#ef5a27] w-3.5 h-3.5 cursor-pointer"
                        />
                        <span>{info.label}</span>
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* 4. 조건부 옵션: 국민연금 보수월액 (취득 상태 + 국민연금 선택 시) */}
              {formStatus === '취득' && selectedInsurances.includes('국민연금') && (
                <div className={`${(formStatus === '취득' && selectedInsurances.includes('고용보험')) ? 'md:col-span-3' : 'md:col-span-4'} flex flex-col gap-1 animate-in fade-in duration-150`}>
                  <label className="font-bold text-[#0e1225] text-[13px]">
                    국민연금 보수월액
                  </label>
                  <div className="relative flex items-center w-full">
                    <input
                      type="text"
                      value={formMonthlyWage}
                      onChange={e => {
                        const raw = e.target.value.replace(/[^0-9]/g, '')
                        setFormMonthlyWage(raw ? parseInt(raw, 10).toLocaleString() : '')
                      }}
                      placeholder="금액 입력"
                      className="w-full h-[36px] border border-[#c2cfdf] rounded-[6px] pl-3 pr-8 text-right text-[13px] font-mono text-[#0e1225] bg-white focus:outline-none focus:border-[#2a3461]"
                    />
                    <span className="absolute right-3 text-[12px] text-[#64748b]">원</span>
                  </div>
                </div>
              )}

              {/* 5. 조건부 옵션: 실업급여 적용여부 (취득 상태 + 고용보험 선택 시) */}
              {formStatus === '취득' && selectedInsurances.includes('고용보험') && (
                <div className={`${(formStatus === '취득' && selectedInsurances.includes('국민연금')) ? 'md:col-span-3' : 'md:col-span-4'} flex flex-col gap-1 animate-in fade-in duration-150 relative`}>
                  <div className="flex items-center gap-1">
                    <label className="font-bold text-[#0e1225] text-[13px]">
                      실업급여 적용여부
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowUnemploymentTooltip(prev => !prev)}
                      className="w-4 h-4 rounded-full bg-[#eef2f8] text-[#2a3461] border border-[#cbd5e1] flex items-center justify-center text-[10px] font-bold hover:bg-[#2a3461] hover:text-white transition-colors cursor-pointer"
                      title="실업급여 적용 안내"
                    >
                      ℹ
                    </button>
                  </div>
                  <div className="flex items-center gap-4 px-3 h-[36px] bg-white border border-[#c2cfdf] rounded-[6px] w-full">
                    <label className="flex items-center gap-1.5 cursor-pointer select-none text-[12.5px] font-medium text-[#334155]">
                      <input
                        type="radio"
                        name="unempRadio"
                        checked={formUnemploymentApplied === true}
                        onChange={() => setFormUnemploymentApplied(true)}
                        className="accent-[#ef5a27] w-3.5 h-3.5 cursor-pointer"
                      />
                      <span className={formUnemploymentApplied === true ? 'font-bold text-[#0e1225]' : 'text-[#334155]'}>적용</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer select-none text-[12.5px] font-medium text-[#334155]">
                      <input
                        type="radio"
                        name="unempRadio"
                        checked={formUnemploymentApplied === false}
                        onChange={() => setFormUnemploymentApplied(false)}
                        className="accent-[#ef5a27] w-3.5 h-3.5 cursor-pointer"
                      />
                      <span className={formUnemploymentApplied === false ? 'font-bold text-[#0e1225]' : 'text-[#334155]'}>미적용</span>
                    </label>
                  </div>

                  {/* 안내 팝오버 툴팁 */}
                  {showUnemploymentTooltip && (
                    <div className="absolute top-[60px] left-0 z-30 w-[300px] p-2.5 bg-[#1e293b] text-white rounded-[6px] shadow-lg text-[11.5px] leading-relaxed animate-in fade-in slide-in-from-top-1">
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <span className="font-bold text-[#93c5fd] flex items-center gap-1">
                          💡 실업급여 적용 안내
                        </span>
                        <button
                          type="button"
                          onClick={() => setShowUnemploymentTooltip(false)}
                          className="text-[#94a3b8] hover:text-white text-[12px] leading-none"
                        >
                          ✕
                        </button>
                      </div>
                      <p className="text-[#f1f5f9]">
                        취업당시 만 65세 이상 근로자여도 실업급여분이 지속되는 종사자는 실업급여 가입 적용을 하셔야 합니다.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* 6. 비고(변경사유) 필드 */}
              <div className={`${
                (formStatus === '취득' && selectedInsurances.includes('국민연금') && selectedInsurances.includes('고용보험'))
                  ? 'md:col-span-6'
                  : (formStatus === '취득' && (selectedInsurances.includes('국민연금') || selectedInsurances.includes('고용보험')))
                    ? 'md:col-span-8'
                    : 'md:col-span-12'
              } flex flex-col gap-1`}>
                <label className="font-bold text-[#0e1225] text-[13px]">
                  비고(사유)
                </label>
                <input
                  type="text"
                  value={formReason}
                  onChange={e => setFormReason(e.target.value)}
                  placeholder="예: 입사 취득, 퇴사 상실, 보수변경 등"
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddOrUpdate()
                    }
                  }}
                  className="w-full h-[36px] border border-[#c2cfdf] rounded-[6px] px-3 text-[13px] text-[#0e1225] bg-white focus:outline-none focus:border-[#2a3461]"
                />
              </div>
            </div>

            {/* 중앙 하단 주황색 추가/수정 버튼 */}
            <div className="flex flex-col items-center justify-center pt-3 gap-1">
              <button
                type="button"
                onClick={handleAddOrUpdate}
                disabled={allAvailableKeys.length === 0}
                className={`h-[36px] px-7 rounded-[6px] text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer ${allAvailableKeys.length === 0
                  ? 'bg-[#cbd5e1] text-white cursor-not-allowed'
                  : 'bg-[#ef5a27] text-white hover:bg-[#d94e1f]'
                  }`}
              >
                <span>{editingId ? '수정 반영' : '이력 추가'}</span>
              </button>
            </div>
          </div>

          {/* Bottom: 4대보험 이력 목록 테이블 (Sticky Header, h-[44px]) */}
          <div className="flex-1 border border-[#c2cfdf] rounded-[6px] overflow-hidden flex flex-col bg-white shadow-2xs min-h-0">
            <div className="flex-1 overflow-y-auto">
              <table className="w-full border-collapse text-[13px]">
                <thead className="sticky top-0 z-10 bg-[#f4f7fc] shadow-2xs">
                  <tr className="border-b border-[#c2cfdf] text-[#334155] font-bold h-[44px]">
                    <th className="px-3 text-center w-[50px] border-r border-[#c2cfdf] whitespace-nowrap align-middle">연번 ↕</th>
                    <th className="px-3 text-center w-[110px] border-r border-[#c2cfdf] whitespace-nowrap align-middle">적용일자 ↕</th>
                    <th className="px-3 text-left w-[120px] border-r border-[#c2cfdf] whitespace-nowrap align-middle">보험구분 ↕</th>
                    <th className="px-3 text-center w-[85px] border-r border-[#c2cfdf] whitespace-nowrap align-middle">상태 ↕</th>
                    <th className="px-3 text-right w-[130px] border-r border-[#c2cfdf] whitespace-nowrap align-middle">국민연금 보수월액</th>
                    <th className="px-3 text-center w-[110px] border-r border-[#c2cfdf] whitespace-nowrap align-middle">실업급여</th>
                    <th className="px-3 text-left border-r border-[#c2cfdf] whitespace-nowrap align-middle">비고 / 사유</th>
                    <th className="px-3 text-center w-[140px] border-r border-[#c2cfdf] whitespace-nowrap align-middle">사업장 가입자명부 연동</th>
                    <th className="px-3 text-center w-[80px] whitespace-nowrap align-middle">관리</th>
                  </tr>
                </thead>
                <tbody>
                  {draftList.length === 0 ? (
                    <tr className="border-b border-[#c2cfdf]">
                      <td colSpan={9} className="text-center py-12 text-[#8a9cb4]">
                        등록된 4대보험 이력이 없습니다. 상단 폼에서 이력을 추가해 주세요.
                      </td>
                    </tr>
                  ) : (
                    draftList.map((item, idx) => {
                      const isEditing = item.id === editingId
                      const color = INSURANCE_STATUS_COLOR_MAP[item.status] || INSURANCE_STATUS_COLOR_MAP['취득']
                      const syncedText = formatSyncedInsurances(item)
                      const isSynced = syncedText !== '-'
                      return (
                        <tr
                          key={item.id}
                          className={`border-b border-[#c2cfdf] h-[44px] transition-colors ${isEditing ? 'bg-[#fffbeb]' : 'hover:bg-[#f8fafc]'}`}
                        >
                          <td className="px-3 text-center font-mono text-[#64748b] border-r border-[#c2cfdf] whitespace-nowrap align-middle">
                            {item.seq ?? idx + 1}
                          </td>
                          <td className="px-3 text-center font-mono text-[#0e1225] border-r border-[#c2cfdf] whitespace-nowrap align-middle">
                            {item.date ? item.date.replace(/-/g, '.') : '-'}
                          </td>
                          <td className="px-3 text-left font-semibold text-[#2a3461] border-r border-[#c2cfdf] whitespace-nowrap align-middle">
                            <span title={item.insuranceType}>{formatInsuranceTypeShort(item.insuranceType)}</span>
                          </td>
                          <td className="px-3 text-center border-r border-[#c2cfdf] whitespace-nowrap align-middle">
                            <span className={`px-2.5 py-0.5 rounded-[4px] text-[12px] font-bold border inline-block ${color.bg} ${color.text} ${color.border}`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="px-3 text-right font-mono font-semibold text-[#1e40af] border-r border-[#c2cfdf] whitespace-nowrap align-middle">
                            {item.monthlyWage ? `${item.monthlyWage.toLocaleString()}원` : '-'}
                          </td>
                          <td className="px-3 text-center border-r border-[#c2cfdf] whitespace-nowrap align-middle">
                            {item.unemploymentApplied !== undefined ? (
                              <span className={`px-2 py-0.5 rounded-[3px] text-[11px] font-semibold border ${item.unemploymentApplied
                                ? 'bg-[#ecfdf5] text-[#065f46] border-[#a7f3d0]'
                                : 'bg-[#fef2f2] text-[#991b1b] border-[#fecaca]'
                                }`}>
                                {item.unemploymentApplied ? '적용' : '미적용'}
                              </span>
                            ) : (
                              <span className="text-[#94a3b8]">-</span>
                            )}
                          </td>
                          <td className="px-3 text-left text-[#334155] border-r border-[#c2cfdf] align-middle">
                            {item.reason || '-'}
                          </td>
                          <td className="px-3 text-center font-semibold border-r border-[#c2cfdf] whitespace-nowrap align-middle">
                            {isSynced ? (
                              <span className="px-2 py-0.5 rounded-[3px] text-[11.5px] font-bold bg-[#e8f8ed] text-[#1c9640] border border-[#c6f0d2]" title="사업장 가입자명부 검증 확인">
                                {syncedText}
                              </span>
                            ) : (
                              <span className="text-[#94a3b8] font-bold">-</span>
                            )}
                          </td>
                          <td className="px-2 text-center whitespace-nowrap align-middle">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleStartEdit(item)}
                                className={`px-2.5 py-0.5 border rounded-[4px] text-[11.5px] font-medium transition-colors cursor-pointer ${isEditing
                                  ? 'bg-[#1e293b] text-white border-[#1e293b]'
                                  : 'border-[#c2cfdf] text-[#475569] hover:bg-[#f1f5f9] hover:text-[#0e1225]'
                                  }`}
                              >
                                {isEditing ? '수정중' : '수정'}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteItem(item.id)}
                                className="px-2.5 py-0.5 border border-[#fecaca] text-[#e11d48] hover:bg-[#fee2e2] rounded-[4px] text-[11.5px] font-medium transition-colors cursor-pointer"
                              >
                                삭제
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 4. Modal Footer */}
        <div className="px-5 py-3.5 border-t border-[#c2cfdf] bg-[#fafbfc] flex items-center justify-between shrink-0">
          <div className="text-[12px] text-[#64748b]">
            * 오늘 날짜 이하의 유효 이력을 기준으로 종사자의 4대보험 가입/상실 상태가 자동 도출됩니다.
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="h-[36px] px-4 border border-[#c2cfdf] rounded-[8px] text-[13px] font-semibold text-[#475569] hover:bg-[#f1f5f9] transition-colors cursor-pointer"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleFinalSave}
              className="h-[36px] px-5 bg-[#2a3461] text-white rounded-[8px] text-[13px] font-bold hover:bg-[#364275] transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              전체 저장
            </button>
          </div>
        </div>
      </div>

      {/* DatePickerModal 연동 */}
      <DatePickerModal
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        selectedDate={formDate ? new Date(formDate) : new Date()}
        onSelectDate={d => {
          setFormDate(formatDateString(d))
          setIsDatePickerOpen(false)
        }}
        title="적용 일자 선택"
      />
    </div>
  )
}

// ─── 희망이음 인력변경 신고 등록 모달 ─────────────────────────────────────────

function PersonnelChangeReportModal({
  employee,
  onSave,
  onClose,
}: {
  employee: Employee
  onSave: (report: PersonnelChangeReport) => void
  onClose: () => void
}) {
  const age = calcAge(employee.dob)
  const [reportType, setReportType] = useState<'채용(입사)' | '퇴사(퇴직)' | '직종/직무변경' | '휴직/복직'>('채용(입사)')
  const [changeDate, setChangeDate] = useState<string>(() => formatDateString(new Date()))
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [serviceType, setServiceType] = useState<string>('방문요양')
  const [job, setJob] = useState<JobType>(employee.job)
  const [employmentType, setEmploymentType] = useState<'정규직(상근)' | '계약직' | '시간제(파트타임)'>('정규직(상근)')
  const [weeklyHours, setWeeklyHours] = useState<number>(40)
  const [syncToLtc, setSyncToLtc] = useState<boolean>(true)
  const [reason, setReason] = useState<string>('')

  function handleSubmit() {
    if (!changeDate) {
      alert('변경(신고) 일자를 입력해 주세요.')
      return
    }

    const mappedStatus: '재직' | '퇴직' | '휴직' =
      reportType === '퇴사(퇴직)' ? '퇴직' : reportType === '휴직/복직' ? '휴직' : '재직'

    const newReport: PersonnelChangeReport = {
      id: `PCR-${Date.now()}`,
      startDate: changeDate,
      endDate: mappedStatus === '퇴직' ? changeDate : null,
      status: mappedStatus,
      serviceType: serviceType,
      tenureText: formatTenureText(changeDate, mappedStatus === '퇴직' ? changeDate : null),
    }

    onSave(newReport)
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/45 backdrop-blur-xs transition-opacity" onClick={onClose} />
      <div className="relative bg-white rounded-[16px] shadow-[0px_20px_60px_rgba(0,0,0,0.25)] w-full max-w-[620px] flex flex-col overflow-hidden border border-[#c2cfdf] animate-in fade-in zoom-in-95 duration-200">
        {/* 1. Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#c2cfdf] bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[8px] bg-[#fff5f0] border border-[#ffedd5] flex items-center justify-center text-[#ef5a27]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
              </svg>
            </div>
            <span className="font-bold text-[17px] text-[#0e1225] tracking-tight">희망이음 인력변경 신고 등록</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-[6px] text-[#8a9cb4] hover:text-[#0e1225] hover:bg-[#f1f5f9] transition-colors cursor-pointer" title="닫기">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 2. 대상자 요약 바 */}
        <div className="px-6 py-2.5 bg-[#f8fafc] border-b border-[#c2cfdf] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className={`w-[22px] h-[22px] rounded-[6px] flex items-center justify-center font-bold text-[12px] ${employee.gender === '여' ? 'bg-[#fdf2f8] text-[#e11d48]' : 'bg-[#eff6ff] text-[#2563eb]'}`}>
              {employee.gender === '여' ? '♀' : '♂'}
            </span>
            <span className="text-[15px] font-bold text-[#0e1225]">{employee.name}</span>
            <span className="text-[13px] text-[#64748b]">{employee.dob} ({age}세)</span>
            <span className="px-2 py-0.5 bg-[#eef2f8] text-[#2a3461] rounded-[4px] text-[12px] font-bold border border-[#d8e2ee]">
              {employee.job}
            </span>
          </div>
          <span className="text-[12px] font-semibold text-[#64748b]">
            현재 상태: <strong className="text-[#0e1225]">{employee.status}</strong>
          </span>
        </div>

        {/* 3. Form Body */}
        <div className="p-6 flex flex-col gap-4 overflow-y-auto max-h-[70vh] text-[13px]">
          {/* 3-1. 신고 구분 */}
          <div className="flex flex-col gap-1.5">
            <label className="font-bold text-[#0e1225] flex items-center gap-1">
              신고 구분 <span className="text-[#ef5a27]">*</span>
            </label>
            <div className="grid grid-cols-4 gap-2 bg-[#f8fafc] p-2 rounded-[8px] border border-[#e2e8f0]">
              {(['채용(입사)', '퇴사(퇴직)', '직종/직무변경', '휴직/복직'] as const).map(type => (
                <label
                  key={type}
                  className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-[6px] border text-[12.5px] font-semibold cursor-pointer transition-all ${
                    reportType === type
                      ? 'bg-[#2a3461] text-white border-[#2a3461] shadow-2xs'
                      : 'bg-white text-[#475569] border-[#cbd5e1] hover:bg-[#f1f5f9]'
                  }`}
                >
                  <input
                    type="radio"
                    name="report-type"
                    checked={reportType === type}
                    onChange={() => setReportType(type)}
                    className="hidden"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 3-2. 변경(신고) 일자 & 서비스 제공 형태 (2단 그리드) */}
          <div className="grid grid-cols-2 gap-3.5">
            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#0e1225] flex items-center gap-1">
                변경(신고) 일자 <span className="text-[#ef5a27]">*</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  readOnly
                  value={changeDate ? changeDate.replace(/-/g, '.') : ''}
                  onClick={() => setIsDatePickerOpen(true)}
                  placeholder="날짜 선택"
                  className="w-full h-[36px] border border-[#c2cfdf] rounded-[6px] px-3 pr-8 font-mono text-[13px] text-[#0e1225] bg-white cursor-pointer focus:outline-none focus:border-[#2a3461]"
                />
                <button
                  type="button"
                  onClick={() => setIsDatePickerOpen(true)}
                  className="absolute right-2 p-0.5 text-[#64748b] hover:text-[#1e293b] cursor-pointer"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#0e1225] flex items-center gap-1">
                서비스(급여) 형태 <span className="text-[#ef5a27]">*</span>
              </label>
              <select
                value={serviceType}
                onChange={e => setServiceType(e.target.value)}
                className="h-[36px] w-full bg-white border border-[#c2cfdf] rounded-[6px] px-3 text-[13px] text-[#0e1225] focus:outline-none focus:border-[#2a3461]"
              >
                <option value="방문요양">방문요양</option>
                <option value="방문목욕">방문목욕</option>
                <option value="방문간호">방문간호</option>
                <option value="주야간보호">주야간보호</option>
                <option value="단기보호">단기보호</option>
                <option value="시설급여">시설급여(요양원)</option>
              </select>
            </div>
          </div>

          {/* 3-3. 변경 직종 & 고용 형태 (2단 그리드) */}
          <div className="grid grid-cols-2 gap-3.5">
            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#0e1225] flex items-center gap-1">
                변경 직종 <span className="text-[#ef5a27]">*</span>
              </label>
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
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#0e1225]">고용 형태 / 주 소정시간</label>
              <div className="flex items-center gap-2">
                <select
                  value={employmentType}
                  onChange={e => setEmploymentType(e.target.value as any)}
                  className="flex-1 h-[36px] bg-white border border-[#c2cfdf] rounded-[6px] px-2.5 text-[13px] text-[#0e1225] focus:outline-none focus:border-[#2a3461]"
                >
                  <option value="정규직(상근)">정규직(상근)</option>
                  <option value="계약직">계약직</option>
                  <option value="시간제(파트타임)">시간제</option>
                </select>
                <div className="flex items-center gap-1 w-[85px]">
                  <input
                    type="number"
                    value={weeklyHours}
                    onChange={e => setWeeklyHours(Number(e.target.value))}
                    min={1}
                    max={52}
                    className="w-full h-[36px] bg-white border border-[#c2cfdf] rounded-[6px] px-2 text-center font-mono text-[13px] text-[#0e1225] focus:outline-none focus:border-[#2a3461]"
                  />
                  <span className="text-[12px] text-[#64748b] shrink-0">시간</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3-4. 공단/희망이음 연동 옵션 */}
          <div className="flex items-center justify-between p-3 bg-[#f1f5f9] rounded-[8px] border border-[#e2e8f0]">
            <div className="flex flex-col">
              <span className="font-bold text-[12.5px] text-[#0e1225]">희망이음 시스템 전송 연동</span>
              <span className="text-[11.5px] text-[#64748b]">저장과 동시에 공단 인력변경 신고 전문을 생성합니다.</span>
            </div>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={syncToLtc}
                onChange={e => setSyncToLtc(e.target.checked)}
                className="w-4 h-4 accent-[#ef5a27] rounded cursor-pointer"
              />
              <span className="text-[12.5px] font-bold text-[#2a3461]">공단 전송</span>
            </label>
          </div>

          {/* 3-5. 신고/변동 사유 */}
          <div className="flex flex-col gap-1">
            <label className="font-bold text-[#0e1225]">신고 / 변동 사유</label>
            <input
              type="text"
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="예: 신규 요양보호사 채용에 따른 인력배치 신고"
              className="w-full h-[36px] border border-[#c2cfdf] rounded-[6px] px-3 text-[13px] text-[#0e1225] bg-white focus:outline-none focus:border-[#2a3461]"
            />
          </div>
        </div>

        {/* 4. Footer */}
        <div className="px-6 py-3.5 border-t border-[#c2cfdf] bg-[#fafbfc] flex items-center justify-end gap-2 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="h-[36px] px-4 rounded-[8px] border border-[#c2cfdf] bg-white text-[#475569] text-[13px] font-semibold hover:bg-[#f1f5f9] transition-colors cursor-pointer"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="h-[36px] px-5 rounded-[8px] bg-[#ef5a27] text-white text-[13px] font-bold hover:bg-[#d94e1f] transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            신고서 등록 저장
          </button>
        </div>
      </div>

      {/* 달력 모달 */}
      <DatePickerModal
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        selectedDate={changeDate ? new Date(changeDate) : new Date()}
        onSelectDate={d => {
          setChangeDate(formatDateString(d))
          setIsDatePickerOpen(false)
        }}
        title="변경(신고) 일자 선택"
      />
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
  const [isCareerAuditModalOpen, setIsCareerAuditModalOpen] = useState(false)
  const [isCareerEditModalOpen, setIsCareerEditModalOpen] = useState(false)
  const [editingCareerItem, setEditingCareerItem] = useState<CareerHistoryItem | null>(null)
  const [isCertDetailModalOpen, setIsCertDetailModalOpen] = useState(false)
  const [selectedCertForDetail, setSelectedCertForDetail] = useState<CertificateItem | null>(null)
  const [isInsuranceManageModalOpen, setIsInsuranceManageModalOpen] = useState(false)
  const [isInsuranceAuditModalOpen, setIsInsuranceAuditModalOpen] = useState(false)
  const [editingInsuranceItem, setEditingInsuranceItem] = useState<InsuranceHistoryItem | null>(null)
  const [isPersonnelModalOpen, setIsPersonnelModalOpen] = useState(false)

  const selected = employees.find(e => e.id === selectedId) ?? employees[0] ?? null

  // 인력변경 신고 등록 핸들러
  function handleSavePersonnelReport(report: PersonnelChangeReport) {
    if (!selected) return
    const currentReports = selected.personnelChangeReports || [
      {
        id: `PCR-${selected.id}-init`,
        startDate: selected.hireDate || '2025-10-17',
        endDate: selected.retireDate || null,
        status: (selected.status === '퇴직' ? '퇴직' : selected.status === '휴직' ? '휴직' : '재직') as '재직' | '퇴직' | '휴직',
        serviceType: '방문요양',
        tenureText: formatTenureText(selected.hireDate, selected.retireDate),
      },
    ]

    const updatedList = [report, ...currentReports]
    const updatedEmployee: Employee = {
      ...selected,
      personnelChangeReports: updatedList,
    }

    setEmployees(prev => prev.map(e => (e.id === selected.id ? updatedEmployee : e)))
    setIsPersonnelModalOpen(false)
  }

  // 4대보험 현재 유효 상태 파생
  const selectedInsuranceStatus = useMemo(() => {
    if (!selected) return null
    return deriveInsuranceStatus(selected.insuranceHistory || [], selected.hireDate)
  }, [selected])

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

  // 오늘 날짜(date <= today) 기준 유효 이력(effectiveItem)으로부터 직원 상태 및 퇴직일 파생 (명세 10조, 11조)
  function deriveEmployeeStatusFromHistory(history: CareerHistoryItem[]): { status: WorkStatus; retireDate: string | null } {
    const today = formatDateString(new Date())
    const sorted = [...(history || [])]
      .map(item => ({
        ...item,
        type: (item.type === '입사' || (item.type as string) === '최초입사일') ? '재직' : item.type,
      }))
      .sort((a, b) => a.date.localeCompare(b.date))

    const effectiveItem = sorted.filter(item => item.date <= today).at(-1)

    if (!effectiveItem) {
      return { status: '재직', retireDate: null }
    }
    if (effectiveItem.type === '퇴직') {
      return { status: '퇴직', retireDate: effectiveItem.date }
    }
    if (effectiveItem.type === '휴직') {
      return { status: '휴직', retireDate: null }
    }
    if (effectiveItem.type === '보류') {
      return { status: '보류', retireDate: null }
    }
    return { status: '재직', retireDate: null }
  }

  // 2. 재직 이력 통합 관리 모달 저장 (체인 정렬 및 유효 상태 자동 파생 & 감사 로그 기록)
  function handleSaveCareerHistoryList(updatedList: CareerHistoryItem[]) {
    if (!selected) return

    let nextHistory = [...updatedList].sort((a, b) => a.date.localeCompare(b.date))
    nextHistory = nextHistory.map((item, idx) => ({ ...item, seq: idx + 1 }))

    // 오늘 날짜(effectiveItem) 기준 현재 상태 & 퇴사일 자동 산출
    const derived = deriveEmployeeStatusFromHistory(nextHistory)

    // 신규 감사 로그 생성
    const prevHistory = selected.careerHistory || []
    const newAuditLog: CareerAuditLog = {
      id: `CAL-${Date.now()}`,
      updatedAt: formatDateTimeString(new Date()),
      author: { name: '관리자', id: 'admin01' },
      summary: `재직 이력 저장 (${nextHistory.length}건 반영)`,
      beforeList: prevHistory,
      afterList: nextHistory,
    }

    const updated: Employee = {
      ...selected,
      status: derived.status,
      retireDate: derived.retireDate,
      careerHistory: nextHistory,
      careerAuditLogs: [newAuditLog, ...(selected.careerAuditLogs || [])],
    }
    handleSaveEmployee(updated)
    setIsCareerEditModalOpen(false)
    setEditingCareerItem(null)
  }

  // 3. 재직 이력 삭제 (사전 무결성 시뮬레이션 검증 및 유효 상태 재계산 & 감사 로그 기록)
  function handleDeleteCareerItem(itemId: string) {
    if (!selected) return

    // 1. 삭제 후 상태 체인 시뮬레이션 검증
    const simulated = (selected.careerHistory || [])
      .filter(i => i.id !== itemId)
      .map(item => ({
        ...item,
        type: (item.type === '입사' || (item.type as string) === '최초입사일') ? '재직' : item.type,
      }))
      .sort((a, b) => a.date.localeCompare(b.date))

    for (let i = 0; i < simulated.length - 1; i++) {
      const cur = simulated[i]
      const next = simulated[i + 1]
      const allowedNexts = ALLOWED_TRANSITIONS[cur.type] || ['휴직', '퇴직']

      if (!allowedNexts.includes(next.type)) {
        alert(
          `[삭제 불가] 해당 이력을 삭제하면 ${cur.date} [${cur.type}] 직후에 ${next.date} [${next.type}] 상태가 되어 연결 모순이 발생합니다.\n\n후속 이력을 먼저 수정하거나 삭제해 주세요.`
        )
        return
      }
    }

    if (!confirm('해당 재직 이력을 삭제하시겠습니까?')) return
    const prevHistory = selected.careerHistory || []
    let nextHistory = prevHistory.filter(item => item.id !== itemId)
    nextHistory = nextHistory.sort((a, b) => a.date.localeCompare(b.date)).map((item, idx) => ({ ...item, seq: idx + 1 }))

    const derived = deriveEmployeeStatusFromHistory(nextHistory)

    const newAuditLog: CareerAuditLog = {
      id: `CAL-${Date.now()}`,
      updatedAt: formatDateTimeString(new Date()),
      author: { name: '관리자', id: 'admin01' },
      summary: `재직 이력 1건 삭제 (잔여 ${nextHistory.length}건)`,
      beforeList: prevHistory,
      afterList: nextHistory,
    }

    const updated: Employee = {
      ...selected,
      status: derived.status,
      retireDate: derived.retireDate,
      careerHistory: nextHistory,
      careerAuditLogs: [newAuditLog, ...(selected.careerAuditLogs || [])],
    }
    handleSaveEmployee(updated)
  }

  // 4. 이력 관리/수정 모달 오픈
  function handleStartEditCareer(item: CareerHistoryItem) {
    setEditingCareerItem(item)
    setIsCareerEditModalOpen(true)
  }

  // 5. 신규 재직 이력 등록 모달 오픈
  function handleStartCreateCareer() {
    setEditingCareerItem(null)
    setIsCareerEditModalOpen(true)
  }

  // 7. 4대보험 이력 통합 저장 (& 감사 로그 기록)
  function handleSaveInsuranceHistoryList(updatedList: InsuranceHistoryItem[]) {
    if (!selected) return
    const prevHistory = selected.insuranceHistory || []
    const sorted = [...updatedList].sort((a, b) => a.date.localeCompare(b.date)).map((item, idx) => ({ ...item, seq: idx + 1 }))

    const newAuditLog: InsuranceAuditLog = {
      id: `IAL-${Date.now()}`,
      updatedAt: formatDateTimeString(new Date()),
      author: { name: '관리자', id: 'admin01' },
      summary: `4대보험 이력 저장 (${sorted.length}건 반영)`,
      beforeList: prevHistory,
      afterList: sorted,
    }

    const updated: Employee = {
      ...selected,
      insuranceHistory: sorted,
      insuranceAuditLogs: [newAuditLog, ...(selected.insuranceAuditLogs || [])],
    }
    handleSaveEmployee(updated)
    setIsInsuranceManageModalOpen(false)
    setEditingInsuranceItem(null)
  }

  function handleStartCreateInsurance() {
    setEditingInsuranceItem(null)
    setIsInsuranceManageModalOpen(true)
  }

  function handleStartEditInsurance(item: InsuranceHistoryItem) {
    setEditingInsuranceItem(item)
    setIsInsuranceManageModalOpen(true)
  }

  // 6. 특정 위치 이력 삽입
  function handleStartInsertCareer(targetSlotIndex: number) {
    setEditingCareerItem(null)
    setIsCareerEditModalOpen(true)
  }

  // 7. 재직 등록 모달 오픈
  function handleStartRehire() {
    setEditingCareerItem({
      id: '',
      seq: (selected?.careerHistory?.length || 0) + 1,
      type: '재직',
      date: new Date().toISOString().split('T')[0],
      reason: '센트럴케어 직원 재직 등록',
      syncStatus: '희',
    })
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
                      <div className="flex items-center gap-1.5 mr-1">
                        <span className="w-[3px] h-[14px] bg-[#2a3461] rounded-full inline-block" />
                        <span className="font-bold text-[#0e1225] text-[14px]">급여계약</span>
                      </div>
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
                        // onClick={() => setIsEditModalOpen(true)}
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
                        onClick={handleStartCreateCareer}
                        className="h-[28px] px-2.5 rounded-[6px] bg-[#2a3461] text-white text-[12px] font-semibold hover:bg-[#364275] transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        이력 등록/수정
                      </button>
                    </div>
                  </div>

                  {/* 재직 이력 목록 테이블 (Full Width - 리스트 전용 뷰) */}
                  <div className="border border-[#c2cfdf] rounded-[6px] overflow-hidden bg-white shadow-2xs">
                    <table className="w-full border-collapse text-[13px]">
                      <thead>
                        <tr className="bg-[#f4f7fc] border-b border-[#c2cfdf] text-[#334155] font-bold">
                          <th className="px-3 py-2 text-center w-[60px] border-r border-[#c2cfdf]">연번</th>
                          <th className="px-3 py-2 text-left w-[140px] border-r border-[#c2cfdf]">구분</th>
                          <th className="px-3 py-2 text-left w-[140px] border-r border-[#c2cfdf]">일자</th>
                          <th className="px-3 py-2 text-left">비고</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#e2e8f0]">
                        {(selected.careerHistory || []).length === 0 ? (
                          <tr>
                            <td colSpan={4} className="text-center py-10 text-[#8a9cb4]">
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
                                  <span className="font-semibold text-[#0e1225]">
                                    {(item.type === '입사' || (item.type as string) === '최초입사일') ? '재직' : item.type}
                                  </span>
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
                              <td className="px-3 py-2.5 text-[#475569]">
                                {item.reason || '-'}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 3. 4대보험 (피그마 1:1 표준 스타일 및 이력 관리 테이블) */}
              {activeSubTab === '4대보험' && (
                <div className="flex flex-col gap-3">
                  {/* 상단 액션 바 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-[3px] h-[14px] bg-[#2a3461] rounded-full inline-block" />
                      <span className="font-bold text-[#0e1225] text-[14px]">4대보험 이력</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setIsInsuranceAuditModalOpen(true)}
                        className="h-[28px] px-2.5 rounded-[6px] border border-[#c2cfdf] bg-white text-[#334155] text-[12px] font-semibold hover:bg-[#f8fafc] hover:border-[#2a3461] transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                        수정이력
                      </button>
                      <button
                        onClick={handleStartCreateInsurance}
                        className="h-[28px] px-2.5 rounded-[6px] bg-[#2a3461] text-white text-[12px] font-semibold hover:bg-[#364275] transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        이력 등록/수정
                      </button>
                    </div>
                  </div>

                  {/* 4대보험 현재 가입현황 요약 카드 (4단 그리드) */}
                  {selectedInsuranceStatus && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                      {/* 국민연금 */}
                      <div className="p-3 bg-white border border-[#c2cfdf] rounded-[6px] flex flex-col gap-1.5 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[13px] text-[#2a3461]">국민연금</span>
                          <span className={`px-2 py-0.5 rounded-[4px] text-[11px] font-bold border ${INSURANCE_STATUS_COLOR_MAP[selectedInsuranceStatus.pension.status]?.bg} ${INSURANCE_STATUS_COLOR_MAP[selectedInsuranceStatus.pension.status]?.text} ${INSURANCE_STATUS_COLOR_MAP[selectedInsuranceStatus.pension.status]?.border}`}>
                            {selectedInsuranceStatus.pension.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11.5px] text-[#64748b]">
                          <span>적용일자</span>
                          <span className="font-mono text-[#0e1225] font-semibold">{selectedInsuranceStatus.pension.date}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] pt-0.5 border-t border-[#f1f5f9]">
                          <span className="text-[#64748b]">보수월액</span>
                          <span className="font-mono font-bold text-[#1e40af]">
                            {selectedInsuranceStatus.pension.monthlyWage
                              ? `${selectedInsuranceStatus.pension.monthlyWage.toLocaleString()}원`
                              : '-'}
                          </span>
                        </div>
                      </div>

                      {/* 건강보험 */}
                      <div className="p-3 bg-white border border-[#c2cfdf] rounded-[6px] flex flex-col gap-1.5 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[13px] text-[#2a3461]">건강보험</span>
                          <span className={`px-2 py-0.5 rounded-[4px] text-[11px] font-bold border ${INSURANCE_STATUS_COLOR_MAP[selectedInsuranceStatus.health.status]?.bg} ${INSURANCE_STATUS_COLOR_MAP[selectedInsuranceStatus.health.status]?.text} ${INSURANCE_STATUS_COLOR_MAP[selectedInsuranceStatus.health.status]?.border}`}>
                            {selectedInsuranceStatus.health.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11.5px] text-[#64748b]">
                          <span>적용일자</span>
                          <span className="font-mono text-[#0e1225] font-semibold">{selectedInsuranceStatus.health.date}</span>
                        </div>
                      </div>

                      {/* 고용보험 */}
                      <div className="p-3 bg-white border border-[#c2cfdf] rounded-[6px] flex flex-col gap-1.5 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[13px] text-[#2a3461]">고용보험</span>
                          <span className={`px-2 py-0.5 rounded-[4px] text-[11px] font-bold border ${INSURANCE_STATUS_COLOR_MAP[selectedInsuranceStatus.employment.status]?.bg} ${INSURANCE_STATUS_COLOR_MAP[selectedInsuranceStatus.employment.status]?.text} ${INSURANCE_STATUS_COLOR_MAP[selectedInsuranceStatus.employment.status]?.border}`}>
                            {selectedInsuranceStatus.employment.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11.5px] text-[#64748b]">
                          <span>적용일자</span>
                          <span className="font-mono text-[#0e1225] font-semibold">{selectedInsuranceStatus.employment.date}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] pt-0.5 border-t border-[#f1f5f9]">
                          <span className="text-[#64748b]">실업급여</span>
                          <span className={`font-semibold ${(selectedInsuranceStatus.employment.unemploymentApplied ?? selected.employmentUnemployment)
                            ? 'text-[#059669]'
                            : 'text-[#dc2626]'
                            }`}>
                            {(selectedInsuranceStatus.employment.unemploymentApplied ?? selected.employmentUnemployment) ? '적용 대상' : '미적용 (적용제외)'}
                          </span>
                        </div>
                      </div>

                      {/* 산재보험 */}
                      <div className="p-3 bg-white border border-[#c2cfdf] rounded-[6px] flex flex-col gap-1.5 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[13px] text-[#2a3461]">산재보험</span>
                          <span className={`px-2 py-0.5 rounded-[4px] text-[11px] font-bold border ${INSURANCE_STATUS_COLOR_MAP[selectedInsuranceStatus.workComp.status]?.bg} ${INSURANCE_STATUS_COLOR_MAP[selectedInsuranceStatus.workComp.status]?.text} ${INSURANCE_STATUS_COLOR_MAP[selectedInsuranceStatus.workComp.status]?.border}`}>
                            {selectedInsuranceStatus.workComp.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11.5px] text-[#64748b]">
                          <span>적용일자</span>
                          <span className="font-mono text-[#0e1225] font-semibold">{selectedInsuranceStatus.workComp.date}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 4대보험 이력 목록 테이블 (피그마 1:1 표준 스타일) */}
                  <div className="border border-[#c2cfdf] rounded-[6px] overflow-hidden bg-white shadow-2xs">
                    <table className="w-full border-collapse text-[13px]">
                      <thead className="sticky top-0 z-10 bg-[#f4f7fc] shadow-2xs">
                        <tr className="border-b border-[#c2cfdf] text-[#334155] font-bold h-[44px]">
                          <th className="px-3 text-center w-[50px] border-r border-[#c2cfdf] whitespace-nowrap align-middle">연번 ↕</th>
                          <th className="px-3 text-center w-[110px] border-r border-[#c2cfdf] whitespace-nowrap align-middle">적용일자 ↕</th>
                          <th className="px-4 text-left w-[120px] border-r border-[#c2cfdf] whitespace-nowrap align-middle">보험구분 ↕</th>
                          <th className="px-3 text-center w-[85px] border-r border-[#c2cfdf] whitespace-nowrap align-middle">상태 ↕</th>
                          <th className="px-3 text-right w-[130px] border-r border-[#c2cfdf] whitespace-nowrap align-middle">국민연금 보수월액</th>
                          <th className="px-3 text-center w-[110px] border-r border-[#c2cfdf] whitespace-nowrap align-middle">실업급여</th>
                          <th className="px-3 text-left border-r border-[#c2cfdf] whitespace-nowrap align-middle">비고 / 사유</th>
                          <th className="px-3 text-center w-[140px] whitespace-nowrap align-middle">사업장 가입자명부 검증</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#e2e8f0]">
                        {(selected.insuranceHistory || []).length === 0 ? (
                          <tr>
                            <td colSpan={8} className="text-center py-10 text-[#8a9cb4]">
                              등록된 4대보험 이력이 없습니다. 상단의 [이력 등록/수정] 버튼을 눌러 이력을 추가해 주세요.
                            </td>
                          </tr>
                        ) : (
                          (selected.insuranceHistory || []).map((item, idx) => {
                            const color = INSURANCE_STATUS_COLOR_MAP[item.status] || INSURANCE_STATUS_COLOR_MAP['취득']
                            const syncedText = formatSyncedInsurances(item)
                            const isSynced = syncedText !== '-'
                            return (
                              <tr
                                key={item.id}
                                onClick={() => handleStartEditInsurance(item)}
                                className="h-[44px] hover:bg-[#f8fafc] transition-colors cursor-pointer"
                              >
                                <td className="px-3 text-center font-mono text-[#64748b] border-r border-[#c2cfdf] whitespace-nowrap align-middle">
                                  {item.seq ?? idx + 1}
                                </td>
                                <td className="px-3 text-center font-mono text-[#0e1225] border-r border-[#c2cfdf] whitespace-nowrap align-middle">
                                  {item.date}
                                </td>
                                <td className="px-4 text-left font-semibold text-[#2a3461] border-r border-[#c2cfdf] whitespace-nowrap align-middle">
                                  <span title={item.insuranceType}>{formatInsuranceTypeShort(item.insuranceType)}</span>
                                </td>
                                <td className="px-3 text-center border-r border-[#c2cfdf] whitespace-nowrap align-middle">
                                  <span className={`px-2 py-0.5 rounded-[4px] text-[11px] font-bold border ${color.bg} ${color.text} ${color.border}`}>
                                    {item.status}
                                  </span>
                                </td>
                                <td className="px-3 text-right font-mono font-semibold text-[#1e40af] border-r border-[#c2cfdf] whitespace-nowrap align-middle">
                                  {item.monthlyWage ? `${item.monthlyWage.toLocaleString()}원` : '-'}
                                </td>
                                <td className="px-3 text-center border-r border-[#c2cfdf] whitespace-nowrap align-middle">
                                  {item.unemploymentApplied !== undefined ? (
                                    <span className={`px-2 py-0.5 rounded-[3px] text-[11px] font-semibold border ${item.unemploymentApplied
                                      ? 'bg-[#ecfdf5] text-[#065f46] border-[#a7f3d0]'
                                      : 'bg-[#fef2f2] text-[#991b1b] border-[#fecaca]'
                                      }`}>
                                      {item.unemploymentApplied ? '적용' : '미적용'}
                                    </span>
                                  ) : (
                                    <span className="text-[#94a3b8]">-</span>
                                  )}
                                </td>
                                <td className="px-4 text-left text-[#334155] border-r border-[#c2cfdf] align-middle">
                                  {item.reason || '-'}
                                </td>
                                <td className="px-3 text-center font-semibold whitespace-nowrap align-middle">
                                  {isSynced ? (
                                    <span className="px-2 py-0.5 rounded-[3px] text-[11.5px] font-bold bg-[#e8f8ed] text-[#1c9640] border border-[#c6f0d2]" title="사업장 가입자명부 검증 확인">
                                      {syncedText}
                                    </span>
                                  ) : (
                                    <span className="text-[#94a3b8] font-bold">-</span>
                                  )}
                                </td>
                              </tr>
                            )
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 4. 자격증 (피그마 Node 1041-42949 1:1) */}
              {activeSubTab === '자격증' && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#0e1225] text-[16px]">자격증</span>
                  </div>
                  <div className="border border-[#c2cfdf] rounded-[6px] overflow-hidden bg-white shadow-2xs">
                    <table className="w-full border-collapse text-[13px]">
                      <thead className="sticky top-0 z-10 bg-[#f4f7fc] shadow-2xs">
                        <tr className="border-b border-[#c2cfdf] text-[#334155] font-bold h-[44px]">
                          <th className="px-3 text-center w-[70px] border-r border-[#c2cfdf] whitespace-nowrap align-middle">연번 ↕</th>
                          <th className="px-4 text-left border-r border-[#c2cfdf] whitespace-nowrap align-middle">자격면허종류 ↕</th>
                          <th className="px-3 text-center w-[180px] border-r border-[#c2cfdf] whitespace-nowrap align-middle">자격면허번호 ↕</th>
                          <th className="px-3 text-center w-[150px] border-r border-[#c2cfdf] whitespace-nowrap align-middle">취득일자 ↕</th>
                          <th className="px-3 text-center w-[150px] whitespace-nowrap align-middle">만기일자 ↕</th>
                        </tr>
                      </thead>
                      <tbody>
                        {((selected.certificates && selected.certificates.length > 0) ? selected.certificates : [
                          { id: 'CERT-01', seq: 1, licenseType: '요양보호사 1급', licenseNumber: '제2022-1004754호', issueDate: '2022-07-01', expireDate: '-', issuer: '-' },
                          { id: 'CERT-02', seq: 2, licenseType: '사회복지사 1급', licenseNumber: '제2020-2003891호', issueDate: '2020-03-15', expireDate: '-', issuer: '한국사회복지사협회' },
                          { id: 'CERT-03', seq: 3, licenseType: '간호조무사', licenseNumber: '제2018-3001122호', issueDate: '2018-11-20', expireDate: '-', issuer: '보건복지부' },
                        ]).map((item, idx) => (
                          <tr
                            key={item.id || idx}
                            onClick={() => {
                              setSelectedCertForDetail(item)
                              setIsCertDetailModalOpen(true)
                            }}
                            className="border-b border-[#c2cfdf] hover:bg-[#eef3fa] transition-colors h-[44px] cursor-pointer"
                            title="클릭하여 상세 정보 보기"
                          >
                            <td className="px-3 text-center font-mono font-medium text-[#475569] border-r border-[#c2cfdf]">
                              {item.seq ?? idx + 1}
                            </td>
                            <td className="px-4 text-left font-medium text-[#0e1225] border-r border-[#c2cfdf]">
                              {item.licenseType}
                            </td>
                            <td className="px-3 text-center font-mono text-[#0e1225] border-r border-[#c2cfdf]">
                              {item.licenseNumber}
                            </td>
                            <td className="px-3 text-center font-mono text-[#0e1225] border-r border-[#c2cfdf]">
                              {item.issueDate}
                            </td>
                            <td className="px-3 text-center font-mono text-[#0e1225]">
                              {item.expireDate}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 5. 인력변경 신고내역 (Figma 1:1 Node 1102-24139) */}
              {activeSubTab === '인력변경 신고내역' && (() => {
                const reports: PersonnelChangeReport[] = selected.personnelChangeReports && selected.personnelChangeReports.length > 0
                  ? selected.personnelChangeReports
                  : [
                      {
                        id: `PCR-${selected.id}-1`,
                        startDate: selected.hireDate || '2025-10-17',
                        endDate: selected.retireDate || null,
                        status: (selected.status === '퇴직' ? '퇴직' : selected.status === '휴직' ? '휴직' : '재직') as '재직' | '퇴직' | '휴직',
                        serviceType: '방문요양',
                        tenureText: formatTenureText(selected.hireDate, selected.retireDate),
                      },
                    ]

                return (
                  <div className="flex flex-col gap-3">
                    {/* 카드 헤더: 타이틀 & 건수 & 신고 버튼 */}
                    <div className="flex items-center justify-between pb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#0e1225] text-[15px] tracking-tight">
                          인력변경 신고내역
                        </span>
                        <span className="text-[13px] text-[#64748b] font-medium">
                          {reports.length}건
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsPersonnelModalOpen(true)}
                        className="h-[32px] px-3.5 bg-[#ef5a27] text-white rounded-[6px] text-[12.5px] font-bold hover:bg-[#d94e1f] transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        인력변경 신고
                      </button>
                    </div>

                    {/* 카드 목록 */}
                    <div className="flex flex-col gap-2.5">
                      {reports.map((item) => {
                        const isEmployed = item.status === '재직'
                        const isRetired = item.status === '퇴직'

                        return (
                          <div
                            key={item.id}
                            className={`p-3.5 rounded-[8px] border flex items-center justify-between transition-colors shadow-2xs ${
                              isEmployed
                                ? 'bg-[#eef9f2] border-[#a7f3d0]'
                                : isRetired
                                  ? 'bg-[#f8fafc] border-[#e2e8f0]'
                                  : 'bg-[#fffbeb] border-[#fde68a]'
                            }`}
                          >
                            {/* 좌측: 인디케이터 + 기간 + 직종/근속기간 */}
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                {isEmployed ? (
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#16a34a] shrink-0" />
                                ) : isRetired ? (
                                  <span className="w-2.5 h-2.5 rounded-full border-2 border-[#ef4444] bg-white shrink-0" />
                                ) : (
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#d97706] shrink-0" />
                                )}
                                <span className="font-bold text-[14px] text-[#0e1225] font-mono tracking-tight">
                                  {item.startDate} ~ {item.endDate || '현재'}
                                </span>
                              </div>
                              <div className={`text-[12.5px] pl-4.5 flex items-center gap-1.5 font-medium ${
                                isEmployed ? 'text-[#475569]' : isRetired ? 'text-[#64748b]' : 'text-[#b45309]'
                              }`}>
                                <span>· {item.serviceType || '방문요양'}</span>
                                <span>· {item.tenureText || formatTenureText(item.startDate, item.endDate)}</span>
                              </div>
                            </div>

                            {/* 우측: 뱃지 (Pill) */}
                            <div>
                              <span
                                className={`px-3.5 py-1 rounded-full text-[12px] font-bold bg-white border shadow-2xs inline-block ${
                                  isEmployed
                                    ? 'text-[#16a34a] border-[#86efac]'
                                    : isRetired
                                      ? 'text-[#e11d48] border-[#fca5a5]'
                                      : 'text-[#d97706] border-[#fcd34d]'
                                }`}
                              >
                                {item.status}
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })()}

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


      {/* ─── 이력 수정 로그 모달 ─── */}
      {isCareerAuditModalOpen && selected && (
        <CareerAuditModal
          employee={selected}
          onClose={() => setIsCareerAuditModalOpen(false)}
        />
      )}

      {/* ─── 재직 이력 통합 관리 모달 (연속 추가 & 드래그 순서 변경) ─── */}
      {isCareerEditModalOpen && selected && (
        <CareerHistoryManageModal
          employee={selected}
          initialItem={editingCareerItem}
          onSave={handleSaveCareerHistoryList}
          onClose={() => {
            setIsCareerEditModalOpen(false)
            setEditingCareerItem(null)
          }}
        />
      )}

      {/* ─── 모달: 자격증 상세 보기 ─── */}
      {isCertDetailModalOpen && selectedCertForDetail && (
        <CertificateDetailModal
          cert={selectedCertForDetail}
          onClose={() => {
            setIsCertDetailModalOpen(false)
            setSelectedCertForDetail(null)
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

      {/* ─── 4대보험 이력 관리 모달 ─── */}
      {isInsuranceManageModalOpen && selected && (
        <InsuranceHistoryManageModal
          employee={selected}
          initialItem={editingInsuranceItem}
          onSave={handleSaveInsuranceHistoryList}
          onClose={() => {
            setIsInsuranceManageModalOpen(false)
            setEditingInsuranceItem(null)
          }}
        />
      )}

      {/* ─── 4대보험 수정 이력 로그 모달 ─── */}
      {isInsuranceAuditModalOpen && selected && (
        <InsuranceAuditModal
          employee={selected}
          onClose={() => setIsInsuranceAuditModalOpen(false)}
        />
      )}

      {/* ─── 희망이음 인력변경 신고 등록 모달 ─── */}
      {isPersonnelModalOpen && selected && (
        <PersonnelChangeReportModal
          employee={selected}
          onSave={handleSavePersonnelReport}
          onClose={() => setIsPersonnelModalOpen(false)}
        />
      )}
    </div>
  )
}
