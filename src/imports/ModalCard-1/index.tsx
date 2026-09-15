import svgPaths from "./svg-ps8xvdvrhd"
type ButtonComponentProps = {
  className?: string
  icon?: boolean
  size?: "Large" | "36"
  state?: "Default"
  type?: "Primary" | "Ghost" | "File"
}

function ButtonComponent({
  className,
  icon = true,
  size = "Large",
  state = "Default",
  type = "Primary",
}: ButtonComponentProps) {
  const isFileAnd36AndDefaultAndNotIcon =
    type === "File" && size === "36" && state === "Default" && !icon
  const isGhostAndLargeAndDefaultAndIcon =
    type === "Ghost" && size === "Large" && state === "Default" && icon
  return (
    <div
      className={
        className ||
        `relative rounded-[8px] ${
          isFileAnd36AndDefaultAndNotIcon
            ? "bg-[#fff4db] h-[36px]"
            : isGhostAndLargeAndDefaultAndIcon
              ? "bg-[#eef1f8] h-[40px]"
              : "bg-[#2a3461] h-[40px]"
        }`
      }
    >
      <div className="flex flex-row items-center justify-center size-full">
        <div
          className={`content-stretch flex items-center justify-center relative size-full ${
            isFileAnd36AndDefaultAndNotIcon
              ? "px-[10px] py-[7px]"
              : "gap-[6px] px-[14px] py-[12px]"
          }`}
        >
          {size === "Large" &&
            state === "Default" &&
            icon &&
            ["Primary", "Ghost"].includes(type) && (
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
                              stroke={
                                isGhostAndLargeAndDefaultAndIcon
                                  ? "#3E4D63"
                                  : "white"
                              }
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d={svgPaths.p12c14080}
                              id="Vector_2"
                              stroke={
                                isGhostAndLargeAndDefaultAndIcon
                                  ? "#3E4D63"
                                  : "white"
                              }
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
            )}
          <p
            className={`[word-break:break-word] font-["Pretendard:Regular",sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] tracking-[0.01px] whitespace-nowrap ${
              isFileAnd36AndDefaultAndNotIcon
                ? "text-[#ef5a27]"
                : isGhostAndLargeAndDefaultAndIcon
                  ? "text-[#3e4d63]"
                  : "text-white"
            }`}
          >
            {isFileAnd36AndDefaultAndNotIcon
              ? "파일 선택"
              : isGhostAndLargeAndDefaultAndIcon
                ? "취소"
                : "메인버튼"}
          </p>
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
type ComponentProps = {
  className?: string
  propValue?: "여/수급자"
}

function Component({ className, propValue = "여/수급자" }: ComponentProps) {
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
            수급자 사진 설정
          </p>
          <Frame />
        </div>
      </div>
    </div>
  )
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col h-[32px] items-start justify-center relative shrink-0 w-full">
      <Component className="h-[32px] relative shrink-0" />
    </div>
  )
}

function NoImg() {
  return (
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
  )
}

function Group1() {
  return (
    <div className="absolute contents left-[17px] top-[19.83px]">
      <NoImg />
      <p className="[word-break:break-word] absolute font-['Pretendard:Regular',sans-serif] leading-[16px] left-[17px] not-italic text-[#8a9cb4] text-[14px] top-[63.83px] tracking-[-0.28px] whitespace-nowrap">
        사진 없음
      </p>
    </div>
  )
}

function Frame2() {
  return (
    <div className="bg-[#eef3fa] h-[100px] overflow-clip relative rounded-[8px] shrink-0 w-[84px]">
      <Group1 />
    </div>
  )
}

function ProfilePreviewContainer() {
  return (
    <div
      className="col-1 content-stretch flex items-center justify-center ml-0 mt-0 p-[12px] relative rounded-[8px] row-1 w-[280px]"
      data-name="profile-preview-container"
    >
      <div
        aria-hidden
        className="absolute border border-[#d9e2ef] border-solid inset-0 pointer-events-none rounded-[8px]"
      />
      <div
        className="bg-[#d9e2ef] relative rounded-[8px] shrink-0"
        data-name="profile-image-component"
      >
        <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-center justify-center p-px relative size-full">
            <Frame2 />
          </div>
        </div>
      </div>
    </div>
  )
}

function InputField() {
  return (
    <div
      className="bg-white flex-[1_0_0] h-[36px] min-w-px relative rounded-[8px]"
      data-name="Input Field"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between px-[10px] relative size-full">
          <p className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#a8b7cb] text-[13px] whitespace-nowrap">
            텍스트를 입력하세요
          </p>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute border border-[#d7e1ee] border-solid inset-0 pointer-events-none rounded-[8px]"
      />
    </div>
  )
}

function InputRow() {
  return (
    <div
      className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full"
      data-name="Input Row"
    >
      <InputField />
      <ButtonComponent
        className="bg-[#fff4db] h-[36px] relative rounded-[8px] shrink-0 w-[72px]"
        icon={false}
        size="36"
        type="File"
      />
    </div>
  )
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <ProfilePreviewContainer />
      <div
        className="col-1 ml-0 mt-[138px] relative row-1 w-[280px]"
        data-name="Form Field"
      >
        <div className="content-stretch flex flex-col gap-[6px] items-start relative size-full">
          <InputRow />
          <div className="[word-break:break-word] font-['Pretendard:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[#6d819b] text-[12px] w-full">
            <p className="leading-[normal] mb-0">
              * JPG, PNG, GIF 파일만 업로드 가능합니다.
            </p>
            <p className="leading-[normal]">* 5MB 이하의 파일을 권장합니다.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame3 />
      <Group />
    </div>
  )
}

function Body() {
  return (
    <div
      className="content-stretch flex flex-col items-start px-[24px] py-[20px] relative shrink-0"
      data-name="Body"
    >
      <Frame4 />
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
                viewBox="0 0 328 1"
                width="328"
              >
                <line id="Line" stroke="#C2CFDF" x2="328" y1="0.5" y2="0.5" />
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
