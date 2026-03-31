// Email obfuscation utility.
// The address is split into parts so scrapers can't regex a plain email
// from the HTML source or JS bundles. It's only assembled at runtime
// when a real user triggers an action.

const _p = ["co", "nta", "ct"];
const _d = ["jo", "nat", "han", "b"];
const _t = "dk";

export function getEmail(): string {
  return `${_p.join("")}@${_d.join("")}.${_t}`;
}

const _pp = ["pr", "e", "ss"];

export function getPressEmail(): string {
  return `${_pp.join("")}@${_d.join("")}.${_t}`;
}

const _pv = ["pri", "va", "cy"];

export function getPrivacyEmail(): string {
  return `${_pv.join("")}@${_d.join("")}.${_t}`;
}

export async function copyEmail(
  emailFn: () => string = getEmail,
): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(emailFn());
    return true;
  } catch {
    return false;
  }
}
