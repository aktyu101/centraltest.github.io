import React, { useState, useMemo, useEffect } from 'react'
import { Button } from '../components/Button'
import BeneficiaryRecordOverviewPage from './BeneficiaryRecordOverviewPage'

// ─── Types & Models ──────────────────────────────────────────────────────────

export type ServiceCategory = '방문요양' | '방문목욕' | '방문간호'

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
  '요': 'bg-svc-care-bg text-svc-care-text border-svc-care-border',
  '목': 'bg-svc-bath-bg text-svc-bath-text border-svc-bath-border',
  '간': 'bg-svc-nurse-bg text-svc-nurse-text border-svc-nurse-border',
}

// 기초평가 4대 평가 매트릭스 행 모델
export interface EvaluationMatrixRow {
  round: number // 회차 (1, 2, ...)
  fallRisk?: {
    evaluator: string
    evalDate: string
    evalCategory: string // '재사정' | '정기평가' | '상태변화'
    scoreText: string // '5점'
    grade: '고위험' | '중등도' | '저위험' | '정상'
  }
  bedsoreRisk?: {
    evaluator: string
    evalDate: string
    evalCategory: string // '상태변화' | '정기평가' | '재사정'
    scoreText: string // '15점'
    grade: '위험' | '고위험' | '중등도' | '정상'
  }
  cognitive?: {
    evaluator?: string
    evalDate?: string
    status: '해당없음' | '치매진단' | '평가완료' | '인지저하의심'
    scoreText?: string
  }
  needAssessment?: {
    evaluator?: string
    evalDate?: string
    status: '평가완료' | '평가미완료'
  }
}

// 기초평가 상단 요약 KPI 카드 모델
export interface BasicEvalSummary {
  fallRiskGrade?: '고위험' | '중등도' | '저위험' | '정상'
  fallRiskStatus: '평가완료' | '평가미완료'
  bedsoreRiskGrade?: '위험' | '고위험' | '중등도' | '정상'
  bedsoreRiskStatus: '평가완료' | '평가미완료'
  cognitiveStatus: '해당없음' | '치매진단' | '평가완료' | '평가미완료'
  needAssessmentStatus: '평가완료' | '평가미완료'
}

// 상담일지 모델 (피그마 캡쳐 1:1 표준 컬럼 체계)
export type CounselingType = '요양' | '목욕' | '간호' | '직원변경' | '방문요양' | '방문목욕' | '방문간호'

export interface CounselingLogItem {
  id: string
  round?: number // 연번 (1, 2, ...)
  counselType: string // 방문요양 / 방문목욕 / 방문간호 / 직원변경
  counselDate: string // YYYY.MM.DD
  counselTime: string // 09:00~10:00 또는 상담불가
  counselee: string // 상담대상 (홍길순, 이영희 등)
  relation: string // 본인, 보호자(자녀) 등
  counselor: string // 상담자 (김금희 등)
  benefitReflectCount: number // 급여제공반영 (0, 1 등)
  channel?: '방문대면' | '유선통화' | '내방상담'
  topic?: string // 상담주제
  content?: string // 상담내용
  actionPlan?: string // 조치계획
  status?: '조치완료' | '진행중'
}

// 급여유형별 계약기간 모델
export interface ServiceContractItem {
  serviceType: ServiceCategory
  startDate: string
  endDate: string
  isExpired?: boolean
}

// 상태변화기록 모델 (피그마 캡처 1:1 표준 컬럼 체계: 연번, 등록일, 작성자, 작성내용, 요양보호사 서명)
export interface StatusChangeLogItem {
  id: string
  round?: number // 연번
  date: string // 등록일 (YYYY.MM.DD)
  writer: string // 작성자 (홍길순, 이영희 등)
  content: string // 작성내용
  careWorkerSigned?: 'Y' | 'N' | '-' // 요양보호사 서명 (기본: 'Y')
}

// 사회복지사 업무수행일지 모델 (가산 및 평가 핵심 서식)
export type DutyLogVisitType = '전체' | '정기방문' | '수시상담' | '급여모니터링' | '요양보호사지도'

export interface SocialWorkerDutyLogItem {
  id: string
  round?: number // 연번
  visitDate: string // YYYY.MM.DD
  visitTime: string // 10:00~11:30
  visitType: '정기방문' | '수시상담' | '급여모니터링' | '요양보호사지도'
  serviceType: string // 방문요양 / 방문목욕 / 방문간호
  checkContent: string // 수급자 점검 및 업무지도 내용
  comprehensiveOpinion: string // 종합의견 및 향후계획
  worker: string // 작성자 (사회복지사)
  status: '작성완료' | '진행중'
}

export interface BeneficiaryRecordProfile {
  id: string
  name: string
  rcgtNo: string // 인정번호 (L0000000000)
  grade: string // 1등급 ~ 5등급, 인지지원
  dob: string // YYYY.MM.DD
  gender: '남' | '여'
  photoUrl?: string // 수급자 프로필 사진 URL
  status?: string // 이용상태 ('이용중' | '계약만료')
  specialNotes?: string // 수급자 특이사항/주의사항
  phone: string
  address: string
  guardianName: string
  guardianPhone: string
  enrolledServices: ServiceCategory[] // 이용중인 방문서비스 목록
  serviceContracts?: ServiceContractItem[] // 급여유형별 계약기간 목록
  primaryCareWorker: string // 주 담당 요양보호사
  primaryNurse: string // 주 담당 간호사
  diseaseDiagnosis: string // 주요 질환
  evalSummary: BasicEvalSummary // 4대 기초평가 상단 KPI 요약
  evalMatrix: EvaluationMatrixRow[] // 연간 회차별 기초평가 매트릭스 대장
  counselings: CounselingLogItem[] // 상담일지 목록
  statusChanges?: StatusChangeLogItem[] // 상태변화기록 목록
  dutyLogs?: SocialWorkerDutyLogItem[] // 사회복지사 업무수행일지 목록
}

// ─── Initial Mock Data ───────────────────────────────────────────────────────

const INITIAL_BENEFICIARIES: BeneficiaryRecordProfile[] = [
  {
    id: 'BEN-001',
    name: '김순자',
    rcgtNo: 'L1029384756',
    grade: '3등급',
    dob: '1941.05.12',
    gender: '여',
    status: '이용중',
    specialNotes: '우측 무릎 관절염으로 보행 시 부축 필수, 오후 시간대 인지 저하 관찰 요망, 낙상 주의',
    phone: '010-3849-2910',
    address: '서울시 강동구 암사길 45-2 102호',
    guardianName: '김영호 (아들)',
    guardianPhone: '010-8829-1029',
    enrolledServices: ['방문요양', '방문목욕', '방문간호'],
    serviceContracts: [
      { serviceType: '방문요양', startDate: '2026.01.01', endDate: '2026.12.31', isExpired: false },
      { serviceType: '방문목욕', startDate: '2026.01.01', endDate: '2026.12.31', isExpired: false },
      { serviceType: '방문간호', startDate: '2024.03.01', endDate: '2025.02.28', isExpired: true },
    ],
    primaryCareWorker: '홍길순',
    primaryNurse: '박은정 간호사',
    diseaseDiagnosis: '치매초기, 고혈압, 골다공증',
    evalSummary: {
      fallRiskGrade: '고위험',
      fallRiskStatus: '평가완료',
      bedsoreRiskGrade: '위험',
      bedsoreRiskStatus: '평가완료',
      cognitiveStatus: '치매진단',
      needAssessmentStatus: '평가완료',
    },
    evalMatrix: [
      {
        round: 2,
        fallRisk: {
          evaluator: '김정희',
          evalDate: '2026.03.10',
          evalCategory: '재사정',
          scoreText: '5점',
          grade: '고위험',
        },
        bedsoreRisk: {
          evaluator: '김정희',
          evalDate: '2026.03.10',
          evalCategory: '상태변화',
          scoreText: '15점',
          grade: '위험',
        },
        cognitive: {
          status: '치매진단',
        },
        needAssessment: {
          evaluator: '김정희',
          evalDate: '2026.03.10',
          status: '평가완료',
        },
      },
      {
        round: 1,
        fallRisk: {
          evaluator: '김정희',
          evalDate: '2025.03.12',
          evalCategory: '정기평가',
          scoreText: '6점',
          grade: '고위험',
        },
        bedsoreRisk: {
          evaluator: '김정희',
          evalDate: '2025.03.12',
          evalCategory: '정기평가',
          scoreText: '16점',
          grade: '위험',
        },
        cognitive: {
          status: '해당없음',
        },
        needAssessment: {
          evaluator: '김정희',
          evalDate: '2025.03.12',
          status: '평가완료',
        },
      },
    ],
    counselings: [
      {
        id: 'CS-101',
        round: 1,
        counselType: '방문요양',
        counselDate: '2026.04.08',
        counselTime: '상담불가',
        counselee: '홍길순',
        relation: '본인',
        counselor: '김금희',
        benefitReflectCount: 0,
        channel: '유선통화',
        topic: '방문요양 급여제공 점검 및 식사 섭취 상담',
        content: '수급자 어르신 병원 진료 일정으로 당일 유선 상담 진행하였으나 연결 어려워 추후 재상담 예정.',
        actionPlan: '익일 오전 재방문 및 보호자 유선 연락 재시도.',
        status: '진행중',
      },
      {
        id: 'CS-102',
        round: 2,
        counselType: '방문목욕',
        counselDate: '2026.03.02',
        counselTime: '09:00~10:00',
        counselee: '이영희',
        relation: '보호자(자녀)',
        counselor: '김금희',
        benefitReflectCount: 1,
        channel: '방문대면',
        topic: '방문목욕 서비스 만족도 및 피부 건조증 확인',
        content: '목욕 후 온몸이 개운하다고 만족해하심. 건조한 부위에 바디로션 도포 요청.',
        actionPlan: '목욕팀에게 입욕 후 보습제 도포 필수 안내 완료.',
        status: '조치완료',
      },
      {
        id: 'CS-103',
        round: 3,
        counselType: '방문간호',
        counselDate: '2026.02.05',
        counselTime: '09:00~10:00',
        counselee: '박민수',
        relation: '보호자(자녀)',
        counselor: '김금희',
        benefitReflectCount: 1,
        channel: '방문대면',
        topic: '혈압 모니터링 및 복약 순응도 지도',
        content: '혈압 135/85mmHg 안정적. 아침 고혈압약 복용 여부 체크 및 어지럼증 여부 문진.',
        actionPlan: '가족에게 일일 혈압 기록표 전달 및 규칙적 복약 지도 완료.',
        status: '조치완료',
      },
      {
        id: 'CS-104',
        round: 4,
        counselType: '방문목욕',
        counselDate: '2026.01.09',
        counselTime: '09:00~10:00',
        counselee: '김철호',
        relation: '보호자(자녀)',
        counselor: '김금희',
        benefitReflectCount: 1,
        channel: '방문대면',
        topic: '담당 요양보호사 교체 사전 안내 및 동의',
        content: '기존 담당 요양보호사의 개인 사정으로 신규 요양보호사(홍길순) 배치 안내 및 보호자 동의 득함.',
        actionPlan: '신규 담당자에게 수급자 특이사항 및 낙상 주의사항 인계 완료.',
        status: '조치완료',
      },
    ],
    statusChanges: [
      {
        id: 'SC-101',
        round: 1,
        date: '2026.01.08',
        writer: '홍길순',
        content: '작성내용',
        careWorkerSigned: 'Y',
      },
      {
        id: 'SC-102',
        round: 2,
        date: '2026.01.02',
        writer: '이영희',
        content: '작성내용',
        careWorkerSigned: 'Y',
      },
      {
        id: 'SC-103',
        round: 3,
        date: '2026.01.05',
        writer: '박민수',
        content: '작성내용',
        careWorkerSigned: 'Y',
      },
      {
        id: 'SC-104',
        round: 4,
        date: '2026.01.09',
        writer: '김철호',
        content: '작성내용',
        careWorkerSigned: 'Y',
      },
      {
        id: 'SC-105',
        round: 5,
        date: '2026.03.18',
        writer: '홍길순',
        content: '보행 중 우측 무릎 통증 호소하며 부축 요청하심. 온찜질 및 보호자 통보 조치 완료.',
        careWorkerSigned: 'Y',
      },
      {
        id: 'SC-106',
        round: 6,
        date: '2026.03.05',
        writer: '홍길순',
        content: '식사량 양호하며 활력징후 안정적임. 복약 지도 완료.',
        careWorkerSigned: 'Y',
      },
    ],
    dutyLogs: [
      {
        id: 'DL-101',
        round: 1,
        visitDate: '2026.01.15',
        visitTime: '10:00~11:30',
        visitType: '정기방문',
        serviceType: '방문요양',
        checkContent: '신년 급여제공계획 수립에 따른 수급자 욕구 확인 및 주거 환경 내 안전시설 점검.',
        comprehensiveOpinion: '요양보호사 서비스 제공 만족도 양호. 주기적 인지자극 프로그램 병행 권고.',
        worker: '이지원 (사회복지사)',
        status: '작성완료',
      },
      {
        id: 'DL-102',
        round: 2,
        visitDate: '2026.01.28',
        visitTime: '15:00~16:00',
        visitType: '수시상담',
        serviceType: '방문목욕',
        checkContent: '겨울철 한파 대비 실내 보온 및 온수 설비 사전 점검, 보호자 안부 확인.',
        comprehensiveOpinion: '수급자 건강 상태 양호하며 보호자 건의사항 없음.',
        worker: '이지원 (사회복지사)',
        status: '작성완료',
      },
      {
        id: 'DL-103',
        round: 3,
        visitDate: '2026.02.18',
        visitTime: '14:00~15:30',
        visitType: '급여모니터링',
        serviceType: '방문목욕',
        checkContent: '이동목욕 서비스 입욕 전 활력징후 및 피부 발적 상태 점검. 2인 1조 안전수칙 준수 확인.',
        comprehensiveOpinion: '어르신 목욕 서비스 만족도 매우 높음. 피부 보습제 도포 철저 지도 완료.',
        worker: '이지원 (사회복지사)',
        status: '작성완료',
      },
    ],
  },
  {
    id: 'BEN-002',
    name: '이만수',
    rcgtNo: 'L1982736450',
    grade: '2등급',
    dob: '1938.11.23',
    gender: '남',
    status: '이용중',
    specialNotes: '우측 편마비로 휠체어 이동 시 낙상 주의 요망, 목욕 시 미끄럼 방지 매트 점검',
    phone: '010-4920-1928',
    address: '서울시 송파구 잠실로 12 301호',
    guardianName: '이진숙 (딸)',
    guardianPhone: '010-7718-2910',
    enrolledServices: ['방문요양', '방문목욕'],
    serviceContracts: [
      { serviceType: '방문요양', startDate: '2026.02.01', endDate: '2027.01.31', isExpired: false },
      { serviceType: '방문목욕', startDate: '2024.01.01', endDate: '2024.12.31', isExpired: true },
    ],
    primaryCareWorker: '김철호',
    primaryNurse: '미지정',
    diseaseDiagnosis: '뇌졸중 후유마비(우측 편마비), 당뇨',
    evalSummary: {
      fallRiskGrade: '고위험',
      fallRiskStatus: '평가완료',
      bedsoreRiskGrade: '고위험',
      bedsoreRiskStatus: '평가완료',
      cognitiveStatus: '해당없음',
      needAssessmentStatus: '평가완료',
    },
    evalMatrix: [
      {
        round: 1,
        fallRisk: {
          evaluator: '김정희',
          evalDate: '2026.02.20',
          evalCategory: '정기평가',
          scoreText: '8점',
          grade: '고위험',
        },
        bedsoreRisk: {
          evaluator: '김정희',
          evalDate: '2026.02.20',
          evalCategory: '정기평가',
          scoreText: '14점',
          grade: '고위험',
        },
        cognitive: {
          status: '해당없음',
        },
        needAssessment: {
          evaluator: '김정희',
          evalDate: '2026.02.20',
          status: '평가완료',
        },
      },
    ],
    counselings: [
      {
        id: 'CS-201',
        counselDate: '2026-03-15 11:00',
        counselType: '목욕',
        counselee: '이진숙 (딸)',
        counselor: '이지원 (사회복지사)',
        channel: '방문대면',
        topic: '이동목욕 서비스 제공 만족도 및 체위변경 상담',
        content: '목욕 후 어르신 개운해하시며 만족도 매우 높음. 엉덩이 피부 발적 연고 도포 협조 요청.',
        actionPlan: '요양보호사 및 목욕팀에게 목욕 전후 피부 상태 관찰일지 필수 기록 지침 전달.',
        status: '조치완료',
      },
    ],
    statusChanges: [
      {
        id: 'SC-201',
        round: 1,
        date: '2026.01.12',
        writer: '김철호',
        content: '우측 상하지 관절 운동 시 가벼운 통증 표현하심. 휴식 후 완화됨.',
        careWorkerSigned: 'Y',
      },
      {
        id: 'SC-202',
        round: 2,
        date: '2026.02.15',
        writer: '김철호',
        content: '혈당 측정 수치 125mg/dL로 안정적. 식이 지도 병행.',
        careWorkerSigned: 'Y',
      },
      {
        id: 'SC-203',
        round: 3,
        date: '2026.03.12',
        writer: '김철호',
        content: '휠체어 이동 시 우측 편마비 부위 힘 빠짐 현상 일시 관찰되어 부축 지지 강화함.',
        careWorkerSigned: 'Y',
      },
    ],
    dutyLogs: [
      {
        id: 'DL-201',
        round: 1,
        visitDate: '2026.03.10',
        visitTime: '10:00~11:30',
        visitType: '정기방문',
        serviceType: '방문요양',
        checkContent: '우측 편마비 재활 운동 보조 상태 점검 및 보호자 상담 진행.',
        comprehensiveOpinion: '신체 기능 유지를 위한 관절 가동범위 운동 지속 권장.',
        worker: '이지원 (사회복지사)',
        status: '작성완료',
      },
    ],
  },
  {
    id: 'BEN-003',
    name: '박복순',
    rcgtNo: 'L2039481726',
    grade: '4등급',
    dob: '1945.02.18',
    gender: '여',
    status: '이용중',
    specialNotes: '당뇨발 자가관찰 및 상처 감염 주의, 식이 후 혈당 관리 및 보습 유지',
    phone: '010-9912-3847',
    address: '서울시 서초구 서초대로 88 502호',
    guardianName: '박태수 (아들)',
    guardianPhone: '010-2291-3847',
    enrolledServices: ['방문간호'],
    serviceContracts: [
      { serviceType: '방문간호', startDate: '2026.03.01', endDate: '2027.02.28', isExpired: false },
      { serviceType: '방문요양', startDate: '2023.03.01', endDate: '2024.02.29', isExpired: true },
    ],
    primaryCareWorker: '미지정',
    primaryNurse: '박은정 간호사',
    diseaseDiagnosis: '당뇨병성 족부궤양, 만성신부전',
    evalSummary: {
      fallRiskGrade: '',
      fallRiskStatus: '미작성',
      bedsoreRiskGrade: '',
      bedsoreRiskStatus: '미작성',
      cognitiveStatus: '미작성',
      needAssessmentStatus: '미작성',
    },
    evalMatrix: [],
    counselings: [
      {
        id: 'CS-301',
        counselDate: '2026-03-12 15:30',
        counselType: '보호자유선',
        counselee: '박태수 (아들)',
        counselor: '박은정 (간호사)',
        channel: '유선통화',
        topic: '발가락 상처 호전 경과 및 당뇨 식이 지도 상담',
        content: '상처 삼출물이 많이 줄어들었음을 설명하고 저당 간식 섭취 당부.',
        actionPlan: '다음 방문 시 혈당 측정 및 당뇨발 관리 안내문 전달.',
        status: '조치완료',
      },
    ],
    statusChanges: [],
    dutyLogs: [],
  },
  {
    id: 'BEN-004',
    name: '정해룡',
    rcgtNo: 'L3928174620',
    grade: '1등급',
    dob: '1935.09.04',
    gender: '남',
    status: '이용중',
    specialNotes: '연하곤란(사레 주의)으로 식사 시 상체 거치 필수, 침상 체위변경 2시간 주기 준수',
    phone: '010-3321-4958',
    address: '서울시 송파구 올림픽로 300 1204호',
    guardianName: '정미영 (딸)',
    guardianPhone: '010-5544-3322',
    enrolledServices: ['방문요양', '방문목욕', '방문간호'],
    serviceContracts: [
      { serviceType: '방문요양', startDate: '2026.01.01', endDate: '2026.12.31', isExpired: false },
      { serviceType: '방문목욕', startDate: '2026.01.01', endDate: '2026.12.31', isExpired: false },
      { serviceType: '방문간호', startDate: '2026.01.01', endDate: '2026.12.31', isExpired: false },
    ],
    primaryCareWorker: '강민준',
    primaryNurse: '박은정 간호사',
    diseaseDiagnosis: '파킨슨병, 연하곤란, 욕창',
    evalSummary: {
      fallRiskGrade: '고위험',
      fallRiskStatus: '평가완료',
      bedsoreRiskGrade: '고위험',
      bedsoreRiskStatus: '평가완료',
      cognitiveStatus: '해당없음',
      needAssessmentStatus: '평가미완료',
    },
    evalMatrix: [
      {
        round: 1,
        fallRisk: {
          evaluator: '김정희',
          evalDate: '2026.01.15',
          evalCategory: '정기평가',
          scoreText: '10점',
          grade: '고위험',
        },
        bedsoreRisk: {
          evaluator: '김정희',
          evalDate: '2026.01.15',
          evalCategory: '정기평가',
          scoreText: '11점',
          grade: '고위험',
        },
        cognitive: {
          status: '해당없음',
        },
        needAssessment: {
          status: '평가미완료',
        },
      },
    ],
    counselings: [
      {
        id: 'CS-401',
        counselDate: '2026-03-10 16:00',
        counselType: '정기상담',
        counselee: '정미영 (딸)',
        counselor: '이지원 (사회복지사)',
        channel: '방문대면',
        topic: '와상 상태 돌봄 부담 상담 및 요양보호사 격려',
        content: '보호자의 간병 피로도가 높아 주야간보호 또는 가족 휴식 지원 서비스 안내 요청.',
        actionPlan: '치매가족휴가제 단기보호 연계 정보 제공.',
        status: '진행중',
      },
    ],
    statusChanges: [
      {
        id: 'SC-401',
        round: 1,
        date: '2026.01.20',
        writer: '강민준',
        content: '천골 부위 발적 관찰되어 체위변경 및 에어매트리스 점검 실시.',
        careWorkerSigned: 'Y',
      },
      {
        id: 'SC-402',
        round: 2,
        date: '2026.03.18',
        writer: '강민준',
        content: '천골 부위 피부 발적(지름 2cm) 관찰되어 체위변경 매 2시간 주기 철저히 유지 필요.',
        careWorkerSigned: 'Y',
      },
      {
        id: 'SC-403',
        round: 3,
        date: '2026.03.11',
        writer: '강민준',
        content: '연하곤란으로 죽 식사 중 가벼운 사레 1회 발생. 식사 전 구강체조 및 상체 45도 거치 완료.',
        careWorkerSigned: 'Y',
      },
    ],
    dutyLogs: [
      {
        id: 'DL-401',
        round: 1,
        visitDate: '2026.03.15',
        visitTime: '14:00~15:30',
        visitType: '정기방문',
        serviceType: '방문요양',
        checkContent: '와상 상태 수급자 피부 상태 점검 및 요양보호사 체위변경 기술 지도.',
        comprehensiveOpinion: '욕창 예방 매트리스 및 체위변경 쿠션 사용 적절함. 수급자 영양 상태 모니터링 지속 필요.',
        worker: '이지원 (사회복지사)',
        status: '작성완료',
      },
    ],
  },
  {
    id: 'BEN-005',
    name: '최영자',
    rcgtNo: 'L4829103948',
    grade: '5등급',
    dob: '1947.08.19',
    gender: '여',
    status: '계약만료',
    specialNotes: '타 지역 이사로 인한 서비스 계약 만료(2026.02.28)',
    phone: '010-7788-9900',
    address: '서울시 강동구 천호대로 100',
    guardianName: '최민수 (아들)',
    guardianPhone: '010-1122-3344',
    enrolledServices: ['방문요양'],
    serviceContracts: [
      { serviceType: '방문요양', startDate: '2025.03.01', endDate: '2026.02.28', isExpired: true },
    ],
    primaryCareWorker: '홍길순',
    primaryNurse: '미지정',
    diseaseDiagnosis: '경도인지장애, 관절염',
    evalSummary: {
      fallRiskGrade: '저위험',
      fallRiskStatus: '평가완료',
      bedsoreRiskGrade: '정상',
      bedsoreRiskStatus: '평가완료',
      cognitiveStatus: '평가완료',
      needAssessmentStatus: '평가완료',
    },
    evalMatrix: [
      {
        round: 1,
        fallRisk: {
          evaluator: '김정희',
          evalDate: '2025.03.02',
          evalCategory: '정기평가',
          scoreText: '2점',
          grade: '저위험',
        },
        bedsoreRisk: {
          evaluator: '김정희',
          evalDate: '2025.03.02',
          evalCategory: '정기평가',
          scoreText: '20점',
          grade: '정상',
        },
        cognitive: {
          evaluator: '김정희',
          evalDate: '2025.03.02',
          status: '평가완료',
          scoreText: '22점',
        },
        needAssessment: {
          evaluator: '김정희',
          evalDate: '2025.03.02',
          status: '평가완료',
        },
      },
    ],
    counselings: [
      {
        id: 'CS-501',
        counselDate: '2026-02-25 14:00',
        counselType: '수시상담',
        counselee: '최민수 (아들)',
        counselor: '이지원 (사회복지사)',
        channel: '유선통화',
        topic: '타 지역 이사에 따른 급여 계약 해지 상담',
        content: '수급자 어르신의 타 시도 자녀 댁 합가로 인한 2월 말일 자 계약 종료 합의.',
        actionPlan: '공단 계약종료 통보 및 서류 편철 완료.',
        status: '조치완료',
      },
    ],
    statusChanges: [
      {
        id: 'SC-501',
        round: 1,
        date: '2026.02.20',
        writer: '홍길순',
        content: '타 지역 이사 준비로 거동 및 짐 정리 시 낙상 유의 지도.',
        careWorkerSigned: 'Y',
      },
    ],
    dutyLogs: [
      {
        id: 'DL-501',
        round: 1,
        visitDate: '2026.02.18',
        visitTime: '10:00~11:00',
        visitType: '급여모니터링',
        serviceType: '방문요양',
        checkContent: '계약 만료 전 급여 제공 적절성 및 서비스 종결 안내.',
        comprehensiveOpinion: '수급자 및 보호자 모두 서비스 만족도 높았음. 타 지역 전출 시 기관 연계 안내 완료.',
        worker: '이지원 (사회복지사)',
        status: '작성완료',
      },
    ],
  },
  {
    id: 'BEN-005',
    name: '최영자',
    rcgtNo: 'L4829103948',
    grade: '5등급',
    dob: '1947.08.19',
    gender: '여',
    status: '계약만료',
    specialNotes: '타 지역 이사로 인한 서비스 계약 만료(2026.02.28)',
    phone: '010-7788-9900',
    address: '서울시 강동구 천호대로 100',
    guardianName: '최민수 (아들)',
    guardianPhone: '010-1122-3344',
    enrolledServices: ['방문요양'],
    serviceContracts: [
      { serviceType: '방문요양', startDate: '2025.03.01', endDate: '2026.02.28', isExpired: true },
    ],
    primaryCareWorker: '홍길순',
    primaryNurse: '미지정',
    diseaseDiagnosis: '경도인지장애, 관절염',
    evalSummary: {
      fallRiskGrade: '저위험',
      fallRiskStatus: '평가완료',
      bedsoreRiskGrade: '정상',
      bedsoreRiskStatus: '평가완료',
      cognitiveStatus: '평가완료',
      needAssessmentStatus: '평가완료',
    },
    evalMatrix: [
      {
        round: 1,
        fallRisk: {
          evaluator: '김정희',
          evalDate: '2025.03.02',
          evalCategory: '정기평가',
          scoreText: '2점',
          grade: '저위험',
        },
        bedsoreRisk: {
          evaluator: '김정희',
          evalDate: '2025.03.02',
          evalCategory: '정기평가',
          scoreText: '20점',
          grade: '정상',
        },
        cognitive: {
          evaluator: '김정희',
          evalDate: '2025.03.02',
          status: '평가완료',
          scoreText: '22점',
        },
        needAssessment: {
          evaluator: '김정희',
          evalDate: '2025.03.02',
          status: '평가완료',
        },
      },
    ],
    counselings: [
      {
        id: 'CS-501',
        counselDate: '2026-02-25 14:00',
        counselType: '수시상담',
        counselee: '최민수 (아들)',
        counselor: '이지원 (사회복지사)',
        channel: '유선통화',
        topic: '타 지역 이사에 따른 급여 계약 해지 상담',
        content: '수급자 어르신의 타 시도 자녀 댁 합가로 인한 2월 말일 자 계약 종료 합의.',
        actionPlan: '공단 계약종료 통보 및 서류 편철 완료.',
        status: '조치완료',
      },
    ],
    statusChanges: [
      {
        id: 'SC-501',
        round: 1,
        date: '2026.02.20 11:30',
        category: '기타',
        content: '타 지역 이사 준비로 거동 및 짐 정리 시 낙상 유의 지도.',
        action: '보호자에게 이사 당일 수급자 안전 돌봄 및 보행기 사용 주의사항 전달.',
        writer: '홍길순 (요양보호사)',
        verified: true,
      },
    ],
    dutyLogs: [
      {
        id: 'DL-501',
        round: 1,
        visitDate: '2026.02.18',
        visitTime: '10:00~11:00',
        visitType: '급여모니터링',
        serviceType: '방문요양',
        checkContent: '계약 만료 전 급여 제공 적절성 및 서비스 종결 안내.',
        comprehensiveOpinion: '수급자 및 보호자 모두 서비스 만족도 높았음. 타 지역 전출 시 기관 연계 안내 완료.',
        worker: '이지원 (사회복지사)',
        status: '작성완료',
      },
    ],
  },
]

// ─── Main Component ──────────────────────────────────────────────────────────

export interface BeneficiaryRecordPageProps {
  initialViewMode?: '개별기록' | '기록점검'
}

export default function BeneficiaryRecordPage({ initialViewMode = '개별기록' }: BeneficiaryRecordPageProps) {
  // 최상단 뷰 모드 토글: '개별기록' (수급자 개별 기록 모아보기) | '기록점검' (기록지별 수급자 작성 현황 모아보기)
  const [viewMode, setViewMode] = useState<'개별기록' | '기록점검'>(initialViewMode)

  useEffect(() => {
    setViewMode(initialViewMode)
  }, [initialViewMode])

  const [beneficiaries, setBeneficiaries] = useState<BeneficiaryRecordProfile[]>(INITIAL_BENEFICIARIES)
  const [selectedId, setSelectedId] = useState<string>(INITIAL_BENEFICIARIES[0].id)

  // 우측 워크스페이스 메인 4대 탭: '기초평가' | '상담일지' | '상태변화기록' | '사회복지사 업무수행일지'
  const [activeTab, setActiveTab] = useState<'기초평가' | '상담일지' | '상태변화기록' | '사회복지사 업무수행일지'>('기초평가')

  // 기초평가 연도 선택
  const [selectedYear, setSelectedYear] = useState('2026년')

  // 상담일지 연도 및 4대 분류(요양/목욕/간호/직원변경) 필터
  const [counselYear, setCounselYear] = useState('2026년')
  const [counselFilter, setCounselFilter] = useState<'전체' | '요양' | '목욕' | '간호' | '직원변경'>('전체')

  // 상태변화기록 연도 및 월 필터 (피그마 캡쳐 스펙: 2026년 / 1월 / 당월)
  const [statusChangeYear, setStatusChangeYear] = useState('2026년')
  const [statusChangeMonth, setStatusChangeMonth] = useState('1월')
  const [selectedStatusChangeIds, setSelectedStatusChangeIds] = useState<string[]>([])

  // 사회복지사 업무수행일지 연도 및 월 필터 (월별 관리)
  const [dutyLogYear, setDutyLogYear] = useState('2026년')
  const [dutyLogMonth, setDutyLogMonth] = useState('1월')
  const [selectedDutyLogIds, setSelectedDutyLogIds] = useState<string[]>([])

  // 좌측 수급자 검색 및 등급/만료 필터
  const [searchKeyword, setSearchKeyword] = useState('')
  const [gradeFilter, setGradeFilter] = useState<string>('전체')
  const [includeExpired, setIncludeExpired] = useState(false)

  // 모달 상태
  const [activeModalType, setActiveModalType] = useState<'낙상' | '욕창' | '인지기능' | '욕구사정' | '상담일지' | '상태변화기록' | '업무수행일지' | null>(null)

  // 신규 모달 입력 폼
  const [modalForm, setModalForm] = useState({
    evalDate: '2026.03.21',
    evalCategory: '정기평가',
    scoreText: '5점',
    grade: '고위험',
    evaluator: '김정희',
    summaryOpinion: '',
  })

  // 상담일지 신규 입력 폼
  const [counselForm, setCounselForm] = useState({
    counselDate: '2026-03-21 10:00',
    counselType: '요양' as CounselingType,
    counselee: '',
    counselor: '이지원 (사회복지사)',
    channel: '방문대면' as '방문대면' | '유선통화' | '내방상담',
    topic: '',
    content: '',
    actionPlan: '',
    status: '조치완료' as '조치완료' | '진행중',
  })

  // 상태변화기록 신규 입력 폼 (피그마 캡쳐 1:1)
  const [statusChangeForm, setStatusChangeForm] = useState({
    date: '2026.01.08',
    writer: '홍길순',
    content: '',
    careWorkerSigned: 'Y' as 'Y' | 'N' | '-',
  })

  // 사회복지사 업무수행일지 신규 입력 폼
  const [dutyLogForm, setDutyLogForm] = useState({
    visitDate: '2026.03.21',
    visitTime: '10:00~11:30',
    visitType: '정기방문' as '정기방문' | '수시상담' | '급여모니터링' | '요양보호사지도',
    serviceType: '방문요양',
    checkContent: '',
    comprehensiveOpinion: '',
    worker: '이지원 (사회복지사)',
    status: '작성완료' as '작성완료' | '진행중',
  })

  // 상담일지 체크박스 다중 선택 상태 (선택 출력용)
  const [selectedCounselIds, setSelectedCounselIds] = useState<string[]>([])

  // Current Selected Beneficiary
  const currentBeneficiary = useMemo(() => {
    return beneficiaries.find(b => b.id === selectedId) || beneficiaries[0]
  }, [beneficiaries, selectedId])

  // 수급자별 유효 또는 과거 이력이 있는 급여유형(요양/목욕/간호) 동적 추출
  const availableServiceTypes = useMemo(() => {
    const serviceSet = new Set<string>()
    if (!currentBeneficiary) return serviceSet

    // 1) 현재 등록된 급여유형
    currentBeneficiary.enrolledServices?.forEach(s => {
      if (s.includes('요양')) serviceSet.add('요양')
      if (s.includes('목욕')) serviceSet.add('목욕')
      if (s.includes('간호')) serviceSet.add('간호')
    })
    // 2) 과거/현재 계약이력
    if (currentBeneficiary.serviceContracts) {
      currentBeneficiary.serviceContracts.forEach(c => {
        if (c.serviceType.includes('요양')) serviceSet.add('요양')
        if (c.serviceType.includes('목욕')) serviceSet.add('목욕')
        if (c.serviceType.includes('간호')) serviceSet.add('간호')
      })
    }
    // 3) 기존 작성된 상담일지 이력
    if (currentBeneficiary.counselings) {
      currentBeneficiary.counselings.forEach(cs => {
        if (cs.counselType === '요양' || cs.counselType === '목욕' || cs.counselType === '간호') {
          serviceSet.add(cs.counselType)
        }
      })
    }
    return serviceSet
  }, [currentBeneficiary])

  // 수급자별 노출할 상담구분 필터 세그먼트 탭 목록
  const counselFilterTabs = useMemo(() => {
    const tabs: ('전체' | '요양' | '목욕' | '간호' | '직원변경')[] = ['전체']
    if (availableServiceTypes.has('요양')) tabs.push('요양')
    if (availableServiceTypes.has('목욕')) tabs.push('목욕')
    if (availableServiceTypes.has('간호')) tabs.push('간호')
    tabs.push('직원변경')
    return tabs
  }, [availableServiceTypes])

  // Current Beneficiary Age
  const currentAge = useMemo(() => {
    if (!currentBeneficiary?.dob) return '-'
    const parts = currentBeneficiary.dob.split('.')
    if (parts.length >= 3) {
      const birthYear = parseInt(parts[0], 10)
      const birthMonth = parseInt(parts[1], 10)
      const birthDay = parseInt(parts[2], 10)
      const today = new Date(2026, 2, 21)
      let age = today.getFullYear() - birthYear
      const m = (today.getMonth() + 1) - birthMonth
      if (m < 0 || (m === 0 && today.getDate() < birthDay)) {
        age--
      }
      return `${age}세`
    }
    return '-'
  }, [currentBeneficiary?.dob])

  // Filtered Active & Expired Beneficiaries
  const { activeBeneficiaries, expiredBeneficiaries, filteredBeneficiaries } = useMemo(() => {
    const active: BeneficiaryRecordProfile[] = []
    const expired: BeneficiaryRecordProfile[] = []

    beneficiaries.forEach(b => {
      const matchKeyword = !searchKeyword || b.name.includes(searchKeyword) || b.rcgtNo.includes(searchKeyword)
      const matchGrade = gradeFilter === '전체' || b.grade === gradeFilter
      if (!matchKeyword || !matchGrade) return

      if (b.status === '계약만료') {
        expired.push(b)
      } else {
        active.push(b)
      }
    })

    const combined = includeExpired ? [...active, ...expired] : active
    return {
      activeBeneficiaries: active,
      expiredBeneficiaries: expired,
      filteredBeneficiaries: combined,
    }
  }, [beneficiaries, searchKeyword, gradeFilter, includeExpired])

  // Gender Counts for filtered list
  const maleCount = useMemo(() => filteredBeneficiaries.filter(b => b.gender === '남').length, [filteredBeneficiaries])
  const femaleCount = useMemo(() => filteredBeneficiaries.filter(b => b.gender === '여').length, [filteredBeneficiaries])

  // 수급자 변경 시 해당 수급자에게 없는 상담 필터가 선택되어 있다면 '전체'로 자동 리셋
  useEffect(() => {
    if (!counselFilterTabs.includes(counselFilter as any)) {
      setCounselFilter('전체')
    }
  }, [counselFilterTabs, counselFilter])

  // Handle Add Specific Evaluation (낙상, 욕창, 인지, 욕구)
  const handleSaveEvalModal = () => {
    if (!activeModalType) return

    setBeneficiaries(prev => prev.map(b => {
      if (b.id === currentBeneficiary.id) {
        const nextRound = (b.evalMatrix[0]?.round || 0) + 1
        const newRow: EvaluationMatrixRow = {
          round: nextRound,
          fallRisk: activeModalType === '낙상' ? {
            evaluator: modalForm.evaluator,
            evalDate: modalForm.evalDate,
            evalCategory: modalForm.evalCategory,
            scoreText: modalForm.scoreText,
            grade: modalForm.grade as any,
          } : b.evalMatrix[0]?.fallRisk,
          bedsoreRisk: activeModalType === '욕창' ? {
            evaluator: modalForm.evaluator,
            evalDate: modalForm.evalDate,
            evalCategory: modalForm.evalCategory,
            scoreText: modalForm.scoreText,
            grade: modalForm.grade as any,
          } : b.evalMatrix[0]?.bedsoreRisk,
          cognitive: activeModalType === '인지기능' ? {
            evaluator: modalForm.evaluator,
            evalDate: modalForm.evalDate,
            status: '평가완료',
            scoreText: modalForm.scoreText,
          } : b.evalMatrix[0]?.cognitive,
          needAssessment: activeModalType === '욕구사정' ? {
            evaluator: modalForm.evaluator,
            evalDate: modalForm.evalDate,
            status: '평가완료',
          } : b.evalMatrix[0]?.needAssessment,
        }

        return {
          ...b,
          evalMatrix: [newRow, ...b.evalMatrix],
        }
      }
      return b
    }))

    setActiveModalType(null)
  }

  // Handle Add Counseling Log
  const handleSaveCounseling = () => {
    if (!counselForm.content.trim()) {
      alert('상담 상세내용을 입력해주세요.')
      return
    }
    const item: CounselingLogItem = {
      id: `CS-${Date.now()}`,
      ...counselForm,
      counselee: counselForm.counselee || `${currentBeneficiary.name} (수급자 본인)`,
    }
    setBeneficiaries(prev => prev.map(b => {
      if (b.id === currentBeneficiary.id) {
        return {
          ...b,
          counselings: [item, ...(b.counselings || [])],
        }
      }
      return b
    }))
    setActiveModalType(null)
    setCounselForm({
      counselDate: '2026-03-21 10:00',
      counselType: '요양',
      counselee: '',
      counselor: '이지원 (사회복지사)',
      channel: '방문대면',
      topic: '',
      content: '',
      actionPlan: '',
      status: '조치완료',
    })
  }

  // Handle Add Status Change Log (피그마 캡쳐 1:1)
  const handleSaveStatusChange = () => {
    if (!statusChangeForm.content.trim()) {
      alert('작성내용을 입력해주세요.')
      return
    }
    const nextRound = ((currentBeneficiary.statusChanges || [])[0]?.round || 0) + 1
    const item: StatusChangeLogItem = {
      id: `SC-${Date.now()}`,
      round: nextRound,
      date: statusChangeForm.date,
      writer: statusChangeForm.writer || '홍길순',
      content: statusChangeForm.content,
      careWorkerSigned: statusChangeForm.careWorkerSigned,
    }
    setBeneficiaries(prev => prev.map(b => {
      if (b.id === currentBeneficiary.id) {
        return {
          ...b,
          statusChanges: [item, ...(b.statusChanges || [])],
        }
      }
      return b
    }))
    setActiveModalType(null)
    setStatusChangeForm({
      date: '2026.01.08',
      writer: '홍길순',
      content: '',
      careWorkerSigned: 'Y',
    })
  }

  // Handle Add Duty Log
  const handleSaveDutyLog = () => {
    if (!dutyLogForm.checkContent.trim()) {
      alert('점검 및 업무지도 내용을 입력해주세요.')
      return
    }
    const nextRound = ((currentBeneficiary.dutyLogs || [])[0]?.round || 0) + 1
    const item: SocialWorkerDutyLogItem = {
      id: `DL-${Date.now()}`,
      round: nextRound,
      ...dutyLogForm,
    }
    setBeneficiaries(prev => prev.map(b => {
      if (b.id === currentBeneficiary.id) {
        return {
          ...b,
          dutyLogs: [item, ...(b.dutyLogs || [])],
        }
      }
      return b
    }))
    setActiveModalType(null)
    setDutyLogForm({
      visitDate: '2026.03.21',
      visitTime: '10:00~11:30',
      visitType: '정기방문',
      serviceType: '방문요양',
      checkContent: '',
      comprehensiveOpinion: '',
      worker: '이지원 (사회복지사)',
      status: '작성완료',
    })
  }

  return (
    <div className="flex flex-col flex-1 h-full bg-[#eaedf2] overflow-hidden p-2 gap-2">

      {/* ─── 최상단 마스터 헤더 바: 대타이틀 & 뷰 모드 토글 세그먼트 버튼 ─── */}
      <div className="bg-white border border-[#c2cfdf] px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0 shadow-2xs">
        <div className="flex items-center gap-3">
          <h2 className="text-[16px] font-bold text-[#0e1225] inline-flex items-center gap-1.5 leading-none shrink-0">
            <span className="w-[4px] h-[16px] bg-[#ef5a27] inline-block rounded-[2px] shrink-0" />
            수급자 기록 관리
          </h2>

          {/* 뷰 모드 전환 토글 세그먼트 버튼 */}
          <div className="flex items-center bg-[#f1f5f9] p-0.5 rounded-[6px] border border-[#c2cfdf] h-[32px]">
            <button
              type="button"
              onClick={() => setViewMode('개별기록')}
              className={`h-full px-3 text-[13px] font-bold rounded-[4px] transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === '개별기록'
                  ? 'bg-white text-[#ef5a27] shadow-xs'
                  : 'text-[#64748b] hover:text-[#0e1225]'
              }`}
            >
              <span>수급자 개별 기록 모아보기</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('기록점검')}
              className={`h-full px-3 text-[13px] font-bold rounded-[4px] transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === '기록점검'
                  ? 'bg-white text-[#ef5a27] shadow-xs'
                  : 'text-[#64748b] hover:text-[#0e1225]'
              }`}
            >
              <span>기록지별 수급자 작성 현황 모아보기</span>
            </button>
          </div>
        </div>
      </div>

      {viewMode === '기록점검' ? (
        <BeneficiaryRecordOverviewPage embedded />
      ) : (
        /* ─── 본문 2-패널 워크스페이스 (수급자 개별 기록 모아보기) ─── */
        <div className="flex flex-1 overflow-hidden gap-2 min-h-0">

          {/* 좌측 패널: 수급자 선택 목록 (2:8 비율 중 20%, 최소 240px) */}
          <div className="w-[20%] min-w-[240px] bg-white border border-[#c2cfdf] flex flex-col shrink-0 overflow-hidden shadow-2xs">
            {/* 수급자 검색 및 필터 헤더 */}
            <div className="p-3 bg-[#fafbfc] border-b border-[#c2cfdf] flex flex-col gap-2 shrink-0">
              <div className="flex items-center justify-between h-[32px]">
                <div className="flex items-center gap-2">
                  <h2 className="text-[15px] font-bold text-[#0e1225] inline-flex items-center gap-1.5 leading-[32px]">
                    <span className="w-[3.5px] h-[14px] bg-[#2a3461] inline-block rounded-full shrink-0" />
                    수급자 목록
                  </h2>
                  <span className="h-[22px] px-2 inline-flex items-center justify-center bg-[#f1f5f9] text-[#64748b] text-[12px] font-bold rounded-[6px] leading-none whitespace-nowrap">
                    {filteredBeneficiaries.length}명
                  </span>
                </div>
              </div>
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={searchKeyword}
                onChange={e => setSearchKeyword(e.target.value)}
                placeholder="수급자명"
                className="flex-1 h-[34px] px-2.5 text-[13.5px] border border-[#c2cfdf] rounded-[4px] bg-white text-[#0e1225] placeholder:text-[#94a3b8] focus:border-[#ef5a27] focus:outline-none"
              />
              <select
                value={gradeFilter}
                onChange={e => setGradeFilter(e.target.value)}
                className="h-[34px] px-2 text-[13px] border border-[#c2cfdf] rounded-[4px] bg-white text-[#0e1225] font-medium focus:border-[#ef5a27] focus:outline-none cursor-pointer"
              >
                <option value="전체">등급전체</option>
                <option value="1등급">1등급</option>
                <option value="2등급">2등급</option>
                <option value="3등급">3등급</option>
                <option value="4등급">4등급</option>
                <option value="5등급">5등급</option>
              </select>
            </div>
          </div>

          {/* 수급자 목록 리스트 */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#c2cfdf]">
            {/* 1) 이용 중 수급자 목록 */}
            {activeBeneficiaries.map(ben => {
              const isSelected = ben.id === currentBeneficiary.id
              const parts = ben.dob.split('.')
              let age = 0
              if (parts.length >= 3) {
                const birthYear = parseInt(parts[0], 10)
                const birthMonth = parseInt(parts[1], 10)
                const birthDay = parseInt(parts[2], 10)
                const today = new Date(2026, 2, 21)
                age = today.getFullYear() - birthYear
                const m = (today.getMonth() + 1) - birthMonth
                if (m < 0 || (m === 0 && today.getDate() < birthDay)) {
                  age--
                }
              }

              return (
                <div
                  key={ben.id}
                  onClick={() => setSelectedId(ben.id)}
                  className={`px-3 py-2.5 transition-all cursor-pointer flex items-center justify-between ${isSelected
                    ? 'bg-[#d9ecff] text-[#1e3a8a]'
                    : 'bg-white hover:bg-[#f0f4fa]'
                    }`}
                >
                  {/* 좌측: 성별 / 이름 / 생년월일(만나이) / 등급 */}
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <span className={`size-[20px] rounded-[4px] flex items-center justify-center font-bold text-[12px] shrink-0 ${ben.gender === '여' ? 'bg-[#fdf2f8] text-[#e11d48]' : 'bg-[#eff6ff] text-[#2563eb]'
                      }`}>
                      {ben.gender === '여' ? '♀' : '♂'}
                    </span>
                    <span className={`font-bold text-[15px] truncate ${isSelected ? 'text-[#1e3a8a]' : 'text-[#0e1225]'}`}>{ben.name}</span>
                    <span className="text-[13px] text-[#64748b] whitespace-nowrap">
                      {ben.dob} ({age}세)
                    </span>
                    <span className="text-[12px] font-bold px-1.5 py-0.5 rounded-[4px] bg-[#f1f5f9] text-[#2a3461] border border-[#cbd5e1] shrink-0">
                      {ben.grade}
                    </span>
                  </div>

                  {/* 우측: 요목간 정사각형 태그 한 줄 배치 */}
                  <div className="flex items-center gap-0.5 shrink-0">
                    {ben.enrolledServices.map(s => {
                      const short = SERVICE_SHORT[s] ?? s
                      const cls = SERVICE_COLORS[s] ?? 'bg-[#f1f5f9] text-[#475569] border-[#cbd5e1]'
                      return (
                        <span
                          key={s}
                          className={`w-[20px] h-[20px] inline-flex items-center justify-center text-[11px] border rounded-[3px] font-bold leading-none shrink-0 ${cls}`}
                        >
                          {short}
                        </span>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            {/* 2) 계약만료자 구분선 바 & 만료자 목록 (포함 체크 시) */}
            {includeExpired && expiredBeneficiaries.length > 0 && (
              <>
                <div className="px-3 py-1.5 bg-[#f1f5f9] border-y border-[#c2cfdf] flex items-center justify-between text-[12px] font-bold text-[#475569] shrink-0 select-none">
                  <span className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-[#94a3b8]" />
                    계약만료 수급자 ({expiredBeneficiaries.length}명)
                  </span>
                  <span className="text-[11px] text-[#94a3b8] font-normal">서비스 만료</span>
                </div>
                {expiredBeneficiaries.map(ben => {
                  const isSelected = ben.id === currentBeneficiary.id
                  const parts = ben.dob.split('.')
                  let age = 0
                  if (parts.length >= 3) {
                    const birthYear = parseInt(parts[0], 10)
                    const birthMonth = parseInt(parts[1], 10)
                    const birthDay = parseInt(parts[2], 10)
                    const today = new Date(2026, 2, 21)
                    age = today.getFullYear() - birthYear
                    const m = (today.getMonth() + 1) - birthMonth
                    if (m < 0 || (m === 0 && today.getDate() < birthDay)) {
                      age--
                    }
                  }

                  return (
                    <div
                      key={ben.id}
                      onClick={() => setSelectedId(ben.id)}
                      className={`px-3 py-2.5 transition-all cursor-pointer flex items-center justify-between ${isSelected
                        ? 'bg-[#d9ecff] text-[#1e3a8a]'
                        : 'bg-[#fafbfc] hover:bg-[#f0f4fa]'
                        }`}
                    >
                      {/* 좌측: 성별 / 이름 / 생년월일(만나이) / 등급 */}
                      <div className="flex items-center gap-2 min-w-0 pr-2">
                        <span className={`size-[20px] rounded-[4px] flex items-center justify-center font-bold text-[12px] shrink-0 ${ben.gender === '여' ? 'bg-[#fdf2f8] text-[#e11d48]' : 'bg-[#eff6ff] text-[#2563eb]'
                          }`}>
                          {ben.gender === '여' ? '♀' : '♂'}
                        </span>
                        <span className="font-bold text-[15px] text-[#64748b] truncate">{ben.name}</span>
                        <span className="text-[13px] text-[#94a3b8] whitespace-nowrap">
                          {ben.dob} ({age}세)
                        </span>
                        <span className="text-[12px] font-bold px-1.5 py-0.5 rounded-[4px] bg-[#f1f5f9] text-[#64748b] border border-[#cbd5e1] shrink-0">
                          {ben.grade}
                        </span>
                      </div>

                      {/* 우측: 계약만료 뱃지 (급여유형 태그 대신 만료 뱃지 단독 표시) */}
                      <div className="shrink-0">
                        <span className="text-[12px] font-bold px-2 py-0.5 rounded-[4px] bg-[#fee2e2] text-[#b91c1c] border border-[#fecaca] whitespace-nowrap">
                          만료
                        </span>
                      </div>
                    </div>
                  )
                })}
              </>
            )}
          </div>

          {/* 좌측 패널 하단 푸터: 총 수 표시(좌측) & 계약만료자 포함(우측) */}
          <div className="px-3 py-2.5 bg-[#f8fafc] border-t border-[#c2cfdf] flex items-center justify-between shrink-0 text-[13px]">
            {/* 좌측: 총 수 및 성별 소계 */}
            <div className="text-[13px] text-[#64748b] flex items-center gap-1.5">
              <span>총 <strong className="text-[#0e1225] text-[14px]">{filteredBeneficiaries.length}</strong>명</span>
              <span className="text-[#cbd5e1]">|</span>
              <span>남 <strong className="text-[#2563eb] text-[14px]">{maleCount}</strong></span>
              <span className="text-[#cbd5e1]">|</span>
              <span>여 <strong className="text-[#e11d48] text-[14px]">{femaleCount}</strong></span>
            </div>

            {/* 우측: 계약만료자 포함 체크박스 */}
            <label className="flex items-center gap-1.5 cursor-pointer select-none text-[#475569] hover:text-[#0e1225] text-[13px]">
              <input
                type="checkbox"
                checked={includeExpired}
                onChange={e => setIncludeExpired(e.target.checked)}
                className="accent-[#2a3461] rounded w-4 h-4 cursor-pointer"
              />
              <span className="font-medium text-[13px]">계약만료자 포함</span>
            </label>
          </div>
        </div>

        {/* 우측 패널: 수급자 상세 정보 & 기초평가 / 상담일지 워크스페이스 (2:8 비율 중 80%) */}
        <div className="w-[80%] flex-1 bg-white border border-[#c2cfdf] flex flex-col overflow-hidden shadow-2xs min-w-0">

          {/* 수급자 요약 마스터 바 (수급자 사진 + 캡쳐 스타일 타이틀 라인 + 기본정보 + 주요질환/특이사항) */}
          <div className="p-3 bg-gradient-to-r from-[#f8fafc] via-[#fcfdff] to-white border-b border-[#c2cfdf] flex flex-col md:flex-row items-start gap-3.5 shrink-0">
            {/* 좌측: 수급자 사진 (피그마 수급자 상세 표준 84x100px) */}
            <div className="w-[84px] h-[100px] rounded-[8px] border border-[#c2cfdf] bg-[#eef3fa] overflow-hidden flex flex-col items-center justify-center shrink-0 shadow-2xs relative">
              {currentBeneficiary.photoUrl ? (
                <img
                  src={currentBeneficiary.photoUrl}
                  alt={currentBeneficiary.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-[#8a9cb4] bg-[#eef3fa] p-1 select-none">
                  <svg className="size-9 text-[#c2cfdf] mb-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  <span className="text-[12px] font-medium text-[#8a9cb4] leading-none">사진 없음</span>
                </div>
              )}
            </div>

            {/* 우측: 수급자 상세 정보 컨텐츠 */}
            <div className="flex-1 min-w-0 flex flex-col gap-1.5 w-full">
              {/* 1) 캡쳐 이미지 형태의 타이틀 라인: 성별 / 이름 / 생년월일(나이) / 등급 / 이용상태 / 서비스 태그 */}
              <div className="flex flex-wrap items-center gap-2">
                {/* 성별 뱃지 */}
                <span className={`size-[22px] rounded-[4px] flex items-center justify-center font-bold text-[13px] shrink-0 ${currentBeneficiary.gender === '여'
                  ? 'bg-[#fdf2f8] text-[#e11d48] border border-[#fce7f3]'
                  : 'bg-[#eff6ff] text-[#2563eb] border border-[#dbeafe]'
                  }`}>
                  {currentBeneficiary.gender === '여' ? '♀' : '♂'}
                </span>

                {/* 수급자명 */}
                <span className="text-[18px] font-bold text-[#0e1225] leading-none">
                  {currentBeneficiary.name}
                </span>

                {/* 생년월일 및 만 나이 */}
                <span className="text-[14.5px] font-medium text-[#4a6382] leading-none">
                  {currentBeneficiary.dob} ({currentAge})
                </span>

                {/* 등급 뱃지 */}
                <span className="text-[12.5px] font-bold px-2 py-0.5 rounded-[4px] bg-[#eef1f8] text-[#2a3461] border border-[#c2cfdf]">
                  {currentBeneficiary.grade}
                </span>

                {/* 이용상태 뱃지 */}
                <span className="text-[12.5px] font-bold px-2 py-0.5 rounded-[4px] bg-[#e6f4ea] text-[#137333] border border-[#ceead6]">
                  {currentBeneficiary.status || '이용중'}
                </span>

                {/* 급여유형별 계약기간 태그 칩 (기존 요목간 태그 위치) */}
                <div className="flex flex-wrap items-center gap-1.5 ml-1">
                  {currentBeneficiary.serviceContracts && currentBeneficiary.serviceContracts.length > 0 ? (
                    currentBeneficiary.serviceContracts.map(c => {
                      const short = SERVICE_SHORT[c.serviceType] ?? c.serviceType[0]
                      const isExp = c.isExpired

                      return (
                        <div
                          key={c.serviceType}
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] border transition-colors text-[12px] ${isExp
                            ? 'bg-[#f1f5f9] border-[#cbd5e1] text-[#94a3b8] opacity-80'
                            : 'bg-white border-[#c2cfdf] text-[#0e1225] shadow-2xs'
                            }`}
                        >
                          {/* 서비스 약칭 뱃지 */}
                          <span className={`w-[18px] h-[18px] inline-flex items-center justify-center text-[10.5px] rounded-[3px] font-bold shrink-0 ${isExp
                            ? 'bg-[#e2e8f0] text-[#94a3b8]'
                            : SERVICE_COLORS[c.serviceType] ?? 'bg-[#eef1f8] text-[#2a3461]'
                            }`}>
                            {short}
                          </span>

                          {/* 계약 기간 */}
                          <span className={`font-mono text-[11.5px] ${isExp ? 'text-[#94a3b8] line-through decoration-[#cbd5e1]' : 'text-[#334155] font-medium'}`}>
                            {c.startDate} ~ {c.endDate}
                          </span>

                          {/* 계약 상태 태그 */}
                          <span className={`text-[10.5px] font-bold px-1.5 py-0.2 rounded-[3px] shrink-0 leading-none ${isExp
                            ? 'bg-[#fee2e2] text-[#ef4444]'
                            : 'bg-[#e6f4ea] text-[#137333]'
                            }`}>
                            {isExp ? '만료' : '계약중'}
                          </span>
                        </div>
                      )
                    })
                  ) : (
                    currentBeneficiary.enrolledServices.map(s => {
                      const short = SERVICE_SHORT[s] ?? s
                      const cls = SERVICE_COLORS[s] ?? 'bg-[#f1f5f9] text-[#475569] border-[#cbd5e1]'
                      return (
                        <span
                          key={s}
                          className={`w-[20px] h-[20px] inline-flex items-center justify-center text-[11px] border rounded-[3px] font-bold leading-none shrink-0 ${cls}`}
                        >
                          {short}
                        </span>
                      )
                    })
                  )}
                </div>
              </div>

              {/* 2) 기본 정보 그리드 (인정번호 / 연락처 / 보호자 / 주소 / 담당) */}
              <div className="text-[13px] text-[#475569] flex flex-wrap items-center gap-x-3.5 gap-y-1 mt-0.5">
                <span className="flex items-center gap-1.5">
                  <span className="text-[#8a9cb4]">인정번호:</span>
                  <strong className="font-mono text-[#0e1225] text-[13.5px]">{currentBeneficiary.rcgtNo}</strong>
                </span>
                <span className="text-[#cbd5e1]">·</span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[#8a9cb4]">연락처:</span>
                  <span className="text-[#0e1225] font-medium">{currentBeneficiary.phone}</span>
                </span>
                <span className="text-[#cbd5e1]">·</span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[#8a9cb4]">보호자:</span>
                  <span className="text-[#0e1225]">{currentBeneficiary.guardianName} ({currentBeneficiary.guardianPhone})</span>
                </span>
                <span className="text-[#cbd5e1]">·</span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[#8a9cb4]">담당:</span>
                  <span className="text-[#0e1225]">요양({currentBeneficiary.primaryCareWorker}) / 간호({currentBeneficiary.primaryNurse})</span>
                </span>
              </div>

              {/* 3) 주요질환 & 특이사항 요약 카드 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[13px] mt-0.5">
                <div className="flex items-start gap-1.5 bg-[#f8fafc] border border-[#e2e8f0] px-2.5 py-1.5 rounded-[6px]">
                  <span className="font-bold text-[#ef5a27] shrink-0 flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-[#ef5a27]"></span>
                    주요질환:
                  </span>
                  <span className="text-[#0e1225] font-medium truncate" title={currentBeneficiary.diseaseDiagnosis}>
                    {currentBeneficiary.diseaseDiagnosis}
                  </span>
                </div>
                <div className="flex items-start gap-1.5 bg-[#fffbf0] border border-[#fed7aa] px-2.5 py-1.5 rounded-[6px]">
                  <span className="font-bold text-[#d97706] shrink-0 flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-[#d97706]"></span>
                    특이사항:
                  </span>
                  <span className="text-[#7c2d12] font-medium truncate" title={currentBeneficiary.specialNotes || '특이사항 없음'}>
                    {currentBeneficiary.specialNotes || '특이사항 없음'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ─── 4대 탭 네비게이션 바 (기초평가 / 상담일지 / 상태변화기록 / 사회복지사 업무수행일지) ─── */}
          <div className="bg-[#f4f7fc] border-b border-[#c2cfdf] flex items-center justify-between shrink-0 h-[40px]">
            {/* 좌측: 서브 탭 분할 버튼 그룹 */}
            <div className="flex items-center h-full overflow-x-auto">
              {(['기초평가', '상담일지', '상태변화기록', '사회복지사 업무수행일지'] as const).map(tab => {
                const isActive = activeTab === tab
                let count = 0
                if (tab === '기초평가') count = currentBeneficiary.evalMatrix?.length || 0
                else if (tab === '상담일지') count = currentBeneficiary.counselings?.length || 0
                else if (tab === '상태변화기록') count = currentBeneficiary.statusChanges?.length || 0
                else if (tab === '사회복지사 업무수행일지') count = currentBeneficiary.dutyLogs?.length || 0

                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`h-full px-5 text-[14px] whitespace-nowrap border-r border-[#c2cfdf] transition-colors cursor-pointer flex items-center gap-1.5 ${isActive
                      ? 'bg-white text-[#ef5a27] font-bold border-b-2 border-b-[#ef5a27]'
                      : 'text-[#334155] font-semibold hover:bg-[#eef2f8]'
                      }`}
                  >
                    <span>{tab}</span>
                    <span className={`text-[12px] px-2 py-0.5 rounded-full font-bold ${isActive ? 'bg-[#fff0eb] text-[#ef5a27]' : 'bg-[#e2e8f0] text-[#64748b]'
                      }`}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ─── 탭별 컨텐츠 워크스페이스 ─── */}
          <div className="flex-1 overflow-y-auto p-3.5 bg-[#fafbfc]">

            {/* 1. 기초평가 탭 컨텐츠 (캡쳐 화면 1:1 완벽 구현) */}
            {activeTab === '기초평가' && (
              <div className="flex flex-col gap-3">
                {/* 툴바: 타이틀 + 연도 선택 + 우측 4대 신규 등록 버튼 */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[16px] font-bold text-[#0e1225] flex items-center gap-1.5 leading-none">
                      <span className="w-1 h-3.5 bg-[#2a3461] rounded-full shrink-0" />
                      기초평가
                    </h3>
                    <select
                      value={selectedYear}
                      onChange={e => setSelectedYear(e.target.value)}
                      className="h-[34px] px-3 bg-white border border-[#c2cfdf] rounded-[6px] text-[13.5px] font-medium text-[#283445] focus:outline-none focus:border-[#ef5a27] cursor-pointer shadow-2xs"
                    >
                      <option value="2026년">2026년</option>
                      <option value="2025년">2025년</option>
                      <option value="2024년">2024년</option>
                    </select>
                  </div>

                  {/* 우측 4대 신규 버튼 (낙상 / 욕창 / 인지기능 / 욕구사정) - 컴포넌트 Button & IconName 적용 */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Button
                      type="Sub"
                      size="Medium"
                      icon="Fall"
                      onClick={() => {
                        setModalForm({
                          evalDate: '2026.03.21',
                          evalCategory: '재사정',
                          scoreText: '5점',
                          grade: '고위험',
                          evaluator: '김정희',
                          summaryOpinion: '',
                        })
                        setActiveModalType('낙상')
                      }}
                    >
                      낙상 신규
                    </Button>
                    <Button
                      type="Sub"
                      size="Medium"
                      icon="BedSore"
                      onClick={() => {
                        setModalForm({
                          evalDate: '2026.03.21',
                          evalCategory: '상태변화',
                          scoreText: '15점',
                          grade: '위험',
                          evaluator: '김정희',
                          summaryOpinion: '',
                        })
                        setActiveModalType('욕창')
                      }}
                    >
                      욕창 신규
                    </Button>
                    <Button
                      type="Sub"
                      size="Medium"
                      icon="Cognition"
                      onClick={() => {
                        setModalForm({
                          evalDate: '2026.03.21',
                          evalCategory: '정기평가',
                          scoreText: '22점',
                          grade: '정상',
                          evaluator: '김정희',
                          summaryOpinion: '',
                        })
                        setActiveModalType('인지기능')
                      }}
                    >
                      인지기능 신규
                    </Button>
                    <Button
                      type="Sub"
                      size="Medium"
                      icon="Desire"
                      onClick={() => {
                        setModalForm({
                          evalDate: '2026.03.21',
                          evalCategory: '정기평가',
                          scoreText: '14개 영역 적정',
                          grade: '정상',
                          evaluator: '김정희',
                          summaryOpinion: '',
                        })
                        setActiveModalType('욕구사정')
                      }}
                    >
                      욕구사정 신규
                    </Button>
                  </div>
                </div>

                {/* 4대 평가 현황 요약 카드 (상태 태그 '-' 표시) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                  {/* 1. 낙상위험도 요약 */}
                  <div className="bg-white border border-[#c2cfdf] rounded-[10px] p-3 flex flex-col justify-between h-[80px] shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[15px] text-[#283445]">낙상위험도</span>
                      {currentBeneficiary.evalSummary.fallRiskGrade ? (
                        <span className="text-[12px] font-bold px-1.5 py-0.5 rounded-[4px] bg-[#fee2e2] text-[#e11d48]">
                          {currentBeneficiary.evalSummary.fallRiskGrade}
                        </span>
                      ) : (
                        <span className="text-[13px] text-[#94a3b8] font-bold">-</span>
                      )}
                    </div>
                    <div>
                      <span className={`text-[14px] font-semibold ${currentBeneficiary.evalSummary.fallRiskStatus === '평가완료'
                        ? 'text-[#0d9488]'
                        : 'text-[#e11d48]'
                        }`}>
                        {currentBeneficiary.evalSummary.fallRiskStatus || '미작성'}
                      </span>
                    </div>
                  </div>

                  {/* 2. 욕창위험도 요약 */}
                  <div className="bg-white border border-[#c2cfdf] rounded-[10px] p-3 flex flex-col justify-between h-[80px] shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[15px] text-[#283445]">욕창위험도</span>
                      {currentBeneficiary.evalSummary.bedsoreRiskGrade ? (
                        <span className="text-[12px] font-bold px-1.5 py-0.5 rounded-[4px] bg-[#fef3c7] text-[#d97706]">
                          {currentBeneficiary.evalSummary.bedsoreRiskGrade}
                        </span>
                      ) : (
                        <span className="text-[13px] text-[#94a3b8] font-bold">-</span>
                      )}
                    </div>
                    <div>
                      <span className={`text-[14px] font-semibold ${currentBeneficiary.evalSummary.bedsoreRiskStatus === '평가완료'
                        ? 'text-[#0d9488]'
                        : 'text-[#e11d48]'
                        }`}>
                        {currentBeneficiary.evalSummary.bedsoreRiskStatus || '미작성'}
                      </span>
                    </div>
                  </div>

                  {/* 3. 인지기능 요약 */}
                  <div className="bg-white border border-[#c2cfdf] rounded-[10px] p-3 flex flex-col justify-between h-[80px] shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[15px] text-[#283445]">인지기능</span>
                      <span className="text-[13px] text-[#94a3b8] font-bold">-</span>
                    </div>
                    <div>
                      <span className={`text-[14px] font-semibold ${currentBeneficiary.evalSummary.cognitiveStatus === '치매진단'
                        ? 'text-[#0284c7]'
                        : currentBeneficiary.evalSummary.cognitiveStatus === '평가완료'
                          ? 'text-[#0d9488]'
                          : 'text-[#e11d48]'
                        }`}>
                        {currentBeneficiary.evalSummary.cognitiveStatus || '미작성'}
                      </span>
                    </div>
                  </div>

                  {/* 4. 욕구조사 요약 */}
                  <div className="bg-white border border-[#c2cfdf] rounded-[10px] p-3 flex flex-col justify-between h-[80px] shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[15px] text-[#283445]">욕구조사</span>
                      <span className="text-[13px] text-[#94a3b8] font-bold">-</span>
                    </div>
                    <div>
                      <span className={`text-[14px] font-semibold ${currentBeneficiary.evalSummary.needAssessmentStatus === '평가완료'
                        ? 'text-[#0d9488]'
                        : 'text-[#e11d48]'
                        }`}>
                        {currentBeneficiary.evalSummary.needAssessmentStatus || '미작성'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 연간 회차별 기초평가 매트릭스 테이블 (구분선 통일) */}
                <div className="bg-white border border-[#c2cfdf] rounded-[4px] overflow-hidden shadow-2xs">
                  <table className="w-full text-left border-collapse text-[13.5px]">
                    <thead className="bg-[#f4f7fc] text-[#283445] font-bold border-b border-[#c2cfdf] text-[13.5px]">
                      <tr>
                        <th className="py-2.5 px-3 border-r border-[#c2cfdf] w-[70px] text-center">
                          <span className="inline-flex items-center gap-1 cursor-pointer">
                            회차 <span className="text-[10px] text-[#8a9cb4]">⇅</span>
                          </span>
                        </th>
                        <th className="py-2.5 px-3 border-r border-[#c2cfdf] w-[23%]">
                          <span className="inline-flex items-center gap-1 cursor-pointer">
                            낙상위험도(연 1회) <span className="text-[10px] text-[#8a9cb4]">⇅</span>
                          </span>
                        </th>
                        <th className="py-2.5 px-3 border-r border-[#c2cfdf] w-[23%]">
                          <span className="inline-flex items-center gap-1 cursor-pointer">
                            욕창위험도(연 1회) <span className="text-[10px] text-[#8a9cb4]">⇅</span>
                          </span>
                        </th>
                        <th className="py-2.5 px-3 border-r border-[#c2cfdf] w-[23%]">
                          <span className="inline-flex items-center gap-1 cursor-pointer">
                            인지기능(연 1회) <span className="text-[10px] text-[#8a9cb4]">⇅</span>
                          </span>
                        </th>
                        <th className="py-2.5 px-3 w-[23%]">
                          <span className="inline-flex items-center gap-1 cursor-pointer">
                            욕구조사(연 1회) <span className="text-[10px] text-[#8a9cb4]">⇅</span>
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#c2cfdf]">
                      {currentBeneficiary.evalMatrix.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-12 text-center text-[#8a9cb4] text-[14px]">
                            작성 내역이 없습니다
                          </td>
                        </tr>
                      ) : (
                        currentBeneficiary.evalMatrix.map(row => (
                          <tr key={row.round} className="hover:bg-[#f8fafc] transition-colors">
                            {/* 1. 회차 */}
                            <td className="py-3 px-3 border-r border-[#c2cfdf] text-center font-bold text-[#0e1225] text-[14.5px]">
                              {row.round}
                            </td>

                            {/* 2. 낙상위험도 */}
                            <td className="py-2.5 px-3 border-r border-[#c2cfdf] align-top">
                              {row.fallRisk ? (
                                <div className="flex items-start justify-between gap-1">
                                  <div className="flex flex-col text-[13.5px]">
                                    <span className="font-bold text-[#0e1225]">{row.fallRisk.evaluator}</span>
                                    <span className="text-[#64748b] text-[12.5px]">{row.fallRisk.evalDate}</span>
                                    <span className="text-[#334155]">{row.fallRisk.evalCategory} ({row.fallRisk.scoreText})</span>
                                  </div>
                                  <span className="text-[12px] font-bold px-1.5 py-0.5 rounded-[4px] bg-[#fee2e2] text-[#e11d48] shrink-0">
                                    {row.fallRisk.grade}
                                  </span>
                                </div>
                              ) : (
                                <div className="flex items-center">
                                  <span className="inline-block px-2 py-0.5 rounded-[4px] bg-[#fff1f2] text-[#e11d48] text-[12px] font-bold border border-[#fecaca]">
                                    미작성
                                  </span>
                                </div>
                              )}
                            </td>

                            {/* 3. 욕창위험도 */}
                            <td className="py-2.5 px-3 border-r border-[#c2cfdf] align-top">
                              {row.bedsoreRisk ? (
                                <div className="flex items-start justify-between gap-1">
                                  <div className="flex flex-col text-[13.5px]">
                                    <span className="font-bold text-[#0e1225]">{row.bedsoreRisk.evaluator}</span>
                                    <span className="text-[#64748b] text-[12.5px]">{row.bedsoreRisk.evalDate}</span>
                                    <span className="text-[#334155]">{row.bedsoreRisk.evalCategory} ({row.bedsoreRisk.scoreText})</span>
                                  </div>
                                  <span className="text-[12px] font-bold px-1.5 py-0.5 rounded-[4px] bg-[#fef3c7] text-[#d97706] shrink-0">
                                    {row.bedsoreRisk.grade}
                                  </span>
                                </div>
                              ) : (
                                <div className="flex items-center">
                                  <span className="inline-block px-2 py-0.5 rounded-[4px] bg-[#fff1f2] text-[#e11d48] text-[12px] font-bold border border-[#fecaca]">
                                    미작성
                                  </span>
                                </div>
                              )}
                            </td>

                            {/* 4. 인지기능 */}
                            <td className="py-2.5 px-3 border-r border-[#c2cfdf] align-top">
                              {row.cognitive ? (
                                <div className="flex items-start justify-between gap-1">
                                  <div className="flex flex-col text-[13.5px]">
                                    {row.cognitive.evaluator && (
                                      <span className="font-bold text-[#0e1225]">{row.cognitive.evaluator}</span>
                                    )}
                                    {row.cognitive.evalDate && (
                                      <span className="text-[#64748b] text-[12.5px]">{row.cognitive.evalDate}</span>
                                    )}
                                    {row.cognitive.scoreText ? (
                                      <span className="text-[#334155]">{row.cognitive.scoreText}</span>
                                    ) : (
                                      <span className="text-[#64748b]">-</span>
                                    )}
                                  </div>
                                  <span className={`text-[12px] font-bold px-1.5 py-0.5 rounded-[4px] shrink-0 ${row.cognitive.status === '치매진단'
                                    ? 'bg-[#eff6ff] text-[#0284c7]'
                                    : 'bg-[#f1f5f9] text-[#64748b]'
                                    }`}>
                                    {row.cognitive.status}
                                  </span>
                                </div>
                              ) : (
                                <div className="flex items-center">
                                  <span className="inline-block px-2 py-0.5 rounded-[4px] bg-[#fff1f2] text-[#e11d48] text-[12px] font-bold border border-[#fecaca]">
                                    미작성
                                  </span>
                                </div>
                              )}
                            </td>

                            {/* 5. 욕구조사 */}
                            <td className="py-2.5 px-3 align-top">
                              {row.needAssessment && row.needAssessment.status === '평가완료' ? (
                                <div className="flex flex-col text-[13.5px]">
                                  <span className="font-bold text-[#0e1225]">{row.needAssessment.evaluator}</span>
                                  <span className="text-[#64748b] text-[12.5px]">{row.needAssessment.evalDate}</span>
                                  <span className="text-[#0d9488] font-semibold">{row.needAssessment.status}</span>
                                </div>
                              ) : (
                                <div className="flex items-center">
                                  <span className="inline-block px-2 py-0.5 rounded-[4px] bg-[#fff1f2] text-[#e11d48] text-[12px] font-bold border border-[#fecaca]">
                                    미작성
                                  </span>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 2. 상담일지 탭 컨텐츠 (요양/목욕/간호/직원변경 4대 체계) */}
            {activeTab === '상담일지' && (
              <div className="flex flex-col gap-3">
                {/* 툴바: 상담일지 타이틀 + 연도 선택 + 4대 분류 세그먼트 필터 + 4대 신규 작성 버튼 */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[16px] font-bold text-[#0e1225] flex items-center gap-1.5 leading-none">
                      <span className="w-1 h-3.5 bg-[#2a3461] rounded-full shrink-0" />
                      상담일지
                    </h3>
                    <select
                      value={counselYear}
                      onChange={e => setCounselYear(e.target.value)}
                      className="h-[34px] px-3 bg-white border border-[#c2cfdf] rounded-[6px] text-[13.5px] font-medium text-[#283445] focus:outline-none focus:border-[#ef5a27] cursor-pointer shadow-2xs"
                    >
                      <option value="2026년">2026년</option>
                      <option value="2025년">2025년</option>
                      <option value="2024년">2024년</option>
                    </select>

                    {/* 수급자별 급여유형 맞춤 상담구분 필터 세그먼트 */}
                    <div className="flex items-center bg-[#eef1f6] p-0.5 rounded-[6px] border border-[#cbd5e1] text-[13px]">
                      {counselFilterTabs.map(type => (
                        <button
                          key={type}
                          onClick={() => setCounselFilter(type)}
                          className={`px-2.5 py-1 rounded-[4px] font-medium transition-colors cursor-pointer ${counselFilter === type
                            ? 'bg-white text-[#2a3461] font-bold shadow-xs'
                            : 'text-[#64748b] hover:text-[#0e1225]'
                            }`}
                        >
                          {type === '전체' ? '전체보기' : `${type}상담`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 4대 상담일지 전용 신규 작성 버튼군 + 선택 출력 버튼 */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {/* 선택 출력 버튼 */}
                    <Button
                      type="Sub"
                      size="Medium"
                      icon="Print"
                      onClick={() => {
                        if (selectedCounselIds.length === 0) {
                          alert('출력할 상담일지를 1건 이상 체크박스로 선택해주세요.')
                          return
                        }
                        window.print()
                      }}
                    >
                      출력{selectedCounselIds.length > 0 ? ` (${selectedCounselIds.length})` : ''}
                    </Button>

                    {availableServiceTypes.has('요양') && (
                      <Button
                        type="Sub"
                        size="Medium"
                        icon="Add"
                        onClick={() => {
                          setCounselForm(prev => ({
                            ...prev,
                            counselType: '요양',
                            counselDate: '2026-03-21 10:00',
                            topic: '방문요양 급여제공 및 수급자 상태 모니터링',
                            counselee: `${currentBeneficiary.name} (수급자)`,
                          }))
                          setActiveModalType('상담일지')
                        }}
                      >
                        요양 신규
                      </Button>
                    )}
                    {availableServiceTypes.has('목욕') && (
                      <Button
                        type="Sub"
                        size="Medium"
                        icon="Add"
                        onClick={() => {
                          setCounselForm(prev => ({
                            ...prev,
                            counselType: '목욕',
                            counselDate: '2026-03-21 11:00',
                            topic: '방문목욕 서비스 만족도 및 피부/체위 상태 점검',
                            counselee: `${currentBeneficiary.name} (수급자)`,
                          }))
                          setActiveModalType('상담일지')
                        }}
                      >
                        목욕 신규
                      </Button>
                    )}
                    {availableServiceTypes.has('간호') && (
                      <Button
                        type="Sub"
                        size="Medium"
                        icon="Add"
                        onClick={() => {
                          setCounselForm(prev => ({
                            ...prev,
                            counselType: '간호',
                            counselDate: '2026-03-21 14:00',
                            topic: '건강 상태 모니터링 및 복약/간호 처치 상담',
                            counselee: `${currentBeneficiary.name} (수급자)`,
                          }))
                          setActiveModalType('상담일지')
                        }}
                      >
                        간호 신규
                      </Button>
                    )}
                    <Button
                      type="Sub"
                      size="Medium"
                      icon="Add"
                      onClick={() => {
                        setCounselForm(prev => ({
                          ...prev,
                          counselType: '직원변경',
                          counselDate: '2026-03-21 15:30',
                          topic: '담당 직원(요양보호사/간호사) 변경 사전 안내 및 동의',
                          counselee: `${currentBeneficiary.guardianName || currentBeneficiary.name}`,
                        }))
                        setActiveModalType('상담일지')
                      }}
                    >
                      직원변경 신규
                    </Button>
                  </div>
                </div>

                {/* 상담일지 목록 대장 테이블 (피그마 캡쳐 1:1 완벽 일치 컬럼 체계) */}
                <div className="bg-white border border-[#c2cfdf] rounded-[4px] overflow-hidden shadow-2xs">
                  {(() => {
                    const displayedCounselings = (!currentBeneficiary.counselings ? [] : currentBeneficiary.counselings.filter(cs => counselFilter === '전체' || cs.counselType.includes(counselFilter)))
                    const allSelected = displayedCounselings.length > 0 && displayedCounselings.every(cs => selectedCounselIds.includes(cs.id))
                    const someSelected = displayedCounselings.some(cs => selectedCounselIds.includes(cs.id)) && !allSelected

                    const toggleSelectAll = () => {
                      if (allSelected) {
                        setSelectedCounselIds([])
                      } else {
                        setSelectedCounselIds(displayedCounselings.map(cs => cs.id))
                      }
                    }

                    const toggleSelectOne = (id: string, e: React.MouseEvent) => {
                      e.stopPropagation()
                      setSelectedCounselIds(prev =>
                        prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
                      )
                    }

                    return (
                      <table className="w-full text-left border-collapse text-[13.5px]">
                        <thead className="bg-[#f4f7fc] text-[#283445] font-bold border-b border-[#c2cfdf] text-[13.5px]">
                          <tr>
                            {/* 1. 체크박스 열 */}
                            <th className="py-2.5 px-3 border-r border-[#c2cfdf] w-[46px] text-center">
                              <input
                                type="checkbox"
                                checked={allSelected}
                                ref={el => {
                                  if (el) el.indeterminate = someSelected
                                }}
                                onChange={toggleSelectAll}
                                className="accent-[#2a3461] rounded w-4 h-4 cursor-pointer"
                              />
                            </th>

                            {/* 2. 연번 */}
                            <th className="py-2.5 px-3 border-r border-[#c2cfdf] w-[70px] text-center">
                              <span className="inline-flex items-center gap-1 cursor-pointer">
                                연번 <span className="text-[10px] text-[#8a9cb4]">⇅</span>
                              </span>
                            </th>

                            {/* 3. 상담구분 */}
                            <th className="py-2.5 px-3 border-r border-[#c2cfdf] w-[130px]">
                              <span className="inline-flex items-center gap-1 cursor-pointer">
                                상담구분 <span className="text-[10px] text-[#8a9cb4]">⇅</span>
                              </span>
                            </th>

                            {/* 4. 상담일자 */}
                            <th className="py-2.5 px-3 border-r border-[#c2cfdf] w-[130px]">
                              <span className="inline-flex items-center gap-1 cursor-pointer">
                                상담일자 <span className="text-[10px] text-[#8a9cb4]">⇅</span>
                              </span>
                            </th>

                            {/* 5. 상담시간 */}
                            <th className="py-2.5 px-3 border-r border-[#c2cfdf] w-[140px]">
                              <span className="inline-flex items-center gap-1 cursor-pointer">
                                상담시간 <span className="text-[10px] text-[#8a9cb4]">⇅</span>
                              </span>
                            </th>

                            {/* 6. 상담대상 */}
                            <th className="py-2.5 px-3 border-r border-[#c2cfdf] w-[120px]">
                              <span className="inline-flex items-center gap-1 cursor-pointer">
                                상담대상 <span className="text-[10px] text-[#8a9cb4]">⇅</span>
                              </span>
                            </th>

                            {/* 7. 관계 */}
                            <th className="py-2.5 px-3 border-r border-[#c2cfdf] w-[130px]">
                              <span className="inline-flex items-center gap-1 cursor-pointer">
                                관계 <span className="text-[10px] text-[#8a9cb4]">⇅</span>
                              </span>
                            </th>

                            {/* 8. 상담자 */}
                            <th className="py-2.5 px-3 border-r border-[#c2cfdf] w-[110px]">
                              <span className="inline-flex items-center gap-1 cursor-pointer">
                                상담자 <span className="text-[10px] text-[#8a9cb4]">⇅</span>
                              </span>
                            </th>

                            {/* 9. 급여제공반영 */}
                            <th className="py-2.5 px-3 w-[120px]">
                              <span className="inline-flex items-center gap-1 cursor-pointer">
                                급여제공반영 <span className="text-[10px] text-[#8a9cb4]">⇅</span>
                              </span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#c2cfdf]">
                          {displayedCounselings.length === 0 ? (
                            <tr>
                              <td colSpan={9} className="py-10 text-center text-[#94a3b8] text-[13.5px]">
                                등록된 {counselFilter === '전체' ? '' : `${counselFilter} `}상담일지 기록이 없습니다.
                              </td>
                            </tr>
                          ) : (
                            displayedCounselings.map((cs, idx) => {
                              const isChecked = selectedCounselIds.includes(cs.id)
                              const rowNo = cs.round ?? (idx + 1)
                              const isCannotCounsel = cs.counselTime === '상담불가'

                              return (
                                <tr
                                  key={cs.id}
                                  onClick={() => {
                                    setCounselForm({
                                      counselDate: cs.counselDate,
                                      counselType: cs.counselType as any,
                                      counselee: cs.counselee,
                                      counselor: cs.counselor,
                                      channel: cs.channel || '방문대면',
                                      topic: cs.topic || `${cs.counselType} 정기상담`,
                                      content: cs.content || '',
                                      actionPlan: cs.actionPlan || '',
                                      status: cs.status || '조치완료',
                                    })
                                    setActiveModalType('상담일지')
                                  }}
                                  className={`hover:bg-[#f8fafc] transition-colors cursor-pointer ${isChecked ? 'bg-[#f0f7ff]' : ''
                                    }`}
                                >
                                  {/* 1. 체크박스 */}
                                  <td className="py-3 px-3 border-r border-[#c2cfdf] text-center" onClick={e => toggleSelectOne(cs.id, e)}>
                                    <input
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={() => { }}
                                      className="accent-[#2a3461] rounded w-4 h-4 cursor-pointer"
                                    />
                                  </td>

                                  {/* 2. 연번 */}
                                  <td className="py-3 px-3 border-r border-[#c2cfdf] text-center text-[#0e1225] font-medium">
                                    {rowNo}
                                  </td>

                                  {/* 3. 상담구분 */}
                                  <td className="py-3 px-3 border-r border-[#c2cfdf] text-[#0e1225] font-medium">
                                    {cs.counselType}
                                  </td>

                                  {/* 4. 상담일자 */}
                                  <td className="py-3 px-3 font-mono text-[#0e1225] border-r border-[#c2cfdf]">
                                    {cs.counselDate}
                                  </td>

                                  {/* 5. 상담시간 ('상담불가' 시 빨간색 강조) */}
                                  <td className="py-3 px-3 border-r border-[#c2cfdf]">
                                    <span className={isCannotCounsel ? 'text-[#e11d48] font-bold' : 'font-mono text-[#0e1225]'}>
                                      {cs.counselTime || '09:00~10:00'}
                                    </span>
                                  </td>

                                  {/* 6. 상담대상 */}
                                  <td className="py-3 px-3 text-[#0e1225] font-medium border-r border-[#c2cfdf]">
                                    {cs.counselee}
                                  </td>

                                  {/* 7. 관계 */}
                                  <td className="py-3 px-3 text-[#475569] border-r border-[#c2cfdf]">
                                    {cs.relation || '본인'}
                                  </td>

                                  {/* 8. 상담자 */}
                                  <td className="py-3 px-3 text-[#475569] font-medium border-r border-[#c2cfdf]">
                                    {cs.counselor}
                                  </td>

                                  {/* 9. 급여제공반영 */}
                                  <td className="py-3 px-3 text-[#0e1225] font-medium">
                                    {cs.benefitReflectCount !== undefined ? `${cs.benefitReflectCount}건` : '1건'}
                                  </td>
                                </tr>
                              )
                            })
                          )}
                        </tbody>
                      </table>
                    )
                  })()}
                </div>
              </div>
            )}

            {/* 3. 상태변화기록 탭 컨텐츠 (피그마 캡처 1:1 완벽 구현) */}
            {activeTab === '상태변화기록' && (
              <div className="flex flex-col gap-3">
                {/* 툴바: 타이틀 + 연도 셀렉트 + 월 셀렉트 + 당월 뱃지 + 우측 출력 및 작성 버튼 */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[16px] font-bold text-[#0e1225] flex items-center gap-1.5 leading-none">
                      <span className="w-1 h-3.5 bg-[#2a3461] rounded-full shrink-0" />
                      상태변화기록
                    </h3>

                    {/* 연도 셀렉트 */}
                    <select
                      value={statusChangeYear}
                      onChange={e => setStatusChangeYear(e.target.value)}
                      className="h-[34px] px-3 bg-white border border-[#c2cfdf] rounded-[6px] text-[13.5px] font-medium text-[#283445] focus:outline-none focus:border-[#ef5a27] cursor-pointer shadow-2xs"
                    >
                      <option value="2026년">2026년</option>
                      <option value="2025년">2025년</option>
                      <option value="2024년">2024년</option>
                    </select>

                    {/* 월 셀렉트 (1월 ~ 12월) */}
                    <select
                      value={statusChangeMonth}
                      onChange={e => setStatusChangeMonth(e.target.value)}
                      className="h-[34px] px-3 bg-white border border-[#c2cfdf] rounded-[6px] text-[13.5px] font-medium text-[#283445] focus:outline-none focus:border-[#ef5a27] cursor-pointer shadow-2xs"
                    >
                      {['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'].map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>

                    {/* 당월 퀵 필터 뱃지 버튼 */}
                    <button
                      type="button"
                      onClick={() => {
                        setStatusChangeYear('2026년')
                        setStatusChangeMonth('1월')
                      }}
                      className="h-[34px] px-3 bg-[#fff7ed] text-[#ea580c] border border-[#ffedd5] font-bold text-[13px] rounded-[6px] hover:bg-[#ffedd5] transition-colors cursor-pointer"
                    >
                      당월
                    </button>
                  </div>

                  {/* 우측 출력 & 상태변화기록 작성 버튼 */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Button
                      type="Sub"
                      size="Medium"
                      icon="Print"
                      onClick={() => {
                        if (selectedStatusChangeIds.length === 0) {
                          alert('출력할 상태변화기록 항목을 선택해주세요.')
                          return
                        }
                        alert(`선택된 ${selectedStatusChangeIds.length}건의 상태변화기록을 인쇄합니다.`)
                      }}
                    >
                      출력
                    </Button>

                    <Button
                      type="Primary"
                      size="Medium"
                      icon="Add"
                      onClick={() => {
                        const monthNum = statusChangeMonth.replace('월', '').padStart(2, '0')
                        setStatusChangeForm({
                          date: `${statusChangeYear.replace('년', '')}.${monthNum}.08`,
                          writer: '홍길순',
                          content: '',
                          careWorkerSigned: 'Y',
                        })
                        setActiveModalType('상태변화기록')
                      }}
                    >
                      상태변화기록 작성
                    </Button>
                  </div>
                </div>

                {/* 상태변화기록 대장 테이블 (피그마 캡쳐 1:1 완벽 일치 컬럼 체계) */}
                <div className="bg-white border border-[#c2cfdf] rounded-[4px] overflow-hidden shadow-2xs">
                  {(() => {
                    const rawList = currentBeneficiary.statusChanges || []
                    const monthPrefix = `${statusChangeYear.replace('년', '')}.${statusChangeMonth.replace('월', '').padStart(2, '0')}`
                    const displayedList = rawList.filter(sc => sc.date.startsWith(monthPrefix))

                    const allSelected = displayedList.length > 0 && displayedList.every(sc => selectedStatusChangeIds.includes(sc.id))
                    const someSelected = displayedList.some(sc => selectedStatusChangeIds.includes(sc.id)) && !allSelected

                    const toggleSelectAll = () => {
                      if (allSelected) {
                        setSelectedStatusChangeIds([])
                      } else {
                        setSelectedStatusChangeIds(displayedList.map(sc => sc.id))
                      }
                    }

                    const toggleSelectOne = (id: string, e: React.MouseEvent) => {
                      e.stopPropagation()
                      setSelectedStatusChangeIds(prev =>
                        prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
                      )
                    }

                    return (
                      <table className="w-full text-left border-collapse text-[13.5px]">
                        <thead className="bg-[#f4f7fc] text-[#283445] font-bold border-b border-[#c2cfdf] text-[13.5px]">
                          <tr>
                            {/* 1. 체크박스 */}
                            <th className="py-2.5 px-3 border-r border-[#c2cfdf] w-[46px] text-center">
                              <input
                                type="checkbox"
                                checked={allSelected}
                                ref={el => {
                                  if (el) el.indeterminate = someSelected
                                }}
                                onChange={toggleSelectAll}
                                className="accent-[#2a3461] rounded w-4 h-4 cursor-pointer"
                              />
                            </th>

                            {/* 2. 연번 */}
                            <th className="py-2.5 px-3 border-r border-[#c2cfdf] w-[70px]">
                              <span className="inline-flex items-center gap-1 cursor-pointer">
                                연번 <span className="text-[10px] text-[#8a9cb4]">⇅</span>
                              </span>
                            </th>

                            {/* 3. 등록일 */}
                            <th className="py-2.5 px-3 border-r border-[#c2cfdf] w-[130px]">
                              <span className="inline-flex items-center gap-1 cursor-pointer">
                                등록일 <span className="text-[10px] text-[#8a9cb4]">⇅</span>
                              </span>
                            </th>

                            {/* 4. 작성자 */}
                            <th className="py-2.5 px-3 border-r border-[#c2cfdf] w-[120px]">
                              <span className="inline-flex items-center gap-1 cursor-pointer">
                                작성자 <span className="text-[10px] text-[#8a9cb4]">⇅</span>
                              </span>
                            </th>

                            {/* 5. 작성내용 */}
                            <th className="py-2.5 px-3 border-r border-[#c2cfdf]">
                              <span className="inline-flex items-center gap-1 cursor-pointer">
                                작성내용 <span className="text-[10px] text-[#8a9cb4]">⇅</span>
                              </span>
                            </th>

                            {/* 6. 요양보호사 서명 */}
                            <th className="py-2.5 px-3 w-[140px]">
                              <span className="inline-flex items-center gap-1 cursor-pointer">
                                요양보호사 서명 <span className="text-[10px] text-[#8a9cb4]">⇅</span>
                              </span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#c2cfdf]">
                          {displayedList.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="py-12 text-center text-[#8a9cb4] text-[14px]">
                                작성 내역이 없습니다
                              </td>
                            </tr>
                          ) : (
                            displayedList.map((sc, idx) => {
                              const isChecked = selectedStatusChangeIds.includes(sc.id)
                              const rowNo = sc.round ?? (idx + 1)
                              return (
                                <tr
                                  key={sc.id}
                                  onClick={() => {
                                    setStatusChangeForm({
                                      date: sc.date,
                                      writer: sc.writer,
                                      content: sc.content,
                                      careWorkerSigned: sc.careWorkerSigned || 'Y',
                                    })
                                    setActiveModalType('상태변화기록')
                                  }}
                                  className={`hover:bg-[#f8fafc] transition-colors cursor-pointer ${isChecked ? 'bg-[#f0f7ff]' : ''
                                    }`}
                                >
                                  {/* 1. 체크박스 */}
                                  <td className="py-3 px-3 border-r border-[#c2cfdf] text-center" onClick={e => toggleSelectOne(sc.id, e)}>
                                    <input
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={() => { }}
                                      className="accent-[#2a3461] rounded w-4 h-4 cursor-pointer"
                                    />
                                  </td>

                                  {/* 2. 연번 */}
                                  <td className="py-3 px-3 border-r border-[#c2cfdf] text-[#0e1225] font-medium">
                                    {rowNo}
                                  </td>

                                  {/* 3. 등록일 */}
                                  <td className="py-3 px-3 font-mono text-[#0e1225] border-r border-[#c2cfdf]">
                                    {sc.date}
                                  </td>

                                  {/* 4. 작성자 */}
                                  <td className="py-3 px-3 text-[#0e1225] font-medium border-r border-[#c2cfdf]">
                                    {sc.writer}
                                  </td>

                                  {/* 5. 작성내용 */}
                                  <td className="py-3 px-3 text-[#0e1225] font-medium border-r border-[#c2cfdf]">
                                    {sc.content}
                                  </td>

                                  {/* 6. 요양보호사 서명 */}
                                  <td className="py-3 px-3 text-[#0e1225] font-medium">
                                    {sc.careWorkerSigned || 'Y'}
                                  </td>
                                </tr>
                              )
                            })
                          )}
                        </tbody>
                      </table>
                    )
                  })()}
                </div>
              </div>
            )}

            {/* 4. 사회복지사 업무수행일지 탭 컨텐츠 (월별 관리 & 피그마 테이블 규격) */}
            {activeTab === '사회복지사 업무수행일지' && (
              <div className="flex flex-col gap-3">
                {/* 툴바: 타이틀 + 연도 셀렉트 + 월 셀렉트 + 당월 뱃지 + 우측 출력 및 작성 버튼 */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[16px] font-bold text-[#0e1225] flex items-center gap-1.5 leading-none">
                      <span className="w-1 h-3.5 bg-[#2a3461] rounded-full shrink-0" />
                      사회복지사 업무수행일지
                    </h3>

                    {/* 연도 셀렉트 */}
                    <select
                      value={dutyLogYear}
                      onChange={e => setDutyLogYear(e.target.value)}
                      className="h-[34px] px-3 bg-white border border-[#c2cfdf] rounded-[6px] text-[13.5px] font-medium text-[#283445] focus:outline-none focus:border-[#ef5a27] cursor-pointer shadow-2xs"
                    >
                      <option value="2026년">2026년</option>
                      <option value="2025년">2025년</option>
                      <option value="2024년">2024년</option>
                    </select>

                    {/* 월 셀렉트 (1월 ~ 12월) */}
                    <select
                      value={dutyLogMonth}
                      onChange={e => setDutyLogMonth(e.target.value)}
                      className="h-[34px] px-3 bg-white border border-[#c2cfdf] rounded-[6px] text-[13.5px] font-medium text-[#283445] focus:outline-none focus:border-[#ef5a27] cursor-pointer shadow-2xs"
                    >
                      {['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'].map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>

                    {/* 당월 퀵 필터 뱃지 버튼 */}
                    <button
                      type="button"
                      onClick={() => {
                        setDutyLogYear('2026년')
                        setDutyLogMonth('1월')
                      }}
                      className="h-[34px] px-3 bg-[#fff7ed] text-[#ea580c] border border-[#ffedd5] font-bold text-[13px] rounded-[6px] hover:bg-[#ffedd5] transition-colors cursor-pointer"
                    >
                      당월
                    </button>
                  </div>

                  {/* 우측 출력 & 작성 버튼 */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Button
                      type="Sub"
                      size="Medium"
                      icon="Print"
                      onClick={() => {
                        if (selectedDutyLogIds.length === 0) {
                          alert('출력할 업무수행일지를 선택해주세요.')
                          return
                        }
                        alert(`선택된 ${selectedDutyLogIds.length}건의 사회복지사 업무수행일지를 인쇄합니다.`)
                      }}
                    >
                      출력
                    </Button>
                    <Button
                      type="Primary"
                      size="Medium"
                      icon="Add"
                      onClick={() => {
                        const monthNum = dutyLogMonth.replace('월', '').padStart(2, '0')
                        setDutyLogForm({
                          visitDate: `${dutyLogYear.replace('년', '')}.${monthNum}.15`,
                          visitTime: '10:00~11:30',
                          visitType: '정기방문',
                          serviceType: currentBeneficiary.enrolledServices[0] || '방문요양',
                          checkContent: '',
                          comprehensiveOpinion: '',
                          worker: '이지원 (사회복지사)',
                          status: '작성완료',
                        })
                        setActiveModalType('업무수행일지')
                      }}
                    >
                      사회복지사 업무수행일지 작성
                    </Button>
                  </div>
                </div>

                {/* 사회복지사 업무수행일지 대장 테이블 (피그마 규격 6개 컬럼) */}
                <div className="bg-white border border-[#c2cfdf] rounded-[4px] overflow-hidden shadow-2xs">
                  {(() => {
                    const rawList = currentBeneficiary.dutyLogs || []
                    const targetYear = dutyLogYear.replace('년', '')
                    const targetMonth = dutyLogMonth.replace('월', '').padStart(2, '0')
                    const datePrefix = `${targetYear}.${targetMonth}`

                    const displayedList = rawList.filter(dl => dl.visitDate.startsWith(datePrefix))
                    const allSelected = displayedList.length > 0 && displayedList.every(dl => selectedDutyLogIds.includes(dl.id))
                    const someSelected = displayedList.some(dl => selectedDutyLogIds.includes(dl.id)) && !allSelected

                    const toggleSelectAll = () => {
                      if (allSelected) {
                        setSelectedDutyLogIds([])
                      } else {
                        setSelectedDutyLogIds(displayedList.map(dl => dl.id))
                      }
                    }

                    const toggleSelectOne = (id: string, e: React.MouseEvent) => {
                      e.stopPropagation()
                      setSelectedDutyLogIds(prev =>
                        prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
                      )
                    }

                    return (
                      <table className="w-full text-left border-collapse text-[13.5px]">
                        <thead className="bg-[#f4f7fc] text-[#283445] font-bold border-b border-[#c2cfdf] text-[13.5px]">
                          <tr>
                            <th className="py-2.5 px-3 border-r border-[#c2cfdf] w-[46px] text-center">
                              <input
                                type="checkbox"
                                checked={allSelected}
                                ref={el => {
                                  if (el) el.indeterminate = someSelected
                                }}
                                onChange={toggleSelectAll}
                                className="accent-[#2a3461] rounded w-4 h-4 cursor-pointer"
                              />
                            </th>
                            <th className="py-2.5 px-3 border-r border-[#c2cfdf] w-[140px]">
                              <span className="inline-flex items-center gap-1 cursor-pointer">
                                방문일 <span className="text-[10px] text-[#8a9cb4]">⇅</span>
                              </span>
                            </th>
                            <th className="py-2.5 px-3 border-r border-[#c2cfdf] w-[140px]">
                              <span className="inline-flex items-center gap-1 cursor-pointer">
                                방문시간 <span className="text-[10px] text-[#8a9cb4]">⇅</span>
                              </span>
                            </th>
                            <th className="py-2.5 px-3 border-r border-[#c2cfdf] min-w-[200px]">
                              <span className="inline-flex items-center gap-1 cursor-pointer">
                                업무수행일지종류 <span className="text-[10px] text-[#8a9cb4]">⇅</span>
                              </span>
                            </th>
                            <th className="py-2.5 px-3 border-r border-[#c2cfdf] w-[160px]">
                              <span className="inline-flex items-center gap-1 cursor-pointer">
                                방문자 <span className="text-[10px] text-[#8a9cb4]">⇅</span>
                              </span>
                            </th>
                            <th className="py-2.5 px-3 w-[100px] text-center">
                              <span className="inline-flex items-center justify-center gap-1 cursor-pointer">
                                작성여부 <span className="text-[10px] text-[#8a9cb4]">⇅</span>
                              </span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#c2cfdf]">
                          {displayedList.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="py-12 text-center text-[#8a9cb4] text-[14px]">
                                작성 내역이 없습니다
                              </td>
                            </tr>
                          ) : (
                            displayedList.map(dl => {
                              const isChecked = selectedDutyLogIds.includes(dl.id)
                              const isWritten = dl.status === '작성완료' || !!dl.status
                              return (
                                <tr
                                  key={dl.id}
                                  onClick={() => {
                                    setDutyLogForm({
                                      visitDate: dl.visitDate,
                                      visitTime: dl.visitTime,
                                      visitType: dl.visitType,
                                      serviceType: dl.serviceType,
                                      checkContent: dl.checkContent,
                                      comprehensiveOpinion: dl.comprehensiveOpinion,
                                      worker: dl.worker,
                                      status: dl.status,
                                    })
                                    setActiveModalType('업무수행일지')
                                  }}
                                  className={`hover:bg-[#f8fafc] transition-colors cursor-pointer ${isChecked ? 'bg-[#f0f7ff]' : ''}`}
                                >
                                  <td className="py-3 px-3 border-r border-[#c2cfdf] text-center" onClick={e => toggleSelectOne(dl.id, e)}>
                                    <input
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={() => { }}
                                      className="accent-[#2a3461] rounded w-4 h-4 cursor-pointer"
                                    />
                                  </td>
                                  <td className="py-3 px-3 font-mono text-[#0e1225] border-r border-[#c2cfdf]">
                                    {dl.visitDate}
                                  </td>
                                  <td className="py-3 px-3 font-mono text-[#0e1225] border-r border-[#c2cfdf]">
                                    {dl.visitTime}
                                  </td>
                                  <td className="py-3 px-3 text-[#0e1225] font-medium border-r border-[#c2cfdf]">
                                    {dl.visitType || '정기방문'}
                                  </td>
                                  <td className="py-3 px-3 text-[#475569] font-medium border-r border-[#c2cfdf]">
                                    {dl.worker}
                                  </td>
                                  <td className="py-3 px-3 text-center font-bold text-[#0e1225]">
                                    {isWritten ? 'Y' : '-'}
                                  </td>
                                </tr>
                              )
                            })
                          )}
                        </tbody>
                      </table>
                    )
                  })()}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
      )}

      {/* ─── 기초평가 신규 작성 모달 (낙상/욕창/인지/욕구 공통 대응) ─── */}
      {activeModalType && !['상담일지', '상태변화기록', '업무수행일지'].includes(activeModalType) && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[8px] border border-[#c2cfdf] shadow-2xl w-full max-w-[540px] overflow-hidden flex flex-col">
            <div className="px-4 py-3 bg-[#2a3461] text-white flex items-center justify-between">
              <h3 className="font-bold text-[15px] flex items-center gap-2">
                <span>📋</span> {activeModalType} 평가 신규 등록 ({currentBeneficiary.name})
              </h3>
              <button
                onClick={() => setActiveModalType(null)}
                className="text-white/80 hover:text-white text-[18px] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 flex flex-col gap-3 text-[13px]">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#475569] font-bold mb-1 text-[12px]">평가일자</label>
                  <input
                    type="text"
                    value={modalForm.evalDate}
                    onChange={e => setModalForm({ ...modalForm, evalDate: e.target.value })}
                    className="w-full h-[34px] px-2.5 border border-[#c2cfdf] rounded-[4px] focus:border-[#ef5a27] focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[#475569] font-bold mb-1 text-[12px]">평가구분</label>
                  <select
                    value={modalForm.evalCategory}
                    onChange={e => setModalForm({ ...modalForm, evalCategory: e.target.value })}
                    className="w-full h-[34px] px-2.5 border border-[#c2cfdf] rounded-[4px] font-medium focus:border-[#ef5a27] focus:outline-none"
                  >
                    <option value="정기평가">정기평가</option>
                    <option value="재사정">재사정</option>
                    <option value="상태변화">상태변화</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#475569] font-bold mb-1 text-[12px]">평가점수 / 수치</label>
                  <input
                    type="text"
                    value={modalForm.scoreText}
                    onChange={e => setModalForm({ ...modalForm, scoreText: e.target.value })}
                    placeholder="예: 5점 / 15점"
                    className="w-full h-[34px] px-2.5 border border-[#c2cfdf] rounded-[4px] focus:border-[#ef5a27] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#475569] font-bold mb-1 text-[12px]">판정등급</label>
                  <select
                    value={modalForm.grade}
                    onChange={e => setModalForm({ ...modalForm, grade: e.target.value as any })}
                    className="w-full h-[34px] px-2.5 border border-[#c2cfdf] rounded-[4px] font-medium focus:border-[#ef5a27] focus:outline-none"
                  >
                    <option value="고위험">고위험군</option>
                    <option value="위험">위험군</option>
                    <option value="중등도">중등도위험군</option>
                    <option value="저위험">저위험군</option>
                    <option value="정상">정상</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#475569] font-bold mb-1 text-[12px]">평가자</label>
                <input
                  type="text"
                  value={modalForm.evaluator}
                  onChange={e => setModalForm({ ...modalForm, evaluator: e.target.value })}
                  className="w-full h-[34px] px-2.5 border border-[#c2cfdf] rounded-[4px] focus:border-[#ef5a27] focus:outline-none"
                />
              </div>
            </div>

            <div className="px-4 py-3 bg-[#f8fafc] border-t border-[#c2cfdf] flex items-center justify-end gap-2">
              <Button
                type="Sub"
                size="Medium"
                onClick={() => setActiveModalType(null)}
              >
                취소
              </Button>
              <Button
                type="Primary"
                size="Medium"
                icon="Check"
                onClick={handleSaveEvalModal}
              >
                저장 및 반영
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ─── 상담일지 작성 모달 ─── */}
      {activeModalType === '상담일지' && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[8px] border border-[#c2cfdf] shadow-2xl w-full max-w-[620px] overflow-hidden flex flex-col">
            <div className="px-4 py-3 bg-[#2a3461] text-white flex items-center justify-between">
              <h3 className="font-bold text-[15px] flex items-center gap-2">
                <span>💬</span> 상담일지 작성 ({currentBeneficiary.name})
              </h3>
              <button
                onClick={() => setActiveModalType(null)}
                className="text-white/80 hover:text-white text-[18px] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 flex flex-col gap-3.5 max-h-[80vh] overflow-y-auto text-[13px]">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#475569] font-bold mb-1 text-[12px]">상담일시</label>
                  <input
                    type="text"
                    value={counselForm.counselDate}
                    onChange={e => setCounselForm({ ...counselForm, counselDate: e.target.value })}
                    placeholder="YYYY-MM-DD HH:mm"
                    className="w-full h-[34px] px-2.5 border border-[#c2cfdf] rounded-[4px] focus:border-[#ef5a27] focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[#475569] font-bold mb-1 text-[12px]">상담구분</label>
                  <select
                    value={counselForm.counselType}
                    onChange={e => setCounselForm({ ...counselForm, counselType: e.target.value as CounselingType })}
                    className="w-full h-[34px] px-2.5 border border-[#c2cfdf] rounded-[4px] font-medium focus:border-[#ef5a27] focus:outline-none"
                  >
                    <option value="요양">방문요양 상담</option>
                    <option value="목욕">방문목욕 상담</option>
                    <option value="간호">방문간호 상담</option>
                    <option value="직원변경">직원변경(교체) 상담</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#475569] font-bold mb-1 text-[12px]">상담방법</label>
                  <select
                    value={counselForm.channel}
                    onChange={e => setCounselForm({ ...counselForm, channel: e.target.value as any })}
                    className="w-full h-[34px] px-2.5 border border-[#c2cfdf] rounded-[4px] font-medium focus:border-[#ef5a27] focus:outline-none"
                  >
                    <option value="방문대면">방문대면</option>
                    <option value="유선통화">유선통화</option>
                    <option value="내방상담">내방상담</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#475569] font-bold mb-1 text-[12px]">상담대상자</label>
                  <input
                    type="text"
                    value={counselForm.counselee}
                    onChange={e => setCounselForm({ ...counselForm, counselee: e.target.value })}
                    placeholder={`기본: ${currentBeneficiary.name}`}
                    className="w-full h-[34px] px-2.5 border border-[#c2cfdf] rounded-[4px] focus:border-[#ef5a27] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#475569] font-bold mb-1 text-[12px]">상담자</label>
                  <input
                    type="text"
                    value={counselForm.counselor}
                    onChange={e => setCounselForm({ ...counselForm, counselor: e.target.value })}
                    className="w-full h-[34px] px-2.5 border border-[#c2cfdf] rounded-[4px] focus:border-[#ef5a27] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#475569] font-bold mb-1 text-[12px]">상담 주제 / 안건</label>
                <input
                  type="text"
                  value={counselForm.topic}
                  onChange={e => setCounselForm({ ...counselForm, topic: e.target.value })}
                  placeholder="예: 급여제공 상태 점검 및 보호자 건의사항 청취"
                  className="w-full h-[34px] px-2.5 border border-[#c2cfdf] rounded-[4px] focus:border-[#ef5a27] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#475569] font-bold mb-1 text-[12px]">
                  상담 상세내용 및 요청사항 <span className="text-[#ef5a27]">*</span>
                </label>
                <textarea
                  rows={4}
                  value={counselForm.content}
                  onChange={e => setCounselForm({ ...counselForm, content: e.target.value })}
                  placeholder="상담 대상자의 발언 내용, 요구사항, 특이사항을 상세히 작성하세요."
                  className="w-full p-2.5 border border-[#c2cfdf] rounded-[4px] focus:border-[#ef5a27] focus:outline-none resize-none text-[12.5px]"
                />
              </div>

              <div>
                <label className="block text-[#475569] font-bold mb-1 text-[12px]">조치계획 및 처리결과</label>
                <textarea
                  rows={2}
                  value={counselForm.actionPlan}
                  onChange={e => setCounselForm({ ...counselForm, actionPlan: e.target.value })}
                  placeholder="상담 결과에 따른 기관의 조치 사항 및 담당 요양보호사/간호사 전달 내용"
                  className="w-full p-2.5 border border-[#c2cfdf] rounded-[4px] focus:border-[#ef5a27] focus:outline-none resize-none text-[12.5px]"
                />
              </div>
            </div>

            <div className="px-4 py-3 bg-[#f8fafc] border-t border-[#c2cfdf] flex items-center justify-end gap-2">
              <Button
                type="Sub"
                size="Medium"
                onClick={() => setActiveModalType(null)}
              >
                취소
              </Button>
              <Button
                type="Primary"
                size="Medium"
                icon="Check"
                onClick={handleSaveCounseling}
              >
                상담일지 저장
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ─── 상태변화기록 작성 모달 (피그마 캡처 1:1) ─── */}
      {activeModalType === '상태변화기록' && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[8px] border border-[#c2cfdf] shadow-2xl w-full max-w-[580px] overflow-hidden flex flex-col">
            <div className="px-4 py-3 bg-[#2a3461] text-white flex items-center justify-between">
              <h3 className="font-bold text-[15px] flex items-center gap-2">
                <span>📝</span> 상태변화기록 작성 ({currentBeneficiary.name})
              </h3>
              <button
                onClick={() => setActiveModalType(null)}
                className="text-white/80 hover:text-white text-[18px] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 flex flex-col gap-3.5 max-h-[80vh] overflow-y-auto text-[13px]">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#475569] font-bold mb-1 text-[12px]">등록일</label>
                  <input
                    type="text"
                    value={statusChangeForm.date}
                    onChange={e => setStatusChangeForm({ ...statusChangeForm, date: e.target.value })}
                    placeholder="YYYY.MM.DD"
                    className="w-full h-[34px] px-2.5 border border-[#c2cfdf] rounded-[4px] focus:border-[#ef5a27] focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[#475569] font-bold mb-1 text-[12px]">작성자</label>
                  <input
                    type="text"
                    value={statusChangeForm.writer}
                    onChange={e => setStatusChangeForm({ ...statusChangeForm, writer: e.target.value })}
                    placeholder="예: 홍길순"
                    className="w-full h-[34px] px-2.5 border border-[#c2cfdf] rounded-[4px] focus:border-[#ef5a27] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#475569] font-bold mb-1 text-[12px]">
                  작성내용 <span className="text-[#ef5a27]">*</span>
                </label>
                <textarea
                  rows={5}
                  value={statusChangeForm.content}
                  onChange={e => setStatusChangeForm({ ...statusChangeForm, content: e.target.value })}
                  placeholder="수급자의 상태변화 및 관찰 증상, 특이사항을 상세히 작성하세요."
                  className="w-full p-2.5 border border-[#c2cfdf] rounded-[4px] focus:border-[#ef5a27] focus:outline-none resize-none text-[12.5px]"
                />
              </div>

              <div>
                <label className="block text-[#475569] font-bold mb-1 text-[12px]">요양보호사 서명</label>
                <select
                  value={statusChangeForm.careWorkerSigned || 'Y'}
                  onChange={e => setStatusChangeForm({ ...statusChangeForm, careWorkerSigned: e.target.value as any })}
                  className="w-full h-[34px] px-2.5 border border-[#c2cfdf] rounded-[4px] font-medium focus:border-[#ef5a27] focus:outline-none"
                >
                  <option value="Y">Y (서명 완료)</option>
                  <option value="N">N (미서명)</option>
                  <option value="-">- (해당 없음)</option>
                </select>
              </div>
            </div>

            <div className="px-4 py-3 bg-[#f8fafc] border-t border-[#c2cfdf] flex items-center justify-end gap-2">
              <Button
                type="Sub"
                size="Medium"
                onClick={() => setActiveModalType(null)}
              >
                취소
              </Button>
              <Button
                type="Primary"
                size="Medium"
                icon="Check"
                onClick={handleSaveStatusChange}
              >
                상태변화기록 저장
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ─── 사회복지사 업무수행일지 작성 모달 ─── */}
      {activeModalType === '업무수행일지' && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[8px] border border-[#c2cfdf] shadow-2xl w-full max-w-[640px] overflow-hidden flex flex-col">
            <div className="px-4 py-3 bg-[#2a3461] text-white flex items-center justify-between">
              <h3 className="font-bold text-[15px] flex items-center gap-2">
                <span>📑</span> 사회복지사 업무수행일지 작성 ({currentBeneficiary.name})
              </h3>
              <button
                onClick={() => setActiveModalType(null)}
                className="text-white/80 hover:text-white text-[18px] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 flex flex-col gap-3.5 max-h-[80vh] overflow-y-auto text-[13px]">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#475569] font-bold mb-1 text-[12px]">방문일자</label>
                  <input
                    type="text"
                    value={dutyLogForm.visitDate}
                    onChange={e => setDutyLogForm({ ...dutyLogForm, visitDate: e.target.value })}
                    placeholder="YYYY.MM.DD"
                    className="w-full h-[34px] px-2.5 border border-[#c2cfdf] rounded-[4px] focus:border-[#ef5a27] focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[#475569] font-bold mb-1 text-[12px]">방문시간</label>
                  <input
                    type="text"
                    value={dutyLogForm.visitTime}
                    onChange={e => setDutyLogForm({ ...dutyLogForm, visitTime: e.target.value })}
                    placeholder="예: 10:00~11:30"
                    className="w-full h-[34px] px-2.5 border border-[#c2cfdf] rounded-[4px] focus:border-[#ef5a27] focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#475569] font-bold mb-1 text-[12px]">방문구분</label>
                  <select
                    value={dutyLogForm.visitType}
                    onChange={e => setDutyLogForm({ ...dutyLogForm, visitType: e.target.value as any })}
                    className="w-full h-[34px] px-2.5 border border-[#c2cfdf] rounded-[4px] font-medium focus:border-[#ef5a27] focus:outline-none"
                  >
                    <option value="정기방문">정기방문 (가산 점검)</option>
                    <option value="급여모니터링">급여모니터링 (상태 점검)</option>
                    <option value="요양보호사지도">요양보호사 직무지도</option>
                    <option value="수시상담">수시상담 (문제해결/요청)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#475569] font-bold mb-1 text-[12px]">급여종류</label>
                  <select
                    value={dutyLogForm.serviceType}
                    onChange={e => setDutyLogForm({ ...dutyLogForm, serviceType: e.target.value })}
                    className="w-full h-[34px] px-2.5 border border-[#c2cfdf] rounded-[4px] font-medium focus:border-[#ef5a27] focus:outline-none"
                  >
                    <option value="방문요양">방문요양</option>
                    <option value="방문목욕">방문목욕</option>
                    <option value="방문간호">방문간호</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#475569] font-bold mb-1 text-[12px]">
                  수급자 점검 및 업무지도 내용 <span className="text-[#ef5a27]">*</span>
                </label>
                <textarea
                  rows={4}
                  value={dutyLogForm.checkContent}
                  onChange={e => setDutyLogForm({ ...dutyLogForm, checkContent: e.target.value })}
                  placeholder="방문 시 수급자의 건강 및 급여제공 환경 점검, 요양보호사 급여제공계획 이행 점검 및 업무 지도 내용을 작성하세요."
                  className="w-full p-2.5 border border-[#c2cfdf] rounded-[4px] focus:border-[#ef5a27] focus:outline-none resize-none text-[12.5px]"
                />
              </div>

              <div>
                <label className="block text-[#475569] font-bold mb-1 text-[12px]">종합의견 및 향후계획</label>
                <textarea
                  rows={3}
                  value={dutyLogForm.comprehensiveOpinion}
                  onChange={e => setDutyLogForm({ ...dutyLogForm, comprehensiveOpinion: e.target.value })}
                  placeholder="수급자 급여제공 적정성 평가 결과, 보호자 건의사항, 차기 방문 시 중점 관리 항목 등을 작성하세요."
                  className="w-full p-2.5 border border-[#c2cfdf] rounded-[4px] focus:border-[#ef5a27] focus:outline-none resize-none text-[12.5px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#475569] font-bold mb-1 text-[12px]">작성자 (사회복지사)</label>
                  <input
                    type="text"
                    value={dutyLogForm.worker}
                    onChange={e => setDutyLogForm({ ...dutyLogForm, worker: e.target.value })}
                    className="w-full h-[34px] px-2.5 border border-[#c2cfdf] rounded-[4px] focus:border-[#ef5a27] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#475569] font-bold mb-1 text-[12px]">진행상태</label>
                  <select
                    value={dutyLogForm.status}
                    onChange={e => setDutyLogForm({ ...dutyLogForm, status: e.target.value as any })}
                    className="w-full h-[34px] px-2.5 border border-[#c2cfdf] rounded-[4px] font-medium focus:border-[#ef5a27] focus:outline-none"
                  >
                    <option value="작성완료">작성완료</option>
                    <option value="진행중">작성중 (임시저장)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="px-4 py-3 bg-[#f8fafc] border-t border-[#c2cfdf] flex items-center justify-end gap-2">
              <Button
                type="Sub"
                size="Medium"
                onClick={() => setActiveModalType(null)}
              >
                취소
              </Button>
              <Button
                type="Primary"
                size="Medium"
                icon="Check"
                onClick={handleSaveDutyLog}
              >
                업무수행일지 저장
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
