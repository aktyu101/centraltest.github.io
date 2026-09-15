import svgPaths from "./svg-5rb3kjz3yn"
type CheckboxBoxProps = {
  className?: string
  state?: "Default" | "Checked"
}

function CheckboxBox({ className, state = "Default" }: CheckboxBoxProps) {
  const isChecked = state === "Checked"
  return (
    <div
      className={
        className ||
        `relative rounded-[4px] size-[16px] ${
          isChecked ? "bg-[#ef5a27]" : "bg-white overflow-clip"
        }`
      }
    >
      <div
        aria-hidden
        className={`absolute border border-solid inset-0 pointer-events-none rounded-[4px] ${
          isChecked ? "border-[#ef5a27]" : "border-[#d7e1ee]"
        }`}
      />
      {isChecked && (
        <div
          className="absolute h-[7.502px] left-[2.77px] right-[2.77px] top-[4.25px]"
          data-name="Frame"
        >
          <div
            className="absolute h-[5.502px] left-px top-px w-[8.465px]"
            data-name="Vector"
          >
            <div className="absolute inset-[-18.18%_-11.81%]">
              <svg
                className="block size-full"
                fill="none"
                height="7.50199"
                preserveAspectRatio="none"
                viewBox="0 0 10.4646 7.50199"
                width="10.4646"
              >
                <path
                  d={svgPaths.pb043000}
                  id="Vector"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
type TableColumnCellProps = {
  className?: string
  color?: "None"
}

function TableColumnCell({ className, color = "None" }: TableColumnCellProps) {
  return (
    <div className={className || "bg-white h-[40px] relative w-[36px]"}>
      <div
        aria-hidden
        className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
      />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[10px] relative size-full">
          <div className="relative shrink-0" data-name="Checkbox_Component">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[4px] items-center justify-center relative size-full">
                <CheckboxBox className="bg-white relative rounded-[4px] shrink-0 size-[16px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Select({ className }: { className?: string }) {
  return (
    <div
      className={className || "h-[6px] relative w-[12px]"}
      data-name="select"
    >
      <div
        className="absolute h-[6px] left-0 top-0 w-[12px]"
        data-name="Vector"
      >
        <div className="absolute inset-[-12.5%_-6.25%]">
          <svg
            className="block size-full"
            fill="none"
            height="7.5"
            preserveAspectRatio="none"
            viewBox="0 0 13.5 7.5"
            width="13.5"
          >
            <path
              d={svgPaths.p3f46b480}
              id="Vector"
              stroke="#8A9CB4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
type RadioBoxProps = {
  className?: string
  state?: "Default"
}

function RadioBox({ className, state = "Default" }: RadioBoxProps) {
  return (
    <div
      className={className || "bg-white relative rounded-[999px] size-[18px]"}
    >
      <div
        aria-hidden
        className="absolute border border-[#d7e1ee] border-solid inset-0 pointer-events-none rounded-[999px]"
      />
    </div>
  )
}

function X() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="x">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="20"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
        width="20"
      >
        <g id="x">
          <path
            d="M15 5L5 15M5 5L15 15"
            id="Vector"
            stroke="#8A9CB4"
            strokeLinecap="round"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  )
}

function Frame1() {
  return (
    <div
      className="content-stretch flex items-center justify-center relative shrink-0 size-[20px]"
      data-name="Frame"
    >
      <X />
    </div>
  )
}

function Frame() {
  return (
    <div
      className="content-stretch flex items-start p-[4px] relative rounded-[6px] shrink-0"
      data-name="Frame"
    >
      <Frame1 />
    </div>
  )
}

function Header() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] py-[12px] relative size-full">
          <p className="[word-break:break-word] font-['Pretendard:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#0e1225] text-[17px] tracking-[-0.34px] whitespace-nowrap">
            담당 복지사 선택
          </p>
          <Frame />
        </div>
      </div>
    </div>
  )
}

function Input() {
  return (
    <div
      className="bg-white h-[30px] relative rounded-[8px] shrink-0 w-full"
      data-name="Input"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between px-[8px] relative size-full">
          <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#a8b7cb] text-[14px] tracking-[0.01px] whitespace-nowrap">
            선택
          </p>
          <Select className="h-[6px] relative shrink-0 w-[12px]" />
        </div>
      </div>
      <div
        aria-hidden
        className="absolute border border-[#a8b7cb] border-solid inset-0 pointer-events-none rounded-[8px]"
      />
    </div>
  )
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="relative shrink-0" data-name="옵션1">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center relative size-full">
            <RadioBox className="bg-white relative rounded-[999px] shrink-0 size-[18px]" />
            <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#283445] text-[14px] tracking-[0.01px] whitespace-nowrap">
              서명완료
            </p>
          </div>
        </div>
      </div>
      <div className="relative shrink-0" data-name="옵션2">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center relative size-full">
            <RadioBox className="bg-white relative rounded-[999px] shrink-0 size-[18px]" />
            <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#283445] text-[14px] tracking-[0.01px] whitespace-nowrap">
              미사용
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Options() {
  return (
    <div
      className="bg-white h-[30px] relative rounded-[8px] shrink-0 w-full"
      data-name="Options"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] relative size-full">
          <Frame4 />
        </div>
      </div>
      <div
        aria-hidden
        className="absolute border border-[#a8b7cb] border-solid inset-0 pointer-events-none rounded-[8px]"
      />
    </div>
  )
}

function Input1() {
  return (
    <div
      className="bg-white h-[30px] relative rounded-[8px] shrink-0 w-full"
      data-name="Input"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between px-[8px] relative size-full">
          <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#a8b7cb] text-[14px] tracking-[0.01px] whitespace-nowrap">
            선택
          </p>
          <Select className="h-[6px] relative shrink-0 w-[12px]" />
        </div>
      </div>
      <div
        aria-hidden
        className="absolute border border-[#a8b7cb] border-solid inset-0 pointer-events-none rounded-[8px]"
      />
    </div>
  )
}

function Input2() {
  return (
    <div
      className="bg-white h-[30px] relative rounded-[8px] shrink-0 w-full"
      data-name="Input"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between px-[8px] relative size-full">
          <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#a8b7cb] text-[14px] tracking-[0.01px] whitespace-nowrap">
            선택
          </p>
          <Select className="h-[6px] relative shrink-0 w-[12px]" />
        </div>
      </div>
      <div
        aria-hidden
        className="absolute border border-[#a8b7cb] border-solid inset-0 pointer-events-none rounded-[8px]"
      />
    </div>
  )
}

function InputsSlot() {
  return (
    <div className="flex flex-[1_0_0] flex-row items-end self-stretch">
      <div
        className="content-stretch flex flex-[1_0_0] gap-[12px] h-full items-center min-w-px relative"
        data-name="inputs-slot"
      >
        <div
          className="flex-[1_0_0] h-[52px] min-w-px relative"
          data-name="필터 인풋"
        >
          <div className="content-stretch flex flex-col gap-[4px] items-start relative size-full">
            <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px] whitespace-nowrap">
              직종
            </p>
            <Input />
          </div>
        </div>
        <div className="relative shrink-0 w-[254px]" data-name="필터 인풋">
          <div className="content-stretch flex flex-col gap-[4px] items-start relative size-full">
            <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px] whitespace-nowrap">
              서명여부
            </p>
            <Options />
          </div>
        </div>
        <div className="flex-[1_0_0] min-w-px relative" data-name="필터 인풋">
          <div className="content-stretch flex flex-col gap-[4px] items-start relative size-full">
            <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px] whitespace-nowrap">
              종사자명
            </p>
            <Input1 />
          </div>
        </div>
        <div
          className="flex-[1_0_0] h-[52px] min-w-px relative"
          data-name="필터 인풋"
        >
          <div className="content-stretch flex flex-col gap-[4px] items-start relative size-full">
            <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px] whitespace-nowrap">
              층
            </p>
            <Input2 />
          </div>
        </div>
      </div>
    </div>
  )
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col h-[24px] items-center justify-end relative shrink-0 w-full">
      <div
        className="bg-white h-[24px] relative rounded-[6px] shrink-0 w-full"
        data-name="Button_Component"
      >
        <div
          aria-hidden
          className="absolute border border-[#c2cfdf] border-solid inset-0 pointer-events-none rounded-[6px]"
        />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center px-[6px] py-[5px] relative size-full">
            <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#2a3461] text-[12px] whitespace-nowrap">
              초기화
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col h-[30px] items-center justify-center relative shrink-0 w-[44px]">
      <Frame7 />
    </div>
  )
}

function TableInfo() {
  return (
    <div
      className="content-stretch flex h-[32px] items-center overflow-clip relative shrink-0 w-full"
      data-name="table-info"
    >
      <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[#6b7382] text-[13px] whitespace-pre">
        <span className="leading-[normal]">{`검색 `}</span>
        <span className="font-['Pretendard:SemiBold',sans-serif] leading-[normal] text-[#2a3461]">
          24
        </span>
        <span className="leading-[normal] text-[#2a3461]">{` `}</span>
        <span className="leading-[normal]">{` /  전체 142`}</span>
      </p>
    </div>
  )
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full">
      <TableInfo />
    </div>
  )
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full">
      <Frame6 />
    </div>
  )
}

function Header1() {
  return (
    <div
      className="bg-[#f4f7fc] h-[44px] relative shrink-0 w-full"
      data-name="header"
    >
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <div className="relative shrink-0" data-name="Checkbox_Component">
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex gap-[4px] items-center justify-center relative size-full">
              <CheckboxBox className="bg-white relative rounded-[4px] shrink-0 size-[16px]" />
            </div>
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute border-[#c2cfdf] border-b border-l border-solid border-t inset-0 pointer-events-none"
      />
    </div>
  )
}

function Frame2() {
  return (
    <div
      className="absolute h-[7.502px] left-[2.77px] right-[2.77px] top-[4.25px]"
      data-name="Frame"
    >
      <div
        className="absolute h-[5.502px] left-px top-px w-[8.465px]"
        data-name="Vector"
      >
        <div className="absolute inset-[-18.18%_-11.81%]">
          <svg
            className="block size-full"
            fill="none"
            height="7.50199"
            preserveAspectRatio="none"
            viewBox="0 0 10.4646 7.50199"
            width="10.4646"
          >
            <path
              d={svgPaths.pb043000}
              id="Vector"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

function Frame3() {
  return (
    <div
      className="absolute h-[7.502px] left-[2.77px] right-[2.77px] top-[4.25px]"
      data-name="Frame"
    >
      <div
        className="absolute h-[5.502px] left-px top-px w-[8.465px]"
        data-name="Vector"
      >
        <div className="absolute inset-[-18.18%_-11.81%]">
          <svg
            className="block size-full"
            fill="none"
            height="7.50199"
            preserveAspectRatio="none"
            viewBox="0 0 10.4646 7.50199"
            width="10.4646"
          >
            <path
              d={svgPaths.pb043000}
              id="Vector"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

function Header2() {
  return (
    <div
      className="bg-[#f4f7fc] h-[44px] relative shrink-0 w-full"
      data-name="header"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="[word-break:break-word] content-stretch flex font-['Pretendard:Regular',sans-serif] items-center justify-between leading-[normal] not-italic pl-[10px] pr-[8px] relative size-full whitespace-nowrap">
          <p className="relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px]">
            이름
          </p>
          <p className="relative shrink-0 text-[#8a9cb4] text-[10px] tracking-[-0.2px]">{` ↕`}</p>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute border-[#c2cfdf] border-b border-l border-solid border-t inset-0 pointer-events-none"
      />
    </div>
  )
}

function Header3() {
  return (
    <div
      className="bg-[#f4f7fc] h-[44px] relative shrink-0 w-full"
      data-name="header"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="[word-break:break-word] content-stretch flex font-['Pretendard:Regular',sans-serif] items-center justify-between leading-[normal] not-italic pl-[10px] pr-[8px] relative size-full whitespace-nowrap">
          <p className="relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px]">
            생년월일
          </p>
          <p className="relative shrink-0 text-[#8a9cb4] text-[10px] tracking-[-0.2px]">{` ↕`}</p>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute border-[#c2cfdf] border-b border-l border-solid border-t inset-0 pointer-events-none"
      />
    </div>
  )
}

function Header4() {
  return (
    <div
      className="bg-[#f4f7fc] h-[44px] relative shrink-0 w-full"
      data-name="header"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="[word-break:break-word] content-stretch flex font-['Pretendard:Regular',sans-serif] items-center justify-between leading-[normal] not-italic pl-[10px] pr-[8px] relative size-full whitespace-nowrap">
          <p className="relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px]">
            직종
          </p>
          <p className="relative shrink-0 text-[#8a9cb4] text-[10px] tracking-[-0.2px]">{` ↕`}</p>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute border-[#c2cfdf] border-b border-l border-solid border-t inset-0 pointer-events-none"
      />
    </div>
  )
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame5 />
      <div className="h-[364px] relative shrink-0 w-full" data-name="Table">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-start relative size-full">
            <div
              className="relative shrink-0 w-[36px]"
              data-name="Type=체크박스"
            >
              <div className="overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex flex-col items-start relative size-full">
                  <Header1 />
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-[36px]"
                    data-name="cell-1"
                  >
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <div
                          className="relative shrink-0"
                          data-name="Checkbox_Component"
                        >
                          <div className="flex flex-row items-center justify-center size-full">
                            <div className="content-stretch flex gap-[4px] items-center justify-center relative size-full">
                              <div
                                className="bg-[#ef5a27] relative rounded-[4px] shrink-0 size-[16px]"
                                data-name="Checkbox_Box"
                              >
                                <div
                                  aria-hidden
                                  className="absolute border border-[#ef5a27] border-solid inset-0 pointer-events-none rounded-[4px]"
                                />
                                <Frame2 />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-[36px]"
                    data-name="cell-2"
                  >
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <div
                          className="relative shrink-0"
                          data-name="Checkbox_Component"
                        >
                          <div className="flex flex-row items-center justify-center size-full">
                            <div className="content-stretch flex gap-[4px] items-center justify-center relative size-full">
                              <div
                                className="bg-[#ef5a27] relative rounded-[4px] shrink-0 size-[16px]"
                                data-name="Checkbox_Box"
                              >
                                <div
                                  aria-hidden
                                  className="absolute border border-[#ef5a27] border-solid inset-0 pointer-events-none rounded-[4px]"
                                />
                                <Frame3 />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <TableColumnCell className="bg-white h-[40px] relative shrink-0 w-[36px]" />
                  <TableColumnCell className="bg-white h-[40px] relative shrink-0 w-[36px]" />
                  <TableColumnCell className="bg-white h-[40px] relative shrink-0 w-[36px]" />
                  <TableColumnCell className="bg-white h-[40px] relative shrink-0 w-[36px]" />
                  <TableColumnCell className="bg-white h-[40px] relative shrink-0 w-[36px]" />
                  <TableColumnCell className="bg-white h-[40px] relative shrink-0 w-[36px]" />
                  <TableColumnCell className="bg-white h-[40px] relative shrink-0 w-[36px]" />
                  <TableColumnCell className="bg-white h-[40px] relative shrink-0 w-[36px]" />
                </div>
              </div>
            </div>
            <div
              className="flex-[1_0_0] min-w-px relative"
              data-name="Type=이름"
            >
              <div className="overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex flex-col items-start relative size-full">
                  <Header2 />
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-full"
                    data-name="cell-1"
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                          홍길순
                        </p>
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                  </div>
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-full"
                    data-name="cell-2"
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                          이영희
                        </p>
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                  </div>
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-full"
                    data-name="cell-3"
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                          박민수
                        </p>
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                  </div>
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-full"
                    data-name="cell-4"
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                          김철호
                        </p>
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                  </div>
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-full"
                    data-name="cell-5"
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                          최지영
                        </p>
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                  </div>
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-full"
                    data-name="cell-6"
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                          정수진
                        </p>
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                  </div>
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-full"
                    data-name="cell-7"
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                          강민준
                        </p>
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                  </div>
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-full"
                    data-name="cell-8"
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                          윤서연
                        </p>
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                  </div>
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-full"
                    data-name="cell-9"
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                          임태현
                        </p>
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                  </div>
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-full"
                    data-name="cell-10"
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                          한소희
                        </p>
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="flex-[1_0_0] min-w-px relative"
              data-name="Type=생년월일"
            >
              <div className="overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex flex-col items-start relative size-full">
                  <Header3 />
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-full"
                    data-name="cell-1"
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                          1945.11.03
                        </p>
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                  </div>
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-full"
                    data-name="cell-2"
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                          1937.05.12
                        </p>
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                  </div>
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-full"
                    data-name="cell-3"
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                          1942.03.22
                        </p>
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                  </div>
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-full"
                    data-name="cell-4"
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                          1955.07.14
                        </p>
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                  </div>
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-full"
                    data-name="cell-5"
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                          1940.09.30
                        </p>
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                  </div>
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-full"
                    data-name="cell-6"
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                          1948.02.18
                        </p>
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                  </div>
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-full"
                    data-name="cell-7"
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                          1951.06.05
                        </p>
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                  </div>
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-full"
                    data-name="cell-8"
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                          1939.12.27
                        </p>
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                  </div>
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-full"
                    data-name="cell-9"
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                          1946.04.11
                        </p>
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                  </div>
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-full"
                    data-name="cell-10"
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                          1953.08.09
                        </p>
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="flex-[1_0_0] min-w-px relative"
              data-name="Type=직종"
            >
              <div className="overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex flex-col items-start relative size-full">
                  <Header4 />
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-full"
                    data-name="cell-1"
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                          요양보호사
                        </p>
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                  </div>
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-full"
                    data-name="cell-2"
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                          요양보호사
                        </p>
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                  </div>
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-full"
                    data-name="cell-3"
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                          요양보호사
                        </p>
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                  </div>
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-full"
                    data-name="cell-4"
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                          사회복지사
                        </p>
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                  </div>
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-full"
                    data-name="cell-5"
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                          시설장
                        </p>
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                  </div>
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-full"
                    data-name="cell-6"
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                          요양보호사
                        </p>
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                  </div>
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-full"
                    data-name="cell-7"
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                          요양보호사
                        </p>
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                  </div>
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-full"
                    data-name="cell-8"
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                          사회복지사
                        </p>
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                  </div>
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-full"
                    data-name="cell-9"
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                          프로그램 관리자
                        </p>
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                  </div>
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-full"
                    data-name="cell-10"
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                          요양보호사
                        </p>
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          aria-hidden
          className="absolute border-[#c2cfdf] border-r border-solid inset-0 pointer-events-none"
        />
      </div>
    </div>
  )
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame12 />
    </div>
  )
}

function Frame9() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
      <div className="relative shrink-0 size-[4px]">
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          height="4"
          preserveAspectRatio="none"
          viewBox="0 0 4 4"
          width="4"
        >
          <circle cx="2" cy="2" fill="#2A3461" id="Ellipse 27" r="2" />
        </svg>
      </div>
      <p className="[word-break:break-word] font-['Pretendard:SemiBold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#2a3461] text-[14px] whitespace-nowrap">
        선택한 사회복지사
      </p>
    </div>
  )
}

function Header5() {
  return (
    <div
      className="bg-[#f4f7fc] h-[44px] relative shrink-0 w-full"
      data-name="header"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="[word-break:break-word] content-stretch flex font-['Pretendard:Regular',sans-serif] items-center justify-between leading-[normal] not-italic pl-[10px] pr-[8px] relative size-full whitespace-nowrap">
          <p className="relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px]">
            이름
          </p>
          <p className="relative shrink-0 text-[#8a9cb4] text-[10px] tracking-[-0.2px]">{` ↕`}</p>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute border-[#c2cfdf] border-b border-l border-solid border-t inset-0 pointer-events-none"
      />
    </div>
  )
}

function Header6() {
  return (
    <div
      className="bg-[#f4f7fc] h-[44px] relative shrink-0 w-full"
      data-name="header"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="[word-break:break-word] content-stretch flex font-['Pretendard:Regular',sans-serif] items-center justify-between leading-[normal] not-italic pl-[10px] pr-[8px] relative size-full whitespace-nowrap">
          <p className="relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px]">
            생년월일
          </p>
          <p className="relative shrink-0 text-[#8a9cb4] text-[10px] tracking-[-0.2px]">{` ↕`}</p>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute border-[#c2cfdf] border-b border-l border-solid border-t inset-0 pointer-events-none"
      />
    </div>
  )
}

function Header7() {
  return (
    <div
      className="bg-[#f4f7fc] h-[44px] relative shrink-0 w-full"
      data-name="header"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="[word-break:break-word] content-stretch flex font-['Pretendard:Regular',sans-serif] items-center justify-between leading-[normal] not-italic pl-[10px] pr-[8px] relative size-full whitespace-nowrap">
          <p className="relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px]">
            직종
          </p>
          <p className="relative shrink-0 text-[#8a9cb4] text-[10px] tracking-[-0.2px]">{` ↕`}</p>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute border-[#c2cfdf] border-b border-l border-solid border-t inset-0 pointer-events-none"
      />
    </div>
  )
}

function SectionHeader() {
  return (
    <div
      className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full"
      data-name="section-header"
    >
      <Frame9 />
      <div className="relative shrink-0 w-full" data-name="Table">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-start relative size-full">
            <div
              className="flex-[1_0_0] min-w-px relative"
              data-name="Type=이름"
            >
              <div className="overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex flex-col items-start relative size-full">
                  <Header5 />
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-full"
                    data-name="cell-1"
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                          홍길순
                        </p>
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                  </div>
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-full"
                    data-name="cell-2"
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                          이영희
                        </p>
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="flex-[1_0_0] min-w-px relative"
              data-name="Type=생년월일"
            >
              <div className="overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex flex-col items-start relative size-full">
                  <Header6 />
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-full"
                    data-name="cell-1"
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                          1945.11.03
                        </p>
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                  </div>
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-full"
                    data-name="cell-2"
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                          1937.05.12
                        </p>
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="flex-[1_0_0] min-w-px relative"
              data-name="Type=직종"
            >
              <div className="overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex flex-col items-start relative size-full">
                  <Header7 />
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-full"
                    data-name="cell-1"
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                          요양보호사
                        </p>
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                  </div>
                  <div
                    className="bg-white h-[40px] relative shrink-0 w-full"
                    data-name="cell-2"
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex items-center px-[10px] relative size-full">
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                          요양보호사
                        </p>
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          aria-hidden
          className="absolute border-[#c2cfdf] border-r border-solid inset-0 pointer-events-none"
        />
      </div>
    </div>
  )
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame11 />
      <SectionHeader />
    </div>
  )
}

function Body() {
  return (
    <div className="relative shrink-0 w-full" data-name="Body">
      <div className="content-stretch flex flex-col gap-[16px] items-start px-[24px] py-[20px] relative size-full">
        <div
          className="bg-[#f4f7fc] relative rounded-[12px] shrink-0 w-full"
          data-name="FilterBar"
        >
          <div className="flex flex-row items-end justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-end justify-center px-[16px] py-[12px] relative size-full">
              <InputsSlot />
              <Frame8 />
            </div>
          </div>
        </div>
        <Frame10 />
      </div>
    </div>
  )
}

function Footer() {
  return (
    <div className="bg-[#eef1f8] relative shrink-0 w-full" data-name="Footer">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[12px] items-center justify-end px-[20px] py-[12px] relative size-full">
          <div
            className="bg-[#2a3461] h-[40px] relative rounded-[8px] shrink-0"
            data-name="Button_Component"
          >
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[6px] items-center justify-center px-[14px] py-[12px] relative size-full">
                <div className="relative shrink-0 size-[16px]" data-name="noti">
                  <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
                    <div className="content-stretch flex flex-col items-center justify-center px-px py-[3px] relative size-full">
                      <div
                        className="h-[6px] relative shrink-0 w-[9px]"
                        data-name="Vector"
                      >
                        <div className="absolute inset-[-8.33%_-5.56%]">
                          <svg
                            className="block size-full"
                            fill="none"
                            height="7"
                            preserveAspectRatio="none"
                            viewBox="0 0 10 7"
                            width="10"
                          >
                            <path
                              d="M0.5 3.5L3.5 6.5L9.5 0.5"
                              id="Vector"
                              stroke="white"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-white tracking-[0.01px] whitespace-nowrap">
                  저장
                </p>
              </div>
            </div>
          </div>
          <div
            className="bg-[#eef1f8] h-[40px] relative rounded-[8px] shrink-0"
            data-name="Button_Component"
          >
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[6px] items-center justify-center px-[14px] py-[12px] relative size-full">
                <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#3e4d63] text-[14px] tracking-[0.01px] whitespace-nowrap">
                  취소
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ModalCard() {
  return (
    <div
      className="bg-white relative rounded-[16px] shadow-[0px_20px_40px_0px_rgba(0,0,0,0.1)] size-full"
      data-name="Modal Card"
    >
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start relative size-full">
          <Header />
          <div className="h-0 relative shrink-0 w-full" data-name="Line">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                height="1"
                preserveAspectRatio="none"
                viewBox="0 0 700 1"
                width="700"
              >
                <line id="Line" stroke="#C2CFDF" x2="700" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
          <Body />
          <Footer />
        </div>
      </div>
    </div>
  )
}
