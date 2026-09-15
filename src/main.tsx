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
