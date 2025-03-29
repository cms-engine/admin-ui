import {getRequestConfig} from "next-intl/server";

export default getRequestConfig(async () => {
  // Server side translations are not used in the application
  const locale = "en";

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
