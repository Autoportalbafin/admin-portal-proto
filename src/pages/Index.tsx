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
  AlertCircle
} from "lucide-react";

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="institutional-gradient text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8" aria-hidden="true" />
              <div>
                <h1 className="text-2xl font-bold">{t.title}</h1>
                <p className="text-sm opacity-90">{t.subtitle}</p>
              </div>
            </div>
            <Button 
              onClick={toggleLanguage}
              variant="secondary"
              size="sm"
              className="gap-2 font-semibold"
              aria-label={`Switch to ${lang === "fr" ? "Slovak" : "French"}`}
            >
              <Globe className="h-4 w-4" aria-hidden="true" />
              {t.languageToggle}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-6">
        {/* Transaction Details */}
        <section aria-labelledby="transaction-heading">
          <Card className="shadow-md">
            <CardHeader className="bg-muted/50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle id="transaction-heading" className="text-2xl flex items-center gap-2">
                    <FileText className="h-6 w-6" aria-hidden="true" />
                    {t.transactionDetails}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    Transaction ID: TRX-2025-001672
                  </CardDescription>
                </div>
                <Badge className="bg-success-bg text-success-text border-0 text-base px-4 py-2 gap-2">
                  <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                  {t.approved}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Date and Amount */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">{t.date}</p>
                    <p className="text-lg font-semibold">16 octobre 2025</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                  <Euro className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">{t.amount}</p>
                    <p className="text-lg font-semibold">1 500,00 €</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Emitter and Beneficiary */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Emitter */}
                <Card className="bg-secondary/30 border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Building2 className="h-5 w-5" aria-hidden="true" />
                      {t.emitter}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">{t.bank}</p>
                      <p className="font-semibold">ORNT BANK</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">{t.holder}</p>
                      <p className="font-semibold">SULSKIENE ELEONORA</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">{t.account}</p>
                      <p className="font-mono font-semibold">EUR – 0172080430</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Beneficiary */}
                <Card className="bg-secondary/30 border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <User className="h-5 w-5" aria-hidden="true" />
                      {t.beneficiary}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">{t.bank}</p>
                      <p className="font-semibold">VÙB BANKA</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">{t.holder}</p>
                      <p className="font-semibold">Liptáková Michaela</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">{t.address}</p>
                      <p className="font-semibold">Krásny Brod 179</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">{t.iban}</p>
                      <p className="font-mono text-sm font-semibold">SK49 0200 0000 0031 7774 2054</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">{t.bic}</p>
                      <p className="font-mono font-semibold">SUBASKBX</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Separator />

              {/* Fees Breakdown */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Info className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h3 className="text-lg font-semibold">{t.feesBreakdown}</h3>
                </div>
                <Card className="bg-warning-bg border-warning-text/20">
                  <CardContent className="pt-6 space-y-4">
                    <p className="text-sm text-foreground/80">{t.feesExplanation}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">{t.baseAmount}</span>
                        <span className="font-semibold">169,17 €</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">{t.vat}</span>
                        <span className="font-semibold">33,83 €</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center text-lg">
                        <span className="font-semibold">{t.totalFees}</span>
                        <span className="font-bold text-warning-text">203,00 €</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Separator />

              {/* Verification Steps */}
              <div>
                <h3 className="text-lg font-semibold mb-4">{t.verificationSteps}</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 bg-success-bg rounded-lg border border-success-text/20">
                    <CheckCircle2 className="h-5 w-5 text-success-text mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-success-text">{t.step1Title}</p>
                      <p className="text-sm text-foreground/80">{t.step1Desc}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-success-bg rounded-lg border border-success-text/20">
                    <CheckCircle2 className="h-5 w-5 text-success-text mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-success-text">{t.step2Title}</p>
                      <p className="text-sm text-foreground/80">{t.step2Desc}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-success-bg rounded-lg border border-success-text/20">
                    <CheckCircle2 className="h-5 w-5 text-success-text mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-success-text">{t.step3Title}</p>
                      <p className="text-sm text-foreground/80">{t.step3Desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Legal Information */}
        <section aria-labelledby="legal-heading">
          <h2 id="legal-heading" className="sr-only">Legal Information</h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="privacy" className="border rounded-lg bg-card shadow-sm">
              <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5" aria-hidden="true" />
                  <span className="font-semibold">{t.privacyPolicy}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.privacyContent}
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="accessibility" className="border rounded-lg bg-card shadow-sm">
              <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50">
                <div className="flex items-center gap-2">
                  <Info className="h-5 w-5" aria-hidden="true" />
                  <span className="font-semibold">{t.accessibilityStatement}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.accessibilityContent}
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="security" className="border rounded-lg bg-card shadow-sm">
              <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5" aria-hidden="true" />
                  <span className="font-semibold">{t.securityNotice}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.securityContent}
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Contact & Verification */}
        <section aria-labelledby="contact-heading">
          <Card className="shadow-md border-2 border-primary/20">
            <CardHeader className="bg-primary/5">
              <CardTitle id="contact-heading" className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" aria-hidden="true" />
                {t.contactVerification}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t.contactInfo}
              </p>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-2">
            <p className="text-sm font-medium">{t.footer}</p>
            <p className="text-xs opacity-80">{t.disclaimer}</p>
            <p className="text-xs opacity-70 mt-4">
              HTTPS • CSP Enabled • WCAG 2.1 AA Compliant
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
