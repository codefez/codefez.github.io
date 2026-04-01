# Crescent Cipher 2027 Challenge Draft

## Title
The Archive of Five

## Story
It's Ramadan 1448, and the Beacen Library has moved all learner progress into a strange export format called CFEZ2. The file still contains a JSON save, but it has been transformed into a custom coded alphabet and then lightly scrambled.

Your mission: reverse the format, recover the JSON, and identify the learner with the highest score.

## What Participants Receive
- One encoded save string in this format:
  - `CFEZ2.<byteLength>.<checksum>.<payload>`
- Optional hint file with a few decoded examples.

## Rules of the Encoding System
### Step 1: JSON to bytes
The original save is plain JSON text encoded as UTF-8 bytes.

### Step 2: Custom 6-bit alphabet
Bytes are transformed to a Base64-style stream using this exact 64-character alphabet:

`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789:_`

Padding uses `.` where needed.

### Step 3: Obfuscation layer
Reverse every 5-character block of the encoded stream.

Example:
- Original: `ABCDE12345XYZ`
- Obfuscated: `EDCBA54321ZYX`

### Step 4: Checksum
Checksum is computed on the pre-obfuscated encoded stream.

Formula:
1. For each character at index `i`, multiply `charCode(character)` by `((i mod 7) + 1)`.
2. Sum all products.
3. `checksum = sum mod 97`.
4. Store checksum as a 2-digit decimal string (left-pad with zero).

## Expected Decode Workflow
1. Parse header: `CFEZ2`, `byteLength`, `checksum`, `payload`.
2. Reverse every 5-character block of payload.
3. Recompute checksum and compare.
4. Decode custom alphabet stream to bytes (with `.` padding handling).
5. Validate decoded byte length equals `byteLength`.
6. Decode UTF-8 bytes back to JSON.

## Puzzle Tasks (Suggested)
1. Recover the player name.
2. Calculate percentage completion from `score` and total challenges.
3. Find which category has the lowest completion.
4. Submit a single flag:
   - `CC{playerName:score:weakestCategory}`

## Hints You Can Release Over Time
- Hint 1: The payload is reversible in fixed-size chunks.
- Hint 2: The alphabet has 64 symbols and ends with `:_`.
- Hint 3: The checksum is modulo 97 and uses repeating weights 1..7.

## Teacher Notes
- This is intentionally not secure cryptography.
- It is designed to teach:
  - Encoding pipelines
  - Checksum validation
  - Binary/Base64 concepts
  - Structured reverse engineering

## Optional Extension Round
After decoding one file, give participants two files:
- one valid,
- one with a single tampered character.

Challenge them to identify which one fails checksum and why.
