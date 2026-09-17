import svgPaths from "./svg-n33ml521mn"
type ButtonComponentProps = {
  className?: string
  icon?: boolean
  size?: "Small" | "Medium"
  state?: "Default"
  type?: "Primary" | "Sub" | "Ghost" | "File"
}

function ButtonComponent({
  className,
  icon = false,
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
          ((type === "Primary" && size === "Medium") ||
            (type === "Ghost" && size === "Small" && !icon) ||
            (type === "File" && size === "Medium" && !icon)) && (
            <div
              className={`content-stretch flex items-center justify-center relative size-full ${
                isGhostAndSmallAndDefaultAndNotIcon
                  ? "px-[6px] py-[5px]"
                  : isPrimaryAndMediumAndDefaultAndIcon
                    ? "gap-[4px] px-[10px] py-[8px]"
                    : "px-[10px] py-[8px]"
              }`}
            >
              {state === "Default" &&
                !icon &&
                ((type === "Primary" && size === "Medium") ||
                  (type === "Ghost" && size === "Small") ||
                  (type === "File" && size === "Medium")) && (
                  <p
                    className={`[word-break:break-word] font-["Pretendard:Regular",sans-serif] not-italic relative shrink-0 whitespace-nowrap ${
                      isFileAndMediumAndDefaultAndNotIcon
                        ? "leading-[22px] text-[#ef5a27] text-[14px] tracking-[0.01px]"
                        : isGhostAndSmallAndDefaultAndNotIcon
                          ? "leading-[18px] text-[#3e4d63] text-[12px]"
                          : "leading-[22px] text-[14px] text-white tracking-[0.01px]"
                    }`}
                  >
                    {isFileAndMediumAndDefaultAndNotIcon
                      ? "파일 선택"
                      : isGhostAndSmallAndDefaultAndNotIcon
                        ? "취소"
                        : "메인버튼"}
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

export default function Component2({ className }: { className?: string }) {
  return (
    <div
      className={className || "h-[973px] relative w-[1600px]"}
      data-name="시설/수급자 관리/수급자 목록"
    >
      <div
        className="absolute bg-[#f8f9fa] content-stretch flex flex-col gap-[20px] h-[973px] items-start left-0 pb-[40px] top-0 w-[1600px]"
        data-name="시설_수급자 관리"
      >
        <div
          className="bg-white h-[72px] relative shrink-0 w-[1600px]"
          data-name="TopNav"
        >
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center relative size-full">
              <div
                className="bg-white flex-[1_0_0] h-[72px] max-w-[238px] min-w-px relative"
                data-name="logo"
              >
                <div className="flex flex-row items-center max-w-[inherit] size-full">
                  <div className="content-stretch flex items-center max-w-[inherit] pl-[24px] pr-[20px] py-[11px] relative size-full">
                    <div className="content-stretch flex gap-[7px] items-center pl-[8px] relative shrink-0">
                      <div className="h-[25px] relative shrink-0 w-[20px]">
                        <svg
                          className="absolute block inset-0 size-full"
                          fill="none"
                          height="25"
                          viewBox="0 0 20 25"
                          width="20"
                        >
                          <g id="Frame 1597881711">
                            <g id="N">
                              <path
                                d={svgPaths.p2ae8b1c0}
                                fill="url(#paint0_linear_0_1202)"
                              />
                              <path
                                clipRule="evenodd"
                                d={svgPaths.p3696b980}
                                fill="url(#paint1_linear_0_1202)"
                                fillRule="evenodd"
                              />
                              <path
                                d={svgPaths.p100557f0}
                                fill="url(#paint2_linear_0_1202)"
                              />
                            </g>
                          </g>
                          <defs>
                            <linearGradient
                              gradientUnits="userSpaceOnUse"
                              id="paint0_linear_0_1202"
                              x1="10"
                              x2="10"
                              y1="0"
                              y2="25"
                            >
                              <stop stopColor="#E83D3C" />
                              <stop offset="0.524038" stopColor="#F76501" />
                              <stop offset="0.850962" stopColor="#F8CD53" />
                            </linearGradient>
                            <linearGradient
                              gradientUnits="userSpaceOnUse"
                              id="paint1_linear_0_1202"
                              x1="10"
                              x2="10"
                              y1="0"
                              y2="25"
                            >
                              <stop stopColor="#197E21" />
                              <stop offset="1" stopColor="#9BCB13" />
                            </linearGradient>
                            <linearGradient
                              gradientUnits="userSpaceOnUse"
                              id="paint2_linear_0_1202"
                              x1="10"
                              x2="10"
                              y1="0"
                              y2="25"
                            >
                              <stop stopColor="#0093A9" />
                              <stop offset="0.432692" stopColor="#4AB6DC" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                      <div className="[word-break:break-word] flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-black tracking-[0.02px] whitespace-nowrap">
                        <p className="leading-[28px]">센트럴케어</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-[1_0_0] h-full items-center justify-between min-w-px relative">
                <div className="content-stretch flex h-full items-center justify-center relative shrink-0">
                  <div className="h-[72px] relative shrink-0 w-[162px]">
                    <div className="absolute contents left-0 top-0">
                      <div className="absolute content-stretch flex items-center justify-between left-0 top-0 w-[162px]">
                        <div className="bg-white content-stretch flex h-[72px] items-center justify-center px-[24px] py-[14px] relative shrink-0">
                          <p className="[word-break:break-word] font-['Pretendard:SemiBold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#2a3461] text-[16px] text-center tracking-[-0.32px] whitespace-nowrap">
                            시설
                          </p>
                        </div>
                        <div className="content-stretch flex h-[72px] items-center justify-center px-[24px] py-[14px] relative shrink-0">
                          <p className="[word-break:break-word] font-['Pretendard:SemiBold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#8a9cb4] text-[16px] text-center tracking-[-0.32px] whitespace-nowrap">
                            기관회계
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex items-center justify-end pr-[24px] relative shrink-0">
                  <div className="content-stretch flex items-center justify-end relative shrink-0">
                    <div className="content-stretch flex items-center justify-end pl-[8px] pr-[4px] py-[10px] relative shrink-0">
                      <div
                        className="bg-white content-stretch flex h-[44px] items-center px-[12px] py-[4px] relative rounded-[8px] shrink-0 w-[180px]"
                        data-name="search"
                      >
                        <div
                          aria-hidden
                          className="absolute border border-[#d9e2ef] border-solid inset-0 pointer-events-none rounded-[8px]"
                        />
                        <div
                          className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-w-px relative"
                          data-name="Content"
                        >
                          <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Pretendard:Medium',sans-serif] justify-center leading-[0] min-w-px not-italic relative text-[#6d819b] text-[14px] tracking-[0.01px]">
                            <p className="leading-[22px]">A복지시설</p>
                          </div>
                          <div
                            className="relative shrink-0 size-[18px]"
                            data-name="search"
                          >
                            <div
                              className="absolute inset-0 overflow-clip"
                              data-name="search"
                            >
                              <div
                                className="absolute aspect-[12.833332061767578/6.4166669845581055] left-[19.44%] right-[13.89%] top-[7px]"
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
                                      stroke="#6D819B"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="1.5"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex gap-[10px] items-center justify-end pl-[4px] pr-[16px] py-[10px] relative shrink-0">
                      <div
                        className="bg-[#f5f7fc] content-stretch flex h-[44px] items-center px-[12px] py-[4px] relative rounded-[8px] shrink-0"
                        data-name="search"
                      >
                        <div
                          aria-hidden
                          className="absolute border border-[#d9e2ef] border-solid inset-0 pointer-events-none rounded-[8px]"
                        />
                        <div
                          className="content-stretch flex gap-[4px] items-center relative shrink-0"
                          data-name="Content"
                        >
                          <div
                            className="relative shrink-0 size-[18px]"
                            data-name="search"
                          >
                            <div
                              className="absolute inset-0 overflow-clip"
                              data-name="search"
                            >
                              <div
                                className="absolute inset-[10%_10.06%_10.06%_10%]"
                                data-name="Vector"
                              >
                                <svg
                                  className="absolute block inset-0 size-full"
                                  fill="none"
                                  height="14.3896"
                                  preserveAspectRatio="none"
                                  viewBox="0 0 14.3889 14.3896"
                                  width="14.3889"
                                >
                                  <path
                                    clipRule="evenodd"
                                    d={svgPaths.p13230350}
                                    fill="#2A3461"
                                    fillRule="evenodd"
                                    id="Vector"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="[word-break:break-word] flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a8b7cb] text-[14px] tracking-[0.01px] w-[180px]">
                            <p className="leading-[22px]">
                              검색어를 입력해주세요.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="bg-white content-stretch flex gap-[5px] h-[44px] items-center justify-center px-[10px] py-[13px] relative rounded-[8px] shrink-0"
                        data-name="search"
                      >
                        <div
                          aria-hidden
                          className="absolute border border-[#d9e2ef] border-solid inset-0 pointer-events-none rounded-[8px]"
                        />
                        <div className="[word-break:break-word] flex flex-col font-['Pretendard:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ef5a27] text-[16px] tracking-[0.01px] whitespace-nowrap">
                          <p className="leading-[24px]">센트럴케어 사용법</p>
                        </div>
                        <div
                          className="relative shrink-0 size-[20px]"
                          data-name="streamline:manual-book-solid"
                        >
                          <svg
                            className="absolute block inset-0 size-full"
                            fill="none"
                            height="20"
                            preserveAspectRatio="none"
                            viewBox="0 0 20 20"
                            width="20"
                          >
                            <g
                              clipPath="url(#clip0_0_1210)"
                              id="streamline:manual-book-solid"
                            >
                              <path
                                clipRule="evenodd"
                                d={svgPaths.p2e285600}
                                fill="#EF5A27"
                                fillRule="evenodd"
                                id="Vector"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_0_1210">
                                <rect fill="white" height="20" width="20" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                      </div>
                      <div
                        className="bg-white content-stretch flex gap-[5px] h-[44px] items-center justify-center px-[10px] py-[13px] relative rounded-[8px] shrink-0"
                        data-name="search"
                      >
                        <div
                          aria-hidden
                          className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[8px]"
                        />
                        <div className="[word-break:break-word] flex flex-col font-['Pretendard:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0093a9] text-[16px] tracking-[0.01px] whitespace-nowrap">
                          <p className="leading-[24px]">AI 챗봇</p>
                        </div>
                        <div
                          className="relative shrink-0 size-[24px]"
                          data-name="tabler:message-chatbot-filled"
                        >
                          <svg
                            className="absolute block inset-0 size-full"
                            fill="none"
                            height="24"
                            preserveAspectRatio="none"
                            viewBox="0 0 24 24"
                            width="24"
                          >
                            <g id="tabler:message-chatbot-filled">
                              <path
                                d={svgPaths.p1145cc70}
                                fill="url(#paint0_linear_0_1199)"
                                id="Vector"
                              />
                            </g>
                            <defs>
                              <linearGradient
                                gradientUnits="userSpaceOnUse"
                                id="paint0_linear_0_1199"
                                x1="12"
                                x2="12"
                                y1="3"
                                y2="21.9996"
                              >
                                <stop stopColor="#0093A9" />
                                <stop offset="1" stopColor="#4AB6DC" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex gap-[10px] items-center justify-center pl-[16px] pr-[8px] py-[6px] relative shrink-0">
                      <div
                        aria-hidden
                        className="absolute border-[#dde3f1] border-l border-solid inset-0 pointer-events-none"
                      />
                      <div
                        className="relative shrink-0 size-[24px]"
                        data-name="solar:user-bold"
                      >
                        <svg
                          className="absolute block inset-0 size-full"
                          fill="none"
                          height="24"
                          preserveAspectRatio="none"
                          viewBox="0 0 24 24"
                          width="24"
                        >
                          <g id="solar:user-bold">
                            <path
                              d={svgPaths.p2b835280}
                              fill="#2A3461"
                              id="Vector"
                            />
                            <circle
                              cx="17.5"
                              cy="5.5"
                              fill="#EF4444"
                              id="Ellipse 25"
                              r="2.5"
                            />
                          </g>
                        </svg>
                      </div>
                      <div
                        className="content-stretch flex flex-col items-center justify-center px-[2px] py-[3px] relative shrink-0 size-[24px]"
                        data-name="solar:notice-bold"
                      >
                        <div
                          className="h-[16.613px] relative shrink-0 w-[18.458px]"
                          data-name="Group"
                        >
                          <div className="absolute inset-[-3.76%_-3.39%]">
                            <svg
                              className="block size-full"
                              fill="none"
                              height="17.8627"
                              preserveAspectRatio="none"
                              viewBox="0 0 19.7085 17.8627"
                              width="19.7085"
                            >
                              <g id="Group">
                                <path
                                  d={svgPaths.p13961880}
                                  fill="#2A3461"
                                  id="Vector"
                                  stroke="#2A3461"
                                  strokeLinejoin="round"
                                  strokeWidth="1.25"
                                />
                                <path
                                  d={svgPaths.p396f4680}
                                  id="Vector_2"
                                  stroke="#2A3461"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.25"
                                />
                                <path
                                  d={svgPaths.p26b4d180}
                                  id="Vector_3"
                                  stroke="#2A3461"
                                  strokeLinecap="round"
                                  strokeWidth="1.25"
                                />
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center px-[8px] py-[6px] relative shrink-0">
                      <div className="content-stretch flex items-center relative shrink-0">
                        <div
                          className="h-[34px] relative shrink-0 w-[33px]"
                          data-name="solar:user-bold"
                        >
                          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[33px] top-1/2">
                            <svg
                              className="absolute block inset-0 size-full"
                              fill="none"
                              height="33"
                              preserveAspectRatio="none"
                              viewBox="0 0 33 33"
                              width="33"
                            >
                              <circle
                                cx="16.5"
                                cy="16.5"
                                fill="#EEF3FA"
                                id="Ellipse 26"
                                r="16.5"
                              />
                            </svg>
                          </div>
                          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Pretendard:Medium',sans-serif] justify-center leading-[0] left-1/2 not-italic text-[#2a3461] text-[12px] text-center top-1/2 whitespace-nowrap">
                            <p className="leading-[18px]">김</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex h-[861px] items-start relative shrink-0">
          <div
            className="content-stretch flex flex-col h-[933px] items-center pl-[20px] pr-[13px] relative shrink-0"
            data-name="Sidebar"
          >
            <div className="relative shrink-0 w-[180px]" data-name="Sidebar">
              <div className="content-stretch flex flex-col items-start relative size-full">
                <div
                  className="content-stretch flex flex-col gap-[4px] items-start overflow-clip relative shrink-0 w-[180px]"
                  data-name="Menu"
                >
                  <div
                    className="h-[54px] relative rounded-[16px] shrink-0 w-[180px]"
                    data-name="Nav Item"
                  >
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex gap-[10px] items-center px-[13px] relative size-full">
                        <div
                          className="bg-white content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center justify-center relative rounded-[12px] shrink-0 size-[30px]"
                          data-name="icon-container"
                        >
                          <div
                            className="relative shrink-0 size-[15px]"
                            data-name="Icon=Dashboard"
                          >
                            <div
                              className="absolute left-0 size-[15px] top-0"
                              data-name="dash"
                            >
                              <svg
                                className="absolute block inset-0 size-full"
                                fill="none"
                                height="15"
                                preserveAspectRatio="none"
                                viewBox="0 0 15 15"
                                width="15"
                              >
                                <g clipPath="url(#clip0_0_1193)" id="dash">
                                  <path
                                    d={svgPaths.p37964b40}
                                    fill="#8A9CB4"
                                    id="Vector"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_0_1193">
                                    <rect fill="white" height="15" width="15" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#2a3461] text-[14px] tracking-[0.01px] whitespace-nowrap">
                          대시보드
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="bg-[#ef5a27] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[54px] relative rounded-[16px] shrink-0 w-[180px]"
                    data-name="Nav Item"
                  >
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex gap-[10px] items-center px-[13px] relative size-full">
                        <div
                          className="bg-white content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[30px]"
                          data-name="icon-container"
                        >
                          <div
                            className="relative shrink-0 size-[15px]"
                            data-name="icon"
                          >
                            <div
                              className="absolute h-[15px] left-[2.05px] top-0 w-[10.899px]"
                              data-name="Vector"
                            >
                              <svg
                                className="absolute block inset-0 size-full"
                                fill="none"
                                height="15"
                                preserveAspectRatio="none"
                                viewBox="0 0 10.8986 15"
                                width="10.8986"
                              >
                                <path
                                  clipRule="evenodd"
                                  d={svgPaths.pff7bd00}
                                  fill="#EF5A27"
                                  fillRule="evenodd"
                                  id="Vector"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <p className="[word-break:break-word] font-['Pretendard:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-white tracking-[0.01px] whitespace-nowrap">
                          수급자 관리
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="h-[54px] relative rounded-[16px] shrink-0 w-[180px]"
                    data-name="Nav Item"
                  >
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex gap-[10px] items-center px-[13px] relative size-full">
                        <div
                          className="bg-white content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center justify-center relative rounded-[12px] shrink-0 size-[30px]"
                          data-name="icon-container"
                        >
                          <div
                            className="relative shrink-0 size-[15px]"
                            data-name="icon"
                          >
                            <div
                              className="absolute left-0 size-[15px] top-0"
                              data-name="Vector"
                            >
                              <svg
                                className="absolute block inset-0 size-full"
                                fill="none"
                                height="15"
                                preserveAspectRatio="none"
                                viewBox="0 0 15 15"
                                width="15"
                              >
                                <g id="Vector">
                                  <path
                                    clipRule="evenodd"
                                    d={svgPaths.p3993fb00}
                                    fill="#8A9CB4"
                                    fillRule="evenodd"
                                  />
                                  <path
                                    clipRule="evenodd"
                                    d={svgPaths.p26dc8900}
                                    fill="#8A9CB4"
                                    fillRule="evenodd"
                                  />
                                </g>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#2a3461] text-[14px] tracking-[0.01px] whitespace-nowrap">
                          종사자 관리
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="h-[54px] relative rounded-[16px] shrink-0 w-[180px]"
                    data-name="Nav Item"
                  >
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex gap-[10px] items-center px-[13px] relative size-full">
                        <div
                          className="bg-white content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center justify-center relative rounded-[12px] shrink-0 size-[30px]"
                          data-name="icon-container"
                        >
                          <div
                            className="relative shrink-0 size-[15px]"
                            data-name="icon"
                          >
                            <div
                              className="absolute inset-[10.68%_5.23%_9.7%_5.23%]"
                              data-name="Vector"
                            >
                              <svg
                                className="absolute block inset-0 size-full"
                                fill="none"
                                height="11.943"
                                preserveAspectRatio="none"
                                viewBox="0 0 13.4295 11.943"
                                width="13.4295"
                              >
                                <path
                                  d={svgPaths.p22814800}
                                  fill="#8A9CB4"
                                  id="Vector"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#2a3461] text-[14px] tracking-[0.01px] whitespace-nowrap">
                          요양급여
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="h-[54px] relative rounded-[16px] shrink-0 w-[180px]"
                    data-name="Nav Item"
                  >
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex gap-[10px] items-center px-[13px] relative size-full">
                        <div
                          className="bg-white content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center justify-center relative rounded-[12px] shrink-0 size-[30px]"
                          data-name="icon-container"
                        >
                          <div
                            className="relative shrink-0 size-[15px]"
                            data-name="icon"
                          >
                            <svg
                              className="absolute block inset-0 size-full"
                              fill="none"
                              height="15"
                              preserveAspectRatio="none"
                              viewBox="0 0 15 15"
                              width="15"
                            >
                              <path
                                clipRule="evenodd"
                                d={svgPaths.p25814680}
                                fill="#8A9CB4"
                                fillRule="evenodd"
                                id="Vector"
                              />
                            </svg>
                          </div>
                        </div>
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#2a3461] text-[14px] tracking-[0.01px] whitespace-nowrap">
                          간호·물리
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="h-[54px] relative rounded-[16px] shrink-0 w-[180px]"
                    data-name="Nav Item"
                  >
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex gap-[10px] items-center px-[13px] relative size-full">
                        <div
                          className="bg-white content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center justify-center relative rounded-[12px] shrink-0 size-[30px]"
                          data-name="icon-container"
                        >
                          <div
                            className="relative shrink-0 size-[15px]"
                            data-name="icon"
                          >
                            <div
                              className="absolute inset-[8.33%_4.17%_12.5%_4.17%]"
                              data-name="Vector"
                            >
                              <svg
                                className="absolute block inset-0 size-full"
                                fill="none"
                                height="11.875"
                                preserveAspectRatio="none"
                                viewBox="0 0 13.75 11.875"
                                width="13.75"
                              >
                                <path
                                  d={svgPaths.p54d2000}
                                  fill="#8A9CB4"
                                  id="Vector"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#2a3461] text-[14px] tracking-[0.01px] whitespace-nowrap">
                          프로그램
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="h-[54px] relative rounded-[16px] shrink-0 w-[180px]"
                    data-name="Nav Item"
                  >
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex gap-[10px] items-center px-[13px] relative size-full">
                        <div
                          className="bg-white content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center justify-center relative rounded-[12px] shrink-0 size-[30px]"
                          data-name="icon-container"
                        >
                          <div
                            className="relative shrink-0 size-[15px]"
                            data-name="icon"
                          >
                            <div
                              className="absolute inset-[0_12.5%_18.75%_0]"
                              data-name="Vector"
                            >
                              <svg
                                className="absolute block inset-0 size-full"
                                fill="none"
                                height="12.1875"
                                preserveAspectRatio="none"
                                viewBox="0 0 13.125 12.1875"
                                width="13.125"
                              >
                                <path
                                  d={svgPaths.p19b64800}
                                  fill="#8A9CB4"
                                  id="Vector"
                                />
                              </svg>
                            </div>
                            <div
                              className="absolute bottom-[0.01%] left-1/2 right-0 top-[49.99%]"
                              data-name="Vector"
                            >
                              <svg
                                className="absolute block inset-0 size-full"
                                fill="none"
                                height="7.5"
                                preserveAspectRatio="none"
                                viewBox="0 0 7.5 7.5"
                                width="7.5"
                              >
                                <path
                                  clipRule="evenodd"
                                  d={svgPaths.p1cd36500}
                                  fill="#8A9CB4"
                                  fillRule="evenodd"
                                  id="Vector"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#2a3461] text-[14px] tracking-[0.01px] whitespace-nowrap">
                          식단·위생점검
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="h-[54px] relative rounded-[16px] shrink-0 w-[180px]"
                    data-name="Nav Item"
                  >
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex gap-[10px] items-center px-[13px] relative size-full">
                        <div
                          className="bg-white content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center justify-center relative rounded-[12px] shrink-0 size-[30px]"
                          data-name="icon-container"
                        >
                          <div
                            className="relative shrink-0 size-[15px]"
                            data-name="icon"
                          >
                            <div
                              className="absolute h-[15px] left-[1.88px] top-0 w-[11.25px]"
                              data-name="Vector"
                            >
                              <svg
                                className="absolute block inset-0 size-full"
                                fill="none"
                                height="15"
                                preserveAspectRatio="none"
                                viewBox="0 0 11.25 15"
                                width="11.25"
                              >
                                <path
                                  d={svgPaths.p1fade400}
                                  fill="#8A9CB4"
                                  id="Vector"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#2a3461] text-[14px] tracking-[0.01px] whitespace-nowrap">
                          운영·평가
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="h-[54px] relative rounded-[16px] shrink-0 w-[180px]"
                    data-name="Nav Item"
                  >
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex gap-[10px] items-center px-[13px] relative size-full">
                        <div
                          className="bg-white content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center justify-center relative rounded-[12px] shrink-0 size-[30px]"
                          data-name="icon-container"
                        >
                          <div
                            className="relative shrink-0 size-[15px]"
                            data-name="icon"
                          >
                            <div
                              className="absolute h-[13.929px] left-0 top-[0.54px] w-[15px]"
                              data-name="Vector"
                            >
                              <svg
                                className="absolute block inset-0 size-full"
                                fill="none"
                                height="13.9286"
                                preserveAspectRatio="none"
                                viewBox="0 0 15 13.9286"
                                width="15"
                              >
                                <path
                                  d={svgPaths.p30137480}
                                  fill="#8A9CB4"
                                  id="Vector"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#2a3461] text-[14px] tracking-[0.01px] whitespace-nowrap">
                          본인부담금
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="h-[54px] relative rounded-[16px] shrink-0 w-[180px]"
                    data-name="Nav Item"
                  >
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex gap-[10px] items-center px-[13px] relative size-full">
                        <div
                          className="bg-white content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center justify-center relative rounded-[12px] shrink-0 size-[30px]"
                          data-name="icon-container"
                        >
                          <div
                            className="relative shrink-0 size-[15px]"
                            data-name="icon"
                          >
                            <div
                              className="absolute h-[12.497px] left-[1.85px] top-[1.25px] w-[11.307px]"
                              data-name="Vector"
                            >
                              <svg
                                className="absolute block inset-0 size-full"
                                fill="none"
                                height="12.4967"
                                preserveAspectRatio="none"
                                viewBox="0 0 11.3065 12.4967"
                                width="11.3065"
                              >
                                <path
                                  d={svgPaths.p37812f00}
                                  fill="#8A9CB4"
                                  id="Vector"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#2a3461] text-[14px] tracking-[0.01px] whitespace-nowrap">
                          메시지
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="h-[20px] relative shrink-0 w-[180px]"
                  data-name="spacer"
                />
                <div
                  className="relative rounded-[12px] shrink-0 w-[180px]"
                  data-name="Support Card"
                >
                  <div className="overflow-clip rounded-[inherit] size-full">
                    <div className="content-stretch flex flex-col gap-[10px] items-start p-[13px] relative size-full">
                      <div className="absolute h-[148px] left-0 top-0 w-[180px]">
                        <div className="absolute bg-white h-[148px] left-0 right-0 top-0">
                          <div
                            aria-hidden
                            className="absolute border border-[#c2cfdf] border-solid inset-[-1px] pointer-events-none"
                          />
                        </div>
                        <div className="absolute left-[21.25px] size-[355.5px] top-[24px]">
                          <svg
                            className="absolute block inset-0 size-full"
                            fill="none"
                            height="355.5"
                            preserveAspectRatio="none"
                            viewBox="0 0 355.5 355.5"
                            width="355.5"
                          >
                            <g id="Group 3">
                              <circle
                                cx="177.75"
                                cy="177.75"
                                id="Ellipse 1"
                                r="177.25"
                                stroke="#FFF1EB"
                              />
                              <circle
                                cx="177.75"
                                cy="177.75"
                                id="Ellipse 2"
                                r="153.219"
                                stroke="#FFF1EB"
                              />
                              <circle
                                cx="177.749"
                                cy="177.75"
                                id="Ellipse 3"
                                r="125.872"
                                stroke="#FFF1EB"
                              />
                              <circle
                                cx="175.5"
                                cy="178"
                                id="Ellipse 4"
                                r="98.5262"
                                stroke="#FFF1EB"
                              />
                              <circle
                                cx="177.749"
                                cy="177.75"
                                id="Ellipse 5"
                                r="72.0087"
                                stroke="#FFF1EB"
                              />
                              <circle
                                cx="177.751"
                                cy="177.75"
                                id="Ellipse 6"
                                r="47.9773"
                                stroke="#FFF1EB"
                              />
                              <circle
                                cx="177.75"
                                cy="177.75"
                                id="Ellipse 7"
                                r="28.75"
                                stroke="#FFF1EB"
                              />
                            </g>
                          </svg>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col gap-[8px] h-[122px] items-start relative shrink-0 w-[154px]">
                        <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
                          <div
                            className="bg-[#fff1eb] overflow-clip relative rounded-[4px] shrink-0 size-[24px]"
                            data-name="IONIcon/H/help/circle"
                          >
                            <div
                              className="absolute inset-[12.5%]"
                              data-name="Vector"
                            >
                              <svg
                                className="absolute block inset-0 size-full"
                                fill="none"
                                height="18"
                                preserveAspectRatio="none"
                                viewBox="0 0 18 18"
                                width="18"
                              >
                                <path
                                  d={svgPaths.peb71df0}
                                  fill="#EF5A27"
                                  id="Vector"
                                />
                              </svg>
                            </div>
                          </div>
                          <p className="[word-break:break-word] capitalize font-['Pretendard:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#283445] text-[14px] tracking-[-0.28px] whitespace-nowrap">
                            고객지원
                          </p>
                        </div>
                        <div className="h-0 relative shrink-0 w-full">
                          <div className="absolute inset-[-0.5px_0]">
                            <svg
                              className="block size-full"
                              fill="none"
                              height="1"
                              preserveAspectRatio="none"
                              viewBox="0 0 154 1"
                              width="154"
                            >
                              <path
                                d="M0 0.5H154"
                                id="Vector 6"
                                stroke="#C2CFDF"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                          <div
                            className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
                            data-name="Text"
                          >
                            <div className="[word-break:break-word] col-1 content-stretch flex flex-col font-['Pretendard:Bold',sans-serif] gap-px items-start ml-0 mt-0 not-italic relative row-1 w-[117px]">
                              <div className="flex flex-col justify-center min-w-full relative shrink-0 text-[#283445] text-[14px] tracking-[-0.28px] w-[min-content]">
                                <p className="leading-[22px]">
                                  도움이 필요하신가요?
                                </p>
                              </div>
                              <div className="flex flex-col justify-center relative shrink-0 text-[#ef5a27] text-[12px] tracking-[-0.24px] whitespace-nowrap">
                                <p className="leading-[18px]">
                                  T. 02-0000-0000
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className="bg-[#fff1eb] h-[35px] relative rounded-[12px] shrink-0 w-full"
                            data-name="_Button/Base"
                          >
                            <div className="flex flex-row items-center justify-center size-full">
                              <div className="content-stretch flex items-center justify-center px-[8px] relative size-full">
                                <div
                                  className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0"
                                  data-name="Width Structure"
                                >
                                  <div
                                    className="content-stretch flex h-[24px] items-center relative shrink-0"
                                    data-name="Height Structure"
                                  >
                                    <div
                                      className="content-stretch flex gap-[4px] items-start overflow-clip relative shrink-0"
                                      data-name="Button Body"
                                    >
                                      <div className="[word-break:break-word] flex flex-col font-['Pretendard:Bold',sans-serif] h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#ef5a27] text-[10px] text-center w-[87.5px]">
                                        <p className="leading-[1.5]">
                                          원격지원 요청
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="content-stretch flex items-start overflow-clip px-[12px] relative shrink-0"
                                    data-name="🔛MinWidth"
                                  >
                                    <div
                                      className="bg-[#ced4da] relative shrink-0 size-[0.006px]"
                                      data-name="Content"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    aria-hidden
                    className="absolute border border-[#c2cfdf] border-solid inset-0 pointer-events-none rounded-[12px]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col h-full items-start relative shrink-0">
            <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px relative w-[1387px]">
              <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px relative w-full">
                <div className="content-stretch flex flex-[1_0_0] items-start justify-between min-h-px relative w-full">
                  <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start justify-center min-w-px relative">
                    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px relative w-full">
                      <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px relative w-full">
                        <div className="drop-shadow-[0px_0px_10px_rgba(0,0,0,0.05)] flex-[1_0_0] min-h-px relative w-full">
                          <div className="flex flex-row items-center size-full">
                            <div className="content-stretch flex items-center pl-[13px] pr-[24px] relative size-full">
                              <div
                                className="bg-white h-full relative rounded-bl-[24px] rounded-tl-[24px] shrink-0 w-[592px]"
                                data-name="left"
                              >
                                <div className="overflow-clip rounded-[inherit] size-full">
                                  <div className="content-stretch flex flex-col gap-[24px] items-start p-[24px] relative size-full">
                                    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                                      <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                                        <p className="[word-break:break-word] font-['Pretendard:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#0e1225] text-[17px] tracking-[-0.34px] whitespace-nowrap">
                                          수급자 목록
                                        </p>
                                        <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
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
                                                <div
                                                  className="relative shrink-0 size-[16px]"
                                                  data-name="noti"
                                                >
                                                  <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
                                                    <div className="content-stretch flex flex-col items-center justify-center px-px py-[3px] relative size-full">
                                                      <div
                                                        className="overflow-clip relative shrink-0 size-[16px]"
                                                        data-name="lucide:file-down"
                                                      >
                                                        <div
                                                          className="absolute inset-[8.33%_16.67%]"
                                                          data-name="Group"
                                                        >
                                                          <div className="absolute inset-[-3.75%_-4.69%]">
                                                            <svg
                                                              className="block size-full"
                                                              fill="none"
                                                              height="14.3333"
                                                              preserveAspectRatio="none"
                                                              viewBox="0 0 11.6667 14.3333"
                                                              width="11.6667"
                                                            >
                                                              <g id="Group">
                                                                <path
                                                                  d={
                                                                    svgPaths.p2dee5300
                                                                  }
                                                                  id="Vector"
                                                                  stroke="#2A3461"
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                />
                                                                <path
                                                                  d={
                                                                    svgPaths.p3f38e100
                                                                  }
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
                                                </div>
                                                <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#2a3461] text-[14px] tracking-[0.01px] whitespace-nowrap">
                                                  엑셀 다운로드
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            className="bg-[#2a3461] h-[32px] relative rounded-[8px] shrink-0"
                                            data-name="Button_Component"
                                          >
                                            <div className="flex flex-row items-center justify-center size-full">
                                              <div className="content-stretch flex items-center justify-center px-[10px] py-[8px] relative size-full">
                                                <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-white tracking-[0.01px] whitespace-nowrap">
                                                  공단 조회
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div
                                        className="bg-[#f4f7fc] relative rounded-[12px] shrink-0 w-full"
                                        data-name="FilterPanel"
                                      >
                                        <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
                                          <div className="content-stretch flex flex-col items-center justify-center relative size-full">
                                            <div
                                              className="bg-[#f4f7fc] relative shrink-0 w-full"
                                              data-name="header"
                                            >
                                              <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                                                <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[14px] relative size-full">
                                                  <div
                                                    className="relative shrink-0 size-[16px]"
                                                    data-name="filter-ic"
                                                  >
                                                    <svg
                                                      className="absolute block inset-0 size-full"
                                                      fill="none"
                                                      height="16"
                                                      preserveAspectRatio="none"
                                                      viewBox="0 0 16 16"
                                                      width="16"
                                                    >
                                                      <g id="filter-ic">
                                                        <path
                                                          d={svgPaths.p192ae000}
                                                          id="Vector"
                                                          stroke="#283445"
                                                          strokeLinecap="round"
                                                          strokeMiterlimit="10"
                                                        />
                                                      </g>
                                                    </svg>
                                                  </div>
                                                  <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#283445] text-[14px] tracking-[-0.28px] whitespace-nowrap">
                                                    조회조건
                                                  </p>
                                                  <div
                                                    className="bg-[#ef5a27] content-stretch flex items-center justify-center overflow-clip px-[6px] py-[2px] relative rounded-[9999px] shrink-0 size-[17px]"
                                                    data-name="badge"
                                                  >
                                                    <p className="[word-break:break-word] font-['Pretendard:SemiBold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[11px] text-white tracking-[-0.22px] whitespace-nowrap">
                                                      3
                                                    </p>
                                                  </div>
                                                  <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Pretendard:Regular',sans-serif] h-[14px] justify-center leading-[0] min-w-px not-italic overflow-hidden relative text-[#8a9cb4] text-[12px] text-ellipsis tracking-[-0.24px] whitespace-nowrap">
                                                    <p className="leading-[18px] overflow-hidden text-ellipsis">
                                                      생활실, 이용상태, 성별 외
                                                      3개
                                                    </p>
                                                  </div>
                                                  <div
                                                    className="relative shrink-0 size-[16px]"
                                                    data-name="up"
                                                  >
                                                    <svg
                                                      className="absolute block inset-0 size-full"
                                                      fill="none"
                                                      height="16"
                                                      preserveAspectRatio="none"
                                                      viewBox="0 0 16 16"
                                                      width="16"
                                                    >
                                                      <g id="up">
                                                        <path
                                                          d="M2 11L8 5L14 11"
                                                          id="Vector"
                                                          stroke="#556780"
                                                          strokeLinecap="round"
                                                          strokeLinejoin="round"
                                                          strokeWidth="1.5"
                                                        />
                                                      </g>
                                                    </svg>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="relative shrink-0 w-full">
                                              <div className="content-stretch flex flex-col items-start px-[16px] relative size-full">
                                                <div
                                                  className="bg-[#c2cfdf] h-px relative shrink-0 w-full"
                                                  data-name="div"
                                                />
                                              </div>
                                            </div>
                                            <div
                                              className="relative shrink-0 w-full"
                                              data-name="body"
                                            >
                                              <div className="overflow-clip rounded-[inherit] size-full">
                                                <div className="content-stretch flex flex-col gap-[12px] items-start p-[16px] relative size-full">
                                                  <div
                                                    className="content-start flex flex-wrap gap-[12px] items-start relative shrink-0 w-full"
                                                    data-name="inputs-slot"
                                                  >
                                                    <div
                                                      className="flex-[1_0_0] h-[52px] min-w-[200px] relative"
                                                      data-name="필터 인풋"
                                                    >
                                                      <div className="content-stretch flex flex-col gap-[4px] items-start min-w-[inherit] relative size-full">
                                                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px] whitespace-nowrap">
                                                          생활실
                                                        </p>
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
                                                      </div>
                                                    </div>
                                                    <div
                                                      className="flex-[1_0_0] h-[52px] min-w-[200px] relative"
                                                      data-name="필터 인풋"
                                                    >
                                                      <div className="content-stretch flex flex-col gap-[4px] items-start min-w-[inherit] relative size-full">
                                                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px] whitespace-nowrap">
                                                          계약상태
                                                        </p>
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
                                                      </div>
                                                    </div>
                                                    <div
                                                      className="flex-[1_0_0] h-[52px] min-w-[200px] relative"
                                                      data-name="필터 인풋"
                                                    >
                                                      <div className="content-stretch flex flex-col gap-[4px] items-start min-w-[inherit] relative size-full">
                                                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px] whitespace-nowrap">
                                                          등급
                                                        </p>
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
                                                      </div>
                                                    </div>
                                                    <div
                                                      className="flex-[1_0_0] h-[52px] min-w-[200px] relative"
                                                      data-name="필터 인풋"
                                                    >
                                                      <div className="content-stretch flex flex-col gap-[4px] items-start min-w-[inherit] relative size-full">
                                                        <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px] whitespace-nowrap">
                                                          수급자명
                                                        </p>
                                                        <div
                                                          className="bg-white h-[30px] relative rounded-[8px] shrink-0 w-full"
                                                          data-name="Input"
                                                        >
                                                          <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                                                            <div className="content-stretch flex items-center justify-between px-[8px] relative size-full">
                                                              <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#a8b7cb] text-[14px] tracking-[0.01px] whitespace-nowrap">
                                                                수급자명
                                                              </p>
                                                            </div>
                                                          </div>
                                                          <div
                                                            aria-hidden
                                                            className="absolute border border-[#a8b7cb] border-solid inset-0 pointer-events-none rounded-[8px]"
                                                          />
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div
                                                    className="content-stretch flex items-start justify-end overflow-clip relative shrink-0 w-full"
                                                    data-name="rr"
                                                  >
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
                                                          <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#2a3461] text-[12px] whitespace-nowrap">
                                                            초기화
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                                      <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full">
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
                                      </div>
                                      <div
                                        className="h-[444px] relative shrink-0 w-full"
                                        data-name="Table"
                                      >
                                        <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
                                          <div
                                            className="relative shrink-0"
                                            data-name="Table/Column"
                                          >
                                            <div className="overflow-clip rounded-[inherit] size-full">
                                              <div className="content-stretch flex flex-col items-start relative size-full">
                                                <div
                                                  className="bg-[#f4f7fc] h-[44px] relative shrink-0 w-full"
                                                  data-name="header"
                                                >
                                                  <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                                                    <div className="[word-break:break-word] content-stretch flex font-['Pretendard:Regular',sans-serif] items-center justify-between leading-[normal] not-italic pl-[10px] pr-[8px] relative size-full whitespace-nowrap">
                                                      <p className="relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px]">
                                                        계약상태
                                                      </p>
                                                      <p className="relative shrink-0 text-[#8a9cb4] text-[10px] tracking-[-0.2px]">{` ↕`}</p>
                                                    </div>
                                                  </div>
                                                  <div
                                                    aria-hidden
                                                    className="absolute border-[#c2cfdf] border-b border-l border-solid border-t inset-0 pointer-events-none"
                                                  />
                                                </div>
                                                <div
                                                  className="bg-[#d9ecff] h-[40px] relative shrink-0 w-full"
                                                  data-name="cell-1"
                                                >
                                                  <div
                                                    aria-hidden
                                                    className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                                                  />
                                                  <div className="flex flex-row items-center size-full">
                                                    <div className="content-stretch flex items-center px-[10px] relative size-full">
                                                      <div
                                                        className="bg-[#e8f8ed] relative rounded-[8px] shrink-0"
                                                        data-name="Type=Green"
                                                      >
                                                        <div className="flex flex-row items-center justify-center size-full">
                                                          <div className="content-stretch flex items-center justify-center px-[10px] py-[4px] relative size-full">
                                                            <p className="[word-break:break-word] font-['Pretendard:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#1c9640] text-[12px] whitespace-nowrap">
                                                              계약중
                                                            </p>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div
                                                  className="bg-white h-[40px] relative shrink-0 w-full"
                                                  data-name="cell-2"
                                                >
                                                  <div
                                                    aria-hidden
                                                    className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                                                  />
                                                  <div className="flex flex-row items-center size-full">
                                                    <div className="content-stretch flex items-center px-[10px] relative size-full">
                                                      <div
                                                        className="bg-[#e8f8ed] relative rounded-[8px] shrink-0"
                                                        data-name="Type=Green"
                                                      >
                                                        <div className="flex flex-row items-center justify-center size-full">
                                                          <div className="content-stretch flex items-center justify-center px-[10px] py-[4px] relative size-full">
                                                            <p className="[word-break:break-word] font-['Pretendard:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#1c9640] text-[12px] whitespace-nowrap">
                                                              계약중
                                                            </p>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div
                                                  className="bg-white h-[40px] relative shrink-0 w-full"
                                                  data-name="cell-3"
                                                >
                                                  <div
                                                    aria-hidden
                                                    className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                                                  />
                                                  <div className="flex flex-row items-center size-full">
                                                    <div className="content-stretch flex items-center px-[10px] relative size-full">
                                                      <div
                                                        className="bg-[#f1f3f5] relative rounded-[8px] shrink-0"
                                                        data-name="Type=Default"
                                                      >
                                                        <div className="flex flex-row items-center justify-center size-full">
                                                          <div className="content-stretch flex items-center justify-center px-[10px] py-[4px] relative size-full">
                                                            <p className="[word-break:break-word] font-['Pretendard:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#556780] text-[12px] whitespace-nowrap">
                                                              만료
                                                            </p>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div
                                                  className="bg-white h-[40px] relative shrink-0 w-full"
                                                  data-name="cell-4"
                                                >
                                                  <div
                                                    aria-hidden
                                                    className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                                                  />
                                                  <div className="flex flex-row items-center size-full">
                                                    <div className="content-stretch flex items-center px-[10px] relative size-full">
                                                      <div
                                                        className="bg-[#e8f8ed] relative rounded-[8px] shrink-0"
                                                        data-name="Type=Green"
                                                      >
                                                        <div className="flex flex-row items-center justify-center size-full">
                                                          <div className="content-stretch flex items-center justify-center px-[10px] py-[4px] relative size-full">
                                                            <p className="[word-break:break-word] font-['Pretendard:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#1c9640] text-[12px] whitespace-nowrap">
                                                              계약중
                                                            </p>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div
                                                  className="bg-white h-[40px] relative shrink-0 w-full"
                                                  data-name="cell-5"
                                                >
                                                  <div
                                                    aria-hidden
                                                    className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                                                  />
                                                  <div className="flex flex-row items-center size-full">
                                                    <div className="content-stretch flex items-center px-[10px] relative size-full">
                                                      <div
                                                        className="bg-[#e8f8ed] relative rounded-[8px] shrink-0"
                                                        data-name="Type=Green"
                                                      >
                                                        <div className="flex flex-row items-center justify-center size-full">
                                                          <div className="content-stretch flex items-center justify-center px-[10px] py-[4px] relative size-full">
                                                            <p className="[word-break:break-word] font-['Pretendard:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#1c9640] text-[12px] whitespace-nowrap">
                                                              계약중
                                                            </p>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div
                                                  className="bg-white h-[40px] relative shrink-0 w-full"
                                                  data-name="cell-6"
                                                >
                                                  <div
                                                    aria-hidden
                                                    className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                                                  />
                                                  <div className="flex flex-row items-center size-full">
                                                    <div className="content-stretch flex items-center px-[10px] relative size-full">
                                                      <div
                                                        className="bg-[#e8f8ed] relative rounded-[8px] shrink-0"
                                                        data-name="Type=Green"
                                                      >
                                                        <div className="flex flex-row items-center justify-center size-full">
                                                          <div className="content-stretch flex items-center justify-center px-[10px] py-[4px] relative size-full">
                                                            <p className="[word-break:break-word] font-['Pretendard:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#1c9640] text-[12px] whitespace-nowrap">
                                                              계약중
                                                            </p>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div
                                                  className="bg-white h-[40px] relative shrink-0 w-full"
                                                  data-name="cell-7"
                                                >
                                                  <div
                                                    aria-hidden
                                                    className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                                                  />
                                                  <div className="flex flex-row items-center size-full">
                                                    <div className="content-stretch flex items-center px-[10px] relative size-full">
                                                      <div
                                                        className="bg-[#e8f8ed] relative rounded-[8px] shrink-0"
                                                        data-name="Type=Green"
                                                      >
                                                        <div className="flex flex-row items-center justify-center size-full">
                                                          <div className="content-stretch flex items-center justify-center px-[10px] py-[4px] relative size-full">
                                                            <p className="[word-break:break-word] font-['Pretendard:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#1c9640] text-[12px] whitespace-nowrap">
                                                              계약중
                                                            </p>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div
                                                  className="bg-white h-[40px] relative shrink-0 w-full"
                                                  data-name="cell-8"
                                                >
                                                  <div
                                                    aria-hidden
                                                    className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                                                  />
                                                  <div className="flex flex-row items-center size-full">
                                                    <div className="content-stretch flex items-center px-[10px] relative size-full">
                                                      <div
                                                        className="bg-[#e8f8ed] relative rounded-[8px] shrink-0"
                                                        data-name="Type=Green"
                                                      >
                                                        <div className="flex flex-row items-center justify-center size-full">
                                                          <div className="content-stretch flex items-center justify-center px-[10px] py-[4px] relative size-full">
                                                            <p className="[word-break:break-word] font-['Pretendard:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#1c9640] text-[12px] whitespace-nowrap">
                                                              계약중
                                                            </p>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div
                                                  className="bg-white h-[40px] relative shrink-0 w-full"
                                                  data-name="cell-9"
                                                >
                                                  <div
                                                    aria-hidden
                                                    className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                                                  />
                                                  <div className="flex flex-row items-center size-full">
                                                    <div className="content-stretch flex items-center px-[10px] relative size-full">
                                                      <div
                                                        className="bg-[#e8f8ed] relative rounded-[8px] shrink-0"
                                                        data-name="Type=Green"
                                                      >
                                                        <div className="flex flex-row items-center justify-center size-full">
                                                          <div className="content-stretch flex items-center justify-center px-[10px] py-[4px] relative size-full">
                                                            <p className="[word-break:break-word] font-['Pretendard:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#1c9640] text-[12px] whitespace-nowrap">
                                                              계약중
                                                            </p>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div
                                                  className="bg-white h-[40px] relative shrink-0 w-full"
                                                  data-name="cell-10"
                                                >
                                                  <div
                                                    aria-hidden
                                                    className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                                                  />
                                                  <div className="flex flex-row items-center size-full">
                                                    <div className="content-stretch flex items-center px-[10px] relative size-full">
                                                      <div
                                                        className="bg-[#e8f8ed] relative rounded-[8px] shrink-0"
                                                        data-name="Type=Green"
                                                      >
                                                        <div className="flex flex-row items-center justify-center size-full">
                                                          <div className="content-stretch flex items-center justify-center px-[10px] py-[4px] relative size-full">
                                                            <p className="[word-break:break-word] font-['Pretendard:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#1c9640] text-[12px] whitespace-nowrap">
                                                              계약중
                                                            </p>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            className="relative shrink-0"
                                            data-name="Table/Column"
                                          >
                                            <div className="overflow-clip rounded-[inherit] size-full">
                                              <div className="content-stretch flex flex-col items-start relative size-full">
                                                <div
                                                  className="bg-[#f4f7fc] h-[44px] relative shrink-0 w-full"
                                                  data-name="header"
                                                >
                                                  <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                                                    <div className="[word-break:break-word] content-stretch flex font-['Pretendard:Regular',sans-serif] items-center justify-between leading-[normal] not-italic pl-[10px] pr-[8px] relative size-full whitespace-nowrap">
                                                      <p className="relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px]">
                                                        수급자명
                                                      </p>
                                                      <p className="relative shrink-0 text-[#8a9cb4] text-[10px] tracking-[-0.2px]">{` ↕`}</p>
                                                    </div>
                                                  </div>
                                                  <div
                                                    aria-hidden
                                                    className="absolute border-[#c2cfdf] border-b border-l border-solid border-t inset-0 pointer-events-none"
                                                  />
                                                </div>
                                                <div
                                                  className="bg-[#d9ecff] h-[40px] relative shrink-0 w-full"
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
                                            className="relative shrink-0"
                                            data-name="Table/Column"
                                          >
                                            <div className="overflow-clip rounded-[inherit] size-full">
                                              <div className="content-stretch flex flex-col items-start relative size-full">
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
                                                <div
                                                  className="bg-[#d9ecff] h-[40px] relative shrink-0 w-full"
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
                                            className="relative shrink-0"
                                            data-name="Table/Column"
                                          >
                                            <div className="overflow-clip rounded-[inherit] size-full">
                                              <div className="content-stretch flex flex-col items-start relative size-full">
                                                <div
                                                  className="bg-[#f4f7fc] h-[44px] relative shrink-0 w-full"
                                                  data-name="header"
                                                >
                                                  <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                                                    <div className="[word-break:break-word] content-stretch flex font-['Pretendard:Regular',sans-serif] items-center justify-between leading-[normal] not-italic pl-[10px] pr-[8px] relative size-full whitespace-nowrap">
                                                      <p className="relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px]">
                                                        등급
                                                      </p>
                                                      <p className="relative shrink-0 text-[#8a9cb4] text-[10px] tracking-[-0.2px]">{` ↕`}</p>
                                                    </div>
                                                  </div>
                                                  <div
                                                    aria-hidden
                                                    className="absolute border-[#c2cfdf] border-b border-l border-solid border-t inset-0 pointer-events-none"
                                                  />
                                                </div>
                                                <div
                                                  className="bg-[#d9ecff] h-[40px] relative shrink-0 w-full"
                                                  data-name="cell-1"
                                                >
                                                  <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                                                    <div className="content-stretch flex items-center px-[10px] relative size-full">
                                                      <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                                                        2
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
                                                        1
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
                                                        3
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
                                                        1
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
                                                        2
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
                                                        3
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
                                                        1
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
                                                        2
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
                                                        2
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
                                                        3
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
                                            className="relative shrink-0"
                                            data-name="Table/Column"
                                          >
                                            <div className="overflow-clip rounded-[inherit] size-full">
                                              <div className="content-stretch flex flex-col items-start relative size-full">
                                                <div
                                                  className="bg-[#f4f7fc] h-[44px] relative shrink-0 w-full"
                                                  data-name="header"
                                                >
                                                  <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                                                    <div className="[word-break:break-word] content-stretch flex font-['Pretendard:Regular',sans-serif] items-center justify-between leading-[normal] not-italic pl-[10px] pr-[8px] relative size-full whitespace-nowrap">
                                                      <p className="relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px]">
                                                        성별
                                                      </p>
                                                      <p className="relative shrink-0 text-[#8a9cb4] text-[10px] tracking-[-0.2px]">{` ↕`}</p>
                                                    </div>
                                                  </div>
                                                  <div
                                                    aria-hidden
                                                    className="absolute border-[#c2cfdf] border-b border-l border-solid border-t inset-0 pointer-events-none"
                                                  />
                                                </div>
                                                <div
                                                  className="bg-[#d9ecff] h-[40px] relative shrink-0 w-full"
                                                  data-name="cell-1"
                                                >
                                                  <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                                                    <div className="content-stretch flex items-center px-[10px] relative size-full">
                                                      <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                                                        여
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
                                                        남
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
                                                        남
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
                                                        여
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
                                                  data-name="cell-6"
                                                >
                                                  <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                                                    <div className="content-stretch flex items-center px-[10px] relative size-full">
                                                      <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[14px] whitespace-nowrap">
                                                        남
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
                                                        남
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
                                                        여
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
                                                        남
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
                                                        여
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
                                            className="relative shrink-0"
                                            data-name="Table/Column"
                                          >
                                            <div className="overflow-clip rounded-[inherit] size-full">
                                              <div className="content-stretch flex flex-col items-start relative size-full">
                                                <div
                                                  className="bg-[#f4f7fc] h-[44px] relative shrink-0 w-full"
                                                  data-name="header"
                                                >
                                                  <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                                                    <div className="[word-break:break-word] content-stretch flex font-['Pretendard:Regular',sans-serif] items-center justify-between leading-[normal] not-italic pl-[10px] pr-[8px] relative size-full whitespace-nowrap">
                                                      <p className="relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px]">
                                                        생활실
                                                      </p>
                                                      <p className="relative shrink-0 text-[#8a9cb4] text-[10px] tracking-[-0.2px]">{` ↕`}</p>
                                                    </div>
                                                  </div>
                                                  <div
                                                    aria-hidden
                                                    className="absolute border-[#c2cfdf] border-b border-l border-solid border-t inset-0 pointer-events-none"
                                                  />
                                                </div>
                                                <div
                                                  className="bg-[#d9ecff] h-[40px] relative shrink-0 w-full"
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
                                                        1생활실
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
                                                        1생활실
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
                                                        1생활실
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
                                                        1생활실
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
                                                        1생활실
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
                                                        1생활실
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
                                            className="relative shrink-0 w-[91px]"
                                            data-name="Table/Column"
                                          >
                                            <div className="overflow-clip rounded-[inherit] size-full">
                                              <div className="content-stretch flex flex-col items-start relative size-full">
                                                <div
                                                  className="bg-[#f4f7fc] h-[44px] relative shrink-0 w-full"
                                                  data-name="header"
                                                >
                                                  <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                                                    <div className="[word-break:break-word] content-stretch flex font-['Pretendard:Regular',sans-serif] items-center justify-between leading-[normal] not-italic pl-[10px] pr-[8px] relative size-full whitespace-nowrap">
                                                      <p className="relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px]">
                                                        인정만료일
                                                      </p>
                                                      <p className="relative shrink-0 text-[#8a9cb4] text-[10px] tracking-[-0.2px]">{` ↕`}</p>
                                                    </div>
                                                  </div>
                                                  <div
                                                    aria-hidden
                                                    className="absolute border-[#c2cfdf] border-b border-l border-solid border-t inset-0 pointer-events-none"
                                                  />
                                                </div>
                                                <div
                                                  className="bg-[#d9ecff] h-[40px] relative shrink-0 w-full"
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
                                          <div
                                            className="relative shrink-0"
                                            data-name="Table/Column"
                                          >
                                            <div className="overflow-clip rounded-[inherit] size-full">
                                              <div className="content-stretch flex flex-col items-start relative size-full">
                                                <div
                                                  className="bg-[#f4f7fc] h-[44px] relative shrink-0 w-full"
                                                  data-name="header"
                                                >
                                                  <div
                                                    aria-hidden
                                                    className="absolute border-[#c2cfdf] border-b border-l border-solid border-t inset-0 pointer-events-none"
                                                  />
                                                  <div className="flex flex-row items-center size-full">
                                                    <div className="content-stretch flex items-center justify-between pl-[10px] pr-[8px] relative size-full">
                                                      <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px] whitespace-nowrap">
                                                        관리
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div
                                                  className="bg-[#d9ecff] h-[40px] relative shrink-0 w-[52px]"
                                                  data-name="cell-1"
                                                >
                                                  <div
                                                    aria-hidden
                                                    className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                                                  />
                                                  <div className="flex flex-row items-center size-full">
                                                    <div className="content-stretch flex items-center px-[10px] relative size-full">
                                                      <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                                                        <div
                                                          className="bg-[#4bc4c7] col-1 content-stretch flex flex-col h-[18px] items-start ml-0 mt-0 overflow-clip px-[2px] py-px relative rounded-[4px] row-1"
                                                          data-name="solar:pen-bold"
                                                        >
                                                          <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-white tracking-[-0.24px] w-full">
                                                            희
                                                          </p>
                                                        </div>
                                                        <div
                                                          className="bg-[#ef413d] col-1 content-stretch flex flex-col h-[18px] items-start ml-[17px] mt-0 overflow-clip px-[2px] py-px relative rounded-[4px] row-1"
                                                          data-name="solar:pen-bold"
                                                        >
                                                          <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-white tracking-[-0.24px] w-full">
                                                            롱
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div
                                                  className="bg-white h-[40px] relative shrink-0 w-[52px]"
                                                  data-name="cell-2"
                                                >
                                                  <div
                                                    aria-hidden
                                                    className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                                                  />
                                                  <div className="flex flex-row items-center size-full">
                                                    <div className="content-stretch flex items-center px-[10px] relative size-full">
                                                      <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                                                        <div
                                                          className="bg-[#4bc4c7] col-1 content-stretch flex flex-col h-[18px] items-start ml-0 mt-0 overflow-clip px-[2px] py-px relative rounded-[4px] row-1"
                                                          data-name="solar:pen-bold"
                                                        >
                                                          <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-white tracking-[-0.24px] w-full">
                                                            희
                                                          </p>
                                                        </div>
                                                        <div
                                                          className="bg-[#ef413d] col-1 content-stretch flex flex-col h-[18px] items-start ml-[17px] mt-0 overflow-clip px-[2px] py-px relative rounded-[4px] row-1"
                                                          data-name="solar:pen-bold"
                                                        >
                                                          <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-white tracking-[-0.24px] w-full">
                                                            롱
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div
                                                  className="bg-white h-[40px] relative shrink-0 w-[52px]"
                                                  data-name="cell-2"
                                                >
                                                  <div
                                                    aria-hidden
                                                    className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                                                  />
                                                  <div className="flex flex-row items-center size-full">
                                                    <div className="content-stretch flex items-center px-[10px] relative size-full">
                                                      <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                                                        <div
                                                          className="bg-[#4bc4c7] col-1 content-stretch flex flex-col h-[18px] items-start ml-0 mt-0 overflow-clip px-[2px] py-px relative rounded-[4px] row-1"
                                                          data-name="solar:pen-bold"
                                                        >
                                                          <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-white tracking-[-0.24px] w-full">
                                                            희
                                                          </p>
                                                        </div>
                                                        <div
                                                          className="bg-[#ef413d] col-1 content-stretch flex flex-col h-[18px] items-start ml-[17px] mt-0 overflow-clip px-[2px] py-px relative rounded-[4px] row-1"
                                                          data-name="solar:pen-bold"
                                                        >
                                                          <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-white tracking-[-0.24px] w-full">
                                                            롱
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div
                                                  className="bg-white h-[40px] relative shrink-0 w-[52px]"
                                                  data-name="cell-2"
                                                >
                                                  <div
                                                    aria-hidden
                                                    className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                                                  />
                                                  <div className="flex flex-row items-center size-full">
                                                    <div className="content-stretch flex items-center px-[10px] relative size-full">
                                                      <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                                                        <div
                                                          className="bg-[#4bc4c7] col-1 content-stretch flex flex-col h-[18px] items-start ml-0 mt-0 overflow-clip px-[2px] py-px relative rounded-[4px] row-1"
                                                          data-name="solar:pen-bold"
                                                        >
                                                          <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-white tracking-[-0.24px] w-full">
                                                            희
                                                          </p>
                                                        </div>
                                                        <div
                                                          className="bg-[#ef413d] col-1 content-stretch flex flex-col h-[18px] items-start ml-[17px] mt-0 overflow-clip px-[2px] py-px relative rounded-[4px] row-1"
                                                          data-name="solar:pen-bold"
                                                        >
                                                          <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-white tracking-[-0.24px] w-full">
                                                            롱
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div
                                                  className="bg-white h-[40px] relative shrink-0 w-[52px]"
                                                  data-name="cell-2"
                                                >
                                                  <div
                                                    aria-hidden
                                                    className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                                                  />
                                                  <div className="flex flex-row items-center size-full">
                                                    <div className="content-stretch flex items-center px-[10px] relative size-full">
                                                      <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                                                        <div
                                                          className="bg-[#4bc4c7] col-1 content-stretch flex flex-col h-[18px] items-start ml-0 mt-0 overflow-clip px-[2px] py-px relative rounded-[4px] row-1"
                                                          data-name="solar:pen-bold"
                                                        >
                                                          <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-white tracking-[-0.24px] w-full">
                                                            희
                                                          </p>
                                                        </div>
                                                        <div
                                                          className="bg-[#ef413d] col-1 content-stretch flex flex-col h-[18px] items-start ml-[17px] mt-0 overflow-clip px-[2px] py-px relative rounded-[4px] row-1"
                                                          data-name="solar:pen-bold"
                                                        >
                                                          <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-white tracking-[-0.24px] w-full">
                                                            롱
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div
                                                  className="bg-white h-[40px] relative shrink-0 w-[52px]"
                                                  data-name="cell-2"
                                                >
                                                  <div
                                                    aria-hidden
                                                    className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                                                  />
                                                  <div className="flex flex-row items-center size-full">
                                                    <div className="content-stretch flex items-center px-[10px] relative size-full">
                                                      <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                                                        <div
                                                          className="bg-[#4bc4c7] col-1 content-stretch flex flex-col h-[18px] items-start ml-0 mt-0 overflow-clip px-[2px] py-px relative rounded-[4px] row-1"
                                                          data-name="solar:pen-bold"
                                                        >
                                                          <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-white tracking-[-0.24px] w-full">
                                                            희
                                                          </p>
                                                        </div>
                                                        <div
                                                          className="bg-[#ef413d] col-1 content-stretch flex flex-col h-[18px] items-start ml-[17px] mt-0 overflow-clip px-[2px] py-px relative rounded-[4px] row-1"
                                                          data-name="solar:pen-bold"
                                                        >
                                                          <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-white tracking-[-0.24px] w-full">
                                                            롱
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div
                                                  className="bg-white h-[40px] relative shrink-0 w-[52px]"
                                                  data-name="cell-2"
                                                >
                                                  <div
                                                    aria-hidden
                                                    className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                                                  />
                                                  <div className="flex flex-row items-center size-full">
                                                    <div className="content-stretch flex items-center px-[10px] relative size-full">
                                                      <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                                                        <div
                                                          className="bg-[#4bc4c7] col-1 content-stretch flex flex-col h-[18px] items-start ml-0 mt-0 overflow-clip px-[2px] py-px relative rounded-[4px] row-1"
                                                          data-name="solar:pen-bold"
                                                        >
                                                          <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-white tracking-[-0.24px] w-full">
                                                            희
                                                          </p>
                                                        </div>
                                                        <div
                                                          className="bg-[#ef413d] col-1 content-stretch flex flex-col h-[18px] items-start ml-[17px] mt-0 overflow-clip px-[2px] py-px relative rounded-[4px] row-1"
                                                          data-name="solar:pen-bold"
                                                        >
                                                          <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-white tracking-[-0.24px] w-full">
                                                            롱
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div
                                                  className="bg-white h-[40px] relative shrink-0 w-[52px]"
                                                  data-name="cell-2"
                                                >
                                                  <div
                                                    aria-hidden
                                                    className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                                                  />
                                                  <div className="flex flex-row items-center size-full">
                                                    <div className="content-stretch flex items-center px-[10px] relative size-full">
                                                      <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                                                        <div
                                                          className="bg-[#4bc4c7] col-1 content-stretch flex flex-col h-[18px] items-start ml-0 mt-0 overflow-clip px-[2px] py-px relative rounded-[4px] row-1"
                                                          data-name="solar:pen-bold"
                                                        >
                                                          <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-white tracking-[-0.24px] w-full">
                                                            희
                                                          </p>
                                                        </div>
                                                        <div
                                                          className="bg-[#ef413d] col-1 content-stretch flex flex-col h-[18px] items-start ml-[17px] mt-0 overflow-clip px-[2px] py-px relative rounded-[4px] row-1"
                                                          data-name="solar:pen-bold"
                                                        >
                                                          <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-white tracking-[-0.24px] w-full">
                                                            롱
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div
                                                  className="bg-white h-[40px] relative shrink-0 w-[52px]"
                                                  data-name="cell-2"
                                                >
                                                  <div
                                                    aria-hidden
                                                    className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                                                  />
                                                  <div className="flex flex-row items-center size-full">
                                                    <div className="content-stretch flex items-center px-[10px] relative size-full">
                                                      <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                                                        <div
                                                          className="bg-[#4bc4c7] col-1 content-stretch flex flex-col h-[18px] items-start ml-0 mt-0 overflow-clip px-[2px] py-px relative rounded-[4px] row-1"
                                                          data-name="solar:pen-bold"
                                                        >
                                                          <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-white tracking-[-0.24px] w-full">
                                                            희
                                                          </p>
                                                        </div>
                                                        <div
                                                          className="bg-[#ef413d] col-1 content-stretch flex flex-col h-[18px] items-start ml-[17px] mt-0 overflow-clip px-[2px] py-px relative rounded-[4px] row-1"
                                                          data-name="solar:pen-bold"
                                                        >
                                                          <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-white tracking-[-0.24px] w-full">
                                                            롱
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div
                                                  className="bg-white h-[40px] relative shrink-0 w-[52px]"
                                                  data-name="cell-2"
                                                >
                                                  <div
                                                    aria-hidden
                                                    className="absolute border-[#c2cfdf] border-b border-l border-solid inset-0 pointer-events-none"
                                                  />
                                                  <div className="flex flex-row items-center size-full">
                                                    <div className="content-stretch flex items-center px-[10px] relative size-full">
                                                      <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                                                        <div
                                                          className="bg-[#4bc4c7] col-1 content-stretch flex flex-col h-[18px] items-start ml-0 mt-0 overflow-clip px-[2px] py-px relative rounded-[4px] row-1"
                                                          data-name="solar:pen-bold"
                                                        >
                                                          <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-white tracking-[-0.24px] w-full">
                                                            희
                                                          </p>
                                                        </div>
                                                        <div
                                                          className="bg-[#ef413d] col-1 content-stretch flex flex-col h-[18px] items-start ml-[17px] mt-0 overflow-clip px-[2px] py-px relative rounded-[4px] row-1"
                                                          data-name="solar:pen-bold"
                                                        >
                                                          <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-white tracking-[-0.24px] w-full">
                                                            롱
                                                          </p>
                                                        </div>
                                                      </div>
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
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="bg-white flex-[1_0_0] h-full min-w-px relative rounded-br-[24px] rounded-tr-[24px] shadow-[-1px_0px_10px_0px_rgba(0,0,0,0.05)]"
                                data-name="right"
                              >
                                <div className="overflow-clip rounded-[inherit] size-full">
                                  <div className="content-stretch flex flex-col items-start p-[24px] relative size-full">
                                    <div
                                      className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px overflow-clip relative w-full"
                                      data-name="info"
                                    >
                                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                                        <div className="bg-white content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
                                          <div
                                            className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                                            data-name="1"
                                          >
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
                                                  <div
                                                    className="h-[32px] relative shrink-0"
                                                    data-name="Tab Item"
                                                  >
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
                                                  <div
                                                    className="h-[32px] relative shrink-0"
                                                    data-name="Tab Item"
                                                  >
                                                    <div className="content-stretch flex items-start px-[8px] py-[7px] relative size-full">
                                                      <p className="[word-break:break-word] font-['Pretendard:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#8a9cb4] text-[16px] tracking-[-0.32px] whitespace-nowrap">
                                                        보호자정보
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                                                <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                                                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                                                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                                                      <div className="content-stretch flex h-[32px] items-center justify-between relative shrink-0 w-full">
                                                        <Component1 className="h-[32px] relative shrink-0" />
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
                                                                                d={
                                                                                  svgPaths.p1f34af00
                                                                                }
                                                                                id="Vector"
                                                                                stroke="#2A3461"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                              />
                                                                              <path
                                                                                d={
                                                                                  svgPaths.p12c14080
                                                                                }
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
                                                                                d={
                                                                                  svgPaths.p1f34af00
                                                                                }
                                                                                id="Vector"
                                                                                stroke="white"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                              />
                                                                              <path
                                                                                d={
                                                                                  svgPaths.p12c14080
                                                                                }
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
                                                                  주요질환/특이사항
                                                                  입력
                                                                </p>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="content-stretch flex gap-[15px] items-start relative shrink-0 w-full">
                                                    <Component className="bg-[#d9e2ef] relative rounded-[8px] shrink-0" />
                                                    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative">
                                                      <div className="content-stretch flex items-start relative shrink-0 w-full">
                                                        <div
                                                          className="bg-white flex-[1_0_0] h-[280px] min-w-px relative"
                                                          data-name="세로형 테이블"
                                                        >
                                                          <div className="flex flex-col justify-center size-full">
                                                            <div className="content-stretch flex flex-col items-start justify-center relative size-full">
                                                              <div
                                                                className="content-stretch flex h-[40px] items-start relative shrink-0 w-full"
                                                                data-name="Frame"
                                                              >
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
                                                              </div>
                                                              <div
                                                                className="content-stretch flex h-[40px] items-start relative shrink-0 w-full"
                                                                data-name="Frame"
                                                              >
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
                                                              </div>
                                                              <div
                                                                className="content-stretch flex h-[40px] items-start relative shrink-0 w-full"
                                                                data-name="Frame"
                                                              >
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
                                                                <div
                                                                  className="bg-white flex-[1_0_0] h-[40px] min-w-px relative"
                                                                  data-name="data/인정기간"
                                                                >
                                                                  <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                                                                    <div className="content-stretch flex items-center px-[10px] relative size-full">
                                                                      <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#283445] text-[14px] tracking-[-0.28px] whitespace-nowrap">
                                                                        0000.00.00
                                                                        -
                                                                        0000.00.00
                                                                      </p>
                                                                    </div>
                                                                  </div>
                                                                  <div
                                                                    aria-hidden
                                                                    className="absolute border-[#c2cfdf] border-b border-r border-solid inset-0 pointer-events-none"
                                                                  />
                                                                </div>
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
                                                                <div
                                                                  className="bg-white flex-[1_0_0] h-[40px] min-w-px relative"
                                                                  data-name="data/계약기간"
                                                                >
                                                                  <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                                                                    <div className="content-stretch flex gap-[6px] items-center px-[10px] relative size-full">
                                                                      <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#283445] text-[14px] tracking-[-0.28px] whitespace-nowrap">
                                                                        0000.00.00
                                                                        -
                                                                        0000.00.00
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
                                                              </div>
                                                              <div
                                                                className="content-stretch flex h-[40px] items-start relative shrink-0 w-full"
                                                                data-name="Frame"
                                                              >
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
                                                                <div
                                                                  className="bg-white flex-[1_0_0] h-[40px] min-w-px relative"
                                                                  data-name="data/주소"
                                                                >
                                                                  <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                                                                    <div className="content-stretch flex gap-[6px] items-center px-[10px] relative size-full">
                                                                      <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#283445] text-[14px] tracking-[-0.28px] whitespace-nowrap">
                                                                        서울시
                                                                        구로구
                                                                        디지털로34길
                                                                        55,
                                                                        코오롱싸이언스밸리2차
                                                                        B101호
                                                                        (웍앤코)
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
                                                              </div>
                                                              <div
                                                                className="content-stretch flex h-[40px] items-start relative shrink-0 w-full"
                                                                data-name="Frame"
                                                              >
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
                                                                <div
                                                                  className="bg-[#f4f7fc] h-[40px] relative shrink-0 w-[80px]"
                                                                  data-name="label/담당 복지사"
                                                                >
                                                                  <div className="content-stretch flex items-center overflow-clip px-[10px] relative rounded-[inherit] size-full">
                                                                    <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px] whitespace-nowrap">
                                                                      담당
                                                                      복지사
                                                                    </p>
                                                                  </div>
                                                                  <div
                                                                    aria-hidden
                                                                    className="absolute border-[#c2cfdf] border-b border-r border-solid inset-0 pointer-events-none"
                                                                  />
                                                                </div>
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
                                                              </div>
                                                              <div
                                                                className="content-stretch flex h-[40px] items-start relative shrink-0 w-full"
                                                                data-name="Frame"
                                                              >
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
                                                              </div>
                                                              <div
                                                                className="content-stretch flex h-[40px] items-start relative shrink-0 w-full"
                                                                data-name="Frame"
                                                              >
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
                                                                <div
                                                                  className="bg-white flex-[1_0_0] h-[40px] min-w-px relative"
                                                                  data-name="data/특이사항"
                                                                >
                                                                  <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                                                                    <div className="content-stretch flex items-center px-[10px] relative size-full">
                                                                      <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#283445] text-[14px] tracking-[-0.28px] whitespace-nowrap">
                                                                        땅콩
                                                                        알레르기
                                                                      </p>
                                                                    </div>
                                                                  </div>
                                                                  <div
                                                                    aria-hidden
                                                                    className="absolute border-[#c2cfdf] border-b border-r border-solid inset-0 pointer-events-none"
                                                                  />
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            className="content-stretch flex flex-col h-[32px] items-start relative shrink-0 w-full"
                                            data-name="2"
                                          >
                                            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
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
                                                    <div
                                                      className="h-[32px] relative shrink-0"
                                                      data-name="Tab Item"
                                                    >
                                                      <div className="content-stretch flex items-start px-[8px] py-[7px] relative size-full">
                                                        <p className="[word-break:break-word] font-['Pretendard:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#8a9cb4] text-[16px] tracking-[-0.32px] whitespace-nowrap">
                                                          입·퇴소
                                                        </p>
                                                      </div>
                                                    </div>
                                                    <div
                                                      className="h-[32px] relative shrink-0"
                                                      data-name="Tab Item"
                                                    >
                                                      <div className="content-stretch flex items-start px-[8px] py-[7px] relative size-full">
                                                        <p className="[word-break:break-word] font-['Pretendard:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#8a9cb4] text-[16px] tracking-[-0.32px] whitespace-nowrap">
                                                          기초평가
                                                        </p>
                                                      </div>
                                                    </div>
                                                    <div
                                                      className="h-[32px] relative shrink-0"
                                                      data-name="Tab Item"
                                                    >
                                                      <div className="content-stretch flex items-start px-[8px] py-[7px] relative size-full">
                                                        <p className="[word-break:break-word] font-['Pretendard:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#8a9cb4] text-[16px] tracking-[-0.32px] whitespace-nowrap">
                                                          상담일지
                                                        </p>
                                                      </div>
                                                    </div>
                                                    <div
                                                      className="h-[32px] relative shrink-0"
                                                      data-name="Tab Item"
                                                    >
                                                      <div className="content-stretch flex items-start px-[8px] py-[7px] relative size-full">
                                                        <p className="[word-break:break-word] font-['Pretendard:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#8a9cb4] text-[16px] tracking-[-0.32px] whitespace-nowrap">
                                                          외출·외박 기록
                                                        </p>
                                                      </div>
                                                    </div>
                                                    <div
                                                      className="h-[32px] relative shrink-0"
                                                      data-name="Tab Item"
                                                    >
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
                                                    <div
                                                      className="h-[32px] relative shrink-0"
                                                      data-name="Tab Item"
                                                    >
                                                      <div className="content-stretch flex items-start px-[8px] py-[7px] relative size-full">
                                                        <p className="[word-break:break-word] font-['Pretendard:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#8a9cb4] text-[16px] tracking-[-0.32px] whitespace-nowrap">
                                                          상태변화기록
                                                        </p>
                                                      </div>
                                                    </div>
                                                    <div
                                                      className="h-[32px] relative shrink-0"
                                                      data-name="Tab Item"
                                                    >
                                                      <div className="content-stretch flex items-start px-[8px] py-[7px] relative size-full">
                                                        <p className="[word-break:break-word] font-['Pretendard:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#8a9cb4] text-[16px] tracking-[-0.32px] whitespace-nowrap">
                                                          본인부담금
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div
                                                  className="content-stretch flex flex-col gap-[8px] h-[292px] items-start relative shrink-0 w-full"
                                                  data-name="2"
                                                >
                                                  <div
                                                    className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full"
                                                    data-name="5"
                                                  >
                                                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                                                      <div
                                                        className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full"
                                                        data-name="7"
                                                      >
                                                        <div
                                                          className="bg-white content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full"
                                                          data-name="8"
                                                        >
                                                          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                                                            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                                                              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                                                                <div className="content-stretch flex items-start relative shrink-0">
                                                                  <p className="[word-break:break-word] font-['Pretendard:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#0e1225] text-[17px] tracking-[-0.34px] whitespace-nowrap">
                                                                    기타비용
                                                                  </p>
                                                                </div>
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
                                                                                      d={
                                                                                        svgPaths.p3873da80
                                                                                      }
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
                                                                          기타비용
                                                                          신규등록
                                                                        </p>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                                                            <div className="content-stretch flex h-[32px] items-start relative shrink-0 w-full">
                                                              <DateSelect className="absolute left-0 top-0" />
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                                                    <div
                                                      className="bg-white h-[204px] relative shrink-0 w-full"
                                                      data-name="Table (컴포넌트 기반)"
                                                    >
                                                      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
                                                        <div
                                                          className="relative shrink-0"
                                                          data-name="Table/Column"
                                                        >
                                                          <div className="overflow-clip rounded-[inherit] size-full">
                                                            <div className="content-stretch flex flex-col items-start relative size-full">
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
                                                        <div
                                                          className="relative shrink-0"
                                                          data-name="Table/Column"
                                                        >
                                                          <div className="overflow-clip rounded-[inherit] size-full">
                                                            <div className="content-stretch flex flex-col items-start relative size-full">
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
                                                          className="relative shrink-0 w-[99px]"
                                                          data-name="Table/Column"
                                                        >
                                                          <div className="overflow-clip rounded-[inherit] size-full">
                                                            <div className="content-stretch flex flex-col items-start relative size-full">
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
                                                        <div
                                                          className="relative shrink-0"
                                                          data-name="Table/Column"
                                                        >
                                                          <div className="overflow-clip rounded-[inherit] size-full">
                                                            <div className="content-stretch flex flex-col items-start relative size-full">
                                                              <div
                                                                className="bg-[#f4f7fc] h-[44px] relative shrink-0 w-full"
                                                                data-name="header"
                                                              >
                                                                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                                                                  <div className="[word-break:break-word] content-stretch flex font-['Pretendard:Regular',sans-serif] items-center justify-between not-italic pl-[10px] pr-[8px] relative size-full whitespace-nowrap">
                                                                    <p className="leading-[normal] relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px]">
                                                                      비용발생
                                                                      항목
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
                                                        <div
                                                          className="relative shrink-0"
                                                          data-name="Table/Column"
                                                        >
                                                          <div className="overflow-clip rounded-[inherit] size-full">
                                                            <div className="content-stretch flex flex-col items-start relative size-full">
                                                              <div
                                                                className="bg-[#f4f7fc] h-[44px] relative shrink-0 w-full"
                                                                data-name="header"
                                                              >
                                                                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                                                                  <div className="[word-break:break-word] content-stretch flex font-['Pretendard:Regular',sans-serif] items-center justify-between not-italic pl-[10px] pr-[8px] relative size-full whitespace-nowrap">
                                                                    <p className="leading-[normal] relative shrink-0 text-[#283445] text-[13px] tracking-[-0.26px]">
                                                                      본인부담금
                                                                      청구
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
                                                        <div
                                                          className="relative shrink-0"
                                                          data-name="Table/Column"
                                                        >
                                                          <div className="overflow-clip rounded-[inherit] size-full">
                                                            <div className="content-stretch flex flex-col items-start relative size-full">
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
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
