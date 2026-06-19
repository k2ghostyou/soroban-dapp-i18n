import React, { useMemo, useState } from "react";
import { I18nProvider, useI18n, LOCALE_METADATA } from "../../../src";
import { getDirAttribute } from "../../../src/rtl/rtl";
import { formatAmount } from "../../../src/formatters/amount";
import { formatDate } from "../../../src/formatters/date";

const localeOptions = Object.values(LOCALE_METADATA);

function Demo() {
  const { translate, locale, localeMeta } = useI18n();
  return (
    <div style={{ padding: 24, direction: localeMeta.direction, fontFamily: "system-ui, sans-serif" }}>
      <header style={{ marginBottom: 24 }}>
        <h1>{translate("wallet.title")}</h1>
        <p>{translate("nav.support")}</p>
      </header>
      <section style={{ marginBottom: 16 }}>
        <strong>{translate("balance.total")}:</strong>
        <div>{formatAmount(123456789n, { locale: localeMeta.intlTag, decimals: 7, assetCode: "XLM" })}</div>
      </section>
      <section style={{ marginBottom: 16 }}>
        <strong>{translate("transaction.pending")}:</strong>
        <div>{formatDate(new Date(), { locale: localeMeta.intlTag, style: "medium" })}</div>
      </section>
    </div>
  );
}

export default function App() {
  const [locale, setLocale] = useState("en");
  const localeMeta = LOCALE_METADATA[locale as keyof typeof LOCALE_METADATA];

  const content = useMemo(
    () => (
      <I18nProvider locale={locale as any} fallbackLocale="en">
        <Demo />
      </I18nProvider>
    ),
    [locale]
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f7f8fb", padding: "24px" }} dir={getDirAttribute(locale as any)}>
      <div style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
        <label htmlFor="locale-select">Language:</label>
        <select
          id="locale-select"
          value={locale}
          onChange={(event) => setLocale(event.target.value)}
          style={{ padding: 8, borderRadius: 6 }}
        >
          {localeOptions.map((meta) => (
            <option key={meta.code} value={meta.code}>
              {meta.nativeName} ({meta.englishName})
            </option>
          ))}
        </select>
      </div>
      {content}
    </div>
  );
}
