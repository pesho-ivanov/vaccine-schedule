#!/usr/bin/env python3
from __future__ import annotations

import http.server
import os
import socketserver
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SITE_DIR = ROOT / "generated-site"


class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True


def main() -> int:
    host = os.environ.get("SITE_HOST", "127.0.0.1")
    start_port = int(os.environ.get("SITE_PORT", "8000"))
    max_attempts = int(os.environ.get("SITE_PORT_ATTEMPTS", "100"))
    handler = lambda *args, **kwargs: http.server.SimpleHTTPRequestHandler(
        *args,
        directory=str(SITE_DIR),
        **kwargs,
    )

    last_error: OSError | None = None
    for port in range(start_port, start_port + max_attempts):
        try:
            with ReusableTCPServer((host, port), handler) as httpd:
                print(f"Serving generated-site at http://{host}:{port}/")
                httpd.serve_forever()
        except OSError as error:
            last_error = error
            if error.errno != 98:
                raise
            continue
        break

    raise SystemExit(f"no free port found from {start_port}: {last_error}")


if __name__ == "__main__":
    raise SystemExit(main())
