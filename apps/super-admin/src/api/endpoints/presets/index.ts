import { endpoints } from "@/api";
import { setUrlParams } from "@clife/domain/helpers";
import createHttpClient from "@clife/domain/httpClient";

const { PRESETS } = endpoints;

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const httpClient = createHttpClient(baseUrl);

const presetEndpoints = {
  getLanguageAndTimezones() {
    const url = setUrlParams(PRESETS.LANGUAGE_AND_TIMEZONES, {});
    return httpClient.get(url);
  },

  getThemes() {
    const url = setUrlParams(PRESETS.THEMES, {});
    return httpClient.get(url);
  },

  getTiers() {
    const url = setUrlParams(PRESETS.TIERS, {});
    return httpClient.get(url);
  },

  getUnits() {
    const url = setUrlParams(PRESETS.UNITS, {});
    return httpClient.get(url);
  },
};

export default presetEndpoints;
