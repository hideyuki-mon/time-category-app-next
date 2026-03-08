import Link from "next/link";

export const metadata = {
  title: "プライバシーポリシー | Tap4",
  description: "Tap4（タップフォー）のプライバシーポリシー",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#1a1a22] text-[#e8e8f0]">
      <header className="bg-[#24242e] border-b border-[#3a3a46] py-3 px-4 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link
            href="/"
            className="text-[#27AE60] hover:text-[#2ecc71] text-sm font-medium"
          >
            ← 戻る
          </Link>
          <h1 className="text-lg font-bold text-white">プライバシーポリシー</h1>
        </div>
      </header>
      <main className="p-4 pb-24 max-w-2xl mx-auto">
        <article className="prose prose-invert prose-sm max-w-none">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-white mb-1">Tap4（タップフォー）</h2>
            <p className="text-zinc-500 text-sm">制定日：2026年3月8日</p>
          </div>

          <p className="text-zinc-300 mb-6">
            Tap4（以下「本サービス」といいます）を提供する運営者（以下「当方」といいます）は、ユーザーの個人情報の取り扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます）を定めます。
          </p>

          <hr className="border-zinc-600 my-6" />

          <section className="mb-6">
            <h3 className="text-base font-bold text-white mb-3">第1条　収集する情報</h3>
            <p className="text-zinc-300 mb-2">当方は、本サービスの提供にあたり、以下の情報を収集する場合があります。</p>
            <ul className="list-disc list-inside text-zinc-300 space-y-1 ml-2">
              <li>メールアドレス（アカウント登録・ログインに使用）</li>
              <li>本サービス上での利用時間および活動カテゴリのデータ</li>
              <li>サービスへのアクセス日時、使用端末・ブラウザの種類等のログ情報</li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="text-base font-bold text-white mb-3">第2条　情報の利用目的</h3>
            <p className="text-zinc-300 mb-2">収集した情報は、以下の目的のために使用します。</p>
            <ul className="list-disc list-inside text-zinc-300 space-y-1 ml-2">
              <li>本サービスの提供・運営・維持・改善のため</li>
              <li>ユーザーのアカウント管理およびログイン認証のため</li>
              <li>サービスに関するお知らせ・重要なご連絡のため</li>
              <li>利用状況の分析によるサービス品質向上のため</li>
              <li>ご意見・お問い合わせへの対応のため</li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="text-base font-bold text-white mb-3">第3条　第三者への提供</h3>
            <p className="text-zinc-300 mb-2">当方は、以下のいずれかに該当する場合を除き、収集した個人情報を第三者に提供しません。</p>
            <ul className="list-disc list-inside text-zinc-300 space-y-1 ml-2">
              <li>ユーザーご本人の同意がある場合</li>
              <li>法令に基づく場合</li>
              <li>人の生命・身体・財産の保護のために必要があり、ご本人の同意を得ることが困難な場合</li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="text-base font-bold text-white mb-3">第4条　外部サービスの利用</h3>
            <p className="text-zinc-300 mb-2">
              本サービスでは、サービスの品質向上を目的として、以下の外部サービスを利用する場合があります。これらの外部サービスは、それぞれ独自のプライバシーポリシーに基づいて情報を収集・管理します。
            </p>
            <ul className="list-disc list-inside text-zinc-300 space-y-1 ml-2">
              <li>Google Analytics（アクセス解析）</li>
              <li>その他、今後導入する外部サービスについては、本ポリシーを更新してお知らせします</li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="text-base font-bold text-white mb-3">第5条　情報の管理・セキュリティ</h3>
            <p className="text-zinc-300">
              当方は、収集した個人情報の漏洩・紛失・改ざん等を防ぐため、適切なセキュリティ対策を実施します。ただし、インターネット上での完全な安全性を保証するものではありません。
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-base font-bold text-white mb-3">第6条　情報の開示・訂正・削除</h3>
            <p className="text-zinc-300">
              ユーザーは、当方が保有するご自身の個人情報について、開示・訂正・削除・利用停止を請求することができます。ご希望の場合は、下記のお問い合わせ窓口までご連絡ください。当方は、法令に基づき合理的な期間内に対応いたします。
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-base font-bold text-white mb-3">第7条　未成年者のご利用について</h3>
            <p className="text-zinc-300">未成年者が本サービスを利用する場合は、保護者の方の同意を得た上でご利用ください。</p>
          </section>

          <section className="mb-6">
            <h3 className="text-base font-bold text-white mb-3">第8条　本ポリシーの変更</h3>
            <p className="text-zinc-300">
              当方は、必要に応じて本ポリシーを変更することがあります。重要な変更がある場合は、本サービス上でお知らせします。変更後も本サービスをご利用いただいた場合、変更後のポリシーに同意いただいたものとみなします。
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-base font-bold text-white mb-3">第9条　お問い合わせ</h3>
            <p className="text-zinc-300 mb-3">個人情報の取り扱いに関するお問い合わせは、以下の窓口までご連絡ください。</p>
            <div className="bg-[#24242e] rounded-lg p-4 border border-[#3a3a46]">
              <p className="text-zinc-300 text-sm">サービス名：Tap4（タップフォー）</p>
              <p className="text-zinc-300 text-sm mt-1">
                メールアドレス：
                <a
                  href="mailto:tap4inquiry@gmail.com"
                  className="text-[#27AE60] hover:underline"
                >
                  tap4inquiry@gmail.com
                </a>
              </p>
            </div>
          </section>

          <p className="text-zinc-500 text-sm text-right">制定：2026年3月8日</p>
        </article>
      </main>
    </div>
  );
}
