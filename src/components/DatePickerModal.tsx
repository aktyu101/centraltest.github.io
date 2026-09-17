import React, { useState, useEffect } from 'react';

export interface DatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  mode?: 'date' | 'month';
  title?: string;
}

export default function DatePickerModal({
  isOpen,
  onClose,
  selectedDate,
  onSelectDate,
  mode = 'date',
  title,
}: DatePickerModalProps) {
  const [viewDate, setViewDate] = useState<Date>(new Date(selectedDate));

  useEffect(() => {
    if (isOpen) {
      setViewDate(new Date(selectedDate));
    }
  }, [isOpen, selectedDate]);

  if (!isOpen) return null;

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth(); // 0-indexed

  const today = new Date();

  // 일자 이동 네비게이션
  const handlePrevMonth = () => {
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handlePrevYear = () => {
    setViewDate(new Date(currentYear - 1, currentMonth, 1));
  };

  const handleNextYear = () => {
    setViewDate(new Date(currentYear + 1, currentMonth, 1));
  };

  const handleSelectDay = (day: number, monthOffset: number = 0) => {
    const newDate = new Date(currentYear, currentMonth + monthOffset, day);
    onSelectDate(newDate);
    onClose();
  };

  const handleSelectMonth = (monthIndex: number) => {
    const newDate = new Date(currentYear, monthIndex, 1);
    onSelectDate(newDate);
    onClose();
  };

  const handleGoToday = () => {
    const now = new Date();
    onSelectDate(now);
    onClose();
  };

  // 날짜 그리드 계산
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay(); // 0: 일요일
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const prevMonthDays = Array.from({ length: firstDayOfWeek }, (_, i) => daysInPrevMonth - firstDayOfWeek + i + 1);
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const totalCells = Math.ceil((firstDayOfWeek + daysInMonth) / 7) * 7;
  const nextMonthDays = Array.from({ length: totalCells - (firstDayOfWeek + daysInMonth) }, (_, i) => i + 1);

  const isSelectedDay = (day: number) => {
    return (
      selectedDate.getFullYear() === currentYear &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getDate() === day
    );
  };

  const isTodayDay = (day: number) => {
    return (
      today.getFullYear() === currentYear &&
      today.getMonth() === currentMonth &&
      today.getDate() === day
    );
  };

  const years = Array.from({ length: 86 }, (_, i) => 1950 + i); // 1950 ~ 2035
  const months = Array.from({ length: 12 }, (_, i) => i); // 0 ~ 11

  return (
    <div 
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-[16px] border border-[#c2cfdf] shadow-2xl w-full max-w-[340px] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 상단 타이틀 바 */}
        <div className="px-4 py-3 bg-[#fafbfc] border-b border-[#e2e8f0] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-[4px] h-[14px] bg-[#ef5a27] inline-block rounded-[2px]" />
            <h3 className="text-[14px] font-bold text-[#0e1225]">
              {title || (mode === 'date' ? '날짜 선택' : '연월 선택')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#64748b] hover:text-[#0e1225] p-1 rounded-md hover:bg-[#f1f5f9] transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* 캘린더 네비게이션 헤더 */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={mode === 'date' ? handlePrevMonth : handlePrevYear}
              className="p-1.5 rounded-lg text-[#64748b] hover:text-[#0e1225] hover:bg-[#f1f5f9] transition-colors cursor-pointer"
              title={mode === 'date' ? '이전 달' : '이전 연도'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <div className="flex items-center gap-1.5">
              {/* 연도 셀렉트 */}
              <select
                value={currentYear}
                onChange={(e) => {
                  const newY = parseInt(e.target.value, 10);
                  setViewDate(new Date(newY, currentMonth, 1));
                }}
                className="h-[30px] px-2 py-0.5 bg-[#f8fafc] border border-[#c2cfdf] rounded-[6px] text-[13.5px] font-bold text-[#0e1225] focus:outline-none focus:border-[#2a3461] cursor-pointer"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}년
                  </option>
                ))}
              </select>

              {/* 월 셀렉트 (date 모드일 때만) */}
              {mode === 'date' && (
                <select
                  value={currentMonth}
                  onChange={(e) => {
                    const newM = parseInt(e.target.value, 10);
                    setViewDate(new Date(currentYear, newM, 1));
                  }}
                  className="h-[30px] px-2 py-0.5 bg-[#f8fafc] border border-[#c2cfdf] rounded-[6px] text-[13.5px] font-bold text-[#0e1225] focus:outline-none focus:border-[#2a3461] cursor-pointer"
                >
                  {months.map((m) => (
                    <option key={m} value={m}>
                      {m + 1}월
                    </option>
                  ))}
                </select>
              )}
            </div>
            <button
              onClick={mode === 'date' ? handleNextMonth : handleNextYear}
              className="p-1.5 rounded-lg text-[#64748b] hover:text-[#0e1225] hover:bg-[#f1f5f9] transition-colors cursor-pointer"
              title={mode === 'date' ? '다음 달' : '다음 연도'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>

          {/* 일자 선택 모드 */}
          {mode === 'date' && (
            <div>
              {/* 요일 헤더 */}
              <div className="grid grid-cols-7 text-center mb-2 text-[12px] font-medium text-[#64748b]">
                <span className="text-[#ef4444]">일</span>
                <span>월</span>
                <span>화</span>
                <span>수</span>
                <span>목</span>
                <span>금</span>
                <span className="text-[#3b82f6]">토</span>
              </div>

              {/* 날짜 그리드 */}
              <div className="grid grid-cols-7 gap-y-1.5 text-center text-[13px]">
                {/* 이전 달 일자 */}
                {prevMonthDays.map((d) => (
                  <button
                    key={`prev-${d}`}
                    onClick={() => handleSelectDay(d, -1)}
                    className="h-8 w-8 mx-auto flex items-center justify-center text-[#cbd5e1] hover:bg-[#f1f5f9] rounded-full transition-colors cursor-pointer text-[12px]"
                  >
                    {d}
                  </button>
                ))}

                {/* 현재 달 일자 */}
                {currentMonthDays.map((d) => {
                  const selected = isSelectedDay(d);
                  const isToday = isTodayDay(d);
                  return (
                    <button
                      key={`curr-${d}`}
                      onClick={() => handleSelectDay(d, 0)}
                      className={`h-8 w-8 mx-auto flex items-center justify-center rounded-full text-[13px] font-medium transition-colors cursor-pointer relative ${
                        selected
                          ? 'bg-[#ef5a28] text-white font-bold shadow-xs'
                          : isToday
                          ? 'border border-[#ef5a28] text-[#ef5a28] font-bold hover:bg-[#fff1eb]'
                          : 'text-[#1e293b] hover:bg-[#fff1eb] hover:text-[#ef5a28]'
                      }`}
                    >
                      {d}
                    </button>
                  );
                })}

                {/* 다음 달 일자 */}
                {nextMonthDays.map((d) => (
                  <button
                    key={`next-${d}`}
                    onClick={() => handleSelectDay(d, 1)}
                    className="h-8 w-8 mx-auto flex items-center justify-center text-[#cbd5e1] hover:bg-[#f1f5f9] rounded-full transition-colors cursor-pointer text-[12px]"
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 연/월 선택 모드 */}
          {mode === 'month' && (
            <div className="grid grid-cols-3 gap-2.5 py-2">
              {Array.from({ length: 12 }, (_, i) => {
                const monthNum = i + 1;
                const isSelected = selectedDate.getFullYear() === currentYear && selectedDate.getMonth() === i;
                const isCurrentMonth = today.getFullYear() === currentYear && today.getMonth() === i;
                return (
                  <button
                    key={`month-${monthNum}`}
                    onClick={() => handleSelectMonth(i)}
                    className={`py-3 rounded-[10px] text-[13px] font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#ef5a28] text-white shadow-xs'
                        : isCurrentMonth
                        ? 'border border-[#ef5a28] text-[#ef5a28] hover:bg-[#fff1eb]'
                        : 'bg-[#f8fafc] text-[#334155] border border-[#e2e8f0] hover:bg-[#fff1eb] hover:text-[#ef5a28] hover:border-[#fcd9cd]'
                    }`}
                  >
                    {monthNum}월
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 모달 하단 푸터 버튼 */}
        <div className="p-3 bg-[#f8fafc] border-t border-[#e2e8f0] flex items-center justify-between">
          <button
            onClick={handleGoToday}
            className="px-3 py-1.5 text-[12px] font-bold text-[#ef5a28] bg-[#fff1eb] hover:bg-[#ffe2d6] rounded-[6px] transition-colors cursor-pointer"
          >
            {mode === 'date' ? '오늘 날짜로 이동' : '이번 달로 이동'}
          </button>
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-[12px] font-medium text-[#64748b] bg-white border border-[#c2cfdf] hover:bg-[#f1f5f9] rounded-[6px] transition-colors cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
