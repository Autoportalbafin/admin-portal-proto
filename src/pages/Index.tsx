import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  CheckCircle2, 
  Building2, 
  User, 
  Calendar, 
  Euro, 
  Info,
  Shield,
  FileText,
  Globe,
  AlertCircle,
  IdCard
} from "lucide-react";
import idCardImage from "@/assets/id-card-beneficiary.jpeg";

type Language = "fr" | "sk";

const translations = {
  fr: {
    title: "Portail Administratif de Gestion",
    subtitle: "Plateforme sécurisée de suivi des transactions",
    languageToggle: "SK",
    transactionDetails: "Détails de la Transaction",
    date: "Date d'initialisation",
    amount: "Montant",
    emitter: "Émetteur",
    beneficiary: "Bénéficiaire (Destination)",
    fees: "Frais de Traitement",
    feesBreakdown: "Ventilation des Frais",
    unpaid: "NON PAYÉ",
    feesExplanation: "Ces frais correspondent aux coûts de vérification et de traitement de la transaction. Ils comprennent la TVA au taux légal de 20%.",
    baseAmount: "Montant HT",
    vat: "TVA (20%)",
    totalFees: "Total TTC",
    bank: "Banque",
    holder: "Titulaire",
    account: "Compte Émetteur",
    address: "Adresse",
    iban: "IBAN",
    bic: "BIC/SWIFT",
    status: "Statut",
    approved: "APPROUVÉ",
    verificationSteps: "Étapes de Vérification",
    step1Title: "Vérification d'identité",
    step1Desc: "Document d'identité du client vérifié et approuvé",
    step2Title: "Validation des comptes",
    step2Desc: "Comptes émetteur et bénéficiaire vérifiés",
    step3Title: "Contrôle de conformité",
    step3Desc: "Transaction conforme aux régulations en vigueur",
    idDocument: "Document d'Identité du Bénéficiaire",
    idVerified: "Vérifiée et Approuvée",
    privacyPolicy: "Politique de Confidentialité",
    privacyContent: "Conformément au RGPD, vos données personnelles sont traitées de manière sécurisée et confidentielle. Les informations collectées sont utilisées uniquement pour le traitement de votre transaction et ne sont pas partagées avec des tiers sans votre consentement. Vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, veuillez contacter notre service de protection des données.",
    accessibilityStatement: "Déclaration d'Accessibilité",
    accessibilityContent: "Ce portail est conforme aux normes WCAG 2.1 niveau AA. Nous nous engageons à offrir une expérience accessible à tous les utilisateurs, indépendamment de leurs capacités. Si vous rencontrez des difficultés d'accessibilité, veuillez nous contacter pour assistance.",
    contactVerification: "Contact & Vérification",
    contactInfo: "Pour toute procédure réelle ou question concernant cette transaction, veuillez contacter l'autorité compétente via les canaux officiels indiqués sur son site web. N'effectuez jamais de transaction financière sans vérification préalable.",
    securityNotice: "Avis de Sécurité",
    securityContent: "Cette plateforme utilise le protocole HTTPS et des mesures de sécurité conformes aux standards bancaires. Toutes les données sont chiffrées en transit et au repos. Une politique CSP (Content Security Policy) est appliquée pour renforcer la sécurité.",
    footer: "Administration - Tous droits réservés",
    disclaimer: "Ce portail est un prototype de démonstration. Pour toute procédure réelle, veuillez contacter les autorités compétentes.",
  },
  sk: {
    title: "Administratívny Portál Správy",
    subtitle: "Zabezpečená platforma sledovania transakcií",
    languageToggle: "FR",
    transactionDetails: "Podrobnosti Transakcie",
    date: "Dátum inicializácie",
    amount: "Suma",
    emitter: "Odosielateľ",
    beneficiary: "Príjemca (Cieľ)",
    fees: "Poplatky za Spracovanie",
    feesBreakdown: "Rozdelenie Poplatkov",
    unpaid: "NEPLATENÉ",
    feesExplanation: "Tieto poplatky zodpovedajú nákladom na overenie a zpracovanie transakcie. Zahŕňajú DPH v zákonnej sadzbe 20%.",
    baseAmount: "Suma bez DPH",
    vat: "DPH (20%)",
    totalFees: "Celkom s DPH",
    bank: "Banka",
    holder: "Držiteľ",
    account: "Účet Odosielateľa",
    address: "Adresa",
    iban: "IBAN",
    bic: "BIC/SWIFT",
    status: "Stav",
    approved: "SCHVÁLENÉ",
    verificationSteps: "Kroky Overenia",
    step1Title: "Overenie totožnosti",
    step1Desc: "Doklad totožnosti klienta overený a schválený",
    step2Title: "Validácia účtov",
    step2Desc: "Účty odosielateľa a príjemcu overené",
    step3Title: "Kontrola súladu",
    step3Desc: "Transakcia v súlade s platnými predpismi",
    idDocument: "Doklad Totožnosti Príjemcu",
    idVerified: "Overená a Schválená",
    privacyPolicy: "Zásady Ochrany Osobných Údajov",
    privacyContent: "V súlade s GDPR sú vaše osobné údaje spracovávané bezpečným a dôverným způsobom. Zhromaždené informácie sa používajú výlučne na spracovanie vašej transakcie a nie sú zdieľané s tretími stranami bez vášho súhlasu. Máte právo na prístup, opravu a vymazanie svojich údajov. Pre uplatnenie týchto práv kontaktujte našu službu ochrany údajov.",
    accessibilityStatement: "Vyhlásenie o Prístupnosti",
    accessibilityContent: "Tento portál je v súlade s normami WCAG 2.1 úrovne AA. Zaväzujeme sa poskytovať prístupné prostredie všetkým používateľom bez ohľadu na ich schopnosti. Ak narazíte na problémy s prístupnosťou, kontaktujte nás pre pomoc.",
    contactVerification: "Kontakt & Overenie",
    contactInfo: "Pre akýkoľvek skutočný postup alebo otázky týkajúce sa tejto transakcie kontaktujte príslušný orgán prostredníctvom oficiálnych kanálov uvedených na jeho webovej stránke. Nikdy nevykonávajte finančnú transakciu bez predchádzajúceho overenia.",
    securityNotice: "Bezpečnostné Oznámenie",
    securityContent: "Táto platforma používa protokol HTTPS a bezpečnostné opatrenia v súlade s bankovými štandardmi. Všetky údaje sú šifrované počas prenosu a v pokoji. Politika CSP (Content Security Policy) je aplikovaná na posilnenie bezpečnosti.",
    footer: "Administratíva - Všetky práva vyhradené",
    disclaimer: "Tento portál je prototyp pre demonštračné účely. Pre akýkoľvek skutočný postup kontaktujte príslušné orgány.",
  }
};

const Index = () => {
  const [lang, setLang] = useState<Language>("fr");
  const t = translations[lang];

  const toggleLanguage = () => {
    setLang(lang === "fr" ? "sk" : "fr");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-[#f7f9fb] to-[#f1f5f9]">
      <div className="w-full max-w-[900px]">
        <div className="bg-white rounded-lg shadow-[0_8px_24px_rgba(11,43,74,0.08)] overflow-hidden border border-[rgba(11,43,74,0.06)]">
          {/* Header */}
          <header className="bg-gradient-to-r from-[#0b2b4a] to-[#143852] text-white p-5 flex gap-4 items-center flex-wrap">
            <div className="flex-1 flex items-center gap-4">
              <div className="w-[72px] h-[72px] bg-gradient-to-b from-[#0f3b63] to-[#09263e] rounded-lg flex items-center justify-center font-bold text-[10px]">
                LOGO
              </div>
              <div className="leading-tight">
                <div className="text-xs opacity-95 tracking-wider">Service de Contrôle — (Simulation)</div>
                <div className="text-sm font-bold mt-1.5">Ministère de l'Économie et des Finances — (Simulation)</div>
                <div className="text-xs opacity-90 mt-1.5">
                  <strong>DOCUMENT SIMULÉ — NON OFFICIEL</strong>
                </div>
              </div>
            </div>
            <div className="bg-[#ffdede] text-[#7a1b1b] px-2.5 py-1.5 rounded-md font-bold text-[13px]">
              SIMULATION — DOCUMENT NON OFFICIEL
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6">
            <h1 className="text-[#0b2b4a] text-xl font-semibold mb-3.5">
              Notification de suspension temporaire d'un ordre de virement
            </h1>

            <div className="flex gap-3 flex-wrap mb-4">
              <div className="bg-[#e6eef8] text-[#0b2b4a] px-3 py-2 rounded-full font-semibold text-[13px]">
                Référence : SIM-2025-0001
              </div>
              <div className="bg-[#e6eef8] text-[#0b2b4a] px-3 py-2 rounded-full font-semibold text-[13px]">
                Date : <strong>29/10/2025</strong>
              </div>
            </div>

            <section className="border-t border-[#eef2f6] pt-4.5">
              <div className="grid md:grid-cols-2 gap-4.5">
                <div className="bg-[#fbfdff] p-3.5 rounded-lg border border-[#eef3f8]">
                  <h3 className="text-[13px] text-[#6b7280] mb-2">Informations du client</h3>
                  <p className="font-semibold text-[#0f1724] text-[15px]">LONE JANET MORTENSEN</p>
                  <p className="font-semibold mt-2">REVOLUT BANK UAB</p>
                  <p className="font-bold mt-1.5">IBAN : LT87 3250 0551 0360 8347</p>
                  <p className="font-bold mt-1.5">Ref : REVOLT21XXX</p>
                  <p className="font-bold mt-2.5 text-[#0b2b4a]">Montant du crédit : 13 406 €</p>
                </div>

                <div className="bg-[#fbfdff] p-3.5 rounded-lg border border-[#eef3f8]">
                  <h3 className="text-[13px] text-[#6b7280] mb-2">Banque chargée du transfert</h3>
                  <p className="font-semibold text-[#0f1724] text-[15px]">ISMO PAY</p>
                  <p className="font-bold mt-2">Compte émetteur : EUR 0163703574</p>
                  <p className="text-[#6b7280] text-[13px] mt-2.5">
                    Frais à payer indiqués : 765 € (taxe sur valeur ajoutée et traitement)
                  </p>
                </div>

                <div className="md:col-span-2 bg-[#fbfdff] p-3.5 rounded-lg border border-[#eef3f8]">
                  <h3 className="text-[13px] text-[#6b7280] mb-2">Motif de la suspension et frais AML</h3>
                  <p className="font-semibold text-[#0f1724]">
                    Cette mesure est prise dans le cadre des obligations de vigilance et de contrôle.
                  </p>
                  <div className="mt-2.5 text-[#6b7280] leading-relaxed">
                    Pour des raisons liées à la confidentialité des procédures, nous ne sommes pas en mesure de fournir davantage de détails à ce stade. Conformément aux régulations européennes en matière de lutte contre le blanchiment de capitaux et le financement du terrorisme (Directive (UE) 2015/849 – AMLD), une taxe sur valeur ajoutée et de traitement de 765 € peut être appliquée pour couvrir les opérations de contrôle et de suivi des transactions financières.
                  </div>
                  <ul className="mt-2.5 text-[#6b7280] leading-relaxed list-disc pl-5">
                    <li>Vérification de l'identité du bénéficiaire et de l'émetteur du virement</li>
                    <li>Examen des documents justificatifs relatifs à l'origine des fonds</li>
                    <li>Traitement administratif des alertes et anomalies détectées</li>
                    <li>Mise en conformité avec les obligations nationales et européennes de vigilance financière</li>
                  </ul>
                  <div className="bg-[#fff8e6] border-l-4 border-[#f6c85f] p-3 rounded-md mt-3.5 text-sm text-[#5b4a00]">
                    Sans régularisation ou fourniture des justificatifs demandés, le traitement complet de la transaction ne peut être finalisé.
                  </div>
                </div>
              </div>
            </section>

            <section className="border-t border-[#eef2f6] pt-4.5 mt-4.5">
              <h2 className="text-base text-[#6b7280] mb-3">Sections</h2>
              <div className="flex gap-3 flex-wrap">
                <div className="flex gap-2.5 items-start bg-white rounded-lg p-3 border border-[#eef3f8] flex-1 min-w-[200px]">
                  <Building2 className="w-7 h-7 flex-shrink-0 opacity-90 text-[#0b2b4a]" />
                  <div>
                    <h4 className="text-[13px] text-[#6b7280] mb-0">Émetteur</h4>
                    <p className="font-bold text-sm mt-1.5">ISMO PAY — Compte émetteur EUR 0163703574</p>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start bg-white rounded-lg p-3 border border-[#eef3f8] flex-1 min-w-[200px]">
                  <User className="w-7 h-7 flex-shrink-0 opacity-90 text-[#0b2b4a]" />
                  <div>
                    <h4 className="text-[13px] text-[#6b7280] mb-0">Bénéficiaire</h4>
                    <p className="font-bold text-sm mt-1.5">LONE JANET MORTENSEN — REVOLUT BANK UAB</p>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start bg-white rounded-lg p-3 border border-[#eef3f8] flex-1 min-w-[200px]">
                  <FileText className="w-7 h-7 flex-shrink-0 opacity-90 text-[#0b2b4a]" />
                  <div>
                    <h4 className="text-[13px] text-[#6b7280] mb-0">Motif</h4>
                    <p className="font-bold text-sm mt-1.5">Suspicion nécessitant vérifications AML — frais indiqués : 765 €</p>
                  </div>
                </div>
              </div>
            </section>
          </main>

          {/* Footer */}
          <footer className="p-3.5 bg-[#fbfdff] border-t border-[#eef2f6] flex justify-between gap-3 items-center text-[13px] text-[#6b7280] flex-wrap">
            <div className="max-w-[70%]">
              <div className="font-bold mb-1.5">Mentions légales</div>
              <div>
                Document <strong>simulé</strong> à titre informatif uniquement. Il n'a aucune valeur juridique et ne remplace aucune notification officielle.
              </div>
            </div>
            <div className="text-right">
              <div className="text-[13px] text-[#6b7280]">Pour toute information complémentaire :</div>
              <div className="font-bold text-[#0b2b4a] underline">Contact — Service de Simulation (exemple)</div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Index;
