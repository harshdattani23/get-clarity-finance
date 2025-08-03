import sys

for line in sys.stdin:
    if line.strip() == "node_modules/@next/swc-win32-x64-msvc/next-swc.win32-x64-msvc.node":
        with open("C:/Users/datta/OneDrive/Documents/Sebi Verify/app/replacement.txt", "rb") as f:
            sys.stdout.buffer.write(f.read())
    else:
        sys.stdout.buffer.write(line.encode("utf-8"))
