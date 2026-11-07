// Loading / error screen shown while the question bank downloads.
export default function Splash({ done, total, error, onRetry }) {
  const pct = total ? Math.round((100 * done) / total) : 0;
  return (
    <div className="splash" role="status" aria-live="polite">
      <div className="splash-box">
        <div className="splash-name" dir="rtl">رفيق</div>
        <div className="splash-en">RAFIQ</div>
        {error ? (
          <>
            <p className="splash-msg">تعذّر تحميل الأسئلة. اتأكد من الاتصال بالإنترنت وجرّب تاني.</p>
            <p className="splash-msg en">Could not load the question bank. Check your connection and try again.</p>
            <button type="button" className="splash-btn" onClick={onRetry}>إعادة المحاولة · Retry</button>
          </>
        ) : (
          <>
            <div className="splash-bar" aria-hidden="true"><i style={{ width: pct + '%' }} /></div>
            <p className="splash-msg">جاري التحميل… {pct}%</p>
          </>
        )}
      </div>
    </div>
  );
}
