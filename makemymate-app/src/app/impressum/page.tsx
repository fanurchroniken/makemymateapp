'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import TopNav from '@/components/layout/TopNav'

export default function Impressum() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <TopNav />

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-cinzel gradient-text text-center mb-12">
            Impressum
          </h1>

          <div className="space-y-8 text-slate-300">
            {/* Angaben gemäß § 5 TMG */}
            <section>
              <h2 className="text-2xl font-cinzel text-white mb-4">
                Angaben gemäß § 5 TMG
              </h2>
              <div className="space-y-2">
                <p><strong>Jannis Illgner</strong></p>
                <p>Fanurchroniken by Jannis Illgner</p>
                <p>Flinger Str. 7</p>
                <p>40213 Düsseldorf</p>
              </div>
            </section>

            {/* Kontakt */}
            <section>
              <h2 className="text-2xl font-cinzel text-white mb-4">
                Kontakt
              </h2>
              <div className="space-y-2">
                <p>E-Mail: <a href="mailto:kontakt@fanurchroniken.de" className="text-amber-400 hover:text-amber-300 transition-colors">kontakt@fanurchroniken.de</a></p>
              </div>
            </section>

            {/* Umsatzsteuer-ID */}
            <section>
              <h2 className="text-2xl font-cinzel text-white mb-4">
                Umsatzsteuer-ID
              </h2>
              <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: <span className="text-slate-400">nicht vorhanden</span></p>
            </section>

            {/* Aufsichtsbehörde */}
            <section>
              <h2 className="text-2xl font-cinzel text-white mb-4">
                Aufsichtsbehörde
              </h2>
              <p><span className="text-slate-400">nicht vorhanden</span></p>
            </section>

            {/* Berufsbezeichnung */}
            <section>
              <h2 className="text-2xl font-cinzel text-white mb-4">
                Berufsbezeichnung und berufsrechtliche Regelungen
              </h2>
              <p>Berufsbezeichnung: <span className="text-slate-400">keine</span></p>
              <p>Zuständige Kammer: <span className="text-slate-400">nicht vorhanden</span></p>
              <p>Verliehen durch: <span className="text-slate-400">nicht vorhanden</span></p>
              <p>Folgende berufsrechtliche Regelungen finden Anwendung: <span className="text-slate-400">keine</span></p>
            </section>

            {/* Verantwortlich für den Inhalt */}
            <section>
              <h2 className="text-2xl font-cinzel text-white mb-4">
                Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
              </h2>
              <div className="space-y-2">
                <p><strong>Jannis Illgner</strong></p>
                <p>Flinger Str. 7</p>
                <p>40213 Düsseldorf</p>
              </div>
            </section>

            {/* EU-Streitschlichtung */}
            <section>
              <h2 className="text-2xl font-cinzel text-white mb-4">
                EU-Streitschlichtung
              </h2>
              <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 transition-colors">https://ec.europa.eu/consumers/odr/</a>.</p>
              <p>Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
            </section>

            {/* Verbraucherstreitbeilegung */}
            <section>
              <h2 className="text-2xl font-cinzel text-white mb-4">
                Verbraucherstreitbeilegung/Universalschlichtungsstelle
              </h2>
              <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
            </section>

            {/* Haftung für Inhalte */}
            <section>
              <h2 className="text-2xl font-cinzel text-white mb-4">
                Haftung für Inhalte
              </h2>
              <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
              <p>Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>
            </section>

            {/* Haftung für Links */}
            <section>
              <h2 className="text-2xl font-cinzel text-white mb-4">
                Haftung für Links
              </h2>
              <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.</p>
              <p>Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p>
            </section>

            {/* Urheberrecht */}
            <section>
              <h2 className="text-2xl font-cinzel text-white mb-4">
                Urheberrecht
              </h2>
              <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.</p>
              <p>Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</p>
            </section>
          </div>

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-slate-700/50">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <Link href="/" className="dark-glam-button px-6 py-3">
                Zurück zur Startseite
              </Link>
              <Link href="/datenschutz" className="text-amber-400 hover:text-amber-300 transition-colors">
                Datenschutzerklärung
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
