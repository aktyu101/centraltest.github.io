import { useState, useEffect } from 'react'
import { Button } from '@/components/Button'

// ─── Types & Constants ────────────────────────────────────────────────────────

export type CategoryType = 'beneficiary' | 'staff' | 'operation'
export type ServiceTypeShort = '요' | '목' | '간'

export const SERVICE_TAG_MAP: Record<ServiceTypeShort, { label: string; full: string; cls: string }> = {
  요: { label: '요', full: '방문요양', cls: 'bg-svc-care-bg text-svc-care-text border-svc-care-border' },
  목: { label: '목', full: '방문목욕', cls: 'bg-svc-bath-bg text-svc-bath-text border-svc-bath-border' },
  간: { label: '간', full: '방문간호', cls: 'bg-svc-nurse-bg text-svc-nurse-text border-svc-nurse-border' },
}

export function ServiceTagBadge({ service, size = 'medium' }: { service: ServiceTypeShort; size?: 'small' | 'medium' | 'large' }) {
  const meta = SERVICE_TAG_MAP[service] ?? { label: service, full: service, cls: 'bg-neutral-bg-subtle text-neutral-text border-neutral-border' }
  const sizeClass = size === 'large'
    ? 'h-[24px] px-2 text-[12.5px]'
    : size === 'medium'
      ? 'h-[21px] px-1.5 text-[11.5px]'
      : 'h-[18px] px-1.5 text-[11px]'

  return (
    <span
      className={`inline-flex items-center justify-center font-bold rounded-[4px] border leading-none shrink-0 select-none ${meta.cls} ${sizeClass}`}
      title={meta.full}
    >
      {meta.label}
    </span>
  )
}

export interface MissingItem {
  id: string
  targetName: string
  targetSub: string
  services: ServiceTypeShort[] // 해당 수급자의 유효 계약 급여유형 (요/목/간)
  manager: string
  missingDocName: string
  reason: string
  deadline: string
  isFixed: boolean // 토글 상태 (false: 누락/미구비, true: 구비완료)
}

export interface OriginalManualData {
  indicatorCode: string
  indicatorTitle: string
  indicatorSubtitle: string
  score: number
  serviceType: string
  targetTypes: string[]
  direction: string
  criteriaRows: {
    no: string
    target: string
    content: string
    requiredPoints?: string
    method: string
    score: number
  }[]
  effectivePeriod: string
  effectivePeriodNotes: string[]
  verificationDetails: {
    targetCriteria: string
    contents: string[]
    subList?: string[]
    warning?: string
  }[]
  legalBasis: {
    lawName: string
    article: string
    text: string
  }
}

export interface CategoryIndicator {
  number: number
  code: string
  title: string
  score: number
  cycle: string
  category: CategoryType
  applicableServices: ServiceTypeShort[] // 지표에 적용되는 급여유형 ('요', '목', '간')
  isRecordTarget?: boolean // false인 경우 기록 관리 비대상(면담·관찰·현장점검)
  isTrackingEnabled: boolean // 지표별 ERP 점검 관리 여부 설정 (true: ERP 점검 관리, false: 외부/자체 관리)
  evalMethodType?: string
  totalTargetCount: number
  completedCount: number
  mustHaveForms: string[]
  noRecordNotice?: string // 기록 비대상 지표일 때 서류 목록 대신 노출할 안내문구
  dangerCheck: string
  missingList: MissingItem[]
  originalManual: OriginalManualData
}

// ─── Indicators Database with Full Official Manual Data ───────────────────────

const INITIAL_INDICATORS: CategoryIndicator[] = [
  // ── 1. 수급자 관련 지표 ───────────────────────────────────────────────────
  {
    number: 11,
    code: '방문요양 11',
    title: '계약체결 및 제공계획 통보',
    score: 4,
    cycle: '계약 시마다',
    category: 'beneficiary',
    applicableServices: ['요', '목', '간'],
    isRecordTarget: true,
    isTrackingEnabled: true,
    evalMethodType: '기록, 전산, 면담',
    totalTargetCount: 7,
    completedCount: 6,
    mustHaveForms: ['장기요양급여 이용계약서', '개인정보 수집·이용 동의서', '비급여 대상 및 비용 안내문', '계약서 교부확인서'],
    dangerCheck: '계약서 필수기재사항(계약기간, 급여비용, 비급여항목, 감액사유) 누락 또는 대리서명 시 불인정',
    missingList: [
      {
        id: 'm-11-1',
        targetName: '강호진 수급자',
        targetSub: '2등급 (81세·남)',
        services: ['요', '간'],
        manager: '윤서연 (사회복지사)',
        missingDocName: '개인정보 제3자 제공 및 수집·이용 동의서',
        reason: '계약서 본문은 체결되었으나 별지 개인정보 동의서 서명이 누락됨',
        deadline: '수급자/보호자 자필 서명 보완',
        isFixed: false,
      },
    ],
    originalManual: {
      indicatorCode: '방문요양 11',
      indicatorTitle: '급여이용계약',
      indicatorSubtitle: '수급자와의 계약을 공정하게 체결하고 주요 내용을 충실히 설명합니다.',
      score: 4,
      serviceType: '수급자 권리보장',
      targetTypes: ['요', '목', '간'],
      direction: '수급자 권익을 보호하기 위하여 법정 급여이용계약 절차를 준수하고 충실한 사전 설명을 거쳤는지 평가합니다.',
      criteriaRows: [
        {
          no: '①',
          target: '기관',
          content: '수급자(보호자)와 계약서에 따라 급여이용계약을 체결하고 1부를 교부한다.',
          method: '기록',
          score: 2,
        },
        {
          no: '②',
          target: '수급자',
          content: '계약 체결 전 급여내용, 비용, 비급여 대상 등에 대해 사전에 충분한 설명을 들었다.',
          method: '면담',
          score: 2,
        },
      ],
      effectivePeriod: '2024.1월 ~ 평가일',
      effectivePeriodNotes: ['신규계약 및 갱신계약 서류 일체 확인'],
      verificationDetails: [
        {
          targetCriteria: '기준①,②',
          contents: [
            '계약서 필수기재사항(계약기간, 급여종류, 본인부담금, 비급여항목) 확인',
            '수급자(보호자) 대상 전화 면담을 통해 계약 전 설명 여부 검증',
          ],
        },
      ],
      legalBasis: {
        lawName: '노인장기요양보험법 시행규칙',
        article: '제15조(장기요양급여이용계약)',
        text: '장기요양기관은 수급자와 장기요양급여를 제공하는 계약을 체결하는 경우 서면으로 하여야 한다.',
      },
    },
  },
  {
    number: 12,
    code: '방문요양 12',
    title: '수급자 권리보장 및 비밀보장',
    score: 3,
    cycle: '상시 (현장 평가)',
    category: 'beneficiary',
    applicableServices: ['요', '목', '간'],
    isRecordTarget: false,
    isTrackingEnabled: true,
    evalMethodType: '면담, 관찰',
    totalTargetCount: 7,
    completedCount: 7,
    mustHaveForms: [],
    noRecordNotice: '본 지표는 별도의 전산 기록 서류 구비 대상이 아니며, 공단 평가관이 수급자·보호자 및 요양보호사 대상 [구두 면담 및 현장 관찰]을 통해 서비스 제공 태도 및 비밀보장 준수 여부를 확인합니다.',
    dangerCheck: '수급자(보호자) 면담 시 요양보호사가 수급자의 인격이나 신체적 자기결정권을 존중하지 않거나, 개인정보/사생활을 동의 없이 제3자에게 발설한 사실이 확인될 경우 불인정 감점 처리됩니다.',
    missingList: [],
    originalManual: {
      indicatorCode: '방문요양 12',
      indicatorTitle: '수급자 권리보장',
      indicatorSubtitle: '수급자의 인격을 존중하고 사생활과 비밀을 철저히 보호합니다.',
      score: 3,
      serviceType: '수급자 권리보장',
      targetTypes: ['요', '목', '간'],
      direction: '수급자의 자기결정권과 존엄성을 존중하며, 서비스 과정에서 취득한 비밀과 개인정보를 안전하게 보호하고 있는지 평가합니다.',
      criteriaRows: [
        {
          no: '①',
          target: '수급자',
          content: '요양보호사는 수급자를 존중하는 태도로 대하며 수급자의 의견을 경청한다.',
          method: '면담',
          score: 1.5,
        },
        {
          no: '②',
          target: '수급자/직원',
          content: '수급자의 사생활과 개인정보 및 건강상태에 관한 비밀을 누설하지 않는다.',
          method: '면담, 관찰',
          score: 1.5,
        },
      ],
      effectivePeriod: '평가 당일',
      effectivePeriodNotes: ['수급자 또는 보호자 유선/대면 면담 및 요양보호사 면담으로 확인'],
      verificationDetails: [
        {
          targetCriteria: '기준①,②',
          contents: [
            '평가관이 표본 수급자(보호자)에게 직접 전화 또는 방문 면담하여 불친절·권리침해 여부 확인',
            '기관 종사자가 업무상 알게 된 비밀보장 지침을 숙지하고 있는지 면담 질의',
          ],
        },
      ],
      legalBasis: {
        lawName: '노인장기요양보험법',
        article: '제3조(기본원칙) 및 제61조(비밀유지의무)',
        text: '장기요양기관의 종사자나 종사하였던 자는 업무상 알게 된 비밀을 누설하여서는 아니 된다.',
      },
    },
  },
  {
    number: 13,
    code: '방문요양 13',
    title: '신체구속 및 학대방지 (수급자 인권보호)',
    score: 3,
    cycle: '상시 (면담·관찰)',
    category: 'beneficiary',
    applicableServices: ['요', '목', '간'],
    isRecordTarget: false,
    isTrackingEnabled: true,
    evalMethodType: '면담, 관찰',
    totalTargetCount: 7,
    completedCount: 7,
    mustHaveForms: [],
    noRecordNotice: '본 지표는 별도의 전산 서식이 아닌 수급자(보호자) 및 요양보호사 대상 [구두 면담 및 현장 관찰]로 평가됩니다. 수급자의 신체활동을 부당하게 억제·제한하거나 폭언, 폭행, 방임 등 일체의 학대 행위가 없는지 점검합니다.',
    dangerCheck: '수급자 면담 또는 현장 실사 시 수급자를 묶어두거나 방에 가두는 등 신체적 구속 행위가 적발되거나, 요양보호사의 폭언/방임 사실이 확인되면 즉시 불인정(0점) 및 행정처분 대상이 됩니다.',
    missingList: [],
    originalManual: {
      indicatorCode: '방문요양 13',
      indicatorTitle: '신체구속 및 학대방지',
      indicatorSubtitle: '수급자의 신체적 자유를 보장하고 어떠한 형태의 학대도 철저히 금지합니다.',
      score: 3,
      serviceType: '수급자 권리보장',
      targetTypes: ['요', '목', '간'],
      direction: '수급자의 신체적 자유와 존엄성을 보장하기 위해 부당한 신체 억제나 방임, 언어적·신체적 학대 행위를 엄격히 금지하고 있는지 평가합니다.',
      criteriaRows: [
        {
          no: '①',
          target: '수급자/직원',
          content: '요양보호사는 수급자의 신체활동을 부당하게 제한하거나 억제하지 않는다.',
          method: '면담, 관찰',
          score: 1.5,
        },
        {
          no: '②',
          target: '수급자/직원',
          content: '수급자에게 폭언, 폭행, 방임, 정서적 학대 등 일체의 학대 행위를 하지 않는다.',
          method: '면담, 관찰',
          score: 1.5,
        },
      ],
      effectivePeriod: '평가 당일',
      effectivePeriodNotes: ['수급자(보호자) 유선/대면 면담 및 현장 관찰'],
      verificationDetails: [
        {
          targetCriteria: '기준①,②',
          contents: [
            '평가관이 표본 수급자(보호자) 유선 면담 시 부당한 구속이나 불친절, 폭언 여부 확인',
            '요양보호사 면담을 통해 신체구속 금지 및 인권 보호 지침 인지 여부 검증',
          ],
        },
      ],
      legalBasis: {
        lawName: '노인복지법',
        article: '제39조의9(금지행위)',
        text: '누구든지 65세 이상의 노인에게 신체적 폭행, 상해, 성적 수치심을 주는 행위, 폭언, 유기 또는 방임을 하여서는 아니 된다.',
      },
    },
  },
  {
    number: 14,
    code: '방문요양 14',
    title: '노인학대 예방 및 권익보호 체계',
    score: 3,
    cycle: '상시 (현장·면담)',
    category: 'beneficiary',
    applicableServices: ['요', '목', '간'],
    isRecordTarget: false,
    isTrackingEnabled: true,
    evalMethodType: '현장, 면담',
    totalTargetCount: 7,
    completedCount: 7,
    mustHaveForms: [],
    noRecordNotice: '본 지표는 사무실 내 [노인보호전문기관(1577-1389) 및 노인학대 신고의무 안내문 게시]와 종사자/수급자 [구두 면담]으로 학대 징후 발견 시 즉시 신고 절차를 숙지하고 있는지 점검합니다.',
    dangerCheck: '사무실에 노인학대 신고기관 연락처 미게시 또는 종사자 면담 시 학대 의심 징후 발견 시 즉시 신고 절차(1577-1389, 112)를 모른다고 답변할 경우 불인정 감점됩니다.',
    missingList: [],
    originalManual: {
      indicatorCode: '방문요양 14',
      indicatorTitle: '노인인권 및 학대예방',
      indicatorSubtitle: '노인학대를 사전 예방하고 신속한 권익구제 체계를 마련합니다.',
      score: 3,
      serviceType: '수급자 권리보장',
      targetTypes: ['요', '목', '간'],
      direction: '노인학대 발생을 미연에 방지하고 학대 의심 사례 발견 시 즉각적인 신고 및 보호 조치가 가능한지 평가합니다.',
      criteriaRows: [
        {
          no: '①',
          target: '기관',
          content: '노인학대 예방 지침을 마련하고 신고기관 연락망을 사무실에 게시한다.',
          method: '현장',
          score: 1.5,
        },
        {
          no: '②',
          target: '직원',
          content: '종사자는 노인학대 신고의무자로서의 역할과 신고 절차를 숙지하고 있다.',
          method: '면담',
          score: 1.5,
        },
      ],
      effectivePeriod: '평가 당일',
      effectivePeriodNotes: ['사무실 게시물 확인 및 종사자 표본 면담'],
      verificationDetails: [
        {
          targetCriteria: '기준①,②',
          contents: [
            '사무실 내 노인보호전문기관(1577-1389) 및 경찰서(112) 안내문 부착 확인',
            '요양보호사 면담: "수급자 댁에서 방임이나 학대 징후를 발견하면 어떻게 조치하시나요?"',
          ],
        },
      ],
      legalBasis: {
        lawName: '노인복지법',
        article: '제39조의6(노인학대 신고의무와 절차 등)',
        text: '누구든지 노인학대를 알게 된 때에는 노인보호전문기관 또는 수사기관에 신고할 수 있으며, 장기요양기관 종사자는 직무상 알게 된 때에는 즉시 신고하여야 한다.',
      },
    },
  },
  {
    number: 15,
    code: '방문요양 15',
    title: '수급자 안전 및 위생·투약관리',
    score: 3,
    cycle: '급여제공 시마다',
    category: 'beneficiary',
    applicableServices: ['요', '목', '간'],
    isRecordTarget: true,
    isTrackingEnabled: true,
    evalMethodType: '기록, 관찰, 면담',
    totalTargetCount: 7,
    completedCount: 6,
    mustHaveForms: ['수급자 안전점검 체크리스트', '투약 돕기 및 복약확인 기록부', '가정 내 안전사고 예방수칙'],
    dangerCheck: '처방약 복용 지원 시 의사 처방과 상이한 임의 투약 돕기 또는 가정 내 낙상 위험요소 방치 시 감점',
    missingList: [
      {
        id: 'm-15-1',
        targetName: '강호진 수급자',
        targetSub: '2등급 (81세·남)',
        services: ['요', '간'],
        manager: '윤서연 (사회복지사)',
        missingDocName: '가정 내 환경안전점검 체크리스트 (문턱·조명·욕실미끄럼)',
        reason: '정기 가정방문 시 실시한 환경안전점검표 보호자 확인 서명이 누락됨',
        deadline: '안전점검표 보호자 확인 날인 보완',
        isFixed: false,
      },
    ],
    originalManual: {
      indicatorCode: '방문요양 15',
      indicatorTitle: '수급자 안전 및 위생관리',
      indicatorSubtitle: '수급자의 안전사고를 예방하고 정확한 투약 지원 및 위생관리를 제공합니다.',
      score: 3,
      serviceType: '서비스 제공',
      targetTypes: ['요', '목', '간'],
      direction: '수급자 가정 내 안전사고 위험을 점검·예방하고 처방 약물의 정확한 복용을 안전하게 지원하는지 평가합니다.',
      criteriaRows: [
        {
          no: '①',
          target: '기관',
          content: '수급자 가정 내 낙상 및 안전사고 위험요소를 정기적으로 점검하고 개선 조치한다.',
          method: '기록, 현장',
          score: 1.5,
        },
        {
          no: '②',
          target: '직원',
          content: '의사 처방에 따른 수급자의 약물 복용을 안전하게 돕고 상태변화를 기록한다.',
          method: '기록, 면담',
          score: 1.5,
        },
      ],
      effectivePeriod: '2024.1월 ~ 평가일',
      effectivePeriodNotes: ['안전점검표 및 투약기록부, 요양보호사 면담 확인'],
      verificationDetails: [
        {
          targetCriteria: '기준①,②',
          contents: [
            '가정 내 안전점검 체크리스트(욕실 미끄럼 방지, 조명 밝기, 문턱 등) 작성 여부',
            '급여제공기록지 내 투약 돕기 시간 및 이상반응 기록 확인',
          ],
        },
      ],
      legalBasis: {
        lawName: '노인장기요양보험법',
        article: '제3조(장기요양급여 제공의 기본원칙)',
        text: '장기요양급여는 수급자의 심신상태와 안전을 종합적으로 고려하여 적정하게 제공하여야 한다.',
      },
    },
  },
  {
    number: 16,
    code: '방문요양 16',
    title: '위험도 평가 (낙상·욕창·인지기능)',
    score: 6,
    cycle: '반기 1회',
    category: 'beneficiary',
    applicableServices: ['요', '목', '간'],
    isRecordTarget: true,
    isTrackingEnabled: true,
    evalMethodType: '기록, 전산',
    totalTargetCount: 7,
    completedCount: 6,
    mustHaveForms: ['낙상위험평가서(Bobath/Morse)', '욕창위험평가서(Braden)', 'CIST 인지선별검사지', '수급자 작성 그림 원본'],
    dangerCheck: 'CIST 검사 시 수급자가 직접 작성한 그림(오각형·시계) 원본 누락 시 해당 기준 불인정(2점 감점)',
    missingList: [
      {
        id: 'm-16-1',
        targetName: '이영희 수급자',
        targetSub: '1등급 (89세·여)',
        services: ['요', '목'],
        manager: '윤서연 (사회복지사)',
        missingDocName: 'CIST 인지선별검사 그림 원본 시험지 (오각형·시계)',
        reason: '전산에 점수(14점)만 입력되어 있고 수급자가 직접 작성한 그림 검사지 원본이 서류철에 누락됨',
        deadline: '그림 검사지 원본 스캔 편철 필요',
        isFixed: false,
      },
    ],
    originalManual: {
      indicatorCode: '방문요양 16',
      indicatorTitle: '위험도 평가',
      indicatorSubtitle: '수급자의 낙상 및 욕창위험도, 인지기능 상태를 정기적으로 평가합니다.',
      score: 6,
      serviceType: '서비스 제공',
      targetTypes: ['요', '목', '간'],
      direction: '수급자의 낙상 및 욕창위험도, 인지기능 상태를 정기적으로 평가하여 수급자 상태에 맞는 적절한 서비스를 제공하고 있는지 평가합니다.',
      criteriaRows: [
        {
          no: '①',
          target: '기관',
          content: '모든 수급자의 낙상위험도 평가를 반기별 1회 이상 실시한다. (필수사항: 수급자명, 일자, 작성자명)',
          method: '기록',
          score: 2,
        },
        {
          no: '②',
          target: '기관',
          content: '모든 수급자의 욕창위험도 평가를 반기별 1회 이상 실시한다. (필수사항: 수급자명, 일자, 작성자명)',
          method: '기록',
          score: 2,
        },
        {
          no: '③',
          target: '기관',
          content: '모든 수급자의 인지기능 평가를 반기별 1회 이상 실시한다. (필수사항: 수급자명, 일자, 작성자명)',
          method: '기록',
          score: 2,
        },
      ],
      effectivePeriod: '2024.1월 ~ 평가일',
      effectivePeriodNotes: [
        "기준①,②,③번의 '반기별 1회 이상' 실시는 평가시행세칙 공고월의 다음 해(2026.1월)부터 적용한다.",
        "기준③번의 '평가도구에 포함된 모든 기록'은 평가시행세칙 공고월의 다음 해(2026.1월)부터 확인한다.",
      ],
      verificationDetails: [
        {
          targetCriteria: '기준①,②,③',
          contents: [
            '낙상 및 욕창 위험도평가, 인지기능 평가는 대면하여 실시함을 원칙으로 하며, 해당급여직원이 실시한 경우만 인정한다.',
            '외부 전문기관에서 실시한 인지기능 검사는 해당급여직원 여부를 확인하지 않음',
            '신규수급자는 급여제공 시작일까지 실시하였는지 확인한다.',
          ],
        },
        {
          targetCriteria: '기준①,②',
          contents: ['검증된 도구(관련학회나 논문에서 발표된 도구)를 이용하여 객관적으로 수준을 파악할 수 있어야 한다.'],
          subList: [
            '낙상위험측정도구(예시): Bobath Memorial Hospital Fall Risk Assessment Scales, Morse Fall Scale',
            '욕창위험측정도구(예시): Braden scale, Norton scale, Gosnell scale, Knoll scale',
          ],
        },
        {
          targetCriteria: '기준③',
          contents: [
            '인지기능평가는 해당급여직원이 실시한 경우만 인정한다. 다만, 인지기능평가를 전문적으로 수행할 수 있는 공인된 기관(병원, 보건소, 치매안심센터 등)에서 실시하여도 인정하며, 이 경우에도 신규수급자는 급여개시 전에 실시하여야 한다.',
            "수급자가 치매진단을 받은 경우 '충족(Y)'으로 평가하며 처방전 등 객관적인 자료로 확인한다.",
          ],
          subList: [
            '인지기능 평가도구(예시): CIST(인지선별검사), K-MMSE, MMSE-K 등 (※ CIST는 중앙치매센터 교육 이수 후 활용)',
            '치매 객관적 자료는 해당 반기(회계연도 기준) 내 유효한 경우 인정함',
          ],
          warning: "평가도구에 포함된 모든 기록(예시: CIST 평가를 위하여 작성되는 그림 등)이 확인되지 않는 경우 '불인정(N)'",
        },
      ],
      legalBasis: {
        lawName: '노인장기요양보험법',
        article: '제3조(장기요양급여 제공의 기본원칙) ②항',
        text: '장기요양급여는 노인등의 심신상태·생활환경과 노인등 및 그 가족의 욕구·선택을 종합적으로 고려하여 필요한 범위 안에서 이를 적정하게 제공하여야 한다.',
      },
    },
  },
  {
    number: 17,
    code: '방문요양 17',
    title: '급여제공계획 수립 및 공단 통보',
    score: 6,
    cycle: '연 1회',
    category: 'beneficiary',
    applicableServices: ['요', '목', '간'],
    isRecordTarget: true,
    isTrackingEnabled: true,
    evalMethodType: '기록, 전산, 면담',
    totalTargetCount: 7,
    completedCount: 6,
    mustHaveForms: ['급여제공계획서', '공단 통보 접수증', '식사 유의사항(기피식품)', '자택 비치 부본'],
    dangerCheck: '급여개시일 이후 지연 통보하거나, 식사 유의사항에 기피식품(알러지·기호) 누락 시 불인정',
    missingList: [
      {
        id: 'm-17-1',
        targetName: '박민수 수급자',
        targetSub: '3등급 (84세·남)',
        services: ['요', '목'],
        manager: '김철호 (사회복지사)',
        missingDocName: '급여제공계획서 내 기피식품(알러지·소화 등) 기록',
        reason: '식사제공 유의사항 란에 기피식품이 "없음"으로 일괄 작성되어 공단 실사 시 지적 대상',
        deadline: '기피식품(당뇨 간식 제한, 저염식 등) 상세 기재 필요',
        isFixed: false,
      },
    ],
    originalManual: {
      indicatorCode: '방문요양 17',
      indicatorTitle: '급여제공계획 수립 및 제공',
      indicatorSubtitle: '수급자의 개별욕구를 반영하여 급여제공계획을 세우고 계획에 따라 급여를 제공합니다.',
      score: 6,
      serviceType: '서비스 제공',
      targetTypes: ['요', '목', '간'],
      direction: '욕구사정과 위험도 평가 등을 바탕으로 수급자 상태에 맞는 급여제공계획을 작성 및 통보하고, 수급자 또는 보호자에게 설명한 후 그에 따라 급여를 제공하였는지 평가합니다.',
      criteriaRows: [
        {
          no: '①',
          target: '기관',
          content: '기관에서 실시한 욕구사정, 낙상평가, 욕창평가, 인지기능 평가 및 개별욕구 등을 반영한 수급자별 급여제공계획을 연 1회 이상 수립한다. [연동]',
          requiredPoints: '필수사항: 급여종류, 수급자명, 작성일자, 작성자명, 세부목표, 필요내용, 세부제공내용, 횟수, 시간, 종합의견',
          method: '기록, 전산',
          score: 2,
        },
        {
          no: '②',
          target: '기관',
          content: '모든 급여제공계획에 대해 수급자 또는 보호자에게 설명하고 확인서명을 받아 급여제공 시작일까지 공단에 통보한다. [연동]',
          method: '기록, 전산',
          score: 1,
        },
        {
          no: '③',
          target: '기관',
          content: '급여제공계획에 따라 급여를 제공하고 기록한다.',
          method: '기록, 전산',
          score: 1,
        },
        {
          no: '④',
          target: '직원',
          content: '요양보호사는 서비스 제공 전 시설장(사회복지사)으로부터 수급자의 급여제공계획에 대해 설명을 듣고 숙지한다. [신설]',
          requiredPoints: '필수사항: 수급자 기능상태, 급여제공 시 유의사항',
          method: '면담, 현장',
          score: 1,
        },
        {
          no: '⑤',
          target: '직원',
          content: '요양보호사는 수급자의 신체기능 유지·향상을 위한 급여를 제공한다.',
          method: '면담',
          score: 1,
        },
      ],
      effectivePeriod: '2024.1월 ~ 평가일',
      effectivePeriodNotes: [
        "기준②번의 '급여제공 시작일까지'는 평가시행세칙 공고월의 다음 해(2026.1월)부터 확인한다.",
      ],
      verificationDetails: [
        {
          targetCriteria: '기준①',
          contents: [
            '모든 급여제공계획을 해당급여직원이 연 1회 이상 작성하였는지 확인한다.',
            '기관에서 가장 최근에 실시한 욕구사정, 낙상평가, 욕창평가, 인지기능 평가를 반영하였는지 확인하며, 공단 발급 개인별장기요양이용계획서를 참고하여 작성한다.',
          ],
        },
        {
          targetCriteria: '기준②',
          contents: [
            "모든 급여제공계획서는 수급자 또는 보호자에게 확인서명을 받아 '급여제공 시작일까지' 공단에 통보해야 인정함",
            '대면: 확인서명 / 비대면: 우편, SNS 등 전문 발송 후 유선안내 기록 / 전자서명: 스마트장기요양 모바일 동의 인정',
          ],
          warning: "기준①번이 '불인정(N)'되는 경우, 기준②번도 연동하여 '불인정(N)'한다.",
        },
        {
          targetCriteria: '세부내용 작성 유의',
          contents: [
            "세부내용 5번 항목 중 '기피식품 파악'은 식사제공 유의사항 등에 기록되어있는지 확인함 (종교, 알러지, 소화 등)",
            '욕구사정이 단순 체크리스트로 작성된 경우 항목별 또는 총평에 판단 근거(수급자 기능 및 상태)가 확인되면 인정한다.',
          ],
          subList: [
            "(예시) 옷 벗고 입기를 '△(부분도움)'으로 체크만 한 경우 불인정, '왼쪽편마비로 옷을 갈아입을 때 일부 도움을 주어야함'으로 작성한 경우 인정",
          ],
        },
      ],
      legalBasis: {
        lawName: '노인장기요양보험법',
        article: '제3조(장기요양급여 제공의 기본원칙) ②항',
        text: '장기요양급여는 노인등의 심신상태·생활환경과 노인등 및 그 가족의 욕구·선택을 종합적으로 고려하여 필요한 범위 안에서 이를 적정하게 제공하여야 한다.',
      },
    },
  },
  {
    number: 18,
    code: '방문요양 18',
    title: '욕구사정 (정기 종합평가)',
    score: 4,
    cycle: '연 1회',
    category: 'beneficiary',
    applicableServices: ['요', '목', '간'],
    isRecordTarget: true,
    isTrackingEnabled: true,
    evalMethodType: '기록, 전산',
    totalTargetCount: 7,
    completedCount: 6,
    mustHaveForms: ['6대 영역 욕구사정표', '사정자 총평 및 상태 판단근거'],
    dangerCheck: '신체기능 상태에 구체적 사유 없이 단순 체크(△ 부분도움)만 표기한 경우 불인정',
    missingList: [
      {
        id: 'm-18-1',
        targetName: '박민수 수급자',
        targetSub: '3등급 (84세·남)',
        services: ['요', '목'],
        manager: '김철호 (사회복지사)',
        missingDocName: '욕구사정표 항목별 판단근거 (수급자 기능 및 상태 서술)',
        reason: '옷 벗고 입기 항목에 "△(부분도움)"만 체크되고 구체적인 편마비/부축 사유가 미작성됨',
        deadline: '"왼쪽 편마비로 상의 착의 시 단추 채우기 일부 부축 필요" 서술 보완',
        isFixed: false,
      },
    ],
    originalManual: {
      indicatorCode: '방문요양 18',
      indicatorTitle: '욕구사정',
      indicatorSubtitle: '수급자의 신체·간호·인지·환경 상태를 종합적으로 사정하여 기록합니다.',
      score: 4,
      serviceType: '서비스 제공',
      targetTypes: ['요', '목', '간'],
      direction: '수급자의 개별적 특성과 기능 상태를 정확히 파악하여 개별 맞춤형 급여계획을 수립하기 위해 정기적으로 욕구사정을 실시하는지 평가합니다.',
      criteriaRows: [
        {
          no: '①',
          target: '기관',
          content: '신체상태, 일상생활동작, 인지상태, 간호상태, 재활욕구, 환경상태 6대 영역에 대해 연 1회 이상 정기 욕구사정을 실시한다.',
          method: '기록',
          score: 2,
        },
        {
          no: '②',
          target: '기관',
          content: '욕구사정 결과에 대해 수급자의 기능상태 및 판단근거를 종합의견에 충실하게 서술한다.',
          method: '기록',
          score: 2,
        },
      ],
      effectivePeriod: '2024.1월 ~ 평가일',
      effectivePeriodNotes: ['신규수급자는 급여개시일 전까지 욕구사정 완료 필수'],
      verificationDetails: [
        {
          targetCriteria: '기준①,②',
          contents: [
            '욕구사정은 해당 급여직원이 수급자 대면 사정함을 원칙으로 함',
            '단순 체크리스트 결과만 나열된 경우 인정하지 않으며, 항목별 또는 총평에 판단 근거가 기술되어야 함',
          ],
        },
      ],
      legalBasis: {
        lawName: '노인장기요양보험법 시행규칙',
        article: '제12조(급여제공의 기준)',
        text: '장기요양기관은 수급자의 심신상태와 욕구사정 결과를 바탕으로 적정한 장기요양급여를 제공하여야 한다.',
      },
    },
  },
  {
    number: 19,
    code: '방문요양 19',
    title: '급여제공기록지 작성 및 관리',
    score: 5,
    cycle: '급여제공 시마다',
    category: 'beneficiary',
    applicableServices: ['요', '목', '간'],
    isRecordTarget: true,
    isTrackingEnabled: true,
    evalMethodType: '기록, 전산',
    totalTargetCount: 7,
    completedCount: 6,
    mustHaveForms: ['RFID 태그 전송내역', '수기 급여제공기록지', '특이사항(상태변화) 기록', '수급자 확인서명'],
    dangerCheck: 'RFID 미전송 사유 불명확 수기기록지 대체, 특이사항 란 공란 처리 시 불인정 감점',
    missingList: [
      {
        id: 'm-19-1',
        targetName: '정순자 수급자',
        targetSub: '2등급 (86세·여)',
        services: ['요', '간'],
        manager: '김미숙 (요양보호사)',
        missingDocName: '2026년 2월 수기 급여제공기록지 수급자(보호자) 확인 서명',
        reason: '스마트폰 태그 오류로 작성된 수기 기록지에 월말 수급자 확인 서명이 누락됨',
        deadline: '수급자/보호자 월간 확인 서명 날인 보완',
        isFixed: false,
      },
    ],
    originalManual: {
      indicatorCode: '방문요양 19',
      indicatorTitle: '급여제공기록',
      indicatorSubtitle: '서비스 제공 내용을 충실히 기록하고 수급자의 상태변화를 관리합니다.',
      score: 5,
      serviceType: '서비스 제공',
      targetTypes: ['요', '목', '간'],
      direction: '급여제공계획에 따른 실제 서비스 제공 내용을 정확하게 기록하고 체계적으로 보관·관리하는지 평가합니다.',
      criteriaRows: [
        {
          no: '①',
          target: '기관',
          content: '급여제공기록지를 성실히 작성하고 수급자 확인을 받아 규정에 따라 보관한다.',
          method: '기록, 전산',
          score: 3,
        },
        {
          no: '②',
          target: '직원',
          content: '서비스 제공 중 수급자의 신체·인지 상태변화 및 특이사항을 구체적으로 기록한다.',
          method: '기록',
          score: 2,
        },
      ],
      effectivePeriod: '2024.1월 ~ 평가일',
      effectivePeriodNotes: ['RFID 전송 내역 및 수기 기록지 일치 여부 대사'],
      verificationDetails: [
        {
          targetCriteria: '기준①,②',
          contents: [
            'RFID 전송 실패 시 수기기록지 사유 기재 및 월말 수급자 확인 서명 필수',
            '단순 반복 복사 문구가 아닌 실제 수급자 상태 변화 기록 검증',
          ],
        },
      ],
      legalBasis: {
        lawName: '노인장기요양보험법',
        article: '제35조(장기요양급여기록의 작성·보존)',
        text: '장기요양기관은 장기요양급여를 제공한 때에는 그 내용을 기록하고 이를 5년간 보존하여야 한다.',
      },
    },
  },
  {
    number: 20,
    code: '방문요양 20',
    title: '상태변화 및 사례관리회의',
    score: 4,
    cycle: '반기 1회',
    category: 'beneficiary',
    applicableServices: ['요', '목', '간'],
    isRecordTarget: true,
    isTrackingEnabled: true,
    evalMethodType: '기록, 전산',
    totalTargetCount: 7,
    completedCount: 6,
    mustHaveForms: ['사례관리회의록', '사례선정사유서', '급여제공계획 변경서', '회의사진'],
    dangerCheck: '사례관리회의 결과가 차기 급여제공계획 변경으로 연동되지 않으면 2점 감점',
    missingList: [
      {
        id: 'm-20-1',
        targetName: '최영수 수급자',
        targetSub: '3등급 (82세·남)',
        services: ['요', '목'],
        manager: '최지영 (시설장)',
        missingDocName: '사례관리회의 결과에 따른 급여제공계획서 변경 통보 내역',
        reason: '사례관리회의는 개최되었으나 회의 결과 변경된 서비스 내용의 계획서 재수립 및 공단 재통보가 누락됨',
        deadline: '계획서 변경 수립 및 수급자 서명 후 공단 통보',
        isFixed: false,
      },
    ],
    originalManual: {
      indicatorCode: '방문요양 20',
      indicatorTitle: '사례관리',
      indicatorSubtitle: '수급자의 상태변화에 능동적으로 대처하기 위해 사례관리를 실시합니다.',
      score: 4,
      serviceType: '서비스 제공',
      targetTypes: ['요', '목', '간'],
      direction: '상태변화나 복합적 문제를 가진 수급자를 선정하여 다학제적 사례회의를 거쳐 계획을 조정하는지 평가합니다.',
      criteriaRows: [
        {
          no: '①',
          target: '기관',
          content: '반기별 1회 이상 사례관리회의를 개최하고 회의록을 작성한다.',
          method: '기록',
          score: 2,
        },
        {
          no: '②',
          target: '기관',
          content: '사례관리회의 결과를 수급자 급여제공계획에 반영하여 서비스를 조정·제공한다. [연동]',
          method: '기록, 전산',
          score: 2,
        },
      ],
      effectivePeriod: '2024.1월 ~ 평가일',
      effectivePeriodNotes: ['기관 종사자 3인 이상 참석 회의록 및 계획 변경 연동 확인'],
      verificationDetails: [
        {
          targetCriteria: '기준①,②',
          contents: [
            '수급자 상태 악화, 보호자 갈등, 서비스 거부 등의 구체적 사유로 선정',
            '회의 결과가 실제 급여제공계획 변경 및 공단 통보로 이어졌는지 확인',
          ],
        },
      ],
      legalBasis: {
        lawName: '노인장기요양보험법',
        article: '제3조(기본원칙)',
        text: '수급자의 심신상태와 생활환경에 맞추어 개별화된 급여를 적정하게 조정하여야 한다.',
      },
    },
  },
  {
    number: 23,
    code: '방문요양 23',
    title: '수급자(보호자) 만족도 평가',
    score: 3,
    cycle: '연 1회',
    category: 'beneficiary',
    applicableServices: ['요', '목', '간'],
    isRecordTarget: true,
    isTrackingEnabled: true,
    evalMethodType: '기록, 면담',
    totalTargetCount: 7,
    completedCount: 6,
    mustHaveForms: ['연간 수급자 만족도 설문지', '만족도 결과분석 보고서', '개선계획서'],
    dangerCheck: '단순 설문 취합에 그치고 분석 보고서 및 차기년도 서비스 개선계획 미수립 시 불인정',
    missingList: [
      {
        id: 'm-23-1',
        targetName: '기관 공통 (수급자 전원)',
        targetSub: '2025년도 정기조사',
        services: ['요', '목', '간'],
        manager: '윤서연 (사회복지사)',
        missingDocName: '수급자 만족도 설문조사 결과 통계분석 및 개선조치 계획서',
        reason: '설문지는 회수되었으나 종합 통계표 및 불만사항에 대한 개선계획서 작성이 누락됨',
        deadline: '만족도 결과분석 보고서 작성 및 편철',
        isFixed: false,
      },
    ],
    originalManual: {
      indicatorCode: '방문요양 23',
      indicatorTitle: '급여제공 만족도',
      indicatorSubtitle: '수급자 및 보호자의 만족도를 조사하여 서비스 품질 개선에 활용합니다.',
      score: 3,
      serviceType: '서비스 평가',
      targetTypes: ['요', '목', '간'],
      direction: '정기적인 만족도 조사를 실시하고 그 결과를 급여 질 향상에 실질적으로 반영하는지 평가합니다.',
      criteriaRows: [
        {
          no: '①',
          target: '기관',
          content: '연 1회 이상 전체 수급자(보호자)를 대상으로 만족도 조사를 실시한다.',
          method: '기록',
          score: 1.5,
        },
        {
          no: '②',
          target: '기관',
          content: '조사 결과를 분석하여 개선계획을 수립하고 기관 운영에 반영한다.',
          method: '기록',
          score: 1.5,
        },
      ],
      effectivePeriod: '2024.1월 ~ 평가일',
      effectivePeriodNotes: ['설문지 원본 및 연간 개선계획서 확인'],
      verificationDetails: [
        {
          targetCriteria: '기준①,②',
          contents: [
            '설문 문항에 친절도, 청결도, 전문성, 건의사항 등이 포함되어 있는지 확인',
            '개선계획에 따른 후속 조치 이행 여부 점검',
          ],
        },
      ],
      legalBasis: {
        lawName: '노인장기요양보험법',
        article: '제3조(기본원칙)',
        text: '장기요양급여는 수급자의 욕구와 만족도를 종합적으로 반영하여 제공하여야 한다.',
      },
    },
  },

  // ── 2. 종사자 관련 지표 ───────────────────────────────────────────────────
  {
    number: 1,
    code: '방문요양 1',
    title: '운영규정 및 정기 직원회의',
    score: 3,
    cycle: '분기 1회',
    category: 'staff',
    applicableServices: ['요', '목', '간'],
    isRecordTarget: true,
    isTrackingEnabled: true,
    evalMethodType: '기록, 면담',
    totalTargetCount: 1,
    completedCount: 1,
    mustHaveForms: ['운영규정'],
    dangerCheck: '운영규정 필수항목(이용료, 직원복무, 고충처리 등) 누락 또는 회의 참석 서명 미비 시 감점',
    missingList: [],
    originalManual: {
      indicatorCode: '방문요양 1',
      indicatorTitle: '운영규정 및 회의',
      indicatorSubtitle: '적법한 운영규정을 갖추고 정기적인 직원회의를 운영합니다.',
      score: 3,
      serviceType: '기관 운영',
      targetTypes: ['요', '목', '간'],
      direction: '기관 운영의 표준화와 종사자 의견 수렴을 위한 회의 체계를 갖추었는지 평가합니다.',
      criteriaRows: [
        {
          no: '①',
          target: '기관',
          content: '법정 필수항목이 포함된 운영규정을 제정·개정하고 비치한다.',
          method: '기록, 현장',
          score: 1.5,
        },
        {
          no: '②',
          target: '기관',
          content: '분기별 1회 이상 직원회의(간담회)를 개최하고 회의록을 작성한다.',
          method: '기록, 면담',
          score: 1.5,
        },
      ],
      effectivePeriod: '2024.1월 ~ 평가일',
      effectivePeriodNotes: ['분기별 회의록 및 사진, 종사자 면담 확인'],
      verificationDetails: [
        {
          targetCriteria: '기준①,②',
          contents: [
            '운영규정에 11개 법정 항목 포함 여부 확인',
            '종사자 면담을 통해 직원회의 참석 여부 및 안건 논의 사실 확인',
          ],
        },
      ],
      legalBasis: {
        lawName: '노인복지법 시행규칙',
        article: '제29조(장기요양기관의 운영기준)',
        text: '장기요양기관은 운영규정을 제정하고 종사자와 수급자에게 공지하여야 한다.',
      },
    },
  },
  {
    number: 2,
    code: '방문요양 2',
    title: '종사자 채용 및 결격사유 조회',
    score: 3,
    cycle: '채용 시마다',
    category: 'staff',
    applicableServices: ['요', '목', '간'],
    isRecordTarget: true,
    isTrackingEnabled: true,
    evalMethodType: '기록, 전산',
    totalTargetCount: 10,
    completedCount: 9,
    mustHaveForms: ['요양보호사 자격증 사본', '성범죄/노인학대 범죄경력조회 회보서', '채용건강검진서', '근로계약서'],
    dangerCheck: '근무 시작 전 범죄경력 조회를 미실시하고 근무를 먼저 시작한 경우 법령 위반 및 불인정',
    missingList: [
      {
        id: 'm-2-1',
        targetName: '한소희 요양보호사',
        targetSub: '2026.01 입사',
        services: ['요', '목'],
        manager: '최지영 (시설장)',
        missingDocName: '채용 건강검진 판정서 (잠복결핵 검진 포함)',
        reason: '입사 시 범죄경력 조회는 완료되었으나 채용건강검진 판정서 원본 제출이 지연됨',
        deadline: '검진 결과서 원본 서류철 편철 필요',
        isFixed: false,
      },
    ],
    originalManual: {
      indicatorCode: '방문요양 2',
      indicatorTitle: '종사자 채용 및 관리',
      indicatorSubtitle: '적법한 자격과 절차를 거쳐 종사자를 채용하고 관리합니다.',
      score: 3,
      serviceType: '기관 운영',
      targetTypes: ['요', '목', '간'],
      direction: '적합한 자격을 갖춘 종사자를 채용하고 법정 결격사유 조회를 준수하여 수급자에게 안전한 서비스를 제공하는지 평가합니다.',
      criteriaRows: [
        {
          no: '①',
          target: '기관',
          content: '종사자 채용 시 자격증 확인 및 결격사유(성범죄, 노인학대 범죄경력)를 근무개시 전 조회한다.',
          method: '기록, 전산',
          score: 2,
        },
        {
          no: '②',
          target: '기관',
          content: '채용 건강검진을 실시하고 근로계약서를 체결하여 교부한다.',
          method: '기록',
          score: 1,
        },
      ],
      effectivePeriod: '2024.1월 ~ 평가일',
      effectivePeriodNotes: ['입사일 이전 범죄경력 조회 회보서 발급 일자 필수 확인'],
      verificationDetails: [
        {
          targetCriteria: '기준①,②',
          contents: [
            '노인복지법 제39조의17에 따른 노인학대관련범죄 경력조회 확인',
            '근로기준법에 따른 근로조건(임금, 근로시간, 휴일 등)이 명시된 근로계약서 1부 근로자 교부 여부 확인',
          ],
        },
      ],
      legalBasis: {
        lawName: '노인복지법',
        article: '제39조의17(노인관련기관 취업제한 등)',
        text: '노인관련기관의 장은 그 기관에 취업 중이거나 취업하려는 사람에 대하여 노인학대관련범죄 경력을 확인하여야 한다.',
      },
    },
  },
  {
    number: 3,
    code: '방문요양 3',
    title: '종사자 정기 건강검진 및 복리후생',
    score: 3,
    cycle: '연 1회',
    category: 'staff',
    applicableServices: ['요', '목', '간'],
    isRecordTarget: true,
    isTrackingEnabled: true,
    evalMethodType: '기록, 전산',
    totalTargetCount: 10,
    completedCount: 9,
    mustHaveForms: ['일반건강검진 결과통보서', '4대 사회보험 가입증명', '퇴직연금(퇴직금) 적립내역'],
    dangerCheck: '당해연도 일반건강검진 대상자가 검진을 받지 않은 경우(미수검) 불인정 감점',
    missingList: [
      {
        id: 'm-3-1',
        targetName: '오세훈 요양보호사',
        targetSub: '2025년도 검진 대상',
        services: ['요'],
        manager: '최지영 (시설장)',
        missingDocName: '2025년 국민건강보험 일반건강검진 결과표',
        reason: '짝수년도 출생자로서 일반검진 수검표가 기관에 미제출됨',
        deadline: '국민건강보험공단 건강검진 결과서 제출 요청',
        isFixed: false,
      },
    ],
    originalManual: {
      indicatorCode: '방문요양 3',
      indicatorTitle: '종사자 복리후생',
      indicatorSubtitle: '종사자의 건강보호와 법정 복리후생을 성실히 보장합니다.',
      score: 3,
      serviceType: '기관 운영',
      targetTypes: ['요', '목', '간'],
      direction: '종사자의 건강검진 실시 및 4대 보험, 퇴직급여 보장을 통해 안정적 근로여건을 조성하는지 평가합니다.',
      criteriaRows: [
        {
          no: '①',
          target: '기관',
          content: '모든 종사자가 연 1회(비사무직) 이상 건강검진을 받도록 관리한다.',
          method: '기록',
          score: 1.5,
        },
        {
          no: '②',
          target: '기관',
          content: '4대 사회보험에 가입하고 퇴직연금(퇴직금)을 적법하게 적립한다.',
          method: '기록, 전산',
          score: 1.5,
        },
      ],
      effectivePeriod: '2024.1월 ~ 평가일',
      effectivePeriodNotes: ['건강검진 결과표 및 4대보험 완납증명서 확인'],
      verificationDetails: [
        {
          targetCriteria: '기준①,②',
          contents: [
            '국민건강보험공단 일반건강검진 수검 여부 확인',
            '퇴직연금 납입 영수증 또는 퇴직적립금 통장 잔고 확인',
          ],
        },
      ],
      legalBasis: {
        lawName: '산업안전보건법',
        article: '제129조(일반건강진단)',
        text: '사업주는 상시 사용하는 근로자의 건강관리를 위하여 건강진단을 실시하여야 한다.',
      },
    },
  },
  {
    number: 4,
    code: '방문요양 4',
    title: '종사자 필수 5대 법정 교육',
    score: 4,
    cycle: '연 1회 이상',
    category: 'staff',
    applicableServices: ['요', '목', '간'],
    isRecordTarget: true,
    isTrackingEnabled: true,
    evalMethodType: '기록, 전산',
    totalTargetCount: 10,
    completedCount: 8,
    mustHaveForms: ['노인학대예방 및 인권교육일지', '근골격계/감염/개인정보 교육일지', '자필 서명부', '교육 사진'],
    dangerCheck: '교육 참석자 명단에 대리 서명 의심 또는 교육 사진 미첨부 시 불인정',
    missingList: [
      {
        id: 'm-4-1',
        targetName: '강민준 요양보호사',
        targetSub: '방문요양 전담',
        services: ['요', '목'],
        manager: '김철호 (사회복지사)',
        missingDocName: '2025년도 노인학대예방 및 인권교육 참석 자필 서명부',
        reason: '집합교육 당일 방문 일정으로 불참 후 개별 보충교육 일지 자필 서명이 누락됨',
        deadline: '개별 보충교육 실시 및 자필 서명 날인 필요',
        isFixed: false,
      },
    ],
    originalManual: {
      indicatorCode: '방문요양 4',
      indicatorTitle: '종사자 교육',
      indicatorSubtitle: '종사자의 직무역량과 인권 감수성 향상을 위해 정기적인 교육을 실시합니다.',
      score: 4,
      serviceType: '기관 운영',
      targetTypes: ['요', '목', '간'],
      direction: '종사자를 대상으로 법정 의무교육 및 직무교육을 실시하여 서비스 질을 제고하고 있는지 평가합니다.',
      criteriaRows: [
        {
          no: '①',
          target: '기관',
          content: '노인인권 및 노인학대 예방교육을 연 1회 이상 전 직원을 대상으로 실시한다.',
          method: '기록',
          score: 2,
        },
        {
          no: '②',
          target: '기관',
          content: '감염예방, 개인정보보호, 근골격계질환 예방, 성희롱예방 교육을 연 1회 이상 실시한다.',
          method: '기록',
          score: 2,
        },
      ],
      effectivePeriod: '2024.1월 ~ 평가일',
      effectivePeriodNotes: ['교육일지, 참석자 자필 서명부, 교육 사진 및 교재 필수 구비'],
      verificationDetails: [
        {
          targetCriteria: '기준①,②',
          contents: [
            '교육일지에 교육일시, 장소, 강사, 교육내용이 명시되어 있어야 함',
            '참석자 명단에 참석자 본인의 자필 서명이 누락되지 않아야 함',
          ],
        },
      ],
      legalBasis: {
        lawName: '노인복지법',
        article: '제39조의6(노인학대 신고의무와 절차 등)',
        text: '장기요양기관의 장 및 종사자는 노인학대 예방 및 신고의무에 관한 교육을 매년 1시간 이상 이수하여야 한다.',
      },
    },
  },
  {
    number: 5,
    code: '방문요양 5',
    title: '종사자 안전 및 건강관리 (독감접종·보호장구)',
    score: 2,
    cycle: '연 1회 (유행 전)',
    category: 'staff',
    applicableServices: ['요', '목', '간'],
    isRecordTarget: true,
    isTrackingEnabled: true,
    evalMethodType: '기록, 전산',
    totalTargetCount: 10,
    completedCount: 8,
    mustHaveForms: ['독감(인플루엔자) 예방접종 확인서/영수증', '독감 미접종 사유서(해당자)', '안전보호장구(마스크·장갑 등) 지급대장', '감염 및 안전예방 지침'],
    dangerCheck: '독감 예방접종은 유행 전(통상 10~12월)에 접종을 완료해야 인정되며, 미접종 종사자는 의학적 사유서나 미접종 사유서를 반드시 구비해야 합니다. 보호장구 지급대장에 수령자 자필 서명이 누락되면 불인정 감점 처리됩니다.',
    missingList: [
      {
        id: 'm-5-1',
        targetName: '정미경 요양보호사',
        targetSub: '방문요양 전담 (2025.10 접종대상)',
        services: ['요', '목'],
        manager: '최지영 (시설장)',
        missingDocName: '2025년도 인플루엔자(독감) 예방접종 증명서(또는 미접종 사유서)',
        reason: '개인 사정으로 접종 후 병원 영수증/확인서가 기관에 미제출됨',
        deadline: '예방접종 증명서 원본 서류철 편철 필요',
        isFixed: false,
      },
      {
        id: 'm-5-2',
        targetName: '안전보호장구 지급대장',
        targetSub: '2026년 상반기 정기 지급',
        services: ['요', '목', '간'],
        manager: '윤서연 (사회복지사)',
        missingDocName: '마스크 및 위생장갑 수령 확인 자필 서명부',
        reason: '물품 배부는 완료되었으나 요양보호사 2명의 수령 확인 서명이 누락됨',
        deadline: '수령 확인 자필 서명 보완',
        isFixed: false,
      },
    ],
    originalManual: {
      indicatorCode: '방문요양 5',
      indicatorTitle: '종사자 안전 및 보건',
      indicatorSubtitle: '종사자의 감염병 예방과 안전한 서비스 제공을 위해 독감접종 및 보호용품을 지원합니다.',
      score: 2,
      serviceType: '기관 운영',
      targetTypes: ['요', '목', '간'],
      direction: '종사자의 건강보호 및 감염병 전파 방지를 위해 인플루엔자 예방접종을 지원하고, 안전보호용품을 정기적으로 지급·관리하는지 평가합니다.',
      criteriaRows: [
        {
          no: '①',
          target: '기관',
          content: '모든 종사자를 대상으로 인플루엔자(독감) 예방접종을 실시하거나 지원한다.',
          method: '기록',
          score: 1,
        },
        {
          no: '②',
          target: '기관',
          content: '종사자에게 마스크, 장갑 등 안전보호장구를 주기적으로 지급하고 대장을 관리한다.',
          method: '기록',
          score: 1,
        },
      ],
      effectivePeriod: '2024.1월 ~ 평가일',
      effectivePeriodNotes: ['인플루엔자 유행 전 접종 여부 및 보호장구 지급대장 서명 확인'],
      verificationDetails: [
        {
          targetCriteria: '기준①,②',
          contents: [
            '인플루엔자 국가예방접종 기간(또는 자체 접종 지원) 접종 확인서/영수증 전수 대사',
            '미접종자의 경우 기저질환, 알레르기, 개인거부 등의 사유가 명시된 미접종 사유서 확인',
            '안전보호장구(일회용 장갑, KF94 마스크, 손소독제 등)의 정기적 지급 및 수령자 자필 서명부 확인',
          ],
        },
      ],
      legalBasis: {
        lawName: '산업안전보건법',
        article: '제128조의2(감염병 예방조치 등)',
        text: '사업주는 근로자가 감염병에 걸릴 우려가 있는 업무를 수행하는 경우 예방접종 지원 및 보호용품 지급 등 필요한 조치를 하여야 한다.',
      },
    },
  },
  {
    number: 6,
    code: '방문요양 6',
    title: '종사자 처우개선 및 고충처리',
    score: 3,
    cycle: '상시 (면담 평가)',
    category: 'staff',
    applicableServices: ['요', '목', '간'],
    isRecordTarget: false,
    isTrackingEnabled: true,
    evalMethodType: '면담',
    totalTargetCount: 10,
    completedCount: 10,
    mustHaveForms: [],
    noRecordNotice: '본 지표는 ERP 서식 관리가 아닌 요양보호사 대상 [현장 유선/대면 면담]으로 평가됩니다. 기관에 건의사항이나 애로사항을 전달하는 절차를 직원이 명확히 알고 있어야 합니다.',
    dangerCheck: '공단 평가관 무작위 면담 시 요양보호사가 고충처리 창구(함/상담)를 전혀 모르거나, 기관장에게 이야기해도 묵살당한다고 답변할 경우 불인정 감점됩니다.',
    missingList: [],
    originalManual: {
      indicatorCode: '방문요양 6',
      indicatorTitle: '종사자 고충처리',
      indicatorSubtitle: '종사자의 근무환경 개선과 고충 해소를 위한 체계를 운영합니다.',
      score: 3,
      serviceType: '기관 운영',
      targetTypes: ['요', '목', '간'],
      direction: '종사자의 근로 의욕을 고취하고 인권을 보호하기 위해 고충처리 절차를 마련하고 성실히 이행하는지 평가합니다.',
      criteriaRows: [
        {
          no: '①',
          target: '직원',
          content: '기관은 종사자의 고충을 접수하고 처리하는 절차를 운영하며 직원이 이를 인지하고 있다.',
          method: '면담',
          score: 1.5,
        },
        {
          no: '②',
          target: '직원',
          content: '접수된 고충에 대해 기관장이 면담하고 적절한 조치를 취한다.',
          method: '면담',
          score: 1.5,
        },
      ],
      effectivePeriod: '평가 당일',
      effectivePeriodNotes: ['종사자 유선/대면 무작위 표본 면담 실시'],
      verificationDetails: [
        {
          targetCriteria: '기준①,②',
          contents: [
            '요양보호사 면담: "근무 중 힘든 점이나 수급자 보호자와의 갈등이 있을 때 기관장에게 어떻게 이야기하시나요?"',
            '고충 건의 후 실제 처리 및 피드백 여부 확인',
          ],
        },
      ],
      legalBasis: {
        lawName: '근로기준법',
        article: '제76조의2(직장 내 괴롭힘의 금지)',
        text: '사용자는 직장에서의 지위 또는 관계 등의 우위를 이용하여 업무상 적정범위를 넘어 다른 근로자에게 신체적·정신적 고통을 주어서는 아니 된다.',
      },
    },
  },
  {
    number: 7,
    code: '방문요양 7',
    title: '요양보호사 업무범위 준수',
    score: 2,
    cycle: '상시 (면담 평가)',
    category: 'staff',
    applicableServices: ['요', '목', '간'],
    isRecordTarget: false,
    isTrackingEnabled: true,
    evalMethodType: '면담',
    totalTargetCount: 10,
    completedCount: 10,
    mustHaveForms: [],
    noRecordNotice: '본 지표는 서류가 아닌 요양보호사 및 수급자 대상 [구두 면담]으로 평가됩니다. 요양보호사가 법정 업무범위(신체활동, 가사 및 일상생활지원, 인지활동 등) 이외의 부당한 업무(가족을 위한 가사, 영업행위 등)를 수행하지 않는지 확인합니다.',
    dangerCheck: '수급자 면담 시 수급자 본인이 아닌 가족 구성원만을 위한 식사 준비나 김장/대청소 등을 요구하여 요양보호사가 수행한 사실이 확인되면 불인정 처리됩니다.',
    missingList: [],
    originalManual: {
      indicatorCode: '방문요양 7',
      indicatorTitle: '업무범위 준수',
      indicatorSubtitle: '요양보호사의 적정 업무 범위를 준수하여 전문적 서비스를 제공합니다.',
      score: 2,
      serviceType: '기관 운영',
      targetTypes: ['요', '목', '간'],
      direction: '요양보호사가 규정된 직무 범위를 벗어난 부당한 노동을 하지 않도록 보호하고 적정 급여를 제공하는지 평가합니다.',
      criteriaRows: [
        {
          no: '①',
          target: '직원/수급자',
          content: '요양보호사는 수급자 본인만을 위한 장기요양급여 업무 범위 내 서비스를 제공한다.',
          method: '면담',
          score: 2,
        },
      ],
      effectivePeriod: '평가 당일',
      effectivePeriodNotes: ['수급자(보호자) 및 요양보호사 대면/유선 면담'],
      verificationDetails: [
        {
          targetCriteria: '기준①',
          contents: [
            '수급자 가족만을 위한 식사준비, 빨래, 청소 등 부당요구 여부 질의',
            '기관에서 수급자 계약 시 업무범위 사전 안내 여부 확인',
          ],
        },
      ],
      legalBasis: {
        lawName: '노인장기요양보험법',
        article: '제28조의2(급여제공의 제한)',
        text: '장기요양기관 및 요양보호사는 수급자의 가족만을 위한 행위 등 부당한 급여를 제공하여서는 아니 된다.',
      },
    },
  },

  // ── 3. 기관운영 및 안전 지표 ───────────────────────────────────────────────
  {
    number: 8,
    code: '방문요양 8',
    title: '시설기준 및 환경위생 관리',
    score: 4,
    cycle: '상시 (현장 실사)',
    category: 'operation',
    applicableServices: ['요', '목', '간'],
    isRecordTarget: false,
    isTrackingEnabled: true,
    evalMethodType: '현장, 관찰',
    totalTargetCount: 1,
    completedCount: 1,
    mustHaveForms: [],
    noRecordNotice: '본 지표는 일상 전산 기록지 작성 대상이 아니며, 공단 평가관의 [사무실 현장 방문 실사 및 시설 환경 관찰]을 통해 법정 기준 충족 여부를 확인합니다.',
    dangerCheck: '사무실 내 수급자 급여제공 서류 잠금장치(캐비닛 잠금) 미비, 소화기 미비치 또는 충약 게이지 불량, 감염예방 소독용품(손소독제·마스크) 미비 시 즉시 불인정 처리됩니다.',
    missingList: [],
    originalManual: {
      indicatorCode: '방문요양 8',
      indicatorTitle: '시설환경 및 위생',
      indicatorSubtitle: '기관의 시설 설비 기준을 준수하고 청결하고 안전한 환경을 유지합니다.',
      score: 4,
      serviceType: '환경 및 안전',
      targetTypes: ['요', '목', '간'],
      direction: '기관 사무실 설비 및 소방·위생 안전 기준을 준수하여 쾌적하고 안전한 업무 환경을 유지하고 있는지 평가합니다.',
      criteriaRows: [
        {
          no: '①',
          target: '기관',
          content: '법정 전용 사무실 공간을 확보하고, 비밀보호를 위한 잠금장치가 있는 서류보관함을 구비한다.',
          method: '현장',
          score: 2,
        },
        {
          no: '②',
          target: '기관',
          content: '소화기 등 소방시설을 적정하게 비치하고 감염예방을 위한 위생용품을 구비한다.',
          method: '현장, 관찰',
          score: 2,
        },
      ],
      effectivePeriod: '평가 당일',
      effectivePeriodNotes: ['평가관 현장 실사'],
      verificationDetails: [
        {
          targetCriteria: '기준①,②',
          contents: [
            '사무실 내 통신설비, 집기, 잠금장치 캐비닛 설치 상태 확인',
            '소화기 점검표 부착 및 지침 게재 여부 확인',
          ],
        },
      ],
      legalBasis: {
        lawName: '노인장기요양보험법 시행규칙',
        article: '별표 1의2(장기요양기관의 시설 및 인력기준)',
        text: '방문요양기관은 전용면적 16.5㎡ 이상의 사무실과 업무에 필요한 설비 및 비품을 갖추어야 한다.',
      },
    },
  },
  {
    number: 9,
    code: '방문요양 9',
    title: '비상연락체계 및 응급상황 대응 훈련',
    score: 3,
    cycle: '연 1회 훈련',
    category: 'operation',
    applicableServices: ['요', '목', '간'],
    isRecordTarget: true,
    isTrackingEnabled: true,
    evalMethodType: '기록, 현장, 면담',
    totalTargetCount: 1,
    completedCount: 0,
    mustHaveForms: ['119·경찰서·협약병원 비상연락망', '응급상황 대응 매뉴얼', '연간 응급대응 모의훈련일지'],
    dangerCheck: '요양보호사 면담 시 응급상황(질식, 심정지 등) 대응 절차 미숙지 시 감점',
    missingList: [
      {
        id: 'm-9-1',
        targetName: '기관 공통 (전 직원)',
        targetSub: '행복요양 노원점',
        services: ['요', '목', '간'],
        manager: '최지영 (시설장)',
        missingDocName: '2025년도 하반기 응급상황 대응 모의훈련일지 및 사진',
        reason: '연 1회 의무 실시해야 하는 질식/심정지/화재 시 응급대응 모의훈련 일지가 누락됨',
        deadline: '응급대응 훈련 실시 및 훈련일지/사진 등록 필요',
        isFixed: false,
      },
    ],
    originalManual: {
      indicatorCode: '방문요양 9',
      indicatorTitle: '응급상황 대응',
      indicatorSubtitle: '응급상황 발생 시 신속하고 적절하게 대처할 수 있는 체계를 갖춥니다.',
      score: 3,
      serviceType: '환경 및 안전',
      targetTypes: ['요', '목', '간'],
      direction: '수급자에게 발생할 수 있는 질식, 낙상, 심정지 등 응급상황에 대한 신속 대응 체계를 평가합니다.',
      criteriaRows: [
        {
          no: '①',
          target: '기관',
          content: '응급상황 대응 지침을 수립하고 비상연락체계를 갖추고 있다.',
          method: '기록, 현장',
          score: 1.5,
        },
        {
          no: '②',
          target: '기관',
          content: '전 직원을 대상으로 연 1회 이상 응급상황 모의훈련을 실시한다.',
          method: '기록, 면담',
          score: 1.5,
        },
      ],
      effectivePeriod: '2024.1월 ~ 평가일',
      effectivePeriodNotes: ['훈련 사진, 훈련 일지 및 요양보호사 면담 확인'],
      verificationDetails: [
        {
          targetCriteria: '기준①,②',
          contents: [
            '응급처치 지침(기도폐쇄, 심폐소생술, 낙상 골절 등)이 사무실 및 요양보호사에게 공유되어 있는지 확인',
            '요양보호사 면담 시 응급상황 발생 시 행동요령 숙지 여부 확인',
          ],
        },
      ],
      legalBasis: {
        lawName: '노인장기요양보험법 시행규칙',
        article: '별표 1의2(장기요양기관의 시설 및 인력기준)',
        text: '장기요양기관은 수급자의 안전과 응급상황에 대비한 체계를 마련하여야 한다.',
      },
    },
  },
  {
    number: 10,
    code: '방문요양 10',
    title: '감염관리 및 소독·위생 점검',
    score: 3,
    cycle: '월 1회 점검',
    category: 'operation',
    applicableServices: ['요', '목', '간'],
    isRecordTarget: true,
    isTrackingEnabled: true,
    evalMethodType: '기록, 현장',
    totalTargetCount: 1,
    completedCount: 1,
    mustHaveForms: ['감염병 예방 관리지침', '사무실 소독점검대장', '위생방역 용품 구비대장'],
    dangerCheck: '월별 소독점검대장에 일괄 서명 또는 소독용품(체온계, 알코올 등) 유효기간 경과 시 불인정',
    missingList: [],
    originalManual: {
      indicatorCode: '방문요양 10',
      indicatorTitle: '감염예방 관리',
      indicatorSubtitle: '감염병 확산을 방지하고 철저한 위생관리 체계를 운영합니다.',
      score: 3,
      serviceType: '환경 및 안전',
      targetTypes: ['요', '목', '간'],
      direction: '수급자와 종사자의 감염병 예방을 위해 위생 점검과 방역물품을 철저히 관리하고 있는지 평가합니다.',
      criteriaRows: [
        {
          no: '①',
          target: '기관',
          content: '감염병 관리 지침을 수립하고 정기적인 소독과 위생 점검을 실시한다.',
          method: '기록, 현장',
          score: 1.5,
        },
        {
          no: '②',
          target: '기관',
          content: '종사자에게 마스크, 소독제 등 필수 위생용품을 주기적으로 지급한다.',
          method: '기록',
          score: 1.5,
        },
      ],
      effectivePeriod: '2024.1월 ~ 평가일',
      effectivePeriodNotes: ['소독대장 및 방역물품 지급 대장 확인'],
      verificationDetails: [
        {
          targetCriteria: '기준①,②',
          contents: [
            '월 1회 이상 정기 소독 및 점검 기록 확인',
            '요양보호사 대상 방역물품(마스크, 위생장갑, 손소독제) 배부 대장 대조',
          ],
        },
      ],
      legalBasis: {
        lawName: '감염병의 예방 및 관리에 관한 법률',
        article: '제49조(감염병의 예방 조치)',
        text: '장기요양기관은 감염병의 전파를 막기 위하여 소독 및 방역 조치를 성실히 이행하여야 한다.',
      },
    },
  },
  {
    number: 24,
    code: '방문요양 24',
    title: '사업계획 및 예·결산 운영',
    score: 3,
    cycle: '연 1회',
    category: 'operation',
    applicableServices: ['요', '목', '간'],
    isRecordTarget: true,
    isTrackingEnabled: true,
    evalMethodType: '기록, 전산',
    totalTargetCount: 1,
    completedCount: 1,
    mustHaveForms: ['연간 세입·세출 예산서', '사업계획서', '전년도 세입·세출 결산서', 'W4C 지자체 보고 내역'],
    dangerCheck: '지자체 W4C 전산에 법정 기한 내 예산서/결산서 미보고 또는 사업실적 미평가 시 불인정',
    missingList: [],
    originalManual: {
      indicatorCode: '방문요양 24',
      indicatorTitle: '사업계획 및 결산',
      indicatorSubtitle: '투명한 재정 운영과 체계적인 사업계획을 수립·이행합니다.',
      score: 3,
      serviceType: '기관 운영',
      targetTypes: ['요', '목', '간'],
      direction: '기관의 사업계획과 예산·결산 수립 및 지자체 보고를 법정 기한 내 투명하게 이행하였는지 평가합니다.',
      criteriaRows: [
        {
          no: '①',
          target: '기관',
          content: '연간 사업계획서 및 세입·세출 예산서를 수립하여 회계연도 개시 전 지자체에 보고한다.',
          method: '기록, 전산',
          score: 1.5,
        },
        {
          no: '②',
          target: '기관',
          content: '전년도 사업실적 평가 및 세입·세출 결산서를 작성하여 기한 내 지자체에 보고한다.',
          method: '기록, 전산',
          score: 1.5,
        },
      ],
      effectivePeriod: '2024.1월 ~ 평가일',
      effectivePeriodNotes: ['사회복지시설정보시스템(W4C) 보고 공문 확인'],
      verificationDetails: [
        {
          targetCriteria: '기준①,②',
          contents: [
            '사업계획서 상의 목표와 세부 사업 내용 검토',
            '지자체 승인/보고 내역 일치 여부 확인',
          ],
        },
      ],
      legalBasis: {
        lawName: '사회복지법인 및 사회복지시설 재무·회계 규칙',
        article: '제10조(예산의 편성) 및 제19조(결산서의 작성)',
        text: '시설의 장은 매 회계연도의 예산과 결산서를 작성하여 시장·군수·구청장에게 제출하여야 한다.',
      },
    },
  },
  {
    number: 25,
    code: '방문요양 25',
    title: '정보제공 및 급여비용 청구·영수증 발급',
    score: 3,
    cycle: '월 1회 (청구 시)',
    category: 'operation',
    applicableServices: ['요', '목', '간'],
    isRecordTarget: true,
    isTrackingEnabled: true,
    evalMethodType: '기록, 전산, 면담',
    totalTargetCount: 1,
    completedCount: 1,
    mustHaveForms: ['장기요양급여비용 명세서 및 영수증 교부대장', '본인부담금 수납통장/영수증 부본', '비급여 대상 및 비용 고지문'],
    dangerCheck: '본인부담금을 감면·면제하거나 영수증 미발급 또는 발급대장 수령확인 서명 누락 시 불인정 감점',
    missingList: [],
    originalManual: {
      indicatorCode: '방문요양 25',
      indicatorTitle: '정보제공 및 급여비용 청구',
      indicatorSubtitle: '수급자에게 급여비용 내역을 투명하게 제공하고 정당하게 청구·수납합니다.',
      score: 3,
      serviceType: '기관 운영',
      targetTypes: ['요', '목', '간'],
      direction: '장기요양급여비용을 관련 법령에 따라 공정하게 청구하고 본인부담금 수납명세서 및 영수증을 교부하는지 평가합니다.',
      criteriaRows: [
        {
          no: '①',
          target: '기관',
          content: '급여비용 청구명세서 및 본인부담금 영수증을 매월 수급자(보호자)에게 교부하고 확인을 받는다.',
          method: '기록',
          score: 1.5,
        },
        {
          no: '②',
          target: '기관',
          content: '본인부담금을 법정 기준에 맞게 수납하고 일체의 불법 유인·알선이나 본인부담금 감면을 하지 않는다.',
          method: '기록, 면담',
          score: 1.5,
        },
      ],
      effectivePeriod: '2024.1월 ~ 평가일',
      effectivePeriodNotes: ['월별 급여비용 영수증 교부대장 및 수납통장 내역 확인'],
      verificationDetails: [
        {
          targetCriteria: '기준①,②',
          contents: [
            '급여비용 명세서 및 본인일부부담금 영수증(별지 제24호 서식) 발급 대장 확인',
            '본인부담금 계좌입금 내역 대조 및 수급자 면담을 통한 본인부담금 감면 여부 점검',
          ],
        },
      ],
      legalBasis: {
        lawName: '노인장기요양보험법',
        article: '제40조(본인부담금) 및 제42조(영수증의 발급)',
        text: '장기요양기관은 급여비용을 수납한 때에는 본인부담금 영수증을 발급하여야 하며, 본인부담금을 감경하거나 면제하는 행위를 하여서는 아니 된다.',
      },
    },
  },
  {
    number: 26,
    code: '방문요양 26',
    title: '자체평가 및 서비스 질 향상 (CQI)',
    score: 3,
    cycle: '연 1회',
    category: 'operation',
    applicableServices: ['요', '목', '간'],
    isRecordTarget: true,
    isTrackingEnabled: true,
    evalMethodType: '기록, 전산',
    totalTargetCount: 1,
    completedCount: 1,
    mustHaveForms: ['연간 기관 자체평가표', '서비스 질 개선 계획서 및 결과보고서', '우수사례 및 개선조치 회의록'],
    dangerCheck: '자체평가만 실시하고 구체적인 서비스 질 개선(CQI) 계획 및 사후 조치 결과보고서가 없을 경우 불인정',
    missingList: [],
    originalManual: {
      indicatorCode: '방문요양 26',
      indicatorTitle: '자체평가 및 질 향상',
      indicatorSubtitle: '정기적인 자체평가를 통해 서비스 질을 점검하고 개선 방안을 적극 이행합니다.',
      score: 3,
      serviceType: '기관 운영',
      targetTypes: ['요', '목', '간'],
      direction: '기관 스스로 정기적인 업무 점검 및 서비스 질 평가를 수행하고, 도출된 문제점에 대한 개선활동(CQI)을 전개하는지 평가합니다.',
      criteriaRows: [
        {
          no: '①',
          target: '기관',
          content: '연 1회 이상 공단 평가 기준에 준하여 기관 자체평가를 실시한다.',
          method: '기록',
          score: 1.5,
        },
        {
          no: '②',
          target: '기관',
          content: '자체평가 결과를 바탕으로 서비스 질 향상 계획을 수립하고 개선 결과를 환류(피드백)한다.',
          method: '기록',
          score: 1.5,
        },
      ],
      effectivePeriod: '2024.1월 ~ 평가일',
      effectivePeriodNotes: ['연간 자체평가표 및 질 개선(CQI) 결과보고서 확인'],
      verificationDetails: [
        {
          targetCriteria: '기준①,②',
          contents: [
            '전년도 자체평가 총괄표 및 지표별 달성도 분석 확인',
            '개선 필요 항목에 대한 조치 결과보고서 및 종사자 회의록 대조',
          ],
        },
      ],
      legalBasis: {
        lawName: '노인장기요양보험법',
        article: '제60조(장기요양기관에 대한 평가)',
        text: '공단은 장기요양기관의 장기요양급여 수준을 향상시키기 위하여 정기적으로 평가를 실시하고 그 결과를 공개하여야 한다.',
      },
    },
  },
]

// ─── Main Component ───────────────────────────────────────────────────────────

interface Props {
  onBackToBeneficiaries?: () => void
}

export default function EvaluationManualPage({ onBackToBeneficiaries }: Props) {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('beneficiary')
  const [selectedIndicatorNum, setSelectedIndicatorNum] = useState<number>(11)
  const [detailTab, setDetailTab] = useState<'checklist' | 'interpretation' | 'official'>('checklist')
  const [indicators, setIndicators] = useState<CategoryIndicator[]>(INITIAL_INDICATORS)
  const [openedManualModal, setOpenedManualModal] = useState<OriginalManualData | null>(null)
  const [isAllManualModalOpen, setIsAllManualModalOpen] = useState<boolean>(false)
  const [selectedRevisionYear, setSelectedRevisionYear] = useState<'2024-2026' | '2021-2023' | '2018-2020'>('2024-2026')
  const [allManualSelectedNum, setAllManualSelectedNum] = useState<number>(11)
  const [allManualSearch, setAllManualSearch] = useState<string>('')
  const [allManualCatFilter, setAllManualCatFilter] = useState<'all' | CategoryType>('all')

  // 개정버전 변경 시 지표 목록 업데이트
  useEffect(() => {
    if (selectedRevisionYear === '2024-2026') {
      setIndicators(INITIAL_INDICATORS)
    } else {
      setIndicators([]) // 과거 버전 데이터가 없을 경우 빈 배열 처리
    }
  }, [selectedRevisionYear])

  // 카테고리별 필터링
  const currentCategoryIndicators = indicators.filter(ind => ind.category === activeCategory)
  const currentIndicator = indicators.find(ind => ind.number === selectedIndicatorNum) ?? currentCategoryIndicators[0]

  // 카테고리 탭 변경 핸들러
  const handleCategoryChange = (newCat: CategoryType) => {
    setActiveCategory(newCat)
    const firstInd = indicators.find(i => i.category === newCat)
    if (firstInd) {
      setSelectedIndicatorNum(firstInd.number)
    }
  }

  // 지표별 점검 관리 여부 ON/OFF 토글
  const handleToggleIndicatorTracking = (indNum: number) => {
    setIndicators(prev =>
      prev.map(ind =>
        ind.number === indNum
          ? { ...ind, isTrackingEnabled: !ind.isTrackingEnabled }
          : ind
      )
    )
  }

  // 개별 누락 대상자 완료/누락 토글 처리 (저장 및 실시간 반영)
  const handleToggleMissingItem = (itemId: string) => {
    setIndicators(prev =>
      prev.map(ind => {
        const hasItem = ind.missingList.some(m => m.id === itemId)
        if (!hasItem) return ind

        const updatedList = ind.missingList.map(m =>
          m.id === itemId ? { ...m, isFixed: !m.isFixed } : m
        )
        const fixedCount = updatedList.filter(m => m.isFixed).length
        // 기본 완료 수 + 보완된 수
        const baseCompleted = ind.totalTargetCount - ind.missingList.length
        const newCompleted = Math.min(ind.totalTargetCount, baseCompleted + fixedCount)

        return {
          ...ind,
          missingList: updatedList,
          completedCount: newCompleted,
        }
      })
    )
  }

  // 누락 통계 집계 (점검 관리가 활성화된 지표만 집계)
  const totalMissingCount = indicators.reduce((acc, curr) => {
    if (curr.isTrackingEnabled === false) return acc
    return acc + curr.missingList.filter(m => !m.isFixed).length
  }, 0)

  const beneficiaryMissingCount = indicators
    .filter(i => i.category === 'beneficiary' && i.isTrackingEnabled !== false)
    .reduce((acc, curr) => acc + curr.missingList.filter(m => !m.isFixed).length, 0)

  const staffMissingCount = indicators
    .filter(i => i.category === 'staff' && i.isTrackingEnabled !== false)
    .reduce((acc, curr) => acc + curr.missingList.filter(m => !m.isFixed).length, 0)

  const operationMissingCount = indicators
    .filter(i => i.category === 'operation' && i.isTrackingEnabled !== false)
    .reduce((acc, curr) => acc + curr.missingList.filter(m => !m.isFixed).length, 0)

  return (
    <div className="flex-1 flex flex-col h-full bg-[#e8ecf2] overflow-hidden text-[#0e1225] font-['Pretendard',sans-serif]">
      {/* ── 1. 상단 통합 툴바 (h-[56px] 헤더) ─────────────────────────────────── */}
      <header className="bg-white h-[56px] border-b border-[#c2cfdf] px-5 flex items-center justify-between shrink-0 shadow-2xs z-10">
        {/* 좌측: 타이틀 인디케이터 + 카테고리 세그먼트 탭 */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2.5 pr-3 border-r border-[#cbd5e1]">
            <span className="w-[4px] h-[18px] bg-[#ef5a27] inline-block rounded-[1.5px] shrink-0" />
            <h1 className="text-[16.5px] font-extrabold text-[#0e1225] inline-flex items-center gap-2 leading-none tracking-[-0.3px] whitespace-nowrap">
              평가 지표별 점검
            </h1>
            <span className="h-[22px] px-2 inline-flex items-center justify-center bg-[#2a3461] text-white text-[12px] font-extrabold rounded-[4px] leading-none whitespace-nowrap">
              {indicators.length}개 지표
            </span>
          </div>

          {/* 카테고리 3대 탭 (Figma Segment_toggle 스타일) */}
          <div className="flex items-center gap-0.5 bg-[#f1f5f9] p-[3px] rounded-[8px] h-[36px] border border-[#cbd5e1]">
            {[
              { id: 'beneficiary' as CategoryType, label: '수급자 관리', count: indicators.filter(i => i.category === 'beneficiary').length, missing: beneficiaryMissingCount },
              { id: 'staff' as CategoryType, label: '종사자 관리', count: indicators.filter(i => i.category === 'staff').length, missing: staffMissingCount },
              { id: 'operation' as CategoryType, label: '기관운영·안전', count: indicators.filter(i => i.category === 'operation').length, missing: operationMissingCount },
            ].map(cat => {
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`h-full px-3.5 rounded-[5px] text-[14px] flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${isActive
                    ? 'font-bold bg-[#2a3461] text-white shadow-sm'
                    : 'font-bold text-[#64748b] hover:text-[#0e1225] hover:bg-black/5'
                    }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`h-[18px] px-1.5 inline-flex items-center justify-center text-[11.5px] font-bold rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-[#e2e8f0] text-[#475569]'
                      }`}
                  >
                    {cat.count}
                  </span>
                  {cat.missing > 0 && (
                    <span
                      className={`h-[18px] px-1.5 inline-flex items-center justify-center text-[11.5px] font-bold rounded-full ${isActive ? 'bg-[#e23a32] text-white' : 'bg-[#fee2e2] text-[#dc2626]'
                        }`}
                    >
                      {cat.missing}건 누락
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* 우측 액션: 전체 누락 요약 뱃지 + 전체 평가매뉴얼 확인 버튼 */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#fff1f2] border border-[#fecdd3] px-3 py-1.5 rounded-[6px] shadow-2xs">
            <span className="size-[8px] rounded-full bg-[#e11d48] shrink-0 animate-pulse" />
            <span className="text-[13px] text-[#4c0519] font-bold">전체 누락 서류:</span>
            <strong className="text-[15px] text-[#e11d48] font-black">{totalMissingCount}건</strong>
          </div>

          {/* 개정버전 선택 셀렉트 박스 */}
          <select
            value={selectedRevisionYear}
            onChange={(e) => setSelectedRevisionYear(e.target.value as any)}
            className="h-[34px] px-2.5 text-[13.5px] font-bold text-[#0e1225] border border-[#cbd5e1] rounded-[6px] outline-none focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a] bg-white cursor-pointer shadow-2xs"
          >
            <option value="2024-2026">2024-2026 개정판</option>
            <option value="2021-2023">2021-2023 개정판</option>
            <option value="2018-2020">2018-2020 개정판</option>
          </select>

          {/* 전체 매뉴얼 원문 고시 열람 버튼 */}
          <Button
            type="Sub"
            size="Medium"
            icon="Pdf"
            onClick={() => {
              setAllManualSelectedNum(selectedIndicatorNum)
              setIsAllManualModalOpen(true)
            }}
            title="공단 노인장기요양기관 평가매뉴얼 전체 고시 열람"
          >
            평가매뉴얼
          </Button>
        </div>
      </header>

      {/* ── 2. 메인 2단 분할 레이아웃 ────────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden p-2.5 gap-2.5">
        {/* ── 좌측 패널 (38% 너비): 지표 목록 테이블 ──────────────────────── */}
        <div className="w-[38%] min-w-[380px] bg-white border border-[#c2cfdf] flex flex-col overflow-hidden shadow-xs rounded-[4px]">
          {/* 패널 헤더 */}
          <div className="p-3 border-b border-[#c2cfdf] bg-[#fafbfc] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <h2 className="text-[16px] font-bold text-[#0e1225] inline-flex items-center gap-1.5 leading-none">
                <span className="w-[3.5px] h-[15px] bg-[#ef5a27] inline-block rounded-[1px] shrink-0" />
                {activeCategory === 'beneficiary' ? '수급자' : activeCategory === 'staff' ? '종사자' : '기관운영'} 지표 목록
              </h2>
              <span className="h-[22px] px-2 inline-flex items-center justify-center bg-[#2a3461] text-white text-[12px] font-bold rounded-[4px] leading-none whitespace-nowrap">
                {currentCategoryIndicators.length}개
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[12.5px] text-[#475569] font-bold bg-[#f1f5f9] px-2 py-1 rounded-[4px] border border-[#e2e8f0]">
              <span>대상급여:</span>
              <ServiceTagBadge service="요" size="medium" />
              <ServiceTagBadge service="목" size="medium" />
              <ServiceTagBadge service="간" size="medium" />
            </div>
          </div>

          {/* 지표 테이블 */}
          <div className="flex-1 overflow-auto px-3 py-2">
            <div className="border border-[#c2cfdf] rounded-[4px] overflow-hidden bg-white">
              <table className="w-full border-collapse text-[13px]" style={{ minWidth: 360 }}>
                <thead className="sticky top-0 z-10">
                  <tr className="bg-[#f4f7fc] text-[#334155] border-b border-[#c2cfdf]">
                    <th className="h-[38px] px-2.5 text-center font-bold whitespace-nowrap border-r border-[#c2cfdf] w-[75px] text-[13.5px]">
                      <span className="flex items-center justify-between gap-1">
                        <span>코드</span>
                        <span className="text-[10px] text-[#8a9cb4]">↕</span>
                      </span>
                    </th>
                    <th className="h-[38px] px-2.5 text-left font-bold whitespace-nowrap border-r border-[#c2cfdf] text-[13.5px]">
                      <span className="flex items-center justify-between gap-1">
                        <span>지표명 / 급여유형</span>
                        <span className="text-[10px] text-[#8a9cb4]">↕</span>
                      </span>
                    </th>
                    <th className="h-[38px] px-2 text-center font-bold whitespace-nowrap border-r border-[#c2cfdf] w-[50px] text-[13.5px]">
                      <span className="flex items-center justify-center gap-0.5">
                        <span>배점</span>
                        <span className="text-[10px] text-[#8a9cb4]">↕</span>
                      </span>
                    </th>
                    <th className="h-[38px] px-2 text-center font-bold whitespace-nowrap border-r border-[#c2cfdf] w-[80px] text-[13.5px]">
                      <span className="flex items-center justify-center gap-0.5">
                        <span>작성현황</span>
                        <span className="text-[10px] text-[#8a9cb4]">↕</span>
                      </span>
                    </th>
                    <th className="h-[38px] px-2 text-center font-bold whitespace-nowrap text-[13.5px]">
                      상태
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentCategoryIndicators.map((ind, idx) => {
                    const isSelected = (currentIndicator?.number ?? selectedIndicatorNum) === ind.number
                    const missingCnt = ind.missingList.filter(m => !m.isFixed).length
                    const isPerfect = ind.completedCount >= ind.totalTargetCount && missingCnt === 0
                    const isRecordTarget = ind.isRecordTarget !== false
                    const isTracking = ind.isTrackingEnabled !== false

                    return (
                      <tr
                        key={ind.number}
                        onClick={() => setSelectedIndicatorNum(ind.number)}
                        className={`cursor-pointer transition-colors border-b border-[#c2cfdf] last:border-b-0 ${isSelected
                          ? 'bg-[#d9ecff] font-semibold text-[#1e3a8a]'
                          : idx % 2 === 1
                            ? 'bg-[#fafbfc] hover:bg-[#f0f4fa]'
                            : 'bg-white hover:bg-[#f0f4fa]'
                          }`}
                      >
                        {/* 지표코드 */}
                        <td className="h-[46px] px-2 text-center border-r border-[#c2cfdf] whitespace-nowrap">
                          <span className="h-[24px] px-2 inline-flex items-center justify-center bg-[#2a3461] text-white text-[12px] font-bold rounded-[4px]">
                            {ind.code}
                          </span>
                        </td>

                        {/* 지표명 / 급여유형 태그 */}
                        <td className="h-[46px] px-2.5 border-r border-[#c2cfdf]">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[14.5px] font-bold text-[#0e1225] leading-tight truncate">
                              {ind.title}
                            </span>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <div className="flex items-center gap-0.5">
                                {ind.applicableServices.map(svc => (
                                  <ServiceTagBadge key={svc} service={svc} size="small" />
                                ))}
                              </div>
                              <span className="text-[11.5px] text-[#64748b]">· 주기: {ind.cycle}</span>
                            </div>
                          </div>
                        </td>

                        {/* 배점 */}
                        <td className="h-[46px] px-1.5 text-center border-r border-[#c2cfdf] whitespace-nowrap">
                          <span className="text-[14px] font-bold text-[#ef5a27]">{ind.score}점</span>
                        </td>

                        {/* 작성현황 */}
                        <td className="h-[46px] px-2 text-center border-r border-[#c2cfdf] whitespace-nowrap text-[13px]">
                          {!isTracking ? (
                            <span className="text-[#64748b] font-medium text-[12px] bg-[#f1f5f9] px-1.5 py-0.5 rounded-[4px] border border-[#e2e8f0]">
                              자체관리
                            </span>
                          ) : isRecordTarget ? (
                            <span className="font-semibold">
                              <strong className={`text-[13.5px] ${isPerfect ? 'text-[#1c9640]' : 'text-[#e23a32]'}`}>
                                {ind.completedCount}
                              </strong>
                              <span className="text-[#64748b]">/{ind.totalTargetCount}명</span>
                            </span>
                          ) : (
                            <span className="text-[#0093a9] font-bold text-[12px] bg-[#e6f7f9] px-1.5 py-0.5 rounded-[4px] border border-[#b2e5ec]">
                              면담·관찰
                            </span>
                          )}
                        </td>

                        {/* 상태 뱃지 */}
                        <td className="h-[46px] px-2 text-center whitespace-nowrap">
                          {!isTracking ? (
                            <span className="h-[24px] px-2 inline-flex items-center justify-center bg-[#f1f5f9] text-[#64748b] border border-[#cbd5e1] text-[11.5px] font-bold rounded-[4px]">
                              점검제외
                            </span>
                          ) : !isRecordTarget ? (
                            <span className="h-[24px] px-2 inline-flex items-center justify-center bg-[#eef1f8] text-[#2a3461] border border-[#c2cfdf] text-[12px] font-bold rounded-[4px]">
                              현장점검
                            </span>
                          ) : missingCnt > 0 ? (
                            <span className="h-[24px] px-2 inline-flex items-center justify-center bg-[#fff0ef] text-[#e23a32] border border-[#fecdd3] text-[12px] font-bold rounded-[4px]">
                              {missingCnt}건 누락
                            </span>
                          ) : (
                            <span className="h-[24px] px-2 inline-flex items-center justify-center bg-[#e8f8ed] text-[#1c9640] border border-[#c6f0d2] text-[12px] font-bold rounded-[4px]">
                              완료
                            </span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* 좌측 하단 요약 바 */}
          <div className="px-3.5 py-2 bg-[#f4f7fc] border-t border-[#c2cfdf] flex items-center justify-between text-[13px] text-[#475569] shrink-0">
            <div className="flex items-center gap-2">
              <span>선택 카테고리 <strong className="text-[#0e1225] font-bold text-[13.5px]">{currentCategoryIndicators.length}</strong>개 지표</span>
              <span>·</span>
              <span>총 배점 <strong className="text-[#ef5a27] font-bold text-[13.5px]">{currentCategoryIndicators.reduce((a, b) => a + b.score, 0)}점</strong></span>
            </div>
            <span className="text-[12px] text-[#8a9cb4]">2026년 공단 평가 기준</span>
          </div>
        </div>

        {/* ── 우측 패널 (62% 너비): 선택된 지표 점검 상세 & 원본 열람 ───────── */}
        <div className="flex-1 bg-white border border-[#c2cfdf] flex flex-col min-w-0 overflow-hidden shadow-xs rounded-[4px]">
          {currentIndicator ? (
            <div className="flex-1 flex flex-col h-full overflow-y-auto">
              {/* 지표 상세 타이틀 헤더 */}
              <div className="px-5 py-3.5 border-b border-[#c2cfdf] bg-white flex flex-col gap-2 shrink-0 shadow-2xs">
                {/* 상단 라인: 코드 + 배점 + 적용급여 ──── [공단 원본 매뉴얼 열람 (Sub)] */}
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="h-[22px] px-2 inline-flex items-center justify-center bg-[#2a3461] text-white text-[12px] font-extrabold rounded-[4px] shadow-2xs tracking-wide leading-none">
                      {currentIndicator.code}
                    </span>
                    <span className="h-[22px] px-2 inline-flex items-center justify-center bg-[#fff7ed] text-[#ea580c] border border-[#fed7aa] text-[12px] font-extrabold rounded-[4px] leading-none">
                      배점 {currentIndicator.score}점
                    </span>
                    <span className="w-[1px] h-[12px] bg-[#cbd5e1] mx-0.5" />
                    <div className="flex items-center gap-1.5 bg-[#f8fafc] px-2 py-0.5 rounded-[4px] border border-[#e2e8f0]">
                      <span className="text-[11.5px] text-[#64748b] font-bold">적용급여:</span>
                      <div className="flex items-center gap-1">
                        {currentIndicator.applicableServices.map(svc => (
                          <ServiceTagBadge key={svc} service={svc} size="medium" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 우측 상단 액션들 */}
                  <div className="flex items-center gap-2 shrink-0">
                    {/* Sub 버튼 스타일로 변경된 공단 원본 매뉴얼 열람 버튼 */}
                    <Button
                      onClick={() => setOpenedManualModal(currentIndicator.originalManual)}
                      type="Sub"
                      size="Medium"
                      icon="Search"
                    >
                      공단 원본 매뉴얼 열람
                    </Button>
                  </div>
                </div>

                {/* 하단 라인: 메인 타이틀 & 지표 해설 서브텍스트 */}
                <div>
                  <h2 className="text-[17.5px] font-extrabold text-[#0e1225] leading-snug tracking-[-0.3px]">
                    {currentIndicator.title}
                  </h2>
                  <p className="text-[13px] text-[#64748b] mt-0.5 font-medium leading-normal">
                    {currentIndicator.originalManual.indicatorSubtitle}
                  </p>
                </div>
              </div>

              {/* 점검 본문 3대 영역 */}
              <div className="p-4 flex flex-col gap-4">
                {/* 1. 상단 2열 그리드 (좌: 연동 서식 / 우: 주의사항) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-stretch">
                  {/* [좌] 연동 서식 */}
                  <div className="border border-[#c2cfdf] bg-[#f8fafc] rounded-[4px] p-3 flex flex-col justify-between gap-2 shadow-2xs">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="size-[5px] rounded-full bg-[#1e3a8a]" />
                        <h3 className="text-[13.5px] font-extrabold text-[#1e3a8a] leading-none">
                          {currentIndicator.isRecordTarget !== false ? '연동 서식' : '평가 진행 및 점검 안내'}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11.5px] text-[#475569] font-medium leading-none shrink-0">
                        <span>방법: <strong className="text-[#0e1225] font-bold">{currentIndicator.evalMethodType ?? '기록, 전산'}</strong></span>
                        <span className="text-[#cbd5e1]">·</span>
                        <span>주기: <strong className="text-[#0e1225] font-bold">{currentIndicator.cycle}</strong></span>
                      </div>
                    </div>

                    {currentIndicator.isRecordTarget !== false ? (
                      <div className="flex flex-wrap items-center gap-1.5">
                        {currentIndicator.mustHaveForms.map(form => (
                          <button
                            key={form}
                            type="button"
                            onClick={() => {
                              if (onBackToBeneficiaries) {
                                onBackToBeneficiaries()
                              } else {
                                alert(`[${form}] 작성 및 관리 페이지로 이동합니다.`)
                              }
                            }}
                            title={`[${form}] 작성/관리 페이지로 이동`}
                            className="h-[28px] px-2.5 inline-flex items-center gap-1.5 bg-white border border-[#b8c9df] hover:border-[#1e3a8a] hover:bg-[#edf4ff] text-[#1e3a8a] text-[12px] font-bold rounded-[4px] shadow-2xs hover:shadow-xs transition-all cursor-pointer group active:scale-[0.98]"
                          >
                            <svg className="size-[12.5px] text-[#3b82f6] group-hover:text-[#1e3a8a] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="group-hover:underline underline-offset-2">{form}</span>
                            <svg className="size-[10.5px] text-[#94a3b8] group-hover:text-[#1e3a8a] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-[#ecfeff] border border-[#a5f3fc] rounded-[4px] px-3 py-1.5 text-[12.5px] text-[#0e7490] leading-normal font-medium">
                        💡 <strong>안내:</strong> {currentIndicator.noRecordNotice}
                      </div>
                    )}
                  </div>

                  {/* [우] 주의사항 (실사 불인정 방지 체크) */}
                  <div className="border border-[#fca5a5] bg-[#fff8f8] rounded-[4px] p-3 flex flex-col justify-between gap-1.5 shadow-2xs">
                    <div className="flex items-center gap-1.5 text-[#b91c1c] text-[13.5px] font-extrabold leading-none">
                      <span className="size-[16px] rounded-full bg-[#dc2626] text-white flex items-center justify-center text-[10.5px] font-black shrink-0">
                        !
                      </span>
                      <span>주의사항 (실사 불인정 방지)</span>
                    </div>
                    <p className="text-[12.5px] text-[#991b1b] font-semibold leading-relaxed pl-5">
                      {currentIndicator.dangerCheck}
                    </p>
                  </div>
                </div>

                {/* 2. 누락대상 서류 점검 및 관리 모드 설정 영역 */}
                <div className="flex flex-col gap-2.5">
                  {/* 섹션 헤더: 점검 타이틀 + 지표별 ERP 점검 관리 ON/OFF 토글 */}
                  <div className="flex items-center justify-between pt-1 border-t border-[#cbd5e1]">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[14.5px] font-extrabold text-[#0e1225] inline-flex items-center gap-1.5 leading-none">
                        <span className="w-[3.5px] h-[14px] bg-[#ef5a27] inline-block rounded-[1px]" />
                        {currentIndicator.isRecordTarget !== false ? '누락 대상 서류 점검' : '현장 실사 세부 체크포인트'}
                      </h3>
                      {currentIndicator.isRecordTarget !== false && currentIndicator.isTrackingEnabled !== false && (
                        <span className="h-[20px] px-2 inline-flex items-center justify-center bg-[#dc2626] text-white text-[11.5px] font-black rounded-[4px]">
                          누락 {currentIndicator.missingList.filter(m => !m.isFixed).length}건
                        </span>
                      )}
                    </div>

                    {/* 지표별 ERP 점검 관리 ON/OFF 토글 스위치 */}
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] font-semibold text-[#475569]">
                        ERP 점검 관리:
                      </span>
                      <button
                        type="button"
                        onClick={() => handleToggleIndicatorTracking(currentIndicator.number)}
                        className={`h-[24px] px-2 inline-flex items-center gap-1 rounded-full text-[11.5px] font-extrabold transition-all cursor-pointer border ${currentIndicator.isTrackingEnabled !== false
                          ? 'bg-[#1e3a8a] text-white border-[#1e3a8a]'
                          : 'bg-[#f1f5f9] text-[#64748b] border-[#cbd5e1]'
                          }`}
                        title={currentIndicator.isTrackingEnabled !== false ? '클릭 시 외부/자체 관리 모드로 전환(누락 집계 제외)' : '클릭 시 ERP 점검 관리 모드 활성화'}
                      >
                        <span className={`size-[8px] rounded-full ${currentIndicator.isTrackingEnabled !== false ? 'bg-[#22c55e]' : 'bg-[#94a3b8]'}`} />
                        <span>{currentIndicator.isTrackingEnabled !== false ? '사용중 (ON)' : '자체관리 (OFF)'}</span>
                      </button>
                    </div>
                  </div>

                  {/* 지표별 점검 관리가 OFF(자체관리)인 경우 안내문 */}
                  {currentIndicator.isTrackingEnabled === false && (
                    <div className="bg-[#f8fafc] border border-[#cbd5e1] rounded-[4px] p-4 text-center flex flex-col items-center justify-center gap-1.5 shadow-2xs">
                      <span className="text-[13.5px] font-bold text-[#475569]">
                        📁 본 지표는 기관 자체 서류철(오프라인/외부 시스템)로 관리 중입니다.
                      </span>
                      <p className="text-[12px] text-[#64748b]">
                        ERP 상의 누락 서류 집계에서 제외되며, 우측 상단의 [ERP 점검 관리] 스위치를 켜면 전산 누락 점검을 다시 활성화할 수 있습니다.
                      </p>
                    </div>
                  )}

                  {/* 지표별 점검 관리가 ON인 경우 */}
                  {currentIndicator.isTrackingEnabled !== false && (
                    <>
                      {/* 기록 비대상 항목일 때: 체크포인트 그리드 */}
                      {currentIndicator.isRecordTarget === false && (
                        <div className="bg-[#f8fafc] border border-[#cbd5e1] rounded-[4px] p-3.5 flex flex-col gap-2.5 shadow-2xs">
                          <div className="text-[13px] text-[#334155] font-medium">
                            공단 평가관 현장 점검 시 아래 세부 기준에 맞춰 원활한 질의응답 및 시설 환경 관리가 이뤄질 수 있도록 사전 점검하십시오.
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                            {currentIndicator.originalManual.criteriaRows.map(row => (
                              <div key={row.no} className="bg-white p-3 border border-[#cbd5e1] rounded-[4px] flex flex-col gap-1 shadow-2xs text-[13px]">
                                <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-1">
                                  <span className="font-extrabold text-[#1e3a8a] text-[13.5px]">{row.no} {row.target}</span>
                                  <span className="text-[#64748b] text-[12px] font-bold">({row.method} / <strong className="text-[#ef5a27]">{row.score}점</strong>)</span>
                                </div>
                                <p className="text-[#0e1225] font-medium leading-relaxed pt-0.5">{row.content}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 기록 대상 항목일 때: 누락대상 정보 토글형 관리 리스트 */}
                      {currentIndicator.isRecordTarget !== false && (
                        <div className="flex flex-col gap-2">
                          {/* 누락이 없는 경우 */}
                          {currentIndicator.missingList.filter(m => !m.isFixed).length === 0 && (
                            <div className="py-4 px-4 border border-[#86efac] bg-[#f0fdf4] rounded-[4px] flex items-center justify-between gap-2 shadow-2xs">
                              <div className="flex items-center gap-2">
                                <span className="size-[22px] rounded-full bg-[#16a34a] text-white flex items-center justify-center text-[12px] font-black shrink-0">
                                  ✓
                                </span>
                                <span className="text-[13.5px] font-bold text-[#14532d]">
                                  모든 대상자의 서류가 완벽히 구비되었습니다. (누락 0건)
                                </span>
                              </div>
                              <span className="text-[12px] text-[#166534] font-medium">
                                총 {currentIndicator.totalTargetCount}명 중 {currentIndicator.completedCount}명 완료
                              </span>
                            </div>
                          )}

                          {/* 대상자별 행(Row) 목록: 토글 스위치로 저장/상태 반전 가능 */}
                          {currentIndicator.missingList.map(missing => {
                            const isDone = missing.isFixed

                            return (
                              <div
                                key={missing.id}
                                className={`border rounded-[4px] p-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 transition-all shadow-2xs ${isDone
                                  ? 'bg-[#f8fafc] border-[#cbd5e1] opacity-75'
                                  : 'bg-white border-[#fca5a5] hover:border-[#dc2626]'
                                  }`}
                              >
                                {/* 좌측: 대상자 정보 + 계약급여 + 빠진 서식 + 사유 */}
                                <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span
                                      className={`h-[20px] px-1.5 inline-flex items-center justify-center text-[11px] font-extrabold rounded-[3px] shrink-0 ${isDone
                                        ? 'bg-[#e2e8f0] text-[#475569]'
                                        : 'bg-[#dc2626] text-white'
                                        }`}
                                    >
                                      {isDone ? '구비 완료' : '누락 (미구비)'}
                                    </span>
                                    <strong className={`text-[14.5px] font-bold ${isDone ? 'text-[#64748b] line-through' : 'text-[#0e1225]'}`}>
                                      {missing.targetName}
                                    </strong>
                                    <span className="text-[12.5px] text-[#64748b]">
                                      {missing.targetSub}
                                    </span>
                                    <div className="flex items-center gap-0.5 ml-1">
                                      {missing.services.map(svc => (
                                        <ServiceTagBadge key={svc} service={svc} size="small" />
                                      ))}
                                    </div>
                                    <span className="text-[#cbd5e1]">|</span>
                                    <span className="text-[12.5px] text-[#475569]">
                                      담당: <strong className="text-[#0e1225]">{missing.manager}</strong>
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2 flex-wrap text-[13px]">
                                    <span
                                      className={`font-bold px-2 py-0.5 rounded-[3px] border shrink-0 ${isDone
                                        ? 'bg-[#f1f5f9] text-[#64748b] border-[#cbd5e1]'
                                        : 'bg-[#fee2e2] text-[#dc2626] border-[#fecaca]'
                                        }`}
                                    >
                                      {missing.missingDocName}
                                    </span>
                                    <span className={`text-[12.5px] leading-tight truncate ${isDone ? 'text-[#94a3b8]' : 'text-[#475569]'}`}>
                                      {missing.reason}
                                    </span>
                                  </div>
                                </div>

                                {/* 우측: 토글 스위치 버튼 (상태 저장 및 즉시 전환) */}
                                <div className="shrink-0 self-end md:self-center flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => handleToggleMissingItem(missing.id)}
                                    className={`h-[30px] px-3 inline-flex items-center gap-1.5 rounded-[4px] text-[12.5px] font-extrabold transition-all cursor-pointer border shadow-2xs active:scale-[0.98] ${isDone
                                      ? 'bg-[#f0fdf4] text-[#166534] border-[#86efac] hover:bg-[#dcfce7]'
                                      : 'bg-[#1e3a8a] text-white border-[#1e3a8a] hover:bg-[#172554]'
                                      }`}
                                    title={isDone ? '클릭 시 누락(미구비) 상태로 되돌립니다.' : '클릭 시 구비 완료 상태로 저장합니다.'}
                                  >
                                    <span className={`size-[7px] rounded-full ${isDone ? 'bg-[#16a34a]' : 'bg-[#ef4444]'}`} />
                                    <span>{isDone ? '구비 완료됨 (토글)' : '미구비 (완료처리)'}</span>
                                  </button>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-[#64748b] text-[14px]">
              좌측 목록에서 지표를 선택하십시오.
            </div>
          )}
        </div>
      </div>

      {/* ── 3. 단일 지표 원본 매뉴얼 상세 모달 ─────────────────────────────── */}
      {openedManualModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-[8px] w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-[#94a3b8]">
            {/* 모달 헤더 */}
            <div className="px-5 py-3.5 bg-[#2a3461] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="h-[20px] px-1.5 inline-flex items-center justify-center bg-white/20 text-white text-[11.5px] font-bold rounded-[3px]">
                  {openedManualModal.indicatorCode}
                </span>
                <h3 className="text-[16px] font-extrabold">공단 평가 매뉴얼 원본 고시</h3>
              </div>
              <button
                onClick={() => setOpenedManualModal(null)}
                className="text-white/80 hover:text-white text-[18px] font-bold px-2 py-0.5 cursor-pointer leading-none"
              >
                ✕
              </button>
            </div>

            {/* 모달 본문 */}
            <div className="p-5 overflow-y-auto flex flex-col gap-4 text-[13.5px] text-[#0e1225]">
              <div className="bg-[#f8fafc] p-3.5 rounded-[6px] border border-[#cbd5e1] flex flex-col gap-1">
                <h4 className="text-[16px] font-bold text-[#1e3a8a]">{openedManualModal.indicatorTitle}</h4>
                <p className="text-[13px] text-[#64748b]">{openedManualModal.direction}</p>
              </div>

              {/* 세부 평가 기준표 */}
              <div className="border border-[#cbd5e1] rounded-[6px] overflow-hidden">
                <table className="w-full text-left border-collapse text-[13px]">
                  <thead>
                    <tr className="bg-[#f1f5f9] text-[#334155] border-b border-[#cbd5e1]">
                      <th className="py-2 px-3 font-bold w-[60px] text-center">번호</th>
                      <th className="py-2 px-3 font-bold w-[70px]">대상</th>
                      <th className="py-2 px-3 font-bold">평가 기준 내용</th>
                      <th className="py-2 px-3 font-bold w-[80px] text-center">방법</th>
                      <th className="py-2 px-3 font-bold w-[60px] text-center">배점</th>
                    </tr>
                  </thead>
                  <tbody>
                    {openedManualModal.criteriaRows.map(row => (
                      <tr key={row.no} className="border-b border-[#e2e8f0] last:border-b-0">
                        <td className="py-2 px-3 text-center font-bold text-[#1e3a8a]">{row.no}</td>
                        <td className="py-2 px-3 font-bold text-[#475569]">{row.target}</td>
                        <td className="py-2 px-3 font-medium leading-relaxed">{row.content}</td>
                        <td className="py-2 px-3 text-center text-[#64748b]">{row.method}</td>
                        <td className="py-2 px-3 text-center font-bold text-[#ef5a27]">{row.score}점</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 확인 사항 및 법적 근거 */}
              <div className="flex flex-col gap-3">
                <div className="bg-[#fffbf0] border border-[#fed7aa] rounded-[6px] p-3 flex flex-col gap-1.5">
                  <strong className="text-[13.5px] text-[#c2410c] font-bold">현장 확인 상세 및 검증 지침</strong>
                  <ul className="list-disc pl-5 text-[12.5px] text-[#7c2d12] space-y-1">
                    {openedManualModal.verificationDetails.map((v, i) => (
                      <li key={i}>{v.contents.join(' / ')}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#f1f5f9] border border-[#cbd5e1] rounded-[6px] p-3 text-[12.5px] text-[#475569]">
                  <strong className="text-[#0e1225]">법적 근거: </strong>
                  {openedManualModal.legalBasis.lawName} {openedManualModal.legalBasis.article} ({openedManualModal.legalBasis.text})
                </div>
              </div>
            </div>

            {/* 모달 푸터 */}
            <div className="px-5 py-3 bg-[#f8fafc] border-t border-[#cbd5e1] flex justify-end">
              <Button type="Sub" size="Medium" onClick={() => setOpenedManualModal(null)}>
                닫기
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── 4. 전체 매뉴얼 열람 모달 (임시 비활성화/주석 처리) ─────────────────────────── */}
      {false && isAllManualModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-[8px] w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-[#94a3b8]">
            {/* 전체 모달 상단 툴바: 타이틀 + 개정년도 선택 + 검색 */}
            <div className="px-5 py-3 bg-[#2a3461] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <h3 className="text-[17px] font-extrabold flex items-center gap-2">
                  <span>📄</span>
                  <span>노인장기요양기관 평가매뉴얼 전체 열람</span>
                </h3>
                {/* 개정년도 선택 탭 */}
                <div className="flex items-center bg-white/15 p-1 rounded-[6px] text-[12px] font-bold">
                  {(['2024-2026', '2021-2023', '2018-2020'] as const).map(yr => (
                    <button
                      key={yr}
                      onClick={() => setSelectedRevisionYear(yr)}
                      className={`px-2.5 py-1 rounded-[4px] transition-all cursor-pointer ${selectedRevisionYear === yr ? 'bg-white text-[#2a3461] shadow-xs' : 'text-white/80 hover:text-white'
                        }`}
                    >
                      {yr}년도 개정판
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="지표명·서식 검색..."
                  value={allManualSearch}
                  onChange={e => setAllManualSearch(e.target.value)}
                  className="h-[30px] px-3 rounded-[4px] bg-white text-[#0e1225] text-[12.5px] border border-transparent focus:outline-none focus:ring-2 focus:ring-[#ef5a27]"
                />
                <button
                  onClick={() => setIsAllManualModalOpen(false)}
                  className="text-white/80 hover:text-white text-[20px] font-bold px-2 py-0.5 cursor-pointer leading-none"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* 전체 모달 메인 본문: 하단 좌(원본 서식/내용) & 하단 우(평가해석 및 법령) */}
            <div className="flex-1 flex overflow-hidden">
              {/* 모달 내부 좌측 (30%): 지표 선택 네비게이터 */}
              <div className="w-[280px] bg-[#f8fafc] border-r border-[#cbd5e1] flex flex-col overflow-y-auto p-2.5 gap-1.5 shrink-0">
                <div className="flex items-center justify-between pb-1 px-1 text-[12px] text-[#64748b] font-bold">
                  <span>전체 지표 목록 ({indicators.length})</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setAllManualCatFilter('all')}
                      className={`px-1.5 py-0.5 rounded text-[11px] ${allManualCatFilter === 'all' ? 'bg-[#2a3461] text-white' : 'text-[#64748b]'}`}
                    >
                      전체
                    </button>
                    <button
                      onClick={() => setAllManualCatFilter('beneficiary')}
                      className={`px-1.5 py-0.5 rounded text-[11px] ${allManualCatFilter === 'beneficiary' ? 'bg-[#2a3461] text-white' : 'text-[#64748b]'}`}
                    >
                      수급자
                    </button>
                  </div>
                </div>

                {indicators
                  .filter(i => allManualCatFilter === 'all' || i.category === allManualCatFilter)
                  .filter(i => !allManualSearch || i.title.includes(allManualSearch) || i.code.includes(allManualSearch))
                  .map(ind => (
                    <button
                      key={ind.number}
                      onClick={() => setAllManualSelectedNum(ind.number)}
                      className={`p-2.5 rounded-[4px] text-left border transition-all cursor-pointer flex flex-col gap-1 ${allManualSelectedNum === ind.number
                        ? 'bg-[#d9ecff] border-[#1e3a8a] text-[#1e3a8a] font-bold shadow-2xs'
                        : 'bg-white border-[#e2e8f0] text-[#334155] hover:bg-[#f1f5f9]'
                        }`}
                    >
                      <div className="flex items-center justify-between text-[11.5px]">
                        <span className="font-extrabold">{ind.code}</span>
                        <span className="text-[#ef5a27] font-bold">{ind.score}점</span>
                      </div>
                      <span className="text-[13px] leading-snug truncate">{ind.title}</span>
                    </button>
                  ))}
              </div>

              {/* 모달 내부 우측 (70%): 좌(원본 PDF 서식) & 우(평가해석) 2분할 */}
              {(() => {
                const activeInd = indicators.find(i => i.number === allManualSelectedNum) ?? indicators[0]
                return (
                  <div className="flex-1 flex overflow-hidden">
                    {/* [하단 왼쪽]: 공단 원본 고시 서식 뷰어 */}
                    <div className="flex-1 bg-[#f1f5f9] border-r border-[#cbd5e1] p-4 overflow-y-auto flex flex-col gap-3">
                      <div className="flex items-center justify-between border-b border-[#cbd5e1] pb-2">
                        <span className="text-[14px] font-extrabold text-[#1e3a8a] flex items-center gap-1.5">
                          <span>📋</span> [공단 원본] {activeInd.originalManual.indicatorTitle}
                        </span>
                        <span className="text-[12px] bg-white px-2 py-0.5 rounded border border-[#cbd5e1] font-bold text-[#64748b]">
                          적용시기: {activeInd.originalManual.effectivePeriod}
                        </span>
                      </div>

                      <div className="bg-white p-4 rounded-[6px] border border-[#cbd5e1] shadow-2xs flex flex-col gap-3 text-[13px]">
                        <div className="font-semibold text-[#334155] leading-relaxed">
                          {activeInd.originalManual.direction}
                        </div>

                        <div className="border border-[#e2e8f0] rounded-[4px] overflow-hidden">
                          <table className="w-full text-left text-[12.5px]">
                            <thead className="bg-[#f8fafc] border-b border-[#e2e8f0] font-bold text-[#475569]">
                              <tr>
                                <th className="p-2 text-center w-[45px]">항목</th>
                                <th className="p-2">평가 세부 기준</th>
                                <th className="p-2 text-center w-[60px]">배점</th>
                              </tr>
                            </thead>
                            <tbody>
                              {activeInd.originalManual.criteriaRows.map(c => (
                                <tr key={c.no} className="border-b border-[#f1f5f9] last:border-b-0">
                                  <td className="p-2 text-center font-bold text-[#1e3a8a]">{c.no}</td>
                                  <td className="p-2 leading-relaxed">
                                    <strong className="text-[#0e1225] font-semibold">{c.target}: </strong>
                                    {c.content}
                                  </td>
                                  <td className="p-2 text-center font-bold text-[#ef5a27]">{c.score}점</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* [하단 오른쪽]: 평가해석 및 검증 지침 */}
                    <div className="flex-1 bg-white p-4 overflow-y-auto flex flex-col gap-3">
                      <div className="border-b border-[#cbd5e1] pb-2 flex items-center justify-between">
                        <span className="text-[14px] font-extrabold text-[#0e1225] flex items-center gap-1.5">
                          <span>🔍</span> 평가 해석 및 실사 검증 지침
                        </span>
                        <span className="text-[12px] text-[#ef5a27] font-bold">
                          배점 합계 {activeInd.score}점
                        </span>
                      </div>

                      <div className="flex flex-col gap-3 text-[13px]">
                        <div className="bg-[#f8fafc] p-3 rounded-[6px] border border-[#cbd5e1] flex flex-col gap-1.5">
                          <strong className="text-[#1e3a8a] font-bold text-[13.5px]">필수 점검 포인트</strong>
                          <ul className="list-disc pl-5 text-[12.5px] text-[#334155] space-y-1">
                            {activeInd.originalManual.verificationDetails.map((vd, i) => (
                              <li key={i}>
                                <strong className="text-[#0e1225]">{vd.targetCriteria}: </strong>
                                {vd.contents.join(' ')}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-[#fff8f8] border border-[#fca5a5] rounded-[6px] p-3 text-[12.5px] text-[#991b1b]">
                          <strong className="font-bold">불인정 방지 주의: </strong>
                          {activeInd.dangerCheck}
                        </div>

                        <div className="bg-[#f1f5f9] p-3 rounded-[6px] text-[12px] text-[#475569]">
                          <strong>관련 법령: </strong>
                          {activeInd.originalManual.legalBasis.lawName} {activeInd.originalManual.legalBasis.article}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </div>

            {/* 전체 모달 푸터 */}
            <div className="px-5 py-3 bg-[#f8fafc] border-t border-[#cbd5e1] flex justify-end">
              <Button type="Sub" size="Medium" onClick={() => setIsAllManualModalOpen(false)}>
                닫기
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
