import React, { useState, Component, ReactNode } from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { ComponentPlayground } from "./pages/ComponentPlayground"
import "./index.css"

class ErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'red', fontFamily: 'monospace' }}>
          <h2>Something went wrong.</h2>
          <pre>{this.state.error?.toString()}</pre>
          <pre>{this.state.error?.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const Main = () => {
  const [showTest, setShowTest] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("central_auth") === "true";
  });
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (passwordInput === "wnddkd123") {
      sessionStorage.setItem("central_auth", "true");
      setIsAuthenticated(true);
      setErrorMsg("");
    } else {
      setErrorMsg("비밀번호가 올바르지 않습니다. 다시 입력해주세요.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-[#0e1726] flex items-center justify-center p-4 font-sans select-none">
        <div className="w-full max-w-[380px] bg-white rounded-[16px] shadow-2xl p-8 flex flex-col items-center animate-in fade-in zoom-in duration-200">
          <div className="size-[52px] rounded-full bg-[#2a3461] flex items-center justify-center text-white mb-4 shadow-md">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>

          <h1 className="text-[19px] font-bold text-[#0e1225] tracking-tight mb-1">
            Central Care 시스템
          </h1>
          <p className="text-[12.5px] text-[#64748b] mb-6 text-center">
            보안 접속을 위해 비밀번호를 입력해주세요.
          </p>

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-3">
            <div>
              <input
                type="password"
                autoFocus
                placeholder="비밀번호 입력"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  if (errorMsg) setErrorMsg("");
                }}
                className="w-full h-[44px] px-3.5 bg-[#f8fafc] border border-[#c2cfdf] focus:border-[#2a3461] focus:bg-white rounded-[8px] text-[14px] text-[#0e1225] tracking-widest outline-none transition-all"
              />
              {errorMsg && (
                <p className="text-[11.5px] text-[#ef4444] font-semibold mt-1.5 px-1">
                  {errorMsg}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full h-[44px] bg-[#2a3461] hover:bg-[#38467d] text-white text-[14px] font-bold rounded-[8px] shadow-md transition-all cursor-pointer flex items-center justify-center mt-1"
            >
              접속하기
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      {showTest ? <ComponentPlayground /> : <App />}
      <button 
        onClick={() => setShowTest(!showTest)}
        className="fixed bottom-4 right-4 z-[9999] bg-gray-800 text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold hover:bg-gray-700"
      >
        {showTest ? "Go to Dashboard" : "Test Components"}
      </button>
    </ErrorBoundary>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
)
