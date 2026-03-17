export type Locale = "ja" | "en";

export const translations = {
  ja: {
    // Categories
    category0: "ただの消費",
    category1: "生産につながる消費",
    category2: "生産",
    category3: "思考停止ルーティーン",

    // Measurement
    measuring: "計測中...",
    waiting: "待機中",

    // Today Summary
    appTitle: "時間カテゴリ管理アプリ",
    noData: "データがありません",
    total: "合計",
    todayMemo: "今日のひとこと",
    memoPlaceholder: "振り返りメモを入力...",

    // Statistics
    day: "日",
    week: "週",
    month: "月",
    periodAverage: "期間の平均",
    totalAverage: "合計平均:",

    // TabBar
    tabMeasurement: "計測",
    tabToday: "今日",
    tabStatistics: "統計",
    tabSettings: "設定",

    // TimeCategoryApp
    trialMode: "お試しモード",
    trialBanner: "データを永続保存するには",
    accountRegistration: "アカウント登録",
    trialBannerSuffix: "してください",

    // Settings
    version: "Version 1.0.0",
    appDescription: "1日の時間を4カテゴリで記録・可視化するPWAアプリ",
    privacyPolicy: "プライバシーポリシー",
    terms: "利用規約",
    contact: "お問い合わせ",

    // SyncSection
    cloudSync: "クラウド同期",
    loggedIn: "ログイン中",
    notLoggedIn: "（未ログイン）",
    trialSyncNote:
      "お試しモードではデータは端末内にのみ保存されます。アカウント登録するとクラウドに永続保存され、スマートフォンとパソコン間で同期できます。",
    syncHowTo:
      "データの引き継ぎ方：①パソコンでログイン→「今すぐ同期」 ②携帯で同じアカウントでログイン→「今すぐ同期」の順で実行してください。",
    syncPullNote:
      "過去のデータを引き継ぐには、下の「今すぐ同期」をタップしてください。パソコンのデータを取り込むには、先にパソコン側で「今すぐ同期」を実行しておいてください。",
    syncNow: "今すぐ同期",
    syncing: "同期中...",
    logout: "ログアウト",
    syncComplete: "同期完了（アップロード: {{pushed}}件 / ダウンロード: {{pulled}}件）",
    syncFailed: "同期に失敗しました",
    emailPlaceholder: "メールアドレス",
    passwordPlaceholder: "パスワード（6文字以上）",
    forgotPassword: "パスワードを忘れた方",
    createAccount: "アカウント作成",
    processing: "処理中...",
    login: "ログイン",
    firebaseNotConfigured: "Firebase設定が完了していません。.env.local を確認してください。",

    // Landing
    heroTitle: "あなたの時間、ちゃんと使えていますか？",
    heroSubtitle: "Tap4は、1日の時間の使い方を4つに分けて記録・可視化するアプリです。",
    tryIt: "お試しで使ってみる",
    signupWithSave: "アカウント登録（データ保存）",
    loginLink: "ログイン",
    featuresTitle: "3つの特徴",
    feature1Title: "ワンタップで記録",
    feature1Desc: "ボタンを押すだけで時間の計測スタート。面倒な入力は不要です。",
    feature2Title: "4つのカテゴリで整理",
    feature2Desc:
      "ただの消費・生産につながる消費・生産・思考停止ルーティーンの4カテゴリで、時間の質を分類します。",
    feature3Title: "統計・グラフで振り返る",
    feature3Desc:
      "日・週・月単位で時間の使い方をグラフで確認。自分のパターンに気づくことができます。",
    videoTitle: "🎬 Tap4が生まれたきっかけ",
    videoDesc:
      "Tap4は、こちらのYouTube動画からインスピレーションを受けて開発しました。時間の使い方や自己管理に興味がある方は、ぜひご覧ください。",
    howToTitle: "使い方",
    step1: "お試しで使ってみる",
    step2: "カテゴリを選んでタップするだけ",
    step3: "データ保存にはアカウント登録",
    ctaTry: "まずはお試しで使い心地を体験",
    ctaNote: "データを永続保存するにはアカウント登録が必要です",
    ctaSignup: "アカウント登録して保存する",
    redirecting: "リダイレクト中...",

    // Auth
    backToTop: "← トップに戻る",
    tryWithoutAccount: "お試しで使う",
    signupTitle: "アカウント作成",
    loginTitle: "ログイン",
    emailLabel: "メールアドレス",
    passwordLabel: "パスワード",
    passwordLabelLong: "パスワード（6文字以上）",
    emailPlaceholderExample: "example@email.com",
    alreadyHaveAccount: "すでにアカウントをお持ちの方は",
    noAccount: "アカウントをお持ちでない方は",
    signupLink: "新規登録",
    forgotPasswordLink: "パスワードを忘れた方",
    backToLogin: "← ログインに戻る",
    resetPasswordTitle: "パスワードをリセット",
    resetPasswordDesc: "登録したメールアドレスを入力してください。パスワードリセット用のメールを送信します。",
    sending: "送信中...",
    sendResetEmail: "リセットメールを送信",
  },
  en: {
    // Categories
    category0: "Mere Consumption",
    category1: "Consumption leading to Production",
    category2: "Production",
    category3: "Mind-numbing Routine",

    // Measurement
    measuring: "Measuring...",
    waiting: "Waiting",

    // Today Summary
    appTitle: "Time Category App",
    noData: "No data",
    total: "Total",
    todayMemo: "Today's note",
    memoPlaceholder: "Enter reflection memo...",

    // Statistics
    day: "Day",
    week: "Week",
    month: "Month",
    periodAverage: "Period average",
    totalAverage: "Total avg:",

    // TabBar
    tabMeasurement: "Measure",
    tabToday: "Today",
    tabStatistics: "Stats",
    tabSettings: "Settings",

    // TimeCategoryApp
    trialMode: "Trial mode",
    trialBanner: "To save data permanently,",
    accountRegistration: "register an account",
    trialBannerSuffix: "",

    // Settings
    version: "Version 1.0.0",
    appDescription: "PWA app to record and visualize your day in 4 categories",
    privacyPolicy: "Privacy Policy",
    terms: "Terms of Service",
    contact: "Contact",

    // SyncSection
    cloudSync: "Cloud Sync",
    loggedIn: "Logged in",
    notLoggedIn: "(Not logged in)",
    trialSyncNote:
      "In trial mode, data is stored only on this device. Register an account to save to the cloud and sync across devices.",
    syncHowTo:
      "To transfer data: ① Log in on PC → tap \"Sync now\" ② Log in on mobile with same account → tap \"Sync now\"",
    syncPullNote:
      "Tap \"Sync now\" below to pull your data. To get data from your PC, run \"Sync now\" on your PC first.",
    syncNow: "Sync now",
    syncing: "Syncing...",
    logout: "Log out",
    syncComplete: "Sync complete (Uploaded: {{pushed}} / Downloaded: {{pulled}})",
    syncFailed: "Sync failed",
    emailPlaceholder: "Email",
    passwordPlaceholder: "Password (6+ characters)",
    forgotPassword: "Forgot password?",
    createAccount: "Create account",
    processing: "Processing...",
    login: "Log in",
    firebaseNotConfigured: "Firebase is not configured. Check .env.local",

    // Landing
    heroTitle: "Are you using your time wisely?",
    heroSubtitle:
      "Tap4 helps you record and visualize how you spend your day across 4 categories.",
    tryIt: "Try it free",
    signupWithSave: "Sign up (save data)",
    loginLink: "Log in",
    featuresTitle: "3 Features",
    feature1Title: "One-tap recording",
    feature1Desc: "Just tap a button to start tracking. No tedious input required.",
    feature2Title: "4 categories",
    feature2Desc:
      "Organize your time by quality: Mere consumption, Consumption leading to production, Production, and Mind-numbing routine.",
    feature3Title: "Stats & charts",
    feature3Desc:
      "View your time usage by day, week, or month. Discover your patterns.",
    videoTitle: "🎬 What inspired Tap4",
    videoDesc:
      "Tap4 was inspired by this YouTube video. If you're interested in time management, check it out.",
    howToTitle: "How to use",
    step1: "Try it free",
    step2: "Tap a category to start",
    step3: "Sign up to save data",
    ctaTry: "Try the app first",
    ctaNote: "Account registration required to save data permanently",
    ctaSignup: "Sign up to save",
    redirecting: "Redirecting...",

    // Auth
    backToTop: "← Back to top",
    tryWithoutAccount: "Try without account",
    signupTitle: "Create account",
    loginTitle: "Log in",
    emailLabel: "Email",
    passwordLabel: "Password",
    passwordLabelLong: "Password (6+ characters)",
    emailPlaceholderExample: "example@email.com",
    alreadyHaveAccount: "Already have an account?",
    noAccount: "Don't have an account?",
    signupLink: "Sign up",
    forgotPasswordLink: "Forgot password?",
    backToLogin: "← Back to login",
    resetPasswordTitle: "Reset password",
    resetPasswordDesc: "Enter your registered email. We'll send you a password reset link.",
    sending: "Sending...",
    sendResetEmail: "Send reset email",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["ja"];
