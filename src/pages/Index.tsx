import { useState } from "react";
import { Building2, User, FileText, Shield, Lock, Globe } from "lucide-react";
import tracfinnLogo from "@/assets/tracfinn-logo.jpeg";

type Language = "fr" | "en" | "da" | "de" | "lt";

const translations = {
  fr: {
    organization: "TRACFINN",
    subtitle: "Traitement du Renseignement et Action Contre les Circuits Financiers Clandestins",
    languageLabel: "Langue",
    title: "Notification de suspension temporaire d'un ordre de virement",
    reference: "Référence",
    date: "Date",
    clientInfo: "Informations du client",
    transferBank: "Banque chargée du transfert",
    emitterAccount: "Compte émetteur",
    feesToPay: "Frais à payer indiqués",
    suspensionReason: "Motif de la suspension et frais AML",
    reasonText: "Cette mesure est prise dans le cadre des obligations de vigilance et de contrôle.",
    detailText: "Pour des raisons liées à la confidentialité des procédures, nous ne sommes pas en mesure de fournir davantage de détails à ce stade. Conformément aux régulations européennes en matière de lutte contre le blanchiment de capitaux et le financement du terrorisme (Directive (UE) 2015/849 – AMLD), une taxe sur valeur ajoutée et de traitement de 765 € peut être appliquée pour couvrir les opérations de contrôle et de suivi des transactions financières.",
    verificationItems: [
      "Vérification de l'identité du bénéficiaire et de l'émetteur du virement",
      "Examen des documents justificatifs relatifs à l'origine des fonds",
      "Traitement administratif des alertes et anomalies détectées",
      "Mise en conformité avec les obligations nationales et européennes de vigilance financière"
    ],
    notice: "Sans régularisation ou fourniture des justificatifs demandés, le traitement complet de la transaction ne peut être finalisé.",
    sections: "Sections",
    emitter: "Émetteur",
    beneficiary: "Bénéficiaire",
    reason: "Motif",
    reasonShort: "Suspicion nécessitant vérifications AML — frais indiqués : 765 €",
    legalTitle: "Mentions légales",
    legalText: "Plateforme sécurisée de traitement des opérations financières. Toutes les données sont protégées conformément aux normes européennes.",
    contactTitle: "Pour toute information complémentaire :",
    contactLink: "Contact — Service TRACFINN",
    securedBy: "Sécurisé par HTTPS",
    encrypted: "Données chiffrées"
  },
  en: {
    organization: "TRACFINN",
    subtitle: "Intelligence Processing and Action Against Clandestine Financial Circuits",
    languageLabel: "Language",
    title: "Temporary Suspension Notification of a Transfer Order",
    reference: "Reference",
    date: "Date",
    clientInfo: "Client Information",
    transferBank: "Transfer Bank",
    emitterAccount: "Sender Account",
    feesToPay: "Fees to be paid indicated",
    suspensionReason: "Reason for suspension and AML fees",
    reasonText: "This measure is taken as part of due diligence and control obligations.",
    detailText: "For reasons related to the confidentiality of procedures, we are unable to provide further details at this stage. In accordance with European regulations on anti-money laundering and terrorist financing (Directive (EU) 2015/849 – AMLD), a value-added tax and processing fee of €765 may be applied to cover financial transaction control and monitoring operations.",
    verificationItems: [
      "Verification of the beneficiary's and sender's identity",
      "Review of supporting documents regarding the origin of funds",
      "Administrative processing of detected alerts and anomalies",
      "Compliance with national and European financial vigilance obligations"
    ],
    notice: "Without regularization or provision of requested documentation, the complete processing of the transaction cannot be finalized.",
    sections: "Sections",
    emitter: "Sender",
    beneficiary: "Beneficiary",
    reason: "Reason",
    reasonShort: "Suspicion requiring AML verifications — fees indicated: €765",
    legalTitle: "Legal Notice",
    legalText: "Secure platform for financial operations processing. All data is protected in accordance with European standards.",
    contactTitle: "For further information:",
    contactLink: "Contact — TRACFINN Service",
    securedBy: "Secured by HTTPS",
    encrypted: "Encrypted Data"
  },
  da: {
    organization: "TRACFINN",
    subtitle: "Efterretningsbehandling og Aktion Mod Hemmelige Finansielle Kredsløb",
    languageLabel: "Sprog",
    title: "Midlertidig Suspendering af en Overførselsordre",
    reference: "Reference",
    date: "Dato",
    clientInfo: "Klientinformation",
    transferBank: "Overførselsbank",
    emitterAccount: "Afsenderkonto",
    feesToPay: "Angivne gebyrer",
    suspensionReason: "Årsag til suspension og AML-gebyrer",
    reasonText: "Denne foranstaltning træffes som led i due diligence- og kontrolforpligtelser.",
    detailText: "Af hensyn til fortroligheden af procedurerne er vi ikke i stand til at give yderligere detaljer på nuværende tidspunkt. I overensstemmelse med europæiske regler om hvidvaskning af penge og terrorfinansiering (Direktiv (EU) 2015/849 – AMLD) kan en moms og behandlingsgebyr på €765 anvendes til at dække kontrol- og overvågningsoperationer af finansielle transaktioner.",
    verificationItems: [
      "Verifikation af modtagerens og afsenderens identitet",
      "Gennemgang af støttedokumenter vedrørende midlernes oprindelse",
      "Administrativ behandling af opdagede advarsler og anomalier",
      "Overholdelse af nationale og europæiske finansielle vigilansforpligtelser"
    ],
    notice: "Uden regularisering eller levering af anmodet dokumentation kan den komplette behandling af transaktionen ikke færdiggøres.",
    sections: "Sektioner",
    emitter: "Afsender",
    beneficiary: "Modtager",
    reason: "Årsag",
    reasonShort: "Mistanke kræver AML-verifikationer — gebyrer angivet: €765",
    legalTitle: "Juridisk Meddelelse",
    legalText: "Sikker platform til behandling af finansielle operationer. Alle data er beskyttet i overensstemmelse med europæiske standarder.",
    contactTitle: "For yderligere information:",
    contactLink: "Kontakt — TRACFINN Service",
    securedBy: "Sikret med HTTPS",
    encrypted: "Krypterede Data"
  },
  de: {
    organization: "TRACFINN",
    subtitle: "Nachrichtenverarbeitung und Maßnahmen Gegen Klandestine Finanzkreisläufe",
    languageLabel: "Sprache",
    title: "Mitteilung über die vorübergehende Aussetzung eines Überweisungsauftrags",
    reference: "Referenz",
    date: "Datum",
    clientInfo: "Kundeninformationen",
    transferBank: "Überweisungsbank",
    emitterAccount: "Absenderkonto",
    feesToPay: "Angegebene Gebühren",
    suspensionReason: "Grund für die Aussetzung und AML-Gebühren",
    reasonText: "Diese Maßnahme wird im Rahmen der Sorgfaltspflichten und Kontrollverpflichtungen ergriffen.",
    detailText: "Aus Gründen der Vertraulichkeit der Verfahren können wir zu diesem Zeitpunkt keine weiteren Einzelheiten mitteilen. In Übereinstimmung mit den europäischen Vorschriften zur Bekämpfung von Geldwäsche und Terrorismusfinanzierung (Richtlinie (EU) 2015/849 – AMLD) kann eine Mehrwertsteuer und Bearbeitungsgebühr von 765 € erhoben werden, um Kontroll- und Überwachungsvorgänge von Finanztransaktionen abzudecken.",
    verificationItems: [
      "Überprüfung der Identität des Begünstigten und des Absenders",
      "Prüfung der Belege bezüglich der Herkunft der Mittel",
      "Administrative Bearbeitung erkannter Warnungen und Anomalien",
      "Einhaltung nationaler und europäischer Finanzüberwachungspflichten"
    ],
    notice: "Ohne Regularisierung oder Vorlage der angeforderten Unterlagen kann die vollständige Bearbeitung der Transaktion nicht abgeschlossen werden.",
    sections: "Abschnitte",
    emitter: "Absender",
    beneficiary: "Begünstigter",
    reason: "Grund",
    reasonShort: "Verdacht erfordert AML-Überprüfungen — Gebühren angegeben: 765 €",
    legalTitle: "Rechtlicher Hinweis",
    legalText: "Sichere Plattform für die Abwicklung von Finanzoperationen. Alle Daten sind gemäß europäischen Standards geschützt.",
    contactTitle: "Für weitere Informationen:",
    contactLink: "Kontakt — TRACFINN Service",
    securedBy: "Gesichert durch HTTPS",
    encrypted: "Verschlüsselte Daten"
  },
  lt: {
    organization: "TRACFINN",
    subtitle: "Žvalgybos Apdorojimas ir Veiksmai Prieš Slaptas Finansines Grandines",
    languageLabel: "Kalba",
    title: "Laikino Pervedimo Orderio Sustabdymo Pranešimas",
    reference: "Nuoroda",
    date: "Data",
    clientInfo: "Kliento Informacija",
    transferBank: "Pervedimo Bankas",
    emitterAccount: "Siuntėjo Sąskaita",
    feesToPay: "Nurodyti mokėtini mokesčiai",
    suspensionReason: "Sustabdymo priežastis ir AML mokesčiai",
    reasonText: "Ši priemonė taikoma kaip dalis uolios patikros ir kontrolės įsipareigojimų.",
    detailText: "Dėl procedūrų konfidencialumo priežasčių šiame etape negalime pateikti išsamesnės informacijos. Pagal Europos pinigų plovimo ir terorizmo finansavimo prevencijos reglamentus (Direktyva (ES) 2015/849 – AMLD), 765 € pridėtinės vertės mokestis ir apdorojimo mokestis gali būti taikomi finansinių sandorių kontrolės ir stebėjimo operacijoms padengti.",
    verificationItems: [
      "Gavėjo ir siuntėjo tapatybės patvirtinimas",
      "Lėšų kilmės patvirtinančių dokumentų peržiūra",
      "Aptiktų įspėjimų ir anomalijų administracinis apdorojimas",
      "Nacionalinių ir Europos finansinio budumo įsipareigojimų laikymasis"
    ],
    notice: "Be reguliarizavimo ar prašomų dokumentų pateikimo, visiško sandorio apdorojimo užbaigti negalima.",
    sections: "Skyriai",
    emitter: "Siuntėjas",
    beneficiary: "Gavėjas",
    reason: "Priežastis",
    reasonShort: "Įtarimas reikalaujantis AML patikrinimų — nurodyti mokesčiai: 765 €",
    legalTitle: "Teisinis Pranešimas",
    legalText: "Saugi finansinių operacijų apdorojimo platforma. Visi duomenys saugomi pagal Europos standartus.",
    contactTitle: "Dėl išsamesnės informacijos:",
    contactLink: "Kontaktai — TRACFINN Tarnyba",
    securedBy: "Apsaugota HTTPS",
    encrypted: "Užšifruoti Duomenys"
  }
};

const Index = () => {
  const [lang, setLang] = useState<Language>("fr");
  const t = translations[lang];

  const languages: { code: Language; label: string }[] = [
    { code: "fr", label: "Français" },
    { code: "en", label: "English" },
    { code: "da", label: "Dansk" },
    { code: "de", label: "Deutsch" },
    { code: "lt", label: "Lietuvių" }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-[#f7f9fb] to-[#f1f5f9]">
      <div className="w-full max-w-[900px]">
        <div className="bg-white rounded-lg shadow-[0_8px_24px_rgba(11,43,74,0.08)] overflow-hidden border border-[rgba(11,43,74,0.06)]">
          {/* Header */}
          <header className="bg-gradient-to-r from-[#0b2b4a] to-[#143852] text-white p-5">
            <div className="flex gap-4 items-center flex-wrap justify-between">
              <div className="flex items-center gap-4">
                <img 
                  src={tracfinnLogo} 
                  alt="TRACFINN Logo" 
                  className="w-[72px] h-[72px] rounded-lg object-cover"
                />
                <div className="leading-tight">
                  <div className="text-lg font-bold tracking-wider">{t.organization}</div>
                  <div className="text-xs opacity-95 mt-2 max-w-[400px]">{t.subtitle}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <select 
                  value={lang} 
                  onChange={(e) => setLang(e.target.value as Language)}
                  className="bg-white/10 text-white px-3 py-1.5 rounded-md text-sm font-semibold border border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
                  aria-label={t.languageLabel}
                >
                  {languages.map(l => (
                    <option key={l.code} value={l.code} className="bg-[#0b2b4a] text-white">
                      {l.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-4 text-xs opacity-90 flex-wrap">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                <span>{t.securedBy}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4" />
                <span>{t.encrypted}</span>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6">
            <h1 className="text-[#0b2b4a] text-xl font-semibold mb-3.5">
              {t.title}
            </h1>

            <div className="flex gap-3 flex-wrap mb-4">
              <div className="bg-[#e6eef8] text-[#0b2b4a] px-3 py-2 rounded-full font-semibold text-[13px]">
                {t.reference} : SIM-2025-0001
              </div>
              <div className="bg-[#e6eef8] text-[#0b2b4a] px-3 py-2 rounded-full font-semibold text-[13px]">
                {t.date} : <strong>29/10/2025</strong>
              </div>
            </div>

            <section className="border-t border-[#eef2f6] pt-4.5">
              <div className="grid md:grid-cols-2 gap-4.5">
                <div className="bg-[#fbfdff] p-3.5 rounded-lg border border-[#eef3f8]">
                  <h3 className="text-[13px] text-[#6b7280] mb-2">{t.clientInfo}</h3>
                  <p className="font-semibold text-[#0f1724] text-[15px]">LONE JANET MORTENSEN</p>
                  <p className="font-semibold mt-2">REVOLUT BANK UAB</p>
                  <p className="font-bold mt-1.5">IBAN : LT87 3250 0551 0360 8347</p>
                  <p className="font-bold mt-1.5">Ref : REVOLT21XXX</p>
                  <p className="font-bold mt-2.5 text-[#0b2b4a]">Montant du crédit : 13 406 €</p>
                </div>

                <div className="bg-[#fbfdff] p-3.5 rounded-lg border border-[#eef3f8]">
                  <h3 className="text-[13px] text-[#6b7280] mb-2">{t.transferBank}</h3>
                  <p className="font-semibold text-[#0f1724] text-[15px]">ISMO PAY</p>
                  <p className="font-bold mt-2">{t.emitterAccount} : EUR 0163703574</p>
                  <p className="text-[#dc2626] font-bold text-[15px] mt-2.5">
                    {t.feesToPay} : 765 € (taxe sur valeur ajoutée et traitement)
                  </p>
                </div>

                <div className="md:col-span-2 bg-[#fbfdff] p-3.5 rounded-lg border border-[#eef3f8]">
                  <h3 className="text-[13px] text-[#6b7280] mb-2">{t.suspensionReason}</h3>
                  <p className="font-semibold text-[#0f1724]">
                    {t.reasonText}
                  </p>
                  <div className="mt-2.5 text-[#6b7280] leading-relaxed">
                    {t.detailText}
                  </div>
                  <ul className="mt-2.5 text-[#6b7280] leading-relaxed list-disc pl-5">
                    {t.verificationItems.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <div className="bg-[#fff8e6] border-l-4 border-[#f6c85f] p-3 rounded-md mt-3.5 text-sm text-[#5b4a00]">
                    {t.notice}
                  </div>
                </div>
              </div>
            </section>

            <section className="border-t border-[#eef2f6] pt-4.5 mt-4.5">
              <h2 className="text-base text-[#6b7280] mb-3">{t.sections}</h2>
              <div className="flex gap-3 flex-wrap">
                <div className="flex gap-2.5 items-start bg-white rounded-lg p-3 border border-[#eef3f8] flex-1 min-w-[200px]">
                  <Building2 className="w-7 h-7 flex-shrink-0 opacity-90 text-[#0b2b4a]" />
                  <div>
                    <h4 className="text-[13px] text-[#6b7280] mb-0">{t.emitter}</h4>
                    <p className="font-bold text-sm mt-1.5">ISMO PAY — {t.emitterAccount} EUR 0163703574</p>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start bg-white rounded-lg p-3 border border-[#eef3f8] flex-1 min-w-[200px]">
                  <User className="w-7 h-7 flex-shrink-0 opacity-90 text-[#0b2b4a]" />
                  <div>
                    <h4 className="text-[13px] text-[#6b7280] mb-0">{t.beneficiary}</h4>
                    <p className="font-bold text-sm mt-1.5">LONE JANET MORTENSEN — REVOLUT BANK UAB</p>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start bg-white rounded-lg p-3 border border-[#eef3f8] flex-1 min-w-[200px]">
                  <FileText className="w-7 h-7 flex-shrink-0 opacity-90 text-[#0b2b4a]" />
                  <div>
                    <h4 className="text-[13px] text-[#6b7280] mb-0">{t.reason}</h4>
                    <p className="font-bold text-sm mt-1.5 text-[#dc2626]">{t.reasonShort}</p>
                  </div>
                </div>
              </div>
            </section>
          </main>

          {/* Footer */}
          <footer className="p-3.5 bg-[#fbfdff] border-t border-[#eef2f6] flex justify-between gap-3 items-center text-[13px] text-[#6b7280] flex-wrap">
            <div className="max-w-[70%]">
              <div className="font-bold mb-1.5">{t.legalTitle}</div>
              <div>{t.legalText}</div>
            </div>
            <div className="text-right">
              <div className="text-[13px] text-[#6b7280]">{t.contactTitle}</div>
              <div className="font-bold text-[#0b2b4a] underline cursor-pointer hover:text-[#143852] transition-colors">
                {t.contactLink}
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Index;
