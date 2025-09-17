import { createI18n, type I18n } from "vue-i18n";

export const setupI18n = async (options = { locale: "es" }): Promise<I18n> => {
  let messages = {
    Home: "Inicio",
    Invoices: "Facturas",
  };

  try {
    const InvoicesI18n = await import("invoices_mf/InvoicesI18n");
    const ProductsI18n = await import("products_mf/ProductsI18n");
    const { exposeMessages: exposeProductMessages } = ProductsI18n.default;
    const productMessages = await exposeProductMessages(options.locale);
    messages = {
      ...messages,
      ...productMessages,
    };
    const { exposeMessages } = InvoicesI18n.default;
    const invoicesMessages = await exposeMessages(options.locale);
    messages = {
      ...messages,
      ...invoicesMessages,
    };
    console.log(messages);
  } catch (error) {
    console.error("Error loading invoices i18n:", error);
  }
  const i18n = createI18n({
    locale: options.locale,
    messages: {
      [options.locale]: messages,
    },
  });
  return i18n;
};

const i18n = await setupI18n({ locale: "es" });
export default i18n;
