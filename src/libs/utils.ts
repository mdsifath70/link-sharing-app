import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { isURL } from "validator";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function excludeProperties<T>(
  data: T[] | T,
  propertiesToExclude: (keyof T)[],
): T[] | T {
  if (Array.isArray(data)) {
    return data.map((obj) => {
      const { ...rest } = obj;
      for (const property of propertiesToExclude) {
        delete rest?.[property];
      }
      return rest;
    });
  } else if (typeof data === "object") {
    const { ...rest } = data;
    for (const property of propertiesToExclude) {
      delete rest?.[property];
    }
    return rest;
  } else {
    return data;
  }
}

export function formDataToObj(formData: FormData) {
  const formObj: { [key: string]: any } = {};

  formData.forEach((value, key) => {
    const keys = key.split(".").filter(Boolean);
    let current = formObj;

    keys.forEach((k, i) => {
      if (i === keys.length - 1) {
        if (value === "true" || value === "false") {
          current[k] = value === "true";
        } else {
          current[k] = value;
        }
      } else {
        if (!current[k]) {
          current[k] = {};
        }
        current = current[k];
      }
    });
  });

  return formObj;
}

export function prepareFormData(data: object): FormData {
  const formData = new FormData();

  function appendData(data: any, parentKey = ""): void {
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (value) {
        const formKey = parentKey ? `${parentKey}.${key}` : key;

        if (value instanceof File || value instanceof Blob) {
          formData.append(formKey, value);
        } else if (typeof value === "object" && value !== null) {
          appendData(value, formKey);
        } else {
          formData.append(formKey, value);
        }
      }
    });
  }
  appendData(data);

  return formData;
}

export function isValidUrl(url: string) {
  return isURL(url) && (url.startsWith("http://") || url.startsWith("https://"));
}
