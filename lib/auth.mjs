import { createHmac, timingSafeEqual } from "node:crypto";

const AUTH_COOKIE_NAME = "heyum_cs_auth";
const AUTH_COOKIE_MAX_AGE = 60 * 60 * 12;

export function isAuthenticated(req, env = process.env) {
  const cookies = parseCookies(req.headers?.cookie || "");
  const token = cookies[AUTH_COOKIE_NAME];
  return token ? verifyToken(token, env) : false;
}

export function buildAuthCookie(env = process.env) {
  const token = createToken(env);
  const parts = [
    `${AUTH_COOKIE_NAME}=${token}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${AUTH_COOKIE_MAX_AGE}`
  ];

  if (env.NODE_ENV === "production") {
    parts.push("Secure");
  }

  return parts.join("; ");
}

export function buildClearAuthCookie(env = process.env) {
  const parts = [
    `${AUTH_COOKIE_NAME}=`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=0"
  ];

  if (env.NODE_ENV === "production") {
    parts.push("Secure");
  }

  return parts.join("; ");
}

export function isValidPassword(password, env = process.env) {
  const expected = env.APP_PASSWORD;
  if (!expected || typeof password !== "string") {
    return false;
  }

  const actualBuffer = Buffer.from(password, "utf-8");
  const expectedBuffer = Buffer.from(expected, "utf-8");

  if (actualBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(actualBuffer, expectedBuffer);
}

function createToken(env) {
  const secret = authSecret(env);
  return createHmac("sha256", secret).update("heyum-cs-auth").digest("hex");
}

function verifyToken(token, env) {
  const expected = createToken(env);
  const tokenBuffer = Buffer.from(token, "utf-8");
  const expectedBuffer = Buffer.from(expected, "utf-8");

  if (tokenBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(tokenBuffer, expectedBuffer);
}

function authSecret(env) {
  return env.AUTH_SECRET || env.APP_PASSWORD || "heyum-cs-auth";
}

function parseCookies(rawCookie) {
  return rawCookie
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce((acc, part) => {
      const [name, ...rest] = part.split("=");
      acc[name] = decodeURIComponent(rest.join("="));
      return acc;
    }, {});
}
