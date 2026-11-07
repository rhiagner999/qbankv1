# رفيق — RAFIQ (React + Vite)

المنصة بنفس شكلها وسلوكها (نسخة v65 = v64 بعد تحويل المشروع)، لكن الكود بقى مشروع منظم بدل ملف `index.html` واحد.

## الهيكل

```
index.html                 صفحة الدخول (Vite)
src/main.jsx               نقطة بداية React
src/App.jsx                تحميل الأسئلة + شاشة التحميل/الخطأ (React)
src/components/Splash.jsx  شاشة التحميل
src/data/loader.js         تحميل ملفات الأسئلة
src/legacy/app.js          كود الشاشات (منقول كما هو من v64، بيتحول لمكونات React على مراحل)
src/styles/app.css         التصميم الكامل
public/data/meta.json      المواد والفصول والمواضيع والبطاقات
public/data/q-<مادة>.json  أسئلة كل مادة في ملف لوحده (28 ملف)
public/sw.js               الـ service worker (غيّر رقم rafiq-vNN مع كل تحديث)
public/*                   الأيقونات و manifest و OneSignal و rafiq.apk
.github/workflows/deploy.yml   نشر تلقائي على GitHub Pages
```

## التشغيل على جهازك

```
npm install
npm run dev        # تجربة محلية
npm run build      # الناتج في مجلد dist
```

## النشر على GitHub Pages

الطريقة 1 (تلقائي، مُوصى بها): ارفع محتويات المشروع على الفرع `main`، وفي إعدادات المستودع
Settings → Pages → Source اختر **GitHub Actions**. أي push بعد كده بيبني وينشر لوحده.

الطريقة 2 (بدون npm): استخدم ملف `rafiq-site.zip` الجاهز (محتوى مجلد dist) وارفع محتواه مكان الملفات الحالية.

## إضافة أسئلة أو مادة

- كل مادة ليها ملف `public/data/q-<مفتاح المادة>.json` (قائمة أسئلة بنفس الشكل الموجود).
- المواد والفصول والمواضيع معرّفة في `public/data/meta.json` (`SUBJECTS` و`CHAPTERS` و`TOPICS`) وقائمة الملفات في `files`.
- مع كل تحديث غيّر `CACHE` في `public/sw.js` (مثلاً `rafiq-v66`).

## خطة التحويل

1. **المرحلة 1 (دي):** مشروع Vite + React، بيانات منفصلة، تحميل وشاشة أخطاء بـ React. الشاشات شغالة من `src/legacy/app.js`.
2. **المراحل التالية:** تحويل الشاشات لمكونات React واحدة واحدة (الإطار والقوائم، الدراسة، الملف الشخصي، البطاقات، الغرف، لوحة الإدارة) مع اختبار كل مرحلة.
