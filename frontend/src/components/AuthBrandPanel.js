function AuthBrandPanel({ title, subtitle }) {
  return (
    <aside className="auth-brand" aria-hidden="false">
      <div className="auth-brand-inner">
        <div className="auth-brand-logo">
          <span className="logo-mark" aria-hidden="true">✓</span>
          <span>QuickTask</span>
        </div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
        <ul className="auth-features">
          <li>
            <span className="feature-icon">◎</span>
            Organize pending and completed work separately
          </li>
          <li>
            <span className="feature-icon">◎</span>
            Your tasks stay private to your account
          </li>
          <li>
            <span className="feature-icon">◎</span>
            Mark done, reopen, or delete in one click
          </li>
        </ul>
      </div>
      <div className="auth-brand-glow" aria-hidden="true" />
    </aside>
  );
}

export default AuthBrandPanel;
