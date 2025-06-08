import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import HTTPClient from "./sender"; // путь к HTTPClient

let originalXMLHttpRequest: typeof globalThis.XMLHttpRequest;

describe("HTTPClient", () => {
  const baseAPI = "http://localhost:3000";
  let client: HTTPClient;

  beforeEach(() => {
    client = new HTTPClient(baseAPI);
    originalXMLHttpRequest = global.XMLHttpRequest;
  });

  afterEach(() => {
    global.XMLHttpRequest = originalXMLHttpRequest;
  });

  it("должен возвращать baseUrl через getBaseUrl()", () => {
    expect(client.getBaseUrl()).toBe(baseAPI);
  });

  it("выполняет GET-запрос и получает JSON", async () => {
    const mockOpen = vi.fn();
    const mockSend = vi.fn();
    const mockSetHeader = vi.fn();

    let onLoadCallback!: () => void;

    const mockXhrInstance = {
      open: mockOpen,
      send: mockSend,
      setRequestHeader: mockSetHeader,
      withCredentials: false,
      status: 200,
      responseText: JSON.stringify({ ok: true }),
      set onload(fn: () => void) {
        onLoadCallback = fn;
      },
      onerror: () => {}
    };

    class MockXHR {
      open = mockOpen;
      send = mockSend;
      setRequestHeader = mockSetHeader;
      withCredentials = false;
      get status() {
        return mockXhrInstance.status;
      }
      get responseText() {
        return mockXhrInstance.responseText;
      }
      set onload(fn: () => void) {
        mockXhrInstance.onload = fn;
      }
      set onerror(fn: () => void) {
        mockXhrInstance.onerror = fn;
      }
    }

    global.XMLHttpRequest = MockXHR as any;

    const promise = client.get<{ ok: boolean }>("/test");

    // эмулируем onload вызов
    onLoadCallback?.();

    const result = await promise;

    expect(mockOpen).toHaveBeenCalledWith("GET", `${baseAPI}/test`, true);
    expect(mockSend).toHaveBeenCalled();
    expect(result).toEqual({ ok: true });
  });
});
