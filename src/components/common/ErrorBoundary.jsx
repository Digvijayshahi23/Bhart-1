import { Component } from "react";

/**
 * ErrorBoundary — catches uncaught render errors in any child tree.
 * Renders a graceful fallback UI instead of a blank crash screen.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
    this.handleReset = this.handleReset.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // In production pipe to logger / Sentry / analytics
    console.error("[ErrorBoundary] Unhandled error:", error, errorInfo);
  }

  handleReset() {
    this.setState({ hasError: false, error: null, errorInfo: null });
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    const isDev = import.meta.env.DEV;
    const { title = "कुछ गलत हो गया", description = this.props.description } =
      this.props;

    return (
      <div
        role="alert"
        aria-live="assertive"
        className="min-h-screen flex items-center justify-center bg-background px-6"
      >
        <div className="max-w-md w-full bg-white border border-red-100 rounded-2xl shadow-lg p-8 flex flex-col items-center gap-5 text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-3xl">
            ⚠️
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-xl text-text-primary font-serif">
              {title}
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              {description ||
                "एक अप्रत्याशित त्रुटि हुई। कृपया पुनः प्रयास करें।"}
            </p>
            <p className="text-xs text-text-muted mt-1">
              (An unexpected error occurred. Please try again.)
            </p>
          </div>

          {/* Dev: show error detail */}
          {isDev && this.state.error && (
            <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-left">
              <p className="text-[10px] font-mono text-red-700 break-all">
                {this.state.error.toString()}
              </p>
              {this.state.errorInfo?.componentStack && (
                <p className="text-[9px] font-mono text-slate-500 mt-2 max-h-40 overflow-y-auto whitespace-pre-wrap">
                  {this.state.errorInfo.componentStack}
                </p>
              )}
            </div>
          )}

          <div className="flex gap-3 w-full">
            <button
              onClick={this.handleReset}
              className="flex-1 px-4 py-2.5 rounded-xl bg-saffron text-white text-sm font-semibold hover:bg-amber-600 transition-colors"
            >
              पुनः प्रयास करें (Retry)
            </button>
            <button
              onClick={() => window.location.assign("/")}
              className="flex-1 px-4 py-2.5 rounded-xl bg-surface border border-border-subtle text-sm font-semibold text-text-secondary hover:bg-surface-hover transition-colors"
            >
              होम पर जाएं (Go Home)
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
