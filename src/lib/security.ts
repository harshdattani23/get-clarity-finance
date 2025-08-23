import { promises as dns } from 'dns';
import { isIP, isIPv4 } from 'net';

const isPrivateIP = (ip: string): boolean => {
  if (!isIP(ip)) {
    return false;
  }

  if (isIPv4(ip)) {
    const parts = ip.split('.').map(Number);
    if (
      parts[0] === 10 || // 10.0.0.0/8
      parts[0] === 127 || // 127.0.0.0/8
      (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) || // 172.16.0.0/12
      (parts[0] === 192 && parts[1] === 168) || // 192.168.0.0/16
      (parts[0] === 169 && parts[1] === 254) // 169.254.0.0/16
    ) {
      return true;
    }
  } else { // IPv6
    const lowerCaseIp = ip.toLowerCase();
    if (
      lowerCaseIp === '::1' || // Loopback
      lowerCaseIp.startsWith('fc') || // Unique Local
      lowerCaseIp.startsWith('fd') || // Unique Local
      lowerCaseIp.startsWith('fe80') // Link-local
    ) {
      return true;
    }
  }

  return false;
};

/**
 * Validates a URL to ensure it is safe from SSRF attacks.
 * It checks for allowed protocols, resolves the hostname to an IP,
 * and verifies that the IP is not a private or reserved address.
 * @param urlString The URL to validate.
 * @returns {Promise<boolean>} True if the URL is safe, false otherwise.
 */
export const isUrlSafe = async (urlString: string): Promise<boolean> => {
  try {
    const url = new URL(urlString);

    // 1. Protocol check
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      console.warn(`[isUrlSafe] Blocked URL with invalid protocol: ${url.protocol}`);
      return false;
    }

    const hostname = url.hostname;

    // 2. Resolve hostname to IP addresses
    const ips = await dns.resolve(hostname);
    if (!ips || ips.length === 0) {
      console.warn(`[isUrlSafe] Hostname did not resolve to any IPs: ${hostname}`);
      return false;
    }

    // 3. Check all resolved IPs against blocklist
    for (const ip of ips) {
      if (isPrivateIP(ip)) {
        console.warn(`[isUrlSafe] Blocked URL resolving to private IP: ${hostname} -> ${ip}`);
        return false;
      }
    }

    return true; // All checks passed
  } catch (error) {
    console.error(`[isUrlSafe] An error occurred during URL validation for "${urlString}":`, error);
    return false; // Any error during parsing or resolution defaults to unsafe
  }
};
