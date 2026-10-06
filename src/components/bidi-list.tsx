"use client";

import { Fragment } from "react";
import { useLocale } from "@/lib/i18n";

/**
 * A list like "A, B and C" that reads correctly in both directions.
 * Each item is isolated (<bdi>), so English tech names inside Arabic text
 * keep their own order and the list still runs right to left.
 */
export function BdiList({ items, withAnd = false }: { items: string[]; withAnd?: boolean }) {
  const { t, dir } = useLocale();
  const sep = dir === "rtl" ? "، " : ", ";
  return (
    <>
      {items.map((item, i) => (
        <Fragment key={item}>
          {i > 0 && (withAnd && i === items.length - 1 ? ` ${t.listAnd}${dir === "rtl" ? "" : " "}` : sep)}
          <bdi>{item}</bdi>
        </Fragment>
      ))}
    </>
  );
}
