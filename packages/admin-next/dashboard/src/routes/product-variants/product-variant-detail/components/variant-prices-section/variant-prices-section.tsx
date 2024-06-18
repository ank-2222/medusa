import { useTranslation } from "react-i18next"

import { Container, Heading } from "@medusajs/ui"
import { CurrencyDollar } from "@medusajs/icons"
import { MoneyAmountDTO, ProductVariantDTO } from "@medusajs/types"

import { ActionMenu } from "../../../../../components/common/action-menu"
import { getLocaleAmount } from "../../../../../lib/money-amount-helpers"

type VariantPricesSectionProps = {
  variant: ProductVariantDTO & { prices: MoneyAmountDTO[] }
}

export function VariantPricesSection({ variant }: VariantPricesSectionProps) {
  const { t } = useTranslation()

  const prices = variant.prices.filter((p) => !p.rules?.length) // dispaly just currency prices

  return (
    <Container className="flex flex-col divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">{t("labels.prices")}</Heading>
        <ActionMenu
          groups={[
            {
              actions: [
                {
                  label: t("actions.edit"),
                  to: `/products/${variant.product_id}/prices`,
                  icon: <CurrencyDollar />,
                },
              ],
            },
          ]}
        />
      </div>
      {prices.map((price) => {
        return (
          <div className="txt-small text-ui-fg-subtle flex justify-between px-6 py-4">
            <span className="font-medium">
              {price.currency_code.toUpperCase()}
            </span>
            <span>{getLocaleAmount(price.amount, price.currency_code)}</span>
          </div>
        )
      })}
    </Container>
  )
}