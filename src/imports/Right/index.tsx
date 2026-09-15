import svgPaths from "./svg-39sn13e4v2"
type ButtonComponentProps = {
  className?: string
  icon?: boolean
  size?: "Small" | "Medium"
  state?: "Default"
  type?: "Primary" | "Sub" | "Ghost" | "File"
}

function ButtonComponent({
  className,
  icon = true,
  size = "Medium",
  state = "Default",
  type = "Primary",
}: ButtonComponentProps) {
  const isFileAndMediumAndDefaultAndNotIcon =
    type === "File" && size === "Medium" && state === "Default" && !icon
  const isGhostAndSmallAndDefaultAndNotIcon =
    type === "Ghost" && size === "Small" && state === "Default" && !icon
  const isPrimaryAndMediumAndDefaultAndIcon =
    type === "Primary" && size === "Medium" && state === "Default" && icon
  const isSubAndDefaultAndIsSmallAndNotIconOrMediumAndIcon =
    type === "Sub" &&
    state === "Default" &&
    ((size === "Small" && !icon) || (size === "Medium" && icon))
  const isSubAndMediumAndDefaultAndIcon =
    type === "Sub" && size === "Medium" && state === "Default" && icon
  const isSubAndSmallAndDefaultAndNotIcon =
    type === "Sub" && size === "Small" && state === "Default" && !icon
  return (
    <div
      className={
        className ||
        `relative ${
          isFileAndMediumAndDefaultAndNotIcon
            ? "bg-[#fff4db] h-[32px] rounded-[8px]"
            : isGhostAndSmallAndDefaultAndNotIcon
              ? "bg-[#eef1f8] h-[24px] rounded-[6px]"
              : isSubAndMediumAndDefaultAndIcon
                ? "bg-white h-[32px] rounded-[8px]"
                : isSubAndSmallAndDefaultAndNotIcon
                  ? "bg-white h-[24px] rounded-[6px]"
                  : "bg-[#2a3461] h-[32px] rounded-[8px]"
        }`
      }
    >
      <div
        aria-hidden={
          isSubAndDefaultAndIsSmallAndNotIconOrMediumAndIcon ? true : undefined
        }
        className={
          isSubAndMediumAndDefaultAndIcon
            ? "absolute border border-[#c2cfdf] border-solid inset-0 pointer-events-none rounded-[8px]"
            : isSubAndSmallAndDefaultAndNotIcon
              ? "absolute border border-[#c2cfdf] border-solid inset-0 pointer-events-none rounded-[6px]"
              : "flex flex-row items-center justify-center size-full"
        }
      >
        {state === "Default" &&
          ((type === "Primary" && size === "Medium" && icon) ||
            (type === "Ghost" && size === "Small" && !icon) ||
            (type === "File" && size === "Medium" && !icon)) && (
            <div
              className={`content-stretch flex items-center justify-center relative size-full ${
                isFileAndMediumAndDefaultAndNotIcon
                  ? "px-[10px] py-[8px]"
                  : isGhostAndSmallAndDefaultAndNotIcon
                    ? "px-[6px] py-[5px]"
                    : "gap-[4px] px-[10px] py-[8px]"
              }`}
            >
              {state === "Default" &&
                !icon &&
                ((type === "Ghost" && size === "Small") ||
                  (type === "File" && size === "Medium")) && (
                  <p
                    className={`[word-break:break-word] font-["Pretendard:Regular",sans-serif] not-italic relative shrink-0 whitespace-nowrap ${
                      isFileAndMediumAndDefaultAndNotIcon
                        ? "leading-[22px] text-[#ef5a27] text-[14px] tracking-[0.01px]"
                        : "leading-[18px] text-[#3e4d63] text-[12px]"
                    }`}
                  >
                    {isFileAndMediumAndDefaultAndNotIcon
                      ? "파일 선택"
                      : isGhostAndSmallAndDefaultAndNotIcon
                        ? "취소"
                        : ""}
                  </p>
                )}
              {isPrimaryAndMediumAndDefaultAndIcon && (
                <>
                  <div
                    className="relative shrink-0 size-[16px]"
                    data-name="noti"
                  >
                    <div className="flex flex-col items-center justify-center size-full">
                      <div className="content-stretch flex flex-col items-center justify-center relative size-full">
                        <div
                          className="h-[10px] relative shrink-0 w-[13px]"
                          data-name="Group"
                        >
                          <div className="absolute inset-[-5%_-3.85%]">
                            <svg
                              className="block size-full"
                              fill="none"
                              height="11"
                              preserveAspectRatio="none"
                              viewBox="0 0 14.0001 11"
                              width="14.0001"
                            >
                              <g id="Group">
                                <path
                                  d={svgPaths.p1f34af00}
                                  id="Vector"
                                  stroke="white"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d={svgPaths.p12c14080}
                                  id="Vector_2"
                                  stroke="white"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-white tracking-[0.01px] whitespace-nowrap">
                    메인버튼
                  </p>
                </>
              )}
            </div>
          )}
      </div>
      {isSubAndDefaultAndIsSmallAndNotIconOrMediumAndIcon && (
        <div className="flex flex-row items-center justify-center size-full">
          <div
            className={`content-stretch flex items-center justify-center relative size-full ${
              isSubAndMediumAndDefaultAndIcon
                ? "gap-[4px] px-[10px] py-[8px]"
                : "px-[6px] py-[5px]"
            }`}
          >
            {isSubAndSmallAndDefaultAndNotIcon && (
              <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#2a3461] text-[12px] whitespace-nowrap">
                서브버튼
              </p>
            )}
            {isSubAndMediumAndDefaultAndIcon && (
              <>
                <div className="relative shrink-0 size-[16px]" data-name="noti">
                  <div className="flex flex-col items-center justify-center size-full">
                    <div className="content-stretch flex flex-col items-center justify-center relative size-full">
                      <div
                        className="h-[10px] relative shrink-0 w-[13px]"
                        data-name="Group"
                      >
                        <div className="absolute inset-[-5%_-3.85%]">
                          <svg
                            className="block size-full"
                            fill="none"
                            height="11"
                            preserveAspectRatio="none"
                            viewBox="0 0 14.0001 11"
                            width="14.0001"
                          >
                            <g id="Group">
                              <path
                                d={svgPaths.p1f34af00}
                                id="Vector"
                                stroke="#2A3461"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d={svgPaths.p12c14080}
                                id="Vector_2"
                                stroke="#2A3461"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#2a3461] text-[14px] tracking-[0.01px] whitespace-nowrap">
                  서브버튼
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
type DateSelectProps = {
  className?: string
  size?: "Medium"
  type?: "YearMonth"
}

function DateSelect({
  className,
  size = "Medium",
  type = "YearMonth",
}: DateSelectProps) {
  return (
    <div className={className || "relative"}>
      <div className="content-stretch flex gap-[6px] items-start relative size-full">
        <div
          className="bg-white relative rounded-[8px] shrink-0"
          data-name="Input"
        >
          <div className="content-stretch flex items-center overflow-clip p-[8px] relative rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
              <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#6d819b] text-[14px] tracking-[-0.28px] whitespace-nowrap">
                2026년
              </p>
              <div
                className="h-[5px] relative shrink-0 w-[10px]"
                data-name="Vector"
              >
                <div className="absolute inset-[-15%_-7.5%]">
                  <svg
                    className="block size-full"
                    fill="none"
                    height="6.5"
                    preserveAspectRatio="none"
                    viewBox="0 0 11.5 6.5"
                    width="11.5"
                  >
                    <path
                      d={svgPaths.p2c6ca280}
                      id="Vector"
                      stroke="#CED4DA"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div
            aria-hidden
            className="absolute border border-[#d7e1ee] border-solid inset-0 pointer-events-none rounded-[8px]"
          />
        </div>
        <div
          className="bg-white relative rounded-[8px] shrink-0"
          data-name="Input"
        >
          <div className="content-stretch flex items-center overflow-clip p-[8px] relative rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
              <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#6d819b] text-[14px] tracking-[-0.28px] whitespace-nowrap">
                1월
              </p>
              <div
                className="h-[5px] relative shrink-0 w-[10px]"
                data-name="Vector"
              >
                <div className="absolute inset-[-15%_-7.5%]">
                  <svg
                    className="block size-full"
                    fill="none"
                    height="6.5"
                    preserveAspectRatio="none"
                    viewBox="0 0 11.5 6.5"
                    width="11.5"
                  >
                    <path
                      d={svgPaths.p2c6ca280}
                      id="Vector"
                      stroke="#CED4DA"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div
            aria-hidden
            className="absolute border border-[#d7e1ee] border-solid inset-0 pointer-events-none rounded-[8px]"
          />
        </div>
        <div
          className="bg-[#fff4db] h-[32px] relative rounded-[8px] shrink-0"
          data-name="Button_Component"
        >
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex items-center justify-center px-[10px] py-[8px] relative size-full">
              <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#ef5a27] text-[14px] tracking-[0.01px] whitespace-nowrap">
                당월
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
type ComponentProps = {
  className?: string
  propValue?: "없음"
}

function Component({ className, propValue = "없음" }: ComponentProps) {
  return (
    <div className={className || "bg-[#d9e2ef] relative rounded-[8px]"}>
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-px relative size-full">
          <div className="bg-[#eef3fa] h-[100px] overflow-clip relative rounded-[8px] shrink-0 w-[84px]">
            <div className="absolute contents left-[17px] top-[19.83px]">
              <div
                className="absolute left-[20.5px] size-[44px] top-[19.83px]"
                data-name="no-img"
              >
                <svg
                  className="absolute block inset-0 size-full"
                  fill="none"
                  height="44"
                  preserveAspectRatio="none"
                  viewBox="0 0 44 44"
                  width="44"
                >
                  <g id="no-img">
                    <path d={svgPaths.p204ea200} fill="#C2CFDF" id="Vector" />
                  </g>
                </svg>
              </div>
              <p className="[word-break:break-word] absolute font-['Pretendard:Regular',sans-serif] leading-[16px] left-[17px] not-italic text-[#8a9cb4] text-[14px] top-[63.83px] tracking-[-0.28px] whitespace-nowrap">
                사진 없음
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
type TwemojiFemaleSignProps = {
  className?: string
  propValue?: "여"
}

function TwemojiFemaleSign({
  className,
  propValue = "여",
}: TwemojiFemaleSignProps) {
  return (
    <div className={className || "relative size-[20px]"}>
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[10px] items-center justify-center px-[5px] py-[4px] relative size-full">
          <div className="-translate-x-1/2 absolute bg-[#fce7f3] bottom-0 left-1/2 rounded-[6px] size-[20px]" />
          <div className="-translate-x-1/2 absolute bg-[#fce7f3] bottom-0 left-1/2 rounded-[6px] size-[20px]" />
          <div
            className="h-[12.75px] relative shrink-0 w-[8.25px]"
            data-name="Vector"
          >
            <svg
              className="absolute block inset-0 size-full"
              fill="none"
              height="12.75"
              preserveAspectRatio="none"
              viewBox="0 0 8.25 12.75"
              width="8.25"
            >
              <path d={svgPaths.p26aa8900} fill="#BE185D" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
type Component1Props = {
  className?: string
  propValue?: "여/수급자"
}

function Component1({ className, propValue = "여/수급자" }: Component1Props) {
  return (
    <div className={className || "h-[32px] relative"}>
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[5px] items-center relative size-full">
          <TwemojiFemaleSign className="relative shrink-0 size-[20px]" />
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
            <div className="[word-break:break-word] col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 not-italic place-items-start relative row-1 whitespace-nowrap">
              <p className="col-1 font-['Pretendard:Bold',sans-serif] leading-[24px] ml-0 mt-0 relative row-1 text-[#0e1225] text-[18px] tracking-[-0.36px]">
                홍길동
              </p>
              <p className="capitalize col-1 font-['Pretendard:Regular',sans-serif] leading-[18px] ml-[51px] mt-[3px] relative row-1 text-[#8a9cb4] text-[14px] tracking-[-0.28px]">
                1949.03.06 (89세)
              </p>
            </div>
          </div>
          <div
            className="bg-[#eef1f8] relative rounded-[6px] shrink-0"
            data-name="Badge"
          >
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex items-center justify-center px-[8px] py-[4px] relative size-full">
                <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#2a3461] text-[12px] whitespace-nowrap">
                  4등급
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Group() {
  return (
    <div className="h-[10px] relative shrink-0 w-[13px]" data-name="Group">
      <div className="absolute inset-[-5%_-3.85%]">
        <svg
          className="block size-full"
          fill="none"
          height="11"
          preserveAspectRatio="none"
          viewBox="0 0 14.0001 11"
          width="14.0001"
        >
          <g id="Group">
            <path
              d={svgPaths.p1f34af00}
              id="Vector"
              stroke="#2A3461"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={svgPaths.p12c14080}
              id="Vector_2"
              stroke="#2A3461"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

function Group1() {
  return (
    <div className="h-[10px] relative shrink-0 w-[13px]" data-name="Group">
      <div className="absolute inset-[-5%_-3.85%]">
        <svg
          className="block size-full"
          fill="none"
          height="11"
          preserveAspectRatio="none"
          viewBox="0 0 14.0001 11"
          width="14.0001"
        >
          <g id="Group">
            <path
              d={svgPaths.p1f34af00}
              id="Vector"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={svgPaths.p12c14080}
              id="Vector_2"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

function Frame27() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-end relative shrink-0">
      <div
        className="bg-white h-[32px] relative rounded-[8px] shrink-0"
        data-name="Button_Component"
      >
        <div
          aria-hidden
          className="absolute border border-[#c2cfdf] border-solid inset-0 pointer-events-none rounded-[8px]"
        />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[10px] py-[8px] relative size-full">
            <div className="relative shrink-0 size-[16px]" data-name="noti">
              <div className="flex flex-col items-center justify-center size-full">
                <div className="content-stretch flex flex-col items-center justify-center relative size-full">
                  <Group />
                </div>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#2a3461] text-[14px] tracking-[0.01px] whitespace-nowrap">
              문자 발송 관리
            </p>
          </div>
        </div>
      </div>
      <div
        className="bg-[#2a3461] h-[32px] relative rounded-[8px] shrink-0"
        data-name="Button_Component"
      >
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[10px] py-[8px] relative size-full">
            <div className="relative shrink-0 size-[16px]" data-name="noti">
              <div className="flex flex-col items-center justify-center size-full">
                <div className="content-stretch flex flex-col items-center justify-center relative size-full">
                  <Group1 />
                </div>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-white tracking-[0.01px] whitespace-nowrap">
              주요질환/특이사항 입력
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Frame21() {
  return (
    <div className="content-stretch flex h-[32px] items-center justify-between relative shrink-0 w-full">
      <Component1 className="h-[32px] relative shrink-0" />
      <Frame27 />
    </div>
  )
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame21 />
    </div>
  )
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame7 />
    </div>
  )
}

function Label() {
  return (
    <div
      className="bg-[#f4f7fc] h-[40px] relative shrink-0 w-[80px]"
      data-name="label/주민번호"
    >
      <div className="content-stretch flex items-center overflow-clip px-[10px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px] whitespace-nowrap">
          인정번호
        </p>
      </div>
      <div
        aria-hidden
        className="absolute border border-[#c2cfdf] border-solid inset-0 pointer-events-none"
      />
    </div>
  )
}

function Data() {
  return (
    <div
      className="bg-white flex-[1_0_0] h-[40px] min-w-px relative"
      data-name="data/주민번호"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[10px] relative size-full">
          <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#283445] text-[14px] tracking-[-0.28px] whitespace-nowrap">
            00000000000
          </p>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute border-[#c2cfdf] border-b border-r border-solid border-t inset-0 pointer-events-none"
      />
    </div>
  )
}

function Label1() {
  return (
    <div
      className="bg-[#f4f7fc] h-[40px] relative shrink-0 w-[80px]"
      data-name="label/연락처"
    >
      <div className="content-stretch flex items-center overflow-clip px-[10px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px] whitespace-nowrap">
          연락처
        </p>
      </div>
      <div
        aria-hidden
        className="absolute border-[#c2cfdf] border-b border-r border-solid border-t inset-0 pointer-events-none"
      />
    </div>
  )
}

function Data1() {
  return (
    <div
      className="bg-white flex-[1_0_0] h-[40px] min-w-px relative"
      data-name="data/연락처"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[10px] relative size-full">
          <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#283445] text-[14px] tracking-[-0.28px] whitespace-nowrap">
            010-0000-0000
          </p>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute border-[#c2cfdf] border-b border-r border-solid border-t inset-0 pointer-events-none"
      />
    </div>
  )
}

function Frame() {
  return (
    <div
      className="content-stretch flex h-[40px] items-start relative shrink-0 w-full"
      data-name="Frame"
    >
      <Label />
      <Data />
      <Label1 />
      <Data1 />
    </div>
  )
}

function Label2() {
  return (
    <div
      className="bg-[#f4f7fc] h-[40px] relative shrink-0 w-[80px]"
      data-name="label/등급"
    >
      <div className="content-stretch flex items-center overflow-clip px-[10px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px] whitespace-nowrap">
          등급
        </p>
      </div>
      <div
        aria-hidden
        className="absolute border-[#c2cfdf] border-b border-l border-r border-solid inset-0 pointer-events-none"
      />
    </div>
  )
}

function Data2() {
  return (
    <div
      className="bg-white flex-[1_0_0] h-[40px] min-w-px relative"
      data-name="data/등급"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[6px] items-center px-[10px] relative size-full">
          <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#283445] text-[14px] tracking-[-0.28px] whitespace-nowrap">
            2등급
          </p>
          <div
            className="bg-[#eef1f8] h-[24px] relative rounded-[6px] shrink-0"
            data-name="Button_Component"
          >
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex items-center justify-center px-[6px] py-[5px] relative size-full">
                <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#3e4d63] text-[12px] tracking-[-0.24px] whitespace-nowrap">
                  이력
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute border-[#c2cfdf] border-b border-r border-solid inset-0 pointer-events-none"
      />
    </div>
  )
}

function Label3() {
  return (
    <div
      className="bg-[#f4f7fc] h-[40px] relative shrink-0 w-[80px]"
      data-name="label/본인부담률"
    >
      <div className="content-stretch flex items-center overflow-clip px-[10px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px] whitespace-nowrap">
          본인부담률
        </p>
      </div>
      <div
        aria-hidden
        className="absolute border-[#c2cfdf] border-b border-r border-solid inset-0 pointer-events-none"
      />
    </div>
  )
}

function Data3() {
  return (
    <div
      className="bg-white flex-[1_0_0] h-[40px] min-w-px relative"
      data-name="data/본인부담률"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[6px] items-center px-[10px] relative size-full">
          <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#283445] text-[14px] tracking-[-0.28px] whitespace-nowrap">
            감경(40%)·12%
          </p>
          <div
            className="bg-[#eef1f8] h-[24px] relative rounded-[6px] shrink-0"
            data-name="Button_Component"
          >
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex items-center justify-center px-[6px] py-[5px] relative size-full">
                <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#3e4d63] text-[12px] tracking-[-0.24px] whitespace-nowrap">
                  이력
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute border-[#c2cfdf] border-b border-r border-solid inset-0 pointer-events-none"
      />
    </div>
  )
}

function Frame1() {
  return (
    <div
      className="content-stretch flex h-[40px] items-start relative shrink-0 w-full"
      data-name="Frame"
    >
      <Label2 />
      <Data2 />
      <Label3 />
      <Data3 />
    </div>
  )
}

function Label4() {
  return (
    <div
      className="bg-[#f4f7fc] h-[40px] relative shrink-0 w-[80px]"
      data-name="label/인정기간"
    >
      <div className="content-stretch flex items-center overflow-clip px-[10px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px] whitespace-nowrap">
          인정기간
        </p>
      </div>
      <div
        aria-hidden
        className="absolute border-[#c2cfdf] border-b border-l border-r border-solid inset-0 pointer-events-none"
      />
    </div>
  )
}

function Data4() {
  return (
    <div
      className="bg-white flex-[1_0_0] h-[40px] min-w-px relative"
      data-name="data/인정기간"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[10px] relative size-full">
          <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#283445] text-[14px] tracking-[-0.28px] whitespace-nowrap">
            0000.00.00 - 0000.00.00
          </p>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute border-[#c2cfdf] border-b border-r border-solid inset-0 pointer-events-none"
      />
    </div>
  )
}

function Label5() {
  return (
    <div
      className="bg-[#f4f7fc] h-[40px] relative shrink-0 w-[80px]"
      data-name="label/계약기간"
    >
      <div className="content-stretch flex items-center overflow-clip px-[10px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px] whitespace-nowrap">
          계약기간
        </p>
      </div>
      <div
        aria-hidden
        className="absolute border-[#c2cfdf] border-b border-r border-solid inset-0 pointer-events-none"
      />
    </div>
  )
}

function Data5() {
  return (
    <div
      className="bg-white flex-[1_0_0] h-[40px] min-w-px relative"
      data-name="data/계약기간"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[6px] items-center px-[10px] relative size-full">
          <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#283445] text-[14px] tracking-[-0.28px] whitespace-nowrap">
            0000.00.00 - 0000.00.00
          </p>
          <div
            className="bg-[#eef1f8] h-[24px] relative rounded-[6px] shrink-0"
            data-name="Button_Component"
          >
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex items-center justify-center px-[6px] py-[5px] relative size-full">
                <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#3e4d63] text-[12px] tracking-[-0.24px] whitespace-nowrap">
                  이력
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute border-[#c2cfdf] border-b border-r border-solid inset-0 pointer-events-none"
      />
    </div>
  )
}

function Frame2() {
  return (
    <div
      className="content-stretch flex h-[40px] items-start relative shrink-0 w-full"
      data-name="Frame"
    >
      <Label4 />
      <Data4 />
      <Label5 />
      <Data5 />
    </div>
  )
}

function Label6() {
  return (
    <div
      className="bg-[#f4f7fc] h-[40px] relative shrink-0 w-[80px]"
      data-name="label/주소"
    >
      <div className="content-stretch flex items-center overflow-clip px-[10px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px] whitespace-nowrap">
          주소
        </p>
      </div>
      <div
        aria-hidden
        className="absolute border-[#c2cfdf] border-b border-l border-r border-solid inset-0 pointer-events-none"
      />
    </div>
  )
}

function Data6() {
  return (
    <div
      className="bg-white flex-[1_0_0] h-[40px] min-w-px relative"
      data-name="data/주소"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[6px] items-center px-[10px] relative size-full">
          <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#283445] text-[14px] tracking-[-0.28px] whitespace-nowrap">
            서울시 구로구 디지털로34길 55, 코오롱싸이언스밸리2차 B101호 (웍앤코)
          </p>
          <div
            className="bg-white h-[24px] relative rounded-[6px] shrink-0"
            data-name="Button_Component"
          >
            <div
              aria-hidden
              className="absolute border border-[#c2cfdf] border-solid inset-0 pointer-events-none rounded-[6px]"
            />
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex items-center justify-center px-[6px] py-[5px] relative size-full">
                <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#2a3461] text-[12px] tracking-[-0.24px] whitespace-nowrap">
                  관리
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute border-[#c2cfdf] border-b border-r border-solid inset-0 pointer-events-none"
      />
    </div>
  )
}

function Frame3() {
  return (
    <div
      className="content-stretch flex h-[40px] items-start relative shrink-0 w-full"
      data-name="Frame"
    >
      <Label6 />
      <Data6 />
    </div>
  )
}

function Label7() {
  return (
    <div
      className="bg-[#f4f7fc] h-[40px] relative shrink-0 w-[80px]"
      data-name="label/생활실명"
    >
      <div className="content-stretch flex items-center overflow-clip px-[10px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px] whitespace-nowrap">
          생활실명
        </p>
      </div>
      <div
        aria-hidden
        className="absolute border-[#c2cfdf] border-b border-l border-r border-solid inset-0 pointer-events-none"
      />
    </div>
  )
}

function Data7() {
  return (
    <div
      className="bg-white flex-[1_0_0] h-[40px] min-w-px relative"
      data-name="data/생활실명"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[6px] items-center px-[10px] relative size-full">
          <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#283445] text-[14px] tracking-[-0.28px] whitespace-nowrap">
            생활실명
          </p>
          <div
            className="bg-white h-[24px] relative rounded-[6px] shrink-0"
            data-name="Button_Component"
          >
            <div
              aria-hidden
              className="absolute border border-[#c2cfdf] border-solid inset-0 pointer-events-none rounded-[6px]"
            />
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex items-center justify-center px-[6px] py-[5px] relative size-full">
                <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#2a3461] text-[12px] tracking-[-0.24px] whitespace-nowrap">
                  관리
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute border-[#c2cfdf] border-b border-r border-solid inset-0 pointer-events-none"
      />
    </div>
  )
}

function Label8() {
  return (
    <div
      className="bg-[#f4f7fc] h-[40px] relative shrink-0 w-[80px]"
      data-name="label/담당 복지사"
    >
      <div className="content-stretch flex items-center overflow-clip px-[10px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px] whitespace-nowrap">
          담당 복지사
        </p>
      </div>
      <div
        aria-hidden
        className="absolute border-[#c2cfdf] border-b border-r border-solid inset-0 pointer-events-none"
      />
    </div>
  )
}

function Data8() {
  return (
    <div
      className="bg-white flex-[1_0_0] h-[40px] min-w-px relative"
      data-name="data/담당 복지사"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[6px] items-center px-[10px] relative size-full">
          <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#283445] text-[14px] tracking-[-0.28px] whitespace-nowrap">
            김지수
          </p>
          <div
            className="bg-white h-[24px] relative rounded-[6px] shrink-0"
            data-name="Button_Component"
          >
            <div
              aria-hidden
              className="absolute border border-[#c2cfdf] border-solid inset-0 pointer-events-none rounded-[6px]"
            />
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex items-center justify-center px-[6px] py-[5px] relative size-full">
                <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#2a3461] text-[12px] tracking-[-0.24px] whitespace-nowrap">
                  관리
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute border-[#c2cfdf] border-b border-r border-solid inset-0 pointer-events-none"
      />
    </div>
  )
}

function Frame4() {
  return (
    <div
      className="content-stretch flex h-[40px] items-start relative shrink-0 w-full"
      data-name="Frame"
    >
      <Label7 />
      <Data7 />
      <Label8 />
      <Data8 />
    </div>
  )
}

function Label9() {
  return (
    <div
      className="bg-[#f4f7fc] h-[40px] relative shrink-0 w-[80px]"
      data-name="label/주요질환"
    >
      <div className="content-stretch flex items-center overflow-clip px-[10px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px] whitespace-nowrap">
          주요질환
        </p>
      </div>
      <div
        aria-hidden
        className="absolute border-[#c2cfdf] border-b border-l border-r border-solid inset-0 pointer-events-none"
      />
    </div>
  )
}

function Data9() {
  return (
    <div
      className="bg-white flex-[1_0_0] h-[40px] min-w-px relative"
      data-name="data/주요질환"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[10px] relative size-full">
          <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#283445] text-[14px] tracking-[-0.28px] whitespace-nowrap">
            골다공증/고혈압
          </p>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute border-[#c2cfdf] border-b border-r border-solid inset-0 pointer-events-none"
      />
    </div>
  )
}

function Frame5() {
  return (
    <div
      className="content-stretch flex h-[40px] items-start relative shrink-0 w-full"
      data-name="Frame"
    >
      <Label9 />
      <Data9 />
    </div>
  )
}

function Label10() {
  return (
    <div
      className="bg-[#f4f7fc] h-[40px] relative shrink-0 w-[80px]"
      data-name="label/특이사항"
    >
      <div className="content-stretch flex items-center overflow-clip px-[10px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px] whitespace-nowrap">
          특이사항
        </p>
      </div>
      <div
        aria-hidden
        className="absolute border-[#c2cfdf] border-b border-l border-r border-solid inset-0 pointer-events-none"
      />
    </div>
  )
}

function Data10() {
  return (
    <div
      className="bg-white flex-[1_0_0] h-[40px] min-w-px relative"
      data-name="data/특이사항"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[10px] relative size-full">
          <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#283445] text-[14px] tracking-[-0.28px] whitespace-nowrap">
            땅콩 알레르기
          </p>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute border-[#c2cfdf] border-b border-r border-solid inset-0 pointer-events-none"
      />
    </div>
  )
}

function Frame6() {
  return (
    <div
      className="content-stretch flex h-[40px] items-start relative shrink-0 w-full"
      data-name="Frame"
    >
      <Label10 />
      <Data10 />
    </div>
  )
}

function Frame20() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full">
      <div
        className="bg-white flex-[1_0_0] h-[280px] min-w-px relative"
        data-name="세로형 테이블"
      >
        <div className="flex flex-col justify-center size-full">
          <div className="content-stretch flex flex-col items-start justify-center relative size-full">
            <Frame />
            <Frame1 />
            <Frame2 />
            <Frame3 />
            <Frame4 />
            <Frame5 />
            <Frame6 />
          </div>
        </div>
      </div>
    </div>
  )
}

function Frame22() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative">
      <Frame20 />
    </div>
  )
}

function Frame9() {
  return (
    <div className="content-stretch flex gap-[15px] items-start relative shrink-0 w-full">
      <Component className="bg-[#d9e2ef] relative rounded-[8px] shrink-0" />
      <Frame22 />
    </div>
  )
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame18 />
      <Frame9 />
    </div>
  )
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame11 />
    </div>
  )
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <div
        className="h-[32px] relative shrink-0 w-full"
        data-name="Tab Navigation"
      >
        <div
          aria-hidden
          className="absolute border-[#c2cfdf] border-b border-solid inset-0 pointer-events-none"
        />
        <div className="content-stretch flex items-start relative size-full">
          <div className="h-[32px] relative shrink-0" data-name="Tab Item">
            <div
              aria-hidden
              className="absolute border-[#2a3461] border-b-2 border-solid inset-0 pointer-events-none"
            />
            <div className="content-stretch flex items-start px-[8px] py-[7px] relative size-full">
              <p className="[word-break:break-word] font-['Pretendard:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#2a3461] text-[16px] tracking-[-0.32px] whitespace-nowrap">
                기본정보
              </p>
            </div>
          </div>
          <div className="h-[32px] relative shrink-0" data-name="Tab Item">
            <div className="content-stretch flex items-start px-[8px] py-[7px] relative size-full">
              <p className="[word-break:break-word] font-['Pretendard:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#8a9cb4] text-[16px] tracking-[-0.32px] whitespace-nowrap">
                보호자정보
              </p>
            </div>
          </div>
        </div>
      </div>
      <Frame10 />
    </div>
  )
}

function Component2() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="1"
    >
      <Frame8 />
    </div>
  )
}

function Frame15() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <p className="[word-break:break-word] font-['Pretendard:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#0e1225] text-[17px] tracking-[-0.34px] whitespace-nowrap">
        기타비용
      </p>
    </div>
  )
}

function Frame28() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0">
      <div
        className="bg-[#2a3461] h-[32px] relative rounded-[8px] shrink-0"
        data-name="Button_Component"
      >
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[10px] py-[8px] relative size-full">
            <div
              className="relative shrink-0 size-[16px]"
              data-name="Icon_Component"
            >
              <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex flex-col items-center justify-center px-px py-[3px] relative size-full">
                  <div
                    className="relative shrink-0 size-[11.992px]"
                    data-name="Vector"
                  >
                    <div className="absolute inset-[-4.17%]">
                      <svg
                        className="block size-full"
                        fill="none"
                        height="12.9923"
                        preserveAspectRatio="none"
                        viewBox="0 0 12.9923 12.9923"
                        width="12.9923"
                      >
                        <path
                          d={svgPaths.p3873da80}
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
              기타비용 신규등록
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Frame14() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame15 />
      <Frame28 />
    </div>
  )
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame14 />
    </div>
  )
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame23 />
    </div>
  )
}

function Frame25() {
  return (
    <div className="content-stretch flex h-[32px] items-start relative shrink-0 w-full">
      <DateSelect className="absolute left-0 top-0" />
    </div>
  )
}

function Frame24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame25 />
    </div>
  )
}

function Component7() {
  return (
    <div
      className="bg-white content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full"
      data-name="8"
    >
      <Frame19 />
      <Frame24 />
    </div>
  )
}

function Component6() {
  return (
    <div
      className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="7"
    >
      <Component7 />
    </div>
  )
}

function Frame26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Component6 />
    </div>
  )
}

function Component5() {
  return (
    <div
      className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="5"
    >
      <Frame26 />
    </div>
  )
}

function Header() {
  return (
    <div
      className="bg-[#f4f7fc] h-[44px] relative shrink-0 w-full"
      data-name="header"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="[word-break:break-word] content-stretch flex font-['Pretendard:Regular',sans-serif] items-center justify-between leading-[normal] not-italic pl-[10px] pr-[8px] relative size-full whitespace-nowrap">
          <p className="relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px]">
            발생일
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

function Header1() {
  return (
    <div
      className="bg-[#f4f7fc] h-[44px] relative shrink-0 w-full"
      data-name="header"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="[word-break:break-word] content-stretch flex font-['Pretendard:Regular',sans-serif] items-center justify-between leading-[normal] not-italic pl-[10px] pr-[8px] relative size-full whitespace-nowrap">
          <p className="relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px]">
            비용처리자
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

function Header2() {
  return (
    <div
      className="bg-[#f4f7fc] h-[44px] relative shrink-0 w-full"
      data-name="header"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="[word-break:break-word] content-stretch flex font-['Pretendard:Regular',sans-serif] items-center justify-between leading-[normal] not-italic pl-[10px] pr-[8px] relative size-full whitespace-nowrap">
          <p className="relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px]">
            금액
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
        <div className="[word-break:break-word] content-stretch flex font-['Pretendard:Regular',sans-serif] items-center justify-between not-italic pl-[10px] pr-[8px] relative size-full whitespace-nowrap">
          <p className="leading-[normal] relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px]">
            비용발생 항목
          </p>
          <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-[#8a9cb4] text-[10px] tracking-[-0.2px]">
            <p className="leading-[normal]">{` ↕`}</p>
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

function Header4() {
  return (
    <div
      className="bg-[#f4f7fc] h-[44px] relative shrink-0 w-full"
      data-name="header"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="[word-break:break-word] content-stretch flex font-['Pretendard:Regular',sans-serif] items-center justify-between not-italic pl-[10px] pr-[8px] relative size-full whitespace-nowrap">
          <p className="leading-[normal] relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px]">
            상세내용
          </p>
          <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-[#8a9cb4] text-[10px] tracking-[-0.2px]">
            <p className="leading-[normal]">{` ↕`}</p>
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

function Header5() {
  return (
    <div
      className="bg-[#f4f7fc] h-[44px] relative shrink-0 w-full"
      data-name="header"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="[word-break:break-word] content-stretch flex font-['Pretendard:Regular',sans-serif] items-center justify-between not-italic pl-[10px] pr-[8px] relative size-full whitespace-nowrap">
          <p className="leading-[normal] relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px]">
            본인부담금 청구
          </p>
          <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-[#8a9cb4] text-[10px] tracking-[-0.2px]">
            <p className="leading-[normal]">{` ↕`}</p>
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

function Header6() {
  return (
    <div
      className="bg-[#f4f7fc] h-[44px] relative shrink-0 w-full"
      data-name="header"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between pl-[10px] pr-[8px] relative size-full">
          <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px] whitespace-nowrap">
            첨부영수증
          </p>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute border-[#c2cfdf] border-b border-l border-solid border-t inset-0 pointer-events-none"
      />
    </div>
  )
}

function Table() {
  return (
    <div
      className="bg-white h-[204px] relative shrink-0 w-full"
      data-name="Table (컴포넌트 기반)"
    >
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="relative shrink-0" data-name="Table/Column">
          <div className="overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex flex-col items-start relative size-full">
              <Header />
              <div
                className="bg-white h-[40px] relative shrink-0 w-full"
                data-name="cell-1"
              >
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center px-[10px] relative size-full">
                    <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                      2026.01.08
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
                      2026.01.02
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
                      2026.01.05
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
                      2026.01.09
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
                      2026.01.12
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
                      2026.01.15
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
                      2026.01.18
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
                      2026.01.20
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
                      2026.01.22
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
                      2026.01.25
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
        <div className="relative shrink-0" data-name="Table/Column">
          <div className="overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex flex-col items-start relative size-full">
              <Header1 />
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
        <div className="relative shrink-0 w-[99px]" data-name="Table/Column">
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
                      1,234
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
                      5,678
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
                      9,012
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
                      3,456
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
                      7,890
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
                      2,345
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
                      6,789
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
                      1,234
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
                      5,678
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
                      9,012
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
        <div className="relative shrink-0" data-name="Table/Column">
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
                      이미용비
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
                      기타비용
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
                      기타비용
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
                      기타비용
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
                      텍스트 값
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
                      텍스트 값
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
                      텍스트 값
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
                      텍스트 값
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
                      텍스트 값
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
                      텍스트 값
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
          data-name="Table/Column"
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
                      -
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
                      -
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
                      -
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
                      -
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
                      텍스트 값
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
                      텍스트 값
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
                      텍스트 값
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
                      텍스트 값
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
                      텍스트 값
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
                      텍스트 값
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
        <div className="relative shrink-0" data-name="Table/Column">
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
                      청구함
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
                      청구함
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
                      청구함
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
                      청구함
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
                      텍스트 값
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
                      텍스트 값
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
                      텍스트 값
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
                      텍스트 값
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
                      텍스트 값
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
                      텍스트 값
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
        <div className="relative shrink-0" data-name="Table/Column">
          <div className="overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex flex-col items-start relative size-full">
              <Header6 />
              <div
                className="bg-white h-[40px] relative shrink-0 w-[74px]"
                data-name="cell-1"
              >
                <div
                  aria-hidden
                  className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                />
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex items-center px-[10px] relative size-full">
                    <ButtonComponent
                      className="bg-white h-[24px] relative rounded-[6px] shrink-0"
                      icon={false}
                      size="Small"
                      type="Sub"
                    />
                  </div>
                </div>
              </div>
              <div
                className="bg-white h-[40px] relative shrink-0 w-[74px]"
                data-name="cell-2"
              >
                <div
                  aria-hidden
                  className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                />
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex items-center px-[10px] relative size-full">
                    <ButtonComponent
                      className="bg-white h-[24px] relative rounded-[6px] shrink-0"
                      icon={false}
                      size="Small"
                      type="Sub"
                    />
                  </div>
                </div>
              </div>
              <div
                className="bg-white h-[40px] relative shrink-0 w-[74px]"
                data-name="cell-3"
              >
                <div
                  aria-hidden
                  className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                />
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex items-center px-[10px] relative size-full">
                    <ButtonComponent
                      className="bg-white h-[24px] relative rounded-[6px] shrink-0"
                      icon={false}
                      size="Small"
                      type="Sub"
                    />
                  </div>
                </div>
              </div>
              <div
                className="bg-white h-[40px] relative shrink-0 w-[74px]"
                data-name="cell-4"
              >
                <div
                  aria-hidden
                  className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                />
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex items-center px-[10px] relative size-full">
                    <ButtonComponent
                      className="bg-white h-[24px] relative rounded-[6px] shrink-0"
                      icon={false}
                      size="Small"
                      type="Sub"
                    />
                  </div>
                </div>
              </div>
              <div
                className="bg-white h-[40px] relative shrink-0 w-[74px]"
                data-name="cell-5"
              >
                <div
                  aria-hidden
                  className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                />
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex items-center px-[10px] relative size-full">
                    <ButtonComponent
                      className="bg-white h-[24px] relative rounded-[6px] shrink-0"
                      icon={false}
                      size="Small"
                      type="Sub"
                    />
                  </div>
                </div>
              </div>
              <div
                className="bg-white h-[40px] relative shrink-0 w-[74px]"
                data-name="cell-6"
              >
                <div
                  aria-hidden
                  className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                />
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex items-center px-[10px] relative size-full">
                    <ButtonComponent
                      className="bg-white h-[24px] relative rounded-[6px] shrink-0"
                      icon={false}
                      size="Small"
                      type="Sub"
                    />
                  </div>
                </div>
              </div>
              <div
                className="bg-white h-[40px] relative shrink-0 w-[74px]"
                data-name="cell-7"
              >
                <div
                  aria-hidden
                  className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                />
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex items-center px-[10px] relative size-full">
                    <ButtonComponent
                      className="bg-white h-[24px] relative rounded-[6px] shrink-0"
                      icon={false}
                      size="Small"
                      type="Sub"
                    />
                  </div>
                </div>
              </div>
              <div
                className="bg-white h-[40px] relative shrink-0 w-[74px]"
                data-name="cell-8"
              >
                <div
                  aria-hidden
                  className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                />
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex items-center px-[10px] relative size-full">
                    <ButtonComponent
                      className="bg-white h-[24px] relative rounded-[6px] shrink-0"
                      icon={false}
                      size="Small"
                      type="Sub"
                    />
                  </div>
                </div>
              </div>
              <div
                className="bg-white h-[40px] relative shrink-0 w-[74px]"
                data-name="cell-9"
              >
                <div
                  aria-hidden
                  className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                />
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex items-center px-[10px] relative size-full">
                    <ButtonComponent
                      className="bg-white h-[24px] relative rounded-[6px] shrink-0"
                      icon={false}
                      size="Small"
                      type="Sub"
                    />
                  </div>
                </div>
              </div>
              <div
                className="bg-white h-[40px] relative shrink-0 w-[74px]"
                data-name="cell-10"
              >
                <div
                  aria-hidden
                  className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                />
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex items-center px-[10px] relative size-full">
                    <ButtonComponent
                      className="bg-white h-[24px] relative rounded-[6px] shrink-0"
                      icon={false}
                      size="Small"
                      type="Sub"
                    />
                  </div>
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
  )
}

function Frame29() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Table />
    </div>
  )
}

function Component4() {
  return (
    <div
      className="content-stretch flex flex-col gap-[8px] h-[292px] items-start relative shrink-0 w-full"
      data-name="2"
    >
      <Component5 />
      <Frame29 />
    </div>
  )
}

function Frame17() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <div
        className="h-[32px] relative shrink-0 w-full"
        data-name="Tab Navigation"
      >
        <div
          aria-hidden
          className="absolute border-[#c2cfdf] border-b border-solid inset-0 pointer-events-none"
        />
        <div className="content-stretch flex items-start relative size-full">
          <div className="h-[32px] relative shrink-0" data-name="Tab Item">
            <div className="content-stretch flex items-start px-[8px] py-[7px] relative size-full">
              <p className="[word-break:break-word] font-['Pretendard:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#8a9cb4] text-[16px] tracking-[-0.32px] whitespace-nowrap">
                입·퇴소
              </p>
            </div>
          </div>
          <div className="h-[32px] relative shrink-0" data-name="Tab Item">
            <div className="content-stretch flex items-start px-[8px] py-[7px] relative size-full">
              <p className="[word-break:break-word] font-['Pretendard:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#8a9cb4] text-[16px] tracking-[-0.32px] whitespace-nowrap">
                기초평가
              </p>
            </div>
          </div>
          <div className="h-[32px] relative shrink-0" data-name="Tab Item">
            <div className="content-stretch flex items-start px-[8px] py-[7px] relative size-full">
              <p className="[word-break:break-word] font-['Pretendard:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#8a9cb4] text-[16px] tracking-[-0.32px] whitespace-nowrap">
                상담일지
              </p>
            </div>
          </div>
          <div className="h-[32px] relative shrink-0" data-name="Tab Item">
            <div className="content-stretch flex items-start px-[8px] py-[7px] relative size-full">
              <p className="[word-break:break-word] font-['Pretendard:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#8a9cb4] text-[16px] tracking-[-0.32px] whitespace-nowrap">
                외출·외박 기록
              </p>
            </div>
          </div>
          <div className="h-[32px] relative shrink-0" data-name="Tab Item">
            <div
              aria-hidden
              className="absolute border-[#2a3461] border-b-2 border-solid inset-0 pointer-events-none"
            />
            <div className="content-stretch flex items-start px-[8px] py-[7px] relative size-full">
              <p className="[word-break:break-word] font-['Pretendard:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#2a3461] text-[16px] tracking-[-0.32px] whitespace-nowrap">
                기타비용
              </p>
            </div>
          </div>
          <div className="h-[32px] relative shrink-0" data-name="Tab Item">
            <div className="content-stretch flex items-start px-[8px] py-[7px] relative size-full">
              <p className="[word-break:break-word] font-['Pretendard:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#8a9cb4] text-[16px] tracking-[-0.32px] whitespace-nowrap">
                상태변화기록
              </p>
            </div>
          </div>
          <div className="h-[32px] relative shrink-0" data-name="Tab Item">
            <div className="content-stretch flex items-start px-[8px] py-[7px] relative size-full">
              <p className="[word-break:break-word] font-['Pretendard:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#8a9cb4] text-[16px] tracking-[-0.32px] whitespace-nowrap">
                본인부담금
              </p>
            </div>
          </div>
        </div>
      </div>
      <Component4 />
    </div>
  )
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame17 />
    </div>
  )
}

function Component3() {
  return (
    <div
      className="content-stretch flex flex-col h-[32px] items-start relative shrink-0 w-full"
      data-name="2"
    >
      <Frame13 />
    </div>
  )
}

function Frame16() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Component2 />
      <Component3 />
    </div>
  )
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame16 />
    </div>
  )
}

function Info() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px overflow-clip relative w-full"
      data-name="info"
    >
      <Frame12 />
    </div>
  )
}

export default function Right() {
  return (
    <div
      className="bg-white content-stretch flex flex-col items-start overflow-clip p-[24px] relative rounded-br-[24px] rounded-tr-[24px] shadow-[-1px_0px_10px_0px_rgba(0,0,0,0.05)] size-full"
      data-name="right"
    >
      <Info />
    </div>
  )
}
