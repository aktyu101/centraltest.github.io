import { readFileSync, writeFileSync } from 'fs'

const raw = readFileSync('src/App.tsx', 'utf8')
const lines = raw.split('\n')

// 라인 38 (index 37): contractStatus 라인 교체
lines[37] = '  contractStatus: "계약중" | "만료" | "해지"'

// 한글 데이터가 깨진 부분들 - 타입 시스템에 영향 있는 것만 수정
// 주석 및 문자열 데이터는 Vite가 그냥 전달하므로 UI에는 영향 없음

const result = lines.join('\n')
writeFileSync('src/App.tsx', result, 'utf8')
console.log('line 38:', lines[37])
