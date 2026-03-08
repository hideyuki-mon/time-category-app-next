import Link from "next/link";

export const metadata = {
  title: "利用規約 | Tap4",
  description: "Tap4（タップフォー）の利用規約",
};

export default function TermsPage() {
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
          <h1 className="text-lg font-bold text-white">利用規約</h1>
        </div>
      </header>
      <main className="p-4 pb-24 max-w-2xl mx-auto">
        <article className="prose prose-invert prose-sm max-w-none">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-white mb-1">Tap4（タップフォー）</h2>
            <p className="text-zinc-500 text-sm">制定日：2026年3月8日</p>
          </div>

          <p className="text-zinc-300 mb-6">
            この利用規約（以下「本規約」といいます）は、Tap4（タップフォー）（以下「本サービス」といいます）の運営者（以下「当方」といいます）が提供するサービスの利用条件を定めるものです。ユーザーの皆さまには、本規約に同意いただいた上で本サービスをご利用いただきます。
          </p>

          <hr className="border-zinc-600 my-6" />

          <section className="mb-6">
            <h3 className="text-base font-bold text-white mb-3">第1条　本サービスについて</h3>
            <p className="text-zinc-300">
              本サービスは、ユーザーが自身の時間の使い方を4つのカテゴリに分類・記録・可視化することを目的としたWebアプリケーションです。
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-base font-bold text-white mb-3">第2条　利用登録</h3>
            <p className="text-zinc-300 mb-2">本サービスの利用を希望する方は、当方の定める方法によりアカウント登録を行うものとします。登録の申請にあたり、以下の事項を遵守してください。</p>
            <ul className="list-disc list-inside text-zinc-300 space-y-1 ml-2">
              <li>正確かつ最新の情報を登録すること</li>
              <li>他人のメールアドレスや情報を使用しないこと</li>
              <li>1人につき1アカウントのみ登録すること</li>
            </ul>
            <p className="text-zinc-300 mt-2">当方は、利用登録の申請に対して承認しない場合があります。その際、理由の開示義務は負いません。</p>
          </section>

          <section className="mb-6">
            <h3 className="text-base font-bold text-white mb-3">第3条　アカウントの管理</h3>
            <p className="text-zinc-300">
              ユーザーは、自己の責任においてアカウント（メールアドレスおよびパスワード）を管理・保管するものとします。アカウント情報の紛失・漏洩等により生じた損害について、当方は一切の責任を負いません。
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-base font-bold text-white mb-3">第4条　禁止事項</h3>
            <p className="text-zinc-300 mb-2">ユーザーは、本サービスの利用にあたり、以下の行為を行ってはなりません。</p>
            <ul className="list-disc list-inside text-zinc-300 space-y-1 ml-2">
              <li>法令または公序良俗に違反する行為</li>
              <li>当方または第三者の著作権、商標権その他の知的財産権を侵害する行為</li>
              <li>当方または第三者のサーバー・ネットワークに過度な負荷をかける行為</li>
              <li>本サービスの運営を妨害するおそれのある行為</li>
              <li>不正アクセス、リバースエンジニアリング等の行為</li>
              <li>他のユーザーに成りすます行為</li>
              <li>本サービスを商業目的で無断利用する行為</li>
              <li>その他、当方が不適切と判断する行為</li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="text-base font-bold text-white mb-3">第5条　本サービスの提供の停止・変更</h3>
            <p className="text-zinc-300 mb-2">当方は、以下の場合に、事前の通知なく本サービスの全部または一部の提供を停止・変更することがあります。</p>
            <ul className="list-disc list-inside text-zinc-300 space-y-1 ml-2">
              <li>システムの保守・点検・障害対応を行う場合</li>
              <li>天災・感染症・その他不可抗力により運営が困難な場合</li>
              <li>その他、当方が必要と判断した場合</li>
            </ul>
            <p className="text-zinc-300 mt-2">これらによってユーザーに生じた損害について、当方は責任を負いません。</p>
          </section>

          <section className="mb-6">
            <h3 className="text-base font-bold text-white mb-3">第6条　免責事項</h3>
            <p className="text-zinc-300 mb-2">当方は、本サービスに関して以下の事項について責任を負いません。</p>
            <ul className="list-disc list-inside text-zinc-300 space-y-1 ml-2">
              <li>本サービスの内容の正確性・完全性・有用性</li>
              <li>本サービスの利用または利用不能により生じた損害（データの消失を含む）</li>
              <li>ユーザーと第三者との間で生じたトラブル</li>
              <li>本サービスの中断・停止・終了・変更によって生じた損害</li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="text-base font-bold text-white mb-3">第7条　知的財産権</h3>
            <p className="text-zinc-300">
              本サービスに関する著作権・商標権その他一切の知的財産権は、当方または正当な権利者に帰属します。ユーザーは、当方の事前の書面による許可なく、本サービスのコンテンツを複製・転載・改変等してはなりません。
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-base font-bold text-white mb-3">第8条　退会・アカウント削除</h3>
            <p className="text-zinc-300 mb-2">ユーザーはいつでも退会することができます。退会後は、当該ユーザーのデータは削除されます。なお、当方は以下の場合にユーザーのアカウントを削除することがあります。</p>
            <ul className="list-disc list-inside text-zinc-300 space-y-1 ml-2">
              <li>本規約に違反した場合</li>
              <li>長期間（1年以上）利用がない場合</li>
              <li>その他、当方が不適切と判断した場合</li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="text-base font-bold text-white mb-3">第9条　本規約の変更</h3>
            <p className="text-zinc-300">
              当方は、必要に応じて本規約を変更することがあります。重要な変更がある場合は、本サービス上でお知らせします。変更後も本サービスをご利用いただいた場合、変更後の規約に同意いただいたものとみなします。
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-base font-bold text-white mb-3">第10条　準拠法・管轄裁判所</h3>
            <p className="text-zinc-300">
              本規約の解釈および適用は、日本法に準拠するものとします。本サービスに関して紛争が生じた場合には、当方の所在地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-base font-bold text-white mb-3">第11条　お問い合わせ</h3>
            <p className="text-zinc-300 mb-3">本規約に関するお問い合わせは、以下の窓口までご連絡ください。</p>
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
