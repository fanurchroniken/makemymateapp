'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import TopNav from '@/components/layout/TopNav'

export default function Datenschutz() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <TopNav />

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-cinzel gradient-text text-center mb-12">
            Datenschutzerklärung
          </h1>

          <div className="space-y-8 text-slate-300">
            {/* Einleitung */}
            <section>
              <h2 className="text-2xl font-cinzel text-white mb-4">
                1. Datenschutz auf einen Blick
              </h2>
              <div className="space-y-4">
                <h3 className="text-xl font-cinzel text-amber-400 mb-2">Allgemeine Hinweise</h3>
                <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.</p>
              </div>
            </section>

            {/* Datenerfassung */}
            <section>
              <h2 className="text-2xl font-cinzel text-white mb-4">
                2. Datenerfassung auf dieser Website
              </h2>
              <div className="space-y-4">
                <h3 className="text-xl font-cinzel text-amber-400 mb-2">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h3>
                <p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.</p>
                
                <h3 className="text-xl font-cinzel text-amber-400 mb-2">Wie erfassen wir Ihre Daten?</h3>
                <p>Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.</p>
                <p>Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.</p>
                
                <h3 className="text-xl font-cinzel text-amber-400 mb-2">Wofür nutzen wir Ihre Daten?</h3>
                <p>Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.</p>
                
                <h3 className="text-xl font-cinzel text-amber-400 mb-2">Welche Rechte haben Sie bezüglich Ihrer Daten?</h3>
                <p>Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.</p>
              </div>
            </section>

            {/* Verantwortlicher */}
            <section>
              <h2 className="text-2xl font-cinzel text-white mb-4">
                3. Hinweis zur verantwortlichen Stelle
              </h2>
              <div className="space-y-2">
                <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <p><strong>Jannis Illgner</strong></p>
                  <p>Fanurchroniken by Jannis Illgner</p>
                  <p>Flinger Str. 7</p>
                  <p>40213 Düsseldorf</p>
                  <p>E-Mail: <a href="mailto:kontakt@fanurchroniken.de" className="text-amber-400 hover:text-amber-300 transition-colors">kontakt@fanurchroniken.de</a></p>
                </div>
                <p>Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.</p>
              </div>
            </section>

            {/* Speicherdauer */}
            <section>
              <h2 className="text-2xl font-cinzel text-white mb-4">
                4. Speicherdauer
              </h2>
              <p>Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben (z. B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.</p>
            </section>

            {/* Allgemeine Hinweise */}
            <section>
              <h2 className="text-2xl font-cinzel text-white mb-4">
                5. Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf dieser Website
              </h2>
              <p>Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien nach Art. 9 Abs. 1 DSGVO verarbeitet werden. Im Falle einer ausdrücklichen Einwilligung in die Übertragung personenbezogener Daten in Drittstaaten erfolgt die Datenverarbeitung außerdem auf Grundlage von Art. 49 Abs. 1 lit. a DSGVO. Sofern Sie in die Speicherung von Cookies oder in den Zugriff auf Informationen in Ihr Endgerät (z. B. via Device-Fingerprinting) eingewilligt haben, erfolgt die Datenverarbeitung zusätzlich auf Grundlage von § 25 Abs. 1 TTDSG. Die Einwilligung ist jederzeit widerrufbar. Sind Ihre Daten zur Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, verarbeiten wir Ihre Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO. Des Weiteren verarbeiten wir Ihre Daten, sofern diese zur Erfüllung einer rechtlichen Verpflichtung erforderlich sind auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO. Die Datenverarbeitung kann ferner auf Grundlage unseres berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO erfolgen. Über die jeweils im Einzelfall einschlägigen Rechtsgrundlagen wird in den folgenden Absätzen dieser Datenschutzerklärung informiert.</p>
            </section>

            {/* Hosting */}
            <section>
              <h2 className="text-2xl font-cinzel text-white mb-4">
                6. Hosting
              </h2>
              <p>Wir hosten unsere Website bei Hostinger. Anbieter ist die Hostinger International Ltd., 61 Lordou Vironos Street, 6023 Larnaca, Zypern (nachfolgend: Hostinger). Wenn Sie unsere Website besuchen, erfasst Hostinger verschiedene Logfiles inklusive Ihrer IP-Adresse.</p>
              <p>Die Verwendung von Hostinger erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer möglichst zuverlässigen Darstellung unserer Website. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TTDSG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) umfasst. Die Einwilligung ist jederzeit widerrufbar.</p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-cinzel text-white mb-4">
                7. Cookies
              </h2>
              <p>Unsere Website verwendet Cookies. Das sind kleine Textdateien, die Ihr Webbrowser auf Ihrem Endgerät speichert. Cookies helfen uns dabei, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen.</p>
              <p>Einige Cookies sind „Session-Cookies". Solche Cookies werden nach Ende Ihres Browserbesuchs automatisch gelöscht. Hingegen bleiben andere Cookies auf Ihrem Endgerät bestehen, bis Sie diese selbst löschen. Solche Cookies helfen uns, Sie bei Ihrem Rückbesuch wiederzuerkennen.</p>
              <p>Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein.</p>
            </section>

            {/* Server-Log-Dateien */}
            <section>
              <h2 className="text-2xl font-cinzel text-white mb-4">
                8. Server-Log-Dateien
              </h2>
              <p>Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Browsertyp und Browserversion</li>
                <li>verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>
              <p>Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.</p>
              <p>Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website – hierzu müssen die Server-Log-Files erfasst werden.</p>
            </section>

            {/* Kontaktformular */}
            <section>
              <h2 className="text-2xl font-cinzel text-white mb-4">
                9. Kontaktformular
              </h2>
              <p>Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
              <p>Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist jederzeit widerrufbar.</p>
              <p>Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.</p>
            </section>

            {/* Ihre Rechte */}
            <section>
              <h2 className="text-2xl font-cinzel text-white mb-4">
                10. Ihre Rechte
              </h2>
              <p>Sie haben folgende Rechte:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Recht auf Auskunft:</strong> Sie haben das Recht, von uns eine Bestätigung darüber zu verlangen, ob personenbezogene Daten, die Sie betreffen, verarbeitet werden.</li>
                <li><strong>Recht auf Berichtigung:</strong> Sie haben das Recht, die Berichtigung unrichtiger oder die Vervollständigung unvollständiger personenbezogener Daten zu verlangen.</li>
                <li><strong>Recht auf Löschung:</strong> Sie haben das Recht, die Löschung Ihrer personenbezogenen Daten zu verlangen.</li>
                <li><strong>Recht auf Einschränkung:</strong> Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
                <li><strong>Recht auf Datenübertragbarkeit:</strong> Sie haben das Recht, Ihre personenbezogenen Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten.</li>
                <li><strong>Widerspruchsrecht:</strong> Sie haben das Recht, der Verarbeitung Ihrer personenbezogenen Daten zu widersprechen.</li>
                <li><strong>Widerrufsrecht:</strong> Sie haben das Recht, eine erteilte Einwilligung jederzeit zu widerrufen.</li>
                <li><strong>Beschwerderecht:</strong> Sie haben das Recht, sich bei einer Aufsichtsbehörde zu beschweren.</li>
              </ul>
              <p>Um diese Rechte auszuüben, können Sie sich an uns wenden unter: <a href="mailto:kontakt@fanurchroniken.de" className="text-amber-400 hover:text-amber-300 transition-colors">kontakt@fanurchroniken.de</a></p>
            </section>

            {/* Änderungen */}
            <section>
              <h2 className="text-2xl font-cinzel text-white mb-4">
                11. Änderungen dieser Datenschutzerklärung
              </h2>
              <p>Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen, z. B. bei der Einführung neuer Services. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.</p>
            </section>

            {/* Kontakt */}
            <section>
              <h2 className="text-2xl font-cinzel text-white mb-4">
                12. Fragen zum Datenschutz
              </h2>
              <p>Wenn Sie Fragen zum Datenschutz haben, können Sie sich jederzeit an uns wenden:</p>
              <div className="bg-slate-800/50 p-4 rounded-lg">
                <p><strong>Jannis Illgner</strong></p>
                <p>Fanurchroniken by Jannis Illgner</p>
                <p>Flinger Str. 7</p>
                <p>40213 Düsseldorf</p>
                <p>E-Mail: <a href="mailto:kontakt@fanurchroniken.de" className="text-amber-400 hover:text-amber-300 transition-colors">kontakt@fanurchroniken.de</a></p>
              </div>
            </section>
          </div>

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-slate-700/50">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <Link href="/" className="dark-glam-button px-6 py-3">
                Zurück zur Startseite
              </Link>
              <Link href="/impressum" className="text-amber-400 hover:text-amber-300 transition-colors">
                Impressum
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
